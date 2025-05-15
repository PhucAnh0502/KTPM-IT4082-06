import { Router } from "express";
import { StatusCodes } from "http-status-codes";
import { accountValidation } from "../validation/accountValidation.js";
import { accountController } from "../controllers/accountController.js";
import { authMiddleware, authRoles } from "../middlewares/auth.js";

const router = Router();
router.get("/", (req, res) => {
  res.status(StatusCodes.OK).json({
    message: "Welcome to the Account API dcm",
  });
});
router.post(
  "/create",
  accountValidation.createAccount,
  accountController.createAccount
);
router.post(
  "/login",
  accountValidation.loginAccount,
  accountController.loginAccount
);
router.post(
  "/change-password",
  authMiddleware,
  accountValidation.changePWAccount,
  accountController.changePassword
);
router.delete(
  "/:id",
  authMiddleware,
  authRoles("leader", "admin"),
  accountController.removeAccount
);
router.put(
  "/:id",
  authMiddleware,
  authRoles("leader", "admin"),
  accountValidation.updateAccount,
  accountController.updateAccount
);
router.post(
  "/forget-password",
  accountValidation.forgetPassword,
  accountController.forgetPassword
);
export const accountRoute = router;
