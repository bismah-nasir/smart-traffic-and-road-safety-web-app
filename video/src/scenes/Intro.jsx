import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { Logo } from "../components/Logo";
import { bodyFont, colors } from "../theme";

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" };

// Traffic light that steps red → yellow → green as the title lands.
const Signal = ({ frame }) => {
    const lit = frame < 22 ? 0 : frame < 40 ? 1 : 2;
    return (
        <div style={{ display: "flex", gap: 14, padding: "12px 18px", borderRadius: 999, background: colors.glass, border: `1.5px solid ${colors.border}` }}>
            {[colors.red, colors.yellow, colors.green].map((c, i) => (
                <span
                    key={c}
                    style={{
                        width: 18,
                        height: 18,
                        borderRadius: 9,
                        background: c,
                        opacity: i === lit ? 1 : 0.18,
                        boxShadow: i === lit ? `0 0 18px ${c}` : "none",
                    }}
                />
            ))}
        </div>
    );
};

export const Intro = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();
    const pop = spring({ frame, fps, config: { damping: 14, mass: 0.8 } });
    const sub = spring({ frame: frame - 18, fps, config: { damping: 200 } });

    return (
        <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", gap: 40 }}>
            <div style={{ opacity: interpolate(frame, [0, 10], [0, 1], clamp) }}>
                <Signal frame={frame} />
            </div>
            <div style={{ transform: `scale(${0.85 + 0.15 * pop})`, opacity: pop }}>
                <Logo size={1.1} />
            </div>
            <div
                style={{
                    fontFamily: bodyFont,
                    fontSize: 38,
                    fontWeight: 500,
                    color: colors.textSecondary,
                    opacity: sub,
                    transform: `translateY(${(1 - sub) * 24}px)`,
                }}
            >
                Smart-city traffic monitoring, routing &amp; road safety
            </div>
        </AbsoluteFill>
    );
};
