'use client';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { maxDiscount } from '@/lib/products';
import { CONTENT, fill } from '@/lib/content';

export default function OfferPopup() {
  const max = maxDiscount();
  const { offer } = CONTENT;
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (max <= 0) return; // 0% hole kokhono dekhabe na
    let seen = false;
    try { seen = sessionStorage.getItem('vanzo-offer') === '1'; } catch {}
    if (seen) return;
    const t = setTimeout(() => setShow(true), (offer.delaySeconds ?? 6) * 1000);
    return () => clearTimeout(t);
  }, [max, offer.delaySeconds]);

  const close = () => {
    setShow(false);
    try { sessionStorage.setItem('vanzo-offer', '1'); } catch {}
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div className="offer" role="status" initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 40, opacity: 0 }}>
          <button className="x" onClick={close} aria-label="বন্ধ করুন">×</button>
          <b>{fill(offer.title)}</b>
          <p>{fill(offer.text)}</p>
          <a className="btn btn-primary" href="/#shop" onClick={close}>{offer.button}</a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
