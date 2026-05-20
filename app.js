/* Wishlist · interactive basket
 * One product picked per category. Presets (cheapest/optimal/premium/smart)
 * operate on product IDs. Renders product art, sparkline charts per card,
 * a basket-evolution line chart, and a per-product detail modal with a
 * large price chart and direct retailer links. Theme toggle persisted to
 * localStorage.
 */

const STORAGE_SEL = 'wishlist.selection.v2';
const STORAGE_THEME = 'wishlist.theme';

const nokFmt = new Intl.NumberFormat('nb-NO', {
  style: 'currency',
  currency: 'NOK',
  maximumFractionDigits: 0
});
const nokShort = new Intl.NumberFormat('nb-NO', { maximumFractionDigits: 0 });

const monthLabels = (() => {
  const fmt = new Intl.DateTimeFormat('en', { month: 'short', year: '2-digit' });
  const now = new Date();
  const out = [];
  for (let i = 12; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    out.push(fmt.format(d));
  }
  return out;
})();

/* ── Text escaping ─────────────────────────────────────────────────── */
function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, (ch) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[ch]));
}
function escapeXml(s) {
  return String(s).replace(/[&<>"']/g, (ch) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&apos;'
  }[ch]));
}

/* ── Selection helpers ─────────────────────────────────────────────── */
function defaultSelection() { return { ...OPTIMAL_PICKS }; }

function loadSelection() {
  try {
    const raw = localStorage.getItem(STORAGE_SEL);
    if (!raw) return defaultSelection();
    const parsed = JSON.parse(raw);
    const out = {};
    for (const cat of CATEGORIES) {
      const productId = parsed[cat.id];
      const isValid = productId && PRODUCTS.some((p) => p.id === productId && p.categoryId === cat.id);
      out[cat.id] = isValid ? productId : OPTIMAL_PICKS[cat.id];
    }
    return out;
  } catch { return defaultSelection(); }
}
function saveSelection(sel) {
  try { localStorage.setItem(STORAGE_SEL, JSON.stringify(sel)); } catch {}
}

const state = { selection: loadSelection(), lastFocus: null };

function productById(id) { return PRODUCTS.find((p) => p.id === id); }
function productsByCat(catId) { return PRODUCTS.filter((p) => p.categoryId === catId); }
function categoryById(id) { return CATEGORIES.find((c) => c.id === id); }

function selectedProduct(catId) { return productById(state.selection[catId]); }
function selectedTotal() {
  return CATEGORIES.reduce((acc, cat) => acc + (selectedProduct(cat.id)?.price ?? 0), 0);
}
function cheapestPerCat() {
  return CATEGORIES.map((cat) => productsByCat(cat.id).reduce((a, b) => (a.price < b.price ? a : b)));
}
function priciestPerCat() {
  return CATEGORIES.map((cat) => productsByCat(cat.id).reduce((a, b) => (a.price > b.price ? a : b)));
}
function presetTotal(name) {
  if (name === 'cheapest') return cheapestPerCat().reduce((a, p) => a + p.price, 0);
  if (name === 'premium')  return priciestPerCat().reduce((a, p) => a + p.price, 0);
  if (name === 'optimal')  return CATEGORIES.reduce((a, cat) => a + (productById(OPTIMAL_PICKS[cat.id])?.price ?? 0), 0);
  if (name === 'smart')    return CATEGORIES.reduce((a, cat) => a + (productById(SMART_MIX[cat.id])?.price ?? 0), 0);
  return 0;
}
function currentPresetName() {
  const cheap = Object.fromEntries(cheapestPerCat().map((p) => [p.categoryId, p.id]));
  const prem  = Object.fromEntries(priciestPerCat().map((p) => [p.categoryId, p.id]));
  const matches = (target) => CATEGORIES.every((cat) => state.selection[cat.id] === target[cat.id]);
  if (matches(cheap))         return 'cheapest';
  if (matches(OPTIMAL_PICKS)) return 'optimal';
  if (matches(prem))          return 'premium';
  if (matches(SMART_MIX))     return 'smart';
  return null;
}

/* ── SVG helpers ───────────────────────────────────────────────────── */
function svgEl(tag, attrs = {}, children = []) {
  const el = document.createElementNS('http://www.w3.org/2000/svg', tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (v !== null && v !== undefined) el.setAttribute(k, String(v));
  }
  for (const child of children) { if (child) el.appendChild(child); }
  return el;
}

