export default function StructuredView({ steps, screenshots, loading }) {
    if (loading) {
        return (
        <div className="space-y-6 animate-pulse">
            <div className="h-6 bg-gray-200 rounded w-1/3"></div>
            <div className="h-48 bg-gray-200 rounded"></div>
        </div>
        );
    }

    if (!steps || steps.length === 0) {
        return (
        <p className="text-gray-400">
            Generating structured steps from your video…
        </p>
        );
    }

    // 🔥 20-second window logic (frontend side)
    const screenshotsPerStep = Math.ceil(
        screenshots.length / steps.length
    );

    console.log("Screenshots received:", screenshots);


    return (
        <div className="space-y-10">
        {steps.map((step, index) => {
            const start = index * screenshotsPerStep;
            const end = start + screenshotsPerStep;
            const stepScreenshots = screenshots.slice(start, end);

            return (
            <div
                key={index}
                className="border rounded-lg p-5 bg-white shadow-sm"
            >
                <h3 className="text-lg font-semibold mb-3">
                Step {index + 1}: {step.title}
                </h3>

                {/* ✅ MULTIPLE SCREENSHOTS PER STEP */}
                {stepScreenshots.length > 0 && (
                <div className="grid grid-cols-2 gap-3 mb-4">
                    {stepScreenshots.map((img, i) => (
                    <img
                        key={i}
                        src={`http://localhost:5000/${img}`}
                        alt={`Step ${index + 1} screenshot ${i + 1}`}
                        className="rounded-lg border object-cover"
                    />
                    ))}
                </div>
                )}

                <p className="text-gray-700 leading-relaxed">
                {step.content}
                </p>
            </div>
            );
        })}
        </div>
    );
}
