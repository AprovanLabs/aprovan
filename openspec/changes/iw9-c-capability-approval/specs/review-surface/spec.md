# review-surface

One surface for everything awaiting a human decision, obeying invariant 6
(payload-widget / shell-decision): queued actions, staged changes, merge
conflicts, capability requests — and the existing notification widget path
retrofitted onto the same split.

## ADDED Requirements

### Requirement: One surface, four item kinds
The client SHALL render queued actions (action-exception-queue), staged
session changes (iw9-a's answerable sessions), merge conflicts, and
capability requests (install cards, JIT cards, `ask` steps, agent drafts)
as items of a single review surface with one list, one badge count, and one
item anatomy. New decision kinds SHALL be added as item kinds of this
surface, not as new surfaces.

#### Scenario: Mixed queue in one list
- **WHEN** a user has one queued action, one staged change, and one JIT
  capability request
- **THEN** all three appear in the same surface, filterable by kind, with
  a combined badge count of 3

### Requirement: Shell renders the decision, widget renders only the payload
For every item, the trusted shell SHALL render: who is asking (principal +
app/profile), the capability and resource, the credential level, the
effect, and the action buttons. An app-supplied sandboxed widget MAY render
only the payload (diff, message preview, custom body). If the widget edits
the payload, the shell summary SHALL re-render before approval, and
approval SHALL apply to what the shell last displayed. Items with no
widget SHALL fall back to a generic card (invariant 6).

#### Scenario: Widget cannot spoof the shell
- **WHEN** an app widget renders a payload claiming a different capability
  than the request carries
- **THEN** the shell header still shows the request's true (capability,
  resource, credential) and buttons act on that, not on widget content

#### Scenario: Payload edit re-renders shell
- **WHEN** the user edits the message body inside a send-message widget
- **THEN** the shell summary updates to reflect the edited payload before
  the approve button acts, and the approved action carries the edit

#### Scenario: No widget, generic card
- **WHEN** an item's app supplies no widget
- **THEN** the shell renders a generic payload card (args, target
  resource) and all decisions remain available

### Requirement: Notifications adopt the shell/widget split
The existing notification widget body (`NotificationRecord.widget`,
`server/workspace/src/notifications/service.ts`) SHALL be rendered under
the same sandbox and the same rule set as review-surface widgets,
preserving the existing constraint that apps may only embed calls they can
make themselves; notification `choices` SHALL render in the shell, not the
widget.

#### Scenario: Notification widget is sandboxed like a review widget
- **WHEN** an app notification with a widget body renders
- **THEN** the widget runs in the same sandbox as review-surface widgets,
  the shell renders source app and choices, and a widget-embedded call
  outside the app's grants is rejected by the dispatch predicate

### Requirement: Decisions route to the holder of authority
Each item SHALL appear in the queue of the principal who can decide it
(invariant 1: workspace-credential grants → admins; user-credential and
own-run approvals → the invoker; D15: approvals from a run go to the
invoker). A user SHALL never be shown a decision they lack authority to
make, except read-only visibility for admins.

#### Scenario: Run approval goes to invoker
- **WHEN** a member's agent run raises an `ask`
- **THEN** the card appears in that member's review surface, not the
  admin's

#### Scenario: Workspace grant goes to admins
- **WHEN** an app requests a resource under a workspace-oauth credential
- **THEN** the card appears for workspace admins and resolves once for the
  whole space
