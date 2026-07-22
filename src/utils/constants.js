import {
    Activity,
    Route,
    ShieldCheck,
    Siren,
    Car,
    Bike,
    Bus,
    PersonStanding,
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
} from "lucide-react";

// ────────── Navigation Links ──────────
export const NAV_LINKS = [
    { label: "Home", path: "/" },
    { label: "Live Traffic", path: "/live-traffic" },
    { label: "Route Suggestion", path: "/route-suggestion" },
    { label: "Road Safety", path: "/road-safety" },
    { label: "Emergency", path: "/emergency" },
];

// ────────── Features ──────────
export const FEATURES = [
    {
        id: "traffic-monitoring",
        title: "Traffic Monitoring",
        description:
            "Real-time traffic analysis powered by AI with smart sensors across 200+ city intersections.",
        icon: Activity,
        gradient: "from-cyan-400 to-blue-500",
        color: "#06b6d4",
    },
    {
        id: "smart-route",
        title: "Smart Route Suggestion",
        description:
            "AI-optimized routing that saves an average of 23 minutes per commute using live data.",
        icon: Route,
        gradient: "from-purple-400 to-indigo-500",
        color: "#8b5cf6",
    },
    {
        id: "road-safety",
        title: "Road Safety",
        description:
            "Comprehensive safety guidelines and real-time hazard alerts to protect every road user.",
        icon: ShieldCheck,
        gradient: "from-green-400 to-emerald-500",
        color: "#22c55e",
    },
    {
        id: "emergency",
        title: "Emergency Assistance",
        description:
            "One-tap emergency response with sub-3-minute average dispatch time in covered areas.",
        icon: Siren,
        gradient: "from-red-400 to-rose-500",
        color: "#ef4444",
    },
];
// ────────── Stats ──────────
export const STATS = [
    { label: "Vehicles Monitored", value: 50000, suffix: "+", prefix: "" },
    { label: "Cities Connected", value: 200, suffix: "+", prefix: "" },
    { label: "Uptime", value: 99.9, suffix: "%", prefix: "", decimals: 1 },
    {
        label: "Avg Response Time",
        value: 2.8,
        suffix: "min",
        prefix: "",
        decimals: 1,
    },
];

// ────────── Timeline ──────────
export const TIMELINE = [
    {
        year: "2021",
        title: "Project Inception",
        description: "Smart Traffic concept developed with city planners.",
    },
    {
        year: "2022",
        title: "Pilot Launch",
        description: "Deployed in 15 intersections across 3 cities.",
    },
    {
        year: "2023",
        title: "AI Integration",
        description:
            "Machine learning models integrated for predictive traffic flow.",
    },
    {
        year: "2024",
        title: "National Rollout",
        description: "Expanded to 200+ cities with 50,000+ monitored vehicles.",
    },
];

// ────────── Traffic News ──────────
export const TRAFFIC_NEWS = [
    {
        id: 1,
        title: "Highway 7 Expansion Complete",
        summary: "New lanes open reducing congestion by 40% during peak hours.",
        time: "2 hours ago",
        category: "Infrastructure",
    },
    {
        id: 2,
        title: "Smart Signal System Activated",
        summary:
            "AI-powered traffic signals now live at 50 major intersections.",
        time: "5 hours ago",
        category: "Technology",
    },
    {
        id: 3,
        title: "Weekend Road Maintenance Alert",
        summary:
            "Sector 14 main road will be partially closed Saturday–Sunday.",
        time: "8 hours ago",
        category: "Alert",
    },
];

// ────────── Traffic Status ──────────
export const TRAFFIC_STATUSES = [
    {
        level: "Low",
        color: "#22c55e",
        bgClass: "bg-traffic-green/10",
        borderClass: "border-traffic-green/30",
        percentage: 35,
        roads: 142,
        description: "Smooth flow on most routes",
    },
    {
        level: "Medium",
        color: "#eab308",
        bgClass: "bg-traffic-yellow/10",
        borderClass: "border-traffic-yellow/30",
        percentage: 45,
        roads: 89,
        description: "Moderate congestion reported",
    },
    {
        level: "High",
        color: "#ef4444",
        bgClass: "bg-traffic-red/10",
        borderClass: "border-traffic-red/30",
        percentage: 20,
        roads: 34,
        description: "Heavy congestion — use alternate routes",
    },
];

// ────────── Transport Types ──────────
export const TRANSPORT_TYPES = [
    { id: "car", label: "Car", icon: Car },
    { id: "bike", label: "Bike", icon: Bike },
    { id: "bus", label: "Bus", icon: Bus },
    { id: "walk", label: "Walk", icon: PersonStanding },
];

