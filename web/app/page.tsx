import { SiteRuntime } from "@/components/SiteRuntime";
import { HomePage } from "@/components/pages/HomePage";
import { HOME_SCRIPTS } from "@/lib/scripts";

export default function Page() {
  return (
    <SiteRuntime scripts={[...HOME_SCRIPTS]}>
      <HomePage />
    </SiteRuntime>
  );
}
