# Explore Asheville — handoff

**State:** `main` = `15e5e7d`, production = the same commit, working tree clean.
20 slides. Live at https://explore-asheville.vercel.app
PDF export at `~/Desktop/explore-asheville-deck.pdf` (80 pages).

Shared repo — `Jumpsuit-Agency/explore-asheville`. Nicole deploys too.

---

## Read this first: the harnesses lie if you let them

There is no test runner. `scripts/verify/*` drives a real headless Chrome.
Three separate times this session a harness returned a confident, wrong
answer, and each time the fix was to the harness, not the app:

1. **Stale service worker.** The deck precaches itself. A harness that does
   not unregister it measures whatever was cached, not what you just edited.
   This produced a test reporting a CSS class that had already been deleted,
   and an "overflow" measured against code that was not running. Every script
   except `offline2` (which tests precaching deliberately) now clears it
   first. **Copy that preamble into any new harness.**
2. **Unsettled reads.** Slides fade in on a `translateY(16px)` and comps load
   async. Measuring before both settle reports the animation's offset as a
   layout bug — it once produced 59 phantom "layout differences". Also:
   `a.finished` never resolves on the deck's looping ambient animations, so
   filter to finite ones or the wait hangs forever.
3. **Geometry is not visibility.** The badge audit checked whether a badge
   sat inside an image's rectangle. Five badges satisfied that and were still
   invisible, clipped by the carousel stage. `badges.mjs` now hit-tests with
   `elementFromPoint`.

The standing rule in `scripts/verify/README.md` — *measure before concluding*
— extends to the harness itself.

---

## Layout: do not wrap the images

`src/components/AiImage.tsx` puts an "AI" badge on every `/creative/` comp,
keyed off the path so new comps are marked without anyone remembering.

The badge is **an out-of-flow sibling, never a wrapper.** The comps are sized
a dozen ways across the deck — percentage max-widths against a flex parent,
`100%/100%` inside a grid cell, intrinsic sizing in a centred column — and an
extra element in that chain re-resolves every one of those percentages
against the wrapper. The first attempt did exactly that and moved or resized
**58 of the deck's 110 images**. If you need to attach anything else to these
images, attach it the same way.

Two things that calculation has to respect, both learned the hard way:

- Bounding rects are in the canvas's **scaled** pixels; `offsetLeft`/
  `offsetTop` are **unscaled** layout pixels. Do not add them directly.
- The carousel stage is `overflow: hidden` and crops tall artwork, so the
  image's true corner can sit outside the visible box. The anchor is clamped
  into every clipping ancestor.

`src/components/SlideHeader.tsx` owns the header scale for all nine content
slides. They had drifted to three headline sizes and two eyebrow sizes with
horizontal padding from 60px to 120px. Keep sizes in that component.

---

## Open items

**AI companion guardrails** (`src/app/api/advisor/route.ts`) — the behavioural
side is strong: it refused off-topic requests, refused to emit its system
prompt, deflected pricing to Jonathan, and *retracted* a fabricated "$250,000"
planted in a fake assistant turn. The structural side is bare:

- No rate limiting, no auth. Six rapid unauthenticated requests all returned
  200. The endpoint is open to anyone with the URL.
- No input cap — `messages` is passed to the API unvalidated, so the caller
  controls token spend per request.
- No prompt caching. The ~6,700-token system prompt is re-sent and re-billed
  every request: ~$0.0077 each at Haiku 4.5's $1/MTok input. Caching is a pure
  win here — ~80% cheaper and faster first token.
- Every question and answer is logged to Supabase with a session id, and
  nothing in the UI says so.

**Assets** — 23 orphaned PNGs, ~50MB, referenced by nothing. They don't slow
the deck (never requested) but they bloat the repo and every deploy. Levi's
call to delete.

**Dead code** — `Territory3ActivationsSlide.tsx` is orphaned; its activations
moved into the Sas Story carousel. Its 4 comps use a raw `<img>` and would be
unbadged if the slide is re-enabled.

**Stale harness targets** — `stops.mjs` targets `territory-3-creative` and
`congruent.mjs` targets `rationale`/`client-rubric`; all three are commented
out of the deck, so those report failures that are not regressions.
`congruent.mjs` throws outright.

**Cosmetic** — slide 4's "OUR PICK" chip is on the Territory 3 card's front
face, so it does not appear in the PDF (which flips all three). The uncropped
elevator comp on slide 12 is matted top and bottom because a square image in
a tall cell cannot fill it.

---

## Conventions worth keeping

- `vercel --prod` ships your **local working directory**, not `main`. A
  collaborator deployed from a stale checkout and the site rolled back while
  git was perfectly intact — "my changes are gone" was a deploy symptom.
  Check `git rev-list --left-right --count origin/main...main` before
  concluding anything was lost. Levi owns deploys now.
- Bump `VERSION` in `public/sw.js` whenever assets change, or clients keep the
  old precache.
- `scripts/optimize-assets.mjs` is idempotent and safe to re-run after adding
  comps. It builds the precache manifest from **every** referenced asset — an
  earlier version rebuilt it from only what that run converted, which would
  have silently dropped 88 assets from the precache.
- `scripts/export/` regenerates the PDF. Capture from production.
