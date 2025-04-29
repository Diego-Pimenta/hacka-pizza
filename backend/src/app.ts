import express from 'express';
import cors from 'cors';
import { options } from './config/cors';
import dotenv from 'dotenv';
import clientRoutes from './routes/client.routes';

dotenv.config();

const app = express();

app.use(cors(options));

app.use(express.json());

app.use('/clients', clientRoutes);

export default app;
