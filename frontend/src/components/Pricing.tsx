interface PricingProps {
  onRequestDemo: () => void;
}

export default function Pricing({ onRequestDemo }: PricingProps) {
  return (
    <section className="section alt" id="pricing">
      <div className="container">
        <div className="section-head">
          <div className="kicker">Simple, per-site pricing</div>
          <h2>One price per site. Every feature included.</h2>
          <p>
            No "pro" upsells, no per-user fees. Start with one site, add more anytime.
          </p>
        </div>
        <div className="pricing-grid">
          <div className="price-card">
            <h3>Starter</h3>
            <div className="price">
              $29 <span className="per">/ site / month</span>
            </div>
            <div style={{ color: 'var(--text-muted)', fontSize: 14 }}>
              For 1–3 sites
            </div>
            <ul>
              <li>Full H1530 digital grid</li>
              <li>Real-time meal pattern validation</li>
              <li>Participant &amp; eligibility tracking</li>
              <li>Export PDF reports</li>
              <li>Email support</li>
            </ul>
            <button className="btn btn-ghost" onClick={onRequestDemo}>
              Start free trial
            </button>
          </div>

          <div className="price-card featured">
            <span className="tag">Most popular</span>
            <h3>Growth</h3>
            <div className="price">
              $24 <span className="per">/ site / month</span>
            </div>
            <div style={{ color: 'var(--text-muted)', fontSize: 14 }}>
              For 4–10 sites
            </div>
            <ul>
              <li>Everything in Starter</li>
              <li>Multi-site rollups &amp; dashboards</li>
              <li>Roles &amp; permissions per site</li>
              <li>Bulk roster import</li>
              <li>Priority support</li>
            </ul>
            <button className="btn btn-primary" onClick={onRequestDemo}>
              Start free trial
            </button>
          </div>

          <div className="price-card">
            <h3>Enterprise</h3>
            <div className="price">
              Contact us
            </div>
            <div style={{ color: 'var(--text-muted)', fontSize: 14 }}>
              11+ sites &amp; sponsors
            </div>
            <ul>
              <li>Everything in Growth</li>
              <li>SSO &amp; SCIM</li>
              <li>Sponsor review workflows</li>
              <li>Custom audit exports</li>
              <li>Dedicated success manager</li>
            </ul>
            <button className="btn btn-ghost" onClick={onRequestDemo}>
              Talk to sales
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
