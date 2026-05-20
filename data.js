/* Wishlist data — Norway 2026, Prisjakt-style catalog
 * 8 categories · 14-16 products each · multiple retailers · 12-month price history.
 * Prices in NOK, indicative of typical shelf prices and price-comparison sites.
 */

const CATEGORIES = [
  { id: 'pc',         name: 'Laptop',        nameEn: 'Minecraft + light ML laptops', icon: 'laptop',  accent: '#7dd3fc' },
  { id: 'phone',      name: 'Mobiltelefon',  nameEn: 'Mobile phones',                icon: 'phone',   accent: '#a78bfa' },
  { id: 'telecaster', name: 'Telecaster',    nameEn: 'Electric guitars',             icon: 'guitar',  accent: '#fbbf24' },
  { id: 'trail',      name: 'Terrengsko',    nameEn: 'Trail / hiking shoes',         icon: 'boot',    accent: '#86efac' },
  { id: 'running',    name: 'Løpesko',       nameEn: 'Running shoes',                icon: 'shoe',    accent: '#fda4af' },
  { id: 'tennis',     name: 'Tennis',        nameEn: 'Tennis equipment',             icon: 'tennis',  accent: '#fde047' },
  { id: 'bike',       name: 'Sykkel',        nameEn: 'Bicycles',                     icon: 'bike',    accent: '#67e8f9' },
  { id: 'speaker',    name: 'Høytaler',      nameEn: 'Speakers',                     icon: 'speaker', accent: '#f9a8d4' }
];

/* Per-product fields:
 *   id, categoryId, name, brand, specs, rating (0-5), reviews, year (released), price (current lowest),
 *   retailers { name: price } — multiple stores; the lowest becomes the displayed price
 *   wikiQuery (optional) — string used to search Wikipedia for a real image; falls back to brand+name
 */
