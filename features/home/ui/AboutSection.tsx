export function AboutSection() {
  return (
    <>

          <section id="about" className="section about-section">
            <div className="centered">
              <h2 className="about__heading shiny-hover reveal-scroll">About me</h2>

              <div className="about__body">
                <div className="about__content">
                  <p>끊임없는 도전으로 성장하는 개발자 신이현입니다.</p>
                  <p>
                    좋은 개발은 잘 동작하는 코드를 넘어, 사용자가 겪는 문제를 데이터로 읽고
                    그 맥락에 맞는 해결책을 설계하는 과정이라고 생각합니다.
                  </p>
                  <input type="checkbox" id="aboutMore" className="about__more-toggle" aria-label="소개 더 보기" />
                  <p className="about__more">
                    그래서 기능을 구현하기 전에 먼저 전체 구조를 그립니다. 작은 구조 하나가
                    이후 개발의 속도와 유지보수성을 좌우한다는 믿음으로 단단한 설계를 우선해
                    왔습니다.
                  </p>
                  <p className="about__more">
                    기획부터 백엔드, 인프라까지 서비스 전반을 경험한 이해를 바탕으로 사용자에게
                    가장 자연스러운 경험을 설계하고자 합니다.
                  </p>
                  <p className="about__more">
                    초창기 스타트업의 제로투원 경험부터 수백만 사용자가 쓰는 서비스의 실무,
                    다수의 해커톤까지 거치며 배운 것은 하나입니다. 정해진 것 없는 환경에서도
                    사용자 입장에서 문제를 정의하고, 데이터로 검증해 실제 서비스로 연결하는
                    일이 중요하다는 점입니다.
                  </p>
                  <label htmlFor="aboutMore" className="about__more-btn">
                    <span className="about__more-btn-open">더 보기</span>
                    <span className="about__more-btn-close">접기</span>
                  </label>
                </div>

                <div className="about__hero-photo" id="aboutHeroPhoto">
                  <div className="about__hero-glare"></div>
                  <div className="about__hero-stack" id="aboutHeroStack" role="button" tabIndex={0} aria-label="다음 사진 보기">
                    <img className="about__hero-card" data-pos="0" src="/images/about-id.png" alt="신이현" width="300" height="400" />
                    <img className="about__hero-card" data-pos="1" src="/images/about-hero.png" alt="" width="300" height="400" />
                    <img className="about__hero-card" data-pos="2" src="/images/about-office.jpg" alt="" width="300" height="400" />
                  </div>
                </div>
              </div>
            </div>
          </section>
    </>
  );
}
