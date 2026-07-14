import { connectToDatabase } from "@/lib/mongodb";
import Item from "@/models/Item";
import { IItem } from "@/types/item";
import { notFound } from "next/navigation";
import Image from "next/image";

export default async function ItemDetailsPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    await connectToDatabase();

    const item = await Item.findById(id).lean() as IItem | null;

    if (!item) {
        notFound();
    }

    return (
        <div className="max-w-5xl mx-auto p-6 md:py-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* আইটেম ইমেজ */}
                <div className="bg-gray-200 rounded-2xl overflow-hidden h-96 relative">
                    <img
                        src={item.image || "/placeholder.jpg"}
                        alt={item.title}
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* আইটেম তথ্য */}
                <div className="space-y-6">
                    <div>
                        <h1 className="text-4xl font-bold text-gray-900">{item.title}</h1>
                        <span className="text-blue-600 font-bold text-2xl mt-2 block">${item.price}</span>
                    </div>

                    <div className="border-t border-b py-6">
                        <p className="text-gray-700 leading-relaxed">{item.description}</p>
                    </div>

                    <div className="space-y-4">
                        <h3 className="font-semibold text-lg">Full Description</h3>
                        <p className="text-gray-600">{item.fullDesc}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}