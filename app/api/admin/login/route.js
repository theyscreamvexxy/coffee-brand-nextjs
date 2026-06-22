import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { connectDB } from "@/lib/mongodb/connect";
import Admin from "@/models/Admin";

export async function POST(request) {
    try {
        await connectDB();

        const { username, password } =
            await request.json();

        const admin = await Admin.findOne({
            username,
        });

        if (!admin) {
            return Response.json({
                success: false,
                message: "Invalid credentials",
            });
        }

        const validPassword =
            await bcrypt.compare(
                password,
                admin.password
            );

        if (!validPassword) {
            return Response.json({
                success: false,
                message: "Invalid credentials",
            });
        }

        const token = jwt.sign(
            {
                adminId: admin._id,
                username: admin.username,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "7d",
            }
        );

        return Response.json({
            success: true,
            token,
        });
    } catch (error) {
        return Response.json({
            success: false,
            error: error.message,
        });
    }
}