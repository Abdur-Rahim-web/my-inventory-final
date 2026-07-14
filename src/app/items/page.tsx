import { connectToDatabase } from "@/lib/mongodb";
import Item from "@/models/Item";
import ItemCard from "@/components/items/ItemCard";
import SearchAndFilter from "@/components/items/SearchAndFilter";
import { IItem } from "@/types/item";


type QueryType = {
    title?: { $regex: string; $options: string };
    category?: string;
};

type SortType = {
    [key: string]: 1 | -1;
};

export default async function ExplorePage({
    searchParams,
}: {
    searchParams: Promise<{ search?: string; category?: string; sort?: string }>;
}) {
    await connectToDatabase();

    
    const params = await searchParams;

    const query: QueryType = {};

    
    if (params.search) {
        query.title = { $regex: params.search, $options: "i" };
    }
    if (params.category) {
        query.category = params.category;
    }

    const sortOption: SortType = params.sort === "price-low"
        ? { price: 1 }
        : { createdAt: -1 };

    const items = await Item.find(query).sort(sortOption).lean() as IItem[];

    return (
        <div className="max-w-7xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-8">Explore Items</h1>

            <SearchAndFilter />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
                {items.length > 0 ? (
                    items.map((item: IItem) => (
                        <ItemCard key={item._id.toString()} item={item} />
                    ))
                ) : (
                    <p className="text-gray-500 col-span-4 text-center">No items found.</p>
                )}
            </div>
        </div>
    );
}