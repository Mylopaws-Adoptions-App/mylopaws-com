'use client';

import { animated, useReducedMotion, useSpring } from '@react-spring/web';
import { useEffect, useMemo, useRef, useState } from 'react';
import { WhatsApp } from './Icons';
import { CONTACT, waLink } from '@/lib/site';
import {
  ADD, HOME_VISIT, NEEDS, PLANS, RATE, SVC, entries, inr, listPrice, mix, planById, priceFor, quote, recommend, svcName,
  type NeedKey, type Plan, type Size, type SvcKey, type Term, type Where,
} from '@/lib/plans';

type State = { svc: SvcKey[]; needs: NeedKey[]; term: Term; where: Where; size: Size; pets: number };
const START: State = { svc: ['Full', 'Minor'], needs: [], term: '12', where: 'centre', size: 'S', pets: 1 };
const KEY = 'mp-planfinder';
const SIZE_WORD: Record<Size, string> = { S: 'small', M: 'medium', L: 'large' };

type Opt<T> = { v: T; l: string; hint?: string; off?: boolean };

/** Segmented control with a spring thumb (Watermelon frequency-selector pattern). Options can be "not offered". */
function Seg<T extends string>({ label, value, options, onChange, note }: { label: string; value: T; options: Opt<T>[]; onChange: (v: T) => void; note?: string }) {
  const i = Math.max(0, options.findIndex((o) => o.v === value));
  const reduce = useReducedMotion();
  const s = useSpring({ x: i * 100, immediate: !!reduce, config: { tension: 380, friction: 28 } });
  return (
    <div className="pf-ctl" role="group" aria-label={label}>
      <span className="pf-ctl-label">{label}</span>
      <div className="pf-seg">
        <animated.span className="pf-thumb" style={{ width: `calc((100% - 8px) / ${options.length})`, transform: s.x.to((x) => `translateX(${x}%)`) }} />
        {options.map((o) => (
          <button key={o.v} type="button" aria-pressed={o.v === value} aria-disabled={o.off || undefined} className={o.off ? 'off' : undefined} title={o.off ? 'Not offered for this routine' : o.hint} onClick={() => onChange(o.v)}>
            {o.l}{o.off && <small>Not offered</small>}
          </button>
        ))}
      </div>
      {note && <span className="pf-ctl-note">{note}</span>}
    </div>
  );
}

/** A number that springs to its new value. */
function Num({ value, fmt = inr }: { value: number; fmt?: (n: number) => string }) {
  const reduce = useReducedMotion();
  const s = useSpring({ n: value, immediate: !!reduce, config: { tension: 170, friction: 26 } });
  return <animated.span>{s.n.to((n) => fmt(n))}</animated.span>;
}

function Bar({ label, value, max, tone }: { label: string; value: number; max: number; tone: 'plan' | 'each' }) {
  const reduce = useReducedMotion();
  const s = useSpring({ from: { w: 0 }, w: max ? (value / max) * 100 : 0, immediate: !!reduce, config: { tension: 120, friction: 20 } });
  return (
    <div className="pf-bar">
      <div className="pf-bar-head"><span>{label}</span><b><Num value={value} /></b></div>
      <div className="pf-track"><animated.div className={`pf-fill ${tone}`} style={{ width: s.w.to((w) => `${w}%`) }} /></div>
    </div>
  );
}

