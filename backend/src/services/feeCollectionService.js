import { create, read, remove, update } from "../models/feeCollectionModel.js";

const createFeeCollection = async (data) => {
  try {
    const newFeeCollection = {
      ...data,
    };
    const createdFeeCollection = await create(newFeeCollection);
    return createdFeeCollection;
  } catch (error) {
    return {
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      message: "Error creating fee collection",
      error: error.message,
    };
  }
};
const readFeeCollection = async (id) => {
  try {
    const feeCollection = await read(id);
    if (!feeCollection) {
      return {
        status: StatusCodes.NOT_FOUND,
        message: "Fee collection not found",
      };
    }
    return feeCollection;
  } catch (error) {
    return {
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      message: "Error reading fee collection",
      error: error.message,
    };
  }
};
const removeFeeCollection = async (id) => {
  try {
    const feeCollection = await remove(id);
    if (!feeCollection) {
      return {
        status: StatusCodes.NOT_FOUND,
        message: "Fee collection not found",
      };
    }
    return feeCollection;
  } catch (error) {
    return {
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      message: "Error deleting fee collection",
      error: error.message,
    };
  }
};
const updateFeeCollection = async (id, data) => {
  try {
    const feeCollection = await update(id, data);
    if (!feeCollection) {
      return {
        status: StatusCodes.NOT_FOUND,
        message: "Fee collection not found",
      };
    }
    return feeCollection;
  } catch (error) {
    return {
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      message: "Error updating fee collection",
      error: error.message,
    };
  }
};
export const feeCollectionService = {
  createFeeCollection,
  readFeeCollection,
  removeFeeCollection,
  updateFeeCollection,
};
