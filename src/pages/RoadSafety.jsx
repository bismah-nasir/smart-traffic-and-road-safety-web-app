import { motion } from 'framer-motion';
import { ShieldCheck } from 'lucide-react';
import AnimatedBackground from '@/components/AnimatedBackground';
import GlassCard from '@/components/GlassCard';
import AnimatedCounter from '@/components/AnimatedCounter';
import {
  pageTransition, staggerContainer, staggerItem, fadeIn, viewportConfig,
} from '@/utils/animations';
import { SAFETY_TIPS } from '@/utils/constants';

const safetyStats = [
  { label: 'Fewer Accidents', value: 45, suffix: '%' },
  { label: 'Fewer Head Injuries', value: 69, suffix: '%' },
  { label: 'Lives Saved Annually', value: 12000, suffix: '+' },
  { label: 'Cities Implementing', value: 200, suffix: '+' },
];

export default function RoadSafety() {
  return (
    <motion.div {...pageTransition}>
      <AnimatedBackground />

      <div className="page-wrapper relative z-10 pb-16">
        <div className="container-custom pt-8">

          {/* ── Header ─────────────────────────── */}
          <motion.div className="text-center mb-10" variants={fadeIn} initial="hidden" animate="visible">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-linear-to-br from-green-500 to-emerald-600 flex items-center justify-center mb-4">
              <ShieldCheck className="w-7 h-7 text-white" />
            </div>
            <div className="section-label" style={{ display: 'inline-flex', marginBottom: 12 }}>
              Safety Guidelines
            </div>
            <h1 className="font-heading text-3xl md:text-4xl font-bold mb-2">
              Road Safety <span className="text-transparent bg-clip-text bg-linear-to-r from-traffic-green to-cyan">Guidelines</span>
            </h1>
            <p className="text-text-secondary text-sm mx-auto">
              Essential safety practices for every road user. Follow these guidelines to protect yourself and others.
            </p>
          </motion.div>

          {/* ── Safety Cards Grid ──────────────── */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-12"
            variants={staggerContainer(0.08)}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
          >
            {SAFETY_TIPS.map((tip) => {
              const Icon = tip.icon;
              return (
                <motion.div
                  key={tip.id}
                  variants={staggerItem}
                  className="h-full"
                  whileHover={{ scale: 1.025, y: -4 }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                >
                  <GlassCard className="p-6 text-center h-full group" hoverEffect={false}>
                    {/* Icon circle */}
                    <div className={`
                      w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center
                      bg-linear-to-br ${tip.gradient}
                      transition-transform duration-300 group-hover:scale-105
                      shadow-lg
                    `}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>

                    <h3 className="font-heading text-lg font-bold mb-2 text-text-primary">{tip.title}</h3>
                    <p className="text-text-secondary text-sm leading-relaxed">{tip.description}</p>
                  </GlassCard>
                </motion.div>
              );
            })}
          </motion.div>

          {/* ── Safety Statistics ───────────────── */}
          <motion.div
            variants={fadeIn} initial="hidden" whileInView="visible" viewport={viewportConfig}
          >
            <h2 className="font-heading text-2xl font-bold text-center mb-8 text-text-primary">
              Impact of Road Safety Measures
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {safetyStats.map((stat) => (
                <GlassCard key={stat.label} className="p-5 text-center" hoverEffect={false}>
                  <AnimatedCounter
                    value={stat.value}
                    suffix={stat.suffix}
                    label={stat.label}
                    duration={2}
                  />
                </GlassCard>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </motion.div>
  );
}
