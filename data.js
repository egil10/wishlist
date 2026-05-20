/* Wishlist data — Norway 2026, Prisjakt-style catalog
 * 8 categories · ~8 products each · multiple retailers · 12-month price history.
 * Prices in NOK, indicative of typical shelf prices and price-comparison sites.
 */

const CATEGORIES = [
  { id: 'pc',         name: 'PC m/ GPU',     nameEn: 'Gaming PCs',          icon: 'monitor', accent: '#7dd3fc' },
  { id: 'phone',      name: 'Mobiltelefon',  nameEn: 'Mobile phones',       icon: 'phone',   accent: '#a78bfa' },
  { id: 'telecaster', name: 'Telecaster',    nameEn: 'Electric guitars',    icon: 'guitar',  accent: '#fbbf24' },
  { id: 'trail',      name: 'Terrengsko',    nameEn: 'Trail / hiking shoes',icon: 'boot',    accent: '#86efac' },
  { id: 'running',    name: 'Løpesko',       nameEn: 'Running shoes',       icon: 'shoe',    accent: '#fda4af' },
  { id: 'tennis',     name: 'Tennis',        nameEn: 'Tennis equipment',    icon: 'tennis',  accent: '#fde047' },
  { id: 'bike',       name: 'Sykkel',        nameEn: 'Bicycles',            icon: 'bike',    accent: '#67e8f9' },
  { id: 'speaker',    name: 'Høytaler',      nameEn: 'Speakers',            icon: 'speaker', accent: '#f9a8d4' }
];

/* Per-product fields:
 *   id, categoryId, name, brand, specs, rating (0-5), reviews, year (released), price (current lowest),
 *   retailers { name: price } — multiple stores; the lowest becomes the displayed price
 */
