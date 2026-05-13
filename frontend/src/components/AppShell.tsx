import { useState } from 'react';
import Sidebar, { type AppPage } from './Sidebar';
import AppTopBar from './AppTopBar';
import PageMenus from './PageMenus';
import PageStub from './PageStub';
import MealProductionGrid from './MealProductionGrid';
import type { Session } from '../auth';

interface AppShellProps {
  session: Session;
  onSignOut: () => void;
}

export default function AppShell({ session, onSignOut }: AppShellProps) {
  const [page, setPage] = useState<AppPage>('menus');
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="app-shell2">
      <Sidebar
        currentPage={page}
        onChangePage={setPage}
        username={session.username}
        onSignOut={onSignOut}
        mobileOpen={mobileOpen}
        onCloseMobile={() => setMobileOpen(false)}
      />

      <div className="app-main2">
        <AppTopBar onMenuClick={() => setMobileOpen((v) => !v)} />
        <main className="app-content">
          {page === 'menus' && <PageMenus />}
          {page === 'forms' && <MealProductionGrid />}
          {page === 'planned' && (
            <PageStub
              icon="📊"
              title="Planned Totals"
              description="Forecast the meal counts you expect to serve each week, by site and age group. We'll compare projections to actuals once your H1530 entries pile up."
              bullets={[
                'Weekly forecast grid by meal × age group',
                'Auto-update from your enrolled roster',
                'Variance report vs. actuals',
              ]}
            />
          )}
          {page === 'milk' && (
            <PageStub
              icon="🥛"
              title="Milk Purchases"
              description="Log every milk purchase — vendor, date, type, and gallons — so your monthly claim can prove the cost basis behind your reimbursement."
              bullets={[
                'Vendor & invoice tracking',
                'Whole / 1% / Skim / Lactose-free types',
                'Auto-totals per claim period',
              ]}
            />
          )}
          {page === 'attendance' && (
            <PageStub
              icon="✏️"
              title="Attend Input by Week"
              description="A weekly grid: rows are enrolled participants, columns are days of the week. Tap or click to mark present, absent, or partial day."
              bullets={[
                'One-click present / absent per day',
                'Eligibility status badge per participant',
                'Auto-feeds the H1530 daily counts',
              ]}
            />
          )}
          {page === 'submit' && (
            <PageStub
              icon="📤"
              title="Submit Claim"
              description="Bundle a month of meals, attendance, and milk purchases into a TDA-aligned claim package — preview it, then submit."
              bullets={[
                'Auto-built from your daily entries',
                'Edit-check warnings before submit',
                'PDF export for sponsor review',
              ]}
            />
          )}
        </main>
      </div>
    </div>
  );
}
