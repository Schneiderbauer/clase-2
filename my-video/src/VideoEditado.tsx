import { Audio } from "@remotion/media";
import { springTiming, TransitionSeries } from "@remotion/transitions";
import { slide } from "@remotion/transitions/slide";
import {
  AbsoluteFill,
  interpolate,
  Sequence,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { ChapterTag } from "./edit/ChapterTag";
import { ClipScene } from "./edit/ClipScene";
import { FlashOverlay } from "./edit/FlashOverlay";
import { Outro } from "./edit/Outro";
import { ProgressBar } from "./edit/ProgressBar";
import { TitleCard } from "./edit/TitleCard";
import { COLORS } from "./edit/theme";

// Timeline (30 fps):
//   0–300    Clip 1     | cut + flash
//   300–564  Clip 2     | cut + flash
//   564–804  Clip 3     | slide up into the outro (18 frames)
//   786–861  Outro
export const VideoEditado: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.ink }}>
      <TransitionSeries name="Video timeline">
        <TransitionSeries.Sequence
          name="Clip 1"
          durationInFrames={300}
          premountFor={fps}
        >
          <ClipScene
            src={staticFile("clips/clip1.mp4")}
            trimBefore={6}
            clipDuration={300}
            punchAt={150}
          />
        </TransitionSeries.Sequence>
        <TransitionSeries.Overlay durationInFrames={14} premountFor={fps}>
          <FlashOverlay />
        </TransitionSeries.Overlay>
        <TransitionSeries.Sequence
          name="Clip 2"
          durationInFrames={264}
          premountFor={fps}
        >
          <ClipScene
            src={staticFile("clips/clip2.mp4")}
            trimBefore={0}
            clipDuration={264}
            punchAt={130}
          />
        </TransitionSeries.Sequence>
        <TransitionSeries.Overlay durationInFrames={14} premountFor={fps}>
          <FlashOverlay />
        </TransitionSeries.Overlay>
        <TransitionSeries.Sequence
          name="Clip 3"
          durationInFrames={240}
          premountFor={fps}
        >
          <ClipScene
            src={staticFile("clips/clip3.mp4")}
            trimBefore={6}
            clipDuration={240}
            punchAt={120}
          />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={slide({ direction: "from-bottom" })}
          timing={springTiming({
            config: { damping: 200 },
            durationInFrames: 18,
          })}
        />
        <TransitionSeries.Sequence
          name="Outro"
          durationInFrames={75}
          premountFor={fps}
        >
          <Outro title="¡Gracias por ver!" cta="Seguime para más" />
        </TransitionSeries.Sequence>
      </TransitionSeries>

      {/* Motion graphics */}
      <Sequence name="Progress bar" durationInFrames={786} premountFor={fps}>
        <ProgressBar endFrame={786} />
      </Sequence>
      <TitleCard
        name="Title"
        durationInFrames={90}
        premountFor={fps}
        subtitle="Arrancamos"
        accentColor={COLORS.accent}
        style={{
          opacity: interpolate(frame, [76, 90], [1, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        Clase 2
      </TitleCard>
      <ChapterTag
        name="Chapter 1"
        from={96}
        durationInFrames={190}
        premountFor={fps}
        number="01"
        accentColor={COLORS.accent}
        style={{
          opacity: interpolate(frame, [276, 286], [1, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        Parte 1
      </ChapterTag>
      <ChapterTag
        name="Chapter 2"
        from={310}
        durationInFrames={240}
        premountFor={fps}
        number="02"
        accentColor={COLORS.accent}
        style={{
          opacity: interpolate(frame, [540, 550], [1, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        Parte 2
      </ChapterTag>
      <ChapterTag
        name="Chapter 3"
        from={574}
        durationInFrames={190}
        premountFor={fps}
        number="03"
        accentColor={COLORS.accent}
        style={{
          opacity: interpolate(frame, [754, 764], [1, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        Parte 3
      </ChapterTag>

      {/* Music */}
      <Audio
        name="Music"
        src={staticFile("music/bed.mp3")}
        premountFor={fps}
        volume={(f) =>
          interpolate(f, [0, 8, 770, 800, 845, 861], [0, 0.16, 0.16, 0.5, 0.5, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })
        }
      />

      {/* Sound effects */}
      <Audio name="Title whoosh" src={staticFile("sfx/whoosh.mp3")} volume={0.55} premountFor={fps} />
      <Audio name="Title land" from={10} src={staticFile("sfx/impact-soft-medium-000.mp3")} volume={0.8} premountFor={fps} />
      <Audio name="Subtitle pop" from={18} src={staticFile("sfx/notification-pop.mp3")} volume={0.45} premountFor={fps} />
      <Audio name="Chapter 1 pop" from={96} src={staticFile("sfx/maximize-002.mp3")} volume={0.5} premountFor={fps} />
      <Audio name="Punch 1" from={150} src={staticFile("sfx/impact-soft-medium-000.mp3")} volume={0.7} premountFor={fps} />
      <Audio name="Cut 1 whoosh" from={288} src={staticFile("sfx/whoosh.mp3")} volume={0.5} premountFor={fps} />
      <Audio name="Chapter 2 pop" from={310} src={staticFile("sfx/maximize-002.mp3")} volume={0.5} premountFor={fps} />
      <Audio name="Punch 2" from={430} src={staticFile("sfx/impact-soft-medium-000.mp3")} volume={0.7} premountFor={fps} />
      <Audio name="Cut 2 whoosh" from={552} src={staticFile("sfx/whoosh.mp3")} volume={0.5} premountFor={fps} />
      <Audio name="Chapter 3 pop" from={574} src={staticFile("sfx/maximize-002.mp3")} volume={0.5} premountFor={fps} />
      <Audio name="Punch 3" from={684} src={staticFile("sfx/impact-soft-medium-000.mp3")} volume={0.7} premountFor={fps} />
      <Audio name="Outro riser" from={746} src={staticFile("sfx/riser.mp3")} volume={0.3} premountFor={fps} />
      <Audio name="Outro whoosh" from={780} src={staticFile("sfx/whoosh.mp3")} volume={0.55} premountFor={fps} />
      <Audio name="Outro hit" from={796} src={staticFile("sfx/jingles-hit-15.mp3")} volume={0.45} premountFor={fps} />
      <Audio name="CTA chime" from={814} src={staticFile("sfx/success-chime.mp3")} volume={0.5} premountFor={fps} />
    </AbsoluteFill>
  );
};
