"use client";

import { useState } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* লোগো */}
          <Link href="/" className="text-2xl font-bold text-blue-600">InventoryApp</Link>

          {/* ডেস্কটপ মেনু */}
          <div className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-gray-700 hover:text-blue-600">Home</Link>
            {session ? (
              <>
                <Link href="/dashboard" className="text-blue-600 font-semibold">Dashboard</Link>
                <button onClick={() => signOut()} className="text-red-600 font-medium">Logout</button>
              </>
            ) : (
              <>
                <Link href="/login" className="text-gray-700 hover:text-blue-600">Login</Link>
                <Link href="/register" className="bg-blue-600 text-white px-4 py-2 rounded-lg">Register</Link>
              </>
            )}
          </div>

          {/* মোবাইল মেনু বাটন */}
          <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* মোবাইল ড্রপডাউন */}
      {isOpen && (
        <div className="md:hidden bg-white border-b p-4 flex flex-col gap-4">
          <Link href="/" onClick={() => setIsOpen(false)}>Home</Link>
          {session ? (
            <button onClick={() => signOut()} className="text-red-600 text-left">Logout</button>
          ) : (
            <Link href="/login" onClick={() => setIsOpen(false)}>Login</Link>
          )}
        </div>
      )}
    </nav>
  );
}