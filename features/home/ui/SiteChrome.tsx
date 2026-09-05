"use client";

import { useEffect, useState } from "react";
import { TopNav } from "@/features/home/ui/TopNav";
import { useHideOnScroll } from "@/shared/lib/use-hide-on-scroll";
import { useScrollSpy } from "@/shared/lib/use-scroll-spy";

const LINKS = [
  { href: "#hero", id: "hero", label: "Hero" },
  { href: "#about", id: "about", label: "About" },
  { href: "#experience", id: "experience", label: "Experience" },
  { href: "#highlights", id: "highlights", label: "Highlights" },
  { href: "#projects", id: "projects", label: "Project" },
] as const;

export function SiteChrome() {
  const active = useScrollSpy(LINKS.map((link) => link.id));
  const headerHidden = useHideOnScroll();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("menu-open", menuOpen);
    return () => document.body.classList.remove("menu-open");
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <TopNav active={active} />

      <header
        className="mobile-header"
        style={{ transform: headerHidden ? "translateY(-100%)" : "translateY(0)" }}
      >
        <nav className="mobile-header__nav">
          {LINKS.map((link) => (
            <a
              key={link.id}
              href={link.href}
              className={`mobile-header__link${active === link.id ? " active" : ""}`}
              data-section={link.id}
            >
              {link.label}
            </a>
          ))}
        </nav>
        <button
          className="menu-toggle"
          aria-label="Menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </button>
      </header>

      <div className="mobile-menu" aria-hidden={!menuOpen}>
        {LINKS.map((link) => (
          <a key={link.id} href={link.href} className="mobile-menu-link" onClick={closeMenu}>
            {link.label}
          </a>
        ))}
        <div className="mobile-menu-bottom">
          <a href="https://linkedin.com/in/shinleehyeon" target="_blank" rel="noopener" className="mobile-menu-link">
            LinkedIn
          </a>
          <a href="#" className="mobile-menu-link" id="mobileMenuCopyEmail">
            Email
          </a>
        </div>
      </div>
    </>
  );
}
