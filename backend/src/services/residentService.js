import {
  create,
  read,
  remove,
  update,
  getAll,
} from "../models/residentModel.js";
import { create as createAccount } from "../models/accountModel.js";
const createResident = async (data) => {
  try {
    const name = data.Name.replace(/\s+/g, "");
    const newAccount = {
      Email: `${name}@bluemoon.com`,
      Password: 123456,
      Role: data.Role || "resident", // Default role is 'resident'
    };
    const account = await createAccount(newAccount);
    const newResident = {
      ...data,
      AccountID: account._id, // Link the resident to the account
    };
    const createdResident = await create(newResident);
    console.log("createdResident : ", createdResident);
    return createdResident;
  } catch (error) {
    return {
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      message: "Error creating resident",
      error: error.message,
    };
  }
};
const readResident = async (id) => {
  try {
    const resident = await read(id);
    if (!resident) {
      return {
        status: StatusCodes.NOT_FOUND,
        message: "Resident not found",
      };
    }
    return resident;
  } catch (error) {
    return {
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      message: "Error reading resident",
      error: error.message,
    };
  }
};
const removeResident = async (id) => {
  try {
    const resident = await remove(id);
    if (!resident) {
      return {
        status: StatusCodes.NOT_FOUND,
        message: "Resident not found",
      };
    }
    return resident;
  } catch (error) {
    return {
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      message: "Error deleting resident",
      error: error.message,
    };
  }
};
const updateResident = async (id, data) => {
  try {
    const resident = await update(id, data);
    if (!resident) {
      return {
        status: StatusCodes.NOT_FOUND,
        message: "Resident not found",
      };
    }
    return resident;
  } catch (error) {
    return {
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      message: "Error updating resident",
      error: error.message,
    };
  }
};
const getAllResidents = async () => {
  try {
    const residents = await getAll();
    if (!residents) {
      return {
        status: StatusCodes.NOT_FOUND,
        message: "No residents found",
      };
    }
    return residents;
  } catch (error) {
    return {
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      message: "Error fetching residents",
      error: error.message,
    };
  }
};

export const residentService = {
  createResident,
  readResident,
  removeResident,
  updateResident,
  getAllResidents,
  // more
};
