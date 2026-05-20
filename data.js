// Wishlist data — Norwegian retail pricing, 2026
// Prices in NOK, indicative of typical shelf prices at major Norwegian retailers.
// Three tiers per item: budget (lowest reasonable), optimal (best value), premium (top of line).

const ITEMS = [
  {
    id: 'pc',
    name: 'PC m/ GPU',
    nameEn: 'Gaming PC',
    category: 'Datamaskin',
    icon: 'monitor',
    accent: '#7dd3fc',
    tiers: {
      budget: {
        price: 8990,
        product: 'Multicom Allround · i5-12400F · RTX 4060 · 16GB',
        retailer: 'Multicom',
        url: 'https://www.multicom.no',
        note: '1080p high refresh, solid all-rounder'
      },
      optimal: {
        price: 18990,
        product: 'Komplett Gamer · Ryzen 7 7700 · RTX 4070 Super · 32GB',
        retailer: 'Komplett',
        url: 'https://www.komplett.no',
        note: '1440p sweet spot, future-friendly'
      },
      premium: {
        price: 49990,
        product: 'Multicom Flow · i9-14900K · RTX 4090 · 32GB DDR5',
        retailer: 'Multicom',
        url: 'https://www.multicom.no',
        note: '4K maxed, creator + gamer'
      }
    }
  },
  {
    id: 'phone',
    name: 'Mobiltelefon',
    nameEn: 'Mobile phone',
    category: 'Elektronikk',
    icon: 'phone',
    accent: '#a78bfa',
    tiers: {
      budget: {
        price: 2999,
        product: 'Samsung Galaxy A55 5G · 128GB',
        retailer: 'Power',
        url: 'https://www.power.no',
        note: 'Strong mid-range Android'
      },
      optimal: {
        price: 10990,
        product: 'iPhone 15 · 128GB',
        retailer: 'Elkjøp',
        url: 'https://www.elkjop.no',
        note: 'Best value flagship'
      },
      premium: {
        price: 18990,
        product: 'iPhone 15 Pro Max · 256GB · Titanium',
        retailer: 'Elkjøp',
        url: 'https://www.elkjop.no',
        note: 'Top tier, every feature'
      }
    }
  },
  {
    id: 'telecaster',
    name: 'Telecaster',
    nameEn: 'Electric guitar',
    category: 'Musikk',
    icon: 'guitar',
    accent: '#fbbf24',
    tiers: {
      budget: {
        price: 3690,
        product: 'Squier Affinity Telecaster · Maple · Butterscotch',
        retailer: '4Sound',
        url: 'https://www.4sound.no',
        note: 'Great first Tele, real tone'
      },
      optimal: {
        price: 13490,
        product: 'Fender Player II Telecaster · Maple · MN',
        retailer: '4Sound',
        url: 'https://www.4sound.no',
        note: 'Real Fender, real twang'
      },
      premium: {
        price: 28990,
        product: 'Fender American Professional II Telecaster',
        retailer: 'Gear4Music',
        url: 'https://www.gear4music.no',
        note: 'USA-built, studio-grade'
      }
    }
  },
  {
    id: 'trail',
    name: 'Terrengsko',
    nameEn: 'Trail / hiking shoes',
    category: 'Sport',
    icon: 'boot',
    accent: '#86efac',
    tiers: {
      budget: {
        price: 999,
        product: 'Merrell Moab 3 GTX',
        retailer: 'XXL',
        url: 'https://www.xxl.no',
        note: 'Reliable, waterproof, sub-1k'
      },
      optimal: {
        price: 2199,
        product: 'Salomon Speedcross 6 GTX',
        retailer: 'XXL',
        url: 'https://www.xxl.no',
        note: 'Norwegian forest favourite'
      },
      premium: {
        price: 3999,
        product: 'Scarpa Rush 2 Pro GTX',
        retailer: 'Sport1',
        url: 'https://www.sport1.no',
        note: 'Alpine-grade, all-day comfort'
      }
    }
  },
  {
    id: 'running',
    name: 'Løpesko',
    nameEn: 'Running shoes',
    category: 'Sport',
    icon: 'shoe',
    accent: '#fda4af',
    tiers: {
      budget: {
        price: 899,
        product: 'Asics Gel-Excite 10',
        retailer: 'XXL',
        url: 'https://www.xxl.no',
        note: 'Honest daily trainer'
      },
      optimal: {
        price: 1999,
        product: 'Nike Pegasus 41',
        retailer: 'Løplabbet',
        url: 'https://www.loplabbet.no',
        note: 'The do-everything classic'
      },
      premium: {
        price: 3499,
        product: 'Nike Alphafly 3',
        retailer: 'Løplabbet',
        url: 'https://www.loplabbet.no',
        note: 'Race-day super-shoe'
      }
    }
  },
  {
    id: 'tennis',
    name: 'Tennis',
    nameEn: 'Tennis kit',
    category: 'Sport',
    icon: 'tennis',
    accent: '#fde047',
    tiers: {
      budget: {
        price: 999,
        product: 'Wilson Tour Slam · racket + 3 balls',
        retailer: 'XXL',
        url: 'https://www.xxl.no',
        note: 'Get-on-court starter set'
      },
      optimal: {
        price: 2690,
        product: 'Babolat Pure Drive · racket + bag',
        retailer: 'Tennishuset',
        url: 'https://www.tennishuset.no',
        note: 'Tour-proven all-court'
      },
      premium: {
        price: 4990,
        product: 'Wilson Blade 98 v9 + bag + 12 balls',
        retailer: 'Tennishuset',
        url: 'https://www.tennishuset.no',
        note: 'Player-grade setup'
      }
    }
  },
  {
    id: 'bike',
    name: 'Sykkel',
    nameEn: 'Bicycle',
    category: 'Sport',
    icon: 'bike',
    accent: '#67e8f9',
    tiers: {
      budget: {
        price: 4990,
        product: 'Nakamura Crossfire 100 · hybrid',
        retailer: 'G-Sport',
        url: 'https://www.gsport.no',
        note: 'Solid commute + light trail'
      },
      optimal: {
        price: 17990,
        product: 'Trek FX Sport 4 · carbon hybrid',
        retailer: 'Sport1',
        url: 'https://www.sport1.no',
        note: 'Fast, light, versatile'
      },
      premium: {
        price: 59990,
        product: 'Trek Domane SL 7 · Ultegra Di2',
        retailer: 'Birk Sport',
        url: 'https://www.birksport.no',
        note: 'Endurance road weapon'
      }
    }
  },
  {
    id: 'speaker',
    name: 'Høytaler',
    nameEn: 'Speaker',
    category: 'Elektronikk',
    icon: 'speaker',
    accent: '#f9a8d4',
    tiers: {
      budget: {
        price: 999,
        product: 'JBL Charge 5 · bluetooth · IP67',
        retailer: 'Power',
        url: 'https://www.power.no',
        note: 'Portable, big sound'
      },
      optimal: {
        price: 6990,
        product: 'Sonos Era 300 · spatial audio',
        retailer: 'Hi-Fi Klubben',
        url: 'https://www.hifiklubben.no',
        note: 'Wifi multi-room, room-filling'
      },
      premium: {
        price: 24990,
        product: 'KEF LS50 Wireless II · pair',
        retailer: 'Hi-Fi Klubben',
        url: 'https://www.hifiklubben.no',
        note: 'Audiophile reference, active'
      }
    }
  }
];

