import { useState, FormEvent } from 'react';

interface DemoModalProps {
  onClose: () => void;
}

type Status = 'idle' | 'submitting' | 'success' | 'error';

export default function DemoModal({ onClose }: DemoModalProps) {
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState<string | null>(null);

  const [form, setForm] = useState({
    fullName: '',
    email: '',
    organization: '',
    siteCount: 1,
    message: '',
  });

  function update<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus('submitting');
    setError(null);

    // In dev, Vite proxies /api → http://localhost:4000 (see vite.config.ts).
    // In prod, VITE_API_BASE_URL is set by Render to the deployed API host.
    const apiBase = import.meta.env.VITE_API_BASE_URL || '';
    const url = `${apiBase}/api/demo-requests`;

    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        throw new Error(data.error || 'Something went wrong. Please try again.');
      }
      setStatus('success');
    } catch (err) {
      setStatus('error');
      setError(err instanceof Error ? err.message : 'Unknown error');
    }
  }

  return (
    <div
      className="modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="demo-modal-title"
      onClick={onClose}
    >
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-head">
          <h3 id="demo-modal-title">Request a demo</h3>
          <button className="modal-close" onClick={onClose} aria-label="Close">×</button>
        </div>
        <div className="modal-body">
          {status === 'success' ? (
            <div className="form-success">
              <strong>Thanks — we got it.</strong>
              <div style={{ marginTop: 6 }}>
                Our team will reach out within 1 business day to {form.email}.
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              {error && <div className="form-error">{error}</div>}

              <div className="field">
                <label htmlFor="fullName">Full name</label>
                <input
                  id="fullName"
                  required
                  value={form.fullName}
                  onChange={(e) => update('fullName', e.target.value)}
                />
              </div>

              <div className="field">
                <label htmlFor="email">Work email</label>
                <input
                  id="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => update('email', e.target.value)}
                />
              </div>

              <div className="field">
                <label htmlFor="organization">Organization</label>
                <input
                  id="organization"
                  required
                  value={form.organization}
                  onChange={(e) => update('organization', e.target.value)}
                />
              </div>

              <div className="field">
                <label htmlFor="siteCount">How many sites?</label>
                <select
                  id="siteCount"
                  value={form.siteCount}
                  onChange={(e) => update('siteCount', Number(e.target.value))}
                >
                  <option value={1}>1 site</option>
                  <option value={3}>2–3 sites</option>
                  <option value={10}>4–10 sites</option>
                  <option value={25}>11–25 sites</option>
                  <option value={50}>26+ sites</option>
                </select>
              </div>

              <div className="field">
                <label htmlFor="message">Anything we should know? (optional)</label>
                <textarea
                  id="message"
                  value={form.message}
                  onChange={(e) => update('message', e.target.value)}
                  placeholder="e.g. Texas TDA, switching from paper, sponsor reviews in June..."
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary"
                style={{ width: '100%' }}
                disabled={status === 'submitting'}
              >
                {status === 'submitting' ? 'Sending…' : 'Request demo'}
              </button>
            </form>
          )}
        </div>
        <div className="modal-foot">
          We'll never share your info. Reply STOP anytime to be removed.
        </div>
      </div>
    </div>
  );
}
