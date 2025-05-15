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
export const vehicleController = {
  createVehicle,
  // more
};
