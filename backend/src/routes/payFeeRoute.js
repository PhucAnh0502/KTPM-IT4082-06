import { Router } from "express";

import { payFeeController } from "../controllers/payFeeController.js";
import { payFeeValidation } from "../validation/payFeeValidation.js";
import { authMiddleware, authRoles } from "../middlewares/auth.js";

const router = Router();

router.post(
  "/create",
  authMiddleware,
  authRoles("accountant"),
  payFeeValidation.createPayFee,
  payFeeController.createPayFee
);
router.get(
  "/:id",
  authMiddleware,
  authRoles("accountant"),
  payFeeController.readPayFee
);
router.delete(
  "/:id",
  authMiddleware,
  authRoles("accountant"),
  payFeeController.removePayFee
);
router.put(
  "/:id",
  authMiddleware,
  authRoles("accountant"),
  payFeeValidation.updatePayFee,
  payFeeController.updatePayFee
);
export const payFeeRoute = router;
