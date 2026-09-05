import type { TreeNode } from "@/features/case-study/model/types";

export const SCHOLUB_PIPELINE: TreeNode = {
  label: "Paper",
  children: [
    { label: "Collect", children: [{ label: "arXiv metadata" }, { label: "PDF extract" }] },
    { label: "Filter", children: [{ label: "Reviewer (OpenAI)" }, { label: "User activity" }] },
    { label: "Enrich", children: [{ label: "Summary / translate" }, { label: "Tags" }, { label: "Thumbnail (Gemini)" }] },
    { label: "Publish", children: [{ label: "S3 + Postgres" }, { label: "Feed / recommend" }] },
  ],
};

export const SCHOLUB_SYSTEM: TreeNode = {
  label: "Scholub",
  children: [
    {
      label: "Clients",
      children: [
        { label: "Frontend", children: [{ label: "Paper feed" }, { label: "AI search" }, { label: "Discussion" }, { label: "Profile" }] },
        { label: "Crawler", children: [{ label: "arXiv fetch" }, { label: "PDF download" }, { label: "Reviewer pass" }] },
      ],
    },
    {
      label: "Servers",
      children: [
        { label: "NestJS API", children: [{ label: "Auth / users" }, { label: "Papers" }, { label: "Discussions" }, { label: "Notifications" }] },
        { label: "FastAPI LLM", children: [{ label: "Search papers" }, { label: "Summarize" }, { label: "Sub-agent" }] },
      ],
    },
    {
      label: "Infra",
      children: [
        { label: "Postgres" },
        { label: "S3" },
        { label: "Redis" },
        { label: "Models", children: [{ label: "Perplexity" }, { label: "Gemini" }, { label: "OpenAI" }] },
      ],
    },
  ],
};

export const SEOUL_PIPELINE: TreeNode = {
  label: "Accident",
  children: [
    { label: "Collect", children: [{ label: "TAAS bike accidents" }, { label: "OSM bike roads" }] },
    { label: "Clean", children: [{ label: "Coord convert" }, { label: "District / road match" }] },
    { label: "Enrich", children: [{ label: "On / off lane" }, { label: "Time / season" }, { label: "Blackspots" }] },
    { label: "Publish", children: [{ label: "insights JSON" }, { label: "Dashboard / map" }] },
  ],
};

export const SEOUL_SYSTEM: TreeNode = {
  label: "Seoul Bike",
  children: [
    {
      label: "Clients",
      children: [
        { label: "Dashboard", children: [{ label: "KPI" }, { label: "Charts" }, { label: "Period filter" }] },
        { label: "Map", children: [{ label: "Accident points" }, { label: "Dedicated lanes" }, { label: "District layer" }] },
        { label: "AI insights", children: [{ label: "Intervention chat" }, { label: "Reference table" }] },
      ],
    },
    {
      label: "Pipeline",
      children: [
        { label: "Python", children: [{ label: "TAAS fetch" }, { label: "Coord clean" }, { label: "Road match" }, { label: "Insights JSON" }] },
      ],
    },
    {
      label: "Data · models",
      children: [{ label: "Static JSON" }, { label: "OpenRouter", children: [{ label: "Gemini 3 Flash" }] }],
    },
  ],
};

export const SLOP_PIPELINE: TreeNode = {
  label: "Article",
  children: [
    { label: "Parse", children: [{ label: "Page DOM / JSON" }, { label: "Text selection" }] },
    { label: "Generate", children: [{ label: "Summary / script" }, { label: "Shorts render" }] },
    { label: "Publish", children: [{ label: "S3 asset" }, { label: "Reels / panel" }] },
  ],
};

export const SLOP_SYSTEM: TreeNode = {
  label: "SLOP",
  children: [
    {
      label: "Clients",
      children: [
        { label: "Extension", children: [{ label: "Floating button" }, { label: "Parse" }, { label: "Shorts panel" }, { label: "Inline rewrite" }] },
        { label: "Web", children: [{ label: "Onboarding" }, { label: "Reels" }, { label: "Search" }, { label: "Profile" }] },
      ],
    },
    {
      label: "Server",
      children: [{ label: "NestJS", children: [{ label: "Auth" }, { label: "Shorts" }, { label: "Files" }, { label: "Search" }] }],
    },
    {
      label: "Infra",
      children: [{ label: "Prisma" }, { label: "S3" }, { label: "Redis" }, { label: "Meilisearch" }, { label: "OpenRouter" }],
    },
  ],
};

export const SAVEQUEST_PIPELINE: TreeNode = {
  label: "Payment",
  children: [
    { label: "Collect", children: [{ label: "Card charges" }, { label: "Merchant id" }] },
    { label: "Match", children: [{ label: "Category / store" }, { label: "User challenge" }] },
    { label: "Judge", children: [{ label: "Spend vs cap" }, { label: "Safe / danger / fail" }] },
    { label: "Reward", children: [{ label: "XP + coins" }, { label: "Ranking / shop" }] },
  ],
};

export const SAVEQUEST_SYSTEM: TreeNode = {
  label: "SaveQuest",
  children: [
    {
      label: "Clients",
      children: [{ label: "App", children: [{ label: "Home" }, { label: "Challenge" }, { label: "Shop" }, { label: "Profile" }] }],
    },
    {
      label: "Server",
      children: [
        { label: "Ingest", children: [{ label: "Payments" }, { label: "Merchants" }] },
        { label: "Engine", children: [{ label: "Limits" }, { label: "Status" }, { label: "Alerts" }] },
        { label: "Rewards", children: [{ label: "XP / coins" }, { label: "Ranking" }, { label: "Shop" }] },
      ],
    },
    { label: "Infra", children: [{ label: "User state" }, { label: "Payment log" }, { label: "Assets" }] },
  ],
};
