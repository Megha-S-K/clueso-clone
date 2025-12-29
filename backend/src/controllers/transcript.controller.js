import fs from "fs";
import path from "path";
import { exec } from "child_process";
import Project from "../models/Project.js";

export const generateTranscript = async (req, res) => {
    try {
        const { projectId } = req.params;

        const project = await Project.findById(projectId);
        if (!project || !project.videoPath) {
        return res.status(404).json({ message: "Project or video not found" });
        }

        const root = process.cwd();
        const videoPath = path.join(root, project.videoPath);
        const audioPath = path.join(root, "uploads", `${projectId}.wav`);
        const transcriptPath = path.join(root, "uploads", `${projectId}.txt`);

        // 1️⃣ Video → Audio
        await new Promise((resolve, reject) => {
        const cmd = `ffmpeg -y -i "${videoPath}" -ar 16000 -ac 1 "${audioPath}"`;
        exec(cmd, (err) => (err ? reject(err) : resolve()));
        });

        // 2️⃣ Audio → Text (Whisper local)
        await new Promise((resolve, reject) => {
        const cmd = `whisper "${audioPath}" --model base --language en --output_dir uploads --output_format txt`;
        exec(cmd, (err) => (err ? reject(err) : resolve()));
        });

        // 3️⃣ Read transcript
        const transcript = fs.readFileSync(transcriptPath, "utf-8");

        // 4️⃣ Save to DB
        project.rawTranscript = transcript;
        await project.save();

        if (fs.existsSync(audioPath)) {
            fs.unlinkSync(audioPath);
}


        res.json({ transcript });

    } catch (err) {
        console.error("Whisper error:", err.message);
        res.status(500).json({ message: "Failed to generate transcript" });
    }
};
