# Brief: App-model per-user space + workflow ownership (stream 2)

## Mission
Re-root partition guards to `.apps` / `.users`, plumb private `user#` space, re-key
`apps.data`, and make unbundled workflows creator-private (`exportedBy` annotation).

## Read first
1. `briefs/01-report.md` (stream 1 landed — [aprovan#28](https://github.com/AprovanLabs/aprovan/pull/28))
2. `tech-plan.md` D3, D8
3. `tasks.md` stream 2
4. Specs: `per-user-space`

## Tasks
2.1–2.5 verbatim. Check off in tasks.md.

## Verify
```
pnpm --dir /Users/jacob/Documents/Code/AprovanLabs/aprovan/server/workspace typecheck
pnpm --dir /Users/jacob/Documents/Code/AprovanLabs/aprovan/server/workspace test
```

## Git
Rebase onto latest origin/main (includes #28). Worktree `/tmp/iw1-user-space` branch
`iw1/user-space`. PR + merge.

## Constraints
Touches stream 2 globs only. Owner: unbundled workflows creator-private. No stream 3
profile-binding here.
