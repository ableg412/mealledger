import { useState } from 'react';

interface HelpWidgetProps {
  onRequestDemo: () => void;
}

export default function HelpWidget({ onRequestDemo }: HelpWidgetProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="help-widget no-print">
      {open && (
        <div className="help-card" role="dialog" aria-label="Help">
          <button
            className="help-card-close"
            onClick={() => setOpen(false)}
            aria-label="Close"
          >
            ×
          </button>
          <h4>Hey there! Need help?</h4>
          <p>
            Have a question about CACFP compliance, pricing, or how MealLedger fits your
            workflow? Our team can walk you through a live demo.
          </p>
          <button
            className="btn btn-primary"
            onClick={() => {
              setOpen(false);
              onRequestDemo();
            }}
          >
            Request a demo
          </button>
        </div>
      )}
      <button
        className="help-bubble"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? 'Close help' : 'Open help'}
        title="Need help?"
      >
        {open ? '×' : '💬'}
      </button>
    </div>
  );
}
