import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, TrafficCone } from 'lucide-react';
import AnimatedBackground from '@/components/AnimatedBackground';
import { pageTransition, fadeIn } from '@/utils/animations';

export default function NotFound() {
  return (
    <motion.div {...pageTransition}>
      <AnimatedBackground />

      <div className="page-wrapper relative z-10 pb-16 flex items-center">
        <motion.div
          className="container-custom text-center"
          variants={fadeIn}
          initial="hidden"
          animate="visible"
        >
          <div className="w-14 h-14 mx-auto rounded-2xl bg-linear-to-br from-amber-500 to-orange-600 flex items-center justify-center mb-4">
            <TrafficCone className="w-7 h-7 text-white" />
          </div>
          <p className="font-heading text-6xl md:text-7xl font-extrabold text-cyan mb-2">404</p>
          <h1 className="font-heading text-2xl md:text-3xl font-bold mb-2 text-text-primary">
            Road Closed
          </h1>
          <p className="text-text-secondary text-sm mb-8">
            The page you are looking for doesn't exist or has been moved.
          </p>
          <Link to="/" className="btn-primary gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
}
