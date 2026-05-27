'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { Heart } from 'lucide-react';
import { useStore } from '@/store/useStore';
import { PRODUCTS } from '@/data/products';
import { useWishlist } from "@/context/WishlistContext";

export default function ProductPage() {
  const params = useParams();

  const [product, setProduct] = useState<any>(null);

  useEffect(() => {
    const localProducts = JSON.parse(
      localStorage.getItem("products") || "[]"
    );

    const allProducts = [
      ...PRODUCTS,
      ...localProducts,
    ];

    const foundProduct = allProducts.find(
      (p) => p.id.toString() === params.id
    );

    setProduct(foundProduct);
  }, [params.id]);

  const { addToCart } = useStore();
  const [zoomOpen, setZoomOpen] = useState(false);
  const { wishlist, toggleWishlist } = useWishlist();
  const [selectedSize, setSelectedSize] = useState("M");

  const [currentImage, setCurrentImage] = useState(0);

  if (product === null) {
    return (
      <div className="pt-40 text-center">
        Loading...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="pt-40 text-center text-2xl">
        Product not found
      </div>
    );
  }


  const isWishlisted = wishlist?.some(
    (item: any) => item.id === product.id
  );

  return (
    <div className="min-h-screen pt-32 px-10">
      <div className="grid lg:grid-cols-[1fr_520px] gap-16 items-start">

        {/* IMAGE */}
        <div className="flex justify-center items-start">

          <div
            className="
    relative
    w-full
    max-w-[620px]
    aspect-[4/5]
    overflow-hidden
    rounded-sm
    flex
    items-center
    justify-center
  "
          ><Image
              src={
                product.images && product.images.length > 0
                  ? product.images[currentImage]
                  : "/shirt.png"
              }
              alt={product.name}
              fill
              priority
              sizes="500px"
              className="
    object-contain
    object-top
    transition-all
    duration-500
  "

            />

            <button
              onClick={() => setZoomOpen(true)}
              className="
    absolute
    top-5
    right-5
    z-20
    w-10
    h-10
    rounded-full
    bg-white/90
    backdrop-blur-md
    shadow-xl
    border
    border-gray-200
    flex
    items-center
    justify-center
    hover:scale-60
    transition-all
    duration-300
  "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.7}
                stroke="currentColor"
                className="w-6 h-6 text-black"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-4.35-4.35m1.35-5.15a6.5 6.5 0 11-13 0 6.5 6.5 0 0113 0z"
                />
              </svg>
            </button>
            {/* THUMBNAILS */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-20">

              {product.images.map((img: string, index: number) => (
                <button
                  key={index}
                  onClick={() => setCurrentImage(index)}
                  className={`
        relative
        w-16
        h-20
        overflow-hidden
        border
        bg-white
        transition-all
        duration-300
        ${currentImage === index
                      ? 'border-black scale-105'
                      : 'border-gray-200 opacity-80 hover:opacity-100'
                    }
      `}
                >
                  <Image
                    src={img}
                    alt=""
                    fill
                    className="object-cover"
                  />
                </button>
              ))}

            </div>
            {/* LEFT BUTTON */}
            <button
              onClick={() =>
                setCurrentImage((prev) =>
                  prev === 0
                    ? product.images.length - 1
                    : prev - 1
                )
              }
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 w-10 h-10 rounded-full text-xl"
            >
              ←
            </button>

            {/* RIGHT BUTTON */}
            <button
              onClick={() =>
                setCurrentImage((prev) =>
                  prev === product.images.length - 1
                    ? 0
                    : prev + 1
                )
              }
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 w-10 h-10 rounded-full text-xl"
            >
              →
            </button>

          </div>

        </div>

        {/* DETAILS */}
        <div className="pt-10 sticky top-32 self-start">

          <p className="uppercase text-gray-400 tracking-widest text-sm mb-4">
            {product.category}
          </p>

          <div className="flex justify-between items-start mb-6">
            <h1 className="text-xl font-serif">
              {product.name}
            </h1>

            <p className="text-3xl">
              ₹{product.price}
            </p>
          </div>

          <p className="text-gray-500 leading-relaxed mb-10">
            {product.description}
          </p>


          {/* SIZES */}
          <div className="mb-10">
            <p className="uppercase tracking-widest text-sm mb-4">
              Select Size
            </p>

            <div className="flex gap-4">
              {(product.sizes || ["S", "M", "L", "XL"]).map((size: string) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`w-14 h-14 border transition-all ${selectedSize === size
                    ? 'bg-black text-white'
                    : 'border-gray-300'
                    }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* BUTTONS */}
          <div className="flex gap-4">

            <button
              onClick={() =>
                addToCart({
                  id: product.id,
                  name: product.name,

                  images: product.images,
                  size: selectedSize || "M",
                  qty: 1,
                  price: product.price,
                })
              }
              className="flex-1 bg-black text-white py-5 uppercase tracking-widest"
            >
              Add To Cart
            </button>

            <button
              onClick={() => toggleWishlist(product)}
              className="w-16 border flex items-center justify-center"
            >
              <Heart
                className={
                  isWishlisted
                    ? 'fill-black text-black'
                    : ''
                }
              />
            </button>


          </div>
          <div className="mt-14 border-t border-gray-200 pt-10">

            {/* DETAILS */}
            <div className="border-b border-gray-200 pb-8 mb-8">
              <h3 className="text-sm tracking-[0.25em] uppercase mb-6">
                Details
              </h3>

              <p className="text-gray-600 leading-8 text-[15px] mb-6">
                {product.description}
              </p>

              <ul className="space-y-3 text-[15px] text-gray-700">
                <li>• 100% Premium Cotton</li>
                <li>• Oversized Relaxed Fit</li>
                <li>• Heavyweight Fabric</li>
                <li>• Washed Vintage Finish</li>
                <li>• High Quality Graphic Print</li>
                <li>• Model wears size L</li>
              </ul>
            </div>

            {/* SIZE & FIT */}
            <div className="border-b border-gray-200 py-6 flex justify-between items-center">
              <h3 className="text-sm tracking-[0.25em] uppercase">
                Size & Fit
              </h3>

              <p className="text-gray-500 text-sm">
                Oversized silhouette
              </p>
            </div>

            {/* SHIPPING */}
            <div className="border-b border-gray-200 py-6 flex justify-between items-center">
              <h3 className="text-sm tracking-[0.25em] uppercase">
                Shipping & Returns
              </h3>

              <p className="text-gray-500 text-sm">
                Worldwide shipping
              </p>
            </div>

            {/* CARE */}
            <div className="py-6 flex justify-between items-center">
              <h3 className="text-sm tracking-[0.25em] uppercase">
                Care Guide
              </h3>

              <p className="text-gray-500 text-sm">
                Machine wash cold
              </p>
            </div>

          </div>

        </div>

      </div>

      {zoomOpen && (
        <div className="fixed inset-0 z-[9999] bg-black/95 flex items-center justify-center">

          {/* CLOSE BUTTON */}
          <button
            onClick={() => setZoomOpen(false)}
            className="absolute top-6 right-6 text-white text-5xl z-50"
          >
            ×
          </button>

          {/* FULL IMAGE */}
          <div className="relative w-full h-full flex items-center justify-center p-10">

            <Image
              src={
                product.images && product.images.length > 0
                  ? product.images[currentImage]
                  : "/shirt.png"
              }
              alt={product.name}
              fill
              className="object-contain"
            />

          </div>

        </div>
      )}
    </div>

  );
}