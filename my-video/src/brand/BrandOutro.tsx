import type React from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";
import { Reveal } from "./Reveal";
import { BLACK, clamp, fontFamily, GRAY, WHITE } from "./theme";

type BrandOutroProps = {
  readonly cta: string;
};

export const BrandOutro: React.FC<BrandOutroProps> = ({ cta }) => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill
      style={{
        backgroundColor: BLACK,
        color: WHITE,
        fontFamily,
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
      }}
    >
      <div
        style={{
          fontSize: 96,
          fontWeight: 800,
          letterSpacing: -4,
          lineHeight: 1.05,
        }}
      >
        <Reveal at={6}>
          <span style={{ fontWeight: 300, color: GRAY }}>Contenido</span> +
          Anuncios
        </Reveal>
        <Reveal at={16}>= Clientes.</Reveal>
      </div>

      <div
        style={{
          marginTop: 90,
          padding: "30px 64px",
          borderRadius: 999,
          backgroundColor: WHITE,
          color: BLACK,
          fontSize: 54,
          fontWeight: 700,
          letterSpacing: -1,
          scale: interpolate(frame, [40, 54], [0, 1], {
            ...clamp,
            easing: Easing.bezier(0.34, 1.56, 0.64, 1),
            output: "perceptual-scale",
          }),
        }}
      >
        {cta} →
      </div>

      <div
        style={{
          position: "absolute",
          bottom: 190,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 8,
          opacity: interpolate(frame, [56, 72], [0, 1], clamp),
          translate: interpolate(frame, [56, 72], ["0px 24px", "0px 0px"], {
            ...clamp,
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          }),
        }}
      >
        <div style={{ fontSize: 60, fontWeight: 800, letterSpacing: -2 }}>
          Schneiderbauer
        </div>
        <div
          style={{
            fontSize: 32,
            fontWeight: 300,
            letterSpacing: 18,
            marginRight: -18,
          }}
        >
          MEDIA
        </div>
      </div>
    </AbsoluteFill>
  );
};
