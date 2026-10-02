import type React from "react";
import { Easing, interpolate, useCurrentFrame } from "remotion";
import { clamp } from "./theme";

// Text that drifts up out of a soft blur.
export const SoftText: React.FC<{
  readonly at: number;
  readonly style?: React.CSSProperties;
  readonly children: React.ReactNode;
}> = ({ at, style, children }) => {
  const frame = useCurrentFrame();
  return (
    <div
      style={{
        opacity: interpolate(frame, [at, at + 12], [0, 1], clamp),
        filter: `blur(${interpolate(frame, [at, at + 12], [10, 0], clamp)}px)`,
        translate: interpolate(frame, [at, at + 16], ["0px 24px", "0px 0px"], {
          ...clamp,
          easing: Easing.bezier(0.16, 1, 0.3, 1),
        }),
        ...style,
      }}
    >
      {children}
    </div>
  );
};
