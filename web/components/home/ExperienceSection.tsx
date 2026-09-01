const ROWS = [
  {
    src: "/images/logo-daangn-pin.png",
    alt: "Daangn",
    style: { borderRadius: "14px", objectFit: "contain", background: "#fff", padding: "6px" } as const,
    role: "Frontend",
    org: "Daangn",
    dates: "2026. 01 − 2026. 03",
    desc: (
      <>
        Jobs 팀에서 React 기반의 웹뷰 마케팅 페이지 및 인앱 화면을 개발했습니다.
        <br />
        인증 관련 로직 구현 및 운영 환경의 버그 해결 작업을 수행했습니다.
      </>
    ),
  },
  {
    src: "/images/logo-infinity-tensor.svg",
    alt: "인피니티텐서",
    style: { borderRadius: "14px" } as const,
    role: "Full-stack",
    org: "인피니티텐서",
    dates: "2025. 08 − 2025. 11",
    desc: "AI 피팅 모델인 'EffectGen'을 처음부터 구축했습니다. 학습용 크롤러, 전체 대시보드, AI 영상 생성 파이프라인을 개발 및 배포했습니다.",
  },
  {
    src: "/images/logo-sunrin.png",
    alt: "선린인터넷고등학교",
    style: { borderRadius: "14px", objectFit: "contain", background: "#fff" } as const,
    role: "소프트웨어과",
    org: "선린인터넷고등학교",
    dates: "2024 − Present",
    desc: "학업을 병행하며 여러 대회의 수상과, 초기 스타트업부터, 수백만명이 쓰는 서비스까지 실무에서 직접 경험했습니다.",
  },
];

export function ExperienceSection() {
  return (
    <>
          <section id="experience" className="section experience-section">
            <div className="centered">
              <h2 className="experience__heading shiny-hover reveal-scroll">Experience</h2>
              <div className="experience__rows">
                {ROWS.map((row) => (
                  <div className="experience__row reveal-scroll" key={row.org}>
                    <div className="experience__left">
                      <img src={row.src} alt={row.alt} className="experience__logo" style={row.style} width="56" height="56" />
                      <div className="experience__details">
                        <div className="experience__title">{row.role}</div>
                        <div className="experience__caption">{row.org} <span className="experience__caption-dot">&nbsp;・&nbsp;</span> {row.dates}</div>
                      </div>
                    </div>
                    <p className="experience__desc">{row.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
    </>
  );
}
