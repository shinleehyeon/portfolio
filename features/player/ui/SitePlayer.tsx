"use client";

import type { ReactNode } from "react";
import "@/features/player/styles/engine.css";
import { ClientNav } from "./ClientNav";
import { MiniPlayer } from "./MiniPlayer";
import { PathScroll } from "./PathScroll";
import { PlayerProvider } from "./PlayerProvider";

export function SitePlayer({ children }: { children: ReactNode }) {
  return (
    <PlayerProvider>
      <ClientNav />
      <PathScroll />
      <MiniPlayer />
      {children}
    </PlayerProvider>
  );
}
