import type React from "react";
import { Easing, interpolate, useCurrentFrame } from "remotion";
import { clamp } from "./theme";

type PopProps = {
  /** Length of the parent sequence, used for the exit animation. */
  readonly dur: number;
  readonly x: number;
  readonly y: number;
  readonly rotate?: number;
  readonly children: React.ReactNode;
};

// Sticker-style entrance (overshooting scale pop + gentle float) and a quick
// shrink-out — the overlay rhythm of the reference edit.
export const Pop: React.FC<PopProps> = ({
  dur,
  x,
  y,
  rotate = 0,
  children,
}) => {
  const frame = useCurrentFrame();
  const scaleIn = interpolate(frame, [0, 6, 10], [0, 1.12, 1], {
    ...clamp,
    easing: Easing.bezier(0.34, 1.56, 0.64, 1),
  });
  const scaleOut = interpolate(frame, [dur - 6, dur], [1, 0], {
    ...clamp,
    easing: Easing.in(Easing.quad),
  });

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        translate: `-50% calc(-50% + ${Math.sin(frame / 9) * 6}px)`,
        rotate: `${rotate + Math.sin(frame / 14) * 1.5}deg`,
        scale: Math.min(scaleIn, scaleOut),
      }}
    >
      {children}
    </div>
  );
};
