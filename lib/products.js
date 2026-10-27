// ===== Product, category, size ekhon data/products.json e =====
// Real chobi public/products folder e rekhe "images" path change koro (jpg/png/webp sob cholbe).
// Ekhon er chobi gula Unsplash stock photo — nijer product er chobi diye bodle niben.
import data from '@/data/products.json';

export const SIZES = data.sizes;
export const CATEGORIES = data.categories;
export const PRODUCTS = data.products.map((p) => ({ inStock: true, trending: false, images: [], ...p }));

export const discount = (p) =>
  p.oldPrice > p.price ? Math.round(((p.oldPrice - p.price) / p.oldPrice) * 100) : 0;
export const getProduct = (id) => PRODUCTS.find((p) => p.id === id);
export const getCategory = (slug) => CATEGORIES.find((c) => c.slug === slug);
export const byCategory = (slug) => PRODUCTS.filter((p) => p.category === slug);
export const sizesFor = (p) => SIZES[getCategory(p.category)?.sizeType || 'clothing'];
export const maxDiscount = () => Math.max(0, ...PRODUCTS.map(discount));
