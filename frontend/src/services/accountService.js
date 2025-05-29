import { accountApi } from './api';

export const updateAccount = async (id, data) => {
    const response = await accountApi.updateAccount(id, data);
    return response.data;
  };
  
  export const deleteAccount = async (id) => {
    const response = await accountApi.deleteAccount(id);
    return response.data;
  };
  
  export const resetPassword = async (data) => {
    const response = await accountApi.resetPassword(data);
    return response.data;
  };
  
  export const getAllAccounts = async () => {
    const response = await accountApi.getAllAccounts();
    return response.data;
  };