export default function Sidebar() {
    return (
        <div className="w-64 bg-gray-900 text-white p-5 flex flex-col">
        <h1 className="text-xl font-bold mb-6">Clueso Clone</h1>

        <nav className="flex-1 space-y-3">
            <p className="text-gray-300">Dashboard</p>
            <p className="text-gray-300">Feedback</p>
            <p className="text-gray-300">Insights</p>
        </nav>

        <button
            onClick={() => {
            localStorage.removeItem("token");
            window.location.href = "/";
            }}
            className="text-sm text-red-400 mt-auto"
        >
            Logout
        </button>
        </div>
    );
}