// ────────── Sample Routes ──────────
export const SAMPLE_ROUTES = [
    {
        name: "Via Shahrah-e-Faisal",
        time: "24 min",
        distance: "12.4 km",
        traffic: "Low",
        trafficColor: "#22c55e",
        roadCondition: "Excellent",
        safetyScore: 92,
        density: 28,
        recommended: true,
    },
    {
        name: "Via Lyari Expressway",
        time: "38 min",
        distance: "9.8 km",
        traffic: "High",
        trafficColor: "#ef4444",
        roadCondition: "Good",
        safetyScore: 75,
        density: 72,
        recommended: false,
    },
    {
        name: "Via University Road",
        time: "31 min",
        distance: "14.1 km",
        traffic: "Medium",
        trafficColor: "#eab308",
        roadCondition: "Good",
        safetyScore: 88,
        density: 45,
        recommended: false,
    },
];

// ────────── Sample Locations ──────────
export const SAMPLE_LOCATIONS = [
    "Clifton",
    "Defence (DHA)",
    "Saddar",
    "Gulshan-e-Iqbal",
    "Nazimabad",
    "Karachi Airport (JIAP)",
    "Tariq Road",
    "Bahadurabad",
    "Shahrah-e-Faisal",
    "Karsaz",
    "Karachi Cantt",
    "DHA Phase 8",
];

// ────────── Safety Tips ──────────
export const SAFETY_TIPS = [
    {
        id: "seatbelt",
        title: "Wear Seat Belt",
        description:
            "Always buckle up before starting your journey. Seat belts reduce the risk of fatal injury by 45%.",
        icon: Heart,
        gradient: "from-rose-500 to-pink-600",
    },
    {
        id: "helmet",
        title: "Use Helmet",
        description:
            "Helmets reduce the risk of head injury by 69%. Always wear a certified helmet while riding.",
        icon: HardHat,
        gradient: "from-amber-500 to-orange-600",
    },
    {
        id: "no-phone",
        title: "Avoid Mobile Phone",
        description:
            "Using a phone while driving increases accident risk by 4x. Keep your focus on the road.",
        icon: Smartphone,
        gradient: "from-blue-500 to-indigo-600",
    },
    {
        id: "speed-limit",
        title: "Maintain Speed Limit",
        description:
            "Speed is a factor in 30% of all fatal crashes. Observe posted speed limits at all times.",
        icon: Gauge,
        gradient: "from-cyan-500 to-teal-600",
    },
    {
        id: "traffic-signals",
        title: "Follow Traffic Signals",
        description:
            "Running red lights causes 25% of intersection crashes. Always obey traffic signals.",
        icon: TrafficCone,
        gradient: "from-green-500 to-emerald-600",
    },
    {
        id: "emergency-lane",
        title: "Emergency Lane Rules",
        description:
            "Keep emergency lanes clear for first responders. Blocking them can cost lives.",
        icon: AlertTriangle,
        gradient: "from-red-500 to-rose-600",
    },
    {
        id: "night-driving",
        title: "Night Driving Tips",
        description:
            "Use headlights, reduce speed, and stay alert. Fatal crashes are 3x more likely at night.",
        icon: Moon,
        gradient: "from-purple-500 to-violet-600",
    },
];

// ────────── Emergency Contacts ──────────
export const EMERGENCY_CONTACTS = [
    {
        id: "ambulance",
        title: "Ambulance",
        number: "102",
        description: "Medical emergency response",
        icon: Ambulance,
        color: "#ef4444",
        gradient: "from-red-500 to-rose-600",
    },
    {
        id: "police",
        title: "Police",
        number: "100",
        description: "Law enforcement & traffic police",
        icon: Shield,
        color: "#3b82f6",
        gradient: "from-blue-500 to-indigo-600",
    },
    {
        id: "fire",
        title: "Fire Brigade",
        number: "101",
        description: "Fire & rescue services",
        icon: Flame,
        color: "#f97316",
        gradient: "from-orange-500 to-amber-600",
    },
    {
        id: "helpline",
        title: "Emergency Helpline",
        number: "112",
        description: "Universal emergency number",
        icon: Phone,
        color: "#22c55e",
        gradient: "from-green-500 to-emerald-600",
    },
    {
        id: "hospital",
        title: "Nearby Hospital",
        number: "108",
        description: "Nearest hospital finder",
        icon: Hospital,
        color: "#8b5cf6",
        gradient: "from-purple-500 to-violet-600",
    },
];
