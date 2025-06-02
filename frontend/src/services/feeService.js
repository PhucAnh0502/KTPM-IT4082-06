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
  
  // In feeService.js
export const getAllFees = async () => {
    try {
        const response = await fetch('/api/fees'); // Example API call
        const data = await response.json();
        // Ensure data is an array; return empty array if not
        return Array.isArray(data) ? data : [];
    } catch (error) {
        throw new Error('Failed to fetch fees');
    }
};
  