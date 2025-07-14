import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import rateLimit, { RateLimitRequestHandler } from 'express-rate-limit';
import routes from './routes';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
  path: path.resolve(
    process.cwd(),
    `.env.${process.env.NODE_ENV || 'development'}`
  )
});

const app: Express = express();

interface CorsOptions {
  origin: string | undefined;
  methods: string[];
  allowedHeaders: string[];
}

const corsOptions: CorsOptions = {
  origin: process.env.CLIENT_URL,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
app.use(express.json());

const limiter: RateLimitRequestHandler = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: 'Muitas requisições deste IP. Tente novamente mais tarde.'
});

app.use('/api', limiter);
app.use('/api', routes);

const PORT: number = parseInt(process.env.PORT || '3000', 10);
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));