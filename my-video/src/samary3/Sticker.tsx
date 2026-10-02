import type React from "react";
import { display, INK } from "./theme";

// Bold cut-out sticker text: white fill, thick dark outline, hard shadow.
export const Sticker: React.FC<{
  readonly children: React.ReactNode;
  readonly size?: number;
  readonly color?: string;
  readonly outline?: string;
}> = ({ children, size = 120, color = "white", outline = INK }) => (
  <div
    style={{
      fontFamily: display,
      fontSize: size,
      lineHeight: 0.95,
      textAlign: "center",
      color,
      WebkitTextStroke: `${Math.round(size / 9)}px ${outline}`,
      paintOrder: "stroke fill",
      textShadow: `0 ${Math.round(size / 14)}px 0 ${outline}, 0 14px 30px rgba(0,0,0,0.3)`,
      whiteSpace: "pre",
    }}
  >
    {children}
  </div>
);
