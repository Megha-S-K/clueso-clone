import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import TranscriptPanel from "../components/TranscriptPanel";
import AIActions from "../components/AIActions";

export default function Editor() {
    const { projectId } = useParams();

    const [transcript, setTranscript] = useState("");
    const [article, setArticle] = useState("");
    const [loading, setLoading] = useState(true);
    const [transcribing, setTranscribing] = useState(false);

    useEffect(() => {
        const loadProject = async () => {
        try {
            setLoading(true);

            // 1️⃣ Load project
            const res = await api.get(`/projects/${projectId}`);

            // 2️⃣ If transcript missing → auto-generate
            if (!res.data.rawTranscript) {
            setTranscribing(true);
            const t = await api.post(`/transcript/${projectId}`);
            setTranscript(t.data.transcript);
            setTranscribing(false);
            } else {
            setTranscript(res.data.rawTranscript);
            }

            // 3️⃣ Load article if exists
            setArticle(res.data.formattedArticle || "");

        } catch (err) {
            console.warn("Editor load error:", err);
        } finally {
            setLoading(false);
        }
        };

        loadProject();
    }, [projectId]);

    if (loading) {
    return (
        <div className="h-screen flex flex-col items-center justify-center gap-4">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-black"></div>
        <p className="text-gray-600">
            Preparing your workspace…
        </p>
        <p className="text-sm text-gray-400">
            If this is your first upload, transcription may take a moment.
        </p>
        </div>
    );
}


    return (
        <div className="flex h-screen">

        {/* LEFT: ARTICLE EDITOR */}
        <div className="flex-1 p-6 overflow-y-auto">
            <h2 className="text-xl font-semibold mb-4">Article Editor</h2>

            <textarea
            value={article}
            onChange={(e) => setArticle(e.target.value)}
            placeholder="Your generated article will appear here..."
            className="w-full h-[70vh] border rounded p-4 resize-none"
            />

            <AIActions
            projectId={projectId}
            setArticle={setArticle}
            />
        </div>

        {/* RIGHT: TRANSCRIPT */}
        <TranscriptPanel
            transcript={
            transcribing
                ? "Transcribing video... please wait."
                : transcript
            }
        />
        </div>
    );
}
