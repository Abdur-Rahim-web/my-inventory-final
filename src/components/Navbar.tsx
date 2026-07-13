"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import { motion } from "framer-motion";
import { Menu, X, LogOut, LayoutDashboard, HelpCircle, BookOpen } from "lucide-react";

export default function Navbar() {
    const { data: session } = useSession();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <motion.nav
            initial={{ y: -100 }} animate={{ y: 0 }}
            className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    <Link href="/" className="text-2xl font-bold text-blue-600">InventoryApp</Link>

                    
                    <div className="hidden md:flex items-center gap-8">
                        <Link href="/" className="text-gray-600 hover:text-blue-600">Home</Link>
                        <Link href="/blog" className="text-gray-600 hover:text-blue-600">Blog</Link>
                        <Link href="/help" className="text-gray-600 hover:text-blue-600">Help</Link>

                        {session && (
                            <>
                                <Link href="/dashboard" className="text-blue-600 font-semibold flex items-center gap-2">
                                    <LayoutDashboard size={18} /> Dashboard
                                </Link>
                            </>
                        )}
                    </div>

                    
                    <div className="hidden md:flex items-center gap-4">
                        {session ? (
                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-2">
                                    {session.user?.image ? (
                                        <Image src={session.user.image} alt="User" width={36} height={36} className="rounded-full border" />
                                    ) : <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center font-bold text-blue-600">{session.user?.name?.charAt(0)}</div>}
                                    <span className="text-sm font-medium">{session.user?.name}</span>
                                </div>
                                <button onClick={() => signOut()} className="flex-1 flex items-center gap-2 text-gray-600 hover:text-red-600 transition border hover:text-red-600-border-gray-300 rounded-lg p-1"><LogOut size={18} />Logout</button>
                            </div>
                        ) : (
                            <>
                                <Link href="/login" className="text-gray-600">Login</Link>
                                <Link href="/register" className="bg-blue-600 text-white px-5 py-2 rounded-xl hover:bg-blue-700">Register</Link>
                            </>
                        )}
                    </div>

                    <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>{isOpen ? <X /> : <Menu />}</button>
                </div>
            </div>
        </motion.nav>
    );
}