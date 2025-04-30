import { CorsOptions } from 'cors';
import 'dotenv/config';

const allowedOrigins = [`${process.env.CLIENT_URL}`];

const options: CorsOptions = {
  origin: allowedOrigins,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};

export default options;
