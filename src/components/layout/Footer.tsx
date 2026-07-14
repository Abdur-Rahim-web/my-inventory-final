"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Mail, Phone} from "lucide-react";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

export default function Footer() {
    return (
        <motion.footer
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            className="bg-gray-900 text-gray-300 py-12"
        >
            <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
                <div>
                    <h3 className="text-white text-lg font-bold mb-4">InventoryApp</h3>
                    <p className="text-sm">Manage your inventory efficiently with our modern and intuitive platform.</p>
                </div>

                <div>
                    <h4 className="text-white font-semibold mb-4">Quick Links</h4>
                    <div className="flex flex-col gap-2 text-sm">
                        <Link href="/about">About Us</Link>
                        <Link href="/contact">Contact</Link>
                        <Link href="/blog">Blog</Link>
                    </div>
                </div>

                <div>
                    <h4 className="text-white font-semibold mb-4">Legal</h4>
                    <div className="flex flex-col gap-2 text-sm">
                        <Link href="/privacy">Privacy Policy</Link>
                        <Link href="/terms">Terms of Service</Link>
                    </div>
                </div>

                <div>
                    <h4 className="text-white font-semibold mb-4">Contact</h4>
                    <div className="flex flex-col gap-2 text-sm">
                        <div className="flex items-center gap-2"><Mail size={16} /> support@inventory.com</div>
                        <div className="flex items-center gap-2"><Phone size={16} /> +880 123456789</div>
                        <div className="flex gap-4 mt-2">
                            <FaFacebook size={20} className="hover:text-blue-500 cursor-pointer" />
                            <FaTwitter size={20} className="hover:text-blue-400 cursor-pointer" />
                            <FaInstagram size={20} className="hover:text-pink-500 cursor-pointer" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="text-center text-xs mt-10 border-t border-gray-800 pt-6">
                © 2026 InventoryApp. All rights reserved.
            </div>
        </motion.footer>
    );
}