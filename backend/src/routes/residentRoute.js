import express from "express";
import { Router } from "express";
import { StatusCodes } from "http-status-codes";
import { residentValidation } from "../validation/residentValidation.js";
import { residentController } from "../controllers/residentController.js";
const router = Router();

router.get("/", (req, res) => {
  res.status(StatusCodes.OK).json({
    message: "Welcome to the Resident API",
  });
});
router.post(
  "/create",
  residentValidation.createResident,
  residentController.residentCreate
);
export const residentRoute = router;
