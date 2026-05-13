import Logo from './Logo';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <Logo color="#ffffff" />
            <p className="blurb">
              Paperless H1530s and real-time CACFP compliance for multi-site
              providers. Built for the 2026 Dietary Guidelines.
            </p>
          </div>
          <div>
            <h4>Product</h4>
            <ul>
              <li><a href="#features">Features</a></li>
              <li><a href="#pricing">Pricing</a></li>
              <li><a href="#compliance">Compliance</a></li>
              <li><a href="#faq">FAQ</a></li>
            </ul>
          </div>
          <div>
            <h4>Company</h4>
            <ul>
              <li><a href="mailto:helpdesk.abel@gmail.com">Contact</a></li>
              <li><a href="#top">About</a></li>
              <li><a href="#top">Careers</a></li>
            </ul>
          </div>
          <div>
            <h4>Legal</h4>
            <ul>
              <li><a href="#top">Privacy</a></li>
              <li><a href="#top">Terms</a></li>
              <li><a href="#top">Security</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <div>© {new Date().getFullYear()} MealLedger. All rights reserved.</div>
          <div>
            MealLedger is not affiliated with or endorsed by USDA or the Texas
            Department of Agriculture.
          </div>
        </div>
      </div>
    </footer>
  );
}
