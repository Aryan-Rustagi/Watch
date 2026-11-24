#!/usr/bin/env bash
set -euo pipefail

echo "=========================================="
echo " Chronos: Stitching Master Video"
echo "=========================================="

# Check input clips
for i in {1..5}; do
  clip="source-videos/clip${i}.mp4"
  if [[ ! -f "$clip" ]]; then
    echo "Error: Required input clip not found: $clip" >&2
    exit 1
  fi
done

CLIPS_TXT="source-videos/clips.txt"
echo "Creating clips.txt list in source-videos..."
cat << 'EOF' > "$CLIPS_TXT"
file 'clip1.mp4'
file 'clip2.mp4'
file 'clip3.mp4'
file 'clip4.mp4'
file 'clip5.mp4'
EOF

echo "Running lossless concatenation..."
(
  cd source-videos
  ffmpeg -y -f concat -safe 0 -i clips.txt -c copy watch_master.mp4 -loglevel error
)

OUTPUT="source-videos/watch_master.mp4"
if [[ ! -f "$OUTPUT" ]]; then
  echo "Error: Output file not created: $OUTPUT" >&2
  exit 1
fi

duration=$(ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 "$OUTPUT")
formatted_duration=$(awk -v d="$duration" 'BEGIN { printf "%.2fs", d }')
filesize=$(ls -lh "$OUTPUT" | awk '{print $5}')

echo "✓ Master video successfully created."
echo "  File:     $OUTPUT"
echo "  Duration: $formatted_duration"
echo "  Size:     $filesize"
