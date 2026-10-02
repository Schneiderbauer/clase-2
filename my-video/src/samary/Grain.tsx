import type React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";

// Subtle animated film grain + soft vignette.
export const Grain: React.FC = () => {
  const frame = useCurrentFrame();
  const seed = Math.floor(frame / 2) % 12;

  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      <svg
        width="100%"
        height="100%"
        style={{ opacity: 0.09, mixBlendMode: "overlay" }}
      >
        <filter id={`grain-${seed}`}>
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.9"
            numOctaves={2}
            seed={seed}
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter={`url(#grain-${seed})`} />
      </svg>
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(ellipse at 50% 45%, rgba(0,0,0,0) 50%, rgba(25,18,14,0.24) 100%)",
        }}
      />
    </AbsoluteFill>
  );
};
