import {
  Button,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  Input,
} from "@aprovan/ui";
import { useState } from "react";
import type {
  CredentialRecord,
  ProfileCreateInput,
  ProfileLimits,
  ProfileTargetKind,
  ProfileUpdateInput,
  ProfileWire,
} from "./types";

export interface ProfileFormProps {
  mode: "create" | "edit";
  initial?: ProfileWire;
  credentials: CredentialRecord[];
  saving?: boolean;
  error?: string | null;
  onSubmit: (input: ProfileCreateInput | ProfileUpdateInput) => void | Promise<void>;
  onCancel: () => void;
}

function limitsFromWire(limits?: ProfileLimits): {
  rps: string;
  burst: string;
  budget: string;
} {
  return {
    rps: limits?.rps !== undefined ? String(limits.rps) : "",
    burst: limits?.burst !== undefined ? String(limits.burst) : "",
    budget: limits?.budget !== undefined ? String(limits.budget) : "",
  };
}

function parseLimits(rps: string, burst: string, budget: string): ProfileLimits | undefined {
  const out: ProfileLimits = {};
  if (rps.trim()) out.rps = Number(rps);
  if (burst.trim()) out.burst = Number(burst);
  if (budget.trim()) out.budget = Number(budget);
  return Object.keys(out).length > 0 ? out : undefined;
}

function optionsEntries(options: Record<string, unknown>): Array<{ key: string; value: string }> {
  const entries = Object.entries(options).map(([key, value]) => ({
    key,
    value: typeof value === "string" ? value : JSON.stringify(value),
  }));
  return entries.length > 0 ? entries : [{ key: "", value: "" }];
}

function optionsFromEntries(
  entries: Array<{ key: string; value: string }>,
): Record<string, unknown> | undefined {
  const out: Record<string, unknown> = {};
  for (const entry of entries) {
    const key = entry.key.trim();
    if (!key) continue;
    const raw = entry.value.trim();
    if (!raw) {
      out[key] = "";
      continue;
    }
    try {
      out[key] = JSON.parse(raw) as unknown;
    } catch {
      out[key] = raw;
    }
  }
  return Object.keys(out).length > 0 ? out : undefined;
}

