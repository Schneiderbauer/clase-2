import type React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { fontFamily, GREEN } from "./theme";

// WhatsApp-style outgoing message "Dale 👍" that pops in when he asks for a thumbs up.
export const ThumbsUpBubble: React.FC<{ readonly at: number }> = ({ at }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = spring({ frame: frame - at, fps, config: { damping: 11, stiffness: 170 } });
  const thumb = spring({ frame: frame - at - 6, fps, config: { damping: 8, stiffness: 200 } });

  return (
    <div
      style={{
        position: "absolute",
        right: 150,
        top: 330,
        fontFamily,
        opacity: Math.min(1, p * 2),
        scale: String(0.4 + 0.6 * p),
        transformOrigin: "bottom right",
      }}
    >
      <div
        style={{
          backgroundColor: "#D9FDD3",
          color: "#111B21",
          borderRadius: "36px 36px 8px 36px",
          padding: "26px 40px",
          fontSize: 64,
          fontWeight: 700,
          display: "flex",
          alignItems: "center",
          gap: 20,
          boxShadow: "0 24px 60px #0000004D",
        }}
      >
        Dale
        <span style={{ display: "inline-block", scale: String(0.3 + 0.7 * thumb), rotate: `${(1 - thumb) * -30}deg` }}>👍</span>
        <span style={{ fontSize: 26, color: "#667781", fontWeight: 500, alignSelf: "flex-end" }}>
          ahora <span style={{ color: "#53BDEB" }}>✓✓</span>
        </span>
      </div>
      <div style={{ height: 10 }} />
      <div style={{ textAlign: "right", color: GREEN, fontSize: 30, fontWeight: 700, textShadow: "0 2px 12px #000a" }}>
        y coordinamos la llamada
      </div>
    </div>
  );
};
