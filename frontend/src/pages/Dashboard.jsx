import Sidebar from "../components/Sidebar";
import UploadVideo from "../components/UploadVideo";

export default function Dashboard() {
    return (
        <div className="flex h-screen text-gray-200 bg-dashboard-gradient">
        {/* SIDEBAR */}
        <Sidebar />

        {/* MAIN CONTENT */}
        <main className="flex-1 p-8 overflow-hidden">
            {/* HEADER */}
            <div className="mb-6">
            <h1 className="text-2xl font-bold text-white mb-2">
                Projects
            </h1>

            <div className="flex gap-3">
                <button
                className="px-5 py-2 rounded-lg font-medium text-white
                bg-gradient-to-r from-pink-500 to-purple-500
                shadow-lg hover:opacity-90 transition"
                >
                + New Video
                </button>

                <button
                className="px-5 py-2 rounded-lg font-medium
                bg-white/5 border border-white/10
                hover:bg-white/10 transition"
                >
                New Folder
                </button>
            </div>
            </div>

            {/* PROJECT CANVAS */}
            <div
            className="flex items-center justify-center h-[70vh]
            rounded-xl border border-white/10
            bg-white/5 backdrop-blur-md"
            >
            <UploadVideo />
            </div>
        </main>
        </div>
    );
}
