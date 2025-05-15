import { feeCollectionService } from "../services/feeCollectionService.js";

const createFeeCollection = async (req, res, next) => {
  try {
    const createdFeeCollection = await feeCollectionService.createFeeCollection(
      req.body
    );
    res.status(201).json({
      message: "Fee collection created successfully",
      feeCollection: createdFeeCollection,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error creating fee collection",
      error: error.message,
    });
  }
};
const readFeeCollection = async (req, res, next) => {
  try {
    const feeCollection = await feeCollectionService.readFeeCollection(
      req.params.id
    );
    if (feeCollection.status) {
      return res.status(feeCollection.status).json({
        message: feeCollection.message,
        error: feeCollection.error,
      });
    }
    res.status(200).json({
      message: "Fee collection retrieved successfully",
      feeCollection,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving fee collection",
      error: error.message,
    });
  }
};
const removeFeeCollection = async (req, res, next) => {
  try {
    const removedFeeCollection = await feeCollectionService.removeFeeCollection(
      req.params.id
    );
    if (removedFeeCollection.status) {
      return res.status(removedFeeCollection.status).json({
        message: removedFeeCollection.message,
        error: removedFeeCollection.error,
      });
    }
    res.status(200).json({
      message: "Fee collection removed successfully",
      feeCollection: removedFeeCollection,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error removing fee collection",
      error: error.message,
    });
  }
};
const updateFeeCollection = async (req, res, next) => {
  try {
    const updatedFeeCollection = await feeCollectionService.updateFeeCollection(
      req.params.id,
      req.body
    );
    if (updatedFeeCollection.status) {
      return res.status(updatedFeeCollection.status).json({
        message: updatedFeeCollection.message,
        error: updatedFeeCollection.error,
      });
    }
    res.status(200).json({
      message: "Fee collection updated successfully",
      feeCollection: updatedFeeCollection,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error updating fee collection",
      error: error.message,
    });
  }
};
export const feeCollectionController = {
  createFeeCollection,
  readFeeCollection,
  removeFeeCollection,
  updateFeeCollection,
};
