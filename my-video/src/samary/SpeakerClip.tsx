import { Video } from "@remotion/media";
import type React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

type SpeakerClipProps = {
  readonly src: string;
  readonly trimBefore: number;
  readonly clipDuration: number;
};

// Soft, slightly desaturated warm grade with a very slow push-in.
export const SpeakerClip: React.FC<SpeakerClipProps> = ({
  src,
  trimBefore,
  clipDuration,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

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
          transformOrigin: "50% 38%",
          filter: "contrast(0.94) saturate(0.82) sepia(0.12) brightness(1.03)",
          scale: interpolate(frame, [0, clipDuration], [1.02, 1.09], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            output: "perceptual-scale",
          }),
        }}
      />
    </AbsoluteFill>
  );
};
