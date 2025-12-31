import { useState } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";

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
        <div className="h-screen flex items-center justify-center bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e]">
    <form
        onSubmit={handleSubmit}
        className="
        w-full max-w-sm
        rounded-2xl p-8
        bg-white/5 backdrop-blur-md
        border border-white/10
        shadow-2xl
        "
    >
        {/* LOGO / TITLE */}
        <h2 className="text-2xl font-semibold text-white text-center mb-1">
        Welcome Back
        </h2>
        <p className="text-sm text-gray-400 text-center mb-6">
        Sign in to continue to Clueso
        </p>

        {/* EMAIL */}
        <label className="block text-sm text-gray-300 mb-1">
        Email
        </label>
        <input
        type="email"
        placeholder="you@example.com"
        className="
            w-full mb-4 px-4 py-2 rounded-lg
            bg-black/40 text-white
            border border-white/10
            focus:outline-none focus:ring-2 focus:ring-pink-500
            placeholder-gray-500
        "
        value={form.email}
        onChange={(e) =>
            setForm({ ...form, email: e.target.value })
        }
        />

        {/* PASSWORD */}
        <label className="block text-sm text-gray-300 mb-1">
        Password
        </label>
        <input
        type="password"
        placeholder="••••••••"
        className="
            w-full mb-6 px-4 py-2 rounded-lg
            bg-black/40 text-white
            border border-white/10
            focus:outline-none focus:ring-2 focus:ring-pink-500
            placeholder-gray-500
        "
        value={form.password}
        onChange={(e) =>
            setForm({ ...form, password: e.target.value })
        }
        />

        {/* SUBMIT */}
        <button
        type="submit"
        className="
            w-full py-3 rounded-lg font-semibold text-white
            bg-gradient-to-r from-pink-500 to-purple-500
            shadow-lg hover:opacity-90 transition
        "
        >
        Login →
        </button>

        {/* FOOTER */}
        <p className="text-xs text-gray-400 text-center mt-6">
        Don’t have an account?{" "}
        <Link
        to="/signup"
        className="text-pink-400 hover:underline"
        >
        Sign up
        </Link>

        </p>
    </form>
</div>

    );
}
