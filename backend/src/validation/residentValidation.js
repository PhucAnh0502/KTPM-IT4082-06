//joi
import Joi from "joi";
import { StatusCodes } from "http-status-codes";

const createResident = async (req, res, next) => {
  const schema = Joi.object({
    Name: Joi.string().required(),
    CID: Joi.string().required(),
    DateOfBirth: Joi.date(),
    Gender: Joi.string().valid("Male", "Female", "Other").default("Other"),
    HouseHoldID: Joi.array().items(Joi.string()).required(),
    AccountID: Joi.string().required(),
    Occupation: Joi.string(),
    Status: Joi.string().valid("Temporary", "Permanent", "Moved", "Dead"),
    PhoneNumber: Joi.string().required(),
    HouseHoldRelation: Joi.string().required(),
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
const updateResident = async (req, res, next) => {
  const schema = Joi.object({
    Name: Joi.string().optional(),
    CID: Joi.string().optional(),
    DateOfBirth: Joi.date().optional(),
    Gender: Joi.string().valid("Male", "Female", "Other").optional(),
    HouseHoldID: Joi.array().items(Joi.string()).optional(),
    AccountID: Joi.string().optional(),
    Occupation: Joi.string().optional(),
    Status: Joi.string()
      .valid("Temporary", "Permanent", "Moved", "Dead")
      .optional(),
    PhoneNumber: Joi.string().optional(),
    HouseHoldRelation: Joi.string().optional(),
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

export const residentValidation = {
  createResident,
  updateResident,
  //more
};
