"use client";

import { AnimatePresence, motion, type Variants } from "framer-motion";
import { useCallback, useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from "react";
import { CASE_STUDIES, caseStudyPath } from "@/features/case-study/model/registry";

const NAV_LINKS = [
  { href: "#about", id: "about", label: "About" },
  { href: "#experience", id: "experience", label: "Experience" },
  { href: "#highlights", id: "highlights", label: "Highlights" },
  { href: "#projects", id: "projects", label: "Projects" },
] as const;

const RESUME_LINK = { href: "/leehyeon-resume.pdf", id: "resume", label: "Resume" } as const;

const PLAIN_NAV = new Set<string>(["activity"]);

type PreviewKey = "email" | "activity" | "resume" | (typeof NAV_LINKS)[number]["id"] | typeof RESUME_LINK.id;

type PreviewItem = {
  title: string;
  meta: string;
  href: string;
  highlight?: string;
  image?: string;
  external?: boolean;
};

type Preview = {
  description: string;
  more: { label: string; href: string };
  layout: "cards" | "rows" | "paper";
  items: PreviewItem[];
};

const PREVIEWS: Record<PreviewKey, Preview> = {
  about: {
    description: "구조를 먼저 그리고\n그다음 구현합니다",
    more: { label: "소개 보기", href: "#about" },
    layout: "rows",
    items: [
      { title: "구조부터 그린 다음 구현", meta: "설계", href: "#about" },
      { title: "문제를 데이터로 읽기", meta: "검증", href: "#about" },
      { title: "기획부터 인프라까지", meta: "서비스 전반", href: "#about" },
      { title: "사용자 입장에서 정의", meta: "문제 정의", href: "#about" },
    ],
  },
  experience: {
    description: "실무와 교육,\n쌓아 온 시간",
    more: { label: "경력 전체 보기", href: "#experience" },
    layout: "rows",
    items: [
      { title: "Frontend", meta: "Daangn · 2026.01", href: "#experience", image: "/images/logo-daangn-pin.png" },
      { title: "Full-stack", meta: "인피니티텐서 · 2025.08", href: "#experience", image: "/images/logo-infinity-tensor.svg" },
      { title: "소프트웨어과", meta: "선린인터넷고등학교 · 2024", href: "#experience", image: "/images/logo-sunrin.png" },
      { title: "SeSAC", meta: "새싹 · 2026.07", href: "#experience", image: "/images/logo-sesac.png" },
    ],
  },
  activity: {
    description: "해커톤 밖에서\n이어진 기록",
    more: { label: "활동 전체 보기", href: "#activity" },
    layout: "rows",
    items: [
      {
        title: "당근 Builder's Camp 해커톤",
        meta: "당근 공식 블로그 · 2025",
        href: "https://careers.daangn.com/blog/post/%EB%8B%B9%EA%B7%BC-%ED%95%B4%EC%BB%A4%ED%86%A4-%EC%97%94%EC%A7%80%EB%8B%88%EC%96%B4-%EC%B1%84%EC%9A%A9/",
        external: true,
      },
      {
        title: "U/THON 25",
        meta: "무박 2일 해커톤 · 2025",
        href: "https://www.uslash.org/projects/uthon25",
        external: true,
      },
    ],
  },
  highlights: {
    description: "대회에서 받은\n결과",
    more: { label: "수상 전체 보기", href: "#highlights" },
    layout: "rows",
    items: [
      { title: "제 12회 선린 해커톤", meta: "금상 · 2026", href: "#highlights" },
      { title: "Daangn Builder's Camp", meta: "우승 · 2025", href: "#highlights" },
      { title: "디지털 콘텐츠 개발 대회", meta: "금상 · 2025", href: "#highlights" },
      { title: "SW 동행 해커톤", meta: "이사장상 · 2024", href: "/case-studies/fresio" },
    ],
  },
  projects: {
    description: "잘 동작하는 코드를 넘어\n문제를 데이터로 읽기",
    more: { label: "프로젝트 전체 보기", href: "#projects" },
    layout: "cards",
    items: CASE_STUDIES.slice(0, 4).map((entry) => ({
      title: entry.work.title,
      meta: entry.work.caption,
      href: caseStudyPath(entry.slug),
      image: entry.work.image,
    })),
  },
  resume: {
    description: "경력을 한 장에\n정리해 뒀어요",
    more: { label: "이력서 보기", href: "/leehyeon-resume.pdf" },
    layout: "paper",
    items: [
      {
        title: "이력서",
        meta: "신이현",
        href: "/leehyeon-resume.pdf",
        image: "/images/resume-preview.png",
        external: true,
      },
    ],
  },
  email: {
    description: "궁금한 건\n메일로 보내 주세요",
    more: { label: "메일 보내기", href: "mailto:shinlee7878@gmail.com" },
    layout: "rows",
    items: [
      { title: "shinlee7878@gmail.com", meta: "Email", href: "mailto:shinlee7878@gmail.com" },
      { title: "github.com/shinleehyeon", meta: "GitHub", href: "https://github.com/shinleehyeon", external: true },
      { title: "linkedin.com/in/shinleehyeon", meta: "LinkedIn", href: "https://linkedin.com/in/shinleehyeon", external: true },
    ],
  },
};

function useElementHeight<T extends HTMLElement>() {
  const [node, setNodeState] = useState<T | null>(null);
  const [height, setHeight] = useState(0);

  const commit = useCallback((next: number) => {
    const rounded = Math.round(next);
    if (rounded <= 0) return;
    setHeight((current) => (current === rounded ? current : rounded));
  }, []);

  const setNode = useCallback((next: T | null) => {
    setNodeState(next);
    if (!next) {
      setHeight(0);
      return;
    }
    commit(next.getBoundingClientRect().height);
  }, [commit]);

  useLayoutEffect(() => {
    if (!node) return;
    const measure = () => commit(node.getBoundingClientRect().height);
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(node);
    return () => observer.disconnect();
  }, [node, commit]);

  return [setNode, height] as const;
}
const LANDING_EASE = [0.16, 1, 0.3, 1] as const;
const LIQUID_JOIN = 19;
const CLOSE_DELAY = 150;
const MOVE = { duration: 0.5, ease: LANDING_EASE };
const REVEAL = { duration: 0.45, ease: LANDING_EASE };
const CLIP_OPEN = "inset(0% 0% 0% 0%)";
const CLIP_CLOSED = "inset(0% 0% 100% 0%)";
const SHIFT = 48;
const PREVIEW_ORDER: PreviewKey[] = ["projects", "about", "experience", "activity", "highlights", "resume", "email"];

const slideVariants: Variants = {
  enter: (direction: number) => ({ opacity: 0, x: direction * SHIFT }),
  center: { opacity: 1, x: 0 },
  exit: (direction: number) => ({ opacity: 0, x: direction * -SHIFT }),
};

function RollText({ text, active }: { text: string; active?: boolean }) {
  return (
    <span className={`top-nav__roll${active ? " is-active" : ""}`} aria-hidden>
      {[...text].map((char, index) => (
        <span key={index} className="top-nav__cube" style={{ "--i": index } as CSSProperties}>
          <span className="top-nav__face top-nav__face--front">{char}</span>
          <span className="top-nav__face top-nav__face--bottom">{char}</span>
        </span>
      ))}
    </span>
  );
}

export function TopNav({ active }: { active: string }) {
  const headerRef = useRef<HTMLElement>(null);
  const [setMeasure, panelHeight] = useElementHeight<HTMLDivElement>();
  const heightInstant = useRef(true);
  const closeTimer = useRef<number | undefined>(undefined);
  const [openKey, setOpenKey] = useState<PreviewKey | null>(null);
  const [rect, setRect] = useState<{ x: number; y: number; w: number; h: number } | null>(null);
  const [tracked, setTracked] = useState({ key: openKey, direction: 0 });

  if (tracked.key !== openKey) {
    const from = tracked.key ? PREVIEW_ORDER.indexOf(tracked.key) : -1;
    const to = openKey ? PREVIEW_ORDER.indexOf(openKey) : -1;
    const direction = from < 0 || to < 0 ? 0 : Math.sign(to - from);
    setTracked({ key: openKey, direction });
  }

  useEffect(() => () => window.clearTimeout(closeTimer.current), []);

  useEffect(() => {
    const urls = PREVIEWS.projects.items.slice(0, 3).map((item) => item.image).filter((src): src is string => !!src);
    for (const src of urls) {
      const image = new Image();
      image.src = src;
      image.decode?.().catch(() => undefined);
    }
  }, []);

  useEffect(() => {
    if (!openKey) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpenKey(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openKey]);

  const cancelClose = () => window.clearTimeout(closeTimer.current);

  const scheduleClose = () => {
    cancelClose();
    closeTimer.current = window.setTimeout(() => setOpenKey(null), CLOSE_DELAY);
  };

  const openPreview = (key: PreviewKey, currentTarget: HTMLElement) => {
    if (!window.matchMedia("(hover: hover) and (min-width: 1000px)").matches) return;
    cancelClose();
    const header = headerRef.current;
    if (!header) return;
    const link = currentTarget.getBoundingClientRect();
    const bounds = header.getBoundingClientRect();
    setRect({
      x: link.left - bounds.left,
      y: link.top - bounds.top,
      w: link.width,
      h: link.height,
    });
    setOpenKey(key);
  };

  const showPanel = !!openKey && !PLAIN_NAV.has(openKey);
  const preview = showPanel && openKey ? PREVIEWS[openKey] : null;
  const snapHeight = panelHeight > 0 && heightInstant.current;
  if (panelHeight > 0) heightInstant.current = false;

  useEffect(() => {
    if (!showPanel) heightInstant.current = true;
  }, [showPanel]);

  return (
    <nav
      className={`top-nav${preview ? " is-open" : ""}`}
      aria-label="Primary"
      onMouseLeave={scheduleClose}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setOpenKey(null);
      }}
    >
      {preview ? <button type="button" className="top-nav__backdrop" aria-label="미리보기 닫기" onMouseEnter={scheduleClose} onClick={() => setOpenKey(null)} /> : null}
      <div className="top-nav__cluster">
      <svg className="top-nav__goo" width="0" height="0" aria-hidden>
        <filter id="nav-goo" x="-20%" y="-20%" width="140%" height="140%" colorInterpolationFilters="sRGB">
          <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur" />
          <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 28 -14" result="goo" />
          <feComposite in="SourceGraphic" in2="goo" operator="atop" />
        </filter>
      </svg>
      <AnimatePresence>
        {preview ? (
          <motion.div
            key="liquid"
            className="top-nav__liquid-clip"
            aria-hidden
            style={{ height: panelHeight > 0 ? panelHeight + 56 + LIQUID_JOIN : 56 }}
            initial={{ clipPath: CLIP_CLOSED }}
            animate={{ clipPath: CLIP_OPEN }}
            exit={{ clipPath: CLIP_CLOSED }}
            transition={{ duration: 0.7, ease: LANDING_EASE }}
          >
            <div className="top-nav__liquid">
              <div className="top-nav__liquid-bar" />
              <div className="top-nav__liquid-card" style={{ height: panelHeight > 0 ? panelHeight + LIQUID_JOIN : 0 }} />
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
      <div className="top-nav__bar" ref={headerRef}>
        <AnimatePresence>
          {rect && openKey ? (
            <motion.span
              className="top-nav__indicator"
              initial={{ x: rect.x, y: rect.y, width: rect.w, height: rect.h, scaleY: 0, originY: 1 }}
              animate={{ x: rect.x, y: rect.y, width: rect.w, height: rect.h, scaleY: 1, originY: 1 }}
              exit={{ scaleY: 0, originY: 0, transition: { scaleY: REVEAL, originY: { duration: 0 } } }}
              transition={{ x: MOVE, y: MOVE, width: MOVE, height: MOVE, scaleY: REVEAL }}
              aria-hidden
            />
          ) : null}
        </AnimatePresence>
        <div className="top-nav__nav">
          {NAV_LINKS.map((link) => (
            <a
              key={link.id}
              href={link.href}
              className={`top-nav__link${active === link.id ? " active" : ""}${openKey === link.id ? " is-preview" : ""}`}
              data-section={link.id}
              onMouseEnter={(event) => openPreview(link.id, event.currentTarget)}
              onFocus={(event) => openPreview(link.id, event.currentTarget)}
            >
              <span className="top-nav__sr">{link.label}</span>
              <RollText text={link.label} active={openKey === link.id} />
            </a>
          ))}
        </div>
        <a
          href={RESUME_LINK.href}
          className={`top-nav__link${active === RESUME_LINK.id ? " active" : ""}${openKey === RESUME_LINK.id ? " is-preview" : ""}`}
          data-section={RESUME_LINK.id}
          target="_blank"
          rel="noopener"
          onMouseEnter={(event) => openPreview(RESUME_LINK.id, event.currentTarget)}
          onFocus={(event) => openPreview(RESUME_LINK.id, event.currentTarget)}
        >
          <span className="top-nav__sr">{RESUME_LINK.label}</span>
          <RollText text={RESUME_LINK.label} active={openKey === RESUME_LINK.id} />
        </a>
        <a
          href="#"
          className={`top-nav__link top-nav__contact${openKey === "email" ? " is-preview" : ""}`}
          id="sidebarCopyEmail"
          onMouseEnter={(event) => openPreview("email", event.currentTarget)}
          onFocus={(event) => openPreview("email", event.currentTarget)}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.8" />
            <path d="M4 7l8 6 8-6" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
          </svg>
          <span className="top-nav__sr">Contact</span>
          <RollText text="Contact" active={openKey === "email"} />
        </a>
      </div>
      <AnimatePresence>
        {preview && openKey ? (
          <motion.div
            key="panel"
            className="top-nav__panel"
            onMouseEnter={cancelClose}
            onMouseLeave={scheduleClose}
            initial={{ clipPath: CLIP_CLOSED }}
            animate={{ clipPath: CLIP_OPEN }}
            exit={{ clipPath: CLIP_CLOSED }}
            transition={{ duration: 0.7, ease: LANDING_EASE }}
          >
            <motion.div
              className="top-nav__panel-size"
              initial={false}
              animate={panelHeight > 0 ? { height: panelHeight } : undefined}
              transition={{ duration: snapHeight ? 0 : 0.7, ease: LANDING_EASE }}
            >
            <div ref={setMeasure} className="top-nav__measure">
            <AnimatePresence mode="popLayout" initial={false} custom={tracked.direction}>
              <motion.div
                key={openKey}
                className="top-nav__preview"
                custom={tracked.direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.45, ease: LANDING_EASE }}
              >
                <div className="top-nav__aside">
                  <p className="top-nav__desc">
                    {preview.description.split("\n").map((line, index) => (
                      <span className="top-nav__line-mask" key={line}>
                        <motion.span
                          className="top-nav__line"
                          initial={{ y: "110%" }}
                          animate={{ y: "0%" }}
                          transition={{ duration: 0.8, ease: LANDING_EASE, delay: 0.05 + index * 0.07 }}
                        >
                          {line}
                        </motion.span>
                      </span>
                    ))}
                  </p>
                  <a className="top-nav__more" href={preview.more.href} data-roll-trigger {...(openKey === "resume" ? { target: "_blank", rel: "noopener" } : {})}>
                    <span className="top-nav__sr">{preview.more.label}</span>
                    <RollText text={preview.more.label} />
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </a>
                </div>
                <div className={preview.layout === "cards" ? "top-nav__cards" : preview.layout === "paper" ? "top-nav__paper-stage" : "top-nav__rows"}>
                  {preview.layout === "paper" ? (
                    <motion.div
                      className="top-nav__paper"
                      initial={{ opacity: 0, y: 96 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.9, ease: LANDING_EASE, delay: 0.12 }}
                    >
                      <a className="top-nav__paper-link" href={preview.items[0].href} target="_blank" rel="noopener" aria-label={preview.items[0].title}>
                        <img src={preview.items[0].image} alt="" />
                      </a>
                    </motion.div>
                  ) : preview.layout === "cards" ? (
                    <>
                      {preview.items.slice(0, 3).map((item, index) => (
                        <motion.a
                          key={item.title}
                          className="top-nav__card"
                          href={item.href}
                          initial={{ opacity: 0, y: 24 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.7, ease: LANDING_EASE, delay: 0.12 + index * 0.06 }}
                        >
                          <span className="top-nav__card-media">
                            <motion.span
                              className="top-nav__card-reveal"
                              initial={{ y: "100%" }}
                              animate={{ y: "0%" }}
                              transition={{ duration: 0.9, ease: LANDING_EASE, delay: 0.12 + index * 0.06 }}
                            >
                            <img src={item.image} alt="" decoding="async" />
                            <span className="top-nav__card-arrow" aria-hidden="true">
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                <path d="M7 17 17 7M9 7h8v8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            </span>
                            </motion.span>
                          </span>
                          <span className="top-nav__item-copy">
                            <span className="top-nav__item-title">{item.title}</span>
                            <span className="top-nav__item-meta">{item.meta}</span>
                          </span>
                        </motion.a>
                      ))}
                      <motion.a
                        className="top-nav__card top-nav__card--more"
                        href={preview.more.href}
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, ease: LANDING_EASE, delay: 0.12 + 3 * 0.06 }}
                      >
                        <span className="top-nav__card-media">
                          <motion.span
                            className="top-nav__card-reveal"
                            initial={{ y: "100%" }}
                            animate={{ y: "0%" }}
                            transition={{ duration: 0.9, ease: LANDING_EASE, delay: 0.3 }}
                          >
                          <span className="top-nav__card-highlight">전체 보기</span>
                          <span className="top-nav__card-arrow" aria-hidden="true">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                              <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </span>
                          </motion.span>
                        </span>
                      </motion.a>
                    </>
                  ) : preview.items.map((item, index) => (
                    <motion.a
                      key={item.title}
                      className="top-nav__row"
                      href={item.href}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.7, ease: LANDING_EASE, delay: 0.12 + index * 0.06 }}
                      {...(item.external ? { target: "_blank", rel: "noopener" } : {})}
                    >
                      {item.image ? (
                        <span className="top-nav__row-logo">
                          <img src={item.image} alt="" />
                        </span>
                      ) : null}
                      <span className="top-nav__item-copy">
                        <span className="top-nav__item-title">{item.title}</span>
                        <span className="top-nav__item-meta">{item.meta}</span>
                      </span>
                      <svg className="top-nav__row-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <path d="M7 17 17 7M9 7h8v8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
            </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
      </div>
    </nav>
  );
}
