import { Img, staticFile } from "remotion";
import { colors, headingFont } from "../theme";

// The app's lightning mark (public/logo.png) with the "SmartTraffic" wordmark.
export const Logo = ({ size = 1 }) => (
    <div style={{ display: "flex", alignItems: "center", gap: 28 * size }}>
        <Img
            src={staticFile("logo.png")}
            style={{ width: 120 * size, height: 120 * size, filter: `drop-shadow(0 0 ${36 * size}px rgba(6,182,212,0.45))` }}
        />
        <div style={{ fontFamily: headingFont, fontWeight: 800, fontSize: 112 * size, letterSpacing: -3 * size, color: colors.text }}>
            Smart
            <span style={{ background: `linear-gradient(90deg, ${colors.cyanLight}, ${colors.electric})`, backgroundClip: "text", WebkitBackgroundClip: "text", color: "transparent" }}>
                Traffic
            </span>
        </div>
    </div>
);
