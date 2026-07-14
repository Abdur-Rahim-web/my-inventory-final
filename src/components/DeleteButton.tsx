"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";
import { deleteItem } from "@/lib/actions/itemActions";

export default function DeleteButton({ id }: { id: string }) {
    const [isOpen, setIsOpen] = useState(false);

    const handleDelete = async () => {
        await deleteItem(id);
        setIsOpen(false);
    };

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="text-gray-500 hover:text-red-600 transition p-2 hover:bg-red-50 rounded-lg"
            >
                <Trash2 size={18} />
            </button>

            {isOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-sm">
                        <h2 className="text-lg font-bold mb-4">Confirm Deletion</h2>
                        <p className="mb-6 text-gray-600">Are you sure you want to delete this item? This action cannot be undone.</p>
                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => setIsOpen(false)}
                                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDelete}
                                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}