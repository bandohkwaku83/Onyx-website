import { IMAGES } from "@/lib/constants";
import { PRODUCTS } from "@/lib/products";
import type {
  ActivityItem,
  AdminCustomer,
  AdminOrder,
  AdminProduct,
  AdminShowroomItem,
  ContentUpdate,
  WebsiteContent,
} from "./types";

export const DEMO_ADMIN = {
  email: "admin@onyxbuild.com",
  password: "admin123",
  name: "Ama Mensah",
  role: "Administrator",
} as const;

export const INITIAL_SHOWROOM: AdminShowroomItem[] = [
  {
    id: "sr-001",
    name: "Modern Pendant Light",
    description:
      "Elegant contemporary pendant light suitable for modern living spaces.",
    price: 2500,
    discountPrice: 2200,
    category: "Lighting",
    image: IMAGES.pendant,
    status: "published",
    availability: "available",
    updatedAt: "2026-09-12T10:30:00Z",
  },
  {
    id: "sr-002",
    name: "Matte Black Rain Shower",
    description:
      "Statement rain shower system with precise temperature control.",
    price: 4200,
    category: "Sanitary Ware",
    image: IMAGES.shower,
    status: "published",
    availability: "available",
    updatedAt: "2026-09-10T14:15:00Z",
  },
  {
    id: "sr-003",
    name: "Smart Ambient Suite",
    description:
      "Layered lighting and control package for living rooms and lounges.",
    price: 6800,
    category: "Home Solutions",
    image: IMAGES.livingRoom,
    status: "published",
    availability: "available",
    updatedAt: "2026-09-08T09:00:00Z",
  },
  {
    id: "sr-004",
    name: "Brass Basin Mixer",
    description: "Warm brass finish mixer designed for premium vanity setups.",
    price: 980,
    category: "Sanitary Ware",
    image: IMAGES.faucets,
    status: "draft",
    availability: "coming-soon",
    updatedAt: "2026-09-14T16:45:00Z",
  },
  {
    id: "sr-005",
    name: "Dining Linear Pendant",
    description: "Soft linear pendant ideal for dining tables and kitchen islands.",
    price: 3100,
    category: "Lighting",
    image: IMAGES.dining,
    status: "published",
    availability: "unavailable",
    updatedAt: "2026-09-05T11:20:00Z",
  },
];

export const INITIAL_PRODUCTS: AdminProduct[] = PRODUCTS.map((p, index) => ({
  id: p.id,
  name: p.name,
  slug: p.slug,
  description: p.description,
  price: p.price,
  discountPrice: index % 5 === 0 ? Math.round(p.price * 0.9) : undefined,
  category:
    p.category === "lighting"
      ? "Lighting"
      : p.category === "sanitary-ware"
        ? "Sanitary Ware"
        : "Home Solutions",
  image: p.image,
  status: index % 7 === 0 ? "draft" : "published",
  enabled: p.inStock && index % 8 !== 0,
  updatedAt: new Date(Date.UTC(2026, 8, 1 + (index % 14), 10, 0)).toISOString(),
}));

