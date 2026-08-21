# JHFLEX 로컬 실행 안내

## 1. 의존성 설치

PowerShell에서 아래 폴더로 이동한 뒤 실행합니다.

```powershell
cd "D:\Works\Project\01_진행중\JH_Flex Site"
corepack pnpm install
```

## 2. 개발 서버 실행

```powershell
corepack pnpm dev -- --open
```

터미널에 표시되는 `http://localhost:3000` 주소를 브라우저에서 열면 됩니다.

## 포함된 항목

- `client/src/pages/Home.tsx`: 홈페이지 섹션과 인터랙션
- `client/src/index.css`: 레이아웃, 반응형, Hero 회로 오버레이 모션
- `client/public/assets/`: Hero 배경과 favicon용 이미지 자산

이 복제본은 관리형 자산 URL을 로컬 `/assets/` 경로로 교체한 독립 실행용 소스입니다.
