import Link from 'next/link';

export function Logo() {
  return (
    <Link href="/" className="brand" aria-label="Mylopaws home">
      <svg className="brand-mark" viewBox="0 0 40 40" aria-hidden="true">
        <circle cx="20" cy="20" r="19" fill="#691a47" />
        <g fill="#efca58">
          <ellipse cx="20" cy="24.5" rx="6.4" ry="5.3" />
          <ellipse cx="12" cy="17" rx="2.6" ry="3.4" />
          <ellipse cx="17.2" cy="13" rx="2.6" ry="3.4" />
          <ellipse cx="22.8" cy="13" rx="2.6" ry="3.4" />
          <ellipse cx="28" cy="17" rx="2.6" ry="3.4" />
        </g>
      </svg>
      <span className="brand-word">Mylopaws</span>
    </Link>
  );
}
