import type React from "react";
import {
  AbsoluteFill,
  Easing,
  Img,
  interpolate,
  staticFile,
  useCurrentFrame,
} from "remotion";
import { Emoji } from "../samary3/Emoji";
import { Background, Chip, Particles, Shockwave, Slam, useShake } from "./Fx";
import { Phone } from "./Phone";
import { BLACK, clamp, font, YELLOW } from "./theme";

const center: React.CSSProperties = {
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
};

const float = (frame: number, amp = 12) =>
  `0px ${Math.sin(frame / 14) * amp}px`;

// 1 · Hook: one word per beat, colors flip on every hit.
export const HookScene: React.FC = () => {
  const frame = useCurrentFrame();
  const shake = useShake([0, 30, 60, 90]);
  const words = ["TU\nPRÓXIMO", "iPHONE", "ESTÁ", "ACÁ"];
  const i = Math.min(3, Math.floor(frame / 30));
  const yellow = i % 2 === 1;
  return (
    <AbsoluteFill
      style={{
        ...center,
        backgroundColor: yellow ? YELLOW : BLACK,
        translate: shake,
      }}
    >
      <Slam
        key={i}
        at={i * 30}
        size={i === 0 ? 210 : i === 1 ? 230 : 280}
        color={yellow ? BLACK : "white"}
        style={{ whiteSpace: "pre" }}
      >
        {words[i]}
      </Slam>
      {i === 3 ? (
        <div style={{ marginTop: 40, translate: float(frame, 20) }}>
          <Emoji code="1f929" size={220} />
        </div>
      ) : null}
    </AbsoluteFill>
  );
};

