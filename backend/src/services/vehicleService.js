import {
  create,
  read,
  update,
  remove,
  getAll,
} from "../models/vehicleModel.js";

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
const readVehicle = async (id) => {
  try {
    const vehicle = await read(id);
    if (!vehicle) {
      throw new Error("Vehicle not found");
    }
    return vehicle;
  } catch (error) {
    throw new Error("Error reading vehicle");
  }
};
const removeVehicle = async (id) => {
  try {
    const vehicle = await remove(id);
    if (!vehicle) {
      throw new Error("Vehicle not found");
    }
    return vehicle;
  } catch (error) {
    throw new Error("Error deleting vehicle");
  }
};
const updateVehicle = async (id, data) => {
  try {
    const vehicle = await update(id, data);
    if (!vehicle) {
      throw new Error("Vehicle not found");
    }
    return vehicle;
  } catch (error) {
    throw new Error("Error updating vehicle");
  }
};
const getAllVehicles = async () => {
  try {
    const vehicles = await getAll();
    return vehicles;
  } catch (error) {
    throw new Error("Error fetching vehicles");
  }
};
export const vehicleService = {
  createVehicle,
  readVehicle,
  removeVehicle,
  updateVehicle,
  getAllVehicles,
  // more
};
