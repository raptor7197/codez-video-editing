"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface BlackHoleTransitionProps {
    isTriggered: boolean;
    onComplete: () => void;
}

const BlackHoleTransition: React.FC<BlackHoleTransitionProps> = ({
    isTriggered,
    onComplete,
}) => {
    const [showHole, setShowHole] = useState(false);

    useEffect(() => {
        if (isTriggered) {
            setShowHole(true);
            // Sequence: 
            // 1. Hole appears and grows
            // 2. Screen gets sucked in (handled by parent or overlay effect)
            // 3. Wait for animation to finish
            // 4. Call onComplete
            const timer = setTimeout(() => {
                onComplete();
            }, 2500); // Adjust based on animation duration
            return () => clearTimeout(timer);
        }
    }, [isTriggered, onComplete]);

    return (
        <AnimatePresence>
            {showHole && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
                >
                    {/* The Black Hole */}
                    <motion.div
                        initial={{ scale: 0, rotate: 0 }}
                        animate={{
                            scale: [0, 50],
                            rotate: 360,
                            backgroundColor: ["#000", "#000"]
                        }}
                        transition={{
                            duration: 2,
                            ease: "easeInOut", // Slower start, faster middle
                            times: [0, 1]
                        }}
                        className="w-20 h-20 rounded-full bg-black shadow-[0_0_100px_50px_rgba(0,0,0,1)] ring-4 ring-red-500/50"
                    />

                    {/* Sucking Effect Overlay (Warping) - Simplified as a full screen fade to black for now with the hole growing */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.5, duration: 0.5 }}
                        className="absolute inset-0 bg-black"
                    />
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default BlackHoleTransition;
