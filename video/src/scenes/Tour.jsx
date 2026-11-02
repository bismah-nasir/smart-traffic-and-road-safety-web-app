import { AbsoluteFill, OffthreadVideo, Sequence, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { BAR_HEIGHT, BrowserFrame } from "../components/BrowserFrame";
import { bodyFont, colors, headingFont, LIVE_URL } from "../theme";

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" };
export const FADE = 15;

const FRAME_WIDTH = 1440;
const FRAME_HEIGHT = Math.round((FRAME_WIDTH * 9) / 16) + BAR_HEIGHT;

// Chapter label and one-line caption above the browser window.
const Caption = ({ label, title, duration }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();
    const enter = spring({ frame: frame - 4, fps, config: { damping: 200 } });
    const exit = interpolate(frame, [duration - FADE, duration], [1, 0], clamp);
    return (
        <div
            style={{
                position: "absolute",
                top: 44,
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 14,
                opacity: enter * exit,
                transform: `translateY(${(1 - enter) * 18}px)`,
            }}
        >
            <span
                style={{
                    padding: "6px 18px",
                    borderRadius: 999,
                    border: "1.5px solid rgba(6,182,212,0.35)",
                    background: "rgba(6,182,212,0.10)",
                    color: colors.cyanLight,
                    fontFamily: bodyFont,
                    fontSize: 18,
                    fontWeight: 600,
                    letterSpacing: 2,
                    textTransform: "uppercase",
                }}
            >
                {label}
            </span>
            <div style={{ fontFamily: headingFont, fontSize: 46, fontWeight: 700, letterSpacing: -1, color: colors.text }}>{title}</div>
        </div>
    );
};

// The browser window stays in place while the recordings crossfade inside it.
// scenes: [{ clip, from, duration, start, label, title, path }] with `start` relative to this scene.
export const Tour = ({ scenes, duration }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();
    const enter = spring({ frame, fps, config: { damping: 200 }, durationInFrames: 30 });
    const exit = interpolate(frame, [duration - FADE, duration], [1, 0], clamp);
    const current = [...scenes].reverse().find((s) => s.start <= frame) ?? scenes[0];

    return (
        <AbsoluteFill style={{ opacity: exit }}>
            {scenes.map((s) => (
                <Sequence key={s.clip} from={s.start} durationInFrames={s.duration} layout="none">
                    <Caption label={s.label} title={s.title} duration={s.duration} />
                </Sequence>
            ))}
            <div
                style={{
                    position: "absolute",
                    left: (1920 - FRAME_WIDTH) / 2,
                    top: 1080 - FRAME_HEIGHT - 40,
                    opacity: enter,
                    transform: `translateY(${(1 - enter) * 80}px) scale(${0.96 + 0.04 * enter})`,
                }}
            >
                <BrowserFrame width={FRAME_WIDTH} height={FRAME_HEIGHT} url={LIVE_URL + current.path}>
                    {scenes.map((s, i) => (
                        <Sequence key={s.clip} from={s.start} durationInFrames={s.duration} layout="none">
                            <ClipLayer clip={s.clip} from={s.from} duration={s.duration} fadeIn={i > 0} />
                        </Sequence>
                    ))}
                </BrowserFrame>
            </div>
        </AbsoluteFill>
    );
};

const ClipLayer = ({ clip, from, duration, fadeIn }) => {
    const frame = useCurrentFrame();
    const opacity = fadeIn ? interpolate(frame, [0, FADE], [0, 1], clamp) : 1;
    return (
        <AbsoluteFill style={{ opacity }}>
            <OffthreadVideo src={staticFile(`clips/${clip}`)} startFrom={from} endAt={from + duration} muted style={{ width: "100%", height: "100%" }} />
        </AbsoluteFill>
    );
};
