import joi from "joi";
import { StatusCodes } from "http-status-codes";

const createVehicle = async (req, res, next) => {
  const schema = joi.object({
    LicensePlate: joi.string().required(),
    HouseHoldID: joi.string().required(),
    VehicleType: joi.string().valid("Car", "Motorcycle").required(),
  });

  try {
    await schema.validateAsync(req.body);
    next();
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({
      message: "Validation failed",
      error: new Error(error).message,
    });
  }
};
const updateVehicle = async (req, res, next) => {
  const schema = joi.object({
    LicensePlate: joi.string().optional(),
    HouseHoldID: joi.string().optional(),
    VehicleType: joi.string().valid("Car", "Motorcycle").optional(),
  });

  try {
    await schema.validateAsync(req.body);
    next();
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({
      message: "Validation failed",
      error: new Error(error).message,
    });
  }
};
export const vehicleValidation = {
  createVehicle: createVehicle,
  updateVehicle: updateVehicle,
  // more
};
