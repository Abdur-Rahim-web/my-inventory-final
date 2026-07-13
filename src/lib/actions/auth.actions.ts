"use server";

import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/User";
import { loginSchema, registerSchema } from "@/utils/validation";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { signIn } from "@/lib/auth";


export type AuthResponse = {
    success: boolean;
    message: string;
    errors?: z.ZodFormattedError<z.infer<typeof loginSchema> & z.infer<typeof registerSchema>>;
};

type LoginInput = z.infer<typeof loginSchema>;
type RegisterInput = z.infer<typeof registerSchema>;

export async function loginUser(data: LoginInput): Promise<AuthResponse> {
    const result = loginSchema.safeParse(data);
    if (!result.success) {
        return { success: false, message: "Invalid data", errors: result.error.format() };
    }

    try {
        await signIn("credentials", {
            email: data.email,
            password: data.password,
            redirect: false,
        });
        return { success: true, message: "Login Successful!" };
    } catch (error) {
        return { success: false, message: "Invalid credentials" };
    }
}

export async function registerUser(data: RegisterInput & { image?: string }): Promise<AuthResponse> {
    const result = registerSchema.safeParse(data);
    if (!result.success) {
        return { success: false, message: "Invalid data", errors: result.error.format() };
    }

    await connectToDatabase();
    const existingUser = await User.findOne({ email: data.email });
    if (existingUser) return { success: false, message: "User already exists" };

    const hashedPassword = await bcrypt.hash(data.password, 10);

    await User.create({
        name: data.name,
        email: data.email,
        password: hashedPassword,
        image: data.image || "",
        role: "user"
    });

    return { success: true, message: "User created successfully!" };
}