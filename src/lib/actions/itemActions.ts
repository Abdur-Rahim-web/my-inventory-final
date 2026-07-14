"use server";

import { connectToDatabase } from "@/lib/mongodb";
import Item from "@/models/Item";
import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";

// Function to create a new item
export async function createItem(formData: FormData) {
    try {
        const session = await auth();
        if (!session?.user?.id) throw new Error("Unauthorized");

        await connectToDatabase();

        const data = {
            title: formData.get("title")?.toString(),
            description: formData.get("description")?.toString() || "No description provided", 
            fullDesc: formData.get("fullDesc")?.toString() || "No description provided", 
            price: Number(formData.get("price")),
            category: formData.get("category")?.toString(),
            image: formData.get("image")?.toString() || "",
            userId: session.user.id,
        };

        
        const newItem = await Item.create(data);
        revalidatePath("/dashboard/items/manage");
        return { success: true, message: "Item added successfully" };

    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
        console.error("Error saving item:", errorMessage);
        return { success: false, message: errorMessage };
    }
}
// Function to delete an item
export async function deleteItem(id: string): Promise<void> {
    try {
        const session = await auth();
        if (!session?.user?.id) throw new Error("Unauthorized");

        await connectToDatabase();
        const item = await Item.findById(id);
        if (!item) throw new Error("Item not found");

        const isOwner = item.userId.toString() === session.user.id;
        const isAdmin = session.user.role === "admin";

        if (!isAdmin && !isOwner) {
            throw new Error("You are not authorized to delete this item");
        }

        await Item.findByIdAndDelete(id);
        revalidatePath("/dashboard/items/manage");
    } catch (error: unknown) {
        console.error("Error deleting item:", error);
    }
}

// Function to update an existing item
export async function updateItem(id: string, formData: FormData) {
    try {
        const session = await auth();
        if (!session?.user?.id) throw new Error("Unauthorized");

        await connectToDatabase();

        // Find the item first
        const item = await Item.findById(id);
        if (!item) throw new Error("Item not found");

        // Authorization check
        const isOwner = item.userId.toString() === session.user.id;
        const isAdmin = session.user.role === "admin";

        if (!isAdmin && !isOwner) {
            throw new Error("You are not authorized to update this item");
        }

        // Prepare updated data, keeping existing values if formData is empty
        const updatedData = {
            title: formData.get("title") || item.title,
            description: formData.get("description") || item.description || "",
            fullDesc: formData.get("fullDesc") || item.fullDesc || "",
            price: Number(formData.get("price")) || item.price,
            category: formData.get("category") || item.category,
            image: formData.get("image") || item.image || "",
        };

        await Item.findByIdAndUpdate(id, updatedData, { new: true });

        revalidatePath("/dashboard/items/manage");
        return { success: true, message: "Item updated successfully" };
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : "Failed to update item";
        console.error("Error updating item:", errorMessage);
        return { success: false, message: errorMessage };
    }
}