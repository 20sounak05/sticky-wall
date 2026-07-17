import api from './axios';

export const getNotes = async () => {
  const response = await api.get('/notes');
  return response.data;
};

export const createNote = async (noteData) => {
  const response = await api.post('/notes', noteData);
  return response.data;
};

export const claimNote = async (noteId) => {
  const response = await api.patch(`/notes/${noteId}/claim`);
  return response.data;
};

export const resolveNote = async (noteId) => {
  const response = await api.patch(`/notes/${noteId}/resolve`);
  return response.data;
};