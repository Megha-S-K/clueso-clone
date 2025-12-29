export default function StructuredView({ steps, screenshots, loading }) {
    if (loading) {
        return (
            <div className="space-y-6 animate-pulse">
                <div className="h-6 bg-gray-200 rounded w-1/3"></div>
                <div className="h-48 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-full"></div>
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

    // ✅ Screenshot grouping logic
    const screenshotsPerStep = Math.floor(
        screenshots.length / steps.length
    ) || 1;

    return (
        <div className="space-y-10">
            {steps.map((step, index) => {
                const screenshotIndex = index * screenshotsPerStep;
                const screenshot = screenshots[screenshotIndex];

                return (
                    <div key={index} className="border rounded-lg p-5 bg-white">
                        <h3 className="text-lg font-semibold mb-2">
                            Step {index + 1}: {step.title}
                        </h3>

                        {/* ✅ Representative screenshot */}
                        {screenshot && (
                            <img
                                src={`http://localhost:5000/${screenshot}`}
                                alt={`Step ${index + 1}`}
                                className="rounded-lg border mb-4 max-w-full"
                            />
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
