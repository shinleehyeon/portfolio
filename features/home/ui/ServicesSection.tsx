import { NowPlaying } from "@/features/home/ui/NowPlaying";
import { PompomMascots } from "@/features/home/ui/PompomMascots";

export function ServicesSection() {
  return (
    <>

          <section id="hero" className="section section--hero">
            <div className="centered">
              <h1 className="hero-name shiny-hover reveal-load" data-reveal-delay="100">A developer growing through constant challenge.</h1>

              <div className="hero-bio reveal-load" data-reveal-delay="200">
                <p>잘 동작하는 코드를 넘어, 사용자의 문제를 데이터로 읽고 해결책을 설계하는 개발을 지향합니다.</p>
                <p>기획부터 인프라까지 서비스 전반을 경험하며 사용자 문제를 해결하는 개발을 고민해왔습니다.</p>
                <p className="hero-bio--location">
                  <span className="globe-wrap">
                    <svg className="globe-svg" viewBox="0 0 22 22" width="22" height="22" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="11" cy="11" r="10" stroke="currentColor" strokeWidth="1.5" /><line x1="1" y1="11" x2="21" y2="11" stroke="currentColor" strokeWidth="1.5" /><ellipse className="globe-meridian" cx="11" cy="11" rx="10" ry="10" stroke="currentColor" strokeWidth="1.5" vectorEffect="non-scaling-stroke" /><ellipse className="globe-meridian m2" cx="11" cy="11" rx="10" ry="10" stroke="currentColor" strokeWidth="1.5" vectorEffect="non-scaling-stroke" /></svg>
                  </span>
                  <span>SEOUL, KR</span>
                </p>
              </div>

              <div className="social-proof reveal-load" data-reveal-delay="320">
                <div className="social-proof__left">

                  <div className="sp-card sp-card--services">
                    <div className="sp-services__wheel" aria-hidden="true">
                      <div className="sp-wheel__track"></div>
                    </div>
                    <div className="sp-services__arrow" aria-hidden="true">
                      <svg width="20" height="15" viewBox="0 0 20 15" fill="none"><path d="M1 7.5H19M12 1l7 6.5-7 6.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    </div>
                    <div className="sp-services__pill-stack" id="pillStack">
                      <div className="sp-stack__card" id="stackTop2"></div>
                      <div className="sp-stack__card" id="stackTop1"></div>
                      <div className="sp-stack__card sp-stack__card--active" id="stackActive"><span></span></div>
                      <div className="sp-stack__card" id="stackBot1"></div>
                      <div className="sp-stack__card" id="stackBot2"></div>
                    </div>
                  </div>
                </div>
                <div className="sp-now-playing-wrap">
                  <div className="now-playing__tape" aria-hidden="true">
                    <img src="/images/tape-mark.svg" alt="" />
                    <span>Playlist</span>
                  </div>
                  <div className="sp-card sp-card--now-playing">
                    <NowPlaying />
                    <PompomMascots followMouse={false} width={72} />
                  </div>
                </div>
              </div>

            </div>
          </section>
    </>
  );
}
