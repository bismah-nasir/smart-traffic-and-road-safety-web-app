/* ═══════════════════════════════════════════════════════════
   FRAMER MOTION — ANIMATION VARIANTS
   Reusable across all components
   ═══════════════════════════════════════════════════════════ */

// ── Fade Variants ────────────────────────────────

export const fadeIn = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { duration: 0.6, ease: "easeOut" },
    },
};

export const fadeInDelay = (delay = 0) => ({
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { duration: 0.6, ease: "easeOut", delay },
    },
});

// ── Slide Variants ───────────────────────────────

export const slideUp = {
    hidden: { opacity: 0, y: 40 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
    },
};

export const slideUpDelay = (delay = 0) => ({
    hidden: { opacity: 0, y: 40 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94], delay },
    },
});

export const slideDown = {
    hidden: { opacity: 0, y: -40 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
    },
};

export const slideLeft = {
    hidden: { opacity: 0, x: 60 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
    },
};

export const slideRight = {
    hidden: { opacity: 0, x: -60 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
    },
};

// ── Scale / Zoom ─────────────────────────────────

export const zoomIn = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
    },
};

export const scaleUp = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: { duration: 0.5, ease: "easeOut" },
    },
};

// ── Container / Stagger ──────────────────────────

export const staggerContainer = (staggerDuration = 0.1, delayChildren = 0) => ({
    hidden: {},
    visible: {
        transition: {
            staggerChildren: staggerDuration,
            delayChildren,
        },
    },
});

export const staggerItem = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
    },
};

// ── Hover Effects ────────────────────────────────

export const hoverLift = {
    y: -6,
    transition: { duration: 0.3, ease: "easeOut" },
};

export const hoverScale = {
    scale: 1.05,
    transition: { duration: 0.3, ease: "easeOut" },
};

export const hoverGlow = {
    boxShadow:
        "0 0 30px rgba(6, 182, 212, 0.4), 0 20px 60px rgba(0, 0, 0, 0.3)",
    transition: { duration: 0.3 },
};

export const tapScale = {
    scale: 0.97,
    transition: { duration: 0.1 },
};

// ── Card Variants ────────────────────────────────

export const cardRotate = {
    hidden: { opacity: 0, rotateY: 15, x: 30 },
    visible: {
        opacity: 1,
        rotateY: 0,
        x: 0,
        transition: { duration: 0.7, ease: "easeOut" },
    },
};

// ── Page Transitions ─────────────────────────────

export const pageTransition = {
    initial: { opacity: 0, y: 20 },
    animate: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
    },
    exit: {
        opacity: 0,
        y: -20,
        transition: { duration: 0.3, ease: "easeIn" },
    },
};

// ── Parallax helper ──────────────────────────────

export const parallax = (speed = 0.5) => ({
    initial: { y: 0 },
    animate: {
        y: [0, speed * -50],
        transition: {
            duration: 10,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "linear",
        },
    },
});

// ── Navbar ───────────────────────────────────────

export const navbarVariants = {
    top: {
        backgroundColor: "rgba(4, 11, 23, 0)",
        backdropFilter: "blur(0px)",
        borderBottom: "1px solid rgba(255, 255, 255, 0)",
        padding: "20px 0",
    },
    scrolled: {
        backgroundColor: "rgba(4, 11, 23, 0.85)",
        backdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
        padding: "12px 0",
    },
};

// ── Utility: viewport-based animation trigger ───

export const viewportConfig = {
    once: true,
    margin: "-80px",
    amount: 0.2,
};
