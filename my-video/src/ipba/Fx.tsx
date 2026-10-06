import type React from "react";
import {
  AbsoluteFill,
  Easing,
  interpolate,
  random,
  useCurrentFrame,
} from "remotion";
import { BLACK, clamp, font, YELLOW } from "./theme";

// Decaying camera shake after each hit frame.
export const useShake = (hits: readonly number[], strength = 22) => {
  const frame = useCurrentFrame();
  let x = 0;
  let y = 0;
  for (const h of hits) {
    const d = frame - h;
    if (d >= 0 && d < 14) {
      const k = strength * Math.exp(-d / 4);
      x += (random(`sx${h}-${d}`) - 0.5) * 2 * k;
      y += (random(`sy${h}-${d}`) - 0.5) * 2 * k;
    }
  }
  return `${x}px ${y}px`;
};

// Big word that slams into place: oversized + blurred -> crisp.
export const Slam: React.FC<{
  readonly at: number;
  readonly size?: number;
  readonly color?: string;
  readonly style?: React.CSSProperties;
  readonly children: React.ReactNode;
}> = ({ at, size = 200, color = "white", style, children }) => {
  const frame = useCurrentFrame();
  return (
    <div
      style={{
        fontFamily: font,
        fontWeight: 800,
        fontSize: size,
        letterSpacing: -size * 0.04,
        lineHeight: 0.95,
        color,
        textAlign: "center",
        opacity: interpolate(frame, [at, at + 2], [0, 1], clamp),
        scale: interpolate(frame, [at, at + 7, at + 11], [1.9, 0.94, 1], {
          ...clamp,
          easing: Easing.bezier(0.2, 0.9, 0.3, 1),
        }),
        filter: `blur(${interpolate(frame, [at, at + 6], [14, 0], clamp)}px)`,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

// Yellow pill label.
export const Chip: React.FC<{
  readonly at: number;
  readonly children: React.ReactNode;
  readonly invert?: boolean;
}> = ({ at, children, invert }) => {
  const frame = useCurrentFrame();
  return (
    <div
      style={{
        padding: "20px 48px",
        borderRadius: 999,
        backgroundColor: invert ? BLACK : YELLOW,
        color: invert ? YELLOW : BLACK,
        fontFamily: font,
        fontWeight: 800,
        fontSize: 78,
        letterSpacing: -2,
        whiteSpace: "nowrap",
        border: invert ? `4px solid ${YELLOW}` : "4px solid transparent",
        boxShadow: `0 0 60px ${invert ? "rgba(0,0,0,0.5)" : "rgba(236,217,45,0.45)"}`,
        opacity: interpolate(frame, [at, at + 2], [0, 1], clamp),
        scale: interpolate(frame, [at, at + 6, at + 10], [0.3, 1.12, 1], {
          ...clamp,
          easing: Easing.bezier(0.34, 1.56, 0.64, 1),
        }),
        rotate: `${interpolate(frame, [at, at + 10], [-8, 0], clamp)}deg`,
      }}
    >
      {children}
    </div>
  );
};

// Animated background: black with a drifting yellow glow and a perspective grid.
export const Background: React.FC<{ readonly tint?: string }> = ({
  tint = BLACK,
}) => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ backgroundColor: tint, overflow: "hidden" }}>
      <AbsoluteFill
        style={{
          background: `radial-gradient(circle at ${50 + Math.sin(frame / 50) * 22}% ${40 + Math.cos(frame / 70) * 14}%, rgba(236,217,45,0.28), rgba(0,0,0,0) 55%)`,
        }}
      />
      <AbsoluteFill
        style={{
          top: "55%",
          backgroundImage:
            "linear-gradient(rgba(236,217,45,0.18) 2px, transparent 2px), linear-gradient(90deg, rgba(236,217,45,0.18) 2px, transparent 2px)",
          backgroundSize: "90px 90px",
          backgroundPosition: `0px ${(frame * 3) % 90}px`,
          transform: "perspective(600px) rotateX(62deg)",
          transformOrigin: "50% 0%",
          maskImage: "linear-gradient(to bottom, transparent, black 40%)",
        }}
      />
    </AbsoluteFill>
  );
};

// Short white flash on cuts.
export const Flash: React.FC<{ readonly color?: string }> = ({
  color = "white",
}) => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill
      style={{
        backgroundColor: color,
        opacity: interpolate(frame, [0, 2, 10], [0.95, 0.8, 0], clamp),
        pointerEvents: "none",
      }}
    />
  );
};

// Expanding rings from the center (shockwave on big hits).
export const Shockwave: React.FC<{
  readonly at: number;
  readonly y?: number;
}> = ({ at, y = 860 }) => {
  const frame = useCurrentFrame();
  return (
    <>
      {[0, 6, 12].map((delay) => {
        const d = frame - at - delay;
        return (
          <div
            key={delay}
            style={{
              position: "absolute",
              left: 540,
              top: y,
              width: 200,
              height: 200,
              marginLeft: -100,
              marginTop: -100,
              borderRadius: "50%",
              border: `${interpolate(d, [0, 30], [16, 2], clamp)}px solid ${YELLOW}`,
              scale: interpolate(d, [0, 30], [0.5, 6], {
                ...clamp,
                easing: Easing.out(Easing.cubic),
              }),
              opacity: d < 0 ? 0 : interpolate(d, [0, 30], [0.9, 0], clamp),
            }}
          />
        );
      })}
    </>
  );
};

// Burst of yellow particles.
export const Particles: React.FC<{
  readonly at: number;
  readonly y?: number;
  readonly count?: number;
}> = ({ at, y = 860, count = 36 }) => {
  const frame = useCurrentFrame();
  const d = frame - at;
  if (d < 0 || d > 50) {
    return null;
  }
  return (
    <>
      {new Array(count).fill(0).map((_, i) => {
        const a = random(`pa${at}-${i}`) * Math.PI * 2;
        const v = 14 + random(`pv${at}-${i}`) * 26;
        const dist = v * d * Math.exp(-d / 30);
        const s = 8 + random(`ps${at}-${i}`) * 16;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: 540 + Math.cos(a) * dist,
              top: y + Math.sin(a) * dist + d * d * 0.08,
              width: s,
              height: s,
              borderRadius: i % 3 === 0 ? 2 : "50%",
              backgroundColor: i % 4 === 0 ? "white" : YELLOW,
              opacity: interpolate(d, [30, 50], [1, 0], clamp),
            }}
          />
        );
      })}
    </>
  );
};
