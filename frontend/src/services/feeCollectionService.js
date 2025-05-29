import { feeCollectionApi } from './api';
// Fee Collection APIs
export const createFeeCollection = async (data) => {
    const response = await feeCollectionApi.createFeeCollection(data);
    return response.data;
  };
  
  export const getFeeCollection = async (id) => {
    const response = await feeCollectionApi.getFeeCollection(id);
    return response.data;
  };
  
  export const updateFeeCollection = async (id, data) => {
    const response = await feeCollectionApi.updateFeeCollection(id, data);
    return response.data;
  };
  
  export const deleteFeeCollection = async (id) => {
    const response = await feeCollectionApi.deleteFeeCollection(id);
    return response.data;
  };
  
  export const getAllFeeCollections = async () => {
    const response = await feeCollectionApi.getAllFeeCollections();
    return response.data;
  };