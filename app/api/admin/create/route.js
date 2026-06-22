import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/mongodb/connect";
import Admin from "@/models/Admin";

export async function GET() {
    try {
        await connectDB();

        const existingAdmin = await Admin.findOne({
            username: "admin",
        });

        if (existingAdmin) {
            return Response.json({
                success: false,
                message: "Admin already exists",
            });
        }

        const hashedPassword = await bcrypt.hash(
            "admin123",
            10
        );

        await Admin.create({
            username: "admin",
            password: hashedPassword,
        });

        return Response.json({
            success: true,
            message: "Admin created successfully",
        });
    } catch (error) {
        return Response.json({
            success: false,
            error: error.message,
        });
    }
}