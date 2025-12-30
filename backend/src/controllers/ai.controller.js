import Project from "../models/Project.js";
import { generateArticleFromTranscript } from "../services/ai.service.js";

export const aiGenerate = async (req, res) => {
    try {
        const { projectId, action } = req.body;

        if (!projectId || !action) {
            return res.status(400).json({ message: "projectId and action are required" });
        }

        const project = await Project.findById(projectId);

        if (!project || !project.rawTranscript) {
            return res.status(400).json({ message: "Transcript not available yet" });
        }

        const transcript = project.rawTranscript;

        /* ======================================================
        🔹 STRUCTURE MODE (20-SECOND WINDOW + CLEAN STEPS)
        ====================================================== */
        if (action === "structure") {
            const project = await Project.findById(projectId);

            if (!project || !project.rawTranscript) {
                return res.status(400).json({ message: "Transcript not available" });
            }

            const prompt = `
        You are converting a video transcript into a clear step-by-step guide.

        Rules:
        - Create 5 to 7 steps maximum
        - Each step must have a meaningful title (NOT "Step 1")
        - Each step should explain ONE action clearly
        - Do NOT repeat "Step" inside content
        - Keep content concise and instructional

        Return ONLY valid JSON in this format:

        {
            "steps": [
                { "title": "...", "content": "..." }
            ]
        }

        Transcript:
        ${project.rawTranscript}
        `;

            const llmResponse = await generateArticleFromTranscript(prompt);

            const parsed = JSON.parse(llmResponse);

            return res.json({ steps: parsed.steps });
        }


        /* ======================================================
        🔹 REWRITE / CONCISE MODES
        ====================================================== */
        let prompt = "";

        if (action === "rewrite") {
            prompt = `
Rewrite the following transcript into a professional, well-structured article.
Remove conversational language and improve clarity.

Transcript:
"""
${transcript}
"""
`;
        }

        if (action === "concise") {
            prompt = `
Summarize the following transcript into a concise, clear article.
Focus on key actions and information only.

Transcript:
"""
${transcript}
"""
`;
        }

        if (!prompt) {
            return res.status(400).json({ message: "Invalid action" });
        }

        const article = await generateArticleFromTranscript(prompt);

        project.formattedArticle = article;
        await project.save();

        return res.json({ article });

    } catch (err) {
        console.error("AI generate error:", err);
        return res.status(500).json({ message: "AI generation failed" });
    }
};
