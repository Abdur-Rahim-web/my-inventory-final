import { auth } from "@/lib/auth";
import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/User";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
    const session = await auth();

    if (!session?.user?.email) {
        redirect("/api/auth/signin");
    }

    await connectToDatabase();

    
    const user = await User.findOne({ email: session.user.email }).lean();

    if (!user) {
        return <div className="p-6 text-red-500">User not found.</div>;
    }

    return (
        <div className="max-w-2xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6">My Profile</h1>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 space-y-6">
                <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xl font-bold">
                        {user.name?.charAt(0).toUpperCase() || 'U'}
                    </div>
                    <div>
                        <h2 className="text-xl font-semibold">{user.name}</h2>
                        <p className="text-gray-500">{user.email}</p>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-6 border-t">
                    <div>
                        <p className="text-sm text-gray-500">Role</p>
                        <p className="font-medium capitalize">{user.role}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Account Created</p>
                        <p className="font-medium">
                            {new Date(user.createdAt).toLocaleDateString()}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}