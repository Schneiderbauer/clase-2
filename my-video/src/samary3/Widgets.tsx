import type React from "react";
import {
  Easing,
  Img,
  interpolate,
  staticFile,
  useCurrentFrame,
} from "remotion";
import { Emoji } from "./Emoji";
import { clamp, display, INK, RED, SAGE, sans } from "./theme";

// Google-style search bar that types a query.
export const SearchBar: React.FC<{
  readonly text: string;
  readonly typeFrom: number;
  readonly typeTo: number;
}> = ({ text, typeFrom, typeTo }) => {
  const frame = useCurrentFrame();
  const chars = Math.round(
    interpolate(frame, [typeFrom, typeTo], [0, text.length], clamp),
  );
  const caret = Math.floor(frame / 8) % 2 === 0;
  return (
    <div
      style={{
        width: 860,
        display: "flex",
        alignItems: "center",
        gap: 22,
        padding: "26px 36px",
        borderRadius: 999,
        backgroundColor: "white",
        boxShadow: "0 14px 40px rgba(0,0,0,0.22)",
        fontFamily: sans,
        fontWeight: 500,
        fontSize: 46,
        color: INK,
      }}
    >
      <Img
        src={staticFile("emoji/1f50d.png")}
        style={{ width: 56, height: 56 }}
      />
      <span>
        {text.slice(0, chars)}
        <span style={{ opacity: caret ? 1 : 0, color: "#4285F4" }}>|</span>
      </span>
    </div>
  );
};

// Five bars that fill up to the max: "muy intenso".
export const IntensityMeter: React.FC = () => {
  const frame = useCurrentFrame();
  const colors = ["#F5C451", "#F3A33B", "#EE7D33", "#E85A3A", RED];
  return (
    <div
      style={{
        padding: "26px 34px",
        borderRadius: 32,
        backgroundColor: "white",
        boxShadow: "0 14px 40px rgba(0,0,0,0.22)",
        display: "flex",
        flexDirection: "column",
        gap: 16,
        fontFamily: display,
        fontSize: 52,
        color: INK,
      }}
    >
      intensidad
      <div style={{ display: "flex", gap: 12, alignItems: "flex-end" }}>
        {colors.map((c, i) => (
          <div
            key={c}
            style={{
              width: 70,
              height: 40 + i * 22,
              borderRadius: 12,
              backgroundColor: c,
              opacity: interpolate(
                frame,
                [4 + i * 3, 7 + i * 3],
                [0.15, 1],
                clamp,
              ),
              scale: interpolate(frame, [4 + i * 3, 8 + i * 3], [0.6, 1], {
                ...clamp,
                easing: Easing.bezier(0.34, 1.56, 0.64, 1),
              }),
            }}
          />
        ))}
      </div>
    </div>
  );
};

// Emoji + label pill, used for the symptom list.
export const Chip: React.FC<{
  readonly code: string;
  readonly children: string;
}> = ({ code, children }) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: 18,
      padding: "14px 40px 14px 18px",
      borderRadius: 999,
      backgroundColor: "white",
      boxShadow: "0 12px 34px rgba(0,0,0,0.22)",
      fontFamily: display,
      fontSize: 62,
      color: INK,
      whiteSpace: "nowrap",
    }}
  >
    <Emoji code={code} size={110} />
    {children}
  </div>
);

// White card with text and a red scribbled cross drawn over it.
export const CrossedOut: React.FC<{
  readonly children: string;
  readonly crossAt: number;
}> = ({ children, crossAt }) => {
  const frame = useCurrentFrame();
  const draw = interpolate(frame, [crossAt, crossAt + 8], [0, 1], clamp);
  return (
    <div
      style={{
        position: "relative",
        padding: "22px 44px",
        borderRadius: 28,
        backgroundColor: "white",
        boxShadow: "0 12px 34px rgba(0,0,0,0.22)",
      }}
    >
      <div
        style={{
          fontFamily: display,
          fontSize: 70,
          color: INK,
          whiteSpace: "nowrap",
        }}
      >
        {children}
      </div>
      <svg
        viewBox="0 0 100 40"
        preserveAspectRatio="none"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
        }}
      >
        <path
          d="M4 30 C 30 22, 60 14, 96 8"
          fill="none"
          stroke={RED}
          strokeWidth={3.2}
          strokeLinecap="round"
          pathLength={1}
          strokeDasharray={1}
          strokeDashoffset={1 - draw}
          vectorEffect="non-scaling-stroke"
          style={{ strokeWidth: 12 }}
        />
      </svg>
    </div>
  );
};

// Instagram-style DM: a message is typed, then sent.
export const DmChat: React.FC<{
  readonly brand: string;
  readonly message: string;
}> = ({ brand, message }) => {
  const frame = useCurrentFrame();
  const chars = Math.round(
    interpolate(frame, [10, 34], [0, message.length], clamp),
  );
  const sent = frame >= 40;
  return (
    <div
      style={{
        width: 820,
        borderRadius: 40,
        backgroundColor: "white",
        boxShadow: "0 18px 50px rgba(0,0,0,0.25)",
        overflow: "hidden",
        fontFamily: sans,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 20,
          padding: "24px 30px",
          borderBottom: "2px solid #EEE",
        }}
      >
        <div
          style={{
            width: 70,
            height: 70,
            borderRadius: "50%",
            background: `linear-gradient(135deg, ${SAGE}, #C9D3C5)`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            fontWeight: 800,
            fontSize: 36,
          }}
        >
          S
        </div>
        <div style={{ fontWeight: 700, fontSize: 40, color: INK }}>{brand}</div>
      </div>
      <div
        style={{
          padding: "34px 30px",
          minHeight: 170,
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          gap: 10,
        }}
      >
        {sent ? (
          <div
            style={{
              maxWidth: 620,
              padding: "20px 30px",
              borderRadius: 34,
              background: "linear-gradient(135deg, #7B5CFA, #C351D6)",
              color: "white",
              fontSize: 40,
              fontWeight: 500,
              scale: interpolate(frame, [40, 46], [0.6, 1], {
                ...clamp,
                easing: Easing.bezier(0.34, 1.56, 0.64, 1),
              }),
              transformOrigin: "100% 100%",
            }}
          >
            {message}
          </div>
        ) : null}
        {sent ? (
          <div style={{ fontSize: 28, color: "#999" }}>Enviado</div>
        ) : null}
      </div>
      <div
        style={{
          margin: "0 24px 24px",
          padding: "18px 28px",
          borderRadius: 999,
          border: "2px solid #E5E5E5",
          fontSize: 36,
          color: sent ? "#AAA" : INK,
          minHeight: 44,
        }}
      >
        {sent ? "Mensaje…" : message.slice(0, chars)}
      </div>
    </div>
  );
};
