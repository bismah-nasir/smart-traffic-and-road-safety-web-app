import { motion, AnimatePresence } from 'framer-motion';
import { X, Siren, PhoneCall } from 'lucide-react';
import { EMERGENCY_CONTACTS } from '@/utils/constants';
import { staggerContainer, staggerItem } from '@/utils/animations';

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, transition: { duration: 0.25 } },
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.9, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.1 },
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    y: 20,
    transition: { duration: 0.25, ease: 'easeIn' },
  },
};

export default function EmergencyPopup({ isOpen, onClose }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <motion.div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />

          <motion.div
            className="relative w-full max-w-md glass-strong rounded-2xl overflow-hidden"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            role="dialog"
            aria-modal="true"
            aria-label="Emergency Services"
          >
            <div className="relative px-6 pt-6 pb-4">
              <div className="flex items-center gap-3 mb-1">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: 'rgba(239,68,68,0.15)' }}
                >
                  <Siren className="w-5 h-5 text-traffic-red" />
                </div>
                <div>
                  <h2 className="font-heading font-bold text-lg text-text-primary">
                    Emergency Services
                  </h2>
                  <p className="text-xs text-text-muted">Tap to call immediately</p>
                </div>
              </div>

              <motion.button
                onClick={onClose}
                className="absolute top-5 right-5 p-1.5 rounded-lg hover:bg-surface-hover transition-colors duration-200"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Close emergency popup"
              >
                <X className="w-4 h-4 text-text-muted" />
              </motion.button>
            </div>

            <div
              className="h-px w-full"
              style={{ background: 'linear-gradient(90deg, transparent, rgba(239,68,68,0.4), transparent)' }}
            />

            <motion.div
              className="px-6 py-5 space-y-3 max-h-[60vh] overflow-y-auto"
              variants={staggerContainer(0.07, 0.15)}
              initial="hidden"
              animate="visible"
            >
              {EMERGENCY_CONTACTS.map((contact) => {
                const Icon = contact.icon;
                return (
                  <motion.div
                    key={contact.id}
                    variants={staggerItem}
                    className="glass rounded-xl p-4 flex items-center gap-4 group hover:bg-surface-hover transition-all duration-300"
                  >
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                      style={{ background: `${contact.color}18` }}
                    >
                      <Icon className="w-5 h-5" style={{ color: contact.color }} />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="font-heading font-semibold text-sm text-text-primary">
                        {contact.title}
                      </h3>
                      <p className="text-xs text-text-muted truncate">{contact.description}</p>
                    </div>

                    <motion.a
                      href={`tel:${contact.number}`}
                      className="shrink-0 flex items-center gap-2 px-4 py-2 rounded-xl text-white text-xs font-semibold transition-shadow duration-300"
                      style={{
                        background: `linear-gradient(135deg, ${contact.color}, ${contact.color}cc)`,
                      }}
                      whileHover={{
                        scale: 1.05,
                        boxShadow: `0 8px 25px ${contact.color}40`,
                      }}
                      whileTap={{ scale: 0.95 }}
                      aria-label={`Call ${contact.title} at ${contact.number}`}
                    >
                      <PhoneCall className="w-3.5 h-3.5" />
                      {contact.number}
                    </motion.a>
                  </motion.div>
                );
              })}
            </motion.div>

            <div className="px-6 pb-5 pt-2">
              <p className="text-center text-[11px] text-text-muted">
                In a life-threatening emergency, always call your local emergency number.
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
