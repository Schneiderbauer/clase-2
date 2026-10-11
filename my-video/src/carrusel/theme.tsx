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

/** Agency name shown on every slide, next to its logo. */
export const HANDLE = "Schneiderbauer Media";
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
      <div style={{ width: 58, height: 58, borderRadius: 29, overflow: "hidden", backgroundColor: "#000" }}>
        <Img src={staticFile("carrusel/logo-sm.png")} style={{ width: "100%", height: "100%" }} />
      </div>
      <span style={{ fontSize: 27, fontWeight: 500, color: SOFT }}>{HANDLE}</span>
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
