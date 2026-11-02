import { AbsoluteFill, useCurrentFrame } from "remotion";
import { colors } from "../theme";

// Light trails gliding along the backdrop, like traffic seen from above.
const trails = [
    { y: 140, speed: 7, len: 260, color: colors.cyan, delay: 0 },
    { y: 330, speed: -5, len: 200, color: colors.electric, delay: 90 },
    { y: 610, speed: 6, len: 300, color: colors.cyanLight, delay: 40 },
    { y: 820, speed: -8, len: 240, color: colors.purple, delay: 140 },
    { y: 980, speed: 5, len: 220, color: colors.cyan, delay: 70 },
];

// Navy backdrop with the app's grid, soft glows and moving light trails.
export const Background = () => {
    const frame = useCurrentFrame();
    return (
        <AbsoluteFill style={{ background: `linear-gradient(160deg, ${colors.navy900} 0%, ${colors.navy950} 70%)` }}>
            <AbsoluteFill
                style={{
                    backgroundImage:
                        "linear-gradient(rgba(6,182,212,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,0.05) 1px, transparent 1px)",
                    backgroundSize: "60px 60px",
                }}
            />
            <AbsoluteFill
                style={{
                    background: `radial-gradient(900px 600px at ${20 + Math.sin(frame / 90) * 4}% 15%, rgba(6,182,212,0.16), transparent 70%),
                        radial-gradient(800px 700px at 85% ${80 + Math.cos(frame / 110) * 4}%, rgba(59,130,246,0.16), transparent 70%),
                        radial-gradient(600px 500px at 70% 10%, rgba(139,92,246,0.10), transparent 70%)`,
                }}
            />
            {trails.map((t, i) => {
                const span = 1920 + t.len * 2;
                const travel = (((frame + t.delay) * Math.abs(t.speed)) % span) - t.len;
                const x = t.speed > 0 ? travel : 1920 - travel - t.len;
                return (
                    <div
                        key={i}
                        style={{
                            position: "absolute",
                            left: x,
                            top: t.y,
                            width: t.len,
                            height: 2,
                            borderRadius: 2,
                            opacity: 0.35,
                            background: `linear-gradient(${t.speed > 0 ? 90 : 270}deg, transparent, ${t.color})`,
                            boxShadow: `0 0 12px ${t.color}`,
                        }}
                    />
                );
            })}
        </AbsoluteFill>
    );
};
