import { StatusCodes } from "http-status-codes";

const residentCreate = async (req, res, next) => {
  try {
    const { name, phone } = req.body;
    // Simulate saving to the database
    const newResident = { id: Date.now(), name, phone };
    res.status(StatusCodes.CREATED).json({
      message: "Resident created successfully",
      resident: newResident,
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Error creating resident",
      error: error.message,
    });
  }
};
export const residentController = {
  residentCreate,
  // more
};
