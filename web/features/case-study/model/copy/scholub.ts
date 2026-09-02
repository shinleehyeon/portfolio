import type { CaseStudyCopy } from "@/features/case-study/model/types";

const GALLERY = [
  { src: "/images/scholub/demo.mp4", alt: "Scholub demo", poster: "/images/scholub/demo-poster.jpg" },
  { src: "/images/scholub/home.jpg", alt: "Scholub home feed" },
  { src: "/images/scholub/detail.jpg", alt: "Scholub paper detail" },
  { src: "/images/scholub/profile.png", alt: "Scholub profile" },
  { src: "/images/work/scholub.jpg", alt: "Scholub cover" },
];

const NAV = {
  ko: [
    { id: "overview", label: "개요" },
    { id: "focus", label: "초점" },
    { id: "pipeline", label: "파이프라인" },
    { id: "system", label: "시스템" },
    { id: "product", label: "제품" },
  ],
  en: [
    { id: "overview", label: "Overview" },
    { id: "focus", label: "Focus" },
    { id: "pipeline", label: "Pipeline" },
    { id: "system", label: "System" },
    { id: "product", label: "Product" },
  ],
};

export const SCHOLUB_COPY: CaseStudyCopy = {
  ko: {
    slug: "scholub",
    title: "Scholub",
    nav: NAV.ko,
    summarize: {
      label: "요약",
      paragraphs: [
        "Scholub은 매일 쏟아지는 AI 논문을 실제로 읽을 수 있는 뉴스로 바꿉니다. arXiv에서 논문을 모으고, 학회 리뷰어 기준으로 걸러낸 뒤 요약·번역·태그·썸네일을 붙여 피드에 올립니다.",
        "프론트엔드를 맡았고, NestJS API·파이썬 크롤러·FastAPI LLM 서버까지 팀과 함께 구조를 잡았습니다. 추천, AI 검색, 토론 커뮤니티도 같은 제품 안에 있습니다.",
        "디지털 콘텐츠 개발 대회 생활 부문 금상을 받았습니다. 사람들이 만지는 건 화면이고, 매일 피드가 살아 있게 하는 건 파이프라인입니다.",
      ],
    },
    blocks: [
      {
        type: "hero",
        title: "Scholub",
        year: "2025",
        intro: "매일 arXiv에 AI 논문이 수백 건씩 올라옵니다. 대부분은 제목에서 멈춥니다. Scholub은 그 논문을 크롤링하고, 리뷰어처럼 걸러낸 뒤 짧은 뉴스로 다시 씁니다. 검색, 추천, 토론까지 한곳에 있습니다.",
        tags: [
          { label: "프론트엔드", tip: "논문 피드, 읽기 화면, AI 검색, 토론 UI를 React로 설계하고 구현했습니다." },
          { label: "논문 파이프라인", tip: "arXiv 수집부터 피드 노출까지: 수집, 선별, 가공, 발행." },
          { label: "시스템 설계", tip: "NestJS, 크롤러, FastAPI LLM 서버를 팀과 맞춰 UI가 빈 목업이 아니게 했습니다." },
          { label: "AI 검색 · 추천", tip: "추천은 읽은 기록을 따릅니다. 검색과 요약은 별도 LLM 서버가 담당합니다." },
          { label: "금상", tip: "디지털 콘텐츠 개발 대회 생활 부문 금상." },
        ],
      },
      { type: "wideImage", src: "/images/work/scholub.jpg", alt: "Scholub" },
      {
        type: "focusList",
        heading: "초점",
        body: [
          "어려운 건 논문 목록을 보여주는 일이 아닙니다. 어떤 논문이 자리에 오를지 정하고, PDF가 아니라 뉴스처럼 읽히게 만드는 일입니다.",
          "핵심 질문: arXiv 덤프를 어떻게 하면 끝까지 읽는 하루 피드로 바꿀 수 있을까?",
          "네 가지에 집중했습니다.",
        ],
        items: [
          { title: "먼저 읽히게", desc: "PDF보다 요약, 번역, 태그가 먼저입니다. 해당 분야를 모르는 사람도 읽기 화면에서 버틸 수 있어야 합니다." },
          { title: "리뷰어 수준의 선별", desc: "OpenAI가 학회 가이드라인으로 점수를 매깁니다. 피드가 “오늘 들어온 것”이 되지 않게 합니다." },
          { title: "한곳에서 머물게", desc: "피드, AI 검색, 추천, 토론이 같은 제품에 있습니다. 탭 다섯 개로 나가지 않습니다." },
          { title: "매일 돌아가는 파이프라인", desc: "수집, 선별, 가공, 저장, 노출. 한 단계라도 일회성 스크립트면 다음 날 피드는 죽습니다." },
        ],
      },
      {
        type: "scopeList",
        heading: "범위",
        body: "프론트엔드와 제품 화면을 맡았습니다. 크롤러, NestJS API, LLM 서버는 팀과 같이 짜서 UI가 빈 엔드포인트 위 목업이 아니게 했습니다.",
        groups: [
          { title: "화면", items: ["논문 피드와 읽기 화면", "AI 검색", "토론 커뮤니티", "프로필과 선호"] },
          { title: "파이프라인", items: ["arXiv 수집과 PDF 추출", "리뷰어 선별", "요약, 번역, 태그", "썸네일 생성"] },
          { title: "백엔드", items: ["NestJS + Prisma + CQRS", "JWT 인증과 알림", "선호 기반 랭킹", "S3 자산, Redis 캐시"] },
          { title: "모델", items: ["리뷰어 점수: OpenAI", "검색·요약: Perplexity", "썸네일: Gemini", "심층 분석: FastAPI 서브 에이전트"] },
        ],
      },
      {
        type: "textSection",
        id: "pipeline",
        heading: "논문 파이프라인",
        body: [
          "원래는 여덟 칸이 한 줄로 이어져 있었습니다. 정확하지만 한눈에 안 들어옵니다. 루트 하나, 가지 몇 개, 자세한 건 펼쳤을 때만 보이게 묶었습니다.",
          "다이어그램은 영어입니다. Collect, Filter, Enrich, Publish. 노드를 누르면 펼쳐집니다.",
        ],
      },
      { type: "treeDiagram", id: "pipelineTree" },
      {
        type: "textSection",
        id: "system",
        heading: "시스템",
        body: [
          "클라이언트는 서버 두 대와 이야기합니다. NestJS API는 유저, 논문, 토론, 알림을 맡습니다. FastAPI LLM 서버는 검색, 요약, 더 깊은 패스를 위한 서브 에이전트를 맡습니다.",
          "메타데이터는 Postgres, PDF와 썸네일은 S3, 세션은 Redis입니다. 모델은 그래프 가장자리에 두고, 매 요청 한가운데에 두지 않았습니다.",
        ],
      },
      { type: "treeDiagram", id: "systemTree" },
      {
        type: "product",
        heading: "제품",
        entries: [
          { label: "홈 피드", body: "선별된 논문이 카드로 올라옵니다. 인기 논문, 최신 연구, 추천이 한 화면에 있습니다. 알림은 관심 논문의 반박·후속 논문을 바로 띄웁니다." },
          { label: "논문 상세 · AI 채팅", body: "초록과 요약을 읽고, 문장을 채팅으로 보내 물을 수 있습니다. AI 뷰어와 원문 보기가 나란히 있습니다. 검색도 키워드 인덱스가 아니라 LLM 서버로 갑니다." },
          { label: "프로필", body: "반응한 논문과 토론한 논문이 갈립니다. 피드는 매일 바뀌고, 댓글과 반응이 사람을 붙입니다." },
        ],
      },
      { type: "gallery", slides: GALLERY },
    ],
  },
  en: {
    slug: "scholub",
    title: "Scholub",
    nav: NAV.en,
    summarize: {
      label: "Summarize",
      paragraphs: [
        "Scholub turns the daily flood of AI papers into news you can actually read. Papers come from arXiv, get screened against conference-style reviewer criteria, then rewritten with a summary, translation, tags, and a thumbnail before they hit the feed.",
        "I led the frontend and helped shape the system: a NestJS API, a Python crawler, and a FastAPI LLM server. Recommendations, AI search, and a discussion community live in the same product.",
        "It won gold in the Digital Content Development Competition (daily-life category). People touch the interface; the pipeline is what keeps the feed alive every day.",
      ],
    },
    blocks: [
      {
        type: "hero",
        title: "Scholub",
        year: "2025",
        intro: "Hundreds of new AI papers land on arXiv every day. Most people never get past the title. Scholub crawls those papers, screens them like a reviewer, and republishes the ones that matter as short news — with search, recommendations, and a place to discuss them.",
        tags: [
          { label: "Frontend", tip: "Designed and built the paper feed, reading view, AI search, and discussion UI in React." },
          { label: "Paper pipeline", tip: "From arXiv crawl to feed: collect, filter, enrich, publish." },
          { label: "System design", tip: "Aligned NestJS, the crawler, and the FastAPI LLM server with the team so the UI was not a mock on empty endpoints." },
          { label: "AI search & recommend", tip: "Recommendations follow reading history. Search and summaries run on a dedicated LLM server." },
          { label: "Gold award", tip: "Gold award, Digital Content Development Competition, daily-life category." },
        ],
      },
      { type: "wideImage", src: "/images/work/scholub.jpg", alt: "Scholub" },
      {
        type: "focusList",
        heading: "Focus",
        body: [
          "The hard part is not showing a list of papers. It is deciding which ones deserve a slot, then making those papers feel like news instead of PDFs.",
          "The core question: how do you take an arXiv dump and turn it into a daily feed someone actually finishes?",
          "I focused on four things:",
        ],
        items: [
          { title: "Readable first", desc: "Summary, translation, and tags before the PDF. The reading view should work for someone who is not already in the field." },
          { title: "Reviewer-grade filter", desc: "OpenAI scores each paper against conference-style guidelines so the feed is not just “whatever arrived today.”" },
          { title: "One place to stay", desc: "Feed, AI search, recommendations, and discussion live in the same product. No bounce out to five tabs." },
          { title: "A pipeline that can run daily", desc: "Collect, filter, enrich, store, expose. If any step is a one-off script, the feed dies the next morning." },
        ],
      },
      {
        type: "scopeList",
        heading: "Scope",
        body: "I owned the frontend and the product surface. The crawler, NestJS API, and LLM server were designed with the team so the UI was not a mock on empty endpoints.",
        groups: [
          { title: "Interface", items: ["Paper feed and reading view", "AI search", "Discussion community", "Profiles and preferences"] },
          { title: "Pipeline", items: ["arXiv crawl and PDF extract", "Reviewer screening", "Summary, translation, tags", "Thumbnail generation"] },
          { title: "Backend", items: ["NestJS + Prisma + CQRS", "JWT auth and notifications", "Preference-based ranking", "S3 assets, Redis cache"] },
          { title: "Models", items: ["Reviewer scoring: OpenAI", "Search & summary: Perplexity", "Thumbnails: Gemini", "Deeper analysis: FastAPI sub-agent"] },
        ],
      },
      {
        type: "textSection",
        id: "pipeline",
        heading: "Paper pipeline",
        body: [
          "The original flow was eight boxes in a line. Accurate, hard to scan. I grouped it as one root, a few branches, details only when you open them.",
          "The diagram stays in English. Collect, Filter, Enrich, Publish. Click a node to expand.",
        ],
      },
      { type: "treeDiagram", id: "pipelineTree" },
      {
        type: "textSection",
        id: "system",
        heading: "System",
        body: [
          "Clients talk to two servers. The NestJS API owns users, papers, discussions, and notifications. The FastAPI LLM server owns search, summarization, and a sub-agent for deeper passes.",
          "Postgres holds metadata. S3 holds PDFs and thumbnails. Redis caches sessions. Models sit at the edge of the graph, not in the middle of every request.",
        ],
      },
      { type: "treeDiagram", id: "systemTree" },
      {
        type: "product",
        heading: "Product",
        entries: [
          { label: "Home feed", body: "Screened papers land as cards. Popular, latest, and recommended sit on one screen. Notifications surface rebuttals and follow-ups on papers you already care about." },
          { label: "Paper detail · AI chat", body: "Read the abstract and summary, then send a sentence to chat. AI viewer and original sit side by side. Search goes to the LLM server, not a keyword index." },
          { label: "Profile", body: "Papers you reacted to and papers you discussed are split. The feed changes daily; comments and reactions are why people stay." },
        ],
      },
      { type: "gallery", slides: GALLERY },
    ],
  },
};
