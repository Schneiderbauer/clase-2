// Uploads a local image to Higgsfield storage and prints its public URL (free).
// Usage: npx tsx higgsfield/minero/upload.ts <path-to-image>
//
// The SDK's uploadImage() ignores the `upload_headers` the API returns
// (S3 requires `x-amz-tagging`), so the presigned PUT fails with a 403.
// This sends exactly the headers the API asks for.
import { readFile } from "node:fs/promises";
import { HiggsfieldClient } from "@higgsfield/client";

type UploadSlot = {
  upload_url: string;
  public_url: string;
  upload_headers?: Record<string, string>;
};

async function main() {
  const client = new HiggsfieldClient();
  const bytes = await readFile(process.argv[2]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const http = (client as any).client;
  const { data: slot } = (await http.post("/files/generate-upload-url", {
    content_type: "image/jpeg",
  })) as { data: UploadSlot };
  const res = await fetch(slot.upload_url, {
    method: "PUT",
    headers: slot.upload_headers ?? { "Content-Type": "image/jpeg" },
    body: bytes,
  });
  if (!res.ok) throw new Error(`Storage upload failed with HTTP ${res.status}`);
  console.log(`Uploaded: ${slot.public_url}`);
}

main().catch((err: unknown) => {
  console.error(`Upload failed: ${err instanceof Error ? err.message : String(err)}`);
  process.exitCode = 1;
});
