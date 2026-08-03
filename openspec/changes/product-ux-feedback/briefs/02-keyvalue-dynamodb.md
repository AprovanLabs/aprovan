# Brief: Keyvalue DynamoDB backend

## Mission
Ship a real `@utdk/keyvalue` implementation backed by DynamoDB, following the SQL/Postgres pattern: engine in `packages/contracts/keyvalue/`, thin provider package under `packages/utdk/`, compat registration.

## Read first
- aprovan `openspec/changes/product-ux-feedback/{prd,tech-plan,tasks}.md` (D1, Interfaces)
- `registry/packages/contracts/keyvalue/index.ts` (full contract)
- `registry/packages/contracts/sql/{postgres.ts,compat.json,package.json}` and `registry/packages/utdk/postgres/**` (template)
- Existing AWS Dynamo usage in `registry/packages/registry-server` or workspace if any (reuse client patterns)

## Tasks
- [ ] 2.1 Implement `dynamodb.ts` against `@utdk/keyvalue` (get/set/delete/list; TTL via Dynamo TTL attr or 501).
- [ ] 2.2 Register in `compat.json` + package exports (`./dynamodb`); add `packages/utdk/dynamodb-kv` or `packages/utdk/dynamodb` thin client like postgres; unit tests with mocked Dynamo.
- [ ] 2.3 Document credential shape (JSON bearer: tableName + AWS keys, or connection config in binding options — pick one and document).

## Acceptance criteria
#### Scenario: Dynamo get/set round-trip
- WHEN a workspace binds keyvalue to the new provider with valid credentials
- THEN `keyvalue.set` followed by `keyvalue.get` returns the stored value

## Verify
```bash
cd /Users/jacob/Documents/Code/AprovanLabs/registry
pnpm --filter @utdk/keyvalue test
pnpm --filter @utdk/keyvalue build
# also build/test the thin utdk provider package you add
```

## Constraints
- Branch: `pux/keyvalue-dynamodb` from `origin/main`
- Touches only: `packages/contracts/keyvalue/**` and new `packages/utdk/<provider>/**` (+ workspace package.json/pnpm-lock if required)
- Do not invent APIs outside the keyvalue contract
- Prefer `@aws-sdk/client-dynamodb` / lib-dynamodb already used in monorepo if present

## Report back
PR + how credentials/options are shaped + test commands run.
