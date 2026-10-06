import type React from "react";
import { BLACK, font, YELLOW } from "./theme";

// Generic smartphone mockup (front view) showing a big label on screen.
export const Phone: React.FC<{
  readonly label: string;
  readonly hue?: number;
  readonly dim?: boolean;
  readonly width?: number;
}> = ({ label, hue = 50, dim, width = 340 }) => {
  const h = width * 2.05;
  return (
    <div
      style={{
        width,
        height: h,
        borderRadius: width * 0.16,
        padding: width * 0.035,
        background: dim ? "#3a3a3a" : `linear-gradient(145deg, #2b2b2b, #111)`,
        boxShadow: dim
          ? "none"
          : `0 0 0 4px ${YELLOW}, 0 30px 90px rgba(236,217,45,0.35)`,
        position: "relative",
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          borderRadius: width * 0.13,
          background: dim
            ? "linear-gradient(160deg, #555, #2a2a2a)"
            : `linear-gradient(160deg, hsl(${hue} 85% 58%), hsl(${hue + 40} 80% 30%) 70%, ${BLACK})`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: font,
          fontWeight: 800,
          fontSize: width * 0.42,
          color: "white",
          letterSpacing: -width * 0.02,
          textShadow: "0 6px 30px rgba(0,0,0,0.4)",
        }}
      >
        {label}
      </div>
      <div
        style={{
          position: "absolute",
          top: width * 0.07,
          left: "50%",
          width: width * 0.3,
          height: width * 0.085,
          marginLeft: -width * 0.15,
          borderRadius: 999,
          backgroundColor: "black",
        }}
      />
    </div>
  );
};
