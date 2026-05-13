import { useState, FormEvent } from 'react';
import { login, type Session } from '../auth';

type Mode = 'signin' | 'signup';

interface AuthModalProps {
  mode: Mode;
  onClose: () => void;
  onSwitchMode: (m: Mode) => void;
  onLoginSuccess: (session: Session) => void;
}

export default function AuthModal({ mode, onClose, onSwitchMode, onLoginSuccess }: AuthModalProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [orgName, setOrgName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  const isSignUp = mode === 'signup';

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setNotice(null);

    if (isSignUp) {
      // Real sign-up isn't wired yet. Point the user at the demo creds.
      setNotice(
        "Sign-up isn't connected yet — use the demo account below to try the app.",
      );
      return;
    }

    const session = login(username, password);
    if (session) {
      onLoginSuccess(session);
    } else {
      setError('Invalid username or password.');
    }
  }

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
          {!isSignUp && (
            <div className="demo-creds-banner">
              <strong>Demo account</strong>
              <div>
                Username: <code>josh</code> &nbsp;·&nbsp; Password: <code>1234</code>
              </div>
            </div>
          )}
          {error && <div className="form-error">{error}</div>}
          {notice && <div className="form-success">{notice}</div>}
          <form onSubmit={handleSubmit} style={{ marginTop: notice || error ? 14 : 0 }}>
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
              <label htmlFor="auth-username">Username</label>
              <input
                id="auth-username"
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="josh"
                autoComplete="username"
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
                autoComplete={isSignUp ? 'new-password' : 'current-password'}
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
