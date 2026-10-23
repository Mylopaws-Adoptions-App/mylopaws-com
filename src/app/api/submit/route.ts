import { NextResponse } from 'next/server';
import { SUPABASE } from '@/lib/site';

// Forms → Supabase table website_submissions (anon may INSERT only; RLS). CVs → private bucket careers-cv.
const KINDS = new Set(['contact', 'careers', 'sitter_listing']);
const CV_TYPES: Record<string, string> = {
  'application/pdf': 'pdf',
  'application/msword': 'doc',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'docx',
};
const hits = new Map<string, number[]>();

function limited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < 10 * 60_000);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > 5;
}
const clean = (v: FormDataEntryValue | null, max: number) => String(v ?? '').replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, '').trim().slice(0, max);
const bad = (error: string, status = 400) => NextResponse.json({ error }, { status });

export async function POST(req: Request) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
  if (limited(ip)) return bad('Too many submissions. Please try again in a few minutes.', 429);

  let fd: FormData;
  try { fd = await req.formData(); } catch { return bad('Invalid form.'); }

  // Bots: honeypot filled, or submitted faster than a person can type.
  if (clean(fd.get('website'), 200) || Number(fd.get('elapsed') ?? 0) < 2500) return NextResponse.json({ ok: true });

  const kind = clean(fd.get('kind'), 20);
  const name = clean(fd.get('name'), 120);
  const phone = clean(fd.get('phone'), 20);
  const email = clean(fd.get('email'), 200) || null;
  const topic = clean(fd.get('topic'), 120) || null;
  const message = clean(fd.get('message'), 4000);
  const page = clean(fd.get('page'), 200) || null;

  if (!KINDS.has(kind)) return bad('Invalid form.');
  if (name.length < 2) return bad('Please enter your name.');
  if (!/^\+?[0-9 ()-]{8,20}$/.test(phone)) return bad('Please enter a valid phone number.');
  if (email && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return bad('Please enter a valid email.');
  if (kind === 'careers' && !email) return bad('Please enter your email.');
  if (!message) return bad('Please add a short message.');

  const headers = { apikey: SUPABASE.anonKey, Authorization: `Bearer ${SUPABASE.anonKey}` };

  let cv_path: string | null = null;
  const cv = fd.get('cv');
  if (kind === 'careers' && cv instanceof File && cv.size > 0) {
    const ext = CV_TYPES[cv.type];
    if (!ext) return bad('CV must be a PDF or Word file.');
    if (cv.size > 5 * 1024 * 1024) return bad('CV must be under 5 MB.');
    cv_path = `cv/${new Date().toISOString().slice(0, 10)}/${crypto.randomUUID()}.${ext}`;
    const up = await fetch(`${SUPABASE.url}/storage/v1/object/careers-cv/${cv_path}`, {
      method: 'POST',
      headers: { ...headers, 'Content-Type': cv.type, 'x-upsert': 'false' },
      body: Buffer.from(await cv.arrayBuffer()),
      signal: AbortSignal.timeout(20000),
    }).catch(() => null);
    if (!up?.ok) return bad('Could not upload your CV. Please try again, or apply without it.', 502);
  }

  const res = await fetch(`${SUPABASE.url}/rest/v1/website_submissions`, {
    method: 'POST',
    headers: { ...headers, 'Content-Type': 'application/json', Prefer: 'return=minimal' },
    body: JSON.stringify({ kind, name, phone, email, topic, message, cv_path, page }),
    signal: AbortSignal.timeout(15000),
  }).catch(() => null);
  if (!res?.ok) return bad('Could not send right now. Please try again or reach us on WhatsApp.', 502);
  return NextResponse.json({ ok: true });
}
