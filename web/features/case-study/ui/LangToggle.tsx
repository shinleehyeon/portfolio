import type { Lang } from "@/features/case-study/model/types";

export function LangToggle({ lang, onChange }: { lang: Lang; onChange: (lang: Lang) => void }) {
  return (
    <div className="cs-lang" role="group" aria-label="Language">
      <button type="button" className={`cs-lang__btn${lang === "en" ? " is-active" : ""}`} onClick={() => onChange("en")}>EN</button>
      <button type="button" className={`cs-lang__btn${lang === "ko" ? " is-active" : ""}`} onClick={() => onChange("ko")}>KR</button>
    </div>
  );
}
