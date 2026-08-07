Backend-only change; no UX surface. The contract is bound by administrators through the existing interface-binding surface and consumed by code. Audio capture, microphone permission, and every visible element of the voice experience belong to `voice-and-floating-widgets`.

Two behaviors here do surface through existing admin UI and must not be swallowed by it:

- Binding a provider whose capability descriptor lacks streaming fails at bind time with `streaming-unsupported` (inherited from `streaming-sessions`).
- The `assemblyai` compat entry ships with an `unavailable` reason and must render as unselectable-with-explanation, exactly as the `agent` contract's unbuilt entries already do.
