'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useStore } from '@/store/useStore';

export default function WishlistPage() {

  const wishlist =
    useStore((state) => state.wishlist) || [];

  return (
    <div className="min-h-screen pt-32 px-6 max-w-7xl mx-auto">

      <h1 className="text-5xl font-serif mb-12">
        Wishlist
      </h1>

      {wishlist.length === 0 ? (

        <p className="text-gray-500">
          No wishlist items yet.
        </p>

      ) : (

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          {wishlist.map((product) => (

            <Link
              key={product.id}
              href={`/product/${product.id}`}
              className="group"
            >

              <div className="relative aspect-[3/4] bg-gray-100 overflow-hidden mb-4">

                <Image
                  src={product.images[0]}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-105 transition duration-500"
                />

              </div>

              <div className="flex justify-between">

                <div>
                  <h2 className="text-lg">
                    {product.name}
                  </h2>

                  <p className="text-gray-500 text-sm">
                    {product.category}
                  </p>
                </div>

                <p>
                  ₹{product.price}
                </p>

              </div>

            </Link>

          ))}

        </div>

      )}

    </div>
  );
}