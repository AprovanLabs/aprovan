## Overview

Be consise and prefer strong abstractions. Do _not_ worry about backwards compatibility. Delete code and features that are no longer useful. Refactor as needed. Fan out work to subagents to investigate and refine the approach.

We have 3 repos right now:

- AprovanLabs/core: Shared infra and libraries (utils, CDK, UI)
- AprovanLabs/registry: A registry for turning 3rd party APIs into SDKs
- AprovanLabs/aprovan: A platform for building UIs/applications via AI

However, I don't think the repos are split well to structure this. Furthermore, I see fundamental limitations with the current architecture that need to be addressed.

## Areas

### Registry

Registry has and _should_ contain the following:

- UTDK-generated 3rd party libraries (e.g. `@utdk/github`, `@utdk/google/drive`...)
- It should grab authority from public hostnames, with `.com` as a default:
  - `github.com` -> `@utdk/github`
  - `drive.google.com` -> `@utdk/google/drive`
  - `synthetic.new` -> `@utdk/synthetic-new` (note that right now I see a gap)
- Interfaces for common functionality (e.g. `@utdk/keyvalue`, `@utdk/sql`, `@utdk/events`, etc.)
- A sandboxed Node runtime for chaining library calls

It should NOT contain what it currently does:

- The Aprovan Workspace app. Regigister
- Apps, workflows, sync, sessions, notifications, sandbox, agents, etc. These should be in the Aprovan app.
  - While the registry might expose the base `@utdk` interfaces (see below) actual implementation should effectively be a set of Aprovan APIs that fulfill the contract. Right now, the registry workspace has all of this
- The braoder sandbox ecosystem. While registry might be able to run workflows in sandboxed isolates, I don't want to extend it's functionality yet. That should be relegated to registered provides that meet the sandbox runtime (which might themselves import UTDK modules)

### Aprovan

Aprovan should be a combination of shared infra/UI (e.g. AprovanLabs/core) and the primary product suite available on eventually desktop but currently web.

I'm still trying to figure out how Aprovan workflows and apps all fit together. I had thought it could be a whole development platform, but its hard to join the concepts of one-off little widgets with more compplex productionizable services. At the same time, publishing a UTDK package for a traditional service fits in nicel to the paradigm.

What I _do_ see of value so far:

- The file explorer and different file type renderers, based on Patchwork widgets, and using isolated native storage types is cool
  - It replaces Obsidian and exposes _way_ cooler possibilities. Plugins could access and modify data in so many cool ways, _though_ this points to us maybe needing to rely on object storage more than trying to pull in another database

_See the 'Desktop' next projects_

### Patchwork

Patchwork is the primary concern for module isolation. It has cross-over between the registry and is deeply integrated into the Aprovan app. The idea for Patchwork is as follows:

- We do not want to have to compile raw HTML for UI. As an example, React is very expressive and token efficient, but we need agents to have a pre-defined runtime environment _and_ a React compiler in the browser (along with any other dependencies)
- Additionally, we want to let agents easily connect to 3rd party dependencies (especially MCP tools!)
- Patchwork provides a way to do both:
  - We publish 'images' with pre-defined environments and dependencies
  - We proxy UTDK calls to a backend that loads credentials and authorizes calls
- Once saved, widgets can be re-used to call backend APIs via UTDK without re-generation by LLMs
  - This is where the overlap with the registry is clear: we publish re-usable things and have a runtime where we chain 3rd party calls

I see a potential integration point here, where we publish widgets for the 'native' modules that are actually useful for other registry packages. Here's a thought:

- The key-value UI tools are great for investigating Dynamo state
- VFS tools can help wth S3 discovery
- General JSON viewers are great for API calls

I haven't found a perfect separation here. Perhaps Patchwork integrates into the registry as the client-side registry? Register your UI components and automatically connect them? Unknown

## Limitations


### UTDK Coverage

UTDK code is only valuable if we have an E2E test suite with real credentials to test eash provider. We _need_ to build a solid test bench for this.


### Virtual File System

The metadata layer for the VFS is using DynamoDB. This is _ridiculously_ expensive and also slow for what we've been doing ($5 / user / month with minimal usage@). While S3 is the obvious choice for storing the files, we need a better way to manage this. Perhaps we can rely on S3 directly? Otherwise, I _think_ we should use DSQL for metadata.

Locally, we can continue to rely on SQLlite for metadata and actual files.

We also should have clear lineage on mounted external VFS/VCS-type systems.

### The Data and Auth Problem

Right now, the split between 'apps' and 'workspaces' is confusing, and the 'native' data split is porblematic.

