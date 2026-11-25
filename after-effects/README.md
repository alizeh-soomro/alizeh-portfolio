# Promo video (After Effects)

- `Alizeh_Promo.mp4` - the final 59-second video (1920x1080, 30 fps, with music). Same file as `portfolio/public/intro.mp4`.
- `build_promo_in_after_effects.jsx` - builds the After Effects project and saves `Alizeh_Promo.aep`.

## Make the .aep (about 1 minute)
1. Install the fonts in `assets/fonts` (double-click each > Install).
2. Open After Effects (2022 or newer). File > Scripts > Run Script File... > choose `build_promo_in_after_effects.jsx`.
3. The script imports everything, builds the compositions and saves `Alizeh_Promo.aep` in this folder.
4. Press Ctrl+M (Render Queue) and render to export the MP4 from After Effects.

Keep the `.jsx`, `footage` and `assets` folders together, or the script can't find the files.

## What's inside the project
- `Alizeh_Promo_MAIN` - the full timeline: background, 11 scenes, colour-bar wipe transitions, end fade, music.
- `02 Scenes` - one composition per scene: Intro, Featured Projects, six project scenes (each with its own "screen recording" window precomp), Achievement, Skills, Outro.
- Animation uses eased keyframes, a per-letter text animator on the name, expressions for sparkle twinkle, auto-sizing pill shapes (`sourceRectAtTime`), falling confetti and drifting background blobs.

## Footage
- `footage/` - trimmed clips of each project. `01_monster_runner.mp4` was filmed with a phone; the laptop screen was tracked, perspective-corrected and cleaned up so it looks like a screen recording. `05_algorithm_visualizer.mp4` is cropped to the app window, which removes the screen-recorder watermark.
- `assets/avatar_wave`, `assets/avatar_idle` - PNG sequences rendered from the Blender avatar.
- `assets/music.wav` - original music made for this video, so there is nothing to license.
