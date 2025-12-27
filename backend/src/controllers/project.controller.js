import Project from "../models/Project.js";

export const createProject = async (req, res) => {
    try {
        const project = await Project.create({
        ...req.body,
        userId: req.userId
        });

        res.status(201).json(project);
    } catch (error) {
        res.status(500).json({ message: "Failed to create project" });
    }
    };

    export const getProjects = async (req, res) => {
    try {
        const projects = await Project.find({ userId: req.userId })
        .sort({ createdAt: -1 });

        res.json(projects);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch projects" });
    }
    };

    export const getProjectById = async (req, res) => {
    try {
        const project = await Project.findOne({
        _id: req.params.id,
        userId: req.userId
        });

        res.json(project);
    } catch (error) {
        res.status(404).json({ message: "Project not found" });
    }
};
