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
/**
 * @swagger
 * /accounts/login:
 *   post:
 *     summary: Login to an account
 *     tags:
 *       - Accounts
 *     security: [] # Không yêu cầu xác thực
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Email:
 *                 type: string
 *                 example: user@example.com
 *               Password:
 *                 type: string
 *                 example: "password123"
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *                 message:
 *                   type: string
 *                   example: "Login successful"
 *       400:
 *         description: Validation failed
 *       401:
 *         description: Unauthorized
 */
router.post(
  "/login",
  accountValidation.loginAccount,
  accountController.loginAccount
);
/**
 * @swagger
 * /accounts/create:
 *   post:
 *     summary: Create a new account
 *     tags:
 *       - Accounts
 *     security: [] # Không yêu cầu xác thực
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Email:
 *                 type: string
 *                 example: user@example.com
 *               Password:
 *                 type: string
 *                 example: "password123"
 *               Role:
 *                 type: string
 *                 enum:
 *                   - admin
 *                   - leader
 *                   - accountant
 *                   - resident
 *                 example: resident
 *     responses:
 *       201:
 *         description: Account created successfully
 *       400:
 *         description: Validation failed
 */
router.post(
  "/create",
  accountValidation.createAccount,
  accountController.createAccount
);

/**
 * @swagger
 * /accounts/change-password:
 *   post:
 *     summary: Change account password
 *     tags:
 *       - Accounts
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               oldPassword:
 *                 type: string
 *                 example: "oldpassword123"
 *               newPassword:
 *                 type: string
 *                 example: "newpassword123"
 *               confirmPassword:
 *                 type: string
 *                 example: "newpassword123"
 *     responses:
 *       200:
 *         description: Password changed successfully
 *       400:
 *         description: Validation failed
 *       401:
 *         description: Unauthorized
 */
router.post(
  "/change-password",
  authMiddleware,
  accountValidation.changePWAccount,
  accountController.changePassword
);

/**
 * @swagger
 * /accounts/{id}:
 *   delete:
 *     summary: Delete an account by ID
 *     tags:
 *       - Accounts
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Account ID
 *     responses:
 *       200:
 *         description: Account deleted successfully
 *       400:
 *         description: Validation failed
 *       401:
 *         description: Unauthorized
 */
router.delete(
  "/:id",
  authMiddleware,
  authRoles("leader", "admin"),
  accountController.removeAccount
);

/**
 * @swagger
 * /accounts/{id}:
 *   put:
 *     summary: Update an account by ID
 *     tags:
 *       - Accounts
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Account ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Email:
 *                 type: string
 *                 example: user@example.com
 *               Role:
 *                 type: string
 *                 enum:
 *                   - admin
 *                   - leader
 *                   - accountant
 *                   - resident
 *                 example: resident
 *     responses:
 *       200:
 *         description: Account updated successfully
 *       400:
 *         description: Validation failed
 *       401:
 *         description: Unauthorized
 */
router.put(
  "/:id",
  authMiddleware,
  authRoles("leader", "admin"),
  accountValidation.updateAccount,
  accountController.updateAccount
);

/**
 * @swagger
 * /accounts/forget-password:
 *   post:
 *     summary: Reset account password
 *     tags:
 *       - Accounts
 *     security: [] # Không yêu cầu xác thực
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Email:
 *                 type: string
 *                 example: user@example.com
 *               newPassword:
 *                 type: string
 *                 example: "newpassword123"
 *               confirmPassword:
 *                 type: string
 *                 example: "newpassword123"
 *     responses:
 *       200:
 *         description: Password reset successfully
 *       400:
 *         description: Validation failed
 */
router.post(
  "/forget-password",
  accountValidation.forgetPassword,
  accountController.forgetPassword
);
/**
 * @swagger
 * /accounts/get-all:
 *   get:
 *     summary: Get all accounts
 *     tags:
 *       - Accounts
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all accounts retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: "ACC12345"
 *                   Email:
 *                     type: string
 *                     example: "user@example.com"
 *                   Role:
 *                     type: string
 *                     enum:
 *                       - admin
 *                       - leader
 *                       - accountant
 *                       - resident
 *                     example: "resident"
 *       400:
 *         description: Validation failed
 *       401:
 *         description: Unauthorized
 */
router.get(
  "/get-all",
  authMiddleware,
  authRoles("leader", "admin"),
  accountController.getAllAccounts
);
export const accountRoute = router;
