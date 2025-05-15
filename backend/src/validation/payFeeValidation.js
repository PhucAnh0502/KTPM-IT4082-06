import Joi from "joi";
import { StatusCodes } from "http-status-codes";

const createPayFee = async (req, res, next) => {
  const schema = Joi.object({
    FeeID: Joi.string().required(),
    HouseHoldID: Joi.string().required(),
    Amount: Joi.number().required(),
    PayDate: Joi.date().default(() => new Date()),
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
const updatePayFee = async (req, res, next) => {
  const schema = Joi.object({
    FeeID: Joi.string().optional(),
    HouseHoldID: Joi.string().optional(),
    Amount: Joi.number().optional(),
    PayDate: Joi.date()
      .default(() => new Date())
      .optional(),
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
export const payFeeValidation = {
  createPayFee,
  updatePayFee,
  // more
};
