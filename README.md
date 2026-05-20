# wishlist

Norwegian wishlist budget analyzer. Pick a tier per item (cheapest / optimal / premium), see the basket total update live.

Static site — vanilla HTML/CSS/JS, no build step. Deploys to Vercel as-is.

## Run locally

```sh
# any static file server works, e.g.
npx serve .
# or
python -m http.server 8000
```

Then open `http://localhost:8000` (or whatever port the server prints).

## Deploy

```sh
vercel
```

No config needed beyond the included `vercel.json`.

## Files

- `index.html` — markup
- `styles.css` — Vercel-style dark theme
- `app.js` — interactivity, totals, localStorage
- `data.js` — items + retailer pricing (NOK, 2026)
- `vercel.json` — headers + cache config

## Adding items

Edit `data.js`. Each item is an object with `budget`, `optimal`, and `premium` tiers. The grid and totals rebuild from `ITEMS` — no other changes needed.

## Pricing

Indicative shelf prices from Norwegian retailers: Komplett, Elkjøp, Power, XXL, 4Sound, Sport1, Hi-Fi Klubben, Tennishuset, Løplabbet, Birk Sport, Multicom, G-Sport, Gear4Music. Verify at the retailer before buying — sales and stock vary.
