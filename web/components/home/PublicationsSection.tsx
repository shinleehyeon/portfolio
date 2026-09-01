"use client";

import { useRef, useState } from "react";

type Award = (typeof AWARDS)[number];

const HOVER_EDGE_PAD = 8;
const HOVER_MAX_ROTATE = 3;
const HOVER_ROTATE_FACTOR = 0.3;
const HOVER_HIDE_OFFSET = 10;
const HOVER_SHOW_SCALE = 0.92;
const HOVER_HIDE_SCALE = 0.96;

function hoverTransform(x: number, y: number, rotate: number, scale: number) {
  return `translate3d(${x}px, ${y}px, 0) rotate(${rotate}deg) scale(${scale})`;
}

function AwardHoverGroup({ items }: { items: Award[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const lastClientX = useRef(0);
  const lastPos = useRef({ x: 0, y: 0 });
  const isShown = useRef(false);
  const [preview, setPreview] = useState<Award | null>(null);

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
    <div className="award-list reveal-scroll" ref={containerRef} onMouseLeave={hide}>
      {items.map((award) => {
        const rowProps = {
          className: "award-row",
          onMouseEnter: () => show(award),
          onMouseMove: move,
          onMouseLeave: hide,
        };
        const rowContent = (
          <div className="award-row__text">
            <span className="award-row__title">{award.title} {award.award}</span>
            <span className="award-row__meta">{award.org} - {award.date}</span>
          </div>
        );
        return award.href ? (
          <a href={award.href} key={award.title} {...rowProps}>
            {rowContent}
          </a>
        ) : (
          <div key={award.title} {...rowProps}>
            {rowContent}
          </div>
        );
      })}

      <div className="award-preview" ref={previewRef} aria-hidden>
        <div className="award-preview__image-frame" style={{ background: preview?.image ? undefined : preview?.gradient }}>
          {preview?.image && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={preview.image} alt="" className="award-preview__image" />
          )}
        </div>
        <div className="award-preview__meta">
          <span className="award-preview__title">{preview ? `${preview.project} · ${preview.title} ${preview.award}` : ""}</span>
          <span className="award-preview__subtext">{preview ? `${preview.org} · ${preview.date}` : ""}</span>
        </div>
      </div>
    </div>
  );
}

function NewspaperIcon() {
  return (
    <svg className="activity-item__icon" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M15 18h-5" />
      <path d="M18 14h-8" />
      <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-4 0v-9a2 2 0 0 1 2-2h2" />
      <rect width="8" height="4" x="10" y="6" rx="1" />
    </svg>
  );
}

function GraduationCapIcon() {
  return (
    <svg className="activity-item__icon" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z" />
      <path d="M22 10v6" />
      <path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5" />
    </svg>
  );
}

function YoutubeIcon() {
  return (
    <svg className="activity-item__icon" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
      <path d="m10 15 5-3-5-3z" />
    </svg>
  );
}

const ACTIVITY_ICONS = {
  newspaper: NewspaperIcon,
  "graduation-cap": GraduationCapIcon,
  youtube: YoutubeIcon,
} as const;

const ACTIVITIES = [
  {
    title: "엔지니어를 넘어 '빌더'로, 당근 Builder's Camp 해커톤",
    description: "지역 사회의 단절 문제를 해결하는 제품을 만들며 진정한 빌더로 성장한 경험을 당근 커리어 블로그에서 소개했습니다.",
    date: "2025",
    icon: "newspaper",
    href: "https://careers.daangn.com/blog/post/%EB%8B%B9%EA%B7%BC-%ED%95%B4%EC%BB%A4%ED%86%A4-%EC%97%94%EC%A7%80%EB%8B%88%EC%96%B4-%EC%B1%84%EC%9A%A9/",
  },
  {
    title: "U/THON 25",
    description: "개발·디자인·기획 청소년·청년 80명이 무박 2일 동안 아이디어를 프로토타입으로 구현한 해커톤에 참가했습니다.",
    date: "2025",
    icon: "newspaper",
    href: "https://www.uslash.org/projects/uthon25",
  },
  {
    title: "제15회 e-ICON 세계대회 홍보영상",
    description: "세계대회 홍보영상 제작에 참여했습니다.",
    date: "2025",
    icon: "youtube",
    href: "https://youtu.be/vj_PzdfkFlc",
  },
] as const;

