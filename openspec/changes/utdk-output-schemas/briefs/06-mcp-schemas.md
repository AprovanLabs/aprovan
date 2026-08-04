# Brief: MCP output schemas (utdk-output-schemas stream 6)

## Mission
Wire `ProviderTool.outputSchema` from `tool.outputs` through MCP loader + meta-tools;
omit when unknown.

## Read first
tasks.md stream 6; depends on stream 3 merged.

## Tasks
Stream **6** (6.1–6.4) verbatim.

## Acceptance criteria
MCP scenarios from provider-output-schemas (known schema / unknown omitted).

## Verify
```bash
cd /Users/jacob/Documents/Code/AprovanLabs/registry
pnpm --filter @utdk/mcp-core test
```

## Git workflow
- Branch: `iw7/utdk-mcp-output-schemas` after stream 3 on main
- Touches: `packages/mcp-core/src/**` (+ tests)
- Open PR; parallel-safe with 4 and 5.

## Report back
`briefs/06-report.md`
