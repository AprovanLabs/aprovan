## Problem

The platform's central claim is that a capability is a contract and an implementation is swappable behind it. Every implementation today is a remote API or a first-party module running in the gateway. Nothing yet proves the model reaches native operating-system capability — the on-device model, the system's own services — and until it does, "expose native tooling as providers" is an assertion rather than a demonstrated property.

The cheapest place to test it is the `llm` contract, because every chat provider in the catalog is the same module with a different base URL. If an on-device model can be reached the same way, the claim is proven with no contract change at all.

Two smaller gaps ride along. Widget dependencies are fetched from a public CDN at mount time, so the guaranteed-offline renderer that `desktop-shell` establishes cannot actually render a widget offline. And the notification feed the product already maintains has no presence in the operating system, so a decision waiting on the user is invisible unless the window is in front.

## Users & Jobs

- **Local-first users** — want inference that never leaves the machine, selected the same way any other model is selected.
- **Offline users** — want widgets to render without a network round trip to a public CDN.
- **All desktop users** — want a notification requiring action to reach them through the system, with its actions intact.
- **Platform maintainers** — want one demonstrated pattern for native capability, so speech and everything after it follows a known path.

## Goals

- A native capability is reachable as an ordinary bound provider, with no contract change and no bespoke dispatch path.
- The on-device model appears in the model picker alongside hosted models and is selected identically.
- A provider that is unavailable — unsupported OS, disabled by the user, absent hardware — reports why, and the reason reaches the operator.
- Widgets render offline once their dependencies have been seen, and common dependencies are present before first use.
- Notifications reach the system notification centre with their choices as actions, dispatching the same calls the in-app feed dispatches.

## Non-Goals

- Does **not** implement speech-to-text or any streaming provider — that is `voice-and-floating-widgets`.
- Does **not** add a bindable notification delivery contract. Native notifications are a rendering surface over the existing feed; delivery as an interface is a separate future change.
- Does **not** add push delivery for notifications. The existing poll remains; for local workspaces the gateway is in-process, so latency is not a practical issue.
- Does **not** change the `llm` contract, its message shapes, or its dispatch.
- Does **not** implement text-to-speech, Vision, or any other framework beyond what the above requires.

## Capabilities

### New Capabilities

- `loopback-provider-host`: the signed native helper that exposes operating-system capability as HTTP on loopback, its lifecycle, and its availability reporting.
- `native-llm-provider`: the on-device model as an OpenAI-compatible chat provider, and its three-state availability.
- `native-notification-surface`: the existing notification feed rendered into the system notification centre with actionable choices.
- `widget-dependency-cache`: local resolution of widget dependencies, with a seed set present at install.

### Modified Capabilities

<!-- No main specs exist yet; nothing to modify. -->

## Constraints & Assumptions

- The gateway must remain the artifact the container ships, so it cannot load a platform-specific native addon. Native capability therefore lives outside the gateway and is reached over loopback.
- The on-device model requires a newer macOS than the application's floor, *and* requires the user to have enabled the system's intelligence features. Availability therefore has three states, not two, and the existing `unavailable` compat field expresses only two.
- Every chat provider in the catalog is `module: "openai"` differing only by `baseUrl`, and a `LLM_<ID>_BASE_URL` override already exists. The on-device provider is expected to need one table entry and no new code path.
- Notification choices are already validated at emit time against the emitting app's callable surface, so rendering them as system actions does not widen what an app can invoke.
- **Assumed, unconfirmed**: the helper binds an ephemeral loopback port chosen at launch, communicated to the gateway the same way the gateway's own port is communicated to the renderer.
- **Assumed, unconfirmed**: the dependency seed set is derived from the dependencies of the widgets shipped in the default workspace, rather than a hand-maintained list.

## Open Questions

<!-- Resolved in the 2026-08-06 grilling session; recorded here as decisions. -->

- **How do native capabilities bind?** → One signed helper exposing them over loopback HTTP. Rejected: native addons in the gateway (reintroduces the container divergence the gateway process model was chosen to avoid) and spawning a CLI per call (no session state, per-call startup cost).
- **Native notifications: contract or surface?** → Surface. A bindable delivery contract remains attractive as a later, separate change; conflating an inbox with a delivery channel on the first pass is not.
- **Widget dependencies offline?** → A fetch-through cache with a seed set. Rejected: a fixed curated dependency set (constrains widget authors to an app release) and compiling dependencies into each widget (a real compiler change, larger artifacts, no sharing).
