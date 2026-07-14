import { auth } from "@/lib/auth";
import { connectToDatabase } from "@/lib/mongodb";
import Item from "@/models/Item";
import { Edit, Package } from "lucide-react";
import Link from "next/link";
import DeleteButton from "@/components/DeleteButton";
import { Types } from "mongoose"; 

interface ItemType {
    _id: { toString: () => string };
    title: string;
    category: string;
    price: number;
}

export default async function ManageItemsPage() {
    const session = await auth();
    await connectToDatabase();

    const isAdmin = session?.user?.role === "admin";
    const userId = session?.user?.id;

    
   const query: { userId?: Types.ObjectId | null } = {};

if (!isAdmin && userId) {
    if (userId === "user-demo-id") {
        query.userId = null;
    } else {
        try {
            
            query.userId = new Types.ObjectId(userId);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            query.userId = null;
        }
    }
}

    const items: ItemType[] = await Item.find(query).lean();

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">
                    {isAdmin ? "All Inventory" : "My Items"}
                </h1>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                            <th className="px-6 py-4 font-semibold text-gray-600">Product</th>
                            <th className="px-6 py-4 font-semibold text-gray-600">Category</th>
                            <th className="px-6 py-4 font-semibold text-gray-600">Price</th>
                            <th className="px-6 py-4 font-semibold text-gray-600 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {items.map((item) => (
                            <tr key={item._id.toString()} className="hover:bg-gray-50 transition">
                                <td className="px-6 py-4 flex items-center gap-3">
                                    <div className="bg-blue-50 p-2 rounded-lg">
                                        <Package size={20} className="text-blue-600" />
                                    </div>
                                    <span className="font-medium text-gray-700">{item.title}</span>
                                </td>
                                <td className="px-6 py-4 text-gray-600">{item.category}</td>
                                <td className="px-6 py-4 font-semibold text-gray-800">${item.price}</td>
                                <td className="px-6 py-4 flex gap-3 justify-center">
                                    <Link
                                        href={`/dashboard/items/edit/${item._id.toString()}`}
                                        className="text-gray-500 hover:text-blue-600 transition p-2 hover:bg-blue-50 rounded-lg"
                                    >
                                        <Edit size={18} />
                                    </Link>
                                    <DeleteButton id={item._id.toString()} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}