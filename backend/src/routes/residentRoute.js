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

/**
 * @swagger
 * /residents/create:
 *   post:
 *     summary: Create a new resident
 *     tags:
 *       - Residents
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
 *                 example: John Doe
 *               CID:
 *                 type: string
 *                 example: "123456789"
 *               DateOfBirth:
 *                 type: string
 *                 format: date
 *                 example: "1990-01-01"
 *               Gender:
 *                 type: string
 *                 enum:
 *                   - Male
 *                   - Female
 *                   - Other
 *                 example: Male
 *               HouseHoldID:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["HH123", "HH124"]
 *               Occupation:
 *                 type: string
 *                 example: "Engineer"
 *               Status:
 *                 type: string
 *                 enum:
 *                   - Temporary
 *                   - Permanent
 *                   - Moved
 *                   - Dead
 *                 example: Permanent
 *               PhoneNumber:
 *                 type: string
 *                 example: "0123456789"
 *               HouseHoldRelation:
 *                 type: string
 *                 example: "Head of Household"
 *     responses:
 *       201:
 *         description: Resident created successfully
 *       400:
 *         description: Validation failed
 */
router.post(
  "/create",
  authMiddleware,
  authRoles("leader", "admin"),
  // residentValidation.createResident,
  residentController.createResident
);
/**
 * @swagger
 * /residents/get-alls:
 *   get:
 *     summary: Get all residents
 *     tags:
 *       - Residents
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all residents retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: "R12345"
 *                   Name:
 *                     type: string
 *                     example: John Doe
 *                   CID:
 *                     type: string
 *                     example: "123456789"
 *                   DateOfBirth:
 *                     type: string
 *                     format: date
 *                     example: "1990-01-01"
 *                   Gender:
 *                     type: string
 *                     enum:
 *                       - Male
 *                       - Female
 *                       - Other
 *                     example: Male
 *                   HouseHoldID:
 *                     type: array
 *                     items:
 *                       type: string
 *                     example: ["HH123", "HH124"]
 *                   AccountID:
 *                     type: string
 *                     example: "ACC123"
 *                   Occupation:
 *                     type: string
 *                     example: "Engineer"
 *                   Status:
 *                     type: string
 *                     enum:
 *                       - Temporary
 *                       - Permanent
 *                       - Moved
 *                       - Dead
 *                     example: Permanent
 *                   PhoneNumber:
 *                     type: string
 *                     example: "0123456789"
 *                   HouseHoldRelation:
 *                     type: string
 *                     example: "Head of Household"
 *       400:
 *         description: Validation failed
 *       401:
 *         description: Unauthorized
 */
router.get(
  "/get-alls",
  authMiddleware,
  authRoles("leader", "admin"),
  residentController.getAllResidents
);

/**
 * @swagger
 * /residents/{id}:
 *   get:
 *     summary: Get a resident by ID
 *     tags:
 *       - Residents
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Resident ID
 *     responses:
 *       200:
 *         description: Resident retrieved successfully
 *       400:
 *         description: Validation failed
 *       404:
 *         description: Resident not found
 */
router.get(
  "/:id",
  authMiddleware,
  authRoles("leader", "admin"),
  residentController.readResident
);

/**
 * @swagger
 * /residents/{id}:
 *   put:
 *     summary: Update a resident by ID
 *     tags:
 *       - Residents
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Resident ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Name:
 *                 type: string
 *                 example: John Doe
 *               CID:
 *                 type: string
 *                 example: "123456789"
 *               DateOfBirth:
 *                 type: string
 *                 format: date
 *                 example: "1990-01-01"
 *               Gender:
 *                 type: string
 *                 enum:
 *                   - Male
 *                   - Female
 *                   - Other
 *                 example: Female
 *               HouseHoldID:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["HH125"]
 *               AccountID:
 *                 type: string
 *                 example: "ACC456"
 *               Occupation:
 *                 type: string
 *                 example: "Teacher"
 *               Status:
 *                 type: string
 *                 enum:
 *                   - Temporary
 *                   - Permanent
 *                   - Moved
 *                   - Dead
 *                 example: Temporary
 *               PhoneNumber:
 *                 type: string
 *                 example: "0987654321"
 *               HouseHoldRelation:
 *                 type: string
 *                 example: "Member"
 *     responses:
 *       200:
 *         description: Resident updated successfully
 *       400:
 *         description: Validation failed
 *       404:
 *         description: Resident not found
 */
router.put(
  "/:id",
  authMiddleware,
  authRoles("leader", "admin"),
  residentValidation.updateResident,
  residentController.updateResident
);

/**
 * @swagger
 * /residents/{id}:
 *   delete:
 *     summary: Delete a resident by ID
 *     tags:
 *       - Residents
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Resident ID
 *     responses:
 *       200:
 *         description: Resident deleted successfully
 *       400:
 *         description: Validation failed
 *       404:
 *         description: Resident not found
 */
router.delete(
  "/:id",
  authMiddleware,
  authRoles("leader", "admin"),
  residentController.removeResident
);
export const residentRoute = router;
