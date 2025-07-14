import express from 'express';
import { createPet } from '../controllers/petsController';

const router = express.Router();
router.post('/', createPet);

export default router;