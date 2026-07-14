"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { LayoutDashboard, Package, PlusCircle, User, Users } from "lucide-react";

export default function Sidebar() {
    const pathname = usePathname();
    const { data: session } = useSession();
    const isAdmin = session?.user?.role === "admin";

    // সকল আইটেমের একটি বেস লিস্ট
    const allMenuItems = [
        { name: "Overview", href: "/dashboard", icon: <LayoutDashboard size={20} /> },
        { name: "Manage Items", href: "/dashboard/items/manage", icon: <Package size={20} /> },
        { name: "Add Item", href: "/dashboard/items/add", icon: <PlusCircle size={20} /> },
        { name: "Profile", href: "/dashboard/profile", icon: <User size={20} /> },
    ];

    // যদি অ্যাডমিন হয়, তবে "Add Item" ফিল্টার করে বাদ দেওয়া হচ্ছে
    const menuItems = isAdmin 
        ? allMenuItems.filter(item => item.name !== "Add Item") 
        : allMenuItems;

    return (
        <aside className="w-64 bg-white border-r min-h-screen hidden md:block p-6">
            <div className="mb-8">
                <h1 className="text-xl font-bold text-blue-600">Inventory Dashboard</h1>
            </div>
            <nav className="space-y-2">
                {menuItems.map((item) => (
                    <Link
                        key={item.name}
                        href={item.href}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl transition ${
                            pathname === item.href ? "bg-blue-600 text-white" : "text-gray-600 hover:bg-gray-100"
                        }`}
                    >
                        {item.icon}
                        {item.name}
                    </Link>
                ))}
                
                {/* অ্যাডমিন টাস্ক */}
                {isAdmin && (
                    <>
                        <div className="my-4 border-t border-gray-200"></div>
                        <p className="px-4 text-xs font-semibold text-gray-400 uppercase">Admin Tasks</p>
                        <Link 
                            href="/dashboard/admin/users" 
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition ${
                                pathname === "/dashboard/admin/users" ? "bg-red-600 text-white" : "text-red-600 hover:bg-red-50"
                            }`}
                        >
                            <Users size={20} /> Manage Users
                        </Link>
                    </>
                )}
            </nav>
        </aside>
    );
}