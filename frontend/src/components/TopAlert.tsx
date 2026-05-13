interface TopAlertProps {
  onRequestDemo: () => void;
}

export default function TopAlert({ onRequestDemo }: TopAlertProps) {
  return (
    <div className="top-alert">
      <div className="container top-alert-inner">
        <span className="top-alert-eyebrow">See MealLedger in Action!</span>
        <span className="top-alert-msg">
          Live <strong>Product Demo</strong> walkthroughs available for CACFP sponsors
          &amp; multi-site providers
        </span>
        <button className="top-alert-cta" onClick={onRequestDemo} type="button"
          style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
          Learn more &rsaquo;
        </button>
      </div>
    </div>
  );
}
