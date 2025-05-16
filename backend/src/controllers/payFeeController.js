import { payFeeService } from "../services/payFeeService.js";
import { StatusCodes } from "http-status-codes";

const createPayFee = async (req, res) => {
  try {
    const payFee = await payFeeService.createPayFee(req.body);
    if (payFee.status) {
      return res.status(payFee.status).json({
        message: payFee.message,
        error: payFee.error,
      });
    }
    return res.status(StatusCodes.CREATED).json({
      message: "Pay fee created successfully",
      data: payFee,
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Error creating pay fee",
      error: error.message,
    });
  }
};
const readPayFee = async (req, res) => {
  try {
    const payFee = await payFeeService.readPayFee(req.params.id);
    if (payFee.status) {
      return res.status(payFee.status).json({
        message: payFee.message,
        error: payFee.error,
      });
    }
    return res.status(StatusCodes.OK).json({
      message: "Pay fee retrieved successfully",
      data: payFee,
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Error retrieving pay fee",
      error: error.message,
    });
  }
};
const removePayFee = async (req, res) => {
  try {
    const payFee = await payFeeService.removePayFee(req.params.id);
    if (payFee.status) {
      return res.status(payFee.status).json({
        message: payFee.message,
        error: payFee.error,
      });
    }
    return res.status(StatusCodes.OK).json({
      message: "Pay fee removed successfully",
      data: payFee,
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Error removing pay fee",
      error: error.message,
    });
  }
};
const updatePayFee = async (req, res) => {
  try {
    const payFee = await payFeeService.updatePayFee(req.params.id, req.body);
    if (payFee.status) {
      return res.status(payFee.status).json({
        message: payFee.message,
        error: payFee.error,
      });
    }
    return res.status(StatusCodes.OK).json({
      message: "Pay fee updated successfully",
      data: payFee,
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Error updating pay fee",
      error: error.message,
    });
  }
};
const getAllPayFees = async (req, res) => {
  try {
    const payFees = await payFeeService.getAllPayFees();
    if (payFees.status) {
      return res.status(payFees.status).json({
        message: payFees.message,
        error: payFees.error,
      });
    }
    return res.status(StatusCodes.OK).json({
      message: "Pay fees retrieved successfully",
      data: payFees,
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Error retrieving pay fees",
      error: error.message,
    });
  }
};
export const payFeeController = {
  createPayFee,
  readPayFee,
  removePayFee,
  updatePayFee,
  getAllPayFees,
};
