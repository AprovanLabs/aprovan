/**
 * Host admin platform helpers — F2 metering formatting + cap-below-usage.
 */

import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@/lib/tools", () => ({
  invokeAppsTool: vi.fn(),
}));

import { invokeAppsTool } from "@/lib/tools";
import {
  createInstanceHostClient,
  formatAsOfStamp,
  formatStorageBytes,
  isCapBelowUsage,
} from "@/features/messaging/admin/platform";
import {
  CAP_BELOW_USAGE_WARNING,
  managedNonMemberCopy,
} from "@/features/messaging/guest/copy";

beforeEach(() => {
  vi.mocked(invokeAppsTool).mockReset();
});

describe("admin/platform", () => {
  it("formats storage bytes and as-of stamps", () => {
    expect(formatStorageBytes(512)).toBe("512 B");
    expect(formatStorageBytes(2048)).toBe("2 KB");
    expect(formatStorageBytes(1536)).toBe("1.5 KB");
    expect(formatStorageBytes(5 * 1024 * 1024)).toBe("5 MB");
    const stamp = formatAsOfStamp(
      "2026-08-12T15:30:00.000Z",
      new Date("2026-08-12T20:00:00.000Z"),
    );
    expect(stamp.startsWith("as of ")).toBe(true);
  });

  it("detects cap below current usage (ux.md warning)", () => {
    expect(isCapBelowUsage(100, 200)).toBe(true);
    expect(isCapBelowUsage(200, 100)).toBe(false);
    expect(isCapBelowUsage(null, 100)).toBe(false);
    expect(CAP_BELOW_USAGE_WARNING).toBe(
      "New messages will fail until usage drops below the cap.",
    );
  });

  it("calls apps.instance* procedures only for metering", async () => {
    const invoke = vi.mocked(invokeAppsTool);
    invoke.mockResolvedValue({
      instanceId: "inst1",
      storageBytes: 10,
      storageCapBytes: 100,
      asOf: "2026-08-12T12:00:00.000Z",
    });
    const client = createInstanceHostClient();
    await client.usage("inst1", { recount: true });
    expect(invoke).toHaveBeenCalledWith("instanceUsage", {
      instanceId: "inst1",
      recount: true,
    });
    await client.setCap("inst1", 50);
    expect(invoke).toHaveBeenCalledWith("instanceCap", {
      instanceId: "inst1",
      storageCapBytes: 50,
    });
    await client.deleteInstance("inst1");
    expect(invoke).toHaveBeenCalledWith("instanceDelete", {
      instanceId: "inst1",
    });
  });

  it("wires removeParticipant to the platform call", async () => {
    const invoke = vi.mocked(invokeAppsTool);
    invoke.mockResolvedValue({});
    const client = createInstanceHostClient();
    await client.removeParticipant("inst1", "guest-bob");
    expect(invoke).toHaveBeenCalledWith("instanceRemoveParticipant", {
      instanceId: "inst1",
      sub: "guest-bob",
    });
  });
});

describe("coworker membership guidance", () => {
  it("uses ux.md managed non-member copy", () => {
    expect(managedNonMemberCopy("Acme Co")).toBe(
      "Not a member of Acme Co. Managed chat requires membership — invite them to the workspace first",
    );
  });
});
