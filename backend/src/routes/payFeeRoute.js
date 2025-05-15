import { Router } from "express";

import { payFeeController } from "../controllers/payFeeController.js";
import { payFeeValidation } from "../validation/payFeeValidation.js";
import { authMiddleware, authRoles } from "../middlewares/auth.js";

const router = Router();

/**
 * @swagger
 * /pay-fees/create:
 *   post:
 *     summary: Create a new payment for a fee
 *     tags:
 *       - Pay Fees
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               FeeID:
 *                 type: string
 *                 example: "F12345"
 *               HouseHoldID:
 *                 type: string
 *                 example: "HH12345"
 *               Amount:
 *                 type: number
 *                 example: 500.75
 *               PayDate:
 *                 type: string
 *                 format: date
 *                 example: "2025-05-15"
 *     responses:
 *       201:
 *         description: Payment created successfully
 *       400:
 *         description: Validation failed
 */
router.post(
  "/create",
  authMiddleware,
  authRoles("accountant"),
  payFeeValidation.createPayFee,
  payFeeController.createPayFee
);

/**
 * @swagger
 * /pay-fees/{id}:
 *   get:
 *     summary: Get payment details by ID
 *     tags:
 *       - Pay Fees
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Payment ID
 *     responses:
 *       200:
 *         description: Payment retrieved successfully
 *       400:
 *         description: Validation failed
 *       404:
 *         description: Payment not found
 */
router.get(
  "/:id",
  authMiddleware,
  authRoles("accountant"),
  payFeeController.readPayFee
);

/**
 * @swagger
 * /pay-fees/{id}:
 *   delete:
 *     summary: Delete a payment by ID
 *     tags:
 *       - Pay Fees
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Payment ID
 *     responses:
 *       200:
 *         description: Payment deleted successfully
 *       400:
 *         description: Validation failed
 *       404:
 *         description: Payment not found
 */
router.delete(
  "/:id",
  authMiddleware,
  authRoles("accountant"),
  payFeeController.removePayFee
);

/**
 * @swagger
 * /pay-fees/{id}:
 *   put:
 *     summary: Update a payment by ID
 *     tags:
 *       - Pay Fees
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Payment ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               FeeID:
 *                 type: string
 *                 example: "F67890"
 *               HouseHoldID:
 *                 type: string
 *                 example: "HH67890"
 *               Amount:
 *                 type: number
 *                 example: 750.50
 *               PayDate:
 *                 type: string
 *                 format: date
 *                 example: "2025-06-01"
 *     responses:
 *       200:
 *         description: Payment updated successfully
 *       400:
 *         description: Validation failed
 *       404:
 *         description: Payment not found
 */
router.put(
  "/:id",
  authMiddleware,
  authRoles("accountant"),
  payFeeValidation.updatePayFee,
  payFeeController.updatePayFee
);
export const payFeeRoute = router;