function sparkline(values, accent) {
  const w = 200, h = 44, padTop = 4, padBottom = 4;
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;
  const step = w / (values.length - 1);
  const points = values.map((v, i) => [i * step, padTop + (1 - (v - min) / range) * (h - padTop - padBottom)]);
  const linePath = 'M' + points.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(' L');
  const areaPath = `M0,${h} L` + points.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(' L') + ` L${w},${h} Z`;
  const id = 'g' + Math.random().toString(36).slice(2, 8);
  const svg = svgEl('svg', { viewBox: `0 0 ${w} ${h}`, preserveAspectRatio: 'none', 'aria-hidden': 'true' });
  const defs = svgEl('defs');
  const grad = svgEl('linearGradient', { id, x1: 0, y1: 0, x2: 0, y2: 1 });
  grad.appendChild(svgEl('stop', { offset: '0%',   'stop-color': accent, 'stop-opacity': 0.32 }));
  grad.appendChild(svgEl('stop', { offset: '100%', 'stop-color': accent, 'stop-opacity': 0    }));
  defs.appendChild(grad);
  svg.appendChild(defs);
  svg.appendChild(svgEl('path', { d: areaPath, fill: `url(#${id})` }));
  svg.appendChild(svgEl('path', { d: linePath, fill: 'none', stroke: accent, 'stroke-width': 1.5, 'stroke-linejoin': 'round', 'stroke-linecap': 'round' }));
  const [lx, ly] = points[points.length - 1];
  svg.appendChild(svgEl('circle', { cx: lx, cy: ly, r: 2.2, fill: accent }));
  return svg;
}

function lineChart(values, monthLabels, { yLabel = '' } = {}) {
  const w = 900, h = 280;
  const padL = 60, padR = 24, padT = 24, padB = 38;
  const innerW = w - padL - padR;
  const innerH = h - padT - padB;
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;
  const yMin = min - range * 0.06;
  const yMax = max + range * 0.10;
  const yRange = yMax - yMin;
  const step = innerW / (values.length - 1);
  const xy = values.map((v, i) => [padL + i * step, padT + (1 - (v - yMin) / yRange) * innerH]);
  const svg = svgEl('svg', { viewBox: `0 0 ${w} ${h}`, preserveAspectRatio: 'none', role: 'img', 'aria-label': yLabel || 'Price history chart' });

  const gGrid = svgEl('g', { class: 'evo-grid', stroke: 'currentColor', 'stroke-opacity': 0.08, 'stroke-width': 1 });
  const yTicks = 5;
  for (let i = 0; i <= yTicks; i++) {
    const y = padT + (innerH * i) / yTicks;
    gGrid.appendChild(svgEl('line', { x1: padL, x2: w - padR, y1: y, y2: y }));
    const labelVal = Math.round((yMax - (yRange * i) / yTicks));
    const label = svgEl('text', {
      x: padL - 10, y: y + 3, 'text-anchor': 'end',
      'font-size': 10, 'font-family': "'Geist Mono', monospace",
      fill: 'currentColor', 'fill-opacity': 0.5
    });
    label.textContent = nokShort.format(labelVal);
    gGrid.appendChild(label);
  }
  svg.appendChild(gGrid);

  const gX = svgEl('g', { class: 'evo-xaxis' });
  for (let i = 0; i < monthLabels.length; i++) {
    if (i % 2 !== 0 && i !== monthLabels.length - 1) continue;
    const x = padL + i * step;
    const t = svgEl('text', {
      x, y: h - padB + 18, 'text-anchor': 'middle',
      'font-size': 10, 'font-family': "'Geist Mono', monospace",
      fill: 'currentColor', 'fill-opacity': 0.6
    });
    t.textContent = monthLabels[i];
    gX.appendChild(t);
  }
  svg.appendChild(gX);

  const linePath = 'M' + xy.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(' L');
  const areaPath = `M${padL},${padT + innerH} L` + xy.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(' L') + ` L${w - padR},${padT + innerH} Z`;
  const gradId = 'evo' + Math.random().toString(36).slice(2, 8);
  const defs = svgEl('defs');
  const grad = svgEl('linearGradient', { id: gradId, x1: 0, y1: 0, x2: 0, y2: 1 });
  grad.appendChild(svgEl('stop', { offset: '0%',   'stop-color': 'currentColor', 'stop-opacity': 0.28 }));
  grad.appendChild(svgEl('stop', { offset: '100%', 'stop-color': 'currentColor', 'stop-opacity': 0    }));
  defs.appendChild(grad);
  svg.appendChild(defs);
  svg.appendChild(svgEl('path', { d: areaPath, fill: `url(#${gradId})` }));
  svg.appendChild(svgEl('path', { d: linePath, fill: 'none', stroke: 'currentColor', 'stroke-width': 2, 'stroke-linejoin': 'round', 'stroke-linecap': 'round' }));

  const minIdx = values.indexOf(min);
  const [mx, my] = xy[minIdx];
  svg.appendChild(svgEl('circle', { cx: mx, cy: my, r: 4.5, fill: 'none', stroke: 'currentColor', 'stroke-width': 2, 'stroke-opacity': 0.7 }));
  const minLabel = svgEl('text', {
    x: mx, y: my - 12, 'text-anchor': 'middle',
    'font-size': 11, 'font-family': "'Geist Mono', monospace",
    fill: 'currentColor', 'fill-opacity': 0.75
  });
  minLabel.textContent = 'min ' + nokShort.format(min);
  svg.appendChild(minLabel);

  const [nx, ny] = xy[xy.length - 1];
  svg.appendChild(svgEl('circle', { cx: nx, cy: ny, r: 5, fill: 'currentColor' }));
  svg.appendChild(svgEl('circle', { cx: nx, cy: ny, r: 9, fill: 'none', stroke: 'currentColor', 'stroke-width': 1, 'stroke-opacity': 0.3 }));
  return svg;
}

