import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
    {
        title: {
        type: String,
        required: true
        },
        videoPath: {
        type: String,
        required: true
        },
        rawTranscript: {
        type: String,
        default: ""
        },
        formattedArticle: {
        type: String,
        default: ""
        },
        userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
        }
    },
    { timestamps: true }
);

export default mongoose.model("Project", projectSchema);
