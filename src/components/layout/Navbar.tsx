"use client";

import { useState } from "react";
import { usePathname } from "next/navigation"; // এটি নতুন যোগ হয়েছে
import Link from "next/link";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, LogOut, LayoutDashboard } from "lucide-react";

export default function Navbar() {
    const { data: session } = useSession();
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();


    const isActive = (path: string) => pathname === path;

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    <Link href="/" className="text-2xl font-bold text-blue-600">
                        InventoryApp
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center gap-8">
                        <Link href="/" className={`${isActive("/") ? "text-blue-600 font-bold" : "text-gray-600"} hover:text-blue-600 transition`}>
                            Home
                        </Link>
                        <Link href="/items" className={`${isActive("/items") ? "text-blue-600 font-bold" : "text-gray-700"} hover:text-blue-600`}>
                            Explore Items
                        </Link>
                        <Link href="/about" className={`${isActive("/about") ? "text-blue-600 font-bold" : "text-gray-600"} hover:text-blue-600 transition`}>
                            About
                        </Link>
                        {session && (
                            <Link href="/dashboard" className={`${pathname.startsWith("/dashboard") ? "text-blue-600 font-bold" : "text-gray-600"} font-semibold flex items-center gap-2`}>
                                <LayoutDashboard size={18} /> Dashboard
                            </Link>
                        )}
                    </div>

                    {/* Desktop User Section */}
                    <div className="hidden md:flex items-center gap-4">
                        {session ? (
                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-2">
                                    {session.user?.image ? (
                                        <Image
                                            src={session.user.image}
                                            alt="User profile"
                                            width={36}
                                            height={36}
                                            className="rounded-full border"
                                        />
                                    ) : (
                                        <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center font-bold text-blue-600">
                                            {session.user?.name?.charAt(0)}
                                        </div>
                                    )}
                                    <span className="text-sm font-medium text-gray-700">
                                        {session.user?.name?.split(" ")[0]}
                                    </span>
                                </div>
                                <button
                                    onClick={() => {
                                        signOut();
                                        setIsOpen(false);
                                    }}
                                    className="flex items-center gap-2 text-red-600 py-2"
                                >
                                    <LogOut size={18} /> Logout
                                </button>
                            </div>
                        ) : (
                            <>
                                <Link href="/login" className="text-gray-600 hover:text-blue-600">
                                    Login
                                </Link>
                                <Link
                                    href="/register"
                                    className="bg-blue-600 text-white px-5 py-2 rounded-xl hover:bg-blue-700 transition"
                                >
                                    Register
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button className="md:hidden p-2 text-gray-600" onClick={() => setIsOpen(!isOpen)}>
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Dropdown Menu  */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-white border-b border-gray-100 overflow-hidden"
                    >
                        <div className="px-4 py-4 flex flex-col gap-4">
                            <Link href="/" onClick={() => setIsOpen(false)} className={`py-2 border-b ${isActive("/") ? "text-blue-600 font-bold" : "text-gray-600"}`}>
                                Home
                            </Link>
                            <Link href="/items" onClick={() => setIsOpen(false)} className={`py-2 border-b ${isActive("/items") ? "text-blue-600 font-bold" : "text-gray-700"}`}>
                                Explore Items
                            </Link>
                            <Link href="/about" onClick={() => setIsOpen(false)} className={`py-2 border-b ${isActive("/about") ? "text-blue-600 font-bold" : "text-gray-600"}`}>
                                About
                            </Link>
                            {session ? (
                                <>
                                    <Link
                                        href="/dashboard"
                                        onClick={() => setIsOpen(false)}
                                        className={`py-2 font-semibold ${pathname.startsWith("/dashboard") ? "text-blue-600" : "text-gray-600"}`}
                                    >
                                        Dashboard
                                    </Link>

                                    <div className="flex items-center gap-2">
                                        {session.user?.image ? (
                                            <Image
                                                src={session.user.image}
                                                alt="User profile"
                                                width={36}
                                                height={36}
                                                className="rounded-full border"
                                            />
                                        ) : (
                                            <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center font-bold text-blue-600">
                                                {session.user?.name?.charAt(0)}
                                            </div>
                                        )}
                                        <span className="text-sm font-medium text-gray-700">
                                            {session.user?.name?.split(" ")[0]}
                                        </span>
                                    </div>

                                    <button
                                        onClick={() => {
                                            signOut();
                                            setIsOpen(false);
                                        }}
                                        className="flex items-center gap-2 text-red-600 py-2"
                                    >
                                        <LogOut size={18} /> Logout
                                    </button>
                                </>
                            ) : (
                                <>
                                    <Link href="/login" onClick={() => setIsOpen(false)} className="py-2 text-gray-600">
                                        Login
                                    </Link>
                                    <Link
                                        href="/register"
                                        onClick={() => setIsOpen(false)}
                                        className="py-2 bg-blue-600 text-white text-center rounded-lg"
                                    >
                                        Register
                                    </Link>
                                </>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
}