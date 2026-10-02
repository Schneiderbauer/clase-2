import { Video } from "@remotion/media";
import type React from "react";
import {
  AbsoluteFill,
  Easing,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

type SpeakerProps = {
  readonly src: string;
  readonly trimBefore: number;
  readonly baseScale: number;
  /** Frames (relative to this take) where a quick punch-in happens. */
  readonly punches?: readonly number[];
};

// Natural look like the reference; alternating framing hides the jump cuts.
export const Speaker: React.FC<SpeakerProps> = ({
  src,
  trimBefore,
  baseScale,
  punches = [],
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const punch = punches.reduce(
    (acc, p) =>
      acc +
      interpolate(frame, [p, p + 4, p + 40, p + 52], [0, 0.09, 0.09, 0], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
        easing: Easing.bezier(0.22, 1, 0.36, 1),
      }),
    0,
  );

  return (
    <AbsoluteFill style={{ backgroundColor: "black", overflow: "hidden" }}>
      <Video
        name="Speaker"
        src={src}
        trimBefore={trimBefore}
        premountFor={fps}
        objectFit="cover"
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          transformOrigin: "50% 42%",
          filter: "contrast(1.04) saturate(1.06) brightness(1.02)",
          scale: baseScale + punch,
        }}
      />
    </AbsoluteFill>
  );
};
