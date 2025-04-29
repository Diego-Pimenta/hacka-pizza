import express, { Errback, Request, Response } from 'express';
import cors from 'cors';
import corsPolicy from './config/cors';
import dotenv from 'dotenv';
import clientRoutes from './routes/client.routes';
import { protectAuth } from './middlewares/auth.middleware';
import { ZodError } from 'zod';

dotenv.config();

const app = express();

app.use(cors(corsPolicy));

app.use(express.json());

app.use('/clients', protectAuth, clientRoutes);

app.use((error: Errback, _req: Request, res: Response) => {
  if (error instanceof ZodError) {
    res.status(400).send({ error: 'Validation error', issues: error.format() });
  }

  res.status(500).send({ error: 'Internal server error' });
});

export default app;
