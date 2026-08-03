/**
 * App-shell session components shared by Aprovan web apps (registry,
 * patchwork): a workspace switcher and a user/profile menu for the top bar,
 * plus a `SessionArea` composition that renders the right thing for each auth
 * state.
 *
 * All components are props-driven (no hook or provider requirements) so each
 * app can wire them to its own auth/gateway plumbing — typically
 * `@aprovan/ui/auth` (`useAuth` or the registered client) and
 * `@aprovan/ui/gateway` (`useGatewaySession`).
 */

import { DropdownMenu } from "radix-ui";
import * as React from "react";
import { cn } from "../index";
import type { WorkspaceSummary } from "../gateway/client";

// ---------------------------------------------------------------------------
// Inline icons (avoid an icon-library dependency)
// ---------------------------------------------------------------------------

function ChevronsUpDownIcon({ className }: { className?: string }): React.ReactElement {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path d="m7 15 5 5 5-5M7 9l5-5 5 5" />
    </svg>
  );
}

function CheckIcon({ className }: { className?: string }): React.ReactElement {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

function LogInIcon({ className }: { className?: string }): React.ReactElement {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4M10 17l5-5-5-5M15 12H3" />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Shared dropdown styling
// ---------------------------------------------------------------------------

const dropdownContentClass =
  "z-50 min-w-[200px] overflow-hidden rounded-lg border bg-popover p-1 text-popover-foreground shadow-md";

const dropdownItemClass =
  "flex w-full cursor-pointer select-none items-center gap-2 rounded-md px-2.5 py-2 text-sm outline-none data-[highlighted]:bg-muted";

// ---------------------------------------------------------------------------
// AppHeader
// ---------------------------------------------------------------------------

export interface AppNavLink {
  label: string;
  href: string;
  /** Highlight as the app the user is currently in. */
  current?: boolean;
  /** Open in a new tab (external targets). */
  external?: boolean;
}

/**
 * The Aprovan app family — the canonical top-level destinations. Every
 * surface renders the same set so "where can I go from here" has one answer;
 * prefer {@link aprovanApps} over hand-rolling a links array, because a new
 * destination should appear everywhere the moment it is added here.
 */
export const APROVAN_APPS: AppNavLink[] = [
  { label: "Home", href: "https://aprovan.com/" },
  { label: "Workspace", href: "https://aprovan.com/chat/" },
  { label: "Registry", href: "https://aprovan.com/registry/" },
];

/** Label of an {@link APROVAN_APPS} entry, for marking the current surface. */
export type AprovanApp = "Home" | "Chat" | "Registry";

/**
 * The app-family nav with the surface the user is currently in marked, plus
 * any app-internal links spliced in after the brand's own entry. Keeps every
 * header's `links` prop a one-liner.
 */
export function aprovanApps(
  current?: AprovanApp,
  extra: AppNavLink[] = [],
): AppNavLink[] {
  return [
    ...APROVAN_APPS.map((link) =>
      link.label === current ? { ...link, current: true } : link,
    ),
    ...extra,
  ];
}

function MenuIcon({ className }: { className?: string }): React.ReactElement {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  );
}

export interface AppHeaderProps {
  /** Content before the brand (e.g. a sidebar toggle on small screens). */
  leading?: React.ReactNode;
  /** Brand mark (logo image / svg). */
  logo?: React.ReactNode;
  /** Wordmark next to the logo. Default "aprovan". */
  name?: string;
  /** Where the brand links to. Default "/". */
  homeHref?: string;
  /**
   * Primary navigation. On small screens the links collapse into a menu.
   * Use {@link APROVAN_APPS} (with `current` set) for the shared app family.
   */
  links?: AppNavLink[];
  /** Right-hand side content — typically a {@link SessionArea}. */
  children?: React.ReactNode;
  className?: string;
}

/**
 * Shared top bar for Aprovan web apps: brand on the left, app navigation in
 * the middle (collapsing to a menu on small screens), session controls on the
 * right. Sticky by default; style overrides via `className`.
 */
export function AppHeader({
  leading,
  logo,
  name,
  homeHref = "/",
  links = [],
  children,
  className,
}: AppHeaderProps): React.ReactElement {
  const navLinkClass = (link: AppNavLink) =>
    cn(
      "rounded-md px-2.5 py-1.5 text-sm transition-colors hover:bg-muted hover:text-foreground",
      link.current ? "font-medium text-foreground" : "text-muted-foreground",
    );

  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b bg-background/90 backdrop-blur",
        className,
      )}
      data-slot="app-header"
    >
      <div className="flex items-center max-w-6xl gap-2 px-3 mx-auto h-14 sm:px-4">
        {leading}
        <a className="flex items-center gap-2 shrink-0" href={homeHref}>
          {logo}
          {name && <span className="text-base font-semibold tracking-tight">{name}</span>}
        </a>

        {links.length > 0 && (
          <>
            <nav className="items-center hidden gap-1 ml-4 sm:flex">
              {links.map((link) => (
                <a
                  className={navLinkClass(link)}
                  href={link.href}
                  key={link.href}
                  {...(link.external
                    ? { target: "_blank", rel: "noreferrer" }
                    : {})}
                  {...(link.current ? { "aria-current": "page" } : {})}
                >
                  {link.label}
                </a>
              ))}
            </nav>
            <DropdownMenu.Root>
              <DropdownMenu.Trigger
                aria-label="Navigation menu"
                className="inline-flex items-center justify-center ml-1 transition-colors rounded-md outline-none size-8 text-muted-foreground hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring sm:hidden"
              >
                <MenuIcon className="size-4" />
              </DropdownMenu.Trigger>
              <DropdownMenu.Portal>
                <DropdownMenu.Content
                  align="start"
                  className={dropdownContentClass}
                  sideOffset={6}
                >
                  {links.map((link) => (
                    <DropdownMenu.Item asChild className={dropdownItemClass} key={link.href}>
                      <a
                        href={link.href}
                        {...(link.external
                          ? { target: "_blank", rel: "noreferrer" }
                          : {})}
                      >
                        {link.label}
                        {link.current && <CheckIcon className="ml-auto size-3.5" />}
                      </a>
                    </DropdownMenu.Item>
                  ))}
                </DropdownMenu.Content>
              </DropdownMenu.Portal>
            </DropdownMenu.Root>
          </>
        )}

        <div className="flex items-center gap-2 ml-auto">{children}</div>
      </div>
    </header>
  );
}

