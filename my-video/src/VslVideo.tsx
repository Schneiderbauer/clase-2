import { Audio } from "@remotion/media";
import { AbsoluteFill, interpolate, Sequence, staticFile, useVideoConfig } from "remotion";
import { FaceScene } from "./vsl/FaceScene";
import { INBOX, InboxScene, MESSAGES, messageAt } from "./vsl/InboxScene";
import { ProcessScene, STEPS } from "./vsl/ProcessScene";
import { A, B, InsurerScene, StoreScene } from "./vsl/ResultsScene";
import { BG, s } from "./vsl/theme";
import { ThumbsUpBubble } from "./vsl/ThumbsUpBubble";
import { T, TrialScene } from "./vsl/TrialScene";

// VSL for clients. The voice runs continuously across the recordings; face
// shots (background blurred offline) alternate with motion graphics wherever
// the script says MOTION. Sound effects follow the graphics; a soft music bed
// runs underneath.
//
// Recording lengths at 30 fps:
//   cara1 220 · cara2 298 · voz3 406 (trial 0–162, results 162–406)
//   voz4 135 · voz5 274 · voz6 271 · cara7 426
const CARA1 = 220;
const CARA2 = 298;
const VOZ3 = 406;
const TRIAL = 162;
const VOZ4 = 135;
const VOZ5 = 274;
const VOZ6 = 271;
const CARA7 = 426;

const AT_CARA2 = CARA1;
const AT_VOZ3 = AT_CARA2 + CARA2;
const AT_INSURER = AT_VOZ3 + TRIAL;
const AT_VOZ4 = AT_VOZ3 + VOZ3;
const AT_VOZ5 = AT_VOZ4 + VOZ4;
const AT_VOZ6 = AT_VOZ5 + VOZ5;
const AT_CARA7 = AT_VOZ6 + VOZ6;

export const VSL_DURATION = AT_CARA7 + CARA7;

// "...poneme sí, dale o un pulgarcito arriba..." (recording 7).
const THUMBS_UP = s(11.6);
const NAME_TAG = 32;

type Sfx = { readonly at: number; readonly file: string; readonly volume?: number };

const SFX: Sfx[] = [
  // 1. Name tag slides in.
  { at: NAME_TAG, file: "soft-whoosh", volume: 0.25 },
  // 3. Trial
  { at: AT_VOZ3 - 4, file: "whoosh", volume: 0.3 },
  { at: AT_VOZ3 + T.days, file: "impact-soft-medium-000", volume: 0.55 },
  ...[0, 3, 6, 9, 12].map((i) => ({
    at: AT_VOZ3 + T.days + Math.round((i * (T.gridEnd - T.days)) / 15),
    file: "pluck-002",
    volume: 0.22,
  })),
  { at: AT_VOZ3 + T.done, file: "success-chime", volume: 0.4 },
  // 4a. Insurer
  { at: AT_INSURER - 3, file: "soft-whoosh", volume: 0.3 },
  { at: AT_INSURER + A.label, file: "select-003", volume: 0.3 },
  { at: AT_INSURER + A.countFrom, file: "riser", volume: 0.18 },
  { at: AT_INSURER + A.countTo, file: "ding-coin", volume: 0.35 },
  { at: AT_INSURER + A.cost, file: "card-slide-8", volume: 0.3 },
  { at: AT_INSURER + A.costTo, file: "ding-coin", volume: 0.3 },
  // 4b. Store
  { at: AT_VOZ4 + B.label, file: "card-slide-8", volume: 0.35 },
  { at: AT_VOZ4 + B.countTo, file: "ding-coin", volume: 0.35 },
  // 5. Process
  { at: AT_VOZ5 - 4, file: "whoosh", volume: 0.3 },
  ...STEPS.map((step, i) => ({
    at: AT_VOZ5 + step.at,
    file: i === STEPS.length - 1 ? "notification-pop" : "bubble-pop",
    volume: i === STEPS.length - 1 ? 0.45 : 0.4,
  })),
  // 6. Inbox fills up
  { at: AT_VOZ6 - 4, file: "soft-whoosh", volume: 0.3 },
  { at: AT_VOZ6 + INBOX.phone, file: "maximize-002", volume: 0.25 },
  ...MESSAGES.map((_, i) => ({
    at: AT_VOZ6 + messageAt(i),
    file: "notification-pop",
    volume: 0.16 + 0.02 * i,
  })),
  { at: AT_VOZ6 + INBOX.noRecording, file: "success-chime", volume: 0.3 },
  { at: AT_VOZ6 + INBOX.noAds, file: "success-chime", volume: 0.3 },
  // 7–8. Thumbs-up bubble
  { at: AT_CARA7 + THUMBS_UP, file: "notification-pop", volume: 0.5 },
];

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
            at: NAME_TAG,
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
      <Sequence name="4a Aseguradora" from={AT_INSURER} durationInFrames={VOZ3 - TRIAL} premountFor={fps}>
        <InsurerScene />
      </Sequence>
      <Sequence name="4b Tienda" from={AT_VOZ4} durationInFrames={VOZ4} premountFor={fps}>
        <StoreScene />
      </Sequence>

      {/* 5. Cómo funciona [MOTION: grabación → anuncio → WhatsApp] */}
      <Sequence name="5 Proceso" from={AT_VOZ5} durationInFrames={VOZ5} premountFor={fps}>
        <ProcessScene />
      </Sequence>

      {/* 6. Qué ganás [MOTION: WhatsApp lleno de mensajes] */}
      <Sequence name="6 Resultado" from={AT_VOZ6} durationInFrames={VOZ6} premountFor={fps}>
        <InboxScene />
      </Sequence>

      {/* 7–8. Llamada + CTA [CARA, pulgar arriba] */}
      <Sequence name="7-8 Llamada y CTA" from={AT_CARA7} durationInFrames={CARA7} premountFor={fps}>
        <FaceScene file="vsl/cara7.mp4">
          <ThumbsUpBubble at={THUMBS_UP} />
        </FaceScene>
      </Sequence>

      {/* Voice for the motion graphics parts (face clips carry their own audio). */}
      {[
        { from: AT_VOZ3, len: VOZ3, file: "voz3" },
        { from: AT_VOZ4, len: VOZ4, file: "voz4" },
        { from: AT_VOZ5, len: VOZ5, file: "voz5" },
        { from: AT_VOZ6, len: VOZ6, file: "voz6" },
      ].map(({ from, len, file }) => (
        <Sequence key={file} name={`Voz ${file}`} from={from} durationInFrames={len} premountFor={fps}>
          <Audio src={staticFile(`vsl/${file}.m4a`)} />
        </Sequence>
      ))}

      {SFX.map(({ at, file, volume = 0.35 }, i) => (
        <Sequence key={`${file}-${i}`} name={`SFX ${file}`} from={Math.max(0, at)} durationInFrames={fps * 2} premountFor={fps}>
          <Audio src={staticFile(`sfx/${file}.mp3`)} volume={volume} />
        </Sequence>
      ))}

      {/* Soft focus music bed, looped under the whole video. */}
      <Audio
        name="Música"
        src={staticFile("music/calm.mp3")}
        loop
        volume={(f) =>
          interpolate(f, [0, fps, VSL_DURATION - fps * 2, VSL_DURATION], [0, 0.09, 0.09, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })
        }
      />
    </AbsoluteFill>
  );
};
