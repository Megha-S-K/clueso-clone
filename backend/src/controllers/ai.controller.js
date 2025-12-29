import Project from "../models/Project.js";
import { generateArticleFromTranscript } from "../services/ai.service.js";

export const aiGenerate = async (req, res) => {
    try {
        const { projectId, action } = req.body;

        const project = await Project.findById(projectId);
        if (!project || !project.rawTranscript) {
        return res.status(400).json({ message: "Transcript not found" });
        }

        const transcript = project.rawTranscript;

        // 🔹 STRUCTURE MODE (VERY IMPORTANT)
        if (action === "structure") {
        const prompt = `
    You are a JSON generator.

    Return ONLY valid JSON.
    Do NOT include explanations, comments, or extra text.
    Do NOT wrap in markdown.
    Do NOT include anything outside JSON.

    The JSON MUST strictly follow this schema:

    {
    "steps": [
        {
        "title": "string",
        "content": "string"
        }
    ]
    }

Transcript:
${transcript}
    `;

        const response = await generateArticleFromTranscript(prompt);

        let steps = [];

        try {
        // Extract JSON block safely
            const jsonMatch = response.match(/\{[\s\S]*\}/);

            if (!jsonMatch) {
                throw new Error("No JSON found in AI response");
            }

            const parsed = JSON.parse(jsonMatch[0]);
            steps = parsed.steps || [];

            } catch (parseError) {
            console.error("JSON parse failed:", parseError.message);
            console.error("Raw AI response:", response);

            // Fallback: create a single-step structure
            steps = [
                {
                title: "Overview",
                content: "Unable to auto-structure steps, but transcript was processed successfully."
                }
            ];
        }

return res.json({ steps });

        }

        // 🔹 REWRITE / CONCISE
        let prompt = "";

        if (action === "rewrite") {
        prompt = `Rewrite this transcript into a professional article:\n${transcript}`;
        }

        if (action === "concise") {
        prompt = `Summarize this transcript clearly and concisely:\n${transcript}`;
        }

        const article = await generateArticleFromTranscript(prompt);

        project.formattedArticle = article;
        await project.save();

        return res.json({ article });

    } catch (err) {
        console.error("AI generate error:", err);
        res.status(500).json({ message: "AI generation failed" });
    }
};
