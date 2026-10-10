// Miner test shot: animates the keyframe from imagen.ts with Seedance 2.5
// image-to-video, with native audio (Spanish dialogue).
//
// Usage: npx tsx higgsfield/minero/generar.ts <keyframe-image-url>
//
// Billable: 4 s at 480p, the cheapest Seedance 2.5 setting (12 credits).
// The output follows the keyframe's aspect ratio (square); it is meant to be
// letterboxed inside a 9:16 frame, like the reference video.
import { config as loadEnv } from "dotenv";
import { createHiggsfieldClient } from "@higgsfield/client/v2";

loadEnv({ path: ".env.local", quiet: true });

const MODEL = "bytedance/seedance-2.5/image-to-video";

const PROMPT = [
  "Cinematic, photorealistic shot in a dark underground mine tunnel lit by a warm oil lantern.",
  "The exhausted, sweaty miner swings the pickaxe hard against the rock wall, gravel and dust fall.",
  "He stops, breathing heavily, leans on the pickaxe and says in Spanish, in a tired, rough male voice:",
  '"Un golpe más... uno más y lo dejo."',
  "He strikes one last time, the rock cracks open and a bright blue-white glow from a huge diamond lights up his surprised face.",
  "Keep his face and identity exactly as in the image. Close handheld camera, film grain, warm amber light.",
  "Sounds: pickaxe hitting rock, heavy breathing, falling gravel, a soft shimmering sound when the diamond appears.",
].join(" ");

async function main(): Promise<number> {
  const imageUrl = process.argv[2];
  if (!imageUrl?.startsWith("https://")) {
    console.error("Pass the keyframe image URL as the first argument.");
    return 1;
  }
  const credentials = process.env.HF_CREDENTIALS;
  if (!credentials || !credentials.includes(":")) {
    console.error("HF_CREDENTIALS is not set (expected key-id:key-secret).");
    return 1;
  }

  const client = createHiggsfieldClient({ credentials, maxPollTime: 15 * 60 * 1000 });
  console.log(`Submitting ${MODEL}…`);
  const result = await client.subscribe(MODEL, {
    input: {
      prompt: PROMPT,
      image_url: imageUrl,
      duration: 4,
      resolution: "480p",
      generate_audio: true,
    },
    withPolling: true,
  });

  const status: string = result.status;
  if (status === "completed" && result.video?.url) {
    console.log(`Status: completed (request ${result.request_id})`);
    console.log(`Video URL: ${result.video.url}`);
    return 0;
  }
  console.error(`Request ${result.request_id} ended with status "${status}".`);
  return 1;
}

main()
  .then((code) => {
    process.exitCode = code;
  })
  .catch((err: unknown) => {
    // Never print the full error object: it can carry the Authorization header.
    console.error(`Higgsfield request failed: ${err instanceof Error ? err.message : String(err)}`);
    process.exitCode = 1;
  });
