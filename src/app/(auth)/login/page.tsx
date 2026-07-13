"use client";

import { useTransition } from "react";
import { loginUser, AuthResponse } from "@/lib/actions/auth.actions";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";
import { Mail, Lock, Loader2, LogIn } from "lucide-react";

export default function LoginPage() {
    const [isPending, startTransition] = useTransition();

    const handleSubmit = async (formData: FormData) => {
        const data = {
            email: formData.get("email") as string,
            password: formData.get("password") as string,
        };

        startTransition(async () => {
            const result: AuthResponse = await loginUser(data);
            if (result.success) {
                toast.success(result.message);
                // এখানে চাইলে ড্যাশবোর্ডে রিডাইরেক্ট করতে পারেন: window.location.href = "/dashboard";
            } else {
                toast.error(result.message);
            }
        });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md bg-white p-8 rounded-3xl shadow-xl border border-gray-100"
            >
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-900">Welcome Back</h2>
                    <p className="text-gray-500 mt-2">Sign in to your inventory account</p>
                </div>

                <form action={handleSubmit} className="space-y-5">
                    <div className="relative">
                        <Mail className="absolute left-3 top-3 text-gray-400" size={20} />
                        <input
                            name="email"
                            type="email"
                            placeholder="Email address"
                            required
                            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition"
                        />
                    </div>

                    <div className="relative">
                        <Lock className="absolute left-3 top-3 text-gray-400" size={20} />
                        <input
                            name="password"
                            type="password"
                            placeholder="Password"
                            required
                            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition"
                        />
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        disabled={isPending}
                        className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition disabled:bg-blue-300"
                    >
                        {isPending ? (
                            <Loader2 className="animate-spin" size={20} />
                        ) : (
                            <>
                                <LogIn size={20} /> Sign In
                            </>
                        )}
                    </motion.button>
                </form>
            </motion.div>
        </div>
    );
}