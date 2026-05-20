/* Wishlist · interactive basket */

const STORAGE_KEY = 'wishlist.selection.v1';
const TIERS = ['budget', 'optimal', 'premium'];
const TIER_LABEL = { budget: 'Cheap', optimal: 'Optimal', premium: 'Premium' };

const nokFmt = new Intl.NumberFormat('nb-NO', {
  style: 'currency',
  currency: 'NOK',
  maximumFractionDigits: 0
});

function loadSelection() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultSelection();
    const parsed = JSON.parse(raw);
    // Validate — ensure every item has a known tier, fall back to optimal otherwise.
    const out = {};
    for (const item of ITEMS) {
      out[item.id] = TIERS.includes(parsed[item.id]) ? parsed[item.id] : 'optimal';
    }
    return out;
  } catch {
    return defaultSelection();
  }
}

function defaultSelection() {
  const out = {};
  for (const item of ITEMS) out[item.id] = 'optimal';
  return out;
}

function saveSelection(sel) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(sel)); } catch {}
}

const state = {
  selection: loadSelection()
};

function tierTotal(tier) {
  return ITEMS.reduce((acc, item) => acc + item.tiers[tier].price, 0);
}
function smartTotal() {
  return ITEMS.reduce((acc, item) => acc + item.tiers[SMART_MIX[item.id]].price, 0);
}
function selectedTotal() {
  return ITEMS.reduce((acc, item) => acc + item.tiers[state.selection[item.id]].price, 0);
}

function pulse(el) {
  if (!el) return;
  el.classList.remove('is-pulsing');
  // force reflow so the animation restarts
  void el.offsetWidth;
  el.classList.add('is-pulsing');
}

function setTotals({ pulseSelected = false } = {}) {
  const budget = tierTotal('budget');
  const optimal = tierTotal('optimal');
  const premium = tierTotal('premium');
  const selected = selectedTotal();

  const sel = document.getElementById('total-selected');
  sel.textContent = nokFmt.format(selected);
  if (pulseSelected) pulse(sel);

  document.getElementById('total-budget').textContent = nokFmt.format(budget);
  document.getElementById('total-optimal').textContent = nokFmt.format(optimal);
  document.getElementById('total-premium').textContent = nokFmt.format(premium);

  // Meta on selected: count of items, plus how it compares to optimal
  const diff = selected - optimal;
  const sign = diff === 0 ? '±' : diff > 0 ? '+' : '−';
  const meta = `${ITEMS.length} items · ${sign}${nokFmt.format(Math.abs(diff))} vs optimal`;
  document.getElementById('total-selected-meta').textContent = meta;

  // Bars
  renderBars({ budget, optimal, premium, selected });

  // Active preset detection
  refreshPresetActive();
}

function buildCard(item) {
  const tpl = document.getElementById('item-card-template');
  const node = tpl.content.firstElementChild.cloneNode(true);
  node.dataset.itemId = item.id;
  node.style.setProperty('--accent-color', item.accent);

  // Icon
  const svg = node.querySelector('.card-icon svg');
  svg.innerHTML = ICONS[item.icon] || '';

  // Titles
  node.querySelector('.card-title').textContent = item.name;
  node.querySelector('.card-sub').textContent = `${item.category} · ${item.nameEn}`;

  // Tier buttons
  for (const tier of TIERS) {
    const btn = node.querySelector(`.tier[data-tier="${tier}"]`);
    btn.querySelector('.tier-price').textContent = nokFmt.format(item.tiers[tier].price);
    btn.addEventListener('click', () => {
      state.selection[item.id] = tier;
      saveSelection(state.selection);
      refreshCard(node, item);
      setTotals({ pulseSelected: true });
    });
  }

  refreshCard(node, item);
  return node;
}

function refreshCard(node, item) {
  const tier = state.selection[item.id];
  const data = item.tiers[tier];

  node.querySelector('.card-price-value').textContent = nokFmt.format(data.price);
  node.querySelector('.card-product-name').textContent = data.product;
  node.querySelector('.card-retailer').textContent = data.retailer;
  node.querySelector('.card-note').textContent = data.note;

  for (const tierName of TIERS) {
    const btn = node.querySelector(`.tier[data-tier="${tierName}"]`);
    btn.classList.toggle('is-active', tierName === tier);
    btn.setAttribute('aria-selected', tierName === tier ? 'true' : 'false');
  }
}

function renderItems() {
  const grid = document.getElementById('items-grid');
  const frag = document.createDocumentFragment();
  for (const item of ITEMS) frag.appendChild(buildCard(item));
  grid.replaceChildren(frag);
}

function renderBars({ budget, optimal, premium, selected }) {
  const container = document.getElementById('bars');
  const max = Math.max(budget, optimal, premium, selected, 1);
  const rows = [
    { key: 'selected', label: 'Selected basket', value: selected, dot: getActivePresetClass() },
    { key: 'budget',   label: 'Cheapest',        value: budget,   dot: 'dot-budget' },
    { key: 'optimal',  label: 'Optimal',         value: optimal,  dot: 'dot-optimal' },
    { key: 'premium',  label: 'Premium',         value: premium,  dot: 'dot-premium' }
  ];
  container.innerHTML = '';
  for (const row of rows) {
    const el = document.createElement('div');
    el.className = `bar-row bar-${row.key}`;
    el.innerHTML = `
      <div class="bar-name"><span class="dot ${row.dot}"></span>${row.label}</div>
      <div class="bar-track"><div class="bar-fill" style="width: ${(row.value / max) * 100}%"></div></div>
      <div class="bar-value">${nokFmt.format(row.value)}</div>
    `;
    container.appendChild(el);
  }
}

function getActivePresetClass() {
  const sel = state.selection;
  const allSame = (tier) => ITEMS.every((i) => sel[i.id] === tier);
  if (allSame('budget')) return 'dot-budget';
  if (allSame('optimal')) return 'dot-optimal';
  if (allSame('premium')) return 'dot-premium';
  if (ITEMS.every((i) => sel[i.id] === SMART_MIX[i.id])) return 'dot-smart';
  return '';
}

function refreshPresetActive() {
  const sel = state.selection;
  const matches = (tier) => ITEMS.every((i) => sel[i.id] === tier);
  const isSmart = ITEMS.every((i) => sel[i.id] === SMART_MIX[i.id]);
  const map = {
    budget: matches('budget'),
    optimal: matches('optimal'),
    premium: matches('premium'),
    smart: isSmart
  };
  document.querySelectorAll('.preset').forEach((btn) => {
    const which = btn.dataset.preset;
    btn.classList.toggle('is-active', !!map[which]);
  });
}

function applyPreset(name) {
  if (name === 'smart') {
    state.selection = { ...SMART_MIX };
  } else if (TIERS.includes(name)) {
    state.selection = Object.fromEntries(ITEMS.map((i) => [i.id, name]));
  } else {
    return;
  }
  saveSelection(state.selection);
  // Update each card
  document.querySelectorAll('.card').forEach((node) => {
    const id = node.dataset.itemId;
    const item = ITEMS.find((i) => i.id === id);
    if (item) refreshCard(node, item);
  });
  setTotals({ pulseSelected: true });
}

function bindPresets() {
  document.querySelectorAll('.preset').forEach((btn) => {
    btn.addEventListener('click', () => applyPreset(btn.dataset.preset));
  });
}

document.addEventListener('DOMContentLoaded', () => {
  renderItems();
  bindPresets();
  setTotals();
});
