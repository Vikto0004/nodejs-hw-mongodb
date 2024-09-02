import { ContactCollection } from '../db/models/Contact.js';

export const getAllContacts = async () => {
  const data = await ContactCollection.find();
  console.log(data);

  return data;
};

export const getContactById = async (id) => {
  return await ContactCollection.findById(id);
};
