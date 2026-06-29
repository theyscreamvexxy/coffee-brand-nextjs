// lib/mongodb/connect.js
import mongoose from "mongoose";

/*
 * Do NOT read process.env.MONGODB_URI at module level.
 *
 * Next.js statically evaluates every imported module during `next build`.
 * If MONGODB_URI is absent at build time (common on Vercel — env vars are
 * only available at runtime for server functions, not during the build step),
 * a top-level throw causes the entire route bundle to fail with:
 *   "Error: Failed to collect page data for /api/admin/create"
 *
 * Moving the read + guard inside connectDB() means it only executes when the
 * API handler actually calls connectDB() at request time — after the build.
 */

let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = {
        conn: null,
        promise: null,
    };
}

export async function connectDB() {
    // Read at runtime, not build time
    const MONGODB_URI = process.env.MONGODB_URI;

    if (!MONGODB_URI) {
        throw new Error(
            "MONGODB_URI environment variable is not set. " +
            "Add it to Vercel Project Settings → Environment Variables."
        );
    }

    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        cached.promise = mongoose.connect(MONGODB_URI, {
            bufferCommands: false,
        });
    }

    cached.conn = await cached.promise;

    return cached.conn;
}
