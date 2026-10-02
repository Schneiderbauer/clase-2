import { Lottie, type LottieAnimationData } from "@remotion/lottie";
import type React from "react";
import { useEffect, useState } from "react";
import {
  cancelRender,
  continueRender,
  delayRender,
  Img,
  staticFile,
} from "remotion";

// Google Noto emoji (animated Lottie when available, PNG otherwise).
// Noto Emoji animations are licensed CC BY 4.0 by Google.
export const Emoji: React.FC<{
  readonly code: string;
  readonly size: number;
}> = ({ code, size }) => {
  const isPng = code.endsWith(".png");
  const [handle] = useState(() =>
    isPng ? null : delayRender(`emoji ${code}`),
  );
  const [data, setData] = useState<LottieAnimationData | null>(null);

  useEffect(() => {
    if (isPng || handle === null) {
      return;
    }
    fetch(staticFile(`emoji/${code}.json`))
      .then((r) => r.json())
      .then((json) => {
        setData(json);
        continueRender(handle);
      })
      .catch((err) => cancelRender(err));
  }, [code, handle, isPng]);

  const shadow = "drop-shadow(0 10px 18px rgba(0,0,0,0.25))";
  if (isPng) {
    return (
      <Img
        src={staticFile(`emoji/${code}`)}
        style={{ width: size, height: size, filter: shadow }}
      />
    );
  }
  if (!data) {
    return null;
  }
  return (
    <div style={{ width: size, height: size, filter: shadow }}>
      <Lottie animationData={data} loop />
    </div>
  );
};
