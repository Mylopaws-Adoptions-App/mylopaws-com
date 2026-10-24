import { SUPABASE } from './site';

/**
 * Hero clips, one per solution, served from the public Supabase "Video Assets" bucket.
 * To add or swap a clip: upload a short (6-12 s), muted, landscape MP4 (720p, under ~5 MB)
 * to that bucket and put its file name here. Missing files are skipped automatically.
 */
export const HERO_CLIPS = [
  { sol: 'travel', file: 'hero-travel.mp4' },
  { sol: 'dermacare', file: 'MDC Facility Video (Facebook Video).mp4' },
  { sol: 'homes', file: 'hero-homes.mp4' },
  { sol: 'shopping', file: 'hero-shopping.mp4' },
] as const;

export type Clip = { sol: string; src: string };

const videoUrl = (file: string) => `${SUPABASE.url}/storage/v1/object/public/Video%20Assets/${encodeURIComponent(file)}`;

/** Returns only the clips that actually exist in the bucket (checked hourly). */
export async function heroClips(): Promise<Clip[]> {
  // Local testing only: HERO_FIXTURE="travel:/x.mp4,dermacare:/y.mp4" when Supabase isn't reachable.
  if (process.env.HERO_FIXTURE) return process.env.HERO_FIXTURE.split(',').map((p) => { const [sol, src] = p.split(':'); return { sol, src }; });
  const checks = await Promise.all(
    HERO_CLIPS.map(async (c) => {
      const src = videoUrl(c.file);
      try {
        const r = await fetch(src, { method: 'HEAD', next: { revalidate: 3600 } });
        return r.ok ? ({ sol: c.sol as string, src } as Clip) : null;
      } catch {
        return null;
      }
    }),
  );
  return checks.filter((c): c is Clip => c !== null);
}
