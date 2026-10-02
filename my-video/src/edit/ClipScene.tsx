import { Video } from "@remotion/media";
import type React from "react";
import {
  AbsoluteFill,
  Easing,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

type ClipSceneProps = {
  readonly src: string;
  readonly trimBefore: number;
  readonly clipDuration: number;
  /** Frame (relative to the clip) where the zoom punch-in happens. */
  readonly punchAt: number;
};

// A talking-head clip with a warm grade, a slow push-in, a jump-cut style
// punch-in for emphasis, and a vignette.
export const ClipScene: React.FC<ClipSceneProps> = ({
  src,
  trimBefore,
  clipDuration,
  punchAt,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill style={{ backgroundColor: "black", overflow: "hidden" }}>
      <Video
        name="Clip"
        src={src}
        trimBefore={trimBefore}
        premountFor={fps}
        objectFit="cover"
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          transformOrigin: "50% 40%",
          filter: "contrast(1.08) saturate(1.12) sepia(0.08) brightness(1.02)",
          scale: interpolate(
            frame,
            [0, punchAt, punchAt + 5, clipDuration],
            [1, 1.03, 1.28, 1.32],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.22, 1, 0.36, 1),
              output: "perceptual-scale",
            },
          ),
        }}
      />
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(ellipse at 50% 42%, rgba(0,0,0,0) 55%, rgba(30,15,10,0.45) 100%)",
        }}
      />
    </AbsoluteFill>
  );
};
