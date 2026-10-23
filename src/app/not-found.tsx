import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="section pattern">
      <div className="wrap" style={{ maxWidth: 720 }}>
        <div className="eyebrow">404</div>
        <h1>This trail went <em>cold.</em></h1>
        <p className="lead">The page you were sniffing for has moved or no longer exists. These might help:</p>
        <div className="btn-row" style={{ marginTop: 24 }}>
          <Link className="btn btn-primary" href="/">Home</Link>
          <Link className="btn btn-ghost" href="/travel/">Travel</Link>
          <Link className="btn btn-ghost" href="/dermacare/">Dermacare</Link>
          <Link className="btn btn-ghost" href="/pawprints/">Pawprints</Link>
        </div>
      </div>
    </section>
  );
}
