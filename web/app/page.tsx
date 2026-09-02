import { SiteRuntime } from "@/shared/ui/SiteRuntime";
import { HomePage } from "@/features/home";
import { HOME_SCRIPTS } from "@/shared/lib/scripts";

export default function Page() {
  return (
    <SiteRuntime scripts={[...HOME_SCRIPTS]}>
      <HomePage />
    </SiteRuntime>
  );
}
