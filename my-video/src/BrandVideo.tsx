import { Audio } from "@remotion/media";
import { springTiming, TransitionSeries } from "@remotion/transitions";
import { slide } from "@remotion/transitions/slide";
import { wipe } from "@remotion/transitions/wipe";
import {
  AbsoluteFill,
  interpolate,
  staticFile,
  useVideoConfig,
} from "remotion";
import { BrandOutro } from "./brand/BrandOutro";
import { FunnelScene } from "./brand/FunnelScene";
import { GrowthScene } from "./brand/GrowthScene";
import { IntroScene } from "./brand/IntroScene";
import { ProblemScene } from "./brand/ProblemScene";
import { ServicesScene } from "./brand/ServicesScene";
import { StatementScene } from "./brand/StatementScene";
import { BLACK } from "./brand/theme";

// Scene start frames (30 fps, 15-frame transitions):
//   Intro 0 · Problem 75 · Statement 165 · Funnel 240
//   Services 435 · Growth 540 · Outro 615 · end 735
export const BrandVideo: React.FC = () => {
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill style={{ backgroundColor: BLACK }}>
      <TransitionSeries name="Brand timeline">
        <TransitionSeries.Sequence
          name="Intro"
          durationInFrames={90}
          premountFor={fps}
        >
          <IntroScene />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={wipe({ direction: "from-bottom" })}
          timing={springTiming({
            config: { damping: 200 },
            durationInFrames: 15,
          })}
        />
        <TransitionSeries.Sequence
          name="Problem"
          durationInFrames={105}
          premountFor={fps}
        >
          <ProblemScene />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={slide({ direction: "from-right" })}
          timing={springTiming({
            config: { damping: 200 },
            durationInFrames: 15,
          })}
        />
        <TransitionSeries.Sequence
          name="Statement"
          durationInFrames={90}
          premountFor={fps}
        >
          <StatementScene />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={wipe({ direction: "from-top" })}
          timing={springTiming({
            config: { damping: 200 },
            durationInFrames: 15,
          })}
        />
        <TransitionSeries.Sequence
          name="Funnel"
          durationInFrames={210}
          premountFor={fps}
        >
          <FunnelScene />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={slide({ direction: "from-bottom" })}
          timing={springTiming({
            config: { damping: 200 },
            durationInFrames: 15,
          })}
        />
        <TransitionSeries.Sequence
          name="Services"
          durationInFrames={120}
          premountFor={fps}
        >
          <ServicesScene />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={wipe({ direction: "from-left" })}
          timing={springTiming({
            config: { damping: 200 },
            durationInFrames: 15,
          })}
        />
        <TransitionSeries.Sequence
          name="Growth"
          durationInFrames={90}
          premountFor={fps}
        >
          <GrowthScene />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={slide({ direction: "from-right" })}
          timing={springTiming({
            config: { damping: 200 },
            durationInFrames: 15,
          })}
        />
        <TransitionSeries.Sequence
          name="Outro"
          durationInFrames={120}
          premountFor={fps}
        >
          <BrandOutro cta="Agendá tu llamada" />
        </TransitionSeries.Sequence>
      </TransitionSeries>

      {/* Music */}
      <Audio
        name="Music"
        src={staticFile("music/brand.mp3")}
        premountFor={fps}
        volume={(f) =>
          interpolate(f, [0, 10, 700, 735], [0, 0.7, 0.7, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })
        }
      />

      {/* Intro */}
      <Audio
        name="Dot pop"
        from={4}
        src={staticFile("sfx/impact-soft-medium-000.mp3")}
        volume={0.9}
        premountFor={fps}
      />
      <Audio
        name="Line whoosh"
        from={6}
        src={staticFile("sfx/whoosh.mp3")}
        volume={0.45}
        premountFor={fps}
      />
      <Audio
        name="Wordmark click"
        from={22}
        src={staticFile("sfx/impact-glass-light-003.mp3")}
        volume={0.6}
        premountFor={fps}
      />

      {/* Transitions */}
      <Audio
        name="Whoosh to Problem"
        from={67}
        src={staticFile("sfx/whoosh.mp3")}
        volume={0.5}
        premountFor={fps}
      />
      <Audio
        name="Whoosh to Statement"
        from={157}
        src={staticFile("sfx/whoosh.mp3")}
        volume={0.5}
        premountFor={fps}
      />
      <Audio
        name="Whoosh to Funnel"
        from={232}
        src={staticFile("sfx/whoosh.mp3")}
        volume={0.5}
        premountFor={fps}
      />
      <Audio
        name="Whoosh to Services"
        from={427}
        src={staticFile("sfx/whoosh.mp3")}
        volume={0.5}
        premountFor={fps}
      />
      <Audio
        name="Whoosh to Growth"
        from={532}
        src={staticFile("sfx/whoosh.mp3")}
        volume={0.5}
        premountFor={fps}
      />
      <Audio
        name="Whoosh to Outro"
        from={607}
        src={staticFile("sfx/whoosh.mp3")}
        volume={0.5}
        premountFor={fps}
      />

      {/* Problem */}
      <Audio
        name="Likes click"
        from={83}
        src={staticFile("sfx/impact-glass-light-003.mp3")}
        volume={0.5}
        premountFor={fps}
      />
      <Audio
        name="Seguidores click"
        from={97}
        src={staticFile("sfx/impact-glass-light-003.mp3")}
        volume={0.5}
        premountFor={fps}
      />
      <Audio
        name="Clientes hit"
        from={141}
        src={staticFile("sfx/impact-soft-medium-000.mp3")}
        volume={0.9}
        premountFor={fps}
      />

      {/* Funnel */}
      <Audio
        name="Layer 1"
        from={252}
        src={staticFile("sfx/impact-soft-medium-000.mp3")}
        volume={0.8}
        premountFor={fps}
      />
      <Audio
        name="Layer 2"
        from={268}
        src={staticFile("sfx/impact-soft-medium-000.mp3")}
        volume={0.8}
        premountFor={fps}
      />
      <Audio
        name="Layer 3"
        from={284}
        src={staticFile("sfx/impact-soft-medium-000.mp3")}
        volume={0.8}
        premountFor={fps}
      />
      <Audio
        name="Pill pop"
        from={304}
        src={staticFile("sfx/maximize-002.mp3")}
        volume={0.5}
        premountFor={fps}
      />
      <Audio
        name="Lead 1"
        from={344}
        src={staticFile("sfx/impact-glass-light-003.mp3")}
        volume={0.45}
        premountFor={fps}
      />
      <Audio
        name="Lead 2"
        from={357}
        src={staticFile("sfx/impact-glass-light-003.mp3")}
        volume={0.45}
        premountFor={fps}
      />
      <Audio
        name="Lead 3"
        from={370}
        src={staticFile("sfx/impact-glass-light-003.mp3")}
        volume={0.45}
        premountFor={fps}
      />
      <Audio
        name="Lead 4"
        from={383}
        src={staticFile("sfx/impact-glass-light-003.mp3")}
        volume={0.45}
        premountFor={fps}
      />
      <Audio
        name="Lead 5"
        from={396}
        src={staticFile("sfx/impact-glass-light-003.mp3")}
        volume={0.35}
        premountFor={fps}
      />
      <Audio
        name="Lead 6"
        from={409}
        src={staticFile("sfx/impact-glass-light-003.mp3")}
        volume={0.35}
        premountFor={fps}
      />
      <Audio
        name="Lead 7"
        from={422}
        src={staticFile("sfx/impact-glass-light-003.mp3")}
        volume={0.35}
        premountFor={fps}
      />
      <Audio
        name="Lead 8"
        from={435}
        src={staticFile("sfx/impact-glass-light-003.mp3")}
        volume={0.35}
        premountFor={fps}
      />

      {/* Services */}
      <Audio
        name="Service 1"
        from={447}
        src={staticFile("sfx/impact-glass-light-003.mp3")}
        volume={0.55}
        premountFor={fps}
      />
      <Audio
        name="Service 2"
        from={471}
        src={staticFile("sfx/impact-glass-light-003.mp3")}
        volume={0.55}
        premountFor={fps}
      />
      <Audio
        name="Service 3"
        from={495}
        src={staticFile("sfx/impact-glass-light-003.mp3")}
        volume={0.55}
        premountFor={fps}
      />

      {/* Growth */}
      <Audio
        name="Growth riser"
        from={548}
        src={staticFile("sfx/riser.mp3")}
        volume={0.35}
        premountFor={fps}
      />
      <Audio
        name="Growth peak"
        from={596}
        src={staticFile("sfx/maximize-002.mp3")}
        volume={0.6}
        premountFor={fps}
      />

      {/* Outro */}
      <Audio
        name="Equation hit"
        from={631}
        src={staticFile("sfx/impact-soft-medium-000.mp3")}
        volume={0.9}
        premountFor={fps}
      />
      <Audio
        name="CTA chime"
        from={657}
        src={staticFile("sfx/success-chime.mp3")}
        volume={0.6}
        premountFor={fps}
      />
    </AbsoluteFill>
  );
};