// ---------------------------------------------------------------------------
// WorkspaceSwitcher
// ---------------------------------------------------------------------------

export interface WorkspaceSwitcherProps {
  workspaces: WorkspaceSummary[];
  activeWorkspaceId: string | null;
  onSelect: (workspaceId: string) => void | Promise<void>;
  /** Disable interaction (e.g. while a switch is in flight). */
  disabled?: boolean;
  className?: string;
}

/**
 * Compact top-bar workspace dropdown. Shows the active workspace name; opening
 * it lists every membership with its role.
 */
export function WorkspaceSwitcher({
  workspaces,
  activeWorkspaceId,
  onSelect,
  disabled = false,
  className,
}: WorkspaceSwitcherProps): React.ReactElement | null {
  if (workspaces.length === 0) return null;

  const active =
    workspaces.find((workspace) => workspace.id === activeWorkspaceId) ??
    workspaces[0];

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger
        aria-label="Switch workspace"
        className={cn(
          "inline-flex h-8 max-w-[200px] items-center gap-1.5 rounded-lg border border-input bg-background px-2.5 text-sm transition-colors outline-none hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50",
          className,
        )}
        data-slot="workspace-switcher"
        disabled={disabled}
      >
        <span className="font-medium truncate">{active?.name ?? "Workspace"}</span>
        <ChevronsUpDownIcon className="size-3.5 shrink-0 text-muted-foreground" />
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content align="start" className={dropdownContentClass} sideOffset={6}>
          <DropdownMenu.Label className="px-2.5 py-1.5 text-xs font-medium text-muted-foreground">
            Workspaces
          </DropdownMenu.Label>
          {workspaces.map((workspace) => (
            <DropdownMenu.Item
              className={dropdownItemClass}
              key={workspace.id}
              onSelect={() => void onSelect(workspace.id)}
            >
              <span className="flex flex-col flex-1 min-w-0">
                <span className="truncate">{workspace.name}</span>
                <span className="text-[0.65rem] uppercase tracking-wide text-muted-foreground">
                  {workspace.role}
                </span>
              </span>
              {workspace.id === activeWorkspaceId && (
                <CheckIcon className="size-4 shrink-0" />
              )}
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}

// ---------------------------------------------------------------------------
// UserMenu
// ---------------------------------------------------------------------------

export interface SessionUser {
  email?: string;
  name?: string;
}

export interface SessionLink {
  label: string;
  href: string;
  onClick?: () => void;
}

export interface UserMenuProps {
  user: SessionUser;
  /** App navigation entries (e.g. Credentials, Admin) shown above sign out. */
  links?: SessionLink[];
  onSignOut?: () => void | Promise<void>;
  className?: string;
}

function initialsOf(user: SessionUser): string {
  const source = user.name?.trim() || user.email?.trim() || "";
  if (!source) return "?";
  const words = source.split(/[\s._@-]+/).filter(Boolean);
  const first = words[0]?.[0] ?? "";
  const second = words.length > 1 ? (words[1]?.[0] ?? "") : "";
  return (first + second).toUpperCase() || "?";
}

/**
 * Profile avatar button with a dropdown: signed-in identity, app links, and
 * sign out. The standard right-most element of a dashboard top bar.
 */
export function UserMenu({
  user,
  links = [],
  onSignOut,
  className,
}: UserMenuProps): React.ReactElement {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger
        aria-label="Account menu"
        className={cn(
          "inline-flex size-8 items-center justify-center rounded-full border bg-muted text-xs font-semibold text-muted-foreground transition-colors outline-none hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring",
          className,
        )}
        data-slot="user-menu"
      >
        {initialsOf(user)}
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content align="end" className={dropdownContentClass} sideOffset={6}>
          <div className="px-2.5 py-2">
            {user.name && (
              <p className="text-sm font-medium truncate">{user.name}</p>
            )}
            <p className="text-xs truncate text-muted-foreground">
              {user.email ?? "Signed in"}
            </p>
          </div>
          {links.length > 0 && (
            <>
              <DropdownMenu.Separator className="h-px my-1 bg-border" />
              {links.map((link) =>
                link.onClick ? (
                  <DropdownMenu.Item
                    className={dropdownItemClass}
                    key={link.label}
                    onSelect={(event) => {
                      event.preventDefault();
                      link.onClick?.();
                    }}
                  >
                    {link.label}
                  </DropdownMenu.Item>
                ) : (
                  <DropdownMenu.Item asChild className={dropdownItemClass} key={link.href}>
                    <a href={link.href}>{link.label}</a>
                  </DropdownMenu.Item>
                ),
              )}
            </>
          )}
          {onSignOut && (
            <>
              <DropdownMenu.Separator className="h-px my-1 bg-border" />
              <DropdownMenu.Item
                className={cn(dropdownItemClass, "text-destructive data-[highlighted]:text-destructive")}
                onSelect={() => void onSignOut()}
              >
                Sign out
              </DropdownMenu.Item>
            </>
          )}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}

// ---------------------------------------------------------------------------
// SessionArea
// ---------------------------------------------------------------------------

export type SessionAreaStatus =
  | "loading"
  | "unconfigured"
  | "signed-out"
  | "ready";

export interface SessionAreaProps {
  status: SessionAreaStatus;
  user?: SessionUser | null;
  workspaces?: WorkspaceSummary[];
  activeWorkspaceId?: string | null;
  onSelectWorkspace?: (workspaceId: string) => void | Promise<void>;
  /** Disable the workspace switcher while a selection is in flight. */
  switching?: boolean;
  onSignIn?: () => void | Promise<void>;
  onSignOut?: () => void | Promise<void>;
  /** App navigation entries for the profile menu. */
  links?: SessionLink[];
  signInLabel?: string;
  className?: string;
}

/**
 * The complete top-bar session area: workspace switcher + profile menu when
 * signed in, a sign-in button when signed out, a skeleton while loading, and
 * nothing when auth is unconfigured.
 */
export function SessionArea({
  status,
  user,
  workspaces = [],
  activeWorkspaceId = null,
  onSelectWorkspace,
  switching = false,
  onSignIn,
  onSignOut,
  links,
  signInLabel = "Sign in",
  className,
}: SessionAreaProps): React.ReactElement | null {
  if (status === "unconfigured") return null;

  if (status === "loading") {
    return (
      <div
        className={cn("flex items-center gap-2", className)}
        data-slot="session-area"
      >
        <div className="h-8 rounded-lg w-28 animate-pulse bg-muted" />
        <div className="rounded-full size-8 animate-pulse bg-muted" />
      </div>
    );
  }

  if (status === "signed-out") {
    return (
      <div className={cn("flex items-center", className)} data-slot="session-area">
        <button
          className="inline-flex h-8 items-center gap-1.5 rounded-lg bg-primary px-3 text-sm font-medium text-primary-foreground transition-colors outline-none hover:bg-primary/90 focus-visible:ring-2 focus-visible:ring-ring"
          onClick={() => void onSignIn?.()}
          type="button"
        >
          <LogInIcon className="size-3.5" />
          {signInLabel}
        </button>
      </div>
    );
  }

  return (
    <div className={cn("flex items-center gap-2", className)} data-slot="session-area">
      {onSelectWorkspace && (
        <WorkspaceSwitcher
          activeWorkspaceId={activeWorkspaceId}
          disabled={switching}
          onSelect={onSelectWorkspace}
          workspaces={workspaces}
        />
      )}
      <UserMenu links={links} onSignOut={onSignOut} user={user ?? {}} />
    </div>
  );
}
