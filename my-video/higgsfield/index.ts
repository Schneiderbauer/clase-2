// Higgsfield API example: text-to-video with Seedance 2.5 via the official SDK.
//
// Credentials are read at runtime from .env.local (git-ignored):
//   HF_CREDENTIALS=<key-id>:<key-secret>
// The value is never printed or logged.
//
// Run: npm run higgsfield:example   (makes a billable generation request)
import { config as loadEnv } from "dotenv";
import {
  AuthenticationError,
  BadInputError,
  CredentialsMissedError,
  createHiggsfieldClient,
  NotEnoughCreditsError,
  TimeoutError,
  ValidationError,
} from "@higgsfield/client/v2";

loadEnv({ path: ".env.local", quiet: true });

const MODEL = "bytedance/seedance-2.5/text-to-video";

const describeError = (err: unknown): string => {
  // Only surface the message and HTTP status — never the full error object,
  // which can carry request headers (including the Authorization header).
  if (err instanceof NotEnoughCreditsError)
    return "Not enough credits on the Higgsfield API balance.";
  if (err instanceof AuthenticationError)
    return "Authentication failed: check HF_CREDENTIALS in .env.local.";
  if (err instanceof CredentialsMissedError)
    return "HF_CREDENTIALS is missing from .env.local.";
  if (err instanceof ValidationError || err instanceof BadInputError) {
    return `The API rejected the input: ${JSON.stringify(err.details ?? err.message)}`;
  }
  if (err instanceof TimeoutError) {
    return "Stopped waiting for the result (the generation may still finish server-side).";
  }
  if (err instanceof Error) return err.message;
  return String(err);
};

async function main(): Promise<number> {
  const credentials = process.env.HF_CREDENTIALS;
  if (!credentials || !credentials.includes(":")) {
    console.error(
      "HF_CREDENTIALS is not set in .env.local (expected format key-id:key-secret).",
    );
    return 1;
  }

  const client = createHiggsfieldClient({
    credentials,
    maxPollTime: 15 * 60 * 1000, // video generation can take several minutes
  });

  console.log(`Submitting ${MODEL}…`);
  const result = await client.subscribe(MODEL, {
    input: {
      prompt: "A cinematic scene at sunset",
      duration: 5,
      resolution: "720p",
      aspect_ratio: "16:9",
    },
    withPolling: true,
  });

  // The SDK stops polling on completed, failed or nsfw. Treat anything other
  // than "completed" with a video URL as a failure.
  const status: string = result.status;
  if (status === "completed" && result.video?.url) {
    console.log(`Status: completed (request ${result.request_id})`);
    console.log(`Video URL: ${result.video.url}`);
    return 0;
  }
  if (status === "nsfw") {
    console.error(
      `Request ${result.request_id} was rejected by moderation (credits are refunded).`,
    );
  } else if (status === "failed") {
    console.error(
      `Request ${result.request_id} failed (credits are refunded).`,
    );
  } else if (status === "canceled" || status === "cancelled") {
    console.error(`Request ${result.request_id} was canceled.`);
  } else if (status === "completed") {
    console.error(
      `Request ${result.request_id} completed but returned no video URL.`,
    );
  } else {
    console.error(
      `Request ${result.request_id} ended with unexpected status "${status}".`,
    );
  }
  return 1;
}

main()
  .then((code) => {
    process.exitCode = code;
  })
  .catch((err: unknown) => {
    console.error(`Higgsfield request failed: ${describeError(err)}`);
    process.exitCode = 1;
  });