/* ── Product art generator ─────────────────────────────────────────── */
function buildProductArt(product, category) {
  const w = 400, h = 220;
  const seed = _hashStr(product.id);
  const rand = _mulberry32(seed);
  const angle = Math.floor(rand() * 360);
  const offset = 30 + Math.floor(rand() * 35);
  const orbX = Math.floor(15 + rand() * 70);
  const orbY = Math.floor(10 + rand() * 70);
  const orbR = Math.floor(30 + rand() * 30);
  const accent = category.accent;
  const gid = 'a' + (seed >>> 0).toString(36);

  const iconScale = 116 / 24;
  const strokeW = (1.4 / iconScale).toFixed(3);

  return `<svg viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
    <defs>
      <linearGradient id="lg-${gid}" gradientTransform="rotate(${angle} 0.5 0.5)">
        <stop offset="0%" stop-color="${accent}" stop-opacity="0.85"/>
        <stop offset="${offset}%" stop-color="${accent}" stop-opacity="0.22"/>
        <stop offset="100%" stop-color="#0a0a0c" stop-opacity="0.97"/>
      </linearGradient>
      <radialGradient id="rg-${gid}" cx="${orbX}%" cy="${orbY}%" r="${orbR}%">
        <stop offset="0%" stop-color="rgba(255,255,255,0.18)"/>
        <stop offset="100%" stop-color="rgba(255,255,255,0)"/>
      </radialGradient>
    </defs>
    <rect width="${w}" height="${h}" fill="#0f0f10"/>
    <rect width="${w}" height="${h}" fill="url(#lg-${gid})"/>
    <rect width="${w}" height="${h}" fill="url(#rg-${gid})"/>
    <g transform="translate(${w/2}, ${h/2}) scale(${iconScale}) translate(-12, -12)" stroke="rgba(255,255,255,0.94)" stroke-width="${strokeW}" fill="none" stroke-linecap="round" stroke-linejoin="round">${ICONS[category.icon]}</g>
    <text x="20" y="${h - 20}" font-family="Geist, system-ui, sans-serif" font-size="13" font-weight="600" fill="rgba(255,255,255,0.95)" letter-spacing="0.3">${escapeXml(product.brand)}</text>
    <text x="${w - 20}" y="${h - 20}" font-family="ui-monospace, Menlo, monospace" font-size="11" fill="rgba(255,255,255,0.6)" text-anchor="end">${product.year}</text>
  </svg>`;
}

