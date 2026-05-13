import Logo from './Logo';

interface NavbarProps {
  onRequestDemo: () => void;
  onSignIn: () => void;
  // onSignUp kept for compat with App.tsx; not used now that we have a single
  // primary CTA in the nav.
  onSignUp: () => void;
}

export default function Navbar({ onRequestDemo, onSignIn }: NavbarProps) {
  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <a href="#top" aria-label="MealLedger home">
          <Logo />
        </a>
        <nav className="nav-links" aria-label="Primary">
          <a href="#features">Product</a>
          <a href="#solutions">Solutions</a>
          <a href="#pricing">Pricing</a>
          <a href="#compliance">Compliance</a>
          <a href="#faq">FAQ</a>
        </nav>
        <div className="nav-cta">
          <button className="btn-link" onClick={onRequestDemo}>
            Request demo
          </button>
          <button className="btn btn-primary btn-compact" onClick={onSignIn}>
            Login
          </button>
        </div>
      </div>
    </header>
  );
}
