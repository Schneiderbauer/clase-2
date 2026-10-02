import type React from "react";
import { Easing, interpolate, useCurrentFrame } from "remotion";
import { CardFrame } from "./CardFrame";
import { SoftText } from "./SoftText";
import { clamp, MUTED, sans, SAGE, serif } from "./theme";

export const BreathCard: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <CardFrame length={63}>
      <div
        style={{
          position: "absolute",
          top: 330,
          width: "100%",
          textAlign: "center",
        }}
      >
        <SoftText
          at={4}
          style={{
            fontFamily: sans,
            fontWeight: 300,
            fontSize: 56,
            color: MUTED,
          }}
        >
          Ahí ya no alcanza con
        </SoftText>
      </div>
      <div
        style={{
          position: "absolute",
          left: 540 - 330,
          top: 1050 - 330,
          width: 660,
          height: 660,
          borderRadius: "50%",
          backgroundColor: SAGE,
          opacity: 0.9,
          scale: interpolate(frame, [0, 34, 63], [0.5, 1, 0.82], {
            ...clamp,
            easing: Easing.bezier(0.45, 0, 0.55, 1),
            output: "perceptual-scale",
          }),
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 540 - 330,
          top: 1050 - 330,
          width: 660,
          height: 660,
          borderRadius: "50%",
          border: `3px solid ${SAGE}`,
          scale: interpolate(frame, [0, 40], [0.9, 1.35], clamp),
          opacity: interpolate(frame, [0, 40], [0.6, 0], clamp),
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 1050 - 110,
          width: "100%",
          textAlign: "center",
        }}
      >
        <SoftText
          at={33}
          style={{
            fontFamily: serif,
            fontStyle: "italic",
            fontSize: 100,
            lineHeight: 1,
            color: "white",
          }}
        >
          respirar
          <br />
          profundo
        </SoftText>
      </div>
    </CardFrame>
  );
};
