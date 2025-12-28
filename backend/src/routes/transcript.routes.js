import express from "express";
import { protect } from "../middleware/auth.middleware.js";
import { generateTranscript } from "../controllers/transcript.controller.js";

const router = express.Router();

router.post("/:projectId", protect, generateTranscript);

export default router;
