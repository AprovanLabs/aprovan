/**
 * Workspace creation form from local-first UX, with the desktop native
 * directory picker when the bridge is available (else plain path input).
 */

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PROPOSED_WORKSPACE_ROOT } from "./defaults";
import { DirectoryField } from "./DirectoryField";

export type WorkspaceLocusKind = "local" | "cloud";

export type CreateWorkspaceValues = {
  name: string;
  locus: WorkspaceLocusKind;
  /** Local VFS root; meaningful when locus is `"local"`. */
  vfsRoot: string;
};

export interface CreateWorkspaceFormProps {
  /** Cloud kind is selectable; when false, shown disabled with a reason. */
  cloudAvailable?: boolean;
  cloudUnavailableReason?: string;
  submitting?: boolean;
  error?: string;
  onSubmit: (values: CreateWorkspaceValues) => void | Promise<void>;
  onCancel?: () => void;
}

export function CreateWorkspaceForm({
  cloudAvailable = true,
  cloudUnavailableReason = "Link an account to create a cloud workspace.",
  submitting = false,
  error,
  onSubmit,
  onCancel,
}: CreateWorkspaceFormProps) {
  const [name, setName] = useState("");
  const [locus, setLocus] = useState<WorkspaceLocusKind>("local");
  const [vfsRoot, setVfsRoot] = useState(PROPOSED_WORKSPACE_ROOT);
  const [directoryError, setDirectoryError] = useState<string | undefined>();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const trimmedName = name.trim();
    const trimmedRoot = vfsRoot.trim();
    if (!trimmedName) return;
    if (locus === "local" && !trimmedRoot) {
      setDirectoryError("Choose a directory for this workspace.");
      return;
    }
    setDirectoryError(undefined);
    await onSubmit({
      name: trimmedName,
      locus,
      vfsRoot: trimmedRoot,
    });
  }

  return (
    <form className="space-y-5" onSubmit={(e) => void handleSubmit(e)}>
      <div className="space-y-2">
        <label className="text-sm font-medium" htmlFor="workspace-name">
          Name
        </label>
        <Input
          autoFocus
          disabled={submitting}
          id="workspace-name"
          onChange={(e) => setName(e.target.value)}
          placeholder="My workspace"
          required
          value={name}
        />
      </div>

      <fieldset className="space-y-2" disabled={submitting}>
        <legend className="text-sm font-medium">Kind</legend>
        <div className="flex flex-col gap-2">
          <label className="flex items-start gap-2 text-sm">
            <input
              checked={locus === "local"}
              className="mt-1"
              name="locus"
              onChange={() => setLocus("local")}
              type="radio"
              value="local"
            />
            <span>
              <span className="font-medium">Local</span>
              <span className="block text-xs text-muted-foreground">
                Runs on this machine. Files stay under the root you choose.
              </span>
            </span>
          </label>
          <label
            className={`flex items-start gap-2 text-sm ${cloudAvailable ? "" : "opacity-60"}`}
          >
            <input
              checked={locus === "cloud"}
              className="mt-1"
              disabled={!cloudAvailable}
              name="locus"
              onChange={() => setLocus("cloud")}
              type="radio"
              value="cloud"
            />
            <span>
              <span className="font-medium">Cloud</span>
              <span className="block text-xs text-muted-foreground">
                {cloudAvailable
                  ? "Hosted on aprovan.com."
                  : cloudUnavailableReason}
              </span>
            </span>
          </label>
        </div>
      </fieldset>

      {locus === "local" ? (
        <DirectoryField
          disabled={submitting}
          error={directoryError}
          onChange={(next) => {
            setDirectoryError(undefined);
            setVfsRoot(next);
          }}
          value={vfsRoot}
        />
      ) : null}

      {error ? <p className="text-sm text-destructive">{error}</p> : null}

      <div className="flex justify-end gap-2">
        {onCancel ? (
          <Button
            disabled={submitting}
            onClick={onCancel}
            type="button"
            variant="ghost"
          >
            Cancel
          </Button>
        ) : null}
        <Button disabled={submitting || !name.trim()} type="submit">
          {submitting ? "Creating…" : "Create workspace"}
        </Button>
      </div>
    </form>
  );
}
