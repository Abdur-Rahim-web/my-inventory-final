import ItemCardSkeleton from "@/components/items/ItemCardSkeleton";

export default function Loading() {
    return (
        <div className="max-w-7xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-8">Explore Items</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
                
                {[...Array(8)].map((_, i) => (
                    <ItemCardSkeleton key={i} />
                ))}
            </div>
        </div>
    );
}