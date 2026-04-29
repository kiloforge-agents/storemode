// ----- Domain data for the StoreMode demo -----

export type Coord = { x: number; y: number };

export type Aisle = {
  id: string;
  label: string;
  // A polygon expressed in viewBox coords (0..100 x 0..160)
  rect: { x: number; y: number; w: number; h: number };
  category: string;
};

export type Pin = {
  id: string;
  name: string;
  brand?: string;
  category: string;
  aisleId: string;
  position: Coord;
  price: number;
  was?: number;
  deal?: string;
  badge?: "deal" | "new" | "low" | "member";
  bearing: number; // degrees, used for AR arrow
  distance: number; // meters
  rating?: number;
  reviews?: number;
  sku: string;
  inStock: number;
  description: string;
};

export type StoreInfo = {
  id: string;
  name: string;
  banner: string;
  address: string;
  hours: string;
  distance: string;
  status: "open" | "closing" | "closed";
  closesAt: string;
  size: string; // sqft
  pickup: boolean;
  beacons: number;
  nps: number;
  // Where the user is standing in the map
  user: Coord;
  // Heading in degrees (0 = up)
  heading: number;
};

export const STORE: StoreInfo = {
  id: "eastfield-001",
  name: "Eastfield Market",
  banner: "Flagship",
  address: "412 Linden Ave · Eastfield Plaza",
  hours: "Mon–Sun · 7am–11pm",
  distance: "0.2 mi",
  status: "open",
  closesAt: "11:00pm",
  size: "38,400 sq ft",
  pickup: true,
  beacons: 142,
  nps: 71,
  user: { x: 22, y: 118 },
  heading: 12,
};

export const AISLES: Aisle[] = [
  // Entrance / Carts
  { id: "entry", label: "Entrance", rect: { x: 4, y: 134, w: 32, h: 18 }, category: "Front of store" },
  { id: "checkout", label: "Self-checkout", rect: { x: 64, y: 134, w: 32, h: 18 }, category: "Front of store" },

  // Produce zone (top)
  { id: "produce", label: "Produce", rect: { x: 4, y: 6, w: 44, h: 26 }, category: "Fresh" },
  { id: "bakery", label: "Bakery", rect: { x: 52, y: 6, w: 44, h: 16 }, category: "Fresh" },
  { id: "florals", label: "Florals", rect: { x: 52, y: 24, w: 22, h: 8 }, category: "Fresh" },
  { id: "deli", label: "Deli & Cheese", rect: { x: 76, y: 24, w: 20, h: 8 }, category: "Fresh" },

  // Mid aisles
  { id: "a1", label: "Aisle 1 · Pantry", rect: { x: 4, y: 38, w: 92, h: 9 }, category: "Pantry" },
  { id: "a2", label: "Aisle 2 · Snacks", rect: { x: 4, y: 50, w: 92, h: 9 }, category: "Snacks" },
  { id: "a3", label: "Aisle 3 · Beverages", rect: { x: 4, y: 62, w: 92, h: 9 }, category: "Beverages" },
  { id: "a4", label: "Aisle 4 · Home", rect: { x: 4, y: 74, w: 92, h: 9 }, category: "Home" },
  { id: "a5", label: "Aisle 5 · Beauty", rect: { x: 4, y: 86, w: 92, h: 9 }, category: "Beauty" },
  { id: "a6", label: "Aisle 6 · Electronics", rect: { x: 4, y: 98, w: 92, h: 9 }, category: "Electronics" },

  // Back wall
  { id: "frozen", label: "Frozen", rect: { x: 4, y: 110, w: 30, h: 18 }, category: "Frozen" },
  { id: "dairy", label: "Dairy", rect: { x: 36, y: 110, w: 28, h: 18 }, category: "Fresh" },
  { id: "butcher", label: "Butcher", rect: { x: 66, y: 110, w: 30, h: 18 }, category: "Fresh" },
];

