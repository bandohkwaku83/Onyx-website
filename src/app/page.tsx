import { Hero } from "@/components/home/Hero";
import { Categories } from "@/components/home/Categories";
import { DesignFunction } from "@/components/home/DesignFunction";
import { Collections } from "@/components/home/Collections";
import { ConsultationCTA, ShowroomFlow } from "@/components/home/ConsultationCTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Categories />
      <DesignFunction />
      <Collections />
      <ShowroomFlow />
      <ConsultationCTA />
    </>
  );
}
