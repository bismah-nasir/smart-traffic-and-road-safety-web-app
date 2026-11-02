# SmartTraffic demo video

A ~57-second, 1920×1080 demo video of SmartTraffic, plus a poster (thumbnail) image, built with [Remotion](https://www.remotion.dev).

The rendered files are committed, so you can watch them without installing anything:

- Video: [`out/smarttraffic-demo.mp4`](out/smarttraffic-demo.mp4)
- Poster: [`out/poster.jpg`](out/poster.jpg)

## Flow

| Scene | What it shows |
|---|---|
| Intro | Logo, tagline and a traffic light stepping to green |
| Home | The hero and the sections below it |
| Live Traffic | Vehicles and signals moving on the simulated smart grid |
| Light & Dark | Switching to light mode on the live map |
| Route Suggestion | Clifton → Karachi Airport, the drawn route, then picking Lyari Expressway |
| Road Safety | The guideline cards |
| Emergency SOS | Pressing SOS opens the quick-dial contacts |
| Outro | Tech stack, live link and repository |

## Commands

```bash
cd video
npm install
npm run studio   # preview and scrub in Remotion Studio
npm run render   # writes out/smarttraffic-demo.mp4
npm run poster   # writes out/poster.jpg
npm run music    # regenerate public/music.mp3
npm run record   # re-record the app clips and poster screenshots (see below)
```

If another dev server already uses port 3000, add a free port, e.g. `npm run render -- --port=3123`.

## Re-recording the app

The scenes are real recordings of the app, made by `scripts/record-clips.mjs` with Playwright and your installed Chrome:

1. In the repo root, build and serve the app: `npm run build && npx vite preview --port 4317`
2. In `video/`, run `npm run record` for everything, or name clips: `npm run record -- route poster`

Clips go to `public/clips/` and poster screenshots to `public/poster/`. Each clip is captured frame by frame at full quality, then encoded at 30 fps. The site is loaded only once and later pages are opened with the app's own navigation, like a real visit, so the loading screen and the "Smart Signal System" notice appear once (in the Home clip). If Chrome is installed somewhere else, set `CHROME_PATH`. If a clip's length changes, update its `from` and `duration` in `src/Video.jsx`.

## Layout

```text
src/
  index.js            registerRoot
  Root.jsx            the SmartTrafficDemo composition and the SmartTrafficPoster still
  Video.jsx           scene order, clip trims, captions and music
  theme.js            fonts, colours (from src/index.css) and links
  scenes/             Intro, Tour (browser window with the clips and captions), Outro
  components/         background, browser window, logo
  poster/Poster.jsx   the poster: desktop Live Traffic in a browser window and Road Safety on an iPhone 16
public/
  clips/              app recordings used by the video
  poster/             screenshots used by the poster (desktop at 2x, iPhone 16 at 3x)
  logo.png            the app logo
  music.mp3           original background track from scripts/make-music.mjs
scripts/
  record-clips.mjs    records the clips and poster screenshots
  make-music.mjs      synthesises the soundtrack (no licensing restrictions)
```

This folder is a separate npm package with its own `package.json`.
