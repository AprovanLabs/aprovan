# Report: The @utdk/stt contract package

## Summary
Landed `@utdk/stt@0.1.0` in the registry repo as a handwritten contract under `packages/contracts/stt/`. Types, open-arg validation, session-mode tool discovery, and a provider conformance suite are in place. Provider `compat` entries are left empty for streams 2–3.

## PR
https://github.com/AprovanLabs/registry/pull/154

## Version
`@utdk/stt@0.1.0`

## Changes
| File | Change |
|---|---|
| `packages/contracts/stt/package.json` | New package: `utdk.contract: "stt"`, `handwritten: true`, depends on `@utdk/common` workspace `^0.1.2` |
| `packages/contracts/stt/index.ts` | Types from tech plan; `assertOpenSupported`; `sttToolEntries` with `streaming: "session"`; house-style module header |
| `packages/contracts/stt/conformance.ts` | `runSttConformance` + `createFakeSttDriver` for provider self-tests |
| `packages/contracts/stt/compat.json` | Interface metadata (`id: stt`, `defaultsFor: ["open"]`); empty `compat` until Deepgram / AssemblyAI streams |
| `packages/contracts/stt/__tests__/stt.test.ts` | Validation branches, discovery shape, conformance against fake driver |
| `pnpm-lock.yaml` | Workspace link for `@utdk/stt` → `@utdk/common` |

## Verify
```text
pnpm --filter @utdk/stt test         # 18/18 pass
pnpm --filter @utdk/stt check-types  # pass
```

## Notes for orchestrator
- Tasks **1.1–1.6** checked off in `tasks.md`.
- `compat.json` intentionally has `"compat": []` so stream 2 can add Deepgram and stream 3 can add AssemblyAI `unavailable` (and AUDIT.md).
- Conformance entrypoint for stream 2.6: `import { runSttConformance } from "@utdk/stt/conformance"`.
