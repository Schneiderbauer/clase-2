import { loadFont } from "@remotion/fonts";
import type React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";

export const fontFamily = "Inter";

for (const weight of ["300", "500", "700", "800"]) {
  loadFont({
    family: fontFamily,
    url: staticFile(`fonts/inter-latin-${weight}-normal.woff2`),
    weight,
  });
}

export const W = 1080;
export const H = 1350;

export const BEIGE = "#EFEBE3";
export const INK = "#141414";
export const SOFT = "#3C3A36";
export const MUTED = "#8B867C";
export const YELLOW = "#FFF59A";
export const CORAL = "#E0735A";

/** Instagram handle shown on every slide. */
export const HANDLE = "@augusto.ads";
export const TOTAL = 7;

/** Yellow marker highlight, like the reference. */
export const Mark: React.FC<{ readonly children: React.ReactNode }> = ({ children }) => (
  <span style={{ backgroundColor: YELLOW, padding: "0 10px", boxDecorationBreak: "clone", WebkitBoxDecorationBreak: "clone" }}>
    {children}
  </span>
);

/** Shared slide chrome: handle on top, counter and "Deslizar" at the bottom. */
export const Slide: React.FC<{
  readonly n: number;
  readonly children: React.ReactNode;
}> = ({ n, children }) => (
  <AbsoluteFill style={{ backgroundColor: BEIGE, fontFamily, color: INK }}>
    <div
      style={{
        position: "absolute",
        top: 62,
        left: 0,
        right: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: 16,
      }}
    >
      <div style={{ width: 58, height: 58, borderRadius: 29, overflow: "hidden", backgroundColor: "#D8D2C4" }}>
        <Img src={staticFile("carrusel/avatar.png")} style={{ width: "100%", height: "100%", imageRendering: "pixelated" }} />
      </div>
      <span style={{ fontSize: 27, fontWeight: 500, color: SOFT }}>{HANDLE}</span>
      <svg width={28} height={28} viewBox="0 0 24 24">
        <path fill="#3897F0" d="M12 1.5l2.4 1.8 3-.2.9 2.9 2.5 1.7-1 2.8 1 2.8-2.5 1.7-.9 2.9-3-.2L12 22.5l-2.4-1.8-3 .2-.9-2.9-2.5-1.7 1-2.8-1-2.8 2.5-1.7.9-2.9 3 .2z" />
        <path d="M7.5 12.2l3 3 6-6.2" stroke="#fff" strokeWidth={2.2} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>

    <AbsoluteFill style={{ padding: "170px 90px 150px" }}>{children}</AbsoluteFill>

    <div style={{ position: "absolute", bottom: 66, left: 90, fontSize: 30, fontWeight: 500, color: SOFT }}>
      {String(n).padStart(2, "0")}/{String(TOTAL).padStart(2, "0")}
    </div>
    {n < TOTAL ? (
      <div style={{ position: "absolute", bottom: 66, right: 90, fontSize: 30, fontWeight: 500, color: CORAL }}>
        Deslizar →
      </div>
    ) : null}
  </AbsoluteFill>
);
