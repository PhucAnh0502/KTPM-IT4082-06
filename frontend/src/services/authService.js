import { accountApi } from './api';

// Auth APIs
export const login = async (data) => {
  const response = await accountApi.login(data);
  return response.data;
};

export const register = async (data) => {
  const response = await accountApi.register(data);
  return response.data;
};

export const changePassword = async (data) => {
  const response = await accountApi.changePassword(data);
  return response.data;
};
