import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

export default function UploadVideo() {
    const [video, setVideo] = useState(null);
    const [title, setTitle] = useState("");
    const navigate = useNavigate();

    const upload = async () => {
        if (!video) return;

        const formData = new FormData();
        formData.append("video", video);
        formData.append("title", title);

        const res = await api.post("/upload/video", formData, {
        headers: { "Content-Type": "multipart/form-data" }
        });

        navigate(`/editor/${res.data._id}`);
    };

    return (
        <div
    className="
        w-full max-w-lg mx-auto
        rounded-2xl p-8
        bg-white/5 backdrop-blur-md
        border border-white/10
        shadow-xl
    "
    >

    {/* TITLE */}
    <h2 className="text-xl font-semibold text-white text-center mb-2">
        Upload a New Video
    </h2>

    <p className="text-sm text-gray-400 text-center mb-6">
        Upload a screen recording or demo video to generate
        structured steps, screenshots, and documentation.
    </p>

    {/* PROJECT TITLE */}
    <label className="block text-sm text-gray-300 mb-1">
        Project Title
    </label>
    <input
        type="text"
        className="
        w-full mb-4 px-4 py-2 rounded-lg
        bg-black/40 text-white
        border border-white/10
        focus:outline-none focus:ring-2 focus:ring-pink-500
        placeholder-gray-500
        "
        onChange={(e) => setTitle(e.target.value)}
    />

    {/* FILE INPUT */}
    <label className="block text-sm text-gray-300 mb-1">
        Video File
    </label>
    <input
        type="file"
        accept="video/*"
        className="
        w-full mb-6 text-sm text-gray-300
        file:mr-4 file:px-4 file:py-2
        file:rounded-lg file:border-0
        file:bg-gradient-to-r file:from-pink-500 file:to-purple-500
        file:text-white file:font-medium
        hover:file:opacity-90
        cursor-pointer
        "
        onChange={(e) => setVideo(e.target.files[0])}
    />

    {/* UPLOAD BUTTON */}
    <button
        onClick={upload}
        className="
        w-full py-3 rounded-lg font-semibold text-white
        bg-gradient-to-r from-pink-500 to-purple-500
        shadow-lg hover:opacity-90 transition
        "
    >
        Upload & Continue →
    </button>
</div>

    );
}
