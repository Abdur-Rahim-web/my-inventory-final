"use client";

import { Trash2 } from "lucide-react";
import { deleteItem } from "@/lib/actions/itemActions";

export default function DeleteButton({ id }: { id: string }) {
    const handleDelete = async () => {
        // Browser confirmation dialog
        if (window.confirm("Are you sure you want to delete this item?")) {
            await deleteItem(id);
        }
    };

    return (
        <button
            type="button"
            onClick={handleDelete}
            className="text-gray-500 hover:text-red-600 transition p-2 hover:bg-red-50 rounded-lg"
        >
            <Trash2 size={18} />
        </button>
    );
}