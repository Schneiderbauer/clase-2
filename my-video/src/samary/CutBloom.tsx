import type React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { clamp, PAPER } from "./theme";

// A soft light bloom that hides the cut between two takes.
export const CutBloom: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill
      style={{
        backgroundColor: PAPER,
        opacity: interpolate(frame, [0, 6, 14], [0, 0.7, 0], clamp),
      }}
    />
  );
};
