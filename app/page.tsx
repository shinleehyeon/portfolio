import { SiteRuntime } from "@/shared/ui/SiteRuntime";
import { HomePage } from "@/features/home";
import { HOME_BOOT } from "@/shared/lib/scripts";

export default function Page() {
  return (
    <SiteRuntime boot={HOME_BOOT}>
      <HomePage />
    </SiteRuntime>
  );
}
