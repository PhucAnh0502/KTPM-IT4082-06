import Joi from "joi";

const createFee = async (req, res, next) => {
  const schema = Joi.object({
    FeeType: Joi.string()
      .valid("water", "electricity", "maintenance", "other")
      .required(),
    Description: Joi.string().required(),
    feeName: Joi.string().required(),
    FeeCollectionID: Joi.string().required(),
  });

  try {
    await schema.validateAsync(req.body);
    next();
  } catch (error) {
    res.status(400).json({
      message: "Validation failed",
      error: new Error(error).message,
    });
  }
};
const updateFee = async (req, res, next) => {
  const schema = Joi.object({
    FeeType: Joi.string()
      .valid("water", "electricity", "maintenance", "other")
      .optional(),
    Description: Joi.string().optional(),
    feeName: Joi.string().optional(),
    FeeCollectionID: Joi.string().optional(),
  });

  try {
    await schema.validateAsync(req.body);
    next();
  } catch (error) {
    res.status(400).json({
      message: "Validation failed",
      error: new Error(error).message,
    });
  }
};
export const feeValidation = {
  createFee,
  updateFee,
  // more
};
