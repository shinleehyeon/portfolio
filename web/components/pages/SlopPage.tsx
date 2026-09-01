"use client";

import { useEffect, useRef, useState } from "react";
import { SLOP_COPY, type SlopLang } from "@/lib/slop-copy";

const RATES = [0.5, 0.75, 1] as const;

function formatTime(sec: number) {
  if (!Number.isFinite(sec) || sec < 0) return "0:00";
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

function readDuration(v: HTMLVideoElement) {
  const d = v.duration;
  if (Number.isFinite(d) && d > 0) return d;
  if (v.seekable.length > 0) {
    const end = v.seekable.end(v.seekable.length - 1);
    if (Number.isFinite(end) && end > 0) return end;
  }
  return 0;
}

function SlopDemo({ hint }: { hint: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [rate, setRate] = useState(0.75);

  useEffect(() => {
    const v = videoRef.current;
    if (v) v.playbackRate = rate;
  }, [rate]);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    const sync = () => {
      const d = readDuration(v);
      if (d) setDuration(d);
      setTime(v.currentTime);
    };

    sync();
    v.addEventListener("loadedmetadata", sync);
    v.addEventListener("durationchange", sync);
    v.addEventListener("loadeddata", sync);
    return () => {
      v.removeEventListener("loadedmetadata", sync);
      v.removeEventListener("durationchange", sync);
      v.removeEventListener("loadeddata", sync);
    };
  }, []);

  const toggle = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) v.play();
    else v.pause();
  };

  const seek = (value: number) => {
    const v = videoRef.current;
    if (!v) return;
    const d = duration || readDuration(v);
    const next = Math.min(Math.max(0, value), d || value);
    v.currentTime = next;
    setTime(next);
  };

  return (
    <div className="cs-demo">
      <div className="cs-demo__stage">
        <video
          ref={videoRef}
          className="cs-demo__video"
          poster="/images/slop/slop.jpg"
          playsInline
          preload="auto"
          onClick={toggle}
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          onTimeUpdate={(e) => {
            const v = e.currentTarget;
            const d = readDuration(v);
            if (d && d !== duration) setDuration(d);
            setTime(v.currentTime);
          }}
        >
          <source src="/images/slop/demo.mp4" type="video/mp4" />
        </video>
      </div>
      <div className="cs-demo__bar">
        <button type="button" className="cs-demo__play" onClick={toggle} aria-label={playing ? "Pause" : "Play"}>
          {playing ? (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="#002E71">
              <rect x="6" y="5" width="4" height="14" rx="1" />
              <rect x="14" y="5" width="4" height="14" rx="1" />
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="#002E71">
              <path d="M8 5.5v13l11-6.5L8 5.5Z" />
            </svg>
          )}
        </button>
        <span className="cs-demo__time">{formatTime(time)}</span>
        <input
          className="cs-demo__seek"
          type="range"
          min={0}
          max={duration || 0}
          step={0.1}
          value={Math.min(time, duration || 0)}
          onChange={(e) => seek(Number(e.target.value))}
          aria-label="Seek"
        />
        <span className="cs-demo__time">{formatTime(duration)}</span>
        <div className="cs-demo__rates">
          {RATES.map((r) => (
            <button
              key={r}
              type="button"
              className={`cs-demo__rate${rate === r ? " is-active" : ""}`}
              onClick={() => setRate(r)}
            >
              {r}×
            </button>
          ))}
        </div>
      </div>
      <p className="cs-demo__hint">{hint}</p>
    </div>
  );
}

function LangToggle({ lang, onChange }: { lang: SlopLang; onChange: (lang: SlopLang) => void }) {
  return (
    <div className="cs-lang" role="group" aria-label="Language">
      <button type="button" className={`cs-lang__btn${lang === "en" ? " is-active" : ""}`} onClick={() => onChange("en")}>EN</button>
      <button type="button" className={`cs-lang__btn${lang === "ko" ? " is-active" : ""}`} onClick={() => onChange("ko")}>KR</button>
    </div>
  );
}

