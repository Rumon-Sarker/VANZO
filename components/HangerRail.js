'use client';
import Link from 'next/link';
import { motion, useAnimationControls, useReducedMotion } from 'framer-motion';
import { useEffect } from 'react';
import { discount } from '@/lib/products';
import { taka } from '@/lib/config';

function Hanger({ p, i }) {
  const reduce = useReducedMotion();
  const controls = useAnimationControls();

  useEffect(() => {
    if (reduce) { controls.set({ y: 0, rotate: 0 }); return; }
    // Page load: clothes slide onto the rail, then swing and settle
    controls.start({
      y: [-260, 0],
      rotate: [i % 2 ? 14 : -14, i % 2 ? -8 : 8, 4, -2, 0],
      transition: { delay: 0.15 + i * 0.12, duration: 1.6, times: [0, 0.35, 0.6, 0.8, 1], ease: 'easeOut' },
    });
  }, [controls, i, reduce]);

  const swing = () => {
    if (reduce) return;
    controls.start({ rotate: [0, 7, -5, 3, -1, 0], transition: { duration: 1.1, ease: 'easeOut' } });
  };

  return (
    <motion.div className="hanger" initial={{ y: -260 }} animate={controls} onHoverStart={swing} onFocus={swing} style={{ transformOrigin: '50% 0%' }}>
      {/* Hook: stem x=12 = svg center, tai triangle er apex er thik upore thake */}
      <svg className="hanger-hook" viewBox="0 0 24 26" aria-hidden="true">
        <path d="M12 26 V12 C12 8 17 8 17 4.5 C17 2 14.8 0.6 12 0.6 C9.2 0.6 7 2 7 4.5" />
      </svg>
      <div className="hanger-bar" />
      <Link href={`/product/${p.id}/`} className="hanger-card" style={{ display: 'block', position: 'relative' }}>
        {discount(p) > 0 && <span className="badge">-{discount(p)}%</span>}
        <img src={p.images[0]} alt={p.name} loading="eager" />
        <div className="hanger-info">
          <b>{p.name}</b>
          <div className="price">
            <span className="price-now" style={{ fontSize: 16 }}>{taka(p.price)}</span>
            <span className="price-old">{taka(p.oldPrice)}</span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default function HangerRail({ products }) {
  return (
    <div className="rail-zone">
      <div className="rail" aria-hidden="true" />
      <div className="hangers">
        {products.map((p, i) => <Hanger key={p.id} p={p} i={i} />)}
      </div>
    </div>
  );
}
