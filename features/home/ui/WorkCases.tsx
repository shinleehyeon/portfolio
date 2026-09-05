"use client";

import { CASE_STUDIES, caseStudyPath } from "@/features/case-study/model/registry";
import { WorkTilt } from "@/features/home/ui/WorkTilt";

const DETAILS_ARROW = (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M5.75 11C5.33579 11 5 11.3358 5 11.75C5 12.1642 5.33579 12.5 5.75 12.5L16.6487 12.5L13.1738 16.2698C12.9087 16.5881 12.9517 17.061 13.2699 17.3261C13.5881 17.5913 14.061 17.5483 14.3262 17.2301L18.8262 12.2301C19.0579 11.952 19.0579 11.548 18.8262 11.2698L14.3262 6.26984C14.061 5.95163 13.5881 5.90864 13.2699 6.17382C12.9517 6.43899 12.9087 6.91191 13.1738 7.23012L16.6487 11L5.75 11Z"
      fill="#FFF1F2"
    />
  </svg>
);

const GLOBE = (
  <svg className="globe-svg" viewBox="0 0 22 22" width="20" height="20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="11" cy="11" r="10" stroke="currentColor" strokeWidth="1.5" />
    <line x1="1" y1="11" x2="21" y2="11" stroke="currentColor" strokeWidth="1.5" />
    <ellipse className="globe-meridian" cx="11" cy="11" rx="10" ry="10" stroke="currentColor" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
    <ellipse className="globe-meridian m2" cx="11" cy="11" rx="10" ry="10" stroke="currentColor" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
  </svg>
);

export function WorkCases() {
  return (
    <div className="case-studies section centered" id="projects">
      {CASE_STUDIES.map((entry) => {
        const href = caseStudyPath(entry.slug);
        return (
          <div
            className="case-study"
            key={entry.slug}
            onClick={(event) => {
              if (window.innerWidth >= 768) return;
              if ((event.target as HTMLElement).closest("a")) return;
              window.location.href = href;
            }}
          >
            <div className="case-study__header">
              <div className="case-study__text">
                <h2 className="case-study__title shiny-hover">{entry.work.title}</h2>
                <p className="case-study__caption">
                  <span className="case-study__caption-desc">{entry.work.caption}</span>
                  <span className="case-study__caption-dot">&nbsp;・&nbsp;</span>
                  <span className="case-study__caption-year">{entry.work.year}</span>
                </p>
              </div>
              <div className="case-study__buttons">
                {entry.work.liveUrl ? (
                  <a className="case-study__website-btn" href={entry.work.liveUrl} target="_blank" rel="noopener" aria-label="Visit live site">
                    {GLOBE}
                  </a>
                ) : null}
                <a className="case-study__btn" href={href}>
                  <span>Details</span>
                  {DETAILS_ARROW}
                </a>
              </div>
            </div>
            <a className="case-study__image-wrap" href={href}>
              <WorkTilt>
                <img src={entry.work.image} alt={entry.work.imageAlt} className="case-study__image" />
              </WorkTilt>
            </a>
          </div>
        );
      })}
    </div>
  );
}
