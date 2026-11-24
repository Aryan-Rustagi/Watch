#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
cd "$ROOT_DIR"

start_time=$(date +%s)

echo "╔═══════════════════════════════════════════════════════════╗"
echo "║          CHRONOS LUXURY WATCH — ASSET PIPELINE            ║"
echo "╚═══════════════════════════════════════════════════════════╝"

echo ""
echo ">> Step 1/5: Verifying Clip Continuity..."
bash "$SCRIPT_DIR/verify-continuity.sh"

echo ""
echo ">> Step 2/5: Stitching Master Video..."
bash "$SCRIPT_DIR/stitch-master.sh"

echo ""
echo ">> Step 3/5: Applying Warm-Gold Color Grade..."
bash "$SCRIPT_DIR/grade-master.sh"

echo ""
echo ">> Step 4/5: Extracting Multi-Resolution Frames..."
bash "$SCRIPT_DIR/extract-frames.sh"

echo ""
echo ">> Step 5/5: Generating Low-Quality Image Placeholder (LQIP)..."
bash "$SCRIPT_DIR/generate-lqip.sh"

# Calculate summary metrics
master_duration=$(ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 source-videos/watch_master.mp4)
master_formatted=$(awk -v d="$master_duration" 'BEGIN { printf "%.1fs", d }')

desktop_count=$(find public/frames/desktop -maxdepth 1 -name "frame_*.webp" | wc -l | tr -d ' ')
desktop_size=$(du -sh public/frames/desktop | awk '{print $1}')

mobile_count=$(find public/frames/mobile -maxdepth 1 -name "frame_*.webp" | wc -l | tr -d ' ')
mobile_size=$(du -sh public/frames/mobile | awk '{print $1}')

lqip_size=$(ls -lh public/frames/desktop/lqip.webp | awk '{print $5}')

end_time=$(date +%s)
duration_total=$((end_time - start_time))

echo ""
echo "─────────────────────────────────────"
echo "Chronos Frame Pipeline — Complete"
echo "─────────────────────────────────────"
echo "Master video:    $master_formatted"
echo "Desktop frames:  $desktop_count files, ~$desktop_size"
echo "Mobile frames:   $mobile_count files, ~$mobile_size"
echo "LQIP:            $lqip_size"
echo "Total pipeline time: ${duration_total}s"
echo "─────────────────────────────────────"
