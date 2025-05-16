import { StatusCodes } from "http-status-codes";
import { residentService } from "../services/residentService.js";

const createResident = async (req, res, next) => {
  try {
    const createdResident = await residentService.createResident(req.body);
    res.status(StatusCodes.CREATED).json({
      message: "Resident created successfully",
      resident: createdResident,
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Error creating resident",
      error: error.message,
    });
  }
};
const readResident = async (req, res, next) => {
  try {
    console.log(req.params.id);
    const resident = await residentService.readResident(req.params.id);
    if (resident.status) {
      return res.status(resident.status).json({
        message: resident.message,
        error: resident.error,
      });
    }
    res.status(StatusCodes.OK).json({
      message: "Resident retrieved successfully",
      resident,
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Error retrieving resident",
      error: error.message,
    });
  }
};
const removeResident = async (req, res, next) => {
  try {
    const removedResident = await residentService.removeResident(req.params.id);
    if (removedResident.status) {
      return res.status(removedResident.status).json({
        message: removedResident.message,
        error: removedResident.error,
      });
    }
    res.status(StatusCodes.OK).json({
      message: "Resident removed successfully",
      resident: removedResident,
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Error removing resident",
      error: error.message,
    });
  }
};
const updateResident = async (req, res, next) => {
  try {
    const updatedResident = await residentService.updateResident(
      req.params.id,
      req.body
    );
    if (updatedResident.status) {
      return res.status(updatedResident.status).json({
        message: updatedResident.message,
        error: updatedResident.error,
      });
    }
    res.status(StatusCodes.OK).json({
      message: "Resident updated successfully",
      resident: updatedResident,
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Error updating resident",
      error: error.message,
    });
  }
};
const getAllResidents = async (req, res, next) => {
  try {
    const residents = await residentService.getAllResidents();
    if (residents.status) {
      return res.status(residents.status).json({
        message: residents.message,
        error: residents.error,
      });
    }
    res.status(StatusCodes.OK).json({
      message: "Residents retrieved successfully",
      residents,
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Error retrieving residents",
      error: error.message,
    });
  }
};
export const residentController = {
  createResident,
  readResident,
  removeResident,
  updateResident,
  getAllResidents,
  // more
};
