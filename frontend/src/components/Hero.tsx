interface HeroProps {
  onRequestDemo: () => void;
  onSignUp: () => void;
}

export default function Hero({ onRequestDemo, onSignUp }: HeroProps) {
  return (
    <section className="hero" id="top">
      <div className="container hero-grid">
        <div>
          <span className="eyebrow">
            <span className="eyebrow-dot" />
            Built for 2026 CACFP standards
          </span>
          <h1>
            Nourishing children, <span className="accent">simplifying CACFP</span> for
            every provider.
          </h1>
          <p className="lede">
            MealLedger replaces the H1530 binder with a fast point-of-service tool that
            validates every meal as it's served — and gives sponsors audit-ready reports
            for every site, every day.
          </p>
          <div className="hero-ctas">
            <button className="btn btn-primary" onClick={onSignUp}>
              Start 30-day free trial
            </button>
            <button className="btn btn-ghost" onClick={onRequestDemo}>
              Request a demo
            </button>
          </div>
          <div className="hero-meta">
            <span><span className="check">✓</span>No credit card</span>
            <span><span className="check">✓</span>Import rosters</span>
            <span><span className="check">✓</span>TDA-aligned reports</span>
          </div>
        </div>

        <div className="hero-illustration">
          <div className="bg-blob" aria-hidden="true" />
          <HeroCard />
        </div>
      </div>
    </section>
  );
}

function HeroCard() {
  return (
    <div className="hero-card" aria-hidden="true">
      <div className="hero-card-header">
        <div className="title">Lunch — Sunshine Daycare · 05/12</div>
        <div className="pill">● Compliant</div>
      </div>
      <table className="h1530-table">
        <thead>
          <tr>
            <th>Component</th>
            <th>Food item</th>
            <th className="right">Quan.</th>
            <th className="right">Credit</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Milk</td>
            <td>1% Unflavored</td>
            <td className="right">3 gal</td>
            <td className="right"><span className="badge-ok">OK</span></td>
          </tr>
          <tr>
            <td>Vegetable</td>
            <td>Romaine, raw</td>
            <td className="right">4 cups</td>
            <td className="right"><span className="badge-ok">2 c credit</span></td>
          </tr>
          <tr>
            <td>Fruit</td>
            <td>Apple slices</td>
            <td className="right">2 lb</td>
            <td className="right"><span className="badge-ok">OK</span></td>
          </tr>
          <tr>
            <td>Grain</td>
            <td>Whole-grain roll</td>
            <td className="right">24 ct</td>
            <td className="right"><span className="badge-ok">WGR</span></td>
          </tr>
          <tr>
            <td>Meat/Alt</td>
            <td>Bean noodles</td>
            <td className="right">2 lb</td>
            <td className="right"><span className="badge-warn">Verify</span></td>
          </tr>
        </tbody>
      </table>
      <div className="h1530-foot">
        <span>Attendance: 22 of 24</span>
        <span>Auto-saved · 11:47 AM</span>
      </div>
    </div>
  );
}
