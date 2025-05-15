import { create, read, remove, update } from "../models/residentModel.js";

const createResident = async (data) => {
  try {
    const newResident = {
      ...data,
    };
    const createdResident = await create(newResident);
    console.log("createdResident : ", createdResident);
    return createdResident;
  } catch (error) {
    return {
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      message: "Error creating resident",
      error: error.message,
    };
  }
};
const readResident = async (id) => {
  try {
    const resident = await read(id);
    if (!resident) {
      return {
        status: StatusCodes.NOT_FOUND,
        message: "Resident not found",
      };
    }
    return resident;
  } catch (error) {
    return {
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      message: "Error reading resident",
      error: error.message,
    };
  }
};
const removeResident = async (id) => {
  try {
    const resident = await remove(id);
    if (!resident) {
      return {
        status: StatusCodes.NOT_FOUND,
        message: "Resident not found",
      };
    }
    return resident;
  } catch (error) {
    return {
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      message: "Error deleting resident",
      error: error.message,
    };
  }
};
const updateResident = async (id, data) => {
  try {
    const resident = await update(id, data);
    if (!resident) {
      return {
        status: StatusCodes.NOT_FOUND,
        message: "Resident not found",
      };
    }
    return resident;
  } catch (error) {
    return {
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      message: "Error updating resident",
      error: error.message,
    };
  }
};

export const residentService = {
  createResident,
  readResident,
  removeResident,
  updateResident,
  // more
};
