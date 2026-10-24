'use client';

import Link from 'next/link';
import { animated, useInView, useReducedMotion, useSpring, useSprings, useTrail, to } from '@react-spring/web';
import { useRef, type ReactNode } from 'react';

const AnimatedLink = animated(Link);

/** Fades and lifts its children in once they scroll into view. */
export function Reveal({ children, delay = 0, y = 26, className, as = 'div' }: { children: ReactNode; delay?: number; y?: number; className?: string; as?: 'div' | 'section' | 'li' }) {
  const reduce = useReducedMotion();
  const [ref, style] = useInView(
    () => ({ from: { opacity: reduce ? 1 : 0, y: reduce ? 0 : y }, to: { opacity: 1, y: 0 }, delay, config: { tension: 210, friction: 26 } }),
    { rootMargin: '0px 0px -8% 0px', once: true },
  );
  const Tag = animated[as];
  return (
    <Tag ref={ref} className={className} style={style}>
      {children}
    </Tag>
  );
}

/** Headline that springs in word by word. Keeps the full text in the DOM for SEO and screen readers. */
export function SpringWords({ text, accent, className }: { text: string; accent?: string; className?: string }) {
  const reduce = useReducedMotion();
  const words = text.split(' ');
  const accentWords = accent ? accent.split(' ') : [];
  const all = [...words, ...accentWords];
  const trail = useTrail(all.length, {
    from: { opacity: reduce ? 1 : 0, y: reduce ? 0 : 40 },
    to: { opacity: 1, y: 0 },
    config: { tension: 260, friction: 24 },
    delay: 80,
  });
  return (
    <h1 className={className} aria-label={`${text}${accent ? ` ${accent}` : ''}`}>
      {trail.map((s, i) => {
        const isAccent = i >= words.length;
        const w = all[i];
        return (
          <span key={i} aria-hidden="true" style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'top', paddingBottom: '0.08em' }}>
            <animated.span style={{ display: 'inline-block', opacity: s.opacity, transform: s.y.to((v) => `translateY(${v}%)`) }}>
              {isAccent ? <em>{w}</em> : w}
              {i < all.length - 1 ? ' ' : ''}
            </animated.span>
            {i < all.length - 1 ? ' ' : ''}
          </span>
        );
      })}
    </h1>
  );
}

/** Counts up to a number when it scrolls into view. */
export function CountUp({ value, suffix = '', prefix = '' }: { value: number; suffix?: string; prefix?: string }) {
  const reduce = useReducedMotion();
  const [ref, { n }] = useInView(() => ({ from: { n: reduce ? value : 0 }, to: { n: value }, config: { tension: 60, friction: 24 } }), { once: true });
  return (
    <b ref={ref as never}>
      {prefix}
      <animated.span className="n">{n.to((v) => Math.round(v).toString())}</animated.span>
      {suffix}
    </b>
  );
}

/** A link card that tilts gently towards the pointer. */
export function TiltLink({ href, className, children, sol, ariaLabel }: { href: string; className?: string; children: ReactNode; sol?: string; ariaLabel?: string }) {
  const reduce = useReducedMotion();
  const el = useRef<HTMLAnchorElement>(null);
  const [{ rx, ry, s }, api] = useSpring(() => ({ rx: 0, ry: 0, s: 1, config: { mass: 1, tension: 320, friction: 26 } }));
  const move = (e: React.PointerEvent) => {
    if (reduce || e.pointerType !== 'mouse' || !el.current) return;
    const r = el.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    api.start({ rx: -py * 5, ry: px * 6, s: 1.012 });
  };
  const leave = () => api.start({ rx: 0, ry: 0, s: 1 });
  return (
    <AnimatedLink
      ref={el}
      href={href}
      className={className}
      data-sol={sol}
      aria-label={ariaLabel}
      onPointerMove={move}
      onPointerLeave={leave}
      style={{ transform: to([rx, ry, s], (x, y, z) => `perspective(900px) rotateX(${x}deg) rotateY(${y}deg) scale(${z})`) }}
    >
      {children}
    </AnimatedLink>
  );
}

type Node = { href: string; sol: string; title: string; sub: string; icon: ReactNode };

/** One pawfamily at the centre, four solutions bonded around it. Nodes spring in, then float. */
export function BondHub({ nodes, core }: { nodes: Node[]; core: ReactNode }) {
  const reduce = useReducedMotion();
  const spots = [
    { x: 21, y: 19 },
    { x: 79, y: 19 },
    { x: 21, y: 81 },
    { x: 79, y: 81 },
  ];
  const [springs] = useSprings(nodes.length, (i) => ({
    from: { o: reduce ? 1 : 0, sc: reduce ? 1 : 0.6, fy: 0 },
    to: reduce
      ? { o: 1, sc: 1, fy: 0 }
      : async (next) => {
          await next({ o: 1, sc: 1, delay: 250 + i * 140, config: { tension: 220, friction: 16 } });
          // gentle float, out of phase per node
          while (true) {
            await next({ fy: i % 2 ? 6 : -6, config: { duration: 2600 + i * 300 } });
            await next({ fy: i % 2 ? -6 : 6, config: { duration: 2600 + i * 300 } });
          }
        },
  }));
  const line = useSpring({ from: { d: reduce ? 0 : 160 }, to: { d: 0 }, delay: 200, config: { duration: 1100 } });
  const core$ = useSpring({ from: { sc: reduce ? 1 : 0.8, o: reduce ? 1 : 0 }, to: { sc: 1, o: 1 }, config: { tension: 200, friction: 14 } });
  return (
    <div className="hub">
      <svg className="hub-lines" viewBox="0 0 100 100" aria-hidden="true" preserveAspectRatio="none">
        {spots.map((p, i) => (
          <animated.path key={i} d={`M50 50 L${p.x} ${p.y}`} vectorEffect="non-scaling-stroke" strokeDashoffset={line.d} />
        ))}
      </svg>
      <animated.div className="hub-core" style={{ opacity: core$.o, transform: core$.sc.to((v) => `translate(-50%, -50%) scale(${v})`) }}>
        {core}
      </animated.div>
      {springs.map((s, i) => {
        const n = nodes[i];
        const p = spots[i];
        return (
          <animated.div
            key={n.href}
            style={{ position: 'absolute', left: `${p.x}%`, top: `${p.y}%`, width: '36%', opacity: s.o, transform: to([s.sc, s.fy], (sc, fy) => `translate(-50%, calc(-50% + ${fy}px)) scale(${sc})`) }}
          >
            <Link href={n.href} className="hub-node" data-sol={n.sol} style={{ position: 'static', width: '100%', transform: 'none' }}>
              <span className="hub-node-card">
                <span className="hub-node-ico">{n.icon}</span>
                <b>{n.title}</b>
                <small>{n.sub}</small>
              </span>
            </Link>
          </animated.div>
        );
      })}
    </div>
  );
}