function ActivityItem({ activity }: { activity: (typeof ACTIVITIES)[number] }) {
  const Icon = ACTIVITY_ICONS[activity.icon];
  const content = (
    <>
      <div className="activity-item__content">
        <span className="activity-item__title-row">
          <Icon />
          <span className="activity-item__title">{activity.title}</span>
        </span>
        <span className="activity-item__description">{activity.description}</span>
      </div>
      <span className="activity-item__date">{activity.date}</span>
    </>
  );

  if (activity.href) {
    return (
      <a
        href={activity.href}
        target="_blank"
        rel="noopener"
        className="activity-item activity-item--linked"
      >
        {content}
      </a>
    );
  }

  return <div className="activity-item">{content}</div>;
}

function ActivitySection() {
  return (
    <div className="activity">
      <h2 className="activity__title">활동</h2>
      <div className="activity__list">
        {ACTIVITIES.map((activity) => (
          <ActivityItem activity={activity} key={activity.title} />
        ))}
      </div>
    </div>
  );
}

function FlowerIcon({ filled }: { filled: boolean }) {
  const color = filled ? "#4DD9C0" : "#D9D9D9";
  return (
    <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden focusable="false">
      <g fill={color}>
        {[0, 60, 120, 180, 240, 300].map((deg) => (
          <ellipse key={deg} cx="12" cy="6.5" rx="3.4" ry="5.8" transform={`rotate(${deg} 12 12)`} />
        ))}
      </g>
    </svg>
  );
}

