import Logo from './Logo';

interface NavbarProps {
  onRequestDemo: () => void;
  onSignIn: () => void;
  onSignUp: () => void;
}

export default function Navbar({ onRequestDemo, onSignIn, onSignUp }: NavbarProps) {
  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <a href="#top" aria-label="MealLedger home">
          <Logo />
        </a>
        <nav className="nav-links" aria-label="Primary">
          <a href="#features">Features</a>
          <a href="#compliance">Compliance</a>
          <a href="#pricing">Pricing</a>
          <a href="#faq">FAQ</a>
        </nav>
        <div className="nav-cta">
          <button className="btn-link" onClick={onSignIn}>
            Sign in
          </button>
          <button className="btn btn-ghost" onClick={onRequestDemo}>
            Request demo
          </button>
          <button className="btn btn-primary" onClick={onSignUp}>
            Start free trial
          </button>
        </div>
      </div>
    </header>
  );
}
