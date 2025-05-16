import { create, read, remove, update, getAll } from "../models/payFeeModel.js";
import { StatusCodes } from "http-status-codes";

const createPayFee = async (data) => {
  try {
    const newPayFee = {
      ...data,
    };
    const createdPayFee = await create(newPayFee);
    return createdPayFee;
  } catch (error) {
    return {
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      message: "Error creating pay fee",
      error: error.message,
    };
  }
};
const readPayFee = async (id) => {
  try {
    const payFee = await read(id);
    if (!payFee) {
      return {
        status: StatusCodes.NOT_FOUND,
        message: "Pay fee not found",
      };
    }
    return payFee;
  } catch (error) {
    return {
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      message: "Error reading pay fee",
      error: error.message,
    };
  }
};
const removePayFee = async (id) => {
  try {
    const payFee = await remove(id);
    if (!payFee) {
      return {
        status: StatusCodes.NOT_FOUND,
        message: "Pay fee not found",
      };
    }
    return payFee;
  } catch (error) {
    return {
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      message: "Error deleting pay fee",
      error: error.message,
    };
  }
};
const updatePayFee = async (id, data) => {
  try {
    const payFee = await update(id, data);
    if (!payFee) {
      return {
        status: StatusCodes.NOT_FOUND,
        message: "Pay fee not found",
      };
    }
    return payFee;
  } catch (error) {
    return {
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      message: "Error updating pay fee",
      error: error.message,
    };
  }
};
const getAllPayFees = async () => {
  try {
    const payFees = await getAll();
    return payFees;
  } catch (error) {
    return {
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      message: "Error fetching pay fees",
      error: error.message,
    };
  }
};
export const payFeeService = {
  createPayFee,
  readPayFee,
  removePayFee,
  updatePayFee,
  getAllPayFees,
};
