import type { CaseStudyCopy } from "@/features/case-study/model/types";

const GALLERY = [
  { src: "/images/sipsiilban/verify.jpg", alt: "신원 인증", fit: "phone" as const },
  { src: "/images/sipsiilban/verify-confirm.jpg", alt: "촬영 확인", fit: "phone" as const },
  { src: "/images/sipsiilban/home.jpg", alt: "홈", fit: "phone" as const },
  { src: "/images/sipsiilban/map.jpg", alt: "지도", fit: "phone" as const },
  { src: "/images/sipsiilban/search.jpg", alt: "검색", fit: "phone" as const },
  { src: "/images/sipsiilban/qr.jpg", alt: "QR 결제", fit: "phone" as const },
];

const NAV = {
  ko: [
    { id: "overview", label: "개요" },
    { id: "focus", label: "초점" },
    { id: "flow", label: "흐름" },
    { id: "product", label: "제품" },
  ],
  en: [
    { id: "overview", label: "Overview" },
    { id: "focus", label: "Focus" },
    { id: "flow", label: "Flow" },
    { id: "product", label: "Product" },
  ],
};

export const SIPSIILBAN_COPY: CaseStudyCopy = {
  ko: {
    slug: "sipsiilban",
    title: "십시일반",
    nav: NAV.ko,
    summarize: {
      label: "요약",
      paragraphs: [
        "십시일반은 근처 편의점·프랜차이즈를 지도에서 찾아 QR로 결제하는 React Native 앱입니다. 로그인부터 신원 인증, 매장 탐색, 결제, 주문 확인까지 한 흐름으로 이어집니다.",
        "프론트엔드/메인 개발로 화면 흐름을 설계하고 구현했습니다. 모바일 앱, FastAPI 백엔드, 가맹점용 POS까지 세 갈래입니다. 제11회 선린 해커톤 은상입니다.",
        "질문은 하나입니다. 인증과 결제를 여러 앱으로 쪼개지 않고, 가맹점 앞에서 바로 끝낼 수 있는가.",
      ],
    },
    blocks: [
      {
        type: "hero",
        title: "십시일반",
        year: "2025",
        intro: "편의점과 프랜차이즈 앞에서 앱을 여러 개 열지 않습니다. 십시일반은 신원을 확인하고, 근처 가맹점을 지도에서 고른 뒤, QR 한 장으로 결제합니다.",
        tags: [
          { label: "프론트엔드", tip: "로그인부터 QR 결제까지 화면 흐름을 설계하고 React Native로 구현했습니다." },
          { label: "React Native", tip: "Expo 앱. 지도, 카메라/이미지 피커, QR 생성 화면을 직접 만들었습니다." },
          { label: "QR 결제", tip: "가맹점 앞에서 쓰는 QR. 만료 시간과 주문 상태가 같은 앱에 있습니다." },
          { label: "은상", tip: "제11회 선린 해커톤 은상." },
        ],
      },
      { type: "wideImage", src: "/images/sipsiilban/cover.jpg", alt: "십시일반" },
      {
        type: "focusList",
        heading: "초점",
        body: [
          "어려운 건 QR을 그리는 일이 아닙니다. 인증, 매장, 결제, 주문을 한 상태 머신으로 끊기지 않게 잇는 일입니다.",
          "핵심 질문: 가맹점 앞에 선 사람이, 다른 앱으로 나가지 않고 결제를 끝낼 수 있는가.",
          "네 가지에 집중했습니다.",
        ],
        items: [
          { title: "인증이 먼저", desc: "소득·직업 증명을 올리고 사진을 확인하기 전에는 결제가 열리지 않습니다. 혜택을 받는 사람이 맞는지가 출발점입니다." },
          { title: "근처에서 고름", desc: "홈에서 자주 가는 가맹점을 보고, 지도와 검색으로 나머지를 찾습니다. 카테고리와 거리가 먼저입니다." },
          { title: "QR이 곧 결제", desc: "금액을 고르면 QR이 생기고 만료 시간이 돌아갑니다. 가맹점 POS가 읽으면 주문이 이어집니다." },
          { title: "목으로 먼저 검증", desc: "백엔드 연동 전에 화면 전환과 상태를 목 데이터로 맞춰 두었습니다. 연동이 들어와도 흐름이 바뀌지 않게 했습니다." },
        ],
      },
      {
        type: "scopeList",
        heading: "범위",
        body: "화면 흐름과 모바일 앱을 맡았습니다. 결제 API와 가맹점 POS는 팀과 맞춰, UI가 빈 목업이 아니게 했습니다.",
        groups: [
          { title: "앱", items: ["구글 로그인", "온보딩 · 서류 업로드", "홈 · 지도 · 검색", "QR 결제 · 주문 상태"] },
          { title: "POS", items: ["QR 수신", "주문 처리", "가맹점 온보딩"] },
          { title: "백엔드", items: ["FastAPI", "인증 · 가맹점", "QR 결제 API"] },
          { title: "스택", items: ["React Native · Expo", "TypeScript", "NestJS · FastAPI", "Next.js POS"] },
        ],
      },
      {
        type: "focusList",
        id: "flow",
        heading: "흐름",
        body: [
          "앱 흐름은 선린톤에서 짠 그대로입니다. 로그인 다음이 온보딩과 서류 인증이고, 그다음이 홈·지도·검색, 마지막이 QR과 주문 상태입니다.",
          "아래 화면은 그 순서입니다. 화살표로 넘기면 인증부터 결제까지 이어집니다.",
        ],
        items: [
          { title: "로그인 · 온보딩", desc: "구글 로그인 후 서비스 혜택을 위해 신원 인증을 안내합니다." },
          { title: "서류 인증", desc: "소득·직업 증명을 찍고, 제대로 찍혔는지 확인한 뒤에야 넘어갑니다." },
          { title: "홈 · 지도 · 검색", desc: "잔액과 자주 가는 가맹점, 지도 핀, 추천 검색이 한 앱에 있습니다." },
          { title: "QR · 주문", desc: "QR을 보여주고 만료를 셉니다. 주문이 잡히면 상태 화면으로 갑니다." },
        ],
      },
      { type: "gallery", slides: GALLERY, variant: "phone", showDots: true },
      {
        type: "product",
        heading: "제품",
        entries: [
          { label: "홈", body: "QR 결제 버튼, 사용 가능 금액, 카테고리, 자주 가는 가맹점이 한 화면에 있습니다. 결제로 가는 가장 짧은 길입니다." },
          { label: "지도 · 검색", body: "지도에서 가맹점 핀을 보고, 검색에서 최근 검색어와 추천 매장을 고릅니다. 위치와 카테고리가 목록을 자릅니다." },
          { label: "QR 결제", body: "현장 결제 QR과 만료 시간이 가운데에 있습니다. 가맹점이 읽으면 주문이 시작되고, 조리·완료 상태가 같은 앱에 남습니다." },
        ],
      },
    ],
  },
  en: {
    slug: "sipsiilban",
    title: "Sipsiilban",
    nav: NAV.en,
    summarize: {
      label: "Summarize",
      paragraphs: [
        "Sipsiilban is a React Native app for finding nearby convenience stores and franchises on a map and paying with QR. Login, ID verification, store search, payment, and order status sit in one flow.",
        "I was frontend/main developer: screen flow, then implementation. Mobile app, FastAPI backend, and a merchant POS. Silver at the 11th Sunrin Hackathon.",
        "One question: can someone finish auth and payment at the counter without bouncing through other apps.",
      ],
    },
    blocks: [
      {
        type: "hero",
        title: "십시일반",
        year: "2025",
        intro: "You should not open three apps at a convenience store. Sipsiilban verifies who you are, lets you pick a nearby merchant on a map, and pays with one QR.",
        tags: [
          { label: "Frontend", tip: "Designed and built the screen flow from login to QR payment in React Native." },
          { label: "React Native", tip: "Expo app. I built the map, camera/image picker, and QR screens." },
          { label: "QR payment", tip: "A QR you show at the counter. Expiry and order status live in the same app." },
          { label: "Silver", tip: "Silver, 11th Sunrin Hackathon." },
        ],
      },
      { type: "wideImage", src: "/images/sipsiilban/cover.jpg", alt: "Sipsiilban" },
      {
        type: "focusList",
        heading: "Focus",
        body: [
          "The hard part is not drawing a QR. It is keeping auth, store, payment, and order in one state machine that does not break.",
          "The core question: can someone at the counter finish payment without leaving for another app.",
          "I focused on four things.",
        ],
        items: [
          { title: "Auth first", desc: "Payment stays closed until income and job proof are uploaded and the photo is confirmed. Who gets the benefit is the start." },
          { title: "Pick nearby", desc: "Home shows frequent merchants. Map and search cover the rest. Category and distance come first." },
          { title: "QR is the payment", desc: "Pick an amount, get a QR, watch the timer. When the POS reads it, the order continues." },
          { title: "Mock the flow first", desc: "Screen transitions and state were wired on mocks before the backend. Integration did not rewrite the flow." },
        ],
      },
      {
        type: "scopeList",
        heading: "Scope",
        body: "I owned the screen flow and the mobile app. Payment APIs and merchant POS were aligned with the team so the UI was not a mock on empty endpoints.",
        groups: [
          { title: "App", items: ["Google login", "Onboarding · document upload", "Home · map · search", "QR pay · order status"] },
          { title: "POS", items: ["QR receive", "Order handling", "Merchant onboarding"] },
          { title: "Backend", items: ["FastAPI", "Auth · merchants", "QR payment API"] },
          { title: "Stack", items: ["React Native · Expo", "TypeScript", "NestJS · FastAPI", "Next.js POS"] },
        ],
      },
      {
        type: "focusList",
        id: "flow",
        heading: "Flow",
        body: [
          "The app follows the Sunrin hackathon path. Login, then onboarding and document verify, then home / map / search, then QR and order status.",
          "The screens below are in that order. Flip through to go from verify to pay.",
        ],
        items: [
          { title: "Login · onboarding", desc: "Google login, then an identity check so benefits can open." },
          { title: "Document verify", desc: "Shoot income/job proof, confirm the photo, then continue." },
          { title: "Home · map · search", desc: "Balance, frequent stores, map pins, and recommended search in one app." },
          { title: "QR · order", desc: "Show a QR and count down. Once an order lands, the status screen takes over." },
        ],
      },
      { type: "gallery", slides: GALLERY, variant: "phone", showDots: true },
      {
        type: "product",
        heading: "Product",
        entries: [
          { label: "Home", body: "QR pay, available balance, categories, and frequent merchants on one screen. The shortest path to payment." },
          { label: "Map · search", body: "Pins on the map, recent queries and recommended stores in search. Location and category cut the list." },
          { label: "QR payment", body: "An in-person QR and an expiry timer in the center. When the merchant reads it, the order starts and status stays in the same app." },
        ],
      },
    ],
  },
};
