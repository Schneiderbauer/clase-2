import { Video } from "@remotion/media";
import type React from "react";
import {
  AbsoluteFill,
  Easing,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { CutFlash } from "./Anim";
import { clamp, fontFamily, GREEN, WHITE } from "./theme";

type LowerThird = { readonly title: string; readonly subtitle: string; readonly at: number };

// Talking-head clip (background already blurred) with a slow push-in and an
// optional name tag.
export const FaceScene: React.FC<{
  readonly file: string;
  readonly lowerThird?: LowerThird;
  readonly children?: React.ReactNode;
}> = ({ file, lowerThird, children }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const zoom = interpolate(frame, [0, durationInFrames], [1, 1.06], clamp);

  return (
    <AbsoluteFill style={{ backgroundColor: "black", overflow: "hidden" }}>
      <Video
        name="Cara"
        src={staticFile(file)}
        premountFor={fps}
        objectFit="cover"
        style={{ width: "100%", height: "100%", scale: String(zoom) }}
      />
      {lowerThird ? <NameTag {...lowerThird} /> : null}
      {children}
      <CutFlash />
    </AbsoluteFill>
  );
};

const NameTag: React.FC<LowerThird> = ({ title, subtitle, at }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const ease = Easing.bezier(0.16, 1, 0.3, 1);
  const inP = interpolate(frame, [at, at + 16], [0, 1], { ...clamp, easing: ease });
  const outP = interpolate(frame, [durationInFrames - 14, durationInFrames - 2], [0, 1], clamp);
  const bar = interpolate(frame, [at, at + 12], [0, 1], { ...clamp, easing: ease });

  return (
    <div
      style={{
        position: "absolute",
        left: 110,
        bottom: 120,
        fontFamily,
        opacity: inP * (1 - outP),
        translate: `${(1 - inP) * -40}px 0px`,
        display: "flex",
        gap: 24,
        alignItems: "stretch",
      }}
    >
      <div style={{ width: 8, borderRadius: 4, backgroundColor: GREEN, scale: `1 ${bar}` }} />
      <div
        style={{
          backgroundColor: "rgba(10,14,12,0.72)",
          backdropFilter: "blur(8px)",
          padding: "22px 34px",
          borderRadius: 18,
        }}
      >
        <div style={{ color: WHITE, fontSize: 52, fontWeight: 800, letterSpacing: -1 }}>{title}</div>
        <div style={{ color: "#C9D2CD", fontSize: 30, fontWeight: 500, marginTop: 6 }}>{subtitle}</div>
      </div>
    </div>
  );
};
