import { useState } from "react";
import api from "../services/api";
import { useNavigate, Link } from "react-router-dom";

export default function Signup() {
    const [form, setForm] = useState({});
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await api.post("/auth/register", form);
        navigate("/");
    };

    return (
        <div className="h-screen flex items-center justify-center 
                        bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e]">
            
            <form
                onSubmit={handleSubmit}
                className="w-96 p-8 rounded-2xl
                            bg-white/5 backdrop-blur-xl
                            border border-white/10
                            shadow-2xl"
            >
                {/* Title */}
                <h2 className="text-2xl font-semibold text-white mb-6 text-center">
                    Create Account
                </h2>

                {/* Email */}
                <input
                    placeholder="Email"
                    className="w-full mb-3 px-4 py-3 rounded-lg
                                bg-white/10 text-white placeholder-gray-400
                                border border-white/10
                                focus:outline-none focus:ring-2 focus:ring-pink-500"
                    onChange={(e) =>
                        setForm({ ...form, email: e.target.value })
                    }
                />

                {/* Password */}
                <input
                    placeholder="Password"
                    type="password"
                    className="w-full mb-3 px-4 py-3 rounded-lg
                                bg-white/10 text-white placeholder-gray-400
                                border border-white/10
                                focus:outline-none focus:ring-2 focus:ring-pink-500"
                    onChange={(e) =>
                        setForm({ ...form, password: e.target.value })
                    }
                />

                {/* Product Name */}
                <input
                    placeholder="Product Name"
                    className="w-full mb-5 px-4 py-3 rounded-lg
                                bg-white/10 text-white placeholder-gray-400
                                border border-white/10
                                focus:outline-none focus:ring-2 focus:ring-pink-500"
                    onChange={(e) =>
                        setForm({ ...form, productName: e.target.value })
                    }
                />

                {/* Button */}
                <button
                    type="submit"
                    className="w-full py-3 rounded-lg
                                bg-pink-500 hover:bg-pink-600
                                text-white font-medium
                                transition-all duration-200"
                >
                    Create Account
                </button>

                {/* Footer */}
                <p className="text-sm text-gray-400 text-center mt-4">
                    Already have an account?{" "}
                    <Link to="/" className="text-pink-400 hover:underline">
                        Login
                    </Link>
                </p>
            </form>
        </div>
    );
}
