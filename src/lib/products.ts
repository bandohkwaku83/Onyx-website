import { IMAGES } from "./constants";

export type ProductCategory = "lighting" | "sanitary-ware" | "home-solutions";

export type Product = {
  id: string;
  slug: string;
  name: string;
  price: number;
  category: ProductCategory;
  image: string;
  description: string;
  features: string[];
  inStock: boolean;
};

export const CATEGORY_LABELS: Record<ProductCategory, string> = {
  lighting: "Lighting",
  "sanitary-ware": "Sanitary Ware",
  "home-solutions": "Home Solutions",
};

export const CATEGORY_PATHS: Record<ProductCategory, string> = {
  lighting: "/lighting",
  "sanitary-ware": "/sanitary-ware",
  "home-solutions": "/home-solutions",
};

export const PRODUCTS: Product[] = [
  // Lighting
  {
    id: "lt-001",
    slug: "brass-pendant-light",
    name: "Brass Pendant Light",
    price: 2450,
    category: "lighting",
    image: IMAGES.pendant,
    description:
      "Elegant brass-finished pendant light with warm ambient glow. Perfect for dining areas and kitchen islands.",
    features: ["Brass finish", "E27 bulb compatible", "Adjustable cord length"],
    inStock: true,
  },
  {
    id: "lt-002",
    slug: "led-ceiling-panel",
    name: "LED Ceiling Panel",
    price: 890,
    category: "lighting",
    image: IMAGES.ceilingLighting,
    description:
      "Slim recessed LED ceiling panel delivering even, energy-efficient illumination for any room.",
    features: ["Energy efficient", "6000K daylight option", "Easy installation"],
    inStock: true,
  },
  {
    id: "lt-003",
    slug: "outdoor-wall-light",
    name: "Outdoor Wall Light",
    price: 1200,
    category: "lighting",
    image: IMAGES.outdoor,
    description:
      "Weather-resistant outdoor wall light with a modern silhouette for facades, patios, and gardens.",
    features: ["IP65 rated", "Matte black finish", "LED included"],
    inStock: true,
  },
  {
    id: "lt-004",
    slug: "smart-dimmer-switch",
    name: "Smart Dimmer Switch",
    price: 650,
    category: "lighting",
    image: IMAGES.smartLighting,
    description:
      "Wi-Fi enabled dimmer switch for app and voice control. Set scenes and schedules with ease.",
    features: ["App control", "Voice assistant compatible", "No hub required"],
    inStock: true,
  },
  {
    id: "lt-005",
    slug: "crystal-chandelier",
    name: "Crystal Chandelier",
    price: 8500,
    category: "lighting",
    image: IMAGES.decorativeLighting,
    description:
      "Statement crystal chandelier that transforms living rooms and entryways into luxury spaces.",
    features: ["8-light design", "Chrome frame", "Dimmable"],
    inStock: true,
  },
  {
    id: "lt-006",
    slug: "wall-sconce-pair",
    name: "Wall Sconce Pair",
    price: 1850,
    category: "lighting",
    image: IMAGES.dining,
    description:
      "Pair of contemporary wall sconces ideal for hallways, bedrooms, and accent lighting.",
    features: ["Set of 2", "Soft gold finish", "Up/down light"],
    inStock: true,
  },

  // Sanitary Ware
  {
    id: "sw-001",
    slug: "freestanding-basin-set",
    name: "Freestanding Basin Set",
    price: 3200,
    category: "sanitary-ware",
    image: IMAGES.bathroomSets,
    description:
      "Complete freestanding basin with pedestal. Clean lines and premium ceramic construction.",
    features: ["Ceramic basin", "Overflow protection", "Chrome waste included"],
    inStock: true,
  },
  {
    id: "sw-002",
    slug: "rainfall-shower-system",
    name: "Rainfall Shower System",
    price: 4750,
    category: "sanitary-ware",
    image: IMAGES.shower,
    description:
      "Thermostatic rainfall shower with handheld wand and body jets for a spa-like experience.",
    features: ["Thermostatic valve", "Rain head + handheld", "Brushed nickel"],
    inStock: true,
  },
  {
    id: "sw-003",
    slug: "chrome-mixer-tap",
    name: "Chrome Mixer Tap",
    price: 980,
    category: "sanitary-ware",
    image: IMAGES.faucets,
    description:
      "Single-lever chrome mixer tap with ceramic disc cartridge for smooth, drip-free operation.",
    features: ["Ceramic cartridge", "Polished chrome", "5-year warranty"],
    inStock: true,
  },
  {
    id: "sw-004",
    slug: "wall-hung-toilet",
    name: "Wall-Hung Toilet",
    price: 2100,
    category: "sanitary-ware",
    image: IMAGES.bathroom,
    description:
      "Space-saving wall-hung toilet with concealed cistern compatibility and soft-close seat.",
    features: ["Rimless design", "Soft-close seat", "Concealed fixings"],
    inStock: true,
  },
  {
    id: "sw-005",
    slug: "bathroom-mirror-cabinet",
    name: "Bathroom Mirror Cabinet",
    price: 1450,
    category: "sanitary-ware",
    image: IMAGES.bathroomAccessories,
    description:
      "LED-backlit mirror cabinet with internal shelving and anti-fog functionality.",
    features: ["LED lighting", "Anti-fog mirror", "Soft-close doors"],
    inStock: true,
  },
  {
    id: "sw-006",
    slug: "towel-warmer-rail",
    name: "Towel Warmer Rail",
    price: 1100,
    category: "sanitary-ware",
    image: IMAGES.hotelBathroom,
    description:
      "Electric heated towel rail in brushed stainless steel. Keeps towels warm and dry.",
    features: ["Electric heating", "Wall mounted", "Timer function"],
    inStock: true,
  },

  // Home Solutions
  {
    id: "hs-001",
    slug: "kitchen-sink-tap-set",
    name: "Kitchen Sink & Tap Set",
    price: 2800,
    category: "home-solutions",
    image: IMAGES.kitchen,
    description:
      "Stainless steel double-bowl sink with pull-down mixer tap. Built for everyday durability.",
    features: ["304 stainless steel", "Pull-down spray", "Sound deadening"],
    inStock: true,
  },
  {
    id: "hs-002",
    slug: "smart-door-lock",
    name: "Smart Door Lock",
    price: 1650,
    category: "home-solutions",
    image: IMAGES.smartHome,
    description:
      "Fingerprint and keypad smart lock with app access logs and temporary passcodes.",
    features: ["Fingerprint + PIN", "App management", "Backup key included"],
    inStock: true,
  },
  {
    id: "hs-003",
    slug: "wardrobe-storage-system",
    name: "Wardrobe Storage System",
    price: 5200,
    category: "home-solutions",
    image: IMAGES.storage,
    description:
      "Modular wardrobe interior system with hanging rails, drawers, and adjustable shelving.",
    features: ["Modular design", "Soft-close drawers", "Customisable layout"],
    inStock: true,
  },
  {
    id: "hs-004",
    slug: "under-cabinet-lighting-kit",
    name: "Under-Cabinet Lighting Kit",
    price: 720,
    category: "home-solutions",
    image: IMAGES.accessories,
    description:
      "LED strip lighting kit for kitchens and workspaces. Warm white with dimmer included.",
    features: ["3m LED strip", "Touch dimmer", "Easy adhesive mount"],
    inStock: true,
  },
  {
    id: "hs-005",
    slug: "water-filter-system",
    name: "Water Filter System",
    price: 1350,
    category: "home-solutions",
    image: IMAGES.renovation,
    description:
      "Under-sink water filtration system delivering clean, great-tasting water for the whole family.",
    features: ["3-stage filtration", "12-month filter life", "Easy install"],
    inStock: true,
  },
  {
    id: "hs-006",
    slug: "bathroom-exhaust-fan",
    name: "Bathroom Exhaust Fan",
    price: 480,
    category: "home-solutions",
    image: IMAGES.modernHome,
    description:
      "Quiet bathroom exhaust fan with humidity sensor for automatic moisture control.",
    features: ["Humidity sensor", "Low noise", "Energy efficient motor"],
    inStock: true,
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function getProductsByCategory(category: ProductCategory): Product[] {
  return PRODUCTS.filter((p) => p.category === category);
}

export function formatPrice(amount: number): string {
  return new Intl.NumberFormat("en-GH", {
    style: "currency",
    currency: "GHS",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}
