#!/usr/bin/env python3
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.units import mm
from reportlab.lib.colors import HexColor, white, black
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, KeepTogether, HRFlowable,
)

pdfmetrics.registerFont(TTFont("KR", "/System/Library/Fonts/Supplemental/AppleGothic.ttf"))
pdfmetrics.registerFont(TTFont("KRBold", "/System/Library/Fonts/Supplemental/AppleGothic.ttf"))

INK = HexColor("#111111")
MUTED = HexColor("#555555")
RULE = HexColor("#DDDDDD")
ACCENT = HexColor("#111111")

def S(name, size, leading, color=INK, space_before=0, space_after=4, bold=False):
    return ParagraphStyle(
        name,
        fontName="KRBold" if bold else "KR",
        fontSize=size,
        leading=leading,
        textColor=color,
        spaceBefore=space_before,
        spaceAfter=space_after,
    )

st_cover = S("cover", 22, 28, bold=True, space_after=2)
st_sub = S("sub", 9.5, 13, MUTED, space_after=10)
st_meta = S("meta", 9, 13, INK, space_after=2)
st_h = S("h", 12, 16, bold=True, space_before=10, space_after=6)
st_h2 = S("h2", 10.5, 14, bold=True, space_before=8, space_after=2)
st_meta2 = S("meta2", 8.5, 12, MUTED, space_after=3)
st_body = S("body", 9, 13, INK, space_after=3)
st_bullet = S("bullet", 9, 13, INK, space_after=2)
st_small = S("small", 8, 11, MUTED, space_after=2)
st_sign = S("sign", 8.5, 12, MUTED, space_before=12)

def h(num, title):
    return Paragraph(f"{num}&nbsp;&nbsp;&nbsp;{title}", st_h)

def bullet(text):
    return Paragraph(f"•&nbsp;&nbsp;{text}", st_bullet)

def project(title, meta, goal, tech, duties):
    bits = [
        Paragraph(title, st_h2),
        Paragraph(meta, st_meta2),
    ]
    if goal:
        bits.append(bullet(f"<b>개발 목표</b> {goal}"))
    if tech:
        bits.append(bullet(f"<b>사용 기술</b> {tech}"))
    if duties:
        bits.append(Paragraph("담당 업무", st_meta2))
        for d in duties:
            bits.append(bullet(d))
    bits.append(Spacer(1, 4))
    return KeepTogether(bits)

out = "/Users/shinleehyeon/Dev/Projects/portfolio-site/docs/resume/신이현_이력서.pdf"
doc = SimpleDocTemplate(
    out,
    pagesize=A4,
    leftMargin=18 * mm,
    rightMargin=18 * mm,
    topMargin=16 * mm,
    bottomMargin=16 * mm,
    title="신이현 이력서",
    author="신이현",
)

story = []
story.append(Paragraph("이력서", st_cover))
story.append(Paragraph("클라우드 · 데이터 엔지니어 지원", st_sub))

meta_rows = [
    ["지원 직무", "클라우드 엔지니어 · 데이터 엔지니어"],
    ["이름", "신이현"],
    ["소속", "선린인터넷고등학교 소프트웨어과  2024.03 – 2027.02 예정"],
    ["연락처", "010-2984-6694  ·  shinlee7878@gmail.com"],
    ["GitHub", "github.com/shinleehyeon"],
    ["한 줄 소개", "풀스택 개발  →  클라우드 인프라  →  데이터 파이프라인"],
]
t = Table(meta_rows, colWidths=[28 * mm, 150 * mm])
t.setStyle(TableStyle([
    ("FONTNAME", (0, 0), (-1, -1), "KR"),
    ("FONTSIZE", (0, 0), (-1, -1), 9),
    ("TEXTCOLOR", (0, 0), (0, -1), MUTED),
    ("TEXTCOLOR", (1, 0), (1, -1), INK),
    ("VALIGN", (0, 0), (-1, -1), "TOP"),
    ("LEFTPADDING", (0, 0), (-1, -1), 0),
    ("RIGHTPADDING", (0, 0), (-1, -1), 4),
    ("TOPPADDING", (0, 0), (-1, -1), 2),
    ("BOTTOMPADDING", (0, 0), (-1, -1), 2),
]))
story.append(t)
story.append(Spacer(1, 8))
story.append(HRFlowable(width="100%", thickness=0.6, color=RULE, spaceAfter=6))

