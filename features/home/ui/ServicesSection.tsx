import { HeroDoodledBio } from "@/features/home/ui/HeroDoodle";
import { NowPlaying } from "@/features/home/ui/NowPlaying";
import { PompomMascots } from "@/features/home/ui/PompomMascots";
import { ServicesWheel } from "@/features/home/ui/ServicesWheel";

export function ServicesSection() {
  return (
    <>

          <section id="hero" className="section section--hero">
            <div className="centered">
              <h1 className="hero-name shiny-hover reveal-load" data-reveal-delay="100">A developer growing through constant challenge.</h1>

              <div className="hero-bio reveal-load" data-reveal-delay="200">
                <HeroDoodledBio />
                <p className="hero-bio--location">
                  <span className="globe-wrap">
                    <svg className="globe-svg" viewBox="0 0 22 22" width="22" height="22" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="11" cy="11" r="10" stroke="currentColor" strokeWidth="1.5" /><line x1="1" y1="11" x2="21" y2="11" stroke="currentColor" strokeWidth="1.5" /><ellipse className="globe-meridian" cx="11" cy="11" rx="10" ry="10" stroke="currentColor" strokeWidth="1.5" vectorEffect="non-scaling-stroke" /><ellipse className="globe-meridian m2" cx="11" cy="11" rx="10" ry="10" stroke="currentColor" strokeWidth="1.5" vectorEffect="non-scaling-stroke" /></svg>
                  </span>
                  <span>SEOUL, KR</span>
                </p>
              </div>

              <div className="social-proof reveal-load" data-reveal-delay="320">
                <div className="social-proof__left">

                  <ServicesWheel />
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
