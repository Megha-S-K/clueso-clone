import Project from "../models/Project.js";
import { generateArticleFromTranscript } from "../services/ai.service.js";

export const generateArticle = async (req, res) => {
    try {
        const { projectId, action } = req.body;

        const project = await Project.findById(projectId);
        if (!project || !project.rawTranscript) {
        return res.status(400).json({ message: "Transcript not found" });
        }

        let article;
        try {
        article = await generateArticleFromTranscript(
            project.rawTranscript,
            action
        );
        } catch (aiError) {
        console.error("Cerebras busy:", aiError.message);
        article =
            "AI is currently busy. Please try again in a moment.";
        }

        project.formattedArticle = article;
        await project.save();

        res.json({ article });

    } catch (err) {
        res.status(500).json({ message: "AI generation failed" });
    }
};
