import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const feeCollectionSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: uuidv4,
  },
  Fees: [
    {
      type: [String],
      required: true,
    },
  ],
  CreateDate: {
    type: Date,
    default: Date.now,
  },
  DueDate: {
    type: Date,
    required: true,
  },
});
const FeeCollection = mongoose.model("FeeCollection", feeCollectionSchema);
const create = async (data) => {
  try {
    const feeCollection = new FeeCollection(data);
    await feeCollection.save();
    return feeCollection;
  } catch (error) {
    throw new Error("Error creating feeCollection");
  }
};
const read = async (id) => {
  try {
    const feeCollection = await FeeCollection.findById(id);
    if (!feeCollection) {
      throw new Error("FeeCollection not found");
    }
    return feeCollection;
  } catch (error) {
    throw new Error("Error reading feeCollection");
  }
};
const remove = async (id) => {
  try {
    const feeCollection = await FeeCollection.findByIdAndDelete(id);
    if (!feeCollection) {
      throw new Error("FeeCollection not found");
    }
    return feeCollection;
  } catch (error) {
    throw new Error("Error deleting feeCollection");
  }
};
const update = async (id, data) => {
  try {
    const feeCollection = await FeeCollection.findByIdAndUpdate(id, data, {
      new: true,
    });
    if (!feeCollection) {
      throw new Error("FeeCollection not found");
    }
    return feeCollection;
  } catch (error) {
    throw new Error("Error updating feeCollection");
  }
};
export { FeeCollection, create, read, remove, update };
