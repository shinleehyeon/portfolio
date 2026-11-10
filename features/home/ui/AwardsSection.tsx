"use client";

import { useRef, useState } from "react";

type Award = {
  org: string;
  date: string;
  icon: string;
  iconPad?: boolean;
  title: string;
  award: string;
  project: string;
  href: string;
  image: string;
  gradient: string;
};

const HOVER_EDGE_PAD = 8;
const HOVER_MAX_ROTATE = 3;
const HOVER_ROTATE_FACTOR = 0.3;
const HOVER_HIDE_OFFSET = 10;
const HOVER_SHOW_SCALE = 0.92;
const HOVER_HIDE_SCALE = 0.96;

const AWARDS: Award[] = [
  {
    org: "SBA 서울경제진흥원",
    date: "2026.11",
    icon: "/images/logo-sesac.png",
    title: "SESAC 해커톤",
    award: "서울경제진흥원 대표이사 장려상",
    project: "청춘패치",
    href: "",
    image: "/images/awards/sesac-hackathon.jpg",
    gradient: "linear-gradient(135deg, #3CB44A 0%, #1F8A4C 100%)",
  },
  {
    org: "당근마켓",
    date: "2025.09",
    icon: "/images/logo-daangn-pin.png",
    title: "Daangn Builder's Camp 해커톤",
    award: "우승 (1등)",
    project: "우리동네 청사진",
    href: "",
    image: "/images/awards/daangn-first.jpg",
    gradient: "linear-gradient(135deg, #FF8A3D 0%, #FF5C4D 100%)",
  },
  {
    org: "과학기술정보통신부",
    date: "2024.12",
    icon: "/images/logo-korea-gov.png",
    title: "SW 동행 해커톤",
    award: "창의재단이사장상 (2등)",
    project: "Fresio",
    href: "/case-studies/fresio",
    image: "/images/awards/donghaeng-award.jpg",
    gradient: "linear-gradient(135deg, #4DD9C0 0%, #2E8FA8 100%)",
  },
  {
    org: "SK 플래닛",
    date: "2024",
    icon: "/images/logo-sk-wing.png?v=2",
    iconPad: true,
    title: "STA+C",
    award: "가작상",
    project: "SaveQuest",
    href: "/case-studies/savequest",
    image: "/images/work-savequest.jpg",
    gradient: "linear-gradient(135deg, #FF8A3D 0%, #F2C14E 100%)",
  },
  {
    org: "SK 플래닛",
    date: "2025.02",
    icon: "/images/logo-sk-wing.png?v=2",
    iconPad: true,
    title: "AppJam 미래산업 부문",
    award: "최우수상 (1등)",
    project: "Speakit",
    href: "",
    image: "/images/awards/appjam-grand.jpg",
    gradient: "linear-gradient(135deg, #7B5CFF 0%, #FF5CA8 100%)",
  },
  {
    org: "USLASH",
    date: "2025.07",
    icon: "/images/logo-uslash.png",
    title: "U/THON",
    award: "우수상 (2등)",
    project: "Fusion M",
    href: "",
    image: "/images/awards/uthon-excellence.jpg",
    gradient: "linear-gradient(135deg, #FFC93D 0%, #FF7A3D 100%)",
  },
  {
    org: "선린인터넷고등학교",
    date: "2025.07",
    icon: "/images/logo-sunrin-emblem.png",
    title: "제 11회 선린 해커톤",
    award: "은상 (2등)",
    project: "십시일반",
    href: "/case-studies/sipsiilban",
    image: "/images/awards/sunrin-11-silver.jpg",
    gradient: "linear-gradient(135deg, #6E8CFF 0%, #3E5CB1 100%)",
  },
  {
    org: "선린인터넷고등학교",
    date: "2025.11",
    icon: "/images/logo-sunrin-emblem.png",
    title: "디지털 콘텐츠 개발 대회 생활 부문",
    award: "금상 (1등)",
    project: "Scholub",
    href: "/case-studies/scholub",
    image: "/images/work/scholub.jpg",
    gradient: "linear-gradient(135deg, #2B2E63 0%, #3E7CB1 100%)",
  },
  {
    org: "선린인터넷고등학교",
    date: "2026.07",
    icon: "/images/logo-sunrin-emblem.png",
    title: "제 12회 선린 해커톤",
    award: "금상 (1등)",
    project: "SLOP",
    href: "/case-studies/slop",
    image: "/images/awards/sunrin-12-gold.jpg",
    gradient: "linear-gradient(135deg, #FF5C8A 0%, #7B3FF2 100%)",
  },
];

function hoverTransform(x: number, y: number, rotate: number, scale: number) {
  return `translate3d(${x}px, ${y}px, 0) rotate(${rotate}deg) scale(${scale})`;
}

