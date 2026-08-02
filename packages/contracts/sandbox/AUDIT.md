# Shape audit — @utdk/sandbox

Paper audit (documentation-level) of the contract surface against real vendor
APIs, per Decision 8. Freeze criterion for the 0.2.0 bump.

## Vendors

1. **E2B** (Sandboxes API / SDK: create, exec, filesystem, ports)
2. **Modal** (Sandbox API: `Sandbox.create`, `exec`, tunnels, volumes)
3. **Daytona** (Workspaces/Sandboxes API: create, exec, fs, preview links)

## Per-operation mapping

| Contract op | E2B | Modal | Daytona |
| --- | --- | --- | --- |
| `create` (image, env, resources, ttl) | `Sandbox.create({ template, envs, timeoutMs })` | `Sandbox.create(image, secrets, timeout, cpu/memory)` | create workspace (image, env, resources, autoStopInterval) |
| `get` / `list` (`SandboxStatus`) | `getInfo` / `Sandbox.list` (state) | `Sandbox.from_id` / list (task state) | get/list workspaces (status) |
| `destroy` | `kill` | `terminate` | delete workspace |
| `exec` (cmd, cwd, env, timeout; stdout/stderr/exitCode, clamped) | `commands.run` (stdout, stderr, exitCode) | `sandbox.exec` (streams + returncode) | process exec (result + exit code) |
| `readFile`/`writeFile`/`deleteFile`/`listFiles` (relative paths) | `files.read/write/remove/list` | volume/`open()` file API | fs read/upload/delete/list |
| `exposePort` (public URL) | `getHost(port)` → public https URL | Tunnels (`sandbox.tunnels[port].url`) | preview links per port |
| capabilities flags (`SandboxCapabilities`) | ports+fs+exec supported | ports via tunnels; fs via volumes (weaker) | ports+fs+exec supported |
| ttl (`DEFAULT_TTL_SECONDS`) | `timeoutMs` per sandbox | `timeout` on create | auto-stop interval |
| error → `SandboxError(status)` | HTTP/SDK errors | gRPC/SDK errors → mapped status | HTTP status |

Findings:

- The driver surface (lifecycle + exec + files + ports) is the intersection
  all three vendors document first-class; every operation lands on a native
  endpoint or SDK call.
- Modal's filesystem story routes through volumes rather than a direct
  sandbox-relative fs API; the `SandboxCapabilities` flags already express
  partial support, so a Modal adapter declares what it implements instead of
  faking the rest — exactly the capability-gating posture the contract ships
  (`assertCapability`).
- Output clamping (`MAX_OUTPUT_BYTES`) and file-size limits
  (`MAX_FILE_BYTES`) are stricter than every vendor limit encountered, so
  the contract's limits are safe lowest-common-denominator values.
- The hash-manifest sync helpers (`shellManifestCommand`,
  `parseShellManifest`) require only POSIX shell in the image — true for all
  three vendors' default images.

## Changes

No change. Lifecycle, exec, file, and port operations mapped onto all three
vendors; partial-support cases are handled by the existing capabilities
mechanism rather than surface changes.

## Verdict

**Frozen at 0.2.0.** All operations implementable against E2B and Daytona
directly and against Modal with capability-declared file support.
