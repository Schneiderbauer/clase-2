import type React from "react";
import { Easing, interpolate, useCurrentFrame } from "remotion";
import { SoftText } from "./SoftText";
import { clamp, INK, MUTED, PAPER, sans, SAGE, serif } from "./theme";

type EndCardProps = {
  readonly brand: string;
  readonly tagline: string;
};

export const EndCard: React.FC<EndCardProps> = ({ brand, tagline }) => {
  const frame = useCurrentFrame();
  const draw = interpolate(frame, [8, 40], [0, 1], {
    ...clamp,
    easing: Easing.bezier(0.65, 0, 0.35, 1),
  });
  const dash = {
    pathLength: 1,
    strokeDasharray: 1,
    strokeDashoffset: 1 - draw,
  };

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        backgroundColor: PAPER,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        color: INK,
        textAlign: "center",
        opacity: interpolate(frame, [0, 18], [0, 1], clamp),
      }}
    >
      <svg
        width={200}
        height={200}
        viewBox="0 0 100 100"
        style={{
          marginBottom: 50,
          translate: interpolate(
            frame,
            [40, 90],
            ["0px 0px", "14px -10px"],
            clamp,
          ),
        }}
      >
        <path
          d="M10 48 L90 14 L66 88 L46 60 Z"
          fill="none"
          stroke={INK}
          strokeWidth={2.5}
          strokeLinejoin="round"
          {...dash}
        />
        <path
          d="M46 60 L90 14"
          fill="none"
          stroke={INK}
          strokeWidth={2.5}
          strokeLinecap="round"
          {...dash}
        />
      </svg>
      <SoftText
        at={14}
        style={{
          fontFamily: sans,
          fontWeight: 300,
          fontSize: 54,
          color: MUTED,
        }}
      >
        Si te pasa esto seguido,
      </SoftText>
      <SoftText
        at={22}
        style={{
          fontFamily: serif,
          fontStyle: "italic",
          fontSize: 122,
          lineHeight: 1.05,
          marginTop: 10,
        }}
      >
        dejanos un mensaje
      </SoftText>
      <div
        style={{
          width: interpolate(frame, [34, 56], [0, 140], clamp),
          height: 3,
          backgroundColor: SAGE,
          margin: "60px 0",
        }}
      />
      <SoftText
        at={44}
        style={{
          fontFamily: sans,
          fontWeight: 700,
          fontSize: 58,
          letterSpacing: -1,
        }}
      >
        {brand}
      </SoftText>
      <SoftText
        at={50}
        style={{
          fontFamily: sans,
          fontWeight: 300,
          fontSize: 40,
          color: MUTED,
          marginTop: 10,
        }}
      >
        {tagline}
      </SoftText>
    </div>
  );
};
