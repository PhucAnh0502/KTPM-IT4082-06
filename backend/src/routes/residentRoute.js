import express from "express";
import { Router } from "express";
import { StatusCodes } from "http-status-codes";
import { residentValidation } from "../validation/residentValidation.js";
import { residentController } from "../controllers/residentController.js";
import { authMiddleware, authRoles } from "../middlewares/auth.js";
const router = Router();

router.get("/", (req, res) => {
  res.status(StatusCodes.OK).json({
    message: "Welcome to the Resident API",
  });
});
router.post(
  "/create",
  authMiddleware,
  authRoles("leader"),
  residentValidation.createResident,
  residentController.createResident
);
router.get(
  "/:id",
  authMiddleware,
  authRoles("leader"),
  residentController.readResident
);
router.put(
  "/:id",
  authMiddleware,
  authRoles("leader"),
  residentValidation.updateResident,
  residentController.updateResident
);
router.delete(
  "/:id",
  authMiddleware,
  authRoles("leader"),
  residentController.removeResident
);
export const residentRoute = router;
