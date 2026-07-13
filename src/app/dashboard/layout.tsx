import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import Sidebar from "@/components/dashboard/Sidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await auth();

    if (!session) {
        redirect("/login");
    }

    return (
        <div className="flex min-h-screen bg-gray-50">
            
            <Sidebar />

            <div className="flex-1 flex flex-col">
               
                <DashboardHeader />

                <main className="p-6 md:p-8">
                    {children}
                </main>
            </div>
        </div>
    );
}