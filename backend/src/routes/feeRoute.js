import { Router } from "express";
import { feeValidation } from "../validation/feeValidation.js";
import { feeController } from "../controllers/feeController.js";
import { authMiddleware } from "../middlewares/auth.js";
import { authRoles } from "../middlewares/auth.js";

const router = Router();

/**
 * @swagger
 * /fees/create:
 *   post:
 *     summary: Create a new fee
 *     tags:
 *       - Fees
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               FeeType:
 *                 type: string
 *                 enum:
 *                   - water
 *                   - electricity
 *                   - maintenance
 *                   - other
 *                 example: water
 *               Description:
 *                 type: string
 *                 example: "Monthly water bill"
 *               feeName:
 *                 type: string
 *                 example: "Water Fee"
 *               FeeCollectionID:
 *                 type: string
 *                 example: "FC12345"
 *     responses:
 *       201:
 *         description: Fee created successfully
 *       400:
 *         description: Validation failed
 */
router.post(
  "/create",
  authMiddleware,
  authRoles("accountant", "admin"),
  feeValidation.createFee,
  feeController.createFee
);
/**
 * @swagger
 * /fees/get-alls:
 *   get:
 *     summary: Get all fees
 *     tags:
 *       - Fees
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all fees retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: "F12345"
 *                   FeeType:
 *                     type: string
 *                     enum:
 *                       - water
 *                       - electricity
 *                       - maintenance
 *                       - other
 *                     example: water
 *                   Description:
 *                     type: string
 *                     example: "Monthly water bill"
 *                   feeName:
 *                     type: string
 *                     example: "Water Fee"
 *                   FeeCollectionID:
 *                     type: string
 *                     example: "FC12345"
 *       400:
 *         description: Validation failed
 *       401:
 *         description: Unauthorized
 */
router.get(
  "/get-alls",
  authMiddleware,
  authRoles("accountant", "admin"),
  feeController.getAllFees
);
/**
 * @swagger
 * /fees/{id}:
 *   get:
 *     summary: Get a fee by ID
 *     tags:
 *       - Fees
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Fee ID
 *     responses:
 *       200:
 *         description: Fee retrieved successfully
 *       400:
 *         description: Validation failed
 *       404:
 *         description: Fee not found
 */
router.get(
  "/:id",
  authMiddleware,
  authRoles("accountant", "admin"),
  feeController.readFee
);

/**
 * @swagger
 * /fees/{id}:
 *   delete:
 *     summary: Delete a fee by ID
 *     tags:
 *       - Fees
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Fee ID
 *     responses:
 *       200:
 *         description: Fee deleted successfully
 *       400:
 *         description: Validation failed
 *       404:
 *         description: Fee not found
 */
router.delete(
  "/:id",
  authMiddleware,
  authRoles("accountant", "admin"),
  feeController.removeFee
);

/**
 * @swagger
 * /fees/{id}:
 *   put:
 *     summary: Update a fee by ID
 *     tags:
 *       - Fees
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Fee ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               FeeType:
 *                 type: string
 *                 enum:
 *                   - water
 *                   - electricity
 *                   - maintenance
 *                   - other
 *                 example: electricity
 *               Description:
 *                 type: string
 *                 example: "Updated electricity bill"
 *               feeName:
 *                 type: string
 *                 example: "Electricity Fee"
 *               FeeCollectionID:
 *                 type: string
 *                 example: "FC67890"
 *     responses:
 *       200:
 *         description: Fee updated successfully
 *       400:
 *         description: Validation failed
 *       404:
 *         description: Fee not found
 */
router.put(
  "/:id",
  authMiddleware,
  authRoles("accountant", "admin"),
  feeValidation.updateFee,
  feeController.updateFee
);

export const feeRoute = router;
