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
                await connectDB();
                console.log("SIGNIN START");

                const existingUser = await User.findOne({
                    email: user.email,
                });

                if (!existingUser) {
                    await User.create({
                        name: user.name,
                        email: user.email,
                    });
                }

                return true; // IMPORTANT
            } catch (error) {
                console.error("SIGNIN ERROR:", error);
                return false;
            }
        }
    },
});