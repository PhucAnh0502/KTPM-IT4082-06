import { create, read, remove, update, getAll } from "../models/feeModel.js";

const createFee = async (data) => {
  try {
    const newFee = {
      ...data,
    };
    const createdFee = await create(newFee);
    return createdFee;
  } catch (error) {
    return {
      status: 500,
      message: "Error creating fee",
      error: error.message,
    };
  }
};
const readFee = async (id) => {
  try {
    const fee = await read(id);
    if (!fee) {
      return {
        status: 404,
        message: "Fee not found",
      };
    }
    return fee;
  } catch (error) {
    return {
      status: 500,
      message: "Error reading fee",
      error: error.message,
    };
  }
};
const removeFee = async (id) => {
  try {
    const fee = await remove(id);
    if (!fee) {
      return {
        status: 404,
        message: "Fee not found",
      };
    }
    return fee;
  } catch (error) {
    return {
      status: 500,
      message: "Error deleting fee",
      error: error.message,
    };
  }
};
const updateFee = async (id, data) => {
  try {
    const fee = await update(id, data);
    if (!fee) {
      return {
        status: 404,
        message: "Fee not found",
      };
    }
    return fee;
  } catch (error) {
    return {
      status: 500,
      message: "Error updating fee",
      error: error.message,
    };
  }
};
const getAllFees = async () => {
  try {
    const fees = await getAll();
    return fees;
  } catch (error) {
    return {
      status: 500,
      message: "Error fetching fees",
      error: error.message,
    };
  }
};
export const feeService = {
  createFee,
  readFee,
  removeFee,
  updateFee,
  getAllFees,
};
