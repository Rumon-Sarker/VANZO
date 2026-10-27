import Link from 'next/link';
import HangerRail from '@/components/HangerRail';
import Marquee from '@/components/Marquee';
import ShopGrid from '@/components/ShopGrid';
import InfoSection from '@/components/InfoSection';
import { CATEGORIES, PRODUCTS, byCategory, discount, getProduct } from '@/lib/products';
import { SITE, taka } from '@/lib/config';
import { CONTENT, fill } from '@/lib/content';

export default function Home() {
  const trending = PRODUCTS.filter((p) => p.trending);
  const { hero, trust, sections } = CONTENT;
  // Hero collage: content.json er hero.featured (product id) — na thakle prothom 3ta non-trending product
  const featured = (hero.featured?.length ? hero.featured.map(getProduct).filter(Boolean) : PRODUCTS.filter((p) => !p.trending)).slice(0, 3);
  return (
    <>
      <section className="hero">
        <div className="wrap hero-grid">
          <div className="hero-copy">
            <span className="eyebrow">{fill(hero.eyebrow)}</span>
            <h1 className="hero-title">
              {fill(hero.headline).split('\n').map((line, i) => <span key={i}>{line}</span>)}
            </h1>
            <p className="hero-text">{fill(hero.text)}</p>
            <div className="hero-cta">
              <a href="#shop" className="btn btn-ink">{hero.button}</a>
              <a href={`https://wa.me/${SITE.whatsapp}`} target="_blank" rel="noopener" className="btn btn-ghost">{hero.secondaryButton}</a>
            </div>
            <ul className="hero-points">
              {hero.points.map((pt, i) => <li key={i}>{fill(pt)}</li>)}
            </ul>
          </div>
          {featured.length > 0 && (
            <div className="hero-visual">
              {featured.map((p, i) => (
                <Link key={p.id} href={`/product/${p.id}/`} className={`hv-item${i === 0 ? ' hv-main' : ''}`}>
                  <img src={p.images[0]} alt={p.name} loading="eager" />
                  {discount(p) > 0 && <span className="badge">-{discount(p)}%</span>}
                  {i === 0 && (
                    <span className="hv-chip">
                      <b>{p.name}</b>
                      <span className="price-now">{taka(p.price)}</span>
                    </span>
                  )}
                </Link>
              ))}
            </div>
          )}
        </div>
        {trending.length > 0 && (
          <>
            <div className="wrap rail-title">{hero.railTitle}</div>
            <HangerRail products={trending} />
          </>
        )}
      </section>

      <Marquee />

      <section className="trust wrap" aria-label={`কেন ${SITE.name}`}>
        {trust.map((t, i) => (
          <div key={i}><b>{fill(t.title)}</b><span>{fill(t.text)}</span></div>
        ))}
      </section>

      <section className="section">
        <div className="wrap">
          <div className="section-head"><h2 className="h2">{sections.categories}</h2></div>
          <div className="cats">
            {CATEGORIES.map((c) => {
              const items = byCategory(c.slug);
              return (
                <Link key={c.slug} href={`/category/${c.slug}/`} className="cat">
                  {items[0]?.images[0] && <img src={items[0].images[0]} alt="" loading="lazy" />}
                  <div className="cat-label"><b>{c.name}</b><small>{items.length}টি</small></div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section" id="shop" style={{ paddingTop: 0 }}>
        <div className="wrap"><ShopGrid /></div>
      </section>

      <InfoSection />
    </>
  );
}
