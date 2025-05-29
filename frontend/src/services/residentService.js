import { residentApi } from './api';

// Resident APIs
export const createResident = async (data) => {
    const response = await residentApi.createResident(data);
    return response.data;
  };
  
  export const getResident = async (id) => {
    const response = await residentApi.getResident(id);
    return response.data;
  };
  
  export const updateResident = async (id, data) => {
    const response = await residentApi.updateResident(id, data);
    return response.data;
  };
  
  export const deleteResident = async (id) => {
    const response = await residentApi.deleteResident(id);
    return response.data;
  };
  
  export const getAllResidents = async () => {
    const response = await residentApi.getAllResidents();
    return response.data;
  };
  