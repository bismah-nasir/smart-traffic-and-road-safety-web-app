import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MapPin, Clock, Search, Navigation, BarChart3,
  CheckCircle, ChevronRight, Zap,
} from 'lucide-react';
import AnimatedBackground from '@/components/AnimatedBackground';
import GlassCard from '@/components/GlassCard';
import {
  pageTransition, staggerContainer, staggerItem, slideUp,
  fadeIn,
} from '@/utils/animations';
import { TRANSPORT_TYPES, SAMPLE_ROUTES, SAMPLE_LOCATIONS } from '@/utils/constants';
import { useTheme } from '@/context/ThemeContext';

/* ────────── Safety Score Ring ────────── */

function SafetyRing({ score, size = 56, color = '#22c55e' }) {
  const { isDark } = useTheme();
  const strokeWidth = 4;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={radius}
          stroke={isDark ? "rgba(255,255,255,0.06)" : "rgba(15,23,42,0.06)"} strokeWidth={strokeWidth} fill="none" />
        <motion.circle
          cx={size / 2} cy={size / 2} r={radius}
          stroke={color} strokeWidth={strokeWidth} fill="none"
          strokeLinecap="round"
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          strokeDasharray={circumference}
        />
      </svg>
      <span className="absolute text-sm font-bold font-heading" style={{ color }}>{score}</span>
    </div>
  );
}

/* ────────── Route Visualization SVG ────────── */

