import { useState } from "react";
import { Button } from "../components/ui/button";
import { ContactDialog } from "../components/ContactDialog";
import { ArrowRight, ArrowUpRight, ShieldCheck, ChevronRight, Menu, X, Moon, Sun } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";

const navItems = [
  ["회사소개", "about"],
  ["제품소개", "products"],
  ["방산사업", "defense"],
  ["제조공정", "process"],
  ["기술사양", "tech"],
  ["사용소재", "material"],
];

const history = [
  ["2009", "JH FLEX 설립", "경기도 안산시 창업. 모바일·자동차 부품 납품을 시작했습니다."],
  ["2013", "방산업체 진입", "방산업체 등록과 BBT 장비 증설로 검사 역량을 강화했습니다."],
  ["2014", "생산 라인 확장", "반자동 가접 및 수가접 라인을 구축하고 납품처를 넓혔습니다."],
  ["2021", "현 사업장 이전", "안산시 단원구 만해로 205, 타원타크라3차로 이전했습니다."],
  ["2025", "R-FPCB 개발 확장", "Rigid-FPCB 개발 샘플을 진행하며 고부가 제품을 확대했습니다."],
];

const diagramSpecs = [
  { eyebrow: "SINGLE LAYER", title: "단면 FPCB", body: "한 면에 회로가 있는 기본 플렉시블 구조", layers: ["커버레이 (Coverlay)", "접착제 (Adhesive)", "동박 회로 (Copper)", "폴리이미드 (PI)"] },
  { eyebrow: "DOUBLE LAYER", title: "양면 FPCB", body: "양면 회로와 비아 연결로 구성된 구조", layers: ["커버레이", "동박 회로", "폴리이미드", "동박 회로", "커버레이"] },
  { eyebrow: "RIGID-FLEXIBLE", title: "Rigid-Flexible", body: "Rigid FR-4와 Flex PI가 결합된 복합 구조", layers: ["Rigid FR-4", "Coverlay", "Flexible PI", "Copper Layer"] },
  { eyebrow: "MULTI FPCB", title: "멀티 FPCB", body: "고밀도 신호 처리를 위한 다층 적층 구조", layers: ["Coverlay", "Copper 1", "PI Core", "Copper 2", "PI Core", "Copper 3"] },
  { eyebrow: "METAL CORE", title: "메탈 PCB", body: "열을 빠르게 분산하는 금속 코어 방열 구조", layers: ["LED / Circuit", "Copper Trace", "Dielectric", "Aluminium Core"] },
  { eyebrow: "PROTOTYPE", title: "시제품 / 소량 제작", body: "R&D용 빠른 검증과 소량 제작을 위한 구성", layers: ["CAD/CAM", "FPCB Pattern", "BBT Test", "Quick Delivery"] },
];

const products = [
  ["01", "SINGLE LAYER", "단면 FPCB", "단일 회로층 플렉시블 PCB. 표시장치 연결용과 방산 장비에 적용됩니다.", ["1Layer", "Pyralux® LF", "Polyimide 25μm"]],
  ["02", "DOUBLE LAYER", "양면 FPCB", "복잡한 회로 연결이 필요한 통신·산업용 장비에 적용됩니다.", ["2Layer", "Pyralux® AP", "RA·ED 동박"]],
  ["03", "RIGID-FLEXIBLE", "Rigid-Flexible", "Rigid FR-4와 Flexible PI를 복합 적층한 4층 구조입니다.", ["4Layer R-F", "Pyralux® AP", "Push-Back 공법"]],
  ["04", "MULTI FPCB", "멀티 FPCB", "6층 다층 플렉시블 구조. 고밀도 신호 처리 장치에 적용됩니다.", ["6Layer", "Pyralux® AP", "고밀도 적층"]],
  ["05", "METAL CORE", "메탈 PCB", "알루미늄·동 기판 기반 고방열 PCB로 전력장치에 적용됩니다.", ["알루미늄기판", "고방열", "LED·전력"]],
  ["06", "PROTOTYPE", "시제품 / 소량 제작", "R&D와 스타트업을 위한 최소 1장부터의 신속 제작 서비스입니다.", ["1장~", "3~5일 납기", "전종 가능"]],
];

