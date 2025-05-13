import { Router } from "express";
import { StatusCodes } from "http-status-codes";
import { residentRoute } from "./residentRoute.js";
const router = Router();

router.use("/api/residents", residentRoute);

export const API = router;
