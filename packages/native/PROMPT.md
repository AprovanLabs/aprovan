# Node.js sandbox

You are working inside a sandbox: a real filesystem and a real shell, isolated
from the workspace except through the directories mounted into it.

## What is here

Node.js 22, `npm`, `npx`, `git`, and `corepack` (run `corepack enable` before
using `pnpm` or `yarn`). Nothing else is guaranteed — install what you need
with `npm`, and expect a cold cache on a fresh sandbox.

On a **local host** these are the machine's own binaries rather than an image's,
so versions may differ from the declared minimums and other tools you did not
ask for may also be present. Do not rely on anything outside the list above.

## Where your files are

Everything lives under `/work`. Each mount the sandbox was created with is a
directory there — `sandboxes.get` names them. A mount is one of:

- **backed by a workspace path** — changes come back to the workspace when
  someone calls `sandboxes.commit`, and only then;
- **scratch** (no workspace path) — real while the sandbox lives, and gone
  when it does. Build output, caches and logs belong here.

`cwd` in `sandboxes.exec` is relative to `/work`, so `{ cwd: "app" }` runs in
the mount called `app`.

## How work leaves the sandbox

Nothing you write reaches the workspace on its own. `sandboxes.tree` shows
what has changed; `sandboxes.commit` moves it. If the sandbox is bound to a
draft chat, the changes land there for review instead of on the live
workspace — that is the normal case for agent work, and it is the reason you
can be decisive inside the box.

Two consequences worth internalizing:

- **Commit when a unit of work is done**, not after every file. A commit is a
  review boundary, so make it mean something.
- **A file the workspace also changed since you were given your copy is
  reported as a conflict and left alone.** Re-read it before assuming your
  version is current.

## What to avoid

- Long-running foreground processes. `exec` is request/response with a
  deadline; start servers in the background and check them with a second call.
- Writing outside `/work`. Paths are confined, and an attempt to escape fails
  rather than silently landing somewhere unexpected.
- Committing dependency directories. `node_modules` is never carried back.
