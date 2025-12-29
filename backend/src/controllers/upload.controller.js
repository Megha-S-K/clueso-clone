import Project from "../models/Project.js";
import { extractScreenshots } from "./screenshot.controller.js";
import fs from "fs";

export const uploadVideo = async (req, res) => {
    try {
        if (!req.file) {
        return res.status(400).json({ message: "No video uploaded" });
        }

        // 1️⃣ Create project immediately
        const project = await Project.create({
        title: req.body.title || "Untitled Video",
        videoPath: req.file.path,
        userId: req.userId
        });

        // 2️⃣ Respond immediately (VERY IMPORTANT)
        res.status(201).json(project);

        // 3️⃣ Background processing (DO NOT await)
        extractScreenshots(project._id, project.videoPath)
        .then(async () => {
            const screenshotDir = `uploads/screenshots/${project._id.toString()}`;

            if (fs.existsSync(screenshotDir)) {
            const screenshots = fs
                .readdirSync(screenshotDir)
                .map(file => `${screenshotDir}/${file}`);

            project.screenshots = screenshots;
            await project.save();
            }
        })
        .catch(err => {
            console.error("Screenshot extraction failed:", err);
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Video upload failed" });
    }
};
