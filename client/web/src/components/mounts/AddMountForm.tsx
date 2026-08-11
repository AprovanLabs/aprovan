import { useMemo, useState } from "react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { classifyMountError } from "./api";
import { MountErrorAlert } from "./MountErrorAlert";
import { validateGitDraft, validateS3Draft } from "./prefix";
import { mountsStore } from "./store";
import type { MountBackendType, MountFormError } from "./types";

const emptyGit = { prefix: "", repo: "", ref: "main", subpath: "" };
const emptyS3 = { prefix: "", bucket: "", keyPrefix: "", region: "" };

export function AddMountForm({
  onAdded,
  disabled,
}: {
  onAdded?: () => void;
  /** Host can disable while a list refresh is in flight. */
  disabled?: boolean;
}) {
  const [backend, setBackend] = useState<MountBackendType>("git");
  const [git, setGit] = useState(emptyGit);
  const [s3, setS3] = useState(emptyS3);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<MountFormError | null>(null);

  const clientError = useMemo(() => {
    if (backend === "git") {
      return validateGitDraft({ prefix: git.prefix, repo: git.repo, ref: git.ref });
    }
    return validateS3Draft({ prefix: s3.prefix, bucket: s3.bucket });
  }, [backend, git, s3]);

  const canSubmit = !disabled && !submitting && !clientError;

  const submit = async () => {
    if (clientError) {
      setError({ kind: "validation", message: clientError });
      return;
    }
    setSubmitting(true);
    setError(null);
    try {
      if (backend === "git") {
        await mountsStore.add({
          type: "git",
          prefix: git.prefix,
          repo: git.repo,
          ref: git.ref,
          subpath: git.subpath,
        });
        setGit(emptyGit);
      } else {
        await mountsStore.add({
          type: "s3",
          prefix: s3.prefix,
          bucket: s3.bucket,
          keyPrefix: s3.keyPrefix,
          region: s3.region,
        });
        setS3(emptyS3);
      }
      onAdded?.();
    } catch (err) {
      setError(classifyMountError(err));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form
      className="space-y-3 rounded-md border p-3"
      onSubmit={(e) => {
        e.preventDefault();
        void submit();
      }}
    >
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h3 className="text-sm font-medium">Add mount</h3>
        <div className="flex gap-1 rounded-md border p-0.5 text-xs">
          {(["git", "s3"] as const).map((type) => (
            <button
              key={type}
              type="button"
              disabled={submitting}
              onClick={() => {
                setBackend(type);
                setError(null);
              }}
              className={`rounded px-2 py-1 ${
                backend === type ? "bg-muted font-medium" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {backend === "git" ? (
        <div className="grid gap-2 sm:grid-cols-2">
          <Field
            label="Prefix"
            value={git.prefix}
            onChange={(prefix) => setGit((s) => ({ ...s, prefix }))}
            placeholder="vendor/charts"
            mono
          />
          <Field
            label="Repository"
            value={git.repo}
            onChange={(repo) => setGit((s) => ({ ...s, repo }))}
            placeholder="owner/name"
            mono
          />
          <Field
            label="Ref"
            value={git.ref}
            onChange={(ref) => setGit((s) => ({ ...s, ref }))}
            placeholder="main"
            mono
          />
          <Field
            label="Subpath (optional)"
            value={git.subpath}
            onChange={(subpath) => setGit((s) => ({ ...s, subpath }))}
            placeholder="packages/charts"
            mono
          />
        </div>
      ) : (
        <div className="grid gap-2 sm:grid-cols-2">
          <Field
            label="Prefix"
            value={s3.prefix}
            onChange={(prefix) => setS3((s) => ({ ...s, prefix }))}
            placeholder="vendor/data"
            mono
          />
          <Field
            label="Bucket"
            value={s3.bucket}
            onChange={(bucket) => setS3((s) => ({ ...s, bucket }))}
            placeholder="my-bucket"
            mono
          />
          <Field
            label="Key prefix (optional)"
            value={s3.keyPrefix}
            onChange={(keyPrefix) => setS3((s) => ({ ...s, keyPrefix }))}
            placeholder="shared/lib"
            mono
          />
          <Field
            label="Region (optional)"
            value={s3.region}
            onChange={(region) => setS3((s) => ({ ...s, region }))}
            placeholder="us-east-1"
            mono
          />
        </div>
      )}

      {error ? <MountErrorAlert error={error} /> : null}
      {clientError && !error ? (
        <p className="text-xs text-muted-foreground">{clientError}</p>
      ) : null}

      <div className="flex justify-end">
        <Button type="submit" size="sm" disabled={!canSubmit}>
          {submitting ? <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" /> : null}
          Add mount
        </Button>
      </div>
    </form>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  mono,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  mono?: boolean;
}) {
  return (
    <label className="block space-y-1 text-xs">
      <span className="text-muted-foreground">{label}</span>
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={mono ? "h-8 font-mono text-xs" : "h-8 text-xs"}
        spellCheck={false}
      />
    </label>
  );
}
