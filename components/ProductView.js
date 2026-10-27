'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useCart } from './CartProvider';
import SizeChart from './SizeChart';
import { discount, getCategory, sizesFor } from '@/lib/products';
import { SITE, taka } from '@/lib/config';
import { CONTENT, rich } from '@/lib/content';

export default function ProductView({ p }) {
  const { items, add, setOpen } = useCart();
  const [size, setSize] = useState(null);
  const [qty, setQty] = useState(1);
  const [err, setErr] = useState('');
  const [chart, setChart] = useState(false);
  const [added, setAdded] = useState(false);
  const d = discount(p);
  const cat = getCategory(p.category);

  const addToCart = (thenOpen) => {
    if (!size) { setErr('আগে সাইজ বেছে নিন'); return false; }
    // "Order now" after "Add to cart" (same size) shudhu cart khulbe, abar add korbe na
    const inCart = items.some((i) => i.key === `${p.id}__${size}`);
    if (thenOpen && inCart) { setOpen(true); return true; }
    add(p, size, qty);
    setAdded(true); setTimeout(() => setAdded(false), 1600);
    if (thenOpen) setOpen(true);
    return true;
  };

  return (
    <div className="pd">
      <div className="pd-img">
        {d > 0 && <span className="badge">-{d}%</span>}
        <img src={p.images[0]} alt={p.name} />
      </div>
      <div>
        <h1>{p.name}</h1>
        <div className="price">
          <span className="price-now">{taka(p.price)}</span>
          {p.oldPrice > p.price && <span className="price-old" style={{ fontSize: 18 }}>{taka(p.oldPrice)}</span>}
        </div>
        {d > 0 && <div className="save">আপনি বাঁচাচ্ছেন {taka(p.oldPrice - p.price)}</div>}
        <p className="pd-desc">{p.details}</p>

        {p.inStock ? (
          <>
            <div className="field-label">
              <span>সাইজ</span>
              <button className="link-btn" onClick={() => setChart(true)}>সাইজ চার্ট দেখুন</button>
            </div>
            <div className="sizes" role="group" aria-label="সাইজ">
              {sizesFor(p).map((s) => (
                <button key={s} className="size" aria-pressed={size === s} onClick={() => { setSize(s); setErr(''); }}>{s}</button>
              ))}
            </div>
            {err && <motion.p className="err" initial={{ x: -6 }} animate={{ x: [6, -4, 2, 0] }}>{err}</motion.p>}

            <div className="field-label"><span>পরিমাণ</span></div>
            <div className="qty">
              <button onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="কমান">−</button>
              <span>{qty}</span>
              <button onClick={() => setQty((q) => q + 1)} aria-label="বাড়ান">+</button>
            </div>

            <div className="pd-actions">
              <button className="btn btn-ghost" onClick={() => addToCart(false)}>{added ? 'কার্টে যোগ হয়েছে ✓' : 'কার্টে যোগ করুন'}</button>
              <button className="btn btn-ink" onClick={() => addToCart(true)}>এখনই অর্ডার করুন</button>
            </div>
          </>
        ) : (
          <div className="pd-actions">
            <a className="btn btn-ink" href={`https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(`${p.name} আবার কবে স্টকে আসবে?`)}`} target="_blank" rel="noopener">স্টক শেষ — কবে আসবে জিজ্ঞেস করুন</a>
          </div>
        )}

        <ul className="pd-notes">
          {CONTENT.productNotes.map((n, i) => <li key={i}>{rich(n)}</li>)}
        </ul>
      </div>
      <SizeChart open={chart} onClose={() => setChart(false)} type={cat?.sizeType} />
    </div>
  );
}
