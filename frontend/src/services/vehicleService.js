import { vehicleApi } from './api';
// Vehicle APIs 
export const createVehicle = async (data) => {
    const response = await vehicleApi.createVehicle(data);
    return response.data;
  };
  
  export const getVehicle = async (id) => {
    const response = await vehicleApi.getVehicle(id);
    return response.data;
  };
  
  export const updateVehicle = async (id, data) => {
    const response = await vehicleApi.updateVehicle(id, data);
    return response.data;
  };
  
  export const deleteVehicle = async (id) => {
    const response = await vehicleApi.deleteVehicle(id);
    return response.data;
  };
  
  export const getAllVehicles = async () => {
    const response = await vehicleApi.getAllVehicles();
    return response.data;
  };
  