// Curated "Smart mix" — best bang-for-buck per item, hand-picked.
// PC + phone + guitar + bike pull their weight at optimal; everyday gear stays cheap.
const SMART_MIX = {
  pc: 'optimal',
  phone: 'optimal',
  telecaster: 'optimal',
  trail: 'budget',
  running: 'optimal',
  tennis: 'budget',
  bike: 'optimal',
  speaker: 'optimal'
};

// Inline SVG icon paths (Lucide-style 24x24 stroke icons)
const ICONS = {
  monitor: '<rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>',
  phone: '<rect x="7" y="2" width="10" height="20" rx="2"/><line x1="11" y1="18" x2="13" y2="18"/>',
  guitar: '<path d="M11.9 12.1l4.514-4.514"/><path d="M20.1 2.3a1 1 0 0 0-1.4 0l-1.99 1.99a1 1 0 0 0-.3.7v2.92l-6.93 6.93a3 3 0 1 0 .58.58l6.93-6.93h2.92a1 1 0 0 0 .7-.3l1.99-1.99a1 1 0 0 0 0-1.4Z"/><circle cx="6" cy="18" r="3"/>',
  boot: '<path d="M3 21h18"/><path d="M5 21V8a2 2 0 0 1 2-2h3l4 4h5a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2h-3l-2-2-2 2H7a2 2 0 0 1-2-2Z"/><path d="M10 6V3"/>',
  shoe: '<path d="M2 18h20"/><path d="M4 18v-3c0-1 1-2 2-2h2l4-5 4 2 4 1c2 0 2 2 2 3v4"/><path d="M8 13v-2"/><path d="M12 8l-1-2"/>',
  tennis: '<circle cx="12" cy="12" r="10"/><path d="M21.8 14a10 10 0 0 0-19.6 0"/><path d="M21.8 10a10 10 0 0 1-19.6 0"/>',
  bike: '<circle cx="5.5" cy="17.5" r="3.5"/><circle cx="18.5" cy="17.5" r="3.5"/><path d="M15 6a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-3 11.5V14l-3-3 4-3 2 3h2"/>',
  speaker: '<rect x="4" y="2" width="16" height="20" rx="2"/><circle cx="12" cy="14" r="4"/><circle cx="12" cy="6" r="1"/>'
};
