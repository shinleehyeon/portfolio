import { PompomMascots } from "@/components/home/PompomMascots";

function TapeMark() {
  return (
    <img
      src="/images/tape-mark.svg"
      alt=""
      width={95}
      height={80}
      aria-hidden="true"
    />
  );
}

function Soon({ tilt = "left" }: { tilt?: "left" | "right" }) {
  return <span className={`taped-footer__soon taped-footer__soon--${tilt}`}>soon</span>;
}

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="taped-footer">
      <div className="taped-footer__inner">
        <div className="taped-footer__sheet">
          <div className="taped-footer__tape taped-footer__tape--left">
            <TapeMark />
          </div>
          <div className="taped-footer__tape taped-footer__tape--right">
            <TapeMark />
          </div>

          <div className="taped-footer__row">
            <div className="taped-footer__brand">
              <a href="#hero" className="taped-footer__name">신이현</a>
              <p className="taped-footer__tagline">잘 동작하는 코드를 넘어, 사용자의 문제를 데이터로 읽고 해결책을 설계합니다.</p>
              <PompomMascots />
            </div>

            <div className="taped-footer__cols">
              <div className="taped-footer__col">
                <h4 className="taped-footer__heading">Navigate</h4>
                <a href="#hero">Hero</a>
                <a href="#about">About</a>
                <a href="#project">Projects</a>
                <a href="#experience">Experience</a>
                <a href="#highlights">Highlights</a>
              </div>

              <div className="taped-footer__col taped-footer__col--desktop">
                <h4 className="taped-footer__heading">Projects</h4>
                <a href="/seoul-bike">Seoul Bike Accident</a>
                <a href="/scholub">Scholub</a>
                <a href="/slop">SLOP</a>
                <a href="/sipsiilban">십시일반</a>
                <a href="/savequest">SaveQuest</a>
              </div>

              <div className="taped-footer__col taped-footer__col--desktop">
                <h4 className="taped-footer__heading">Connect</h4>
                <a href="https://github.com/shinleehyeon" target="_blank" rel="noopener">GitHub</a>
                <a href="https://linkedin.com/in/shinleehyeon" target="_blank" rel="noopener">LinkedIn</a>
                <a href="https://instagram.com/hyun._.s08" target="_blank" rel="noopener">Instagram</a>
                <span className="taped-footer__muted">Blog <Soon tilt="right" /></span>
              </div>
            </div>
          </div>
        </div>

        <div className="taped-footer__bar">
          <p className="taped-footer__copy">©{year} Leehyeon Shin. All rights reserved.</p>
          <div className="taped-footer__bar-links">
            <a href="https://github.com/shinleehyeon" target="_blank" rel="noopener">GitHub</a>
            <a href="https://linkedin.com/in/shinleehyeon" target="_blank" rel="noopener">LinkedIn</a>
            <a href="https://instagram.com/hyun._.s08" target="_blank" rel="noopener">Instagram</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
