const FEATURES = [
  {
    icon: '✓',
    title: 'Real-time meal pattern validation',
    body:
      "We check every meal as it's logged — required components, 2-of-5 for snacks, and 2026 limits on added sugars and sodium.",
  },
  {
    icon: '🥬',
    title: 'Smart vegetable crediting',
    body:
      'Leafy greens auto-halve raw, full-credit cooked. 1/8 cup minimums enforced. Juice flagged after the daily limit.',
  },
  {
    icon: '📋',
    title: 'Digital H1530',
    body:
      "Texas TDA H1530 layout, digitized. Date, food items, quantities, attendance — all on one fast grid.",
  },
  {
    icon: '🏢',
    title: 'Multi-site rollups',
    body:
      'One login, every site. Switch contexts in a click, or run a single report across your whole organization.',
  },
  {
    icon: '👥',
    title: 'Eligibility tracking',
    body:
      'Free / Reduced / Paid status and enrollment dates tracked per participant, with claims-ready reports.',
  },
  {
    icon: '🔒',
    title: 'Audit-ready records',
    body:
      'Every change is timestamped and attributable. Export your full H1530 history for any review window.',
  },
];

export default function Features() {
  return (
    <section className="section" id="features">
      <div className="container">
        <div className="section-head">
          <div className="kicker">What you get</div>
          <h2>Stop reconciling paper. <span className="accent">Start serving meals.</span></h2>
          <p>
            MealLedger replaces the H1530 binder with a fast point-of-service tool your
            staff can run on a tablet — and gives directors the rollups they actually need.
          </p>
        </div>
        <div className="feature-grid">
          {FEATURES.map((f) => (
            <div className="feature-card" key={f.title}>
              <div className="feature-icon" aria-hidden="true">{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
