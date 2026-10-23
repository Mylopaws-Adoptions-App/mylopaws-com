# mylopaws.com

The marketing site for Mylopaws: Travel, Dermacare, Homes, the pet pharmacy and the Pawprints blog.
Next.js 15 (App Router) on Vercel. It replaces the hacked WordPress site, with no WordPress, plugins or PHP left to attack.

## What's in it

| Area | Where |
| --- | --- |
| Site facts (phones, hours, address, app link, analytics IDs) | `src/lib/site.ts` |
| 12 Dermacare therapies (no protocol steps, on purpose) | `src/lib/therapies.ts` |
| 4 Travel services | `src/lib/travel.ts` |
| Pawprints posts (Markdown + frontmatter) | `content/posts/*.md` |
| Policies (privacy, terms, refunds, delivery, data deletion) | `content/legal/*.md` |
| Old WordPress URLs → new URLs (301/308) | `next.config.mjs` |
| Design tokens and all styles | `src/app/globals.css` |
| Forms → Supabase `website_submissions` (+ CVs in bucket `careers-cv`) | `src/app/api/submit/route.ts` |
| Shop catalogue, live from Supabase `shop_products`, refreshed hourly | `src/app/shopping/page.tsx` |

Every old crawled URL keeps working: therapy pages, travel pages and posts all live at `/<slug>/` (served by `src/app/[slug]/page.tsx`), and legacy paths such as `/blog/` redirect.

## Brand rules baked in

- Palette: magenta `#691A47`, dark blue `#413a5e`, yellow `#efca58`. Fraunces (display) + Poppins (body), self-hosted.
- Every booking CTA goes to `www.mylopaws.app`.
- No service prices on the site; therapy protocols are teased, never step-by-step.
- Terminology: Dermacare, Skin & Fur, Homes. Brand-led, no founder.

## Add a blog post

Create `content/posts/<slug>.md`:

```md
---
title: "Post title"
seoTitle: "Title for Google, 30–65 characters"
description: "Meta description, under 155 characters."
excerpt: "One-line card summary."
date: 2026-11-01
category: travel        # travel | skin-fur-care | new-pet-parent
faq:                    # optional, renders + FAQ schema
  - q: "Question?"
    a: "Answer."
---

Body in Markdown. Link internally with /slug/ paths.
```

Push to `main` and Vercel deploys it. The sitemap updates itself.

## Add photos

Pages show branded panels where photos go. Drop images in `public/images/` and pass `src="/images/name.jpg"` to the `<Slot>` on that page.

## Run locally

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build + type check
```

## Environment variables (optional, set in Vercel)

| Name | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SHOP_WHATSAPP` | Shop WhatsApp number (digits, with country code) for "Order on WhatsApp" buttons. Without it, those buttons go to the app. |
| `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Override the defaults in `site.ts` (public keys; data is protected by row-level security). |

No secrets are needed to run this site.

## Where form submissions go

Supabase project `sbajixyhyyjpgkxrhltc` → table `website_submissions` (`kind` = contact, careers or sitter_listing). The public key can only insert, never read. CVs are in the private storage bucket `careers-cv`.