story.append(h("I", "Introduction / 소개"))
story.append(Paragraph("요약", st_h2))
story.append(Paragraph(
    "프론트엔드·백엔드 개발에서 출발해, AWS 3tier 인프라를 Terraform과 CI/CD로 구축하고 "
    "Python ETL·데이터 파이프라인과 Amazon Redshift 적재·분석까지 직접 해 본 엔지니어입니다. "
    "서비스를 만드는 쪽과 그 아래의 인프라·데이터를 만드는 쪽을 모두 이해하고, "
    "만든 것을 운영 가능한 형태로 남기는 데 집중합니다.",
    st_body,
))
story.append(Paragraph("핵심 역량", st_h2))
story.append(bullet("<b>Application Dev</b> React · Next.js · React Native 프론트엔드, NestJS · Prisma 백엔드. 당근마켓 프로덕션 인턴, 풀스택 서비스 단독 출시"))
story.append(bullet("<b>Cloud Infra</b> AWS 3tier (CloudFront·WAF·ALB·Auto Scaling·RDS Multi AZ), Terraform 모듈화·import, GitHub Actions → ECR 무중단 롤링 배포, Docker, Grafana · Prometheus"))
story.append(bullet("<b>Data Engineering</b> Python ETL 파이프라인 (수집·정제·공간 조인·적재), Redshift COPY/UNLOAD·Spectrum, BigQuery로 유저 데이터 분석"))

story.append(h("II", "Skills / 기술 스택"))
story.append(bullet("<b>Cloud · Infra</b> AWS EC2 · VPC · ALB · Auto Scaling · RDS · S3 · CloudFront · WAF · ECR · Secrets Manager · CloudWatch · GuardDuty · Lambda, Terraform, Docker, GitHub Actions, Grafana, Prometheus, Google Cloud, Linux"))
story.append(bullet("<b>Data</b> Python, SQL, Amazon Redshift, BigQuery, MySQL"))
story.append(bullet("<b>Backend · DB</b> NestJS, Prisma, MySQL"))
story.append(bullet("<b>Frontend</b> React, React Native, Next.js"))
story.append(bullet("<b>Languages</b> TypeScript, Python, Java, Swift"))
story.append(bullet("<b>Tools</b> Git, GitHub"))

story.append(h("III", "Education / 교육"))
story.append(Paragraph("AI 서비스 운영을 위한 클라우드 데이터 엔지니어 과정", st_h2))
story.append(Paragraph("청년취업사관학교 새싹 강동캠퍼스 · 주최 베스핀글로벌 · 2026.07 – 2026.12 진행 중 · 평일 09:00–18:00 오프라인", st_meta2))
story.append(bullet("<b>클라우드·리눅스</b> VPC 네트워크 구조, EC2·EBS 실습 (루트 볼륨 8GB→12GB 확장), SSH 공격 로그·EC2 로그 분석, CloudWatch 모니터링"))
story.append(bullet("<b>Amazon Redshift</b> MPP 구조와 RA3 스토리지 분리, 스타 스키마, 분산 스타일 KEY/ALL/EVEN/AUTO, 압축 인코딩, COPY·UNLOAD로 S3 적재·추출, Spectrum 외부 테이블, 결과 캐시, VACUUM"))
story.append(bullet("<b>팀 프로젝트</b> 팀장으로 AWS 3tier 인프라를 Terraform·CI/CD·Docker로 구축 (IV장). Grafana · Prometheus 모니터링"))

