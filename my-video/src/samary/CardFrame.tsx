import type React from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";
import { clamp, PAPER } from "./theme";

type CardFrameProps = {
  readonly length: number;
  readonly fadeIn?: boolean;
  readonly fadeOut?: boolean;
  readonly children: React.ReactNode;
};

// Paper background that dissolves in and out over the speaker.
export const CardFrame: React.FC<CardFrameProps> = ({
  length,
  fadeIn = true,
  fadeOut = true,
  children,
}) => {
  const frame = useCurrentFrame();
  const inOp = fadeIn ? interpolate(frame, [0, 10], [0, 1], clamp) : 1;
  const outOp = fadeOut
    ? interpolate(frame, [length - 10, length], [1, 0], clamp)
    : 1;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: PAPER,
        opacity: Math.min(inOp, outOp),
        scale: fadeIn
          ? interpolate(frame, [0, 14], [1.04, 1], {
              ...clamp,
              easing: Easing.bezier(0.16, 1, 0.3, 1),
              output: "perceptual-scale",
            })
          : 1,
      }}
    >
      {children}
    </AbsoluteFill>
  );
};
