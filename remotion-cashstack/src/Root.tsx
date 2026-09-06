import "./index.css";
import { Composition } from "remotion";
import {
  InsigniasDemo,
  INSIGNIAS_DURATION,
} from "./compositions/InsigniasDemo";
import { SettlingDemo, SETTLING_DURATION } from "./compositions/SettlingDemo";
import { FPS, HEIGHT, WIDTH } from "./theme";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="SettlingDemo"
        component={SettlingDemo}
        durationInFrames={SETTLING_DURATION}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />
      <Composition
        id="InsigniasDemo"
        component={InsigniasDemo}
        durationInFrames={INSIGNIAS_DURATION}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />
    </>
  );
};
