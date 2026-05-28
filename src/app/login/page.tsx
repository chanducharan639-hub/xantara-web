'use client';

import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import ProtectedRoute from "@/components/ProtectedRoute";
import { signIn, signOut, useSession } from "next-auth/react";
import { useWishlist } from "../../context/WishlistContext";

import { useStore } from '@/store/useStore';
import Logo from '@/components/ui/Logo';

import {
  User,
  Package,
  Heart,
  MapPin,
  Settings,
  LogOut,
  Search,
  ShoppingBag,
  CheckCircle2,
} from 'lucide-react';

import './page.css';

function DashboardInner() {
  const { wishlist, toggleWishlist } = useWishlist();
  const router = useRouter();

  const searchParams = useSearchParams();
  const { data: session, status } = useSession();

  const user = session?.user;

  const authLoading = status === "loading";

  console.log("USER:", user);
  console.log("LOADING:", authLoading);
  const handleLogout = async () => {
    await signOut({ callbackUrl: "/login" });
    router.push("/login");
  };
  const store = useStore();

  const orders = store.orders || [];
  const cart = store.cart || [];
  const isCartOpen = store.isCartOpen;
  const setIsCartOpen = store.setIsCartOpen;
  const [activeMenu, setActiveMenu] = useState(
    searchParams.get('tab') || 'account'
  );

  const [successMsg, setSuccessMsg] = useState(
    searchParams.get('success') === '1'
  );

  /* GOOGLE LOGIN */


  /* SUCCESS MESSAGE */
  useEffect(() => {

    if (successMsg) {

      const timer = setTimeout(() => {

        setSuccessMsg(false);

      }, 4000);

      return () => clearTimeout(timer);
    }

  }, [successMsg]);


  /* LOADING */
  if (authLoading) {

    return (
      <div
        className="min-h-screen flex items-center justify-center"
      >
        Loading...
      </div>
    );
  }

  /* LOGIN SCREEN */
  if (!user) {

    return (
      <main className="min-h-screen flex items-center justify-center">

        <button
          onClick={() => signIn("google")}
          className="px-8 py-4 bg-black text-white uppercase tracking-widest"
        >
          Login With Google
        </button>

      </main>
    );
  }

  return (

    <div className="dashboard">

      {/* SIDEBAR */}
      <aside className="sidebar">

        <div className="sidebar-top">

          <div className="logo-container">
            <Logo />
          </div>

          <nav className="menu">

            {[
              {
                id: 'account',
                label: 'ACCOUNT',
                Icon: User,
              },

              {
                id: 'orders',
                label: 'ORDERS',
                Icon: Package,
              },

              {
                id: 'wishlist',
                label: 'WISHLIST',
                Icon: Heart,
              },

              {
                id: 'addresses',
                label: 'ADDRESSES',
                Icon: MapPin,
              },

              {
                id: 'settings',
                label: 'SETTINGS',
                Icon: Settings,
              },

            ].map(({ id, label, Icon }) => (

              <button
                key={id}
                className={`menu-item ${activeMenu === id ? 'active' : ''}`}
                onClick={() => setActiveMenu(id)}
              >

                <Icon size={18} />

                <span>{label}</span>

              </button>

            ))}

            <button
              className="menu-item logout"
              onClick={handleLogout}
            >

              <LogOut size={18} />

              <span>LOGOUT</span>

            </button>

          </nav>
        </div>
      </aside>

      {/* MAIN */}
      <main className="main-content">

        {/* TOPBAR */}
        <div className="topbar">

          <div className="topbar-text">

            <p className="welcome">
              Welcome back,
            </p>

            <h1 className="title">
              {user.name || 'Luxury Member'} ✨
            </h1>

            <p className="subtitle">
              Manage your luxury experience.
            </p>

          </div>

          <div className="topbar-icons">

            <button className="icon-btn">
              <Search size={22} />
            </button>

            <button className="icon-btn">
              <User size={22} />
            </button>

            <button
              className="icon-btn"
              onClick={() => router.push('/checkout')}
              style={{ position: 'relative' }}
            >

              <ShoppingBag size={22} />

              {cart.length > 0 && (

                <span
                  style={{
                    position: 'absolute',
                    top: -6,
                    right: -6,
                    background: '#000',
                    color: '#fff',
                    width: 18,
                    height: 18,
                    borderRadius: '50%',
                    fontSize: 10,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {cart.length}
                </span>

              )}

            </button>

          </div>

        </div>

        {/* SUCCESS */}
        {successMsg && (

          <div
            style={{
              background: '#edf5e8',
              padding: '14px 20px',
              borderRadius: 10,
              marginBottom: '20px',
            }}
          >

            <CheckCircle2 size={18} />

            Order placed successfully 🎉

          </div>

        )}

        {/* ACCOUNT */}
        {activeMenu === 'account' && (

          <div className="card">

            <h2 className="card-heading">
              ACCOUNT INFORMATION
            </h2>

            <div className="account-grid">

              <div className="account-field">

                <label>EMAIL</label>

                <h3>{user.email}</h3>

              </div>

              <div className="account-field">

                <label>MEMBERSHIP</label>

                <h3>BLACK TIER MEMBER</h3>

              </div>

            </div>

          </div>

        )}

        {/* ORDERS */}
        {activeMenu === 'orders' && (

          <div className="card">

            <h2 className="card-heading">
              MY ORDERS
            </h2>

            {orders.length === 0 ? (

              <p>No orders yet</p>

            ) : (

              orders.map((order: any, i: number) => (

                <div key={i}>
                  {order.name}
                </div>

              ))

            )}

          </div>

        )}

        {/* WISHLIST */}
        {activeMenu === 'wishlist' && (

          <div className="card">

            <h2 className="card-heading">
              MY WISHLIST
            </h2>

            {wishlist.length === 0 ? (
              <p>Wishlist is empty</p>
            ) : (
              <div className="grid grid-cols-2 gap-4 mt-4">
                {wishlist.map((item: any, i: number) => (
                  <div
                    key={i}
                    className="border rounded-xl p-4"
                  >
                    <img
                      src={item.images?.[0] || item.image}
                      alt={item.name}
                      className="w-full aspect-square object-cover rounded-lg"
                    />

                    <h3 className="mt-3 font-medium">
                      {item.name}
                    </h3>

                    <p className="text-gray-500 text-sm">
                      {item.price}
                    </p>
                    <button
                      onClick={() => toggleWishlist(item)}
                      className="mt-3 px-4 py-2 bg-black text-white rounded-lg text-sm"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            )}

          </div>

        )}

      </main>

    </div>
  );
}

/* EXPORT */
export default function DashboardPage() {

  return (

    <ProtectedRoute>

      <Suspense
        fallback={
          <div className="min-h-screen flex items-center justify-center">
            Loading...
          </div>
        }
      >

        <DashboardInner />

      </Suspense>

    </ProtectedRoute>

  );
}