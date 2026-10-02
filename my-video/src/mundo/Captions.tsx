import type React from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { PAGES } from "./captions";
import { clamp, font, YELLOW } from "./theme";

// Bold promo captions: uppercase, the word being spoken turns yellow and pops.
export const Captions: React.FC<{ readonly hideFrom: number }> = ({
  hideFrom,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const ms = (frame / fps) * 1000;
  if (frame >= hideFrom) {
    return null;
  }

  const page = PAGES.find((p, i) => {
    const next = PAGES[i + 1];
    const end = Math.min(
      next ? next[0].startMs : Infinity,
      p[p.length - 1].endMs + 500,
    );
    return ms >= p[0].startMs && ms < end;
  });
  if (!page) {
    return null;
  }

  return (
    <div
      style={{
        position: "absolute",
        left: 90,
        right: 90,
        top: 1290,
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        columnGap: 18,
        fontFamily: font,
        fontWeight: 900,
        fontSize: 74,
        lineHeight: 1.12,
        textTransform: "uppercase",
        textShadow: "0 4px 0 rgba(0,0,0,0.55), 0 0 22px rgba(0,0,0,0.5)",
      }}
    >
      {page.map((w, i) => {
        const at = (w.startMs / 1000) * fps;
        const active = ms >= w.startMs && ms < w.endMs + 120;
        return (
          <span
            key={i}
            style={{
              color: active || (w.key && ms >= w.startMs) ? YELLOW : "white",
              opacity: ms >= w.startMs - 40 ? 1 : 0,
              scale: interpolate(
                frame,
                [at - 1, at + 3, at + 6],
                [0.7, 1.12, 1],
                clamp,
              ),
              display: "inline-block",
            }}
          >
            {w.text}
          </span>
        );
      })}
    </div>
  );
};
