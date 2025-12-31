import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import TranscriptPanel from "../components/TranscriptPanel";
import StructuredView from "../components/StructuredView";

export default function Editor() {
    const { projectId } = useParams();

    const [mode, setMode] = useState("structure");
    const [transcript, setTranscript] = useState("");
    const [article, setArticle] = useState("");
    const [steps, setSteps] = useState([]);
    const [screenshots, setScreenshots] = useState([]);
    const [loading, setLoading] = useState(true);
    const [transcribing, setTranscribing] = useState(false);

    // 🔹 INITIAL LOAD: PROJECT + TRANSCRIPT + STRUCTURE
    useEffect(() => {
        const loadProject = async () => {
        try {
            setLoading(true);

            // 1️⃣ Load project
            const res = await api.get(`/projects/${projectId}`);
            const project = res.data;

            setScreenshots(project.screenshots || []);

            // 2️⃣ Ensure transcript exists
            let transcriptText = project.rawTranscript;

            if (!transcriptText) {
            setTranscribing(true);
            const t = await api.post(`/transcript/${projectId}`);
            transcriptText = t.data.transcript;
            setTranscribing(false);
            }

            setTranscript(transcriptText);

            // 3️⃣ Generate structure ONLY after transcript exists
            const s = await api.post("/ai/generate", {
            projectId,
            action: "structure"
            });

            setSteps(s.data.steps || []);
            setMode("structure");

        } catch (err) {
            console.error(
            "Editor load error:",
            err.response?.data || err.message
            );
        } finally {
            setLoading(false);
        }
        };

        loadProject();
    }, [projectId]);

    // 🔁 POLLING: WAIT FOR SCREENSHOTS (BACKGROUND PROCESS)
    useEffect(() => {
        if (!projectId) return;

        const interval = setInterval(async () => {
        try {
            const res = await api.get(`/projects/${projectId}`);

            if (res.data.screenshots && res.data.screenshots.length > 0) {
            setScreenshots(res.data.screenshots);
            clearInterval(interval); // ✅ stop polling
            }
        } catch (err) {
            console.warn("Polling screenshots failed",err.message);
        }
        }, 3000); // every 3 seconds

        return () => clearInterval(interval);
    }, [projectId]);

    // 🔹 RUN AI ACTIONS (REWRITE / STRUCTURE / CONCISE)
    const runAIAction = async (action) => {
        try {
        setMode(action);

        if (action === "structure") {
            setSteps([]);
        }

        const res = await api.post("/ai/generate", {
            projectId,
            action
        });

        if (action === "structure") {
            setSteps(res.data.steps || []);
        } else {
            setArticle(res.data.article || "");
        }
        } catch (err) {
        console.error(
            "AI action error:",
            err.response?.data || err.message
        );
        }
    };

    // 🔹 LOADING UI
    if (loading) {
        return (
        <div className="h-screen flex flex-col items-center justify-center gap-3">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gray-300"></div>
            <p className="text-gray-300 tracking-wide">
            Preparing your workspace…
            </p>

            {transcribing && (
            <p className="text-sm text-gray-400">
                Transcribing video, please wait.
            </p>
            )}
        </div>
        );
    }

    return (
        <div className="flex h-screen bg-transparent">

        {/* LEFT PANEL */}
        <div className="flex-1 p-8 overflow-y-auto">
            <h2 className="text-2xl font-bold mb-6 text-white">
                Video Guide Editor
                </h2>

            {/* ACTION BUTTONS */}
            <div className="flex gap-3 mb-6">
            <button
                onClick={() => runAIAction("rewrite")}
                className="px-5 py-2 rounded-lg font-medium
                            bg-pink-500
                            hover:opacity-90 transition text-white shadow-md"

            >
                Rewrite
            </button>

            <button
                onClick={() => runAIAction("structure")}
                className="px-5 py-2 rounded-lg font-medium
                            bg-pink-500
                            hover:opacity-90 transition text-white shadow-md"

            >
                Structure
            </button>

            <button
                onClick={() => runAIAction("concise")}
                className="px-5 py-2 rounded-lg font-medium
                        bg-pink-500
                        hover:opacity-90 transition text-white shadow-md"

            >
                Concise
            </button>
            </div>

            {/* CONTENT */}
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
                className="w-full h-[70vh] border p-4 rounded resize-none bg-transparent"
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
