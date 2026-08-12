/**
 * Pure URL-style resource-pattern matcher.
 *
 * Mirrors `@aprovan/registry-server` `matchesResourcePattern` (0.2.11 /
 * iw9-c resource-grants). Vendored here because patchwork-web cannot take a
 * direct registry-server dependency within this stream's Touches — keep in
 * lockstep with the published algorithm.
 *
 * Shape: literal segments, `*` = one segment, `**` / trailing `*` = suffix
 * wildcard, case-insensitive host. No regex, no network I/O.
 */

function hostLabels(host: string): string[] {
  if (!host) return [];
  return host.split(".").filter((label) => label.length > 0);
}

function pathSegments(pathname: string): string[] {
  if (!pathname || pathname === "/") return [];
  return pathname.split("/").filter((segment) => segment.length > 0);
}

function matchHost(patternHost: string, resourceHost: string): boolean {
  const pattern = hostLabels(patternHost.toLowerCase());
  const resource = hostLabels(resourceHost.toLowerCase());
  if (pattern.length !== resource.length) return false;
  for (let i = 0; i < pattern.length; i++) {
    const p = pattern[i]!;
    const r = resource[i]!;
    if (p === "*") continue;
    if (p !== r) return false;
  }
  return true;
}

function matchSegments(pattern: string[], resource: string[]): boolean {
  let pi = 0;
  let ri = 0;
  while (pi < pattern.length && ri < resource.length) {
    const p = pattern[pi]!;
    const trailingSuffix = p === "**" || (p === "*" && pi === pattern.length - 1);
    if (trailingSuffix) {
      return pi === pattern.length - 1;
    }
    if (p === "*") {
      pi += 1;
      ri += 1;
      continue;
    }
    if (p !== resource[ri]) return false;
    pi += 1;
    ri += 1;
  }
  if (pi < pattern.length) {
    const rest = pattern.slice(pi);
    return rest.length === 1 && (rest[0] === "**" || rest[0] === "*");
  }
  return ri === resource.length;
}

function matchPath(patternPath: string, resourcePath: string): boolean {
  return matchSegments(pathSegments(patternPath), pathSegments(resourcePath));
}

function tryParseUrl(value: string): URL | undefined {
  try {
    return new URL(value);
  } catch {
    return undefined;
  }
}

export function matchesResourcePattern(pattern: string, resource: string): boolean {
  if (pattern === resource) return true;
  const patternUrl = tryParseUrl(pattern);
  const resourceUrl = tryParseUrl(resource);
  if (patternUrl && resourceUrl) {
    if (patternUrl.protocol.toLowerCase() !== resourceUrl.protocol.toLowerCase()) {
      return false;
    }
    if (!matchHost(patternUrl.hostname, resourceUrl.hostname)) return false;
    return matchPath(patternUrl.pathname, resourceUrl.pathname);
  }
  return matchSegments(pathSegments(pattern), pathSegments(resource));
}
