"use client";

import { useSession } from "next-auth/react";
import { motion } from "framer-motion";
import { User } from "lucide-react";


export default function DashboardHeader() {
    const { data: session } = useSession();

    return (
        <motion.header 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="h-20 bg-white border-b border-gray-100 px-8 flex items-center justify-between shadow-sm"
        >
           
            <div>
                <h1 className="text-2xl font-bold text-gray-900">
                    Welcome back, {session?.user?.name || "User"}! 👋
                </h1>
                <p className="text-sm text-gray-500">Here is your inventory summary today.</p>
            </div>

            
            <div className="flex items-center gap-6">
                <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-full border border-gray-100 text-green-500">
                    <User size={20} />
                    <span className="text-sm font-semibold capitalize text-green-500">
                        {session?.user?.role || "User"}
                    </span>
                </div>

            </div>
        </motion.header>
    );
}