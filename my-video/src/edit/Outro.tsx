import type React from "react";
import {
  AbsoluteFill,
  Easing,
  interpolate,
  useCurrentFrame,
} from "remotion";
import { COLORS, fontFamily } from "./theme";

type OutroProps = {
  readonly title: string;
  readonly cta: string;
};

export const Outro: React.FC<OutroProps> = ({ title, cta }) => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(160deg, ${COLORS.cream} 0%, #F4D9C4 55%, ${COLORS.accent} 130%)`,
        alignItems: "center",
        justifyContent: "center",
        fontFamily,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          width: 1100,
          height: 1100,
          borderRadius: "50%",
          border: `40px solid ${COLORS.accent}`,
          opacity: 0.18,
          top: -380,
          right: -520,
          rotate: interpolate(frame, [0, 75], ["0deg", "40deg"]),
          scale: interpolate(frame, [0, 20], [0.6, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
            output: "perceptual-scale",
          }),
        }}
      />
      <div
        style={{
          position: "absolute",
          width: 700,
          height: 700,
          borderRadius: "50%",
          backgroundColor: COLORS.accent,
          opacity: 0.12,
          bottom: -260,
          left: -260,
          scale: interpolate(frame, [4, 26], [0.4, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
            output: "perceptual-scale",
          }),
        }}
      />
      <div
        style={{
          fontSize: 140,
          fontWeight: 900,
          color: COLORS.ink,
          textAlign: "center",
          lineHeight: 1.02,
          letterSpacing: -3,
          padding: "0 80px",
          translate: interpolate(frame, [6, 20], ["0px 140px", "0px 0px"], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.spring({ damping: 12 }),
          }),
          opacity: interpolate(frame, [6, 12], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        {title}
      </div>
      <div
        style={{
          marginTop: 70,
          padding: "26px 54px",
          borderRadius: 999,
          backgroundColor: COLORS.ink,
          color: COLORS.cream,
          fontSize: 56,
          fontWeight: 800,
          boxShadow: "0 18px 50px rgba(42,26,20,0.35)",
          scale: interpolate(frame, [26, 38], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.spring({ damping: 9 }),
            output: "perceptual-scale",
          }),
        }}
      >
        {cta} →
      </div>
    </AbsoluteFill>
  );
};
