"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

export default function PageTransition({ children }) {
    const pathname = usePathname();

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={pathname}
                initial={{
                    opacity: 0,
                    y: 40,
                    filter: "blur(10px)",
                }}
                animate={{
                    opacity: 1,
                    y: 0,
                    filter: "blur(0px)",
                }}
                exit={{
                    opacity: 0,
                    y: -40,
                    filter: "blur(10px)",
                }}
                transition={{
                    duration: 0.8,
                    ease: "easeInOut",
                }}
            >
                {children}
            </motion.div>
        </AnimatePresence>
    );
}