story.append(h("IV", "Projects / 프로젝트"))
story.append(project(
    "AWS 3tier 인프라 구축 · Terraform IaC · CI/CD",
    "2026.10 · 팀장",
    "Spring PetClinic을 AWS에 3계층으로 구축하고, 인프라와 배포를 코드로 재현 가능하게 관리",
    "AWS, Terraform, Docker, GitHub Actions, Grafana, Prometheus",
    [
        "<b>3tier 생성·구성 전체 관리</b> CloudFront+WAF → 외부 ALB·Apache → 내부 ALB·Docker WAS Auto Scaling → RDS MySQL Multi AZ, VPC·서브넷·NAT·VPC Endpoint 구성",
        "<b>IaC</b> network · security group · edge · compute · rds 모듈 분리, 콘솔 리소스를 import로 코드화, S3 백엔드 use lockfile로 상태 관리",
        "<b>CI/CD</b> main push → GitHub Actions 빌드 → ECR → ASG Instance Refresh. 불변 인프라, 롤링 배포로 무중단 교체, 헬스체크 통과 후 트래픽 투입",
        "<b>보안</b> 계층별 보안 그룹, WAF 공통·SQLi 룰·Rate Limit(429 안내 페이지 직접 제작), Secrets Manager 자격 증명 자동 교체",
        "<b>모니터링</b> Grafana · Prometheus로 인프라 지표 수집·시각화",
        "<b>재설계</b> CloudFront–WAS 구성이 3tier 요구사항과 맞지 않아 Web 티어를 추가해 재설계",
    ],
))
story.append(project(
    "서울 자전거 피해 사고 인사이트 · 데이터 파이프라인 · 대시보드",
    "2026.08 – 2026.09",
    "어느 도로부터 손봐야 하는가를 공공 데이터로 보여주는 사고 분석 대시보드",
    "Python 3.13, Next.js 16, TypeScript, TAAS·OSM 데이터, LLM OpenRouter",
    [
        "<b>수집·정제</b> TAAS 자전거 사고 데이터와 서울 자전거 전용도로 데이터를 수집하고 좌표 정리",
        "<b>공간 조인</b> 사고 지점을 구·도로에 매칭하고 전용도로와의 거리로 전용도로 안/밖 위험도 비교",
        "<b>통계 산출</b> 요일·시간대·계절·구별 통계와 사고 다발 지점 순위를 계산해 인사이트 JSON으로 생성",
        "<b>시각화</b> 지도 클러스터링, 차트 대시보드, LLM 인사이트 챗 연동",
        "<b>문서화</b> PRD·분석 기획서·발표자료 작성",
    ],
))

def career(title, meta, groups):
    bits = [
        Paragraph(title, st_h2),
        Paragraph(meta, st_meta2),
    ]
    for head, items in groups:
        bits.append(Paragraph(head, st_h2))
        for item in items:
            bits.append(bullet(item))
    bits.append(Spacer(1, 4))
    return KeepTogether(bits)

story.append(h("V", "Experience / 경력"))
story.append(career(
    "1. 당근마켓 알바팀 · 프론트엔드 인턴",
    "2026.01 ~ 2026.08 (8개월) · 수백만 사용자 프로덕션 · React 웹뷰",
    [
        ("FDS(이상거래탐지) 도입", [
            "BigQuery 유저 데이터에서 신고 임계치 직전 공고 내림·재등록 회피 패턴 발견",
            "작성 단계 넛징 삽입, 수정·재등록 주기 추적, 신고 3회 이상 공고 AI 자동 탐색·제재",
            "해당 유형 불법 공고 감소를 데이터로 확인",
        ]),
        ("알바 인증 분기 (8종)", [
            "사업자·재직증명·본인·신분증·얼굴·금융인증서·계좌·지역 인증 조합별 화면·기능 분기",
            "조건문 나열 대신 인증 상태 기반 구조 설계",
            "인증 조건 추가 시 분기 전체 수정 없이 확장 가능한 형태 확보",
        ]),
        ("React 웹뷰 사용성", [
            "네이티브 앱 안 마케팅 페이지·인앱 화면 개발",
            "이탈 구간을 지표로 확인 후 로딩·스크롤·네이티브 브릿지 동작 개선",
            "반복 UI를 재사용 컴포넌트로 정리",
        ]),
        ("크로스팀 장애 대응", [
            "알파 정상 / 프로덕션 실패 채팅 기능의 백엔드 처리 누락 지점 특정",
            "원인 가설과 함께 백엔드 리드에 전달 후 해결",
        ]),
        ("내 새끼 돌봐주기 마케팅", [
            "1차 지역별 반려동물 릴스 노출 → 2차 구인 등록 전환의 2단계 구조",
            "기획부터 배포까지 담당",
        ]),
    ],
))
story.append(career(
    "2. 인피니티텐서 · 풀스택 인턴",
    "2025.08.14 ~ 2025.11.16 (4개월) · AI 피팅 서비스 EffectGen 설계·출시 · Next.js 15 · Supabase · Replicate · Sora · Toss",
    [
        ("비동기 AI 생성 파이프라인", [
            "tasks PENDING 생성 → Replicate webhook(/api/webhooks/replicate) 완료 수신",
            "클라이언트 3초 폴링 + localStorage 상태 유지, 생성 중 이탈 방지",
            "임시 replicate.delivery URL을 Supabase Storage로 영구 백업 (실패 시 5회 재시도, 30초 타임아웃)",
            "OpenAI Sora Text-to-Video / Image-to-Video(multipart) 분리 구현",
        ]),
        ("Toss Billing 구독", [
            "Billing Key 발급 후 자동결제, 개인·팀 플랜을 plan-definitions 단일 소스로 관리",
            "업그레이드 프로레이션(잔여 기간 차액만 청구), 다운그레이드 pending_plan_change 예약",
            "사용량 리셋을 달력 1일이 아닌 결제일(billing_cycle) 기준으로 변경",
            "Vercel Cron /api/cron/billing + CRON_SECRET으로 갱신 배치 운영",
        ]),
        ("Google / Kakao OAuth", [
            "Supabase PKCE 세션 교환, 신규 유저 profiles 자동 생성",
            "OAuth 리다이렉트 경로를 localStorage로 보존 후 복원",
            "middleware로 /create /edit /works /profile 보호",
        ]),
        ("행동 메트릭 · 어드민", [
            "Mixpanel · GA4 · Meta Pixel을 track() 한 경로로 통합",
            "생성·템플릿·결제·구독·한도 이벤트 설계, purchase/sign_up 전환 매핑",
            "어드민 계정 트래킹 제외, Mixpanel Segmentation을 template_id로 집계(5분 캐시)",
            "유저·결제·템플릿·생성 히스토리 어드민 화면 구성",
        ]),
    ],
))

