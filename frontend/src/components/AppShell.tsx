import Logo from './Logo';
import MealProductionGrid from './MealProductionGrid';
import type { Session } from '../auth';

interface AppShellProps {
  session: Session;
  onSignOut: () => void;
}

export default function AppShell({ session, onSignOut }: AppShellProps) {
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="app-shell">
      <header className="app-topbar no-print">
        <div className="app-topbar-left">
          <Logo />
          <span className="app-topbar-sep">/</span>
          <span className="app-topbar-section">H1530 Meal Production</span>
        </div>
        <div className="app-topbar-right">
          <span className="app-topbar-date">{today}</span>
          <span className="app-topbar-user">
            Signed in as <strong>{session.username}</strong>
          </span>
          <button className="btn btn-ghost btn-compact" onClick={onSignOut}>
            Sign out
          </button>
        </div>
      </header>

      <main className="app-main">
        <MealProductionGrid />
      </main>
    </div>
  );
}
