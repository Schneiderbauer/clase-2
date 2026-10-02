import type React from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";
import { Reveal } from "./Reveal";
import { BLACK, clamp, fontFamily, GRAY, WHITE } from "./theme";

// A dot pops, stretches into a line, and the wordmark rises out of it.
export const IntroScene: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill
      style={{
        backgroundColor: BLACK,
        color: WHITE,
        fontFamily,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 1010,
          height: 6,
          borderRadius: 3,
          backgroundColor: WHITE,
          width: interpolate(frame, [4, 10, 26], [0, 22, 760], {
            ...clamp,
            easing: Easing.bezier(0.65, 0, 0.35, 1),
          }),
          scale: interpolate(frame, [4, 8, 12], [0, 3.2, 1], {
            ...clamp,
            output: "perceptual-scale",
          }),
        }}
      />
      <Reveal
        at={20}
        style={{
          position: "absolute",
          top: 860,
          fontSize: 118,
          fontWeight: 800,
          letterSpacing: -5,
        }}
      >
        Schneiderbauer
      </Reveal>
      <Reveal
        at={28}
        style={{
          position: "absolute",
          top: 1040,
          fontSize: 64,
          fontWeight: 300,
          letterSpacing: 34,
          marginRight: -34,
        }}
      >
        MEDIA
      </Reveal>
      <div
        style={{
          position: "absolute",
          bottom: 180,
          fontSize: 40,
          fontWeight: 500,
          letterSpacing: 6,
          color: GRAY,
          opacity: interpolate(frame, [44, 60], [0, 1], clamp),
        }}
      >
        MARKETING DIGITAL
      </div>
    </AbsoluteFill>
  );
};
