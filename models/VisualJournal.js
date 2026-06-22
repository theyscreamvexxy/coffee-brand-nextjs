import mongoose from "mongoose";

const VisualJournalSchema = new mongoose.Schema(
    {
        type: {
            type: String,
            enum: ["image", "video"],
            required: true,
        },

        mediaUrl: {
            type: String,
            required: true,
        },

        instagramUrl: {
            type: String,
            required: true,
        },

        order: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.models.VisualJournal ||
    mongoose.model("VisualJournal", VisualJournalSchema);