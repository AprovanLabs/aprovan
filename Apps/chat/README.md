# Chat

Flagship messaging app on the iw9-b app model. One `app.yaml`, two host
modes (`managed` / `creator-hosted`), data in the F2 shared partition.

## Host modes

Install prompts for a mode because both are declared (D2). The choice is
immutable on the install record (invariant 10).

| Mode | Where data lives |
| --- | --- |
| `managed` | Installing workspace (members only) |
| `creator-hosted` | Installer's personal space; others join as guests |

## Capability ceiling

Exact list in `app.yaml` — no bare `*`, no provider wildcards:

- `records.*` — own shared-partition records
- `realtime.subscribe` / `realtime.publish` — topic `app:<installId>`
- `invites.create` — instance-targeted guest invites
- `agents.run` — `chat/summarize` (declared in stream 5)
