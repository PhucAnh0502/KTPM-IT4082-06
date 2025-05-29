import { feeApi } from './api';
// Fee APIs
export const createFee = async (data) => {
    const response = await feeApi.createFee(data);
    return response.data;
  };
  
  export const getFee = async (id) => {
    const response = await feeApi.getFee(id);
    return response.data;
  };
  
  export const updateFee = async (id, data) => {
    const response = await feeApi.updateFee(id, data);
    return response.data;
  };
  
  export const deleteFee = async (id) => {
    const response = await feeApi.deleteFee(id);
    return response.data;
  };
  
  export const getAllFees = async () => {
    const response = await feeApi.getAllFees();
    return response.data;
  };
  