/* ── Card rendering ────────────────────────────────────────────────── */
function buildProductCard(product, category) {
  const tpl = document.getElementById('product-template').content;
  const node = tpl.firstElementChild.cloneNode(true);
  node.dataset.productId = product.id;
  node.style.setProperty('--cat-accent', category.accent);

  node.querySelector('.prod-image').innerHTML = buildProductArt(product, category);

  node.querySelector('.tier-badge').textContent = product.tierLabel;
  node.querySelector('.tier-badge').dataset.tier = product.tierLabel;

  node.querySelector('.rating-value').textContent = product.rating.toFixed(1);
  node.querySelector('.rating-count').textContent = product.reviews;

  node.querySelector('.prod-title').textContent = product.name;
  node.querySelector('.prod-brand').textContent = `${product.brand} · ${product.year}`;
  node.querySelector('.prod-specs').textContent = product.specs;

  node.querySelector('.prod-chart').appendChild(sparkline(product.priceHistory, category.accent));
  node.querySelector('.prod-price-value').textContent = nokFmt.format(product.price);

  const change = product.priceChange12mo;
  const changeEl = node.querySelector('.prod-change');
  if (Math.abs(change) < 0.005) {
    changeEl.textContent = '±0%';
    changeEl.classList.add('flat');
  } else if (change > 0) {
    changeEl.textContent = `↑ ${(change * 100).toFixed(1)}% 12 mo`;
    changeEl.classList.add('up');
  } else {
    changeEl.textContent = `↓ ${(Math.abs(change) * 100).toFixed(1)}% 12 mo`;
    changeEl.classList.add('down');
  }

  const cheap = product.cheapestRetailer;
  node.querySelector('.prod-retailer-cheap').textContent = cheap.name;
  const others = Object.keys(product.retailers).filter((n) => n !== cheap.name);
  node.querySelector('.prod-retailer-more').textContent = others.length === 0
    ? 'only one stockist'
    : `+${others.length} more · ${others.slice(0, 2).join(', ')}${others.length > 2 ? '…' : ''}`;

  const addToBasket = () => {
    state.selection[category.id] = product.id;
    saveSelection(state.selection);
    refreshAll({ pulseSelected: true });
  };

  node.addEventListener('click', (e) => {
    // Buttons inside .prod-actions handle their own clicks
    if (e.target.closest('.prod-actions')) return;
    openModal(product.id);
  });
  node.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openModal(product.id);
    }
  });
  node.querySelector('.prod-select').addEventListener('click', (e) => {
    e.stopPropagation();
    addToBasket();
  });
  node.querySelector('.prod-details').addEventListener('click', (e) => {
    e.stopPropagation();
    openModal(product.id);
  });

  return node;
}

function buildCategorySection(category) {
  const tpl = document.getElementById('category-template').content;
  const node = tpl.firstElementChild.cloneNode(true);
  node.dataset.catId = category.id;
  node.id = `cat-${category.id}`;
  node.style.setProperty('--cat-accent', category.accent);

  const svg = node.querySelector('.cat-icon svg');
  svg.innerHTML = ICONS[category.icon] || '';
  node.querySelector('.cat-icon').style.color = category.accent;

  node.querySelector('.cat-name').textContent = category.name;
  const prods = productsByCat(category.id).slice().sort((a, b) => a.price - b.price);
  node.querySelector('.cat-sub').textContent = `${prods.length} products · ${category.nameEn}`;
  const lo = prods[0].price;
  const hi = prods[prods.length - 1].price;
  node.querySelector('.cat-range').textContent = `${nokFmt.format(lo)} – ${nokFmt.format(hi)}`;

  const grid = node.querySelector('.cat-grid');
  for (const p of prods) grid.appendChild(buildProductCard(p, category));
  return node;
}

function renderCategories() {
  const host = document.getElementById('categories');
  const frag = document.createDocumentFragment();
  for (const cat of CATEGORIES) frag.appendChild(buildCategorySection(cat));
  host.replaceChildren(frag);
}

