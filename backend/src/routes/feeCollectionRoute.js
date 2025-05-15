import { Router } from "express";
import { StatusCodes } from "http-status-codes";
import { feeCollectionController } from "../controllers/feeCollectionController.js";
import { feeCollectionValidation } from "../validation/feeCollectionValidation.js";
import { authMiddleware, authRoles } from "../middlewares/auth.js";
const router = Router();
router.get("/", (req, res) => {
  res.status(StatusCodes.OK).json({
    message: "Welcome to the Fee Collection API",
  });
});
router.post(
  "/create",
  authMiddleware,
  authRoles("accountant"),
  feeCollectionValidation.createFeeCollection,
  feeCollectionController.createFeeCollection
);
router.get(
  "/:id",
  authMiddleware,
  authRoles("accountant"),
  feeCollectionController.readFeeCollection
);
router.delete(
  "/:id",
  authMiddleware,
  authRoles("accountant"),
  feeCollectionController.removeFeeCollection
);
router.put(
  "/:id",
  authMiddleware,
  authRoles("accountant"),
  feeCollectionValidation.updateFeeCollection,
  feeCollectionController.updateFeeCollection
);
export const feeCollectionRoute = router;
