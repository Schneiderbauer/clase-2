import type React from "react";
import {
  Easing,
  Interactive,
  interpolate,
  useCurrentFrame,
  type InteractivitySchema,
} from "remotion";
import { COLORS, fontFamily } from "./theme";

type TitleCardProps = {
  readonly children: string;
  readonly subtitle: string;
  readonly accentColor: string;
  readonly style?: React.CSSProperties;
};

const TitleCardInner: React.FC<TitleCardProps> = ({
  children,
  subtitle,
  accentColor,
  style,
}) => {
  const frame = useCurrentFrame();

  return (
    <Interactive.Div
      style={{
        position: "absolute",
        top: 220,
        left: 0,
        right: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 24,
        fontFamily,
        ...style,
      }}
    >
      <div
        style={{
          fontSize: 150,
          fontWeight: 900,
          letterSpacing: -4,
          color: COLORS.ink,
          lineHeight: 1,
          textShadow: "0 8px 30px rgba(255,255,255,0.6)",
          translate: interpolate(frame, [0, 14], ["0px 120px", "0px 0px"], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.spring({ damping: 12 }),
          }),
          opacity: interpolate(frame, [0, 6], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        {children}
      </div>
      <div
        style={{
          height: 14,
          borderRadius: 7,
          backgroundColor: accentColor,
          width: interpolate(frame, [8, 24], [0, 520], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          }),
        }}
      />
      <div
        style={{
          marginTop: 8,
          padding: "16px 36px",
          borderRadius: 999,
          backgroundColor: accentColor,
          color: COLORS.cream,
          fontSize: 52,
          fontWeight: 800,
          letterSpacing: 2,
          textTransform: "uppercase",
          scale: interpolate(frame, [16, 28], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.spring({ damping: 10 }),
            output: "perceptual-scale",
          }),
        }}
      >
        {subtitle}
      </div>
    </Interactive.Div>
  );
};

const titleCardSchema = {
  children: { type: "text-content", default: "Clase 2", description: "Title" },
  subtitle: {
    type: "text-content",
    default: "Arrancamos",
    description: "Subtitle",
  },
  accentColor: {
    type: "color",
    default: COLORS.accent,
    description: "Accent color",
  },
} as const satisfies InteractivitySchema;

export const TitleCard = Interactive.withSchema({
  Component: TitleCardInner,
  componentName: "<TitleCard>",
  schema: titleCardSchema,
  wrapInSequence: true,
});
