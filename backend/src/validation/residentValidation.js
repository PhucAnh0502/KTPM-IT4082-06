//joi
import Joi from "joi";
import { StatusCodes } from "http-status-codes";

const createResident = async (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    phone: Joi.string()
      .pattern(/^[0-9]+$/)
      .length(10)
      .required(),
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
  //more
};
