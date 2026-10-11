import type React from "react";
import { AbsoluteFill } from "remotion";
import { CountUp, CutFlash, Pop, Rise, Stage } from "./Anim";
import { CARD, GRAY, GREEN, s, WHITE } from "./theme";

const Label: React.FC<{ readonly children: React.ReactNode }> = ({ children }) => (
  <div
    style={{
      display: "inline-block",
      color: GREEN,
      border: `3px solid ${GREEN}`,
      borderRadius: 999,
      padding: "10px 30px",
      fontSize: 36,
      fontWeight: 700,
      letterSpacing: 3,
    }}
  >
    {children}
  </div>
);

// "Con una aseguradora generamos casi 7.000 mensajes de clientes
//  interesados, a un costo de 366 pesos cada uno."
// Times are relative to this scene, which starts 5.4 s into recording 3.
const A = {
  label: s(0.2),
  countFrom: s(1.24),
  countTo: s(2.3),
  messages: s(2.44),
  cost: s(5.04),
  costFrom: s(5.7),
  costTo: s(6.9),
  each: s(7.42),
};

export const InsurerScene: React.FC = () => (
  <Stage>
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", textAlign: "center" }}>
      <Rise at={A.label}>
        <Label>ASEGURADORA</Label>
      </Rise>
      <Pop at={A.countFrom}>
        <div style={{ color: WHITE, fontSize: 250, fontWeight: 800, letterSpacing: -10, lineHeight: 1.05, marginTop: 30 }}>
          <span style={{ fontSize: 80, fontWeight: 500, color: GRAY, letterSpacing: 0 }}>casi </span>
          <CountUp value={7000} from={A.countFrom} to={A.countTo} />
        </div>
      </Pop>
      <Rise at={A.messages}>
        <div style={{ color: WHITE, fontSize: 56, fontWeight: 500 }}>
          mensajes de <b style={{ color: GREEN }}>clientes interesados</b>
        </div>
      </Rise>
      <Rise at={A.cost} style={{ marginTop: 60 }}>
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            gap: 24,
            backgroundColor: CARD,
            borderRadius: 28,
            padding: "26px 48px",
          }}
        >
          <span style={{ color: GRAY, fontSize: 44, fontWeight: 500 }}>a</span>
          <span style={{ color: GREEN, fontSize: 96, fontWeight: 800, letterSpacing: -3 }}>
            <CountUp value={366} from={A.costFrom} to={A.costTo} prefix="$" />
          </span>
          <Rise at={A.each} distance={20}>
            <span style={{ color: WHITE, fontSize: 48, fontWeight: 700 }}>cada uno</span>
          </Rise>
        </div>
      </Rise>
    </AbsoluteFill>
    <CutFlash />
  </Stage>
);

// "Con una tienda de celulares conseguimos más de 5000 consultas por sus productos."
const B = {
  label: s(0.32),
  countFrom: s(1.8),
  countTo: s(2.6),
  queries: s(2.6),
};

export const StoreScene: React.FC = () => (
  <Stage>
    <AbsoluteFill style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 70 }}>
      {/* The insurer result stays on screen, smaller, so both read as a pair. */}
      <div style={{ ...card, opacity: 0.55 }}>
        <Label>ASEGURADORA</Label>
        <div style={bigNumber}>7.000</div>
        <div style={caption}>mensajes · $366 c/u</div>
      </div>
      <Pop at={B.label}>
        <div style={{ ...card, border: `3px solid ${GREEN}55` }}>
          <Label>TIENDA DE CELULARES</Label>
          <div style={{ ...bigNumber, color: WHITE }}>
            <span style={{ color: GREEN }}>+</span>
            <CountUp value={5000} from={B.countFrom} to={B.countTo} />
          </div>
          <Rise at={B.queries}>
            <div style={caption}>consultas por sus productos</div>
          </Rise>
        </div>
      </Pop>
    </AbsoluteFill>
  </Stage>
);

const card: React.CSSProperties = {
  width: 720,
  height: 520,
  backgroundColor: CARD,
  borderRadius: 40,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
};

const bigNumber: React.CSSProperties = {
  color: WHITE,
  fontSize: 170,
  fontWeight: 800,
  letterSpacing: -6,
  lineHeight: 1.1,
  marginTop: 24,
  fontVariantNumeric: "tabular-nums",
};

const caption: React.CSSProperties = { color: "#C9D2CD", fontSize: 40, fontWeight: 500 };
