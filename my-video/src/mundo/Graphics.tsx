import type React from "react";
import {
  Easing,
  Img,
  interpolate,
  staticFile,
  useCurrentFrame,
} from "remotion";
import { Emoji } from "../samary3/Emoji";
import { BLUE, clamp, font, GREEN, NAVY, YELLOW } from "./theme";

// "MUNDO SEGURO" brand pill with a shield.
export const BrandPill: React.FC = () => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: 22,
      padding: "18px 44px 18px 22px",
      borderRadius: 999,
      backgroundColor: NAVY,
      boxShadow: "0 16px 40px rgba(0,0,0,0.3)",
      border: `5px solid ${YELLOW}`,
    }}
  >
    <Img
      src={staticFile("emoji/1f6e1_fe0f.png")}
      style={{ width: 96, height: 96 }}
    />
    <div
      style={{
        fontFamily: font,
        fontWeight: 900,
        fontSize: 70,
        color: "white",
        letterSpacing: 1,
        whiteSpace: "nowrap",
      }}
    >
      MUNDO <span style={{ color: YELLOW }}>SEGURO</span>
    </div>
  </div>
);

const Person: React.FC<{ readonly color: string; readonly label: string }> = ({
  color,
  label,
}) => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 14,
    }}
  >
    <svg width={170} height={170} viewBox="0 0 100 100">
      <circle cx={50} cy={50} r={48} fill={color} />
      <circle cx={50} cy={40} r={16} fill="white" />
      <path d="M22 82 C 26 62, 74 62, 78 82 Z" fill="white" />
    </svg>
    <div
      style={{
        fontFamily: font,
        fontWeight: 900,
        fontSize: 40,
        color: NAVY,
        backgroundColor: "white",
        padding: "8px 22px",
        borderRadius: 999,
      }}
    >
      {label}
    </div>
  </div>
);

// You → your referral, with an arrow that draws itself.
export const Referral: React.FC = () => {
  const frame = useCurrentFrame();
  const draw = interpolate(frame, [10, 24], [0, 1], {
    ...clamp,
    easing: Easing.bezier(0.65, 0, 0.35, 1),
  });
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        padding: "30px 40px",
        borderRadius: 40,
        backgroundColor: "rgba(255,255,255,0.92)",
        boxShadow: "0 16px 40px rgba(0,0,0,0.25)",
      }}
    >
      <Person color={BLUE} label="VOS" />
      <svg width={220} height={120} viewBox="0 0 220 120">
        <path
          d="M10 70 C 70 10, 150 10, 200 60"
          fill="none"
          stroke={YELLOW}
          strokeWidth={12}
          strokeLinecap="round"
          pathLength={1}
          strokeDasharray={1}
          strokeDashoffset={1 - draw}
        />
        <path
          d="M178 44 L204 64 L176 76"
          fill="none"
          stroke={YELLOW}
          strokeWidth={12}
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity={draw >= 1 ? 1 : 0}
        />
      </svg>
      <div
        style={{
          opacity: interpolate(frame, [18, 24], [0, 1], clamp),
          scale: interpolate(frame, [18, 26], [0.6, 1], {
            ...clamp,
            easing: Easing.bezier(0.34, 1.56, 0.64, 1),
          }),
        }}
      >
        <Person color={GREEN} label="TU RECOMENDADO" />
      </div>
    </div>
  );
};

// Big starburst badge counting up to 30%.
export const DiscountBadge: React.FC<{ readonly subFrom: number }> = ({
  subFrom,
}) => {
  const frame = useCurrentFrame();
  const n = Math.round(
    interpolate(frame, [0, 16], [0, 30], {
      ...clamp,
      easing: Easing.out(Easing.cubic),
    }),
  );
  const points = new Array(32)
    .fill(0)
    .map((_, i) => {
      const r = i % 2 === 0 ? 300 : 262;
      const a = (i / 32) * Math.PI * 2;
      return `${300 + Math.cos(a) * r},${300 + Math.sin(a) * r}`;
    })
    .join(" ");
  return (
    <div
      style={{
        position: "relative",
        width: 600,
        height: 600,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <svg
        width={600}
        height={600}
        viewBox="0 0 600 600"
        style={{
          position: "absolute",
          rotate: `${frame * 0.6}deg`,
          filter: "drop-shadow(0 18px 40px rgba(0,0,0,0.35))",
        }}
      >
        <polygon points={points} fill={YELLOW} stroke={NAVY} strokeWidth={10} />
      </svg>
      <div
        style={{
          position: "relative",
          fontFamily: font,
          fontWeight: 900,
          fontSize: 230,
          color: NAVY,
          lineHeight: 0.9,
          letterSpacing: -6,
        }}
      >
        {n}%
      </div>
      <div
        style={{
          position: "relative",
          fontFamily: font,
          fontWeight: 900,
          fontSize: 54,
          color: "white",
          backgroundColor: NAVY,
          padding: "8px 26px",
          borderRadius: 14,
          marginTop: 6,
          rotate: "-3deg",
        }}
      >
        DE DESCUENTO
      </div>
      <div
        style={{
          position: "absolute",
          bottom: -60,
          fontFamily: font,
          fontWeight: 800,
          fontSize: 44,
          color: NAVY,
          backgroundColor: "white",
          padding: "10px 28px",
          borderRadius: 999,
          boxShadow: "0 10px 26px rgba(0,0,0,0.25)",
          whiteSpace: "nowrap",
          opacity: interpolate(frame, [subFrom, subFrom + 6], [0, 1], clamp),
          translate: interpolate(
            frame,
            [subFrom, subFrom + 8],
            ["0px 20px", "0px 0px"],
            clamp,
          ),
        }}
      >
        en la próxima póliza
      </div>
    </div>
  );
};

// "ENVIÁSELO" share button with a paper plane flying off.
export const ShareIt: React.FC = () => {
  const frame = useCurrentFrame();
  const press = interpolate(frame, [12, 15, 19], [1, 0.9, 1], clamp);
  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        gap: 24,
        padding: "26px 52px",
        borderRadius: 999,
        backgroundColor: YELLOW,
        border: `6px solid ${NAVY}`,
        boxShadow: "0 16px 40px rgba(0,0,0,0.3)",
        scale: press,
      }}
    >
      <div
        style={{ fontFamily: font, fontWeight: 900, fontSize: 76, color: NAVY }}
      >
        ENVIÁSELO
      </div>
      <div
        style={{
          translate: `${interpolate(frame, [16, 34], [0, 360], { ...clamp, easing: Easing.in(Easing.quad) })}px ${interpolate(frame, [16, 34], [0, -260], { ...clamp, easing: Easing.in(Easing.quad) })}px`,
          rotate: `${interpolate(frame, [16, 34], [0, -18], clamp)}deg`,
        }}
      >
        <Emoji code="1f4e4.png" size={110} />
      </div>
    </div>
  );
};
