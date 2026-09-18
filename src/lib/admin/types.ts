export type PublishStatus = "draft" | "published" | "archived";
export type AvailabilityStatus = "available" | "unavailable" | "coming-soon";
export type OrderStatus = "pending" | "processing" | "completed" | "cancelled";
export type PaymentStatus = "pending" | "paid" | "failed" | "refunded";

export type AdminShowroomItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  discountPrice?: number;
  category: string;
  image: string;
  status: PublishStatus;
  availability: AvailabilityStatus;
  updatedAt: string;
};

export type AdminProduct = {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  discountPrice?: number;
  category: string;
  image: string;
  status: PublishStatus;
  enabled: boolean;
  updatedAt: string;
};

export type AdminCustomer = {
  id: string;
  name: string;
  email: string;
  phone: string;
  orders: number;
  totalSpent: number;
  joinedAt: string;
};

export type OrderLineItem = {
  productId: string;
  name: string;
  image: string;
  quantity: number;
  unitPrice: number;
};

export type AdminOrder = {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  items: OrderLineItem[];
  subtotal: number;
  total: number;
  date: string;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  notes?: string;
};

export type ActivityItem = {
  id: string;
  type: "order" | "content" | "product" | "showroom";
  message: string;
  time: string;
};

export type DetailCard = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  href: string;
};

export type WebsiteContent = {
  homeHero: {
    image: string;
    eyebrow: string;
    heading: string;
    headingAccent: string;
    description: string;
    primaryCta: string;
    secondaryCta: string;
  };
  detailsSection: {
    eyebrow: string;
    title: string;
    cards: DetailCard[];
  };
  homeCta: {
    image: string;
    eyebrow: string;
    title: string;
    description: string;
    buttonLabel: string;
  };
  contactHero: {
    image: string;
    eyebrow: string;
    heading: string;
    description: string;
  };
  shopIntro: string;
};

export type ContentUpdate = {
  id: string;
  section: string;
  title: string;
  updatedAt: string;
  image?: string;
};
