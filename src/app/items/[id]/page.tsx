import { connectToDatabase } from "@/lib/mongodb";
import Item from "@/models/Item";
import { IItem } from "@/types/item";
import { notFound } from "next/navigation";
import ItemCard from "@/components/items/ItemCard";

export default async function ItemDetailsPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    await connectToDatabase();

    const item = await Item.findById(id).lean() as IItem | null;
    if (!item) notFound();

    const relatedItems = await Item.find({
        category: item.category,
        _id: { $ne: id }
    }).limit(4).lean() as IItem[];

    return (
        <div className="max-w-5xl mx-auto p-6 space-y-12">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <img src={item.image || "/placeholder.jpg"} alt={item.title} className="w-full h-96 object-cover rounded-2xl" />
                <div className="space-y-4">
                    <h1 className="text-4xl font-bold">{item.title}</h1>
                    <p className="text-2xl text-blue-600 font-bold">${item.price}</p>
                    <p className="text-gray-600 text-lg leading-relaxed">{item.description}</p>

                    
                    <div className="pt-4 border-t">
                        <h3 className="font-bold text-lg mb-2">Specifications</h3>
                        <p className="text-gray-700">{item.fullDesc}</p>
                    </div>
                </div>
            </div>

            
            <section className="bg-gray-50 p-6 rounded-2xl">
                <h2 className="text-2xl font-bold mb-6">Customer Reviews</h2>
                {item.reviews && item.reviews.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {item.reviews.map((rev, idx) => (
                            <div key={idx} className="p-4 bg-white border rounded-xl shadow-sm">
                                <p className="font-bold">{rev.user}</p>
                                <p className="text-yellow-500 mb-2">{"★".repeat(rev.rating)}</p>
                                <p className="text-gray-600 text-sm">{rev.comment}</p>
                            </div>
                        ))}
                    </div>
                ) : <p className="text-gray-500">No reviews yet.</p>}
            </section>

            
            {relatedItems.length > 0 && (
                <section>
                    <h2 className="text-2xl font-bold mb-6">Related Items</h2>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        {relatedItems.map((related: IItem) => (
                            <ItemCard key={related._id.toString()} item={related} />
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
}