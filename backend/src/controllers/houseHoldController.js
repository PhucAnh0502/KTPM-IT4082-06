import { houseHoldService } from "../services/houseHoldService.js";
import { StatusCodes } from "http-status-codes";

const createHouseHold = async (req, res, next) => {
  try {
    const createdHouseHold = await houseHoldService.createHouseHold(req.body);
    res.status(StatusCodes.CREATED).json({
      message: "Household created successfully",
      houseHold: createdHouseHold,
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Error creating household",
      error: error.message,
    });
  }
};
const readHouseHold = async (req, res, next) => {
  try {
    const houseHold = await houseHoldService.readHouseHold(req.params.id);
    if (houseHold.status) {
      return res.status(houseHold.status).json({
        message: houseHold.message,
        error: houseHold.error,
      });
    }
    res.status(StatusCodes.OK).json({
      message: "Household retrieved successfully",
      houseHold,
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Error retrieving household",
      error: error.message,
    });
  }
};
const removeHouseHold = async (req, res, next) => {
  try {
    console.log("removeHouseHold", req.params.id);
    const removedHouseHold = await houseHoldService.removeHouseHold(
      req.params.id
    );
    if (removedHouseHold.status) {
      return res.status(removedHouseHold.status).json({
        message: removedHouseHold.message,
        error: removedHouseHold.error,
      });
    }
    res.status(StatusCodes.OK).json({
      message: "Household removed successfully",
      houseHold: removedHouseHold,
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Error removing household",
      error: error.message,
    });
  }
};
const updateHouseHold = async (req, res, next) => {
  try {
    const updatedHouseHold = await houseHoldService.updateHouseHold(
      req.params.id,
      req.body
    );
    if (updatedHouseHold.status) {
      return res.status(updatedHouseHold.status).json({
        message: updatedHouseHold.message,
        error: updatedHouseHold.error,
      });
    }
    res.status(StatusCodes.OK).json({
      message: "Household updated successfully",
      houseHold: updatedHouseHold,
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Error updating household",
      error: error.message,
    });
  }
};
const getAllHouseHolds = async (req, res, next) => {
  try {
    console.log("getAllHouseHolds");
    const houseHolds = await houseHoldService.getAllHouseHolds();
    res.status(StatusCodes.OK).json({
      message: "Households retrieved successfully",
      houseHolds,
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Error retrieving households  ??",
      error: error.message,
    });
  }
};
export const houseHoldController = {
  createHouseHold,
  readHouseHold,
  removeHouseHold,
  updateHouseHold,
  getAllHouseHolds,
  // more
};
