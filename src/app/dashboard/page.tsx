import { connectToDatabase } from "@/lib/mongodb";
import Item from "@/models/Item";
import User from "@/models/User";
import { auth } from "@/lib/auth"; 

export default async function DashboardPage() {
    const session = await auth();
    await connectToDatabase();

    const isAdmin = session?.user?.role === "admin";
    const userId = session?.user?.id;

    
    const [totalItems, activeItems, totalUsers] = await Promise.all([
        isAdmin ? Item.countDocuments() : Item.countDocuments({ userId }),
        isAdmin ? Item.countDocuments({ price: { $gt: 0 } }) : Item.countDocuments({ userId, price: { $gt: 0 } }),
        isAdmin ? User.countDocuments() : 0 
    ]);

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-800">Dashboard Overview</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <h3 className="text-gray-500 font-medium">Total Items</h3>
                    <p className="text-3xl font-bold mt-2 text-blue-600">{totalItems}</p>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <h3 className="text-gray-500 font-medium">Active Items</h3>
                    <p className="text-3xl font-bold mt-2 text-green-600">{activeItems}</p>
                </div>
                {isAdmin && (
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <h3 className="text-gray-500 font-medium">Total Users</h3>
                        <p className="text-3xl font-bold mt-2 text-purple-600">{totalUsers}</p>
                    </div>
                )}
            </div>
        </div>
    );
}