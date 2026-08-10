# Aprovan

## Core Beliefs

See [core-beliefs](./design-docs/core-beliefs.md) for fundamental instructions.

## Direction

- [IW-9 App-First Platform](../openspec/changes/IW-9-APP-FIRST.md) — the
  current orchestrator: mission, platform invariants, decisions D1–D24, wave
  plan. Per-stream changes live under `openspec/changes/iw9-*`.
- [decisions/](./decisions/README.md) — ADRs. 0002 (app-first platform
  invariants), 0003 (Yjs), 0004 (server-side agent loop) bind all IW-9 work.

## References

- [tech-stack.md](./tech-stack.md) Preferred languages, frameworks, and tools
- [infrastructure.md](./infrastructure.md) CDK stacks, environments, and package/app/resource naming conventions
- [app-data.md](./app-data.md) App/install partitions, records vs files (shipped model)
- [streaming-sessions.md](./streaming-sessions.md) Session-mode tools: SSE + POST push (MCP-aligned)
- [stt.md](./stt.md) Speech-to-text sessions: required encoding, per-segment `final`, session-scoped speakers
- [voice.md](./voice.md) Capture in the client, on-device models, diarization, panel↔chat continuity
- [local-first.md](./local-first.md) Local vs cloud execution locus, VFS root, offline (D5)
- [desktop.md](./desktop.md) Desktop shell: architecture, update channels, Application Support, local gateway
- [native-providers.md](./native-providers.md) Loopback helper, portable gateway, availability states, adding providers
- [native-surfaces.md](./native-surfaces.md) Apps + native panes (no SidebarApps / Personal)
- [design-docs](./design-docs)/ Core references for generative documentation and code
- [references](./references)/ General reference area
- [archives](./archives)/ Old docs and references
