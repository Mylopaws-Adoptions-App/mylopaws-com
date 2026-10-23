import Link from 'next/link';
import { Logo } from './Logo';
import { NAV, appLink } from '@/lib/site';

export function Header() {
  return (
    <header className="site-header">
      <div className="wrap">
        <Logo />
        <nav className="nav" aria-label="Main">
          {NAV.map((n) => (
            <Link key={n.href} href={n.href}>{n.label}</Link>
          ))}
          <a className="btn btn-primary" href={appLink('general')}>Book now</a>
        </nav>
        <details className="menu">
          <summary aria-label="Open menu">Menu</summary>
          <div className="menu-panel">
            {NAV.map((n) => (
              <Link key={n.href} href={n.href}>{n.label}</Link>
            ))}
            <a className="btn btn-primary" href={appLink('general')}>Book on the Mylopaws app</a>
          </div>
        </details>
      </div>
    </header>
  );
}
