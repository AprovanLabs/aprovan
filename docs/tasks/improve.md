## Overview

Be consise and prefer strong abstractions. Do _not_ worry about backwards compatibility. Delete code and features that are no longer useful. Refactor as needed. Fan out work to subagents to investigate and refine the approach.

## Work

### App Refactor

Right now, we have the idea of 'apps' and 'workspaces' in the Aprovan app. There is soom poor client-side organization of this, with some ill-defined organization patterns, including the idea of 'Personal' using .personal. Here are my thoughts:

- We want 'Apps' to effectively be bundles or self-contained widgets, workflows/endpoints, code, etc. Think of how Slack apps work
    - We want apps to be installable into a workspace
    - They may have dependencies, like external 3rd party dependencies or interface dependencies (which would default to native tools but could be fulfilled by other 3rd party providers that meet the interface needs, if configured this way)
    - Apps should have strong configuration around where they store data (particularly VFS access), tools they can access, etc
- Apps are more 'global' level. They can be installed multiple places, after all. They'll need globally unique IDs.
    - As such, we need to separate the idea of 'apps' as an installable unit and the installation of an app in a workspace. I'm open o how this is accomplished, but it makes sense to me that 'Apps' become a native module available under a workspace in the registry and you can select an app when you open that pane, removing the separate 'App' drawer beneath the 'Workspace' drawer right now
    - App configuration of course needs to be stored _somwhere_. I'm thinking there is an owning workspace where this configuration is done, where you can open and configure an app as a user. This may seem weird, but in some ways I'm looking at Apps as open soruce installations where users technically own and manage an app instance. There isn't really anything different between the origin app and an installation, except the origin is the soruce-of-truth for updates and by-default the installation/forks don't expose editing
    - We want to set app availability to private within a workspace by-default, but allow users to make them public/installable.
    - Apps relying on 3rd party or native modules enables strong isolation and ownership of data for enterprise customers. Where companies want to maintain ownership over compute/storage/provide more complex pieces, they would then expose an API that could be consumed via UTDK tooling (or directly called as preferred)
- The goal with apps is to replace _all_ other software
    - I might make a 'Messages' app that facilitates messaging between user across a workspace with channels like slack
    - I will ahve a 'Projects' app to create boards, tasks, tickets etc
    - I want a 'Documents' app that might have great rendering capabilities like Google Docs/Word/Confluence built on a JSON format and a custom renderer
    - ...

'Personal' data makes sense for user-workspace level experiences. If an app is installed and data is specific to a user, they should have their own private partition, with the option to opt-in the the app installation. I'm thinking this is probably facilitated for native apps by opaque partitions, where an SDK for the same functionality managed data in the background. 'Personal' isn't necessarily a great way to brand all the workflows, etc that aren't published though? Maybe we have the idea of 'personal' flows for each user and everything else must be bundled under an app? unsure. I want users to be able to join a company's workspace and have access to great dev tooling, apps, etc while being able to customize too.

Then in the left you can select the apps installed in a workspace to interact/filter channels/view the data that is visible to you/look at app-specific rendereers for data...

The ic complex. Think how we can accomplish this with strong abstractions, simple library surfaces, and long-term thinking.

### Editor Improvements

We are _really_ close to effectively recreating a fantastic experience for editing Markdown files, effectively replacing Obsidian. However, our chat-centric/separate edit window way of doing things makes this not a great experience right now, by-default.

Here's the strengths and concerns:
- As we expose any backing VFS or VCS, we can run this locally on a file system or point it at our own blob storage. Making this a _really_ cool offering for people!
- Our chat-centric view is great, but it doesn't work well when you just want to view files and edit them directly. We should improve the 'by-default' experience and make it so users can opt-in to the chat neatly directly, but not have this cumbersome editor experience. This may require some re-thinking how we edit files and the renderer defaults, but the experience could be excellent

## Improvements

### Client Usability

Some of the client usability is a bit poor right now. The copy on pages is too engineering focused. I want more compact, usable and professional implementations.

We should fan out and improve the usability and looks for all the native applications.

### Poor Native Tools

Some 'native' tools shouldn't exist or are exposed poorly. In general, all should be improved to be more professional and usable.   

- The 'playground' doesn't make sense in the workspace app. It's more of an in-browser think for the registry
- Per the 'app refactor' we need to update how apps show up in the workspace
- The 'agents' pane is poor and hard to navigate. It doesn't look professional nor does it integrate well with the backing providers
- The 'credentials' page is basic. We have no way to configure 'profiles'
- The code/workflow renderer is a poor experience. Most are broken and take up a lot of space. Consider hwot o improve this. I want to replace Composio where we can have reusable flows that call 3rd party tools. It is so close! Consider 'App refactor' as part of this
- The 'admin' pane looks like an MVP and is not very usable. 

### Chat History/Edit Applies

The way we do chat history and see prior edits is confusing and not condusive to an easy default user experience. We want to make versioning and merge conflicts explicit for things like repos/apps, but is is overwhelming to the default user and we shouldn't need to save ephemeral chats as much (see editor improvements).

Furthermore, it should be more compact and clean.

### Registry Credentials

While I love we natively expose credential management in the Aprovan app, we _must_ expose the same set of credentials in the registry app for standlone users that do not want the full experience. I should _not_ see this on the credentials page from registry:

> Credential management has moved to the Aprovan product app.   

### Telemetry

The telemetry utdk module is interesting. It looks to implement an 'export' type functionality to work with Otel. But I want to include more useful functionality for applications: e.g. logging, metrics, traces/spans. Consider

## Other Projects

### Multi-User Presencse

The way we do mutli-user presence needs to chat. Always showing when a user has the workspace open is poor. It really only matters for the currently-open file.

Only shen should we see something, and it should be a very small preview circle of the user's presence. At this poine, we should be relying on CRDT if we're using editing on the main, non-staged area, and we should see a cursor where the user is editing files.

This should work using direct P2P connections for now, facilitated by the one ECS service we have.

### Desktop App

I want to expose all the Aprovan app functionality as a desktop app. This should be a web application with as-native-feeling functionality as possible, using perhaps Electron or Tauri (whatever mature, low memory usage, performant framework we can find for native integration).

3 main goals:

- Integrate local sandboxing/VFS directly with the OS, so we can run agents or workflows directly on the desktop
- Integrate the desktop app with permissive functionality exposed to installed widgets (e.g. on device transcription, local file access, etc.)
- Natively show widgets as sort of 'plugins' where you can trigger small isoalted widgets in sandboxed iframed windows with useful functionality. Think of how widgets work in general
- A big think I want to integration for functionality exposed widgets can use: on-device speech to text using the multiplatform solution from Handy
    - https://github.com/handy-computer/transcribe.cpp
    - I want to use this to control chat session

