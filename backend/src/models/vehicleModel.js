import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const vehicleSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: uuidv4,
    },
    LicensePlate: {
      type: String,
      required: true,
    },
    HouseHoldID: {
      type: String,
      ref: "HouseHold", // Tham chiếu đến HouseHold
      required: true,
    },
    VehicleType: {
      type: String,
      enum: ["Car", "motorcycle", "bicycle"], // Ví dụ các giá trị enum
      required: true,
    },
  },
  { timestamps: true }
);
const Vehicle = mongoose.model("Vehicle", vehicleSchema);
const create = async (data) => {
  try {
    const vehicle = new Vehicle(data);
    await vehicle.save();
    return vehicle;
  } catch (error) {
    throw new Error("Error creating vehicle");
  }
};
export { Vehicle, create };
