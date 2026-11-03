"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { TopNav } from "@/features/home/ui/TopNav";
import { useHideOnScroll } from "@/shared/lib/use-hide-on-scroll";
import { useScrollSpy } from "@/shared/lib/use-scroll-spy";

const LINKS = [
  { href: "#hero", id: "hero", label: "Hero" },
  { href: "#about", id: "about", label: "About" },
  { href: "#experience", id: "experience", label: "Experience" },
  { href: "#activity", id: "activity", label: "Activity" },
  { href: "#highlights", id: "highlights", label: "Highlights" },
  { href: "#projects", id: "projects", label: "Project" },
] as const;

export function SiteChrome() {
  const active = useScrollSpy(LINKS.map((link) => link.id));
  const headerHidden = useHideOnScroll();
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const y = window.scrollY;
    const body = document.body;
    body.classList.add("menu-open");
    body.style.position = "fixed";
    body.style.top = `-${y}px`;
    body.style.left = "0";
    body.style.right = "0";
    body.style.width = "100%";
    return () => {
      body.classList.remove("menu-open");
      body.style.position = "";
      body.style.top = "";
      body.style.left = "";
      body.style.right = "";
      body.style.width = "";
      window.scrollTo(0, y);
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  const menu = (
    <div className="mobile-menu" aria-hidden={!menuOpen}>
      {LINKS.map((link) => (
        <a key={link.id} href={link.href} className="mobile-menu-link" onClick={closeMenu}>
          {link.label}
        </a>
      ))}
      <div className="mobile-menu-bottom">
        <a href="/leehyeon-resume.pdf" target="_blank" rel="noopener" className="mobile-menu-link">
          Resume
        </a>
        <a href="https://linkedin.com/in/shinleehyeon" target="_blank" rel="noopener" className="mobile-menu-link">
          LinkedIn
        </a>
        <a href="#" className="mobile-menu-link" id="mobileMenuCopyEmail">
          Contact
        </a>
      </div>
    </div>
  );

  return (
    <>
      <TopNav active={active} />

      <header
        className="mobile-header"
        style={{ transform: menuOpen || !headerHidden ? "translateY(0)" : "translateY(-100%)" }}
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

      {mounted ? createPortal(menu, document.body) : menu}
    </>
  );
}
