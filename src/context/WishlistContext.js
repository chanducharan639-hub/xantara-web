"use client";

import { createContext, useContext, useEffect, useState } from "react";

const WishlistContext = createContext();

export function WishlistProvider({ children }) {

    const [wishlist, setWishlist] = useState([]);

    // LOAD wishlist from localStorage
    useEffect(() => {
        const savedWishlist = localStorage.getItem("wishlist");

        if (savedWishlist) {
            setWishlist(JSON.parse(savedWishlist));
        }
    }, []);

    // SAVE wishlist to localStorage
    useEffect(() => {
        localStorage.setItem("wishlist", JSON.stringify(wishlist));
    }, [wishlist]);

    const toggleWishlist = (product) => {

        setWishlist((prev) => {

            const exists = prev.find(
                (item) => item.id === product.id
            );

            if (exists) {
                return prev.filter(
                    (item) => item.id !== product.id
                );
            }

            return [...prev, product];
        });
    };

    return (
        <WishlistContext.Provider
            value={{
                wishlist,
                toggleWishlist,
            }}
        >
            {children}
        </WishlistContext.Provider>
    );
}

export const useWishlist = () =>
    useContext(WishlistContext);