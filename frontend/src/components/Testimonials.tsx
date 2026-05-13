// TODO: replace with real quotes before going public.
const QUOTES = [
  {
    quote:
      "We used to spend three hours a week reconciling H1530s. With MealLedger our meal counts and production records reconcile themselves at the point of service.",
    name: 'Maria Cervantes',
    role: 'Director, Sunshine Daycare (single site)',
    initials: 'MC',
  },
  {
    quote:
      "Switching contexts between eight centers used to mean eight binders. Now it's one tab. The rollup report alone saved us a part-time hire.",
    name: 'Devon Whitaker',
    role: 'Operations Lead, BrightPath Network (8 sites)',
    initials: 'DW',
  },
  {
    quote:
      "The validator catches things our staff used to miss — leafy green crediting, juice frequency, the works. Our last review had zero findings.",
    name: 'Aisha Patel',
    role: 'CACFP Sponsor, Heartland Child Nutrition',
    initials: 'AP',
  },
];

export default function Testimonials() {
  return (
    <section className="section">
      <div className="container">
        <div className="section-head">
          <div className="kicker">From the field</div>
          <h2>Providers and sponsors who switched.</h2>
          <p>Real workflows. Real audits. Less paper.</p>
        </div>
        <div className="tm-grid">
          {QUOTES.map((q) => (
            <div className="tm-card" key={q.name}>
              <blockquote>"{q.quote}"</blockquote>
              <div className="tm-author">
                <span className="tm-avatar" aria-hidden="true">{q.initials}</span>
                <div className="tm-meta">
                  <div className="name">{q.name}</div>
                  <div className="role">{q.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
