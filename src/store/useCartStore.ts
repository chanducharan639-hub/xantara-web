// src/store/useCartStore.ts
import { create } from 'zustand';

export interface CartItem {
    id: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
}

interface CartStore {
    isCartOpen: boolean;
    setIsCartOpen: (open: boolean) => void;
    cart: CartItem[];
    addToCart: (item: CartItem) => void;
    removeFromCart: (id: string) => void;
    updateQuantity: (id: string, quantity: number) => void;
    clearCart: () => void;
}

export const useCartStore = create<CartStore>((set) => ({
    isCartOpen: false,
    setIsCartOpen: (open) => set({ isCartOpen: open }),
    cart: [],
    addToCart: (item) =>
        set((state) => {
            const existing = state.cart.find((i) => i.id === item.id);
            if (existing) {
                return {
                    cart: state.cart.map((i) =>
                        i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
                    ),
                };
            }
            return { cart: [...state.cart, { ...item, quantity: 1 }] };
        }),
    removeFromCart: (id) =>
        set((state) => ({ cart: state.cart.filter((i) => i.id !== id) })),
    updateQuantity: (id, quantity) =>
        set((state) => ({
            cart: state.cart.map((i) => (i.id === id ? { ...i, quantity } : i)),
        })),
    clearCart: () => set({ cart: [] }),
}));