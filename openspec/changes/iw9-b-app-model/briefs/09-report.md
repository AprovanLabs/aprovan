# Report: Client — Install flow + hosting picker + promote-out UI

## What was built

New `client/web/src/components/apps/**` surface (not wired into sidebar —
stream 8):

- **`InstallDialog`** — reads declared `hostModes`, skips the picker for a
  single bucket, renders the two-option managed/hosted card picker (exact
  ux.md copy; hosted secondary + warning badge) when both buckets are
  declared. Calls `apps.install`. Mode-less 400 → surfaces declared options
  into the picker; slug-collision 400 → field-scoped error (no auto-suffix).
  Mid-copy dismiss locked; confirm shows "Copying app…".
- **`HostingModePicker`** — radiogroup of two cards (not plain radios).
- **`PromoteDialog`** — read-only source, editable slug (folder-name
  prefill), live `/a/<slug>` preview; `apps.promote {source, slug}`; slug
  collision vs retry-safe banner.
- **`UpdateAvailable`** — `apps.updateCheck` → "v(N) available → Copy again";
  `apps.applyUpdate` with explicit overwrite confirm when local edits guard
  fires (`confirmOverwrite`).
- **`hosting.ts` / `errors.ts`** — bucket collapse + error classification
  against stream 6 message contracts.

## How verified

```bash
pnpm --filter @aprovan/patchwork-web typecheck
# ✓ exit 0
```

## Deviations

1. **No `RadioGroup` / `AlertDialog` / toast in patchwork-web ui.** Hosting
   picker uses accessible `role="radiogroup"` card buttons; overwrite confirm
   is a nested `Dialog`. Success toasts left to the mount site via
   `onInstalled` / `onPromoted` / `onUpdated` (no Sonner dependency).
2. **Components are export-only** — not mounted in `AppsPanel` / sidebar
   (streams 8+). Callers import from `@/components/apps`.
3. **Hosting 400 parsing is message-based** — `invokeAppsTool` only exposes
   `Error.message`; options are scraped from the stream 6 wording
   (`Hosting mode required… options: managed, hosted`).
