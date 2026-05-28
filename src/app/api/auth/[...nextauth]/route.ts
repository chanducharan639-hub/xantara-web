import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
    ],

    secret: process.env.NEXTAUTH_SECRET,

    trustHost: true,

    session: {
        strategy: "jwt",
    },

    cookies: {
        sessionToken: {
            name: `next-auth.session-token`,
            options: {
                httpOnly: true,
                sameSite: "lax",
                path: "/",
                secure: true,
            },
        },
    },

    pages: {
        signIn: "/login",
        error: "/login",
    },

    callbacks: {
        async redirect({ baseUrl }) {
            return `${baseUrl}/profile`;
        },
    },
});

export { handler as GET, handler as POST };