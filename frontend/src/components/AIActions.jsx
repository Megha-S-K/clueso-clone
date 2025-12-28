import api from "../services/api";

export default function AIActions({ projectId, setArticle }) {
    const runAction = async (action) => {
        const res = await api.post("/ai/generate", {
        projectId,
        action
        });
        setArticle(res.data.article);
    };

    return (
        <div className="flex gap-2 mb-3">
        <button
            onClick={() => runAction("rewrite")}
            className="px-3 py-1 bg-black text-white rounded"
        >
            Rewrite
        </button>

        <button
            onClick={() => runAction("structure")}
            className="px-3 py-1 bg-black text-white rounded"
        >
            Structure
        </button>

        <button
            onClick={() => runAction("concise")}
            className="px-3 py-1 bg-black text-white rounded"
        >
            Concise
        </button>
        </div>
    );
}
