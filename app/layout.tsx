import type { Metadata } from "next";
import { SitePlayer } from "@/features/player";
import { DotCursor } from "@/shared/ui/DotCursor";
import { OpenReplayTracker } from "@/shared/ui/OpenReplayTracker";
import "@/shared/styles/index.css";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Portfolio",
    template: "%s — Portfolio",
  },
  description:
    "Founding Product Designer helping early-stage startups define, design, and deliver high-impact products.",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "48x48" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preload" href="/fonts/UCityProWeb-Regular.woff2" as="font" type="font/woff2" crossOrigin="" />
        <link rel="preload" href="/fonts/UCityProWeb-Semibold.woff2" as="font" type="font/woff2" crossOrigin="" />
        <link rel="preload" href="/fonts/UCityProWeb-Bold.woff2" as="font" type="font/woff2" crossOrigin="" />
      </head>
      <body>
        <SitePlayer>{children}</SitePlayer>
        <DotCursor />
        <OpenReplayTracker />
      </body>
    </html>
  );
}
