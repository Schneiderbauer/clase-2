import type React from "react";
import {
  AbsoluteFill,
  Easing,
  interpolate,
  random,
  useCurrentFrame,
} from "remotion";
import { BLACK, clamp, fontFamily, GRAY, WHITE } from "./theme";

const CX = 540;

type Layer = {
  readonly top: number;
  readonly height: number;
  readonly topHalf: number;
  readonly bottomHalf: number;
  readonly label: string;
  readonly sub: string;
  readonly at: number;
};

const LAYERS: Layer[] = [
  {
    top: 420,
    height: 220,
    topHalf: 470,
    bottomHalf: 390,
    label: "Contenido orgánico",
    sub: "Atrae y genera confianza",
    at: 12,
  },
  {
    top: 670,
    height: 220,
    topHalf: 380,
    bottomHalf: 300,
    label: "Anuncios",
    sub: "Escala y segmenta",
    at: 28,
  },
  {
    top: 920,
    height: 220,
    topHalf: 290,
    bottomHalf: 210,
    label: "Calificación",
    sub: "Filtra a quien sí compra",
    at: 44,
  },
];

const FUNNEL_BOTTOM = 1140;
const PILL_TOP = 1300;

// Many prospects fall into the top of the funnel...
const INFLOW = new Array(40).fill(true).map((_, i) => ({
  start: 58 + i * 3,
  x: CX + (random(`in-x-${i}`) - 0.5) * 860,
  r: 8 + random(`in-r-${i}`) * 6,
}));

// ...and a few qualified leads come out of the bottom.
const OUTFLOW = new Array(8).fill(true).map((_, i) => ({
  start: 92 + i * 13,
}));

const OUT_FALL = 12;

export const FunnelScene: React.FC = () => {
  const frame = useCurrentFrame();

  const pillPulse = OUTFLOW.reduce((acc, { start }) => {
    const since = frame - (start + OUT_FALL);
    return since >= 0 ? acc + 0.07 * Math.exp(-since / 4) : acc;
  }, 0);

  return (
    <AbsoluteFill style={{ backgroundColor: WHITE, fontFamily }}>
      <div
        style={{
          position: "absolute",
          top: 170,
          width: "100%",
          textAlign: "center",
          fontSize: 40,
          fontWeight: 500,
          letterSpacing: 8,
          color: GRAY,
          opacity: interpolate(frame, [0, 12], [0, 1], clamp),
        }}
      >
        CÓMO FUNCIONA
      </div>

      <svg width={1080} height={1920} style={{ position: "absolute" }}>
        {INFLOW.map(({ start, x, r }, i) => {
          const p = interpolate(frame, [start, start + 14], [0, 1], {
            ...clamp,
            easing: Easing.in(Easing.quad),
          });
          if (frame < start || p >= 1) {
            return null;
          }
          return (
            <circle
              key={`in-${i}`}
              cx={x + (CX - x) * p * 0.3}
              cy={260 + p * 170}
              r={r}
              fill={BLACK}
            />
          );
        })}
        {LAYERS.map((layer) => {
          const p = interpolate(frame, [layer.at, layer.at + 16], [0, 1], {
            ...clamp,
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          });
          const { top, height, topHalf, bottomHalf } = layer;
          return (
            <polygon
              key={layer.label}
              points={`${CX - topHalf},${top} ${CX + topHalf},${top} ${CX + bottomHalf},${top + height} ${CX - bottomHalf},${top + height}`}
              fill={BLACK}
              opacity={p}
              transform={`translate(0 ${(1 - p) * -60})`}
            />
          );
        })}
        {OUTFLOW.map(({ start }, i) => {
          const p = interpolate(frame, [start, start + OUT_FALL], [0, 1], {
            ...clamp,
            easing: Easing.in(Easing.quad),
          });
          if (frame < start || p >= 1) {
            return null;
          }
          return (
            <circle
              key={`out-${i}`}
              cx={CX}
              cy={FUNNEL_BOTTOM + 10 + p * (PILL_TOP - FUNNEL_BOTTOM - 10)}
              r={12}
              fill={BLACK}
            />
          );
        })}
      </svg>

      {LAYERS.map((layer) => (
        <div
          key={layer.label}
          style={{
            position: "absolute",
            top: layer.top,
            height: layer.height,
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 10,
            color: WHITE,
            opacity: interpolate(
              frame,
              [layer.at + 8, layer.at + 20],
              [0, 1],
              clamp,
            ),
          }}
        >
          <div style={{ fontSize: 58, fontWeight: 700, letterSpacing: -2 }}>
            {layer.label}
          </div>
          <div style={{ fontSize: 34, fontWeight: 300, color: "#BDBDBD" }}>
            {layer.sub}
          </div>
        </div>
      ))}

      <div
        style={{
          position: "absolute",
          top: PILL_TOP,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            padding: "30px 60px",
            borderRadius: 999,
            border: `5px solid ${BLACK}`,
            backgroundColor:
              frame >= OUTFLOW[0].start + OUT_FALL ? BLACK : WHITE,
            color: frame >= OUTFLOW[0].start + OUT_FALL ? WHITE : BLACK,
            fontSize: 60,
            fontWeight: 800,
            letterSpacing: -2,
            scale:
              interpolate(frame, [64, 80], [0, 1], {
                ...clamp,
                easing: Easing.bezier(0.34, 1.56, 0.64, 1),
              }) + pillPulse,
          }}
        >
          Leads calificados
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          top: 1530,
          width: "100%",
          textAlign: "center",
          fontSize: 44,
          fontWeight: 500,
          color: GRAY,
          opacity: interpolate(frame, [150, 166], [0, 1], clamp),
          translate: interpolate(frame, [150, 166], ["0px 30px", "0px 0px"], {
            ...clamp,
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          }),
        }}
      >
        Menos curiosos. Más clientes.
      </div>
    </AbsoluteFill>
  );
};
