#!/usr/bin/env bash
set -euo pipefail

echo "=========================================="
echo " Chronos: Generating LQIP Placeholder"
echo "=========================================="

FIRST_FRAME="public/frames/desktop/frame_0001.webp"
LQIP_OUT="public/frames/desktop/lqip.webp"

if [[ ! -f "$FIRST_FRAME" ]]; then
  echo "Error: Reference desktop frame not found: $FIRST_FRAME" >&2
  echo "Hint: Run scripts/extract-frames.sh first." >&2
  exit 1
fi

echo "Scaling first desktop frame to 40px wide at q50 WebP..."
ffmpeg -y -i "$FIRST_FRAME" \
  -vf "scale=40:-1" -c:v libwebp -q:v 50 \
  "$LQIP_OUT" -loglevel error

if [[ ! -f "$LQIP_OUT" ]]; then
  echo "Error: LQIP file was not generated: $LQIP_OUT" >&2
  exit 1
fi

lqip_size=$(ls -lh "$LQIP_OUT" | awk '{print $5}')
lqip_bytes=$(wc -c < "$LQIP_OUT" | tr -d ' ')

echo "✓ LQIP placeholder generated."
echo "  File: $LQIP_OUT"
echo "  Size: $lqip_size ($lqip_bytes bytes)"
