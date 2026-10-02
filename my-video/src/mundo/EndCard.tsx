import type React from "react";
import {
  Easing,
  Img,
  interpolate,
  staticFile,
  useCurrentFrame,
} from "remotion";
import { Emoji } from "../samary3/Emoji";
import { clamp, font, NAVY, YELLOW } from "./theme";

const rise = (frame: number, at: number) => ({
  opacity: interpolate(frame, [at, at + 8], [0, 1], clamp),
  translate: interpolate(frame, [at, at + 12], ["0px 40px", "0px 0px"], {
    ...clamp,
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  }),
});

export const EndCard: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        backgroundColor: YELLOW,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: font,
        color: NAVY,
        textAlign: "center",
        clipPath: `circle(${interpolate(frame, [0, 14], [0, 150], { ...clamp, easing: Easing.bezier(0.65, 0, 0.35, 1) })}% at 50% 50%)`,
      }}
    >
      <div
        style={{
          ...rise(frame, 8),
          fontWeight: 900,
          fontSize: 260,
          lineHeight: 0.9,
          letterSpacing: -8,
        }}
      >
        30%
      </div>
      <div style={{ ...rise(frame, 12), fontWeight: 900, fontSize: 80 }}>
        DE DESCUENTO
      </div>
      <div
        style={{
          ...rise(frame, 16),
          fontWeight: 600,
          fontSize: 46,
          marginTop: 14,
        }}
      >
        para tu recomendado en su próxima póliza
      </div>
      <div
        style={{
          ...rise(frame, 26),
          marginTop: 70,
          display: "flex",
          alignItems: "center",
          gap: 18,
          backgroundColor: NAVY,
          color: "white",
          padding: "26px 54px",
          borderRadius: 999,
          fontWeight: 900,
          fontSize: 58,
        }}
      >
        <Img
          src={staticFile("emoji/2709_fe0f.png")}
          style={{ width: 70, height: 70 }}
        />
        MANDANOS UN DM
      </div>
      <div
        style={{
          ...rise(frame, 34),
          position: "absolute",
          bottom: 170,
          display: "flex",
          alignItems: "center",
          gap: 18,
          fontWeight: 900,
          fontSize: 64,
        }}
      >
        <Img
          src={staticFile("emoji/1f6e1_fe0f.png")}
          style={{ width: 84, height: 84 }}
        />
        MUNDO SEGURO
      </div>
      <div
        style={{
          position: "absolute",
          top: 180,
          left: 110,
          ...rise(frame, 20),
        }}
      >
        <Emoji code="1f389" size={170} />
      </div>
      <div
        style={{
          position: "absolute",
          top: 230,
          right: 110,
          ...rise(frame, 24),
        }}
      >
        <Emoji code="1f381" size={150} />
      </div>
    </div>
  );
};
