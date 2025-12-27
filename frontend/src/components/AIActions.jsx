import api from "../services/api";

export default function AIActions({ projectId, setContent }) {
    const runAction = async (action) => {
        const res = await api.post("/ai/action", {
        projectId,
        action
        });
        setContent(res.data.output);
    };

    return (
        <div className="flex gap-2 mb-3">
        <button onClick={() => runAction("rewrite")} className="btn">
            Rewrite
        </button>
        <button onClick={() => runAction("improve")} className="btn">
            Improve
        </button>
        <button onClick={() => runAction("concise")} className="btn">
            Concise
        </button>
        <button onClick={() => runAction("structure")} className="btn">
            Structure
        </button>
        </div>
    );
}
