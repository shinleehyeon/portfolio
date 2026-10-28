import type { ReactNode } from "react";

function DoodleMark({
  kind,
  color,
  mask,
  children,
}: {
  kind: "highlight" | "wash" | "badge" | "circle";
  color: string;
  mask: string;
  children: ReactNode;
}) {
  const src = `/images/doodles/${mask}`;
  return (
    <span className={`hero-doodle hero-doodle--${kind}`}>
      <span className="hero-doodle__text">{children}</span>
      <span
        className="hero-doodle__mark"
        aria-hidden
        style={{
          backgroundColor: color,
          WebkitMaskImage: `url(${src})`,
          maskImage: `url(${src})`,
        }}
      />
    </span>
  );
}

export function HeroDoodledBio() {
  return (
    <p>
      좋은 <DoodleMark kind="badge" color="#5b2dff" mask="shape01.png">개발</DoodleMark>
      은 잘 동작하는 코드를 넘어, 사용자가 겪는 문제를{" "}
      <DoodleMark kind="wash" color="#ff3dba" mask="watercolor02.png">데이터</DoodleMark>로 읽고
      <br />그 맥락에 맞는{" "}
      <DoodleMark kind="highlight" color="#c4e800" mask="highlight10.png">해결책을 설계해 나가는 과정</DoodleMark>
      입니다.
    </p>
  );
}
