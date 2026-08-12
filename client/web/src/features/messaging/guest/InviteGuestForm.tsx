/**
 * Creator-side guest invite issuance (ux.md Friends install step 3).
 * Email + optional channel subset → link; pending list lives in Manage panel.
 */

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { INVITE_TTL_NOTE } from "./copy";
import {
  createGuestInvitesClient,
  type GuestInviteRecord,
  type GuestInvitesClient,
} from "./invites";
import { guestInviteUrl } from "./inviteFormat";

export type ChannelOption = { id: string; name: string };

export type InviteGuestFormProps = {
  instanceId: string;
  channels?: ChannelOption[];
  client?: GuestInvitesClient;
  onCreated?: (invite: GuestInviteRecord) => void;
  className?: string;
};

export function InviteGuestForm({
  instanceId,
  channels = [],
  client: clientProp,
  onCreated,
  className,
}: InviteGuestFormProps) {
  const client = clientProp ?? createGuestInvitesClient();
  const [email, setEmail] = useState("");
  const [selected, setSelected] = useState<string[]>([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastLink, setLastLink] = useState<string | null>(null);

  const toggleChannel = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id],
    );
  };

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed || busy) return;
    setBusy(true);
    setError(null);
    try {
      const invite = await client.create({
        email: trimmed,
        instanceId,
        ...(selected.length > 0 ? { channelIds: selected } : {}),
      });
      const link = guestInviteUrl(invite.inviteToken);
      setLastLink(link);
      setEmail("");
      setSelected([]);
      onCreated?.(invite);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create invite");
    } finally {
      setBusy(false);
    }
  };

  return (
    <form
      onSubmit={submit}
      className={cn("flex flex-col gap-3", className)}
      data-testid="invite-guest-form"
    >
      <div>
        <label className="text-sm font-medium" htmlFor="guest-invite-email">
          Invite a guest
        </label>
        <p className="mt-0.5 text-xs text-muted-foreground">{INVITE_TTL_NOTE}</p>
      </div>
      <Input
        id="guest-invite-email"
        type="email"
        required
        autoComplete="email"
        placeholder="guest@example.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={busy}
      />
      {channels.length > 0 ? (
        <fieldset className="space-y-1.5">
          <legend className="text-xs font-medium text-muted-foreground">
            Channels (optional)
          </legend>
          <div className="flex flex-wrap gap-2">
            {channels.map((ch) => {
              const on = selected.includes(ch.id);
              return (
                <button
                  key={ch.id}
                  type="button"
                  aria-pressed={on}
                  disabled={busy}
                  onClick={() => toggleChannel(ch.id)}
                  className={cn(
                    "rounded-md border px-2 py-1 text-xs",
                    on
                      ? "border-primary bg-primary/10 text-foreground"
                      : "border-input text-muted-foreground hover:bg-accent/40",
                  )}
                >
                  {ch.name}
                </button>
              );
            })}
          </div>
        </fieldset>
      ) : null}
      {error ? (
        <p className="text-xs text-destructive" role="alert">
          {error}
        </p>
      ) : null}
      {lastLink ? (
        <div
          className="rounded-md border bg-muted/40 p-2 text-xs"
          data-testid="invite-link"
        >
          <p className="mb-1 font-medium">Invite link</p>
          <code className="break-all">{lastLink}</code>
        </div>
      ) : null}
      <Button type="submit" size="sm" disabled={busy || !email.trim()}>
        {busy ? "Creating…" : "Create invite link"}
      </Button>
    </form>
  );
}
