import { AboutSection } from "@/components/home/AboutSection";
import { ExperienceSection } from "@/components/home/ExperienceSection";
import { PublicationsSection } from "@/components/home/PublicationsSection";
import { ServicesSection } from "@/components/home/ServicesSection";
import { SiteChrome } from "@/components/home/SiteChrome";
import { SiteFooter } from "@/components/home/SiteFooter";
import { WorkCases } from "@/components/home/WorkCases";

export function HomePage() {
  return (
    <div className="page-home">
      <SiteChrome />
      <main className="content">
        <ServicesSection />
        <AboutSection />
        <WorkCases />
        <ExperienceSection />
        <PublicationsSection />
      </main>
      <SiteFooter />
    </div>
  );
}
