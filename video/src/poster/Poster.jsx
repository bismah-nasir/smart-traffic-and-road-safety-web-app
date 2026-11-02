import { AbsoluteFill, Img, staticFile } from "remotion";
import { Background } from "../components/Background";
import { BAR_HEIGHT, BrowserFrame } from "../components/BrowserFrame";
import { bodyFont, colors, headingFont, LIVE_URL } from "../theme";

// Screenshots in public/poster/, taken by `npm run record -- poster`:
// live-traffic.png is the desktop Live Traffic section at 2x, road-safety-mobile.png an iPhone 16 screen at 3x.
const DESKTOP_SHOT = { width: 2336, height: 2394 };
const PHONE = { width: 393, height: 852 }; // iPhone 16 screen in points

const BROWSER_WIDTH = 820;
const BROWSER_HEIGHT = Math.round((BROWSER_WIDTH * DESKTOP_SHOT.height) / DESKTOP_SHOT.width) + BAR_HEIGHT;

const PHONE_SCREEN_WIDTH = 350;
const pt = PHONE_SCREEN_WIDTH / PHONE.width; // poster pixels per iPhone point
const BEZEL = 12;

const Chip = ({ color, children }) => (
    <span
        style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            padding: "10px 22px",
            borderRadius: 999,
            background: colors.glass,
            border: "1.5px solid rgba(34,211,238,0.22)",
            color: colors.text,
            fontSize: 24,
            fontWeight: 600,
        }}
    >
        <span style={{ width: 10, height: 10, borderRadius: 5, background: color, boxShadow: `0 0 10px ${color}` }} />
        {children}
    </span>
);

// iPhone 16: black bezel, Dynamic Island and a status bar above the page (its safe area is 54pt tall).
const Phone = ({ src, style }) => (
    <div
        style={{
            padding: BEZEL,
            borderRadius: 55 * pt + BEZEL,
            background: "#05070c",
            border: "2px solid #2a3140",
            boxShadow: "0 50px 120px rgba(0,0,0,0.7), 0 0 60px rgba(6,182,212,0.25)",
            ...style,
        }}
    >
        <div
            style={{
                position: "relative",
                width: PHONE.width * pt,
                height: PHONE.height * pt,
                borderRadius: 55 * pt,
                overflow: "hidden",
                background: colors.navy950,
            }}
        >
            <Img src={staticFile(src)} style={{ position: "absolute", top: 54 * pt, width: "100%" }} />
            <div
                style={{
                    position: "absolute",
                    inset: "0 0 auto 0",
                    height: 54 * pt,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: `0 ${30 * pt}px`,
                    background: colors.navy950,
                    color: "#fff",
                    fontFamily: bodyFont,
                    fontSize: 16 * pt,
                    fontWeight: 600,
                }}
            >
                <span style={{ width: 54 * pt, textAlign: "center" }}>9:41</span>
                <span style={{ display: "flex", alignItems: "center", gap: 5 * pt }}>
                    {[5, 7, 9, 11].map((h) => (
                        <span key={h} style={{ width: 3 * pt, height: h * pt, borderRadius: 1, background: "#fff" }} />
                    ))}
                    <span style={{ marginLeft: 4 * pt, width: 24 * pt, height: 12 * pt, borderRadius: 4 * pt, border: `${1.2 * pt}px solid rgba(255,255,255,0.6)`, padding: 1.5 * pt, display: "flex" }}>
                        <span style={{ flex: 1, borderRadius: 2 * pt, background: "#fff" }} />
                    </span>
                </span>
            </div>
            <div
                style={{
                    position: "absolute",
                    top: 11 * pt,
                    left: "50%",
                    width: 125 * pt,
                    height: 37 * pt,
                    marginLeft: (-125 * pt) / 2,
                    borderRadius: 999,
                    background: "#000",
                }}
            />
        </div>
    </div>
);

/** Thumbnail shown before the demo video plays. */
export const SmartTrafficPoster = () => (
    <AbsoluteFill style={{ fontFamily: bodyFont, color: colors.text }}>
        <Background />
        <AbsoluteFill style={{ flexDirection: "row", alignItems: "center", padding: "0 0 0 110px" }}>
            <div style={{ width: 700, display: "flex", flexDirection: "column", gap: 34, flexShrink: 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
                    <Img
                        src={staticFile("logo.png")}
                        style={{ width: 100, height: 100, filter: "drop-shadow(0 0 36px rgba(6,182,212,0.45))" }}
                    />
                    <div style={{ fontFamily: headingFont, fontSize: 86, fontWeight: 800, letterSpacing: -3 }}>
                        Smart
                        <span style={{ background: `linear-gradient(90deg, ${colors.cyanLight}, ${colors.electric})`, backgroundClip: "text", WebkitBackgroundClip: "text", color: "transparent" }}>
                            Traffic
                        </span>
                    </div>
                </div>
                <div style={{ fontFamily: headingFont, fontSize: 52, fontWeight: 700, lineHeight: 1.15, letterSpacing: -1.5 }}>
                    Live traffic, smart routes &amp;{" "}
                    <span style={{ background: `linear-gradient(90deg, ${colors.green}, ${colors.cyanLight})`, backgroundClip: "text", WebkitBackgroundClip: "text", color: "transparent", whiteSpace: "nowrap" }}>
                        safer roads
                    </span>
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
                    <Chip color={colors.green}>Smart signal grid</Chip>
                    <Chip color={colors.cyan}>Karachi route planner</Chip>
                    <Chip color={colors.yellow}>Safety guidelines</Chip>
                    <Chip color={colors.red}>Emergency SOS</Chip>
                </div>
                <div style={{ fontSize: 26, fontWeight: 500, color: colors.textSecondary }}>{LIVE_URL}</div>
            </div>

            <div style={{ position: "relative", flex: 1, height: "100%" }}>
                <div
                    style={{
                        position: "absolute",
                        left: 40,
                        top: (1080 - BROWSER_HEIGHT) / 2,
                        transform: "perspective(2400px) rotateY(-9deg) rotateX(2deg)",
                        transformOrigin: "left center",
                    }}
                >
                    <BrowserFrame width={BROWSER_WIDTH} height={BROWSER_HEIGHT} url={`${LIVE_URL}/live-traffic`}>
                        <Img src={staticFile("poster/live-traffic.png")} style={{ width: "100%", height: "100%" }} />
                    </BrowserFrame>
                </div>
                <Phone src="poster/road-safety-mobile.png" style={{ position: "absolute", right: 70, top: 170 }} />
            </div>
        </AbsoluteFill>
    </AbsoluteFill>
);
