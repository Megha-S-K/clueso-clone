import Sidebar from "../components/Sidebar";
import UploadVideo from "../components/UploadVideo";

export default function Dashboard() {
    return (
        <div className="flex h-screen bg-gray-100">
        <Sidebar />
        <main className="flex-1 p-6 flex items-center justify-center">
            <UploadVideo />
        </main>
        </div>
    );
}

