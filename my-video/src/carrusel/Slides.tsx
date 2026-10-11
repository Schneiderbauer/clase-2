import type React from "react";
import { Img, staticFile } from "remotion";
import {
  ARROW_DOWN,
  ARROW_UP,
  CALCULATOR,
  CARD,
  CHAT,
  COIN_WINGS,
  COINS,
  EMPLOYEE,
  EYE,
  type Icon,
  Pixel,
  QUESTION,
  SHEET,
  SHRUG,
} from "./pixel";
import { CORAL, INK, Mark, MUTED, Slide, SOFT, YELLOW } from "./theme";

const Kicker: React.FC<{ readonly children: React.ReactNode }> = ({ children }) => (
  <div style={{ fontSize: 30, fontWeight: 500, letterSpacing: 4, color: SOFT, marginBottom: 26 }}>→ {children}</div>
);

// Waist-up cut of the seated character (pointing up), anchored to the slide's bottom edge.
const Character: React.FC<{ readonly height: number; readonly style?: React.CSSProperties }> = ({ height, style }) => (
  <Img
    src={staticFile("carrusel/augusto-bust.png")}
    style={{
      position: "absolute",
      height,
      imageRendering: "pixelated",
      filter:
        "drop-shadow(6px 0 0 #fff) drop-shadow(-6px 0 0 #fff) drop-shadow(0 6px 0 #fff) drop-shadow(0 -6px 0 #fff) drop-shadow(0 14px 18px rgba(60,50,30,0.22))",
      ...style,
    }}
  />
);

const h1: React.CSSProperties = { fontSize: 76, fontWeight: 800, letterSpacing: -2.5, lineHeight: 1.08, margin: 0 };
const body: React.CSSProperties = { fontSize: 44, fontWeight: 400, lineHeight: 1.3, color: SOFT, margin: 0 };

// 1 · Hook
export const Slide1: React.FC = () => (
  <Slide n={1}>
    <p style={{ ...h1, fontSize: 70 }}>Si no sabés cuánto te cuesta cada consulta…</p>
    <p style={{ ...body, marginTop: 34 }}>no estás invirtiendo en publicidad.</p>
    <p style={{ ...h1, marginTop: 34, fontSize: 70 }}>
      Estás <Mark>donando plata</Mark>
      <br />
      <Mark>a Meta.</Mark>
    </p>
    <Character height={600} style={{ left: 280, bottom: 0 }} />
    <Pixel icon={COIN_WINGS} size={7} style={{ position: "absolute", left: 60, bottom: 330, rotate: "-8deg" }} />
    <Pixel icon={COIN_WINGS} size={6} style={{ position: "absolute", right: 50, bottom: 400, rotate: "10deg" }} />
  </Slide>
);

// 2 · Problema
const steps: { icon: Icon; size: number; text: React.ReactNode }[] = [
  { icon: CARD, size: 9, text: "Cargás plata." },
  { icon: EYE, size: 9, text: <>La publicación llega a <b>8.000 personas.</b></> },
  { icon: CHAT, size: 9, text: "Entran algunos mensajes." },
  { icon: SHRUG, size: 9, text: <i>“Bueno, algo funciona.”</i> },
];

export const Slide2: React.FC = () => (
  <Slide n={2}>
    <Kicker>EL PROBLEMA</Kicker>
    <p style={h1}>
      Así invierte <Mark>la mayoría:</Mark>
    </p>
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", rowGap: 54, columnGap: 40, marginTop: 70 }}>
      {steps.map((s, i) => (
        <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: 30 }}>
          <div style={{ height: 150, display: "flex", alignItems: "center" }}>
            <Pixel icon={s.icon} size={s.size} />
          </div>
          <div style={{ fontSize: 36, lineHeight: 1.25, color: INK }}>{s.text}</div>
        </div>
      ))}
    </div>
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 26, marginTop: 64 }}>
      <Pixel icon={COINS} size={6} />
      <span style={{ fontSize: 52, fontWeight: 800, letterSpacing: -1 }}>
        Y <Mark>seguís pagando.</Mark>
      </span>
    </div>
  </Slide>
);

// 3 · La pregunta
export const Slide3: React.FC = () => (
  <Slide n={3}>
    <Kicker>LA PREGUNTA</Kicker>
    <p style={{ ...body, color: INK, fontWeight: 500 }}>Ahora te pregunto:</p>
    <p style={{ ...h1, fontSize: 84, marginTop: 20 }}>
      ¿cuánto te costó <Mark>cada persona que te escribió?</Mark>
    </p>
    <div style={{ display: "flex", justifyContent: "center", alignItems: "flex-end", gap: 36, marginTop: 80 }}>
      <Pixel icon={QUESTION} size={10} style={{ rotate: "-10deg" }} />
      <Pixel icon={CHAT} size={12} />
      <Pixel icon={QUESTION} size={14} style={{ rotate: "8deg" }} />
    </div>
    <p style={{ ...body, marginTop: 80, fontSize: 42 }}>
      Si no sabés ese número, <b style={{ color: INK }}>no sabés si estás ganando plata o perdiéndola.</b>
    </p>
  </Slide>
);

