const unsplash = (id: string, width = 1600) =>
  `https://images.unsplash.com/photo-${id}?w=${width}&q=85&auto=format&fit=crop`;

export const LOGO = "/images/logo.png";

export const BRAND = {
  name: "Onyx Build & Partners",
  tagline: "Redefining Modern Living",
  categories: "Lighting | Sanitary Ware | Home Solutions",
  phone: "0599032559",
  address: "Ablekuma Curve, Accra",
} as const;

export const NAV_LINKS = [
  { href: "/lighting", label: "Lighting" },
  { href: "/sanitary-ware", label: "Sanitary Ware" },
  { href: "/home-solutions", label: "Home Solutions" },
  { href: "/inspiration", label: "Inspiration" },
  { href: "/consultation", label: "Consultation" },
] as const;

// All image IDs verified to return HTTP 200 from Unsplash
export const IMAGES = {
  // Hero & core spaces
  hero: unsplash("1618221195710-dd6b41faaea6", 2400),
  livingRoom: unsplash("1586023492125-27b2c045efd7"),
  bedroom: unsplash("1616594039964-ae9021a400a0"),
  kitchen: unsplash("1600585152915-d208bec867a1"),
  showroom: unsplash("1616486338812-3dadae4b4ace"),

  // Lighting
  pendant: unsplash("1513506003901-1e6a229e2d15"),
  ceilingLighting: unsplash("1600210492486-724fe5c67fb0"),
  outdoor: unsplash("1600585154340-be6161a56a0c"),
  smartLighting: unsplash("1558618666-fcd25c85cd64"),
  decorativeLighting: unsplash("1556912173-46c336c7fd55"),
  dining: unsplash("1414235077428-338989a2e8c0"),

  // Sanitary ware
  bathroom: unsplash("1600566753190-17f0baa2a6c3"),
  bathroomSets: unsplash("1502672260266-1c1ef2d93688"),
  faucets: unsplash("1620626011761-996317b8d101"),
  shower: unsplash("1631049307264-da0ec9d70304"),
  bathroomAccessories: unsplash("1600566753190-17f0baa2a6c3"),
  hotelBathroom: unsplash("1631049307264-da0ec9d70304"),

  // Home solutions
  smartHome: unsplash("1558002038-1055907df827"),
  storage: unsplash("1600607687939-ce8a6c25118c"),
  renovation: unsplash("1503387762-592deb58ef4e"),
  accessories: unsplash("1618221195710-dd6b41faaea6"),

  // Projects & commercial
  hotel: unsplash("1582719478250-c89cae4dc85b"),
  office: unsplash("1497366754035-f200968a6e72"),
  villa: unsplash("1600585154526-990dced4db0d"),
  penthouse: unsplash("1600607687644-c7171b42498f"),

  // Inspiration gallery
  bathroomInspiration: unsplash("1502672260266-1c1ef2d93688"),
  lightingConcept: unsplash("1513506003901-1e6a229e2d15"),
  modernHome: unsplash("1600585154526-990dced4db0d"),
  hospitality: unsplash("1566073771259-6a8506099945"),
} as const;