const PRODUCTS = [
  // ── Laptops (Minecraft + light ML) ───────────────────────────────────────
  { id: 'pc-acer-aspire5',          categoryId: 'pc', name: 'Acer Aspire 5 A515-58GM',          brand: 'Acer',    specs: '15.6" FHD · i5-1335U · RTX 2050 4GB · 16GB · 512GB',                rating: 4.0, reviews: 187, year: 2024, price:  8490, retailers: { 'Komplett':  8490, 'Elkjøp':  8790, 'Power':  8890, 'NetOnNet':  8990 } },
  { id: 'pc-lenovo-ideapad-3',      categoryId: 'pc', name: 'Lenovo IdeaPad Gaming 3 16',        brand: 'Lenovo',  specs: '16" WUXGA · Ryzen 5 7535HS · RTX 4050 6GB · 16GB · 512GB',           rating: 4.2, reviews: 234, year: 2024, price:  9990, retailers: { 'Komplett':  9990, 'Elkjøp': 10290, 'Power': 10490, 'Dustin': 10590 } },
  { id: 'pc-hp-victus-15',          categoryId: 'pc', name: 'HP Victus 15-fb0102no',            brand: 'HP',      specs: '15.6" FHD 144Hz · i5-12450H · RTX 4050 6GB · 16GB · 512GB',          rating: 4.3, reviews: 312, year: 2024, price: 10990, retailers: { 'Elkjøp': 10990, 'Komplett': 11290, 'Power': 11490, 'NetOnNet': 11290 } },
  { id: 'pc-asus-tuf-a15',          categoryId: 'pc', name: 'ASUS TUF Gaming A15 FA507XV',      brand: 'ASUS',    specs: '15.6" FHD 144Hz · Ryzen 7 7735HS · RTX 4060 8GB · 16GB · 1TB',       rating: 4.4, reviews: 287, year: 2024, price: 12990, retailers: { 'Komplett': 12990, 'Power': 13290, 'Elkjøp': 13490, 'Dustin': 13390 } },
  { id: 'pc-hp-omen16',             categoryId: 'pc', name: 'HP OMEN 16-wf0073no',              brand: 'HP',      specs: '16.1" QHD 240Hz · i7-13700HX · RTX 4060 8GB · 32GB · 1TB',           rating: 4.5, reviews: 156, year: 2024, price: 14490, retailers: { 'Elkjøp': 14490, 'Komplett': 14790, 'Power': 14990 } },
  { id: 'pc-mba-m4-15',             categoryId: 'pc', name: 'Apple MacBook Air 15" M4',         brand: 'Apple',   specs: '15.3" Liquid Retina · M4 (10-core GPU) · 16GB · 512GB · MPS for ML', rating: 4.8, reviews: 612, year: 2025, price: 14990, retailers: { 'Apple': 14990, 'Eplehuset': 14990, 'Elkjøp': 15290, 'iSpot': 15290, 'Power': 15390 } },
  { id: 'pc-lenovo-legion5-pro',    categoryId: 'pc', name: 'Lenovo Legion 5 Pro 16IRX9',       brand: 'Lenovo',  specs: '16" WQXGA 240Hz · i7-14650HX · RTX 4060 8GB · 32GB · 1TB',          rating: 4.7, reviews: 312, year: 2024, price: 16990, retailers: { 'Komplett': 16990, 'Power': 17290, 'Elkjøp': 17490, 'Dustin': 17490 } },
  { id: 'pc-asus-zephyrus-g14',     categoryId: 'pc', name: 'ASUS ROG Zephyrus G14 GA403',      brand: 'ASUS',    specs: '14" 3K OLED 120Hz · Ryzen 9 8945HS · RTX 4060 8GB · 32GB · 1TB',     rating: 4.6, reviews: 198, year: 2024, price: 19990, retailers: { 'Komplett': 19990, 'Power': 20490, 'Elkjøp': 20290 } },
  { id: 'pc-asus-rog-g16',          categoryId: 'pc', name: 'ASUS ROG Strix G16 G614JV',        brand: 'ASUS',    specs: '16" QHD+ 240Hz · i7-13650HX · RTX 4070 8GB · 16GB · 1TB',           rating: 4.5, reviews: 168, year: 2024, price: 22990, retailers: { 'Komplett': 22990, 'Power': 23490, 'Elkjøp': 23690 } },
  { id: 'pc-mbp14-m4-pro',          categoryId: 'pc', name: 'Apple MacBook Pro 14" M4 Pro',     brand: 'Apple',   specs: '14.2" Liquid Retina XDR 120Hz · M4 Pro (16-core GPU) · 24GB · 512GB',rating: 4.9, reviews: 423, year: 2024, price: 24990, retailers: { 'Apple': 24990, 'Eplehuset': 24990, 'iSpot': 25290, 'Elkjøp': 25290, 'Power': 25490 } },
  { id: 'pc-razer-blade14',         categoryId: 'pc', name: 'Razer Blade 14 (2024)',            brand: 'Razer',   specs: '14" QHD+ 240Hz · Ryzen 9 8945HS · RTX 4070 8GB · 16GB · 1TB',        rating: 4.5, reviews:  87, year: 2024, price: 28990, retailers: { 'Komplett': 28990, 'Power': 29490 } },
  { id: 'pc-asus-zephyrus-g16',     categoryId: 'pc', name: 'ASUS ROG Zephyrus G16 GU605',      brand: 'ASUS',    specs: '16" 2.5K OLED 240Hz · Core Ultra 9 185H · RTX 4080 12GB · 32GB · 1TB', rating: 4.7, reviews: 124, year: 2024, price: 31990, retailers: { 'Komplett': 31990, 'Power': 32490, 'Elkjøp': 32690 } },
  { id: 'pc-mbp16-m4-max',          categoryId: 'pc', name: 'Apple MacBook Pro 16" M4 Max',     brand: 'Apple',   specs: '16.2" Liquid Retina XDR · M4 Max (40-core GPU) · 36GB · 1TB',        rating: 4.9, reviews: 198, year: 2024, price: 42990, retailers: { 'Apple': 42990, 'Eplehuset': 42990, 'iSpot': 43290, 'Elkjøp': 43490, 'Power': 43690 } },
  { id: 'pc-asus-rog-scar18',       categoryId: 'pc', name: 'ASUS ROG Strix Scar 18 G834',      brand: 'ASUS',    specs: '18" 2.5K 240Hz Mini-LED · i9-14900HX · RTX 4090 16GB · 32GB · 2TB',  rating: 4.8, reviews:  64, year: 2024, price: 47990, retailers: { 'Komplett': 47990, 'Power': 48990, 'Multicom': 48490 } },

  // ── Mobiltelefon ────────────────────────────────────────────────────────
  { id: 'phone-xiaomi-redmi-13',    categoryId: 'phone', name: 'Xiaomi Redmi Note 13 Pro',     brand: 'Xiaomi',  specs: '256GB · 8GB RAM · 6.67" AMOLED 120Hz · 200MP',           rating: 4.3, reviews:  287, year: 2024, price:  2790, retailers: { 'Power':  2790, 'Elkjøp':  2890, 'Komplett':  2990 } },
  { id: 'phone-samsung-a55',        categoryId: 'phone', name: 'Samsung Galaxy A55 5G',         brand: 'Samsung', specs: '128GB · 8GB RAM · 6.6" AMOLED 120Hz · 50MP',             rating: 4.2, reviews:  412, year: 2024, price:  2999, retailers: { 'Power':  2999, 'Elkjøp':  3199, 'Telenor':  3290, 'NetOnNet':  3190, 'Telia':  3290 } },
  { id: 'phone-nothing-2a',         categoryId: 'phone', name: 'Nothing Phone (2a)',           brand: 'Nothing', specs: '128GB · Dimensity 7200 Pro · 6.7" AMOLED · Glyph',       rating: 4.4, reviews:  156, year: 2024, price:  3690, retailers: { 'Power':  3690, 'Elkjøp':  3790, 'Komplett':  3890 } },
  { id: 'phone-pixel-8a',           categoryId: 'phone', name: 'Google Pixel 8a',               brand: 'Google',  specs: '128GB · Tensor G3 · 6.1" OLED · 7 years updates',         rating: 4.5, reviews:  287, year: 2024, price:  5490, retailers: { 'Elkjøp':  5490, 'Power':   5690, 'Komplett':  5790 } },
  { id: 'phone-oneplus-12r',        categoryId: 'phone', name: 'OnePlus 12R',                   brand: 'OnePlus', specs: '256GB · Snapdragon 8 Gen 2 · 6.78" LTPO · 100W',         rating: 4.5, reviews:  234, year: 2024, price:  6490, retailers: { 'Komplett':  6490, 'Elkjøp':  6690, 'Power':   6790 } },
  { id: 'phone-iphone-14',          categoryId: 'phone', name: 'iPhone 14',                     brand: 'Apple',   specs: '128GB · A15 Bionic · 6.1" Super Retina XDR',             rating: 4.6, reviews:  983, year: 2022, price:  7490, retailers: { 'Elkjøp':  7490, 'Power':   7690, 'Eplehuset':  7890, 'iSpot':  7990, 'Apple':  8290 } },
  { id: 'phone-samsung-s24fe',      categoryId: 'phone', name: 'Samsung Galaxy S24 FE',         brand: 'Samsung', specs: '128GB · Exynos 2400e · 6.7" AMOLED 120Hz',               rating: 4.3, reviews:  198, year: 2024, price:  7490, retailers: { 'Elkjøp':  7490, 'Power':   7690, 'Telenor':  7890 } },
  { id: 'phone-sony-xperia-1v',     categoryId: 'phone', name: 'Sony Xperia 1 V',               brand: 'Sony',    specs: '256GB · Snapdragon 8 Gen 2 · 6.5" 4K OLED · Zeiss',     rating: 4.5, reviews:  123, year: 2023, price:  8490, retailers: { 'Elkjøp':  8490, 'Power':   8690, 'Komplett':  8890 } },
  { id: 'phone-iphone-15',          categoryId: 'phone', name: 'iPhone 15',                     brand: 'Apple',   specs: '128GB · A16 Bionic · 6.1" Super Retina XDR · USB-C',     rating: 4.6, reviews: 1247, year: 2023, price:  9990, retailers: { 'Elkjøp':  9990, 'Power':  10290, 'Eplehuset': 10490, 'iSpot': 10390, 'Apple': 10490, 'NetOnNet': 10290, 'Komplett': 10490 } },
  { id: 'phone-samsung-s24',        categoryId: 'phone', name: 'Samsung Galaxy S24',            brand: 'Samsung', specs: '256GB · Snapdragon 8 Gen 3 · 6.2" AMOLED · Galaxy AI',   rating: 4.6, reviews:  723, year: 2024, price: 11490, retailers: { 'Elkjøp': 11490, 'Power':  11790, 'Telenor': 11890, 'Telia': 11990, 'Komplett': 11890, 'NetOnNet': 11890 } },
  { id: 'phone-iphone-15-plus',     categoryId: 'phone', name: 'iPhone 15 Plus',                brand: 'Apple',   specs: '128GB · A16 Bionic · 6.7" Super Retina XDR · USB-C',     rating: 4.7, reviews:  587, year: 2023, price: 12490, retailers: { 'Elkjøp': 12490, 'Power':  12690, 'Eplehuset': 12790, 'iSpot': 12890, 'Apple': 13190 } },
  { id: 'phone-samsung-zflip6',     categoryId: 'phone', name: 'Samsung Galaxy Z Flip6',        brand: 'Samsung', specs: '256GB · Snapdragon 8 Gen 3 · 6.7" foldable · 3.4" cover', rating: 4.5, reviews:  312, year: 2024, price: 13490, retailers: { 'Elkjøp': 13490, 'Power':  13790, 'Telenor': 13990, 'Telia': 14190 } },
  { id: 'phone-iphone-15-pro',      categoryId: 'phone', name: 'iPhone 15 Pro',                 brand: 'Apple',   specs: '128GB · A17 Pro · 6.1" ProMotion · Titanium · USB-C',   rating: 4.7, reviews:  892, year: 2023, price: 13990, retailers: { 'Elkjøp': 13990, 'Eplehuset': 14290, 'iSpot': 14290, 'Apple': 14490, 'Power': 14490, 'NetOnNet': 14290 } },
  { id: 'phone-samsung-s24-ultra',  categoryId: 'phone', name: 'Samsung Galaxy S24 Ultra',     brand: 'Samsung', specs: '256GB · 6.8" QHD+ AMOLED · 200MP · S Pen · titanium',   rating: 4.8, reviews:  567, year: 2024, price: 15990, retailers: { 'Elkjøp': 15990, 'Power':  16490, 'Telenor': 16690, 'Telia': 16890, 'Komplett': 16290 } },
  { id: 'phone-iphone-15-pro-max',  categoryId: 'phone', name: 'iPhone 15 Pro Max',             brand: 'Apple',   specs: '256GB · A17 Pro · 6.7" ProMotion · 5x telephoto',         rating: 4.8, reviews: 1102, year: 2023, price: 18990, retailers: { 'Elkjøp': 18990, 'Eplehuset': 19290, 'iSpot': 19390, 'Apple': 19490, 'Power': 19490, 'NetOnNet': 19290 } },
  { id: 'phone-samsung-zfold6',     categoryId: 'phone', name: 'Samsung Galaxy Z Fold6',        brand: 'Samsung', specs: '256GB · 7.6" inner foldable · 6.3" cover · S Pen support', rating: 4.6, reviews:  198, year: 2024, price: 20990, retailers: { 'Elkjøp': 20990, 'Power':  21290, 'Telenor': 21490 } },

  // ── Telecaster ─────────────────────────────────────────────────────────
  { id: 'tele-squier-bullet',            categoryId: 'telecaster', name: 'Squier Bullet Telecaster',                            brand: 'Squier',     specs: 'Basswood body · maple neck · ceramic single-coils',          rating: 4.0, reviews: 387, year: 2017, price:  1790, retailers: { '4Sound':  1790, 'Gear4Music':  1890, 'Musikkbutikken':  1990 } },
  { id: 'tele-squier-sonic',             categoryId: 'telecaster', name: 'Squier Sonic Telecaster',                             brand: 'Squier',     specs: 'Poplar body · maple neck · ceramic single-coils',            rating: 4.1, reviews: 234, year: 2023, price:  2290, retailers: { '4Sound':  2290, 'Gear4Music':  2390 } },
  { id: 'tele-squier-affinity',          categoryId: 'telecaster', name: 'Squier Affinity Telecaster',                          brand: 'Squier',     specs: 'Poplar · maple · butterscotch · 21F',                        rating: 4.3, reviews: 412, year: 2021, price:  3690, retailers: { '4Sound':  3690, 'Gear4Music':  3790, 'Norsk Musikk':  3890 } },
  { id: 'tele-squier-cv50',              categoryId: 'telecaster', name: "Squier Classic Vibe '50s Telecaster",                 brand: 'Squier',     specs: 'Pine body · maple · alnico single-coils · vintage tone',     rating: 4.6, reviews: 287, year: 2019, price:  5490, retailers: { '4Sound':  5490, 'Gear4Music':  5690 } },
  { id: 'tele-squier-40th',              categoryId: 'telecaster', name: 'Squier 40th Anniversary Telecaster Gold Edition',     brand: 'Squier',     specs: 'Indian laurel · gold hardware · vintage-style pickups',      rating: 4.5, reviews:  87, year: 2022, price:  6490, retailers: { '4Sound':  6490, 'Gear4Music':  6690 } },
  { id: 'tele-fender-player',            categoryId: 'telecaster', name: 'Fender Player Telecaster MN',                         brand: 'Fender',     specs: 'Alder body · maple · Player Alnico V single-coils',          rating: 4.7, reviews: 524, year: 2018, price:  9490, retailers: { '4Sound':  9490, 'Gear4Music':  9690 } },
  { id: 'tele-fender-player-hh',         categoryId: 'telecaster', name: 'Fender Player Telecaster HH',                         brand: 'Fender',     specs: 'Dual humbuckers · alder · pau ferro · coil-split',           rating: 4.5, reviews: 187, year: 2021, price: 10490, retailers: { '4Sound': 10490, 'Gear4Music': 10690 } },
  { id: 'tele-fender-player2',           categoryId: 'telecaster', name: 'Fender Player II Telecaster',                         brand: 'Fender',     specs: 'Alder · rolled fingerboard edges · 22F · improved trem',     rating: 4.7, reviews: 142, year: 2024, price: 13490, retailers: { '4Sound': 13490, 'Gear4Music': 13690 } },
  { id: 'tele-fender-player-plus',       categoryId: 'telecaster', name: 'Fender Player Plus Telecaster',                       brand: 'Fender',     specs: 'Player Plus Noiseless · 12" radius · rolled edges',          rating: 4.7, reviews: 243, year: 2021, price: 14490, retailers: { '4Sound': 14490, 'Gear4Music': 14690, 'Norsk Musikk': 14890 } },
  { id: 'tele-fender-vintera2-50s',      categoryId: 'telecaster', name: "Fender Vintera II '50s Telecaster",                   brand: 'Fender',     specs: 'Mexican-built · vintage-tall frets · Pure Vintage pickups',  rating: 4.8, reviews:  89, year: 2023, price: 17490, retailers: { '4Sound': 17490, 'Gear4Music': 17890 } },
  { id: 'tele-fender-vintera2-60s',      categoryId: 'telecaster', name: "Fender Vintera II '60s Telecaster",                   brand: 'Fender',     specs: "Pure Vintage '60s pickups · 21F · vintage-tall frets",       rating: 4.7, reviews:  76, year: 2023, price: 17990, retailers: { '4Sound': 17990, 'Gear4Music': 18290 } },
  { id: 'tele-fender-amp2',              categoryId: 'telecaster', name: 'Fender American Professional II Telecaster',          brand: 'Fender',     specs: 'USA-built · V-Mod II pickups · deep "C" neck · push/pull',   rating: 4.9, reviews: 178, year: 2020, price: 27990, retailers: { '4Sound': 27990, 'Gear4Music': 28490 } },
  { id: 'tele-fender-amv2-63',           categoryId: 'telecaster', name: 'Fender American Vintage II 1963 Telecaster',          brand: 'Fender',     specs: 'USA · period-correct hardware · Pure Vintage pickups',       rating: 4.9, reviews:  41, year: 2022, price: 32990, retailers: { '4Sound': 32990, 'Norsk Musikk': 33490 } },
  { id: 'tele-fender-cs50',              categoryId: 'telecaster', name: "Fender Custom Shop '50s Telecaster Journeyman Relic", brand: 'Fender CS',  specs: 'Hand-built USA · Journeyman aging · hand-wound pickups',     rating: 4.9, reviews:  32, year: 2023, price: 54990, retailers: { '4Sound': 54990 } },

  // ── Terrengsko ─────────────────────────────────────────────────────────
  { id: 'trail-merrell-moab3-gtx',       categoryId: 'trail', name: 'Merrell Moab 3 GTX',                  brand: 'Merrell',         specs: 'Gore-Tex · Vibram TC5+ · all-day comfort',           rating: 4.4, reviews: 612, year: 2022, price:  999, retailers: { 'XXL':  999, 'Sport1': 1099, 'Anton Sport': 1199 } },
  { id: 'trail-salomon-crosshike2-gtx',  categoryId: 'trail', name: 'Salomon Cross Hike 2 GTX',            brand: 'Salomon',         specs: 'Gore-Tex · Contagrip MA · ADV-C Chassis',            rating: 4.5, reviews: 384, year: 2023, price: 1399, retailers: { 'XXL': 1399, 'Anton Sport': 1499 } },
  { id: 'trail-adidas-terrex-swift',     categoryId: 'trail', name: 'Adidas Terrex Swift R3 GTX',          brand: 'Adidas',          specs: 'Gore-Tex · Continental rubber · cushioned EVA',      rating: 4.4, reviews: 287, year: 2023, price: 1499, retailers: { 'XXL': 1499, 'Sport1': 1599, 'Decathlon': 1599 } },
  { id: 'trail-salomon-speedcross6',     categoryId: 'trail', name: 'Salomon Speedcross 6',                brand: 'Salomon',         specs: 'Contagrip TA · SensiFit · 5mm aggressive lugs',      rating: 4.6, reviews: 521, year: 2022, price: 1690, retailers: { 'XXL': 1690, 'Sport1': 1790 } },
  { id: 'trail-tnf-vectiv-fastpack',     categoryId: 'trail', name: 'The North Face Vectiv Fastpack FUTURELIGHT', brand: 'The North Face', specs: 'FUTURELIGHT · 3D Vectiv plate · Surface CTRL outsole',rating: 4.3, reviews: 178, year: 2024, price: 1799, retailers: { 'XXL': 1799, 'Anton Sport': 1899, 'Sport1': 1949 } },
  { id: 'trail-salomon-xultra5-gtx',     categoryId: 'trail', name: 'Salomon X Ultra 5 GTX',               brand: 'Salomon',         specs: 'Gore-Tex · ADV-C 4D Chassis · Contagrip MA',          rating: 4.7, reviews: 187, year: 2024, price: 1899, retailers: { 'XXL': 1899, 'Anton Sport': 1999, 'Sport1': 2049 } },
  { id: 'trail-brooks-cascadia17',       categoryId: 'trail', name: 'Brooks Cascadia 17',                  brand: 'Brooks',          specs: 'DNA LOFT v2 · Trail Adapt system · 8mm drop',        rating: 4.6, reviews: 234, year: 2024, price: 2099, retailers: { 'Løplabbet': 2099, 'XXL': 2199 } },
  { id: 'trail-salomon-speedcross6-gtx', categoryId: 'trail', name: 'Salomon Speedcross 6 GTX',            brand: 'Salomon',         specs: 'Gore-Tex · 5mm lugs · EnergyCell midsole',            rating: 4.7, reviews: 698, year: 2022, price: 2199, retailers: { 'XXL': 2199, 'Anton Sport': 2299, 'Sport1': 2349 } },
  { id: 'trail-lasportiva-bushido3',     categoryId: 'trail', name: 'La Sportiva Bushido III',             brand: 'La Sportiva',     specs: 'FriXion XT 2.0 · STB Control · compression EVA',     rating: 4.7, reviews: 245, year: 2023, price: 2390, retailers: { 'XXL': 2390, 'Bergans': 2490 } },
  { id: 'trail-lasportiva-akasha2',      categoryId: 'trail', name: 'La Sportiva Akasha II',               brand: 'La Sportiva',     specs: 'FriXion XT 2.0 · injected EVA · ultra-distance',      rating: 4.5, reviews:  98, year: 2024, price: 2690, retailers: { 'XXL': 2690, 'Bergans': 2890 } },
  { id: 'trail-lowa-innox-gtx',          categoryId: 'trail', name: 'Lowa Innox Pro GTX Lo',               brand: 'Lowa',            specs: 'Gore-Tex · Monowrap · multifunction · vibram',        rating: 4.6, reviews: 124, year: 2023, price: 2790, retailers: { 'Sport1': 2790, 'Anton Sport': 2890 } },
  { id: 'trail-salewa-wildfire2-gtx',    categoryId: 'trail', name: 'Salewa Wildfire 2 GTX',               brand: 'Salewa',          specs: 'Gore-Tex Extended · Pomoca outsole · 3F System',     rating: 4.6, reviews: 172, year: 2024, price: 2790, retailers: { 'Sport1': 2790, 'XXL': 2890 } },
  { id: 'trail-hoka-speedgoat6-gtx',     categoryId: 'trail', name: 'Hoka Speedgoat 6 GTX',                brand: 'Hoka',            specs: 'Gore-Tex · Vibram Megagrip · cushioned EVA',          rating: 4.7, reviews: 318, year: 2024, price: 2999, retailers: { 'XXL': 2999, 'Løplabbet': 3090, 'Sport1': 3190 } },
  { id: 'trail-hanwag-tatra2-gtx',       categoryId: 'trail', name: 'Hanwag Tatra II GTX',                 brand: 'Hanwag',          specs: 'Gore-Tex · Nubuck leather · German-engineered',       rating: 4.8, reviews:  87, year: 2022, price: 3290, retailers: { 'Sport1': 3290, 'Anton Sport': 3390 } },
  { id: 'trail-scarpa-rush2pro-gtx',     categoryId: 'trail', name: 'Scarpa Rush 2 Pro GTX',               brand: 'Scarpa',          specs: 'Gore-Tex Invisible Fit · Vibram Megagrip · DD plate', rating: 4.8, reviews: 124, year: 2023, price: 3990, retailers: { 'Sport1': 3990 } },

  // ── Løpesko ────────────────────────────────────────────────────────────
  { id: 'run-nike-revolution7',          categoryId: 'running', name: 'Nike Revolution 7',                         brand: 'Nike',        specs: 'Foam midsole · mesh upper · 9.5mm drop',         rating: 4.2, reviews: 543, year: 2023, price:  749, retailers: { 'XXL':  749, 'Sport1':  799 } },
  { id: 'run-asics-gel-excite10',        categoryId: 'running', name: 'Asics Gel-Excite 10',                       brand: 'Asics',       specs: 'AmpliFoam Plus · GEL · 10mm drop',                rating: 4.3, reviews: 487, year: 2023, price:  899, retailers: { 'XXL':  899, 'Sport1':  949 } },
  { id: 'run-adidas-adizero-sl',         categoryId: 'running', name: 'Adidas Adizero SL',                         brand: 'Adidas',      specs: 'Lightstrike + Lightstrike Pro · Energy rods',     rating: 4.5, reviews: 312, year: 2023, price: 1290, retailers: { 'XXL': 1290, 'Sport1': 1390 } },
  { id: 'run-mizuno-rider27',            categoryId: 'running', name: 'Mizuno Wave Rider 27',                       brand: 'Mizuno',      specs: 'Mizuno Enerzy · MIZUNO WAVE plate · 12mm drop',  rating: 4.4, reviews: 187, year: 2023, price: 1690, retailers: { 'Løplabbet': 1690, 'XXL': 1790 } },
  { id: 'run-hoka-mach6',                categoryId: 'running', name: 'Hoka Mach 6',                                brand: 'Hoka',        specs: 'Supercritical EVA · 5mm drop · daily + tempo',   rating: 4.7, reviews: 198, year: 2024, price: 1690, retailers: { 'Løplabbet': 1690, 'XXL': 1790 } },
  { id: 'run-asics-novablast4',          categoryId: 'running', name: 'Asics Novablast 4',                          brand: 'Asics',       specs: 'FF BLAST+ ECO · trampoline geometry · 8mm',      rating: 4.6, reviews: 421, year: 2024, price: 1690, retailers: { 'XXL': 1690, 'Løplabbet': 1790 } },
  { id: 'run-hoka-clifton9',             categoryId: 'running', name: 'Hoka Clifton 9',                             brand: 'Hoka',        specs: 'Compression-molded EVA · 5mm drop · daily',      rating: 4.5, reviews: 423, year: 2023, price: 1890, retailers: { 'Løplabbet': 1890, 'XXL': 1990, 'Sport1': 2049 } },
  { id: 'run-nike-pegasus41',            categoryId: 'running', name: 'Nike Pegasus 41',                            brand: 'Nike',        specs: 'ReactX foam · 2× Zoom Air · 10mm · daily',       rating: 4.6, reviews: 587, year: 2024, price: 1999, retailers: { 'XXL': 1999, 'Løplabbet': 2090, 'Sport1': 2099 } },
  { id: 'run-brooks-glycerin21',         categoryId: 'running', name: 'Brooks Glycerin 21',                         brand: 'Brooks',      specs: 'DNA LOFT v3 nitrogen-infused · 10mm drop',       rating: 4.6, reviews: 312, year: 2023, price: 2090, retailers: { 'Løplabbet': 2090, 'XXL': 2190 } },
  { id: 'run-nb-1080-v13',               categoryId: 'running', name: 'New Balance Fresh Foam X 1080 v13',          brand: 'New Balance', specs: 'Fresh Foam X · Ultra Heel · 6mm drop',           rating: 4.6, reviews: 243, year: 2023, price: 2290, retailers: { 'XXL': 2290, 'Løplabbet': 2390 } },
  { id: 'run-asics-nimbus26',            categoryId: 'running', name: 'Asics Gel-Nimbus 26',                        brand: 'Asics',       specs: 'FF BLAST+ ECO · PureGEL · 8mm · max cushion',    rating: 4.7, reviews: 364, year: 2024, price: 2290, retailers: { 'Løplabbet': 2290, 'XXL': 2390 } },
  { id: 'run-saucony-endorphin-speed',   categoryId: 'running', name: 'Saucony Endorphin Speed 4',                  brand: 'Saucony',     specs: 'PWRRUN PB · nylon plate · 8mm · tempo + race',   rating: 4.6, reviews: 287, year: 2024, price: 2390, retailers: { 'Løplabbet': 2390, 'XXL': 2490 } },
  { id: 'run-on-cloudmonster2',          categoryId: 'running', name: 'On Cloudmonster 2',                          brand: 'On',          specs: 'Helion Hyperfoam · Speedboard · 6mm · max stack', rating: 4.5, reviews: 198, year: 2024, price: 2490, retailers: { 'Løplabbet': 2490, 'XXL': 2590, 'Sport1': 2649 } },
  { id: 'run-adidas-adios-pro3',         categoryId: 'running', name: 'Adidas Adios Pro 3',                         brand: 'Adidas',      specs: 'Lightstrike Pro · Energy Rods 2.0 · 6.5mm race', rating: 4.7, reviews: 156, year: 2023, price: 3090, retailers: { 'XXL': 3090, 'Løplabbet': 3190 } },
  { id: 'run-nike-vaporfly3',            categoryId: 'running', name: 'Nike Vaporfly 3',                            brand: 'Nike',        specs: 'ZoomX · carbon plate · 8mm · race',              rating: 4.7, reviews: 218, year: 2023, price: 3290, retailers: { 'Løplabbet': 3290, 'XXL': 3390 } },
  { id: 'run-nike-alphafly3',            categoryId: 'running', name: 'Nike Alphafly 3',                            brand: 'Nike',        specs: 'ZoomX · carbon · 2× Zoom Air pods · marathon',   rating: 4.8, reviews: 167, year: 2024, price: 3499, retailers: { 'Løplabbet': 3499 } },

  // ── Tennis ────────────────────────────────────────────────────────────
  { id: 'tennis-wilson-tour-slam',       categoryId: 'tennis', name: 'Wilson Tour Slam Lite',                  brand: 'Wilson',     specs: '274g · 105 sq in · pre-strung · starter',         rating: 4.0, reviews: 387, year: 2022, price:  699, retailers: { 'XXL':  699, 'Sport1':  799 } },
  { id: 'tennis-head-tis6',              categoryId: 'tennis', name: 'Head Ti.S6',                              brand: 'Head',       specs: '225g · 115 sq in · oversize · power',             rating: 4.4, reviews: 612, year: 2010, price:  999, retailers: { 'XXL':  999, 'Tennishuset': 1099 } },
  { id: 'tennis-babolat-boost-drive',    categoryId: 'tennis', name: 'Babolat Boost Drive',                    brand: 'Babolat',    specs: '260g · 105 sq in · pre-strung · power frame',     rating: 4.2, reviews: 287, year: 2022, price: 1090, retailers: { 'XXL': 1090, 'Tennishuset': 1190 } },
  { id: 'tennis-wilson-prostaff-prec',   categoryId: 'tennis', name: 'Wilson Pro Staff Precision 100 v14',     brand: 'Wilson',     specs: '290g · 100 sq in · pre-strung · all-court',       rating: 4.3, reviews: 198, year: 2023, price: 1390, retailers: { 'XXL': 1390, 'Tennishuset': 1490 } },
  { id: 'tennis-tecnifibre-tempo',       categoryId: 'tennis', name: 'Tecnifibre Tempo 270 v2',                brand: 'Tecnifibre', specs: "270g · 100 sq in · women's frame · pre-strung",    rating: 4.4, reviews:  78, year: 2024, price: 1490, retailers: { 'Tennishuset': 1490 } },
  { id: 'tennis-babolat-aero-lite',      categoryId: 'tennis', name: 'Babolat Pure Aero Lite 2023',             brand: 'Babolat',    specs: '270g · 100 sq in · spin frame · unstrung',         rating: 4.5, reviews: 256, year: 2023, price: 1990, retailers: { 'Tennishuset': 1990, 'XXL': 2090 } },
  { id: 'tennis-wilson-ultra100',        categoryId: 'tennis', name: 'Wilson Ultra 100 v4.5',                   brand: 'Wilson',     specs: '300g · 100 sq in · Carbon Fiber Mapping · power',  rating: 4.5, reviews: 234, year: 2023, price: 2290, retailers: { 'Tennishuset': 2290, 'XXL': 2390 } },
  { id: 'tennis-yonex-ezone100',         categoryId: 'tennis', name: 'Yonex EZONE 100 (7th gen)',               brand: 'Yonex',      specs: '300g · 100 sq in · Isometric head · sweet spot',  rating: 4.7, reviews: 198, year: 2024, price: 2390, retailers: { 'Tennishuset': 2390 } },
  { id: 'tennis-wilson-clash100v2',      categoryId: 'tennis', name: 'Wilson Clash 100 v2',                     brand: 'Wilson',     specs: '295g · 100 sq in · FreeFlex · feel + power',      rating: 4.6, reviews: 312, year: 2022, price: 2490, retailers: { 'Tennishuset': 2490 } },
  { id: 'tennis-babolat-pure-drive',     categoryId: 'tennis', name: 'Babolat Pure Drive 2024',                 brand: 'Babolat',    specs: '300g · 100 sq in · NF² Tech · all-court power',   rating: 4.7, reviews: 478, year: 2024, price: 2690, retailers: { 'Tennishuset': 2690, 'XXL': 2790 } },
  { id: 'tennis-head-boom-pro',          categoryId: 'tennis', name: 'Head Boom Pro 2023',                      brand: 'Head',       specs: '310g · 98 sq in · Auxetic technology · 16x19',    rating: 4.6, reviews: 156, year: 2023, price: 2690, retailers: { 'Tennishuset': 2690, 'XXL': 2790 } },
  { id: 'tennis-babolat-pure-strike',    categoryId: 'tennis', name: 'Babolat Pure Strike 100',                 brand: 'Babolat',    specs: '300g · 100 sq in · 16x19 · feel + precision',     rating: 4.7, reviews: 187, year: 2024, price: 2890, retailers: { 'Tennishuset': 2890, 'XXL': 2990 } },
  { id: 'tennis-wilson-blade98v9',       categoryId: 'tennis', name: 'Wilson Blade 98 v9 + bag',                brand: 'Wilson',     specs: '305g · 98 sq in · 16x19 · control · w/ bag',      rating: 4.8, reviews: 187, year: 2024, price: 2990, retailers: { 'Tennishuset': 2990 } },
  { id: 'tennis-wilson-rf97v14',         categoryId: 'tennis', name: 'Wilson Pro Staff RF97 v14 + bag + balls', brand: 'Wilson',     specs: '340g · 97 sq in · Federer signature · player',    rating: 4.9, reviews: 142, year: 2024, price: 4290, retailers: { 'Tennishuset': 4290 } },

  // ── Sykkel ────────────────────────────────────────────────────────────
  { id: 'bike-nakamura-crossfire100',    categoryId: 'bike', name: 'Nakamura Crossfire 100',                  brand: 'Nakamura',    specs: 'Aluminium hybrid · Shimano 21-speed · 700C',         rating: 4.0, reviews: 287, year: 2024, price:  4990, retailers: { 'G-Sport':  4990, 'Intersport':  5290 } },
  { id: 'bike-dbs-bizon-7',              categoryId: 'bike', name: 'DBS Bizon Classic 7',                     brand: 'DBS',         specs: 'Steel city bike · 7-speed · fenders + rack',         rating: 4.3, reviews: 412, year: 2023, price:  5990, retailers: { 'XXL':  5990, 'G-Sport':  6190 } },
  { id: 'bike-giant-escape-3',           categoryId: 'bike', name: 'Giant Escape 3 Disc',                     brand: 'Giant',       specs: 'ALUXX aluminium · 21-speed · mechanical disc',       rating: 4.3, reviews: 312, year: 2024, price:  6490, retailers: { 'Birk Sport':  6490, 'G-Sport':  6690 } },
  { id: 'bike-trek-marlin5',             categoryId: 'bike', name: 'Trek Marlin 5 Gen 3',                     brand: 'Trek',        specs: 'Alpha Silver aluminium · 2×8 · Suntour fork · MTB',  rating: 4.4, reviews: 287, year: 2024, price:  6990, retailers: { 'Sport1':  6990, 'Birk Sport':  7190 } },
  { id: 'bike-cube-hyde-race',           categoryId: 'bike', name: 'Cube Hyde Race',                          brand: 'Cube',        specs: 'Aluminium · Shimano Alfine 8-speed · belt drive',    rating: 4.6, reviews: 124, year: 2024, price:  7490, retailers: { 'Sport1':  7490, 'Sykkelnerden':  7690 } },
  { id: 'bike-trek-fx2-disc',            categoryId: 'bike', name: 'Trek FX 2 Disc',                          brand: 'Trek',        specs: 'Aluminium · 18-speed Shimano · hydraulic disc',      rating: 4.5, reviews: 367, year: 2023, price:  8490, retailers: { 'Sport1':  8490, 'Birk Sport':  8690 } },
  { id: 'bike-norco-xfr1',               categoryId: 'bike', name: 'Norco XFR 1',                             brand: 'Norco',       specs: '6061 aluminium · 1×11 Shimano Deore · hydraulic',    rating: 4.5, reviews:  98, year: 2024, price:  9490, retailers: { 'Sport1':  9490, 'Birk Sport':  9790 } },
  { id: 'bike-cannondale-quick-cx3',     categoryId: 'bike', name: 'Cannondale Quick CX 3',                   brand: 'Cannondale',  specs: 'SmartForm C3 · 27-speed · hydraulic disc',           rating: 4.5, reviews: 134, year: 2024, price:  9990, retailers: { 'Birk Sport':  9990, 'Probike': 10290 } },
  { id: 'bike-specialized-sirrus3',      categoryId: 'bike', name: 'Specialized Sirrus X 3.0',                brand: 'Specialized', specs: 'Aluminium · 2×9 Sora · hydraulic disc · 38mm tyres', rating: 4.6, reviews: 234, year: 2024, price: 10990, retailers: { 'Birk Sport': 10990 } },
  { id: 'bike-canyon-endurace-al7',      categoryId: 'bike', name: 'Canyon Endurace AL 7 Disc',               brand: 'Canyon',      specs: 'Aluminium · Shimano 105 12-speed · hydraulic disc',  rating: 4.7, reviews: 234, year: 2024, price: 11490, retailers: { 'Canyon': 11490 } },
  { id: 'bike-trek-marlin7',             categoryId: 'bike', name: 'Trek Marlin 7 Gen 3',                     brand: 'Trek',        specs: 'Aluminium MTB · RockShox · 100mm travel · 1×12',     rating: 4.6, reviews: 298, year: 2024, price: 11990, retailers: { 'Sport1': 11990, 'Birk Sport': 12290 } },
  { id: 'bike-cube-cross-race',          categoryId: 'bike', name: 'Cube Cross Race',                         brand: 'Cube',        specs: 'Cyclocross · GRX 600 11-speed · hydraulic',           rating: 4.6, reviews:  87, year: 2024, price: 13990, retailers: { 'Sport1': 13990, 'Sykkelnerden': 14290 } },
  { id: 'bike-trek-fx-sport4',           categoryId: 'bike', name: 'Trek FX Sport 4 Carbon',                  brand: 'Trek',        specs: 'OCLV carbon · 2×10 Shimano 105 · IsoSpeed',          rating: 4.7, reviews: 156, year: 2023, price: 17990, retailers: { 'Sport1': 17990, 'Birk Sport': 18290, 'Sykkelnerden': 18490 } },
  { id: 'bike-specialized-tarmac-sl7',   categoryId: 'bike', name: 'Specialized Tarmac SL7 Sport',            brand: 'Specialized', specs: 'FACT 10r carbon · 105 Di2 · 28mm · road race',       rating: 4.8, reviews:  89, year: 2023, price: 37990, retailers: { 'Birk Sport': 37990, 'Probike': 38990 } },
  { id: 'bike-trek-emonda-slr7',         categoryId: 'bike', name: 'Trek Émonda SLR 7',                       brand: 'Trek',        specs: 'OCLV 800 carbon · Ultegra Di2 · ultra-light',         rating: 4.9, reviews:  43, year: 2024, price: 44990, retailers: { 'Sport1': 44990, 'Birk Sport': 45990 } },
  { id: 'bike-trek-domane-sl7',          categoryId: 'bike', name: 'Trek Domane SL 7 Ultegra Di2',            brand: 'Trek',        specs: 'OCLV 500 · Ultegra Di2 12-speed · IsoSpeed',          rating: 4.9, reviews:  67, year: 2024, price: 59990, retailers: { 'Sport1': 59990, 'Birk Sport': 61290, 'Probike': 60290 } },

  // ── Høytaler ──────────────────────────────────────────────────────────
  { id: 'spk-jbl-flip6',                 categoryId: 'speaker', name: 'JBL Flip 6',                          brand: 'JBL',      specs: 'Bluetooth 5.1 · IP67 · 12h · PartyBoost',         rating: 4.5, reviews: 823, year: 2021, price:  1199, retailers: { 'Power':  1199, 'Elkjøp':  1290, 'Komplett':  1299, 'NetOnNet':  1290 } },
  { id: 'spk-jbl-charge5',               categoryId: 'speaker', name: 'JBL Charge 5',                        brand: 'JBL',      specs: 'Bluetooth · IP67 · 20h · powerbank built-in',     rating: 4.6, reviews:1247, year: 2021, price:  1490, retailers: { 'Power':  1490, 'Elkjøp':  1590, 'Komplett':  1590, 'NetOnNet':  1590 } },
  { id: 'spk-bose-soundlink-flex',       categoryId: 'speaker', name: 'Bose SoundLink Flex 2nd Gen',         brand: 'Bose',     specs: 'Bluetooth · IP67 · 12h · PositionIQ',             rating: 4.5, reviews: 412, year: 2024, price:  1490, retailers: { 'Power':  1490, 'Elkjøp':  1590, 'Hi-Fi Klubben':  1690 } },
  { id: 'spk-marshall-emberton2',        categoryId: 'speaker', name: 'Marshall Emberton II',                brand: 'Marshall', specs: 'Bluetooth 5.1 · IP67 · 30+h · True Stereophonic', rating: 4.6, reviews: 287, year: 2022, price:  1890, retailers: { 'Power':  1890, 'Elkjøp':  1990, 'Hi-Fi Klubben':  2090 } },
  { id: 'spk-sonos-roam2',               categoryId: 'speaker', name: 'Sonos Roam 2',                        brand: 'Sonos',    specs: 'WiFi + BT · IP67 · 10h · Trueplay tuning',        rating: 4.5, reviews: 287, year: 2024, price:  2190, retailers: { 'Hi-Fi Klubben':  2190, 'Power':   2290, 'Lydrommet':  2290 } },
  { id: 'spk-bo-explore',                categoryId: 'speaker', name: 'Bang & Olufsen Beosound Explore',     brand: 'B&O',      specs: 'Bluetooth · IP67 · 27h · True 360 sound',         rating: 4.7, reviews: 198, year: 2021, price:  2490, retailers: { 'Hi-Fi Klubben':  2490, 'Power':   2690 } },
  { id: 'spk-sonos-era100',              categoryId: 'speaker', name: 'Sonos Era 100',                       brand: 'Sonos',    specs: 'WiFi · BT · stereo pair-able · Trueplay · line-in',rating: 4.6, reviews: 412, year: 2023, price:  3490, retailers: { 'Hi-Fi Klubben':  3490, 'Power':   3590, 'Elkjøp':  3690, 'Lydrommet':  3590 } },
  { id: 'spk-marshall-stanmore3',        categoryId: 'speaker', name: 'Marshall Stanmore III',               brand: 'Marshall', specs: 'WiFi + BT · class D 80W · Dynamic Loudness',      rating: 4.7, reviews: 312, year: 2022, price:  5490, retailers: { 'Hi-Fi Klubben':  5490, 'Power':   5690, 'Elkjøp':  5790 } },
  { id: 'spk-sonos-era300',              categoryId: 'speaker', name: 'Sonos Era 300',                       brand: 'Sonos',    specs: 'WiFi · spatial audio · Dolby Atmos · 6 drivers',  rating: 4.7, reviews: 298, year: 2023, price:  6990, retailers: { 'Hi-Fi Klubben':  6990, 'Power':   7190, 'Elkjøp':  7290, 'Lydrommet':  7090, 'Akusto':   7190 } },
  { id: 'spk-klipsch-three-plus',        categoryId: 'speaker', name: 'Klipsch The Three Plus',              brand: 'Klipsch',  specs: 'WiFi · BT · phono input · USB-C · 120W class D',  rating: 4.6, reviews: 156, year: 2024, price:  7490, retailers: { 'Hi-Fi Klubben':  7490, 'Audiophile.no':  7790 } },
  { id: 'spk-kef-lsx2',                  categoryId: 'speaker', name: 'KEF LSX II (pair)',                   brand: 'KEF',      specs: 'Active wireless · WiFi · HDMI ARC · 24/96 · pair',rating: 4.7, reviews: 164, year: 2022, price:  8990, retailers: { 'Hi-Fi Klubben':  8990, 'Audiophile.no':  9290 } },
  { id: 'spk-kef-ls50w2',                categoryId: 'speaker', name: 'KEF LS50 Wireless II (pair)',         brand: 'KEF',      specs: 'Active · 24/384 · MQA · audiophile reference',    rating: 4.8, reviews: 218, year: 2020, price: 22990, retailers: { 'Hi-Fi Klubben': 22990, 'Audiophile.no': 23490, 'Akusto':  23290 } },
  { id: 'spk-sonos-arc-sub',             categoryId: 'speaker', name: 'Sonos Arc + Sub Gen 3 set',           brand: 'Sonos',    specs: 'Dolby Atmos soundbar + wireless sub · home theatre', rating: 4.8, reviews: 287, year: 2023, price: 24990, retailers: { 'Hi-Fi Klubben': 24990, 'Power':  25490, 'Lydrommet': 25290 } },
  { id: 'spk-bo-beoplay-a9',             categoryId: 'speaker', name: 'B&O Beoplay A9 5th gen',              brand: 'B&O',      specs: 'WiFi · AirPlay 2 · Chromecast · 480W · floor',     rating: 4.8, reviews:  87, year: 2023, price: 27990, retailers: { 'Hi-Fi Klubben': 27990 } },
  { id: 'spk-kef-ls60',                  categoryId: 'speaker', name: 'KEF LS60 Wireless',                   brand: 'KEF',      specs: 'Active wireless tower · 24/384 · Uni-Q · pair',    rating: 4.8, reviews: 124, year: 2022, price: 44990, retailers: { 'Hi-Fi Klubben': 44990, 'Audiophile.no': 45990 } }
];

