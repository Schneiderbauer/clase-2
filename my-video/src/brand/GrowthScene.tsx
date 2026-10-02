import type React from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";
import { Reveal } from "./Reveal";
import { BLACK, clamp, fontFamily, GRAY, WHITE } from "./theme";

// Illustrative upward curve — no numbers, just the idea of steady growth.
const PATH =
  "M 100 1500 C 260 1480, 320 1400, 420 1360 S 600 1250, 680 1120 S 860 840, 980 700";
const END = { x: 980, y: 700 };

export const GrowthScene: React.FC = () => {
  const frame = useCurrentFrame();
  const draw = interpolate(frame, [12, 58], [0, 1], {
    ...clamp,
    easing: Easing.bezier(0.65, 0, 0.35, 1),
  });

  return (
    <AbsoluteFill style={{ backgroundColor: WHITE, color: BLACK, fontFamily }}>
      <div
        style={{
          position: "absolute",
          top: 220,
          left: 100,
          fontSize: 120,
          fontWeight: 800,
          letterSpacing: -5,
          lineHeight: 1.02,
        }}
      >
        <Reveal at={4}>Un sistema,</Reveal>
        <Reveal at={12} style={{ fontWeight: 300, color: GRAY }}>
          no suerte.
        </Reveal>
      </div>

      <svg width={1080} height={1920} style={{ position: "absolute" }}>
        <line
          x1={100}
          y1={1580}
          x2={100 + 880 * interpolate(frame, [0, 20], [0, 1], clamp)}
          y2={1580}
          stroke="#D6D6D6"
          strokeWidth={4}
        />
        <path
          d={PATH}
          fill="none"
          stroke={BLACK}
          strokeWidth={12}
          strokeLinecap="round"
          pathLength={1}
          strokeDasharray={1}
          strokeDashoffset={1 - draw}
        />
        <circle
          cx={END.x}
          cy={END.y}
          r={interpolate(frame, [56, 66], [0, 26], {
            ...clamp,
            easing: Easing.bezier(0.34, 1.56, 0.64, 1),
          })}
          fill={BLACK}
        />
        <circle
          cx={END.x}
          cy={END.y}
          r={interpolate(frame, [58, 84], [26, 90], clamp)}
          fill="none"
          stroke={BLACK}
          strokeWidth={3}
          opacity={interpolate(frame, [58, 84], [0.6, 0], clamp)}
        />
      </svg>

      <div
        style={{
          position: "absolute",
          top: 560,
          right: 120,
          padding: "16px 34px",
          borderRadius: 999,
          backgroundColor: BLACK,
          color: WHITE,
          fontSize: 44,
          fontWeight: 700,
          scale: interpolate(frame, [62, 74], [0, 1], {
            ...clamp,
            easing: Easing.bezier(0.34, 1.56, 0.64, 1),
            output: "perceptual-scale",
          }),
          transformOrigin: "100% 100%",
        }}
      >
        Más leads
      </div>
    </AbsoluteFill>
  );
};
