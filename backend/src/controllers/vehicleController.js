import { vehicleService } from "../services/vehicleService.js";
import { StatusCodes } from "http-status-codes";

const createVehicle = async (req, res, next) => {
  try {
    const createdVehicle = await vehicleService.createVehicle(req.body);
    res.status(StatusCodes.CREATED).json({
      message: "Vehicle created successfully",
      vehicle: createdVehicle,
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Error creating vehicle",
      error: error.message,
    });
  }
};
const readVehicle = async (req, res, next) => {
  try {
    const vehicle = await vehicleService.readVehicle(req.params.id);
    if (vehicle.status) {
      return res.status(vehicle.status).json({
        message: vehicle.message,
        error: vehicle.error,
      });
    }
    res.status(StatusCodes.OK).json({
      message: "Vehicle retrieved successfully",
      vehicle,
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Error retrieving vehicle",
      error: error.message,
    });
  }
};
const removeVehicle = async (req, res, next) => {
  try {
    const removedVehicle = await vehicleService.removeVehicle(req.params.id);
    if (removedVehicle.status) {
      return res.status(removedVehicle.status).json({
        message: removedVehicle.message,
        error: removedVehicle.error,
      });
    }
    res.status(StatusCodes.OK).json({
      message: "Vehicle removed successfully",
      vehicle: removedVehicle,
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Error removing vehicle",
      error: error.message,
    });
  }
};
const updateVehicle = async (req, res, next) => {
  try {
    const vehicle = await vehicleService.updateVehicle(req.params.id, req.body);
    if (vehicle.status) {
      return res.status(vehicle.status).json({
        message: vehicle.message,
        error: vehicle.error,
      });
    }
    res.status(StatusCodes.OK).json({
      message: "Vehicle updated successfully",
      vehicle,
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Error updating vehicle",
      error: error.message,
    });
  }
};
const getAllVehicles = async (req, res, next) => {
  try {
    const vehicles = await vehicleService.getAllVehicles();
    if (vehicles.status) {
      return res.status(vehicles.status).json({
        message: vehicles.message,
        error: vehicles.error,
      });
    }
    res.status(StatusCodes.OK).json({
      message: "Vehicles retrieved successfully",
      vehicles,
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Error retrieving vehicles",
      error: error.message,
    });
  }
};
export const vehicleController = {
  createVehicle,
  readVehicle,
  removeVehicle,
  updateVehicle,
  getAllVehicles,
  // more
};
