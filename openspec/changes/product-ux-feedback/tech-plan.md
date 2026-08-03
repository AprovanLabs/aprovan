# product-ux-feedback — Tech plan

## Architecture

Two repos, one change:

- **registry** — catalog chrome; handwritten `@utdk/{keyvalue,events,vfs}` backends + compat registration; optional profiles storage unblock on Dynamo.
- **aprovan** — chat/editor/native chrome, save policy, streaming visibility, members UI, dark theme.

Coordinate with in-flight `editor-direct-edit` (markdown defaults, FileEditorPane) and `native-panel-polish` (profiles Unavailable copy) — prefer completing overlapping tasks there when paths collide; this change owns the net-new provider packages and the explicit user-feedback deltas not already checked off.

## Decisions

### D1 — First backends: Dynamo keyvalue, SQS(+SNS) events, S3 vfs

- **Choice:** Implement `dynamodb` under keyvalue, `sqs` (emit via SNS optional) under events, `s3` under vfs, colocated in `registry/packages/contracts/{keyvalue,events,vfs}/` like `sql/postgres.ts`.
- **Rejected:** New top-level `packages/utdk/dynamodb` packages — contracts package is the handwritten home for interface engines.
- **Revisit if:** Contract package size or publish boundaries force a split.

### D2 — Catalog: delete OpenAppLink, keep standalone session

- **Choice:** Remove `OpenAppLink` from shell layouts; credentials already hosted via CredentialsHost on main — ensure deploy stays on standalone session mode.
- **Rejected:** Soft-hide behind env flag — user asked it gone.
- **Revisit if:** Marketing wants a single CTA later under a different label/placement.

### D3 — Native Runtime / VCS / LLM

- **Choice:** Add three `NATIVE_SURFACES` entries that mount thin panels wrapping the existing Interfaces binding UX filtered to `agent` / `vcs` / `llm` (or dedicated panels). Rename ServicesMenu Interfaces grouping so these are not the only home.
- **Rejected:** Delete Interfaces entries entirely — power users still need multi-profile binds.
- **Revisit if:** Agents panel already covers Runtime enough — then Runtime deep-links to Agents + binding strip.

### D4 — Chat save is opt-in with path suggestion

- **Choice:** Stop auto-compiling pathless widgets onto root `main.tsx` as a write; keep preview-only until Save. Suggest `widgets/<slug>/main.tsx` from fence language/title. Staging copy clarifies draft≠applied.
- **Rejected:** Always auto-save under a unique path — still surprising; user asked for optionality.
- **Revisit if:** Power users demand auto-save toggle in settings.

### D5 — Thinking vs artifact stream

- **Choice:** Route code-fence / widget deltas to MessageParts artifact UI as they stream; keep reasoning text in ReasoningPart only.
- **Rejected:** Flatten all reasoning into main transcript — too noisy.
- **Revisit if:** Model providers mix fences inside reasoning channels only.

### D6 — Dark shiki theme

- **Choice:** `CodeBlockView` loads `github-dark` (or `github-dark-default`) when `document.documentElement` has `.dark` / theme class; light otherwise.
- **Rejected:** Custom CSS override of github-light — fragile.
- **Revisit if:** App theme tokens need a branded highlighter.

### D7 — Members identity

- **Choice:** Extend member list API (or map existing fields) to `email?` / `name?`; UI primary column uses them.
- **Rejected:** Client-side Cognito AdminGetUser per row (latency + IAM).
- **Revisit if:** Claims are absent — show id + “Invite to update profile”.

### D8 — Profiles in production

- **Choice:** If Dynamo `ProfileService` still returns 501, implement the missing Dynamo partition/ops (or point prod at SQL storage for profiles). Surface stays PanelUnavailable only when truly unsupported.
- **Rejected:** Hide Profiles forever in prod.
- **Revisit if:** data-auth-model already landed Dynamo profiles — then only wire UI detection.

## Interfaces & Data

### Keyvalue Dynamo driver

```ts
// packages/contracts/keyvalue/dynamodb.ts
export function dynamodbKeyValue(config: {
  tableName: string;
  region?: string;
  /** credential/secret resolves AWS access */
}): {
  get(args: KeyValueGetArgs): Promise<KeyValueGetResult>;
  set(args: KeyValueSetArgs): Promise<KeyValueSetResult>;
  delete(args: KeyValueDeleteArgs): Promise<KeyValueDeleteResult>;
  list(args: KeyValueListArgs): Promise<KeyValueListResult>;
};
```

PK/SK scheme: `PK=KV#<workspaceScopedPrefix>`, `SK=KEY#<key>` (host supplies prefix). TTL via Dynamo TTL attribute when `ttl_seconds` set.

### Events SQS driver

```ts
// packages/contracts/events/sqs.ts
export function sqsEvents(config: { queueUrl: string; topicArn?: string }): EventsDriver;
```

`emit` → SendMessage (and Publish to SNS if topicArn). `list` → ReceiveMessage (non-destructive peek semantics per contract — document if contract requires delete-on-ack).

### VFS S3 driver

```ts
// packages/contracts/vfs/s3.ts
export function s3Vfs(config: { bucket: string; prefix?: string }): VfsDriver;
```

Map relative paths to `s3://bucket/prefix/path`; etag ↔ S3 ETag for conditional writes.

### Compat registration

Each driver gets a `compat.json` (or package export) entry: `provider`, `label`, `credentialless: false`, defaults for table/queue/bucket.

### Member wire type

```ts
type Member = {
  userId: string;
  role: "admin" | "member";
  createdAt?: string;
  email?: string;
  name?: string;
};
```

### Chat save offer

```ts
type ArtifactSaveOffer = {
  suggestedPath: string; // widgets/<slug>/main.tsx
  content: string;
  language: string;
};
```

## Workstreams (summary)

See `tasks.md`. Path-disjoint parallel groups: (registry chrome), (kv), (events), (vfs), (aprovan chat save+stream), (editor theme), (native modules), (members), (chrome dedupe). Profiles unblock may share registry-server storage paths — serialize with existing IW work.

## Test plan

- Unit tests per driver with AWS SDK mocks.
- Catalog build without OpenAppLink.
- Vitest for MessageParts streaming artifact visibility.
- Manual: dark mode screenshot of CodeBlockView; Save offer path; Members email column.
