import { Audio } from "@remotion/media";
import {
  AbsoluteFill,
  interpolate,
  Sequence,
  staticFile,
  useVideoConfig,
} from "remotion";
import { BreathCard } from "./samary/BreathCard";
import { CalmCaptions } from "./samary/CalmCaptions";
import { CutBloom } from "./samary/CutBloom";
import { Ecg } from "./samary/Ecg";
import { EndCard } from "./samary/EndCard";
import { Grain } from "./samary/Grain";
import { PanicCard } from "./samary/PanicCard";
import { ShrinkCard } from "./samary/ShrinkCard";
import { SpeakerClip } from "./samary/SpeakerClip";
import { TreatmentTags } from "./samary/TreatmentTags";

// Samary · Psiquiatría · "Ataques de pánico" (30 fps)
//   0–291    Take 1: hook + "es una descarga real…"
//   291–537  Take 2: "el problema es cuando…"
//   537–765  Take 3: "con terapia…" + CTA
//   745–835  End card
export const SamaryVideo: React.FC = () => {
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill style={{ backgroundColor: "black" }}>
      {/* Takes */}
      <Sequence name="Take 1" durationInFrames={291} premountFor={fps}>
        <SpeakerClip
          src={staticFile("clips/clip1.mp4")}
          trimBefore={12}
          clipDuration={291}
        />
      </Sequence>
      <Sequence
        name="Take 2"
        from={291}
        durationInFrames={246}
        premountFor={fps}
      >
        <SpeakerClip
          src={staticFile("clips/clip2.mp4")}
          trimBefore={0}
          clipDuration={246}
        />
      </Sequence>
      <Sequence
        name="Take 3"
        from={537}
        durationInFrames={228}
        premountFor={fps}
      >
        <SpeakerClip
          src={staticFile("clips/clip3.mp4")}
          trimBefore={6}
          clipDuration={228}
        />
      </Sequence>

      {/* Motion graphics over the speaker */}
      <Sequence
        name="Heartbeat line"
        from={30}
        durationInFrames={115}
        premountFor={fps}
      >
        <Ecg />
      </Sequence>
      <Sequence
        name="Cut bloom 1"
        from={284}
        durationInFrames={14}
        premountFor={fps}
      >
        <CutBloom />
      </Sequence>
      <Sequence
        name="Cut bloom 2"
        from={530}
        durationInFrames={14}
        premountFor={fps}
      >
        <CutBloom />
      </Sequence>
      <Sequence
        name="Treatment tags"
        from={538}
        durationInFrames={95}
        premountFor={fps}
      >
        <TreatmentTags />
      </Sequence>

      {/* B-roll cards */}
      <Sequence
        name="B-roll: pánico, no infarto"
        from={144}
        durationInFrames={66}
        premountFor={fps}
      >
        <PanicCard />
      </Sequence>
      <Sequence
        name="B-roll: vida que se achica"
        from={350}
        durationInFrames={72}
        premountFor={fps}
      >
        <ShrinkCard />
      </Sequence>
      <Sequence
        name="B-roll: respirar"
        from={422}
        durationInFrames={64}
        premountFor={fps}
      >
        <BreathCard />
      </Sequence>

      <CalmCaptions />

      <Sequence
        name="End card"
        from={745}
        durationInFrames={90}
        premountFor={fps}
      >
        <EndCard brand="Samary" tagline="Centro de salud integral" />
      </Sequence>

      <Grain />

      {/* Music */}
      <Audio
        name="Music"
        src={staticFile("music/calm.mp3")}
        premountFor={fps}
        volume={(f) =>
          interpolate(
            f,
            [0, 20, 740, 770, 805, 835],
            [0, 0.2, 0.2, 0.55, 0.55, 0],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            },
          )
        }
      />

      {/* Sound design */}
      <Audio
        name="Heartbeat"
        from={30}
        src={staticFile("sfx/heartbeat.mp3")}
        volume={0.8}
        premountFor={fps}
      />
      <Audio
        name="Card in 1"
        from={138}
        src={staticFile("sfx/soft-whoosh.mp3")}
        volume={0.3}
        premountFor={fps}
      />
      <Audio
        name="Strike infarto"
        from={190}
        src={staticFile("sfx/impact-glass-light-003.mp3")}
        volume={0.3}
        premountFor={fps}
      />
      <Audio
        name="Card in 2"
        from={344}
        src={staticFile("sfx/soft-whoosh.mp3")}
        volume={0.3}
        premountFor={fps}
      />
      <Sequence
        name="Breath"
        from={420}
        durationInFrames={80}
        premountFor={fps}
      >
        <Audio
          src={staticFile("sfx/breath.mp3")}
          premountFor={fps}
          volume={(f) =>
            interpolate(f, [0, 60, 80], [0.45, 0.45, 0], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            })
          }
        />
      </Sequence>
      <Audio
        name="Tag terapia"
        from={542}
        src={staticFile("sfx/impact-glass-light-003.mp3")}
        volume={0.25}
        premountFor={fps}
      />
      <Audio
        name="Tag medicación"
        from={586}
        src={staticFile("sfx/impact-glass-light-003.mp3")}
        volume={0.25}
        premountFor={fps}
      />
      <Audio
        name="End card in"
        from={739}
        src={staticFile("sfx/soft-whoosh.mp3")}
        volume={0.3}
        premountFor={fps}
      />
      <Audio
        name="End bell"
        from={767}
        src={staticFile("sfx/soft-bell.mp3")}
        volume={0.45}
        premountFor={fps}
      />
    </AbsoluteFill>
  );
};
