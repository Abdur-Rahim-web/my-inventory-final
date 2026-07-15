"use client";

import { useTransition } from "react";
import { signIn } from "next-auth/react";
import { loginUser } from "@/lib/actions/auth.actions";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";
import { Mail, Lock, Loader2, LogIn } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    const handleSubmit = async (formData: FormData) => {
        startTransition(async () => {
            const data = {
                email: formData.get("email") as string,
                password: formData.get("password") as string,
            };
            const result = await loginUser(data);
            if (result.success) {
                toast.success("Login Successful!");
                router.push("/dashboard"); 
                router.refresh();
            } else {
                toast.error(result.message);
            }
        });
    };

    const handleDemoLogin = async () => {
        startTransition(async () => {

            const demoData = { email: "admin@test.com", password: "123456" };
            const result = await loginUser(demoData);

            if (result.success) {
                toast.success("Demo Login Successful!");
                router.push("/dashboard"); 
                router.refresh();
            } else {
                toast.error("Demo login failed: " + result.message);
            }
        });
    };

    const handleDemoUserLogin = async () => {
        startTransition(async () => {
        
            const demoUserData = { email: "user@test.com", password: "123456" };
            const result = await loginUser(demoUserData);

            if (result.success) {
                toast.success("User Demo Login Successful!");
                router.push("/dashboard"); 
                router.refresh();
            } else {
                toast.error("User demo login failed: " + result.message);
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
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-900">Welcome Back</h2>
                    <p className="text-gray-500 mt-2">Sign in to your inventory account</p>
                </div>


                <form action={handleSubmit} className="space-y-4">
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

                    <button
                        disabled={isPending}
                        className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition disabled:bg-blue-300"
                    >
                        {isPending ? <Loader2 className="animate-spin" size={20} /> : <><LogIn size={20} /> Sign In</>}
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

                <button
                    type="button"
                    onClick={handleDemoLogin}
                    disabled={isPending}
                    className="w-full mt-4 flex items-center justify-center gap-2 bg-emerald-600 text-white py-3 rounded-xl font-semibold hover:bg-emerald-700 transition"
                >
                    Demo Admin Login
                </button>

                <button
                    type="button"
                    onClick={handleDemoUserLogin}
                    disabled={isPending}
                    className="w-full mt-2 flex items-center justify-center gap-2 bg-purple-600 text-white py-3 rounded-xl font-semibold hover:bg-purple-700 transition"
                >
                    Demo User Login
                </button>

                <div className="mt-6 text-center text-sm text-gray-600">
                    Don&apos;t have an account? <Link href="/register" className="text-blue-600 font-bold hover:underline">Register here</Link>
                </div>
            </motion.div>
        </div>
    );
}
