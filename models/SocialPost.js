import mongoose from "mongoose";

const SocialPostSchema = new mongoose.Schema(
    {
        mediaUrl: {
            type: String,
            required: true,
        },

        mediaType: {
            type: String,
            enum: ["image", "video"],
            required: true,
        },

        instagramUrl: {
            type: String,
            required: true,
        },

        title: {
            type: String,
            default: "",
        },

        isActive: {
            type: Boolean,
            default: true,
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

export default mongoose.models.SocialPost ||
    mongoose.model("SocialPost", SocialPostSchema);