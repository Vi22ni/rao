import express from 'express';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import routes from './routes';
import dotenv from 'dotenv';
import path from 'path';
import { v2 as cloudinary } from 'cloudinary';

dotenv.config({
  path: path.resolve(
    process.cwd(),
    `.env.${process.env.NODE_ENV || 'development'}`
  )
});

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const app = express();

app.use(cors({
  origin: process.env.CLIENT_URL,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

app.use('/api', rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: 'Muitas requisições deste IP. Tente novamente mais tarde.'
}));

app.use('/api', routes);
app.get("/", (req, res) => res.send("Express on Vercel"));
app.use('/temp', express.static(path.join(__dirname, '../temp')));

export default app;
