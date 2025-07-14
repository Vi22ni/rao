import express from 'express';
import petsRoutes from './pets';

const router = express.Router();
router.use('/pets', petsRoutes);

export default router;