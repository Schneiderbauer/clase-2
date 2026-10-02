import type React from "react";
import { Easing, interpolate, random, useCurrentFrame } from "remotion";
import { CardFrame } from "./CardFrame";
import { SoftText } from "./SoftText";
import { clamp, INK, MUTED, sans, serif } from "./theme";

const CX = 540;
const CY = 1180;
const R0 = 340;
const R1 = 110;

// Dots = the things in your life. As avoidance grows, the circle shrinks
// and everything outside it fades away.
const DOTS = new Array(30).fill(true).map((_, i) => {
  const a = random(`a-${i}`) * Math.PI * 2;
  const r = Math.sqrt(random(`r-${i}`)) * (R0 - 30);
  return { x: CX + Math.cos(a) * r, y: CY + Math.sin(a) * r, d: r };
});

export const ShrinkCard: React.FC = () => {
  const frame = useCurrentFrame();
  const radius = interpolate(frame, [22, 66], [R0, R1], {
    ...clamp,
    easing: Easing.bezier(0.45, 0, 0.55, 1),
  });

  return (
    <CardFrame length={72} fadeOut={false}>
      <div
        style={{
          position: "absolute",
          top: 330,
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 14,
          color: INK,
          textAlign: "center",
        }}
      >
        <SoftText
          at={2}
          style={{ fontFamily: serif, fontStyle: "italic", fontSize: 120 }}
        >
          organizás tu vida
        </SoftText>
        <SoftText
          at={30}
          style={{
            fontFamily: sans,
            fontWeight: 300,
            fontSize: 56,
            color: MUTED,
          }}
        >
          para evitar que vuelva
        </SoftText>
      </div>
      <svg width={1080} height={1920} style={{ position: "absolute" }}>
        <circle
          cx={CX}
          cy={CY}
          r={radius}
          fill="none"
          stroke={INK}
          strokeWidth={4}
          opacity={interpolate(frame, [4, 16], [0, 1], clamp)}
        />
        {DOTS.map((d, i) => (
          <circle
            key={i}
            cx={d.x}
            cy={d.y}
            r={11}
            fill={INK}
            opacity={
              interpolate(
                frame,
                [6 + i * 0.4, 14 + i * 0.4],
                [0, 0.85],
                clamp,
              ) * (d.d < radius - 14 ? 1 : 0.12)
            }
          />
        ))}
      </svg>
    </CardFrame>
  );
};
