import { Fragment } from "react";
import { CaseStudyGallery } from "@/features/case-study/ui/CaseStudyGallery";
import { CaseStudyDemo } from "@/features/case-study/ui/CaseStudyDemo";
import type { CaseStudyBlock } from "@/features/case-study/model/types";

export function CaseStudyBlockRenderer({ block }: { block: CaseStudyBlock }) {
  switch (block.type) {
    case "hero":
      return (
        <section id="overview" className="section cs-hero">
          <div className="centered">
            <h1 className="cs-hero__title cs-hero__title--logo reveal-load" data-reveal-delay="100">
              {block.title}
              <span className="cs-hero__year-badge">{block.year}</span>
            </h1>

            <div className="cs-hero__intro reveal-load" data-reveal-delay="200">
              <p>{block.intro}</p>
            </div>

            <div className="cs-hero__contributions">
              {block.tags.map((tag, idx) => (
                <span
                  key={tag.label}
                  className="cs-hero__tag reveal-load"
                  data-reveal-delay={300 + idx * 60}
                  data-tip={tag.tip}
                >
                  {tag.label}
                </span>
              ))}
            </div>
          </div>
        </section>
      );

    case "wideImage":
      return (
        <section className="cs-image cs-image--wide">
          <div className="centered">
            <div className="cs-image__wrap reveal-load" data-reveal-delay="300">
              <img src={block.src} alt={block.alt} loading="lazy" />
            </div>
          </div>
        </section>
      );

    case "phones":
      return (
        <section className="cs-image cs-image--wide">
          <div className="centered">
            <div className="cs-phones reveal-load" data-reveal-delay="300">
              {block.images.map((screen) => (
                <img key={screen.src} src={screen.src} alt={screen.alt} loading="lazy" />
              ))}
            </div>
          </div>
        </section>
      );

    case "focusList":
      return (
        <section id={block.id ?? "focus"} className="cs-section">
          <div className="centered">
            <h2 className="cs-heading shiny-hover">{block.heading}</h2>
            <div className="cs-body">
              {block.body.map((p) => <p key={p}>{p}</p>)}
            </div>
            <div className="cs-focus-list">
              {block.items.map((item) => (
                <div className="cs-focus-item" key={item.title}>
                  <h3 className="cs-focus-item__title">{item.title}</h3>
                  <p className="cs-focus-item__desc">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      );

    case "scopeList":
      return (
        <section className="cs-section">
          <div className="centered">
            <h2 className="cs-heading shiny-hover">{block.heading}</h2>
            {block.body ? (
              <div className="cs-body">
                <p>{block.body}</p>
              </div>
            ) : null}
            <div className="cs-focus-list cs-focus-list--outline" style={{ marginTop: block.body ? "24px" : undefined }}>
              {block.groups.map((group) => (
                <div className="cs-focus-item" key={group.title}>
                  <h3 className="cs-focus-item__title">{group.title}</h3>
                  <ul className="cs-list">
                    {group.items.map((item) => <li key={item}>{item}</li>)}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>
      );

    case "textSection":
      return (
        <section id={block.id} className="cs-section">
          <div className="centered">
            <h2 className="cs-heading shiny-hover">{block.heading}</h2>
            <div className="cs-body">
              {block.body.map((p) => <p key={p}>{p}</p>)}
            </div>
          </div>
        </section>
      );

    case "treeDiagram":
      return (
        <section className="cs-image cs-image--wide">
          <div className="centered">
            <div className="cs-diagram cs-tree" id={block.id}></div>
          </div>
        </section>
      );

    case "video":
      return (
        <section className="cs-image cs-image--gallery">
          <div className="centered">
            <CaseStudyDemo src={block.src} poster={block.poster} hint={block.hint} portrait={block.portrait} />
          </div>
        </section>
      );

    case "product":
      return (
        <section id="product" className="cs-section">
          <div className="centered">
            <h2 className="cs-heading shiny-hover">{block.heading}</h2>
            <div className="cs-body">
              {block.entries.map((entry) => (
                <Fragment key={entry.label}>
                  <span className="cs-label">{entry.label}</span>
                  <p>{entry.body}</p>
                </Fragment>
              ))}
            </div>
          </div>
        </section>
      );

    case "gallery":
      return (
        <section className="cs-image cs-image--gallery">
          <div className="centered">
            <CaseStudyGallery slides={block.slides} variant={block.variant} showDots={block.showDots} />
          </div>
        </section>
      );

    default:
      return null;
  }
}
