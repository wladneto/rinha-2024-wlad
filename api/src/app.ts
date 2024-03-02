import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';

import * as middlewares from './middlewares';
import api from './api';
import MessageResponse from './interfaces/MessageResponse';

require('dotenv').config();

const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(express.json());

app.get<{}, MessageResponse>('/', (req, res) => {
  res.json({
    message: 'API - Rinha 2024 🦄✨👋🌎🌍🌏✨🦄',
  });
});

app.use('/', api);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

export default app;
