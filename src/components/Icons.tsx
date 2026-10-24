// Hand-drawn-feel line icons, 24px grid, currentColor.
type P = { size?: number; className?: string };
const s = (size = 24) => ({ width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const, 'aria-hidden': true });

export const Paw = ({ size = 24, className }: P) => (
  <svg {...s(size)} className={className} fill="currentColor" stroke="none"><ellipse cx="12" cy="15.5" rx="4.6" ry="3.8" /><ellipse cx="6.2" cy="10" rx="1.9" ry="2.5" /><ellipse cx="10" cy="7.3" rx="1.9" ry="2.5" /><ellipse cx="14" cy="7.3" rx="1.9" ry="2.5" /><ellipse cx="17.8" cy="10" rx="1.9" ry="2.5" /></svg>
);
export const Car = ({ size, className }: P) => (
  <svg {...s(size)} className={className}><path d="M3 15.5V12l2.2-4.6A2 2 0 0 1 7 6.3h10a2 2 0 0 1 1.8 1.1L21 12v3.5a1 1 0 0 1-1 1h-1.2" /><path d="M5.2 16.5H4a1 1 0 0 1-1-1" /><path d="M8.8 16.5h6.4" /><circle cx="7" cy="16.7" r="1.8" /><circle cx="17" cy="16.7" r="1.8" /><path d="M3.5 12h17" /></svg>
);
export const Leaf = ({ size, className }: P) => (
  <svg {...s(size)} className={className}><path d="M5 19c0-8 5-13 14-14 0 9-5 14-13 14" /><path d="M5 19c3-4 6-7 10-9" /></svg>
);
export const Home = ({ size, className }: P) => (
  <svg {...s(size)} className={className}><path d="M3.5 11 12 4l8.5 7" /><path d="M5.5 9.5V20h13V9.5" /><path d="M10 20v-4.5a2 2 0 0 1 4 0V20" /></svg>
);
export const Arrow = ({ size = 18, className }: P) => (
  <svg {...s(size)} className={className ? `arrow ${className}` : 'arrow'}><path d="M5 12h14M13 6l6 6-6 6" /></svg>
);
export const Phone = ({ size, className }: P) => (
  <svg {...s(size)} className={className}><path d="M5 4h3l2 5-2.5 1.5a11 11 0 0 0 6 6L15 14l5 2v3a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" /></svg>
);
export const Pin = ({ size, className }: P) => (
  <svg {...s(size)} className={className}><path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0C18.5 15.4 12 21 12 21z" /><circle cx="12" cy="10" r="2.4" /></svg>
);
export const Clock = ({ size, className }: P) => (
  <svg {...s(size)} className={className}><circle cx="12" cy="12" r="8.5" /><path d="M12 7.5V12l3 2" /></svg>
);
export const Mail = ({ size, className }: P) => (
  <svg {...s(size)} className={className}><rect x="3.5" y="5.5" width="17" height="13" rx="2" /><path d="m4 7 8 6 8-6" /></svg>
);
export const Bag = ({ size, className }: P) => (
  <svg {...s(size)} className={className}><path d="M5 8h14l-1 12H6z" /><path d="M9 8V6.5a3 3 0 0 1 6 0V8" /></svg>
);
export const Shield = ({ size, className }: P) => (
  <svg {...s(size)} className={className}><path d="M12 3.5 5 6v5.5c0 4.4 3 7.7 7 9 4-1.3 7-4.6 7-9V6z" /><path d="m9 12 2.2 2.2L15.5 10" /></svg>
);
export const Spark = ({ size, className }: P) => (
  <svg {...s(size)} className={className}><path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M6 18l2.5-2.5M15.5 8.5 18 6" /></svg>
);
export const Search = ({ size = 18, className }: P) => (
  <svg {...s(size)} className={className}><circle cx="11" cy="11" r="6.5" /><path d="m16 16 4.5 4.5" /></svg>
);
export const WhatsApp = ({ size = 20, className }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-hidden="true" fill="currentColor">
    <path d="M12 2.2A9.7 9.7 0 0 0 3.6 16.8L2.3 21.7l5-1.3A9.7 9.7 0 1 0 12 2.2Zm0 17.7c-1.5 0-2.9-.4-4.1-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8 8 0 1 1 12 19.9Z" />
    <path d="M16.4 14.1c-.2-.1-1.4-.7-1.6-.8-.2-.1-.4-.1-.5.1l-.7.9c-.1.2-.3.2-.5.1-.2-.1-1-.4-1.9-1.2-.7-.6-1.2-1.4-1.3-1.6-.1-.2 0-.4.1-.5l.4-.4.2-.4v-.4l-.7-1.7c-.2-.5-.4-.4-.5-.4h-.5a.9.9 0 0 0-.6.3c-.2.2-.8.8-.8 2s.9 2.3 1 2.5c.1.2 1.7 2.6 4.1 3.6 2 .8 2.4.6 2.8.6.4 0 1.4-.6 1.6-1.1.2-.6.2-1 .1-1.1l-.3-.2Z" />
  </svg>
);
export const Instagram = ({ size = 24, className }: P) => (
  <svg {...s(size)} className={className} strokeWidth={2}><rect x="3" y="3" width="18" height="18" rx="5.2" /><circle cx="12" cy="12" r="4.2" /><circle cx="17.4" cy="6.6" r="1" fill="currentColor" stroke="none" /></svg>
);
export const Facebook = ({ size = 24, className }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-hidden="true" fill="currentColor"><path d="M13.6 21.5v-7.8h2.6l.4-3.1h-3V8.7c0-.9.3-1.5 1.5-1.5h1.6V4.4c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4v2.3H7.9v3.1h2.6v7.8h3.1Z" /></svg>
);
export const Google = ({ size = 24, className }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-hidden="true">
    <path fill="#4285F4" d="M21.6 12.2c0-.7-.1-1.4-.2-2H12v3.8h5.4a4.6 4.6 0 0 1-2 3v2.5h3.2c1.9-1.7 3-4.3 3-7.3Z" />
    <path fill="#34A853" d="M12 22c2.7 0 5-.9 6.6-2.4l-3.2-2.5c-.9.6-2 1-3.4 1-2.6 0-4.8-1.8-5.6-4.1H3.1v2.6A10 10 0 0 0 12 22Z" />
    <path fill="#FBBC05" d="M6.4 14c-.2-.6-.3-1.3-.3-2s.1-1.4.3-2V7.4H3.1a10 10 0 0 0 0 9.2L6.4 14Z" />
    <path fill="#EA4335" d="M12 5.9c1.5 0 2.8.5 3.8 1.5l2.9-2.9A10 10 0 0 0 3.1 7.4L6.4 10c.8-2.3 3-4.1 5.6-4.1Z" />
  </svg>
);
export const LinkedIn = ({ size = 24, className }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-hidden="true" fill="currentColor"><path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.75h4v11H3v-11Zm6.5 0h3.8v1.5h.1c.5-1 1.8-1.9 3.7-1.9 4 0 4.7 2.6 4.7 6v5.4h-4v-4.8c0-1.2 0-2.6-1.6-2.6s-1.8 1.2-1.8 2.5v4.9h-4v-11Z" /></svg>
);
