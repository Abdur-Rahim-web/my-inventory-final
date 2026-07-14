"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { createItem } from "@/lib/actions/itemActions";
import toast from "react-hot-toast";


export default function AddItemPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    async function handleSubmit(formData: FormData) {
        setLoading(true);


        const result = await createItem(formData);

        setLoading(false);

        if (result.success) {
            toast.success("Item added successfully!");
            router.push("/dashboard/items/manage");
        } else {
            toast.error(result.message || "Failed to add item");
        }
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto py-12 px-4"
        >
            <h1 className="text-3xl font-bold mb-8">Add New Item</h1>
            <form action={handleSubmit} className="space-y-6">
                <input name="title" placeholder="Title" required className="w-full p-3 border rounded-xl" />
                <input name="category" placeholder="Category" required className="w-full p-3 border rounded-xl" />
                <input name="price" type="number" placeholder="Price" required className="w-full p-3 border rounded-xl" />
                <textarea name="description" placeholder="Short Description" className="w-full p-3 border rounded-xl" />
                <textarea name="fullDesc" placeholder="Full Description" className="w-full p-3 border rounded-xl" />
                <input name="image" placeholder="Image URL" className="w-full p-3 border rounded-xl" />

                <button
                    disabled={loading}
                    className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition"
                >
                    {loading ? "Submitting..." : "Submit Item"}
                </button>
            </form>
        </motion.div>
    );
}