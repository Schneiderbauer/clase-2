import type React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { COLORS } from "./theme";

type ProgressBarProps = {
  /** Frame at which the bar is full. */
  readonly endFrame: number;
};

export const ProgressBar: React.FC<ProgressBarProps> = ({ endFrame }) => {
  const frame = useCurrentFrame();

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: 14,
        backgroundColor: "rgba(255,244,232,0.45)",
      }}
    >
      <div
        style={{
          height: "100%",
          backgroundColor: COLORS.accent,
          borderRadius: "0 7px 7px 0",
          width: `${interpolate(frame, [0, endFrame], [0, 100], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })}%`,
        }}
      />
    </div>
  );
};
