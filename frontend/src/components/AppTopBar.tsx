interface AppTopBarProps {
  onMenuClick: () => void;
  siteName?: string;
}

export default function AppTopBar({
  onMenuClick,
  siteName = 'Sunshine Daycare · Sample Center #1',
}: AppTopBarProps) {
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <header className="app-topbar2 no-print">
      <div className="app-topbar2-left">
        <button
          className="app-topbar2-burger"
          onClick={onMenuClick}
          aria-label="Open menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
        <div className="app-topbar2-site">
          <span className="app-topbar2-site-name">{siteName}</span>
          <span className="app-topbar2-pill">● Compliant</span>
        </div>
      </div>
      <div className="app-topbar2-right">
        <span className="app-topbar2-date">{today}</span>
      </div>
    </header>
  );
}
