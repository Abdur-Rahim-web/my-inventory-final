"use client";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";


interface ChartData {
    name: string;
    price: number;
}

export default function InventoryChart({ data }: { data: ChartData[] }) {
    return (
        <div className="h-75 w-full bg-white p-6 rounded-2xl border shadow-sm mb-10">
            <h2 className="text-lg font-bold mb-6 text-gray-700">Inventory Value Analytics</h2>
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="price" fill="#2563eb" radius={[6, 6, 0, 0]} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}