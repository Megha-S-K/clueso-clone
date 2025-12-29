import express from "express";
import cors from "cors";
import projectRoutes from "./routes/project.routes.js";
import path from "path";
import authRoutes from "./routes/auth.routes.js";
import aiRoutes from "./routes/ai.routes.js";
import uploadRoutes from "./routes/upload.routes.js";
import transcriptRoutes from "./routes/transcript.routes.js";

const app = express();
const __dirname = new URL('.', import.meta.url).pathname;
// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.resolve("uploads")));
app.use("/api/ai", aiRoutes);
// routes
app.use("/api/auth", authRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/transcript", transcriptRoutes);


app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));


// health check
app.get("/", (req, res) => {
    res.send("Clueso Clone API is running 🚀");
});

export default app;
