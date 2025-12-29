import fs from "fs";
import path from "path";
import { exec } from "child_process";
import Project from "../models/Project.js";

export const extractScreenshots = async (projectId, videoPath) => {
    return new Promise((resolve, reject) => {
        const outputDir = path.join(
        process.cwd(),
        "uploads/screenshots",
        projectId.toString()
        );

        if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
        }

        // 1 screenshot every 5 seconds
        const cmd = `ffmpeg -i "${videoPath}" -vf fps=1/5 "${outputDir}/step_%02d.png"`;

        exec(cmd, (err) => {
        if (err) return reject(err);
        resolve();
        });
    });
};
