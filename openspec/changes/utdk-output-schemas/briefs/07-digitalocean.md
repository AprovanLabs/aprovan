# Brief: Re-bundle digitalocean (utdk-output-schemas stream 7)

## Mission
Resolve external `$ref`s so digitalocean ops carry responses; regenerate; remeasure
coverage (~83%→89%). If upstream unavailable, document and leave unknown-response.

## Read first
tasks.md stream 7; depends on stream 4 merged + coverage baseline from 4.4.

## Tasks
Stream **7** (7.1–7.4) verbatim.

## Verify
```bash
cd /Users/jacob/Documents/Code/AprovanLabs/registry
pnpm --filter @utdk/clients build
```

## Git workflow
- Branch: `iw7/utdk-digitalocean-outputs` after stream 4 on main
- Touches: `packages/utdk/digitalocean/**`
- Open PR; do not merge.

## Report back
`briefs/07-report.md` with coverage delta.
