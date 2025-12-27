import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
    try {
        const { email, password, productName } = req.body;

        // check user exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
        }

        // hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
        email,
        password: hashedPassword,
        productName
        });

        res.status(201).json({ message: "User registered successfully" });

    } catch (error) {
        res.status(500).json({ message: "Registration failed" });
    }
    };

    export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
        return res.status(404).json({ message: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
        return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
        );

        res.json({
        token,
        user: {
            id: user._id,
            email: user.email,
            productName: user.productName
        }
        });

    } catch (error) {
        res.status(500).json({ message: "Login failed" });
    }
};
