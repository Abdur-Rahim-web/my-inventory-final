"use client";

import { useTransition } from "react";
import { loginUser } from "@/lib/actions/auth.actions";

export default function LoginPage() {
    const [isPending, startTransition] = useTransition();

    const handleSubmit = async (formData: FormData) => {
        const data = {
            email: formData.get("email") as string,
            password: formData.get("password") as string,
        };

        startTransition(async () => {
            const result = await loginUser(data);
            if (result.success) {
                alert(result.message);
            } else {
                console.error(result.errors);
            }
        });
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
            <form action={handleSubmit} className="w-full max-w-md bg-white p-8 rounded-lg shadow-md space-y-4">
                <h2 className="text-2xl font-bold text-center">Login</h2>
                <input name="email" type="email" placeholder="Email" required className="w-full p-2 border rounded" />
                <input name="password" type="password" placeholder="Password" required className="w-full p-2 border rounded" />
                <button disabled={isPending} className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
                    {isPending ? "Logging in..." : "Login"}
                </button>
            </form>
        </div>
    );
}