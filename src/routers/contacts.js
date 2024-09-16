import { Router } from 'express';
import {
  createContactController,
  deleteContactController,
  getAllContactsContrller,
  getContactByIdContrller,
  patchContactController,
} from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const contactsRouter = Router();

contactsRouter.get('/', ctrlWrapper(getAllContactsContrller));
contactsRouter.get('/:contactId', ctrlWrapper(getContactByIdContrller));

contactsRouter.post('/', ctrlWrapper(createContactController));
contactsRouter.patch('/:contactId', ctrlWrapper(patchContactController));

contactsRouter.delete('/:contactId', ctrlWrapper(deleteContactController));

export default contactsRouter;
