/**
 * Workspace root path field: plain text input always; native Browse when the
 * desktop bridge is present. Cancelled picks leave the prior value intact.
 */

import { FolderOpen } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  PROPOSED_WORKSPACE_ROOT,
  WORKSPACE_ROOT_CONTAINMENT_STATEMENT,
} from "./defaults";
import { getDesktopBridge, isDesktopBridgeAvailable } from "./desktop";

export interface DirectoryFieldProps {
  value: string;
  onChange: (next: string) => void;
  disabled?: boolean;
  error?: string;
  id?: string;
}

export function DirectoryField({
  value,
  onChange,
  disabled = false,
  error,
  id = "workspace-root",
}: DirectoryFieldProps) {
  const canPick = isDesktopBridgeAvailable();
  const [picking, setPicking] = useState(false);

  async function handleBrowse() {
    const bridge = getDesktopBridge();
    if (!bridge || picking) return;
    const prior = value;
    setPicking(true);
    try {
      const selected = await bridge.pickDirectory("workspace-root");
      // Cancel → keep prior (desktop-shell UX: picker cancelled).
      if (selected === undefined) {
        onChange(prior);
        return;
      }
      onChange(selected);
    } finally {
      setPicking(false);
    }
  }

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium" htmlFor={id}>
        Workspace root
      </label>
      <div className="flex gap-2">
        <Input
          disabled={disabled || picking}
          id={id}
          onChange={(e) => onChange(e.target.value)}
          placeholder={PROPOSED_WORKSPACE_ROOT}
          spellCheck={false}
          value={value}
        />
        {canPick ? (
          <Button
            disabled={disabled || picking}
            onClick={() => void handleBrowse()}
            type="button"
            variant="outline"
          >
            <FolderOpen className="size-4" />
            Browse
          </Button>
        ) : null}
      </div>
      <p className="text-xs text-muted-foreground">
        {WORKSPACE_ROOT_CONTAINMENT_STATEMENT}
      </p>
      {error ? <p className="text-xs text-destructive">{error}</p> : null}
    </div>
  );
}
