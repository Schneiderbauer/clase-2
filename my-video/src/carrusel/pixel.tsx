import type React from "react";

// Tiny pixel-art renderer: each icon is a grid of characters, each character
// maps to a palette color ("." is transparent). Rendered as crisp SVG rects,
// with a white sticker outline and a soft shadow like the reference carousel.

const PALETTE: Record<string, string> = {
  k: "#1D1B2E", // outline
  w: "#FFFFFF",
  g: "#D9D6E8", // light gray
  G: "#9A97AE", // mid gray
  y: "#FFD84D", // gold
  Y: "#F2B01E", // gold shade
  o: "#C9850F", // gold dark
  v: "#8E8CF2", // lavender (reference figures)
  V: "#6764D6", // lavender shade
  b: "#4F8DF7", // blue
  B: "#2F64C9",
  e: "#3DD68C", // green
  E: "#1E9E62",
  r: "#F2645A", // red
  R: "#C23A33",
  m: "#7A1F35", // burgundy
  s: "#F3C29B", // skin
  S: "#D99A6C",
  n: "#6B4A2E", // brown
};

export type Icon = readonly string[];

export const Pixel: React.FC<{
  readonly icon: Icon;
  readonly size: number; // px per pixel
  readonly sticker?: boolean;
  readonly style?: React.CSSProperties;
}> = ({ icon, size, sticker = true, style }) => {
  const w = Math.max(...icon.map((r) => r.length));
  const h = icon.length;
  const o = Math.max(3, size * 0.9);
  return (
    <svg
      width={w * size}
      height={h * size}
      viewBox={`0 0 ${w} ${h}`}
      shapeRendering="crispEdges"
      style={{
        overflow: "visible",
        filter: sticker
          ? `drop-shadow(${o}px 0 0 #fff) drop-shadow(-${o}px 0 0 #fff) drop-shadow(0 ${o}px 0 #fff) drop-shadow(0 -${o}px 0 #fff) drop-shadow(0 ${size * 1.6}px ${size * 2}px rgba(60,50,30,0.22))`
          : undefined,
        ...style,
      }}
    >
      {icon.flatMap((row, y) =>
        [...row].map((c, x) =>
          c === "." || c === " " ? null : (
            <rect key={`${x}-${y}`} x={x} y={y} width={1.02} height={1.02} fill={PALETTE[c] ?? c} />
          ),
        ),
      )}
    </svg>
  );
};

// ---------------------------------------------------------------- icons

export const COIN_WINGS: Icon = [
  "..........kkkkkk..........",
  "........kkyyyyyykk........",
  ".kkkk..kyyyyyyyyyyk..kkkk.",
  "kwwwwk.kyyYYkkYYyyk.kwwwwk",
  "kgwwwwkyyYkkkkkYyyykwwwwgk",
  ".kgwwwkyyYkkYYYYyyykwwwgk.",
  "..kgwwkyyYYkkkYYyyykwwgk..",
  "...kgwkyyYYYYkkYyyykwgk...",
  "....kkkyyYkkkkkYyyykkk....",
  ".......kyyYYkkYYyyk.......",
  ".......kyoyyyyyyyok.......",
  "........kkooooookk........",
  "..........kkkkkk..........",
];

export const CARD: Icon = [
  "kkkkkkkkkkkkkkkkkk",
  "kbbbbbbbbbbbbbbbbk",
  "kbbbbbbbbbbbbbbbbk",
  "kkkkkkkkkkkkkkkkkk",
  "kBBBBBBBBBBBBBBBBk",
  "kbbbbbbbbbbbbbbbbk",
  "kbyyykbbbbbbbbbbbk",
  "kbyoykbbbbbbbbbbbk",
  "kbbbbbbbbbwwwbwwbk",
  "kbbbbbbbbbbbbbbbbk",
  "kkkkkkkkkkkkkkkkkk",
];

export const EYE: Icon = [
  "......kkkkkkkk......",
  "....kkwwwwwwwwkk....",
  "..kkwwwwkkkkwwwwkk..",
  ".kwwwwwkvvvvkwwwwwk.",
  "kwwwwwkvVkkVvkwwwwwk",
  "kwwwwwkvkkkkvkwwwwwk",
  ".kwwwwkvVkkVvkwwwwk.",
  "..kkwwwkvvvvkwwwkk..",
  "....kkwwkkkkwwkk....",
  "......kkkkkkkk......",
];

export const CHAT: Icon = [
  "..kkkkkkkkkkkkkk..",
  ".keeeeeeeeeeeeeek.",
  "keeeeeeeeeeeeeeeek",
  "keeeeeeeeeeeeeeeek",
  "keewwkeewwkeewwkek",
  "keewwkeewwkeewwkek",
  "keeeeeeeeeeeeeeeek",
  "kEeeeeeeeeeeeeeeEk",
  ".kEEEEEEEEEEEEEEk.",
  "..kkkEEkkkkkkkkk..",
  "....kEk...........",
  "....kk............",
];

