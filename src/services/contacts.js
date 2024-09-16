import { ContactCollection } from '../db/models/Contact.js';

export const getAllContacts = async () => {
  return await ContactCollection.find();
};

export const getContactById = async (id) => {
  return await ContactCollection.findById(id);
};

export const updateContact = async (contactId, payload, options = {}) => {
  const rawResult = await ContactCollection.findOneAndUpdate(
    { _id: contactId },
    payload,
    {
      new: true,
      includeResultMetadata: true,
      ...options,
    },
  );

  if (!rawResult || !rawResult.value) return null;

  return {
    student: rawResult.value,
    isNew: Boolean(rawResult?.lastErrorObject?.upserted),
  };
};

export const createContact = async (payload) => {
  const student = await ContactCollection.create(payload);
  return student;
};

export const deleteContact = async (contactId) => {
  const contact = await ContactCollection.findOneAndDelete({
    _id: contactId,
  });

  return contact;
};
