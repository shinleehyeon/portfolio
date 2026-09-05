const LINKS = [
  { href: "#hero", id: "hero", label: "Hero" },
  { href: "#about", id: "about", label: "About" },
  { href: "#experience", id: "experience", label: "Experience" },
  { href: "#highlights", id: "highlights", label: "Highlights" },
  { href: "#projects", id: "projects", label: "Projects" },
] as const;

export function TopNav({ active }: { active: string }) {
  return (
    <nav className="top-nav" aria-label="Primary">
      <div className="top-nav__pill">
        <a className="top-nav__avatar" href="#about" aria-label="About">
          <img src="/images/about-hero.png" alt="" width="40" height="40" />
        </a>
        <div className="top-nav__links">
          {LINKS.map((link) => (
            <a
              key={link.id}
              href={link.href}
              className={`top-nav__link${active === link.id ? " active" : ""}`}
              data-section={link.id}
            >
              {link.label}
            </a>
          ))}
          <a href="#" className="top-nav__cta" id="sidebarCopyEmail">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M22 4H2V20H22V4ZM20 8L12 13L4 8V6L12 11L20 6V8Z" fill="currentColor" />
            </svg>
            Email
          </a>
        </div>
      </div>
    </nav>
  );
}