const PRODUCTS = [
  // ── PC m/ GPU ───────────────────────────────────────────────────────────
  { id: 'pc-multicom-allround-4060',     categoryId: 'pc', name: 'Multicom Allround',          brand: 'Multicom',       specs: 'i5-12400F · RTX 4060 8GB · 16GB DDR4 · 500GB NVMe',          rating: 4.1, reviews:  92, year: 2024, price:  8990, retailers: { 'Multicom':  8990, 'Komplett':  9290 } },
  { id: 'pc-pcs-starter-4060',           categoryId: 'pc', name: 'PCSpesialisten Starter',     brand: 'PCSpesialisten', specs: 'Ryzen 5 5600 · RTX 4060 8GB · 16GB · 1TB SSD',                rating: 4.0, reviews:  41, year: 2024, price:  9490, retailers: { 'PCSpesialisten': 9490, 'Komplett':  9790 } },
  { id: 'pc-komplett-xs-4060ti',         categoryId: 'pc', name: 'Komplett Gamer XS',          brand: 'Komplett',       specs: 'Ryzen 5 7600 · RTX 4060 Ti · 16GB DDR5 · 1TB',                rating: 4.3, reviews: 156, year: 2024, price: 12490, retailers: { 'Komplett': 12490, 'Multicom': 12890 } },
  { id: 'pc-multicom-kobalt-4070',       categoryId: 'pc', name: 'Multicom Kobalt',            brand: 'Multicom',       specs: 'Ryzen 7 7700X · RTX 4070 12GB · 32GB DDR5 · 1TB',             rating: 4.5, reviews:  78, year: 2024, price: 15990, retailers: { 'Multicom': 15990, 'Komplett': 16290 } },
  { id: 'pc-komplett-m-4070s',           categoryId: 'pc', name: 'Komplett Gamer M',           brand: 'Komplett',       specs: 'Ryzen 7 7800X3D · RTX 4070 Super · 32GB · 2TB NVMe',          rating: 4.7, reviews: 203, year: 2024, price: 18990, retailers: { 'Komplett': 18990, 'PCSpesialisten': 19490 } },
  { id: 'pc-multicom-flow-4070tis',      categoryId: 'pc', name: 'Multicom Flow',              brand: 'Multicom',       specs: 'i7-14700K · RTX 4070 Ti Super 16GB · 32GB DDR5 · 2TB',        rating: 4.6, reviews:  64, year: 2024, price: 25990, retailers: { 'Multicom': 25990 } },
  { id: 'pc-komplett-ws-4080s',          categoryId: 'pc', name: 'Komplett Workstation',       brand: 'Komplett',       specs: 'i9-14900K · RTX 4080 Super 16GB · 64GB DDR5 · 2TB',           rating: 4.8, reviews:  38, year: 2024, price: 34990, retailers: { 'Komplett': 34990 } },
  { id: 'pc-multicom-flow-4090',         categoryId: 'pc', name: 'Multicom Flow Ultra',        brand: 'Multicom',       specs: 'i9-14900K · RTX 4090 24GB · 64GB DDR5 · 4TB NVMe',            rating: 4.9, reviews:  28, year: 2024, price: 49990, retailers: { 'Multicom': 49990, 'Komplett': 51990 } },

  // ── Mobiltelefon ────────────────────────────────────────────────────────
  { id: 'phone-samsung-a55',             categoryId: 'phone', name: 'Samsung Galaxy A55 5G',    brand: 'Samsung', specs: '128GB · 8GB RAM · 6.6" AMOLED 120Hz · 50MP',          rating: 4.2, reviews:  412, year: 2024, price:  2999, retailers: { 'Power':  2999, 'Elkjøp':  3199, 'Telenor':  3290 } },
  { id: 'phone-pixel-8a',                categoryId: 'phone', name: 'Google Pixel 8a',          brand: 'Google',  specs: '128GB · Tensor G3 · 6.1" OLED · 7 years updates',     rating: 4.5, reviews:  287, year: 2024, price:  5490, retailers: { 'Elkjøp':  5490, 'Power':   5690 } },
  { id: 'phone-samsung-s24fe',           categoryId: 'phone', name: 'Samsung Galaxy S24 FE',    brand: 'Samsung', specs: '128GB · Exynos 2400e · 6.7" AMOLED 120Hz',            rating: 4.3, reviews:  198, year: 2024, price:  7490, retailers: { 'Elkjøp':  7490, 'Power':   7690 } },
  { id: 'phone-iphone-15',               categoryId: 'phone', name: 'iPhone 15',                brand: 'Apple',   specs: '128GB · A16 Bionic · 6.1" Super Retina XDR · USB-C',  rating: 4.6, reviews: 1247, year: 2023, price:  9990, retailers: { 'Elkjøp':  9990, 'Power':  10290, 'Eplehuset': 10490 } },
  { id: 'phone-samsung-s24',             categoryId: 'phone', name: 'Samsung Galaxy S24',       brand: 'Samsung', specs: '256GB · Snapdragon 8 Gen 3 · 6.2" AMOLED · AI',       rating: 4.6, reviews:  723, year: 2024, price: 11490, retailers: { 'Elkjøp': 11490, 'Power':  11790 } },
  { id: 'phone-iphone-15-pro',           categoryId: 'phone', name: 'iPhone 15 Pro',            brand: 'Apple',   specs: '128GB · A17 Pro · 6.1" ProMotion · Titanium · USB-C', rating: 4.7, reviews:  892, year: 2023, price: 13990, retailers: { 'Elkjøp': 13990, 'Eplehuset': 14290 } },
  { id: 'phone-samsung-s24-ultra',       categoryId: 'phone', name: 'Samsung Galaxy S24 Ultra', brand: 'Samsung', specs: '256GB · 6.8" QHD+ AMOLED · 200MP · S Pen · titanium', rating: 4.8, reviews:  567, year: 2024, price: 15990, retailers: { 'Elkjøp': 15990, 'Power':  16490 } },
  { id: 'phone-iphone-15-pro-max',       categoryId: 'phone', name: 'iPhone 15 Pro Max',        brand: 'Apple',   specs: '256GB · A17 Pro · 6.7" ProMotion · 5x telephoto',     rating: 4.8, reviews: 1102, year: 2023, price: 18990, retailers: { 'Elkjøp': 18990, 'Eplehuset': 19290 } },

  // ── Telecaster ─────────────────────────────────────────────────────────
  { id: 'tele-squier-sonic',             categoryId: 'telecaster', name: 'Squier Sonic Telecaster',                            brand: 'Squier',     specs: 'Poplar body · maple neck · ceramic single-coils',           rating: 4.1, reviews: 234, year: 2023, price:  2290, retailers: { '4Sound':  2290, 'Gear4Music':  2390 } },
  { id: 'tele-squier-affinity',          categoryId: 'telecaster', name: 'Squier Affinity Telecaster',                         brand: 'Squier',     specs: 'Poplar · maple · butterscotch · 21F',                       rating: 4.3, reviews: 412, year: 2021, price:  3690, retailers: { '4Sound':  3690, 'Gear4Music':  3790, 'Norsk Musikk': 3890 } },
  { id: 'tele-squier-cv50',              categoryId: 'telecaster', name: 'Squier Classic Vibe \'50s Telecaster',               brand: 'Squier',     specs: 'Pine body · maple · alnico single-coils · vintage tone',    rating: 4.6, reviews: 287, year: 2019, price:  5490, retailers: { '4Sound':  5490, 'Gear4Music':  5690 } },
  { id: 'tele-fender-player',            categoryId: 'telecaster', name: 'Fender Player Telecaster MN',                        brand: 'Fender',     specs: 'Alder body · maple · Player Alnico V single-coils',         rating: 4.7, reviews: 524, year: 2018, price:  9490, retailers: { '4Sound':  9490, 'Gear4Music':  9690 } },
  { id: 'tele-fender-player2',           categoryId: 'telecaster', name: 'Fender Player II Telecaster',                        brand: 'Fender',     specs: 'Alder · rolled fingerboard edges · 22F · improved trem',    rating: 4.7, reviews: 142, year: 2024, price: 13490, retailers: { '4Sound': 13490, 'Gear4Music': 13690 } },
  { id: 'tele-fender-vintera-50s',       categoryId: 'telecaster', name: 'Fender Vintera II \'50s Telecaster',                 brand: 'Fender',     specs: 'Mexican-built · vintage-tall frets · Pure Vintage pickups', rating: 4.8, reviews:  89, year: 2023, price: 17490, retailers: { '4Sound': 17490, 'Gear4Music': 17890 } },
  { id: 'tele-fender-amp2',              categoryId: 'telecaster', name: 'Fender American Professional II Telecaster',         brand: 'Fender',     specs: 'USA-built · V-Mod II pickups · deep "C" neck · push/pull',  rating: 4.9, reviews: 178, year: 2020, price: 27990, retailers: { '4Sound': 27990, 'Gear4Music': 28490 } },
  { id: 'tele-fender-cs50',              categoryId: 'telecaster', name: 'Fender Custom Shop \'50s Telecaster Journeyman Relic',brand: 'Fender CS',  specs: 'Hand-built USA · Journeyman aging · hand-wound pickups',    rating: 4.9, reviews:  32, year: 2023, price: 54990, retailers: { '4Sound': 54990 } },

  // ── Terrengsko ─────────────────────────────────────────────────────────
  { id: 'trail-merrell-moab3-gtx',       categoryId: 'trail', name: 'Merrell Moab 3 GTX',                brand: 'Merrell',     specs: 'Gore-Tex · Vibram TC5+ · all-day comfort',          rating: 4.4, reviews: 612, year: 2022, price:  999, retailers: { 'XXL':  999, 'Sport1': 1099, 'Anton Sport': 1199 } },
  { id: 'trail-salomon-crosshike2-gtx',  categoryId: 'trail', name: 'Salomon Cross Hike 2 GTX',          brand: 'Salomon',     specs: 'Gore-Tex · Contagrip MA · ADV-C Chassis',           rating: 4.5, reviews: 384, year: 2023, price: 1399, retailers: { 'XXL': 1399, 'Anton Sport': 1499 } },
  { id: 'trail-salomon-speedcross6',     categoryId: 'trail', name: 'Salomon Speedcross 6',              brand: 'Salomon',     specs: 'Contagrip TA · SensiFit · 5mm aggressive lugs',     rating: 4.6, reviews: 521, year: 2022, price: 1690, retailers: { 'XXL': 1690, 'Sport1': 1790 } },
  { id: 'trail-salomon-speedcross6-gtx', categoryId: 'trail', name: 'Salomon Speedcross 6 GTX',          brand: 'Salomon',     specs: 'Gore-Tex · 5mm lugs · EnergyCell midsole',          rating: 4.7, reviews: 698, year: 2022, price: 2199, retailers: { 'XXL': 2199, 'Anton Sport': 2299, 'Sport1': 2349 } },
  { id: 'trail-lasportiva-bushido3',     categoryId: 'trail', name: 'La Sportiva Bushido III',           brand: 'La Sportiva', specs: 'FriXion XT 2.0 · STB Control · compression EVA',    rating: 4.7, reviews: 245, year: 2023, price: 2390, retailers: { 'XXL': 2390, 'Bergans': 2490 } },
  { id: 'trail-salewa-wildfire2-gtx',    categoryId: 'trail', name: 'Salewa Wildfire 2 GTX',             brand: 'Salewa',      specs: 'Gore-Tex Extended · Pomoca outsole · 3F System',    rating: 4.6, reviews: 172, year: 2024, price: 2790, retailers: { 'Sport1': 2790, 'XXL': 2890 } },
  { id: 'trail-hoka-speedgoat6-gtx',     categoryId: 'trail', name: 'Hoka Speedgoat 6 GTX',              brand: 'Hoka',        specs: 'Gore-Tex · Vibram Megagrip · cushioned EVA',        rating: 4.7, reviews: 318, year: 2024, price: 2999, retailers: { 'XXL': 2999, 'Løplabbet': 3090 } },
  { id: 'trail-scarpa-rush2pro-gtx',     categoryId: 'trail', name: 'Scarpa Rush 2 Pro GTX',             brand: 'Scarpa',      specs: 'Gore-Tex Invisible Fit · Vibram Megagrip · DD plate',rating: 4.8, reviews: 124, year: 2023, price: 3990, retailers: { 'Sport1': 3990 } },

  // ── Løpesko ────────────────────────────────────────────────────────────
  { id: 'run-nike-revolution7',          categoryId: 'running', name: 'Nike Revolution 7',         brand: 'Nike',   specs: 'Foam midsole · mesh upper · 9.5mm drop',          rating: 4.2, reviews: 543, year: 2023, price:  749, retailers: { 'XXL':  749, 'Sport1':  799 } },
  { id: 'run-asics-gel-excite10',        categoryId: 'running', name: 'Asics Gel-Excite 10',       brand: 'Asics',  specs: 'AmpliFoam Plus · GEL · 10mm drop · everyday',     rating: 4.3, reviews: 487, year: 2023, price:  899, retailers: { 'XXL':  899, 'Sport1':  949 } },
  { id: 'run-adidas-adizero-sl',         categoryId: 'running', name: 'Adidas Adizero SL',         brand: 'Adidas', specs: 'Lightstrike + Lightstrike Pro · Energy rods',     rating: 4.5, reviews: 312, year: 2023, price: 1290, retailers: { 'XXL': 1290, 'Sport1': 1390 } },
  { id: 'run-asics-novablast4',          categoryId: 'running', name: 'Asics Novablast 4',         brand: 'Asics',  specs: 'FF BLAST+ ECO · trampoline geometry · 8mm',       rating: 4.6, reviews: 421, year: 2024, price: 1690, retailers: { 'XXL': 1690, 'Løplabbet': 1790 } },
  { id: 'run-nike-pegasus41',            categoryId: 'running', name: 'Nike Pegasus 41',           brand: 'Nike',   specs: 'ReactX foam · 2× Zoom Air · 10mm drop · daily',   rating: 4.6, reviews: 587, year: 2024, price: 1999, retailers: { 'XXL': 1999, 'Løplabbet': 2090, 'Sport1': 2099 } },
  { id: 'run-asics-nimbus26',            categoryId: 'running', name: 'Asics Gel-Nimbus 26',       brand: 'Asics',  specs: 'FF BLAST+ ECO · PureGEL · 8mm · max cushion',     rating: 4.7, reviews: 364, year: 2024, price: 2290, retailers: { 'Løplabbet': 2290, 'XXL': 2390 } },
  { id: 'run-nike-vaporfly3',            categoryId: 'running', name: 'Nike Vaporfly 3',           brand: 'Nike',   specs: 'ZoomX · carbon plate · 8mm · race shoe',          rating: 4.7, reviews: 218, year: 2023, price: 3290, retailers: { 'Løplabbet': 3290, 'XXL': 3390 } },
  { id: 'run-nike-alphafly3',            categoryId: 'running', name: 'Nike Alphafly 3',           brand: 'Nike',   specs: 'ZoomX · carbon · 2× Zoom Air pods · marathon',    rating: 4.8, reviews: 167, year: 2024, price: 3499, retailers: { 'Løplabbet': 3499 } },

  // ── Tennis ────────────────────────────────────────────────────────────
  { id: 'tennis-wilson-tour-slam',       categoryId: 'tennis', name: 'Wilson Tour Slam Lite',                 brand: 'Wilson',  specs: '274g · 105 sq in · pre-strung · starter',       rating: 4.0, reviews: 387, year: 2022, price:  699, retailers: { 'XXL':  699, 'Sport1':  799 } },
  { id: 'tennis-head-tis6',              categoryId: 'tennis', name: 'Head Ti.S6',                            brand: 'Head',    specs: '225g · 115 sq in · oversize · power',           rating: 4.4, reviews: 612, year: 2010, price:  999, retailers: { 'XXL':  999, 'Tennishuset': 1099 } },
  { id: 'tennis-wilson-prostaff-prec',   categoryId: 'tennis', name: 'Wilson Pro Staff Precision 100 v14',   brand: 'Wilson',  specs: '290g · 100 sq in · pre-strung · all-court',     rating: 4.3, reviews: 198, year: 2023, price: 1390, retailers: { 'XXL': 1390, 'Tennishuset': 1490 } },
  { id: 'tennis-babolat-aero-lite',      categoryId: 'tennis', name: 'Babolat Pure Aero Lite 2023',           brand: 'Babolat', specs: '270g · 100 sq in · spin frame · unstrung',      rating: 4.5, reviews: 256, year: 2023, price: 1990, retailers: { 'Tennishuset': 1990, 'XXL': 2090 } },
  { id: 'tennis-wilson-clash100v2',      categoryId: 'tennis', name: 'Wilson Clash 100 v2',                   brand: 'Wilson',  specs: '295g · 100 sq in · FreeFlex · feel + power',    rating: 4.6, reviews: 312, year: 2022, price: 2490, retailers: { 'Tennishuset': 2490 } },
  { id: 'tennis-babolat-pure-drive',     categoryId: 'tennis', name: 'Babolat Pure Drive 2024',               brand: 'Babolat', specs: '300g · 100 sq in · NF² Tech · all-court power', rating: 4.7, reviews: 478, year: 2024, price: 2690, retailers: { 'Tennishuset': 2690, 'XXL': 2790 } },
  { id: 'tennis-wilson-blade98v9',       categoryId: 'tennis', name: 'Wilson Blade 98 v9 + bag',              brand: 'Wilson',  specs: '305g · 98 sq in · 16x19 · control · w/ bag',    rating: 4.8, reviews: 187, year: 2024, price: 2990, retailers: { 'Tennishuset': 2990 } },
  { id: 'tennis-wilson-rf97v14',         categoryId: 'tennis', name: 'Wilson Pro Staff RF97 v14 + bag + balls',brand: 'Wilson', specs: '340g · 97 sq in · Federer signature · player',  rating: 4.9, reviews: 142, year: 2024, price: 4290, retailers: { 'Tennishuset': 4290 } },

  // ── Sykkel ────────────────────────────────────────────────────────────
  { id: 'bike-nakamura-crossfire100',    categoryId: 'bike', name: 'Nakamura Crossfire 100',                  brand: 'Nakamura',    specs: 'Aluminium hybrid · Shimano 21-speed · 700C',           rating: 4.0, reviews: 287, year: 2024, price:  4990, retailers: { 'G-Sport':  4990, 'Intersport':  5290 } },
  { id: 'bike-dbs-bizon-7',              categoryId: 'bike', name: 'DBS Bizon Classic 7',                     brand: 'DBS',         specs: 'Steel city bike · 7-speed · fenders + rack',           rating: 4.3, reviews: 412, year: 2023, price:  5990, retailers: { 'XXL':  5990, 'G-Sport':  6190 } },
  { id: 'bike-trek-fx2-disc',            categoryId: 'bike', name: 'Trek FX 2 Disc',                          brand: 'Trek',        specs: 'Aluminium · 18-speed Shimano · hydraulic disc',        rating: 4.5, reviews: 367, year: 2023, price:  8490, retailers: { 'Sport1':  8490, 'Birk Sport':  8690 } },
  { id: 'bike-specialized-sirrus3',      categoryId: 'bike', name: 'Specialized Sirrus X 3.0',                brand: 'Specialized', specs: '2×9 Sora · hydraulic disc · 38mm tyres · fitness',     rating: 4.6, reviews: 234, year: 2024, price: 10990, retailers: { 'Birk Sport': 10990 } },
  { id: 'bike-trek-marlin7',             categoryId: 'bike', name: 'Trek Marlin 7 Gen 3',                     brand: 'Trek',        specs: 'Aluminium MTB · RockShox · 100mm travel · 1×12',       rating: 4.6, reviews: 298, year: 2024, price: 11990, retailers: { 'Sport1': 11990, 'Birk Sport': 12290 } },
  { id: 'bike-trek-fx-sport4',           categoryId: 'bike', name: 'Trek FX Sport 4 Carbon',                  brand: 'Trek',        specs: 'OCLV carbon · 2×10 Shimano 105 · IsoSpeed',            rating: 4.7, reviews: 156, year: 2023, price: 17990, retailers: { 'Sport1': 17990, 'Birk Sport': 18290 } },
  { id: 'bike-specialized-tarmac-sl7',   categoryId: 'bike', name: 'Specialized Tarmac SL7 Sport',            brand: 'Specialized', specs: 'FACT 10r carbon · 105 Di2 · 28mm · road race',         rating: 4.8, reviews:  89, year: 2023, price: 37990, retailers: { 'Birk Sport': 37990 } },
  { id: 'bike-trek-domane-sl7',          categoryId: 'bike', name: 'Trek Domane SL 7 Ultegra Di2',            brand: 'Trek',        specs: 'OCLV 500 · Ultegra Di2 12-speed · IsoSpeed endurance', rating: 4.9, reviews:  67, year: 2024, price: 59990, retailers: { 'Sport1': 59990, 'Birk Sport': 61290 } },

  // ── Høytaler ──────────────────────────────────────────────────────────
  { id: 'spk-jbl-flip6',                 categoryId: 'speaker', name: 'JBL Flip 6',                  brand: 'JBL',   specs: 'Bluetooth 5.1 · IP67 · 12h · PartyBoost',          rating: 4.5, reviews: 823, year: 2021, price:  1199, retailers: { 'Power':  1199, 'Elkjøp':  1290 } },
  { id: 'spk-jbl-charge5',               categoryId: 'speaker', name: 'JBL Charge 5',                brand: 'JBL',   specs: 'Bluetooth · IP67 · 20h · powerbank built-in',      rating: 4.6, reviews:1247, year: 2021, price:  1490, retailers: { 'Power':  1490, 'Elkjøp':  1590 } },
  { id: 'spk-sonos-roam2',               categoryId: 'speaker', name: 'Sonos Roam 2',                brand: 'Sonos', specs: 'WiFi + BT · IP67 · 10h · Trueplay tuning',         rating: 4.5, reviews: 287, year: 2024, price:  2190, retailers: { 'Hi-Fi Klubben':  2190, 'Power':   2290 } },
  { id: 'spk-sonos-era100',              categoryId: 'speaker', name: 'Sonos Era 100',               brand: 'Sonos', specs: 'WiFi · BT · stereo pair-able · Trueplay · line-in',rating: 4.6, reviews: 412, year: 2023, price:  3490, retailers: { 'Hi-Fi Klubben':  3490, 'Power':   3590, 'Elkjøp':  3690 } },
  { id: 'spk-sonos-era300',              categoryId: 'speaker', name: 'Sonos Era 300',               brand: 'Sonos', specs: 'WiFi · spatial audio · Dolby Atmos · 6 drivers',   rating: 4.7, reviews: 298, year: 2023, price:  6990, retailers: { 'Hi-Fi Klubben':  6990, 'Power':   7190 } },
  { id: 'spk-kef-lsx2',                  categoryId: 'speaker', name: 'KEF LSX II (pair)',           brand: 'KEF',   specs: 'Active wireless · WiFi · HDMI ARC · 24/96 · pair', rating: 4.7, reviews: 164, year: 2022, price:  8990, retailers: { 'Hi-Fi Klubben':  8990, 'Audiophile.no':  9290 } },
  { id: 'spk-kef-ls50w2',                categoryId: 'speaker', name: 'KEF LS50 Wireless II (pair)', brand: 'KEF',   specs: 'Active · 24/384 · MQA · audiophile reference',     rating: 4.8, reviews: 218, year: 2020, price: 22990, retailers: { 'Hi-Fi Klubben': 22990 } },
  { id: 'spk-sonos-arc-sub',             categoryId: 'speaker', name: 'Sonos Arc + Sub Gen 3 set',   brand: 'Sonos', specs: 'Dolby Atmos soundbar + wireless sub · home theatre',rating: 4.8, reviews: 287, year: 2023, price: 24990, retailers: { 'Hi-Fi Klubben': 24990, 'Power':  25490 } }
];

