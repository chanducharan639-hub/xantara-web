'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useState } from "react";
import Loader from "@/components/Loader";
import HeroScene from '@/components/3d/HeroScene';
import Link from 'next/link';
import { PRODUCTS } from "@/data/products";
import Image from "next/image";

export default function Home() {
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);
  const { scrollYProgress } = useScroll();

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '40%']);
  const opacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);

  if (loading) {
    return <Loader />;
  }

  return (

    <main className="relative w-full bg-[#f5f5f5] overflow-hidden">

      {/* HERO */}
      <section className="relative h-screen overflow-hidden bg-[#f5f5f5]">



        {/* 3D X + RING */}
        <div className="absolute inset-0 z-20">
          <HeroScene />
        </div>
        {/* BRAND CONTENT */}
        <div className="absolute inset-0 z-30 flex flex-col items-center justify-center pointer-events-none">

          {/* XANTARA */}
          <div className="mt-[420px] text-center">

            <h1 className="
      text-[80px]
      md:text-[130px]
      font-serif
      tracking-[-0.08em]
      leading-none
      text-black
    ">
              XANTARA
            </h1>

            <p className="
      mt-5
      text-[11px]
      tracking-[0.55em]
      uppercase
      text-black/50
    ">
              THE FUTURE OF LUXURY
            </p>

          </div>

        </div>


        {/* CONTENT */}
        <motion.div
          style={{ y, opacity }}
          className="absolute inset-0 z-30 flex flex-col items-center justify-center"
        >

          <div className="text-center pointer-events-none">

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.4, delay: 0.3 }}
              className="mt-[340px] text-[10px] md:text-sm tracking-[0.6em] uppercase text-black/70"
            >

            </motion.p>

          </div>

        </motion.div>


        {/* SCROLL INDICATOR */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20">
          <div className="flex flex-col items-center animate-pulse">
            <span className="text-[10px] tracking-[0.4em] uppercase text-black/40">

            </span>

            <div className="w-px h-16 bg-black/20 mt-4"></div>
          </div>
        </div>
      </section>

      {/* COLLECTION */}
      <section className="relative z-20 bg-white py-32 px-6">
        <div className="max-w-7xl mx-auto">

          <div className="flex flex-col md:flex-row justify-between items-end mb-20">
            <div>
              <p className="uppercase tracking-[0.4em] text-xs text-gray-400 mb-4">
                Collection
              </p>

              <h2 className="text-5xl font-serif mb-6">
                FW 2026
              </h2>

              <p className="max-w-xl text-gray-500 leading-relaxed">
                Sculptural silhouettes. Monochrome precision.
                Designed for the next era of luxury fashion.
              </p>
            </div>

            <Link
              href="/collection"
              className="mt-10 md:mt-0 border-b border-black pb-2 text-xs uppercase tracking-[0.3em] hover:opacity-50 transition"
            >
              Explore Collection
            </Link>
          </div>

          {/* PRODUCTS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {PRODUCTS.slice(0, 3).map((product) => (

              <Link
                key={product.id}
                href={`/product/${product.id}`}
                className="group"
              >

                {/* IMAGE */}
                <div className="relative overflow-hidden bg-[#f3f3f3]">

                  <div className="relative aspect-[3/4] overflow-hidden group">

                    {/* FIRST IMAGE */}
                    <Image
                      src={product.images[0]}
                      alt={product.name}
                      fill
                      priority
                      loading="eager"
                      sizes="(max-width: 768px) 100vw,
       (max-width: 1200px) 50vw,
       33vw"
                      className="
        object-cover
        transition-all
        duration-700
        group-hover:opacity-0
        group-hover:scale-105
      "
                    />

                    {/* SECOND IMAGE */}
                    <Image
                      src={product.images[1] || product.images[0]}
                      alt={product.name}
                      fill
                      priority
                      loading="eager"
                      sizes="(max-width: 768px) 100vw,
             (max-width: 1200px) 50vw,
             33vw"
                      className="
        object-cover
        opacity-0
        transition-all
        duration-700
        group-hover:opacity-100
        group-hover:scale-105
      "
                    />

                  </div>

                </div>

                {/* INFO */}
                < div className="mt-4 flex items-start justify-between" >

                  <div>
                    <h3 className="text-[15px] tracking-wide">
                      {product.name}
                    </h3>

                    <p className="text-sm text-black/50 mt-1 uppercase">
                      {product.category}
                    </p>
                  </div>

                  <p className="text-sm">
                    ₹{product.price}
                  </p>

                </div>

              </Link>

            ))}
          </div>
        </div>
      </section >

      {/* PHILOSOPHY */}
      < section className="relative bg-black text-white py-40 overflow-hidden" >

        <div className="absolute inset-0 flex items-center justify-center opacity-5">
          <span className="text-[40vw] font-serif leading-none">
            X
          </span>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center px-6">

          <p className="uppercase tracking-[0.5em] text-xs text-gray-500 mb-8">
            Philosophy
          </p>

          <h2 className="text-4xl md:text-6xl font-serif leading-tight">
            Luxury is emotion shaped into form.
          </h2>

          <Link
            href="/about"
            className="inline-block mt-14 border border-white px-12 py-5 text-xs uppercase tracking-[0.3em] hover:bg-white hover:text-black transition-all duration-500"
          >
            Discover More
          </Link>
        </div>
      </section >

    </main >

  );
}