import express from 'express';
import { createPet } from '../controllers/petsController';
import { getPetById } from '../controllers/petsController';
import { getPets } from '../controllers/petsController';
import { updatePet } from '../controllers/petsController';

const router = express.Router();
router.post('/', createPet);
router.get('/:id', getPetById);
router.get('/', getPets);
router.patch('/:id', updatePet);

export default router;