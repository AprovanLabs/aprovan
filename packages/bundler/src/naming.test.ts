import { describe, expect, it } from "vitest";
import {
  HOSTNAME_PACKAGE_MAP,
  assertValidProviderName,
  resolveProviderNameFromHostname,
  sanitizeNameSegment,
} from "./naming.js";

describe("resolveProviderNameFromHostname", () => {
  it("resolves github.com to github", () => {
    expect(resolveProviderNameFromHostname("github.com")).toEqual({
      name: "github",
      packageName: "@utdk/github",
      importSpecifier: "@utdk/github",
    });
  });

  it("lets an explicit entry win over the .com default: drive.google.com", () => {
    expect(resolveProviderNameFromHostname("drive.google.com")).toEqual({
      name: "google/drive",
      packageName: "@utdk/google",
      importSpecifier: "utdk/google/drive",
    });
  });

  it("collapses a non-.com TLD to one segment: synthetic.new", () => {
    // Deliberately NOT in the explicit map — the full-domain-slug default
    // must produce a single segment with no boundary at the domain dot.
    expect(HOSTNAME_PACKAGE_MAP["synthetic.new"]).toBeUndefined();
    expect(resolveProviderNameFromHostname("synthetic.new")).toEqual({
      name: "synthetic-new",
      packageName: "@utdk/synthetic-new",
      importSpecifier: "@utdk/synthetic-new",
    });
  });

  it("applies the .com default to unmapped vendors: linear.com", () => {
    expect(HOSTNAME_PACKAGE_MAP["linear.com"]).toBeUndefined();
    expect(resolveProviderNameFromHostname("linear.com")).toEqual({
      name: "linear",
      packageName: "@utdk/linear",
      importSpecifier: "@utdk/linear",
    });
  });

  it("resolves api.github.com through the explicit map, not the service rule", () => {
    // Without the map entry the <service>.<vendor>.com rule would say
    // "github/api"; the reviewed entry pins the canonical name.
    expect(HOSTNAME_PACKAGE_MAP["api.github.com"]).toBe("github");
    expect(resolveProviderNameFromHostname("api.github.com").name).toBe("github");
  });

  it("resolves github.io to the single-segment full-domain slug", () => {
    expect(resolveProviderNameFromHostname("github.io")).toEqual({
      name: "github-io",
      packageName: "@utdk/github-io",
      importSpecifier: "@utdk/github-io",
    });
  });

  it("applies the <service>.<vendor>.com rule to unmapped subdomains", () => {
    expect(resolveProviderNameFromHostname("apiz.ebay.com").name).toBe("ebay/apiz");
  });

  it("normalizes case and trailing dots before resolving", () => {
    expect(resolveProviderNameFromHostname("GitHub.com.").name).toBe("github");
  });

  it("never produces a name containing a dot", () => {
    const hostnames = [
      ...Object.keys(HOSTNAME_PACKAGE_MAP),
      "github.com",
      "drive.google.com",
      "synthetic.new",
      "linear.com",
      "api.github.com",
      "github.io",
      "bbci.co.uk",
      "6-dot-authentiqio.appspot.com",
      "walletobjects.googleapis.com",
      "cnab-online.herokuapp.com",
    ];
    for (const hostname of hostnames) {
      const resolved = resolveProviderNameFromHostname(hostname);
      expect(resolved.name).not.toContain(".");
      expect(resolved.packageName).not.toContain(".");
      expect(resolved.importSpecifier.replace(/^@?utdk\//u, "")).not.toContain(".");
    }
  });

  it("returns names that always pass assertValidProviderName", () => {
    for (const name of Object.values(HOSTNAME_PACKAGE_MAP)) {
      expect(() => assertValidProviderName(name)).not.toThrow();
    }
  });
});

describe("assertValidProviderName", () => {
  it("accepts slash-separated dash names", () => {
    expect(() => assertValidProviderName("github")).not.toThrow();
    expect(() => assertValidProviderName("google/drive")).not.toThrow();
    expect(() => assertValidProviderName("synthetic-new")).not.toThrow();
  });

  it("rejects dotted, uppercase, and empty names", () => {
    expect(() => assertValidProviderName("synthetic.new")).toThrow(/Invalid provider name/u);
    expect(() => assertValidProviderName("google.books")).toThrow(/Invalid provider name/u);
    expect(() => assertValidProviderName("GitHub")).toThrow(/Invalid provider name/u);
    expect(() => assertValidProviderName("")).toThrow(/Invalid provider name/u);
    expect(() => assertValidProviderName("a//b")).toThrow(/Invalid provider name/u);
  });
});

describe("sanitizeNameSegment", () => {
  it("collapses non-alphanumerics and prefixes leading digits", () => {
    expect(sanitizeNameSegment("Synthetic.New")).toBe("synthetic-new");
    expect(sanitizeNameSegment("1forge")).toBe("api-1forge");
    expect(sanitizeNameSegment("--weird__value--")).toBe("weird-value");
  });
});
