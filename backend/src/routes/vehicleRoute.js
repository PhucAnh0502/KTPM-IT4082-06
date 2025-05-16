import { Router } from "express";
import { StatusCodes } from "http-status-codes";
import { vehicleValidation } from "../validation/vehicleValidation.js";
import { vehicleController } from "../controllers/vehicleController.js";
import { authMiddleware } from "../middlewares/auth.js";
import { authRoles } from "../middlewares/auth.js";
const router = Router();
router.get("/", (req, res) => {
  res.status(StatusCodes.OK).json({
    message: "Welcome to the Vehicle API",
  });
});
/**
 * @swagger
 * /vehicles/create:
 *   post:
 *     summary: Create a new vehicle
 *     tags:
 *       - Vehicles
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               LicensePlate:
 *                 type: string
 *                 example: "ABC-1234"
 *               HouseHoldID:
 *                 type: string
 *                 example: "HH12345"
 *               VehicleType:
 *                 type: string
 *                 enum:
 *                   - Car
 *                   - Bike
 *                   - Truck
 *                 example: Car
 *     responses:
 *       201:
 *         description: Vehicle created successfully
 *       400:
 *         description: Validation failed
 */
router.post(
  "/create",
  authMiddleware,
  authRoles("admin", "leader"),
  vehicleValidation.createVehicle,
  vehicleController.createVehicle
);
/**
 * @swagger
 * /vehicles/get-all:
 *   get:
 *     summary: Get all vehicles
 *     tags:
 *       - Vehicles
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all vehicles retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: "V12345"
 *                   LicensePlate:
 *                     type: string
 *                     example: "ABC-1234"
 *                   HouseHoldID:
 *                     type: string
 *                     example: "HH12345"
 *                   VehicleType:
 *                     type: string
 *                     enum:
 *                       - Car
 *                       - Bike
 *                       - Truck
 *                     example: Car
 *       400:
 *         description: Validation failed
 *       401:
 *         description: Unauthorized
 */
router.get(
  "/get-all",
  authMiddleware,
  authRoles("admin", "leader"),
  vehicleController.getAllVehicles
);
/**
 * @swagger
 * /vehicles/{id}:
 *   get:
 *     summary: Get a vehicle by ID
 *     tags:
 *       - Vehicles
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Vehicle ID
 *     responses:
 *       200:
 *         description: Vehicle retrieved successfully
 *       400:
 *         description: Validation failed
 *       404:
 *         description: Vehicle not found
 */
router.get(
  "/:id",
  authMiddleware,
  authRoles("admin", "leader"),
  vehicleController.readVehicle
);
/**
 * @swagger
 * /vehicles/{id}:
 *   delete:
 *     summary: Delete a vehicle by ID
 *     tags:
 *       - Vehicles
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Vehicle ID
 *     responses:
 *       200:
 *         description: Vehicle deleted successfully
 *       400:
 *         description: Validation failed
 *       404:
 *         description: Vehicle not found
 */
router.delete(
  "/:id",
  authMiddleware,
  authRoles("admin", "leader"),
  vehicleController.removeVehicle
);
/**
 * @swagger
 * /vehicles/{id}:
 *   put:
 *     summary: Update a vehicle by ID
 *     tags:
 *       - Vehicles
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Vehicle ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               LicensePlate:
 *                 type: string
 *                 example: "XYZ-5678"
 *               HouseHoldID:
 *                 type: string
 *                 example: "HH67890"
 *               VehicleType:
 *                 type: string
 *                 enum:
 *                   - Car
 *                   - Bike
 *                   - Truck
 *                 example: Bike
 *     responses:
 *       200:
 *         description: Vehicle updated successfully
 *       400:
 *         description: Validation failed
 *       404:
 *         description: Vehicle not found
 */
router.put(
  "/:id",
  authMiddleware,
  authRoles("admin", "leader"),
  vehicleValidation.updateVehicle,
  vehicleController.updateVehicle
);

export const vehicleRoute = router;
