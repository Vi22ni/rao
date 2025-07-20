import Pet from '../models/Pet';
import { Request, Response } from 'express';
import { createPetTrait, getPetTraits, IPetTrait } from './petTraitsController'

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

export const createPet = async (req: Request, res: Response) => {
  try {
    const pet = await Pet.create(req.body);
    const traits = await createPetTrait(req.body.traits, pet.dataValues.id);
    res.status(201).json(
      {
        data: {
          ...pet,
          traits: traits
        }
      }
    )
  } catch (error: any) {
    res.status(400).json({ error: error.message });
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
      include: ['traits']
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