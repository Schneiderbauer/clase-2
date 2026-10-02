import { Audio } from "@remotion/media";
import {
  AbsoluteFill,
  interpolate,
  Sequence,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { Ecg } from "./samary/Ecg";
import { Captions } from "./samary3/Captions";
import { Emoji } from "./samary3/Emoji";
import { Pop } from "./samary3/Pop";
import { Speaker } from "./samary3/Speaker";
import { Sticker } from "./samary3/Sticker";
import { script } from "./samary3/theme";
import {
  Chip,
  CrossedOut,
  DmChat,
  IntensityMeter,
  SearchBar,
} from "./samary3/Widgets";

// Samary · "Ataques de pánico" — busy UGC edit modelled on the client's
// reference: the speaker stays on screen while stickers, animated emoji,
// UI elements and bold text pop in every 1–3 seconds, each on the exact
// word (timings from the forced-aligned transcript in samary/captions.ts).
//   0–300 Take 1 · 300–567 Take 2 · 567–811 Take 3
export const SamaryVideoV3: React.FC = () => {
  const { fps } = useVideoConfig();
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ backgroundColor: "black" }}>
      <Sequence name="Take 1" durationInFrames={300} premountFor={fps}>
        <Speaker
          src={staticFile("clips/clip1.mp4")}
          trimBefore={9}
          baseScale={1.02}
        />
      </Sequence>
      <Sequence
        name="Take 2"
        from={300}
        durationInFrames={267}
        premountFor={fps}
      >
        <Speaker
          src={staticFile("clips/clip2.mp4")}
          trimBefore={0}
          baseScale={1.14}
          punches={[44]}
        />
      </Sequence>
      <Sequence
        name="Take 3"
        from={567}
        durationInFrames={244}
        premountFor={fps}
      >
        <Speaker
          src={staticFile("clips/clip3.mp4")}
          trimBefore={3}
          baseScale={1.02}
          punches={[124]}
        />
      </Sequence>

      <Sequence
        name="Heartbeat line"
        from={48}
        durationInFrames={82}
        premountFor={fps}
      >
        <AbsoluteFill
          style={{
            opacity: interpolate(frame, [116, 130], [1, 0], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          <Ecg />
        </AbsoluteFill>
      </Sequence>

      <Sequence name="Título"  durationInFrames={52} premountFor={fps}>
        <Pop dur={52} x={540} y={330} rotate={-4}>
          <Sticker size={130}>{"¿ATAQUE\nDE PÁNICO?"}</Sticker>
        </Pop>
      </Sequence>
      <Sequence
        name="Falta el aire"
        from={4}
        durationInFrames={48}
        premountFor={fps}
      >
        <Pop dur={48} x={860} y={560} rotate={8}>
          <Emoji code="1f62e_200d_1f4a8" size={200} />
        </Pop>
      </Sequence>
      <Sequence
        name="Corazón"
        from={40}
        durationInFrames={70}
        premountFor={fps}
      >
        <Pop dur={70} x={180} y={560} rotate={-6}>
          <Emoji code="1f493" size={210} />
        </Pop>
      </Sequence>
      <Sequence name="Miedo" from={84} durationInFrames={64} premountFor={fps}>
        <Pop dur={64} x={880} y={600} rotate={6}>
          <Emoji code="1f628" size={210} />
        </Pop>
      </Sequence>
      <Sequence
        name="Sin control"
        from={112}
        durationInFrames={40}
        premountFor={fps}
      >
        <Pop dur={40} x={540} y={330} rotate={-5}>
          <Sticker size={120}>SIN CONTROL</Sticker>
        </Pop>
      </Sequence>
      <Sequence
        name="Búsqueda"
        from={152}
        durationInFrames={84}
        premountFor={fps}
      >
        <Pop dur={84} x={540} y={330} rotate={0}>
          <SearchBar
            text="¿me está pasando algo grave?"
            typeFrom={4}
            typeTo={44}
          />
        </Pop>
      </Sequence>
      <Sequence
        name="Algo grave"
        from={202}
        durationInFrames={36}
        premountFor={fps}
      >
        <Pop dur={36} x={870} y={560} rotate={10}>
          <Emoji code="26a0_fe0f" size={180} />
        </Pop>
      </Sequence>
      <Sequence
        name="Cerebro"
        from={244}
        durationInFrames={44}
        premountFor={fps}
      >
        <Pop dur={44} x={200} y={560} rotate={-8}>
          <Emoji code="1f9e0" size={200} />
        </Pop>
      </Sequence>
      <Sequence
        name="Ataque de pánico"
        from={274}
        durationInFrames={66}
        premountFor={fps}
      >
        <Pop dur={66} x={540} y={330} rotate={3}>
          <Sticker size={140} color="#FCE7EE">
            {"ATAQUE\nDE PÁNICO"}
          </Sticker>
        </Pop>
      </Sequence>
      <Sequence
        name="De golpe"
        from={342}
        durationInFrames={40}
        premountFor={fps}
      >
        <Pop dur={40} x={830} y={470} rotate={0}>
          <Emoji code="1f4a5" size={300} />
        </Pop>
      </Sequence>
      <Sequence
        name="Intensidad"
        from={370}
        durationInFrames={32}
        premountFor={fps}
      >
        <Pop dur={32} x={540} y={330} rotate={-3}>
          <IntensityMeter />
        </Pop>
      </Sequence>
      <Sequence
        name="Mareos"
        from={414}
        durationInFrames={80}
        premountFor={fps}
      >
        <Pop dur={80} x={430} y={220} rotate={-4}>
          <Chip code="1f635_200d_1f4ab">mareos</Chip>
        </Pop>
      </Sequence>
      <Sequence
        name="Temblores"
        from={432}
        durationInFrames={62}
        premountFor={fps}
      >
        <Pop dur={62} x={620} y={380} rotate={3}>
          <Chip code="1fae8">temblores</Chip>
        </Pop>
      </Sequence>
      <Sequence
        name="Presión en el pecho"
        from={454}
        durationInFrames={40}
        premountFor={fps}
      >
        <Pop dur={40} x={520} y={540} rotate={-2}>
          <Chip code="1f623">presión en el pecho</Chip>
        </Pop>
      </Sequence>
      <Sequence
        name="Ansiedad"
        from={496}
        durationInFrames={66}
        premountFor={fps}
      >
        <Pop dur={66} x={200} y={560} rotate={-6}>
          <Emoji code="1f630" size={210} />
        </Pop>
      </Sequence>
      <Sequence
        name="Algo malo"
        from={536}
        durationInFrames={30}
        premountFor={fps}
      >
        <Pop dur={30} x={820} y={330} rotate={0}>
          <Emoji code="1f329_fe0f" size={280} />
        </Pop>
      </Sequence>
      <Sequence
        name="Pulmones"
        from={596}
        durationInFrames={34}
        premountFor={fps}
      >
        <Pop dur={34} x={190} y={330} rotate={-6}>
          <Emoji code="1fac1.png" size={190} />
        </Pop>
      </Sequence>
      <Sequence
        name="Respirar profundo"
        from={600}
        durationInFrames={30}
        premountFor={fps}
      >
        <Pop dur={30} x={650} y={330} rotate={3}>
          <CrossedOut crossAt={12}>respirar profundo</CrossedOut>
        </Pop>
      </Sequence>
      <Sequence
        name="Profesional"
        from={644}
        durationInFrames={50}
        premountFor={fps}
      >
        <Pop dur={50} x={190} y={340} rotate={-5}>
          <Emoji code="1f9d1_200d_2695_fe0f.png" size={210} />
        </Pop>
      </Sequence>
      <Sequence
        name="Abordaje terapéutico"
        from={650}
        durationInFrames={44}
        premountFor={fps}
      >
        <Pop dur={44} x={650} y={320} rotate={4}>
          <Sticker size={96}>{"ABORDAJE\nTERAPÉUTICO"}</Sticker>
        </Pop>
      </Sequence>
      <Sequence
        name="Brillo"
        from={652}
        durationInFrames={40}
        premountFor={fps}
      >
        <Pop dur={40} x={940} y={170} rotate={0}>
          <Emoji code="2728" size={140} />
        </Pop>
      </Sequence>
      <Sequence
        name="Seguido"
        from={690}
        durationInFrames={36}
        premountFor={fps}
      >
        <Pop dur={36} x={540} y={330} rotate={0}>
          <Emoji code="1f501.png" size={200} />
        </Pop>
      </Sequence>
      <Sequence name="DM" from={727} durationInFrames={60} premountFor={fps}>
        <Pop dur={60} x={540} y={380} rotate={0}>
          <DmChat brand="samary" message="Hola, me pasa seguido. ¿Me ayudan?" />
        </Pop>
      </Sequence>
      <Sequence
        name="Mensaje"
        from={732}
        durationInFrames={55}
        premountFor={fps}
      >
        <Pop dur={55} x={920} y={150} rotate={10}>
          <Emoji code="1f4ac" size={150} />
        </Pop>
      </Sequence>
      <Sequence name="Firma" from={786} durationInFrames={25} premountFor={fps}>
        <Pop dur={25} x={540} y={300} rotate={-4}>
          <div
            style={{
              fontFamily: script,
              fontSize: 170,
              color: "white",
              textShadow: "0 6px 24px rgba(0,0,0,0.45)",
            }}
          >
            Samary
          </div>
        </Pop>
      </Sequence>
      <Sequence
        name="Escribinos"
        from={780}
        durationInFrames={31}
        premountFor={fps}
      >
        <Pop dur={31} x={540} y={1610} rotate={-3}>
          <Sticker size={120} color="#FCE7EE">
            ¡ESCRIBINOS!
          </Sticker>
        </Pop>
      </Sequence>
      <Sequence
        name="Estrella izq"
        from={782}
        durationInFrames={29}
        premountFor={fps}
      >
        <Pop dur={29} x={170} y={1560} rotate={0}>
          <Emoji code="2728" size={130} />
        </Pop>
      </Sequence>
      <Sequence
        name="Estrella der"
        from={784}
        durationInFrames={27}
        premountFor={fps}
      >
        <Pop dur={27} x={910} y={1660} rotate={0}>
          <Emoji code="2728" size={130} />
        </Pop>
      </Sequence>

      <Captions />

      <Audio
        name="Music"
        src={staticFile("music/calm.mp3")}
        premountFor={fps}
        volume={(f) =>
          interpolate(
            f,
            [0, 15, 775, 790, 801, 811],
            [0, 0.16, 0.16, 0.35, 0.35, 0],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            },
          )
        }
      />
      <Audio
        name="Pop 4"
        from={4}
        src={staticFile("sfx/notification-pop.mp3")}
        volume={0.3}
        premountFor={fps}
      />
      <Audio
        name="Pop 40"
        from={40}
        src={staticFile("sfx/notification-pop.mp3")}
        volume={0.3}
        premountFor={fps}
      />
      <Audio
        name="Pop 84"
        from={84}
        src={staticFile("sfx/notification-pop.mp3")}
        volume={0.3}
        premountFor={fps}
      />
      <Audio
        name="Pop 112"
        from={112}
        src={staticFile("sfx/notification-pop.mp3")}
        volume={0.3}
        premountFor={fps}
      />
      <Audio
        name="Pop 202"
        from={202}
        src={staticFile("sfx/notification-pop.mp3")}
        volume={0.3}
        premountFor={fps}
      />
      <Audio
        name="Pop 244"
        from={244}
        src={staticFile("sfx/notification-pop.mp3")}
        volume={0.3}
        premountFor={fps}
      />
      <Audio
        name="Pop 274"
        from={274}
        src={staticFile("sfx/notification-pop.mp3")}
        volume={0.3}
        premountFor={fps}
      />
      <Audio
        name="Pop 370"
        from={370}
        src={staticFile("sfx/notification-pop.mp3")}
        volume={0.3}
        premountFor={fps}
      />
      <Audio
        name="Pop 414"
        from={414}
        src={staticFile("sfx/notification-pop.mp3")}
        volume={0.3}
        premountFor={fps}
      />
      <Audio
        name="Pop 432"
        from={432}
        src={staticFile("sfx/notification-pop.mp3")}
        volume={0.3}
        premountFor={fps}
      />
      <Audio
        name="Pop 454"
        from={454}
        src={staticFile("sfx/notification-pop.mp3")}
        volume={0.3}
        premountFor={fps}
      />
      <Audio
        name="Pop 496"
        from={496}
        src={staticFile("sfx/notification-pop.mp3")}
        volume={0.3}
        premountFor={fps}
      />
      <Audio
        name="Pop 536"
        from={536}
        src={staticFile("sfx/notification-pop.mp3")}
        volume={0.3}
        premountFor={fps}
      />
      <Audio
        name="Pop 596"
        from={596}
        src={staticFile("sfx/notification-pop.mp3")}
        volume={0.3}
        premountFor={fps}
      />
      <Audio
        name="Pop 600"
        from={600}
        src={staticFile("sfx/notification-pop.mp3")}
        volume={0.3}
        premountFor={fps}
      />
      <Audio
        name="Pop 644"
        from={644}
        src={staticFile("sfx/notification-pop.mp3")}
        volume={0.3}
        premountFor={fps}
      />
      <Audio
        name="Pop 650"
        from={650}
        src={staticFile("sfx/notification-pop.mp3")}
        volume={0.3}
        premountFor={fps}
      />
      <Audio
        name="Pop 690"
        from={690}
        src={staticFile("sfx/notification-pop.mp3")}
        volume={0.3}
        premountFor={fps}
      />
      <Audio
        name="Pop 727"
        from={727}
        src={staticFile("sfx/notification-pop.mp3")}
        volume={0.3}
        premountFor={fps}
      />
      <Audio
        name="Pop 786"
        from={786}
        src={staticFile("sfx/notification-pop.mp3")}
        volume={0.3}
        premountFor={fps}
      />
      <Audio
        name="Whoosh título"
        from={0}
        src={staticFile("sfx/whoosh.mp3")}
        volume={0.45}
        premountFor={fps}
      />
      <Audio
        name="Latidos"
        from={48}
        src={staticFile("sfx/heartbeat.mp3")}
        volume={0.75}
        premountFor={fps}
      />
      <Audio
        name="Tecleo"
        from={156}
        src={staticFile("sfx/typing.mp3")}
        volume={0.5}
        premountFor={fps}
      />
      <Audio
        name="Whoosh corte 1"
        from={290}
        src={staticFile("sfx/whoosh.mp3")}
        volume={0.4}
        premountFor={fps}
      />
      <Audio
        name="Golpe"
        from={344}
        src={staticFile("sfx/impact-soft-medium-000.mp3")}
        volume={0.95}
        premountFor={fps}
      />
      <Audio
        name="Golpe whoosh"
        from={338}
        src={staticFile("sfx/soft-whoosh.mp3")}
        volume={0.4}
        premountFor={fps}
      />
      <Audio
        name="Whoosh corte 2"
        from={557}
        src={staticFile("sfx/whoosh.mp3")}
        volume={0.4}
        premountFor={fps}
      />
      <Audio
        name="Tachado"
        from={610}
        src={staticFile("sfx/card-slide-8.mp3")}
        volume={0.45}
        premountFor={fps}
      />
      <Audio
        name="Enviar mensaje"
        from={767}
        src={staticFile("sfx/maximize-002.mp3")}
        volume={0.55}
        premountFor={fps}
      />
      <Audio
        name="CTA"
        from={780}
        src={staticFile("sfx/success-chime.mp3")}
        volume={0.5}
        premountFor={fps}
      />
    </AbsoluteFill>
  );
};
