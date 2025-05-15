import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";
const residentSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: uuidv4,
    },
    Name: {
      type: String,
      required: true,
    },
    CID: {
      type: String,
      required: true,
      unique: true,
    },
    DateOfBirth: Date,
    Gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
    },
    HouseHoldID: {
      type: [String],
      ref: "HouseHold", // Tham chiếu đến HouseHold
      required: true,
    },
    AccountID: {
      type: String,
      ref: "Account",
      required: true,
    },
    Occupation: String,
    Status: {
      type: String,
      enum: ["Temporary", "Permanent", "Moved", "Dead"],
    },
    PhoneNumber: {
      type: String,
      required: true,
    },
    HouseHoldRelation: {
      type: String,
      required: true,
    },
  },

  { timestamps: true }
);

const Resident = mongoose.model("Resident", residentSchema);
const create = async (data) => {
  try {
    const resident = new Resident(data);
    await resident.save();
    return resident;
  } catch (error) {
    throw new Error("Error creating resident");
  }
};
const read = async (id) => {
  try {
    const resident = await Resident.findById(id);
    if (!resident) {
      throw new Error("Resident not found");
    }
    return resident;
  } catch (error) {
    throw new Error("Error reading resident");
  }
};
const remove = async (id) => {
  try {
    const resident = await Resident.findByIdAndDelete(id);
    if (!resident) {
      throw new Error("Resident not found");
    }
    return resident;
  } catch (error) {
    throw new Error("Error deleting resident");
  }
};
const update = async (id, data) => {
  try {
    const resident = await Resident.findByIdAndUpdate(id, data, {
      new: true,
    });
    if (!resident) {
      throw new Error("Resident not found");
    }
    return resident;
  } catch (error) {
    throw new Error("Error updating resident");
  }
};
export { Resident, create, read, remove, update };
