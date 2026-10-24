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
