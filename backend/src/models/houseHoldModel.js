import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";
const houseHoldSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: uuidv4,
    },
    HouseHoldMember: {
      type: [String],
      required: true,
    },
    Area: {
      type: Number,
      required: true,
    },
    HouseHoldHeadID: {
      type: String,
      ref: "Resident",
      required: true,
    },
    Address: {
      type: String,
      required: true,
    },
    VehicleID: {
      type: [String],
      ref: "Vehicle",
      required: false,
    },
  },
  { timestamps: true }
);
const HouseHold = mongoose.model("HouseHold", houseHoldSchema);
const create = async (data) => {
  try {
    const houseHold = new HouseHold(data);
    await houseHold.save();
    return houseHold;
  } catch (error) {
    throw new Error("Error creating houseHold");
  }
};
const read = async (id) => {
  try {
    const houseHold = await HouseHold.findById(id);
    if (!houseHold) {
      throw new Error("HouseHold not found");
    }
    return houseHold;
  } catch (error) {
    throw new Error("Error reading houseHold");
  }
};
const remove = async (id) => {
  try {
    const houseHold = await HouseHold.findByIdAndDelete(id);
    if (!houseHold) {
      throw new Error("HouseHold not found");
    }
    return houseHold;
  } catch (error) {
    throw new Error("Error deleting houseHold");
  }
};
const update = async (id, data) => {
  try {
    const houseHold = await HouseHold.findByIdAndUpdate(id, data, {
      new: true,
    });
    if (!houseHold) {
      throw new Error("HouseHold not found");
    }
    return houseHold;
  } catch (error) {
    throw new Error("Error updating houseHold");
  }
};
const getAll = async () => {
  try {
    const houseHolds = await HouseHold.find();
    return houseHolds;
  } catch (error) {
    throw new Error("Error fetching houseHolds");
  }
};
export { HouseHold, create, read, remove, update, getAll };
