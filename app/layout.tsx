import type { Metadata } from "next";
import { GoogleAnalytics } from "@next/third-parties/google";
import { SitePlayer } from "@/features/player";
import { DotCursor } from "@/shared/ui/DotCursor";
import { OpenReplayTracker } from "@/shared/ui/OpenReplayTracker";
import { SITE_URL, SITE_NAME } from "@/shared/lib/site-url";
import "@/shared/styles/index.css";
import "./globals.css";

const DESCRIPTION =
  "신이현(Leehyeon Shin)의 포트폴리오. 프론트엔드 개발자로 Scholub, SaveQuest, SLOP, 십시일반 등 해커톤 수상작과 실서비스를 만듭니다.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: `%s — ${SITE_NAME}`,
  },
  description: DESCRIPTION,
  keywords: [
    "신이현",
    "Leehyeon Shin",
    "프론트엔드 개발자",
    "Frontend Developer",
    "포트폴리오",
    "Portfolio",
    "Next.js",
    "React",
    "해커톤",
  ],
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "48x48" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: SITE_NAME,
    description: DESCRIPTION,
    locale: "ko_KR",
    images: [{ url: "/images/about-hero.png", width: 1200, height: 630, alt: SITE_NAME }],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: DESCRIPTION,
    images: ["/images/about-hero.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: {
    canonical: "/",
  },
};

const JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      name: SITE_NAME,
      url: SITE_URL,
      jobTitle: "Frontend Developer",
      sameAs: [
        "https://github.com/shinleehyeon",
        "https://linkedin.com/in/shinleehyeon",
        "https://instagram.com/hyun._.s08",
      ],
    },
    {
      "@type": "WebSite",
      name: SITE_NAME,
      url: SITE_URL,
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <link rel="preload" href="/fonts/UCityProWeb-Regular.woff2" as="font" type="font/woff2" crossOrigin="" />
        <link rel="preload" href="/fonts/UCityProWeb-Semibold.woff2" as="font" type="font/woff2" crossOrigin="" />
        <link rel="preload" href="/fonts/UCityProWeb-Bold.woff2" as="font" type="font/woff2" crossOrigin="" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }} />
      </head>
      <body>
        <SitePlayer>{children}</SitePlayer>
        <DotCursor />
        <OpenReplayTracker />
      </body>
      {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ? (
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID} />
      ) : null}
    </html>
  );
}
