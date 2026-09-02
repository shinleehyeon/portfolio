import type { CaseStudyCopy } from "@/lib/case-study/types";

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

export const SLOP_COPY: CaseStudyCopy = {
  ko: {
    slug: "slop",
    title: "SLOP",
    nav: NAV.ko,
    summarize: {
      label: "요약",
      paragraphs: [
        "SLOP은 웹에서 읽던 글을 그 자리에서 숏폼으로 바꿉니다. 크롬 확장이 페이지를 파싱하고, 서버가 요약·쇼츠를 만들면 세로 영상을 바로 재생합니다.",
        "확장은 Plasmo, 웹은 Next.js, API는 NestJS입니다. 확장과 웹 프론트를 설계하고 구현했습니다. 제12회 선린 해커톤 금상입니다.",
        "질문은 하나입니다. 긴 기사를 끝까지 읽지 못하는 사람이, 그 페이지를 떠나지 않고 쇼츠를 볼 수 있는가.",
      ],
    },
    blocks: [
      {
        type: "hero",
        title: "SLOP",
        year: "2025",
        intro: "긴 뉴스는 제목에서 끝납니다. SLOP은 그 글을 페이지 위에서 숏폼으로 바꿉니다. 플로팅 버튼을 누르면 분석·요약·영상 생성이 이어지고, 완성되면 세로 쇼츠를 바로 봅니다.",
        tags: [
          { label: "프론트엔드", tip: "Plasmo 확장과 Next.js 웹앱을 설계하고 구현했습니다." },
          { label: "크롬 확장", tip: "페이지 파싱, 플로팅 버튼, 텍스트 선택, 인라인 재해석, 쇼츠 패널." },
          { label: "쇼츠 파이프라인", tip: "페이지 파싱 → 요약 → 쇼츠 생성 → 피드 재생." },
          { label: "금상", tip: "제12회 선린 해커톤 금상." },
        ],
      },
      { type: "wideImage", src: "/images/slop/slop.jpg", alt: "SLOP" },
      {
        type: "focusList",
        heading: "초점",
        body: [
          "어려운 건 영상을 만드는 일이 아닙니다. 읽고 있던 페이지를 떠나지 않고, 그 글이 쇼츠가 되게 하는 일입니다.",
          "핵심 질문: 기사를 끝까지 못 읽는 사람이, 같은 탭에서 숏폼을 볼 수 있는가.",
          "네 가지에 집중했습니다.",
        ],
        items: [
          { title: "페이지를 안 떠남", desc: "읽던 기사 위에서 버튼을 누르면 바로 파싱이 시작됩니다. 확장 창을 열고 URL을 붙이는 순간, 읽던 맥락은 이미 끊깁니다." },
          { title: "본문만 집기", desc: "같은 기사라도 사이트마다 본문 위치가 다릅니다. 광고·관련기사·깨진 인코딩을 빼고 넘겨야 쇼츠가 다른 글을 요약하지 않습니다." },
          { title: "기다림이 비지 않게", desc: "분석, 요약, 영상까지 단계가 보입니다. 끝나면 새 탭이 아니라, 그 패널에서 세로 쇼츠가 바로 재생됩니다." },
          { title: "취향이 피드가 됨", desc: "말투와 관심 분야를 온보딩에서 한 번 고릅니다. 이후 릴스는 그 설정으로 쌓이고, 좋아요와 댓글도 같은 웹앱에 남습니다." },
        ],
      },
      {
        type: "scopeList",
        heading: "범위",
        body: "크롬 확장과 Next.js 웹 프론트를 맡았습니다. 쇼츠 생성과 인증은 NestJS API에 맡기고, UI가 빈 목업이 아니게 맞췄습니다.",
        groups: [
          { title: "확장", items: ["플로팅 버튼", "페이지 파싱", "텍스트 선택 팝업", "인라인 재해석"] },
          { title: "웹", items: ["구글 OAuth 로그인", "온보딩", "릴스 피드", "검색과 프로필"] },
          { title: "백엔드", items: ["NestJS + Prisma", "쇼츠 생성·추천", "파일·S3", "Meilisearch"] },
          { title: "모델", items: ["OpenRouter", "요약·스크립트", "진행 상태 회신", "피드 추천"] },
        ],
      },
      {
        type: "textSection",
        id: "pipeline",
        heading: "쇼츠 파이프라인",
        body: [
          "글을 잡고, 요약하고, 영상을 만들고, 피드에 올립니다. 확장이 수집을 열고, 서버가 생성을 닫습니다.",
          "다이어그램은 영어입니다. Parse, Generate, Publish. 노드를 누르면 펼쳐집니다.",
        ],
      },
      { type: "treeDiagram", id: "slopPipelineTree" },
      {
        type: "textSection",
        id: "system",
        heading: "시스템",
        body: [
          "클라이언트는 둘입니다. 확장은 기사 위에서 파싱하고 생성을 요청합니다. 웹은 로그인, 온보딩, 릴스, 검색을 맡습니다.",
          "NestJS가 인증·쇼츠·파일을 맡고, Prisma·S3·Redis·Meilisearch·OpenRouter가 가장자리에 있습니다.",
        ],
      },
      { type: "treeDiagram", id: "slopSystemTree" },
      {
        type: "product",
        heading: "제품",
        entries: [
          { label: "확장", body: "플로팅 버튼을 누르면 사이트 분석부터 쇼츠까지 진행이 보입니다. 특정 뉴스에서는 원문 옆에 쉬운 문장이 붙습니다." },
          { label: "온보딩", body: "말투, 표시 형식, 쇼츠 스타일, 관심 분야, 용어 난이도를 저장합니다. 이후 피드는 그 설정을 따릅니다." },
          { label: "릴스", body: "완성된 세로 영상을 틱톡처럼 스크롤합니다. 좋아요, 댓글, 검색, 프로필이 같은 웹앱에 있습니다." },
        ],
      },
      {
        type: "textSection",
        id: "demo",
        heading: "데모",
        body: ["실제 흐름을 담은 데모 영상입니다."],
      },
      { type: "video", src: "/images/slop/demo.mp4", poster: "/images/slop/slop.jpg", hint: "실제 흐름을 담은 데모 영상입니다." },
    ],
  },
  en: {
    slug: "slop",
    title: "SLOP",
    nav: NAV.en,
    summarize: {
      label: "Summarize",
      paragraphs: [
        "SLOP turns the article you are already reading into a short-form video on that page. A Chrome extension parses the page; the server summarizes and builds a vertical short you can play immediately.",
        "The extension is Plasmo, the web app is Next.js, the API is NestJS. I designed and built the extension and the web frontend. It won gold at the 12th Sunrin Hackathon.",
        "One question: can someone who never finishes a long article get a consumable short without leaving the tab.",
      ],
    },
    blocks: [
      {
        type: "hero",
        title: "SLOP",
        year: "2025",
        intro: "Long news dies at the title. SLOP turns that copy into a short on the same page. Tap the floating button, watch parse → summary → render, then play the vertical video.",
        tags: [
          { label: "Frontend", tip: "Designed and built the Plasmo extension and the Next.js web app." },
          { label: "Chrome extension", tip: "Page parse, floating button, text selection, inline rewrite, shorts panel." },
          { label: "Shorts pipeline", tip: "Parse the page → summarize → generate a short → play it in the feed." },
          { label: "Gold award", tip: "Gold, 12th Sunrin Hackathon." },
        ],
      },
      { type: "wideImage", src: "/images/slop/slop.jpg", alt: "SLOP" },
      {
        type: "focusList",
        heading: "Focus",
        body: [
          "The hard part is not making a video. It is making the article already on screen become a short, without leaving the page.",
          "The core question: can someone who never finishes a long article get a consumable short in the same tab.",
          "I focused on four things:",
        ],
        items: [
          { title: "Stay on the page", desc: "Tap the button on the article and parsing starts there. Opening the extension to paste a URL already breaks the reading context." },
          { title: "Grab the body only", desc: "The same article lives in a different DOM on every site. Ads, related stories, and broken encoding have to come off, or the short summarizes the wrong text." },
          { title: "Waiting is not a blank", desc: "Parse, summary, and render show as steps. When it is done, the vertical short plays in that panel — not in a new tab." },
          { title: "Taste becomes the feed", desc: "Tone and topics are chosen once in onboarding. The reels stack from those settings, and likes and comments stay in the same web app." },
        ],
      },
      {
        type: "scopeList",
        heading: "Scope",
        body: "I owned the Chrome extension and the Next.js frontend. Shorts generation and auth sit on the NestJS API, wired so the UI is not a mock.",
        groups: [
          { title: "Extension", items: ["Floating button", "Page parse", "Text-select popup", "Inline rewrite"] },
          { title: "Web", items: ["Google OAuth", "Onboarding", "Reels feed", "Search and profile"] },
          { title: "Backend", items: ["NestJS + Prisma", "Shorts generate and rank", "Files and S3", "Meilisearch"] },
          { title: "Models", items: ["OpenRouter", "Summary and script", "Progress callbacks", "Feed ranking"] },
        ],
      },
      {
        type: "textSection",
        id: "pipeline",
        heading: "Shorts pipeline",
        body: [
          "Catch the article, summarize it, render a video, put it on a feed. The extension opens collection; the server closes generation.",
          "The diagram stays in English. Parse, Generate, Publish. Click a node to expand.",
        ],
      },
      { type: "treeDiagram", id: "slopPipelineTree" },
      {
        type: "textSection",
        id: "system",
        heading: "System",
        body: [
          "Two clients. The extension parses on the article and asks for a short. The web app owns login, onboarding, reels, and search.",
          "NestJS owns auth, shorts, and files. Prisma, S3, Redis, Meilisearch, and OpenRouter sit at the edge.",
        ],
      },
      { type: "treeDiagram", id: "slopSystemTree" },
      {
        type: "product",
        heading: "Product",
        entries: [
          { label: "Extension", body: "The floating button shows parse through render. On some news sites, a simpler sentence sits next to the original paragraph." },
          { label: "Onboarding", body: "Tone, format, shorts style, topics, and term difficulty are stored. The feed follows those settings." },
          { label: "Reels", body: "Finished vertical videos scroll like TikTok. Likes, comments, search, and profile live in the same web app." },
        ],
      },
      {
        type: "textSection",
        id: "demo",
        heading: "Demo",
        body: ["A demo video of the real flow, start to finish."],
      },
      { type: "video", src: "/images/slop/demo.mp4", poster: "/images/slop/slop.jpg", hint: "A demo video of the real flow, start to finish." },
    ],
  },
};