Right now, credentials are stored at a workspace-level, with user-specific OAuth used for user-specific credentials. I want the scenario where many users can share a single workspace. I also want to allow users to publish internal and external apps for use. Finally, I want users to be able to 'install' apps into their workspace, where data is isolated to them (but I don't want the security nightmare!).

This existing pattern fits _fairly_ well for VFS:

- Prefix allow-list and sharing to a central spot
  - Great for central workspace sharing data across multiple systems
- We would need sets of 'personal' or 'hidden' data per-user, which we don't have yet
  - This generally fits into the issue with the next concerns around access per user. Where should private, per-user data go? Presumably, each user gets a partition somewhere for their personal data. That _could_ be solved with hidden directories if you don't have access, a la central VFS's of days of old (perhaps you have a `~/Home/<username>` directory)
  - But maybe that's clunky? Unknown. One way or another, that same sort of idea needs to be considered for non-VFS, where Dynamo records should show for other user 'private' data
- All this being said we _need_ a better metadata system with more efficient lookup and retreival than DynamoDB

I'm concerned about general scalability of the approach. I want to support both the idea of 'personal' apps and developer workflows, where I can see my agents, maintain skills or personal docs, and facilitate a great dev workflow. However, how can I marry this with the idae of an organization-owned workspace, where an organization has data/apps/workflows that may be useful? There's clearly not a great way to manage this split both for user vs workspace-level data and credentials access/management/

Furthermore, the split between top-level workspace registrations (e.g. webhooks, notifications, events, data) vs app-level is confusing. Consider.

### The Interface Issue

Right now for the Aprovan chat app, we have the idea of 'native' apps that auto expose and split data by workspace or workspace-user. We give users access to native implementations of VFS, key value, LLMs, notifications, sandboxes, agents, webhooks, and more. To me, the _vast_ majority of this should reconsidered and refactored into the registry under a new 'interface' concept. Furthermore, the way we handle multiple credential management is clunky, and this might improve it. Here's a rought thought:

```ts
// Currently excluded...but perhaps we should improve this
// I'm thinking that import maps should perhaps be configued and expose?
import github from "@utdk/github";
import googleDrive from "@utdk/google/drive";
import sql from "@utdk/sql"; // Could be usable with PostgreSQL, MySQL, SQLite, etc.
import keyvalue from "@utdk/keyvalue"; // Could be usable with Redis, DynamoDB, S3, etc.
import events from "@utdk/events"; // Could be usable with SQS, SNS, Kafka, etc based on the profile

// Note that we want automatic retries, telemetry, rate-limiting, pagination, etc built into this!
const folder = await googleDrive.get({ folderId: process.env.EXAMPLE });

// The 'docs' profile might auto-set database and schema
// Profiles might attach credentials. A runtime workflow/script should have profiles allow-listed
const docs = await sql.client("docs");
const { records } = await docs.execute({
  sql: `INSERT INTO example (name, author) VALUES ($1, $2) RETURNING *`,
  parameters: [folder.name, "Example"],
});

await keyvalue
  .set({ key: `${folder.name}:last-updated`, value: new Date() })(
    await events.client("global"),
  )
  .emit({ channel: "doc:created", payload: record });
```

With standardization, this would replace a _lot_ of the 'native' functionality in the Aprovan chat app. While we might want to brand 'native' functionality in the Aprovan chat, those would effectively be 1st party usage with automatic workspace- and app-level provisioning of credentials/authroization of data (e.g. a `keyvalue` call might be limited to an app and/or workspace combo).

Also an issue I'm seeing: it's hard for the agents in the chat flow to know what the imported UTDK module types are. We've been auto-importing the namespace, but should most-likely do the above and explicitly import from `@utdk/`

### Runtime

While we've started some sandboxing stuff, I'm not a huge fan of how it works. It's hard to tell whats going on at any one point in time, and I'd like to integrate with other providers easily, while still be namespaces by user. In general, the runtime and package idea is similar to the Wasmer registry. Consider if we can use any ideas from it (note how it pre-packages python or node. We kind of want the same thing for UI packaging).

https://wasmer.io/products/registry

_https://github.com/wasmerio/wasmer-js_

```ts
import { init, Wasmer } from "@wasmer/sdk";

await init();

const pkg = await Wasmer.fromRegistry("python/python");
const instance = await pkg.entrypoint.run({
  args: ["-c", "print('Hello, World!')"],
});

const { code, stdout } = await instance.wait();
console.log(`Python exited with ${code}: ${stdout}`);
```

```ts
import { init, Wasmer } from "@wasmer/sdk";

await init({ token: "YOUR_TOKEN" });

const manifest = {
  command: [
    {
      module: "wasmer/python:python",
      name: "hello",
      runner: "wasi",
      annotations: {
        wasi: {
          "main-args": ["-c", "print('Hello, js!'); "],
        },
      },
    },
  ],
  dependencies: {
    "wasmer/python": "3.12.9+build.9",
  },
};

let pkg = await Wasmer.createPackage(manifest);
let instance = await pkg.commands["hello"].run();

const output = await instance.wait();
console.log(output);
```

### Component Reference Porblem

We have a real problem with making bundling and running components closer to 'production'. Right now, individual Patchwork widgets are create for one-off tools and experiences, but Aprovan expolroes publishing these are 'real' apps.

However, it becomes difficult to sustain this:

- Real development toolchains can run full Git repos and have build chains. It's hard to extend this to the Patchwork model
- It's difficult to pull in component libraries, _especially_ with ShadCN components that try to import from `@/`. How do we share UI components like this? Maybe we should be building within broader VCS repos within? How would we 'publish' things?

The answer might be to rely more on traditional repo structure and load full repositories and compile/cache build assets where possible. But maybe Patchwork stops at more isolated widgets like a plugin.

### Telemetry

Telemetry in the system is lacking. We should consider having better admin tooling to look at Otel in somethign like Signoz (does PostHog have what we need? If so then that).

Additionally, we need an admin portal to see what usage is like for each native tool, users, etc.

## Infrastructure

I want to maintain shared infrastructure between the registry and Aprovan app (same login pattern, same aprovan.com). But I want to make sure the registry can live as an isolated unit. The registry must be able to run as an isolated container / CLI, but also integrate neatly into the broader Aprovan app.

Furthermore, I do _not_ want to pay for 2 running containers, 1 for the registry and another for the Aprovan app. So we should rely on shared infra to run both. Consider

## Next Projects

### Desktop App

I want to expose all the Aprovan app functionality as a desktop app with 3 main goals:

- Integrate local sandboxing/VFS directly with the OS, so we can run agents or workflows directly on the desktop
- Integrate the desktop app with permissive functionality exposed to installed widgets (e.g. on device transcription, local file access, etc.)
- Natively show widgets as sort of 'plugins' where you can trigger small isoalted widgets in sandboxed iframed windows with useful functionality. Think of how widgets work in general
