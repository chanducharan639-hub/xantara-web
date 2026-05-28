// NO 'use client' here — this is a Server Component
import { Inter } from 'next/font/google';
import './globals.css';
import Script from "next/script";
import Providers from "./providers";

const inter = Inter({ subsets: ['latin'] });
export const metadata = {
  title: 'Xantara | Luxury Fashion India',
  description: 'Xantara - India\'s luxury fashion brand. Shop premium minimal clothing, accessories and digital wear at xantara.in',
  keywords: 'xantara, xantara india, xantara fashion, luxury fashion india, xantara clothing, premium fashion india',
  verification: {
    google: "B3lJjC-7hHLHCfaXvCzqV2oAif4Fx_ohd5dTBNIXuPY",  // ← keep your existing google code
    other: {
      'msvalidate.01': 'CAB7312555B9D49F41D9CECAA0ED934E',  // ← Bing code
    },
  },
  openGraph: {
    title: 'Xantara | Luxury Fashion India',
    description: 'India\'s luxury fashion brand — minimal elegance, premium digital wear.',
    url: 'https://xantara.in',
    siteName: 'Xantara',
    type: 'website',
  },
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body className={`${inter.className} min-h-screen flex flex-col bg-gray-50`}>

        <Providers>
          {children}
        </Providers>

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