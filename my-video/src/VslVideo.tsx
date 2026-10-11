import { Audio } from "@remotion/media";
import { AbsoluteFill, Sequence, staticFile, useVideoConfig } from "remotion";
import { FaceScene } from "./vsl/FaceScene";
import { ProcessScene } from "./vsl/ProcessScene";
import { InsurerScene, StoreScene } from "./vsl/ResultsScene";
import { BG } from "./vsl/theme";
import { TrialScene } from "./vsl/TrialScene";

// VSL for clients. The voice runs continuously across the five recordings;
// face shots (background blurred offline) alternate with motion graphics
// wherever the script says MOTION.
//
// Recording lengths at 30 fps:
//   cara1 220 · cara2 298 · voz3 406 (trial 0–162, results 162–406)
//   voz4 135 · voz5 274
const CARA1 = 220;
const CARA2 = 298;
const VOZ3 = 406;
const TRIAL = 162;
const VOZ4 = 135;
const VOZ5 = 274;

const AT_CARA2 = CARA1;
const AT_VOZ3 = AT_CARA2 + CARA2;
const AT_VOZ4 = AT_VOZ3 + VOZ3;
const AT_VOZ5 = AT_VOZ4 + VOZ4;

export const VSL_DURATION = AT_VOZ5 + VOZ5;

export const VslVideo: React.FC = () => {
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill style={{ backgroundColor: BG }}>
      {/* 1. Quién sos [CARA] */}
      <Sequence name="1 Quién sos" durationInFrames={CARA1} premountFor={fps}>
        <FaceScene
          file="vsl/cara1.mp4"
          lowerThird={{
            title: "Augusto",
            subtitle: "Clientes por WhatsApp con anuncios en Instagram y Facebook",
            at: 32,
          }}
        />
      </Sequence>

      {/* 2. Oferta [CARA] */}
      <Sequence name="2 Oferta" from={AT_CARA2} durationInFrames={CARA2} premountFor={fps}>
        <FaceScene file="vsl/cara2.mp4" />
      </Sequence>

      {/* 3. Reversión de riesgo [MOTION: 15 días de prueba] */}
      <Sequence name="3 Prueba 15 días" from={AT_VOZ3} durationInFrames={TRIAL} premountFor={fps}>
        <TrialScene />
      </Sequence>

      {/* 4. Resultados [MOTION: números grandes] */}
      <Sequence name="4a Aseguradora" from={AT_VOZ3 + TRIAL} durationInFrames={VOZ3 - TRIAL} premountFor={fps}>
        <InsurerScene />
      </Sequence>
      <Sequence name="4b Tienda" from={AT_VOZ4} durationInFrames={VOZ4} premountFor={fps}>
        <StoreScene />
      </Sequence>

      {/* 5. Cómo funciona [MOTION: grabación → anuncio → WhatsApp] */}
      <Sequence name="5 Proceso" from={AT_VOZ5} durationInFrames={VOZ5} premountFor={fps}>
        <ProcessScene />
      </Sequence>

      {/* Voice for the motion graphics parts (face clips carry their own audio). */}
      <Sequence name="Voz 3" from={AT_VOZ3} durationInFrames={VOZ3} premountFor={fps}>
        <Audio src={staticFile("vsl/voz3.m4a")} />
      </Sequence>
      <Sequence name="Voz 4" from={AT_VOZ4} durationInFrames={VOZ4} premountFor={fps}>
        <Audio src={staticFile("vsl/voz4.m4a")} />
      </Sequence>
      <Sequence name="Voz 5" from={AT_VOZ5} durationInFrames={VOZ5} premountFor={fps}>
        <Audio src={staticFile("vsl/voz5.m4a")} />
      </Sequence>
    </AbsoluteFill>
  );
};
