# Verification harness

There is no test runner in this project, so these drive a real headless Chrome
over the DevTools protocol and measure the rendered page. They caught several
things that `tsc`, eslint and the build all passed — a stacking context that
swallowed every carousel click, a 46px slide overflow, a cursor that silently
fell back, two tables that disagreed by 21px.

## Running

Start the app first, then point Chrome at it:

```bash
npm run dev                                  # or: npm run build && npx next start
/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome \
  --headless=new --remote-debugging-port=9333 --window-size=1512,860 \
  --user-data-dir=/tmp/ea-verify --no-first-run --disable-gpu about:blank &
node scripts/verify/v2.mjs                   # writes v2-out.json next to cwd
```

`BASE` overrides the URL (defaults to `http://localhost:3000`), `OUT` the
output file. Kill Chrome afterwards: `pkill -f "remote-debugging-port=9333"`.

## What each one covers

| script | checks |
|---|---|
| `v2.mjs` | the full navigation regression — chevron traversal, clicker keys, carousel stability, rubric row drift, controls escaping the nav layer, advisor reachability, overview state, parallax, browser Back |
| `overflow2.mjs` | every slide for content spilling its 1920x1080 frame, ignoring anything inside a clipping ancestor (content inside an `overflow:auto` rail is scrolled, not spilling — counting it produces false positives) |
| `stops.mjs` | walks each creative slide with one key and reports stops reached, tabs visited, and any landing on a "Coming Soon" placeholder |
| `congruent.mjs` | the two rubric slides share table top, row height, column widths and type sizes |
| `offline2.mjs` | first-paint bytes, precache completion, then cuts the network and checks every image-heavy slide for broken images |
| `badges.mjs` | walks every stop of every slide and hit-tests each `/creative/` image for a painted AI badge. Hit-tests rather than checking geometry: a badge can be positioned correctly inside an image and still be clipped by the carousel stage's `overflow:hidden`, which is exactly how five comps shipped unbadged |

## Reading the results

**Every script here clears the service worker before measuring.** The deck
precaches itself, and without that step these scripts test whatever was
cached rather than the code under test. That produced confidently wrong
results more than once — a stage test reporting a CSS class that had already
been deleted, and a "pre-existing" overflow that was neither pre-existing nor
where it appeared to be. If you write a new harness, copy that preamble.

`overflow2` and the export capture also wait for images to load and for
finite animations to finish. Slides fade in on a `translateY(16px)`, so an
unsettled read reports the animation's offset as a layout bug.

Measure before concluding. Several times a red result here was the harness
being wrong — a selector that matched nothing, coordinates landing off-canvas,
or an expectation that predated a deliberate change. An all-red run usually
means the dev server died, not that the app broke.
