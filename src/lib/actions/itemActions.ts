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

        // ফর্ম থেকে ডাটাগুলো নিচ্ছি
        const data = {
            title: formData.get("title"),
            description: formData.get("description"),
            fullDesc: formData.get("fullDesc"),
            price: Number(formData.get("price")), // টেক্সট থেকে নাম্বারে কনভার্ট
            category: formData.get("category"),
            image: formData.get("image") || "", // ইমেজ না দিলে খালি স্ট্রিং
            userId: session.user.id,
        };

        console.log("📦 Data received from form:", data); // এটি টার্মিনালে ডাটা দেখাবে

        // ডাটাবেসে সেভ করা
        const newItem = await Item.create(data);

        console.log("✅ Successfully saved to DB:", newItem); // সেভ হলে এটি দেখাবে

        revalidatePath("/items/manage");
        return { success: true, message: "Item added successfully" };

    } catch (error: unknown) {
        // এররটি একটি Error অবজেক্ট কি না চেক করুন
        const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";

        console.error("❌ Error saving item:", errorMessage);
        return { success: false, message: errorMessage };
    }
}