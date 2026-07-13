"use client";

import { useSession, signOut } from "next-auth/react";
import { LogOut, User } from "lucide-react";

export default function DashboardHeader() {
    const { data: session } = useSession();

    return (
        <header className="h-16 bg-white border-b px-8 flex items-center justify-between">
            <div className="text-gray-600 font-medium">Welcome back, {session?.user?.name || "User"}</div>
            <button
                onClick={() => signOut()}
                className="flex items-center gap-2 text-gray-600 hover:text-red-600 transition"
            >
                <LogOut size={18} /> Logout
            </button>
        </header>
    );
}