# Vanzo — Next.js Shop

## Chalano (local)
```
npm install
npm run dev
```
Browser e http://localhost:3000 kholo.

## Ki ki edit korbe — sob data `data/` folder er JSON file e
- `data/site.json` → shop name, WhatsApp, bKash, address, delivery charge, delivery/exchange din, site URL
  - `"social"` → Facebook, TikTok, YouTube, Instagram page er link. Khali (`""`) rakhle oi icon dekhabe na
- `data/products.json` → product add/delete, dam, size, category
  - `"inStock": false` dile "স্টক শেষ" dekhabe
  - `"trending": true` dile homepage er hanger e dekhabe
  - `"category"` obosshoi `categories` list er kono `slug` er sathe milte hobe
  - Ekhon er 16টা product er chobi Unsplash er free stock photo (unsplash.com/license) — apnar asol product er chobi diye bodle niben
- `data/content.json` → hero lekha, marquee, trust strip, delivery/payment/exchange info, terms, size chart, offer popup
  - `{exchangeDays}`, `{bkash}`, `{insideCharge}` erokom lekha jaygay `site.json` er value auto boshe
  - `**lekha**` dile bold hobe
- Real chobi `public/products/` folder e rakho, tarpor product er `images` path change koro
- Color change: `app/globals.css` er upore `--accent` ar `--accent-deep`

JSON e comma/quote bhul hole build fail korbe — edit er por `npm run build` diye check kore nao.

## Netlify te deploy
1. Code GitHub e push koro
2. Netlify → Add new site → GitHub repo select
3. Build command `npm run build`, publish folder `out` (netlify.toml e already deya ache)

Athoba local e `npm run build` kore `out` folder ta Netlify te drag & drop koro.
