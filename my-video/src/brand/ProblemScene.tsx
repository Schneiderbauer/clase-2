import type React from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";
import { Reveal } from "./Reveal";
import { BLACK, clamp, fontFamily, WHITE } from "./theme";

// "Likes. Seguidores. Pero no clientes." — the vanity metrics fade out,
// the real problem gets underlined.
export const ProblemScene: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill
      style={{
        backgroundColor: WHITE,
        color: BLACK,
        fontFamily,
        justifyContent: "center",
        padding: "0 100px",
        fontSize: 132,
        fontWeight: 800,
        letterSpacing: -5,
        lineHeight: 1.05,
      }}
    >
      <Reveal
        at={8}
        style={{ opacity: interpolate(frame, [62, 74], [1, 0.18], clamp) }}
      >
        Likes.
      </Reveal>
      <Reveal
        at={22}
        style={{ opacity: interpolate(frame, [62, 74], [1, 0.18], clamp) }}
      >
        Seguidores.
      </Reveal>
      <Reveal at={40} style={{ marginTop: 40, fontWeight: 300 }}>
        Pero no
      </Reveal>
      <Reveal at={48} style={{ alignSelf: "flex-start" }}>
        <span style={{ position: "relative", display: "inline-block" }}>
          clientes.
          <span
            style={{
              position: "absolute",
              left: 0,
              bottom: -6,
              height: 14,
              backgroundColor: BLACK,
              width: `${interpolate(frame, [66, 82], [0, 100], {
                ...clamp,
                easing: Easing.bezier(0.65, 0, 0.35, 1),
              })}%`,
            }}
          />
        </span>
      </Reveal>
    </AbsoluteFill>
  );
};
