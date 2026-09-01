"use client";

import type { ReactNode } from "react";
import { ClientNav } from "./ClientNav";
import { MiniPlayer } from "./MiniPlayer";
import { PlayerProvider } from "./PlayerProvider";

export function SitePlayer({ children }: { children: ReactNode }) {
  return (
    <PlayerProvider>
      <ClientNav />
      <MiniPlayer />
      {children}
    </PlayerProvider>
  );
}
