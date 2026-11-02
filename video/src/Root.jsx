import { Composition, Still } from "remotion";
import { SmartTrafficPoster } from "./poster/Poster";
import { DURATION, SmartTrafficDemo } from "./Video";
import { FPS, HEIGHT, WIDTH } from "./theme";

export const RemotionRoot = () => (
    <>
        <Composition id="SmartTrafficDemo" component={SmartTrafficDemo} durationInFrames={DURATION} fps={FPS} width={WIDTH} height={HEIGHT} />
        <Still id="SmartTrafficPoster" component={SmartTrafficPoster} width={WIDTH} height={HEIGHT} />
    </>
);
