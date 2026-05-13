import Logo from './Logo';

export type AppPage =
  | 'menus'
  | 'planned'
  | 'milk'
  | 'attendance'
  | 'submit'
  | 'forms';

interface NavItem {
  id: AppPage;
  label: string;
  icon: string;       // emoji glyph
  iconClass: string;  // background color class
  comingSoon?: boolean;
}

// Order requested: Menus on top, no Financials.
const NAV: NavItem[] = [
  { id: 'menus',      label: 'Menus',              icon: '🍎', iconClass: 'sb-icon-menus' },
  { id: 'planned',    label: 'Planned Totals',     icon: '📊', iconClass: 'sb-icon-planned',    comingSoon: true },
  { id: 'milk',       label: 'Milk Purchases',     icon: '🥛', iconClass: 'sb-icon-milk',       comingSoon: true },
  { id: 'attendance', label: 'Attend Input by Wk', icon: '✏️', iconClass: 'sb-icon-attendance', comingSoon: true },
  { id: 'submit',     label: 'Submit Claim',       icon: '📤', iconClass: 'sb-icon-submit',     comingSoon: true },
  { id: 'forms',      label: 'Forms',              icon: '📄', iconClass: 'sb-icon-forms' },
];

interface SidebarProps {
  currentPage: AppPage;
  onChangePage: (page: AppPage) => void;
  username: string;
  onSignOut: () => void;
  mobileOpen: boolean;
  onCloseMobile: () => void;
}

export default function Sidebar({
  currentPage,
  onChangePage,
  username,
  onSignOut,
  mobileOpen,
  onCloseMobile,
}: SidebarProps) {
  function handleClick(page: AppPage) {
    onChangePage(page);
    onCloseMobile();
  }

  return (
    <>
      {/* Mobile-only backdrop */}
      <div
        className={`sb-backdrop ${mobileOpen ? 'open' : ''}`}
        onClick={onCloseMobile}
        aria-hidden="true"
      />

      <aside className={`sb ${mobileOpen ? 'mobile-open' : ''}`} aria-label="App navigation">
        <div className="sb-brand">
          <Logo />
        </div>

        <div className="sb-user">
          <div className="sb-user-avatar" aria-hidden="true">
            {username.slice(0, 1).toUpperCase()}
          </div>
          <div className="sb-user-meta">
            <div className="sb-user-name">{username}</div>
            <div className="sb-user-role">Provider</div>
          </div>
        </div>

        <div className="sb-section-label">
          <span className="sb-section-icon" aria-hidden="true">🗄️</span>
          <span>CACFP</span>
        </div>

        <nav className="sb-nav" aria-label="CACFP">
          {NAV.map((item) => (
            <button
              key={item.id}
              className={`sb-item ${currentPage === item.id ? 'active' : ''}`}
              onClick={() => handleClick(item.id)}
              title={item.label}
            >
              <span className={`sb-item-icon ${item.iconClass}`} aria-hidden="true">
                {item.icon}
              </span>
              <span className="sb-item-label">
                {item.label}
                {item.comingSoon && <span className="sb-item-soon">Soon</span>}
              </span>
            </button>
          ))}
        </nav>

        <div className="sb-spacer" />

        <button className="sb-signout" onClick={onSignOut} title="Sign out">
          <span className="sb-item-icon sb-icon-signout" aria-hidden="true">⏻</span>
          <span className="sb-item-label">Sign out</span>
        </button>
      </aside>
    </>
  );
}
