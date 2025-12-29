import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import TranscriptPanel from "../components/TranscriptPanel";
import StructuredView from "../components/StructuredView";

export default function Editor() {
    const { projectId } = useParams();

    const [mode, setMode] = useState("structure"); // default view
    const [transcript, setTranscript] = useState("");
    const [article, setArticle] = useState("");
    const [steps, setSteps] = useState([]);
    const [screenshots, setScreenshots] = useState([]);
    const [loading, setLoading] = useState(true);
    const [transcribing, setTranscribing] = useState(false);

    // 🔹 LOAD PROJECT + TRANSCRIPT ONLY (NO AI CALLS HERE)
    useEffect(() => {
        const loadProject = async () => {
        try {
            setLoading(true);

            const res = await api.get(`/projects/${projectId}`);
            const project = res.data;

            setScreenshots(project.screenshots || []);

            if (!project.rawTranscript) {
            setTranscribing(true);
            const t = await api.post(`/transcript/${projectId}`);
            setTranscript(t.data.transcript);
            setTranscribing(false);
            } else {
            setTranscript(project.rawTranscript);
            }

            if (project.formattedArticle) {
            setArticle(project.formattedArticle);
            }

        } catch (err) {
            console.error("Editor load error:", err);
        } finally {
            setLoading(false);
        }
        };

        loadProject();
    }, [projectId]);

    // 🔹 SINGLE AI ENTRY POINT (VERY IMPORTANT)
    const runAIAction = async (action) => {
        try {
        const res = await api.post("/ai/generate", {
            projectId,
            action
        });

        if (action === "structure") {
            setMode("structure");
            setSteps(res.data.steps || []);
        } else {
            setMode(action);
            setArticle(res.data.article || "");
        }

        } catch (err) {
        console.error("AI action error:", err);
        }
    };

    // 🔹 LOADING SCREEN
    if (loading) {
        return (
        <div className="h-screen flex items-center justify-center">
            <p className="text-gray-600">Preparing editor…</p>
        </div>
        );
    }

    return (
        <div className="flex h-screen">

        {/* LEFT PANEL */}
        <div className="flex-1 p-6 overflow-y-auto">
            <h2 className="text-xl font-semibold mb-4">Editor</h2>

            {/* ACTION BUTTONS */}
            <div className="flex gap-3 mb-6">
            <button
                onClick={() => runAIAction("rewrite")}
                className="btn"
            >
                Rewrite
            </button>

            <button
                onClick={() => runAIAction("structure")}
                className="btn"
            >
                Structure
            </button>

            <button
                onClick={() => runAIAction("concise")}
                className="btn"
            >
                Concise
            </button>
            </div>

            {/* CONTENT AREA */}
            {mode === "structure" ? (
            <StructuredView
                steps={steps}
                screenshots={screenshots}
                loading={!steps.length}
            />
            ) : (
            <textarea
                value={article}
                onChange={(e) => setArticle(e.target.value)}
                className="w-full h-[70vh] border p-4 rounded resize-none"
                placeholder="Generated article will appear here..."
            />
            )}
        </div>

        {/* RIGHT PANEL */}
        <TranscriptPanel
            transcript={
            transcribing
                ? "Transcribing video… please wait."
                : transcript
            }
        />
        </div>
    );
}
