import type { CaseStudyCopy, CaseStudySeo, CaseStudyWork } from "@/features/case-study/model/types";
import { PETCLINIC_REPO } from "@/features/case-study/model/copy/file-trees";
import { PETCLINIC_PIPELINE, PETCLINIC_SYSTEM } from "@/features/case-study/model/copy/trees";

export const PETCLINIC_SEO: CaseStudySeo = {
  title: "PetClinic 3-Tier on AWS",
  description:
    "A Spring PetClinic service on a 3-tier AWS architecture with CloudFront and WAF, Auto Scaling, RDS Multi-AZ, and CI/CD, written back as Terraform.",
  image: "/images/work-petclinic.png",
};

export const PETCLINIC_WORK: CaseStudyWork = {
  title: "PetClinic 3-Tier on AWS",
  caption: "[Bespin Global] 엣지 방어와 고가용성 구조에 CI/CD 자동 배포, 관측·보안 알림까지 갖춘 3-Tier 서비스 아키텍처",
  year: "2026",
  image: "/images/work-petclinic.png",
  imageAlt: "PetClinic 3-tier AWS architecture diagram",
  footerLabel: "PetClinic on AWS",
};

const GALLERY = [
  { src: "/images/petclinic/demo-rolling.mp4", alt: "WAS 롤링 배포", poster: "/images/petclinic/demo-rolling.jpg", fit: "web" as const },
  { src: "/images/petclinic/demo-loadtest.mp4", alt: "WAS 부하 테스트", poster: "/images/petclinic/demo-loadtest.jpg", fit: "web" as const },
  { src: "/images/petclinic/demo-ratelimit.mp4", alt: "Rate limit", poster: "/images/petclinic/demo-ratelimit.jpg", fit: "web" as const },
  { src: "/images/petclinic/demo-sqli.mp4", alt: "SQL 인젝션 차단", poster: "/images/petclinic/demo-sqli.jpg", fit: "web" as const },
  { src: "/images/petclinic/demo-guardduty.mp4", alt: "GuardDuty 탐지", poster: "/images/petclinic/demo-guardduty.jpg", fit: "web" as const },
];

const NAV = {
  ko: [
    { id: "overview", label: "개요" },
    { id: "focus", label: "초점" },
    { id: "repo", label: "레포" },
    { id: "pipeline", label: "배포" },
    { id: "system", label: "시스템" },
    { id: "product", label: "운영" },
    { id: "demo", label: "시연" },
  ],
  en: [
    { id: "overview", label: "Overview" },
    { id: "focus", label: "Focus" },
    { id: "repo", label: "Repo" },
    { id: "pipeline", label: "Deploy" },
    { id: "system", label: "System" },
    { id: "product", label: "Operations" },
    { id: "demo", label: "Demo" },
  ],
};

