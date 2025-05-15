import e from "express";
import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const feeSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: uuidv4,
    },
    FeeType: {
      type: String,
      enum: ["water", "electricity", "maintenance", "other"], // Ví dụ các giá trị enum
      default: "other", // Giá trị mặc định
      required: true,
    },
    Description: {
      type: String,
      required: true,
    },
    feeName: {
      type: String,
      required: true,
    },
    FeeCollectionID: {
      type: String,
      ref: "FeeCollection", // Tham chiếu đến FeeCollection
      required: true,
    },
  },
  { timestamps: true }
);
const Fee = mongoose.model("Fee", feeSchema);
const create = async (data) => {
  try {
    const fee = new Fee(data);
    await fee.save();
    return fee;
  } catch (error) {
    throw new Error("Error creating fee");
  }
};
const read = async (id) => {
  try {
    const fee = await Fee.findById(id);
    if (!fee) {
      throw new Error("Fee not found");
    }
    return fee;
  } catch (error) {
    throw new Error("Error reading fee");
  }
};
const update = async (id, data) => {
  try {
    const fee = await Fee.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
    if (!fee) {
      throw new Error("Fee not found");
    }
    return fee;
  } catch (error) {
    throw new Error("Error updating fee");
  }
};
const remove = async (id) => {
  try {
    const fee = await Fee.findByIdAndDelete(id);
    if (!fee) {
      throw new Error("Fee not found");
    }
    return fee;
  } catch (error) {
    throw new Error("Error deleting fee");
  }
};
export { Fee, create, read, update, remove };
