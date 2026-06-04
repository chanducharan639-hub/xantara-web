'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

import { useStore } from '@/store/useStore';
import { PRODUCTS, Product } from '@/data/products';

import { useWishlist } from "../../context/WishlistContext";

export default function CollectionPage() {
  const { wishlist, toggleWishlist } = useWishlist();
  const [filter, setFilter] = useState('all');

  const [localProducts, setLocalProducts] = useState<Product[]>([]);
  useEffect(() => {
    const products = JSON.parse(
      localStorage.getItem("products") || "[]"
    );
    setLocalProducts(products);
  }, []);

  const categories = [
    'all',
    't-shirts',
    'bottoms',
    'outerwear',
    'tops',
    'accessories',
  ];

  const allProducts: Product[] = [
    ...PRODUCTS,
    ...localProducts,
  ];

  const filteredProducts =
    filter === "all"
      ? allProducts
      : allProducts.filter(
        (product: Product) =>
          product.category?.toLowerCase() ===
          filter.toLowerCase()
      );

  return (
    <div className="min-h-screen pt-32 pb-24 px-6 max-w-7xl mx-auto">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
        <div>
          <h1 className="text-4xl md:text-6xl font-serif mb-4">
            The Collection
          </h1>
          <p className="text-gray-500 max-w-lg font-light leading-relaxed">
            Every piece is designed with architectural precision and crafted
            using futuristic materials.
          </p>
        </div>

        {/* FILTERS */}
        <div className="flex flex-wrap gap-4">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`text-xs uppercase tracking-widest pb-1 transition-all ${filter === cat
                ? 'border-b border-black text-black'
                : 'text-gray-400 hover:text-black border-b border-transparent'
                }`}
            >
              {cat.replace('-', ' ').toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* PRODUCTS OR EMPTY STATE */}
      {filteredProducts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-32 text-center">
          <h2 className="text-5xl font-serif mb-4">
            STOCK AVAILABLE SOON
          </h2>
          <p className="text-gray-500 text-lg max-w-md">
            Our collection is currently being curated. New arrivals will be available soon.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          {filteredProducts.map((product, idx) => {
            const isWishlisted =
              wishlist?.some(
                (item: any) => item.id === product.id
              ) || false;

            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: idx * 0.1,
                }}
                className="group"
              >
                <div className="relative aspect-[3/4] bg-gray-100 mb-6 overflow-hidden">
                  <Link href={`/product/${product.id}`}>
                    <div className="relative aspect-[3/4] overflow-hidden group">
                      {/* FIRST IMAGE */}
                      <Image
                        src={product.images?.[0] || "/shirt.png"}
                        alt={product.name}
                        fill
                        priority
                        loading="eager"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover transition-all duration-700 group-hover:opacity-0 group-hover:scale-105"
                      />

                      {/* SECOND IMAGE */}
                      <Image
                        src={product.images?.[1] || product.images?.[0] || "/shirt.png"}
                        alt={product.name}
                        fill
                        priority
                        loading="eager"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover opacity-0 transition-all duration-700 group-hover:opacity-100 group-hover:scale-105"
                      />
                    </div>
                  </Link>

                  {/* WISHLIST BUTTON */}
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      toggleWishlist(product);
                    }}
                    className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Heart
                      size={18}
                      className={
                        isWishlisted
                          ? 'fill-black text-black'
                          : 'text-black'
                      }
                      strokeWidth={1.5}
                    />
                  </button>
                </div>

                <Link href={`/product/${product.id}`}>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-medium">
                        {product.name}
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">
                        {product.category}
                      </p>
                    </div>
                    <p className="text-sm font-medium">
                      ₹{product.price}
                    </p>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}