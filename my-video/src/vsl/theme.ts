import { loadFont } from "@remotion/fonts";
import { staticFile } from "remotion";

export const fontFamily = "Inter";

for (const weight of ["300", "500", "700", "800"]) {
  loadFont({
    family: fontFamily,
    url: staticFile(`fonts/inter-latin-${weight}-normal.woff2`),
    weight,
  });
}

export const FPS = 30;

export const BG = "#0B0F0D";
export const CARD = "#141A17";
export const WHITE = "#F5F7F6";
export const GRAY = "#8C9590";
export const GREEN = "#25D366";
export const GREEN_DARK = "#128C4A";

export const clamp = {
  extrapolateLeft: "clamp",
  extrapolateRight: "clamp",
} as const;

/** Seconds (as measured in the voice recording) to frames. */
export const s = (seconds: number) => Math.round(seconds * FPS);
