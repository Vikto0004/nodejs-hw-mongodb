import { SORT_ORDER } from '../constants/index.js';
import { ContactCollection } from '../db/models/Contact.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';

export const getAllContacts = async (
  { page = 1, perPage = 10, sortOrder = SORT_ORDER.ASC, sortBy = '_id' },
  userId,
) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  const contactsQuery = ContactCollection.find({ userId });
  const contactsCount = await ContactCollection.find({ userId })
    .merge(contactsQuery)
    .countDocuments();

  const contacts = await contactsQuery
    .skip(skip)
    .limit(limit)
    .sort({ [sortBy]: sortOrder })
    .exec();

  const paginationData = calculatePaginationData(contactsCount, perPage, page);

  return {
    data: contacts,
    ...paginationData,
  };
};

export const getContactById = async (id, userId) => {
  return await ContactCollection.findOne({
    _id: id,
    userId: userId,
  });
};

export const updateContact = async (
  contactId,
  payload,
  userId,
  options = {},
) => {
  const rawResult = await ContactCollection.findOneAndUpdate(
    {
      _id: contactId,
      userId,
    },
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

export const createContact = async (payload, userId, photo = '') => {
  const student = await ContactCollection.create({ ...payload, userId, photo });
  return student;
};

export const deleteContact = async (contactId, userId) => {
  const contact = await ContactCollection.findOneAndDelete({
    _id: contactId,
    userId,
  });

  return contact;
};