story.append(h("VI", "Awards / 수상"))
story.append(project(
    "SLOP · 제12회 선린 해커톤 금상 1위 · 2026",
    "웹 콘텐츠를 숏폼 영상으로 변환하는 서비스 · Plasmo, Next.js 16, React 19, TypeScript",
    None, None,
    [
        "<b>Chrome 확장</b> 브라우저 플로팅 버튼으로 현재 페이지 URL을 백그라운드에 전달, 분석·요약·쇼츠 생성 3단계 진행 상황을 확장 패널에 실시간 표시",
        "<b>영상 생성 대기 처리</b> 생성이 지연돼도 폴링을 포기하지 않고 상태를 확인해 뒤늦게 완료된 영상도 놓치지 않도록 처리",
        "<b>재생·공유</b> 완성된 9:16 세로 영상을 패널에서 바로 재생·공유",
        "<b>부가 기능</b> 기사 원문을 흐리게 남기고 쉬운 문장을 그 자리에 삽입하는 인라인 재해석, 확장↔웹앱 인증 상태 공유 브릿지",
    ],
))
story.append(project(
    "우리동네 청사진 · Daangn Builder's Camp 우승 1위 · 2025.09",
    "시민 참여 민원 플랫폼 · Next.js 15, React 19, TypeScript, Zustand · 이후 당근 알바팀 인턴 합류",
    None, None,
    [
        "<b>지도</b> 네이버 지도 API 위치 기반 민원 시각화",
        "<b>실시간</b> WebSocket 실시간 채팅",
        "<b>보안·성능</b> Cloudflare Turnstile 봇 방어, 메모리+localStorage 이중 캐싱",
        "<b>AI·문서</b> AI 이미지 생성 연동, PDF 민원 문서 자동 생성",
    ],
))
story.append(project(
    "Scholub · 디지털 콘텐츠 개발 대회 생활 부문 금상 1위 · 2025.11",
    "AI 논문 검색·토론 플랫폼 · React 19, TypeScript, Vite, Tailwind CSS v4, Docker, Nginx",
    None, None,
    [
        "<b>AI 응답</b> SSE 기반 실시간 스트리밍으로 대기 시간을 체감하지 않도록 구현",
        "<b>UX</b> 토론 기능에 Optimistic UI 적용, 네트워크 지연과 무관하게 즉시 반응",
        "<b>구조·인증</b> JWT 인증과 중앙 집중형 API 클라이언트 설계, Feature-Sliced Design 아키텍처",
        "<b>배포</b> Docker·Nginx 프로덕션 배포 환경 구성, Tailwind v4 디자인 시스템",
    ],
))
story.append(project(
    "Speakit · AppJam 미래산업 부문 최우수상 1위 · 2025.02",
    "AI 발표 연습 앱 · React Native, Expo",
    None, None,
    [
        "<b>음성</b> expo-av 음성 녹음·재생과 STT 음성 인식 구현",
        "<b>AI</b> AI 채팅 기반 대본 교정·예상 질문 생성 시스템 개발",
        "<b>UI</b> Animated API로 녹음 리플 이펙트·바텀시트 애니메이션, React Navigation으로 인증·탭 네비게이션 설계",
    ],
))
story.append(project(
    "Fusion M · U/THON 해커톤 우수상 2위 · 2025.07",
    "MCP 서버 관리 대시보드 · Next.js 15, React 19, TypeScript",
    None, None,
    [
        "<b>UI·폼</b> Radix UI + shadcn/ui 컴포넌트 시스템, react-hook-form + Zod 타입 안전 폼 검증",
        "<b>백엔드 연동</b> Next.js API Routes를 프록시 계층으로 활용해 백엔드 통신 설계",
        "<b>기능</b> 실시간 채팅 인터페이스, 코드 구문 강조 뷰어, 자연어 기반 MCP 그룹 생성",
    ],
))
story.append(project(
    "십시일반 · 제11회 선린 해커톤 은상 2위 · 2025.07",
    "소방관 전용 QR 모바일 결제 앱 · React Native, Expo",
    None, None,
    [
        "<b>지도</b> react-native-maps · expo-location 기반 가맹점 탐색",
        "<b>결제</b> QR 코드 생성과 만료 타이머 결제, Google OAuth 인증",
        "<b>UX</b> PanResponder·Animated 바텀시트 제스처, 실시간 주문 추적 화면",
    ],
))
story.append(project(
    "Fresio · SW 동행 해커톤 한국과학창의재단 이사장상 2위 · 2024.12",
    "AI 냉장고 어시스턴트 크로스플랫폼 앱 · React Native, Expo, BLE, WiFi Direct",
    None, None,
    [
        "<b>연결</b> BLE 단독 연결의 거리·간섭 문제를 BLE 초기 페어링 후 WiFi Direct로 자동 전환하는 듀얼 연결 시스템으로 해결",
        "<b>백그라운드</b> 앱이 백그라운드로 가면 타이머가 멈추는 문제를 Headless JS Task + Native Module 기반 복원 아키텍처로 해결",
        "<b>실시간</b> WebSocket 실시간 동기화, 자동 재연결, 메시지 큐잉",
        "<b>입력</b> 바코드 스캔·이미지 인식 재료 등록",
    ],
))
story.append(Paragraph("기타 성과", st_h2))
story.append(bullet("<b>NYPC</b> 넥슨 본선 진출. 선린 진학 전 Java·Python으로 알고리즘 학습"))
story.append(bullet("<b>STA+C</b> 결선"))

