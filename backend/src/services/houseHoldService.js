import {
  create,
  read,
  remove,
  update,
  getAll,
} from "../models/houseHoldModel.js";
import { StatusCodes } from "http-status-codes";

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

const assignHouseHoldHead = async (houseHoldId, headId) => {
  try {
    const houseHold = await update(houseHoldId, { HouseHoldHeadID: headId });
    if (!houseHold) {
      return {
        status: StatusCodes.NOT_FOUND,
        message: "Household not found",
      };
    }
    return {
      status: StatusCodes.OK,
      data: houseHold,
      message: "Household head assigned successfully",
    };
  } catch (error) {
    return {
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      message: "Error assigning household head",
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
const getAllHouseHolds = async () => {
  try {
    const houseHolds = await getAll();
    return houseHolds;
  } catch (error) {
    return {
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      message: "Error fetching households",
      error: error.message,
    };
  }
};
export const houseHoldService = {
  createHouseHold,
  readHouseHold,
  removeHouseHold,
  updateHouseHold,
  getAllHouseHolds,
  assignHouseHoldHead
};
