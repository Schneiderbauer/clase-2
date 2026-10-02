import { loadFont } from "@remotion/fonts";
import { staticFile } from "remotion";

export const sans = "Inter";
export const display = "Lilita One";
export const script = "Great Vibes";

for (const weight of ["500", "700", "800"]) {
  loadFont({
    family: sans,
    url: staticFile(`fonts/inter-latin-${weight}-normal.woff2`),
    weight,
  });
}
loadFont({
  family: display,
  url: staticFile("fonts/lilita-one-latin-400-normal.woff2"),
});
loadFont({
  family: script,
  url: staticFile("fonts/great-vibes-latin-400-normal.woff2"),
});

export const INK = "#1E1A18";
export const SAGE = "#8E9C8B";
export const ROSE = "#E89BB0";
export const RED = "#E5484D";

export const clamp = {
  extrapolateLeft: "clamp",
  extrapolateRight: "clamp",
} as const;
