import { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon, Zap } from "lucide-react";
import { staggerContainer } from "@/utils/animations";
import { NAV_LINKS } from "@/utils/constants";
import { useTheme } from "@/context/ThemeContext";

/* Navbar dynamic transitions */
const navVariants = {
    top: {
        paddingTop: "16px",
        paddingBottom: "16px",
        backgroundColor: "rgba(4,11,23,0)",
        backdropFilter: "blur(0px)",
        WebkitBackdropFilter: "blur(0px)",
        borderBottomColor: "rgba(255,255,255,0)",
    },
    scrolled: {
        paddingTop: "10px",
        paddingBottom: "10px",
        backgroundColor: "var(--nav-bg)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        borderBottomColor: "var(--nav-border)",
    },
};

const mobileMenuVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.25,
            ease: "easeOut",
            when: "beforeChildren",
        },
    },
    exit: {
        opacity: 0,
        y: -10,
        transition: {
            duration: 0.2,
            ease: "easeIn",
            when: "afterChildren",
        },
    },
};

const mobileLinkVariants = {
    hidden: { opacity: 0, x: -16 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.25, ease: "easeOut" },
    },
};

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const { isDark, toggleTheme } = useTheme();

    // Scroll handler
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 60);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Lock body scroll when mobile menu is open
    useEffect(() => {
        if (mobileOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [mobileOpen]);

    return (
        <>
            {/* ────────── Global Navigation Header ────────── */}
            <motion.nav
                className="fixed top-0 left-0 w-full z-50 border-b"
                variants={navVariants}
                initial="top"
                animate={scrolled ? "scrolled" : "top"}
                transition={{ duration: 0.3, ease: "easeInOut" }}>
                <div className="container-custom flex items-center justify-between h-13">
                    {/* Logo */}
                    <Link
                        to="/"
                        className="flex items-center gap-2 group shrink-0 z-50"
                        onClick={() => setMobileOpen(false)}
                        aria-label="SmartTraffic Home">
                        <div className="w-7 h-7 rounded-lg bg-linear-to-br from-cyan to-electric flex items-center justify-center">
                            <Zap className="w-4 h-4 text-white" />
                        </div>
                        <span className="font-heading font-bold text-lg bg-linear-to-r from-cyan to-electric bg-clip-text text-transparent leading-none">
                            SmartTraffic
                        </span>
                    </Link>

                    {/* Desktop Links */}
                    <div className="hidden md:flex items-center gap-1">
                        {NAV_LINKS.map((link) => (
                            <NavLink
                                key={link.path}
                                to={link.path}
                                end={link.path === "/"}
                                className="relative px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200 group">
                                {({ isActive }) => (
                                    <>
                                        <span
                                            className={`transition-colors duration-200 ${
                                                isActive
                                                    ? "text-cyan"
                                                    : "text-text-secondary hover:text-text-primary"
                                            }`}>
                                            {link.label}
                                        </span>
                                        {isActive && (
                                            <motion.span
                                                layoutId="nav-indicator"
                                                className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 rounded-full bg-cyan"
                                                style={{
                                                    boxShadow:
                                                        "0 0 8px rgba(6,182,212,0.8)",
                                                }}
                                                transition={{
                                                    type: "spring",
                                                    stiffness: 380,
                                                    damping: 28,
                                                }}
                                            />
                                        )}
                                    </>
                                )}
                            </NavLink>
                        ))}
                    </div>

                    {/* Desktop Right Controls */}
                    <div className="hidden md:flex items-center gap-2">
                        {/* Theme toggle */}
                        <motion.button
                            onClick={toggleTheme}
                            className="p-2 rounded-lg glass hover:bg-surface-hover transition-colors duration-200"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            aria-label={
                                isDark
                                    ? "Switch to light mode"
                                    : "Switch to dark mode"
                            }>
                            <AnimatePresence mode="wait" initial={false}>
                                {isDark ? (
                                    <motion.div
                                        key="sun"
                                        initial={{ rotate: -90, opacity: 0 }}
                                        animate={{ rotate: 0, opacity: 1 }}
                                        exit={{ rotate: 90, opacity: 0 }}
                                        transition={{ duration: 0.15 }}>
                                        <Sun className="w-4 h-4 text-amber-300" />
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="moon"
                                        initial={{ rotate: 90, opacity: 0 }}
                                        animate={{ rotate: 0, opacity: 1 }}
                                        exit={{ rotate: -90, opacity: 0 }}
                                        transition={{ duration: 0.15 }}>
                                        <Moon className="w-4 h-4 text-purple" />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.button>

                        {/* CTA */}
                        <Link to="/emergency">
                            <motion.span
                                className="btn-primary text-sm py-2! px-4! rounded-lg!"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}>
                                Get Started
                            </motion.span>
                        </Link>
                    </div>

                    {/* Mobile Menu Trigger (Stays z-50 to sit on top of drawer) */}
                    <motion.button
                        className="md:hidden p-2 rounded-lg glass z-50 flex items-center justify-center"
                        onClick={() => setMobileOpen(!mobileOpen)}
                        whileTap={{ scale: 0.9 }}
                        aria-label="Toggle menu"
                        aria-expanded={mobileOpen}>
                        <AnimatePresence mode="wait" initial={false}>
                            {mobileOpen ? (
                                <motion.div
                                    key="close"
                                    initial={{ rotate: -90, opacity: 0 }}
                                    animate={{ rotate: 0, opacity: 1 }}
                                    exit={{ rotate: 90, opacity: 0 }}
                                    transition={{ duration: 0.15 }}>
                                    <X className="w-5 h-5 text-text-primary" />
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="menu"
                                    initial={{ rotate: 90, opacity: 0 }}
                                    animate={{ rotate: 0, opacity: 1 }}
                                    exit={{ rotate: -90, opacity: 0 }}
                                    transition={{ duration: 0.15 }}>
                                    <Menu className="w-5 h-5 text-text-primary" />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.button>
                </div>
            </motion.nav>

            {/* ────────── Mobile Drawer ────────── */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        className="fixed inset-0 z-40 md:hidden flex flex-col justify-center px-6"
                        style={{
                            background: isDark ? "rgba(4,11,23,0.98)" : "rgba(240,244,248,0.98)",
                            backdropFilter: "blur(20px)",
                            WebkitBackdropFilter: "blur(20px)",
                        }}
                        variants={mobileMenuVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit">
                        {/* Nav list area wrapper */}
                        <motion.div
                            className="flex flex-col items-start w-full max-w-sm mx-auto gap-6 pt-16"
                            variants={staggerContainer(0.05, 0.03)}
                            initial="hidden"
                            animate="visible">
                            {NAV_LINKS.map((link) => (
                                <motion.div
                                    key={link.path}
                                    variants={mobileLinkVariants}
                                    className="w-full">
                                    <NavLink
                                        to={link.path}
                                        end={link.path === "/"}
                                        onClick={() => setMobileOpen(false)}
                                        className="text-3xl font-heading font-semibold tracking-wide block py-2 w-full">
                                        {({ isActive }) => (
                                            <span
                                                className={`transition-colors duration-200 block ${
                                                    isActive
                                                        ? "text-cyan"
                                                        : "text-text-secondary hover:text-text-primary"
                                                }`}>
                                                {link.label}
                                            </span>
                                        )}
                                    </NavLink>
                                </motion.div>
                            ))}

                            {/* Bottom Actions Row */}
                            <motion.div
                                variants={mobileLinkVariants}
                                className="flex items-center gap-4 mt-8 pt-6 border-t border-border w-full">
                                <motion.button
                                    onClick={toggleTheme}
                                    className="p-3.5 rounded-xl glass flex items-center justify-center shrink-0"
                                    whileTap={{ scale: 0.9 }}
                                    aria-label="Toggle theme">
                                    {isDark ? (
                                        <Sun className="w-5 h-5 text-amber-300" />
                                    ) : (
                                        <Moon className="w-5 h-5 text-purple" />
                                    )}
                                </motion.button>

                                <Link
                                    to="/emergency"
                                    onClick={() => setMobileOpen(false)}
                                    className="flex-1">
                                    <motion.span
                                        className="btn-primary py-3! w-full text-center block text-base font-semibold"
                                        whileTap={{ scale: 0.98 }}>
                                        Get Started
                                    </motion.span>
                                </Link>
                            </motion.div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
