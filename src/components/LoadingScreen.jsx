import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SIGNAL_SEQUENCE = ["red", "yellow", "green"];
const SIGNAL_INTERVAL = 700;

export default function LoadingScreen({ isLoading }) {
    const [activeSignal, setActiveSignal] = useState(0);

    useEffect(() => {
        if (!isLoading) return;
        const interval = setInterval(() => {
            setActiveSignal((prev) => (prev + 1) % SIGNAL_SEQUENCE.length);
        }, SIGNAL_INTERVAL);
        return () => clearInterval(interval);
    }, [isLoading]);

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    className="fixed inset-0 z-50 bg-navy-950 flex flex-col items-center justify-center select-none"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{
                        duration: 0.5,
                        ease: [0.43, 0.13, 0.23, 0.96],
                    }}>
                    {/* Logo with cyan pulse glow */}
                    <motion.h1
                        className="text-4xl md:text-5xl font-heading font-bold text-cyan text-glow-cyan mb-8!"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}>
                        Smart<span className="text-electric">Traffic</span>
                    </motion.h1>

                    {/* Traffic Signal Cycling */}
                    <motion.div
                        className="traffic-signal mb-8 shadow-lg"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4, delay: 0.2 }}>
                        {SIGNAL_SEQUENCE.map((color, i) => (
                            <div
                                key={color}
                                className={`traffic-light ${color} ${activeSignal === i ? "active" : ""}`}
                            />
                        ))}
                    </motion.div>

                    {/* Moving road */}
                    <motion.div
                        className="w-48 md:w-64 loading-road rounded-full mb-8"
                        initial={{ opacity: 0, scaleX: 0 }}
                        animate={{ opacity: 1, scaleX: 1 }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                    />

                    {/* Init Text */}
                    <motion.p
                        className="text-slate-500 text-xs font-body tracking-widest uppercase"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{
                            duration: 1.8,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}>
                        Initializing Smart City Systems...
                    </motion.p>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
