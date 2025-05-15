import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";
const payFeeSchema = new mongoose.Schema(
  {
    FeeID: {
      type: String,
      ref: "Fee", // Tham chiếu đến Fee
      required: true,
    },
    HouseHoldID: {
      type: String,
      ref: "HouseHold", // Tham chiếu đến HouseHold
      required: true,
    },
    Amount: {
      type: Number,
      required: true,
    },
    PayDate: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);
payFeeSchema.index({ FeeID: 1, HouseHoldID: 1 }, { unique: true }); // Đảm bảo rằng mỗi cặp FeeID và HouseHoldID là duy nhất
const PayFee = mongoose.model("PayFee", payFeeSchema);
const create = async (data) => {
  try {
    const payFee = new PayFee(data);
    await payFee.save();
    return payFee;
  } catch (error) {
    throw new Error("Error creating payFee");
  }
};
const read = async (id) => {
  try {
    const payFee = await PayFee.findById(id);
    if (!payFee) {
      throw new Error("PayFee not found");
    }
    return payFee;
  } catch (error) {
    throw new Error("Error reading payFee");
  }
};
const remove = async (id) => {
  try {
    const payFee = await PayFee.findByIdAndDelete(id);
    if (!payFee) {
      throw new Error("PayFee not found");
    }
    return payFee;
  } catch (error) {
    throw new Error("Error deleting payFee");
  }
};
const update = async (id, data) => {
  try {
    const payFee = await PayFee.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
    if (!payFee) {
      throw new Error("PayFee not found");
    }
    return payFee;
  } catch (error) {
    throw new Error("Error updating payFee");
  }
};
export { PayFee, create, read, remove, update };
