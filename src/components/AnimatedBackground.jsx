import { useMemo } from 'react';
import { motion } from 'framer-motion';

const PARTICLE_COUNT = 18;

const generateParticles = () =>
  Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 2,
    delay: Math.random() * 5,
    duration: Math.random() * 6 + 8,
    opacity: Math.random() * 0.4 + 0.1,
  }));

const orbs = [
  {
    color: 'rgba(6, 182, 212, 0.15)',
    size: 500,
    x: '15%',
    y: '20%',
    duration: 20,
  },
  {
    color: 'rgba(139, 92, 246, 0.12)',
    size: 450,
    x: '70%',
    y: '60%',
    duration: 25,
  },
  {
    color: 'rgba(59, 130, 246, 0.1)',
    size: 400,
    x: '50%',
    y: '80%',
    duration: 22,
  },
];

export default function AnimatedBackground() {
  const particles = useMemo(generateParticles, []);

  return (
    <div
      className="fixed inset-0 z-0 pointer-events-none overflow-hidden"
      aria-hidden="true"
    >
      {orbs.map((orb, i) => (
        <motion.div
          key={`orb-${i}`}
          className="absolute rounded-full"
          style={{
            width: orb.size,
            height: orb.size,
            background: `radial-gradient(circle, ${orb.color}, transparent 70%)`,
            left: orb.x,
            top: orb.y,
            filter: `blur(80px)`,
            transform: 'translate(-50%, -50%)',
          }}
          animate={{
            x: [0, 60, -40, 30, 0],
            y: [0, -50, 30, -60, 0],
          }}
          transition={{
            duration: orb.duration,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut',
          }}
        />
      ))}

      {particles.map((p) => (
        <motion.div
          key={`particle-${p.id}`}
          className="absolute rounded-full bg-cyan"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.x}%`,
            top: `${p.y}%`,
            opacity: p.opacity,
          }}
          animate={{
            y: [0, -40, 10, -60, 0],
            x: [0, 20, -15, 25, 0],
            opacity: [p.opacity, p.opacity * 1.8, p.opacity * 0.6, p.opacity * 1.4, p.opacity],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut',
          }}
        />
      ))}

      <div className="absolute inset-0 bg-grid opacity-100" />
    </div>
  );
}
