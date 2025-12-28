import express from "express";
import cors from "cors";
import projectRoutes from "./routes/project.routes.js";
import path from "path";
import authRoutes from "./routes/auth.routes.js";
import aiRoutes from "./routes/ai.routes.js";
import uploadRoutes from "./routes/upload.routes.js";
import transcriptRoutes from "./routes/transcript.routes.js";

const app = express();

// middleware
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.resolve("uploads")));
app.use("/api/ai", aiRoutes);
// routes
app.use("/api/auth", authRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/transcript", transcriptRoutes);


// health check
app.get("/", (req, res) => {
    res.send("Clueso Clone API is running 🚀");
});

export default app;
