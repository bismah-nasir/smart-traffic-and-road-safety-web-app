import { useState } from 'react';
import { motion } from 'framer-motion';
import { Siren, Phone, AlertTriangle, Clock, MapPin } from 'lucide-react';
import AnimatedBackground from '@/components/AnimatedBackground';
import GlassCard from '@/components/GlassCard';
import EmergencyPopup from '@/components/EmergencyPopup';
import {
  pageTransition, staggerContainer, staggerItem, fadeIn, viewportConfig,
} from '@/utils/animations';
import { EMERGENCY_CONTACTS } from '@/utils/constants';

const emergencyTips = [
  {
    title: 'Stay Calm & Assess',
    description: 'Take a deep breath, assess the situation, and check for injuries before calling for help.',
    icon: AlertTriangle,
  },
  {
    title: 'Share Your Location',
    description: 'Enable GPS and share your exact location with emergency services for faster response.',
    icon: MapPin,
  },
  {
    title: 'Golden Hour Matters',
    description: 'The first 60 minutes after an accident are critical. Seek medical help immediately.',
    icon: Clock,
  },
];

export default function Emergency() {
  const [popupOpen, setPopupOpen] = useState(false);

  return (
    <motion.div {...pageTransition}>
      <AnimatedBackground />

      <div className="page-wrapper relative z-10 pb-16">
        <div className="container-custom pt-8">

          {/* ── Header ─────────────────────────── */}
          <motion.div className="text-center mb-8" variants={fadeIn} initial="hidden" animate="visible">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-linear-to-br from-red-500 to-rose-600 flex items-center justify-center mb-4">
              <Siren className="w-7 h-7 text-white" />
            </div>
            <div className="section-label" style={{ display: 'inline-flex', marginBottom: 12, borderColor: 'rgba(239,68,68,0.2)', background: 'rgba(239,68,68,0.08)', color: '#ef4444' }}>
              Emergency Response
            </div>
            <h1 className="font-heading text-3xl md:text-4xl font-bold mb-2 text-text-primary">
              Emergency <span className="text-transparent bg-clip-text bg-linear-to-r from-traffic-red to-rose-400">Services</span>
            </h1>
            <p className="text-text-secondary text-sm mx-auto">
              Quick access to emergency response services. In an emergency, every second counts.
            </p>
          </motion.div>

          {/* ── SOS Button ─────────────────────── */}
          <motion.div
            className="flex justify-center mb-10"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <motion.button
              onClick={() => setPopupOpen(true)}
              className="relative w-32 h-32 rounded-full bg-linear-to-br from-red-500 to-rose-600 flex items-center justify-center text-white font-heading text-3xl font-bold cursor-pointer border-none shadow-2xl"
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Emergency SOS"
            >
              SOS
              {/* Pulse rings */}
              <span className="absolute inset-0 rounded-full border-2 border-red-500 animate-ping opacity-30" />
              <motion.span
                className="absolute -inset-3 rounded-full border border-red-500/30"
                animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0, 0.3] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <motion.span
                className="absolute -inset-6 rounded-full border border-red-500/15"
                animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0, 0.2] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
              />
            </motion.button>
          </motion.div>

          {/* ── Emergency Contact Cards ─────────── */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16"
            variants={staggerContainer(0.1)}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
          >
            {EMERGENCY_CONTACTS.map((contact) => {
              const Icon = contact.icon;
              return (
                <motion.div key={contact.id} variants={staggerItem} className="h-full">
                  <GlassCard className="p-7 text-center h-full group" hoverEffect={false}>
                    {/* Icon */}
                    <motion.div
                      className={`w-20 h-20 mx-auto mb-5 rounded-2xl flex items-center justify-center bg-linear-to-br ${contact.gradient} shadow-lg`}
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                    >
                      <Icon className="w-10 h-10 text-white" />
                    </motion.div>

                    <h3 className="font-heading text-2xl font-bold mb-2 text-text-primary">{contact.title}</h3>
                    <p className="text-3xl font-bold font-heading mb-2" style={{ color: contact.color }}>
                      {contact.number}
                    </p>
                    <p className="text-text-secondary text-sm mb-5 leading-relaxed">{contact.description}</p>

                    <motion.a
                      href={`tel:${contact.number}`}
                      className={`w-full py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 text-white bg-linear-to-r ${contact.gradient}`}
                      whileHover={{ scale: 1.03, boxShadow: `0 10px 30px ${contact.color}40` }}
                      whileTap={{ scale: 0.97 }}
                    >
                      <Phone className="w-4 h-4" />
                      Call Now
                    </motion.a>
                  </GlassCard>
                </motion.div>
              );
            })}
          </motion.div>

          {/* ── Emergency Tips ──────────────────── */}
          <motion.div variants={fadeIn} initial="hidden" whileInView="visible" viewport={viewportConfig}>
            <h2 className="font-heading text-2xl font-bold text-center mb-8 text-text-primary">
              Emergency <span className="text-cyan">Quick Tips</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {emergencyTips.map((tip, i) => {
                const Icon = tip.icon;
                return (
                  <motion.div
                    key={tip.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.15, duration: 0.5 }}
                    className="h-full"
                  >
                    <GlassCard className="p-6 h-full" hoverEffect={false}>
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center">
                          <Icon className="w-5 h-5 text-red-400" />
                        </div>
                        <h4 className="font-heading font-bold text-text-primary">{tip.title}</h4>
                      </div>
                      <p className="text-text-secondary text-sm leading-relaxed">{tip.description}</p>
                    </GlassCard>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

        </div>
      </div>

      {/* ── Emergency Popup ─────────────────── */}
      <EmergencyPopup isOpen={popupOpen} onClose={() => setPopupOpen(false)} />
    </motion.div>
  );
}
