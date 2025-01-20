import express from "express";
import centerController from "./center.controller.js";
const router = express.Router();

router.get("/allCenters", centerController.getAllCenters);

export default router;
