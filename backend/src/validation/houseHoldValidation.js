import joi from "joi";
import { StatusCodes } from "http-status-codes";

const createHouseHold = async (req, res, next) => {
  const schema = joi.object({
    HouseHoldMember: joi.array().items(joi.string()).required(),
    Area: joi.number().required(),
    Address: joi.string().required(),
    VehicleID: joi.array().items(joi.string()).optional(),
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
const updateHouseHold = async (req, res, next) => {
  const schema = joi.object({
    HouseHoldMember: joi.array().items(joi.string()).optional(),
    Area: joi.number().optional(),
    HouseHoldHeadID: joi.string().optional(),
    Address: joi.string().optional(),
    VehicleID: joi.array().items(joi.string()).optional(),
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

export const houseHoldValidation = {
  createHouseHold,
  updateHouseHold,
  // more
};