export function ProfileForm({
  mode,
  initial,
  credentials,
  saving,
  error,
  onSubmit,
  onCancel,
}: ProfileFormProps): React.ReactElement {
  const [name, setName] = useState(initial?.name ?? "");
  const [targetKind, setTargetKind] = useState<ProfileTargetKind>(
    initial?.targetKind ?? "provider",
  );
  const [targetId, setTargetId] = useState(initial?.targetId ?? "");
  const [provider, setProvider] = useState(initial?.provider ?? "");
  const [credentialId, setCredentialId] = useState(initial?.credentialId ?? "");
  const [optionRows, setOptionRows] = useState(() => optionsEntries(initial?.options ?? {}));
  const [limits, setLimits] = useState(() => limitsFromWire(initial?.limits));

  async function handleSubmit(event: React.FormEvent): Promise<void> {
    event.preventDefault();
    if (!name.trim() || (mode === "create" && !targetId.trim())) return;

    const parsedLimits = parseLimits(limits.rps, limits.burst, limits.budget);
    const options = optionsFromEntries(optionRows);

    if (mode === "create") {
      const input: ProfileCreateInput = {
        name: name.trim(),
        targetKind,
        targetId: targetId.trim(),
        ...(targetKind === "interface" && provider.trim()
          ? { provider: provider.trim() }
          : {}),
        ...(credentialId ? { credentialId } : {}),
        ...(options ? { options } : {}),
        ...(parsedLimits ? { limits: parsedLimits } : {}),
      };
      await onSubmit(input);
      return;
    }

    const input: ProfileUpdateInput = {
      name: name.trim(),
      ...(provider.trim() ? { provider: provider.trim() } : {}),
      credentialId: credentialId || null,
      ...(options ? { options } : { options: {} }),
      limits: parsedLimits ?? null,
    };
    await onSubmit(input);
  }

  const selectClass =
    "h-9 w-full rounded-md border border-input bg-transparent px-2.5 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50";

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base">
          {mode === "create" ? "New profile" : "Edit profile"}
        </CardTitle>
      </CardHeader>
      <form onSubmit={(event) => void handleSubmit(event)}>
        <CardContent className="flex flex-col gap-3">
          <label className="flex flex-col gap-1.5">
            <span className="text-sm font-medium">Name</span>
            <Input
              onChange={(event) => setName(event.target.value)}
              placeholder="e.g. Production GitHub"
              value={name}
            />
          </label>

          {mode === "create" ? (
            <>
              <label className="flex flex-col gap-1.5">
                <span className="text-sm font-medium">Target kind</span>
                <select
                  className={selectClass}
                  onChange={(event) =>
                    setTargetKind(event.target.value === "interface" ? "interface" : "provider")
                  }
                  value={targetKind}
                >
                  <option value="provider">Provider</option>
                  <option value="interface">Interface</option>
                </select>
              </label>
              <label className="flex flex-col gap-1.5">
                <span className="text-sm font-medium">
                  {targetKind === "interface" ? "Interface id" : "Provider id"}
                </span>
                <Input
                  className="font-mono text-sm"
                  onChange={(event) => setTargetId(event.target.value)}
                  placeholder={targetKind === "interface" ? "e.g. llm" : "e.g. github"}
                  value={targetId}
                />
              </label>
            </>
          ) : (
            <p className="text-sm text-muted-foreground">
              Target{" "}
              <span className="font-mono text-foreground">
                {initial?.targetKind}:{initial?.targetId}
              </span>
            </p>
          )}

          {(mode === "create" ? targetKind === "interface" : initial?.targetKind === "interface") && (
            <label className="flex flex-col gap-1.5">
              <span className="text-sm font-medium">
                Executing provider{" "}
                <span className="font-normal text-muted-foreground">(optional)</span>
              </span>
              <Input
                className="font-mono text-sm"
                onChange={(event) => setProvider(event.target.value)}
                placeholder="Provider that runs this interface"
                value={provider}
              />
            </label>
          )}

          <label className="flex flex-col gap-1.5">
            <span className="text-sm font-medium">
              Credential <span className="font-normal text-muted-foreground">(optional)</span>
            </span>
            <select
              className={selectClass}
              onChange={(event) => setCredentialId(event.target.value)}
              value={credentialId}
            >
              <option value="">None</option>
              {credentials.map((cred) => (
                <option key={cred.id} value={cred.id}>
                  {cred.label ?? cred.provider} ({cred.provider})
                </option>
              ))}
            </select>
          </label>

          <div className="flex flex-col gap-1.5">
            <span className="text-sm font-medium">
              Options <span className="font-normal text-muted-foreground">(key / value)</span>
            </span>
            {optionRows.map((row, index) => (
              <div className="flex gap-2" key={index}>
                <Input
                  className="font-mono text-xs"
                  onChange={(event) => {
                    const next = [...optionRows];
                    next[index] = { ...row, key: event.target.value };
                    setOptionRows(next);
                  }}
                  placeholder="key"
                  value={row.key}
                />
                <Input
                  className="font-mono text-xs"
                  onChange={(event) => {
                    const next = [...optionRows];
                    next[index] = { ...row, value: event.target.value };
                    setOptionRows(next);
                  }}
                  placeholder="value"
                  value={row.value}
                />
                <Button
                  onClick={() => setOptionRows(optionRows.filter((_, i) => i !== index))}
                  size="sm"
                  type="button"
                  variant="ghost"
                >
                  Remove
                </Button>
              </div>
            ))}
            <Button
              onClick={() => setOptionRows([...optionRows, { key: "", value: "" }])}
              size="sm"
              type="button"
              variant="outline"
            >
              Add option
            </Button>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            <label className="flex flex-col gap-1.5">
              <span className="text-sm font-medium">RPS limit</span>
              <Input
                onChange={(event) => setLimits((prev) => ({ ...prev, rps: event.target.value }))}
                placeholder="optional"
                type="number"
                value={limits.rps}
              />
            </label>
            <label className="flex flex-col gap-1.5">
              <span className="text-sm font-medium">Burst</span>
              <Input
                onChange={(event) => setLimits((prev) => ({ ...prev, burst: event.target.value }))}
                placeholder="optional"
                type="number"
                value={limits.burst}
              />
            </label>
            <label className="flex flex-col gap-1.5">
              <span className="text-sm font-medium">Daily budget</span>
              <Input
                onChange={(event) => setLimits((prev) => ({ ...prev, budget: event.target.value }))}
                placeholder="optional"
                type="number"
                value={limits.budget}
              />
            </label>
          </div>

          {error ? <p className="text-sm text-destructive">{error}</p> : null}
        </CardContent>
        <CardFooter className="flex justify-end gap-2 border-t pt-3">
          <Button onClick={onCancel} type="button" variant="outline">
            Cancel
          </Button>
          <Button
            disabled={
              saving || !name.trim() || (mode === "create" && !targetId.trim())
            }
            type="submit"
          >
            {saving ? "Saving…" : mode === "create" ? "Create profile" : "Save"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
