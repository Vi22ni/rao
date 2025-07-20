import Trait from '../models/Trait';
import { Request, Response } from 'express';

interface ITrait {
    id: number;
    name: string;
}

export const getTraits = async (req: Request, res: Response) => {
    try {
        const traits: ITrait[] = await Trait.findAll();

        res.status(200).json({ data: traits });
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
}