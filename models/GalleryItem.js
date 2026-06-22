import mongoose from "mongoose";

const GalleryItemSchema = new mongoose.Schema(
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

        thumbnailUrl: {
            type: String,
            default: "",
        },

        instagramUrl: {
            type: String,
            required: true,
        },

        title: {
            type: String,
            default: "",
        },

        order: {
            type: Number,
            default: 0,
        },

        isActive: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.models.GalleryItem ||
    mongoose.model("GalleryItem", GalleryItemSchema);