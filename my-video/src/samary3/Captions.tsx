import type React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { CAPTION_PAGES } from "../samary/captions";
import { sans } from "./theme";

// Reference-style captions: plain white phrase, bold sans, dark shadow,
// centered over the speaker's chest. Timings come from forced alignment.
export const Captions: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const ms = (frame / fps) * 1000;

  let page = null;
  for (let i = 0; i < CAPTION_PAGES.length; i++) {
    const p = CAPTION_PAGES[i];
    const next = CAPTION_PAGES[i + 1];
    const end = Math.min(
      next ? next[0].startMs : Infinity,
      p[p.length - 1].endMs + 500,
    );
    if (ms >= p[0].startMs && ms < end) {
      page = p;
    }
  }
  if (!page) {
    return null;
  }

  return (
    <div
      style={{
        position: "absolute",
        left: 120,
        right: 120,
        top: 1230,
        textAlign: "center",
        fontFamily: sans,
        fontWeight: 700,
        fontSize: 62,
        lineHeight: 1.18,
        letterSpacing: -0.5,
        color: "white",
        textShadow: "0 3px 6px rgba(0,0,0,0.75), 0 0 24px rgba(0,0,0,0.45)",
      }}
    >
      {page.map((w, i) => (
        <span key={i} style={{ opacity: ms >= w.startMs - 40 ? 1 : 0 }}>
          {i ? " " : ""}
          {w.text}
        </span>
      ))}
    </div>
  );
};
