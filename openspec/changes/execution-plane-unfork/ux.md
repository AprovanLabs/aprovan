# execution-plane-unfork — UX

Repo-hygiene / build-boundary change; no user-facing surface. The deployed product, the
catalog site, and every panel behave identically before and after — the only observable
differences are for developers (fresh clones build without sibling checkouts, `.claude/
launch.json` launches the gateway from `server/workspace`) and for npm consumers
(`@aprovan/registry-server` becomes installable). No flows, screens, or components change.
