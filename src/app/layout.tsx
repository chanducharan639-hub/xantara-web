'use client';

import { Inter } from 'next/font/google';
import './globals.css';

import { WishlistProvider } from "../context/WishlistContext";
import { SessionProvider } from "next-auth/react";
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CartDrawer from '@/components/cart/CartDrawer';

import Script from "next/script";
import { usePathname } from 'next/navigation';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const pathname = usePathname();

  const hideLayout =
    pathname === '/login';

  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body
        className={`${inter.className} min-h-screen flex flex-col bg-gray-50`}
      >

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

        {/* GOOGLE ANALYTICS */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-SYQMH8Y3ZX"
          strategy="afterInteractive"
        />

        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-SYQMH8Y3ZX');
          `}
        </Script>

      </body>
    </html>
  );
}