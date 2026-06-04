'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Product = {
  id: any;
  name: string;
  price: number;
  images: string[];
  [key: string]: any;
};

type CartItem = Product & {
  qty: number;
  quantity?: number;
  size?: string;
  [key: string]: any;
};

type OrderItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  size?: string;
  status?: string;
  [key: string]: any;
};

type AppState = {

  cart: CartItem[];
  orders: OrderItem[];
  wishlist: Product[];

  addOrder: (order: OrderItem) => void;
  clearCart: () => void;
  isCartOpen: boolean;

  setIsCartOpen: (value: boolean) => void;

  addToCart: (
    product: CartItem,
    size?: string
  ) => void;

  removeFromCart: (
    id: string,
    size?: string
  ) => void;

  updateQty: (
    id: string,
    size: string,
    qty: number
  ) => void;

  toggleWishlist: (
    product: Product
  ) => void;

  placeOrder: () => void;

  cartTotal: () => number;

  cartCount: () => number;
};

export const useStore = create<AppState>()(
  persist(

    (set, get) => ({

      cart: [],

      orders: [],

      wishlist: [],

      isCartOpen: false,

      setIsCartOpen: (value) =>
        set({
          isCartOpen: value,
        }),
      clearCart: () =>
        set({
          cart: [],
        }),

      addToCart: (product) =>
        set((state) => {
          const existingItem = state.cart.find(
            (item) =>
              item.id === product.id &&
              item.size === product.size
          );

          if (existingItem) {
            return {
              cart: state.cart.map((item) =>
                item.id === product.id &&
                  item.size === product.size
                  ? {
                    ...item,
                    qty: item.qty + 1,
                  }
                  : item
              ),
            };
          }

          return {
            cart: [...state.cart, product],
          };
        }),

      removeFromCart: (id, size) => {

        const cart = get().cart;

        set({
          cart: cart.filter(
            (item) =>
              !(
                item.id === id &&
                item.size === size
              )
          ),
        });

      },
      updateQty: (id, size, qty) =>
        set((state) => ({
          cart: state.cart.map((item) =>
            item.id === id && item.size === size
              ? { ...item, qty: qty <= 0 ? 1 : qty }
              : item
          ),
        })),
      toggleWishlist: (product) => {

        const wishlist = get().wishlist;

        const exists = wishlist.find(
          (item) => item.id === product.id
        );

        if (exists) {

          set({
            wishlist: wishlist.filter(
              (item) => item.id !== product.id
            ),
          });

        } else {

          set({
            wishlist: [
              ...wishlist,
              product,
            ],
          });

        }
      },
      addOrder: (order) =>
        set((state) => ({
          orders: [...state.orders, order],
        })),
      placeOrder: () => {

        const cart = get().cart;

        const newOrders = cart.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.qty || item.quantity || 1,
          size: item.size || 'M',
          status: 'Processing',
        }));

        set((state) => ({
          orders: [
            ...state.orders,
            ...newOrders,
          ],
          cart: [],
        }));

      },

      cartTotal: () => {

        return get().cart.reduce(
          (total, item) =>
            total +
            item.price * (item.qty || item.quantity || 1),
          0
        );

      },

      cartCount: () => {

        return get().cart.reduce(
          (count, item) =>
            count + (item.qty || item.quantity || 1),
          0
        );

      },

    }),
    {
      name: 'xantara-store',
    }
  )
);