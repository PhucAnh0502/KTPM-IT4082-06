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
      // required: true,
    },
    VehicleType: {
      type: String,
      enum: ["Car", "Motorcycle"], // Ví dụ các giá trị enum
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
const read = async (id) => {
  try {
    const vehicle = await Vehicle.findById(id);
    if (!vehicle) {
      throw new Error("Vehicle not found");
    }
    return vehicle;
  } catch (error) {
    throw new Error("Error reading vehicle");
  }
};
const remove = async (id) => {
  try {
    const vehicle = await Vehicle.findByIdAndDelete(id);
    if (!vehicle) {
      throw new Error("Vehicle not found");
    }
    return vehicle;
  } catch (error) {
    throw new Error("Error deleting vehicle");
  }
};
const update = async (id, data) => {
  try {
    const vehicle = await Vehicle.findByIdAndUpdate(id, data, {
      new: true,
    });
    if (!vehicle) {
      throw new Error("Vehicle not found");
    }
    return vehicle;
  } catch (error) {
    throw new Error("Error updating vehicle");
  }
};
const getAll = async () => {
  try {
    const vehicles = await Vehicle.find();
    return vehicles;
  } catch (error) {
    throw new Error("Error fetching vehicles");
  }
};
export { Vehicle, create, read, remove, update, getAll };
