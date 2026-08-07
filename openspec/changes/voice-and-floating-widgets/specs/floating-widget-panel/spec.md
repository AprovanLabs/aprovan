## ADDED Requirements

### Requirement: Hotkey-summoned floating surface

A user-configurable global hotkey SHALL show a floating surface above other applications, and SHALL hide it again. Summoning SHALL NOT move keyboard focus away from the application the user was in, except to the surface's own input.

#### Scenario: Summoned over another application

- **WHEN** a user presses the hotkey while working in another application
- **THEN** the surface appears above that application and accepts input, and the underlying application does not lose its active state

#### Scenario: Dismissing returns to the previous context

- **WHEN** the user dismisses the surface
- **THEN** it hides and the previously active application retains focus

#### Scenario: Hotkey conflict is reported

- **WHEN** the configured hotkey cannot be registered because another application holds it
- **THEN** the failure is reported at startup rather than silently producing an inactive key

#### Scenario: Hotkey is configurable

- **WHEN** a user changes the hotkey
- **THEN** the new binding takes effect and the previous one is released

### Requirement: Summoning is immediate

The surface SHALL be prepared before it is summoned, so appearing does not require creating a window.

#### Scenario: No window creation on summon

- **WHEN** the hotkey is pressed
- **THEN** an already-prepared surface is shown, rather than a new window being constructed

### Requirement: Widgets render unmodified in the floating surface

Widgets SHALL mount in the floating surface using the same mount contract as the chat surface, with no widget changes required.

#### Scenario: An existing widget renders in the panel

- **WHEN** a widget that renders in the chat surface is mounted in the floating surface
- **THEN** it renders and functions without modification

#### Scenario: Widget isolation is preserved

- **WHEN** a widget is mounted in the floating surface
- **THEN** it is sandboxed exactly as it is in the chat surface, gaining no additional privilege from the surface

### Requirement: Continuity through gateway sessions

State shared between the floating surface and the chat surface SHALL be held in a gateway session addressed by identifier, not in client-side mount state.

#### Scenario: Follow-up continues the exchange

- **WHEN** a user summons the surface, asks a question, dismisses it, then summons it again and asks a follow-up
- **THEN** the follow-up is answered in the context of the earlier exchange

#### Scenario: Chat can attach to a panel session

- **WHEN** a user opens the chat surface after an exchange in the floating surface
- **THEN** that exchange is available as a session in the chat surface

#### Scenario: No shared client-side state between surfaces

- **WHEN** the two surfaces run simultaneously
- **THEN** neither depends on client-side state held by the other, each reaching shared context through the gateway

### Requirement: Surface sizes to its content

The floating surface SHALL size itself to the widget it hosts rather than presenting a fixed frame.

#### Scenario: Panel height follows content

- **WHEN** a widget renders taller or shorter than the previous one
- **THEN** the surface adjusts its height to fit, within its configured bounds
