"use server";

import { connectToDatabase } from "@/lib/mongodb";
import Item from "@/models/Item";
import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function createItem(formData: FormData) {
    try {
        const session = await auth();
        if (!session?.user?.id) throw new Error("Unauthorized");

        await connectToDatabase();


        const data = {
            title: formData.get("title"),
            description: formData.get("description"),
            fullDesc: formData.get("fullDesc"),
            price: Number(formData.get("price")),
            category: formData.get("category"),
            image: formData.get("image") || "",
            userId: session.user.id,
        };

        console.log(" Data received from form:", data);


        const newItem = await Item.create(data);

        console.log(" Successfully saved to DB:", newItem);

        revalidatePath("/items/manage");
        return { success: true, message: "Item added successfully" };

    } catch (error: unknown) {

        const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";

        console.error(" Error saving item:", errorMessage);
        return { success: false, message: errorMessage };
    }
}


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