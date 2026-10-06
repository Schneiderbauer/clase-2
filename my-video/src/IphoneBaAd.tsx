import { Audio } from "@remotion/media";
import {
  AbsoluteFill,
  interpolate,
  Sequence,
  staticFile,
  useVideoConfig,
} from "remotion";
import { Flash } from "./ipba/Fx";
import {
  CtaScene,
  HookScene,
  IphoneLineScene,
  LogoScene,
  ProductScene,
  QuestionScene,
  RecapScene,
  SoundBars,
  TradeInScene,
  Viewfinder,
} from "./ipba/Scenes";

// iPhone BA · 9:16 motion-graphics ad at 60 fps. Every cut lands on the beat
// of the 120 BPM track (1 beat = 30 frames, 1 bar = 120 frames).
export const IphoneBaAd: React.FC = () => {
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill style={{ backgroundColor: "black" }}>
      <Sequence name="Gancho" durationInFrames={120} premountFor={fps}>
        <HookScene />
      </Sequence>
      <Sequence name="Logo" from={120} durationInFrames={120} premountFor={fps}>
        <LogoScene />
      </Sequence>
      <Sequence
        name="Línea iPhone"
        from={240}
        durationInFrames={240}
        premountFor={fps}
      >
        <IphoneLineScene />
      </Sequence>
      <Sequence
        name="Plan canje"
        from={480}
        durationInFrames={120}
        premountFor={fps}
      >
        <TradeInScene />
      </Sequence>
      <Sequence
        name="Consolas"
        from={600}
        durationInFrames={120}
        premountFor={fps}
      >
        <ProductScene
          title="CONSOLAS"
          accent="PS5 · SWITCH"
          accentSize={130}
          emoji="1f3ae.png"
          items={["PLAYSTATION 5", "NINTENDO SWITCH"]}
        />
      </Sequence>
      <Sequence
        name="Cámaras DJI"
        from={720}
        durationInFrames={120}
        premountFor={fps}
      >
        <ProductScene
          title="CÁMARAS"
          accent="DJI"
          emoji="1f4f7"
          items={["OSMO POCKET", "OSMO ACTION"]}
          extra={<Viewfinder />}
        />
      </Sequence>
      <Sequence
        name="Micrófonos DJI"
        from={840}
        durationInFrames={120}
        premountFor={fps}
      >
        <ProductScene
          title="MICRÓFONOS"
          accent="DJI"
          emoji="1f399_fe0f.png"
          items={["DJI MIC MINI", "Y MUCHO MÁS"]}
          extra={<SoundBars />}
        />
      </Sequence>
      <Sequence
        name="Resumen"
        from={960}
        durationInFrames={120}
        premountFor={fps}
      >
        <RecapScene />
      </Sequence>
      <Sequence
        name="Pregunta"
        from={1080}
        durationInFrames={120}
        premountFor={fps}
      >
        <QuestionScene />
      </Sequence>
      <Sequence name="CTA" from={1200} durationInFrames={90} premountFor={fps}>
        <CtaScene />
      </Sequence>

      <Sequence name="Flash 120" from={120} durationInFrames={12}>
        <Flash color="white" />
      </Sequence>
      <Sequence name="Flash 240" from={240} durationInFrames={12}>
        <Flash color="#ECD92D" />
      </Sequence>
      <Sequence name="Flash 480" from={480} durationInFrames={12}>
        <Flash color="white" />
      </Sequence>
      <Sequence name="Flash 600" from={600} durationInFrames={12}>
        <Flash color="#ECD92D" />
      </Sequence>
      <Sequence name="Flash 720" from={720} durationInFrames={12}>
        <Flash color="white" />
      </Sequence>
      <Sequence name="Flash 750" from={750} durationInFrames={12}>
        <Flash color="white" />
      </Sequence>
      <Sequence name="Flash 780" from={780} durationInFrames={12}>
        <Flash color="white" />
      </Sequence>
      <Sequence name="Flash 840" from={840} durationInFrames={12}>
        <Flash color="#ECD92D" />
      </Sequence>
      <Sequence name="Flash 960" from={960} durationInFrames={12}>
        <Flash color="white" />
      </Sequence>
      <Sequence name="Flash 1080" from={1080} durationInFrames={12}>
        <Flash color="white" />
      </Sequence>
      <Sequence name="Flash 1200" from={1200} durationInFrames={12}>
        <Flash color="white" />
      </Sequence>

      <Audio
        name="Music"
        src={staticFile("music/ipba.mp3")}
        premountFor={fps}
        volume={(f) =>
          interpolate(f, [0, 1266, 1290], [0.85, 0.85, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })
        }
      />
      <Audio
        name="Golpe 1"
        from={0}
        src={staticFile("sfx/impact-soft-medium-000.mp3")}
        volume={0.9}
        premountFor={fps}
      />
      <Audio
        name="Golpe 2"
        from={30}
        src={staticFile("sfx/mouth-pop.mp3")}
        volume={0.7}
        premountFor={fps}
      />
      <Audio
        name="Golpe 3"
        from={60}
        src={staticFile("sfx/drop-004.mp3")}
        volume={0.8}
        premountFor={fps}
      />
      <Audio
        name="Golpe 4"
        from={90}
        src={staticFile("sfx/zap.mp3")}
        volume={0.45}
        premountFor={fps}
      />
      <Audio
        name="Drop"
        from={120}
        src={staticFile("sfx/sub-drop.mp3")}
        volume={0.9}
        premountFor={fps}
      />
      <Audio
        name="Drop golpe"
        from={120}
        src={staticFile("sfx/impact-soft-medium-000.mp3")}
        volume={0.9}
        premountFor={fps}
      />
      <Audio
        name="Drop whoosh"
        from={112}
        src={staticFile("sfx/whoosh.mp3")}
        volume={0.5}
        premountFor={fps}
      />
      <Audio
        name="Tienda"
        from={192}
        src={staticFile("sfx/pluck-002.mp3")}
        volume={0.6}
        premountFor={fps}
      />
      <Audio
        name="Whoosh iPhone"
        from={232}
        src={staticFile("sfx/soft-whoosh.mp3")}
        volume={0.5}
        premountFor={fps}
      />
      <Audio
        name="Modelo 13"
        from={270}
        src={staticFile("sfx/bubble-pop.mp3")}
        volume={0.5}
        premountFor={fps}
      />
      <Audio
        name="Modelo 14"
        from={300}
        src={staticFile("sfx/pluck-002.mp3")}
        volume={0.6}
        premountFor={fps}
      />
      <Audio
        name="Modelo 15"
        from={330}
        src={staticFile("sfx/select-003.mp3")}
        volume={0.5}
        premountFor={fps}
      />
      <Audio
        name="Modelo 16"
        from={360}
        src={staticFile("sfx/drop-002.mp3")}
        volume={0.6}
        premountFor={fps}
      />
      <Audio
        name="Modelo 17"
        from={390}
        src={staticFile("sfx/select-006.mp3")}
        volume={0.5}
        premountFor={fps}
      />
      <Audio
        name="Modelo 18"
        from={420}
        src={staticFile("sfx/switch-on.mp3")}
        volume={0.5}
        premountFor={fps}
      />
      <Audio
        name="Del 13 al 18"
        from={430}
        src={staticFile("sfx/ding-coin.mp3")}
        volume={0.35}
        premountFor={fps}
      />
      <Audio
        name="Glitch canje"
        from={480}
        src={staticFile("sfx/glitch.mp3")}
        volume={0.45}
        premountFor={fps}
      />
      <Audio
        name="Intercambio"
        from={506}
        src={staticFile("sfx/card-slide-8.mp3")}
        volume={0.6}
        premountFor={fps}
      />
      <Audio
        name="Usado"
        from={510}
        src={staticFile("sfx/mouth-pop.mp3")}
        volume={0.6}
        premountFor={fps}
      />
      <Audio
        name="Nuevo"
        from={540}
        src={staticFile("sfx/ding-coin.mp3")}
        volume={0.4}
        premountFor={fps}
      />
      <Audio
        name="Whoosh consolas"
        from={592}
        src={staticFile("sfx/whoosh.mp3")}
        volume={0.45}
        premountFor={fps}
      />
      <Audio
        name="PS5"
        from={630}
        src={staticFile("sfx/zap.mp3")}
        volume={0.4}
        premountFor={fps}
      />
      <Audio
        name="Nintendo"
        from={660}
        src={staticFile("sfx/bubble-pop.mp3")}
        volume={0.55}
        premountFor={fps}
      />
      <Audio
        name="Whoosh cámaras"
        from={712}
        src={staticFile("sfx/soft-whoosh.mp3")}
        volume={0.5}
        premountFor={fps}
      />
      <Audio
        name="Foto 1"
        from={750}
        src={staticFile("sfx/shutter.mp3")}
        volume={0.7}
        premountFor={fps}
      />
      <Audio
        name="Foto 2"
        from={780}
        src={staticFile("sfx/shutter.mp3")}
        volume={0.7}
        premountFor={fps}
      />
      <Audio
        name="Whoosh micrófonos"
        from={832}
        src={staticFile("sfx/card-slide-8.mp3")}
        volume={0.5}
        premountFor={fps}
      />
      <Audio
        name="Mic mini"
        from={870}
        src={staticFile("sfx/pluck-002.mp3")}
        volume={0.6}
        premountFor={fps}
      />
      <Audio
        name="Mucho más"
        from={900}
        src={staticFile("sfx/select-003.mp3")}
        volume={0.5}
        premountFor={fps}
      />
      <Audio
        name="Resumen"
        from={952}
        src={staticFile("sfx/whoosh.mp3")}
        volume={0.45}
        premountFor={fps}
      />
      <Audio
        name="Tile 1"
        from={990}
        src={staticFile("sfx/bubble-pop.mp3")}
        volume={0.5}
        premountFor={fps}
      />
      <Audio
        name="Tile 2"
        from={1005}
        src={staticFile("sfx/drop-004.mp3")}
        volume={0.6}
        premountFor={fps}
      />
      <Audio
        name="Tile 3"
        from={1020}
        src={staticFile("sfx/select-006.mp3")}
        volume={0.5}
        premountFor={fps}
      />
      <Audio
        name="Tile 4"
        from={1035}
        src={staticFile("sfx/switch-on.mp3")}
        volume={0.5}
        premountFor={fps}
      />
      <Audio
        name="Pregunta"
        from={1080}
        src={staticFile("sfx/glitch.mp3")}
        volume={0.4}
        premountFor={fps}
      />
      <Audio
        name="Envío"
        from={1172}
        src={staticFile("sfx/maximize-002.mp3")}
        volume={0.6}
        premountFor={fps}
      />
      <Audio
        name="Final"
        from={1200}
        src={staticFile("sfx/sub-drop.mp3")}
        volume={0.9}
        premountFor={fps}
      />
      <Audio
        name="Final golpe"
        from={1200}
        src={staticFile("sfx/jingles-hit-15.mp3")}
        volume={0.5}
        premountFor={fps}
      />
      <Audio
        name="Botón"
        from={1218}
        src={staticFile("sfx/success-chime.mp3")}
        volume={0.5}
        premountFor={fps}
      />
    </AbsoluteFill>
  );
};
