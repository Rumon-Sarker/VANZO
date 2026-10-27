// ===== Site er lekha (hero, info, terms, size chart...) data/content.json e =====
import content from '@/data/content.json';
import { SITE, taka } from './config';
import { maxDiscount } from './products';

export const CONTENT = content;

const VARS = {
  exchangeDays: SITE.exchangeDays,
  deliveryDays: SITE.deliveryDays,
  bkash: SITE.bkash,
  maxDiscount: maxDiscount(),
  insideLabel: SITE.delivery.inside.label,
  insideCharge: taka(SITE.delivery.inside.charge),
  outsideLabel: SITE.delivery.outside.label,
  outsideCharge: taka(SITE.delivery.outside.charge),
};

// "{key}" placeholder gula VARS er value diye replace kore
export const fill = (s) => String(s).replace(/\{(\w+)\}/g, (m, k) => (k in VARS ? VARS[k] : m));

// fill() + "**bold**" -> <b>
export const rich = (s) =>
  fill(s).split(/\*\*(.+?)\*\*/g).map((part, i) => (i % 2 ? <b key={i}>{part}</b> : part));
