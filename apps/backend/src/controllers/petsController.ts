import Pet from '../models/Pet';
import { Request, Response } from 'express';

interface IPet {
  name: string;
  species: 'dog' | 'cat';
  traits: Record<string, any>;
  photoUrl: string;
  status?: 'pending' | 'approved' | 'rejected';
}

export const createPet = async (req: Request, res: Response) => {
  try {
    const pet = await Pet.create(req.body);
    res.status(201).json(pet);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};