import Link from 'next/link';
import { notFound } from 'next/navigation';
import ProductCard from '@/components/ProductCard';
import { CATEGORIES, byCategory, getCategory } from '@/lib/products';

export function generateStaticParams() {
  return CATEGORIES.map((c) => ({ slug: c.slug }));
}
export function generateMetadata({ params }) {
  const c = getCategory(params.slug);
  return c ? { title: `${c.name} (${c.bn})`, description: `Vanzo-র সব ${c.bn} অফার দামে।` } : {};
}

export default function CategoryPage({ params }) {
  const c = getCategory(params.slug);
  if (!c) notFound();
  const items = byCategory(c.slug);
  return (
    <div className="wrap">
      <div className="crumbs"><Link href="/">হোম</Link> / {c.name}</div>
      <section className="section" style={{ paddingTop: 24 }}>
        <div className="section-head">
          <div>
            <h1 className="h2">{c.name}</h1>
            <p className="lead">{items.length}টি প্রোডাক্ট</p>
          </div>
        </div>
        {items.length ? (
          <div className="grid">{items.map((p) => <ProductCard key={p.id} p={p} />)}</div>
        ) : (
          <p className="lead">এই ক্যাটাগরিতে নতুন প্রোডাক্ট শিগগিরই আসছে। <Link href="/#shop" style={{ textDecoration: 'underline' }}>অন্য প্রোডাক্ট দেখুন</Link></p>
        )}
      </section>
    </div>
  );
}
