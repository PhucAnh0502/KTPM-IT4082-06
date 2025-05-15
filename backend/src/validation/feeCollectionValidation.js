import Joi from "joi";
import { StatusCodes } from "http-status-codes";

const createFeeCollection = async (req, res, next) => {
  console.log("rqest body", req.body);
  const schema = Joi.object({
    Fees: Joi.array().items(Joi.string()).required(),
    CreateDate: Joi.date().default(() => new Date()),
    DueDate: Joi.date().required(),
  });

  try {
    console.log(req.body);
    await schema.validateAsync(req.body);
    next();
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({
      message: "Validation failed",
      error: new Error(error).message,
    });
  }
};
const updateFeeCollection = async (req, res, next) => {
  const schema = Joi.object({
    Fees: Joi.array().items(Joi.string()).optional(),
    CreateDate: Joi.date().default(() => new Date()),
    DueDate: Joi.date().optional(),
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
export const feeCollectionValidation = {
  createFeeCollection,
  updateFeeCollection,
  // more
};
