import type React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { CardFrame } from "./CardFrame";
import { SoftText } from "./SoftText";
import { clamp, INK, MUTED, sans, SAGE, serif } from "./theme";

const ICON = 130;

// Dizziness: a dot slowly orbiting a dashed ring.
const Dizzy: React.FC<{ readonly frame: number }> = ({ frame }) => {
  const a = frame * 0.12;
  return (
    <svg width={ICON} height={ICON} viewBox="0 0 100 100">
      <circle
        cx={50}
        cy={50}
        r={34}
        fill="none"
        stroke={SAGE}
        strokeWidth={3}
        strokeDasharray="6 8"
        transform={`rotate(${frame * 3} 50 50)`}
      />
      <circle
        cx={50 + Math.cos(a) * 34}
        cy={50 + Math.sin(a) * 34}
        r={7}
        fill={INK}
      />
    </svg>
  );
};

// Tremors: a line that trembles.
const Tremor: React.FC<{ readonly frame: number }> = ({ frame }) => {
  const pts = new Array(21).fill(0).map((_, i) => {
    const x = 10 + i * 4;
    const y =
      50 + Math.sin(i * 1.7 + frame * 2.1) * 7 * Math.sin((i / 20) * Math.PI);
    return `${x},${y}`;
  });
  return (
    <svg width={ICON} height={ICON} viewBox="0 0 100 100">
      <polyline
        points={pts.join(" ")}
        fill="none"
        stroke={INK}
        strokeWidth={3.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

// Chest pressure: two bars squeezing a circle.
const Pressure: React.FC<{ readonly frame: number }> = ({ frame }) => {
  const squeeze = 0.5 + 0.5 * Math.sin(frame * 0.18);
  const gap = 26 - squeeze * 10;
  return (
    <svg width={ICON} height={ICON} viewBox="0 0 100 100">
      <ellipse
        cx={50}
        cy={50}
        rx={24 + squeeze * 4}
        ry={gap - 4}
        fill={SAGE}
        opacity={0.85}
      />
      <rect x={18} y={50 - gap - 5} width={64} height={5} rx={2.5} fill={INK} />
      <rect x={18} y={50 + gap} width={64} height={5} rx={2.5} fill={INK} />
    </svg>
  );
};

const Row: React.FC<{
  readonly at: number;
  readonly icon: React.ReactNode;
  readonly children: string;
}> = ({ at, icon, children }) => (
  <SoftText at={at} style={{ display: "flex", alignItems: "center", gap: 44 }}>
    {icon}
    <span
      style={{
        fontFamily: serif,
        fontStyle: "italic",
        fontSize: 92,
        whiteSpace: "nowrap",
        color: INK,
      }}
    >
      {children}
    </span>
  </SoftText>
);

// "Puede sentir mareos, temblores, presión en el pecho" — each symptom
// appears exactly when she says it.
export const SymptomsCard: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <CardFrame length={96}>
      <div
        style={{
          position: "absolute",
          inset: 0,
          padding: "0 110px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 70,
        }}
      >
        <SoftText
          at={3}
          style={{
            fontFamily: sans,
            fontWeight: 300,
            fontSize: 56,
            color: MUTED,
          }}
        >
          Puede sentir
        </SoftText>
        <Row at={17} icon={<Dizzy frame={frame} />}>
          mareos
        </Row>
        <Row at={35} icon={<Tremor frame={frame} />}>
          temblores
        </Row>
        <Row at={57} icon={<Pressure frame={frame} />}>
          presión en el pecho
        </Row>
        <div
          style={{
            height: 3,
            backgroundColor: SAGE,
            width: interpolate(frame, [60, 84], [0, 160], clamp),
          }}
        />
      </div>
    </CardFrame>
  );
};
