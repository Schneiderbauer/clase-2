// Miner keyframe: edits the face photo into the mine scene with Qwen Image 3
// Edit, keeping the person's identity. The result is the start frame for the video.
//
// Usage: npx tsx higgsfield/minero/imagen.ts <public-face-image-url>
// Billable (cheap image generation).
import { config as loadEnv } from "dotenv";
import { createHiggsfieldClient } from "@higgsfield/client/v2";

loadEnv({ path: ".env.local", quiet: true });

const MODEL = "alibaba/qwen-image-3/edit";

const PROMPT = [
  "Turn this photo into a cinematic, photorealistic film still in vertical 9:16 format.",
  "Keep this exact same man: identical face, round full face shape, facial features, brown eyes, dark hair and full dark beard.",
  "He is now a miner deep inside a dark, narrow underground mine tunnel with rough rock walls and wooden beams,",
  "lit only by a warm oil lantern hanging nearby. He wears a dirty, sweat-stained white t-shirt and dark work overalls.",
  "His face and arms are covered in sweat, dust and dirt; he looks exhausted, breathing hard,",
  "Correct human anatomy: BOTH arms and BOTH hands clearly visible, two hands gripping the long wooden handle of a pickaxe,",
  "raised over his right shoulder, about to strike the rock wall. Medium shot from the waist up, facing the camera at a slight angle.",
  "Warm amber light, deep shadows, shallow depth of field, film grain. Replace the white background completely.",
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

  const client = createHiggsfieldClient({ credentials, maxPollTime: 10 * 60 * 1000 });
  console.log(`Submitting ${MODEL}…`);
  const result = await client.subscribe(MODEL, {
    input: { prompt: PROMPT, image_urls: [faceUrl] },
    withPolling: true,
  });

  const status: string = result.status;
  const url = result.images?.[0]?.url;
  if (status === "completed" && url) {
    console.log(`Status: completed (request ${result.request_id})`);
    console.log(`Image URL: ${url}`);
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
