import { create, read, remove, update } from "../models/houseHoldModel.js";

const createHouseHold = async (data) => {
  try {
    const newHouseHold = {
      ...data,
    };
    const createdHouseHold = await create(newHouseHold);
    return createdHouseHold;
  } catch (error) {
    return {
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      message: "Error creating household",
      error: error.message,
    };
  }
};
const readHouseHold = async (id) => {
  try {
    const houseHold = await read(id);
    if (!houseHold) {
      return {
        status: StatusCodes.NOT_FOUND,
        message: "Household not found",
      };
    }
    return houseHold;
  } catch (error) {
    return {
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      message: "Error reading household",
      error: error.message,
    };
  }
};
const removeHouseHold = async (id) => {
  try {
    const houseHold = await remove(id);
    if (!houseHold) {
      return {
        status: StatusCodes.NOT_FOUND,
        message: "Household not found",
      };
    }
    return houseHold;
  } catch (error) {
    return {
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      message: "Error deleting household",
      error: error.message,
    };
  }
};
const updateHouseHold = async (id, data) => {
  try {
    const houseHold = await update(id, data);
    if (!houseHold) {
      return {
        status: StatusCodes.NOT_FOUND,
        message: "Household not found",
      };
    }
    return houseHold;
  } catch (error) {
    return {
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      message: "Error updating household",
      error: error.message,
    };
  }
};
export const houseHoldService = {
  createHouseHold,
  readHouseHold,
  removeHouseHold,
  updateHouseHold,
  // more
};
