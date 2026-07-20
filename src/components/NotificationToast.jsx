import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, Info, CheckCircle, X } from 'lucide-react';

const typeConfig = {
  warning: {
    icon: AlertTriangle,
    borderColor: 'border-l-traffic-red',
    iconColor: 'text-traffic-red',
    glowClass: 'glow-red',
  },
  info: {
    icon: Info,
    borderColor: 'border-l-cyan',
    iconColor: 'text-cyan',
    glowClass: 'glow-cyan',
  },
  success: {
    icon: CheckCircle,
    borderColor: 'border-l-traffic-green',
    iconColor: 'text-traffic-green',
    glowClass: 'glow-green',
  },
};

const toastVariants = {
  hidden: { opacity: 0, x: 80, scale: 0.95 },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { type: 'spring', stiffness: 400, damping: 30 },
  },
  exit: {
    opacity: 0,
    x: 100,
    scale: 0.9,
    transition: { duration: 0.25, ease: 'easeIn' },
  },
};

const NotificationToast = ({ message, type = 'info', isVisible, onClose }) => {
  const config = typeConfig[type] || typeConfig.info;
  const Icon = config.icon;
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useEffect(() => {
    if (!isVisible) return;

    const timeout = setTimeout(() => {
      onCloseRef.current?.();
    }, 5000);

    return () => clearTimeout(timeout);
  }, [isVisible]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          variants={toastVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          role="alert"
          aria-live="assertive"
          className={`fixed top-24 right-8 z-50 glass-strong rounded-xl border-l-4 ${config.borderColor} ${config.glowClass} px-5 py-4 flex items-start gap-3 min-w-75 max-w-105 shadow-2xl`}
        >
          <Icon className={`w-5 h-5 mt-0.5 shrink-0 ${config.iconColor}`} />

          <p className="text-sm text-text-primary flex-1 leading-relaxed">
            {message}
          </p>

          <button
            onClick={onClose}
            className="shrink-0 p-1 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Dismiss notification"
          >
            <X className="w-4 h-4 text-text-muted hover:text-text-primary transition-colors" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NotificationToast;