const defense = [
  ["01", "레이더·통신 시스템", "고주파 신호 손실 최소화가 필요한 레이더·군용 통신 장비 내부 연결 회로", "RF FPCB"],
  ["02", "전자전·유도 장비", "EMI 차폐가 중요한 전자전 장비 및 정밀 유도 시스템의 핵심 연결 기판", "EMI 차폐"],
  ["03", "항공·우주 전장 부품", "극한 온도·진동 환경에서 신뢰성이 필요한 항공기·무인기 전장 시스템", "Rigid-Flex"],
  ["04", "보안·정밀 제어 장치", "군용 보안 단말과 정밀 제어 장비의 소형·경량 고밀도 설계", "고밀도"],
];

const processSteps = [
  "CAD/CAM", "재단공정", "드릴공정", "동도금공정", "정면공정", "D/F공정", "노광공정", 
  "AOI검사", "현상공정", "부식공정", "박리공정", "C/L Punching", "가접공정", "Hot-Press", 
  "후가공정", "표면처리공정", "인쇄공정", "STF부착공정", "단선타발공정", "B.B.T공정", 
  "외형타발공정", "최종검사"
];

const techSpecs = [
  ["01", "미세 패턴 · 고밀도 구현", "Line/Space 최소 75μm의 미세 회로 구현. 최소 비아홀 0.1mm.", ["Min. L/S 75μm", "Min. Hole 0.1mm", "±50μm 정렬도"]],
  ["02", "DuPont™ Pyralux® AP 소재", "접착제 없는 All-Polyimide 구조. RF·고속 신호에서 탁월한 신호무결성.", ["Pyralux® AP", "Dk 3.2 @10GHz", "Tg 220°C"]],
  ["03", "극한 굴곡 내구성", "IPC-TM-650 기준 굴곡 6,000사이클 이상. 진동 환경에서도 특성 유지.", ["굴곡 6,000+ cycles", "인장강도 345MPa", "연신율 50%"]],
  ["04", "ISO 이중 인증 품질 체계", "ISO 9001·14001 동시 인증. BBT·AOI 100% 전수검사.", ["ISO 9001", "ISO 14001", "BBT 전수검사"]]
];

