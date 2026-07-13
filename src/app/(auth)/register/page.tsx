"use client";

import { useTransition } from "react";
import { registerUser, AuthResponse } from "@/lib/actions/auth.actions";
import toast from "react-hot-toast";

export default function RegisterPage() {
    const [isPending, startTransition] = useTransition();

    const handleSubmit = async (formData: FormData) => {
        const data = {
            name: formData.get("name") as string,
            email: formData.get("email") as string,
            password: formData.get("password") as string,
        };

        startTransition(async () => {
            const result: AuthResponse = await registerUser(data);
            if (result.success) {
                toast.success(result.message);
            } else {
                toast.error(result.message, result.errors || "");
            }
        });
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
            <form action={handleSubmit} className="w-full max-w-md bg-white p-8 rounded-lg shadow-md space-y-4">
                <h2 className="text-2xl font-bold text-center">Register</h2>
                <input name="name" type="text" placeholder="Name" required className="w-full p-2 border rounded" />
                <input name="email" type="email" placeholder="Email" required className="w-full p-2 border rounded" />
                <input name="password" type="password" placeholder="Password" required className="w-full p-2 border rounded" />
                <button disabled={isPending} className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
                    {isPending ? "Registering..." : "Register"}
                </button>
            </form>
        </div>
    );
}