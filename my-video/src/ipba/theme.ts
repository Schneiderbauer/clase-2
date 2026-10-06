import { loadFont } from "@remotion/fonts";
import { staticFile } from "remotion";

export const font = "Inter";
for (const weight of ["500", "700", "800"]) {
  loadFont({
    family: font,
    url: staticFile(`fonts/inter-latin-${weight}-normal.woff2`),
    weight,
  });
}

// iPhone BA brand: black + logo yellow.
export const YELLOW = "#ECD92D";
export const BLACK = "#0A0A0A";
export const WHITE = "#FFFFFF";

// 120 BPM at 60 fps.
export const BEAT = 30;
export const BAR = 120;

export const clamp = {
  extrapolateLeft: "clamp",
  extrapolateRight: "clamp",
} as const;