// Curated picks per category for the presets
const OPTIMAL_PICKS = {
  pc:         'pc-lenovo-legion5-pro',
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
  pc:         'pc-lenovo-legion5-pro',
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
  const months = 13;
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
  let bestName = '', bestPrice = Infinity;
  for (const [name, price] of Object.entries(p.retailers)) {
    if (price < bestPrice) { bestPrice = price; bestName = name; }
  }
  p.cheapestRetailer = { name: bestName, price: bestPrice };
}

// Tier labels per category, proportional to position in the price-sorted list
for (const cat of CATEGORIES) {
  const prods = PRODUCTS.filter((p) => p.categoryId === cat.id).sort((a, b) => a.price - b.price);
  const n = Math.max(1, prods.length);
  prods.forEach((p, i) => {
    const ratio = i / n;
    p.tierLabel = ratio < 0.25 ? 'Budget' : ratio < 0.6 ? 'Mid' : ratio < 0.85 ? 'High' : 'Premium';
  });
}

/* ──────────────────────────────────────────────────────────────────────
 * External URLs — every link goes through Google site-scoped search.
 * Reason: per-retailer search URL patterns vary, break, or 404 silently.
 * Routing through Google guarantees the link works AND lands on a SERP
 * with the right product on that retailer's domain. The user is one
 * click from the retailer's page.
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
  'Telenor':        'telenor.no',
  'Telia':          'telia.no',
  'Apple':          'apple.com',
  'iSpot':          'ispot.no',
  'NetOnNet':       'netonnet.no',
  'Dustin':         'dustinhome.no',
  'Decathlon':      'decathlon.no',
  'Sykkelnerden':   'sykkelnerden.no',
  'Probike':        'probike.no',
  'Canyon':         'canyon.com',
  'Lydrommet':      'lydrommet.no',
  'Akusto':         'akusto.no',
  'Musikkbutikken': 'musikkbutikken.no'
};

function retailerUrl(retailer, productName) {
  const domain = RETAILER_DOMAINS[retailer];
  if (domain) {
    return `https://www.google.com/search?q=${encodeURIComponent(`site:${domain} ${productName}`)}`;
  }
  return `https://www.google.com/search?q=${encodeURIComponent(`${retailer} ${productName}`)}`;
}

function prisjaktUrl(productName) {
  // Site-scoped Google search lands on Prisjakt's product page consistently
  return `https://www.google.com/search?q=${encodeURIComponent(`site:prisjakt.no ${productName}`)}`;
}

// Inline SVG icon paths (Lucide-style 24×24 stroke icons)
const ICONS = {
  monitor: '<rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>',
  laptop:  '<rect x="3" y="4" width="18" height="12" rx="2"/><line x1="2" y1="20" x2="22" y2="20"/>',
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
