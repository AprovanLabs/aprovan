# native-notification-surface

Purpose: TBD (synced from macos-native-providers change).

## Requirements

### Requirement: Notifications reach the system notification centre

Notifications from the workspace feed SHALL be presented through the operating system's notification centre while the application is running, whether or not its window is in front.

#### Scenario: Notification appears without the window in front

- **WHEN** a notification is emitted while the application window is in the background
- **THEN** a system notification is presented carrying the notification's title and body

#### Scenario: Feed remains the source of truth

- **WHEN** a notification is presented natively
- **THEN** the same notification remains in the in-app feed with its existing read state, expiry, and behavior

### Requirement: Choices become notification actions

A notification's choices SHALL be presented as actions on the system notification, and activating one SHALL dispatch the same call the in-app feed dispatches.

#### Scenario: Activating an action dispatches its call

- **WHEN** a user activates an action on a system notification
- **THEN** the corresponding choice's call is dispatched through the same path the in-app feed uses, and the result is reflected in the feed

#### Scenario: Emit-time validation is unchanged

- **WHEN** a notification emitted through an app session is rendered natively
- **THEN** its choices are exactly those that passed emit-time validation against that app's callable surface, no new call being reachable through the native surface

#### Scenario: Notification with no choices

- **WHEN** a notification carrying no choices is presented
- **THEN** it is presented without actions and activating it opens the application to that notification

### Requirement: Seen notifications are withdrawn

A notification marked seen SHALL be withdrawn from the system notification centre.

#### Scenario: Reading in-app clears the system notification

- **WHEN** a user marks a notification seen in the application
- **THEN** the corresponding system notification is withdrawn

#### Scenario: No duplicate presentation

- **WHEN** the feed is refreshed and returns a notification that has already been presented
- **THEN** it is not presented a second time

### Requirement: Native presentation is not a delivery contract

The native notification surface SHALL be a presentation of the existing feed. It SHALL NOT introduce a bindable delivery interface or a second notification store.

#### Scenario: No new bindable interface

- **WHEN** the interface catalog is listed
- **THEN** no notification-delivery interface has been added
