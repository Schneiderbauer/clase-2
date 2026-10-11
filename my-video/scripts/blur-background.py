"""Blur the background behind a talking-head speaker (MODNet portrait matting).

Setup (once):  python3 -m venv .venv && .venv/bin/pip install onnxruntime pillow numpy
               curl -L -o modnet.onnx https://huggingface.co/Xenova/modnet/resolve/main/onnx/model.onnx
Usage:         .venv/bin/python scripts/blur-background.py modnet.onnx in.mp4 out.mp4 [fps] [--still preview.png]
Needs ffmpeg on PATH. Output is 1920x1080 and keeps the original audio."""
import subprocess, sys
import numpy as np
import onnxruntime as ort
from PIL import Image, ImageFilter

model, src, dst = sys.argv[1:4]
fps = int(sys.argv[4]) if len(sys.argv) > 4 and sys.argv[4].isdigit() else 30
still = sys.argv[sys.argv.index("--still") + 1] if "--still" in sys.argv else None
W, H = 1920, 1080
MW, MH = 672, 384  # model input (multiples of 32, 16:9-ish)

sess = ort.InferenceSession(model, providers=["CPUExecutionProvider"])
in_name = sess.get_inputs()[0].name

def matte(rgb):
    small = np.asarray(Image.fromarray(rgb).resize((MW, MH), Image.BILINEAR), dtype=np.float32)
    x = ((small / 255.0 - 0.5) / 0.5).transpose(2, 0, 1)[None]
    a = sess.run(None, {in_name: x})[0][0, 0]
    a = Image.fromarray((np.clip(a, 0, 1) * 255).astype(np.uint8)).resize((W, H), Image.BILINEAR)
    # Slightly soften the edge so hair and shoulders blend naturally.
    return np.asarray(a.filter(ImageFilter.GaussianBlur(2)), dtype=np.float32) / 255.0

def _blur(arr):
    img = Image.fromarray(arr)
    small = img.resize((W // 4, H // 4), Image.BILINEAR).filter(ImageFilter.GaussianBlur(9))
    return np.asarray(small.resize((W, H), Image.BILINEAR), dtype=np.float32)

def blur_bg(rgb, a):
    # Normalized blur: only background pixels contribute, so the speaker's
    # colors don't bleed into the blur as a halo around the head.
    keep = np.clip(1.0 - a * 1.6, 0, 1)
    num = np.stack([_blur((rgb[..., c] * keep).astype(np.uint8)) for c in range(3)], axis=2)
    den = _blur((keep * 255).astype(np.uint8))[..., None] / 255.0
    bg = num / np.maximum(den, 0.05)
    # Darken and desaturate a little so the wall reads clean, not dirty.
    gray = bg.mean(axis=2, keepdims=True)
    return (0.65 * bg + 0.35 * gray) * 0.82

dec = subprocess.Popen(["ffmpeg", "-v", "error", "-i", src, "-vf", f"fps={fps}", "-f", "rawvideo", "-pix_fmt", "rgb24", "-"],
                       stdout=subprocess.PIPE)
enc = None if still else subprocess.Popen(
    ["ffmpeg", "-v", "error", "-y", "-f", "rawvideo", "-pix_fmt", "rgb24", "-s", f"{W}x{H}", "-r", str(fps), "-i", "-",
     "-i", src, "-map", "0:v", "-map", "1:a", "-c:v", "libx264", "-crf", "17", "-preset", "medium",
     "-pix_fmt", "yuv420p", "-c:a", "aac", "-b:a", "192k", "-shortest", dst], stdin=subprocess.PIPE)

prev, n = None, 0
while True:
    buf = dec.stdout.read(W * H * 3)
    if len(buf) < W * H * 3:
        break
    rgb = np.frombuffer(buf, np.uint8).reshape(H, W, 3)
    a = matte(rgb)
    a = a if prev is None else 0.6 * a + 0.4 * prev  # temporal smoothing against flicker
    prev = a
    out = rgb.astype(np.float32) * a[..., None] + blur_bg(rgb, a) * (1 - a[..., None])
    out = np.clip(out, 0, 255).astype(np.uint8)
    if still:
        Image.fromarray(np.concatenate([rgb, out], axis=1)).resize((1920, 540)).save(still)
        break
    enc.stdin.write(out.tobytes())
    n += 1
dec.stdout.close(); dec.wait()
if enc:
    enc.stdin.close(); enc.wait()
print(f"frames: {n}")
