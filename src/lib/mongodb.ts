// src/lib/mongodb.ts
import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

export async function connectToDatabase() {
    // কনসোলে প্রিন্ট করে দেখুন স্ট্রিংটি ঠিকমতো আসছে কি না
    console.log("DEBUG - MONGODB_URI is:", MONGODB_URI);

    if (!MONGODB_URI) {
        throw new Error("MONGODB_URI is not defined.");
    }

    // স্ট্রিংটি সঠিক ফরম্যাটে আছে কি না চেক করুন
    if (!MONGODB_URI.startsWith("mongodb://") && !MONGODB_URI.startsWith("mongodb+srv://")) {
        throw new Error(`Invalid MONGODB_URI format: ${MONGODB_URI}`);
    }

    if (mongoose.connection.readyState >= 1) return;

    try {
        await mongoose.connect(MONGODB_URI);
        console.log("Connected to MongoDB successfully");
    } catch (error) {
        console.error("Database connection failed:", error);
        throw error;
    }
}