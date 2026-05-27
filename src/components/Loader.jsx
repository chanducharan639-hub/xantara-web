// src/components/Loader.jsx

"use client";

import { motion } from "framer-motion";

export default function Loader() {
    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black">
            <div className="text-center">

                <motion.h1
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{
                        opacity: 1,
                        scale: 1,
                    }}
                    transition={{
                        duration: 1.2,
                    }}
                    className="text-white text-5xl font-light tracking-[12px]"
                >
                    XANTARA
                </motion.h1>

                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "220px" }}
                    transition={{
                        duration: 2,
                        ease: "easeInOut",
                    }}
                    className="h-[1px] bg-white mx-auto mt-6"
                />
            </div>
        </div>
    );
}