import type { CaseStudyCopy } from "@/features/case-study/model/types";

const GALLERY = [
  { src: "/images/seoul-bike/dashboard.png", alt: "Seoul bike accident dashboard" },
  { src: "/images/seoul-bike/map.jpg", alt: "Seoul bike accident map" },
  { src: "/images/seoul-bike/map-detail.jpg", alt: "Seoul bike map detail" },
  { src: "/images/seoul-bike/ai-insights.png", alt: "Seoul bike AI insights" },
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

export const SEOUL_BIKE_COPY: CaseStudyCopy = {
  ko: {
    slug: "seoul-bike",
    title: "Seoul Bike",
    nav: NAV.ko,
    summarize: {
      label: "요약",
      paragraphs: [
        "서울 자전거 도로는 늘어나는데 사고는 표만 봐서는 어디부터 손볼지 안 보입니다. TAAS 자전거 사고와 OSM 전용도로를 붙여, 전용도로 안팎·시간대·블랙스팟을 대시보드와 지도로 보여 줍니다.",
        "프론트는 Next.js 대시보드·지도·AI 인사이트입니다. 데이터는 파이썬으로 모아 좌표를 맞추고 도로에 붙인 뒤 인사이트 JSON으로 내보냅니다.",
        "질문은 세 가지입니다. 전용도로 안과 밖 어디가 더 위험한가, 사고는 같은 도로·시간에 반복되는가, 구별 사고와 전용도로는 어떤 관계인가.",
      ],
    },
    blocks: [
      {
        type: "hero",
        title: "Seoul Bike",
        year: "2025",
        intro: "표만 봐서는 안 보이는 위험을, 지도와 대시보드로 시각화합니다. 어느 도로부터 손봐야 하는지를 사고 지점과 전용도로 위에서 바로 볼 수 있게 했습니다.",
        tags: [
          { label: "프론트엔드", tip: "대시보드, MapLibre 지도, 기간 필터, 블랙스팟 표를 Next.js로 구현했습니다." },
          { label: "데이터 파이프라인", tip: "TAAS 수집 → 좌표·구·도로 매칭 → bike_accident_insights.json." },
          { label: "지도", tip: "사고 포인트와 전용도로 폴리곤을 같은 지도에 올렸습니다." },
          { label: "AI 인사이트", tip: "OpenRouter(Gemini)로 제공된 집계만 근거 삼아 개입 방향을 대화합니다." },
        ],
      },
      { type: "wideImage", src: "/images/work-seoul-access.png", alt: "Seoul Bike Accident Insights" },
      {
        type: "focusList",
        heading: "초점",
        body: [
          "어려운 건 사고 점을 찍는 일이 아닙니다. 전용도로 안과 밖을 가르고, 같은 도로에 반복되는 지점을 한 화면에 모으는 일입니다.",
          "핵심 질문: 어느 도로부터 손봐야 하는가. 표만으로는 그 답이 안 나옵니다.",
          "네 가지에 집중했습니다.",
        ],
        items: [
          { title: "전용도로 안팎", desc: "OSM 자전거 도로와 사고 지점을 매칭해, 전용도로 위와 밖의 위험 차이를 같은 지표로 비교합니다." },
          { title: "반복되는 블랙스팟", desc: "구·도로 단위로 건수·치사율·심각률을 묶어, 한 번 일어난 사고가 아니라 반복되는 구간을 앞에 둡니다." },
          { title: "시간대가 보이는 차트", desc: "요일×시간 히트맵, 계절·월, 상대 연령. 새벽과 출퇴근이 같은 ‘사고’로 묶이지 않게 했습니다." },
          { title: "데이터 위의 AI", desc: "채팅은 추측하지 않습니다. 대시보드에 올라온 집계만 넣고, 대형차·고령·교차로처럼 손댈 곳을 묻습니다." },
        ],
      },
      {
        type: "scopeList",
        heading: "범위",
        body: "화면과 데이터 파이프라인을 같이 만들었습니다. 프론트는 정적 JSON을 읽고, 백엔드는 매일 다시 돌릴 수 있는 스크립트입니다.",
        groups: [
          { title: "화면", items: ["구·기간 KPI 대시보드", "사고·전용도로 지도", "블랙스팟 순위", "AI 개입 채팅"] },
          { title: "파이프라인", items: ["TAAS 자전거 사고 수집", "좌표 변환과 구 매칭", "전용도로 폴리곤 생성", "인사이트 JSON 발행"] },
          { title: "프론트", items: ["Next.js App Router", "MapLibre 지도 레이어", "기간·구 필터", "차트와 히트맵"] },
          { title: "모델", items: ["OpenRouter · Gemini", "제공 집계만 근거", "개입 방향 대화", "참고 표와 같이 둠"] },
        ],
      },
      {
        type: "textSection",
        id: "pipeline",
        heading: "데이터 파이프라인",
        body: [
          "TAAS API에서 원본을 받고, 좌표를 맞춘 뒤 구와 도로에 붙입니다. 전용도로 폴리곤과 겹치면 인사이트 JSON이 됩니다.",
          "다이어그램은 영어입니다. Collect, Clean, Enrich, Publish. 노드를 누르면 펼쳐집니다.",
        ],
      },
      { type: "treeDiagram", id: "seoulPipelineTree" },
      {
        type: "textSection",
        id: "system",
        heading: "시스템",
        body: [
          "클라이언트는 세 화면입니다. 대시보드는 집계, 지도는 지점과 도로, AI 인사이트는 그 숫자로 개입을 이야기합니다.",
          "런타임 서버는 거의 없습니다. 파이썬이 JSON을 만들고 프론트가 읽습니다. LLM은 채팅 한 경로에만 붙어 있습니다. 다이어그램은 영어입니다. Clients, Pipeline, Data. 노드를 누르면 펼쳐집니다.",
        ],
      },
      { type: "treeDiagram", id: "seoulSystemTree" },
      {
        type: "product",
        heading: "제품",
        entries: [
          { label: "대시보드", body: "기간과 구를 고르면 KPI, 도로 유형, 시간·계절, 블랙스팟이 같이 바뀝니다. 전용도로 안팎 비교가 한 화면에 있습니다." },
          { label: "지도", body: "사고 포인트와 전용도로를 겹칩니다. 호버하면 구·도로·심각도가 나오고, 사이드 필터로 레이어를 켭니다." },
          { label: "AI 인사이트", body: "대형차 사망 비중, 고령 사고, 교차로, 전용도로 밖처럼 손을 대는 질문을 던집니다. 답은 올려 둔 표 안에서만 나옵니다." },
        ],
      },
      { type: "gallery", slides: GALLERY },
    ],
  },
  en: {
    slug: "seoul-bike",
    title: "Seoul Bike",
    nav: NAV.en,
    summarize: {
      label: "Summarize",
      paragraphs: [
        "Seoul keeps adding bike lanes, but a spreadsheet still will not tell you which road to fix first. The project joins TAAS bike-accident records with OSM dedicated lanes and shows on-lane vs off-lane risk, time patterns, and blackspots on a dashboard and a map.",
        "The frontend is a Next.js dashboard, map, and AI insight chat. Python collects the source data, fixes coordinates, matches districts and roads, then writes one insights JSON.",
        "Three questions: is it more dangerous on or off a dedicated lane, do the same roads and hours keep showing up, and how do district counts relate to lane coverage.",
      ],
    },
    blocks: [
      {
        type: "hero",
        title: "Seoul Bike",
        year: "2025",
        intro: "Risk that a table hides, shown on a map and a dashboard. The point is not another chart — it is seeing which road to touch first, on top of the actual crash points and bike lanes.",
        tags: [
          { label: "Frontend", tip: "Built the dashboard, MapLibre map, period filters, and blackspot table in Next.js." },
          { label: "Data pipeline", tip: "TAAS collect → coordinate and road match → bike_accident_insights.json." },
          { label: "Map", tip: "Accident points and dedicated-lane polygons sit on the same map." },
          { label: "AI insights", tip: "OpenRouter (Gemini) answers only from the aggregates already on the dashboard." },
        ],
      },
      { type: "wideImage", src: "/images/work-seoul-access.png", alt: "Seoul Bike Accident Insights" },
      {
        type: "focusList",
        heading: "Focus",
        body: [
          "Plotting crash dots is the easy part. Splitting on-lane from off-lane, then stacking the roads that keep repeating, is the actual work.",
          "The core question: which road do you fix first. A table will not answer that.",
          "I focused on four things:",
        ],
        items: [
          { title: "On-lane vs off-lane", desc: "OSM bike roads are matched to crash points so on-lane and off-lane risk use the same metrics." },
          { title: "Repeating blackspots", desc: "Counts, fatality, and severity roll up by district and road so the list is about recurrence, not one-off events." },
          { title: "Time that stays visible", desc: "Day×hour heatmap, season and month, opponent age. Dawn and commute do not collapse into one “accident” bucket." },
          { title: "AI on the data", desc: "Chat does not invent. It only sees the published aggregates, then you ask where to intervene — heavy vehicles, older riders, intersections." },
        ],
      },
      {
        type: "scopeList",
        heading: "Scope",
        body: "I built the interface and the data path together. The frontend reads static JSON. The backend is a set of scripts you can run again.",
        groups: [
          { title: "Interface", items: ["District and period KPI dashboard", "Crash and lane map", "Blackspot ranking", "AI intervention chat"] },
          { title: "Pipeline", items: ["TAAS bike-accident fetch", "Coordinate convert and district match", "Dedicated-lane polygons", "Insights JSON publish"] },
          { title: "Frontend", items: ["Next.js App Router", "MapLibre layers", "Period and district filters", "Charts and heatmap"] },
          { title: "Models", items: ["OpenRouter · Gemini", "Only provided aggregates", "Intervention dialogue", "Sits next to a reference table"] },
        ],
      },
      {
        type: "textSection",
        id: "pipeline",
        heading: "Data pipeline",
        body: [
          "Raw records come from the TAAS API, coordinates get fixed, then each crash is attached to a district and a road. Overlap with dedicated-lane polygons becomes the insights JSON.",
          "The diagram stays in English. Collect, Clean, Enrich, Publish. Click a node to expand.",
        ],
      },
      { type: "treeDiagram", id: "seoulPipelineTree" },
      {
        type: "textSection",
        id: "system",
        heading: "System",
        body: [
          "Three client surfaces. The dashboard owns aggregates, the map owns points and lanes, AI insights talk about intervention using those numbers.",
          "Almost no runtime server. Python writes JSON; the frontend reads it. The LLM sits on the chat path only.",
        ],
      },
      { type: "treeDiagram", id: "seoulSystemTree" },
      {
        type: "product",
        heading: "Product",
        entries: [
          { label: "Dashboard", body: "Pick a period and a district and KPI, road type, time and season, and blackspots update together. On-lane vs off-lane sits on the same screen." },
          { label: "Map", body: "Crash points overlay dedicated lanes. Hover shows district, road, and severity. Sidebar filters turn layers on." },
          { label: "AI insights", body: "You ask about heavy-vehicle deaths, older riders, intersections, or off-lane crashes. Answers stay inside the tables already loaded." },
        ],
      },
      { type: "gallery", slides: GALLERY },
    ],
  },
};
