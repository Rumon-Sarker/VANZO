'use client';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useCart } from './CartProvider';
import { SITE, taka } from '@/lib/config';

const PHONE_RE = /^01[3-9]\d{8}$/;

export default function CartDrawer() {
  const { items, open, setOpen, setQty, remove, subtotal } = useCart();
  const [form, setForm] = useState({ name: '', phone: '', address: '', area: 'inside', pay: 'cod' });
  const [tried, setTried] = useState(false);

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = ''; };
  }, [open, setOpen]);

  const delivery = SITE.delivery[form.area].charge;
  const total = subtotal + (items.length ? delivery : 0);
  const phone = form.phone.replace(/[\s-]/g, '').replace(/^\+?88/, '');
  const errors = {
    name: !form.name.trim() && 'আপনার নাম লিখুন',
    phone: !PHONE_RE.test(phone) && '১১ ডিজিটের সঠিক মোবাইল নম্বর লিখুন (01XXXXXXXXX)',
    address: form.address.trim().length < 8 && 'পূর্ণ ঠিকানা লিখুন (গ্রাম/রোড, থানা, জেলা)',
  };
  const valid = !errors.name && !errors.phone && !errors.address;
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const send = () => {
    setTried(true);
    if (!valid || !items.length) return;
    const lines = items.map((i, n) => `${n + 1}. ${i.name} | সাইজ: ${i.size} | ${i.qty} পিস × ${taka(i.price)} = ${taka(i.qty * i.price)}`);
    const msg = [
      `*${SITE.name} — নতুন অর্ডার*`, '', ...lines, '',
      `সাবটোটাল: ${taka(subtotal)}`,
      `ডেলিভারি (${SITE.delivery[form.area].label}): ${taka(delivery)}`,
      `*মোট: ${taka(total)}*`, '',
      `নাম: ${form.name.trim()}`,
      `ফোন: ${phone}`,
      `ঠিকানা: ${form.address.trim()}`,
      `পেমেন্ট: ${form.pay === 'cod' ? 'ক্যাশ অন ডেলিভারি' : 'bKash / Nagad'}`,
    ].join('\n');
    window.open(`https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(msg)}`, '_blank', 'noopener');
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div className="overlay" onClick={() => setOpen(false)} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />
          <motion.aside className="drawer" role="dialog" aria-modal="true" aria-label="আপনার কার্ট"
            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', stiffness: 320, damping: 34 }}>
            <div className="drawer-head">
              <h2>আপনার কার্ট</h2>
              <button className="x" onClick={() => setOpen(false)} aria-label="বন্ধ করুন">×</button>
            </div>
            <div className="drawer-body">
              {!items.length ? (
                <div className="empty">
                  <p>কার্ট এখনো খালি।</p>
                  <button className="btn btn-ink" onClick={() => setOpen(false)}>প্রোডাক্ট দেখুন</button>
                </div>
              ) : (
                <>
                  <AnimatePresence initial={false}>
                    {items.map((i) => (
                      <motion.div key={i.key} className="line-item" layout exit={{ opacity: 0, x: 40 }}>
                        <img src={i.image} alt="" />
                        <div>
                          <b>{i.name}</b>
                          <small>সাইজ {i.size} · {taka(i.price)}</small>
                          <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginTop: 6 }}>
                            <div className="qty">
                              <button onClick={() => setQty(i.key, i.qty - 1)} aria-label="কমান">−</button>
                              <span>{i.qty}</span>
                              <button onClick={() => setQty(i.key, i.qty + 1)} aria-label="বাড়ান">+</button>
                            </div>
                            <button className="remove" onClick={() => remove(i.key)}>বাদ দিন</button>
                          </div>
                        </div>
                        <b>{taka(i.qty * i.price)}</b>
                      </motion.div>
                    ))}
                  </AnimatePresence>

                  <div className="form">
                    <h3>ডেলিভারির তথ্য</h3>
                    <input className="input" placeholder="আপনার নাম" value={form.name} onChange={set('name')} aria-label="নাম" />
                    {tried && errors.name && <p className="err">{errors.name}</p>}
                    <input className="input" placeholder="মোবাইল নম্বর (01XXXXXXXXX)" inputMode="tel" value={form.phone} onChange={set('phone')} aria-label="মোবাইল নম্বর" />
                    {tried && errors.phone && <p className="err">{errors.phone}</p>}
                    <textarea className="input" rows={2} placeholder="পূর্ণ ঠিকানা" value={form.address} onChange={set('address')} aria-label="ঠিকানা" />
                    {tried && errors.address && <p className="err">{errors.address}</p>}
                    <div className="radio-row" role="radiogroup" aria-label="ডেলিভারি এলাকা">
                      {Object.entries(SITE.delivery).map(([k, v]) => (
                        <label key={k} className="radio">
                          <input type="radio" name="area" value={k} checked={form.area === k} onChange={set('area')} />
                          <span>{v.label}</span><span className="amt">{taka(v.charge)}</span>
                        </label>
                      ))}
                    </div>
                    <div className="radio-row" role="radiogroup" aria-label="পেমেন্ট">
                      <label className="radio"><input type="radio" name="pay" value="cod" checked={form.pay === 'cod'} onChange={set('pay')} /><span>ক্যাশ অন ডেলিভারি</span></label>
                      <label className="radio"><input type="radio" name="pay" value="bkash" checked={form.pay === 'bkash'} onChange={set('pay')} /><span>bKash / Nagad (Send Money)</span></label>
                    </div>
                    {form.pay === 'bkash' && <p className="lead" style={{ fontSize: 15, margin: 0 }}>পেমেন্ট শুধু এই নম্বরে পাঠান: <b>{SITE.bkash}</b></p>}
                  </div>
                </>
              )}
            </div>
            {!!items.length && (
              <div className="drawer-foot">
                <div className="row"><span>সাবটোটাল</span><span>{taka(subtotal)}</span></div>
                <div className="row"><span>ডেলিভারি</span><span>{taka(delivery)}</span></div>
                <div className="row total"><span>মোট</span><span>{taka(total)}</span></div>
                <button className="btn btn-wa" onClick={send}>WhatsApp-এ অর্ডার পাঠান</button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
