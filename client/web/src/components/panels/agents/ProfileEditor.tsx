import { Plus, X } from "lucide-react";
import { useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { Draft } from "./types";
import { EFFORTS } from "./types";
import { fieldLabel, textareaClass } from "./utils";

type SectionId = "basics" | "model" | "instructions" | "access" | "files";

function sectionDefaultOpen(draft: Draft, id: SectionId): boolean {
  switch (id) {
    case "basics":
    case "instructions":
      return true;
    case "model":
      return Boolean(
        draft.llm ||
          draft.llmCandidates ||
          draft.effort ||
          draft.maxCostUsd ||
          draft.deadlineMs ||
          draft.model,
      );
    case "access":
      return draft.tools.length > 0 || draft.paths.length > 0;
    case "files":
      return draft.mounts.length > 0;
  }
}

function Section({
  id,
  title,
  hint,
  error,
  defaultOpen,
  children,
}: {
  id: SectionId;
  title: string;
  hint?: string;
  error?: string;
  defaultOpen: boolean;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <section className="rounded-md border bg-card">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center gap-2 px-3 py-2 text-left"
        aria-expanded={open}
        aria-controls={`section-${id}`}
      >
        <span className="text-sm font-medium">{title}</span>
        {error && (
          <span className="rounded bg-destructive/10 px-1.5 py-0.5 text-[10px] text-destructive">
            Needs attention
          </span>
        )}
        <span className="ml-auto text-[10px] text-muted-foreground">{open ? "Hide" : "Show"}</span>
      </button>
      {open && (
        <div id={`section-${id}`} className="space-y-3 border-t px-3 py-3">
          {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
          {children}
          {error && <div className="text-xs text-destructive">{error}</div>}
        </div>
      )}
    </section>
  );
}

function validateSections(draft: Draft): Partial<Record<SectionId, string>> {
  const errors: Partial<Record<SectionId, string>> = {};
  if (!draft.name.trim()) {
    errors.basics = "Name is required.";
  }
  if (!draft.prompt.trim()) {
    errors.instructions = "Instructions are required.";
  }
  return errors;
}

export function ProfileEditor({
  initial,
  editing,
  saving,
  error,
  llmBindings,
  onSave,
  onCancel,
}: {
  initial: Draft;
  editing: boolean;
  saving: boolean;
  error: string | null;
  /** Namespace ids from `interfaces.list` for LLM instances; empty → free-text. */
  llmBindings: string[];
  onSave: (draft: Draft) => void;
  onCancel: () => void;
}) {
  const [draft, setDraft] = useState(initial);
  const [sectionErrors, setSectionErrors] = useState<Partial<Record<SectionId, string>>>({});
  const set = (patch: Partial<Draft>) => setDraft((d) => ({ ...d, ...patch }));

  const pickerAvailable = llmBindings.length > 0;
  const llmInList = pickerAvailable && llmBindings.includes(draft.llm);
  const [useFreeText, setUseFreeText] = useState(!pickerAvailable || !llmInList);

  const submit = () => {
    const next = validateSections(draft);
    setSectionErrors(next);
    if (Object.keys(next).length) return;
    onSave(draft);
  };

  return (
    <div className="space-y-3">
      <div className="text-sm font-semibold">{editing ? `Edit ${draft.name}` : "New agent"}</div>

      <Section
        id="basics"
        title="Basics"
        defaultOpen={sectionDefaultOpen(draft, "basics")}
        error={sectionErrors.basics}
      >
        <div className="grid gap-3 sm:grid-cols-2">
          <label className="space-y-1">
            <div className={fieldLabel}>Name</div>
            <Input
              value={draft.name}
              onChange={(e) => set({ name: e.target.value })}
              placeholder="reviewer"
              disabled={editing}
              className="h-8 font-mono text-xs"
            />
          </label>
          <label className="space-y-1">
            <div className={fieldLabel}>Display name</div>
            <Input
              value={draft.title}
              onChange={(e) => set({ title: e.target.value })}
              placeholder="Code reviewer"
              className="h-8 text-xs"
            />
          </label>
        </div>
      </Section>

      <Section
        id="model"
        title="Model"
        hint="Pick a configured LLM binding, or type a namespace when the list isn't available."
        defaultOpen={sectionDefaultOpen(draft, "model")}
        error={sectionErrors.model}
      >
        <div className="grid gap-3 sm:grid-cols-2">
          <label className="space-y-1 sm:col-span-2">
            <div className={fieldLabel}>LLM binding</div>
            {pickerAvailable && !useFreeText ? (
              <div className="flex gap-1.5">
                <select
                  value={draft.llm}
                  onChange={(e) => set({ llm: e.target.value })}
                  className="h-8 w-full rounded-md border bg-background px-2 font-mono text-xs"
                >
                  {llmBindings.map((binding) => (
                    <option key={binding} value={binding}>
                      {binding}
                    </option>
                  ))}
                </select>
                <Button
                  type="button"
                  size="sm"
                  variant="ghost"
                  className="h-8 shrink-0 text-xs"
                  onClick={() => setUseFreeText(true)}
                >
                  Custom
                </Button>
              </div>
            ) : (
              <div className="flex gap-1.5">
                <Input
                  value={draft.llm}
                  onChange={(e) => set({ llm: e.target.value })}
                  placeholder="llm or llm:fast"
                  className="h-8 font-mono text-xs"
                />
                {pickerAvailable && (
                  <Button
                    type="button"
                    size="sm"
                    variant="ghost"
                    className="h-8 shrink-0 text-xs"
                    onClick={() => {
                      setUseFreeText(false);
                      if (!llmBindings.includes(draft.llm)) {
                        set({ llm: llmBindings[0] ?? "llm" });
                      }
                    }}
                  >
                    Pick
                  </Button>
                )}
              </div>
            )}
          </label>
          <label className="space-y-1">
            <div className={fieldLabel}>Candidates</div>
            <Input
              value={draft.llmCandidates}
              onChange={(e) => set({ llmCandidates: e.target.value })}
              placeholder="llm:fast, llm:deep"
              className="h-8 font-mono text-xs"
            />
          </label>
          <label className="space-y-1">
            <div className={fieldLabel}>Effort</div>
            <select
              value={draft.effort}
              onChange={(e) => set({ effort: e.target.value })}
              className="h-8 w-full rounded-md border bg-background px-2 font-mono text-xs"
            >
              {EFFORTS.map((effort) => (
                <option key={effort || "none"} value={effort}>
                  {effort || "—"}
                </option>
              ))}
            </select>
          </label>
          <label className="space-y-1">
            <div className={fieldLabel}>Max $/MTok</div>
            <Input
              value={draft.maxCostUsd}
              onChange={(e) => set({ maxCostUsd: e.target.value })}
              placeholder="5"
              className="h-8 font-mono text-xs"
            />
          </label>
          <label className="space-y-1">
            <div className={fieldLabel}>Deadline (ms)</div>
            <Input
              value={draft.deadlineMs}
              onChange={(e) => set({ deadlineMs: e.target.value })}
              placeholder="30000"
              className="h-8 font-mono text-xs"
            />
          </label>
          <label className="space-y-1 sm:col-span-2">
            <div className={fieldLabel}>Model pin (optional)</div>
            <Input
              value={draft.model}
              onChange={(e) => set({ model: e.target.value })}
              placeholder="overrides binding default"
              className="h-8 font-mono text-xs"
            />
          </label>
        </div>
      </Section>

      <Section
        id="instructions"
        title="Instructions"
        defaultOpen={sectionDefaultOpen(draft, "instructions")}
        error={sectionErrors.instructions}
      >
        <label className="block space-y-1">
          <div className={fieldLabel}>System prompt</div>
          <textarea
            value={draft.prompt}
            onChange={(e) => set({ prompt: e.target.value })}
            placeholder="What this agent should do and how it should behave…"
            className={textareaClass}
          />
        </label>
      </Section>

      <Section
        id="access"
        title="Access"
        hint="Leave empty for full access; adding entries narrows what this agent may touch."
        defaultOpen={sectionDefaultOpen(draft, "access")}
        error={sectionErrors.access}
      >
        <div className="space-y-1">
          <div className={fieldLabel}>Tool patterns</div>
          {draft.tools.map((tool, index) => (
            <div key={index} className="flex items-center gap-1.5">
              <Input
                value={tool}
                onChange={(e) =>
                  set({ tools: draft.tools.map((t, i) => (i === index ? e.target.value : t)) })
                }
                placeholder="keyvalue.* / github.repos.* / *"
                className="h-8 font-mono text-xs"
              />
              <Button
                size="icon"
                variant="ghost"
                className="h-8 w-8 shrink-0"
                onClick={() => set({ tools: draft.tools.filter((_, i) => i !== index) })}
              >
                <X className="h-3.5 w-3.5" />
              </Button>
            </div>
          ))}
          <Button
            size="sm"
            variant="ghost"
            className="h-7 text-xs"
            onClick={() => set({ tools: [...draft.tools, ""] })}
          >
            <Plus className="mr-1 h-3 w-3" />
            Add tool pattern
          </Button>
        </div>
        <div className="space-y-1">
          <div className={fieldLabel}>Path grants</div>
          {draft.paths.map((path, index) => (
            <div key={index} className="flex items-center gap-1.5">
              <Input
                value={path.prefix}
                onChange={(e) =>
                  set({
                    paths: draft.paths.map((p, i) =>
                      i === index ? { ...p, prefix: e.target.value } : p,
                    ),
                  })
                }
                placeholder="notes/"
                className="h-8 font-mono text-xs"
              />
              <Button
                size="sm"
                variant="outline"
                className="h-8 w-12 shrink-0 font-mono text-xs"
                onClick={() =>
                  set({
                    paths: draft.paths.map((p, i) =>
                      i === index ? { ...p, access: p.access === "rw" ? "ro" : "rw" } : p,
                    ),
                  })
                }
              >
                {path.access}
              </Button>
              <Button
                size="icon"
                variant="ghost"
                className="h-8 w-8 shrink-0"
                onClick={() => set({ paths: draft.paths.filter((_, i) => i !== index) })}
              >
                <X className="h-3.5 w-3.5" />
              </Button>
            </div>
          ))}
          <Button
            size="sm"
            variant="ghost"
            className="h-7 text-xs"
            onClick={() => set({ paths: [...draft.paths, { prefix: "", access: "ro" }] })}
          >
            <Plus className="mr-1 h-3 w-3" />
            Add path grant
          </Button>
        </div>
      </Section>

      <Section
        id="files"
        title="Files"
        hint="Mount workspace paths into the agent run."
        defaultOpen={sectionDefaultOpen(draft, "files")}
        error={sectionErrors.files}
      >
        <div className="space-y-1">
          {draft.mounts.map((mount, index) => (
            <div key={index} className="flex items-center gap-1.5">
              <Input
                value={mount.path}
                onChange={(e) =>
                  set({
                    mounts: draft.mounts.map((m, i) =>
                      i === index ? { ...m, path: e.target.value } : m,
                    ),
                  })
                }
                placeholder="skills"
                className="h-8 w-24 font-mono text-xs"
              />
              <Input
                value={mount.source}
                onChange={(e) =>
                  set({
                    mounts: draft.mounts.map((m, i) =>
                      i === index ? { ...m, source: e.target.value } : m,
                    ),
                  })
                }
                placeholder="skills/"
                className="h-8 flex-1 font-mono text-xs"
              />
              <Button
                size="sm"
                variant="outline"
                className="h-8 w-12 shrink-0 font-mono text-xs"
                onClick={() =>
                  set({
                    mounts: draft.mounts.map((m, i) =>
                      i === index ? { ...m, mode: m.mode === "rw" ? "ro" : "rw" } : m,
                    ),
                  })
                }
              >
                {mount.mode}
              </Button>
              <Button
                size="icon"
                variant="ghost"
                className="h-8 w-8 shrink-0"
                onClick={() => set({ mounts: draft.mounts.filter((_, i) => i !== index) })}
              >
                <X className="h-3.5 w-3.5" />
              </Button>
            </div>
          ))}
          <Button
            size="sm"
            variant="ghost"
            className="h-7 text-xs"
            onClick={() =>
              set({ mounts: [...draft.mounts, { path: "", source: "", mode: "ro" }] })
            }
          >
            <Plus className="mr-1 h-3 w-3" />
            Add mount
          </Button>
        </div>
      </Section>

      {error && <div className="text-xs text-destructive">{error}</div>}
      <div className="flex gap-2">
        <Button size="sm" className="h-8" onClick={submit} disabled={saving}>
          {saving ? "Saving…" : "Save"}
        </Button>
        <Button size="sm" variant="ghost" className="h-8" onClick={onCancel} disabled={saving}>
          Cancel
        </Button>
      </div>
    </div>
  );
}
