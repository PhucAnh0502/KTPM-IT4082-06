import { create, read, remove, update, getAll } from "../models/payFeeModel.js";
import { StatusCodes } from "http-status-codes";
import { HouseHold } from "../models/houseHoldModel.js";
import { Vehicle } from "../models/vehicleModel.js";
import { Fee } from "../models/feeModel.js";

// Hàm tính amount cho phí gửi xe
const calculateAmountForVehicleFee = async (houseHoldId) => {
  const household = await HouseHold.findById(houseHoldId);
  if (!household) throw new Error("Household not found");
  const vehicles = await Vehicle.find({ _id: { $in: household.VehicleID } });
  const numBikes = vehicles.filter(
    (v) => v.VehicleType === "motorcycle"
  ).length;
  const numCars = vehicles.filter((v) => v.VehicleType === "Car").length;
  const amount = numBikes * 70000 + numCars * 1200000;
  return {
    amount,
    description: `Xe máy: ${numBikes}, Ô tô: ${numCars}`,
  };
};
const createVehicleFeeForAllHouseholds = async (data) => {
  try {
    const households = await HouseHold.find();
    for (const household of households) {
      const { amount, description } = await calculateAmountForVehicleFee(
        household._id
      );
      const newPayFee = {
        HouseHoldID: household._id,
        FeeID: data.FeeID,
        Amount: amount,
        PayDate: data.PayDate || new Date(),
      };
      const createdPayFee = await create(newPayFee);
    }
    return {
      status: StatusCodes.OK,
      message: "Vehicle fees created for all households",
    };
  } catch (error) {
    return {
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      message: "Error creating vehicle fees for all households",
      error: error.message,
    };
  }
};
const createManegemantFeeForAllHouseholds = async (data) => {
  try {
    const households = await HouseHold.find();
    for (const household of households) {
      const amout = household.Area * 7000;
      const newPayFee = {
        HouseHoldID: household._id,
        FeeID: data.FeeID,
        Amount: amout,
        PayDate: data.PayDate || new Date(),
      };
      const createdPayFee = await create(newPayFee);
    }
    return {
      status: StatusCodes.OK,
      message: "Management fees created for all households",
    };
  } catch (error) {
    return {
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      message: "Error creating management fees for all households",
      error: error.message,
    };
  }
};
const createServiceFeeForAllHouseholds = async (data) => {
  try {
    const households = await HouseHold.find();
    for (const household of households) {
      const amout = 10000 * household.Area; // Default amount if not provided
      const newPayFee = {
        HouseHoldID: household._id,
        FeeID: data.FeeID,
        Amount: amout,
        PayDate: data.PayDate || new Date(),
      };
      const createdPayFee = await create(newPayFee);
    }
    return {
      status: StatusCodes.OK,
      message: "Service fees created for all households",
    };
  } catch (error) {
    return {
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      message: "Error creating service fees for all households",
      error: error.message,
    };
  }
};

const createPayFee = async (data) => {
  try {
    // Lấy thông tin loại phí
    const fee = await Fee.findById(data.FeeID);
    if (!fee) throw new Error("Fee not found");

    // Nếu là phí gửi xe thì tính toán amount
    if (fee.FeeType === "vehicle_fee") {
      const { status, message } = await createVehicleFeeForAllHouseholds(data);
      return { status, message };
    }
    if (fee.FeeType === "management") {
      const { status, message } = await createManegemantFeeForAllHouseholds(
        data
      );
      return { status, message };
    }
    if (fee.FeeType === "service") {
      const { status, message } = await createServiceFeeForAllHouseholds(data);
      return { status, message };
    }
    return true;
  } catch (error) {
    return {
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      message: "Error creating pay fee",
      error: error.message,
    };
  }
};
const readPayFee = async (id) => {
  try {
    const payFee = await read(id);
    if (!payFee) {
      return {
        status: StatusCodes.NOT_FOUND,
        message: "Pay fee not found",
      };
    }
    return payFee;
  } catch (error) {
    return {
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      message: "Error reading pay fee",
      error: error.message,
    };
  }
};
const removePayFee = async (id) => {
  try {
    const payFee = await remove(id);
    if (!payFee) {
      return {
        status: StatusCodes.NOT_FOUND,
        message: "Pay fee not found",
      };
    }
    return payFee;
  } catch (error) {
    return {
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      message: "Error deleting pay fee",
      error: error.message,
    };
  }
};
const updatePayFee = async (id, data) => {
  try {
    const payFee = await update(id, data);
    if (!payFee) {
      return {
        status: StatusCodes.NOT_FOUND,
        message: "Pay fee not found",
      };
    }
    return payFee;
  } catch (error) {
    return {
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      message: "Error updating pay fee",
      error: error.message,
    };
  }
};
const getAllPayFees = async () => {
  try {
    const payFees = await getAll();
    return payFees;
  } catch (error) {
    return {
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      message: "Error fetching pay fees",
      error: error.message,
    };
  }
};
export const payFeeService = {
  createPayFee,
  readPayFee,
  removePayFee,
  updatePayFee,
  getAllPayFees,
};
