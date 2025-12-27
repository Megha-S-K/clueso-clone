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
        <div className="bg-white p-6 rounded shadow">
        <h2 className="text-lg font-semibold mb-3">
            Upload a Video
        </h2>

        <input
            type="text"
            placeholder="Project title"
            className="border p-2 w-full mb-2"
            onChange={(e) => setTitle(e.target.value)}
        />

        <input
            type="file"
            accept="video/*"
            className="mb-3"
            onChange={(e) => setVideo(e.target.files[0])}
        />

        <button
            onClick={upload}
            className="bg-black text-white px-4 py-2 rounded"
        >
            Upload & Continue
        </button>
        </div>
    );
}
