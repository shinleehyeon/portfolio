import { AboutSection } from "@/features/home/ui/AboutSection";
import { ExperienceSection } from "@/features/home/ui/ExperienceSection";
import { PublicationsSection } from "@/features/home/ui/PublicationsSection";
import { ServicesSection } from "@/features/home/ui/ServicesSection";
import { SiteChrome } from "@/features/home/ui/SiteChrome";
import { SiteFooter } from "@/features/home/ui/SiteFooter";
import { WorkCases } from "@/features/home/ui/WorkCases";

export function HomePage() {
  return (
    <div className="page-home">
      <SiteChrome />
      <main className="content">
        <ServicesSection />
        <AboutSection />
        <ExperienceSection />
        <PublicationsSection />
        <WorkCases />
      </main>
      <SiteFooter />
    </div>
  );
}
