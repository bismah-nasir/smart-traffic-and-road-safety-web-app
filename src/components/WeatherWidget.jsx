import { motion } from 'framer-motion';
import { CloudSun, Droplets } from 'lucide-react';
import { fadeIn } from '@/utils/animations';

const WeatherWidget = () => {
  return (
    <motion.div
      variants={fadeIn}
      initial="hidden"
      animate="visible"
      className="glass rounded-xl px-3 py-2 flex items-center gap-2.5 cursor-default select-none"
      aria-label="Current weather conditions"
    >
      <CloudSun className="w-6 h-6 text-cyan shrink-0" />

      <div className="flex items-center gap-2">
        <div>
          <p className="font-heading text-base font-bold text-text-primary leading-none">
            28°C
          </p>
          <p className="text-xs text-text-muted leading-tight mt-0.5">
            Partly Cloudy
          </p>
        </div>

        <div className="w-px h-6 bg-white/10" />

        <div className="flex items-center gap-1">
          <Droplets className="w-3 h-3 text-electric" />
          <span className="text-xs text-text-secondary font-medium">65%</span>
        </div>
      </div>
    </motion.div>
  );
};

export default WeatherWidget;
