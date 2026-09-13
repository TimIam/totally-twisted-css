# Totally Twisted CSS

An interactive retro screensaver collection with generated cartoon artwork, built from a clone of [Bryan Braun's After Dark in CSS](https://github.com/bryanbraun/after-dark-css).

**Live:** https://phenology.technology/totallytwisted/

13 scenes inspired by Totally Twisted, plus Mandelbrot, Julia, Fractal Forest, and Fractal Kaleidoscope. Select a scene, adjust its options, and press **Start Screen Saver**. Space pauses, N advances, F enters playback, and Escape exits. On touch devices, tap to reveal Exit. Sound is optional and synthesized locally.

## Run

Requires Node.js for the optional local server; the app has no runtime packages.

```sh
node server.cjs
```

Open http://127.0.0.1:4173/totallytwisted/. You can also open index.html directly. For iPhone and iPad use the hosted page in Safari. This is a browser screensaver experience, not an installed macOS screensaver or an iOS lock screen replacement. Apple hardware has not yet been tested directly.

## What comes from the cloned repository

The git history retains the upstream repository through commit `20630dba51d49101dba0b52205400d31be9c0c37`. Flying Toilets adapts `all/flying-toasters.html`; Toxic Swamp adapts `all/fish.html`. Their launch positions, timing classes, flight paths, swimming routes, and turnarounds are reused. The two original source documents are preserved under `upstream/`.

`node scripts/adapt-upstream.cjs` generates `upstream.css`. The adapter scopes the original CSS to the preview, removes obsolete vendor prefixes and references to the old bitmap artwork, and replaces old sprite-frame stepping with motion for the generated artwork. `artwork.css` applies the new sprites and styling.

The upstream repository does **not** implement the Totally Twisted expansion. The other eleven scenes and four mathematical fractals are new additions. They are simplified interpretations, not exact reproductions of the original program, dialogue, sound, or rare events. All thirteen named scenes are selectable, but their behavior differs from the original.

## Artwork and rendering

`assets/twisted-sprites.png` is a generated transparent 4 × 4 atlas of sixteen original illustrations. See `ART-PROMPT.md` for the prompt and generation method. The active app does not load the upstream Berkeley Systems bitmap artwork. CSS drives sprite animation; small amounts of JavaScript manage settings, audio, and interaction. True fractals use Canvas and JavaScript math.

## Files

- `index.html`, `app.js`, `styles.css`: control panel and added scenes.
- `upstream.css`: generated animation code adapted from upstream.
- `artwork.css`, `assets/`: replacement artwork.
- `upstream/`, `THIRD-PARTY-NOTICES.md`: source provenance and credits.
- `tests/browser-check.js`: browser checks for scenes, settings, pause, fullscreen, and fractals.

## Verification

Start the local server, then use `agent-browser`:

```powershell
npx agent-browser open http://127.0.0.1:4173/totallytwisted
Get-Content tests/browser-check.js -Raw | npx agent-browser eval --stdin
```

Code is MIT licensed. Third-party notices and artwork details are recorded separately. After Dark and Totally Twisted are names of the original software; this project is independent.
