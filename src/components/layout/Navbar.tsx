'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  ShoppingBag,
  Search,
  User,
  Menu,
  X as CloseIcon
} from 'lucide-react';

import { useStore } from '@/store/useStore';
import Logo from '../ui/Logo';
import { usePathname } from 'next/navigation';

export default function Navbar() {

  const [isScrolled, setIsScrolled] = useState(false);

  const [mobileMenuOpen, setMobileMenuOpen] =
    useState(false);

  const cart = useStore((state) => state.cart);

  const pathname = usePathname();

  useEffect(() => {

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener(
      'scroll',
      handleScroll
    );

    return () =>
      window.removeEventListener(
        'scroll',
        handleScroll
      );

  }, []);

  const isWhiteNav =
    pathname === '/showroom' &&
    !isScrolled;

  const textColor = isWhiteNav
    ? 'text-white'
    : 'text-black';

  const logoVariant = isWhiteNav
    ? 'white'
    : 'black';

  const bgStyle = isScrolled
    ? 'bg-white/80 backdrop-blur-md border-b border-gray-100'
    : 'bg-transparent';

  // OPEN CART
  const openCart = () => {
    useStore.setState({
      isCartOpen: true,
    });
  };

  return (

    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${bgStyle}`}
    >

      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">

        {/* LEFT LINKS */}
        <div className="flex-1 items-center gap-8 hidden md:flex">

          <Link
            href="/collection"
            className={`text-sm uppercase tracking-widest hover:opacity-50 transition-opacity ${textColor}`}
          >
            Collection
          </Link>

          <Link
            href="/showroom"
            className={`text-sm uppercase tracking-widest hover:opacity-50 transition-opacity ${textColor}`}
          >
            Showroom
          </Link>

          <Link
            href="/about"
            className={`text-sm uppercase tracking-widest hover:opacity-50 transition-opacity ${textColor}`}
          >
            About
          </Link>

        </div>

        {/* LOGO */}
        <div className="flex-1 flex justify-center">

          <Logo
            width={220}
            height={80}
            variant={logoVariant}
          />

        </div>

        {/* RIGHT ICONS */}
        <div
          className={`flex-1 justify-end items-center gap-6 hidden md:flex ${textColor}`}
        >

          <button className="hover:opacity-50 transition-opacity">

            <Search
              size={20}
              strokeWidth={1.5}
            />

          </button>

          <Link
            href="/login"
            className="hover:opacity-50 transition-opacity"
          >

            <User
              size={20}
              strokeWidth={1.5}
            />

          </Link>

          {/* CART */}
          <button
            onClick={openCart}
            className="relative hover:opacity-50 transition-opacity"
          >

            <ShoppingBag
              size={20}
              strokeWidth={1.5}
            />

            {cart.length > 0 && (

              <span
                className="absolute -top-1 -right-2 bg-black text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center"
              >
                {cart.length}
              </span>

            )}

          </button>

        </div>

        {/* MOBILE BUTTON */}
        <div
          className={`md:hidden flex flex-1 justify-end ${textColor}`}
        >

          <button
            onClick={() =>
              setMobileMenuOpen(true)
            }
          >

            <Menu
              size={24}
              strokeWidth={1.5}
            />

          </button>

        </div>

      </div>

      {/* MOBILE MENU */}
      {mobileMenuOpen && (

        <div
          className="fixed inset-0 bg-white z-50 flex flex-col p-6 animate-in slide-in-from-right"
        >

          <div className="flex justify-between items-center mb-12">

            <Logo
              width={120}
              height={40}
              variant="black"
            />

            <button
              onClick={() =>
                setMobileMenuOpen(false)
              }
            >

              <CloseIcon
                size={24}
                strokeWidth={1.5}
                className="text-black"
              />

            </button>

          </div>

          {/* MOBILE LINKS */}
          <div className="flex flex-col gap-8 text-2xl font-light">

            <Link
              href="/"
              onClick={() =>
                setMobileMenuOpen(false)
              }
            >
              Home
            </Link>

            <Link
              href="/collection"
              onClick={() =>
                setMobileMenuOpen(false)
              }
            >
              Collection
            </Link>

            <Link
              href="/showroom"
              onClick={() =>
                setMobileMenuOpen(false)
              }
            >
              Showroom
            </Link>

            <Link
              href="/about"
              onClick={() =>
                setMobileMenuOpen(false)
              }
            >
              About
            </Link>

          </div>

          {/* MOBILE FOOTER */}
          <div className="mt-auto flex justify-between items-center pb-8">

            <Link
              href="/login"
              className="text-sm uppercase tracking-widest"
            >
              Account
            </Link>

            <button
              onClick={() => {

                setMobileMenuOpen(false);

                openCart();

              }}
              className="text-sm uppercase tracking-widest"
            >

              Cart ({cart.length})

            </button>

          </div>

        </div>

      )}

    </nav>
  );
}