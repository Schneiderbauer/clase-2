import type React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { CardFrame } from "./CardFrame";
import { SoftText } from "./SoftText";
import { clamp, INK, MUTED, sans, SAGE, serif } from "./theme";

export const PanicCard: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <CardFrame length={66}>
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 30,
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
          at={2}
          style={{
            fontFamily: sans,
            fontWeight: 300,
            fontSize: 52,
            color: MUTED,
          }}
        >
          probablemente sea un
        </SoftText>
        <SoftText
          at={6}
          style={{
            fontFamily: serif,
            fontStyle: "italic",
            fontSize: 150,
            lineHeight: 1,
          }}
        >
          ataque de pánico
        </SoftText>
        <SoftText
          at={36}
          style={{
            fontFamily: sans,
            fontWeight: 300,
            fontSize: 64,
            color: MUTED,
            marginTop: 20,
          }}
        >
          no un{" "}
          <span style={{ position: "relative", color: INK }}>
            infarto
            <span
              style={{
                position: "absolute",
                left: -6,
                top: "55%",
                height: 4,
                backgroundColor: INK,
                width: `${interpolate(frame, [46, 56], [0, 104], clamp)}%`,
              }}
            />
          </span>
        </SoftText>
      </div>
    </CardFrame>
  );
};
