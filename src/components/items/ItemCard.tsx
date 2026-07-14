import { IItem } from "@/types/item";
import Link from "next/link";

export default function ItemCard({ item }: { item: IItem }) {
    return (
        <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
            {/* Image Section */}
            <div className="relative h-48 w-full bg-gray-200">
                <img
                    src={item.image || "/placeholder.jpg"}
                    alt={item.title}
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Content Section */}
            <div className="p-5">
                <h3 className="text-lg font-bold text-gray-800 mb-2 truncate">{item.title}</h3>
                <p className="text-sm text-gray-500 mb-4 line-clamp-2">{item.description}</p>

                <div className="flex justify-between items-center mb-4">
                    <span className="text-blue-600 font-bold">${item.price}</span>
                    <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded">{item.category}</span>
                </div>

                <Link
                    href={`/items/${item._id}`}
                    className="block w-full text-center bg-gray-900 text-white py-2 rounded-xl hover:bg-blue-600 transition"
                >
                    View Details
                </Link>
            </div>
        </div>
    );
}