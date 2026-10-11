import type React from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";
import { CutFlash, Rise, Stage } from "./Anim";
import { CARD, clamp, GRAY, GREEN, s, WHITE } from "./theme";

// "Y el resultado de todo esto es que tu WhatsApp esté lleno de mensajes de
//  clientes potenciales, sin que vos tengas que grabar ni saber nada de anuncios."
export const INBOX = {
  title: s(0.26),
  phone: s(2.02),
  firstMessage: s(2.98),
  messageEvery: 6,
  noRecording: s(5.72),
  noAds: s(7.38),
};

export const MESSAGES = [
  { name: "Lucía", text: "Hola! Vi el anuncio, ¿me pasás precio?" },
  { name: "Martín", text: "¿Tienen disponibilidad esta semana?" },
  { name: "Carla", text: "Me interesa, quiero más info" },
  { name: "Diego", text: "Buenas! ¿Cómo trabajan?" },
  { name: "Sofía", text: "¿Puedo ir mañana a la tarde?" },
  { name: "Javier", text: "Hola, vi tu publicidad en Instagram" },
  { name: "Valentina", text: "¿Hacen envíos a mi zona?" },
];

export const messageAt = (i: number) => INBOX.firstMessage + i * INBOX.messageEvery;

const ROW = 112;

export const InboxScene: React.FC = () => {
  const frame = useCurrentFrame();
  const phoneIn = interpolate(frame, [INBOX.phone - 10, INBOX.phone + 8], [0, 1], {
    ...clamp,
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  const visible = MESSAGES.filter((_, i) => frame >= messageAt(i)).length;

  return (
    <Stage>
      <AbsoluteFill style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 130 }}>
        {/* Phone with a WhatsApp chat list that fills up. */}
        <div
          style={{
            width: 560,
            height: 900,
            borderRadius: 64,
            border: "10px solid #26302B",
            backgroundColor: "#0F1412",
            overflow: "hidden",
            opacity: phoneIn,
            translate: `0px ${(1 - phoneIn) * 80}px`,
            boxShadow: `0 40px 120px #00000088, 0 0 90px ${GREEN}22`,
          }}
        >
          <div style={{ backgroundColor: GREEN_HEADER, padding: "54px 34px 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ color: WHITE, fontSize: 40, fontWeight: 700 }}>WhatsApp</div>
            <div
              style={{
                minWidth: 54,
                height: 54,
                borderRadius: 27,
                backgroundColor: GREEN,
                color: "#06240F",
                fontSize: 30,
                fontWeight: 800,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "0 14px",
                scale: String(visible > 0 ? 1 + 0.25 * Math.max(0, 1 - (frame - messageAt(visible - 1)) / 6) : 0),
              }}
            >
              {visible}
            </div>
          </div>
          <div style={{ position: "relative" }}>
            {MESSAGES.map((m, i) => {
              const at = messageAt(i);
              const p = interpolate(frame, [at, at + 8], [0, 1], { ...clamp, easing: Easing.out(Easing.back(1.6)) });
              // Newest message on top: older rows slide down as new ones arrive.
              const slot = interpolate(frame, MESSAGES.map((_, k) => messageAt(k)), MESSAGES.map((_, k) => Math.max(0, k - i)), clamp);
              return (
                <div
                  key={m.name}
                  style={{
                    position: "absolute",
                    left: 0,
                    right: 0,
                    top: slot * ROW,
                    height: ROW,
                    padding: "0 30px",
                    display: "flex",
                    alignItems: "center",
                    gap: 22,
                    opacity: p,
                    scale: String(0.9 + 0.1 * p),
                    borderBottom: "1px solid #1C2420",
                  }}
                >
                  <div
                    style={{
                      width: 70,
                      height: 70,
                      borderRadius: 35,
                      backgroundColor: AVATARS[i % AVATARS.length],
                      color: WHITE,
                      fontSize: 32,
                      fontWeight: 700,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    {m.name[0]}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ color: WHITE, fontSize: 30, fontWeight: 700 }}>{m.name}</div>
                    <div style={{ color: GRAY, fontSize: 25, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      {m.text}
                    </div>
                  </div>
                  <div style={{ width: 22, height: 22, borderRadius: 11, backgroundColor: GREEN, flexShrink: 0 }} />
                </div>
              );
            })}
          </div>
        </div>

        <div style={{ width: 780 }}>
          <Rise at={INBOX.title}>
            <div style={{ color: GREEN, fontSize: 38, fontWeight: 700, letterSpacing: 6 }}>EL RESULTADO</div>
          </Rise>
          <Rise at={INBOX.phone}>
            <div style={{ color: WHITE, fontSize: 92, fontWeight: 800, letterSpacing: -3, lineHeight: 1.05, marginTop: 14 }}>
              Tu WhatsApp lleno de <span style={{ color: GREEN }}>clientes</span>
            </div>
          </Rise>
          <div style={{ marginTop: 60, display: "flex", flexDirection: "column", gap: 24 }}>
            <Rise at={INBOX.noRecording}>
              <Tick label="Sin que tengas que grabar" />
            </Rise>
            <Rise at={INBOX.noAds}>
              <Tick label="Sin saber nada de anuncios" />
            </Rise>
          </div>
        </div>
      </AbsoluteFill>
      <CutFlash />
    </Stage>
  );
};

const GREEN_HEADER = "#1F2C26";
const AVATARS = ["#3B82F6", "#E11D74", "#F59E0B", "#8B5CF6", "#14B8A6", "#EF4444", "#0EA5E9"];

const Tick: React.FC<{ readonly label: string }> = ({ label }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 22, backgroundColor: CARD, borderRadius: 24, padding: "22px 30px" }}>
    <svg width={52} height={52} viewBox="0 0 64 64">
      <circle cx={32} cy={32} r={30} fill={GREEN} />
      <path d="M18 33 L28 43 L46 22" stroke="#06240F" strokeWidth={7} fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
    <div style={{ color: WHITE, fontSize: 42, fontWeight: 700, whiteSpace: "nowrap" }}>{label}</div>
  </div>
);
