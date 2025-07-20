import express from 'express';
import { getTraits } from '../controllers/traitsController';

const router = express.Router();
router.get('/', getTraits);

export default router;