import { AbsoluteFill, Audio, Sequence, interpolate, staticFile, useCurrentFrame } from "remotion";
import { Background } from "./components/Background";
import { Intro } from "./scenes/Intro";
import { Outro } from "./scenes/Outro";
import { FADE, Tour } from "./scenes/Tour";

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" };

const INTRO = 105;
const OUTRO = 150;

// Recordings in public/clips (made by `npm run record`). `from` skips the first frames of a clip and
// `duration` is how long it is shown, in frames at 30 fps; neighbouring clips crossfade over FADE frames.
const CLIPS = [
    { clip: "home.mp4", from: 15, duration: 270, path: "/", label: "Home", title: "Intelligent traffic management for smarter cities" },
    { clip: "live-traffic.mp4", from: 0, duration: 290, path: "/live-traffic", label: "Live Traffic", title: "Animated vehicles and signals on a simulated smart grid" },
    { clip: "theme.mp4", from: 10, duration: 180, path: "/live-traffic", label: "Light & Dark", title: "Every map and chart adapts to the theme" },
    { clip: "route.mp4", from: 10, duration: 460, path: "/route-suggestion", label: "Route Suggestion", title: "Compare routes across Karachi by time, traffic and safety" },
    { clip: "safety.mp4", from: 6, duration: 180, path: "/road-safety", label: "Road Safety", title: "Guidelines and impact stats for every road user" },
    { clip: "emergency.mp4", from: 0, duration: 176, path: "/emergency", label: "Emergency SOS", title: "One tap opens quick-dial emergency contacts" },
];

let cursor = 0;
const TOUR_SCENES = CLIPS.map((c, i) => {
    const scene = { ...c, start: cursor };
    cursor += c.duration - (i < CLIPS.length - 1 ? FADE : 0);
    return scene;
});
const TOUR = cursor;
const TOUR_START = INTRO - FADE;
const OUTRO_START = TOUR_START + TOUR - FADE;

export const DURATION = OUTRO_START + OUTRO;

const FadeOut = ({ duration, children }) => {
    const frame = useCurrentFrame();
    return <AbsoluteFill style={{ opacity: interpolate(frame, [duration - FADE, duration], [1, 0], clamp) }}>{children}</AbsoluteFill>;
};

const FadeIn = ({ children }) => {
    const frame = useCurrentFrame();
    return <AbsoluteFill style={{ opacity: interpolate(frame, [0, FADE], [0, 1], clamp) }}>{children}</AbsoluteFill>;
};

export const SmartTrafficDemo = () => (
    <AbsoluteFill>
        <Background />
        <Audio
            src={staticFile("music.mp3")}
            volume={(f) => interpolate(f, [0, 20, DURATION - 60, DURATION], [0, 0.55, 0.55, 0], clamp)}
        />
        <Sequence durationInFrames={INTRO}>
            <FadeOut duration={INTRO}>
                <Intro />
            </FadeOut>
        </Sequence>
        <Sequence from={TOUR_START} durationInFrames={TOUR}>
            <Tour scenes={TOUR_SCENES} duration={TOUR} />
        </Sequence>
        <Sequence from={OUTRO_START} durationInFrames={OUTRO}>
            <FadeIn>
                <Outro />
            </FadeIn>
        </Sequence>
    </AbsoluteFill>
);
