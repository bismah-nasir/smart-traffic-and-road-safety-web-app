import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Globe, Share2, ExternalLink, MessageSquareShare, Mail, Phone, MapPin } from 'lucide-react';
import { staggerContainer, staggerItem, viewportConfig } from '@/utils/animations';

const quickLinks = [
  { label: 'Home', path: '/' },
  { label: 'Live Traffic', path: '/live-traffic' },
  { label: 'Route Suggestion', path: '/route-suggestion' },
  { label: 'Road Safety', path: '/road-safety' },
  { label: 'Emergency', path: '/emergency' },
];

const resources = [
  { label: 'Documentation', href: '#' },
  { label: 'API Access', href: '#' },
  { label: 'Support', href: '#' },
  { label: 'Community', href: '#' },
];

const socialLinks = [
  { icon: Globe, href: '#', label: 'Website' },
  { icon: Share2, href: '#', label: 'Share' },
  { icon: ExternalLink, href: '#', label: 'Portfolio' },
  { icon: MessageSquareShare, href: '#', label: 'Community' },
];

export default function Footer() {
  return (
    <footer className="relative bg-navy-950 text-slate-300 border-t border-white/10" role="contentinfo">
      {/* Dynamic gradient top line border */}
      <div
        className="h-0.5 w-full animate-gradient-shift"
        style={{
          background: 'linear-gradient(90deg, #06b6d4, #8b5cf6, #3b82f6, #06b6d4)',
          backgroundSize: '300% 100%',
        }}
      />

      <motion.div
        className="container-custom pt-16 pb-12"
        variants={staggerContainer(0.12, 0.05)}
        initial="hidden"
        whileInView="visible"
        viewport={viewportConfig}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          
          {/* Col 1: Brand & Socials */}
          <motion.div variants={staggerItem} className="flex flex-col items-start gap-5">
            <Link to="/" className="inline-block">
              <span className="font-heading font-bold text-2xl bg-linear-to-r from-cyan to-electric bg-clip-text text-transparent">
                SmartTraffic
              </span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
              Revolutionizing urban mobility with AI-powered traffic management, real-time monitoring, and emergency response systems.
            </p>
            <div className="flex items-center gap-3 mt-1">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-full flex items-center justify-center bg-white/5 border border-white/10 text-slate-300 hover:text-cyan hover:border-cyan/50 hover:bg-cyan/5 transition-all duration-300"
                  whileHover={{ scale: 1.12 }}
                  whileTap={{ scale: 0.92 }}
                >
                  <Icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Col 2: Quick Links */}
          <motion.div variants={staggerItem} className="flex flex-col items-start">
            <h4 className="font-heading font-semibold text-white mb-5 text-sm uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-3.5 w-full">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-slate-400 text-sm hover:text-cyan hover:pl-1.5 transition-all duration-250 inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Col 3: Resources */}
          <motion.div variants={staggerItem} className="flex flex-col items-start">
            <h4 className="font-heading font-semibold text-white mb-5 text-sm uppercase tracking-wider">
              Resources
            </h4>
            <ul className="space-y-3.5 w-full">
              {resources.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="text-slate-400 text-sm hover:text-cyan hover:pl-1.5 transition-all duration-250 inline-block"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Col 4: Contact Details */}
          <motion.div variants={staggerItem} className="flex flex-col items-start">
            <h4 className="font-heading font-semibold text-white mb-5 text-sm uppercase tracking-wider">
              Contact
            </h4>
            <ul className="space-y-4 w-full">
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-cyan mt-0.5 shrink-0" />
                <span className="text-slate-400 text-sm">contact@smarttraffic.io</span>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-cyan mt-0.5 shrink-0" />
                <span className="text-slate-400 text-sm">+92 (300) 123-4567</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-cyan mt-0.5 shrink-0" />
                <span className="text-slate-400 text-sm leading-relaxed">
                  123 Innovation Boulevard,<br />
                  Shahrah-e-Faisal, Karachi
                  
                </span>
              </li>
            </ul>
          </motion.div>
        </div>
      </motion.div>

      {/* Copyright Bar */}
      <div className="border-t border-white/10 bg-black/20">
        <div className="container-custom py-6">
          <p className="text-slate-500 text-xs text-center leading-relaxed">
            © {new Date().getFullYear()} SmartTraffic. All rights reserved. Designed for smarter, safer urban development.
          </p>
        </div>
      </div>
    </footer>
  );
}
