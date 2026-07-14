"use client";

import { motion } from "framer-motion";
import ItemCard from "@/components/items/ItemCard";
import { IItem } from "@/types/item";
import Link from "next/link";


const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
};

export default function HomePageContent({ latestItems }: { latestItems: IItem[] }) {
    return (
        <main className="min-h-screen overflow-x-hidden">
            {/* 1. Enhanced Hero Section */}
            <section className="relative h-[70vh] flex items-center justify-center bg-gray-900 text-white overflow-hidden">
                <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="text-center z-10 p-6">
                    <h1 className="text-5xl md:text-7xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-white">
                        Find Your Premium Essentials
                    </h1>
                    <p className="text-lg text-gray-400 mb-8">Curated quality, verified items, just for you.</p>
                    <Link href="/items" className="px-8 py-4 bg-blue-600 rounded-xl hover:bg-blue-700 transition font-bold">
                        Start Exploring
                    </Link>
                </motion.div>
            </section>

            {/* 2. Enhanced Featured Items */}
            <motion.section variants={containerVariants} initial="hidden" whileInView="visible" className="max-w-7xl mx-auto py-20 px-6">
                <h2 className="text-4xl font-bold text-center mb-16">Latest Arrivals</h2>
                <motion.div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {latestItems?.map((item) => (
                        <motion.div key={item._id.toString()} variants={itemVariants}>
                            <ItemCard item={item} />
                        </motion.div>
                    ))}
                </motion.div>
            </motion.section>

            {/* 3. New: Categories Section (Requirement: Meaningful Section) */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <h3 className="text-3xl font-bold mb-12">Browse by Category</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {['Electronics', 'Furniture', 'Fashion', 'Books'].map((cat) => (
                            <Link key={cat} href={`/items?category=${cat.toLowerCase()}`}
                                className="p-8 bg-white rounded-2xl shadow-sm hover:shadow-xl transition border border-gray-100 font-bold">
                                {cat}
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* 4. Why Choose Us (Requirement: Statistics/Highlights) */}
            <section className="py-20 max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
                <div>
                    <h2 className="text-4xl font-bold mb-6 text-gray-900">Why Trust Us?</h2>
                    <p className="text-gray-600 mb-8">We combine technology with trust, ensuring a seamless experience for every user who explores our marketplace.</p>
                    <ul className="space-y-4 text-gray-800 font-medium">
                        <li className="flex items-center gap-3">✅ <span>Verified Seller Authenticity</span></li>
                        <li className="flex items-center gap-3">✅ <span>Secure Payment Gateways</span></li>
                        <li className="flex items-center gap-3">✅ <span>24/7 Dedicated Support</span></li>
                    </ul>
                </div>

                
                <motion.div
                    whileHover={{ rotate: 2 }}
                    className="bg-gradient-to-tr from-blue-600 to-indigo-700 h-80 rounded-3xl p-8 flex flex-col justify-between text-white shadow-2xl relative overflow-hidden"
                >
                    <div className="absolute top-0 right-0 p-8 opacity-20">
                        <svg width="120" height="120" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" /></svg>
                    </div>

                    <div>
                        <span className="text-blue-200 font-semibold uppercase tracking-widest text-sm">Pro Membership</span>
                        <h3 className="text-3xl font-bold mt-2">Unlock Premium Deals</h3>
                    </div>

                    <div className="space-y-2">
                        <p className="text-blue-100">Get early access to all new listings.</p>
                        <button className="bg-white text-blue-700 px-6 py-2 rounded-lg font-bold hover:bg-gray-100 transition">
                            Upgrade Now
                        </button>
                    </div>
                </motion.div>
            </section>

            {/* 5. FAQ Section (Accordion Style) */}
            <section className="py-20 bg-gray-100 text-black px-6">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-3xl font-bold text-center mb-12">Common Questions</h2>
                    {[{ q: "Is shipping free?", a: "We offer free shipping on all orders over $50." }, { q: "How to return?", a: "Easy 30-day returns on all items." }].map((f, i) => (
                        <motion.div key={i} whileHover={{ x: 10 }} className="p-6 border-b border-gray-700">
                            <h4 className="font-bold text-xl">{f.q}</h4>
                            <p className="text-gray-600">{f.a}</p>
                        </motion.div>
                    ))}
                </div>
            </section>
        </main>
    );
}