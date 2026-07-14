import { connectToDatabase } from "@/lib/mongodb";
import Item from "@/models/Item";
import { updateItem } from "@/lib/actions/itemActions";
import { redirect } from "next/navigation";



export default async function EditItemPage({
    params
}: {
    params: Promise<{ id: string }>
}) {
    
    const { id } = await params;

    await connectToDatabase();

   
    const item = await Item.findById(id).lean();

    if (!item) return <div className="p-6">Item not found</div>;

    async function handleSubmit(formData: FormData) {
        "use server";
        await updateItem(id, formData);
        redirect("/dashboard/items/manage");
        
    }

    return (
        <div className="p-6 max-w-2xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">Edit Item</h1>
            <form action={handleSubmit} className="space-y-4 bg-white p-6 rounded-xl shadow-sm border">
                <input name="title" defaultValue={item.title} className="w-full p-3 border rounded-lg" placeholder="Title" required />
                <input name="category" defaultValue={item.category} className="w-full p-3 border rounded-lg" placeholder="Category" required />
                <input name="price" type="number" defaultValue={item.price} className="w-full p-3 border rounded-lg" placeholder="Price" required />

                <textarea name="description" defaultValue={item.description} className="w-full p-3 border rounded-lg" placeholder="Short Description" />
                <textarea name="fullDesc" defaultValue={item.fullDesc} className="w-full p-3 border rounded-lg" placeholder="Full Description" />
                <input name="image" defaultValue={item.image} className="w-full p-3 border rounded-lg" placeholder="Image URL" />

                <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold">Update Item</button>
            </form>
        </div>
    );
}