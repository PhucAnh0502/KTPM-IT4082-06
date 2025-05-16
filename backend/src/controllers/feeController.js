import { feeService } from "../services/feeService.js";

const createFee = async (req, res, next) => {
  try {
    const createdFee = await feeService.createFee(req.body);
    res.status(201).json({
      message: "Fee created successfully",
      fee: createdFee,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error creating fee",
      error: error.message,
    });
  }
};
const readFee = async (req, res, next) => {
  try {
    const fee = await feeService.readFee(req.params.id);
    if (fee.status) {
      return res.status(fee.status).json({
        message: fee.message,
        error: fee.error,
      });
    }
    res.status(200).json({
      message: "Fee retrieved successfully",
      fee,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving fee",
      error: error.message,
    });
  }
};
const removeFee = async (req, res, next) => {
  try {
    const removedFee = await feeService.removeFee(req.params.id);
    if (removedFee.status) {
      return res.status(removedFee.status).json({
        message: removedFee.message,
        error: removedFee.error,
      });
    }
    res.status(200).json({
      message: "Fee removed successfully",
      fee: removedFee,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error removing fee",
      error: error.message,
    });
  }
};
const updateFee = async (req, res, next) => {
  try {
    const updatedFee = await feeService.updateFee(req.params.id, req.body);
    if (updatedFee.status) {
      return res.status(updatedFee.status).json({
        message: updatedFee.message,
        error: updatedFee.error,
      });
    }
    res.status(200).json({
      message: "Fee updated successfully",
      fee: updatedFee,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error updating fee",
      error: error.message,
    });
  }
};
const getAllFees = async (req, res, next) => {
  try {
    const fees = await feeService.getAllFees();
    res.status(200).json({
      message: "Fees retrieved successfully",
      fees,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving fees",
      error: error.message,
    });
  }
};
export const feeController = {
  createFee,
  readFee,
  removeFee,
  updateFee,
  getAllFees,
};
