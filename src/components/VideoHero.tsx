'use client';

import Link from 'next/link';
import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import { animated, useReducedMotion, useSprings } from '@react-spring/web';
import { clipSrc, type Clip } from '@/lib/media';

type Tab = { sol: string; href: string; name: string; short: string; icon: ReactNode };

/**
 * Full-bleed video hero (after Watermelon UI hero-26): cinematic reveal, left-aligned copy,
 * frosted solution strip. Clips play in turn; hovering a solution plays its own clip.
 * Phones get a 9:16 cut, desktops a 16:9 cut; sources attach only after mount, so the
 * server HTML carries just the poster (fast first paint, no double download).
 */
export function VideoHero({ clips, tabs, eyebrow, title, accent, lead, actions }: {
  clips: Clip[];
  tabs: Tab[];
  eyebrow: string;
  title: string;
  accent: string;
  lead: string;
  actions: ReactNode;
}) {
  const reduce = useReducedMotion();
  const [cut, setCut] = useState<'wide' | 'tall' | null>(null);
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);
  const vids = useRef<(HTMLVideoElement | null)[]>([]);
  const multi = clips.length > 1;

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 760px)');
    // Respect Data Saver: keep the poster, skip the video.
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
    if (saveData) return;
    const pick = () => setCut(mq.matches ? 'tall' : 'wide');
    // Start the video only once the page has painted and gone quiet, so it never competes with the first paint.
    const later = (window as Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number }).requestIdleCallback;
    const start = () => (document.readyState === 'complete' ? pick() : window.addEventListener('load', pick, { once: true }));
    const id = later ? later(start, { timeout: 2500 }) : window.setTimeout(start, 1200);
    mq.addEventListener('change', pick);
    return () => { mq.removeEventListener('change', pick); window.removeEventListener('load', pick); if (!later) clearTimeout(id); };
  }, []);

  const go = useCallback((i: number) => setActive(((i % clips.length) + clips.length) % clips.length), [clips.length]);

  useEffect(() => {
    if (reduce || !cut) return;
    vids.current.forEach((v, i) => {
      if (!v) return;
      if (i === active) {
        v.currentTime = 0;
        v.play().catch(() => {});
      } else v.pause();
    });
    setProgress(0);
  }, [active, reduce, cut]);

  const [fades] = useSprings(clips.length, (i) => ({ opacity: i === active ? 1 : 0, config: { duration: 900 } }), [active]);
  const titleWords = title.split(' ');
  const words = [...titleWords, ...accent.split(' ')];

  const activeSol = clips[active]?.sol;
  const posterCut = cut ?? 'wide';

  return (
    <section className="vhero" aria-label="Mylopaws">
      <div className="vhero-media">
        {clips[0] && (
          <picture>
            <source media="(max-width: 760px)" srcSet={clipSrc(clips[0].name, 'tall', 'jpg')} />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="vhero-poster" src={clipSrc(clips[0].name, 'wide', 'jpg')} alt={clips[0].alt} draggable={false} fetchPriority="high" />
          </picture>
        )}
        {!reduce && cut &&
          clips.map((c, i) => (
            <animated.video
              key={`${c.name}-${cut}`}
              ref={(el: HTMLVideoElement | null) => { vids.current[i] = el; }}
              className="vhero-video"
              style={fades[i]}
              poster={clipSrc(c.name, posterCut, 'jpg')}
              muted
              playsInline
              autoPlay={i === active}
              loop={!multi}
              preload={i === 0 ? 'auto' : 'metadata'}
              onTimeUpdate={(e) => { if (i === active) { const v = e.currentTarget; if (v.duration) setProgress(v.currentTime / v.duration); } }}
              onEnded={() => multi && go(i + 1)}
              aria-hidden="true"
            >
              <source src={clipSrc(c.name, cut, 'webm')} type="video/webm" />
              <source src={clipSrc(c.name, cut, 'mp4')} type="video/mp4" />
            </animated.video>
          ))}
        <div className="vhero-shade" />
      </div>

      <div className="wrap vhero-copy">
        <div className="vhero-eyebrow vhero-in" style={{ ["--i" as string]: 0 }}>{eyebrow}</div>
        <h1 aria-label={`${title} ${accent}`}>
          {words.map((w, i) => (
            <span key={i} aria-hidden="true" className="vhero-word">
              <span className="vhero-in" style={{ display: 'inline-block', ["--i" as string]: i + 1 }}>
                {i >= titleWords.length ? <em>{w}</em> : w}
              </span>
            </span>
          ))}
        </h1>
        <p className="vhero-lead vhero-in" style={{ ["--i" as string]: words.length + 1 }}>{lead}</p>
        <div className="btn-row vhero-in" style={{ ["--i" as string]: words.length + 2 }}>{actions}</div>
      </div>

      <nav className="vhero-strip vhero-in" aria-label="Mylopaws solutions" style={{ ["--i" as string]: words.length + 3 }}>
        <div className="wrap vhero-tabs">
          {tabs.map((tab) => {
            const idx = clips.findIndex((c) => c.sol === tab.sol);
            const on = activeSol === tab.sol;
            return (
              <Link
                key={tab.sol}
                href={tab.href}
                className={`vhero-tab${on ? ' on' : ''}`}
                data-sol={tab.sol}
                onMouseEnter={() => idx >= 0 && go(idx)}
                onFocus={() => idx >= 0 && go(idx)}
              >
                <span className="vhero-tab-ico">{tab.icon}</span>
                <span className="vhero-tab-txt">
                  <b>{tab.name}</b>
                  <small>{tab.short}</small>
                </span>
                {on && multi && <span className="vhero-bar" style={{ transform: `scaleX(${progress})` }} />}
              </Link>
            );
          })}
        </div>
      </nav>
    </section>
  );
}
