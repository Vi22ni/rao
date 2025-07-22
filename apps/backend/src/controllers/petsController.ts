import Pet from '../models/Pet';
import { Request, Response } from 'express';
import { createPetTrait, getPetTraits, IPetTrait } from './petTraitsController'
import { uploadImage } from '../utils/uploadImage';
import fs from 'fs';
import path from 'path';
import axios from 'axios';
import FormData from 'form-data';

const TEMP_DIR = path.join(__dirname, '../../temp');
if (!fs.existsSync(TEMP_DIR)) {
  fs.mkdirSync(TEMP_DIR, { recursive: true });
}

interface IPet {
  id: number;
  name: string;
  species: 'dog' | 'cat';
  photoUrl: string;
  status?: 'pending' | 'approved' | 'rejected';
  humanName: string;
}


interface PaginationQuery {
  page?: string;
  size?: string;
}

const TeachableMachine = require("@sashido/teachablemachine-node");


const model = new TeachableMachine({
  modelUrl: "https://teachablemachine.withgoogle.com/models/OT_85UdPU/"
});

export const verifyPetImage = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      throw new Error('Nenhuma imagem foi enviada');
    }

    const form = new FormData();
    form.append('reqtype', 'fileupload');
    form.append('time', '1h');
    form.append('fileToUpload', req.file.buffer, {
      filename: req.file.originalname,
      contentType: req.file.mimetype
    });

    const response = await axios.post(
      'https://litterbox.catbox.moe/resources/internals/api.php',
      form,
      {
        headers: form.getHeaders()
      }
    );

    const uploadUrl = response.data;
    if (typeof uploadUrl !== 'string' || !uploadUrl.startsWith('http')) {
      throw new Error('Falha no upload para o Litterbox');
    }

    const predictions = await model.classify({ imageUrl: uploadUrl });

    const topPrediction = predictions.reduce((prev: any, current: any) =>
      prev.score > current.score ? prev : current
    );

    if (topPrediction.class !== 'dogs' && topPrediction.class !== 'cats') {
      return res.status(400).json({
        success: false,
        error: 'A imagem não parece ser de um gato ou cachorro.',
        isPet: false
      });
    }

    res.json({
      success: true,
      isPet: true,
      predictedSpecies: topPrediction.class === 'dogs' ? 'dog' : 'cat',
      confidence: topPrediction.score,
      message: `Identificamos que isso é um ${topPrediction.class === 'dogs' ? 'cachorro' : 'gato'} (${(topPrediction.score * 100).toFixed(1)}% de confiança). Confirma?`
    });

  } catch (error) {
    console.error("Erro ao verificar imagem:", error);
    res.status(500).json({
      success: false,
      error: 'Erro ao analisar a imagem'
    });
  }
};


export const createPet = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      throw new Error('Nenhuma imagem foi enviada ou o upload falhou');
    }

    const { name, humanName, traits, species } = req.body;

    let traitsArray = [];
    try {
      traitsArray = typeof traits === 'string' ? JSON.parse(traits) : traits;
    } catch (e) {
      throw new Error('Formato inválido para as características');
    }

    const { url, publicId } = await uploadImage(req.file.buffer, req.file.originalname);

    const pet = await Pet.create({
      name,
      humanName,
      photoUrl: url,
      species
      // photoPublicId: publicId
    });

    const traitsIds = traitsArray.map((trait: any) => trait.id);
    const createdTraits = await createPetTrait(traitsIds, pet.dataValues.id);

    res.status(201).json({
      success: true,
      data: {
        ...pet.dataValues,
        traits: createdTraits
      }
    });

  } catch (error: any) {
    console.error('Error creating pet:', error);
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

export const getPetById = async (req: Request, res: Response) => {
  try {
    const pet = await Pet.findByPk(req.params.id, { include: ['traits'] });
    res.status(200).json({ data: pet });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const getPets = async (req: Request<{}, {}, {}, PaginationQuery>, res: Response) => {
  try {
    const page = parseInt(req.query.page || '1');
    const size = parseInt(req.query.size || '10');

    if (isNaN(page) || isNaN(size) || page < 1 || size < 1) {
      return res.status(400).json({ error: 'Invalid parameters' });
    }

    const { count, rows: pets } = await Pet.findAndCountAll({
      limit: size,
      offset: (page - 1) * size,
      include: ['traits'],
      order: [['createdAt', 'DESC']]
    });

    res.status(200).json({
      data: pets,
      pagination: {
        currentPage: page,
        pageSize: size,
        totalItems: count,
        totalPages: Math.ceil(count / size),
      },
    });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const updatePet = async (req: Request, res: Response) => {
  try {
    const pet = await Pet.findByPk(req.params.id);
    if (!pet) {
      return res.status(404).json({ error: 'Pet não encontrado' });
    }

    const allowedFields: (keyof IPet)[] = ['name', 'species', 'photoUrl', 'status', 'humanName'];
    const updates = Object.keys(req.body)
      .filter(key => allowedFields.includes(key as keyof IPet))
      .reduce((obj, key) => {
        obj[key as keyof IPet] = req.body[key];
        return obj;
      }, {} as Partial<IPet>);

    await pet.update(updates);

    res.status(200).json({ data: pet });
  } catch (error: any) {
    res.status(400).json({
      error: error.message,
      details: error.errors?.map((err: any) => err.message)
    });
  }
};