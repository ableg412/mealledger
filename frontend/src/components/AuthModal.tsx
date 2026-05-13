import { useState, FormEvent } from 'react';

type Mode = 'signin' | 'signup';

interface AuthModalProps {
  mode: Mode;
  onClose: () => void;
  onSwitchMode: (m: Mode) => void;
}

export default function AuthModal({ mode, onClose, onSwitchMode }: AuthModalProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [orgName, setOrgName] = useState('');
  const [notice, setNotice] = useState<string | null>(null);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    // Auth is not wired yet — this is intentionally a placeholder.
    setNotice(
      mode === 'signin'
        ? "Sign-in isn't connected yet. We'll wire it to the auth backend next."
        : "Sign-up isn't connected yet. We'll wire it to the auth backend next.",
    );
  }

  const isSignUp = mode === 'signup';

  return (
    <div
      className="modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="auth-modal-title"
      onClick={onClose}
    >
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-head">
          <h3 id="auth-modal-title">
            {isSignUp ? 'Create your account' : 'Sign in to MealLedger'}
          </h3>
          <button className="modal-close" onClick={onClose} aria-label="Close">×</button>
        </div>
        <div className="modal-body">
          {notice && <div className="form-success">{notice}</div>}
          <form onSubmit={handleSubmit} style={{ marginTop: notice ? 14 : 0 }}>
            {isSignUp && (
              <div className="field">
                <label htmlFor="org">Organization name</label>
                <input
                  id="org"
                  required
                  value={orgName}
                  onChange={(e) => setOrgName(e.target.value)}
                  placeholder="e.g. Sunshine Daycare Network"
                />
              </div>
            )}
            <div className="field">
              <label htmlFor="auth-email">Work email</label>
              <input
                id="auth-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="field">
              <label htmlFor="auth-password">Password</label>
              <input
                id="auth-password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                minLength={8}
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary"
              style={{ width: '100%' }}
            >
              {isSignUp ? 'Create account' : 'Sign in'}
            </button>
          </form>
          <div className="modal-switch">
            {isSignUp ? (
              <>
                Already have an account?
                <button onClick={() => onSwitchMode('signin')}>Sign in</button>
              </>
            ) : (
              <>
                New to MealLedger?
                <button onClick={() => onSwitchMode('signup')}>Create an account</button>
              </>
            )}
          </div>
        </div>
        <div className="modal-foot">
          By continuing you agree to our Terms and acknowledge our Privacy Policy.
        </div>
      </div>
    </div>
  );
}
