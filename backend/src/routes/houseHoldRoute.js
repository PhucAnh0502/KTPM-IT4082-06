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
 *             properties:
 *               HouseHoldMember:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["Member1", "Member2"]
 *               Area:
 *                 type: number
 *                 example: 120.5
 *               HouseHoldHeadID:
 *                 type: string
 *                 example: "HHH12345"
 *               Address:
 *                 type: string
 *                 example: "123 Main Street"
 *               VehicleID:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["V123", "V124"]
 *     responses:
 *       201:
 *         description: Household created successfully
 *       400:
 *         description: Validation failed
 */
router.post(
  "/create",
  authMiddleware,
  authRoles("leader"),
  houseHoldValidation.createHouseHold,
  houseHoldController.createHouseHold
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
  authRoles("leader"),
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
  authRoles("leader"),
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
 *               Area:
 *                 type: number
 *                 example: 150.75
 *               HouseHoldHeadID:
 *                 type: string
 *                 example: "HHH67890"
 *               Address:
 *                 type: string
 *                 example: "456 Elm Street"
 *               VehicleID:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["V125", "V126"]
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
  authRoles("leader"),
  houseHoldValidation.updateHouseHold,
  houseHoldController.updateHouseHold
);
export const houseHoldRoute = router;
