'use client';
import Link from 'next/link';
import Logo from '../ui/Logo';

export default function Footer() {
  return (
    <footer className="bg-black text-white pt-24 pb-12 border-t border-gray-900">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        <div className="col-span-1 md:col-span-1 flex flex-col gap-6">
          <Logo variant="white" width={140} height={40} />
          <p className="text-gray-400 text-sm font-light leading-relaxed">
            The future of luxury fashion. A cinematic journey into minimal elegance and premium digital wear.
          </p>
        </div>
        
        <div>
          <h4 className="text-xs uppercase tracking-[0.2em] mb-6 font-semibold">Collections</h4>
          <ul className="flex flex-col gap-4 text-sm font-light text-gray-400">
            <li><Link href="/collection/fw26" className="hover:text-white transition-colors">Fall/Winter '26</Link></li>
            <li><Link href="/collection/ss26" className="hover:text-white transition-colors">Spring/Summer '26</Link></li>
            <li><Link href="/collection/essentials" className="hover:text-white transition-colors">Essentials</Link></li>
            <li><Link href="/collection/accessories" className="hover:text-white transition-colors">Accessories</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs uppercase tracking-[0.2em] mb-6 font-semibold">Company</h4>
          <ul className="flex flex-col gap-4 text-sm font-light text-gray-400">
            <li><Link href="/about" className="hover:text-white transition-colors">About Xantara</Link></li>
            <li><Link href="/showroom" className="hover:text-white transition-colors">3D Showroom</Link></li>
            <li><Link href="/careers" className="hover:text-white transition-colors">Careers</Link></li>
            <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs uppercase tracking-[0.2em] mb-6 font-semibold">Newsletter</h4>
          <p className="text-gray-400 text-sm font-light mb-4">Subscribe to receive updates, access to exclusive deals, and more.</p>
          <form className="flex border-b border-gray-700 pb-2">
            <input 
              type="email" 
              placeholder="Enter your email address" 
              className="bg-transparent flex-1 text-sm outline-none placeholder-gray-600 text-white"
            />
            <button type="submit" className="text-xs uppercase tracking-widest hover:opacity-70 transition-opacity">Subscribe</button>
          </form>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-xs text-gray-600 font-light border-t border-gray-900 pt-8">
        <p>&copy; {new Date().getFullYear()} XANTARA. All rights reserved.</p>
        <div className="flex gap-6 mt-4 md:mt-0">
          <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}
