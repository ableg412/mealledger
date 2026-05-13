export default function Compliance() {
  return (
    <section className="compliance" id="compliance">
      <div className="container compliance-inner">
        <div>
          <h2>Built around <span className="accent">USDA &amp; TDA rules</span> — not bolted on.</h2>
          <p>
            MealLedger's validator is the product. We encode the same rules sponsors
            check during reviews, so issues are caught at the point of service — long
            before the claim is filed.
          </p>
          <ul>
            <li><span className="ck">✓</span> 2026 Dietary Guidelines (10th ed.) limits on added sugars and sodium</li>
            <li><span className="ck">✓</span> Vegetable crediting: 1/8 cup minimum, leafy greens 0.5× raw / 1× cooked</li>
            <li><span className="ck">✓</span> Full-strength juice limited to once per day</li>
            <li><span className="ck">✓</span> Substitutions: a second vegetable can replace fruit at lunch &amp; supper at equal volume</li>
            <li><span className="ck">✓</span> Whole hominy as a starchy vegetable; bean noodles as veg or meat alternate</li>
            <li><span className="ck">✓</span> H1530 export aligned to Texas TDA form layout</li>
          </ul>
        </div>
        <div className="compliance-badges">
          <div className="title">Built for the programs you run</div>
          <div className="badge-row">
            <div className="badge"><strong>USDA</strong>CACFP rules</div>
            <div className="badge"><strong>Texas TDA</strong>H1530 format</div>
            <div className="badge"><strong>2026</strong>Dietary Guidelines</div>
          </div>
          <div className="disclaimer">
            MealLedger is independent software and is not affiliated with or endorsed by
            USDA or the Texas Department of Agriculture.
          </div>
        </div>
      </div>
    </section>
  );
}
