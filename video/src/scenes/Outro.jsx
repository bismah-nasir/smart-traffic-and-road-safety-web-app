import { AbsoluteFill, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { Logo } from "../components/Logo";
import { bodyFont, colors, gradient, LIVE_URL, REPO_URL } from "../theme";

const tech = ["React 19", "Vite", "Tailwind CSS v4", "Framer Motion", "React Router"];

export const Outro = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();
    const rise = (delay) => {
        const s = spring({ frame: frame - delay, fps, config: { damping: 200 } });
        return { opacity: s, transform: `translateY(${(1 - s) * 30}px)` };
    };

    return (
        <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", gap: 44, fontFamily: bodyFont }}>
            <div style={rise(0)}>
                <Logo size={0.9} />
            </div>
            <div style={{ ...rise(10), display: "flex", gap: 14 }}>
                {tech.map((t) => (
                    <span
                        key={t}
                        style={{
                            padding: "10px 22px",
                            borderRadius: 999,
                            background: colors.glass,
                            border: "1.5px solid rgba(34,211,238,0.22)",
                            color: colors.text,
                            fontSize: 24,
                            fontWeight: 500,
                        }}
                    >
                        {t}
                    </span>
                ))}
            </div>
            <div
                style={{
                    ...rise(20),
                    padding: "18px 40px",
                    borderRadius: 16,
                    background: gradient,
                    color: "#fff",
                    fontSize: 34,
                    fontWeight: 600,
                    boxShadow: "0 20px 50px rgba(6,182,212,0.35)",
                }}
            >
                Try it live: {LIVE_URL}
            </div>
            <div style={{ ...rise(28), fontSize: 26, color: colors.textSecondary }}>{REPO_URL}</div>
        </AbsoluteFill>
    );
};
