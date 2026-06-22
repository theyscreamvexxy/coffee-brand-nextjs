import { connectDB } from "@/lib/mongodb/connect";
import GalleryItem from "@/models/GalleryItem";

/* GET ALL ACTIVE ITEMS */
export async function GET() {
    try {
        await connectDB();

        const items = await GalleryItem.find({
            isActive: true,
        }).sort({ order: 1 });

        return Response.json({
            success: true,
            items,
        });
    } catch (error) {
        return Response.json({
            success: false,
            error: error.message,
        });
    }
}

/* CREATE ITEM */
export async function POST(request) {
    try {
        await connectDB();

        const body = await request.json();

        const item = await GalleryItem.create(body);

        return Response.json({
            success: true,
            item,
        });
    } catch (error) {
        return Response.json({
            success: false,
            error: error.message,
        });
    }
}