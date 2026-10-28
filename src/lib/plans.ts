// Dermacare prepaid plans. One place for the rate card, the 10 plans and the matching logic.
// Prices are per pet, at the HSR Layout centre. Change numbers here, not in the widget.

export type Size = 'S' | 'M' | 'L';
export type SvcKey = 'Spa' | 'Minor' | 'Full';
export type AddKey = 'anal' | 'med' | 'neem' | 'tick' | 'deworm';
export type NeedKey = 'skin' | 'tick' | 'anal';

export const RATE: Record<SvcKey, Record<Size, number>> = {
  Spa: { S: 999, M: 1099, L: 1199 },
  Minor: { S: 1299, M: 1399, L: 1499 },
  Full: { S: 1799, M: 1899, L: 1999 },
};

export const ADD: Record<AddKey, { n: string; p: number }> = {
  anal: { n: 'Anal gland care', p: 300 },
  med: { n: 'Medicated bath', p: 350 },
  neem: { n: 'Neem therapy', p: 699 },
  tick: { n: 'Tick & flea (Spot-On)', p: 500 },
  deworm: { n: 'Deworming', p: 300 },
};

export const HOME_VISIT = 300;
export const EXTRA_PET_OFF = 0.1;

export const SVC: { k: SvcKey; n: string; d: string }[] = [
  { k: 'Spa', n: 'Spa Bath', d: 'Bath, de-shedding, blow dry, nails, ears' },
  { k: 'Minor', n: 'Minor Service', d: 'Spa + paws, belly, sanitary, face trim' },
  { k: 'Full', n: 'Full Service', d: 'Complete makeover: full trim, teeth, styling' },
];

export const NEEDS: { k: NeedKey; n: string }[] = [
  { k: 'skin', n: 'Itchy or sensitive skin' },
  { k: 'tick', n: 'Ticks & fleas' },
  { k: 'anal', n: 'Anal gland care' },
];

export type Plan = {
  id: string;
  n: string;
  m: 6 | 12;
  s: Partial<Record<SvcKey, number>>;
  a: Partial<Record<AddKey, number>>;
  vet: number;
  price: number; // Small pet, centre, 1 pet
  tag?: string;
  why: string;
};

export const PLANS: Plan[] = [
  { id: 'tt6', n: 'Coat Revival', m: 6, s: { Full: 2, Minor: 2 }, a: {}, vet: 0, price: 4999, why: 'Pets on a Full + Minor routine usually come in every 6 weeks, alternating a full makeover with a tidy-up.' },
  { id: 'tt12', n: 'Coat Revival Year', m: 12, s: { Full: 4, Minor: 4 }, a: { anal: 8 }, vet: 2, price: 10999, tag: 'Most popular routine', why: 'Our most loyal regulars mix Full and Minor services every 6 weeks. This locks that in for a year, with anal gland care at every visit.' },
  { id: 'fc6', n: 'Dermacare Shine', m: 6, s: { Full: 2, Spa: 4 }, a: {}, vet: 1, price: 6299, why: 'A full makeover every 3 months with a spa bath in between keeps long fur clean without over-trimming.' },
  { id: 'sig', n: 'Dermacare Shine Signature', m: 12, s: { Full: 8, Spa: 4 }, a: { anal: 12 }, vet: 4, price: 14999, tag: 'Best value', why: 'One visit a month: makeovers for the fur, spa baths between them, and a quarterly skin check by our vet.' },
  { id: 'bt6', n: 'Herbal Maintenance', m: 6, s: { Minor: 4, Spa: 4 }, a: {}, vet: 0, price: 7299, why: 'Pets on a Minor + Spa routine come in about every 3 weeks. This plan matches that pace.' },
  { id: 'bt12', n: 'Herbal Maintenance Year', m: 12, s: { Minor: 8, Spa: 8 }, a: { anal: 8 }, vet: 2, price: 14999, why: 'Sixteen visits, one every 3 weeks, for short-haired and low-shed pets that need to stay fresh.' },
  { id: 'sr6', n: 'Skin Relief', m: 6, s: { Minor: 3, Spa: 3 }, a: { med: 6, neem: 2 }, vet: 2, price: 7999, tag: 'Dermacare', why: 'Medicated bath is our most-added service. Every visit here includes one, plus neem therapy and two vet reviews of the skin.' },
  { id: 'srp6', n: 'Skin Recovery', m: 6, s: { Full: 3, Spa: 3 }, a: { med: 6, neem: 3 }, vet: 3, price: 9499, tag: 'Dermacare', why: 'For long fur with skin trouble: makeovers and spa baths, all medicated, with neem therapy and a vet review every other visit.' },
  { id: 'tf6', n: 'Tick & Flea Protection', m: 6, s: { Full: 2, Spa: 4 }, a: { tick: 6, deworm: 2 }, vet: 0, price: 8499, tag: 'Dermacare', why: 'Spot-On at every visit and two dewormings, so protection never lapses between grooms.' },
  { id: 'all', n: 'Complete Dermacare Year', m: 12, s: { Full: 4, Minor: 4, Spa: 4 }, a: { anal: 12, med: 4 }, vet: 4, price: 15999, why: 'All three services in one rotation: a makeover, a tidy-up and a spa bath each quarter, with anal gland care every visit.' },
];

