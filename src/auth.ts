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
                console.log("USER:", user);

                await connectDB();
                console.log("DB CONNECTED");

                const existingUser = await User.findOne({
                    email: user.email,
                });

                console.log("FOUND USER:", existingUser);

                if (!existingUser) {
                    await User.create({
                        name: user.name,
                        email: user.email,
                    });

                    console.log("USER CREATED");
                }

                return true;
            } catch (error) {
                console.error("SIGNIN ERROR:", error);
                return false;
            }
        },
    },
});