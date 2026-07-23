# 🚥 SmartTraffic — Intelligent Urban Traffic & Road Safety Platform

A futuristic, high-fidelity, and highly interactive smart city web application built with **React 19**, **Vite**, **Tailwind CSS v4**, and **Framer Motion**. The application showcases an interactive simulation of real-time traffic flow control, route optimization dashboards, safety guidelines, and a rapid emergency response dashboard.

---

## 🚀 Key Features

### 1. 🗺️ Live Traffic Monitor
* **Simulated Smart Grid**: Interactive SVG map showing real-time traffic flows with direction-aware vehicle travel (animated Lucide `Car` icons rotating based on path travel direction).
* **Dynamic Signals**: Color-changing traffic lights cycling reactively via automated intervals (Green, Yellow, Red).
* **Google Maps View**: Instant toggle switcher to pull live external map embeds.
* **Weekly Traffic Volume**: Interactive animated analytics chart detailing traffic peaks across the week.

### 2. ⚡ Interactive AI Route Suggestion (Simulation)
* **Local Karachi Dataset**: Localized navigation options covering major Karachi landmarks (Clifton, Saddar, DHA, Shahrah-e-Faisal, Bahadurabad, Karsaz, Karachi Cantt, etc.).
* **Path-Drawing Simulation**: Animated path-drawing SVG maps illustrating optimized routes. Clicking different routes dynamically updates the active path, changes vehicle traffic paths, and highlights corresponding cards.
* **Predictive Metrics UI**: Simulates safety ring scores and animated traffic density bars, showing how a real AI routing engine organizes routes.

### 3. 🛡️ Road Safety Guidelines
* **Interactive Tip Grid**: Premium card grid hosting crucial guidelines (helmet usage, speed limits, lane discipline) with micro-interactions.
* **Animated Counter Grid**: Counter system highlighting key road safety impact statistics.

### 4. 🚨 Emergency SOS Dashboard
* **Siren SOS Trigger**: Ripple-pulsing SOS button that prompts a confirmation dialer popup.
* **Direct Dial Contacts**: Fast quick-call directory for Ambulance, Fire Brigade, Traffic Police, Highway Patrol, and Rescue services.

### 5. 🎨 Design & Aesthetic Excellence
* **Dynamic Theme Switcher**: Instant Light & Dark mode support toggling body classes and stylesheet variables.
* **Adaptive SVGs**: Interactive maps automatically adjust their grids, road paths, text labels, and building blocks to maintain high legibility in both Light and Dark themes.
* **Premium Glassmorphism**: Tailored CSS gradients, backdrop blurs, and animated borders that scale gracefully.

---

## 🛠️ Technology Stack

* **Core Framework**: React 19 (equipped with **React Compiler Preset** for automated optimization; no manual `useCallback`/`useMemo` overrides needed)
* **Build System**: Vite 8+ (ultrafast ESM compiler)
* **Styling Engine**: Tailwind CSS v4 (incorporating next-gen CSS variables under `@theme` and dynamic overrides)
* **Animations**: Framer Motion (handling page transitions, card entry, and keyframe paths)
* **Icons**: Lucide React

---

## 💻 Getting Started

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed (v18+ recommended).

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/bismah-nasir/smart-traffic-and-road-safety-web-app.git
   cd smart-traffic-and-road-safety-web-app
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

### Development Server
Run the local dev server:
```bash
npm run dev
```
Open your browser and navigate to `http://localhost:5173`.

### Production Build
To build and optimize the application for deployment:
```bash
npm run build
```
The output files will be compiled inside the `dist/` directory.

---

## 📂 Project Structure

```
├── public/                 # Static assets (Gifs, logos)
├── src/
│   ├── components/         # Shared UI components (Navbar, Footer, GlassCard, etc.)
│   ├── context/            # React State Contexts (ThemeContext)
│   ├── pages/              # Main Route Pages (Home, LiveTraffic, RouteSuggestion, etc.)
│   ├── utils/              # Animation declarations and constants
│   ├── App.jsx             # Main Entry Router
│   ├── index.css           # Global custom stylesheet & design system
│   └── main.jsx            # DOM Renderer
├── package.json
└── vite.config.js
```
