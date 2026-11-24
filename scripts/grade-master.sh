#!/usr/bin/env bash
set -euo pipefail

echo "=========================================="
echo " Chronos: Applying Warm-Gold Color Grade"
echo "=========================================="

INPUT="source-videos/watch_master.mp4"
OUTPUT="source-videos/watch_graded.mp4"

if [[ ! -f "$INPUT" ]]; then
  echo "Error: Required input file not found: $INPUT" >&2
  echo "Hint: Run scripts/stitch-master.sh first." >&2
  exit 1
fi

input_size=$(ls -lh "$INPUT" | awk '{print $5}')
echo "Source master: $INPUT ($input_size)"
echo "Grading filter: eq=contrast=1.08:saturation=1.05:brightness=-0.02,colorbalance=rs=0.05:gs=0.02:bs=-0.05"
echo "Encoding with libx264 (crf 16, preset slow, yuv420p)..."

ffmpeg -y -i "$INPUT" \
  -vf "eq=contrast=1.08:saturation=1.05:brightness=-0.02,colorbalance=rs=0.05:gs=0.02:bs=-0.05" \
  -c:v libx264 -crf 16 -preset slow -pix_fmt yuv420p -c:a copy \
  "$OUTPUT" -loglevel error

if [[ ! -f "$OUTPUT" ]]; then
  echo "Error: Graded output file was not generated: $OUTPUT" >&2
  exit 1
fi

output_size=$(ls -lh "$OUTPUT" | awk '{print $5}')

echo "✓ Graded master video successfully created."
echo "  Input size:  $input_size"
echo "  Output size: $output_size"
