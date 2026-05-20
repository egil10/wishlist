/* Wishlist · interactive basket
 * One product picked per category. Presets (cheapest/optimal/premium/smart)
 * operate on product IDs. Renders sparkline charts per product and a
 * basket-evolution line chart at the bottom. Theme toggle stored in localStorage.
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

/* ── Selection helpers ─────────────────────────────────────────────── */

function defaultSelection() {
  return { ...OPTIMAL_PICKS };
}

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
  } catch {
    return defaultSelection();
  }
}
function saveSelection(sel) {
  try { localStorage.setItem(STORAGE_SEL, JSON.stringify(sel)); } catch {}
}

const state = { selection: loadSelection() };

function productById(id) { return PRODUCTS.find((p) => p.id === id); }
function productsByCat(catId) { return PRODUCTS.filter((p) => p.categoryId === catId); }

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

/* ── SVG chart helpers ─────────────────────────────────────────────── */

function svgEl(tag, attrs = {}, children = []) {
  const el = document.createElementNS('http://www.w3.org/2000/svg', tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (v !== null && v !== undefined) el.setAttribute(k, String(v));
  }
  for (const child of children) {
    if (child) el.appendChild(child);
  }
  return el;
}

function sparkline(values, accent) {
  const w = 200, h = 44;
  const padTop = 4, padBottom = 4;
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;
  const step = w / (values.length - 1);
  const points = values.map((v, i) => {
    const x = i * step;
    const y = padTop + (1 - (v - min) / range) * (h - padTop - padBottom);
    return [x, y];
  });
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
  // Last-point dot
  const [lx, ly] = points[points.length - 1];
  svg.appendChild(svgEl('circle', { cx: lx, cy: ly, r: 2.2, fill: accent }));
  return svg;
}

/* Basket evolution chart — one line series, axes, min/now markers */
function lineChart(values, monthLabels) {
  const w = 900, h = 260;
  const padL = 56, padR = 24, padT = 24, padB = 36;
  const innerW = w - padL - padR;
  const innerH = h - padT - padB;

  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;
  // Pad y range a bit for headroom
  const yMin = min - range * 0.06;
  const yMax = max + range * 0.10;
  const yRange = yMax - yMin;

  const step = innerW / (values.length - 1);
  const xy = values.map((v, i) => [padL + i * step, padT + (1 - (v - yMin) / yRange) * innerH]);

  const svg = svgEl('svg', { viewBox: `0 0 ${w} ${h}`, preserveAspectRatio: 'none', role: 'img', 'aria-label': 'Basket cost over the last 12 months' });

  // Y gridlines (5 lines incl. min/max)
  const gridStrokeColor = 'currentColor';
  const gGrid = svgEl('g', { class: 'evo-grid', stroke: gridStrokeColor, 'stroke-opacity': 0.08, 'stroke-width': 1 });
  const yTicks = 5;
  for (let i = 0; i <= yTicks; i++) {
    const y = padT + (innerH * i) / yTicks;
    gGrid.appendChild(svgEl('line', { x1: padL, x2: w - padR, y1: y, y2: y }));
    const labelVal = Math.round((yMax - (yRange * i) / yTicks));
    const label = svgEl('text', {
      x: padL - 10,
      y: y + 3,
      'text-anchor': 'end',
      'font-size': 10,
      'font-family': "'Geist Mono', monospace",
      fill: 'currentColor',
      'fill-opacity': 0.45
    });
    label.textContent = nokShort.format(labelVal);
    gGrid.appendChild(label);
  }
  svg.appendChild(gGrid);

  // X axis month labels
  const gX = svgEl('g', { class: 'evo-xaxis' });
  for (let i = 0; i < monthLabels.length; i++) {
    if (i % 2 !== 0 && i !== monthLabels.length - 1) continue; // every other label, always show last
    const x = padL + i * step;
    const t = svgEl('text', {
      x, y: h - padB + 18,
      'text-anchor': 'middle',
      'font-size': 10,
      'font-family': "'Geist Mono', monospace",
      fill: 'currentColor',
      'fill-opacity': 0.55
    });
    t.textContent = monthLabels[i];
    gX.appendChild(t);
  }
  svg.appendChild(gX);

  // Area + line
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

  // Min marker
  const minIdx = values.indexOf(min);
  const [mx, my] = xy[minIdx];
  svg.appendChild(svgEl('circle', { cx: mx, cy: my, r: 4.5, fill: 'none', stroke: 'currentColor', 'stroke-width': 2, 'stroke-opacity': 0.7 }));
  const minLabel = svgEl('text', {
    x: mx, y: my - 12,
    'text-anchor': 'middle',
    'font-size': 11,
    'font-family': "'Geist Mono', monospace",
    fill: 'currentColor',
    'fill-opacity': 0.7
  });
  minLabel.textContent = 'min ' + nokShort.format(min);
  svg.appendChild(minLabel);

  // Last point (now)
  const [nx, ny] = xy[xy.length - 1];
  svg.appendChild(svgEl('circle', { cx: nx, cy: ny, r: 5, fill: 'currentColor' }));
  svg.appendChild(svgEl('circle', { cx: nx, cy: ny, r: 9, fill: 'none', stroke: 'currentColor', 'stroke-width': 1, 'stroke-opacity': 0.3 }));
  return svg;
}

/* ── Rendering ─────────────────────────────────────────────────────── */

function buildProductCard(product, category) {
  const tpl = document.getElementById('product-template').content;
  const node = tpl.firstElementChild.cloneNode(true);
  node.dataset.productId = product.id;
  node.style.setProperty('--cat-accent', category.accent);

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

  // Selection state
  const setSelected = () => {
    state.selection[category.id] = product.id;
    saveSelection(state.selection);
    refreshAll({ pulseSelected: true });
  };
  node.addEventListener('click', (e) => {
    if (e.target.closest('button') && !e.target.closest('.prod-select')) return;
    setSelected();
  });
  node.querySelector('.prod-select').addEventListener('click', (e) => {
    e.stopPropagation();
    setSelected();
  });
  node.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setSelected();
    }
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
  for (const p of prods) {
    grid.appendChild(buildProductCard(p, category));
  }
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

  // Selected meta: comparison vs optimal + saving vs premium
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
  // Sum each month index across the selected products
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
  host.style.color = '#7dd3fc'; // line color; evo uses currentColor everywhere
  host.appendChild(lineChart(series, monthLabels));
}

function refreshAll(opts = {}) {
  refreshProductSelection();
  refreshPresetActive();
  refreshStats(opts);
  refreshBars();
  refreshEvolution();
}

/* ── Presets ────────────────────────────────────────────────────────── */

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
  } else {
    return;
  }
  state.selection = map;
  saveSelection(state.selection);
  refreshAll({ pulseSelected: true });
}

function bindPresets() {
  document.querySelectorAll('.preset').forEach((btn) => {
    btn.addEventListener('click', () => applyPreset(btn.dataset.preset));
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

/* ── Eyebrow counts ───────────────────────────────────────────────── */
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
  refreshAll();
});
