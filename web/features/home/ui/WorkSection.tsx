"use client";

import { useState } from "react";
import "../styles/work-full.css";

type Step = { label: string; src: string; alt: string };

type WorkItem = {
  title: string;
  org: string;
  mark: string;
  markBg: string;
  body: string[];
  rows: { label: string; value: string }[];
  steps: Step[];
};

const WORK: WorkItem[] = [
  {
    title: "SLOP",
    org: "정보의 벽을 깨다",
    mark: "S",
    markBg: "#d8ecff",
    body: [
      "긴 뉴스 기사를 끝까지 읽기 어려운 사용자를 위해, 웹에서 읽던 글을 그 자리에서 숏폼으로 바꿔 주는 확장 프로그램과 피드 웹앱입니다.",
      "페이지를 파싱하고, 요약·쇼츠 생성 과정을 보여 주고, 관심 분야와 말투를 개인화합니다. 잘 동작하는 코드보다, 정보를 바로 읽히게 만드는 쪽을 먼저 설계했습니다.",
    ],
    rows: [
      { label: "수상", value: "선린 해커톤 금상" },
      { label: "역할", value: "프론트엔드, 확장" },
      { label: "Year", value: "2025" },
    ],
    steps: [
      { label: "1 확장", src: "/images/work/slop.jpg", alt: "SLOP 확장" },
      { label: "2 피드", src: "/images/work/slop-2.jpg", alt: "SLOP 피드" },
    ],
  },
  {
    title: "Scholub",
    org: "AI 논문 플랫폼",
    mark: "Sc",
    markBg: "#ece8ff",
    body: [
      "하루에 수백 건씩 쏟아지는 AI 논문을 입문자가 빠르게 읽게 하려고 만들었습니다.",
      "크롤링한 논문을 학회 가이드라인으로 선별한 뒤 뉴스처럼 재가공하고, 추천·검색·토론까지 한곳에 모았습니다.",
    ],
    rows: [
      { label: "수상", value: "디지털 콘텐츠 금상" },
      { label: "역할", value: "프론트엔드" },
      { label: "Year", value: "2025" },
    ],
    steps: [
      { label: "1 커버", src: "/images/work/scholub.jpg", alt: "Scholub 커버" },
      { label: "2 홈", src: "/images/scholub/home.jpg", alt: "Scholub 홈 피드" },
      { label: "3 상세", src: "/images/scholub/detail.jpg", alt: "Scholub 논문 상세" },
      { label: "4 프로필", src: "/images/scholub/profile.png", alt: "Scholub 프로필" },
    ],
  },
  {
    title: "Fresio",
    org: "IoT 냉장고 어시스턴트",
    mark: "F",
    markBg: "#ffe08a",
    body: [
      "냉장고에 붙인 디스플레이와 연동하는 식자재 관리 앱입니다. 바코드·사진으로 넣고, 유통기한과 레시피를 보여 줍니다.",
      "BLE와 Wi-Fi 페어링을 하나의 온보딩으로 이었습니다. 하드웨어와 앱이 끊기지 않게 흐름을 먼저 그렸습니다.",
    ],
    rows: [
      { label: "수상", value: "동행 해커톤 이사장상" },
      { label: "역할", value: "앱, 연동" },
      { label: "Year", value: "2025" },
    ],
    steps: [
      { label: "1 앱", src: "/images/work/fresio.png", alt: "Fresio 앱" },
      { label: "2 기기", src: "/images/work/fresio-2.jpg", alt: "Fresio 기기" },
    ],
  },
  {
    title: "서울 자전거",
    org: "사고 데이터 시각화",
    mark: "서",
    markBg: "#d8f3e4",
    body: [
      "전용도로는 늘어나는데 사고는 줄지 않습니다. 표만으로는 어디부터 손볼지 안 보입니다.",
      "TAAS 사고와 OSM 도로를 붙여, 반복되는 지점과 구별 차이를 지도와 대시보드로 읽게 했습니다.",
    ],
    rows: [
      { label: "초점", value: "데이터 시각화" },
      { label: "역할", value: "대시보드, 파이프라인" },
      { label: "Year", value: "2025" },
    ],
    steps: [
      { label: "1 지도", src: "/images/work/seoul-access-map.png", alt: "서울 자전거 인사이트" },
      { label: "2 대시보드", src: "/images/work/seoul-access-map-2.gif", alt: "서울 자전거 대시보드" },
    ],
  },
];

function WorkCase({ item }: { item: WorkItem }) {
  const [i, setI] = useState(0);
  const go = (n: number) => setI((n + item.steps.length) % item.steps.length);

  return (
    <article className="yan-case">
      <div className="yan-case__stage">
        <div className="yan-case__viewport">
          <div className="yan-case__frame">
            <div className="yan-case__track" style={{ transform: `translateX(-${i * 100}%)` }}>
              {item.steps.map((step) => (
                <div className="yan-case__slide" key={step.src}>
                  <img src={step.src} alt={step.alt} />
                </div>
              ))}
            </div>
          </div>
          {item.steps.length > 1 && (
            <>
              <button type="button" className="yan-case__nav yan-case__nav--prev" aria-label="이전" onClick={() => go(i - 1)}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
              </button>
              <button type="button" className="yan-case__nav yan-case__nav--next" aria-label="다음" onClick={() => go(i + 1)}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
              </button>
              <div className="yan-case__steps">
                {item.steps.map((step, idx) => (
                  <button key={step.label} type="button" className={`yan-case__step${idx === i ? " is-on" : ""}`} onClick={() => setI(idx)}>
                    {step.label}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
      <aside className="yan-case__side">
        <div className="yan-case__brand">
          <span className="yan-case__mark" style={{ background: item.markBg }}>{item.mark}</span>
          <div className="yan-case__titles">
            <h2>{item.title}</h2>
            <p className="yan-case__org">{item.org}</p>
          </div>
        </div>
        <div className="yan-case__body">
          {item.body.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
        <div className="yan-case__meta">
          {item.rows.map((row) => (
            <div key={row.label} className="yan-case__row">
              <span>{row.label}</span>
              <span>{row.value}</span>
            </div>
          ))}
        </div>
      </aside>
    </article>
  );
}

export function WorkSection() {
  return (
    <div className="yan-work">
      {WORK.map((item) => (
        <WorkCase key={item.title} item={item} />
      ))}
    </div>
  );
}