export const COINS: Icon = [
  "....kkkkkkkk....",
  "..kkyyyyyyyykk..",
  ".kyyyyyyyyyyyyk.",
  ".koyyyyyyyyyyok.",
  ".kkooooooooookk.",
  ".kyyyyyyyyyyyyk.",
  ".koyyyyyyyyyyok.",
  ".kkooooooooookk.",
  ".kyyyyyyyyyyyyk.",
  ".koyyyyyyyyyyok.",
  "..kkooooooookk..",
  "....kkkkkkkk....",
];

export const QUESTION: Icon = [
  "..kkkkkk..",
  ".krrrrrrk.",
  "krrkkkkrrk",
  "kkk...krrk",
  "......krrk",
  ".....krrk.",
  "....krrk..",
  "....krk...",
  "....kkk...",
  "..........",
  "....kkk...",
  "....krk...",
  "....kkk...",
];

export const EMPLOYEE: Icon = [
  ".....kkkkk......",
  "....kvvvvvk.....",
  "...kvvvvvvvk....",
  "...kvvkvkvvk....",
  "...kvvvvvvvk....",
  "....kvvVvvk.....",
  ".....kkkkk......",
  "...kkmmmmmkk....",
  "..kvmmmwmmmvk...",
  "..kvmmmwmmmvk...",
  "..kvkmmwmmkvk...",
  "..kvkmmmmmkvkkkk",
  "...k.mmmmm.kknnk",
  ".....kkkkk.knnnk",
  ".....kVkVk.kkkkk",
  ".....kVkVk......",
  "....kkVkVkk.....",
  "....kkk.kkk.....",
];

export const CALCULATOR: Icon = [
  "kkkkkkkkkkkkkk",
  "kGGGGGGGGGGGGk",
  "kGkkkkkkkkkkGk",
  "kGkeeeeeeEekGk",
  "kGkeeeeEEeekGk",
  "kGkkkkkkkkkkGk",
  "kGGGGGGGGGGGGk",
  "kGwwkwwkwwkrrk",
  "kGkkkkkkkkkkkk",
  "kGwwkwwkwwkyyk",
  "kGkkkkkkkkkkkk",
  "kGwwkwwkwwkyyk",
  "kGkkkkkkkkkkkk",
  "kGwwwwkwwkkeek",
  "kGGGGGGGGGGGGk",
  "kkkkkkkkkkkkkk",
];

export const ARROW_UP: Icon = [
  "......kk......",
  ".....keek.....",
  "....keeeek....",
  "...keeeeeek...",
  "..keeeeeeeek..",
  ".keeeeeeeeeek.",
  "kkkkkeeeekkkkk",
  "....keeeek....",
  "....keeeek....",
  "....kEEEEk....",
  "....kEEEEk....",
  "....kkkkkk....",
];

export const ARROW_DOWN: Icon = [
  "....kkkkkk....",
  "....krrrrk....",
  "....krrrrk....",
  "....krrrrk....",
  "....krrrrk....",
  "kkkkkrrrrkkkkk",
  ".krrrrrrrrrrk.",
  "..krrrrrrrrk..",
  "...kRrrrrRk...",
  "....kRRRRk....",
  ".....kRRk.....",
  "......kk......",
];

export const SHEET: Icon = [
  "kkkkkkkkkkkkkkkkkk",
  "kEEEEEEEEEEEEEEEEk",
  "kEwwEEEEEEEEEEEEEk",
  "kkkkkkkkkkkkkkkkkk",
  "kggkwwwwwkwwwwwwwk",
  "kkkkkkkkkkkkkkkkkk",
  "kggkwwwwwkwwwweewk",
  "kkkkkkkkkkkkkkkkkk",
  "kggkwwwwwkwwweeewk",
  "kkkkkkkkkkkkkkkkkk",
  "kggkwwwwwkwweeeewk",
  "kkkkkkkkkkkkkkkkkk",
  "kggkyyyyykyyyyyyyk",
  "kkkkkkkkkkkkkkkkkk",
];

export const SHRUG: Icon = [
  "......kkkkk.......",
  ".....kvvvvvk......",
  "....kvvvvvvvk.....",
  "....kvkvvvkvk.....",
  "k...kvvvvvvvk...k.",
  "kk...kvkkkvk...kk.",
  ".kk...kkkkk...kk..",
  "..kvkkvvvvvkkvk...",
  "...kvvvvvvvvvk....",
  ".....kvvvvvk......",
  ".....kvvvvvk......",
  ".....kVVkVVk......",
  ".....kVk.kVk......",
  "....kkVk.kVkk.....",
  "....kkkk.kkkk.....",
];
