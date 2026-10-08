# PDF export

Renders the live deck to a one-page-per-stop PDF. "Per stop", not per slide:
Territory 1 is 26 comps and Territory 2 is 27, so a slide-per-page export
would drop most of the creative. 20 slides currently produce 80 pages.

No PDF dependency — Chrome captures the pages and `mkpdf.mjs` writes the
container directly, embedding the JPEGs under `DCTDecode`.

## Running

```bash
/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome \
  --headless=new --remote-debugging-port=9333 --window-size=1920,1080 \
  --user-data-dir=/tmp/ea-pdf --no-first-run --disable-gpu about:blank &

node scripts/export/capture.mjs https://explore-asheville.vercel.app /tmp/pages

# mkpdf imports sharp, so it must run from the project root
node scripts/export/mkpdf.mjs /tmp/pages ~/Desktop/explore-asheville-deck.pdf \
  https://explore-asheville.vercel.app
```

Capture from **production**, not localhost, so the export matches what the
client sees.

## What capture.mjs does beyond screenshotting

- Hides presenter chrome: slide counter, nav arrows, progress bar, keyboard
  legend, offline toast, advisor launcher, and the carousel arrows (dead
  controls on paper).
- Stages interactive slides. The assignment slide ships with both rubrics
  collapsed behind "Click to reveal", so it clicks them. The territories
  slide only allows one card flipped at a time in the live deck, so it forces
  all three `rotateY(180deg)` and hides the CTAs, which lead nowhere in a PDF.
- Records where the closing slide's "Keep Exploring" card sits, so `mkpdf`
  can place a real `/Link` annotation over it pointing back at the live deck.

## Gotchas that have burned this script

- **Walk termination.** An earlier version hashed only the first 160
  characters of a slide to detect "the deck is stuck". Territory 1's three
  script stops share an identical opening, so it stopped 50 pages early. It
  now hashes the whole slide plus the active pill state and only stops at the
  real last slide.
- **Service worker.** The deck precaches itself. Without clearing it the
  capture renders whatever was cached, not what was deployed.
- **`sharp` resolution.** Run `mkpdf.mjs` from the project root; it cannot
  resolve `sharp` from a temp directory.

## Known cosmetic consequence

Slide 4's "OUR PICK" chip lives on the Territory 3 card's *front* face, so
forcing all three cards flipped means it does not appear in the export.
