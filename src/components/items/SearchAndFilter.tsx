"use client";

import { useRouter, useSearchParams } from "next/navigation";

export default function SearchAndFilter() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const params = new URLSearchParams(searchParams);
        if (e.target.value) params.set("search", e.target.value);
        else params.delete("search");
        router.push(`/items?${params.toString()}`);
    };

    return (
        <div className="flex flex-col md:flex-row gap-4 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
            <input
                type="text"
                placeholder="Search items..."
                className="flex-1 p-3 border rounded-xl outline-none focus:border-blue-500"
                onChange={handleSearch}
                defaultValue={searchParams.get("search") || ""}
            />
            <select
                className="p-3 border rounded-xl outline-none"
                onChange={(e) => {
                    const params = new URLSearchParams(searchParams);
                    params.set("category", e.target.value);
                    router.push(`/items?${params.toString()}`);
                }}
            >
                <option value="">All Categories</option>
                <option value="electronics">Electronics</option>
                <option value="furniture">Furniture</option>
                <option value="clothing">Clothing</option>
            </select>
        </div>
    );
}