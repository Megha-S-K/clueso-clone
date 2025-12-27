import express from "express";
import cors from "cors";
import projectRoutes from "./routes/project.routes.js";
// routes (we’ll create these soon)
import path from "path";
import authRoutes from "./routes/auth.routes.js";
//import insightRoutes from "./routes/insight.routes.js";
import uploadRoutes from "./routes/upload.routes.js";
const app = express();

// middleware
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.resolve("uploads")));

// routes
app.use("/api/auth", authRoutes);
//app.use("/api/ai", aiRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/projects", projectRoutes);
//app.use("/api/insights", insightRoutes);

// health check
app.get("/", (req, res) => {
    res.send("Clueso Clone API is running 🚀");
});

export default app;
