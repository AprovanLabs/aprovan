Backend-only change; no UX surface. The session mechanism is consumed by contracts and providers, not by users. The first user-visible consumer is `stt-contract`, and the first UI is `voice-and-floating-widgets`.

One operator-facing behavior worth noting for those changes: binding a non-streaming provider to a session-bearing interface now fails at bind time with `streaming-unsupported`, so any provider-picker UI must surface that error rather than presenting the provider as bindable.
