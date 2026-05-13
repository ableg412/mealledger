import { useState } from 'react';

const FAQS = [
  {
    q: 'Does MealLedger replace the H1530 form?',
    a: 'Yes — MealLedger captures the same data points the Texas TDA H1530 collects (daily meal count, attendance, meal production) and can export a TDA-aligned PDF for any date or date range. You can keep paper as a backup during transition.',
  },
  {
    q: 'How does the meal pattern validator work?',
    a: 'As your staff logs a meal, we check it against the CACFP meal pattern in real time: required components for breakfast/lunch/supper, exactly 2 of 5 for snacks, vegetable crediting (1/8 cup minimum, leafy greens 0.5× raw / 1× cooked), juice limits, and 2026 added-sugar and sodium thresholds.',
  },
  {
    q: 'Can a second vegetable replace fruit at lunch and supper?',
    a: 'Yes. MealLedger supports the CACFP substitution rule: at lunch and supper you can substitute a second vegetable for the fruit component, provided the volume is equal. The validator enforces the equal-volume requirement automatically.',
  },
  {
    q: 'How do leafy greens credit?',
    a: 'Raw leafy greens credit at half the volume (e.g., 1 cup raw romaine = 0.5 cup credit). Cooked greens credit at 1:1 volume. The system applies this automatically based on the preparation flag.',
  },
  {
    q: 'Do you support multi-site providers and sponsors?',
    a: 'Yes — the Growth plan and up support unlimited sites under one organization, with role-based permissions and rollup dashboards. Enterprise adds sponsor-managed review workflows.',
  },
  {
    q: 'Are you affiliated with USDA or TDA?',
    a: "No. MealLedger is independent software built to help CACFP providers stay compliant. We're not endorsed by USDA or the Texas Department of Agriculture.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="section alt" id="faq">
      <div className="container">
        <div className="section-head">
          <div className="kicker">Common questions</div>
          <h2>Everything you'd ask in a sales call.</h2>
        </div>
        <div className="faq-list">
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q} className={`faq-item ${isOpen ? 'open' : ''}`}>
                <button
                  className="faq-q"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? null : i)}
                >
                  <span>{f.q}</span>
                  <span className="chev" aria-hidden="true">▾</span>
                </button>
                <div className="faq-a">{f.a}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
