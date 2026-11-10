"use client";

import { useRef, useState, type ReactNode } from "react";
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
  imagePosition?: string;
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
    imagePosition: "center 15%",
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
    imagePosition: "center 22%",
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
    imagePosition: "center 45%",
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
  const groups = new Map<string, Award[]>();
  for (const award of sorted) {
    const year = award.date.slice(0, 4);
    groups.set(year, [...(groups.get(year) ?? []), award]);
  }
  return [...groups.entries()].map(([year, yearAwards]) => ({ year, awards: yearAwards }));
}

function AwardHoverGroup({ items }: { items: Award[] }) {
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
    <div className="award-list reveal-scroll" ref={containerRef} onMouseLeave={hide}>
      {groups.map((group) => (
        <div className="award-year" key={group.year}>
          <span className="award-year__label">{group.year}</span>
          {group.awards.map((award) => {
            const rowProps = {
              className: "award-row",
              onMouseEnter: () => show(award),
              onMouseMove: move,
              onMouseLeave: hide,
            };
            const rowContent = (
              <div className="award-row__text">
                <span className="award-row__title-row">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={award.icon}
                    alt=""
                    className={award.iconPad ? "award-row__icon award-row__icon--pad" : "award-row__icon"}
                    width="26"
                    height="26"
                  />
                  <span className="award-row__title">{award.title} {award.award}</span>
                </span>
                <span className="award-row__badge">{award.org} · {award.date}</span>
              </div>
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
      ))}

      <div className="award-preview" ref={previewRef} aria-hidden>
        <div className="award-preview__image-frame" style={{ background: preview?.image ? undefined : preview?.gradient }}>
          {preview?.image && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={preview.image} alt="" className="award-preview__image" style={{ objectPosition: preview.imagePosition }} />
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

const ACTIVITY_ICONS = {
  newspaper: NewspaperIcon,
  "graduation-cap": GraduationCapIcon,
} as const;

const ACTIVITIES = [
  {
    title: "엔지니어를 넘어 '빌더'로, 당근 Builder's Camp 해커톤",
    description: "당근 빌더스 캠프 해커톤에서 우승한 경험을 소개한 당근 공식 블로그입니다.",
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
    <section id="activity" className="section activity-section">
      <div className="centered">
        <h2 className="publications__heading shiny-hover reveal-scroll">Activity</h2>
        <div className="activity">
          <div className="activity__list">
            {ACTIVITIES.map((activity) => (
              <ActivityItem activity={activity} key={activity.title} />
            ))}
          </div>
        </div>
      </div>
    </section>
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

type StackLine = {
  label: string;
  icon?: string;
};

type StackItem = {
  name: string;
  shortName?: string;
  rating: number;
  caption: string;
  phoneOrder: number;
  lines: StackLine[];
  logo: ReactNode;
};

const AWS_ICON = "https://icon.icepanel.io/AWS/svg";

function StackTool({ item }: { item: StackItem }) {
  const [open, setOpen] = useState(false);

  return (
    <div className={`pub-tool${open ? " is-open" : ""}`} style={{ ["--phone-order" as string]: item.phoneOrder }}>
      <button type="button" className="pub-tool__toggle" aria-expanded={open} onClick={() => setOpen((value) => !value)}>
        <div className="pub-tool__logo pub-tool__logo--icon" aria-hidden>
          {item.logo}
        </div>
        <div className="pub-tool__details">
          <div className="pub-tool__title">
            <span className="pub-tool__title-full">
              <span className="pub-tool__title-name">{item.name}</span>
              <FlowerRating rating={item.rating} />
            </span>
            <span className="pub-tool__title-short">{item.shortName ?? item.name}</span>
          </div>
          <span className="pub-tool__card-caption">{item.caption}</span>
        </div>
        <svg className="pub-tool__chev" viewBox="0 0 24 24" width="16" height="16" aria-hidden>
          <path d="m9 18 6-6-6-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <div className="pub-tool__drop">
        <div className="pub-tool__drop-inner">
          <div className="pub-tool__branches">
            {item.lines.map((line) => (
              <span className="pub-tool__branch" key={line.label}>
                {line.icon ? <img src={line.icon} alt="" width="20" height="20" /> : null}
                {line.label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const STACK: { title: string; items: StackItem[] }[] = [
  {
    title: "Infrastructure",
    items: [
  { name: "Docker", rating: 4, caption: "프로젝트 4회", phoneOrder: 4, lines: [
    { label: "앱을 이미지로 빌드해 레지스트리에 올리기" },
    { label: "multi-stage로 이미지 크기 줄이기" },
    { label: "컨테이너 교체로 서버 배포" },
  ], logo: (
    <img src="https://cdn.simpleicons.org/docker/2496ED" alt="Docker" width="42" height="42" />
  ) },
  { name: "AWS", rating: 4, caption: "프로젝트 2회", phoneOrder: 5, lines: [
    { label: "VPC", icon: `${AWS_ICON}/Networking-Content-Delivery/Virtual-Private-Cloud.svg` },
    { label: "ALB", icon: `${AWS_ICON}/Networking-Content-Delivery/Elastic-Load-Balancing.svg` },
    { label: "ECS", icon: `${AWS_ICON}/Containers/Elastic-Container-Service.svg` },
    { label: "Lambda", icon: `${AWS_ICON}/Compute/Lambda.svg` },
    { label: "RDS", icon: `${AWS_ICON}/Database/RDS.svg` },
    { label: "Redshift", icon: `${AWS_ICON}/Analytics/Redshift.svg` },
    { label: "CloudFront", icon: `${AWS_ICON}/Networking-Content-Delivery/CloudFront.svg` },
    { label: "WAF", icon: `${AWS_ICON}/Security-Identity-Compliance/WAF.svg` },
    { label: "IAM", icon: `${AWS_ICON}/Security-Identity-Compliance/Identity-and-Access-Management.svg` },
  ], logo: (
    <img src="https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg" alt="AWS" width="52" height="32" />
  ) },
  { name: "Terraform", rating: 3, caption: "프로젝트 2회", phoneOrder: 6, lines: [
    { label: "인프라를 모듈로 나눠 코드로 재현" },
    { label: "원격 상태와 잠금으로 구성 관리" },
    { label: "콘솔에 만든 리소스를 코드로 가져오기" },
  ], logo: (
    <img src="https://cdn.simpleicons.org/terraform/7B42BC" alt="Terraform" width="40" height="40" />
  ) },
  { name: "GCP", rating: 2, caption: "프로젝트 1회", phoneOrder: 9, lines: [
    { label: "BigQuery로 테이블 조회" },
    { label: "조회 결과에서 사용 패턴 찾기" },
  ], logo: (
    <img src="https://cdn.jsdelivr.net/npm/devicon@2.15.1/icons/googlecloud/googlecloud-original.svg" alt="GCP" width="40" height="40" />
  ) },
  { name: "Prometheus", rating: 2, caption: "인프라 지표 수집", phoneOrder: 10, lines: [
    { label: "인프라 지표를 시계열로 수집" },
    { label: "수집 대상에서 지표를 가져오기" },
  ], logo: (
    <img src="https://cdn.simpleicons.org/prometheus/E6522C" alt="Prometheus" width="40" height="40" />
  ) },
    ],
  },
  {
    title: "Application",
    items: [
  { name: "Next.js", rating: 5, caption: "실무 경험 & 해커톤 2회 수상", phoneOrder: 1, lines: [
    { label: "App Router로 페이지와 레이아웃 구성" },
    { label: "API Routes로 외부 요청 프록시" },
    { label: "서버 렌더와 클라이언트 상태 나누기" },
  ], logo: (
    <img className="pub-tool__logo-next" src="https://cdn.simpleicons.org/nextdotjs/000000" alt="Next.js" width="40" height="40" />
  ) },
  { name: "React & ReactNative", rating: 5, caption: "해커톤 3회 수상 & 프로젝트 5회 이상", phoneOrder: 2, lines: [
    { label: "컴포넌트로 화면 재사용" },
    { label: "웹뷰와 네이티브 브릿지 연결" },
    { label: "React Native 화면과 탭 네비게이션" },
    { label: "카메라, 음성, BLE 기기 기능 연결" },
  ], logo: (
    <img src="https://cdn.simpleicons.org/react/61DAFB" alt="React Native" width="42" height="42" />
  ) },
  { name: "Typescript & Javascript", shortName: "TS & JS", rating: 4, caption: "해커톤 7회 수상 & 프로젝트 10회 이상", phoneOrder: 3, lines: [
    { label: "화면과 API의 타입 계약" },
    { label: "조건이 많은 분기를 타입으로 정리" },
    { label: "ES6+와 브라우저 확장 스크립트" },
  ], logo: (
    <span className="pub-tool__logo-stack">
      <img className="pub-tool__logo-stack-item" src="https://cdn.simpleicons.org/typescript/3178C6" alt="" width="38" height="38" />
      <img className="pub-tool__logo-stack-item" src="https://cdn.simpleicons.org/javascript/F7DF1E" alt="" width="38" height="38" />
    </span>
  ) },
  { name: "NestJS", rating: 3, caption: "프로젝트 10회 이상", phoneOrder: 7, lines: [
    { label: "모듈로 REST API 나누기" },
    { label: "JWT로 로그인 세션 유지" },
    { label: "Prisma로 스키마와 쿼리 연결" },
  ], logo: (
    <img src="https://cdn.simpleicons.org/nestjs/E0234E" alt="NestJS" width="40" height="40" />
  ) },
  { name: "Spring", rating: 3, caption: "프로젝트 1회", phoneOrder: 8, lines: [
    { label: "Spring PetClinic을 WAS로 구성" },
    { label: "애플리케이션을 이미지로 빌드해 배포" },
    { label: "헬스체크 통과 후 트래픽 받기" },
  ], logo: (
    <img src="https://cdn.simpleicons.org/spring/6DB33F" alt="Spring" width="40" height="40" />
  ) },
    ],
  },
];

export function PublicationsSection() {
  return (
    <>
          <ActivitySection />
          <section id="highlights" className="section publications-section">
            <div className="centered">
              <h2 className="publications__heading shiny-hover reveal-scroll">Highlights</h2>
              <div className="publications__content">

                <div id="awards" className="publications__awards-column">
                  <AwardHoverGroup items={AWARDS} />
                </div>

                <div className="publications__tools reveal-scroll">
                  {STACK.map((group) => (
                    <div className="pub-tool-group" key={group.title}>
                      <h3 className="pub-tool-group__title">{group.title}</h3>
                      {group.items.map((item) => (
                        <StackTool item={item} key={item.name} />
                      ))}
                    </div>
                  ))}
                </div>

              </div>
            </div>
          </section>
    </>
  );
}
