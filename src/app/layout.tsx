// NO 'use client' here — this is a Server Component
import { Inter } from 'next/font/google';
import './globals.css';
import Script from "next/script";
import Providers from "./providers";

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Xantara',
  description: 'The future of luxury fashion.',
  google: "B3lJjC-7hHLHCfaXvCzqV2oAif4Fx_ohd5dTBNIXuPY",
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