import { useTheme } from "@/context/ThemeContext";
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronDown, CheckCircle, ArrowRight, Clock, Newspaper, Activity, Route, ShieldCheck, Siren } from 'lucide-react';
import AnimatedCounter from '@/components/AnimatedCounter';
import {
  fadeIn, fadeInDelay, slideUp, slideLeft, slideRight,
  staggerContainer, staggerItem, tapScale, viewportConfig,
} from '@/utils/animations';
import { STATS, TIMELINE, TRAFFIC_NEWS } from '@/utils/constants';

/* ══════════════════════════════════════════════════════
   LOCAL HELPERS
   ══════════════════════════════════════════════════════ */

function AnimatedBg() {
  const { isDark } = useTheme();

  return (
    <div 
      className="absolute inset-0 overflow-hidden pointer-events-none transition-colors duration-300" 
      style={{ backgroundColor: isDark ? '#040b17' : '#f0f4f8' }}
      aria-hidden="true"
    >
      {/* Background Image */}
      <div 
        className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-300 ${
          isDark ? 'opacity-[0.22] mix-blend-screen' : 'opacity-[0.14] mix-blend-multiply'
        }`}
        style={{ backgroundImage: 'url("/smart_city_road_hero_1.gif")' }}
      />
      
      {/* Adaptive gradient overlay */}
      <div 
        className="absolute inset-0 transition-all duration-300"
        style={{
          background: isDark
            ? 'linear-gradient(to bottom, rgba(4,11,23,0.3) 20%, rgba(4,11,23,0.85) 70%, #040b17 100%)'
            : 'linear-gradient(to bottom, rgba(240,244,248,0.2) 50%, rgba(240,244,248,0.85) 90%, #f0f4f8 100%)'
        }}
      />
      
      {/* Tech grid overlay */}
      <div className="absolute inset-0 bg-grid opacity-[0.35]" />
      
      {/* Floating particles */}
      {[...Array(8)].map((_, i) => (
        <div key={i} className="absolute w-1 h-1 rounded-full bg-cyan/50"
          style={{ top: `${12 + i * 11}%`, left: `${8 + i * 12}%`, animation: `particle-float ${8 + i * 1.5}s ease-in-out infinite ${i * 1.2}s` }} />
      ))}
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   FEATURE CARDS DATA
   ══════════════════════════════════════════════════════ */
const FEATURES = [
    {
        id: "monitoring",
        title: "Traffic Monitoring",
        description:
            "Real-time AI analysis across 200+ city intersections with instant alerts.",
        icon: Activity,
        gradient: "from-cyan-400 to-blue-500",
        color: "#06b6d4",
        path: "/live-traffic",
    },
    {
        id: "route",
        title: "Smart Route Suggestion",
        description:
            "Optimized routing that saves 23+ minutes per commute using live data.",
        icon: Route,
        gradient: "from-purple-400 to-indigo-500",
        color: "#8b5cf6",
        path: "/route-suggestion",
    },
    {
        id: "safety",
        title: "Road Safety",
        description:
            "Comprehensive safety guidelines and real-time hazard alerts.",
        icon: ShieldCheck,
        gradient: "from-green-400 to-emerald-500",
        color: "#22c55e",
        path: "/road-safety",
    },
    {
        id: "emergency",
        title: "Emergency Assistance",
        description:
            "One-tap emergency response with sub-3-minute dispatch time.",
        icon: Siren,
        gradient: "from-red-400 to-rose-500",
        color: "#ef4444",
        path: "/emergency",
    },
];

const BENEFITS = [
    {
        title: "Reduce Congestion by 40%",
        desc: "AI dynamically adjusts signal timing and reroutes traffic to eliminate bottlenecks before they form.",
    },
    {
        title: "Sub-3 Minute Response",
        desc: "Integrated dispatch clears lanes and coordinates first responders in real time.",
    },
    {
        title: "Save 23+ Minutes Daily",
        desc: "Predictive routing analyzes thousands of data points to find the fastest path every time.",
    },
];

/* ══════════════════════════════════════════════════════
   MAIN HOME PAGE
   ══════════════════════════════════════════════════════ */
export default function Home() {
    const headlineWords =
        "Intelligent Traffic Management for Smarter Cities".split(" ");
    const accentWords = ["Intelligent", "Smarter"];

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}>
            {/* ════════════════════ HERO ════════════════════ */}
            <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
                <AnimatedBg />

                <div className="container-custom relative z-10 flex flex-col items-center text-center pt-24 pb-6">
                    {/* Live badge */}
                    <motion.div
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass mb-7 text-sm text-text-secondary font-medium"
                        variants={fadeInDelay(0.15)}
                        initial="hidden"
                        animate="visible">
                        <span
                            className="w-2 h-2 rounded-full bg-traffic-green"
                            style={{
                                animation: "pulse-glow 2s ease-in-out infinite",
                            }}
                        />
                        AI-Powered Traffic System — Live
                    </motion.div>

                    {/* Headline */}
                    <motion.h1
                        className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.1] tracking-tight max-w-4xl"
                        variants={staggerContainer(0.07, 0.3)}
                        initial="hidden"
                        animate="visible">
                        {headlineWords.map((word, i) => (
                            <motion.span
                                key={i}
                                className={`inline-block mr-2 md:mr-3 ${
                                    accentWords.includes(word)
                                        ? "bg-linear-to-r from-cyan via-electric to-purple bg-clip-text text-transparent"
                                        : "text-text-primary"
                                }`}
                                variants={{
                                    hidden: { opacity: 0, y: 40, rotateX: -30 },
                                    visible: {
                                        opacity: 1,
                                        y: 0,
                                        rotateX: 0,
                                        transition: {
                                            duration: 0.55,
                                            ease: [0.25, 0.46, 0.45, 0.94],
                                        },
                                    },
                                }}>
                                {word}
                            </motion.span>
                        ))}
                    </motion.h1>

                    {/* Subheadline */}
                    <motion.p
                        className="text-text-secondary text-base md:text-lg max-w-xl mt-5 leading-relaxed"
                        variants={fadeInDelay(0.95)}
                        initial="hidden"
                        animate="visible">
                        AI-powered real-time traffic monitoring, smart routing,
                        and road safety for the next generation of urban
                        mobility.
                    </motion.p>

                    {/* CTA Buttons */}
                    <motion.div
                        className="flex flex-col sm:flex-row gap-3 mt-8"
                        variants={fadeInDelay(1.15)}
                        initial="hidden"
                        animate="visible">
                        <motion.div
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={tapScale}>
                            <Link
                                to="/live-traffic"
                                className="btn-primary gap-2">
                                Explore Dashboard{" "}
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </motion.div>
                        <motion.div
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={tapScale}>
                            <a href="#about" className="btn-secondary gap-2">
                                Learn More <ChevronDown className="w-4 h-4" />
                            </a>
                        </motion.div>
                    </motion.div>
                </div>

                {/* Scroll indicator */}
                <motion.div
                    className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5"
                    animate={{ y: [0, 7, 0] }}
                    transition={{
                        duration: 1.8,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}>
                    <span className="text-text-muted text-[10px] tracking-widest uppercase">
                        Scroll
                    </span>
                    <ChevronDown className="w-4 h-4 text-cyan/50" />
                </motion.div>
            </section>

            {/* ════════════════════ ABOUT ════════════════════ */}
            <section id="about" className="section-padding relative">
                <div className="container-custom">
                    {/* Heading */}
                    <motion.div
                        className="mb-12"
                        variants={slideUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={viewportConfig}>
                        <div className="section-label">Our Platform</div>
                        <h2 className="section-title">
                            About{" "}
                            <span className="text-cyan">SmartTraffic</span>
                        </h2>
                        <div className="section-divider" />
                    </motion.div>

                    <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-start">
                        {/* Left: text + stats */}
                        <motion.div
                            variants={slideRight}
                            initial="hidden"
                            whileInView="visible"
                            viewport={viewportConfig}>
                            <p className="text-text-secondary text-base leading-relaxed mb-4">
                                SmartTraffic is a next-generation intelligent
                                traffic management platform that leverages AI,
                                IoT sensors, and real-time analytics to
                                transform urban mobility. Our system monitors
                                over 50,000 vehicles across 200+ cities.
                            </p>
                            <p className="text-text-secondary text-base leading-relaxed mb-8">
                                From predictive congestion modeling to instant
                                emergency dispatch, we give city planners,
                                commuters, and first responders the tools to
                                navigate smarter and safer.
                            </p>

                            {/* Stats grid */}
                            <div className="grid grid-cols-2 gap-4">
                                {STATS.map((stat) => (
                                    <div
                                        key={stat.label}
                                        className="glass-card p-5 text-center">
                                        <AnimatedCounter
                                            end={stat.value}
                                            suffix={stat.suffix}
                                            prefix={stat.prefix}
                                            decimals={stat.decimals || 0}
                                            label={stat.label}
                                        />
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Right: Timeline */}
                        <motion.div
                            variants={slideLeft}
                            initial="hidden"
                            whileInView="visible"
                            viewport={viewportConfig}>
                            <div className="relative pl-7">
                                {/* Vertical line */}
                                <div className="absolute left-0 top-2 bottom-2 w-px bg-linear-to-b from-cyan/60 via-electric/40 to-purple/60" />

                                {TIMELINE.map((item, i) => (
                                    <motion.div
                                        key={item.year}
                                        className="relative mb-7 last:mb-0"
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{
                                            once: true,
                                            margin: "-40px",
                                        }}
                                        transition={{
                                            duration: 0.5,
                                            delay: i * 0.12,
                                        }}>
                                        {/* Dot */}
                                        <div
                                            className="absolute -left-6.5 top-3 w-2.5 h-2.5 rounded-full bg-cyan"
                                            style={{
                                                boxShadow:
                                                    "0 0 8px rgba(6,182,212,0.6)",
                                            }}
                                        />

                                        <div className="glass-card p-4">
                                            <span className="inline-block px-2.5 py-0.5 rounded-full bg-cyan/15 text-cyan text-xs font-bold mb-1.5">
                                                {item.year}
                                            </span>
                                            <h4 className="font-heading text-base font-bold text-text-primary">
                                                {item.title}
                                            </h4>
                                            <p className="text-text-secondary text-sm mt-1 leading-relaxed">
                                                {item.description}
                                            </p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </div>

                    {/* Benefits */}
                    <motion.div
                        className="mt-12 grid md:grid-cols-3 gap-5"
                        variants={staggerContainer(0.12, 0.1)}
                        initial="hidden"
                        whileInView="visible"
                        viewport={viewportConfig}>
                        {BENEFITS.map((b) => (
                            <motion.div
                                key={b.title}
                                variants={staggerItem}
                                className="flex items-start gap-4 glass-card p-5">
                                <div className="mt-0.5 shrink-0 w-8 h-8 rounded-lg bg-traffic-green/10 flex items-center justify-center">
                                    <CheckCircle className="w-4 h-4 text-traffic-green" />
                                </div>
                                <div>
                                    <h4 className="font-heading font-bold text-text-primary text-sm mb-1">
                                        {b.title}
                                    </h4>
                                    <p className="text-text-secondary text-sm leading-relaxed">
                                        {b.desc}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* ════════════════════ STATS BAR ════════════════════ */}
            <motion.section
                className="relative py-10 overflow-hidden"
                variants={fadeIn}
                initial="hidden"
                whileInView="visible"
                viewport={viewportConfig}>
                <div className="absolute inset-0 glass" />
                <div className="container-custom relative z-10">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0 md:divide-x md:divide-white/8">
                        {STATS.map((stat) => (
                            <div key={stat.label} className="py-3 md:px-8">
                                <AnimatedCounter
                                    end={stat.value}
                                    suffix={stat.suffix}
                                    prefix={stat.prefix}
                                    decimals={stat.decimals || 0}
                                    label={stat.label}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </motion.section>

            {/* ════════════════════ FEATURES ════════════════════ */}
            <section id="features" className="section-padding relative">
                <div className="container-custom">
                    <motion.div
                        className="text-center mb-12"
                        variants={slideUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={viewportConfig}>
                        <div
                            className="section-label mx-auto"
                            style={{ width: "fit-content" }}>
                            Platform Features
                        </div>
                        <h2 className="section-title">
                            Powerful <span className="text-cyan">Features</span>
                        </h2>
                        <div className="section-divider mx-auto" />
                        <p className="section-subtitle mx-auto mt-4">
                            Everything you need for intelligent urban traffic
                            management, powered by cutting-edge AI.
                        </p>
                    </motion.div>

                    {/* Feature cards */}
                    <motion.div
                        className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5"
                        variants={staggerContainer(0.1, 0.05)}
                        initial="hidden"
                        whileInView="visible"
                        viewport={viewportConfig}>
                        {FEATURES.map((feature) => {
                            const Icon = feature.icon;
                            return (
                                <motion.div
                                    key={feature.id}
                                    variants={staggerItem}
                                    className="h-full">
                                    <motion.div
                                        className="glass-card gradient-border p-6 h-full flex flex-col items-start gap-4 group"
                                        whileHover={{
                                            y: -5,
                                            transition: { duration: 0.25 },
                                        }}
                                        whileTap={tapScale}>
                                        <motion.div
                                            className={`w-12 h-12 rounded-xl flex items-center justify-center bg-linear-to-br ${feature.gradient} shadow-lg shrink-0`}
                                            whileHover={{
                                                rotate: 8,
                                                scale: 1.08,
                                            }}
                                            transition={{
                                                type: "spring",
                                                stiffness: 280,
                                            }}>
                                            <Icon className="w-6 h-6 text-white" />
                                        </motion.div>

                                        <div className="flex flex-col gap-1.5 flex-1">
                                            <h3 className="font-heading text-lg font-bold text-text-primary leading-snug">
                                                {feature.title}
                                            </h3>
                                            <p className="text-text-secondary text-sm leading-relaxed">
                                                {feature.description}
                                            </p>
                                        </div>

                                        <Link
                                            to={feature.path}
                                            className="inline-flex items-center gap-1 text-sm font-semibold group-hover:gap-2 transition-all duration-200 mt-auto"
                                            style={{ color: feature.color }}>
                                            Learn More{" "}
                                            <ArrowRight className="w-3.5 h-3.5" />
                                        </Link>
                                    </motion.div>
                                </motion.div>
                            );
                        })}
                    </motion.div>

                    {/* Traffic News */}
                    <motion.div
                        className="mt-16"
                        variants={staggerContainer(0.1, 0.1)}
                        initial="hidden"
                        whileInView="visible"
                        viewport={viewportConfig}>
                        <div className="flex items-center gap-2.5 mb-7">
                            <div className="w-8 h-8 rounded-lg bg-cyan/10 flex items-center justify-center">
                                <Newspaper className="w-4 h-4 text-cyan" />
                            </div>
                            <h3 className="font-heading text-xl font-bold text-text-primary">
                                Latest Updates
                            </h3>
                        </div>

                        <div className="grid md:grid-cols-3 gap-5">
                            {TRAFFIC_NEWS.map((item) => {
                                const catColors = {
                                    Infrastructure: "bg-cyan/15 text-cyan",
                                    Technology: "bg-purple/15 text-purple",
                                    Alert: "bg-traffic-red/15 text-traffic-red",
                                };
                                return (
                                    <motion.div
                                        key={item.id}
                                        variants={staggerItem}
                                        className="glass-card p-5 flex flex-col gap-3 border-l-2 border-l-cyan/30">
                                        <div className="flex items-center justify-between gap-2">
                                            <span
                                                className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${catColors[item.category] || "bg-electric/15 text-electric"}`}>
                                                {item.category}
                                            </span>
                                            <span className="text-text-muted text-xs flex items-center gap-1 shrink-0">
                                                <Clock className="w-3 h-3" />{" "}
                                                {item.time}
                                            </span>
                                        </div>
                                        <h4 className="font-heading text-base font-bold text-text-primary leading-snug">
                                            {item.title}
                                        </h4>
                                        <p className="text-text-secondary text-sm leading-relaxed line-clamp-2">
                                            {item.summary}
                                        </p>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </motion.div>
                </div>
            </section>
        </motion.div>
    );
}
