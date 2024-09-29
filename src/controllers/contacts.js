import createHttpError from 'http-errors';
import {
  createContact,
  deleteContact,
  getAllContacts,
  getContactById,
  updateContact,
} from '../services/contacts.js';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';

export const getAllContactsContrller = async (req, res) => {
  const { user } = req;
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query);

  const contacts = await getAllContacts(
    {
      page,
      perPage,
      sortBy,
      sortOrder,
    },
    user._id,
  );

  res.json({
    status: 200,
    message: 'Successfully found contacts!',
    data: contacts,
  });
};

export const getContactByIdContrller = async (req, res, next) => {
  const { contactId } = req.params;
  const { user } = req;

  const data = await getContactById(contactId, user._id);

  if (data) {
    res.json({
      status: 200,
      message: `Successfully found contact with id ${contactId}!`,
      data: data,
    });
  } else {
    throw createHttpError(404, 'Contact not found');
  }
};

export const createContactController = async (req, res) => {
  const { user } = req;
  const student = await createContact(req.body, user._id);

  res.status(201).json({
    status: 201,
    message: 'Successfully created a contact!',
    data: student,
  });
};

export const patchContactController = async (req, res) => {
  const { contactId } = req.params;
  const { user } = req;
  const result = await updateContact(contactId, req.body, user._id);

  if (!result) {
    throw createHttpError(404, 'Contact not found');
  }

  res.json({
    status: 200,
    message: `Successfully patched a contact!`,
    data: result.student,
  });
};

export const deleteContactController = async (req, res) => {
  const { contactId } = req.params;
  const { user } = req;

  const contact = await deleteContact(contactId, user._id);

  if (!contact) {
    throw createHttpError(404, 'Contact not found');
  }

  res.status(204).send();
};
