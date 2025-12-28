export default function TranscriptPanel({ transcript }) {
    return (
        <div className="w-1/3 border-l p-4 overflow-y-auto bg-gray-50">
        <h3 className="font-semibold mb-2">Transcript</h3>
        <pre className="text-sm whitespace-pre-wrap">
            {transcript || "Transcript will appear here..."}
        </pre>
        </div>
    );
}
