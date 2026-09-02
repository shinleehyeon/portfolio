import type { Metadata } from "next";
import { SiteRuntime } from "@/shared/ui/SiteRuntime";
import { HomePage } from "@/features/home";
import { HOME_BOOT } from "@/shared/lib/scripts";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function Page() {
  return (
    <SiteRuntime boot={HOME_BOOT}>
      <HomePage />
    </SiteRuntime>
  );
}