export const PETCLINIC_COPY: CaseStudyCopy = {
  ko: {
    slug: "petclinic",
    title: "PetClinic 3-Tier on AWS",
    nav: NAV.ko,
    summarize: {
      label: "요약",
      paragraphs: [
        "Spring PetClinic을 AWS에 Web, WAS, DB 3계층으로 올렸습니다. 앞단에는 CloudFront와 WAF, 가운데는 ALB 두 개와 Auto Scaling, 뒤에는 Multi-AZ RDS가 있습니다.",
        "코드 변경은 GitHub Actions가 이미지를 만들어 ECR에 올리고, Instance Refresh가 서버를 절반씩 교체하는 방식으로 배포합니다. 장애와 위협은 CloudWatch, GuardDuty, Lambda를 거쳐 Discord로 옵니다.",
        "프로젝트가 끝나 AWS 리소스는 모두 삭제했습니다. 삭제 전 구성을 CloudTrail 기록으로 복원해 Terraform 코드로 남겼습니다.",
      ],
    },
    blocks: [
      {
        type: "hero",
        title: "PetClinic 3-Tier on AWS",
        year: "2026",
        intro:
          "샘플 앱을 띄우는 것과 서비스로 운영하는 것은 다릅니다. 외부 트래픽을 어디서 걸러낼지, 서버가 죽으면 어떻게 대체할지, 배포 중에도 서비스가 멈추지 않게 하려면 어떻게 할지를 계층별로 나눠 설계했습니다.",
        tags: [
          { label: "3-Tier 설계", tip: "Web(Apache), WAS(Spring PetClinic), DB(RDS MySQL)를 서브넷과 보안 그룹으로 나눴습니다." },
          { label: "CloudFront · WAF", tip: "관리형 규칙 2개와 IP당 5분 1,000회 rate limit. 정적 경로 5개는 엣지에서 캐시합니다." },
          { label: "Auto Scaling · CI/CD", tip: "CPU 70% 목표 추적. GitHub Actions → ECR → Instance Refresh." },
          { label: "관측 · 보안", tip: "알람, GuardDuty, WAF 차단 로그를 Lambda를 거쳐 Discord로 보냅니다." },
          { label: "Terraform", tip: "9개 모듈, plan 기준 223개 리소스. 삭제 전 구성을 코드로 정리했습니다." },
        ],
      },
      { type: "wideImage", src: "/images/petclinic/architecture.png", alt: "PetClinic 3-Tier AWS 아키텍처" },
      {
        type: "focusList",
        heading: "초점",
        body: [
          "어려운 건 리소스를 만드는 일이 아니라, 각 계층이 서로를 믿는 범위를 좁게 유지하는 일이었습니다.",
          "핵심 질문: 서버가 바뀌고 트래픽이 몰려도, 누가 어디까지 접근할 수 있는지가 그대로일까?",
          "네 가지에 집중했습니다.",
        ],
        items: [
          { title: "계층마다 문을 좁게", desc: "보안 그룹은 이전 계층의 보안 그룹만 소스로 받습니다. 외부 ALB는 CloudFront 전용 프리픽스 리스트의 443만 열고, DB는 인터넷 경로가 없는 서브넷에 둡니다." },
          { title: "엣지에서 먼저 거르기", desc: "WAF가 SQL 인젝션과 공통 취약 패턴을 막고, 한 IP의 과도한 요청에는 429 안내 페이지를 돌려줍니다. 정적 파일은 CloudFront가 캐시합니다." },
          { title: "서버는 갈아 끼운다", desc: "서버를 고치지 않고 새 이미지로 교체합니다. 교체 중에도 절반은 살아 있고, 새 서버는 60초 워밍업을 거칩니다." },
          { title: "비밀번호를 사람이 모르게", desc: "DB 자격 증명은 Secrets Manager가 30일마다 교체합니다. 애플리케이션은 VPC 엔드포인트로 가져옵니다." },
        ],
      },
      {
        type: "scopeList",
        heading: "구성",
        groups: [
          { title: "네트워크", items: ["VPC 10.0.0.0/16, 서브넷 8개", "public · web · was · db × AZ 2개", "Regional NAT", "VPC 플로우 로그"] },
          { title: "애플리케이션", items: ["외부 ALB와 내부 ALB", "Apache ASG (2–6대)", "Spring PetClinic ASG (2–6대)", "Docker 컨테이너"] },
          { title: "데이터", items: ["RDS MySQL 8.4 Multi-AZ", "gp3, 저장 시 암호화", "Secrets Manager 로테이션", "향상된 모니터링"] },
          { title: "엣지 · 운영", items: ["Route 53, ACM, CloudFront", "WAF 두 개 (CloudFront, ALB)", "CloudWatch, SNS, Lambda", "GuardDuty, CloudTrail, IAM"] },
        ],
      },
      { type: "fileTree", id: "repo", heading: "레포", root: "PetClinic", tree: PETCLINIC_REPO },
      {
        type: "textSection",
        id: "pipeline",
        heading: "배포",
        body: [
          "코드 한 줄을 고치면 GitHub Actions가 이미지를 빌드해 ECR에 올립니다. 장기 액세스 키 대신 OIDC 롤을 씁니다.",
          "새 이미지는 Instance Refresh로 반영합니다. 한 번에 절반만 교체하고, 새 서버가 정상이 되면 나머지를 바꿉니다. 다이어그램의 노드를 누르면 펼쳐집니다.",
        ],
      },
      { type: "treeDiagram", id: "petclinicPipelineTree", tree: PETCLINIC_PIPELINE },
      {
        type: "textSection",
        id: "system",
        heading: "시스템",
        body: [
          "요청은 Route 53에서 CloudFront와 WAF를 지나 외부 ALB로 들어옵니다. Apache가 받아 내부 ALB를 거쳐 Spring 서버로 넘기고, 서버는 RDS에 접속합니다.",
          "계층마다 서브넷과 보안 그룹을 분리했습니다. 다이어그램은 영어입니다.",
        ],
      },
      { type: "treeDiagram", id: "petclinicSystemTree", tree: PETCLINIC_SYSTEM, collapseAt: 2 },
      {
        type: "product",
        heading: "운영",
        entries: [
          { label: "알림", body: "ALB 5xx, CPU, RDS CPU 알람은 SNS와 Lambda를 거쳐 Discord로 갑니다. 서버가 새로 뜨는 이벤트와 GuardDuty 탐지, WAF 차단도 같은 채널로 옵니다." },
          { label: "권한", body: "역할별 IAM 그룹 4개(네트워크, DB·보안, 엣지·보안, 운영)로 나눴습니다. 사람마다 만질 수 있는 범위가 다릅니다." },
          { label: "코드로 남기기", body: "AWS 리소스는 프로젝트 종료와 함께 모두 삭제했습니다. 삭제 전 구성을 CloudTrail 기록에서 복원해 Terraform 모듈 9개로 정리했고, plan으로 검증했습니다." },
        ],
      },
      {
        type: "textSection",
        id: "demo",
        heading: "시연 영상",
        body: [
          "실제로 동작하는 모습을 다섯 장면으로 담았습니다. WAS 롤링 배포, WAS 부하 테스트, Rate limit, SQL 인젝션 차단, GuardDuty 탐지 순서입니다.",
        ],
      },
      { type: "gallery", slides: GALLERY, showDots: true },
    ],
  },
  en: {
    slug: "petclinic",
    title: "PetClinic 3-Tier on AWS",
    nav: NAV.en,
    summarize: {
      label: "Summarize",
      paragraphs: [
        "Spring PetClinic runs on AWS as three tiers: web, application, and database. CloudFront and WAF sit in front, two ALBs and Auto Scaling in the middle, and Multi-AZ RDS behind.",
        "A code change is built by GitHub Actions, pushed to ECR, and rolled out by Instance Refresh, replacing servers half at a time. Failures and threats reach Discord through CloudWatch, GuardDuty, and Lambda.",
        "The project is over and every AWS resource is deleted. I rebuilt the pre-deletion setup from CloudTrail records and kept it as Terraform.",
      ],
    },
    blocks: [
      {
        type: "hero",
        title: "PetClinic 3-Tier on AWS",
        year: "2026",
        intro:
          "Running a sample app is not the same as operating a service. The design splits the work by tier: where outside traffic gets filtered, what replaces a dead server, and how a deploy avoids taking the service down.",
        tags: [
          { label: "3-tier design", tip: "Web (Apache), application (Spring PetClinic), and database (RDS MySQL), split by subnet and security group." },
          { label: "CloudFront · WAF", tip: "Two managed rule sets and a 1,000-per-5-minutes rate limit per IP. Five static paths are cached at the edge." },
          { label: "Auto Scaling · CI/CD", tip: "CPU target tracking at 70%. GitHub Actions → ECR → Instance Refresh." },
          { label: "Observability · security", tip: "Alarms, GuardDuty, and WAF blocks reach Discord through Lambda." },
          { label: "Terraform", tip: "Nine modules and 223 resources in the plan. The pre-deletion setup, written as code." },
        ],
      },
      { type: "wideImage", src: "/images/petclinic/architecture.png", alt: "PetClinic 3-tier AWS architecture" },
      {
        type: "focusList",
        heading: "Focus",
        body: [
          "Creating the resources is not the hard part. Keeping what each tier trusts as narrow as possible is.",
          "The core question: when servers change and traffic spikes, does who can reach what stay the same?",
          "I focused on four things:",
        ],
        items: [
          { title: "A narrow door per tier", desc: "Each security group only accepts the one before it. The external ALB opens 443 to the CloudFront prefix list alone, and the database sits in a subnet with no internet route." },
          { title: "Filter at the edge first", desc: "WAF blocks SQL injection and common attack patterns, and returns a 429 page to an IP that sends too many requests. CloudFront caches static files." },
          { title: "Replace, do not repair", desc: "A server is swapped for a new image instead of being fixed. Half stay up during a rollout, and new servers get a 60-second warm-up." },
          { title: "Credentials no one knows", desc: "Secrets Manager rotates the database credentials every 30 days. The app reads them through a VPC endpoint." },
        ],
      },
      {
        type: "scopeList",
        heading: "Breakdown",
        groups: [
          { title: "Network", items: ["VPC 10.0.0.0/16, eight subnets", "public · web · was · db × two AZs", "Regional NAT", "VPC flow logs"] },
          { title: "Application", items: ["External and internal ALB", "Apache ASG (2–6)", "Spring PetClinic ASG (2–6)", "Docker containers"] },
          { title: "Data", items: ["RDS MySQL 8.4 Multi-AZ", "gp3, encrypted at rest", "Secrets Manager rotation", "Enhanced monitoring"] },
          { title: "Edge · operations", items: ["Route 53, ACM, CloudFront", "Two WAFs (CloudFront, ALB)", "CloudWatch, SNS, Lambda", "GuardDuty, CloudTrail, IAM"] },
        ],
      },
      { type: "fileTree", id: "repo", heading: "Repo", root: "PetClinic", tree: PETCLINIC_REPO },
      {
        type: "textSection",
        id: "pipeline",
        heading: "Deploy",
        body: [
          "Change one line and GitHub Actions builds the image and pushes it to ECR. An OIDC role replaces long-lived access keys.",
          "Instance Refresh rolls the new image out half at a time, and replaces the rest once the new servers are healthy. Click a node to expand.",
        ],
      },
      { type: "treeDiagram", id: "petclinicPipelineTree", tree: PETCLINIC_PIPELINE },
      {
        type: "textSection",
        id: "system",
        heading: "System",
        body: [
          "A request goes from Route 53 through CloudFront and WAF to the external ALB. Apache hands it through the internal ALB to the Spring servers, which talk to RDS.",
          "Every tier has its own subnets and security groups. The diagram stays in English.",
        ],
      },
      { type: "treeDiagram", id: "petclinicSystemTree", tree: PETCLINIC_SYSTEM, collapseAt: 2 },
      {
        type: "product",
        heading: "Operations",
        entries: [
          { label: "Alerts", body: "ALB 5xx, CPU, and RDS CPU alarms go to Discord through SNS and Lambda. New-server events, GuardDuty findings, and WAF blocks use the same channel." },
          { label: "Access", body: "Four IAM groups by role: network, database and security, edge and security, and operations. What each person can touch differs." },
          { label: "Kept as code", body: "Every AWS resource was deleted when the project ended. I rebuilt the pre-deletion setup from CloudTrail records into nine Terraform modules and checked it with plan." },
        ],
      },
      {
        type: "textSection",
        id: "demo",
        heading: "Demo videos",
        body: [
          "Five clips of it running: WAS rolling deploy, WAS load test, rate limit, SQL injection block, and GuardDuty detection, in that order.",
        ],
      },
      { type: "gallery", slides: GALLERY, showDots: true },
    ],
  },
};
