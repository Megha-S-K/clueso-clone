import express from "express";
import { protect } from "../middleware/auth.middleware.js";
import { aiGenerate } from "../controllers/ai.controller.js";

const router = express.Router();

router.post("/generate", protect, aiGenerate);

export default router;
