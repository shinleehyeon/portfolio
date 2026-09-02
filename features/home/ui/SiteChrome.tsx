import { TopNav } from "@/features/home/ui/TopNav";

export function SiteChrome() {
  return (
    <>
      <TopNav />

        <header className="mobile-header">
          <nav className="mobile-header__nav">
            <a href="#hero" className="mobile-header__link active" data-section="hero">Hero</a>
            <a href="#about" className="mobile-header__link" data-section="about">About</a>
            <a href="#experience" className="mobile-header__link" data-section="experience">Experience</a>
            <a href="#highlights" className="mobile-header__link" data-section="highlights">Highlights</a>
            <a href="#projects" className="mobile-header__link" data-section="projects">Project</a>
          </nav>
          <button className="menu-toggle" aria-label="Menu" aria-expanded="false">
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </button>
        </header>

        <div className="mobile-menu" aria-hidden="true">
          <a href="#hero" className="mobile-menu-link">Hero</a>
          <a href="#about" className="mobile-menu-link">About</a>
          <a href="#experience" className="mobile-menu-link">Experience</a>
          <a href="#highlights" className="mobile-menu-link">Highlights</a>
          <a href="#projects" className="mobile-menu-link">Project</a>
          <div className="mobile-menu-bottom">
            <a href="https://linkedin.com/in/shinleehyeon" target="_blank" rel="noopener" className="mobile-menu-link">LinkedIn</a>
            <a href="#" className="mobile-menu-link" id="mobileMenuCopyEmail">Email</a>
          </div>
        </div>
    </>
  );
}
