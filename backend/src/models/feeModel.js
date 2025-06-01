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
      enum: [
        "service", // Phí dịch vụ chung cư
        "management", // Phí quản lý chung cư
        "water", // Phí nước
        "electricity", // Phí điện
        "maintenance", // Phí bảo trì
        "internet", // Phí internet
        "vehicle_fee", // Phí gửi xe (gộp chung xe máy & ô tô)
        "sanitation", // Phí vệ sinh
        "donation", // Khoản đóng góp tự nguyện
        "other", // Khác
      ],
      default: "other",
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
    DonationCampaign: {
      type: String,
      required: function () {
        return this.FeeType === "donation";
      },
      // Ví dụ: "Ủng hộ ngày thương binh- liệt sỹ 27/07"
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
const getAll = async () => {
  try {
    const fees = await Fee.find();
    return fees;
  } catch (error) {
    throw new Error("Error fetching fees");
  }
};
export { Fee, create, read, update, remove, getAll };
