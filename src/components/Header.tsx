import Link from 'next/link';
import { Logo } from './Logo';
import { NAV, bookLink } from '@/lib/site';
import { BookMenu, BookList } from './BookMenu';

export function Header() {
  return (
    <header className="site-header">
      <div className="wrap">
        <Logo />
        <nav className="nav" aria-label="Main">
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} className={'sol' in n ? 'nav-sol' : undefined} data-sol={'sol' in n ? n.sol : undefined}>
              {n.label}
            </Link>
          ))}
          <BookMenu label="Book now" align="right" />
        </nav>
        <details className="menu">
          <summary aria-label="Open menu">Menu</summary>
          <div className="menu-panel">
            {NAV.map((n) => (
              <Link key={n.href} href={n.href} className={'sol' in n ? 'nav-sol' : undefined} data-sol={'sol' in n ? n.sol : undefined}>
                {n.label}
              </Link>
            ))}
            <Link href="/careers/">Careers</Link>
            <BookList />
          </div>
        </details>
      </div>
    </header>
  );
}
