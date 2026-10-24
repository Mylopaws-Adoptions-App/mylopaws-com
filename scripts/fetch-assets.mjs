// Pulls brand photos and the logo from the public Supabase "Image Assets" bucket at build time,
// resizes them to web-friendly WebP and writes them to public/images/. Failure is never fatal:
// pages fall back to branded panels when an image is missing.
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const BASE = (process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://sbajixyhyyjpgkxrhltc.supabase.co') + '/storage/v1/object/public/Image%20Assets/';
const OUT = path.join(process.cwd(), 'public', 'images');

const PHOTOS = {
  'vet-dog': 'A vet with a dog.jpeg',
  'vet-cat': 'A vet inspecting a cat.jpeg',
  'travel-hiker': 'Hiker with two dogs in natural surroundings.jpeg',
  'travel-air': 'Air Travel.jpeg',
  'cat-dog-sleeping': 'A dog and a cat sleeping close to each other.jpeg',
  'pawfamily': 'Pawfamily_Cute.jpeg',
};
const LOGO = { 'mylopaws-logo': 'Mylopaws Transparent Logo.png' };

fs.mkdirSync(OUT, { recursive: true });

async function get(name) {
  const res = await fetch(BASE + encodeURIComponent(name), { signal: AbortSignal.timeout(60000) });
  if (!res.ok) throw new Error(`${res.status} ${name}`);
  return Buffer.from(await res.arrayBuffer());
}

let ok = 0, fail = 0;
for (const [slug, file] of Object.entries(PHOTOS)) {
  const dest = path.join(OUT, `${slug}.webp`);
  if (fs.existsSync(dest)) { ok++; continue; }
  try {
    const buf = await get(file);
    await sharp(buf).rotate().resize({ width: 1400, withoutEnlargement: true }).webp({ quality: 78 }).toFile(dest);
    ok++;
  } catch (e) { fail++; console.warn('[assets] skipped', slug, '-', e.message); }
}
for (const [slug, file] of Object.entries(LOGO)) {
  const dest = path.join(OUT, `${slug}.png`);
  if (fs.existsSync(dest)) { ok++; continue; }
  try { fs.writeFileSync(dest, await get(file)); ok++; } catch (e) { fail++; console.warn('[assets] skipped', slug, '-', e.message); }
}
console.log(`[assets] ${ok} ready, ${fail} skipped`);
