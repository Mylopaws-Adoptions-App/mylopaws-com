/**
 * Hero clips, served from /public/video (Vercel's CDN). Each clip has a wide (16:9, desktop)
 * and a tall (9:16, phones) cut, in MP4 and WebM, plus a poster frame.
 * `sol` links a clip to a solution tab (hovering that tab plays it); null = brand clip.
 *
 * To add a clip: send the source video; it is trimmed, cropped and compressed to
 * public/video/<name>-wide|tall.(mp4|webm|jpg), then listed here.
 */
export type Clip = { name: string; sol: string | null; alt: string };

export const HERO_CLIPS: Clip[] = [
  { name: 'bond', sol: null, alt: 'A pet parent cuddling her fluffy white dog' },
  { name: 'travel', sol: 'travel', alt: 'A happy dog looking out of a car window at sunset' },
  { name: 'shopping', sol: 'shopping', alt: 'A pug waiting by a bowl of food on the table' },
];

export const clipSrc = (name: string, cut: 'wide' | 'tall', ext: 'mp4' | 'webm' | 'jpg') => `/video/${name}-${cut}.${ext}`;