// Curated picks per category for the presets
const OPTIMAL_PICKS = {
  pc:         'pc-komplett-m-4070s',
  phone:      'phone-iphone-15',
  telecaster: 'tele-fender-player2',
  trail:      'trail-salomon-speedcross6-gtx',
  running:    'run-nike-pegasus41',
  tennis:     'tennis-babolat-pure-drive',
  bike:       'bike-trek-fx-sport4',
  speaker:    'spk-sonos-era300'
};

// Smart mix — spend on what matters, save on what doesn't
const SMART_MIX = {
  pc:         'pc-komplett-m-4070s',
  phone:      'phone-pixel-8a',
  telecaster: 'tele-fender-player2',
  trail:      'trail-merrell-moab3-gtx',
  running:    'run-nike-pegasus41',
  tennis:     'tennis-wilson-tour-slam',
  bike:       'bike-trek-fx-sport4',
  speaker:    'spk-sonos-era100'
};

/* ──────────────────────────────────────────────────────────────────────
 * Deterministic 12-month price history per product.
 * Seeded by product id so the chart is stable across reloads.
 */
function _hashStr(s) {
  let h = 1779033703 ^ s.length;
  for (let i = 0; i < s.length; i++) {
    h = Math.imul(h ^ s.charCodeAt(i), 3432918353);
    h = (h << 13) | (h >>> 19);
  }
  return (h ^ (h >>> 16)) >>> 0;
}
function _mulberry32(seed) {
  let t = seed >>> 0;
  return function () {
    t = (t + 0x6D2B79F5) >>> 0;
    let r = t;
    r = Math.imul(r ^ (r >>> 15), r | 1);
    r ^= r + Math.imul(r ^ (r >>> 7), r | 61);
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}

function buildPriceHistory(productId, currentPrice, releaseYear) {
  const rand = _mulberry32(_hashStr(productId));
  const months = 13; // 12 prior months + current
  // Newer products started higher 12 months ago; older products are mostly flat.
  const ageBoost = Math.max(0, 2024 - releaseYear);
  const startBump = Math.max(0, 0.04 + rand() * 0.09 - ageBoost * 0.02);
  const startPrice = currentPrice * (1 + startBump);

  const out = new Array(months);
  out[0] = Math.round(startPrice / 10) * 10;
  out[months - 1] = currentPrice;

  for (let i = 1; i < months - 1; i++) {
    const t = i / (months - 1);
    const interp = startPrice * (1 - t) + currentPrice * t;
    const noise = (rand() - 0.5) * currentPrice * 0.035;
    // Black Friday dip ~6 months back, summer dip ~10 months back
    const dip = i === 6 ? -currentPrice * 0.07 : i === 10 ? -currentPrice * 0.03 : 0;
    let p = interp + noise + dip;
    p = Math.max(currentPrice * 0.85, Math.min(currentPrice * 1.3, p));
    out[i] = Math.round(p / 10) * 10;
  }
  return out;
}

// Annotate each product with computed fields
for (const p of PRODUCTS) {
  p.priceHistory = buildPriceHistory(p.id, p.price, p.year);
  const oldPrice = p.priceHistory[0];
  p.priceChange12mo = oldPrice > 0 ? (p.price - oldPrice) / oldPrice : 0;
  // Cheapest retailer (first by name on tie)
  let bestName = '', bestPrice = Infinity;
  for (const [name, price] of Object.entries(p.retailers)) {
    if (price < bestPrice) { bestPrice = price; bestName = name; }
  }
  p.cheapestRetailer = { name: bestName, price: bestPrice };
}

// Tier labels per category, by ascending price
for (const cat of CATEGORIES) {
  const prods = PRODUCTS.filter((p) => p.categoryId === cat.id).sort((a, b) => a.price - b.price);
  prods.forEach((p, i) => {
    p.tierLabel = i < 2 ? 'Budget' : i < 5 ? 'Mid' : i < 7 ? 'High' : 'Premium';
  });
}

/* ──────────────────────────────────────────────────────────────────────
 * Retailer URLs — best-effort search URL pattern per Norwegian retailer.
 * Falls back to a Google site-scoped search for retailers we don't have a
 * direct pattern for. Edit any pattern below if a retailer's URL changes.
 */
const RETAILER_DOMAINS = {
  'Komplett':       'komplett.no',
  'Elkjøp':         'elkjop.no',
  'Power':          'power.no',
  'XXL':            'xxl.no',
  'Sport1':         'sport1.no',
  '4Sound':         '4sound.no',
  'Gear4Music':     'gear4music.no',
  'Norsk Musikk':   'norskmusikk.com',
  'Multicom':       'multicom.no',
  'PCSpesialisten': 'pcspesialisten.no',
  'Hi-Fi Klubben':  'hifiklubben.no',
  'Tennishuset':    'tennishuset.no',
  'Løplabbet':      'loplabbet.no',
  'Birk Sport':     'birksport.no',
  'G-Sport':        'gsport.no',
  'Intersport':     'intersport.no',
  'Eplehuset':      'eplehuset.no',
  'Anton Sport':    'antonsport.no',
  'Bergans':        'bergans.com',
  'Audiophile.no':  'audiophile.no',
  'Telenor':        'telenor.no'
};

const RETAILER_URLS = {
  'Komplett':       (q) => `https://www.komplett.no/search?q=${encodeURIComponent(q)}`,
  'Elkjøp':         (q) => `https://www.elkjop.no/search?searchTerm=${encodeURIComponent(q)}`,
  'Power':          (q) => `https://www.power.no/search/?q=${encodeURIComponent(q)}`,
  'XXL':            (q) => `https://www.xxl.no/search?query=${encodeURIComponent(q)}`,
  'Sport1':         (q) => `https://www.sport1.no/search?q=${encodeURIComponent(q)}`,
  '4Sound':         (q) => `https://www.4sound.no/search?q=${encodeURIComponent(q)}`,
  'Gear4Music':     (q) => `https://www.gear4music.no/search?search=${encodeURIComponent(q)}`,
  'Norsk Musikk':   (q) => `https://www.norskmusikk.com/search?type=product&q=${encodeURIComponent(q)}`,
  'Multicom':       (q) => `https://www.multicom.no/search?text=${encodeURIComponent(q)}`,
  'PCSpesialisten': (q) => `https://www.pcspesialisten.no/?s=${encodeURIComponent(q)}`,
  'Hi-Fi Klubben':  (q) => `https://www.hifiklubben.no/sok/?q=${encodeURIComponent(q)}`,
  'Tennishuset':    (q) => `https://tennishuset.no/?s=${encodeURIComponent(q)}`,
  'Løplabbet':      (q) => `https://www.loplabbet.no/?s=${encodeURIComponent(q)}`,
  'Birk Sport':     (q) => `https://www.birksport.no/search?q=${encodeURIComponent(q)}`,
  'G-Sport':        (q) => `https://www.gsport.no/search?q=${encodeURIComponent(q)}`,
  'Intersport':     (q) => `https://www.intersport.no/search?q=${encodeURIComponent(q)}`,
  'Eplehuset':      (q) => `https://www.eplehuset.no/sok?q=${encodeURIComponent(q)}`,
  'Anton Sport':    (q) => `https://antonsport.no/?s=${encodeURIComponent(q)}`,
  'Bergans':        (q) => `https://www.bergans.com/no/search?q=${encodeURIComponent(q)}`,
  'Audiophile.no':  (q) => `https://www.audiophile.no/?s=${encodeURIComponent(q)}`,
  'Telenor':        (q) => `https://www.telenor.no/handle/mobil/?search=${encodeURIComponent(q)}`
};

function retailerUrl(retailer, productName) {
  const fn = RETAILER_URLS[retailer];
  if (fn) return fn(productName);
  const domain = RETAILER_DOMAINS[retailer];
  if (domain) return `https://www.google.com/search?q=site%3A${domain}+${encodeURIComponent(productName)}`;
  return `https://www.google.com/search?q=${encodeURIComponent(retailer + ' ' + productName)}`;
}

function prisjaktUrl(productName) {
  return `https://www.prisjakt.no/search?search=${encodeURIComponent(productName)}`;
}

// Inline SVG icon paths (Lucide-style 24×24 stroke icons)
const ICONS = {
  monitor: '<rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>',
  phone:   '<rect x="7" y="2" width="10" height="20" rx="2"/><line x1="11" y1="18" x2="13" y2="18"/>',
  guitar:  '<path d="M11.9 12.1l4.514-4.514"/><path d="M20.1 2.3a1 1 0 0 0-1.4 0l-1.99 1.99a1 1 0 0 0-.3.7v2.92l-6.93 6.93a3 3 0 1 0 .58.58l6.93-6.93h2.92a1 1 0 0 0 .7-.3l1.99-1.99a1 1 0 0 0 0-1.4Z"/><circle cx="6" cy="18" r="3"/>',
  boot:    '<path d="M3 21h18"/><path d="M5 21V8a2 2 0 0 1 2-2h3l4 4h5a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2h-3l-2-2-2 2H7a2 2 0 0 1-2-2Z"/><path d="M10 6V3"/>',
  shoe:    '<path d="M2 18h20"/><path d="M4 18v-3c0-1 1-2 2-2h2l4-5 4 2 4 1c2 0 2 2 2 3v4"/><path d="M8 13v-2"/><path d="M12 8l-1-2"/>',
  tennis:  '<circle cx="12" cy="12" r="10"/><path d="M21.8 14a10 10 0 0 0-19.6 0"/><path d="M21.8 10a10 10 0 0 1-19.6 0"/>',
  bike:    '<circle cx="5.5" cy="17.5" r="3.5"/><circle cx="18.5" cy="17.5" r="3.5"/><path d="M15 6a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-3 11.5V14l-3-3 4-3 2 3h2"/>',
  speaker: '<rect x="4" y="2" width="16" height="20" rx="2"/><circle cx="12" cy="14" r="4"/><circle cx="12" cy="6" r="1"/>',
  sun:     '<circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/>',
  moon:    '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>',
  check:   '<polyline points="20 6 9 17 4 12"/>',
  close:   '<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>',
  arrow:   '<line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>',
  external:'<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>'
};