// 2 · Logo slam on the drop.
export const LogoScene: React.FC = () => {
  const frame = useCurrentFrame();
  const shake = useShake([0], 34);
  const handle = "@IPHONEBA_";
  const chars = Math.round(
    interpolate(frame, [30, 66], [0, handle.length], clamp),
  );
  return (
    <AbsoluteFill style={{ translate: shake }}>
      <Background />
      <Shockwave at={0} y={820} />
      <Particles at={0} y={820} count={48} />
      <Img
        src={staticFile("logos/iphoneba-600.png")}
        style={{
          position: "absolute",
          left: 540 - 260,
          top: 820 - 260,
          width: 520,
          height: 520,
          borderRadius: 90,
          boxShadow: "0 0 120px rgba(236,217,45,0.45)",
          scale: interpolate(frame, [0, 8, 14], [2.4, 0.92, 1], {
            ...clamp,
            easing: Easing.bezier(0.2, 0.9, 0.3, 1),
          }),
          rotate: `${interpolate(frame, [0, 14], [-12, 0], clamp)}deg`,
          filter: `blur(${interpolate(frame, [0, 6], [12, 0], clamp)}px)`,
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 1180,
          width: "100%",
          textAlign: "center",
          fontFamily: font,
          fontWeight: 800,
          fontSize: 96,
          color: YELLOW,
          letterSpacing: -2,
        }}
      >
        {handle.slice(0, chars)}
        <span style={{ opacity: Math.floor(frame / 10) % 2 ? 0 : 1 }}>|</span>
      </div>
      <div
        style={{
          position: "absolute",
          top: 1320,
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Chip at={72} invert>
          TU TIENDA DE TECNOLOGÍA
        </Chip>
      </div>
    </AbsoluteFill>
  );
};

// 3 · Whole iPhone line, 13 → 18, one model per beat.
export const IphoneLineScene: React.FC = () => {
  const frame = useCurrentFrame();
  const models = [13, 14, 15, 16, 17, 18];
  const idx = Math.max(0, Math.min(5, Math.floor((frame - 30) / 30)));
  const local = (frame - 30) % 30;
  const shake = useShake(
    models.map((_, i) => 30 + i * 30),
    10,
  );
  return (
    <AbsoluteFill style={{ translate: shake }}>
      <Background />
      <div
        style={{
          position: "absolute",
          top: 170,
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Slam at={0} size={110}>
          TODA LA LÍNEA
        </Slam>
        <Slam at={8} size={190} color={YELLOW}>
          iPHONE
        </Slam>
      </div>
      {frame >= 30 ? (
        <div
          style={{
            position: "absolute",
            left: 540 - 190,
            top: 640,
            transform: `perspective(1400px) rotateY(${Math.sin(frame / 20) * 14}deg)`,
            scale: interpolate(local, [0, 4, 9], [1.12, 0.97, 1], clamp),
          }}
        >
          <Phone label={String(models[idx])} hue={40 + idx * 45} width={380} />
        </div>
      ) : null}
      {frame >= 30 ? (
        <div
          style={{
            position: "absolute",
            top: 1480,
            width: "100%",
            display: "flex",
            justifyContent: "center",
            gap: 18,
          }}
        >
          {models.map((m, i) => (
            <div
              key={m}
              style={{
                width: 120,
                height: 120,
                borderRadius: 30,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: font,
                fontWeight: 800,
                fontSize: 56,
                backgroundColor: i <= idx ? YELLOW : "rgba(255,255,255,0.08)",
                color: i <= idx ? BLACK : "rgba(255,255,255,0.4)",
                scale:
                  i === idx
                    ? interpolate(local, [0, 5, 10], [1.3, 0.95, 1], clamp)
                    : 1,
              }}
            >
              {m}
            </div>
          ))}
        </div>
      ) : null}
      <div
        style={{
          position: "absolute",
          top: 1660,
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Chip at={190}>DEL 13 AL 18</Chip>
      </div>
    </AbsoluteFill>
  );
};

// 4 · Trade-in plan: old phone out, new phone in.
export const TradeInScene: React.FC = () => {
  const frame = useCurrentFrame();
  const shake = useShake([0, 30, 60], 14);
  const swap = interpolate(frame, [26, 44], [0, 1], {
    ...clamp,
    easing: Easing.bezier(0.65, 0, 0.35, 1),
  });
  return (
    <AbsoluteFill style={{ translate: shake }}>
      <Background />
      <div
        style={{
          position: "absolute",
          top: 170,
          width: "100%",
          display: "flex",
          justifyContent: "center",
          gap: 30,
        }}
      >
        <Slam at={0} size={170}>
          PLAN
        </Slam>
        <Slam at={6} size={170} color={YELLOW}>
          CANJE
        </Slam>
      </div>
      <div
        style={{
          position: "absolute",
          left: 540 - 130 + interpolate(swap, [0, 1], [-200, -520]),
          top: 560,
          opacity: 1 - swap * 0.9,
          rotate: `${-swap * 25}deg`,
        }}
      >
        <Phone label="USADO" dim width={260} />
      </div>
      <div
        style={{
          position: "absolute",
          left: 540 - 150 + interpolate(swap, [0, 1], [520, 0]),
          top: 520,
          scale: 0.7 + swap * 0.3,
        }}
      >
        <Phone label="NUEVO" hue={50} width={300} />
      </div>
      <div
        style={{
          position: "absolute",
          left: 540 - 90,
          top: 780,
          rotate: `${frame * 9}deg`,
          opacity: interpolate(frame, [10, 16, 40, 48], [0, 1, 1, 0], clamp),
        }}
      >
        <Emoji code="1f504.png" size={180} />
      </div>
      <div
        style={{
          position: "absolute",
          top: 1300,
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 30,
        }}
      >
        <Chip at={30}>ENTREGÁ TU USADO</Chip>
        <Chip at={60} invert>
          <span style={{ color: YELLOW }}>LLEVATE EL NUEVO</span>
        </Chip>
      </div>
    </AbsoluteFill>
  );
};

type ProductProps = {
  readonly title: string;
  readonly accent: string;
  readonly emoji: string;
  readonly items: readonly [string, string];
  readonly extra?: React.ReactNode;
  readonly accentSize?: number;
};

// 5–7 · Product category: title, big animated icon, two items on the beats.
export const ProductScene: React.FC<ProductProps> = ({
  title,
  accent,
  emoji,
  items,
  extra,
  accentSize = 150,
}) => {
  const frame = useCurrentFrame();
  const shake = useShake([0, 30, 60], 16);
  return (
    <AbsoluteFill style={{ translate: shake }}>
      <Background />
      <div
        style={{
          position: "absolute",
          top: 170,
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Slam at={0} size={150}>
          {title}
        </Slam>
        <Slam at={6} size={accentSize} color={YELLOW}>
          {accent}
        </Slam>
      </div>
      <div
        style={{
          position: "absolute",
          left: 540 - 220,
          top: 640,
          translate: float(frame, 18),
          rotate: `${Math.sin(frame / 12) * 6}deg`,
          scale: interpolate(
            frame,
            [0, 8, 14, 30, 34, 40, 60, 64, 70],
            [0, 1.15, 1, 1, 1.12, 1, 1, 1.12, 1],
            { ...clamp, easing: Easing.bezier(0.34, 1.56, 0.64, 1) },
          ),
        }}
      >
        <Emoji code={emoji} size={440} />
      </div>
      {extra}
      <div
        style={{
          position: "absolute",
          top: 1240,
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 30,
        }}
      >
        <Chip at={30}>{items[0]}</Chip>
        <Chip at={60} invert>
          <span style={{ color: YELLOW }}>{items[1]}</span>
        </Chip>
      </div>
    </AbsoluteFill>
  );
};

// Viewfinder corners + blinking REC for the camera scene.
export const Viewfinder: React.FC = () => {
  const frame = useCurrentFrame();
  const corner = (r: number, x: number, y: number) => (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: 90,
        height: 90,
        borderTop: `8px solid ${YELLOW}`,
        borderLeft: `8px solid ${YELLOW}`,
        rotate: `${r}deg`,
      }}
    />
  );
  return (
    <>
      {corner(0, 230, 600)}
      {corner(90, 760, 600)}
      {corner(270, 230, 1110)}
      {corner(180, 760, 1110)}
      <div
        style={{
          position: "absolute",
          left: 250,
          top: 540,
          fontFamily: font,
          fontWeight: 800,
          fontSize: 40,
          color: "white",
          display: "flex",
          alignItems: "center",
          gap: 12,
        }}
      >
        <div
          style={{
            width: 26,
            height: 26,
            borderRadius: "50%",
            backgroundColor: "#FF3B30",
            opacity: Math.floor(frame / 15) % 2 ? 0.2 : 1,
          }}
        />
        REC
      </div>
    </>
  );
};

// Equalizer bars for the microphone scene.
export const SoundBars: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <div
      style={{
        position: "absolute",
        top: 1110,
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: 14,
        height: 120,
      }}
    >
      {new Array(13).fill(0).map((_, i) => (
        <div
          key={i}
          style={{
            width: 22,
            borderRadius: 11,
            backgroundColor: YELLOW,
            height:
              20 +
              Math.abs(
                Math.sin(frame / 4 + i * 0.9) * Math.sin(frame / 9 + i),
              ) *
                110,
          }}
        />
      ))}
    </div>
  );
};

// 8 · Recap grid.
export const RecapScene: React.FC = () => {
  const frame = useCurrentFrame();
  const shake = useShake([30, 45, 60, 75], 10);
  const tiles: Array<[string, string, number]> = [
    ["1f4f1.png", "iPHONE", 30],
    ["1f504.png", "PLAN CANJE", 45],
    ["1f3ae.png", "CONSOLAS", 60],
    ["1f4f7", "DJI", 75],
  ];
  return (
    <AbsoluteFill style={{ translate: shake }}>
      <Background />
      <div
        style={{
          position: "absolute",
          top: 200,
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Slam at={0} size={130}>
          TODO EN UN
        </Slam>
        <Slam at={8} size={150} color={YELLOW}>
          SOLO LUGAR
        </Slam>
      </div>
      <div
        style={{
          position: "absolute",
          top: 640,
          left: 90,
          right: 90,
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 40,
        }}
      >
        {tiles.map(([code, label, at]) => (
          <div
            key={label}
            style={{
              height: 400,
              borderRadius: 48,
              border: `5px solid ${YELLOW}`,
              backgroundColor: "rgba(236,217,45,0.08)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 20,
              opacity: interpolate(frame, [at, at + 2], [0, 1], clamp),
              scale: interpolate(frame, [at, at + 6, at + 10], [0.4, 1.08, 1], {
                ...clamp,
                easing: Easing.bezier(0.34, 1.56, 0.64, 1),
              }),
            }}
          >
            <Emoji code={code} size={190} />
            <div
              style={{
                fontFamily: font,
                fontWeight: 800,
                fontSize: 56,
                color: "white",
                letterSpacing: -1,
              }}
            >
              {label}
            </div>
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
};

// 9 · Question + DM being typed (music break).
export const QuestionScene: React.FC = () => {
  const frame = useCurrentFrame();
  const msg = "¡Hola! Quiero info";
  const chars = Math.round(
    interpolate(frame, [40, 76], [0, msg.length], clamp),
  );
  const sent = frame >= 92;
  return (
    <AbsoluteFill>
      <Background />
      <div
        style={{
          position: "absolute",
          top: 220,
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Slam at={0} size={150}>
          ¿QUÉ ESTÁS
        </Slam>
        <Slam at={14} size={150} color={YELLOW}>
          ESPERANDO?
        </Slam>
      </div>
      <div
        style={{
          position: "absolute",
          left: 110,
          right: 110,
          top: 760,
          borderRadius: 50,
          backgroundColor: "#151515",
          border: `3px solid rgba(236,217,45,0.4)`,
          padding: 40,
          fontFamily: font,
          opacity: interpolate(frame, [28, 34], [0, 1], clamp),
          translate: interpolate(frame, [28, 38], ["0px 80px", "0px 0px"], {
            ...clamp,
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          }),
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 22,
            paddingBottom: 30,
            borderBottom: "2px solid #2a2a2a",
          }}
        >
          <Img
            src={staticFile("logos/iphoneba-600.png")}
            style={{ width: 90, height: 90, borderRadius: "50%" }}
          />
          <div style={{ color: "white", fontWeight: 700, fontSize: 44 }}>
            iphoneba_
          </div>
        </div>
        <div
          style={{
            minHeight: 200,
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "flex-end",
            paddingTop: 30,
          }}
        >
          {sent ? (
            <div
              style={{
                padding: "24px 36px",
                borderRadius: 40,
                backgroundColor: YELLOW,
                color: BLACK,
                fontWeight: 700,
                fontSize: 52,
                scale: interpolate(frame, [92, 98], [0.5, 1], {
                  ...clamp,
                  easing: Easing.bezier(0.34, 1.56, 0.64, 1),
                }),
              }}
            >
              {msg}
            </div>
          ) : null}
        </div>
        <div
          style={{
            marginTop: 26,
            padding: "22px 32px",
            borderRadius: 999,
            backgroundColor: "#222",
            color: sent ? "#666" : "white",
            fontSize: 44,
            fontWeight: 500,
          }}
        >
          {sent ? "Mensaje…" : msg.slice(0, chars)}
        </div>
      </div>
    </AbsoluteFill>
  );
};

// 10 · Final CTA on the last hit.
export const CtaScene: React.FC = () => {
  const frame = useCurrentFrame();
  const shake = useShake([0], 30);
  const pulse =
    1 + Math.max(0, Math.sin((frame - 20) / 5)) * 0.05 * (frame > 20 ? 1 : 0);
  return (
    <AbsoluteFill style={{ backgroundColor: YELLOW, translate: shake }}>
      <Shockwave at={0} y={560} />
      <Img
        src={staticFile("logos/iphoneba-600.png")}
        style={{
          position: "absolute",
          left: 540 - 200,
          top: 360,
          width: 400,
          height: 400,
          borderRadius: 80,
          boxShadow: "0 30px 80px rgba(0,0,0,0.35)",
          scale: interpolate(frame, [0, 8, 14], [2, 0.92, 1], {
            ...clamp,
            easing: Easing.bezier(0.2, 0.9, 0.3, 1),
          }),
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 860,
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Slam at={6} size={150} color={BLACK}>
          DEJANOS UN
        </Slam>
        <Slam at={12} size={180} color={BLACK}>
          MENSAJE
        </Slam>
      </div>
      <div
        style={{
          position: "absolute",
          top: 1300,
          width: "100%",
          display: "flex",
          justifyContent: "center",
          scale: pulse,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 20,
            padding: "30px 60px",
            borderRadius: 999,
            backgroundColor: BLACK,
            color: YELLOW,
            fontFamily: font,
            fontWeight: 800,
            fontSize: 70,
            opacity: interpolate(frame, [18, 22], [0, 1], clamp),
            scale: interpolate(frame, [18, 24, 28], [0.4, 1.1, 1], {
              ...clamp,
              easing: Easing.bezier(0.34, 1.56, 0.64, 1),
            }),
          }}
        >
          <Emoji code="1f4ac" size={90} />
          ESCRIBINOS POR DM
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          top: 1520,
          width: "100%",
          textAlign: "center",
          fontFamily: font,
          fontWeight: 800,
          fontSize: 84,
          color: BLACK,
          opacity: interpolate(frame, [28, 34], [0, 1], clamp),
        }}
      >
        @IPHONEBA_
      </div>
    </AbsoluteFill>
  );
};
