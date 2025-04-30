import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import corsPolicy from './config/cors';
import { protectAuth } from './middlewares/auth.middleware';
import { errorHandler } from './middlewares/error.handler';
import authRoutes from './routes/auth.routes';
import clientRoutes from './routes/client.routes';
import orderRoutes from './routes/order.routes';
import productRoutes from './routes/product.routes';
import addressRoutes from './routes/address.routes';

dotenv.config();

const app = express();

app.use(cors(corsPolicy));

app.use(express.json());

app.use('/auth', authRoutes);
app.use('/clients', protectAuth, clientRoutes);
app.use('/order', protectAuth, orderRoutes);
app.use('/products', protectAuth, productRoutes);
app.use('', protectAuth, addressRoutes);


app.use(errorHandler);

export default app;
