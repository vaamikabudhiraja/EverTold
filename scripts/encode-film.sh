#!/usr/bin/env bash
# Encode a clip into a seamless, muted web loop for the hero.
# Usage: scripts/encode-film.sh input.mp4 [name]   ->  public/media/<name>.{mp4,webm} + <name>-poster.jpg
set -euo pipefail
in="$1"; name="${2:-hero-beach}"; out="public/media"
dur=$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$in")
fade=1
offset=$(awk "BEGIN { print $dur - $fade - $fade }")
# Crossfade the clip's tail into its first second so the loop has no visible cut.
fc="[0:v]split[a][b];[a]trim=0:${fade},setpts=PTS-STARTPTS[head];[b]trim=${fade},setpts=PTS-STARTPTS[body];[body][head]xfade=transition=fade:duration=${fade}:offset=${offset},format=yuv420p[out]"
mkdir -p "$out"
ffmpeg -v error -y -i "$in" -filter_complex "$fc" -map "[out]" -an -c:v libx264 -preset slow -crf 20 -movflags +faststart "$out/$name.mp4"
ffmpeg -v error -y -i "$in" -filter_complex "$fc" -map "[out]" -an -c:v libvpx-vp9 -b:v 0 -crf 32 -row-mt 1 "$out/$name.webm"
ffmpeg -v error -y -ss "$(awk "BEGIN { print $dur / 2 }")" -i "$in" -frames:v 1 -q:v 3 "$out/$name-poster.jpg"
echo "Wrote $out/$name.mp4, $out/$name.webm and $out/$name-poster.jpg"
