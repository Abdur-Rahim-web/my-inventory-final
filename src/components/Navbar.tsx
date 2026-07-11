
import Link from "next/link";

export default function Navbar() {
    
    const isLoggedIn = false;

    return (
        <nav className="sticky top-0 z-50 w-full bg-white border-b border-gray-200 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">

                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <Link href="/" className="text-2xl font-bold text-blue-600">
                            InventoryApp
                        </Link>
                    </div>

                    {/* Desktop Links */}
                    <div className="hidden md:flex space-x-8">
                        <Link href="/" className="text-gray-700 hover:text-blue-600 font-medium">Home</Link>
                        <Link href="/items" className="text-gray-700 hover:text-blue-600 font-medium">Explore</Link>
                        {isLoggedIn && (
                            <>
                                <Link href="/items/manage" className="text-gray-700 hover:text-blue-600 font-medium">Manage</Link>
                                <Link href="/items/add" className="text-gray-700 hover:text-blue-600 font-medium">Add Item</Link>
                            </>
                        )}
                    </div>

                    {/* Auth Buttons */}
                    <div className="hidden md:flex space-x-4">
                        {isLoggedIn ? (
                            <button className="px-4 py-2 text-gray-700 hover:text-red-600 font-medium">Logout</button>
                        ) : (
                            <>
                                <Link href="/login" className="px-4 py-2 text-gray-700 hover:text-blue-600 font-medium">Login</Link>
                                <Link href="/register" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">Register</Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}