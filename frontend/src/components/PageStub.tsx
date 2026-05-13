interface PageStubProps {
  title: string;
  icon: string;
  description: string;
  bullets?: string[];
}

export default function PageStub({ title, icon, description, bullets }: PageStubProps) {
  return (
    <div className="page-stub">
      <div className="page-stub-card">
        <div className="page-stub-icon" aria-hidden="true">{icon}</div>
        <div className="page-stub-soon">Coming soon</div>
        <h1>{title}</h1>
        <p>{description}</p>
        {bullets && bullets.length > 0 && (
          <ul>
            {bullets.map((b) => <li key={b}>{b}</li>)}
          </ul>
        )}
      </div>
    </div>
  );
}