export function PlanFinder() {
  const [st, setSt] = useState<State>(START);
  const [pick, setPick] = useState<string | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);
  const loaded = useRef(false);

  // Remember the visitor's answers on this device only.
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(KEY) || 'null');
      if (saved && Array.isArray(saved.svc)) setSt({ ...START, ...saved });
    } catch {}
    loaded.current = true;
  }, []);
  useEffect(() => {
    if (!loaded.current) return;
    try { localStorage.setItem(KEY, JSON.stringify(st)); } catch {}
  }, [st]);

  const set = (patch: Partial<State>, clearPick = false) => { setSt((s) => ({ ...s, ...patch })); if (clearPick) setPick(null); };
  const toggle = <K extends 'svc' | 'needs'>(key: K, v: State[K][number]) =>
    set({ [key]: (st[key] as string[]).includes(v) ? (st[key] as string[]).filter((x) => x !== v) : [...(st[key] as string[]), v] } as Partial<State>, true);

  const ok = st.svc.length >= 2;
  const rec = useMemo(() => (ok ? recommend(st.svc, st.needs, st.term) : null), [ok, st.svc, st.needs, st.term]);
  const shown: Plan | null = pick ? planById(pick) : rec?.main ?? null;

  const reduce = useReducedMotion();

  const choose = (id: string) => {
    setPick(id);
    if (window.innerWidth < 900) resultRef.current?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
  };

  return (
    <div className="pf">
      <div className="pf-grid">
        <div className="pf-panel">
          <div className="pf-q">
            <div className="pf-q-head">
              <h3>What does your pet usually get?</h3>
              <span className={`pf-hint${ok ? '' : ' need'}`}>{ok ? `${st.svc.length} selected` : st.svc.length ? 'Pick 1 more' : 'Pick at least 2'}</span>
            </div>
            <div className="pf-svc">
              {SVC.map((s) => {
                const on = st.svc.includes(s.k);
                return (
                  <button key={s.k} type="button" className="pf-chip" aria-pressed={on} onClick={() => toggle('svc', s.k)}>
                    <span className="pf-chip-top"><b>{s.n}</b><span className="pf-tick" aria-hidden="true"><svg width="11" height="11" viewBox="0 0 12 12"><path d="M2 6.5 5 9l5-6" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg></span></span>
                    <span className="pf-chip-price">from {inr(RATE[s.k].S)}</span>
                    <span className="pf-chip-desc">{s.d}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="pf-q">
            <div className="pf-q-head"><h3>Anything else your pet needs?</h3><span className="pf-hint">Optional</span></div>
            <div className="pf-needs">
              {NEEDS.map((n) => (
                <button key={n.k} type="button" className="pf-pill" aria-pressed={st.needs.includes(n.k)} onClick={() => toggle('needs', n.k)}>
                  <span className="pf-plus" aria-hidden="true">+</span>{n.n}
                </button>
              ))}
            </div>
          </div>

          <div className="pf-q pf-opts">
            <Seg
              label="Plan length"
              value={(shown ? String(shown.m) : st.term) as Term}
              onChange={(v) => { if (!pick && rec?.lock && rec.lock.term !== v) return; set({ term: v }, true); }}
              options={(['6', '12'] as Term[]).map((t) => ({ v: t, l: `${t} months`, off: !pick && !!rec?.lock && rec.lock.term !== t }))}
              note={rec?.lock && !pick ? rec.lock.reason : undefined}
            />
            <Seg label="Where" value={st.where} onChange={(v) => set({ where: v })} options={[{ v: 'centre', l: 'Our centre' }, { v: 'home', l: 'Your home' }]} />
            <Seg label="Pet size" value={st.size} onChange={(v) => set({ size: v })} options={[{ v: 'S', l: 'Small', hint: 'Shih Tzu, Pug, cats' }, { v: 'M', l: 'Medium', hint: 'Beagle, Indie, Cocker' }, { v: 'L', l: 'Large', hint: 'Golden, Lab, GSD' }]} />
            <div className="pf-ctl" role="group" aria-label="Pets">
              <span className="pf-ctl-label">Pets</span>
              <div className="pf-stepper">
                <button type="button" aria-label="One fewer pet" disabled={st.pets <= 1} onClick={() => set({ pets: Math.max(1, st.pets - 1) })}>−</button>
                <output aria-live="polite">{st.pets}</output>
                <button type="button" aria-label="One more pet" disabled={st.pets >= 4} onClick={() => set({ pets: Math.min(4, st.pets + 1) })}>+</button>
              </div>
            </div>
          </div>
        </div>

        <div className="pf-result" ref={resultRef} aria-live="polite">
          {!shown ? (
            <div className="pf-empty">
              <b>Pick at least 2 services</b>
              <span>Choose the services your pet usually gets, like Full Service and Minor Service, and your plan appears here.</span>
            </div>
          ) : (
            <Result key={`${shown.id}`} p={shown} st={st} rec={rec} onBack={() => setPick(null)} onAlt={(id) => setPick(id)} />
          )}
        </div>
      </div>

      <div className="pf-all">
        <div className="pf-all-head">
          <h3>All 10 plans</h3>
          <p>Per pet, at our centre, for a {SIZE_WORD[st.size]} pet. Tap a plan to see it in your quote.</p>
        </div>
        <div className="pf-cards">
          {PLANS.map((p) => {
            const pr = priceFor(p, st.size);
            const off = Math.round((1 - pr / listPrice(p, st.size)) * 100);
            const isMatch = rec?.main.id === p.id;
            return (
              <button key={p.id} type="button" className={`pf-card${shown?.id === p.id ? ' on' : ''}`} onClick={() => choose(p.id)}>
                {(isMatch || p.tag) && <span className={`pf-tag${isMatch ? ' match' : ''}`}>{isMatch ? 'Your match' : p.tag}</span>}
                <span className="pf-card-top"><b>{p.n}</b><span>{p.m} months</span></span>
                <span className="pf-card-mix">{mix(p)}{Object.keys(p.a).length ? ' + ' + entries(p.a).map(([k]) => ADD[k].n.toLowerCase()).join(', ') : ''}</span>
                <span className="pf-card-price">{inr(pr)}<small>{off}% off</small></span>
              </button>
            );
          })}
        </div>
        <p className="pf-foot">Savings compare each plan with paying our rate card for the same visits and included add-ons. Vet skin checks are a bonus and aren&rsquo;t counted. Home visits are ₹300 per pet per visit, paid with the plan. Each extra pet gets 10% off its plan. Plans are prepaid and stay with the pet they were bought for.</p>
      </div>
    </div>
  );
}

function Result({ p, st, rec, onBack, onAlt }: {
  p: Plan; st: State; rec: ReturnType<typeof recommend> | null; onBack: () => void; onAlt: (id: string) => void;
}) {
  const reduce = useReducedMotion();
  // Remounts per plan (keyed), so this lifts in only when the plan changes.
  const pop = useSpring({ from: { o: 0, y: 12 }, to: { o: 1, y: 0 }, immediate: !!reduce, config: { tension: 260, friction: 24 } });
  const q = quote(p, st);
  const isMatch = rec?.main.id === p.id;
  const saved = q.each - q.plan;
  const items: [string, number][] = [
    ...entries(p.s).map(([k, v]) => [`${v} × ${svcName(k)}`, v * RATE[k][st.size]] as [string, number]),
    ...entries(p.a).map(([k, v]) => [`${v} × ${ADD[k].n}`, v * ADD[k].p] as [string, number]),
    ...(st.where === 'home' ? [[`${q.v} home visits`, q.v * HOME_VISIT] as [string, number]] : []),
  ];
  const msg = `Hi Mylopaws! I'd like the ${p.n} plan (${p.m} months) for ${st.pets} ${SIZE_WORD[st.size]} pet${st.pets > 1 ? 's' : ''}, ${st.where === 'home' ? 'at home' : 'at the HSR centre'}. Quoted ${inr(q.plan)}.`;
  const max = Math.max(q.plan, q.each);
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try { await navigator.clipboard.writeText(CONTACT.dermacare.phone); setCopied(true); setTimeout(() => setCopied(false), 1600); } catch {}
  };

  return (
    <animated.div className="pf-card-result" style={{ opacity: pop.o, transform: pop.y.to((y) => `translateY(${y}px)`) }}>
      <span className="pf-match">{isMatch ? 'Your best match' : 'Plan you picked'}</span>
      <div className="pf-title"><h3>{p.n}</h3><span className="pf-dur">{p.m} months</span></div>
      <p className="pf-why">{p.why}{isMatch && rec?.note ? ` ${rec.note}` : ''}</p>
      <ul className="pf-inc">
        {items.map(([a, b]) => <li key={a}><span>{a}</span><span>{inr(b)}</span></li>)}
        {p.vet > 0 && <li className="bonus"><span>{p.vet} vet skin &amp; fur check{p.vet > 1 ? 's' : ''}</span><span>Free</span></li>}
      </ul>
      <div className="pf-price">
        <div className="pf-big"><Num value={q.plan} /></div>
        <div className="pf-per">{st.pets > 1 ? `${st.pets} pets · ` : ''}{q.pv} visits · {inr(q.plan / q.pv)} per visit</div>
      </div>
      <div className="pf-save">
        <span>You save <Num value={saved} /> vs paying per visit</span>
        <b><Num value={(saved / q.each) * 100} fmt={(n) => `${Math.round(n)}%`} /></b>
      </div>
      <div className="pf-bars">
        <Bar label="This plan" value={q.plan} max={max} tone="plan" />
        <Bar label="Same visits, paid one at a time" value={q.each} max={max} tone="each" />
      </div>
      {rec && rec.main.id !== p.id ? (
        <div className="pf-alt"><span>Your best match is <b>{rec.main.n}</b></span><button type="button" onClick={onBack}>Show it</button></div>
      ) : rec ? (
        <div className="pf-alt"><span>Also fits: <b>{rec.alt.n}</b> · {rec.alt.m} months · {inr(priceFor(rec.alt, st.size))}</span><button type="button" onClick={() => onAlt(rec.alt.id)}>Compare</button></div>
      ) : null}
      <a className="btn btn-yellow pf-cta" href={waLink(CONTACT.dermacare.wa, msg)} target="_blank" rel="noopener"><WhatsApp size={18} /> Reserve this plan on WhatsApp</a>
      <div className="pf-wa"><span>{CONTACT.dermacare.phone}</span><button type="button" onClick={copy}>{copied ? 'Copied' : 'Copy'}</button></div>
    </animated.div>
  );
}
