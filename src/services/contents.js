import { ContentCollection } from '../db/models/Content.js';

export const getAllContents = async () => {
  return await ContentCollection.find();
};
