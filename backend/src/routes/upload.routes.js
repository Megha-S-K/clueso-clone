import express from "express";
import { protect } from "../middleware/auth.middleware.js";
import upload from "../middleware/upload.middleware.js";
import { uploadVideo } from "../controllers/upload.controller.js";

const router = express.Router();

router.post(
    "/video",
    protect,
    upload.single("video"),
    uploadVideo
);

export default router;
