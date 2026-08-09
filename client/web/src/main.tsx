import { AuthProvider, AuthCallback } from '@aprovan/ui/auth';
import { Loader2 } from 'lucide-react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import AuthGate from './components/AuthGate';
import { isDesktopBridgeAvailable } from './features/workspaces/desktop';
import { authClient } from './lib/auth';
import { bindDesktopGateway } from './lib/desktop-gateway';
import './index.css';

const isCallback = window.location.pathname.endsWith('/auth/callback');

function Root() {
  if (isCallback) {
    return (
      <AuthCallback
        fallbackPath="/chat/"
        loading={
          <div className="flex min-h-screen items-center justify-center">
            <Loader2 className="size-6 animate-spin text-muted-foreground" />
          </div>
        }
        renderError={(message) => (
          <div className="flex min-h-screen items-center justify-center p-4 text-sm text-destructive">
            Sign-in failed: {message}
          </div>
        )}
      />
    );
  }
  return (
    <AuthGate>
      <App />
    </AuthGate>
  );
}

function BootSplash({ message }: { message: string }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-3 p-4 text-sm text-muted-foreground">
      <Loader2 className="size-6 animate-spin" />
      <p>{message}</p>
    </div>
  );
}

function BootError({ message }: { message: string }) {
  return (
    <div className="flex min-h-screen items-center justify-center p-4 text-sm text-destructive">
      {message}
    </div>
  );
}

async function boot(): Promise<void> {
  const root = ReactDOM.createRoot(document.getElementById('root')!);

  if (isDesktopBridgeAvailable()) {
    root.render(<BootSplash message="Starting local gateway…" />);
    try {
      await bindDesktopGateway((progress) => {
        root.render(<BootSplash message={progress.message} />);
      });
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Desktop gateway failed to start";
      root.render(<BootError message={message} />);
      return;
    }
  }

  root.render(
    <React.StrictMode>
      <AuthProvider client={authClient}>
        <Root />
      </AuthProvider>
    </React.StrictMode>,
  );
}

void boot();
