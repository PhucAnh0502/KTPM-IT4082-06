import { create } from "../models/vehicleModel.js";

const createVehicle = async (data) => {
  try {
    console.log("Creating vehicle with data:", data);
    const newVehicle = {
      ...data,
    };
    const createdVehicle = await create(newVehicle);
    return createdVehicle;
  } catch (error) {
    throw new Error("Error creating vehicle on service");
  }
};
export const vehicleService = {
  createVehicle,
  // more
};