function FlowerRating({ rating }: { rating: number }) {
  const filledCount = Math.round(rating);
  return (
    <span className="pub-tool__rating" aria-label={`${rating} / 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <FlowerIcon key={i} filled={i < filledCount} />
      ))}
    </span>
  );
}

const AWARDS = [
  {
    org: "당근마켓",
    date: "25.09",
    title: "Daangn Builder's Camp 해커톤",
    award: "우승 (1등)",
    rank: "1st",
    project: "우리동네 청사진",
    href: "",
    image: "/images/awards/daangn-blueprint.jpg",
    gradient: "linear-gradient(135deg, #FF8A3D 0%, #FF5C4D 100%)",
    badgeColor: "#FF5C1F",
  },
  {
    org: "과학기술정보통신부",
    date: "24.12",
    title: "SW 동행 해커톤",
    award: "창의재단이사장상 (2등)",
    rank: "2nd",
    project: "Fresio",
    href: "/#projects",
    image: "/images/work/fresio.png",
    gradient: "linear-gradient(135deg, #4DD9C0 0%, #2E8FA8 100%)",
    badgeColor: "#1F7A70",
  },
  {
    org: "SK 플래닛",
    date: "25.02",
    title: "AppJam 미래산업 부문",
    award: "최우수상 (1등)",
    rank: "1st",
    project: "Speakit",
    href: "",
    image: "/images/awards/speakit.jpg",
    gradient: "linear-gradient(135deg, #7B5CFF 0%, #FF5CA8 100%)",
    badgeColor: "#7B3FF2",
  },
  {
    org: "USLASH",
    date: "25.07",
    title: "U/THON",
    award: "우수상 (2등)",
    rank: "2nd",
    project: "Fusion M",
    href: "",
    image: "/images/awards/fusionm.jpg",
    gradient: "linear-gradient(135deg, #FFC93D 0%, #FF7A3D 100%)",
    badgeColor: "#E08600",
  },
  {
    org: "선린인터넷고등학교",
    date: "25.07",
    title: "제 11회 선린 해커톤",
    award: "은상 (2등)",
    rank: "2nd",
    project: "십시일반",
    href: "/sipsiilban",
    image: "/images/work-sipsiilban.jpg",
    gradient: "linear-gradient(135deg, #6E8CFF 0%, #3E5CB1 100%)",
    badgeColor: "#3149A8",
  },
  {
    org: "선린인터넷고등학교",
    date: "25.11",
    title: "디지털 콘텐츠 개발 대회 생활 부문",
    award: "금상 (1등)",
    rank: "1st",
    project: "Scholub",
    href: "/scholub",
    image: "/images/work/scholub.jpg",
    gradient: "linear-gradient(135deg, #2B2E63 0%, #3E7CB1 100%)",
    badgeColor: "#1F2547",
  },
  {
    org: "선린인터넷고등학교",
    date: "26.07",
    title: "제 12회 선린 해커톤",
    award: "은상 (1등)",
    rank: "1st",
    project: "SLOP",
    href: "/slop",
    image: "/images/work/slop.jpg",
    gradient: "linear-gradient(135deg, #FF5C8A 0%, #7B3FF2 100%)",
    badgeColor: "#D6266E",
  },
];

const STACK = [
  { name: "Next.js", rating: 5, caption: "실무 경험 & 해커톤 2회 수상", logo: (
    <img src="https://cdn.simpleicons.org/nextdotjs/000000" alt="Next.js" width="40" height="40" />
  ) },
  { name: "ReactNative", rating: 5, caption: "해커톤 3회 수상 & 프로젝트 5회 이상", logo: (
    <img src="https://cdn.simpleicons.org/react/61DAFB" alt="React Native" width="42" height="42" />
  ) },
  { name: "Typescript", rating: 4, caption: "해커톤 7회 수상 & 프로젝트 10회 이상", logo: (
    <img src="https://cdn.simpleicons.org/typescript/3178C6" alt="TypeScript" width="38" height="38" />
  ) },
  { name: "Redis", rating: 3.5, caption: "프로젝트 5회 이상", logo: (
    <img src="https://cdn.jsdelivr.net/npm/devicon@2.15.1/icons/redis/redis-original.svg" alt="Redis" width="40" height="40" />
  ) },
  { name: "NestJS", rating: 3, caption: "프로젝트 10회 이상", logo: (
    <img src="https://cdn.simpleicons.org/nestjs/E0234E" alt="NestJS" width="40" height="40" />
  ) },
  { name: "Docker", rating: 4, caption: "프로젝트 4회", logo: (
    <img src="https://cdn.simpleicons.org/docker/2496ED" alt="Docker" width="42" height="42" />
  ) },
  { name: "AWS", rating: 3, caption: "교육 2회 수강", logo: (
    <img src="https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg" alt="AWS" width="52" height="32" />
  ) },
  { name: "GCP", rating: 2, caption: "프로젝트 1회", logo: (
    <img src="https://cdn.jsdelivr.net/npm/devicon@2.15.1/icons/googlecloud/googlecloud-original.svg" alt="GCP" width="40" height="40" />
  ) },
];

export function PublicationsSection() {
  return (
    <>
          {/* Publications */}
          <section id="highlights" className="section publications-section">
            <div className="centered">
              <h2 className="publications__heading shiny-hover reveal-scroll">Highlights</h2>
              <div className="publications__content">

                {/* Awards & Activity */}
                <div className="publications__awards-column">
                  <AwardHoverGroup items={AWARDS} />
                  <ActivitySection />
                </div>

                {/* Tools */}
                <div className="publications__tools reveal-scroll">
                  {STACK.map((item) => (
                    <div className="pub-tool" key={item.name}>
                      <div className="pub-tool__logo pub-tool__logo--icon" aria-hidden>
                        {item.logo}
                      </div>
                      <div className="pub-tool__details">
                        <div className="pub-tool__title">
                          <span className="pub-tool__title-full">
                            <span className="pub-tool__title-name">{item.name}</span>
                            <FlowerRating rating={item.rating} />
                          </span>
                          <span className="pub-tool__title-short">{item.name}</span>
                        </div>
                        <div className="pub-tool__caption">
                          <span className="pub-tool__caption-full">{item.caption}</span>
                          <span className="pub-tool__caption-short">{item.caption}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            </div>
          </section>
    </>
  );
}