export function SlopPage() {
  const [lang, setLang] = useState<SlopLang>("ko");
  const t = SLOP_COPY[lang];

  return (
    <>
        <header className="mobile-header">
          <a href="/" className="mobile-logo cs-back-mobile reveal-load" data-reveal-delay="60"><svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path fillRule="evenodd" clipRule="evenodd" d="M18.25 11C18.6642 11 19 11.3358 19 11.75C19 12.1642 18.6642 12.5 18.25 12.5L7.35127 12.5L10.8262 16.2698C11.0913 16.5881 11.0483 17.061 10.7301 17.3261C10.4119 17.5913 9.939 17.5483 9.67383 17.2301L5.17383 12.2301C4.94205 11.952 4.94205 11.548 5.17383 11.2698L9.67383 6.26984C9.939 5.95163 10.4119 5.90864 10.7301 6.17382C11.0483 6.43899 11.0913 6.91191 10.8262 7.23012L7.35129 11L18.25 11Z" fill="currentColor" /></svg> Back</a>
          <LangToggle lang={lang} onChange={setLang} />
          <nav className="mobile-header__nav">
            <a href="#overview" className="mobile-header__link active reveal-load" data-reveal-delay="140" data-section="overview">{t.navOverview}</a>
            <a href="#focus" className="mobile-header__link reveal-load" data-reveal-delay="180" data-section="focus">{t.navFocus}</a>
            <a href="#pipeline" className="mobile-header__link reveal-load" data-reveal-delay="220" data-section="pipeline">{t.navPipeline}</a>
            <a href="#system" className="mobile-header__link reveal-load" data-reveal-delay="260" data-section="system">{t.navSystem}</a>
            <a href="#product" className="mobile-header__link reveal-load" data-reveal-delay="300" data-section="product">{t.navProduct}</a>
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
            <a href="/" className="cs-back reveal-load" data-reveal-delay="60"><svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path fillRule="evenodd" clipRule="evenodd" d="M18.25 11C18.6642 11 19 11.3358 19 11.75C19 12.1642 18.6642 12.5 18.25 12.5L7.35127 12.5L10.8262 16.2698C11.0913 16.5881 11.0483 17.061 10.7301 17.3261C10.4119 17.5913 9.939 17.5483 9.67383 17.2301L5.17383 12.2301C4.94205 11.952 4.94205 11.548 5.17383 11.2698L9.67383 6.26984C9.939 5.95163 10.4119 5.90864 10.7301 6.17382C11.0483 6.43899 11.0913 6.91191 10.8262 7.23012L7.35129 11L18.25 11Z" fill="currentColor" /></svg> Back</a>
            <LangToggle lang={lang} onChange={setLang} />
            <nav className="sidebar-nav">
              <a href="#overview" className="nav-link active reveal-load" data-reveal-delay="140" data-section="overview">{t.navOverview}</a>
              <a href="#focus" className="nav-link reveal-load" data-reveal-delay="180" data-section="focus">{t.navFocus}</a>
              <a href="#pipeline" className="nav-link reveal-load" data-reveal-delay="220" data-section="pipeline">{t.navPipeline}</a>
              <a href="#system" className="nav-link reveal-load" data-reveal-delay="260" data-section="system">{t.navSystem}</a>
              <a href="#product" className="nav-link reveal-load" data-reveal-delay="300" data-section="product">{t.navProduct}</a>
            </nav>
          </div>
          <div className="sidebar-bottom">
            <button className="cs-summarize__btn reveal-load" data-reveal-delay="540" id="summarizeBtn">
              <span className="cs-summarize__text">{t.summarize}</span>
            </button>
          </div>
        </aside>

        <div className="cs-summarize__panel" id="summarizePanel">
          <div className="cs-summarize__panel-inner">
            <button className="cs-summarize__panel-close" id="summarizePanelClose">&times;</button>
            <p>{t.sum1}</p>
            <p>{t.sum2}</p>
            <p>{t.sum3}</p>
          </div>
        </div>

        <main className="content">

          <section id="overview" className="section cs-hero">
            <div className="centered">
              <h1 className="cs-hero__title cs-hero__title--logo reveal-load" data-reveal-delay="100">
                SLOP
                <span className="cs-hero__year-badge">2025</span>
              </h1>

              <div className="cs-hero__intro reveal-load" data-reveal-delay="200">
                <p>{t.intro}</p>
              </div>

              <div className="cs-hero__contributions">
                <span className="cs-hero__tag reveal-load" data-reveal-delay="300" data-tip={t.tagFeTip}>{t.tagFe}</span>
                <span className="cs-hero__tag reveal-load" data-reveal-delay="360" data-tip={t.tagExtTip}>{t.tagExt}</span>
                <span className="cs-hero__tag reveal-load" data-reveal-delay="420" data-tip={t.tagPipeTip}>{t.tagPipe}</span>
                <span className="cs-hero__tag reveal-load" data-reveal-delay="480" data-tip={t.tagGoldTip}>{t.tagGold}</span>
              </div>
            </div>
          </section>

          <section className="cs-image cs-image--wide">
            <div className="centered">
              <div className="cs-image__wrap reveal-load" data-reveal-delay="300">
                <img src="/images/slop/slop.jpg" alt="SLOP" loading="lazy" />
              </div>
            </div>
          </section>

          <section id="focus" className="cs-section">
            <div className="centered">
              <h2 className="cs-heading shiny-hover">{t.focus}</h2>
              <div className="cs-body">
                <p>{t.focus1}</p>
                <p>{t.focus2}</p>
                <p>{t.focus3}</p>
              </div>
              <div className="cs-focus-list">
                <div className="cs-focus-item">
                  <h3 className="cs-focus-item__title">{t.f1t}</h3>
                  <p className="cs-focus-item__desc">{t.f1d}</p>
                </div>
                <div className="cs-focus-item">
                  <h3 className="cs-focus-item__title">{t.f2t}</h3>
                  <p className="cs-focus-item__desc">{t.f2d}</p>
                </div>
                <div className="cs-focus-item">
                  <h3 className="cs-focus-item__title">{t.f3t}</h3>
                  <p className="cs-focus-item__desc">{t.f3d}</p>
                </div>
                <div className="cs-focus-item">
                  <h3 className="cs-focus-item__title">{t.f4t}</h3>
                  <p className="cs-focus-item__desc">{t.f4d}</p>
                </div>
              </div>
            </div>
          </section>

          <section className="cs-section">
            <div className="centered">
              <h2 className="cs-heading shiny-hover">{t.scope}</h2>
              <div className="cs-body">
                <p>{t.scopeP}</p>
              </div>
              <div className="cs-focus-list cs-focus-list--outline" style={{marginTop: "24px"}}>
                <div className="cs-focus-item">
                  <h3 className="cs-focus-item__title">{t.s1t}</h3>
                  <ul className="cs-list">{t.s1.map((item) => <li key={item}>{item}</li>)}</ul>
                </div>
                <div className="cs-focus-item">
                  <h3 className="cs-focus-item__title">{t.s2t}</h3>
                  <ul className="cs-list">{t.s2.map((item) => <li key={item}>{item}</li>)}</ul>
                </div>
                <div className="cs-focus-item">
                  <h3 className="cs-focus-item__title">{t.s3t}</h3>
                  <ul className="cs-list">{t.s3.map((item) => <li key={item}>{item}</li>)}</ul>
                </div>
                <div className="cs-focus-item">
                  <h3 className="cs-focus-item__title">{t.s4t}</h3>
                  <ul className="cs-list">{t.s4.map((item) => <li key={item}>{item}</li>)}</ul>
                </div>
              </div>
            </div>
          </section>

          <section id="pipeline" className="cs-section">
            <div className="centered">
              <h2 className="cs-heading shiny-hover">{t.pipe}</h2>
              <div className="cs-body">
                <p>{t.pipe1}</p>
                <p>{t.pipe2}</p>
              </div>
            </div>
          </section>

          <section className="cs-image cs-image--wide">
            <div className="centered">
              <div className="cs-diagram cs-tree" id="slopPipelineTree"></div>
            </div>
          </section>

          <section id="system" className="cs-section">
            <div className="centered">
              <h2 className="cs-heading shiny-hover">{t.system}</h2>
              <div className="cs-body">
                <p>{t.sys1}</p>
                <p>{t.sys2}</p>
              </div>
            </div>
          </section>

          <section className="cs-image cs-image--wide">
            <div className="centered">
              <div className="cs-diagram cs-tree" id="slopSystemTree"></div>
            </div>
          </section>

          <section id="product" className="cs-section">
            <div className="centered">
              <h2 className="cs-heading shiny-hover">{t.product}</h2>
              <div className="cs-body">
                <span className="cs-label">{t.p1l}</span>
                <p>{t.p1}</p>
                <span className="cs-label">{t.p2l}</span>
                <p>{t.p2}</p>
                <span className="cs-label">{t.p3l}</span>
                <p>{t.p3}</p>
              </div>
            </div>
          </section>

          <section className="cs-section">
            <div className="centered">
              <h2 className="cs-heading shiny-hover">{t.demo}</h2>
              <div className="cs-body">
                <p>{t.demoHint}</p>
              </div>
            </div>
          </section>

          <section className="cs-image cs-image--gallery">
            <div className="centered">
              <SlopDemo hint={t.demoHint} />
            </div>
          </section>

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
