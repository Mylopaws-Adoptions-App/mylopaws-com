'use client';

import { useState, type FormEvent } from 'react';

type Kind = 'contact' | 'careers' | 'sitter_listing';

export function LeadForm({ kind, topics, withCv, cta = 'Send' }: { kind: Kind; topics?: string[]; withCv?: boolean; cta?: string }) {
  const [state, setState] = useState<'idle' | 'sending' | 'ok' | 'err'>('idle');
  const [err, setErr] = useState('');
  const [started] = useState(() => Date.now());

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    fd.set('kind', kind);
    fd.set('elapsed', String(Date.now() - started));
    fd.set('page', window.location.pathname);
    setState('sending');
    setErr('');
    try {
      const res = await fetch('/api/submit/', { method: 'POST', body: fd });
      const j = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(j.error || 'Something went wrong. Please try again.');
      setState('ok');
      (e.target as HTMLFormElement).reset();
    } catch (x) {
      setErr((x as Error).message);
      setState('err');
    }
  }

  if (state === 'ok') {
    return <div className="notice ok" role="status">Thank you. We have your message and will get back to you on WhatsApp or email shortly.</div>;
  }

  return (
    <form className="form" onSubmit={onSubmit} noValidate={false}>
      <div className="grid grid-2">
        <div className="field">
          <label htmlFor={`${kind}-name`}>Your name</label>
          <input id={`${kind}-name`} name="name" required minLength={2} maxLength={120} autoComplete="name" />
        </div>
        <div className="field">
          <label htmlFor={`${kind}-phone`}>WhatsApp number</label>
          <input id={`${kind}-phone`} name="phone" type="tel" required pattern="[+0-9 ()\-]{8,20}" autoComplete="tel" placeholder="+91" />
        </div>
      </div>
      <div className="field">
        <label htmlFor={`${kind}-email`}>Email {kind === 'careers' ? '' : '(optional)'}</label>
        <input id={`${kind}-email`} name="email" type="email" required={kind === 'careers'} maxLength={200} autoComplete="email" />
      </div>
      {topics && (
        <div className="field">
          <label htmlFor={`${kind}-topic`}>{kind === 'careers' ? 'Role' : 'What is it about?'}</label>
          <select id={`${kind}-topic`} name="topic" required defaultValue="">
            <option value="" disabled>Choose one</option>
            {topics.map((t) => <option key={t}>{t}</option>)}
          </select>
        </div>
      )}
      <div className="field">
        <label htmlFor={`${kind}-message`}>{kind === 'careers' ? 'Tell us about yourself' : kind === 'sitter_listing' ? 'Your areas, pets you sit and experience' : 'Message'}</label>
        <textarea id={`${kind}-message`} name="message" rows={5} maxLength={4000} required />
      </div>
      {withCv && (
        <div className="field">
          <label htmlFor={`${kind}-cv`}>CV (PDF or Word, up to 5 MB, optional)</label>
          <input id={`${kind}-cv`} name="cv" type="file" accept=".pdf,.doc,.docx,application/pdf" />
        </div>
      )}
      <div className="hp" aria-hidden="true">
        <label>Leave this empty<input name="website" tabIndex={-1} autoComplete="off" /></label>
      </div>
      <p className="muted" style={{ fontSize: '0.85rem', margin: 0 }}>
        We use these details only to reply to you. See our <a href="/privacy-policy/">Privacy Policy</a>.
      </p>
      {state === 'err' && <div className="notice err" role="alert">{err}</div>}
      <div><button className="btn btn-primary" type="submit" disabled={state === 'sending'}>{state === 'sending' ? 'Sending…' : cta}</button></div>
    </form>
  );
}
