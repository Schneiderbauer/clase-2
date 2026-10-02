import type React from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";
import { BLACK, clamp, fontFamily, GRAY, WHITE } from "./theme";

const ICON = 120;

// Stroke-drawn line icons: 0 → hidden, 1 → fully drawn.
const Icon: React.FC<{
  readonly kind: "play" | "target" | "check";
  readonly progress: number;
}> = ({ kind, progress }) => {
  const stroke = {
    fill: "none",
    stroke: WHITE,
    strokeWidth: 5,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    pathLength: 1,
    strokeDasharray: 1,
    strokeDashoffset: 1 - progress,
  };
  return (
    <svg width={ICON} height={ICON} viewBox="0 0 120 120">
      <circle cx={60} cy={60} r={54} {...stroke} />
      {kind === "play" ? <path d="M50 40 L82 60 L50 80 Z" {...stroke} /> : null}
      {kind === "target" ? (
        <>
          <circle cx={60} cy={60} r={32} {...stroke} />
          <circle cx={60} cy={60} r={10} {...stroke} />
        </>
      ) : null}
      {kind === "check" ? <path d="M38 62 L54 77 L84 45" {...stroke} /> : null}
    </svg>
  );
};

type RowProps = {
  readonly at: number;
  readonly number: string;
  readonly icon: "play" | "target" | "check";
  readonly title: string;
  readonly sub: string;
};

const Row: React.FC<RowProps> = ({ at, number, icon, title, sub }) => {
  const frame = useCurrentFrame();
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 44,
        opacity: interpolate(frame, [at, at + 10], [0, 1], clamp),
        translate: interpolate(frame, [at, at + 18], ["80px 0px", "0px 0px"], {
          ...clamp,
          easing: Easing.bezier(0.16, 1, 0.3, 1),
        }),
      }}
    >
      <Icon
        kind={icon}
        progress={interpolate(frame, [at + 4, at + 30], [0, 1], {
          ...clamp,
          easing: Easing.bezier(0.65, 0, 0.35, 1),
        })}
      />
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <div
          style={{
            fontSize: 30,
            fontWeight: 500,
            letterSpacing: 6,
            color: GRAY,
          }}
        >
          {number}
        </div>
        <div
          style={{
            fontSize: 66,
            fontWeight: 700,
            letterSpacing: -2,
            lineHeight: 1,
          }}
        >
          {title}
        </div>
        <div style={{ fontSize: 38, fontWeight: 300, color: "#BDBDBD" }}>
          {sub}
        </div>
      </div>
    </div>
  );
};

export const ServicesScene: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill
      style={{
        backgroundColor: BLACK,
        color: WHITE,
        fontFamily,
        padding: "0 90px",
        justifyContent: "center",
        gap: 110,
      }}
    >
      <div
        style={{
          fontSize: 40,
          fontWeight: 500,
          letterSpacing: 8,
          color: GRAY,
          opacity: interpolate(frame, [0, 12], [0, 1], clamp),
        }}
      >
        QUÉ HACEMOS
      </div>
      <Row
        at={12}
        number="01"
        icon="play"
        title="Contenido orgánico"
        sub="Atrae a tu cliente ideal"
      />
      <Row
        at={36}
        number="02"
        icon="target"
        title="Anuncios"
        sub="Llevan tráfico a tu embudo"
      />
      <Row
        at={60}
        number="03"
        icon="check"
        title="Leads calificados"
        sub="Listos para tu equipo de ventas"
      />
    </AbsoluteFill>
  );
};
