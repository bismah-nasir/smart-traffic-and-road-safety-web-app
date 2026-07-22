import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Car, Gauge, AlertTriangle, Activity, Map, Globe } from 'lucide-react';
import AnimatedBackground from '@/components/AnimatedBackground';
import GlassCard from '@/components/GlassCard';
import RealTimeClock from '@/components/RealTimeClock';
import WeatherWidget from '@/components/WeatherWidget';
import { pageTransition, staggerContainer, staggerItem, slideUp, fadeIn, viewportConfig } from '@/utils/animations';
import { TRAFFIC_STATUSES } from '@/utils/constants';

import { useTheme } from '@/context/ThemeContext';

/* ────────── Animated Vector Map SVG ────────── */
function TrafficMap() {
  const { isDark } = useTheme();
  const [signals, setSignals] = useState([0, 1, 2]);

  useEffect(() => {
    const intervals = [
      setInterval(() => setSignals((p) => [((p[0] + 1) % 3), p[1], p[2]]), 3000),
      setInterval(() => setSignals((p) => [p[0], ((p[1] + 1) % 3), p[2]]), 4000),
      setInterval(() => setSignals((p) => [p[0], p[1], ((p[2] + 1) % 3)]), 3500),
    ];
    return () => intervals.forEach(clearInterval);
  }, []);

  const signalColors = ['#22c55e', '#eab308', '#ef4444'];

  // Theme-adaptive stroke & fill variables
  const roadColor = isDark ? 'rgba(255, 255, 255, 0.14)' : 'rgba(15, 23, 42, 0.14)';
  const secondaryRoadColor = isDark ? 'rgba(255, 255, 255, 0.09)' : 'rgba(15, 23, 42, 0.09)';
  const centerDashColor = isDark ? 'rgba(251, 191, 36, 0.35)' : 'rgba(217, 119, 6, 0.65)';
  const textColor = isDark ? 'rgba(255, 255, 255, 0.55)' : 'rgba(15, 23, 42, 0.75)';
  const buildingFill = isDark ? 'rgba(255, 255, 255, 0.04)' : 'rgba(15, 23, 42, 0.05)';
  const buildingStroke = isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(15, 23, 42, 0.14)';
  const gridStroke = isDark ? 'rgba(6, 182, 212, 0.06)' : 'rgba(15, 23, 42, 0.07)';

  return (
    <div className="relative w-full rounded-2xl overflow-hidden" style={{ minHeight: 420 }}>
      {/* LIVE indicator badge */}
      <div className="absolute top-4 left-4 z-10 flex items-center gap-2 glass-strong px-3 py-1.5 rounded-full">
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500" />
        </span>
        <span className="text-xs font-semibold text-red-400 tracking-wider">LIVE FEED</span>
      </div>

      <svg viewBox="0 0 800 450" className="w-full h-full" style={{ minHeight: 420 }}>
        <defs>
          <pattern id="mapGrid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke={gridStroke} strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="800" height="450" fill="url(#mapGrid)" />

        {/* Major Road Corridors */}
        <line x1="0" y1="225" x2="800" y2="225" stroke={roadColor} strokeWidth="40" />
        <line x1="400" y1="0" x2="400" y2="450" stroke={roadColor} strokeWidth="40" />
        <line x1="0" y1="120" x2="800" y2="120" stroke={secondaryRoadColor} strokeWidth="28" />
        <line x1="600" y1="106" x2="600" y2="450" stroke={secondaryRoadColor} strokeWidth="28" />

        {/* Road Center Dashes */}
        <line x1="0" y1="225" x2="800" y2="225" stroke={centerDashColor} strokeWidth="1.5" strokeDasharray="12 8" />
        <line x1="400" y1="0" x2="400" y2="450" stroke={centerDashColor} strokeWidth="1.5" strokeDasharray="12 8" />
        <line x1="0" y1="120" x2="800" y2="120" stroke={centerDashColor} strokeWidth="1" strokeDasharray="10 6" />
        <line x1="600" y1="106" x2="600" y2="450" stroke={centerDashColor} strokeWidth="1" strokeDasharray="10 6" />

        {/* Street Labels */}
        <text x="60" y="215" fill={textColor} fontSize="11" fontFamily="Inter" fontWeight="600">Highway 1 (Main Corridor)</text>
        <text x="410" y="40" fill={textColor} fontSize="11" fontFamily="Inter" fontWeight="600">Main St</text>
        <text x="60" y="112" fill={textColor} fontSize="11" fontFamily="Inter" fontWeight="600">Sector 7</text>
        <text x="610" y="350" fill={textColor} fontSize="11" fontFamily="Inter" fontWeight="600">Ring Road</text>

        {/* Dynamic Color-Changing Traffic Signals */}
        <circle cx="400" cy="225" r="8" fill={signalColors[signals[0]]} opacity="0.9">
          <animate attributeName="r" values="8;11;8" dur="1.5s" repeatCount="indefinite" />
        </circle>
        <circle cx="400" cy="120" r="7" fill={signalColors[signals[1]]} opacity="0.9">
          <animate attributeName="r" values="7;10;7" dur="1.5s" repeatCount="indefinite" />
        </circle>
        <circle cx="600" cy="225" r="7" fill={signalColors[signals[2]]} opacity="0.9">
          <animate attributeName="r" values="7;10;7" dur="1.5s" repeatCount="indefinite" />
        </circle>

        {/* Moving Lucide Car Icons on Corridors */}
        <foreignObject width="800" height="450" className="overflow-visible pointer-events-none">
          <div className="relative w-full h-full">
            {/* Highway 1 West to East */}
            <motion.div
              className="absolute top-[48%] -translate-y-1/2 text-cyan"
              animate={{ left: ['-5%', '105%'] }}
              transition={{ duration: 7, repeat: Infinity, ease: 'linear' }}
            >
              <Car className="w-4 h-4 fill-cyan/20" />
            </motion.div>

            {/* Highway 1 East to West */}
            <motion.div
              className="absolute top-[52%] -translate-y-1/2 text-blue-400"
              animate={{ left: ['105%', '-5%'] }}
              transition={{ duration: 9, repeat: Infinity, ease: 'linear', delay: 1 }}
            >
              <Car className="w-4 h-4 -scale-x-100 fill-blue-400/20" />
            </motion.div>

            {/* Main St North to South */}
            <motion.div
              className="absolute left-[49.2%] -translate-x-1/2 text-purple-400 rotate-90"
              animate={{ top: ['-5%', '105%'] }}
              transition={{ duration: 8, repeat: Infinity, ease: 'linear', delay: 0.5 }}
            >
              <Car className="w-4 h-4 fill-purple-400/20" />
            </motion.div>

            {/* Sector 7 West to East */}
            <motion.div
              className="absolute top-[25%] -translate-y-1/2 text-emerald-400"
              animate={{ left: ['-5%', '105%'] }}
              transition={{ duration: 8, repeat: Infinity, ease: 'linear', delay: 1.5 }}
            >
              <Car className="w-4 h-4 fill-emerald-400/20" />
            </motion.div>

            {/* Ring Road North to South */}
            <motion.div
              className="absolute left-[74.2%] -translate-x-1/2 text-amber-400 rotate-90"
              animate={{ top: ['25%', '105%'] }}
              transition={{ duration: 9, repeat: Infinity, ease: 'linear', delay: 2.5 }}
            >
              <Car className="w-4 h-4 fill-amber-400/20" />
            </motion.div>
          </div>
        </foreignObject>

        {/* Building Blocks */}
        {[
          { x: 80, y: 260, w: 35, h: 50 },
          { x: 140, y: 270, w: 25, h: 40 },
          { x: 450, y: 260, w: 40, h: 55 },
          { x: 510, y: 275, w: 30, h: 35 },
          { x: 450, y: 50, w: 35, h: 45 },
          { x: 280, y: 140, w: 30, h: 40 },
          { x: 650, y: 260, w: 45, h: 60 },
          { x: 200, y: 45, w: 30, h: 50 },
        ].map((b, i) => (
          <rect key={i} x={b.x} y={b.y} width={b.w} height={b.h} rx="3"
            fill={buildingFill} stroke={buildingStroke} strokeWidth="0.5" />
        ))}
      </svg>
    </div>
  );
}

/* ────────── Google Maps Embed View ────────── */
function GoogleMapEmbed() {
  return (
    <div className="relative w-full rounded-2xl overflow-hidden" style={{ minHeight: 420 }}>
      <iframe
        title="Live Traffic City Map"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3313.1402532868774!2d67.10908417488058!3d24.88173604440686!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb33eafe2ecc311%3A0x8213daf29adc6923!2sShahra-e-Faisal%2C%20Pakistan!5e0!3m2!1sen!2s!4v1784693179004!5m2!1sen!2s"
        width="100%"
        height="420"
        style={{ border: 0, filter: 'contrast(1.05) saturate(1.1)' }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
}

/* ────────── Weekly Traffic Volume Chart ────────── */
function TrafficChart() {
  const days = [
    { label: 'Mon', value: 72 },
    { label: 'Tue', value: 85 },
    { label: 'Wed', value: 64 },
    { label: 'Thu', value: 90 },
    { label: 'Fri', value: 78 },
    { label: 'Sat', value: 45 },
    { label: 'Sun', value: 38 },
  ];

  return (
    <motion.div
      variants={slideUp}
      initial="hidden"
      whileInView="visible"
      viewport={viewportConfig}
    >
      <GlassCard className="p-6 md:p-8" hoverEffect={false}>
        <h3 className="font-heading text-xl font-bold mb-6 text-text-primary">Weekly Traffic Volume</h3>
        {/* Chart */}
        <div className="flex items-end justify-between gap-2 md:gap-4" style={{ height: 200 }}>
          {days.map((day, i) => (
            <div key={day.label} className="flex-1 h-full flex flex-col items-center justify-end gap-2">
              <div className="w-full h-full flex items-end justify-center">
              <motion.div
                className="w-full rounded-t-lg"
                style={{
                  background: 'linear-gradient(to top, #06b6d4, #3b82f6)',
                  minWidth: 20,
                }}
                initial={{ height: 0 }}
                whileInView={{ height: `${day.value}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
              />
              </div>
              <span className="text-xs text-text-muted font-semibold">{day.label}</span>
            </div>
          ))}
        </div>
      </GlassCard>
    </motion.div>
  );
}

/* ────────── Main LiveTraffic Component ────────── */
export default function LiveTraffic() {
  const [mapMode, setMapMode] = useState('simulation'); // 'simulation' | 'google'

  const liveStats = [
    { icon: Car, label: 'Active Vehicles', value: '12,847', color: '#06b6d4' },
    { icon: Gauge, label: 'Avg Speed', value: '42 km/h', color: '#22c55e' },
    { icon: AlertTriangle, label: 'Incidents Today', value: '3', color: '#ef4444' },
    { icon: Activity, label: 'Signal Efficiency', value: '94.2%', color: '#8b5cf6' },
  ];

  return (
    <motion.div {...pageTransition}>
      <AnimatedBackground />

      <div className="page-wrapper relative z-10 pb-16">
        <div className="container-custom pt-8">

          {/* ────────── Header ────────── */}
          <motion.div
            className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-8"
            variants={fadeIn} initial="hidden" animate="visible"
          >
            <div>
              <div className="section-label" style={{ display: 'inline-flex', marginBottom: 8 }}>
                Real-Time Monitoring
              </div>
              <h1 className="font-heading text-2xl md:text-3xl font-bold text-text-primary">
                Live Traffic <span className="text-cyan">Monitor</span>
              </h1>
              <p className="text-text-secondary text-sm mt-1">Real-time AI traffic analysis across the smart city network</p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <RealTimeClock />
              <WeatherWidget />
            </div>
          </motion.div>

          {/* ────────── Traffic Status Cards (Low / Medium / High) ────────── */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8"
            variants={staggerContainer(0.12)}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
          >
            {TRAFFIC_STATUSES.map((status) => (
              <motion.div key={status.level} variants={staggerItem} className="h-full">
                <GlassCard className="p-5 h-full" hoverEffect={false}>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="relative flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ backgroundColor: status.color }} />
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5" style={{ backgroundColor: status.color }} />
                      </span>
                      <h3 className="font-heading font-bold text-text-primary">{status.level} Traffic</h3>
                    </div>
                    <span className="text-2xl font-bold font-heading" style={{ color: status.color }}>
                      {status.percentage}%
                    </span>
                  </div>
                  <p className="text-sm text-text-secondary mb-3 leading-relaxed">{status.description}</p>
                  <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ backgroundColor: status.color }}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${status.percentage}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, ease: 'easeOut' }}
                    />
                  </div>
                  <p className="text-xs text-text-muted mt-2">{status.roads} roads affected</p>
                </GlassCard>
              </motion.div>
            ))}
          </motion.div>

          {/* ────────── Map Display with View Mode Toggle ────────── */}
          <motion.div
            className="mb-8"
            variants={slideUp} initial="hidden" whileInView="visible" viewport={viewportConfig}
          >
            <GlassCard className="p-3" hoverEffect={false}>
              {/* Map Mode Switcher Header */}
              <div className="flex items-center justify-between px-3 py-2 mb-2 border-b border-border">
                <span className="text-xs font-semibold uppercase tracking-wider text-text-secondary">
                  Interactive Map View
                </span>
                <div className="flex items-center gap-1.5 p-1 rounded-xl bg-surface border border-border">
                  <button
                    onClick={() => setMapMode('simulation')}
                    className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                      mapMode === 'simulation'
                        ? 'bg-cyan text-white shadow-md'
                        : 'text-text-secondary hover:text-text-primary'
                    }`}
                  >
                    <Map className="w-3.5 h-3.5" /> Simulated Smart Grid
                  </button>
                  <button
                    onClick={() => setMapMode('google')}
                    className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                      mapMode === 'google'
                        ? 'bg-cyan text-white shadow-md'
                        : 'text-text-secondary hover:text-text-primary'
                    }`}
                  >
                    <Globe className="w-3.5 h-3.5" /> Google Maps View
                  </button>
                </div>
              </div>

              {/* Map Content */}
              {mapMode === 'simulation' ? <TrafficMap /> : <GoogleMapEmbed />}
            </GlassCard>
          </motion.div>

          {/* ────────── Live Stats Row ────────── */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
            variants={staggerContainer(0.08)}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
          >
            {liveStats.map((stat) => (
              <motion.div key={stat.label} variants={staggerItem} className="h-full">
                <GlassCard className="p-4 text-center h-full" hoverEffect={false}>
                  <stat.icon className="w-6 h-6 mx-auto mb-2" style={{ color: stat.color }} />
                  <p className="text-xl font-bold font-heading leading-tight" style={{ color: stat.color }}>{stat.value}</p>
                  <p className="text-xs text-text-muted mt-1 leading-tight">{stat.label}</p>
                </GlassCard>
              </motion.div>
            ))}
          </motion.div>

          {/* ────────── Traffic Analytics Chart ────────── */}
          <TrafficChart />

        </div>
      </div>
    </motion.div>
  );
}