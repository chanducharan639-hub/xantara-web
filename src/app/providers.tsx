'use client';

import { SessionProvider } from "next-auth/react";
import { WishlistProvider } from "../context/WishlistContext";
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CartDrawer from '@/components/cart/CartDrawer';
import { usePathname } from 'next/navigation';

export default function Providers({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const hideLayout = pathname === '/login';

    return (
        <SessionProvider>
            <WishlistProvider>
                {!hideLayout && <Navbar />}
                <main className="flex-1">
                    {children}
                </main>
                {!hideLayout && <Footer />}
                {!hideLayout && <CartDrawer />}
            </WishlistProvider>
        </SessionProvider>
    );
}