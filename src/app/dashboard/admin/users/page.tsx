import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/User";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";


interface IUser {
    _id: string;
    name: string;
    email: string;
    role: string;
    createdAt: Date;
}

export default async function ManageUsersPage() {
    const session = await auth();


    if (session?.user?.role !== "admin") {
        redirect("/dashboard");
    }

    await connectToDatabase();

    const users = await User.find({}).lean();

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Manage Users</h1>
            <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b">
                        <tr>
                            <th className="p-4 font-semibold">Name</th>
                            <th className="p-4 font-semibold">Email</th>
                            <th className="p-4 font-semibold">Role</th>
                            <th className="p-4 font-semibold">Joined</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user: IUser) => (
                            <tr key={user._id} className="border-b hover:bg-gray-50">
                                <td className="p-4">{user.name || "N/A"}</td>
                                <td className="p-4">{user.email}</td>
                                <td className="p-4">
                                    <span className={`px-2 py-1 rounded-full text-xs ${user.role === 'admin' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'}`}>
                                        {user.role}
                                    </span>
                                </td>
                                <td className="p-4">{new Date(user.createdAt).toLocaleDateString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}