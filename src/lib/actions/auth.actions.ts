"use server";

import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/User";
import { loginSchema, registerSchema } from "@/utils/validation";
import bcrypt from "bcryptjs";
import { z } from "zod";


export type AuthResponse = {
    success: boolean;
    message: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    errors?: any;
};

type LoginInput = z.infer<typeof loginSchema>;
type RegisterInput = z.infer<typeof registerSchema>;

export async function loginUser(data: LoginInput): Promise<AuthResponse> {
    const result = loginSchema.safeParse(data);
    if (!result.success) {
        return { success: false, message: "Invalid data", errors: result.error.format() };
    }

    await connectToDatabase();
    const user = await User.findOne({ email: data.email });
    if (!user) return { success: false, message: "User not found" };

    const isMatch = await bcrypt.compare(data.password, user.password);
    if (!isMatch) return { success: false, message: "Invalid credentials" };

    return { success: true, message: "Login Successful!" };
}

export async function registerUser(data: RegisterInput): Promise<AuthResponse> {
    const result = registerSchema.safeParse(data);
    if (!result.success) {
        return { success: false, message: "Invalid data", errors: result.error.format() };
    }

    await connectToDatabase();
    const existingUser = await User.findOne({ email: data.email });
    if (existingUser) return { success: false, message: "User already exists" };

    const hashedPassword = await bcrypt.hash(data.password, 10);
    await User.create({ name: data.name, email: data.email, password: hashedPassword });

    return { success: true, message: "User created successfully!" };
}