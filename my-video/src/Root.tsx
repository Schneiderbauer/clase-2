import "./index.css";
import { Composition, Folder } from "remotion";
import { HelloWorld } from "./HelloWorld";
import { Logo } from "./HelloWorld/Logo";
import { Title } from "./HelloWorld/Title";
import { ChapterTag } from "./edit/ChapterTag";
import { Outro } from "./edit/Outro";
import { TitleCard } from "./edit/TitleCard";
import { COLORS } from "./edit/theme";
import { VideoEditado } from "./VideoEditado";
import { SamaryVideo } from "./SamaryVideo";
import { BrandVideo } from "./BrandVideo";
import { BrandOutro } from "./brand/BrandOutro";
import { FunnelScene } from "./brand/FunnelScene";
import { GrowthScene } from "./brand/GrowthScene";
import { IntroScene } from "./brand/IntroScene";
import { ProblemScene } from "./brand/ProblemScene";
import { ServicesScene } from "./brand/ServicesScene";
import { StatementScene } from "./brand/StatementScene";

// Each <Composition> is an entry in the sidebar!

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="SamaryPanico"
        component={SamaryVideo}
        durationInFrames={835}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="SchneiderbauerMedia"
        component={BrandVideo}
        durationInFrames={735}
        fps={30}
        width={1080}
        height={1920}
      />
      <Folder name="Brand-scenes">
        <Composition
          id="BrandIntro"
          component={IntroScene}
          durationInFrames={90}
          fps={30}
          width={1080}
          height={1920}
        />
        <Composition
          id="BrandProblem"
          component={ProblemScene}
          durationInFrames={105}
          fps={30}
          width={1080}
          height={1920}
        />
        <Composition
          id="BrandStatement"
          component={StatementScene}
          durationInFrames={90}
          fps={30}
          width={1080}
          height={1920}
        />
        <Composition
          id="BrandFunnel"
          component={FunnelScene}
          durationInFrames={210}
          fps={30}
          width={1080}
          height={1920}
        />
        <Composition
          id="BrandServices"
          component={ServicesScene}
          durationInFrames={120}
          fps={30}
          width={1080}
          height={1920}
        />
        <Composition
          id="BrandGrowth"
          component={GrowthScene}
          durationInFrames={90}
          fps={30}
          width={1080}
          height={1920}
        />
        <Composition
          id="BrandOutro"
          component={BrandOutro}
          durationInFrames={120}
          fps={30}
          width={1080}
          height={1920}
          defaultProps={{ cta: "Agendá tu llamada" }}
        />
      </Folder>
      <Composition
        id="VideoEditado"
        component={VideoEditado}
        durationInFrames={861}
        fps={30}
        width={1080}
        height={1920}
      />
      <Folder name="Edit-elements">
        <Composition
          id="TitleCard"
          component={TitleCard}
          durationInFrames={90}
          fps={30}
          width={1080}
          height={1920}
          defaultProps={{
            children: "Clase 2",
            subtitle: "Arrancamos",
            accentColor: COLORS.accent,
          }}
        />
        <Composition
          id="ChapterTag"
          component={ChapterTag}
          durationInFrames={190}
          fps={30}
          width={1080}
          height={1920}
          defaultProps={{
            number: "01",
            children: "Parte 1",
            accentColor: COLORS.accent,
          }}
        />
        <Composition
          id="Outro"
          component={Outro}
          durationInFrames={75}
          fps={30}
          width={1080}
          height={1920}
          defaultProps={{
            title: "¡Gracias por ver!",
            cta: "Seguime para más",
          }}
        />
      </Folder>
      <Folder name="Elements">
        <Composition
          id="Logo"
          component={Logo}
          durationInFrames={150}
          fps={30}
          width={1920}
          height={1080}
          defaultProps={{
            logoColor1: "#91EAE4",
            logoColor2: "#86A8E7",
          }}
        />
        <Composition
          id="Title"
          component={Title}
          durationInFrames={115}
          fps={30}
          width={1920}
          height={1080}
          defaultProps={{
            titleText: "Welcome to Remotion",
            titleColor: "#000000",
          }}
        />
      </Folder>
      <Composition
        // You can take the "id" to render a video:
        // bunx remotion render HelloWorld
        id="HelloWorld"
        component={HelloWorld}
        durationInFrames={150}
        fps={30}
        width={1920}
        height={1080}
        // You can override these props for each render:
        // https://www.remotion.dev/docs/parametrized-rendering
        defaultProps={{
          titleText: "Welcome to Remotion",
          titleColor: "#000000",
        }}
      />
    </>
  );
};
