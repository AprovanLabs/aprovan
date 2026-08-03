# Brief: Events SQS/SNS backend

## Mission
Ship a real `@utdk/events` implementation using SQS (optional SNS publish on emit), same handwritten pattern as `@utdk/sql`/postgres.

## Read first
- aprovan `openspec/changes/product-ux-feedback/{prd,tech-plan,tasks}.md`
- `registry/packages/contracts/events/index.ts`
- `registry/packages/contracts/sql/{postgres.ts,compat.json}` + `packages/utdk/postgres/**`

## Tasks
- [ ] 3.1 Implement `sqs.ts` (optional SNS) for emit/list per contract semantics (append-only channel, at-least-once).
- [ ] 3.2 Compat + thin `packages/utdk/sqs` (or `events-sqs`) provider + mocked AWS tests.
- [ ] 3.3 Document queueUrl / topicArn credential or binding options.

## Acceptance criteria
#### Scenario: Emit and list
- WHEN a workspace binds events to the new provider
- THEN `events.emit` succeeds and a subsequent `events.list` observes the message under contract semantics

## Verify
```bash
cd /Users/jacob/Documents/Code/AprovanLabs/registry
pnpm --filter @utdk/events test && pnpm --filter @utdk/events build
```

## Constraints
- Branch: `pux/events-sqs` from `origin/main`
- Touches: `packages/contracts/events/**`, new `packages/utdk/<provider>/**`, lockfile as needed
- Map channels → message attributes / body carefully; document any SQS limitations vs Redis Streams ideal

## Report back
PR + semantics notes (how `after`/`cursor` map to SQS).
