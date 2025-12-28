import axios from "axios";

const CEREBRAS_API_URL = "https://api.cerebras.ai/v1/chat/completions";

export const generateArticleFromTranscript = async (
    transcript,
    action
    ) => {
    let instruction = "";

    switch (action) {
        case "rewrite":
        instruction = "Rewrite the following transcript into a professional article.";
        break;
        case "structure":
        instruction = "Convert the following transcript into a structured step-by-step guide.";
        break;
        case "concise":
        instruction = "Make the following content concise and clear.";
        break;
        default:
        instruction = "Rewrite the following transcript.";
    }

    const response = await axios.post(
        CEREBRAS_API_URL,
        {
        model: "llama3.1-8b",
        messages: [
            {
            role: "user",
            content: `${instruction}\n\n${transcript}`
            }
        ],
        max_tokens: 800
        },
        {
        headers: {
            Authorization: `Bearer ${process.env.CEREBRAS_API_KEY}`,
            "Content-Type": "application/json"
        }
        }
    );

    return response.data.choices[0].message.content;
};
