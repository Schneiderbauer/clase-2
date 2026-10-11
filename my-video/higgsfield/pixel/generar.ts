// Pixel-art character of the user, from his face photo plus two style references.
//
// Usage: npx tsx higgsfield/pixel/generar.ts <face-url> <style-ref-1-url> <style-ref-2-url>
// Billable (cheap image generation with Qwen Image 3 Edit).
import { config as loadEnv } from "dotenv";
import { createHiggsfieldClient } from "@higgsfield/client/v2";

loadEnv({ path: ".env.local", quiet: true });

const MODEL = "alibaba/qwen-image-3/edit";

const PROMPT = [
  "Create a full-body pixel art character of the man in image 1, drawn in exactly the same retro pixel art style as images 2 and 3:",
  "large visible square pixels, limited flat color palette, simple shading, clean dark outlines, no anti-aliasing.",
  "Keep his likeness from image 1: round full face, short dark brown hair with a side-swept fringe, brown eyes, thick dark eyebrows, full dark beard.",
  "Clothing: a burgundy (dark wine red) polo shirt with a collar and buttons, black pants and black sneakers.",
  "Pose: he is sitting on a simple wooden chair, seen from the front at a slight three-quarter angle.",
  "In his left hand he holds a yellow pencil. His right arm is raised and his index finger points up above his head, as if pointing at something over him.",
  "Plain pure white background, nothing else in the scene, the whole character and chair fully visible with margin around them.",
].join(" ");

async function main(): Promise<number> {
  const urls = process.argv.slice(2);
  if (urls.length < 1 || !urls.every((u) => u.startsWith("https://"))) {
    console.error("Pass the face URL followed by the style reference URLs.");
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
    input: { prompt: PROMPT, image_urls: urls },
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
