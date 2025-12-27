import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Signup() {
    const [form, setForm] = useState({});
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await api.post("/auth/register", form);
        navigate("/");
    };

    return (
        <div className="h-screen flex items-center justify-center">
        <form onSubmit={handleSubmit} className="p-6 border rounded w-80">
            <h2 className="text-xl mb-4">Sign Up</h2>

            <input
            placeholder="Email"
            className="border p-2 w-full mb-2"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            />

            <input
            placeholder="Password"
            type="password"
            className="border p-2 w-full mb-2"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            />

            <input
            placeholder="Product Name"
            className="border p-2 w-full mb-4"
            onChange={(e) => setForm({ ...form, productName: e.target.value })}
            />

            <button className="bg-black text-white w-full p-2">
            Create Account
            </button>
        </form>
        </div>
    );
}
