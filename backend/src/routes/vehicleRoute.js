import { Router } from "express";
import { StatusCodes } from "http-status-codes";
import { vehicleValidation } from "../validation/vehicleValidation.js";
import { vehicleController } from "../controllers/vehicleController.js";

const router = Router();
router.get("/", (req, res) => {
  res.status(StatusCodes.OK).json({
    message: "Welcome to the Vehicle API",
  });
});
router.post(
  "/create",
  vehicleValidation.createVehicle,
  vehicleController.createVehicle
);
export const vehicleRoute = router;
