import type React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { SoftText } from "./SoftText";
import { clamp, INK, sans, serif } from "./theme";

const pill: React.CSSProperties = {
  padding: "18px 40px",
  borderRadius: 999,
  backgroundColor: "rgba(243,238,232,0.82)",
  border: "1.5px solid rgba(43,38,35,0.15)",
  color: INK,
  fontFamily: serif,
  fontStyle: "italic",
  fontSize: 70,
};

// "Terapia" + "Medicación bien indicada" appear on the wall as she says them.
export const TreatmentTags: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <div
      style={{
        position: "absolute",
        top: 250,
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 22,
        opacity: interpolate(frame, [80, 92], [1, 0], clamp),
      }}
    >
      <SoftText at={4} style={pill}>
        Terapia
      </SoftText>
      <SoftText
        at={48}
        style={{ ...pill, display: "flex", alignItems: "baseline", gap: 18 }}
      >
        <span
          style={{
            fontFamily: sans,
            fontStyle: "normal",
            fontWeight: 300,
            fontSize: 56,
          }}
        >
          +
        </span>
        Medicación bien indicada
      </SoftText>
    </div>
  );
};