function renderCatNav() {
  const host = document.querySelector('.cat-nav');
  host.innerHTML = '';
  for (const cat of CATEGORIES) {
    const a = document.createElement('a');
    a.href = `#cat-${cat.id}`;
    a.className = 'cat-chip';
    a.style.color = cat.accent;
    a.innerHTML = `<span class="dot" style="background:${cat.accent};box-shadow:0 0 8px ${cat.accent}"></span>${cat.name}`;
    host.appendChild(a);
  }
}

function refreshProductSelection() {
  document.querySelectorAll('.prod').forEach((node) => {
    const productId = node.dataset.productId;
    const product = productById(productId);
    if (!product) return;
    const isSel = state.selection[product.categoryId] === productId;
    node.classList.toggle('is-selected', isSel);
  });
  document.querySelectorAll('.cat').forEach((catNode) => {
    const catId = catNode.dataset.catId;
    const product = selectedProduct(catId);
    const nameEl = catNode.querySelector('.cat-selected-name');
    if (nameEl) nameEl.textContent = product?.name ?? '';
  });
}

function refreshPresetActive() {
  const active = currentPresetName();
  document.querySelectorAll('.preset').forEach((btn) => {
    btn.classList.toggle('is-active', btn.dataset.preset === active);
  });
}

function pulse(el) {
  if (!el) return;
  el.classList.remove('is-pulsing');
  void el.offsetWidth;
  el.classList.add('is-pulsing');
}

function refreshStats({ pulseSelected = false } = {}) {
  const sel = selectedTotal();
  const cheapest = presetTotal('cheapest');
  const optimal  = presetTotal('optimal');
  const premium  = presetTotal('premium');

  const selEl = document.getElementById('total-selected');
  selEl.textContent = nokFmt.format(sel);
  if (pulseSelected) pulse(selEl);

  document.getElementById('total-cheapest').textContent = nokFmt.format(cheapest);
  document.getElementById('total-optimal').textContent  = nokFmt.format(optimal);
  document.getElementById('total-premium').textContent  = nokFmt.format(premium);

  const diffOpt = sel - optimal;
  const sign = diffOpt === 0 ? '±' : diffOpt > 0 ? '+' : '−';
  const savingsVsPrem = premium - sel;
  document.getElementById('total-selected-meta').textContent =
    `${sign}${nokFmt.format(Math.abs(diffOpt))} vs optimal · saves ${nokFmt.format(savingsVsPrem)} vs premium`;
}

function refreshBars() {
  const sel = selectedTotal();
  const cheapest = presetTotal('cheapest');
  const optimal  = presetTotal('optimal');
  const premium  = presetTotal('premium');
  const max = Math.max(sel, cheapest, optimal, premium, 1);
  const rows = [
    { key: 'selected', label: 'Selected basket', value: sel },
    { key: 'budget',   label: 'Cheapest',        value: cheapest, dot: 'dot-budget' },
    { key: 'optimal',  label: 'Optimal',         value: optimal,  dot: 'dot-optimal' },
    { key: 'premium',  label: 'Premium',         value: premium,  dot: 'dot-premium' }
  ];
  const host = document.getElementById('bars');
  host.innerHTML = '';
  for (const r of rows) {
    const dotClass = r.dot || presetDotClass();
    const div = document.createElement('div');
    div.className = `bar-row bar-${r.key}`;
    div.innerHTML = `
      <div class="bar-name"><span class="dot ${dotClass}"></span>${r.label}</div>
      <div class="bar-track"><div class="bar-fill" style="width: ${(r.value / max) * 100}%"></div></div>
      <div class="bar-value">${nokFmt.format(r.value)}</div>
    `;
    host.appendChild(div);
  }
}

function presetDotClass() {
  switch (currentPresetName()) {
    case 'cheapest': return 'dot-budget';
    case 'optimal':  return 'dot-optimal';
    case 'premium':  return 'dot-premium';
    case 'smart':    return 'dot-smart';
    default:         return '';
  }
}

