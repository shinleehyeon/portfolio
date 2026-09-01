export function AboutSection() {
  return (
    <>
          {/* About */}
          <section id="about" className="section about-section">
            <div className="centered">
              <h2 className="about__heading shiny-hover reveal-scroll">About me</h2>

              <div className="about__body">
                <div className="about__content">
                <p>끊임없는 도전으로 성장하는 개발자 신이현입니다.</p>
                <p>좋은 프로덕트를 만드는 일은 기술만으로 되지 않는다고 생각합니다. 좋은 개발은 잘 동작하는 코드를 넘어, 사용자가 겪는 문제를 데이터로 읽고 그 맥락에 맞는 해결책을 설계해 나가는 과정이라고 생각합니다.</p>
                <p>그동안 기능을 구현하기 전에 먼저 전체 구조를 그리는 습관을 바탕으로 개발해 왔습니다.작은 구조 하나가 이후 개발 전체의 속도와 유지보수성을 좌우한다는 믿음으로 단단한 설계를 우선해 왔습니다.</p>
                <p>또한 기획부터 백엔드, 인프라까지 서비스 전반을 경험한 이해를 바탕으로 사용자에게 가장 자연스러운 경험을 설계하고자 노력해 왔습니다.</p>
                <p>초창기 스타트업에서의 제로투원 경험부터 수백만 사용자가 쓰는 서비스의 실무, 그리고 다수의 해커톤까지 다양한 경험을 통해 실제 사용자의 문제를 해결하는 개발이 어떤 것인지 꾸준히 고민해 왔습니다. 
                정해진 것 없는 환경에서도 사용자의 입장에서 문제를 정의하고, 데이터로 검증하며 실제 서비스로 연결되는 프로덕트를 만들어 내는것의 중요성을 느끼게 되었습니다.</p>
                </div>

                <div className="about__hero-photo" id="aboutHeroPhoto">
                  <div className="about__hero-glare"></div>
                  <img src="/images/about-hero.png" alt="신이현" width="350" height="350" />
                </div>
              </div>
            </div>
          </section>
    </>
  );
}