function RouteMap({ selectedRouteName }) {
  const { isDark } = useTheme();

  // Route paths matching const keys
  const paths = {
    'Via Shahrah-e-Faisal': 'M 100 200 C 200 200 250 120 350 150 C 450 180 500 80 600 100',
    'Via Lyari Expressway': 'M 100 200 Q 250 50 400 150 Q 500 220 600 100',
    'Via University Road': 'M 100 200 Q 200 250 350 240 Q 500 230 600 100',
  };

  const activePath = paths[selectedRouteName] || paths['Via Shahrah-e-Faisal'];

  // Theme-adaptive styles
  const buildingFill = isDark ? 'rgba(255,255,255,0.03)' : 'rgba(15, 23, 42, 0.04)';
  const buildingStroke = isDark ? 'rgba(255,255,255,0.06)' : 'rgba(15, 23, 42, 0.12)';
  const altRouteStroke = isDark ? 'rgba(255,255,255,0.12)' : 'rgba(15, 23, 42, 0.18)';
  const labelColor = isDark ? 'rgba(255,255,255,0.3)' : 'rgba(15, 23, 42, 0.55)';
  const expressColor = isDark ? 'rgba(6,182,212,0.6)' : 'rgba(6,182,212,0.85)';
  const gridColor = isDark ? 'rgba(6,182,212,0.04)' : 'rgba(15, 23, 42, 0.05)';

  return (
    <div className="relative w-full overflow-hidden rounded-xl bg-black/5" style={{ height: 320 }}>
      <svg viewBox="0 0 700 300" className="w-full h-full">
        {/* Grid */}
        <defs>
          <pattern id="routeGrid" width="35" height="35" patternUnits="userSpaceOnUse">
            <path d="M 35 0 L 0 0 0 35" fill="none" stroke={gridColor} strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="700" height="300" fill="url(#routeGrid)" />

        {/* Buildings */}
        {[
          { x: 150, y: 80, w: 40, h: 50 },
          { x: 280, y: 60, w: 35, h: 45 },
          { x: 350, y: 100, w: 50, h: 60 },
          { x: 480, y: 70, w: 35, h: 50 },
          { x: 250, y: 180, w: 30, h: 40 },
          { x: 420, y: 200, w: 45, h: 35 },
        ].map((b, i) => (
          <rect key={i} x={b.x} y={b.y} width={b.w} height={b.h} rx="3"
            fill={buildingFill} stroke={buildingStroke} strokeWidth="0.5" />
        ))}

        {/* Draw the three routes (active path becomes solid Cyan, inactive are dotted) */}
        {Object.entries(paths).map(([name, pathD]) => {
          const isActive = name === selectedRouteName;
          return (
            <motion.path
              key={name}
              d={pathD}
              fill="none"
              stroke={isActive ? '#06b6d4' : altRouteStroke}
              strokeWidth={isActive ? '3.5' : '2'}
              strokeLinecap="round"
              strokeDasharray={isActive ? 'none' : '6 4'}
              initial={{ pathLength: isActive ? 0 : 1, opacity: isActive ? 0.3 : 0.5 }}
              animate={{ pathLength: 1, opacity: isActive ? 1 : 0.35 }}
              transition={{ duration: 1.5, ease: 'easeInOut' }}
            />
          );
        })}

        {/* Flowing dots follow the active path! */}
        <circle r="3.5" fill="#06b6d4" opacity="0.8">
          <animateMotion key={`${selectedRouteName}-dot1`} dur="4.2s" repeatCount="indefinite" path={activePath} />
        </circle>
        <circle r="2.5" fill="#22d3ee" opacity="0.6">
          <animateMotion key={`${selectedRouteName}-dot2`} dur="4.2s" repeatCount="indefinite" begin="2.1s" path={activePath} />
        </circle>

        {/* Start marker A */}
        <circle cx="100" cy="200" r="12" fill="rgba(34,197,94,0.15)" stroke="#22c55e" strokeWidth="2">
          <animate attributeName="r" values="12;16;12" dur="2s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="1;0.5;1" dur="2s" repeatCount="indefinite" />
        </circle>
        <circle cx="100" cy="200" r="6" fill="#22c55e" />
        <text x="100" y="204" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold">A</text>

        {/* End marker B */}
        <circle cx="600" cy="100" r="12" fill="rgba(239,68,68,0.15)" stroke="#ef4444" strokeWidth="2">
          <animate attributeName="r" values="12;16;12" dur="2s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="1;0.5;1" dur="2s" repeatCount="indefinite" />
        </circle>
        <circle cx="600" cy="100" r="6" fill="#ef4444" />
        <text x="600" y="104" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold">B</text>

        {/* Route labels */}
        <text x="250" y="140" fill={expressColor} fontSize="10" fontFamily="Inter" fontWeight="600">Shahrah-e-Faisal</text>
        <text x="430" y="260" fill={labelColor} fontSize="9" fontFamily="Inter" fontWeight="600">Lyari Expressway</text>
      </svg>
    </div>
  );
}

/* ────────── Main Page ────────── */

