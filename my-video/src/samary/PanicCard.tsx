import type React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { CardFrame } from "./CardFrame";
import { SoftText } from "./SoftText";
import { clamp, INK, MUTED, sans, SAGE, serif } from "./theme";

// "…un ataque de pánico." / "Un ataque de pánico…" — bridges the first cut.
export const PanicCard: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <CardFrame length={57}>
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 26,
          color: INK,
        }}
      >
        <div
          style={{
            width: interpolate(frame, [2, 22], [0, 120], clamp),
            height: 3,
            backgroundColor: SAGE,
            marginBottom: 30,
          }}
        />
        <SoftText
          at={1}
          style={{
            fontFamily: sans,
            fontWeight: 300,
            fontSize: 52,
            color: MUTED,
          }}
        >
          puede llegar a ser un
        </SoftText>
        <SoftText
          at={5}
          style={{
            fontFamily: serif,
            fontStyle: "italic",
            fontSize: 156,
            lineHeight: 1,
            scale: interpolate(frame, [5, 57], [1, 1.05], clamp),
          }}
        >
          ataque de pánico
        </SoftText>
      </div>
    </CardFrame>
  );
};
