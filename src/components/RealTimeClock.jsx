import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { fadeIn } from '@/utils/animations';

const formatTime = (date) =>
  date.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });

const formatDate = (date) =>
  date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });

const RealTimeClock = () => {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      variants={fadeIn}
      initial="hidden"
      animate="visible"
      className="flex flex-col items-end select-none"
      aria-label="Current time and date"
      aria-live="polite"
    >
      <time className="font-heading text-base font-bold text-text-primary tracking-wide tabular-nums leading-none">
        {formatTime(now)}
      </time>
      <span className="text-xs text-text-muted leading-tight mt-0.5">
        {formatDate(now)}
      </span>
    </motion.div>
  );
};

export default RealTimeClock;
