import Trait from '../models/Trait';
import { Request, Response } from 'express';

interface ITrait {
    id: number;
    name: string;
    isActive: boolean;
}

