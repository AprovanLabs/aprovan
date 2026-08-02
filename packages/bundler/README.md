# Bundler

Generate a provider client package from a provider OpenAPI schema listed in `data/registry.json`.

## Run

From the repo root:

```sh
pnpm --filter @aprovan/utdk-bundler generate github
```

From `packages/bundler/`:

```sh
pnpm generate github
```

This reads the matching provider entry from `data/registry.json`, discovers the provider through UTCP, and writes the generated package files to:

```text
packages/utdk/
packages/utdk/<provider>/
```

Current example provider:

- `github`

## Docs Pipeline

Generate docs caches and provider docs in two explicit phases:

```sh
# Discover, validate, and cache docs sources under .registry/<provider>/
pnpm --filter @aprovan/utdk-bundler generate load-docs openai

# Render README/docs plus utdk.docs metadata from cached artifacts
pnpm --filter @aprovan/utdk-bundler generate augment-docs openai
```

The CLI emits structured JSON for each phase. If existing docs outputs are already up-to-date, `augment-docs` exits with `DOCS_OVERWRITE_BLOCKED`; pass `--overwrite-docs` to force regeneration.
