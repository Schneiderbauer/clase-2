import type React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { Reveal } from "./Reveal";
import { BLACK, clamp, fontFamily, GRAY, WHITE } from "./theme";

export const StatementScene: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill
      style={{
        backgroundColor: BLACK,
        color: WHITE,
        fontFamily,
        justifyContent: "center",
        padding: "0 100px",
      }}
    >
      <Reveal at={6} style={{ fontSize: 60, fontWeight: 300, color: GRAY }}>
        Construimos tu
      </Reveal>
      <div
        style={{
          fontSize: 172,
          fontWeight: 800,
          letterSpacing: -7,
          lineHeight: 0.98,
          marginTop: 20,
          scale: interpolate(frame, [14, 90], [1, 1.06], {
            ...clamp,
            output: "perceptual-scale",
          }),
          transformOrigin: "0% 50%",
        }}
      >
        <Reveal at={14}>embudo</Reveal>
        <Reveal at={22}>de ventas.</Reveal>
      </div>
    </AbsoluteFill>
  );
};
