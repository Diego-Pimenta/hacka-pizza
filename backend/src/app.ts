import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import corsPolicy from './config/cors';
import { protectAuth } from './middlewares/auth.middleware';
import { errorHandler } from './middlewares/error.handler';
import authRoutes from './routes/auth.routes';
import clientRoutes from './routes/client.routes';

dotenv.config();

const app = express();

app.use(cors(corsPolicy));

app.use(express.json());

app.use('/auth', authRoutes);
app.use('/clients', protectAuth, clientRoutes);

app.use(errorHandler);

export default app;
