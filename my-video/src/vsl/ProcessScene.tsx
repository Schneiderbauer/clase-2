import type React from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";
import { CutFlash, Pop, Rise, Stage } from "./Anim";
import { CARD, clamp, GRAY, GREEN, s, WHITE } from "./theme";

// "El proceso es simple: grabamos tus productos o tus servicios, mostramos
//  resultados reales y preparamos anuncios que le hablan a personas que ya
//  están listas para comprar."
type Step = {
  readonly at: number;
  readonly title: string;
  readonly sub: string;
  readonly icon: React.FC<{ readonly color: string }>;
};

export const STEPS: Step[] = [
  { at: s(1.38), title: "Grabamos", sub: "tus productos o servicios", icon: CameraIcon },
  { at: s(3.38), title: "Resultados reales", sub: "que generan confianza", icon: StarIcon },
  { at: s(5.28), title: "Anuncios", sub: "a gente lista para comprar", icon: MegaphoneIcon },
  { at: s(7.72), title: "WhatsApp", sub: "consultas con intención", icon: ChatIcon },
];

const NODE = 200;
const GAP = 210;
const ROW_WIDTH = STEPS.length * NODE + (STEPS.length - 1) * GAP;

export const ProcessScene: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <Stage>
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
        <Rise at={0}>
          <div style={{ color: WHITE, fontSize: 76, fontWeight: 800, letterSpacing: -2, marginBottom: 110 }}>
            El proceso es <span style={{ color: GREEN }}>simple</span>
          </div>
        </Rise>

        <div style={{ position: "relative", width: ROW_WIDTH, height: NODE + 190 }}>
          {/* Connector lines that draw from one step to the next. */}
          {STEPS.slice(1).map((step, i) => {
            const prev = STEPS[i];
            const p = interpolate(frame, [prev.at + 8, step.at], [0, 1], {
              ...clamp,
              easing: Easing.inOut(Easing.cubic),
            });
            const left = i * (NODE + GAP) + NODE + 20;
            return (
              <div key={step.title}>
                <div style={{ ...line, left, backgroundColor: "#24302A" }} />
                <div style={{ ...line, left, width: (GAP - 40) * p, backgroundColor: GREEN }} />
              </div>
            );
          })}

          {STEPS.map((step, i) => {
            const active = frame >= step.at;
            const Icon = step.icon;
            const isLast = i === STEPS.length - 1;
            const pulse = isLast && active ? 1 + 0.05 * Math.sin((frame - step.at) / 4) : 1;
            return (
              <div
                key={step.title}
                style={{ position: "absolute", left: i * (NODE + GAP), width: NODE, top: 0 }}
              >
                <Pop at={step.at}>
                  <div
                    style={{
                      width: NODE,
                      height: NODE,
                      borderRadius: 52,
                      backgroundColor: isLast ? GREEN : CARD,
                      border: `4px solid ${active ? GREEN : "#24302A"}`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      scale: String(pulse),
                      boxShadow: isLast && active ? `0 0 80px ${GREEN}88` : "none",
                    }}
                  >
                    <Icon color={isLast ? "#06240F" : GREEN} />
                  </div>
                </Pop>
                <Rise at={step.at + 4} style={{ position: "absolute", top: NODE + 34, left: -100, width: NODE + 200, textAlign: "center" }}>
                  <div style={{ color: WHITE, fontSize: 42, fontWeight: 700, whiteSpace: "nowrap" }}>{step.title}</div>
                  <div style={{ color: GRAY, fontSize: 29, fontWeight: 500, marginTop: 8, whiteSpace: "nowrap" }}>{step.sub}</div>
                </Rise>
              </div>
            );
          })}
        </div>
      </AbsoluteFill>
      <CutFlash />
    </Stage>
  );
};

const line: React.CSSProperties = {
  position: "absolute",
  top: NODE / 2 - 4,
  height: 8,
  width: GAP - 40,
  borderRadius: 4,
};

function CameraIcon({ color }: { readonly color: string }) {
  return (
    <svg width={110} height={110} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <rect x={2} y={6} width={14} height={12} rx={3} />
      <path d="M16 10.5 L22 7 V17 L16 13.5" />
    </svg>
  );
}

function StarIcon({ color }: { readonly color: string }) {
  return (
    <svg width={110} height={110} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.8} strokeLinejoin="round">
      <path d="M12 2.8 L14.8 8.6 L21.2 9.4 L16.5 13.8 L17.7 20.2 L12 17.1 L6.3 20.2 L7.5 13.8 L2.8 9.4 L9.2 8.6 Z" />
    </svg>
  );
}

function MegaphoneIcon({ color }: { readonly color: string }) {
  return (
    <svg width={110} height={110} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 10 V14 H7 L15 19 V5 L7 10 Z" />
      <path d="M7 14 L8.5 20 H11 L10 14.8" />
      <path d="M18.5 9 A4 4 0 0 1 18.5 15" />
    </svg>
  );
}

function ChatIcon({ color }: { readonly color: string }) {
  return (
    <svg width={110} height={110} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.9} strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.5 11.6 A8.5 8.5 0 0 1 8 19.1 L3.5 20.5 L4.9 16.2 A8.5 8.5 0 1 1 20.5 11.6 Z" />
      <path d="M9 9.5 C9 12.5 11.5 15 14.5 15 L15.8 13.7 L14 12.6 L12.9 13.3 C11.9 12.8 11.2 12.1 10.7 11.1 L11.4 10 L10.3 8.2 Z" fill={color} stroke="none" />
    </svg>
  );
}
