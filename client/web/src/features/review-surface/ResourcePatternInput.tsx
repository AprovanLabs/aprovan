/**
 * Pattern editor with matcher-validated coverage preview for Allow-pattern.
 */

import { Input } from "@/components/ui/input";
import { matchesResourcePattern } from "@/features/capability-cards/matches-resource-pattern";

export function ResourcePatternInput({
  value,
  onChange,
  candidates,
}: {
  value: string;
  onChange: (next: string) => void;
  /** Queued resources to preview coverage against. */
  candidates: string[];
}) {
  const covered = candidates.filter((r) => {
    try {
      return matchesResourcePattern(value, r);
    } catch {
      return false;
    }
  });

  return (
    <div className="space-y-2" data-testid="resource-pattern-input">
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label="Resource pattern"
        placeholder="e.g. *@example.org"
      />
      <p className="text-xs text-muted-foreground" data-testid="pattern-coverage">
        Covers {covered.length} of {candidates.length} queued
        {covered.length > 0 ? `: ${covered.join(", ")}` : ""}
      </p>
    </div>
  );
}
