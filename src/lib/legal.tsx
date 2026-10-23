import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { marked } from 'marked';
import { JsonLd, PageHero } from '@/components/Blocks';
import { breadcrumbSchema, meta } from './seo';
import { fmtDate, ymd } from './posts';

function read(slug: string) {
  const { data, content } = matter(fs.readFileSync(path.join(process.cwd(), 'content', 'legal', `${slug}.md`), 'utf8'));
  return { title: String(data.title), seoTitle: String(data.seoTitle), description: String(data.description), updated: ymd(data.updated), html: marked.parse(content) as string };
}

export const legalMeta = (slug: string) => {
  const d = read(slug);
  return meta({ title: d.seoTitle, description: d.description, path: `/${slug}/` });
};

export function LegalPage({ slug }: { slug: string }) {
  const d = read(slug);
  return (
    <>
      <PageHero crumbs={[{ label: d.title }]} eyebrow="Policies" title={d.title} lead={`Last updated ${fmtDate(d.updated)}`} />
      <section className="section tight">
        <div className="wrap">
          <article className="prose" dangerouslySetInnerHTML={{ __html: d.html }} />
        </div>
      </section>
      <JsonLd data={breadcrumbSchema([{ name: d.title, path: `/${slug}/` }])} />
    </>
  );
}
