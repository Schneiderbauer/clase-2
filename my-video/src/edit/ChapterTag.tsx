import type React from "react";
import {
  Easing,
  Interactive,
  interpolate,
  useCurrentFrame,
  type InteractivitySchema,
} from "remotion";
import { COLORS, fontFamily } from "./theme";

type ChapterTagProps = {
  readonly number: string;
  readonly children: string;
  readonly accentColor: string;
  readonly style?: React.CSSProperties;
};

const ChapterTagInner: React.FC<ChapterTagProps> = ({
  number,
  children,
  accentColor,
  style,
}) => {
  const frame = useCurrentFrame();

  return (
    <Interactive.Div
      style={{
        position: "absolute",
        top: 150,
        left: 64,
        display: "flex",
        alignItems: "stretch",
        borderRadius: 22,
        overflow: "hidden",
        boxShadow: "0 12px 40px rgba(42,26,20,0.25)",
        fontFamily,
        translate: interpolate(frame, [0, 12], ["-700px 0px", "0px 0px"], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.spring({ damping: 14 }),
        }),
        ...style,
      }}
    >
      <div
        style={{
          backgroundColor: accentColor,
          color: COLORS.cream,
          fontSize: 54,
          fontWeight: 900,
          padding: "14px 26px",
        }}
      >
        {number}
      </div>
      <div
        style={{
          backgroundColor: COLORS.cream,
          color: COLORS.ink,
          fontSize: 46,
          fontWeight: 800,
          padding: "18px 30px",
          display: "flex",
          alignItems: "center",
          clipPath: `inset(0 ${interpolate(frame, [6, 20], [100, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          })}% 0 0)`,
        }}
      >
        {children}
      </div>
    </Interactive.Div>
  );
};

const chapterTagSchema = {
  number: { type: "text-content", default: "01", description: "Number" },
  children: { type: "text-content", default: "Parte 1", description: "Label" },
  accentColor: {
    type: "color",
    default: COLORS.accent,
    description: "Accent color",
  },
} as const satisfies InteractivitySchema;

export const ChapterTag = Interactive.withSchema({
  Component: ChapterTagInner,
  componentName: "<ChapterTag>",
  schema: chapterTagSchema,
  wrapInSequence: true,
});
