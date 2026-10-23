import { ImageResponse } from 'next/og';

export const alt = 'Mylopaws: bringing solutions for pawfamilies. Travel. Dermacare. Homes.';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OgImage() {
  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: 72, background: 'linear-gradient(135deg, #691a47 0%, #413a5e 100%)', color: '#fff' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <div style={{ width: 72, height: 72, borderRadius: 36, background: '#efca58', display: 'flex' }} />
          <div style={{ fontSize: 56, fontStyle: 'italic', fontWeight: 700 }}>Mylopaws</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: 76, fontWeight: 700, lineHeight: 1.05 }}>Bringing solutions</div>
          <div style={{ fontSize: 76, fontWeight: 700, lineHeight: 1.05, color: '#efca58' }}>for pawfamilies.</div>
        </div>
        <div style={{ fontSize: 34, opacity: 0.9 }}>Travel · Dermacare · Homes · Bangalore</div>
      </div>
    ),
    size,
  );
}
