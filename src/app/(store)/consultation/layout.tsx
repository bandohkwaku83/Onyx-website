import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Consultation",
  description:
    "Book an interior consultation, product consultation, or showroom visit with Onyx Build & Partners.",
};

export default function ConsultationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
