import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Siren } from 'lucide-react';

export default function FloatingActionButton({ onEmergencyClick }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div className="fixed bottom-8 left-8 z-40 flex items-center gap-3">
      <motion.button
        onClick={onEmergencyClick}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="relative w-14 h-14 rounded-full flex items-center justify-center text-white cursor-pointer"
        style={{
          background: 'linear-gradient(135deg, #ef4444, #dc2626)',
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label="Emergency SOS"
      >
        <motion.span
          className="absolute inset-0 rounded-full"
          style={{
            background: 'linear-gradient(135deg, #ef4444, #dc2626)',
          }}
          animate={{
            boxShadow: [
              '0 0 0px rgba(239,68,68,0.4), 0 0 20px rgba(239,68,68,0.2)',
              '0 0 25px rgba(239,68,68,0.6), 0 0 50px rgba(239,68,68,0.3)',
              '0 0 0px rgba(239,68,68,0.4), 0 0 20px rgba(239,68,68,0.2)',
            ],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <Siren className="w-6 h-6 relative z-10" />
      </motion.button>

      <AnimatePresence>
        {hovered && (
          <motion.span
            className="glass-strong px-3 py-1.5 rounded-lg text-xs font-medium text-text-primary whitespace-nowrap pointer-events-none"
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -8 }}
            transition={{ duration: 0.2 }}
          >
            Emergency SOS
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
}