function refreshEvolution() {
  const months = 13;
  const series = new Array(months).fill(0);
  for (const cat of CATEGORIES) {
    const product = selectedProduct(cat.id);
    if (!product) continue;
    for (let i = 0; i < months; i++) series[i] += product.priceHistory[i];
  }
  const now = series[months - 1];
  const then = series[0];
  const min = Math.min(...series);
  const change = then > 0 ? (now - then) / then : 0;

  document.getElementById('evo-now').textContent  = nokFmt.format(now);
  document.getElementById('evo-then').textContent = nokFmt.format(then);
  document.getElementById('evo-min').textContent  = nokFmt.format(min);

  const ch = document.getElementById('evo-change');
  ch.classList.remove('up', 'down');
  if (Math.abs(change) < 0.005) {
    ch.textContent = '±0%';
  } else if (change > 0) {
    ch.textContent = `↑ ${(change * 100).toFixed(1)}%`;
    ch.classList.add('up');
  } else {
    ch.textContent = `↓ ${(Math.abs(change) * 100).toFixed(1)}%`;
    ch.classList.add('down');
  }

  const host = document.getElementById('evo-chart');
  host.innerHTML = '';
  host.style.color = '#7dd3fc';
  host.appendChild(lineChart(series, monthLabels, { yLabel: 'Basket cost over the last 12 months' }));
}

function refreshAll(opts = {}) {
  refreshProductSelection();
  refreshPresetActive();
  refreshStats(opts);
  refreshBars();
  refreshEvolution();
}

/* ── Presets ───────────────────────────────────────────────────────── */
function applyPreset(name) {
  let map;
  if (name === 'cheapest') {
    map = Object.fromEntries(cheapestPerCat().map((p) => [p.categoryId, p.id]));
  } else if (name === 'premium') {
    map = Object.fromEntries(priciestPerCat().map((p) => [p.categoryId, p.id]));
  } else if (name === 'optimal') {
    map = { ...OPTIMAL_PICKS };
  } else if (name === 'smart') {
    map = { ...SMART_MIX };
  } else { return; }
  state.selection = map;
  saveSelection(state.selection);
  refreshAll({ pulseSelected: true });
}
function bindPresets() {
  document.querySelectorAll('.preset').forEach((btn) => {
    btn.addEventListener('click', () => applyPreset(btn.dataset.preset));
  });
}

/* ── Modal ─────────────────────────────────────────────────────────── */
function openModal(productId) {
  const product = productById(productId);
  if (!product) return;
  const category = categoryById(product.categoryId);
  if (!category) return;

  state.lastFocus = document.activeElement;

  const modal = document.getElementById('modal');
  modal.style.setProperty('--cat-accent', category.accent);
  modal.dataset.productId = productId;

  document.getElementById('modal-hero').innerHTML = buildProductArt(product, category);

  const tier = document.getElementById('modal-tier');
  tier.textContent = product.tierLabel;
  tier.dataset.tier = product.tierLabel;

  document.getElementById('modal-rating-value').textContent = product.rating.toFixed(1);
  document.getElementById('modal-rating-count').textContent = product.reviews;
  document.getElementById('modal-title').textContent = product.name;
  document.getElementById('modal-brand').textContent = product.brand;
  document.getElementById('modal-year').textContent = product.year;
  document.getElementById('modal-specs').textContent = product.specs;

  const ph = product.priceHistory;
  const nowVal = ph[ph.length - 1];
  const thenVal = ph[0];
  const lowVal = Math.min(...ph);
  const change = thenVal > 0 ? (nowVal - thenVal) / thenVal : 0;

  document.getElementById('modal-stat-now').textContent  = nokFmt.format(nowVal);
  document.getElementById('modal-stat-then').textContent = nokFmt.format(thenVal);
  document.getElementById('modal-stat-low').textContent  = nokFmt.format(lowVal);
  const changeEl = document.getElementById('modal-stat-change');
  changeEl.classList.remove('up', 'down');
  if (Math.abs(change) < 0.005) {
    changeEl.textContent = '±0%';
  } else if (change > 0) {
    changeEl.textContent = `↑ ${(change * 100).toFixed(1)}%`;
    changeEl.classList.add('up');
  } else {
    changeEl.textContent = `↓ ${(Math.abs(change) * 100).toFixed(1)}%`;
    changeEl.classList.add('down');
  }

  const chartHost = document.getElementById('modal-chart');
  chartHost.innerHTML = '';
  chartHost.appendChild(lineChart(ph, monthLabels, { yLabel: `${product.name} price history` }));

  document.getElementById('modal-prisjakt').href = prisjaktUrl(product.name);

  // Retailers list, cheapest first
  const sorted = Object.entries(product.retailers).sort(([, a], [, b]) => a - b);
  const cheapestPrice = sorted[0][1];
  const list = document.getElementById('modal-retailers');
  list.innerHTML = '';
  for (const [name, price] of sorted) {
    const isCheap = price === cheapestPrice;
    const url = retailerUrl(name, product.name);
    const li = document.createElement('li');
    li.className = 'retailer-row' + (isCheap ? ' is-cheapest' : '');
    li.innerHTML = `
      <span class="retailer-name">
        ${escapeHtml(name)}
        ${isCheap ? '<span class="retailer-cheap-tag">cheapest</span>' : ''}
      </span>
      <span class="retailer-price">${escapeHtml(nokFmt.format(price))}</span>
      <a class="retailer-link" href="${escapeHtml(url)}" target="_blank" rel="noopener nofollow">
        View
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">${ICONS.external}</svg>
      </a>
    `;
    list.appendChild(li);
  }

  // Update add button label
  const inBasket = state.selection[category.id] === productId;
  document.getElementById('modal-add-label').textContent = inBasket ? 'In basket — re-confirm' : 'Add to basket';

  const backdrop = document.getElementById('modal-backdrop');
  backdrop.hidden = false;
  // Force reflow so the transition runs
  void backdrop.offsetWidth;
  backdrop.classList.add('is-open');
  document.body.classList.add('modal-open');

  setTimeout(() => {
    const closeBtn = document.getElementById('modal-close');
    if (closeBtn) closeBtn.focus();
  }, 80);
}

