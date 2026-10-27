import Link from 'next/link';
import { notFound } from 'next/navigation';
import ProductView from '@/components/ProductView';
import ProductCard from '@/components/ProductCard';
import { PRODUCTS, getCategory, getProduct } from '@/lib/products';
import { SITE } from '@/lib/config';
import { CONTENT } from '@/lib/content';

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ id: p.id }));
}
export function generateMetadata({ params }) {
  const p = getProduct(params.id);
  if (!p) return {};
  const desc = `${p.name} — মাত্র ৳${p.price} (আগে ৳${p.oldPrice})। ${p.details}`;
  return {
    title: p.name,
    description: desc,
    openGraph: { title: `${p.name} — ৳${p.price}`, description: desc, images: [{ url: p.images[0] }] },
  };
}

export default function ProductPage({ params }) {
  const p = getProduct(params.id);
  if (!p) notFound();
  const cat = getCategory(p.category);
  const related = PRODUCTS.filter((x) => x.id !== p.id && x.category === p.category).concat(
    PRODUCTS.filter((x) => x.id !== p.id && x.category !== p.category)
  ).slice(0, 4);
  const jsonLd = {
    '@context': 'https://schema.org', '@type': 'Product', name: p.name, image: SITE.url + p.images[0], description: p.details,
    offers: { '@type': 'Offer', priceCurrency: 'BDT', price: p.price, availability: p.inStock ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock' },
  };
  return (
    <div className="wrap">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="crumbs"><Link href="/">হোম</Link> / {cat && <><Link href={`/category/${cat.slug}/`}>{cat.name}</Link> / </>}{p.name}</div>
      <ProductView p={p} />
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="section-head"><h2 className="h2">{CONTENT.sections.related}</h2></div>
        <div className="grid">{related.map((r) => <ProductCard key={r.id} p={r} />)}</div>
      </section>
    </div>
  );
}
