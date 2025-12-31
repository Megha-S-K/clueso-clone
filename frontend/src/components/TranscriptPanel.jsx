export default function TranscriptPanel({ transcript }) {
    return (
        <div className="w-[420px] p-6 bg-white/5 backdrop-blur-md
border-l border-white/10 text-gray-200 overflow-y-auto">

        <h3 className="text-lg font-semibold mb-4 text-white">Transcript</h3>
        <pre className="text-sm whitespace-pre-wrap">
            {transcript || "Transcript will appear here..."}
        </pre>
        </div>
    );
}
