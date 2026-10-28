import type { FileTreeItem } from "@/features/case-study/model/types";

export const SCHOLUB_REPO: FileTreeItem[] = [
  { name: "README.md", note: "architecture overview" },
  {
    name: "frontend/",
    note: "Next.js — feed, search, discussion",
    children: [
      { name: "src/app/", note: "App Router" },
      { name: "src/pages/", note: "paper / profile screens" },
      { name: "src/widgets/", note: "composed UI" },
      { name: "src/entities/", note: "paper / user models" },
      { name: "src/shared/", note: "ui, api, lib" },
    ],
  },
  {
    name: "backend/",
    note: "NestJS monorepo",
    children: [
      { name: "packages/api/", note: "auth, papers, discussions" },
      { name: "packages/database/", note: "Prisma" },
    ],
  },
  { name: "crawler/", note: "arXiv fetch + reviewer prompts" },
  { name: "llm-server/", note: "FastAPI search / summarize" },
  { name: "docs/", note: "architecture notes" },
];

export const SAVEQUEST_REPO: FileTreeItem[] = [
  { name: "README.md", note: "monorepo map" },
  {
    name: "frontend/",
    note: "React Native app",
    children: [
      { name: "screens/", note: "home, challenge, shop" },
      { name: "components/", note: "shared UI" },
      { name: "lib/scraping/", note: "embedded scraping" },
      { name: "stores/", note: "client state" },
    ],
  },
  {
    name: "sq-backend/",
    note: "NestJS — quest, shop, mileage",
    children: [
      { name: "src/modules/", note: "auth, challenge, inventory, quest, shop, user" },
    ],
  },
  { name: "sq-backend-aspnet/", note: "earlier ASP.NET backend" },
  { name: "sq-rn-scraping/", note: "issuer clients" },
  { name: "sq-scraping-python/", note: "python scrapers" },
  { name: "kbpay-expo/", note: "KB Pay expo shell" },
];

export const SLOP_REPO: FileTreeItem[] = [
  { name: "README.md", note: "extension + API + web" },
  {
    name: "extension/",
    note: "Plasmo Chrome extension",
    children: [
      { name: "contents/", note: "page scripts" },
      { name: "components/", note: "popup UI" },
      { name: "lib/", note: "summarize / shorts" },
    ],
  },
  {
    name: "backend/",
    note: "NestJS + Prisma",
    children: [
      { name: "src/modules/", note: "shorts, text-summaries, search, auth" },
      { name: "prisma/", note: "schema + migrations" },
    ],
  },
  { name: "web/", note: "Next.js landing / app" },
  { name: "docs/", note: "product notes" },
];

export const FRESIO_REPO: FileTreeItem[] = [
  { name: "README.md", note: "fridge app + door display" },
  {
    name: "apps/",
    children: [
      {
        name: "fresio/",
        note: "Expo app",
        children: [
          { name: "app/", note: "home, onboard, recipe, timer" },
          { name: "components/", note: "food, home, timer" },
          { name: "state/", note: "client state" },
        ],
      },
      {
        name: "fresio-hw/",
        note: "door display",
        children: [
          { name: "src/pages/", note: "booting, main" },
          { name: "src/components/", note: "display UI" },
          { name: "src/feature/", note: "timer, fetch" },
        ],
      },
      {
        name: "fresio-backend/",
        note: "API",
        children: [
          { name: "app/home/", note: "home endpoints" },
          { name: "app/recipe/", note: "recipes" },
          { name: "app/refrigerator/", note: "expiry / items" },
          { name: "app/timer/", note: "cook timer" },
          { name: "app/auth/", note: "JWT" },
        ],
      },
    ],
  },
  { name: "docs/", note: "flow notes" },
];

export const SEOUL_REPO: FileTreeItem[] = [
  { name: "README.md", note: "accident dashboard" },
  {
    name: "frontend/",
    note: "Next.js dashboard + map",
    children: [
      { name: "app/map/", note: "accident / lane map" },
      { name: "app/intervention/", note: "AI insights chat" },
      { name: "components/kpi/", note: "KPI cards" },
      { name: "components/charts/", note: "period charts" },
    ],
  },
  { name: "backend/", note: "Python — TAAS fetch, clean, insights JSON" },
  { name: "data/", note: "raw / processed accident + roads" },
  { name: "docs/", note: "slides + charts" },
];

export const SIPSIILBAN_REPO: FileTreeItem[] = [
  {
    name: "pos/",
    note: "Expo POS — tabs, onboard, order",
    children: [
      { name: "app/(tabs)/", note: "home screens" },
      { name: "components/Order/", note: "order flow" },
      { name: "components/organisms/", note: "composed UI" },
    ],
  },
  {
    name: "backend/",
    note: "FastAPI — donate, identify, payment",
    children: [
      { name: "app/auth/", note: "JWT" },
      { name: "app/donate/", note: "donations" },
      { name: "app/identify/", note: "verify" },
      { name: "app/merchant/", note: "stores" },
      { name: "app/payment/", note: "checkout" },
    ],
  },
];

export const PETCLINIC_REPO: FileTreeItem[] = [
  {
    name: "petclinic_btc/",
    note: "Spring PetClinic WAR",
    children: [
      { name: "src/main/java/", note: "owners, vets, visits" },
      { name: "src/main/webapp/", note: "JSP views" },
      { name: "web-static/", note: "legacy assets" },
    ],
  },
  {
    name: "petclinic-terraform/",
    note: "3-tier AWS as code",
    children: [
      { name: "modules/network/", note: "VPC" },
      { name: "modules/edge/", note: "CloudFront + WAF" },
      { name: "modules/compute/", note: "ASG / WAS" },
      { name: "modules/database/", note: "RDS Multi-AZ" },
      { name: "modules/dns/", note: "Route 53" },
      { name: "modules/iam/", note: "roles / groups" },
      { name: "modules/cicd/", note: "pipeline" },
      { name: "modules/observability/", note: "alarms" },
      { name: "modules/security/", note: "GuardDuty" },
    ],
  },
];
