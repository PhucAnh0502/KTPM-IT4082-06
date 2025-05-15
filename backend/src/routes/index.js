import { Router } from "express";
import { StatusCodes } from "http-status-codes";
import { residentRoute } from "./residentRoute.js";
import { accountRoute } from "./accountRoute.js";
import { vehicleRoute } from "./vehicleRoute.js";
import { houseHoldRoute } from "./houseHoldRoute.js";
import { feeCollectionRoute } from "./feeCollectionRoute.js";
import { feeRoute } from "./feeRoute.js";
import { payFeeRoute } from "./payFeeRoute.js";
const router = Router();

router.use("/api/residents", residentRoute);
router.use("/api/accounts", accountRoute);
router.use("/api/vehicles", vehicleRoute);
router.use("/api/households", houseHoldRoute);
router.use("/api/fee-collections", feeCollectionRoute);
router.use("/api/fees", feeRoute);
router.use("/api/pay-fees", payFeeRoute);
export const API = router;
