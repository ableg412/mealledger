const SOLUTIONS = [
  {
    icon: '🏠',
    title: 'Single-Site Providers',
    body:
      'Independent day care homes and centers managing their own claims. Get H1530 compliance without paying for features built for chains.',
    bullets: [
      'Daily meal count & attendance',
      'Real-time meal pattern checks',
      'TDA-aligned monthly export',
    ],
  },
  {
    icon: '🏢',
    title: 'Multi-Site Organizations',
    body:
      'One login across every center. Switch sites in a click, or run a single rollup report across your whole network.',
    bullets: [
      'Unlimited sites, one account',
      'Role-based permissions per site',
      'Cross-site rollup dashboards',
    ],
  },
  {
    icon: '📋',
    title: 'CACFP Sponsors',
    body:
      'Review submissions from your providers, catch errors before they file, and export claims-ready records for your state agency.',
    bullets: [
      'Sponsor review queue',
      'Edit check workflow',
      'Custom audit exports',
    ],
  },
];

export default function Solutions() {
  return (
    <section className="section dark" id="solutions">
      <div className="container">
        <div className="section-head">
          <div className="kicker">Built for every CACFP role</div>
          <h2>
            One platform. <span className="accent">Three audiences.</span>
          </h2>
          <p>
            Whether you run a single day care or sponsor a hundred, MealLedger is shaped
            to your workflow — not the other way around.
          </p>
        </div>
        <div className="solutions-grid">
          {SOLUTIONS.map((s) => (
            <div className="solution-card" key={s.title}>
              <div className="solution-icon" aria-hidden="true">{s.icon}</div>
              <h3>{s.title}</h3>
              <p>{s.body}</p>
              <ul>
                {s.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
