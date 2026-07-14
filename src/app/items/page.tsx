import { connectToDatabase } from "@/lib/mongodb";
import Item from "@/models/Item";
import ItemCard from "@/components/items/ItemCard";
import SearchAndFilter from "@/components/items/SearchAndFilter";
import { IItem } from "@/types/item";
import Link from "next/link";

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
    searchParams: Promise<{ search?: string; category?: string; sort?: string; page?: string }>;
}) {
    await connectToDatabase();

    const params = await searchParams;
    const page = parseInt(params.page || "1");
    const limit = 8; 
    const skip = (page - 1) * limit;

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

    
    const totalItems = await Item.countDocuments(query);
    const totalPages = Math.ceil(totalItems / limit);

    
    const items = await Item.find(query)
        .sort(sortOption)
        .skip(skip)
        .limit(limit)
        .lean() as IItem[];

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

            
            {totalPages > 1 && (
                <div className="flex justify-center items-center gap-4 mt-12">
                    <Link
                        href={`/items?page=${page > 1 ? page - 1 : 1}${params.search ? `&search=${params.search}` : ""}${params.category ? `&category=${params.category}` : ""}`}
                        className={`px-4 py-2 border rounded-xl ${page === 1 ? "opacity-50 pointer-events-none" : "hover:bg-blue-600 hover:text-white"}`}
                    >
                        Previous
                    </Link>

                    <span className="font-semibold">Page {page} of {totalPages}</span>

                    <Link
                        href={`/items?page=${page < totalPages ? page + 1 : totalPages}${params.search ? `&search=${params.search}` : ""}${params.category ? `&category=${params.category}` : ""}`}
                        className={`px-4 py-2 border rounded-xl ${page === totalPages ? "opacity-50 pointer-events-none" : "hover:bg-blue-600 hover:text-white"}`}
                    >
                        Next
                    </Link>
                </div>
            )}
        </div>
    );
}