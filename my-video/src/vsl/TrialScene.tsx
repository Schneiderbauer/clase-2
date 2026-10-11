import type React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { CutFlash, Pop, Rise, Stage } from "./Anim";
import { CARD, clamp, GRAY, GREEN, s, WHITE } from "./theme";

// "Y lo podés probar 15 días pagando solo la publicidad.
//  Si no te convence, no seguimos y listo."
export const T = {
  days: s(0.82),
  onlyAds: s(1.38),
  gridEnd: s(3.0),
  notConvinced: s(3.14),
  done: s(4.16),
};

export const TrialScene: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <Stage>
      <AbsoluteFill
        style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 140 }}
      >
        <div style={{ width: 760 }}>
          <Rise at={0}>
            <div style={{ color: GREEN, fontSize: 40, fontWeight: 700, letterSpacing: 6 }}>
              PROBALO SIN RIESGO
            </div>
          </Rise>
          <Pop at={T.days} style={{ transformOrigin: "left center" }}>
            <div style={{ color: WHITE, fontSize: 230, fontWeight: 800, letterSpacing: -10, lineHeight: 1 }}>
              15 días
            </div>
          </Pop>
          <Rise at={T.onlyAds}>
            <div style={{ color: WHITE, fontSize: 54, fontWeight: 500, marginTop: 18 }}>
              pagando <b style={{ color: GREEN }}>solo la publicidad</b>
            </div>
          </Rise>
          <div style={{ marginTop: 70, display: "flex", flexDirection: "column", gap: 18 }}>
            <Rise at={T.notConvinced}>
              <div style={{ color: GRAY, fontSize: 46, fontWeight: 500 }}>¿No te convence?</div>
            </Rise>
            <Rise at={T.done}>
              <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
                <Check />
                <div style={{ color: WHITE, fontSize: 54, fontWeight: 700 }}>No seguimos y listo.</div>
              </div>
            </Rise>
          </div>
        </div>

        <DayGrid frame={frame} />
      </AbsoluteFill>
      <CutFlash />
    </Stage>
  );
};

// 15 day tiles that light up one by one while he says "15 días".
const DayGrid: React.FC<{ readonly frame: number }> = ({ frame }) => {
  const appear = interpolate(frame, [T.days - 6, T.days + 8], [0, 1], clamp);
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(5, 120px)",
        gap: 22,
        padding: 40,
        borderRadius: 36,
        backgroundColor: CARD,
        opacity: appear,
        translate: `0px ${(1 - appear) * 40}px`,
      }}
    >
      {new Array(15).fill(true).map((_, i) => {
        const on = interpolate(
          frame,
          [T.days + (i * (T.gridEnd - T.days)) / 15, T.days + ((i + 1) * (T.gridEnd - T.days)) / 15],
          [0, 1],
          clamp,
        );
        return (
          <div
            key={i}
            style={{
              height: 120,
              borderRadius: 22,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 44,
              fontWeight: 700,
              color: on > 0.5 ? "#06240F" : GRAY,
              backgroundColor: on > 0.5 ? GREEN : "#1E2622",
              scale: String(1 + 0.12 * Math.sin(on * Math.PI)),
            }}
          >
            {i + 1}
          </div>
        );
      })}
    </div>
  );
};

const Check: React.FC = () => (
  <svg width={64} height={64} viewBox="0 0 64 64">
    <circle cx={32} cy={32} r={30} fill={GREEN} />
    <path d="M18 33 L28 43 L46 22" stroke="#06240F" strokeWidth={7} fill="none" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