story.append(h("VII", "Self Introduction / 자기소개"))
story.append(Paragraph("만드는 일에서, 그 아래를 책임지는 일로", st_h2))
story.append(Paragraph(
    "부모님 두 분이 IT 업계에 계신 덕분에 어릴 때부터 하드웨어를 조립하며 부품이 하나의 시스템이 되는 순간에 끌렸고, "
    "그 감각이 웹 개발을 거쳐 클라우드 인프라와 데이터 파이프라인으로 이어졌습니다.",
    st_body,
))
story.append(Paragraph(
    "당근마켓에서 BigQuery로 유저 데이터를 분석하며 데이터가 제품의 판단 근거가 된다는 것을 배웠고, "
    "인피니티텐서에서는 사용자 행동 메트릭 시스템을 직접 설계했습니다. "
    "그 아래 구조를 직접 만들고 싶어 새싹 클라우드 데이터 엔지니어 과정에서 AWS와 Redshift를 배우고, "
    "인프라를 Terraform 코드와 CI/CD로 재현 가능하게 만들고 서비스를 멈추지 않고 배포하는 방법을 익혔습니다. "
    "Python 파이프라인으로 공공 데이터를 수집·정제·공간 조인해 대시보드로 보여주며, "
    "모으는 사람이자 쓰는 사람의 관점을 모두 경험했습니다.",
    st_body,
))
story.append(Paragraph(
    "프론트엔드와 백엔드를 알기에 서비스가 인프라와 데이터에 무엇을 요구하는지 이해하고, "
    "운영하는 입장에서 안정적인 파이프라인과 인프라를 만드는 클라우드·데이터 엔지니어로 성장하고 싶습니다.",
    st_body,
))
story.append(Paragraph("이 이력서의 모든 기재사항은 사실과 다름이 없음을 확인합니다. 작성자: 신이현", st_sign))

def footer(canvas, doc_):
    canvas.saveState()
    canvas.setFont("KR", 8)
    canvas.setFillColor(MUTED)
    canvas.drawRightString(A4[0] - 18 * mm, 10 * mm, str(doc_.page))
    canvas.restoreState()

doc.build(story, onFirstPage=footer, onLaterPages=footer)
print(out)
