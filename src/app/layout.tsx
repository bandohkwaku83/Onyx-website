import type { Metadata } from "next";
import { Fraunces, Sora } from "next/font/google";
import { WebsiteContentProvider } from "@/context/WebsiteContentContext";
import { BRAND } from "@/lib/constants";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: `${BRAND.name} — ${BRAND.tagline}`,
    template: `${BRAND.name} | %s`,
  },
  description:
    "Shop premium lighting, sanitary ware, and home solutions online. Onyx Build & Partners — order for delivery across Accra, Ghana.",
  keywords: [
    "lighting",
    "sanitary ware",
    "home solutions",
    "online shop",
    "Ghana",
    "Accra",
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${sora.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <WebsiteContentProvider>{children}</WebsiteContentProvider>
      </body>
    </html>
  );
}
