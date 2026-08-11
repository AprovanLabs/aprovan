import { Check, ChevronsUpDown, Loader2 } from "lucide-react";
import { useEffect, useId, useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import type { WorkspaceMember } from "./types";

function memberLabel(m: WorkspaceMember): string {
  if (m.name?.trim()) return m.name.trim();
  if (m.email?.trim()) return m.email.trim();
  return m.userId;
}

interface MemberComboboxProps {
  members: WorkspaceMember[];
  loading?: boolean;
  value: string;
  onChange: (userId: string) => void;
  disabled?: boolean;
  placeholder?: string;
}

/**
 * Workspace-member combobox (Command-in-Popover shape without extra radix deps).
 * Free-text falls through so a known sub can still be entered when /members is
 * unavailable (admin-only endpoint).
 */
export function MemberCombobox({
  members,
  loading = false,
  value,
  onChange,
  disabled,
  placeholder = "Select a workspace member…",
}: MemberComboboxProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const rootRef = useRef<HTMLDivElement>(null);
  const listId = useId();

  const selected = members.find((m) => m.userId === value);
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return members;
    return members.filter((m) => {
      const hay = `${memberLabel(m)} ${m.userId} ${m.email ?? ""}`.toLowerCase();
      return hay.includes(q);
    });
  }, [members, query]);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [open]);

  return (
    <div ref={rootRef} className="relative">
      <Button
        type="button"
        variant="outline"
        role="combobox"
        aria-expanded={open}
        aria-controls={listId}
        disabled={disabled}
        className="w-full justify-between font-normal"
        onClick={() => setOpen((o) => !o)}
      >
        <span className={cn("truncate", !value && "text-muted-foreground")}>
          {selected ? memberLabel(selected) : value || placeholder}
        </span>
        {loading ? (
          <Loader2 className="size-4 shrink-0 animate-spin opacity-60" />
        ) : (
          <ChevronsUpDown className="size-4 shrink-0 opacity-50" />
        )}
      </Button>
      {open ? (
        <div
          id={listId}
          className="absolute z-50 mt-1 w-full rounded-md border bg-background p-1 shadow-md"
          role="listbox"
        >
          <Input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search members…"
            className="mb-1 h-8"
            aria-label="Search workspace members"
          />
          <div className="max-h-48 overflow-y-auto">
            {loading ? (
              <div className="flex items-center gap-2 px-2 py-3 text-sm text-muted-foreground">
                <Loader2 className="size-3.5 animate-spin" />
                Loading members…
              </div>
            ) : filtered.length === 0 ? (
              <div className="px-2 py-3 text-sm text-muted-foreground">
                {query.trim() ? (
                  <button
                    type="button"
                    className="w-full text-left hover:text-foreground"
                    onClick={() => {
                      onChange(query.trim());
                      setOpen(false);
                      setQuery("");
                    }}
                  >
                    Use “{query.trim()}”
                  </button>
                ) : (
                  "No members found"
                )}
              </div>
            ) : (
              filtered.map((m) => (
                <button
                  key={m.userId}
                  type="button"
                  role="option"
                  aria-selected={m.userId === value}
                  className={cn(
                    "flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-left text-sm hover:bg-accent",
                    m.userId === value && "bg-accent",
                  )}
                  onClick={() => {
                    onChange(m.userId);
                    setOpen(false);
                    setQuery("");
                  }}
                >
                  <Check
                    className={cn(
                      "size-3.5 shrink-0",
                      m.userId === value ? "opacity-100" : "opacity-0",
                    )}
                  />
                  <span className="min-w-0 flex-1 truncate">{memberLabel(m)}</span>
                  {m.email && m.name ? (
                    <span className="truncate text-xs text-muted-foreground">{m.email}</span>
                  ) : null}
                </button>
              ))
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
}
