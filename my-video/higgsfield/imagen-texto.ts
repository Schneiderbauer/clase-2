// Text-to-image with Qwen Image 3 through the Higgsfield API.
//
// Usage: npx tsx higgsfield/imagen-texto.ts <prompt-file.txt> [aspect_ratio]
// Billable (cheap image generation). Prints only the status and the image URL.
import { readFile } from "node:fs/promises";
import { config as loadEnv } from "dotenv";
import { createHiggsfieldClient } from "@higgsfield/client/v2";

loadEnv({ path: ".env.local", quiet: true });

const MODEL = "alibaba/qwen-image-3/text-to-image";

async function main(): Promise<number> {
  const [promptFile, aspectRatio = "1:1"] = process.argv.slice(2);
  if (!promptFile) {
    console.error("Pass a text file with the prompt.");
    return 1;
  }
  const prompt = (await readFile(promptFile, "utf8")).trim();
  const credentials = process.env.HF_CREDENTIALS;
  if (!credentials || !credentials.includes(":")) {
    console.error("HF_CREDENTIALS is not set (expected key-id:key-secret).");
    return 1;
  }

  const client = createHiggsfieldClient({ credentials, maxPollTime: 10 * 60 * 1000 });
  console.log(`Submitting ${MODEL} (${aspectRatio})…`);
  const result = await client.subscribe(MODEL, {
    input: { prompt, aspect_ratio: aspectRatio },
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
