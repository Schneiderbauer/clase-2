import { loadFont } from "@remotion/fonts";
import { staticFile } from "remotion";

// Inter (SIL OFL) — the closest freely licensed match to Apple's SF Pro.
export const fontFamily = "Inter";

for (const weight of ["300", "500", "700", "800"]) {
  loadFont({
    family: fontFamily,
    url: staticFile(`fonts/inter-latin-${weight}-normal.woff2`),
    weight,
  });
}

export const BLACK = "#0A0A0A";
export const WHITE = "#FAFAFA";
export const GRAY = "#8A8A8A";

export const clamp = {
  extrapolateLeft: "clamp",
  extrapolateRight: "clamp",
} as const;
