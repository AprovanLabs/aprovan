# product-ux-feedback — PRD

## Problem

After the product-plane and registry-admin moves, daily use still feels unfinished: catalog chrome pushes people into chat for account work; core interface backends (keyvalue / events / vfs) have contracts but no registry implementations; chat overwrites `main.tsx`, hides widget streaming under “thinking,” and confuses staged saves; editor chrome fights dark mode; Runtime/VCS/LLM sit under Interfaces; members show Cognito IDs; chrome duplicates labels and icons.

## Users & Jobs

- **Builder in chat** — iterate on widgets/files without silent overwrites; see streaming progress; save only when intended.
- **Operator on catalog** — manage credentials/admin on registry alone; no “open the app” detour.
- **Workspace admin** — recognize members by name/email; collapse workspace chrome; bind Runtime/VCS/LLM as first-class natives.
- **Integrator** — mount real Dynamo/Redis, SNS/SQS, and S3 backends for keyvalue/events/vfs.

## Goals

1. Catalog credentials/admin usable without chat; remove top-right “Open the app.”
2. Profiles usable in production (no permanent “aren’t available in this deployment”).
3. Workspaces pane collapsible (persist preference).
4. At least one real registry implementation each for keyvalue, events, vfs (Dynamo and/or Redis; SNS/SQS; S3).
5. Dark-mode code/markdown editor; markdown defaults to rich preview.
6. Agent / VCS / LLM presented as native Runtime / VCS / LLM (not Interfaces rows).
7. Widget generation streams incrementally outside a collapsed thinking step.
8. No default overwrite of root `main.tsx`; explicit save with suggested path; “Open editor” → “Edit”; clearer staged→apply UX.
9. Code renderer works again in chat/transcript.
10. No duplicate chat icon / redundant filename in editor when tab already shows it.
11. Members list shows human identity (email/name), not only Cognito sub.

## Non-Goals

- Rewriting the Interfaces panel model for third-party providers.
- Building every cloud vendor for kv/events/vfs (one solid backend each is enough).
- Redesigning the entire admin IA beyond members identity + profiles availability.
- Changing Cognito itself — enrich display from existing IdP claims / whoami.

## Capabilities

### New Capabilities

- `catalog-chrome` — remove Open-the-app CTA; credentials/admin stay on catalog.
- `interface-backends` — handwritten UTDK providers for keyvalue, events, vfs.
- `native-runtime-modules` — Runtime/VCS/LLM as native surfaces / Services layers.
- `chat-artifact-save` — opt-in save, path suggestion, staging clarity, Edit label.
- `chat-stream-visibility` — widget/code progress not buried in thinking.
- `editor-theme-defaults` — dark highlighter + markdown rich default.
- `member-identity` — members table shows email/name (+ id secondary).
- `chrome-dedupe` — single chat affordance; no duplicate path title in file pane.

### Modified Capabilities

- Profiles availability (tie into existing native-panel / registry-server storage work): production must not 501 forever.

## Constraints & Assumptions

- Repos: aprovan (`/Users/jacob/Documents/Code/AprovanLabs/aprovan`), registry (`/Users/jacob/Documents/Code/AprovanLabs/registry`).
- Handwritten providers follow `@utdk/sql` / contracts pattern (`packages/contracts/<iface>/`).
- Standalone catalog session work (`registry-standalone-credentials`) may already host CredentialsHost — this change removes remaining chat-forcing chrome.
- Assumption: production workspace Dynamo can grow a profiles table/partition; if not, document the unblock path in tech-plan.
- Assumption: member email/name is available from Cognito ID token claims or `/whoami` enrichment already on the gateway.

## Open Questions

1. Prefer Dynamo **or** Redis for the first keyvalue backend? **Rec: Dynamo** (already in platform data plane) + thin Redis optional.
2. Events: SNS→SQS fan-out or single SQS? **Rec: SQS queue + optional SNS topic publish.**
3. Should Runtime/VCS/LLM leave Interfaces entirely, or also remain bindable there? **Rec: native sidebar entries + keep Interfaces binding for swap.**