const entries = <K extends string>(o: Partial<Record<K, number>>) => Object.entries(o) as [K, number][];
const r49 = (n: number) => Math.round((n + 1) / 50) * 50 - 1;
const svcList = (p: Plan, size: Size) => entries(p.s).reduce((t, [k, v]) => t + v * RATE[k][size], 0);
const addList = (p: Plan) => entries(p.a).reduce((t, [k, v]) => t + v * ADD[k].p, 0);

export const listPrice = (p: Plan, size: Size) => svcList(p, size) + addList(p);
export const priceFor = (p: Plan, size: Size) => (size === 'S' ? p.price : r49(p.price + ((svcList(p, size) - svcList(p, 'S')) * p.price) / listPrice(p, 'S')));
export const visits = (p: Plan) => Object.values(p.s).reduce((a, b) => a + (b ?? 0), 0);
export const planById = (id: string) => PLANS.find((p) => p.id === id)!;
export const mix = (p: Plan) => entries(p.s).map(([k, v]) => `${v} ${k}`).join(' + ');
export const svcName = (k: SvcKey) => SVC.find((s) => s.k === k)!.n;
export { entries };

export type Term = '6' | '12';
export type Where = 'centre' | 'home';

/** Which plan fits each length for a routine. A length with no plan is null (not offered). */
function family(sel: SvcKey[], needs: NeedKey[]): Record<Term, string | null> & { reason?: string } {
  const has = (k: SvcKey) => sel.includes(k);
  const set = (['Full', 'Minor', 'Spa'] as SvcKey[]).filter(has).join('+');
  if (needs.includes('skin')) return { 6: has('Full') ? 'srp6' : 'sr6', 12: null, reason: 'Skin plans run 6 months, so our vet can review progress before you renew.' };
  if (needs.includes('tick')) return { 6: 'tf6', 12: null, reason: 'Tick & Flea Protection runs 6 months to cover the main tick season. Renew it if you need a full year.' };
  if (set === 'Full+Minor+Spa') return { 6: null, 12: 'all', reason: 'All three services work as a 12-month rotation.' };
  const map: Record<string, Record<Term, string>> = { 'Full+Minor': { 6: 'tt6', 12: 'tt12' }, 'Full+Spa': { 6: 'fc6', 12: 'sig' }, 'Minor+Spa': { 6: 'bt6', 12: 'bt12' } };
  return map[set];
}

export function recommend(sel: SvcKey[], needs: NeedKey[], term: Term) {
  const fam = family(sel, needs);
  const offered = (['6', '12'] as Term[]).filter((t) => fam[t]);
  // Use the length asked for when it is offered; otherwise the only length this routine comes in.
  const effTerm: Term = fam[term] ? term : offered[0];
  const id = fam[effTerm]!;
  const main = planById(id);
  const pair: Record<string, string> = { tt6: 'tt12', tt12: 'tt6', fc6: 'sig', sig: 'fc6', bt6: 'bt12', bt12: 'bt6', sr6: 'bt6', srp6: 'fc6', tf6: 'fc6', all: 'sig' };
  const note = needs.includes('anal') && !main.a.anal ? 'Anal gland care is ₹300 a visit on this plan; the 12-month plans include it.' : '';
  const lock = offered.length === 1 ? { term: offered[0], reason: fam.reason ?? '' } : null;
  return { main, alt: planById(pair[id]), note, lock, asked: term, honoured: effTerm === term };
}

export function quote(p: Plan, st: { size: Size; where: Where; pets: number }) {
  const home = st.where === 'home';
  const v = visits(p);
  let plan = 0;
  for (let i = 0; i < st.pets; i++) plan += Math.round(priceFor(p, st.size) * (i ? 1 - EXTRA_PET_OFF : 1));
  if (home) plan += v * HOME_VISIT * st.pets;
  const each = (listPrice(p, st.size) + (home ? v * HOME_VISIT : 0)) * st.pets;
  return { plan, each, v, pv: v * st.pets };
}

export const inr = (n: number) => '₹' + Math.round(n).toLocaleString('en-IN');