export const INITIAL_ORDERS: AdminOrder[] = [
  {
    id: "ORD-1042",
    customerName: "Kwame Asante",
    customerEmail: "kwame.asante@email.com",
    customerPhone: "0244123456",
    items: [
      {
        productId: "lt-001",
        name: "Brass Pendant Light",
        image: IMAGES.pendant,
        quantity: 2,
        unitPrice: 2450,
      },
    ],
    subtotal: 4900,
    total: 4900,
    date: "2026-09-15T18:22:00Z",
    status: "pending",
    paymentStatus: "paid",
  },
  {
    id: "ORD-1041",
    customerName: "Efua Boateng",
    customerEmail: "efua.b@email.com",
    customerPhone: "0209876543",
    items: [
      {
        productId: "sw-002",
        name: "Rain Shower System",
        image: IMAGES.shower,
        quantity: 1,
        unitPrice: 4200,
      },
      {
        productId: "sw-003",
        name: "Chrome Basin Mixer",
        image: IMAGES.faucets,
        quantity: 1,
        unitPrice: 750,
      },
    ],
    subtotal: 4950,
    total: 4950,
    date: "2026-09-15T11:05:00Z",
    status: "processing",
    paymentStatus: "paid",
  },
  {
    id: "ORD-1040",
    customerName: "Daniel Osei",
    customerEmail: "daniel.osei@email.com",
    customerPhone: "0556677889",
    items: [
      {
        productId: "hs-001",
        name: "Smart Home Hub Kit",
        image: IMAGES.smartHome,
        quantity: 1,
        unitPrice: 3200,
      },
    ],
    subtotal: 3200,
    total: 3200,
    date: "2026-09-14T16:40:00Z",
    status: "completed",
    paymentStatus: "paid",
  },
  {
    id: "ORD-1039",
    customerName: "Abena Owusu",
    customerEmail: "abena.owusu@email.com",
    customerPhone: "0273344556",
    items: [
      {
        productId: "lt-005",
        name: "Decorative Floor Lamp",
        image: IMAGES.decorativeLighting,
        quantity: 1,
        unitPrice: 1800,
      },
    ],
    subtotal: 1800,
    total: 1800,
    date: "2026-09-13T09:18:00Z",
    status: "cancelled",
    paymentStatus: "refunded",
    notes: "Customer requested cancellation before dispatch.",
  },
  {
    id: "ORD-1038",
    customerName: "Yaw Mensah",
    customerEmail: "yaw.m@email.com",
    customerPhone: "0261122334",
    items: [
      {
        productId: "lt-002",
        name: "LED Ceiling Panel",
        image: IMAGES.ceilingLighting,
        quantity: 4,
        unitPrice: 890,
      },
    ],
    subtotal: 3560,
    total: 3560,
    date: "2026-09-12T14:55:00Z",
    status: "completed",
    paymentStatus: "paid",
  },
  {
    id: "ORD-1037",
    customerName: "Akosua Frimpong",
    customerEmail: "akosua.f@email.com",
    customerPhone: "0234455667",
    items: [
      {
        productId: "hs-003",
        name: "Modular Storage Unit",
        image: IMAGES.storage,
        quantity: 1,
        unitPrice: 2100,
      },
    ],
    subtotal: 2100,
    total: 2100,
    date: "2026-09-11T20:10:00Z",
    status: "pending",
    paymentStatus: "pending",
  },
];

export const INITIAL_CUSTOMERS: AdminCustomer[] = [
  {
    id: "cus-001",
    name: "Kwame Asante",
    email: "kwame.asante@email.com",
    phone: "0244123456",
    orders: 3,
    totalSpent: 12450,
    joinedAt: "2026-03-12T10:00:00Z",
  },
  {
    id: "cus-002",
    name: "Efua Boateng",
    email: "efua.b@email.com",
    phone: "0209876543",
    orders: 5,
    totalSpent: 18900,
    joinedAt: "2026-01-22T10:00:00Z",
  },
  {
    id: "cus-003",
    name: "Daniel Osei",
    email: "daniel.osei@email.com",
    phone: "0556677889",
    orders: 2,
    totalSpent: 5400,
    joinedAt: "2026-05-08T10:00:00Z",
  },
  {
    id: "cus-004",
    name: "Abena Owusu",
    email: "abena.owusu@email.com",
    phone: "0273344556",
    orders: 1,
    totalSpent: 1800,
    joinedAt: "2026-08-19T10:00:00Z",
  },
  {
    id: "cus-005",
    name: "Yaw Mensah",
    email: "yaw.m@email.com",
    phone: "0261122334",
    orders: 4,
    totalSpent: 9800,
    joinedAt: "2026-02-03T10:00:00Z",
  },
  {
    id: "cus-006",
    name: "Akosua Frimpong",
    email: "akosua.f@email.com",
    phone: "0234455667",
    orders: 2,
    totalSpent: 4300,
    joinedAt: "2026-06-30T10:00:00Z",
  },
];

