import type React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { clamp, INK } from "./theme";

// Heartbeat line drawn across the wall, spiking in sync with the heartbeat
// sound effect (beats get closer together = the heart speeds up).
const BEATS = [1.5, 25, 45, 63, 79, 93]; // frames, relative to this element
const START_X = 70;
const PX_PER_FRAME = 8.6;
const BASE_Y = 360;

const spike = (f: number) =>
  BEATS.reduce((acc, b) => {
    const d = f - b;
    if (d < -1 || d > 4) return acc;
    // small dip, tall spike, deep dip, recovery
    const shape = interpolate(
      d,
      [-1, 0, 0.8, 1.8, 3, 4],
      [0, 14, -150, 70, -20, 0],
      clamp,
    );
    return acc + shape;
  }, 0);

export const Ecg: React.FC = () => {
  const frame = useCurrentFrame();
  const points: string[] = [];
  for (let f = 0; f <= frame; f += 0.25) {
    points.push(`${START_X + f * PX_PER_FRAME},${BASE_Y + spike(f)}`);
  }
  const head = points[points.length - 1]?.split(",").map(Number) ?? [
    START_X,
    BASE_Y,
  ];

  return (
    <svg
      width={1080}
      height={1920}
      style={{
        position: "absolute",
        opacity: interpolate(frame, [96, 112], [0.85, 0], clamp),
      }}
    >
      <polyline
        points={points.join(" ")}
        fill="none"
        stroke={INK}
        strokeWidth={5}
        strokeLinejoin="round"
        strokeLinecap="round"
        opacity={0.75}
      />
      <circle cx={head[0]} cy={head[1]} r={9} fill={INK} />
    </svg>
  );
};
