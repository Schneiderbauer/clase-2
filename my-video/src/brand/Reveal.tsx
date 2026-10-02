import type React from "react";
import { Easing, interpolate, useCurrentFrame } from "remotion";
import { clamp } from "./theme";

type RevealProps = {
  readonly children: React.ReactNode;
  /** Frame (relative to the scene) when the text starts sliding in. */
  readonly at: number;
  readonly style?: React.CSSProperties;
};

// Text that slides up from behind an invisible mask, Apple-keynote style.
export const Reveal: React.FC<RevealProps> = ({ children, at, style }) => {
  const frame = useCurrentFrame();

  return (
    <div style={{ overflow: "hidden", paddingBottom: "0.08em", ...style }}>
      <div
        style={{
          translate: interpolate(frame, [at, at + 16], ["0px 110%", "0px 0%"], {
            ...clamp,
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          }),
        }}
      >
        {children}
      </div>
    </div>
  );
};
