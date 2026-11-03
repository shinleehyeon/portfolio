import type { Lang } from "@/features/case-study/model/types";
import { PROJECT_STACKS, type StackIcon } from "@/features/case-study/model/stacks";
import { OrbitingCircles } from "@/features/case-study/ui/OrbitingCircles";

const MASKED = new Set(["amazonwebservices", "amazons3", "googlechrome"]);

function iconUrl(slug: string) {
  if (MASKED.has(slug)) return `https://cdn.jsdelivr.net/npm/simple-icons@13.21.0/icons/${slug}.svg`;
  return `https://cdn.simpleicons.org/${slug}`;
}

function StackGlyph({ icon }: { icon: StackIcon }) {
  if (MASKED.has(icon.slug)) {
    const url = iconUrl(icon.slug);
    return (
      <span
        className="orbit-glyph"
        role="img"
        aria-label={icon.name}
        style={{
          backgroundColor: `#${icon.color ?? "111111"}`,
          WebkitMaskImage: `url(${url})`,
          maskImage: `url(${url})`,
        }}
      />
    );
  }

  return (
    <img
      className={`orbit-glyph-img${icon.mono ? " is-mono" : ""}`}
      src={iconUrl(icon.slug)}
      alt={icon.name}
    />
  );
}

function split(icons: StackIcon[]) {
  if (icons.length <= 4) return { outer: icons, inner: [] as StackIcon[] };
  const mid = Math.ceil(icons.length / 2);
  return { outer: icons.slice(0, mid), inner: icons.slice(mid) };
}

export function CaseStudyOrbit({ slug, lang }: { slug: string; lang: Lang }) {
  const icons = PROJECT_STACKS[slug];
  if (!icons?.length) return null;
  const { outer, inner } = split(icons);

  return (
    <div className="cs-orbit-pane" aria-label={lang === "ko" ? "기술 스택" : "Stack"}>
      <div className="cs-orbit">
        <OrbitingCircles radius={156} iconSize={58} duration={32}>
          {outer.map((item) => (
            <StackGlyph key={item.slug} icon={item} />
          ))}
        </OrbitingCircles>
        {inner.length ? (
          <OrbitingCircles radius={88} iconSize={42} duration={22} reverse speed={1.15}>
            {inner.map((item) => (
              <StackGlyph key={item.slug} icon={item} />
            ))}
          </OrbitingCircles>
        ) : null}
      </div>
    </div>
  );
}
