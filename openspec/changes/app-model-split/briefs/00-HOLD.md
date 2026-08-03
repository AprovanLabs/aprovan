# Brief: App-model server identity lane (HOLD — dispatch after wave-1 merges)

## Mission
ID-keyed apps, delete Personal/`dataScope`, re-root partitions to `.apps/<id>/data/<sub>` +
`.users/<sub>`, and make unbundled workflows creator-private. **Do not start until** the
orchestrator confirms wave-1 aprovan/registry merges that touch `server/workspace` have
landed, and note stream 3's profile-binding tasks still require IW-0 npm gate.

## Status
BLOCKED for dispatch. Full tasks in `tasks.md` streams 1–2 (server) and 4 (client packages)
can be briefed next; stream 3 waits on `@aprovan/registry-server@^0.1.1` installable.

Owner decisions: delete `dataScope` entirely; unbundled workflows creator-private; partition
roots as above.