export const INITIAL_ACTIVITY: ActivityItem[] = [
  {
    id: "act-1",
    type: "order",
    message: "New checkout ORD-1042 from Kwame Asante",
    time: "2026-09-15T18:22:00Z",
  },
  {
    id: "act-2",
    type: "showroom",
    message: "Shop item “Brass Basin Mixer” saved as draft",
    time: "2026-09-14T16:45:00Z",
  },
  {
    id: "act-3",
    type: "content",
    message: "Homepage hero image updated",
    time: "2026-09-14T12:10:00Z",
  },
  {
    id: "act-4",
    type: "order",
    message: "Order ORD-1041 marked as processing",
    time: "2026-09-15T11:30:00Z",
  },
  {
    id: "act-5",
    type: "product",
    message: "Product “LED Ceiling Panel” price updated",
    time: "2026-09-13T15:00:00Z",
  },
];

export const INITIAL_CONTENT: WebsiteContent = {
  homeHero: {
    image: IMAGES.hero,
    eyebrow: "Lighting | Sanitary Ware | Home Solutions",
    heading: "Redefining",
    headingAccent: "Modern Living",
    description:
      "Premium lighting, elegant sanitary solutions, and home innovations designed for spaces that inspire.",
    primaryCta: "Shop Now",
    secondaryCta: "Contact Us",
  },
  detailsSection: {
    eyebrow: "Designed For Beautiful Spaces",
    title: "Where Every Detail Matters",
    cards: [
      {
        id: "detail-1",
        title: "Lighting",
        subtitle: "Illuminate your world",
        description:
          "Create atmosphere. Shape emotion. Designer pendants, ceiling fixtures, and smart lighting for every room.",
        image: IMAGES.pendant,
        href: "/lighting",
      },
      {
        id: "detail-2",
        title: "Sanitary Ware",
        subtitle: "Transform your bathroom",
        description:
          "Luxury bathrooms designed for comfort and elegance. Faucets, showers, and complete bathroom sets.",
        image: IMAGES.bathroom,
        href: "/sanitary-ware",
      },
      {
        id: "detail-3",
        title: "Home Solutions",
        subtitle: "Complete your space",
        description:
          "Kitchen innovations, smart home systems, storage, and renovation services for modern living.",
        image: IMAGES.kitchen,
        href: "/home-solutions",
      },
    ],
  },
  homeCta: {
    image: IMAGES.showroom,
    eyebrow: "Transform Your Space",
    title: "Planning Your Dream Space?",
    description:
      "Book an interior consultation, product consultation, or showroom visit with our design experts.",
    buttonLabel: "Shop Now",
  },
  contactHero: {
    image: IMAGES.showroom,
    eyebrow: "Get Started",
    heading: "Book A Consultation",
    description:
      "Planning your dream space? Let our experts guide you every step of the way.",
  },
  shopIntro:
    "Visit our curated shop selections — refined pieces ready for your next project.",
};

export const INITIAL_CONTENT_UPDATES: ContentUpdate[] = [
  {
    id: "cu-1",
    section: "Homepage",
    title: "Hero image refreshed",
    updatedAt: "2026-09-14T12:10:00Z",
    image: IMAGES.hero,
  },
  {
    id: "cu-2",
    section: "Shop",
    title: "Modern Pendant Light published",
    updatedAt: "2026-09-12T10:30:00Z",
    image: IMAGES.pendant,
  },
  {
    id: "cu-3",
    section: "Homepage",
    title: "Hero CTA copy updated",
    updatedAt: "2026-09-11T09:00:00Z",
  },
  {
    id: "cu-4",
    section: "Inspiration",
    title: "Villa gallery images added",
    updatedAt: "2026-09-09T17:20:00Z",
    image: IMAGES.villa,
  },
];

export const PRODUCT_CATEGORIES = [
  "Lighting",
  "Sanitary Ware",
  "Home Solutions",
] as const;

export function formatAdminDate(iso: string): string {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(iso));
}

export function formatAdminDateTime(iso: string): string {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(iso));
}

export function relativeTime(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${Math.max(1, mins)}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}