export default function RouteSuggestion() {
  const [form, setForm] = useState({
    start: '',
    destination: '',
    time: '',
    transport: 'car',
  });
  const [showResults, setShowResults] = useState(false);
  const [selectedRouteName, setSelectedRouteName] = useState('Via Shahrah-e-Faisal');

  const handleSubmit = (e) => {
    e.preventDefault();
    setSelectedRouteName('Via Shahrah-e-Faisal'); // Reset selection to recommended route on new search
    setShowResults(true);
  };

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (showResults) setShowResults(false);
  };

  return (
    <motion.div {...pageTransition}>
      <AnimatedBackground />

      <div className="page-wrapper relative z-10 pb-16">
        <div className="container-custom pt-8">

          {/* ────────── Header ────────── */}
          <motion.div className="text-center mb-8" variants={fadeIn} initial="hidden" animate="visible">
            <div className="section-label" style={{ display: 'inline-flex', marginBottom: 12 }}>
              <Zap className="w-3.5 h-3.5" />
              AI-Powered Route Optimization
            </div>
            <h1 className="font-heading text-3xl md:text-4xl font-bold mb-2 text-text-primary">
              Find Your <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan to-electric">Optimal Route</span>
            </h1>
            <p className="text-text-secondary text-sm mx-auto">
              Enter your start and destination to receive AI-optimized route recommendations with real-time traffic analysis.
            </p>
          </motion.div>

          {/* ────────── Input Form ────────── */}
          <motion.div variants={slideUp} initial="hidden" animate="visible">
            <GlassCard className="p-5 md:p-7 max-w-3xl mx-auto mb-8 gradient-border" hoverEffect={false}>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Start Location */}
                  <div className="form-input-icon">
                    <MapPin className="icon w-4 h-4 text-traffic-green" />
                    <input
                      type="text" placeholder="Start Location" value={form.start}
                      onChange={(e) => handleChange('start', e.target.value)}
                      list="locations-start" className="form-input pl-10!" aria-label="Start Location"
                    />
                    <datalist id="locations-start">
                      {SAMPLE_LOCATIONS.map((loc) => <option key={loc} value={loc} />)}
                    </datalist>
                  </div>

                  {/* Destination */}
                  <div className="form-input-icon">
                    <MapPin className="icon w-4 h-4 text-traffic-red" />
                    <input
                      type="text" placeholder="Destination" value={form.destination}
                      onChange={(e) => handleChange('destination', e.target.value)}
                      list="locations-dest" className="form-input pl-10!" aria-label="Destination"
                    />
                    <datalist id="locations-dest">
                      {SAMPLE_LOCATIONS.map((loc) => <option key={loc} value={loc} />)}
                    </datalist>
                  </div>
                </div>

                {/* Time */}
                <div className="form-input-icon max-w-xs">
                  <Clock className="icon w-4 h-4 text-text-muted" />
                  <input
                    type="time" value={form.time}
                    onChange={(e) => handleChange('time', e.target.value)}
                    className="form-input pl-10! text-text-secondary" aria-label="Departure Time"
                  />
                </div>

                {/* Transport Type */}
                <div>
                  <p className="text-xs text-text-muted uppercase tracking-wider mb-2.5 font-semibold">Transport Type</p>
                  <div className="flex flex-wrap gap-2">
                    {TRANSPORT_TYPES.map((t) => (
                      <button
                        key={t.id} type="button"
                        onClick={() => handleChange('transport', t.id)}
                        className={`
                          flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm border transition-all duration-250 cursor-pointer
                          ${form.transport === t.id
                            ? 'border-cyan/50 bg-cyan/10 text-cyan'
                            : 'border-border bg-surface text-text-secondary hover:border-border-hover hover:text-text-primary'
                          }
                        `}
                        aria-label={t.label} aria-pressed={form.transport === t.id}
                      >
                        <t.icon className="w-4 h-4" />
                        <span className="font-medium">{t.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Submit */}
                <motion.button
                  type="submit"
                  className="btn-primary gap-2 cursor-pointer"
                  whileHover={{ scale: 1.02, boxShadow: '0 8px 32px rgba(6,182,212,0.4)' }}
                  whileTap={{ scale: 0.97 }}
                >
                  <Search className="w-4 h-4" />
                  Find Optimal Route
                </motion.button>
              </form>
            </GlassCard>
          </motion.div>

          {/* ────────── Results ────────── */}
          <AnimatePresence>
            {showResults && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                {/* Route Visualization */}
                <GlassCard className="p-4 md:p-6 mb-10" hoverEffect={false}>
                  <div className="flex items-center gap-2 mb-4">
                    <Navigation className="w-5 h-5 text-cyan" />
                    <h3 className="font-heading text-xl font-bold text-text-primary">Route Visualization</h3>
                  </div>
                  <RouteMap selectedRouteName={selectedRouteName} />
                  <div className="flex items-center justify-between mt-4 text-sm text-text-secondary">
                    <span className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-traffic-green" /> {form.start || 'Start'}
                    </span>
                    <span className="flex-1 mx-4 h-px bg-linear-to-r from-traffic-green via-cyan to-traffic-red" />
                    <span className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-traffic-red" /> {form.destination || 'Destination'}
                    </span>
                  </div>
                </GlassCard>

                {/* Route Cards */}
                <h3 className="font-heading text-2xl font-bold mb-6 flex items-center gap-2 text-text-primary">
                  <BarChart3 className="w-6 h-6 text-cyan" />
                  Available Routes
                </h3>
                <motion.div
                  className="grid grid-cols-1 lg:grid-cols-3 gap-6"
                  variants={staggerContainer(0.15)}
                  initial="hidden"
                  animate="visible"
                >
                  {SAMPLE_ROUTES.map((route) => (
                    <motion.div key={route.name} variants={staggerItem} className="h-full">
                      <GlassCard
                        className={`p-6 relative overflow-hidden h-full transition-all duration-300 ${
                          selectedRouteName === route.name
                            ? 'border-cyan/50 shadow-lg shadow-cyan/10'
                            : 'border-border'
                        }`}
                        glowColor={route.recommended ? 'glow-cyan' : undefined}
                        hoverEffect={false}
                      >
                        {route.recommended && (
                          <div className="absolute top-0 right-0 px-3 py-1 bg-linear-to-r from-cyan to-electric text-xs font-bold rounded-bl-xl text-white">
                            ★ Recommended
                          </div>
                        )}

                        <h4 className="font-heading text-lg font-bold mb-4 pr-20 text-text-primary">{route.name}</h4>

                        <div className="grid grid-cols-2 gap-4 mb-5">
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-text-muted" />
                            <div>
                              <p className="text-xs text-text-muted">ETA</p>
                              <p className="font-semibold text-text-primary">{route.time}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-text-muted" />
                            <div>
                              <p className="text-xs text-text-muted">Distance</p>
                              <p className="font-semibold text-text-primary">{route.distance}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: route.trafficColor }} />
                            <div>
                              <p className="text-xs text-text-muted">Traffic</p>
                              <p className="font-semibold" style={{ color: route.trafficColor }}>{route.traffic}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-text-muted" />
                            <div>
                              <p className="text-xs text-text-muted">Road</p>
                              <p className="font-semibold text-text-primary">{route.roadCondition}</p>
                            </div>
                          </div>
                        </div>

                        {/* Safety Score + Density */}
                        <div className="flex items-center justify-between mb-5">
                          <div className="flex items-center gap-3">
                            <SafetyRing score={route.safetyScore} color={route.safetyScore >= 85 ? '#22c55e' : '#eab308'} />
                            <div>
                              <p className="text-xs text-text-muted">Safety Score</p>
                              <p className="text-sm font-semibold text-text-primary">{route.safetyScore >= 85 ? 'Excellent' : 'Good'}</p>
                            </div>
                          </div>
                          <div className="flex-1 ml-6">
                            <p className="text-xs text-text-muted mb-1 font-semibold">Traffic Density</p>
                            <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                              <motion.div
                                className="h-full rounded-full"
                                style={{ backgroundColor: route.trafficColor }}
                                initial={{ width: 0 }}
                                animate={{ width: `${route.density}%` }}
                                transition={{ duration: 1, ease: 'easeOut', delay: 0.3 }}
                              />
                            </div>
                            <p className="text-xs text-text-muted mt-0.5">{route.density}%</p>
                          </div>
                        </div>

                        <motion.button
                          onClick={() => setSelectedRouteName(route.name)}
                          className={`w-full py-2.5 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
                            selectedRouteName === route.name
                              ? 'bg-cyan text-white shadow-lg shadow-cyan/20 border-cyan'
                              : 'glass text-text-primary hover:bg-surface-hover'
                          }`}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          {selectedRouteName === route.name ? 'Active Route' : (route.recommended ? 'Select Best Route' : 'Select Route')}
                          <ChevronRight className="w-4 h-4" />
                        </motion.button>
                      </GlassCard>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </div>
    </motion.div>
  );
}
