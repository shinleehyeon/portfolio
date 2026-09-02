import type { ReactNode } from "react";
import { LangToggle } from "./LangToggle";
import type { Lang } from "@/lib/case-study/types";

const BACK_ICON = (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M18.25 11C18.6642 11 19 11.3358 19 11.75C19 12.1642 18.6642 12.5 18.25 12.5L7.35127 12.5L10.8262 16.2698C11.0913 16.5881 11.0483 17.061 10.7301 17.3261C10.4119 17.5913 9.939 17.5483 9.67383 17.2301L5.17383 12.2301C4.94205 11.952 4.94205 11.548 5.17383 11.2698L9.67383 6.26984C9.939 5.95163 10.4119 5.90864 10.7301 6.17382C11.0483 6.43899 11.0913 6.91191 10.8262 7.23012L7.35129 11L18.25 11Z"
      fill="currentColor"
    />
  </svg>
);

export function CaseStudyChrome({
  lang,
  onLangChange,
  navItems,
  summarize,
  children,
}: {
  lang: Lang;
  onLangChange: (lang: Lang) => void;
  navItems: { id: string; label: string }[];
  summarize: { label: string; paragraphs: [string, string, string] };
  children: ReactNode;
}) {
  return (
    <>
      <header className="mobile-header">
        <a href="/" className="mobile-logo cs-back-mobile reveal-load" data-reveal-delay="60">
          {BACK_ICON} Back
        </a>
        <LangToggle lang={lang} onChange={onLangChange} />
        <nav className="mobile-header__nav">
          {navItems.map((item, idx) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`mobile-header__link${idx === 0 ? " active" : ""} reveal-load`}
              data-reveal-delay={140 + idx * 40}
              data-section={item.id}
            >
              {item.label}
            </a>
          ))}
        </nav>
        <button className="menu-toggle" aria-label="Menu" aria-expanded="false">
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </button>
      </header>

      <div className="mobile-menu" aria-hidden="true">
        <a href="/#hero" className="mobile-menu-link">Hero</a>
        <a href="/#about" className="mobile-menu-link">About</a>
        <a href="/#project" className="mobile-menu-link">Projects</a>
        <a href="/#experience" className="mobile-menu-link">Experience</a>
        <a href="/#highlights" className="mobile-menu-link">Highlights</a>
        <div className="mobile-menu-bottom">
          <a href="https://linkedin.com/in/shinleehyeon" target="_blank" rel="noopener" className="mobile-menu-link">LinkedIn</a>
          <a href="#" className="mobile-menu-link" id="mobileMenuCopyEmail">Email</a>
        </div>
      </div>

      <aside className="sidebar cs-sidebar reveal-load">
        <div className="sidebar-top">
          <a href="/" className="cs-back reveal-load" data-reveal-delay="60">
            {BACK_ICON} Back
          </a>
          <LangToggle lang={lang} onChange={onLangChange} />
          <nav className="sidebar-nav">
            {navItems.map((item, idx) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`nav-link${idx === 0 ? " active" : ""} reveal-load`}
                data-reveal-delay={140 + idx * 40}
                data-section={item.id}
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
        <div className="sidebar-bottom">
          <button className="cs-summarize__btn reveal-load" data-reveal-delay="540" id="summarizeBtn">
            <span className="cs-summarize__text">{summarize.label}</span>
          </button>
        </div>
      </aside>

      <div className="cs-summarize__panel" id="summarizePanel">
        <div className="cs-summarize__panel-inner">
          <button className="cs-summarize__panel-close" id="summarizePanelClose">&times;</button>
          <p>{summarize.paragraphs[0]}</p>
          <p>{summarize.paragraphs[1]}</p>
          <p>{summarize.paragraphs[2]}</p>
        </div>
      </div>

      <main className="content">
        {children}

        <footer className="site-footer">
          <div className="centered">
            <div className="footer__inner">
              <span className="footer__copyright">©<span id="footerYear"></span> <strong>Leehyeon Shin</strong>. All rights reserved.</span>
              <div className="footer__socials">
                <a href="https://github.com/shinleehyeon" target="_blank" rel="noopener" className="footer__social" aria-label="GitHub">
                  <img src="/images/icon-github.svg" alt="" width="20" height="20" />
                </a>
                <a href="https://linkedin.com/in/shinleehyeon" target="_blank" rel="noopener" className="footer__social" aria-label="LinkedIn">
                  <img src="/images/icon-linkedin.svg" alt="" width="20" height="20" />
                </a>
                <a href="https://instagram.com/hyun._.s08" target="_blank" rel="noopener" className="footer__social" aria-label="Instagram">
                  <img src="/images/icon-instagram.svg" alt="" width="20" height="20" />
                </a>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
