import { Router } from "express";
import { houseHoldController } from "../controllers/houseHoldController.js";
import { houseHoldValidation } from "../validation/houseHoldValidation.js";
import { authMiddleware, authRoles } from "../middlewares/auth.js";
const router = Router();
router.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to the HouseHold API",
  });
});
/**
 * @swagger
 * /households/create:
 *   post:
 *     summary: Create a new household
 *     tags:
 *       - Households
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - HouseHoldMember
 *               - Area
 *               - Address
 *             properties:
 *               HouseHoldMember:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["Member1", "Member2"]
 *                 description: List of household members (required)
 *               Area:
 *                 type: number
 *                 example: 120.5
 *                 description: Area of the household (required)
 *               HouseHoldHeadID:
 *                 type: string
 *                 example: "HHH12345"
 *                 description: ID of household head (optional)
 *               Address:
 *                 type: string
 *                 example: "123 Main Street"
 *                 description: Address of the household (required)
 *               VehicleID:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["V123", "V124"]
 *                 description: List of vehicle IDs (optional)
 *     responses:
 *       201:
 *         description: Household created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Household created successfully"
 *                 houseHold:
 *                   type: object
 *       400:
 *         description: Validation failed
 *       401:
 *         description: Unauthorized
 */
router.post(
  "/create",
  authMiddleware,
  authRoles("leader", "admin"),
  houseHoldValidation.createHouseHold,
  houseHoldController.createHouseHold
);
/**
 * @swagger
 * /households/assign-head/{id}:
 *   patch:
 *     summary: Assign or update household head
 *     tags:
 *       - Households
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Household ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - HouseHoldHeadID
 *             properties:
 *               HouseHoldHeadID:
 *                 type: string
 *                 example: "HHH12345"
 *                 description: ID of the new household head
 *     responses:
 *       200:
 *         description: Household head assigned successfully
 *       400:
 *         description: Validation failed
 *       404:
 *         description: Household not found
 */
router.patch(
  "/assign-head/:id",
  authMiddleware,
  authRoles("leader", "admin"),
  houseHoldController.assignHouseHoldHead
);
/**
 * @swagger
 * /households/get-all:
 *   get:
 *     summary: Get all households
 *     tags:
 *       - Households
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all households retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Households retrieved successfully"
 *                 houseHolds:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: "HH12345"
 *                       HouseHoldMember:
 *                         type: array
 *                         items:
 *                           type: string
 *                         example: ["Member1", "Member2"]
 *                       Area:
 *                         type: number
 *                         example: 120.5
 *                       HouseHoldHeadID:
 *                         type: string
 *                         example: "HHH12345"
 *                         nullable: true
 *                       Address:
 *                         type: string
 *                         example: "123 Main Street"
 *                       VehicleID:
 *                         type: array
 *                         items:
 *                           type: string
 *                         example: ["V123", "V124"]
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *       401:
 *         description: Unauthorized
 */
router.get(
  "/get-all",
  authMiddleware,
  authRoles("leader", "admin"),
  houseHoldController.getAllHouseHolds
);
/**
 * @swagger
 * /households/{id}:
 *   get:
 *     summary: Get a household by ID
 *     tags:
 *       - Households
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Household ID
 *     responses:
 *       200:
 *         description: Household retrieved successfully
 *       400:
 *         description: Validation failed
 *       404:
 *         description: Household not found
 */
router.get(
  "/:id",
  authMiddleware,
  authRoles("leader", "admin"),
  houseHoldController.readHouseHold
);

/**
 * @swagger
 * /households/{id}:
 *   delete:
 *     summary: Delete a household by ID
 *     tags:
 *       - Households
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Household ID
 *     responses:
 *       200:
 *         description: Household deleted successfully
 *       400:
 *         description: Validation failed
 *       404:
 *         description: Household not found
 */
router.delete(
  "/:id",
  authMiddleware,
  authRoles("leader", "admin"),
  houseHoldController.removeHouseHold
);

/**
 * @swagger
 * /households/{id}:
 *   put:
 *     summary: Update a household by ID
 *     tags:
 *       - Households
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Household ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               HouseHoldMember:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["Member1", "Member2"]
 *                 description: List of household members
 *               Area:
 *                 type: number
 *                 example: 150.75
 *                 description: Area of the household
 *               HouseHoldHeadID:
 *                 type: string
 *                 example: "HHH67890"
 *                 description: ID of household head (optional)
 *                 nullable: true
 *               Address:
 *                 type: string
 *                 example: "456 Elm Street"
 *                 description: Address of the household
 *               VehicleID:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["V125", "V126"]
 *                 description: List of vehicle IDs
 *     responses:
 *       200:
 *         description: Household updated successfully
 *       400:
 *         description: Validation failed
 *       404:
 *         description: Household not found
 */
router.put(
  "/:id",
  authMiddleware,
  authRoles("leader", "admin"),
  houseHoldValidation.updateHouseHold,
  houseHoldController.updateHouseHold
);

export const houseHoldRoute = router;
