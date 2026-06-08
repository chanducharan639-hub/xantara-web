import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";
export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID ?? process.env.AUTH_GOOGLE_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? process.env.AUTH_GOOGLE_SECRET!,
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET ?? process.env.AUTH_SECRET,
    trustHost: true,
    pages: {
        signIn: "/login",
        error: "/login",
    },
    callbacks: {
        async signIn({ user }) {
            try {
                console.log("Google user:", user);
                return true;
            } catch (error) {
                console.error("GOOGLE SIGNIN ERROR:", error);
                return false;
            }
        },
    }
});