import {
  Heart,
  HardHat,
  Smartphone,
  Gauge,
  TrafficCone,
  AlertTriangle,
  Moon,
  Ambulance,
  Shield,
  Flame,
  Phone,
  Hospital,
} from 'lucide-react';

// ────────── Navigation Links ──────────
export const NAV_LINKS = [
    { label: "Home", path: "/" },
    { label: "Live Traffic", path: "/live-traffic" },
    { label: "Route Suggestion", path: "/route-suggestion" },
    { label: "Road Safety", path: "/road-safety" },
    { label: "Emergency", path: "/emergency" },
];

// ────────── Stats ──────────
export const STATS = [
  { label: 'Vehicles Monitored', value: 50000, suffix: '+', prefix: '' },
  { label: 'Cities Connected', value: 200, suffix: '+', prefix: '' },
  { label: 'Uptime', value: 99.9, suffix: '%', prefix: '', decimals: 1 },
  { label: 'Avg Response Time', value: 2.8, suffix: 'min', prefix: '', decimals: 1 },
];

// ────────── Timeline ──────────
export const TIMELINE = [
  { year: '2021', title: 'Project Inception', description: 'Smart Traffic concept developed with city planners.' },
  { year: '2022', title: 'Pilot Launch', description: 'Deployed in 15 intersections across 3 cities.' },
  { year: '2023', title: 'AI Integration', description: 'Machine learning models integrated for predictive traffic flow.' },
  { year: '2024', title: 'National Rollout', description: 'Expanded to 200+ cities with 50,000+ monitored vehicles.' },
];

// ────────── Traffic News ──────────
export const TRAFFIC_NEWS = [
  {
    id: 1,
    title: 'Highway 7 Expansion Complete',
    summary: 'New lanes open reducing congestion by 40% during peak hours.',
    time: '2 hours ago',
    category: 'Infrastructure',
  },
  {
    id: 2,
    title: 'Smart Signal System Activated',
    summary: 'AI-powered traffic signals now live at 50 major intersections.',
    time: '5 hours ago',
    category: 'Technology',
  },
  {
    id: 3,
    title: 'Weekend Road Maintenance Alert',
    summary: 'Sector 14 main road will be partially closed Saturday–Sunday.',
    time: '8 hours ago',
    category: 'Alert',
  },
];

// ────────── Safety Tips ──────────
export const SAFETY_TIPS = [
  {
    id: 'seatbelt',
    title: 'Wear Seat Belt',
    description: 'Always buckle up before starting your journey. Seat belts reduce the risk of fatal injury by 45%.',
    icon: Heart,
    gradient: 'from-rose-500 to-pink-600',
  },
  {
    id: 'helmet',
    title: 'Use Helmet',
    description: 'Helmets reduce the risk of head injury by 69%. Always wear a certified helmet while riding.',
    icon: HardHat,
    gradient: 'from-amber-500 to-orange-600',
  },
  {
    id: 'no-phone',
    title: 'Avoid Mobile Phone',
    description: 'Using a phone while driving increases accident risk by 4x. Keep your focus on the road.',
    icon: Smartphone,
    gradient: 'from-blue-500 to-indigo-600',
  },
  {
    id: 'speed-limit',
    title: 'Maintain Speed Limit',
    description: 'Speed is a factor in 30% of all fatal crashes. Observe posted speed limits at all times.',
    icon: Gauge,
    gradient: 'from-cyan-500 to-teal-600',
  },
  {
    id: 'traffic-signals',
    title: 'Follow Traffic Signals',
    description: 'Running red lights causes 25% of intersection crashes. Always obey traffic signals.',
    icon: TrafficCone,
    gradient: 'from-green-500 to-emerald-600',
  },
  {
    id: 'emergency-lane',
    title: 'Emergency Lane Rules',
    description: 'Keep emergency lanes clear for first responders. Blocking them can cost lives.',
    icon: AlertTriangle,
    gradient: 'from-red-500 to-rose-600',
  },
  {
    id: 'night-driving',
    title: 'Night Driving Tips',
    description: 'Use headlights, reduce speed, and stay alert. Fatal crashes are 3x more likely at night.',
    icon: Moon,
    gradient: 'from-purple-500 to-violet-600',
  },
];

// ────────── Emergency Contacts ──────────
export const EMERGENCY_CONTACTS = [
  {
    id: 'ambulance',
    title: 'Ambulance',
    number: '102',
    description: 'Medical emergency response',
    icon: Ambulance,
    color: '#ef4444',
    gradient: 'from-red-500 to-rose-600',
  },
  {
    id: 'police',
    title: 'Police',
    number: '100',
    description: 'Law enforcement & traffic police',
    icon: Shield,
    color: '#3b82f6',
    gradient: 'from-blue-500 to-indigo-600',
  },
  {
    id: 'fire',
    title: 'Fire Brigade',
    number: '101',
    description: 'Fire & rescue services',
    icon: Flame,
    color: '#f97316',
    gradient: 'from-orange-500 to-amber-600',
  },
  {
    id: 'helpline',
    title: 'Emergency Helpline',
    number: '112',
    description: 'Universal emergency number',
    icon: Phone,
    color: '#22c55e',
    gradient: 'from-green-500 to-emerald-600',
  },
  {
    id: 'hospital',
    title: 'Nearby Hospital',
    number: '108',
    description: 'Nearest hospital finder',
    icon: Hospital,
    color: '#8b5cf6',
    gradient: 'from-purple-500 to-violet-600',
  },
];