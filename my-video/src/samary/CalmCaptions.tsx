import type React from "react";
import { Easing, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { CAPTION_PAGES } from "./captions";
import { CARD_WINDOWS, clamp, sans, serif } from "./theme";

// Soft, word-by-word captions: each word fades and rises in as it is spoken.
// Key words switch to an italic serif for a warmer, human tone.
export const CalmCaptions: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const ms = (frame / fps) * 1000;

  let pageIndex = -1;
  CAPTION_PAGES.forEach((p, i) => {
    if (p[0].startMs <= ms) {
      pageIndex = i;
    }
  });
  if (pageIndex === -1) {
    return null;
  }
  const page = CAPTION_PAGES[pageIndex];
  const next = CAPTION_PAGES[pageIndex + 1];
  // Hold each phrase a little after its last word, but never past the next one.
  const holdEnd = ((page[page.length - 1].endMs + 450) / 1000) * fps;
  const nextStart = next ? (next[0].startMs / 1000) * fps : Infinity;
  const pageEnd = Math.min(nextStart, holdEnd);
  // Fade out only when there is a pause; otherwise switch straight to the next phrase.
  const fades = holdEnd < nextStart;

  const covered = CARD_WINDOWS.some(([a, b]) => frame >= a - 2 && frame < b);
  if (covered || frame >= pageEnd) {
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
        alignItems: "baseline",
        columnGap: 18,
        color: "white",
        textShadow: "0 2px 18px rgba(0,0,0,0.45)",
        opacity: fades
          ? interpolate(frame, [pageEnd - 8, pageEnd], [1, 0], clamp)
          : 1,
      }}
    >
      {page.map((w, i) => {
        const at = (w.startMs / 1000) * fps;
        return (
          <span
            key={i}
            style={{
              fontFamily: w.key ? serif : sans,
              fontStyle: w.key ? "italic" : "normal",
              fontWeight: w.key ? 400 : 500,
              fontSize: w.key ? 92 : 68,
              letterSpacing: w.key ? 0 : -1.5,
              lineHeight: 1.15,
              opacity: interpolate(frame, [at - 2, at + 6], [0, 1], clamp),
              translate: interpolate(
                frame,
                [at - 2, at + 8],
                ["0px 18px", "0px 0px"],
                {
                  ...clamp,
                  easing: Easing.bezier(0.16, 1, 0.3, 1),
                },
              ),
              filter: `blur(${interpolate(frame, [at - 2, at + 6], [6, 0], clamp)}px)`,
            }}
          >
            {w.text}
          </span>
        );
      })}
    </div>
  );
};
