import NextAuth, { type DefaultSession } from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { connectToDatabase } from "./mongodb";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
    interface User {
        role?: string;
    }
    interface Session {
        user: {
            id?: string;
            role?: string;
        } & DefaultSession["user"];
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        id?: string;
        role?: string;
    }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
    adapter: MongoDBAdapter(clientPromise),
    providers: [
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        Credentials({
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) return null;

                await connectToDatabase();


                const user = await User.findOne({ email: credentials.email });

                if (!user) return null;

                const isMatch = await bcrypt.compare(credentials.password as string, user.password);

                if (isMatch) {
                    return {
                        id: user._id.toString(),
                        email: user.email,
                        name: user.name,
                        role: user.role
                    };
                }
                return null;
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {

            if (user) {
                token.id = user.id;
                token.role = (user as { role?: string }).role;
            }


            if (!token.role && token.email) {
                await connectToDatabase();
                const dbUser = await User.findOne({ email: token.email });
                if (dbUser) {
                    token.role = dbUser.role;
                }
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.id as string;
                session.user.role = token.role as string;
            }
            return session;
        },
    },
    pages: { signIn: "/login" },
    session: { strategy: "jwt" },
});