import api from './axios';

export const signup = async (companyName, name, email, password) => {
  const response = await api.post('/auth/signup', {
    companyName,
    name,
    email,
    password,
  });
  return response.data;
};

export const login = async (email, password) => {
  const response = await api.post('/auth/login', {
    email,
    password,
  });
  return response.data;
};
