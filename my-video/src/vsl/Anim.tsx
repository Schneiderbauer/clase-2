import type React from "react";
import {
  AbsoluteFill,
  Easing,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { BG, clamp, fontFamily, GREEN } from "./theme";

const OUT = Easing.bezier(0.16, 1, 0.3, 1);

/** Fades and slides children up into place starting at `at`. */
export const Rise: React.FC<{
  readonly at: number;
  readonly children: React.ReactNode;
  readonly style?: React.CSSProperties;
  readonly distance?: number;
}> = ({ at, children, style, distance = 40 }) => {
  const frame = useCurrentFrame();
  const p = interpolate(frame, [at, at + 14], [0, 1], { ...clamp, easing: OUT });
  return (
    <div style={{ opacity: p, translate: `0px ${(1 - p) * distance}px`, ...style }}>
      {children}
    </div>
  );
};

/** Springy scale-in, for numbers and badges. */
export const Pop: React.FC<{
  readonly at: number;
  readonly children: React.ReactNode;
  readonly style?: React.CSSProperties;
}> = ({ at, children, style }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = spring({ frame: frame - at, fps, config: { damping: 12, stiffness: 160 } });
  return (
    <div style={{ opacity: Math.min(1, p * 2), scale: String(0.6 + 0.4 * p), ...style }}>
      {children}
    </div>
  );
};

/** Number that counts up from 0 between `from` and `to` frames. */
export const CountUp: React.FC<{
  readonly value: number;
  readonly from: number;
  readonly to: number;
  readonly prefix?: string;
}> = ({ value, from, to, prefix = "" }) => {
  const frame = useCurrentFrame();
  const n = interpolate(frame, [from, to], [0, value], {
    ...clamp,
    easing: Easing.out(Easing.cubic),
  });
  return (
    <span style={{ fontVariantNumeric: "tabular-nums" }}>
      {prefix}
      {Math.round(n).toLocaleString("es-AR")}
    </span>
  );
};

/** Dark stage with a soft green glow, shared by every motion graphics scene. */
export const Stage: React.FC<{ readonly children: React.ReactNode }> = ({ children }) => {
  const frame = useCurrentFrame();
  const drift = Math.sin(frame / 40) * 60;
  return (
    <AbsoluteFill style={{ backgroundColor: BG, fontFamily, overflow: "hidden" }}>
      <div
        style={{
          position: "absolute",
          width: 1400,
          height: 1400,
          left: 260 + drift,
          top: -500,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${GREEN}22 0%, transparent 65%)`,
        }}
      />
      <AbsoluteFill>{children}</AbsoluteFill>
    </AbsoluteFill>
  );
};

/** Short white flash used on hard cuts between face and graphics. */
export const CutFlash: React.FC<{ readonly length?: number }> = ({ length = 6 }) => {
  const frame = useCurrentFrame();
  const o = interpolate(frame, [0, length], [0.35, 0], clamp);
  return <AbsoluteFill style={{ backgroundColor: "white", opacity: o, pointerEvents: "none" }} />;
};
