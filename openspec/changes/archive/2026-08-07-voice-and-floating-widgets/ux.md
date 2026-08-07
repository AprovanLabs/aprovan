## Flows

### Flow: Ask by voice from another application

1. User is working in another application and presses the hotkey.
2. The floating surface appears above it. The underlying application does not lose its active state; only the surface's input is focused.
3. Capture starts, and a live partial transcript appears as the user speaks. The surface shows whether transcription is happening on this machine or at a named remote provider.
4. User stops speaking. Capture ends on release, on an explicit stop, or on provider-signalled end of speech.
5. The answer renders as a widget in the surface, which resizes to fit.
6. User dismisses. The surface hides and focus returns to where it was.
7. Failure paths: permission denied → the surface stays open for typed input with voice reported unavailable and the reason; no microphone → reported as a missing device, worded differently; transcription fails → the partial transcript is retained and editable rather than discarded; hotkey unregistrable → reported at startup, with the surface still reachable from the application.

### Flow: Follow-up question

1. User summons the surface again after a previous exchange.
2. The surface indicates it is continuing the previous exchange rather than starting fresh, and offers a way to start a new one.
3. User asks a follow-up; it is answered in the earlier context.
4. Failure path: the earlier session has expired → the surface says so and starts a new exchange rather than silently losing context.

### Flow: Voice in chat

1. User activates the capture control in the chat composer.
2. Partial transcript appears in the composer as they speak, editable once capture ends.
3. User submits, edits first, or discards.
4. Failure paths: as in the panel flow, rendered inline in the composer.

### Flow: Install a different model

1. User opens speech settings and sees installed and available models with sizes and capabilities.
2. User installs a larger or diarization-capable model; progress is shown during the fetch.
3. On completion the model is selectable, and the capabilities shown for the provider update to match it.
4. Failure paths: verification fails → not installed, existing models untouched, failure reported; no connectivity → install unavailable while the bundled model remains fully usable; attempt to remove the bundled default → refused, with the reason that it is the offline path.

## Screens & States

### Floating surface

- **Purpose**: ask and get a widget answer without leaving the current application.
- **Key elements**: input line; live transcript; transcription destination indicator; widget host; a continuing-previous-exchange indicator when applicable.
- **States**: *idle prewarmed* — hidden, no visible state; *listening* — transcript updating, destination shown; *thinking* — after capture, before the widget; *answered* — widget rendered, surface sized to it; *voice unavailable* — typed input with an inline reason; *session expired* — states that it is starting fresh; *widget failed to mount* — inline error naming the cause, surface still dismissible.

### Chat composer with voice

- **Purpose**: dictate into the existing composer.
- **Key elements**: capture control; live transcript in the composer; destination indicator during capture.
- **States**: *idle*, *listening*, *transcript editable*, *unavailable with reason*. Nothing here replaces typing; voice is an additional input to the existing composer.

### Speech settings

- **Purpose**: choose and manage transcription models.
- **Key elements**: installed and available models with size and capabilities; install and remove actions; provider binding.
- **States**: *installing* — progress; *verification failed* — inline error, nothing changed; *offline* — install unavailable, bundled model unaffected; *bundled model* — remove action absent rather than shown disabled.

## Component Inventory

Existing `@aprovan/ui` primitives throughout. The widget host in the panel is the existing mount path, not a second one. The transcript display and destination indicator are the only genuinely new elements, and both are small enough to build from existing text and badge primitives. The panel chrome itself is deliberately minimal — no title bar, no navigation, no sidebar — since it is a transient surface over someone else's application.

## Open Questions

None outstanding for UX. The one open item on this change is the model licensing question in the tech plan, which affects whether the first run includes a download step and therefore whether the install flow appears before first use.
