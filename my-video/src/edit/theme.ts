import { loadFont } from "@remotion/fonts";
import { staticFile } from "remotion";

// Montserrat (SIL OFL) is bundled in public/fonts so renders work offline.
export const fontFamily = "Montserrat";

for (const weight of ["600", "800", "900"]) {
  loadFont({
    family: fontFamily,
    url: staticFile(`fonts/montserrat-latin-${weight}-normal.woff2`),
    weight,
  });
}

// Palette pulled from the footage: terracotta coat, cream shirt, white room.
export const COLORS = {
  accent: "#C8603A",
  accentDark: "#7A3420",
  cream: "#FFF4E8",
  ink: "#2A1A14",
} as const;