export const PINS: Pin[] = [
  {
    id: "p1",
    name: "Cold Brew Concentrate",
    brand: "Linden Roasters",
    category: "Beverages",
    aisleId: "a3",
    position: { x: 28, y: 66 },
    price: 6.99,
    was: 9.49,
    deal: "26% off — today only",
    badge: "deal",
    bearing: -22,
    distance: 11,
    rating: 4.7,
    reviews: 318,
    sku: "BR-CB-32",
    inStock: 24,
    description:
      "Slow-steeped 18 hours. Pairs with the oat milk in the dairy aisle. Member price stacks today.",
  },
  {
    id: "p2",
    name: "Heritage Sourdough Loaf",
    brand: "Eastfield Bakery",
    category: "Bakery",
    aisleId: "bakery",
    position: { x: 68, y: 14 },
    price: 5.5,
    deal: "Baked at 6:42am",
    badge: "new",
    bearing: 18,
    distance: 28,
    rating: 4.9,
    reviews: 612,
    sku: "BK-SD-1L",
    inStock: 9,
    description:
      "32-hour fermentation. The last tray of the morning bake — currently 9 loaves left on the rack.",
  },
  {
    id: "p3",
    name: "Wireless Buds Pro",
    brand: "Acumen",
    category: "Electronics",
    aisleId: "a6",
    position: { x: 72, y: 102 },
    price: 129.0,
    was: 169.0,
    deal: "Member exclusive",
    badge: "member",
    bearing: 64,
    distance: 19,
    rating: 4.6,
    reviews: 2104,
    sku: "AC-BPRO-2",
    inStock: 4,
    description:
      "Active noise cancellation. Demo unit available at the listening bench across from aisle 6.",
  },
  {
    id: "p4",
    name: "Hass Avocados (4-pack)",
    brand: "Local · Fresno",
    category: "Produce",
    aisleId: "produce",
    position: { x: 18, y: 18 },
    price: 4.0,
    bearing: -8,
    distance: 34,
    rating: 4.4,
    reviews: 88,
    sku: "PR-AV-4",
    inStock: 60,
    description: "Ripe today. Look for the dark, slightly soft skin — a third of the bin is ready.",
  },
  {
    id: "p5",
    name: "Oat Milk · Barista",
    brand: "Pollinate Farms",
    category: "Dairy",
    aisleId: "dairy",
    position: { x: 48, y: 118 },
    price: 4.49,
    deal: "Buy 2, save $2",
    badge: "deal",
    bearing: 38,
    distance: 24,
    rating: 4.8,
    reviews: 921,
    sku: "PF-OM-BAR",
    inStock: 42,
    description:
      "Steams to micro-foam. Stacks with cold brew concentrate today. Cooler door 4, top shelf.",
  },
  {
    id: "p6",
    name: "Riesling 2022",
    brand: "Hollow Creek",
    category: "Beverages",
    aisleId: "a3",
    position: { x: 86, y: 66 },
    price: 18.0,
    was: 22.0,
    deal: "Pairs with deli special",
    bearing: 54,
    distance: 22,
    rating: 4.5,
    reviews: 47,
    sku: "BV-RIES-22",
    inStock: 12,
    description:
      "Off-dry, lemon zest, low alcohol. The deli's Comté pairing flag goes up at 4pm.",
  },
  {
    id: "p7",
    name: "Compostable Trash Bags",
    brand: "Roundleaf",
    category: "Home",
    aisleId: "a4",
    position: { x: 36, y: 78 },
    price: 11.99,
    deal: "First-time member −$3",
    badge: "low",
    bearing: 12,
    distance: 8,
    rating: 4.3,
    reviews: 134,
    sku: "HM-TR-CMP",
    inStock: 3,
    description:
      "13-gal kitchen size. Only 3 left on shelf — a restock is on the cart by aisle 4 endcap.",
  },
  {
    id: "p8",
    name: "Sea Salt Dark 72%",
    brand: "Maison Quill",
    category: "Snacks",
    aisleId: "a2",
    position: { x: 58, y: 54 },
    price: 3.75,
    bearing: 6,
    distance: 14,
    rating: 4.7,
    reviews: 451,
    sku: "SN-CHOC-DK",
    inStock: 28,
    description:
      "Single-origin Ghana. Endcap display rotates Friday — get it before the new selection swaps in.",
  },
];

export type Promotion = {
  id: string;
  title: string;
  subtitle: string;
  zone: string; // aisle id or area
  ends: string;
  color: "lime" | "orange" | "blue";
  position: Coord;
};

export const PROMOTIONS: Promotion[] = [
  {
    id: "promo-1",
    title: "Bake-off Friday",
    subtitle: "Every loaf $1 off after 6pm",
    zone: "bakery",
    ends: "Today · 9:00pm",
    color: "orange",
    position: { x: 78, y: 14 },
  },
  {
    id: "promo-2",
    title: "Cold Brew × Oat Milk",
    subtitle: "Bundle saves $4.50",
    zone: "a3",
    ends: "While supplies last",
    color: "lime",
    position: { x: 32, y: 66 },
  },
  {
    id: "promo-3",
    title: "Member listening bench",
    subtitle: "Demo Buds Pro · free engraving",
    zone: "a6",
    ends: "All day",
    color: "blue",
    position: { x: 70, y: 102 },
  },
];

// Recent / suggested for the home feed
export const SUGGESTED_LIST_ID = "weekly";
export const SAVED_LISTS = [
  {
    id: SUGGESTED_LIST_ID,
    name: "Weekly basics",
    items: ["Hass Avocados (4-pack)", "Oat Milk · Barista", "Heritage Sourdough Loaf"],
    note: "9 of 12 in stock right now",
  },
  {
    id: "office",
    name: "Studio refill",
    items: ["Cold Brew Concentrate", "Sea Salt Dark 72%", "Compostable Trash Bags"],
    note: "All 3 in stock · 4-min route",
  },
];

export const NEAR_STORES = [
  { name: "Eastfield Market", dist: "0.2 mi", status: "Open · until 11pm", featured: true },
  { name: "Riverbend Outfitters", dist: "0.6 mi", status: "Open · until 9pm", featured: false },
  { name: "Cabin & Co. Hardware", dist: "0.9 mi", status: "Open · until 8pm", featured: false },
  { name: "Aria Beauty", dist: "1.1 mi", status: "Closes in 23 min", featured: false },
];
