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
/**
 * @swagger
 * /fee-collections/create:
 *   post:
 *     summary: Create a new fee collection
 *     tags:
 *       - Fee Collections
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Name:
 *                 type: string
 *                 example: "Semester 2 Fees"
 *               Fees:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["Fee1", "Fee2", "Fee3"]
 *               CreateDate:
 *                 type: string
 *                 format: date
 *                 example: "2025-05-15"
 *               DueDate:
 *                 type: string
 *                 format: date
 *                 example: "2025-06-15"
 *     responses:
 *       201:
 *         description: Fee collection created successfully
 *       400:
 *         description: Validation failed
 */
router.post(
  "/create",
  authMiddleware,
  authRoles("accountant", "admin"),
  // feeCollectionValidation.createFeeCollection,
  feeCollectionController.createFeeCollection
);
/**
 * @swagger
 * /fee-collections/get-all:
 *   get:
 *     summary: Get all fee collections
 *     tags:
 *       - Fee Collections
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all fee collections retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: "FC12345"
 *                   Fees:
 *                     type: array
 *                     items:
 *                       type: string
 *                     example: ["Fee1", "Fee2", "Fee3"]
 *                   CreateDate:
 *                     type: string
 *                     format: date
 *                     example: "2025-05-15"
 *                   DueDate:
 *                     type: string
 *                     format: date
 *                     example: "2025-06-15"
 *       400:
 *         description: Validation failed
 *       401:
 *         description: Unauthorized
 */
router.get(
  "/get-all",
  authMiddleware,
  authRoles("accountant", "admin"),
  feeCollectionController.getAllFeeCollections
);
/**
 * @swagger
 * /fee-collections/{id}:
 *   get:
 *     summary: Get a fee collection by ID
 *     tags:
 *       - Fee Collections
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Fee collection ID
 *     responses:
 *       200:
 *         description: Fee collection retrieved successfully
 *       400:
 *         description: Validation failed
 *       404:
 *         description: Fee collection not found
 */
router.get(
  "/:id",
  authMiddleware,
  authRoles("accountant", "admin"),
  feeCollectionController.readFeeCollection
);
/**
 * @swagger
 * /fee-collections/{id}:
 *   delete:
 *     summary: Delete a fee collection by ID
 *     tags:
 *       - Fee Collections
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Fee collection ID
 *     responses:
 *       200:
 *         description: Fee collection deleted successfully
 *       400:
 *         description: Validation failed
 *       404:
 *         description: Fee collection not found
 */
router.delete(
  "/:id",
  authMiddleware,
  authRoles("accountant", "admin"),
  feeCollectionController.removeFeeCollection
);
/**
 * @swagger
 * /fee-collections/{id}:
 *   put:
 *     summary: Update a fee collection by ID
 *     tags:
 *       - Fee Collections
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Fee collection ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Fees:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["Fee1", "Fee2"]
 *               CreateDate:
 *                 type: string
 *                 format: date
 *                 example: "2025-05-15"
 *               DueDate:
 *                 type: string
 *                 format: date
 *                 example: "2025-06-30"
 *     responses:
 *       200:
 *         description: Fee collection updated successfully
 *       400:
 *         description: Validation failed
 *       404:
 *         description: Fee collection not found
 */
router.put(
  "/:id",
  authMiddleware,
  authRoles("accountant", "admin"),
  feeCollectionValidation.updateFeeCollection,
  feeCollectionController.updateFeeCollection
);

export const feeCollectionRoute = router;
