import type { Lang } from "@/features/case-study/model/types";
import styles from "./LangToggle.module.css";

export function LangToggle({ lang, onChange }: { lang: Lang; onChange: (lang: Lang) => void }) {
  return (
    <div className={styles.root} role="group" aria-label="Language">
      <button type="button" className={`${styles.btn}${lang === "en" ? ` ${styles.active}` : ""}`} onClick={() => onChange("en")}>
        EN
      </button>
      <button type="button" className={`${styles.btn}${lang === "ko" ? ` ${styles.active}` : ""}`} onClick={() => onChange("ko")}>
        KR
      </button>
    </div>
  );
}
