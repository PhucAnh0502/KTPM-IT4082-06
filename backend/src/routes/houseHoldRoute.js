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
router.post(
  "/create",
  authMiddleware,
  authRoles("leader"),
  houseHoldValidation.createHouseHold,
  houseHoldController.createHouseHold
);
router.get(
  "/:id",
  authMiddleware,
  authRoles("leader"),
  houseHoldController.readHouseHold
);
router.delete(
  "/:id",
  authMiddleware,
  authRoles("leader"),
  houseHoldController.removeHouseHold
);
router.put(
  "/:id",
  authMiddleware,
  authRoles("leader"),
  houseHoldValidation.updateHouseHold,
  houseHoldController.updateHouseHold
);
export const houseHoldRoute = router;
