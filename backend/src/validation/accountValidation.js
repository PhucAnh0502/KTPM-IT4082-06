import joi from "joi";
import { StatusCodes } from "http-status-codes";

const createAccountSchema = async (req, res, next) => {
  const schema = joi.object({
    Email: joi
      .string()
      .email({ tlds: { allow: false } }) // Kiểm tra định dạng email
      .required()
      .messages({
        "string.email": "Email không hợp lệ",
        "any.required": "Email là bắt buộc",
      }),
    Password: joi
      .string()
      .min(6) // Mật khẩu ít nhất 6 ký tự
      .required()
      .messages({
        "string.min": "Mật khẩu phải có ít nhất 6 ký tự",
        "any.required": "Mật khẩu là bắt buộc",
      }),
    Role: joi
      .string()
      .valid("admin", "leader", "accountant", "resident") // Chỉ cho phép các giá trị enum
      .required()
      .messages({
        "any.only":
          "Vai trò không hợp lệ, phải là admin, leader hoặc resident hoặc accountant",
        "any.required": "Vai trò là bắt buộc",
      }),
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
const loginAccount = async (req, res, next) => {
  const schema = joi.object({
    Email: joi
      .string()
      .email({ tlds: { allow: false } }) // Kiểm tra định dạng email
      .required()
      .messages({
        "string.email": "Email không hợp lệ",
        "any.required": "Email là bắt buộc",
      }),
    Password: joi
      .string()
      .min(6) // Mật khẩu ít nhất 6 ký tự
      .required()
      .messages({
        "string.min": "Mật khẩu phải có ít nhất 6 ký tự",
        "any.required": "Mật khẩu là bắt buộc",
      }),
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
const changePWAccount = async (req, res, next) => {
  const schema = joi.object({
    oldPassword: joi
      .string()
      .min(6) // Mật khẩu ít nhất 6 ký tự
      .messages({
        "string.min": "Mật khẩu phải có ít nhất 6 ký tự",
      })
      .required(),
    newPassword: joi
      .string()
      .min(6) // Mật khẩu ít nhất 6 ký tự
      .messages({
        "string.min": "Mật khẩu phải có ít nhất 6 ký tự",
      })
      .required(),
    confirmPassword: joi
      .string()
      .valid(joi.ref("newPassword")) // Mật khẩu xác nhận phải giống mật khẩu mới
      .messages({
        "any.only": "Mật khẩu xác nhận không khớp với mật khẩu mới",
      })
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
const updateAccount = async (req, res, next) => {
  const schema = joi.object({
    Email: joi
      .string()
      .email({ tlds: { allow: false } }) // Kiểm tra định dạng email
      .messages({
        "string.email": "Email không hợp lệ",
      })
      .optional(),

    Role: joi
      .string()
      .valid("admin", "leader", "accountant", "resident") // Chỉ cho phép các giá trị enum
      .messages({
        "any.only":
          "Vai trò không hợp lệ, phải là admin, leader hoặc resident hoặc accountant",
      })
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
const forgetPassword = async (req, res, next) => {
  const schema = joi.object({
    Email: joi
      .string()
      .email({ tlds: { allow: false } }) // Kiểm tra định dạng email
      .required()
      .messages({
        "string.email": "Email không hợp lệ",
        "any.required": "Email là bắt buộc",
      }),
    newPassword: joi
      .string()
      .min(6) // Mật khẩu ít nhất 6 ký tự
      .required()
      .messages({
        "string.min": "Mật khẩu phải có ít nhất 6 ký tự",
        "any.required": "Mật khẩu là bắt buộc",
      }),
    confirmPassword: joi
      .string()
      .valid(joi.ref("newPassword")) // Mật khẩu xác nhận phải giống mật khẩu mới
      .required()
      .messages({
        "any.only": "Mật khẩu xác nhận không khớp với mật khẩu mới",
        "any.required": "Mật khẩu xác nhận là bắt buộc",
      }),
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
export const accountValidation = {
  createAccount: createAccountSchema,
  loginAccount,
  changePWAccount,
  updateAccount,
  forgetPassword,
  // more
};
