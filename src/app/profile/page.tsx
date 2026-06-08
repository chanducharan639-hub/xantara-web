"use client";

import Link from "next/link";
import { useStore } from "@/store/useStore";

import { useSession } from "next-auth/react";
import { adminEmails } from "@/lib/admin";

export default function ProfilePage() {



  const orders =
    useStore((state) => state.orders) || [];

  const wishlist =
    useStore((state) => state.wishlist) || [];
  const { data: session } = useSession();
  console.log("SESSION:", session);
  const user = session?.user;
  const isAdmin =
    user?.email &&
    adminEmails.includes(user.email);

  console.log("SESSION:", session);

  return (

    <div className="min-h-screen pt-32 px-6 max-w-7xl mx-auto">

      {/* HEADER */}
      <div className="mb-16">

        <p className="uppercase tracking-[0.3em] text-xs text-gray-400 mb-4">
          XANTARA ACCOUNT
        </p>

        <h1 className="text-5xl md:text-7xl font-serif leading-none">
          Dashboard
        </h1>

        <p className="text-gray-500 mt-6 max-w-xl leading-relaxed">
          Manage your luxury orders, wishlist, and account experience.
        </p>

      </div>

      {/* ADMIN PANEL */}
      {isAdmin && (
        <div className="mb-10 border border-black p-6 rounded-3xl">
          <h2 className="text-3xl font-serif mb-2">
            Admin Panel
          </h2>

          <p className="text-gray-500">
            Welcome Admin 👑
          </p>
        </div>
      )}

      {/* DASHBOARD CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* ORDERS */}
        <Link
          href="/profile/orders"
          className="border border-gray-200 p-8 rounded-3xl hover:bg-black hover:text-white transition-all duration-500 group"
        >

          <p className="uppercase tracking-[0.3em] text-xs mb-6 opacity-60">
            Orders
          </p>

          <h2 className="text-5xl font-serif mb-4">
            {orders.length}
          </h2>

          <p className="text-sm opacity-70">
            Track your recent purchases
          </p>

        </Link>

        {/* WISHLIST */}
        <Link
          href="/wishlist"
          className="border border-gray-200 p-8 rounded-3xl hover:bg-black hover:text-white transition-all duration-500 group"
        >

          <p className="uppercase tracking-[0.3em] text-xs mb-6 opacity-60">
            Wishlist
          </p>

          <h2 className="text-5xl font-serif mb-4">
            {wishlist.length}
          </h2>

          <p className="text-sm opacity-70">
            Your saved luxury pieces
          </p>

        </Link>

        {/* ACCOUNT */}
        <div className="border border-gray-200 p-8 rounded-3xl">

          <p className="uppercase tracking-[0.3em] text-xs mb-6 text-gray-400">
            Account
          </p>

          <h2 className="text-3xl font-serif mb-4">
            XANTARA
          </h2>

          <p>Name: {user?.name || "No Name"}</p>
          <p>Email: {user?.email || "No Email"}</p>

          <p className="text-sm text-gray-500">
            Premium member experience
          </p>

        </div>

      </div>

      {/* HELP SECTION */}
      <div className="mt-20 border-t pt-12">

        <h2 className="text-3xl font-serif mb-8">
          Need Help?
        </h2>

        <div className="flex flex-wrap gap-4">

          <a
            href="mailto:support@xantara.com"
            className="border px-8 py-4 uppercase tracking-[0.25em] text-xs hover:bg-black hover:text-white transition-all duration-300"
          >
            Contact Support
          </a>

          <a
            href="https://wa.me/919999999999"
            target="_blank"
            className="border px-8 py-4 uppercase tracking-[0.25em] text-xs hover:bg-black hover:text-white transition-all duration-300"
          >
            WhatsApp Help
          </a>

        </div>

      </div>

    </div>

  );
}
