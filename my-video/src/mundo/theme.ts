import { loadFont } from "@remotion/fonts";
import { staticFile } from "remotion";

export const font = "Montserrat";
for (const weight of ["600", "800", "900"]) {
  loadFont({
    family: font,
    url: staticFile(`fonts/montserrat-latin-${weight}-normal.woff2`),
    weight,
  });
}

// Mundo Seguro palette (from the office banner: mustard yellow, globe blue).
export const YELLOW = "#F4B41A";
export const NAVY = "#0E2A47";
export const BLUE = "#1E88C8";
export const GREEN = "#36B37E";

export const clamp = {
  extrapolateLeft: "clamp",
  extrapolateRight: "clamp",
} as const;
