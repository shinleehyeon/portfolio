import type { CaseStudyCopy } from "@/features/case-study/model/types";

const GALLERY = [
  { src: "/images/fresio/demo.mp4", alt: "Fresio demo", poster: "/images/fresio/demo-poster.jpg", fit: "phone" as const },
  { src: "/images/fresio/onboard-alert.jpg", alt: "온보딩 · 유통기한 알림", fit: "phone" as const },
  { src: "/images/fresio/onboard-recipe.jpg", alt: "온보딩 · 레시피 추천", fit: "phone" as const },
  { src: "/images/fresio/onboard-timer.jpg", alt: "온보딩 · 요리 타이머", fit: "phone" as const },
  { src: "/images/fresio/diet.jpg", alt: "식단 선택", fit: "phone" as const },
  { src: "/images/fresio/onboard-wifi.jpg", alt: "카메라 Wi-Fi 연결", fit: "phone" as const },
  { src: "/images/fresio/home-app.jpg", alt: "앱 홈", fit: "phone" as const },
  { src: "/images/fresio/recipe-detail.jpg", alt: "레시피 상세", fit: "phone" as const },
  { src: "/images/fresio/timer-steps.jpg", alt: "타이머 단계", fit: "phone" as const },
  { src: "/images/fresio/settings.jpg", alt: "설정", fit: "phone" as const },
  { src: "/images/fresio/wifi-connecting.jpg", alt: "인터넷 연결", fit: "web" as const },
  { src: "/images/fresio/home-hw.jpg", alt: "기기 메인", fit: "web" as const },
  { src: "/images/fresio/home-hw-ai.jpg", alt: "기기 메인 · 음성", fit: "web" as const },
  { src: "/images/fresio/recipe.jpg", alt: "레시피 응답", fit: "web" as const },
  { src: "/images/fresio/timer.jpg", alt: "요리 타이머", fit: "web" as const },
  { src: "/images/fresio/timer-ai.jpg", alt: "타이머 · 음성", fit: "web" as const },
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

export const FRESIO_COPY: CaseStudyCopy = {
  ko: {
    slug: "fresio",
    title: "Fresio",
    nav: NAV.ko,
    summarize: {
      label: "요약",
      paragraphs: [
        "Fresio는 냉장고에 붙인 디스플레이와 앱을 잇는 식자재 어시스턴트입니다. 바코드·사진으로 넣고, 유통기한을 보고, 남은 재료로 레시피를 받습니다.",
        "앱은 React Native, 기기 화면은 React, 서버는 FastAPI입니다. BLE로 찾고 Wi-Fi를 넘긴 뒤 기기와 계정을 묶습니다.",
        "SW 동행 해커톤 창의재단이사장상입니다. 질문은 하나입니다. 냉장고 앞에서 앱을 여러 개 열지 않고, 재료부터 타이머까지 끝낼 수 있는가.",
      ],
    },
    blocks: [
      {
        type: "hero",
        title: "Fresio",
        year: "2024",
        intro: "냉장고를 열 때마다 유통기한을 찾지 않습니다. Fresio는 재료를 등록하고, 만료를 알려 주고, 남은 것으로 레시피와 타이머를 기기 화면에 띄웁니다.",
        tags: [
          { label: "앱 · 연동", tip: "온보딩부터 기기 페어링, 홈, 설정까지 앱 흐름을 맡았습니다." },
          { label: "React Native", tip: "Expo 앱. 구글 로그인, 식단, 카메라 Wi-Fi, 냉장고 홈을 구현했습니다." },
          { label: "IoT", tip: "BLE 스캔 후 FRESIO-CAMERA Wi-Fi로 넘기고, 인증 코드로 기기를 묶습니다." },
          { label: "이사장상", tip: "SW 동행 해커톤 창의재단이사장상." },
        ],
      },
      { type: "wideImage", src: "/images/fresio/cover.jpg", alt: "Fresio" },
      {
        type: "focusList",
        heading: "초점",
        body: [
          "어려운 건 냉장고 사진을 찍는 일이 아닙니다. 앱과 기기 화면이 같은 재료·같은 타이머를 보게 잇는 일입니다.",
          "핵심 질문: 냉장고 앞에서, 다른 앱으로 나가지 않고 등록부터 요리까지 끝낼 수 있는가.",
          "네 가지에 집중했습니다.",
        ],
        items: [
          { title: "페어링이 먼저", desc: "QR로 앱을 받고, FRESIO-CAMERA Wi-Fi를 고르고, 인증 코드로 기기를 묶습니다. 연결 전에는 홈이 비어 있지 않게 온보딩이 안내합니다." },
          { title: "만료가 홈에", desc: "앱 홈은 오늘까지인 재료를 먼저 보여 줍니다. 기기 메인은 지남·곧 끝남을 카드로 띄웁니다." },
          { title: "남은 걸로 요리", desc: "식단을 고르면 추천이 바뀝니다. 음성으로 만료 음식을 묻고, 레시피 답이 기기 화면에 남습니다." },
          { title: "타이머가 기기에서", desc: "재료별 시작 시간을 계산한 타이머가 냉장고 화면에 크게 있습니다. 손은 요리에, 화면은 다음에 뭘 할지에 있습니다." },
        ],
      },
      {
        type: "scopeList",
        heading: "범위",
        body: "앱 흐름과 기기 연동을 맡았습니다. FastAPI와 디스플레이가 같은 재료·타이머를 보게 맞춰, UI가 빈 목업이 아니게 했습니다.",
        groups: [
          { title: "앱", items: ["구글 로그인 · 온보딩", "식단 선택", "카메라 Wi-Fi", "홈 · 냉장고 · 타이머 · 설정"] },
          { title: "기기", items: ["부팅 QR · 인증 코드", "메인 대시보드", "레시피 응답", "요리 타이머"] },
          { title: "백엔드", items: ["FastAPI", "JWT · Google OAuth", "재료 · 레시피 · 타이머"] },
          { title: "스택", items: ["React Native · Expo", "React · Vite 디스플레이", "PostgreSQL · Redis · S3"] },
        ],
      },
      {
        type: "focusList",
        id: "flow",
        heading: "흐름",
        body: [
          "앱 흐름은 해커톤에서 짠 그대로입니다. 로그인과 식단 다음이 기기 페어링이고, 그다음이 재료와 만료, 마지막이 레시피와 타이머입니다.",
          "영상부터 시작합니다. 화살표로 넘기면 온보딩부터 기기 화면까지 이어집니다.",
        ],
        items: [
          { title: "로그인 · 식단", desc: "유통기한 알림, 맞춤 레시피, 요리 타이머를 보여 준 뒤 구글로 들어갑니다. 식단을 고르면 추천이 열립니다." },
          { title: "BLE · Wi-Fi · 등록", desc: "FRESIO-CAMERA Wi-Fi를 고르고, 기기는 QR과 인증 코드로 앱을 받습니다. 인터넷이 붙으면 계정에 묶입니다." },
          { title: "재료 · 만료", desc: "바코드·사진으로 넣고, 앱 홈과 기기 메인이 오늘까지·곧 끝남을 같이 봅니다." },
          { title: "레시피 · 타이머", desc: "남은 재료로 답을 주고, 재료별 시작 시간을 타이머로 띄웁니다. 음성으로 멈추고 다시 시작합니다." },
        ],
      },
      { type: "gallery", slides: GALLERY, showDots: true },
      {
        type: "product",
        heading: "제품",
        entries: [
          { label: "앱 홈", body: "연결 상태, 오늘까지인 재료, 카테고리, 저녁 추천이 한 화면에 있습니다. 냉장고와 타이머는 아래 탭입니다." },
          { label: "기기 메인", body: "시계와 만료 카드, 추천 레시피가 냉장고 앞에 있습니다. 음성으로 만료 음식을 물으면 같은 화면이 답합니다." },
          { label: "타이머 · 설정", body: "현재·다음 단계와 큰 카운트다운이 기기 화면을 채웁니다. 설정에서 카메라·디바이스 연결과 식단을 다시 고릅니다." },
        ],
      },
    ],
  },
  en: {
    slug: "fresio",
    title: "Fresio",
    nav: NAV.en,
    summarize: {
      label: "Summarize",
      paragraphs: [
        "Fresio is a fridge assistant that ties a display on the door to a phone app. You add food by barcode or photo, watch expiry, and get recipes from what is left.",
        "The app is React Native, the display is React, the server is FastAPI. Scan over BLE, pass Wi-Fi, then bind the device to the account.",
        "Chairman's Award at the SW Donghang Hackathon. One question: can you finish from pantry to timer at the fridge without opening three other apps.",
      ],
    },
    blocks: [
      {
        type: "hero",
        title: "Fresio",
        year: "2024",
        intro: "You should not hunt expiry dates every time the door opens. Fresio registers what is inside, flags what is ending, and puts a recipe and a timer on the fridge screen.",
        tags: [
          { label: "App · pairing", tip: "I owned the app flow: onboarding, device pairing, home, settings." },
          { label: "React Native", tip: "Expo app. Google login, diet pick, camera Wi-Fi, fridge home." },
          { label: "IoT", tip: "BLE scan, then a FRESIO-CAMERA Wi-Fi hop, then an auth code to bind the device." },
          { label: "Chairman's Award", tip: "Chairman's Award, SW Donghang Hackathon." },
        ],
      },
      { type: "wideImage", src: "/images/fresio/cover.jpg", alt: "Fresio" },
      {
        type: "focusList",
        heading: "Focus",
        body: [
          "The hard part is not a fridge photo. It is making the phone and the door display see the same food and the same timer.",
          "The core question: can someone at the fridge finish register-to-cook without leaving for another app.",
          "I focused on four things.",
        ],
        items: [
          { title: "Pair first", desc: "QR to install, pick FRESIO-CAMERA Wi-Fi, bind with an auth code. Onboarding explains the link before home is empty." },
          { title: "Expiry on home", desc: "The app home leads with food due today. The device home shows expired and ending-soon cards." },
          { title: "Cook what is left", desc: "A diet pick changes the recs. Ask by voice what is ending; the recipe answer stays on the display." },
          { title: "Timer on the door", desc: "A per-ingredient start timer sits large on the fridge screen. Hands stay on the food. The screen says what is next." },
        ],
      },
      {
        type: "scopeList",
        heading: "Scope",
        body: "I owned the app flow and device pairing. FastAPI and the display were aligned so the UI was not a mock on empty food and empty timers.",
        groups: [
          { title: "App", items: ["Google login · onboarding", "Diet pick", "Camera Wi-Fi", "Home · fridge · timer · settings"] },
          { title: "Device", items: ["Boot QR · auth code", "Home dashboard", "Recipe answer", "Cook timer"] },
          { title: "Backend", items: ["FastAPI", "JWT · Google OAuth", "Food · recipes · timers"] },
          { title: "Stack", items: ["React Native · Expo", "React · Vite display", "PostgreSQL · Redis · S3"] },
        ],
      },
      {
        type: "focusList",
        id: "flow",
        heading: "Flow",
        body: [
          "The path is the hackathon path. Login and diet, then pair the device, then food and expiry, then recipe and timer.",
          "The video is first. Flip through to go from onboarding to the door display.",
        ],
        items: [
          { title: "Login · diet", desc: "Show expiry alerts, personal recipes, and a cook timer, then Google login. A diet pick opens recommendations." },
          { title: "BLE · Wi-Fi · bind", desc: "Pick FRESIO-CAMERA Wi-Fi. The device shows a QR and an auth code. Once the net is up, it binds to the account." },
          { title: "Food · expiry", desc: "Add by barcode or photo. App home and device home share due-today and ending-soon." },
          { title: "Recipe · timer", desc: "Answer with what is left. Put per-ingredient start times on a timer. Voice can stop and start it." },
        ],
      },
      { type: "gallery", slides: GALLERY, showDots: true },
      {
        type: "product",
        heading: "Product",
        entries: [
          { label: "App home", body: "Connection state, food due today, categories, and an evening rec on one screen. Fridge and timer live in the tabs below." },
          { label: "Device home", body: "A clock, expiry cards, and a recommended dish sit on the door. Ask by voice what is ending and the same screen answers." },
          { label: "Timer · settings", body: "Current and next steps plus a large countdown fill the display. Settings reconnects camera and device and lets you change diet." },
        ],
      },
    ],
  },
};
