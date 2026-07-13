"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react"; 
import { registerUser, AuthResponse } from "@/lib/actions/auth.actions";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";
import { User, Mail, Lock, Loader2, UserPlus, Image as ImageIcon } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";

export default function RegisterPage() {
    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    const handleSubmit = async (formData: FormData) => {
        startTransition(async () => {
            const data = {
                name: formData.get("name") as string,
                email: formData.get("email") as string,
                password: formData.get("password") as string,
                image: formData.get("image") as string, 
            };

            const result: AuthResponse = await registerUser(data);

            if (result.success) {
                toast.success("Account created successfully!");
                router.push("/login");
            } else {
                toast.error(result.message || "Registration failed");
            }
        });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md bg-white p-8 rounded-3xl shadow-xl border border-gray-100"
            >
                <div className="text-center mb-6">
                    <h2 className="text-3xl font-bold text-gray-900">Create Account</h2>
                    <p className="text-gray-500 mt-2">Join our inventory management system</p>
                </div>

                <form action={handleSubmit} className="space-y-4">
                    <div className="relative">
                        <User className="absolute left-3 top-3 text-gray-400" size={20} />
                        <input name="name" type="text" placeholder="Full Name" required className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition" />
                    </div>

                    <div className="relative">
                        <Mail className="absolute left-3 top-3 text-gray-400" size={20} />
                        <input name="email" type="email" placeholder="Email address" required className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition" />
                    </div>

                    <div className="relative">
                        <ImageIcon className="absolute left-3 top-3 text-gray-400" size={20} />
                        <input name="image" type="url" placeholder="Profile Image URL (optional)" className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition" />
                    </div>

                    <div className="relative">
                        <Lock className="absolute left-3 top-3 text-gray-400" size={20} />
                        <input name="password" type="password" placeholder="Password" required className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition" />
                    </div>

                    <button
                        disabled={isPending}
                        className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition disabled:bg-blue-300"
                    >
                        {isPending ? <Loader2 className="animate-spin" size={20} /> : <><UserPlus size={20} /> Register</>}
                    </button>
                </form>

                <div className="my-6 flex items-center">
                    <div className="flex-1 h-px bg-gray-200"></div>
                    <span className="px-3 text-gray-400 text-sm">OR</span>
                    <div className="flex-1 h-px bg-gray-200"></div>
                </div>

                <button
                    onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
                    className="w-full flex items-center justify-center gap-3 border border-gray-200 py-3 rounded-xl font-semibold hover:bg-gray-50 transition"
                >
                    <FcGoogle size={24} />
                    Continue with Google
                </button>

                <div className="mt-6 text-center text-sm text-gray-600">
                    Already have an account? <Link href="/login" className="text-blue-600 font-bold hover:underline">Sign In</Link>
                </div>
            </motion.div>
        </div>
    );
}