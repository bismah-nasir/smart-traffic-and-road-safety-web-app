import { loadFont as loadOutfit } from "@remotion/google-fonts/Outfit";
import { loadFont as loadInter } from "@remotion/google-fonts/Inter";

// The app's fonts: Outfit for headings, Inter for body text.
export const { fontFamily: headingFont } = loadOutfit("normal", {
    weights: ["500", "600", "700", "800"],
    subsets: ["latin"],
});
export const { fontFamily: bodyFont } = loadInter("normal", {
    weights: ["400", "500", "600"],
    subsets: ["latin"],
});

export const FPS = 30;
export const WIDTH = 1920;
export const HEIGHT = 1080;

// Copied from the @theme tokens in src/index.css.
export const colors = {
    navy950: "#040b17",
    navy900: "#081426",
    navy800: "#0c1e38",
    electric: "#3b82f6",
    cyan: "#06b6d4",
    cyanLight: "#22d3ee",
    purple: "#8b5cf6",
    green: "#22c55e",
    yellow: "#eab308",
    red: "#ef4444",
    text: "#f1f5f9",
    textSecondary: "#94a3b8",
    border: "rgba(255,255,255,0.08)",
    glass: "rgba(255,255,255,0.04)",
};

export const gradient = `linear-gradient(90deg, ${colors.cyan}, ${colors.electric})`;

export const LIVE_URL = "smart-traffic-and-road-safety-web.vercel.app";
export const REPO_URL = "github.com/bismah-nasir/smart-traffic-and-road-safety-web-app";
