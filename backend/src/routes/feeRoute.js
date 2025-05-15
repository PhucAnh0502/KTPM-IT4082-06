import { Router } from "express";
import { feeValidation } from "../validation/feeValidation.js";
import { feeController } from "../controllers/feeController.js";
import { authMiddleware } from "../middlewares/auth.js";
import { authRoles } from "../middlewares/auth.js";

const router = Router();

router.post(
  "/create",
  authMiddleware,
  authRoles("accountant"),
  feeValidation.createFee,
  feeController.createFee
);
router.get(
  "/:id",
  authMiddleware,
  authRoles("accountant"),
  feeController.readFee
);
router.delete(
  "/:id",
  authMiddleware,
  authRoles("accountant"),
  feeController.removeFee
);
router.put(
  "/:id",
  authMiddleware,
  authRoles("accountant"),
  feeValidation.updateFee,
  feeController.updateFee
);
export const feeRoute = router;
