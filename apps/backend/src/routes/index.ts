import express from 'express';
import petsRoutes from './pets';
import traitsRoutes from './traits';

const router = express.Router();
router.use('/pets', petsRoutes);
router.use('/traits', traitsRoutes)

export default router;