function groupAwardsByYear(awards: Award[]) {
  const sorted = [...awards].sort((a, b) => b.date.localeCompare(a.date));
  const groups = new Map<number, Award[]>();
  for (const award of sorted) {
    const year = Number(award.date.slice(0, 4));
    groups.set(year, [...(groups.get(year) ?? []), award]);
  }
  return [...groups.entries()].map(([year, yearAwards]) => ({ year, awards: yearAwards }));
}

function AwardMoments({ items }: { items: Award[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const lastClientX = useRef(0);
  const lastPos = useRef({ x: 0, y: 0 });
  const isShown = useRef(false);
  const [preview, setPreview] = useState<Award | null>(null);
  const groups = groupAwardsByYear(items);

  const show = (award: Award) => {
    isShown.current = false;
    if (previewRef.current) previewRef.current.style.opacity = "0";
    setPreview(award);
  };

  const move = (e: React.MouseEvent) => {
    const container = containerRef.current;
    const panel = previewRef.current;
    if (!container || !panel) return;
    const rect = container.getBoundingClientRect();
    const half = panel.offsetWidth / 2;
    const min = half + HOVER_EDGE_PAD;
    const max = Math.max(min, rect.width - half - HOVER_EDGE_PAD);
    const x = Math.max(min, Math.min(max, e.clientX - rect.left));
    const y = e.clientY - rect.top;
    const dx = e.clientX - lastClientX.current;
    lastClientX.current = e.clientX;
    const rotate = Math.max(-HOVER_MAX_ROTATE, Math.min(HOVER_MAX_ROTATE, dx * HOVER_ROTATE_FACTOR));
    lastPos.current = { x, y };

    if (!isShown.current) {
      panel.style.transition = "none";
      panel.style.transform = hoverTransform(x, y + HOVER_HIDE_OFFSET, 0, HOVER_SHOW_SCALE);
      void panel.offsetWidth;
      panel.style.transition = "";
      isShown.current = true;
      panel.style.opacity = "1";
    }
    panel.style.transform = hoverTransform(x, y, rotate, 1);
  };

  const hide = () => {
    const panel = previewRef.current;
    if (!panel) return;
    isShown.current = false;
    panel.style.opacity = "0";
    panel.style.transform = hoverTransform(lastPos.current.x, lastPos.current.y + HOVER_HIDE_OFFSET, 0, HOVER_HIDE_SCALE);
  };

  return (
    <div className="awards-list" ref={containerRef} onMouseLeave={hide}>
      {groups.map((group) => (
        <div className="awards-year reveal-scroll" key={group.year}>
          <span className="awards-year__label">{group.year}</span>
          <div className="awards-year__items">
            {group.awards.map((award) => {
              const rowProps = {
                className: "awards-item",
                onMouseEnter: () => show(award),
                onMouseMove: move,
                onMouseLeave: hide,
              };
              const rowContent = (
                <>
                  <span className="awards-item__mark" aria-hidden>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={award.icon}
                      alt=""
                      className={award.iconPad ? "awards-item__icon awards-item__icon--pad" : "awards-item__icon"}
                      width="40"
                      height="40"
                    />
                  </span>
                  <span className="awards-item__copy">
                    <span className="awards-item__title">{award.title} {award.award}</span>
                    <span className="awards-item__org">{award.org}</span>
                  </span>
                </>
              );
              return award.href ? (
                <a href={award.href} key={`${award.project}-${award.date}`} {...rowProps}>
                  {rowContent}
                </a>
              ) : (
                <div key={`${award.project}-${award.date}`} {...rowProps}>
                  {rowContent}
                </div>
              );
            })}
          </div>
        </div>
      ))}

      <div className="awards-preview" ref={previewRef} aria-hidden>
        <div className="awards-preview__image-frame" style={{ background: preview?.image ? undefined : preview?.gradient }}>
          {preview?.image && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={preview.image} alt="" className="awards-preview__image" />
          )}
        </div>
        <div className="awards-preview__meta">
          <span className="awards-preview__title">{preview ? `${preview.title} ${preview.award}` : ""}</span>
          <span className="awards-preview__subtext">{preview ? `${preview.org} · ${preview.date.slice(0, 4)}` : ""}</span>
        </div>
      </div>
    </div>
  );
}

export function AwardsSection() {
  return (
    <section id="awards" className="section awards-section" aria-labelledby="awards-title">
      <div className="centered">
        <header className="awards-head">
          <h2 id="awards-title" className="awards-head__headline shiny-hover reveal-scroll">Awards</h2>
        </header>
        <AwardMoments items={AWARDS} />
      </div>
    </section>
  );
}
