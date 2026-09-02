import type { CaseStudyCopy } from "@/features/case-study/model/types";

const PHONES = [
  { src: "/images/savequest/home.jpg", alt: "SaveQuest home", fit: "phone" as const },
  { src: "/images/savequest/ranking.jpg", alt: "SaveQuest challenge and ranking", fit: "phone" as const },
  { src: "/images/savequest/shop.jpg", alt: "SaveQuest shop", fit: "phone" as const },
];

const GALLERY = [
  { src: "/images/savequest/demo.mp4", alt: "SaveQuest demo", poster: "/images/savequest/home.jpg", fit: "phone" as const },
  ...PHONES,
  { src: "/images/savequest/challenge.jpg", alt: "SaveQuest challenge states", fit: "web" as const },
  { src: "/images/savequest/overview.jpg", alt: "SaveQuest service overview", fit: "web" as const },
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

export const SAVEQUEST_COPY: CaseStudyCopy = {
  ko: {
    slug: "savequest",
    title: "SaveQuest",
    nav: NAV.ko,
    summarize: {
      label: "요약",
      paragraphs: [
        "SaveQuest는 절약을 일일 퀘스트로 바꿉니다. 카드 결제 내역을 가맹점별로 읽고, 한도 도전과제를 만든 뒤 안전·위험·실패로 보여 줍니다.",
        "성공하면 XP와 코인을 받고, 줄인 금액은 랭킹에 올라갑니다. 코인으로는 캐릭터·펫·배경을 삽니다.",
        "학생 설문에서 74.2%가 절약의 중요성을 알면서도 실천하지 못했다고 답했습니다. 부족한 건 정보가 아니라 동기입니다.",
      ],
    },
    blocks: [
      {
        type: "hero",
        title: "SaveQuest",
        year: "2025",
        intro: "절약이 필요한 건 아는데, 동기가 없어서 멈춥니다. SaveQuest는 결제 내역으로 도전과제를 만들고, 오늘 쓴 돈을 퀘스트 진행으로 보여 줍니다. 보상과 캐릭터가 다음 날을 다시 열게 합니다.",
        tags: [
          { label: "프론트엔드", tip: "홈 피드, 도전과제, 랭킹, 쇼핑 UI를 구현했습니다." },
          { label: "결제 파이프라인", tip: "카드 결제 → 가맹점 매칭 → 한도 판정 → 상태·보상." },
          { label: "챌린지 엔진", tip: "선택한 가맹점 한도에 가까워질수록 초록·주황·빨강으로 바뀝니다." },
          { label: "게이미피케이션", tip: "일일 도전, XP·코인, 레벨, 캐릭터 상점이 한 앱에 있습니다." },
          { label: "학생 타겟", tip: "재미있는 걸 좋아하고 절약이 필요한 학생, 동기가 부족한 사람." },
        ],
      },
      { type: "phones", images: PHONES },
      {
        type: "focusList",
        heading: "초점",
        body: [
          "어려운 건 가계부를 보여주는 일이 아닙니다. 오늘 쓴 돈을 실패가 아니라 퀘스트로 읽히게 만드는 일입니다.",
          "핵심 질문: 결제를 어떻게 하면 끝까지 하는 하루 도전으로 바꿀 수 있을까?",
          "네 가지에 집중했습니다.",
        ],
        items: [
          { title: "결제가 퀘스트가 되게", desc: "편의점 4,000원 이하처럼 가맹점과 한도를 고릅니다. 오늘 쓴 금액이 진행 바가 됩니다." },
          { title: "안전 · 위험 · 실패", desc: "한도에 가까워질수록 초록, 주황, 빨강. 위험일 때 알림이 가서 끊을 기회를 줍니다." },
          { title: "한곳에서 머물게", desc: "홈, 챌린지, 쇼핑, 내 정보가 같은 앱에 있습니다. 가계부 앱과 보상 앱을 오가지 않습니다." },
          { title: "매일 돌아가는 보상", desc: "성공하면 XP와 코인. 줄인 금액은 랭킹에 쌓입니다. 다음 날 퀘스트가 다시 열립니다." },
        ],
      },
      {
        type: "scopeList",
        heading: "구성",
        groups: [
          { title: "화면", items: ["홈 요약과 일일 도전", "챌린지와 랭킹", "캐릭터 상점", "알림과 설정"] },
          { title: "파이프라인", items: ["카드 결제 수집", "가맹점 매칭", "한도 대비 사용액", "상태·보상 발행"] },
          { title: "규칙", items: ["일일·기간 한도", "안전 / 위험 / 실패", "XP와 코인", "패널티"] },
          { title: "상점", items: ["캐릭터", "펫", "배경", "랜덤박스"] },
        ],
      },
      {
        type: "textSection",
        id: "pipeline",
        heading: "결제 파이프라인",
        body: [
          "결제가 들어오면 가맹점을 고르고, 한도와 비교한 뒤 상태를 붙입니다. 보상은 그 다음입니다.",
          "다이어그램은 영어입니다. Collect, Match, Judge, Reward. 노드를 누르면 펼쳐집니다.",
        ],
      },
      { type: "treeDiagram", id: "savequestPipelineTree" },
      {
        type: "textSection",
        id: "system",
        heading: "시스템",
        body: [
          "클라이언트는 홈·챌린지·쇼핑·프로필입니다. 서버는 결제 수집, 챌린지 판정, 보상·상점, 랭킹을 맡습니다.",
          "결제 원본과 유저 상태는 나눕니다. 모델이나 외부 카드 API는 가장자리에 두고, 매 화면 한가운데에 두지 않았습니다.",
        ],
      },
      { type: "treeDiagram", id: "savequestSystemTree" },
      {
        type: "product",
        heading: "제품",
        entries: [
          { label: "홈", body: "이번 달 아낀 금액과 레벨이 위에 있습니다. 아래는 오늘 도전과제입니다. 쓴 금액과 목표 금액이 바로 보입니다." },
          { label: "챌린지 · 랭킹", body: "한 달 평균 소비를 줄이는 미션과 순위를 같이 봅니다. 줄인 금액이 랭킹 단위입니다." },
          { label: "쇼핑", body: "모은 코인으로 캐릭터를 삽니다. 레벨과 꾸미기가 다음 도전을 열 이유가 됩니다." },
        ],
      },
      { type: "gallery", slides: GALLERY, variant: "phone", showDots: true },
    ],
  },
  en: {
    slug: "savequest",
    title: "SaveQuest",
    nav: NAV.en,
    summarize: {
      label: "Summarize",
      paragraphs: [
        "SaveQuest turns saving into a daily quest. Card payments are read by merchant, turned into spend-limit challenges, then shown as safe, danger, or fail.",
        "Hit the limit and you get XP and coins. Money you did not spend goes on a ranking. Coins buy characters, pets, and backgrounds.",
        "In a student survey, 74.2% said they knew saving mattered and still did not do it. The missing piece is motivation, not information.",
      ],
    },
    blocks: [
      {
        type: "hero",
        title: "SaveQuest",
        year: "2025",
        intro: "People know they should save. They stop because nothing pulls them back tomorrow. SaveQuest turns payment history into challenges and shows today’s spend as a quest bar. Rewards and characters are why the app opens again.",
        tags: [
          { label: "Frontend", tip: "Built the home feed, challenges, ranking, and shop UI." },
          { label: "Payment pipeline", tip: "Card charge → merchant match → limit check → status and reward." },
          { label: "Challenge engine", tip: "As spend nears the chosen merchant cap, the bar goes green, orange, then red." },
          { label: "Gamification", tip: "Daily quests, XP and coins, levels, and a character shop live in one app." },
          { label: "Student target", tip: "Students who like games and need to save, and anyone short on motivation." },
        ],
      },
      { type: "phones", images: PHONES },
      {
        type: "focusList",
        heading: "Focus",
        body: [
          "The hard part is not a ledger. It is making today’s spend read as a quest instead of a failure.",
          "The core question: how do you take a payment and turn it into a daily challenge someone finishes?",
          "I focused on four things:",
        ],
        items: [
          { title: "Payments become quests", desc: "Pick a merchant and a cap — under ₩4,000 at a convenience store. Today’s spend is the progress bar." },
          { title: "Safe · danger · fail", desc: "Green, orange, red as you near the cap. A warning fires on danger so there is still time to stop." },
          { title: "One place to stay", desc: "Home, challenge, shop, and profile live in the same app. No bounce between a ledger and a reward app." },
          { title: "A reward that can run daily", desc: "Success pays XP and coins. Money saved stacks on a ranking. Tomorrow’s quest opens again." },
        ],
      },
      {
        type: "scopeList",
        heading: "Breakdown",
        groups: [
          { title: "Interface", items: ["Home summary and daily quests", "Challenges and ranking", "Character shop", "Alerts and settings"] },
          { title: "Pipeline", items: ["Card payment ingest", "Merchant match", "Spend vs cap", "Status and reward"] },
          { title: "Rules", items: ["Daily and period caps", "Safe / danger / fail", "XP and coins", "Penalties"] },
          { title: "Shop", items: ["Characters", "Pets", "Backgrounds", "Random boxes"] },
        ],
      },
      {
        type: "textSection",
        id: "pipeline",
        heading: "Payment pipeline",
        body: [
          "A charge comes in, the merchant is matched, the cap is checked, then a status is attached. The reward is last.",
          "The diagram stays in English. Collect, Match, Judge, Reward. Click a node to expand.",
        ],
      },
      { type: "treeDiagram", id: "savequestPipelineTree" },
      {
        type: "textSection",
        id: "system",
        heading: "System",
        body: [
          "Clients are home, challenge, shop, and profile. The server owns payment ingest, challenge judgment, rewards and shop, and ranking.",
          "Raw payments and user state are split. Card APIs sit at the edge of the graph, not in the middle of every screen.",
        ],
      },
      { type: "treeDiagram", id: "savequestSystemTree" },
      {
        type: "product",
        heading: "Product",
        entries: [
          { label: "Home", body: "This month’s savings and level sit on top. Daily challenges sit below. Spend versus target is visible without extra taps." },
          { label: "Challenge · ranking", body: "A month-long “cut your average spend” mission sits next to a leaderboard. The unit is money you did not spend." },
          { label: "Shop", body: "Coins buy characters. Level and cosmetics are the reason the next challenge is worth opening." },
        ],
      },
      { type: "gallery", slides: GALLERY, variant: "phone", showDots: true },
    ],
  },
};
