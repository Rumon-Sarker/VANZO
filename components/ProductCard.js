import Link from 'next/link';
import { discount } from '@/lib/products';
import { taka } from '@/lib/config';

export default function ProductCard({ p }) {
  const d = discount(p);
  return (
    <Link href={`/product/${p.id}/`} className={`card ${p.inStock ? '' : 'card-out'}`}>
      <div className="card-img">
        {d > 0 && <span className="badge">-{d}%</span>}
        {!p.inStock && <span className="badge badge-out">স্টক শেষ</span>}
        <img src={p.images[0]} alt={p.name} loading="lazy" />
      </div>
      <div className="card-name">{p.name}</div>
      <div className="price">
        <span className="price-now">{taka(p.price)}</span>
        {p.oldPrice > p.price && <span className="price-old">{taka(p.oldPrice)}</span>}
      </div>
    </Link>
  );
}
