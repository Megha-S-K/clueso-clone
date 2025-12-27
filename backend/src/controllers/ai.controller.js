import Project from "../models/Project.js";
import OpenAI from "openai";

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
    });

    export const aiAction = async (req, res) => {
    const { projectId, action } = req.body;

    const project = await Project.findById(projectId);
    if (!project) {
        return res.status(404).json({ message: "Project not found" });
    }

    let instruction = "";

    switch (action) {
        case "rewrite":
        instruction = "Rewrite the following content professionally:";
        break;
        case "improve":
        instruction = "Improve clarity and grammar of the following content:";
        break;
        case "concise":
        instruction = "Make the following content concise:";
        break;
        case "structure":
        instruction = "Convert the following content into a step-by-step article:";
        break;
        default:
        instruction = "Rewrite the following content:";
    }

    const completion = await client.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
        {
            role: "user",
            content: `${instruction}\n\n${project.rawContent}`
        }
        ]
    });

    res.json({
        output: completion.choices[0].message.content
    });
    };
