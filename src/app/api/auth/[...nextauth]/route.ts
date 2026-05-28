// app/api/auth/[...nextauth]/route.ts

import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code",
                },
            },
        }),
    ],

    secret: process.env.NEXTAUTH_SECRET,

    session: {
        strategy: "jwt",
    },

    // ✅ FIX 1: Override cookies with sameSite: "none" + secure: true
    // This ensures the state cookie survives the Google redirect
    cookies: {
        state: {
            name: "next-auth.state",
            options: {
                httpOnly: true,
                sameSite: "none",   // ← KEY FIX: "lax" blocks cross-origin redirects
                path: "/",
                secure: true,        // ← Required when sameSite is "none"
                maxAge: 900,         // 15 minutes — plenty for OAuth flow
            },
        },
        pkceCodeVerifier: {
            name: "next-auth.pkce.code_verifier",
            options: {
                httpOnly: true,
                sameSite: "none",
                path: "/",
                secure: true,
                maxAge: 900,
            },
        },
        callbackUrl: {
            name: "next-auth.callback-url",
            options: {
                httpOnly: true,
                sameSite: "none",
                path: "/",
                secure: true,
            },
        },
        sessionToken: {
            name: "next-auth.session-token",
            options: {
                httpOnly: true,
                sameSite: "lax",    // Session token can stay lax (same-origin reads)
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
        async jwt({ token, account, profile }) {
            if (account) {
                token.accessToken = account.access_token;
            }
            return token;
        },
        async session({ session, token }) {
            return session;
        },
        // ✅ FIX 2: Explicitly allow your production URL
        async redirect({ url, baseUrl }) {
            if (url.startsWith("/")) return `${baseUrl}${url}`;
            if (new URL(url).origin === baseUrl) return url;
            return baseUrl;
        },
    },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };