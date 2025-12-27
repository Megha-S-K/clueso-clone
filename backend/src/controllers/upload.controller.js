import Project from "../models/Project.js";

export const uploadVideo = async (req, res) => {
    try {
        if (!req.file) {
        return res.status(400).json({ message: "No video uploaded" });
        }

        const project = await Project.create({
        title: req.body.title || "Untitled Video",
        videoPath: req.file.path,
        userId: req.userId
        });

        res.status(201).json(project);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Video upload failed" });
    }
};
