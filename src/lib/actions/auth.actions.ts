
"use server"

import { loginSchema, registerSchema } from "@/utils/validation";
import { z } from "zod";

type LoginInput = z.infer<typeof loginSchema>;
type RegisterInput = z.infer<typeof registerSchema>;

// Auth actions
export async function loginUser(data: LoginInput) {
    const result = loginSchema.safeParse(data);

    if (!result.success) {
        return { success: false, message: "Invalid data", errors: result.error.format() };
    }

    console.log("Login Data:", result.data);
    return { success: true, message: "Login Successful!" };
}

export async function registerUser(data: RegisterInput) {
    const result = registerSchema.safeParse(data);

    if (!result.success) {
        return { success: false, message: "Invalid data", errors: result.error.format() };
    }

    console.log("Registration Data:", result.data);
    return { success: true, message: "Registration Successful!" };
}