import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import { env } from './utils/env.js';
import contactsRouter from './routers/contacts.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { errorHandler } from './middlewares/errorHandler.js';
import authRouter from './routers/auth.js';
import cookieParser from 'cookie-parser';
import { authenticate } from './middlewares/authenticate.js';
import { UPLOAD_DIR } from './constants/index.js';

const PORT = Number(env('PORT', 3000));

export function setupServer() {
  const app = express();

  const logger = pino({
    transport: {
      target: 'pino-pretty',
    },
  });

  app.use(logger);
  app.use(cors());
  app.use(cookieParser());
  app.use(express.json());

  app.get('/', async (req, res) => {
    res.json({
      status: 200,
      message: 'Successful request!',
    });
  });

  app.use('/contacts', contactsRouter);
  app.use('/auth', authRouter);
  app.use('/uploads', express.static(UPLOAD_DIR));

  app.use('*', notFoundHandler);
  app.use(errorHandler);

  app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
}
