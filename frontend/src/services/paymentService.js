import { paymentApi } from './api';
// Payment APIs
export const createPayment = async (data) => {
    const response = await paymentApi.createPayment(data);
    return response.data;
  };
  
  export const getPayment = async (id) => {
    const response = await paymentApi.getPayment(id);
    return response.data;
  };
  
  export const updatePayment = async (id, data) => {
    const response = await paymentApi.updatePayment(id, data);
    return response.data;
  };
  
  export const deletePayment = async (id) => {
    const response = await paymentApi.deletePayment(id);
    return response.data;
  };
  
  export const getAllPayments = async () => {
    const response = await paymentApi.getAllPayments();
    return response.data;
  };