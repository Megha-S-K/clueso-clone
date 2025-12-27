import { useState } from "react";
import api from "../services/api";

export default function Login() {
    const [form, setForm] = useState({
        email: "",
        password: ""
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
        const res = await api.post("/auth/login", form);

        localStorage.setItem("token", res.data.token);

        // force clean navigation
        window.location.href = "/dashboard";
        } catch (err) {
        alert("Login failed. Please check your credentials.");
        console.error(err);
        }
    };

    return (
        <div className="h-screen flex items-center justify-center">
        <form
            onSubmit={handleSubmit}
            className="p-6 border rounded w-80 bg-white"
        >
            <h2 className="text-xl mb-4 font-semibold">Login</h2>

            <input
            placeholder="Email"
            className="border p-2 w-full mb-2"
            value={form.email}
            onChange={(e) =>
                setForm({ ...form, email: e.target.value })
            }
            />

            <input
            placeholder="Password"
            type="password"
            className="border p-2 w-full mb-4"
            value={form.password}
            onChange={(e) =>
                setForm({ ...form, password: e.target.value })
            }
            />

            <button
            type="submit"
            className="bg-black text-white w-full p-2 rounded"
            >
            Login
            </button>
        </form>
        </div>
    );
}