const materials = [
  { eyebrow: "DUPONT™ PYRALUX®", title: "Pyralux® AP", desc: "All-Polyimide Double-Sided CCL. 접착제 없는 구조로 다층 Flex·Rigid-Flex 적용에 최적입니다.", stats: [["3.2 Dk", "유전율 (10GHz)"], ["0.002 Df", "손실계수 (1MHz)"], ["220°C Tg", "유리전이온도"], ["6,000+", "굴곡 내구성"]] },
  { eyebrow: "DUPONT™ PYRALUX®", title: "Pyralux® LF Coverlay", desc: "Kapton® 폴리이미드 필름과 아크릴 접착제 구조. Flex·Rigid-Flex 회로 보호용 커버레이입니다.", stats: [["3.6 Dk", "유전율 (1MHz)"], ["10 lb/in", "박리강도"], ["25~76μm", "접착제 두께"]] }
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  return (
    <div id="top" className="flex flex-col min-h-screen">
      {/* 0. STICKY HEADER / NAVBAR */}
      <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto max-w-7xl flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Brand Logo */}
          <a href="#top" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center font-extrabold text-primary-foreground text-sm tracking-tighter shadow-sm">
              JH
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-base leading-tight tracking-tight text-foreground">
                JH <span className="text-primary-foreground font-extrabold">FLEX</span>
              </span>
              <span className="text-[10px] text-muted-foreground font-medium tracking-wider">
                FPCB SPECIALIST · EST. 2009
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium">
            {navItems.map(([label, id]) => (
              <a
                key={id}
                href={`#${id}`}
                className="text-muted-foreground hover:text-foreground transition-colors hover:text-primary-foreground font-semibold"
              >
                {label}
              </a>
            ))}
          </nav>

          {/* Header Action Buttons */}
          <div className="flex items-center gap-3">
            {toggleTheme && (
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
                aria-label="테마 변경"
              >
                {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
            )}

            <ContactDialog>
              <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90 font-bold px-4 h-9 gap-1.5 shadow-sm">
                견적 문의 <ArrowUpRight className="w-4 h-4" />
              </Button>
            </ContactDialog>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50"
              aria-label="메뉴 열기"
            >
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {menuOpen && (
          <div className="md:hidden border-b border-border bg-background px-4 py-3 space-y-1">
            {navItems.map(([label, id]) => (
              <a
                key={id}
                href={`#${id}`}
                onClick={() => setMenuOpen(false)}
                className="block px-3 py-2 rounded-md text-base font-medium text-foreground hover:bg-muted hover:text-primary-foreground"
              >
                {label}
              </a>
            ))}
          </div>
        )}
      </header>

      {/* 1. HERO SECTION */}
      <section className="flex flex-col items-center justify-center min-h-[85vh] text-center px-4 py-20 bg-background relative overflow-hidden">
        <div className="pcb-canvas">
          <svg viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="traceGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#00D4F5" stopOpacity="0"/>
                <stop offset="50%" stopColor="#00D4F5" stopOpacity="1"/>
                <stop offset="100%" stopColor="#00D4F5" stopOpacity="0"/>
              </linearGradient>
              <linearGradient id="traceGrad2" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#1878CC" stopOpacity="0"/>
                <stop offset="50%" stopColor="#1878CC" stopOpacity="1"/>
                <stop offset="100%" stopColor="#1878CC" stopOpacity="0"/>
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                <feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge>
              </filter>
              <filter id="glow-strong">
                <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                <feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge>
              </filter>
            </defs>
      
            {/* Grid Lines */}
            <g stroke="currentColor" className="text-primary/20" strokeWidth="1">
              <line x1="0" y1="100" x2="1440" y2="100"/>
              <line x1="0" y1="200" x2="1440" y2="200"/>
              <line x1="0" y1="300" x2="1440" y2="300"/>
              <line x1="0" y1="400" x2="1440" y2="400"/>
              <line x1="0" y1="500" x2="1440" y2="500"/>
              <line x1="0" y1="600" x2="1440" y2="600"/>
              <line x1="0" y1="700" x2="1440" y2="700"/>
              <line x1="0" y1="800" x2="1440" y2="800"/>
              <line x1="160" y1="0" x2="160" y2="900"/>
              <line x1="320" y1="0" x2="320" y2="900"/>
              <line x1="480" y1="0" x2="480" y2="900"/>
              <line x1="640" y1="0" x2="640" y2="900"/>
              <line x1="800" y1="0" x2="800" y2="900"/>
              <line x1="960" y1="0" x2="960" y2="900"/>
              <line x1="1120" y1="0" x2="1120" y2="900"/>
              <line x1="1280" y1="0" x2="1280" y2="900"/>
            </g>
      
            {/* IC Chips */}
            <g fill="none" stroke="rgba(0,212,245,0.4)" strokeWidth="2">
              <rect className="chip-blink" x="800" y="150" width="120" height="80" rx="4"/>
              <rect className="chip-blink" x="810" y="160" width="100" height="60" rx="2"/>
              <line x1="800" y1="170" x2="780" y2="170"/> <line x1="800" y1="180" x2="780" y2="180"/>
              <line x1="800" y1="190" x2="780" y2="190"/> <line x1="800" y1="200" x2="780" y2="200"/>
              <line x1="920" y1="170" x2="940" y2="170"/> <line x1="920" y1="180" x2="940" y2="180"/>
              <line x1="920" y1="190" x2="940" y2="190"/> <line x1="920" y1="200" x2="940" y2="200"/>
              <line x1="820" y1="150" x2="820" y2="130"/> <line x1="840" y1="150" x2="840" y2="130"/>
              <line x1="860" y1="150" x2="860" y2="130"/> <line x1="880" y1="150" x2="880" y2="130"/>
              <line x1="820" y1="230" x2="820" y2="250"/> <line x1="840" y1="230" x2="840" y2="250"/>
              <line x1="860" y1="230" x2="860" y2="250"/> <line x1="880" y1="230" x2="880" y2="250"/>
            </g>
            <g fill="none" stroke="rgba(0,212,245,0.35)" strokeWidth="2">
              <rect className="chip-blink" x="1100" y="400" width="100" height="70" rx="4"/>
              <rect className="chip-blink" x="1108" y="408" width="84" height="54" rx="2"/>
              <line x1="1100" y1="415" x2="1082" y2="415"/> <line x1="1100" y1="425" x2="1082" y2="425"/>
              <line x1="1100" y1="435" x2="1082" y2="435"/> <line x1="1100" y1="445" x2="1082" y2="445"/>
              <line x1="1200" y1="415" x2="1218" y2="415"/> <line x1="1200" y1="425" x2="1218" y2="425"/>
              <line x1="1200" y1="435" x2="1218" y2="435"/> <line x1="1200" y1="445" x2="1218" y2="445"/>
            </g>
            <g fill="none" stroke="rgba(24,120,204,0.4)" strokeWidth="2">
              <rect className="chip-blink" x="950" y="600" width="90" height="65" rx="4"/>
              <rect className="chip-blink" x="957" y="607" width="76" height="51" rx="2"/>
              <line x1="950" y1="615" x2="933" y2="615"/> <line x1="950" y1="625" x2="933" y2="625"/>
              <line x1="950" y1="635" x2="933" y2="635"/> <line x1="950" y1="645" x2="933" y2="645"/>
              <line x1="1040" y1="615" x2="1057" y2="615"/> <line x1="1040" y1="625" x2="1057" y2="625"/>
            </g>
      
            {/* Background Circuit Traces (Static Thick Lines) */}
            <g stroke="rgba(0,212,245,0.25)" strokeWidth="2.5" fill="none">
              <path d="M0,300 L200,300 L200,200 L400,200 L400,400 L600,400"/>
              <path d="M600,400 L600,250 L800,250 L800,150"/>
              <path d="M940,150 L1000,150 L1000,300 L1100,300 L1100,400"/>
              <path d="M1200,400 L1300,400 L1300,250 L1440,250"/>
              <path d="M0,600 L150,600 L150,500 L350,500 L350,650 L550,650"/>
              <path d="M550,650 L550,750 L750,750 L750,600 L950,600"/>
              <path d="M1040,600 L1100,600 L1100,470 L1200,470"/>
              <path d="M1200,470 L1300,470 L1300,600 L1440,600"/>
              <path d="M200,800 L200,700 L500,700 L500,800 L800,800"/>
              <path d="M1100,700 L1100,800 L1300,800 L1300,700 L1440,700"/>
            </g>
            <g stroke="rgba(24,120,204,0.22)" strokeWidth="2.5" fill="none">
              <path d="M0,150 L100,150 L100,50 L300,50 L300,150 L500,150 L500,50 L700,50"/>
              <path d="M900,100 L1000,100 L1000,50 L1200,50 L1200,100 L1440,100"/>
              <path d="M0,450 L200,450 L200,550 L450,550 L450,450 L650,450"/>
              <path d="M800,850 L900,850 L900,750 L1050,750 L1050,850 L1250,850 L1250,750 L1440,750"/>
            </g>
      
            {/* Static Via Ring Circles */}
            <g fill="none" stroke="rgba(0,212,245,0.35)" strokeWidth="2">
              <circle cx="200" cy="300" r="8"/><circle cx="200" cy="300" r="4"/>
              <circle cx="400" cy="200" r="8"/><circle cx="400" cy="200" r="4"/>
              <circle cx="800" cy="150" r="8"/><circle cx="800" cy="150" r="4"/>
              <circle cx="960" cy="300" r="6"/><circle cx="960" cy="300" r="3"/>
              <circle cx="1100" cy="400" r="8"/><circle cx="1100" cy="400" r="4"/>
              <circle cx="320" cy="500" r="6"/><circle cx="320" cy="500" r="3"/>
              <circle cx="800" cy="600" r="8"/><circle cx="800" cy="600" r="4"/>
              <circle cx="960" cy="600" r="6"/><circle cx="960" cy="600" r="3"/>
              <circle cx="160" cy="750" r="8"/><circle cx="160" cy="750" r="4"/>
              <circle cx="500" cy="800" r="6"/><circle cx="500" cy="800" r="3"/>
            </g>
      
            {/* Dynamic Animated Flowing Signal Traces */}
            <path className="trace trace-1" d="M-50,300 L200,300 L200,200 L400,200 L400,300 L700,300"
              stroke="#00D4F5" strokeWidth="3" fill="none" filter="url(#glow)" opacity="0.95"/>
            <path className="trace trace-2" d="M-50,500 L150,500 L150,600 L400,600 L400,500 L650,500"
              stroke="#1878CC" strokeWidth="2.5" fill="none" filter="url(#glow)" opacity="0.85"/>
            <path className="trace trace-3" d="M700,200 L900,200 L900,150 L1100,150 L1100,200 L1300,200 L1300,150 L1490,150"
              stroke="#00D4F5" strokeWidth="3" fill="none" filter="url(#glow)" opacity="0.95"/>
            <path className="trace trace-4" d="M-50,700 L200,700 L200,800 L500,800 L500,700 L800,700"
              stroke="#1878CC" strokeWidth="2.5" fill="none" filter="url(#glow)" opacity="0.8"/>
            <path className="trace trace-5" d="M320,0 L320,200 L480,200 L480,400 L640,400 L640,600 L800,600 L800,900"
              stroke="#00D4F5" strokeWidth="2.5" fill="none" filter="url(#glow)" opacity="0.9"/>
            <path className="trace trace-6" d="M960,0 L960,150 L800,150 L800,300 L960,300 L960,470 L1100,470 L1100,700 L960,700 L960,900"
              stroke="#1878CC" strokeWidth="3" fill="none" filter="url(#glow)" opacity="0.9"/>
            <path className="trace trace-7" d="M1280,0 L1280,100 L1200,100 L1200,300 L1280,300 L1280,500 L1200,500 L1200,700 L1280,700 L1280,900"
              stroke="#00D4F5" strokeWidth="2.5" fill="none" filter="url(#glow)" opacity="0.85"/>
            <path className="trace trace-8" d="M160,0 L160,300 L320,300 L320,500 L160,500 L160,750 L320,750 L320,900"
              stroke="#1878CC" strokeWidth="2" fill="none" filter="url(#glow)" opacity="0.75"/>
      
            {/* Glowing Pulsing Nodes */}
            <g fill="#00D4F5" filter="url(#glow-strong)">
              <circle className="node-glow" cx="200" cy="300" r="4.5"/>
              <circle className="node-glow" cx="400" cy="200" r="4.5"/>
              <circle className="node-glow" cx="640" cy="400" r="4"/>
              <circle className="node-glow" cx="800" cy="300" r="4.5"/>
              <circle className="node-glow" cx="960" cy="150" r="4"/>
              <circle className="node-glow" cx="1100" cy="400" r="4.5"/>
              <circle className="node-glow" cx="1280" cy="300" r="4"/>
              <circle className="node-glow" cx="320" cy="500" r="4.5"/>
              <circle className="node-glow" cx="480" cy="600" r="4"/>
              <circle className="node-glow" cx="800" cy="700" r="4.5"/>
              <circle className="node-glow" cx="960" cy="600" r="4"/>
              <circle className="node-glow" cx="1200" cy="500" r="4.5"/>
              <circle className="node-glow" cx="160" cy="750" r="4"/>
              <circle className="node-glow" cx="500" cy="800" r="4.5"/>
            </g>
            <g fill="#1878CC" filter="url(#glow)">
              <circle className="node-glow" cx="150" cy="500" r="4"/>
              <circle className="node-glow" cx="400" cy="600" r="4.5"/>
              <circle className="node-glow" cx="650" cy="500" r="4"/>
              <circle className="node-glow" cx="960" cy="300" r="4.5"/>
              <circle className="node-glow" cx="1100" cy="470" r="4"/>
              <circle className="node-glow" cx="1300" cy="200" r="4.5"/>
            </g>
      
            {/* Light Scan Sweeping Line */}
            <g className="scan-line">
              <rect x="0" y="0" width="3.5" height="900" fill="url(#traceGrad2)" opacity="0.3"/>
              <rect x="5" y="0" width="2" height="900" fill="rgba(0,212,245,0.5)"/>
            </g>
          </svg>
        </div>
        
        <div className="hero-content-layer relative z-50 space-y-6 max-w-4xl">
          <div className="inline-flex items-center rounded-full bg-primary/30 backdrop-blur-sm px-4 py-1.5 text-sm text-primary-foreground font-semibold mb-2 border border-primary/40 shadow-xs relative z-50">
            FPCB SPECIALIST · EST. 2009
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-foreground leading-[1.1] relative z-50">
            혁신적인 <span className="text-primary-foreground">FPCB 제조</span>의 <br className="hidden md:block"/>
            새로운 기준을 제시합니다
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto pt-6 leading-relaxed relative z-50 font-medium">
            방산 장비부터 첨단 모바일, 산업용 정밀 부품까지. JH FLEX는 고품질 플렉시블 기판(FPCB)과 신뢰성 높은 제조 공정으로 미래 기술을 뒷받침합니다.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8 relative z-50">
            <a href="#products">
              <Button size="lg" variant="outline" className="font-bold gap-2 h-12 px-7 text-base border-primary/50 hover:bg-primary/10 bg-background/90 backdrop-blur-sm shadow-xs">
                제품 둘러보기 <ArrowRight className="w-4 h-4" />
              </Button>
            </a>
            <a href="#about">
              <Button size="lg" variant="ghost" className="font-bold gap-2 h-12 px-7 text-base hover:bg-muted bg-background/80 backdrop-blur-sm shadow-xs">
                회사 소개 <ChevronRight className="w-4 h-4" />
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* 2. ABOUT SECTION (History) */}
      <section id="about" className="py-24 px-4 sm:px-6 lg:px-8 bg-primary-foreground text-primary border-t border-primary-foreground">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white">끊임없는 혁신과 성장</h2>
            <p className="text-primary/80 mt-4 text-lg">2009년부터 이어온 JH FLEX의 주요 연혁</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {history.map((item, index) => (
              <div key={index} className="bg-white/5 border border-white/10 p-8 rounded-2xl backdrop-blur-sm shadow-sm hover:bg-white/10 transition-colors">
                <span className="text-primary/40 font-mono text-xl font-bold mb-4 block">{item[0]}</span>
                <h3 className="text-xl font-bold text-white mb-3">{item[1]}</h3>
                <p className="text-primary/70 leading-relaxed text-sm">{item[2]}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. PRODUCTS SECTION */}
      <section id="products" className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">주요 생산 제품</h2>
              <p className="text-muted-foreground text-lg max-w-2xl">단면부터 다층 Rigid-Flexible까지, 모든 산업에 적용 가능한 고정밀 제품군을 제공합니다.</p>
            </div>
            <Button variant="outline" className="w-fit gap-2">
              전체 제품 보기 <ChevronRight className="w-4 h-4" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((prod, index) => (
              <div key={index} className="group flex flex-col bg-background border border-border rounded-2xl overflow-hidden hover:border-primary/50 transition-colors">
                <div className="h-48 bg-muted/50 flex flex-col items-center justify-center border-b border-border relative overflow-hidden p-6 gap-1.5">
                  <div className="absolute top-4 left-4 bg-background/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold border border-border z-10 text-foreground">
                    {prod[0]}
                  </div>
                  {diagramSpecs[index].layers.map((layer, lIdx) => (
                    <div key={lIdx} className="w-full max-w-[80%] bg-primary/10 border border-primary/20 rounded text-center text-xs text-primary-foreground py-1.5 font-medium shadow-sm">
                      {layer}
                    </div>
                  ))}
                </div>
                <div className="p-8 flex-1 flex flex-col">
                  <h3 className="text-lg font-bold text-primary-foreground mb-1">{prod[1]}</h3>
                  <h4 className="text-2xl font-extrabold text-foreground mb-4">{prod[2]}</h4>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-6 flex-1">
                    {prod[3]}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {(prod[4] as string[]).map((tag, i) => (
                      <span key={i} className="bg-muted px-3 py-1.5 rounded-md text-xs font-medium text-foreground">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. DEFENSE SECTION */}
      <section id="defense" className="py-24 px-4 sm:px-6 lg:px-8 bg-primary-foreground text-primary">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <ShieldCheck className="w-16 h-16 mx-auto mb-6 opacity-90" />
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">특수 방산 사업 역량</h2>
            <p className="text-primary/80 text-lg max-w-2xl mx-auto">
              가혹한 환경에서도 100%의 신뢰성을 보장해야 하는 방산 장비. JH FLEX는 엄격한 품질 관리로 국방 기술의 기반을 다집니다.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {defense.map((def, index) => (
              <div key={index} className="bg-white/5 border border-white/10 p-8 rounded-2xl backdrop-blur-sm flex gap-6">
                <div className="text-4xl font-mono font-bold text-primary/40 shrink-0">{def[0]}</div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-3">{def[1]}</h3>
                  <p className="text-primary/70 text-sm leading-relaxed mb-4">{def[2]}</p>
                  <span className="inline-block border border-primary/30 text-primary px-3 py-1 rounded-full text-xs font-semibold">
                    {def[3]}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. PROCESS SECTION */}
      <section id="process" className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-16 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">정밀 제조 공정</h2>
            <p className="text-muted-foreground text-lg">완벽한 품질을 위해 22단계의 꼼꼼한 공정을 거칩니다.</p>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            {processSteps.map((step, index) => (
              <div key={index} className="flex items-center gap-2 bg-muted/50 border border-border px-4 py-3 rounded-lg">
                <span className="text-xs font-mono font-bold text-primary-foreground/60 w-5">{index + 1}</span>
                <span className="text-sm font-semibold text-foreground">{step}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. TECH SPECS SECTION */}
      <section id="tech" className="py-24 px-4 sm:px-6 lg:px-8 bg-primary-foreground text-primary border-t border-primary-foreground">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white">핵심 기술 사양</h2>
            <p className="text-primary/80 mt-4 text-lg">업계 최고 수준의 제조 역량과 기술 사양을 보유합니다.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {techSpecs.map((spec, index) => (
              <div key={index} className="bg-white/5 border border-white/10 p-8 rounded-2xl backdrop-blur-sm shadow-sm hover:bg-white/10 transition-colors">
                <span className="text-primary/40 font-mono text-xl font-bold mb-4 block">{spec[0]}</span>
                <h3 className="text-xl font-bold text-white mb-3">{spec[1]}</h3>
                <p className="text-primary/70 leading-relaxed text-sm mb-6">{spec[2]}</p>
                <div className="flex flex-wrap gap-2 mt-auto">
                  {(spec[3] as string[]).map((tag, i) => (
                    <span key={i} className="inline-block border border-primary/30 text-primary px-3 py-1.5 rounded-md text-xs font-semibold">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. MATERIAL SECTION */}
      <section id="material" className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-16 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">사용 소재</h2>
            <p className="text-muted-foreground text-lg">DuPont™ 공인 소재를 사용하여 최고 신뢰성의 FPCB를 제조합니다.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {materials.map((mat, index) => (
              <div key={index} className="flex flex-col bg-background border border-border rounded-2xl p-8 hover:border-primary/50 transition-colors">
                <span className="text-muted-foreground font-mono text-xs font-bold mb-2 tracking-wider">{mat.eyebrow}</span>
                <h3 className="text-2xl font-bold text-foreground mb-4">{mat.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-8 flex-1">
                  {mat.desc}
                </p>
                <div className="grid grid-cols-2 gap-4 pt-6 border-t border-border">
                  {mat.stats.map((stat, i) => (
                    <div key={i}>
                      <div className="text-lg font-bold text-foreground">{stat[0]}</div>
                      <div className="text-xs text-muted-foreground">{stat[1]}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. FOOTER */}
      <footer className="border-t border-border bg-muted/20 py-12 px-4 sm:px-6 lg:px-8 mt-auto">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-border">
            {/* Logo / Brand Home Button */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <a
                href="#top"
                className="inline-flex items-center gap-3 px-4 py-2 rounded-xl border border-border bg-background hover:bg-muted/50 transition-all hover:scale-[1.02] shadow-sm group w-fit"
                aria-label="홈 화면으로 이동"
              >
                <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center font-extrabold text-primary-foreground text-sm tracking-tighter shadow-sm">
                  JH
                </div>
                <div className="flex flex-col text-left">
                  <span className="font-bold text-base leading-tight tracking-tight text-foreground group-hover:text-primary-foreground transition-colors">
                    JH <span className="text-primary-foreground font-extrabold">FLEX</span>
                  </span>
                  <span className="text-[10px] text-muted-foreground font-medium">
                    홈 화면으로 이동 ↑
                  </span>
                </div>
              </a>
              <span className="text-xs text-muted-foreground hidden sm:inline-block">|</span>
              <p className="text-xs text-muted-foreground leading-relaxed">
                방산·항공·통신 분야 고신뢰성 FPCB(Flexible PCB) 전문 제조기업 JHFLEX
              </p>
            </div>

            {/* Back to top button */}
            <a
              href="#top"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors px-3 py-1.5 rounded-lg hover:bg-muted w-fit"
            >
              맨 위로 이동 ↑
            </a>
          </div>

          {/* Business & Legal Info Grid + Map Buttons */}
          <div className="pt-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="flex flex-col gap-3 text-xs text-muted-foreground leading-relaxed">
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5">
                <span><strong>상호:</strong> ㈜JH FLEX</span>
                <span className="text-border">|</span>
                <span><strong>대표자:</strong> 문지학</span>
                <span className="text-border">|</span>
                <span><strong>사업자등록번호:</strong> 215-08-22790</span>
              </div>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5">
                <span><strong>사업장 주소:</strong> 경기도 안산시 단원구 만해로 205 (타원타크라3차 B동 407호)</span>
                <span className="text-border">|</span>
                <span><strong>팩스:</strong> 050-4166-4484</span>
                <span className="text-border">|</span>
                <span><strong>이메일:</strong> k2500rj@gmail.com</span>
              </div>
              <div className="pt-1 text-[11px] text-muted-foreground/80">
                © 2009 JHFLEX Co., Ltd. All Rights Reserved.
              </div>
            </div>

            {/* Map Action Buttons at the right end */}
            <div className="flex items-center gap-2 shrink-0">
              <a
                href="https://map.kakao.com/?q=%EA%B2%BD%EA%B8%B0%EB%8F%84%20%EC%95%88%EC%82%B0%EC%8B%9C%20%EB%8B%A8%EC%9B%90%EA%B5%AC%20%EB%A7%8C%ED%95%B4%EB%A1%9C%20205"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-border bg-background hover:bg-muted/70 text-xs font-semibold text-foreground transition-all shadow-xs"
              >
                <span className="w-2.5 h-2.5 rounded-full bg-[#fae100] ring-1 ring-black/10 inline-block"></span>
                카카오맵
                <ArrowUpRight className="w-3.5 h-3.5 text-muted-foreground" />
              </a>
              <a
                href="https://map.naver.com/v5/search/%EA%B2%BD%EA%B8%B0%EB%8F%84%20%EC%95%88%EC%82%B0%EC%8B%9C%20%EB%8B%A8%EC%9B%90%EA%B5%AC%20%EB%A7%8C%ED%95%B4%EB%A1%9C%20205"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-border bg-background hover:bg-muted/70 text-xs font-semibold text-foreground transition-all shadow-xs"
              >
                <span className="w-2.5 h-2.5 rounded-full bg-[#03C75A] inline-block"></span>
                네이버지도
                <ArrowUpRight className="w-3.5 h-3.5 text-muted-foreground" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
