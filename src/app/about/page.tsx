'use client';
import { motion } from 'framer-motion';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white text-black pt-32 pb-24">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h1 className="text-4xl md:text-6xl font-serif mb-8">The Philosophy</h1>
        <p className="text-lg md:text-xl font-light text-gray-500 leading-relaxed mb-12">
          Xantara is a premium clothing brand crafted for individuals who value style, confidence, and quality. We blend timeless elegance with modern design to create apparel that is sophisticated, comfortable, and effortlessly distinctive.
        </p>
        <p className="text-lg md:text-xl font-light text-gray-500 leading-relaxed mb-10">
          Wear Confidence. Wear Xantara.
        </p>

        <div className="aspect-video bg-gray-100 mb-24 relative overflow-hidden">
          <img
            src="/about-hero.png"
            alt="XANTARA"
            className="object-cover w-full h-full"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 text-left">
          <div>
            <h2 className="text-2xl font-serif mb-4">Innovation</h2>
            <p className="font-light text-gray-600 leading-relaxed">
              We engineer our own textiles, ensuring every thread serves a purpose. Magnetic closures, phase-change materials, and structural memory fabrics are staples in our collections.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-serif mb-4">Sustainability</h2>
            <p className="font-light text-gray-600 leading-relaxed">
              Minimalism extends to our footprint. We produce in strictly limited runs to eliminate waste, utilizing bio-synthetic fibers and circular recycling methods.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
