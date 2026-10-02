import { loadFont } from "@remotion/fonts";
import { staticFile } from "remotion";

export const sans = "Inter";
export const serif = "Instrument Serif";

for (const weight of ["300", "500", "700"]) {
  loadFont({
    family: sans,
    url: staticFile(`fonts/inter-latin-${weight}-normal.woff2`),
    weight,
  });
}
loadFont({
  family: serif,
  url: staticFile("fonts/instrument-serif-latin-400-normal.woff2"),
});
loadFont({
  family: serif,
  url: staticFile("fonts/instrument-serif-latin-400-italic.woff2"),
  style: "italic",
});

// Calm, warm minimal palette.
export const PAPER = "#F3EEE8";
export const INK = "#2B2623";
export const MUTED = "#8C847D";
export const SAGE = "#8E9C8B";

export const clamp = {
  extrapolateLeft: "clamp",
  extrapolateRight: "clamp",
} as const;

// Frames where full-screen B-roll cards cover the speaker (captions hidden).
export const CARD_WINDOWS: ReadonlyArray<readonly [number, number]> = [
  [144, 210],
  [350, 486],
  [745, 835],
];