function closeModal() {
  const backdrop = document.getElementById('modal-backdrop');
  backdrop.classList.remove('is-open');
  document.body.classList.remove('modal-open');
  setTimeout(() => {
    backdrop.hidden = true;
    if (state.lastFocus && typeof state.lastFocus.focus === 'function') {
      try { state.lastFocus.focus(); } catch {}
    }
  }, 260);
}

function bindModal() {
  // Icons
  const closeIconSvg = document.querySelector('#modal-close svg');
  if (closeIconSvg) closeIconSvg.innerHTML = ICONS.close;
  const prisjaktIcon = document.querySelector('#modal-prisjakt svg');
  if (prisjaktIcon) prisjaktIcon.innerHTML = ICONS.external;

  document.getElementById('modal-close').addEventListener('click', closeModal);
  document.getElementById('modal-cancel').addEventListener('click', closeModal);

  document.getElementById('modal-add').addEventListener('click', () => {
    const productId = document.getElementById('modal').dataset.productId;
    if (!productId) return;
    const product = productById(productId);
    if (!product) return;
    state.selection[product.categoryId] = productId;
    saveSelection(state.selection);
    refreshAll({ pulseSelected: true });
    closeModal();
  });

  document.getElementById('modal-backdrop').addEventListener('click', (e) => {
    if (e.target === e.currentTarget) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    const backdrop = document.getElementById('modal-backdrop');
    if (!backdrop || !backdrop.classList.contains('is-open')) return;
    if (e.key === 'Escape') {
      e.preventDefault();
      closeModal();
      return;
    }
    if (e.key === 'Tab') {
      const focusables = backdrop.querySelectorAll('button, a[href], [tabindex]:not([tabindex="-1"])');
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  });
}

/* ── Theme toggle ──────────────────────────────────────────────────── */
function bindTheme() {
  const btn = document.getElementById('theme-toggle');
  if (!btn) return;
  btn.querySelector('.icon-sun').innerHTML = ICONS.sun;
  btn.querySelector('.icon-moon').innerHTML = ICONS.moon;
  btn.addEventListener('click', () => {
    const next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    try { localStorage.setItem(STORAGE_THEME, next); } catch {}
  });
}

/* ── Eyebrow counts ────────────────────────────────────────────────── */
function fillStaticCounts() {
  const el1 = document.getElementById('eyebrow-counts');
  if (el1) el1.textContent = `${PRODUCTS.length} products · ${CATEGORIES.length} categories`;
  const el2 = document.getElementById('hero-product-count');
  if (el2) el2.textContent = PRODUCTS.length;
}

/* ── Boot ──────────────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  fillStaticCounts();
  renderCatNav();
  renderCategories();
  bindPresets();
  bindTheme();
  bindModal();
  refreshAll();
});
