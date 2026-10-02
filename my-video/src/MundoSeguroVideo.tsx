import { Audio } from "@remotion/media";
import {
  AbsoluteFill,
  interpolate,
  Sequence,
  staticFile,
  useVideoConfig,
} from "remotion";
import { Captions } from "./mundo/Captions";
import { BrandPill, DiscountBadge, Referral, ShareIt } from "./mundo/Graphics";
import { NAVY, YELLOW } from "./mundo/theme";
import { Emoji } from "./samary3/Emoji";
import { Pop } from "./samary3/Pop";
import { Speaker } from "./samary3/Speaker";
import { Sticker } from "./samary3/Sticker";
import { DmChat } from "./samary3/Widgets";

// Mundo Seguro · referral promo (30% off). 30 fps.
// Every overlay lands on the word it illustrates (forced-aligned timings in
// mundo/captions.ts). 0–411 speaker; the video ends on "…a esa persona."
export const MundoSeguroVideo: React.FC = () => {
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill style={{ backgroundColor: "black" }}>
      <Sequence name="Speaker" durationInFrames={411} premountFor={fps}>
        <Speaker
          src={staticFile("clips/mundo.mp4")}
          trimBefore={0}
          baseScale={1.0}
          punches={[121, 251]}
        />
      </Sequence>

      <Sequence name="Gancho" from={2} durationInFrames={46} premountFor={fps}>
        <Pop dur={46} x={540} y={330} rotate={-3}>
          <Sticker size={100} color={YELLOW} outline={NAVY}>
            {"¿TENÉS UN AMIGO\nO FAMILIAR?"}
          </Sticker>
        </Pop>
      </Sequence>
      <Sequence name="Abrazo" from={13} durationInFrames={34} premountFor={fps}>
        <Pop dur={34} x={880} y={600} rotate={8}>
          <Emoji code="1fac2" size={200} />
        </Pop>
      </Sequence>
      <Sequence name="Auto" from={66} durationInFrames={30} premountFor={fps}>
        <Pop dur={30} x={300} y={330} rotate={-6}>
          <Emoji code="1f697" size={240} />
        </Pop>
      </Sequence>
      <Sequence name="Moto" from={79} durationInFrames={30} premountFor={fps}>
        <Pop dur={30} x={780} y={330} rotate={6}>
          <Emoji code="1f3cd_fe0f" size={240} />
        </Pop>
      </Sequence>
      <Sequence name="Ojos" from={95} durationInFrames={26} premountFor={fps}>
        <Pop dur={26} x={540} y={330} rotate={0}>
          <Emoji code="1f440" size={260} />
        </Pop>
      </Sequence>
      <Sequence name="Marca" from={122} durationInFrames={48} premountFor={fps}>
        <Pop dur={48} x={540} y={300} rotate={-2}>
          <BrandPill />
        </Pop>
      </Sequence>
      <Sequence
        name="Promo especial"
        from={154}
        durationInFrames={30}
        premountFor={fps}
      >
        <Pop dur={30} x={460} y={470} rotate={4}>
          <Sticker size={120} color={YELLOW} outline={NAVY}>
            {"PROMO\nESPECIAL"}
          </Sticker>
        </Pop>
      </Sequence>
      <Sequence
        name="Regalo"
        from={156}
        durationInFrames={28}
        premountFor={fps}
      >
        <Pop dur={28} x={870} y={470} rotate={10}>
          <Emoji code="1f381" size={180} />
        </Pop>
      </Sequence>
      <Sequence
        name="Referido"
        from={183}
        durationInFrames={58}
        premountFor={fps}
      >
        <Pop dur={58} x={540} y={380} rotate={0}>
          <Referral />
        </Pop>
      </Sequence>
      <Sequence
        name="30% de descuento"
        from={251}
        durationInFrames={60}
        premountFor={fps}
      >
        <Pop dur={60} x={540} y={370} rotate={0}>
          <DiscountBadge subFrom={40} />
        </Pop>
      </Sequence>
      <Sequence
        name="Fiesta"
        from={253}
        durationInFrames={58}
        premountFor={fps}
      >
        <Pop dur={58} x={150} y={180} rotate={-10}>
          <Emoji code="1f389" size={190} />
        </Pop>
      </Sequence>
      <Sequence name="Plata" from={258} durationInFrames={52} premountFor={fps}>
        <Pop dur={52} x={930} y={700} rotate={8}>
          <Emoji code="1f4b8" size={170} />
        </Pop>
      </Sequence>
      <Sequence name="DM" from={313} durationInFrames={46} premountFor={fps}>
        <Pop dur={46} x={540} y={380} rotate={0}>
          <DmChat
            brand="mundoseguro"
            message="¡Hola! Quiero la promo del 30%"
          />
        </Pop>
      </Sequence>
      <Sequence
        name="Enviáselo"
        from={357}
        durationInFrames={54}
        premountFor={fps}
      >
        <Pop dur={54} x={540} y={360} rotate={-2}>
          <ShareIt />
        </Pop>
      </Sequence>

      <Captions hideFrom={411} />

      <Audio
        name="Music"
        src={staticFile("music/bed.mp3")}
        premountFor={fps}
        volume={(f) =>
          interpolate(f, [0, 10, 396, 411], [0, 0.14, 0.14, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })
        }
      />
      <Sequence
        name="Tecleo DM"
        from={323}
        durationInFrames={24}
        premountFor={fps}
      >
        <Audio
          src={staticFile("sfx/typing.mp3")}
          volume={0.45}
          premountFor={fps}
        />
      </Sequence>
      <Audio
        name="Pop 13"
        from={13}
        src={staticFile("sfx/bubble-pop.mp3")}
        volume={0.4}
        premountFor={fps}
      />
      <Audio
        name="Pop 66"
        from={66}
        src={staticFile("sfx/pluck-002.mp3")}
        volume={0.5}
        premountFor={fps}
      />
      <Audio
        name="Pop 79"
        from={79}
        src={staticFile("sfx/drop-004.mp3")}
        volume={0.5}
        premountFor={fps}
      />
      <Audio
        name="Pop 95"
        from={95}
        src={staticFile("sfx/select-003.mp3")}
        volume={0.4}
        premountFor={fps}
      />
      <Audio
        name="Pop 154"
        from={154}
        src={staticFile("sfx/mouth-pop.mp3")}
        volume={0.5}
        premountFor={fps}
      />
      <Audio
        name="Pop 183"
        from={183}
        src={staticFile("sfx/switch-on.mp3")}
        volume={0.4}
        premountFor={fps}
      />
      <Audio
        name="Pop 253"
        from={253}
        src={staticFile("sfx/drop-002.mp3")}
        volume={0.5}
        premountFor={fps}
      />
      <Audio
        name="Pop 357"
        from={357}
        src={staticFile("sfx/select-006.mp3")}
        volume={0.4}
        premountFor={fps}
      />
      <Audio
        name="Whoosh gancho"
        from={0}
        src={staticFile("sfx/whoosh.mp3")}
        volume={0.45}
        premountFor={fps}
      />
      <Audio
        name="Marca whoosh"
        from={116}
        src={staticFile("sfx/soft-whoosh.mp3")}
        volume={0.4}
        premountFor={fps}
      />
      <Audio
        name="Marca"
        from={122}
        src={staticFile("sfx/impact-glass-light-003.mp3")}
        volume={0.5}
        premountFor={fps}
      />
      <Audio
        name="Flecha referido"
        from={190}
        src={staticFile("sfx/soft-whoosh.mp3")}
        volume={0.35}
        premountFor={fps}
      />
      <Audio
        name="Riser 30%"
        from={205}
        src={staticFile("sfx/riser.mp3")}
        volume={0.28}
        premountFor={fps}
      />
      <Audio
        name="Golpe 30%"
        from={251}
        src={staticFile("sfx/jingles-hit-15.mp3")}
        volume={0.5}
        premountFor={fps}
      />
      <Audio
        name="Impacto 30%"
        from={251}
        src={staticFile("sfx/impact-soft-medium-000.mp3")}
        volume={0.9}
        premountFor={fps}
      />
      <Audio
        name="Enviar DM"
        from={353}
        src={staticFile("sfx/maximize-002.mp3")}
        volume={0.55}
        premountFor={fps}
      />
      <Audio
        name="Avión"
        from={373}
        src={staticFile("sfx/card-slide-8.mp3")}
        volume={0.4}
        premountFor={fps}
      />
    </AbsoluteFill>
  );
};
