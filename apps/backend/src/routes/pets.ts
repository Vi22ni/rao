import express from 'express';
import { createPet } from '../controllers/petsController';
import { getPetById } from '../controllers/petsController';
import { getPets } from '../controllers/petsController';
import { updatePet } from '../controllers/petsController';
import { uploadMiddleware } from '../middlewares/multer';

const router = express.Router();
router.post('/', uploadMiddleware, createPet);
router.get('/:id', getPetById);
router.get('/', getPets);
router.patch('/:id', updatePet);

export default router;