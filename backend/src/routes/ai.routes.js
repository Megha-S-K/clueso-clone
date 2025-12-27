import express from "express";
import { protect } from "../middleware/auth.middleware.js";
import { aiAction } from "../controllers/ai.controller.js";

const router = express.Router();

router.post("/action", protect, aiAction);

export default router;
