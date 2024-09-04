import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import { env } from './utils/env.js';
import { getAllContacts, getContactById } from './services/contacts.js';
import { getAllContents } from './services/contents.js';

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
  app.use(express.json());

  app.get('/', async (req, res) => {
    res.json({
      status: 200,
      message: 'Successful request!',
    });
  });

  app.get('/contents', async (req, res) => {
    const data = await getAllContents();

    res.json({
      status: 200,
      message: 'Successfully found contents!',
      data: data,
    });
  });

  app.get('/contacts', async (req, res) => {
    const data = await getAllContacts();

    res.json({
      status: 200,
      message: 'Successfully found contacts!',
      data: data,
    });
  });

  app.get('/contacts/:contactId', async (req, res) => {
    const { contactId } = req.params;
    const data = await getContactById(contactId);

    if (data) {
      res.json({
        status: 200,
        message: `Successfully found contact with id ${contactId}!`,
        data: data,
      });
    } else {
      res.json({
        status: 404,
        message: 'Contact not found',
      });
    }
  });

  app.use((req, res) => {
    res.status(404).json({
      message: 'Not found',
    });
  });

  app.use((error, req, res) => {
    res.status(500).json({
      message: error.message,
    });
  });

  app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
}
