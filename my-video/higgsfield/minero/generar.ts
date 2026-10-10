// Miner test shot: Seedance 2.5 reference-to-video using the face photo as the
// character reference, with native audio (Spanish dialogue).
//
// Usage: npx tsx higgsfield/minero/generar.ts <public-face-image-url>
// Get the URL with: npx tsx higgsfield/minero/upload.ts higgsfield/minero/cara.jpg
//
// Billable: 4 s at 480p (the cheapest Seedance 2.5 setting).
import { config as loadEnv } from "dotenv";
import { createHiggsfieldClient } from "@higgsfield/client/v2";

loadEnv({ path: ".env.local", quiet: true });

const MODEL = "bytedance/seedance-2.5/reference-to-video";

const PROMPT = [
  "Cinematic, photorealistic vertical shot inside a dark, narrow underground mine tunnel lit only by a warm oil lantern.",
  "The only character is the man from the reference image: keep his exact face, dark hair, brown eyes and full dark beard.",
  "He wears a dirty white t-shirt and dark work overalls; his face is covered in sweat and dirt, he is exhausted and breathing hard.",
  "He swings a pickaxe against the rock wall, stops, leans on the handle and says in Spanish, in a tired, rough voice:",
  '"Un golpe más... uno más y lo dejo."',
  "He strikes one last time, the rock cracks and a bright blue-white glow of a huge diamond lights up his surprised face.",
  "Shallow depth of field, film grain, warm amber light, close handheld camera. Sounds: pickaxe hits, heavy breathing, falling gravel.",
].join(" ");

async function main(): Promise<number> {
  const faceUrl = process.argv[2];
  if (!faceUrl?.startsWith("https://")) {
    console.error("Pass the public face image URL as the first argument.");
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
      image_urls: [faceUrl],
      audio_urls: [],
      duration: 4,
      resolution: "480p",
      aspect_ratio: "9:16",
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
