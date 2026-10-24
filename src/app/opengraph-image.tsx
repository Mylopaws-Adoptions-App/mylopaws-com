import { ImageResponse } from 'next/og';
import fs from 'node:fs';
import path from 'node:path';

export const alt = 'Mylopaws: create strong & tightly bonded pawfamilies. Travel, Dermacare, Homes and Shopping in Bangalore.';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const read = (p: string) => fs.readFileSync(path.join(process.cwd(), p));

export default function OgImage() {
  const wordmark = `data:image/svg+xml;base64,${read('public/mylopaws-wordmark-white.svg').toString('base64')}`;
  const chips: [string, string, string][] = [
    ['Travel', '#a4eae6', '#0d5450'],
    ['Dermacare', '#1fbf79', '#ffffff'],
    ['Homes', '#fee46b', '#3b2e00'],
    ['Shopping', '#f8eef3', '#681947'],
  ];
  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '64px 72px', background: '#681947', color: '#fff', fontFamily: 'Montserrat', position: 'relative' }}>
        <div style={{ position: 'absolute', right: -140, top: -160, width: 520, height: 520, borderRadius: 520, background: '#a4eae6', opacity: 0.25, display: 'flex' }} />
        <div style={{ position: 'absolute', right: 260, bottom: -120, width: 260, height: 260, borderRadius: 260, background: '#fee46b', opacity: 0.3, display: 'flex' }} />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={wordmark} width={330} height={61} alt="" />
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: 70, fontWeight: 800, lineHeight: 1.04, letterSpacing: -2 }}>Create strong &amp; tightly</div>
          <div style={{ fontSize: 70, fontWeight: 800, lineHeight: 1.04, letterSpacing: -2, display: 'flex' }}>
            bonded&nbsp;<span style={{ color: '#fee46b' }}>pawfamilies.</span>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
          {chips.map(([t, bg, fg]) => (
            <div key={t} style={{ display: 'flex', padding: '12px 22px', borderRadius: 12, background: bg, color: fg, fontSize: 28, fontWeight: 500 }}>{t}</div>
          ))}
          <div style={{ display: 'flex', marginLeft: 'auto', fontSize: 26, opacity: 0.85, fontWeight: 500 }}>Bangalore</div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: 'Montserrat', data: read('node_modules/@fontsource/montserrat/files/montserrat-latin-800-normal.woff'), weight: 800, style: 'normal' },
        { name: 'Montserrat', data: read('node_modules/@fontsource/montserrat/files/montserrat-latin-500-normal.woff'), weight: 500, style: 'normal' },
      ],
    },
  );
}
