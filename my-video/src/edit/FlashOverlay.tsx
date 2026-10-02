import type React from "react";
import {
  AbsoluteFill,
  Easing,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { COLORS } from "./theme";

// Cut accent: a diagonal light streak that sweeps across the frame,
// peaking in a soft white flash right on the cut.
export const FlashOverlay: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const mid = durationInFrames / 2;

  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      <AbsoluteFill
        style={{
          backgroundColor: COLORS.cream,
          opacity: interpolate(
            frame,
            [mid - 3, mid, mid + 4],
            [0, 0.85, 0],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
          ),
        }}
      />
      <div
        style={{
          position: "absolute",
          top: -400,
          width: 420,
          height: 2800,
          rotate: "18deg",
          background: `linear-gradient(90deg, rgba(255,255,255,0) 0%, ${COLORS.accent}AA 35%, rgba(255,255,255,0.95) 50%, ${COLORS.accent}AA 65%, rgba(255,255,255,0) 100%)`,
          translate: interpolate(
            frame,
            [0, durationInFrames],
            ["-700px 0px", "1500px 0px"],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.45, 0, 0.55, 1),
            },
          ),
        }}
      />
    </AbsoluteFill>
  );
};