// 4 · Analogía
export const Slide4: React.FC = () => (
  <Slide n={4}>
    <Kicker>PENSALO ASÍ</Kicker>
    <p style={{ ...h1, fontSize: 64 }}>Es como tener un empleado que sale a buscar clientes.</p>
    <div style={{ display: "flex", alignItems: "center", gap: 60, marginTop: 70 }}>
      <Pixel icon={EMPLOYEE} size={21} />
      <div style={{ display: "flex", flexDirection: "column", gap: 34 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <Pixel icon={COINS} size={5} />
          <span style={{ fontSize: 44, color: INK }}>Le pagás todos los meses…</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <Pixel icon={QUESTION} size={5} />
          <span style={{ fontSize: 44, color: INK }}>y nunca le preguntás cuántos te trajo.</span>
        </div>
      </div>
    </div>
    <p style={{ ...h1, fontSize: 84, marginTop: 110, textAlign: "center" }}>
      ¿Lo seguirías <Mark>bancando?</Mark>
    </p>
  </Slide>
);

// 5 · Fórmula
const Box: React.FC<{ readonly children: React.ReactNode; readonly style?: React.CSSProperties }> = ({ children, style }) => (
  <div
    style={{
      backgroundColor: "#FFFFFF",
      borderRadius: 28,
      padding: "28px 34px",
      boxShadow: "0 10px 30px rgba(60,50,30,0.10)",
      ...style,
    }}
  >
    {children}
  </div>
);

export const Slide5: React.FC = () => (
  <Slide n={5}>
    <Kicker>LA FÓRMULA</Kicker>
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
      <p style={h1}>
        La cuenta es <Mark>simple:</Mark>
      </p>
      <Pixel icon={CALCULATOR} size={10} style={{ rotate: "6deg" }} />
    </div>
    <Box style={{ marginTop: 44, textAlign: "center" }}>
      <div style={{ fontSize: 44, fontWeight: 700 }}>Lo que invertiste</div>
      <div style={{ fontSize: 70, fontWeight: 800, color: CORAL, lineHeight: 1.1 }}>÷</div>
      <div style={{ fontSize: 44, fontWeight: 700 }}>consultas que te llegaron</div>
      <div style={{ height: 4, backgroundColor: INK, margin: "26px 80px", borderRadius: 2 }} />
      <div style={{ fontSize: 46, fontWeight: 800 }}>
        = <Mark>costo por consulta</Mark>
      </div>
    </Box>
    <div style={{ fontSize: 30, fontWeight: 500, letterSpacing: 4, color: MUTED, marginTop: 44 }}>EJEMPLO</div>
    <div style={{ display: "flex", alignItems: "center", gap: 18, marginTop: 18, flexWrap: "wrap" }}>
      <Box style={{ padding: "18px 26px" }}>
        <span style={{ fontSize: 46, fontWeight: 800 }}>$300.000</span>
      </Box>
      <span style={{ fontSize: 50, fontWeight: 800, color: CORAL }}>÷</span>
      <Box style={{ padding: "18px 26px" }}>
        <span style={{ fontSize: 46, fontWeight: 800 }}>60</span> <span style={{ fontSize: 32 }}>consultas</span>
      </Box>
      <span style={{ fontSize: 50, fontWeight: 800, color: CORAL }}>=</span>
    </div>
    <p style={{ ...h1, fontSize: 72, marginTop: 20 }}>
      <Mark>$5.000</Mark> por consulta
    </p>
  </Slide>
);

// 6 · Por qué importa
const Outcome: React.FC<{ readonly icon: Icon; readonly q: string; readonly a: React.ReactNode }> = ({ icon, q, a }) => (
  <Box style={{ display: "flex", alignItems: "center", gap: 40, padding: "42px 44px" }}>
    <Pixel icon={icon} size={10} sticker={false} />
    <div>
      <div style={{ fontSize: 36, color: SOFT }}>{q}</div>
      <div style={{ fontSize: 44, fontWeight: 800, marginTop: 8, letterSpacing: -0.5, whiteSpace: "nowrap" }}>{a}</div>
    </div>
  </Box>
);

export const Slide6: React.FC = () => (
  <Slide n={6}>
    <Kicker>POR QUÉ IMPORTA</Kicker>
    <p style={{ ...h1, fontSize: 66 }}>
      Si cerrás 1 venta cada 20 consultas, cada venta te costó <Mark>$100.000.</Mark>
    </p>
    <div style={{ fontSize: 34, color: MUTED, marginTop: 28 }}>20 consultas × $5.000 = $100.000</div>
    <div style={{ display: "flex", flexDirection: "column", gap: 36, marginTop: 90 }}>
      <Outcome icon={ARROW_UP} q="¿Un cliente te deja más que eso?" a="La publicidad te hace ganar." />
      <Outcome icon={ARROW_DOWN} q="¿Te deja menos?" a={<span style={{ color: "#C23A33" }}>La estás regalando.</span>} />
    </div>
  </Slide>
);

// 7 · CTA
export const Slide7: React.FC = () => (
  <Slide n={7}>
    <p style={{ ...h1, fontSize: 64, textAlign: "center" }}>Hacé la cuenta con tus números hoy.</p>
    <div style={{ display: "flex", justifyContent: "center", marginTop: 60 }}>
      <Pixel icon={SHEET} size={15} style={{ rotate: "-4deg" }} />
    </div>
    <div
      style={{
        marginTop: 50,
        marginLeft: -20,
        marginRight: -20,
        backgroundColor: YELLOW,
        textAlign: "center",
        padding: "18px 0",
        fontSize: 80,
        fontWeight: 800,
        letterSpacing: -3,
        whiteSpace: "nowrap",
      }}
    >
      Comentá “NÚMEROS”
    </div>
    <p style={{ ...body, textAlign: "center", marginTop: 30, color: INK }}>
      y te mando la planilla que
      <br />
      hace la cuenta por vos.
    </p>
    <p style={{ fontSize: 30, color: MUTED, textAlign: "center", marginTop: 50, lineHeight: 1.35 }}>
      Y seguime para aprender a leer tu publicidad sin tecnicismos.
    </p>
  </Slide>
);

export const SLIDES = [Slide1, Slide2, Slide3, Slide4, Slide5, Slide6, Slide7];
