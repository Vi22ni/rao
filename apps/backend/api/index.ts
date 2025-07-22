import { VercelRequest, VercelResponse } from '@vercel/node';
import app from '../src/server'; // importa o express configurado

export default (req: VercelRequest, res: VercelResponse) => {
  app(req, res); // sem .listen()
};
