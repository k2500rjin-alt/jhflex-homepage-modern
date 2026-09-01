# 📋 JH FLEX 홈페이지 변경 및 배포 내역 보고서 (2026-09-01)

본 문서는 **JH FLEX 모던 웹사이트 개편 프로젝트**의 주요 디자인 개선, 다크 모드 구현, 호스팅 플랫폼 이전(Vercel) 및 보안 설정 내역을 정리한 문서입니다.

---

## 1. 🎨 메인 히어로 섹션 디자인 및 가시성 개선

### 1) 회로 라인 두께 및 선명도 대폭 상향
- **고정 회로선 (Static Circuit Traces)**: `1px` ➔ **`2.5px`** 로 상향하여 회로 기판의 윤곽이 뚜렷하게 보이도록 개선
- **그리드 격자 라인 (Grid Lines)**: `0.5px` ➔ **`1px`** 로 강화
- **비아 접점 링 (Via Rings) & IC 칩 외곽**: `1px` ➔ **`2px`** 로 보강
- **동적 신호 전류선 (Flowing Traces)**: `2px` ➔ **`2.5px ~ 3px`** 로 상향

### 2) 텍스트 레이어 최상위 분리 (z-index 및 독립 스택 컨텍스트)
- **문제점**: 동적 레이저/전류선 애니메이션이 텍스트 위로 지나가면서 글자가 가려지는 현상 발생
- **해결 조치**:
  - 배경 회로 캔버스(`.pcb-canvas`)를 `z-index: 0 !important` 및 `pointer-events: none`으로 최하단 배경 레이어로 격리
  - 텍스트/버튼 컨테이너(`.hero-content-layer`)에 `position: relative`, `z-index: 50 !important`, `isolation: isolate`를 적용하여 모든 글자와 버튼이 배경 애니메이션 위로 절대 덮이지 않고 맨 위에 선명하게 렌더링되도록 강제 고정

---

## 2. 🌙 다크 모드(Dark Mode) 전면 구축 및 기본값 설정

### 1) Tailwind CSS v4 테마 변수 시스템 연결
- 최신 Tailwind v4 환경에서 테마가 즉시 반응하도록 `@custom-variant dark` 설정 적용
- 고정 색상값을 동적 HSL CSS 변수(`hsl(var(--background))`, `hsl(var(--foreground))`, `hsl(var(--card))` 등)로 연동

### 2) 다크 모드를 기본(Default) 테마로 적용
- `client/index.html`: `<html>` 태그에 `class="dark"` 기본 적용 (초기 진입 시 흰 화면 깜빡임 방지)
- `App.tsx` & `ThemeContext.tsx`: `defaultTheme="dark"` 설정
- 상단 헤더의 Sun/Moon 토글 버튼을 통해 사용자가 원할 때 라이트 모드 ↔ 다크 모드를 실시간 전환 가능

### 3) 전 섹션 고대비 다크 테마 디자인 튜닝
- **배경 및 카드**: 딥 차콜/다크 슬레이트 톤(`bg-background`, `bg-card`)
- **회사연혁 / 특수방산 / 핵심기술 섹션**: 다크 그린-블랙 톤(`bg-[#0e140d]`)과 글래스모피즘 보더 적용
- **동적 회로 애니메이션**: 어두운 배경 위에서 네온 시안/블루 회로선이 고급스럽게 발광하도록 최적화

---

## 3. 🚀 호스팅 플랫폼 이전 및 Vercel 배포 완료

### 1) Vercel 신규 프로젝트 배포
- **프로젝트명**: `JH Flex-G1` (식별자: `jh-flex-g1`)
- **공식 서비스 도메인**: [https://jh-flex-g1.vercel.app/](https://jh-flex-g1.vercel.app/)
- **Vercel 설정 파일(`vercel.json`) 추가**: SPA 라우팅 및 빌드 출력 경로(`dist/public`) 자동화 구성
- **루트 경로 지원**: `vite.config.ts`에서 Vercel 배포 환경 감지(`base: "/"`) 지원

### 2) 배포 보호(SSO Protection) 해제 및 공개 접근 활성화
- Vercel 생성 시 기본으로 걸려 있던 '로그인 요구 보호(Deployment Protection)'를 비활성화하여, 방문자가 로그인 없이 즉시 사이트를 이용할 수 있도록 조치
- 임시로 생성되었던 이전 도메인(`kt-skylife-g1.vercel.app`) 완전 삭제

### 3) 기존 깃페이지스(GitHub Pages) 배포 중단
- `jhflex-homepage-` (기존 원본 저장소)의 `gh-pages` 브랜치 삭제 완료
- `jhflex-homepage-modern` (신규 모던 저장소)의 `gh-pages` 브랜치 삭제 완료
- ➔ 깃페이지스 서비스를 종료하고 **Vercel 단독 고성능 호스팅으로 완전 전환**

---

## 4. 🔒 보안 및 비공개(Private) 저장소 상태 확인

- **GitHub 저장소 비공개 유지**: 소스 코드가 저장된 GitHub 레포지토리는 **100% Private(비공개)** 상태로 안전하게 유지 중 (퍼블릭 전환 일절 없음)
- **서버리스 견적 문의 시스템**: 데이터베이스(DB)나 백엔드 서버를 두지 않고, `FormSubmit` 암호화 토큰을 통해 고객 문의가 대표님 이메일로 직통 전송되는 무결점 보안 구조 유지
- **전송 구간 암호화**: Vercel 기본 SSL/TLS 인증서를 통한 HTTPS 자동 암호화 적용

---

## 5. 📁 관련 주요 파일 목록

- `client/src/pages/Home.tsx` : 메인 페이지 레이아웃, 히어로 회로 SVG, 섹션별 다크모드 스타일
- `client/src/index.css` : Tailwind v4 HSL 변수 맵핑, `.pcb-canvas` 및 `.hero-content-layer` 스타일
- `client/src/App.tsx` & `ThemeContext.tsx` : 다크모드 기본값 및 테마 스위처
- `client/index.html` : `class="dark"` 기본 메타 설정
- `vite.config.ts` & `vercel.json` : Vercel 배포 및 SPA 라우팅 설정
- `docs/CHANGELOG_2026_09_01.md` : 본 변경 내역 보고서