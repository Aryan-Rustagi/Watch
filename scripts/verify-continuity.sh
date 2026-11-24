#!/usr/bin/env bash
set -euo pipefail

echo "=========================================="
echo " Chronos: Verifying Clip Continuity (SSIM)"
echo "=========================================="

TMP_DIR="${TMPDIR:-/tmp}/chronos-verify"
mkdir -p "$TMP_DIR"
trap 'rm -rf "$TMP_DIR"' EXIT

# Verify input clips exist
for i in {1..5}; do
  clip="source-videos/clip${i}.mp4"
  if [[ ! -f "$clip" ]]; then
    echo "Error: Required input file not found: $clip" >&2
    exit 1
  fi
done

has_failure=0
has_warning=0

printf "\n    %-13s %-7s %s\n" "Handoff" "SSIM" "Status"

for i in {1..4}; do
  next=$((i + 1))
  clip_curr="source-videos/clip${i}.mp4"
  clip_next="source-videos/clip${next}.mp4"

  last_frame="$TMP_DIR/last_${i}.png"
  first_frame="$TMP_DIR/first_${next}.png"

  # Extract last frame of clipN using -sseof -0.05
  ffmpeg -y -sseof -0.05 -i "$clip_curr" -update 1 -q:v 2 "$last_frame" -loglevel error

  # Extract first frame of clip(N+1)
  ffmpeg -y -ss 0 -i "$clip_next" -vframes 1 -update 1 -q:v 2 "$first_frame" -loglevel error

  # Run SSIM filter
  ssim_raw=$(ffmpeg -i "$last_frame" -i "$first_frame" -filter_complex "ssim" -f null - 2>&1)
  ssim_val=$(echo "$ssim_raw" | grep -o 'All:[0-9.]*' | head -n 1 | cut -d: -f2)

  if [[ -z "$ssim_val" ]]; then
    echo "Error: Failed to calculate SSIM for handoff ${i} → ${next}" >&2
    exit 1
  fi

  ssim_formatted=$(awk -v s="$ssim_val" 'BEGIN { printf "%.3f", s }')

  status="PASS"
  if awk -v s="$ssim_val" 'BEGIN { exit !(s < 0.90) }'; then
    status="FAIL (below 0.90)"
    has_failure=1
  elif awk -v s="$ssim_val" 'BEGIN { exit !(s < 0.95) }'; then
    status="WARN (below 0.95)"
    has_warning=1
  fi

  printf "    %s         %-7s %s\n" "${i} → ${next}" "$ssim_formatted" "$status"
done

echo ""
if [[ "$has_failure" -eq 1 ]]; then
  echo "Continuity verification FAILED: One or more handoffs scored below 0.90." >&2
  if [[ "${FORCE_BUILD:-0}" == "1" ]]; then
    echo ">> [OVERRIDE] Proceeding because FORCE_BUILD=1 is enabled."
    exit 0
  fi
  exit 1
elif [[ "$has_warning" -eq 1 ]]; then
  echo "Continuity verification WARNING: One or more handoffs scored between 0.90 and 0.95."
else
  echo "Continuity verification PASSED: All handoffs meet quality threshold (SSIM >= 0.95)."
fi
