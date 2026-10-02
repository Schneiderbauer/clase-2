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
import { Ecg } from "./samary/Ecg";
import { EndCard } from "./samary/EndCard";
import { Grain } from "./samary/Grain";
import { PanicCard } from "./samary/PanicCard";
import { SpeakerClip } from "./samary/SpeakerClip";
import { SymptomsCard } from "./samary/SymptomsCard";

// Samary · Psiquiatría · "Ataques de pánico" (30 fps)
// All timings follow the forced-aligned transcript in samary/captions.ts.
//   0–300    Take 1: "Te falta el aire… un ataque de pánico."
//   300–567  Take 2: "Un ataque de pánico puede aparecer de golpe…"
//   567–811  Take 3: "Ahí ya no alcanza… cómo te podemos ayudar."
//   800–890  End card
// Both cuts are hidden under B-roll cards (pánico, respirar).
export const SamaryVideo: React.FC = () => {
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill style={{ backgroundColor: "black" }}>
      {/* Takes */}
      <Sequence name="Take 1" durationInFrames={300} premountFor={fps}>
        <SpeakerClip
          src={staticFile("clips/clip1.mp4")}
          trimBefore={9}
          clipDuration={300}
        />
      </Sequence>
      <Sequence
        name="Take 2"
        from={300}
        durationInFrames={267}
        premountFor={fps}
      >
        <SpeakerClip
          src={staticFile("clips/clip2.mp4")}
          trimBefore={0}
          clipDuration={267}
        />
      </Sequence>
      <Sequence
        name="Take 3"
        from={567}
        durationInFrames={244}
        premountFor={fps}
      >
        <SpeakerClip
          src={staticFile("clips/clip3.mp4")}
          trimBefore={3}
          clipDuration={244}
        />
      </Sequence>

      {/* Motion graphics over the speaker */}
      <Sequence
        name="Heartbeat line"
        from={34}
        durationInFrames={115}
        premountFor={fps}
      >
        <Ecg />
      </Sequence>

      {/* B-roll cards */}
      <Sequence
        name="B-roll: ataque de pánico"
        from={270}
        durationInFrames={57}
        premountFor={fps}
      >
        <PanicCard />
      </Sequence>
      <Sequence
        name="B-roll: síntomas"
        from={398}
        durationInFrames={96}
        premountFor={fps}
      >
        <SymptomsCard />
      </Sequence>
      <Sequence
        name="B-roll: respirar"
        from={567}
        durationInFrames={63}
        premountFor={fps}
      >
        <BreathCard />
      </Sequence>

      <CalmCaptions />

      <Sequence
        name="End card"
        from={800}
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
            [0, 20, 795, 825, 860, 890],
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
        from={34}
        src={staticFile("sfx/heartbeat.mp3")}
        volume={0.8}
        premountFor={fps}
      />
      <Audio
        name="Card in: pánico"
        from={264}
        src={staticFile("sfx/soft-whoosh.mp3")}
        volume={0.3}
        premountFor={fps}
      />
      <Audio
        name="Card in: síntomas"
        from={392}
        src={staticFile("sfx/soft-whoosh.mp3")}
        volume={0.3}
        premountFor={fps}
      />
      <Audio
        name="Mareos"
        from={416}
        src={staticFile("sfx/impact-glass-light-003.mp3")}
        volume={0.25}
        premountFor={fps}
      />
      <Audio
        name="Temblores"
        from={434}
        src={staticFile("sfx/impact-glass-light-003.mp3")}
        volume={0.25}
        premountFor={fps}
      />
      <Audio
        name="Presión en el pecho"
        from={456}
        src={staticFile("sfx/impact-glass-light-003.mp3")}
        volume={0.25}
        premountFor={fps}
      />
      <Audio
        name="Card in: respirar"
        from={561}
        src={staticFile("sfx/soft-whoosh.mp3")}
        volume={0.3}
        premountFor={fps}
      />
      <Sequence
        name="Breath"
        from={567}
        durationInFrames={75}
        premountFor={fps}
      >
        <Audio
          src={staticFile("sfx/breath.mp3")}
          premountFor={fps}
          volume={(f) =>
            interpolate(f, [0, 55, 75], [0.45, 0.45, 0], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            })
          }
        />
      </Sequence>
      <Audio
        name="End card in"
        from={794}
        src={staticFile("sfx/soft-whoosh.mp3")}
        volume={0.3}
        premountFor={fps}
      />
      <Audio
        name="End bell"
        from={822}
        src={staticFile("sfx/soft-bell.mp3")}
        volume={0.45}
        premountFor={fps}
      />
    </AbsoluteFill>
  );
};
