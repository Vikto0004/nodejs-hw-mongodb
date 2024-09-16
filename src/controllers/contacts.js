import createHttpError from 'http-errors';
import {
  createContact,
  deleteContact,
  getAllContacts,
  getContactById,
  updateContact,
} from '../services/contacts.js';

export const getAllContactsContrller = async (req, res) => {
  const data = await getAllContacts();

  res.json({
    status: 200,
    message: 'Successfully found contacts!',
    data: data,
  });
};

export const getContactByIdContrller = async (req, res, next) => {
  const { contactId } = req.params;
  const data = await getContactById(contactId);

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
  const student = await createContact(req.body);

  res.status(201).json({
    status: 201,
    message: 'Successfully created a contact!',
    data: student,
  });
};

export const patchContactController = async (req, res) => {
  const { contactId } = req.params;
  const result = await updateContact(contactId, req.body);

  if (!result) {
    next(createHttpError(404, 'Contact not found'));
    return;
  }

  res.json({
    status: 200,
    message: `Successfully patched a contact!`,
    data: result.student,
  });
};

export const deleteContactController = async (req, res) => {
  const { contactId } = req.params;

  const contact = await deleteContact(contactId);

  if (!contact) {
    next(createHttpError(404, 'Contact not found'));
    return;
  }

  res.status(204).send();
};
