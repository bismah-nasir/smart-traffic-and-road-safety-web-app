import { motion } from 'framer-motion';
import { tapScale } from '@/utils/animations';

export default function GlassCard({
  children,
  className = '',
  glowColor,
  hoverEffect = true,
  hoverY = -5,
  onClick,
}) {
  return (
    <motion.div
      className={`glass-card gradient-border ${glowColor || ''} ${className}`}
      whileHover={hoverEffect ? { y: hoverY, transition: { duration: 0.25, ease: 'easeOut' } } : undefined}
      whileTap={onClick ? tapScale : undefined}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {children}
    </motion.div>
  );
}
