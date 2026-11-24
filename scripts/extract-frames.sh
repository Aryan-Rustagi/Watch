#!/usr/bin/env bash
set -euo pipefail

echo "=========================================="
echo " Chronos: Extracting Optimized Frames"
echo "=========================================="

INPUT="source-videos/watch_graded.mp4"

if [[ ! -f "$INPUT" ]]; then
  echo "Error: Required input file not found: $INPUT" >&2
  echo "Hint: Run scripts/grade-master.sh first." >&2
  exit 1
fi

DESKTOP_DIR="public/frames/desktop"
MOBILE_DIR="public/frames/mobile"

echo "Clearing and recreating frame directories..."
rm -rf "$DESKTOP_DIR" "$MOBILE_DIR"
mkdir -p "$DESKTOP_DIR" "$MOBILE_DIR"

echo "Extracting desktop frames (24 fps, 1920w, q82 WebP)..."
ffmpeg -y -i "$INPUT" \
  -vf "fps=24,scale=1920:-1" -f image2 -c:v libwebp -q:v 82 \
  "$DESKTOP_DIR/frame_%04d.webp" -loglevel error

echo "Extracting mobile frames (14 fps, 1080w, q78 WebP)..."
ffmpeg -y -i "$INPUT" \
  -vf "fps=14,scale=1080:-1" -f image2 -c:v libwebp -q:v 78 \
  "$MOBILE_DIR/frame_%04d.webp" -loglevel error

desktop_count=$(find "$DESKTOP_DIR" -maxdepth 1 -name "frame_*.webp" | wc -l)
mobile_count=$(find "$MOBILE_DIR" -maxdepth 1 -name "frame_*.webp" | wc -l)

if [[ "$desktop_count" -eq 0 ]]; then
  echo "Error: No desktop frames were generated!" >&2
  exit 1
fi

if [[ "$mobile_count" -eq 0 ]]; then
  echo "Error: No mobile frames were generated!" >&2
  exit 1
fi

desktop_size=$(du -sh "$DESKTOP_DIR" | awk '{print $1}')
mobile_size=$(du -sh "$MOBILE_DIR" | awk '{print $1}')

echo "✓ Frame extraction complete."
echo "  Desktop frames: $desktop_count files ($desktop_size)"
echo "  Mobile frames:  $mobile_count files ($mobile_size)"
