import { householdApi } from './api';

// Household APIs
export const createHousehold = async (data) => {
    const response = await householdApi.createHousehold(data);
    return response.data;
  };
  
  export const getHousehold = async (id) => {
    const response = await householdApi.getHousehold(id);
    return response.data;
  };
  
  export const updateHousehold = async (id, data) => {
    const response = await householdApi.updateHousehold(id, data);
    return response.data;
  };
  
  export const deleteHousehold = async (id) => {
    const response = await householdApi.deleteHousehold(id);
    return response.data;
  };
  
  export const getAllHouseholds = async () => {
    const response = await householdApi.getAllHouseholds();
    return response.data;
  };
  