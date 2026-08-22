/* JHFLEX Defense Circuit Editorial: reference-matched one-page layout, asymmetry, circuit cyan, dark navy, industrial precision. */
import { FormEvent, useEffect, useState } from "react";
import { ArrowDownRight, ArrowUpRight, Check, ChevronRight, Menu, X, Moon, Sun } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";

const navItems = [
  ["회사소개", "about"],
  ["제품소개", "products"],
  ["방산사업", "defense"],
  ["제조공정", "process"],
  ["기술사양", "tech"],
  ["사용소재", "material"],
  ["견적 문의", "contact"],
] as const;

const history = [
  ["2009", "JH FLEX 설립", "경기도 안산시 창업. 모바일·자동차 부품 납품을 시작했습니다."],
  ["2013", "방산업체 진입", "방산업체 등록과 BBT 장비 증설로 검사 역량을 강화했습니다."],
  ["2014", "생산 라인 확장", "반자동 가접 및 수가접 라인을 구축하고 납품처를 넓혔습니다."],
  ["2021", "현 사업장 이전", "안산시 단원구 만해로 205, 타원타크라3차로 이전했습니다."],
  ["2025", "R-FPCB 개발 확장", "Rigid-FPCB 개발 샘플을 진행하며 고부가 제품을 확대했습니다."],
];

const products = [
  ["01", "SINGLE LAYER", "단면 FPCB", "단일 회로층 플렉시블 PCB. 표시장치 연결용과 방산 장비에 적용됩니다.", ["1Layer", "Pyralux® LF", "Polyimide 25μm"], "STANDARD"],
  ["02", "DOUBLE LAYER", "양면 FPCB", "복잡한 회로 연결이 필요한 통신·산업용 장비에 적용됩니다.", ["2Layer", "Pyralux® AP", "RA·ED 동박"], "MULTI-LAYER"],
  ["03", "RIGID-FLEXIBLE", "Rigid-Flexible", "Rigid FR-4와 Flexible PI를 복합 적층한 4층 구조입니다.", ["4Layer R-F", "Pyralux® AP", "Push-Back 공법"], "RF SPECIAL"],
  ["04", "MULTI FPCB", "멀티 FPCB", "6층 다층 플렉시블 구조. 고밀도 신호 처리 장치에 적용됩니다.", ["6Layer", "Pyralux® AP", "고밀도 적층"], "RF SPECIAL"],
  ["05", "METAL CORE", "메탈 PCB", "알루미늄·동 기판 기반 고방열 PCB로 전력장치에 적용됩니다.", ["알루미늄기판", "고방열", "LED·전력"], "METAL CORE"],
  ["06", "PROTOTYPE", "시제품 / 소량 제작", "R&D와 스타트업을 위한 최소 1장부터의 신속 제작 서비스입니다.", ["1장~", "3~5일 납기", "전종 가능"], "PROTOTYPE"],
];

const diagramSpecs = [
  { eyebrow: "SINGLE LAYER", title: "단면 FPCB", body: "한 면에 회로가 있는 기본 플렉시블 구조", layers: ["커버레이", "접착제", "동박 회로", "폴리이미드"] },
  { eyebrow: "DOUBLE LAYER", title: "양면 FPCB", body: "양면 회로와 비아 연결로 구성된 구조", layers: ["커버레이", "동박 회로", "폴리이미드", "동박 회로", "커버레이"] },
  { eyebrow: "RIGID-FLEXIBLE", title: "Rigid-Flexible", body: "Rigid FR-4와 Flex PI가 결합된 복합 구조", layers: ["Rigid FR-4 Zone", "Coverlay", "Flexible PI", "Copper Layer"] },
  { eyebrow: "MULTI FPCB", title: "멀티 FPCB", body: "고밀도 신호 처리를 위한 다층 적층 구조", layers: ["Coverlay", "Copper 1", "PI Core", "Copper 2", "PI Core", "Copper 3"] },
  { eyebrow: "METAL CORE", title: "메탈 PCB", body: "열을 빠르게 분산하는 금속 코어 방열 구조", layers: ["LED / Circuit", "Copper Trace", "Dielectric", "Aluminium Core"] },
  { eyebrow: "PROTOTYPE", title: "시제품 / 소량 제작", body: "R&D용 빠른 검증과 소량 제작을 위한 구성", layers: ["CAD/CAM", "FPCB Pattern", "BBT Test", "Quick Delivery"] },
] as const;

const defense = [
  ["01", "레이더·통신 시스템", "고주파 신호 손실 최소화가 필요한 레이더·군용 통신 장비 내부 연결 회로", "RF FPCB"],
  ["02", "전자전·유도 장비", "EMI 차폐가 중요한 전자전 장비 및 정밀 유도 시스템의 핵심 연결 기판", "EMI 차폐"],
  ["03", "항공·우주 전장 부품", "극한 온도·진동 환경에서 신뢰성이 필요한 항공기·무인기 전장 시스템", "Rigid-Flex"],
  ["04", "보안·정밀 제어 장치", "군용 보안 단말과 정밀 제어 장비의 소형·경량 고밀도 설계", "고밀도"],
];

const processSteps = ["CAD/CAM", "재단공정", "드릴공정", "동도금공정", "정면공정", "D/F공정", "노광공정", "AOI검사", "현상공정", "부식공정", "박리공정", "C/L Punching", "가접공정", "Hot-Press", "후가공정", "표면처리공정", "인쇄공정", "STF부착공정", "단선타발공정", "B.B.T공정", "외형타발공정", "최종검사"];

function SectionHeading({ eyebrow, title, text, light = false }: { eyebrow: string; title: string; text?: string; light?: boolean }) {
  return <div className={`section-heading ${light ? "section-heading--light" : ""}`}><span>{eyebrow}</span><h2 dangerouslySetInnerHTML={{ __html: title }} />{text && <p>{text}</p>}</div>;
}

function TechnicalDiagram({ index, className = "" }: { index: number; className?: string }) {
  const spec = diagramSpecs[index];
  return <figure className={`technical-diagram technical-diagram--${index} ${className}`} aria-label={`${spec.title} 기술 도해`}>
    <figcaption><span>{spec.eyebrow}</span><strong>{spec.title}</strong><p>{spec.body}</p></figcaption>
    <div className="technical-diagram__board">
      {spec.layers.map((layer, layerIndex) => <div className="technical-diagram__layer" key={layer}><i>{String(layerIndex + 1).padStart(2, "0")}</i><b>{layer}</b></div>)}
    </div>
    <small>JHFLEX TECHNICAL REFERENCE</small>
  </figure>;
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const [activeProduct, setActiveProduct] = useState(0);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("is-visible")), { threshold: 0.12 });
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const submit = (event: FormEvent<HTMLFormElement>) => {
    // 메일이 하나로 묶이지 않도록 제출 직전에 제목(subject)에 회사명과 현재 시간을 추가합니다.
    const form = event.currentTarget;
    const companyInput = form.elements.namedItem('업체명') as HTMLInputElement;
    const subjectInput = form.elements.namedItem('_subject') as HTMLInputElement;
    
    if (companyInput && subjectInput) {
      const companyName = companyInput.value;
      const dateStr = new Date().toLocaleString('ko-KR', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' });
      subjectInput.value = `JH Flex 견적 문의 - ${companyName} (${dateStr})`;
    }
    
    // 정상적으로 폼 제출이 일어나도록 event.preventDefault()는 호출하지 않습니다.
    // 폼 제출 완료 버튼 피드백을 위해 상태 변경
    setSent(true);
  };

  return <div className="site-shell">
    <header className="site-header">
      <a className="brand" href="#top" aria-label="JHFLEX 홈"><span className="brand-mark"><i /><i /><i /><i /></span><span><strong>JH</strong><b>FLEX</b><small>FPCB SPECIALIST · EST. 2009</small></span></a>
      <nav className={menuOpen ? "is-open" : ""}>{navItems.map(([label, id]) => <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)}>{label}</a>)}</nav>
      <div className="header-actions" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        {toggleTheme && (
          <button onClick={toggleTheme} className="theme-toggle" aria-label="테마 변경" style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'inherit', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        )}
        <a className="header-cta" href="#contact">견적 문의 <ArrowUpRight size={15} /></a>
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="메뉴 열기" style={{ background: 'transparent', border: 'none', color: 'inherit', cursor: 'pointer' }}>{menuOpen ? <X /> : <Menu />}</button>
      </div>
    </header>

    <main id="top">
      <section className="hero circuit-bg">
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

      
      <g stroke="rgba(0,212,245,0.04)" strokeWidth="0.5">
        
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

      
      <g fill="none" stroke="rgba(0,212,245,0.12)" strokeWidth="1">
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
      <g fill="none" stroke="rgba(0,212,245,0.10)" strokeWidth="1">
        <rect className="chip-blink" x="1100" y="400" width="100" height="70" rx="4"/>
        <rect className="chip-blink" x="1108" y="408" width="84" height="54" rx="2"/>
        <line x1="1100" y1="415" x2="1082" y2="415"/> <line x1="1100" y1="425" x2="1082" y2="425"/>
        <line x1="1100" y1="435" x2="1082" y2="435"/> <line x1="1100" y1="445" x2="1082" y2="445"/>
        <line x1="1200" y1="415" x2="1218" y2="415"/> <line x1="1200" y1="425" x2="1218" y2="425"/>
        <line x1="1200" y1="435" x2="1218" y2="435"/> <line x1="1200" y1="445" x2="1218" y2="445"/>
      </g>
      <g fill="none" stroke="rgba(24,120,204,0.15)" strokeWidth="1">
        <rect className="chip-blink" x="950" y="600" width="90" height="65" rx="4"/>
        <rect className="chip-blink" x="957" y="607" width="76" height="51" rx="2"/>
        <line x1="950" y1="615" x2="933" y2="615"/> <line x1="950" y1="625" x2="933" y2="625"/>
        <line x1="950" y1="635" x2="933" y2="635"/> <line x1="950" y1="645" x2="933" y2="645"/>
        <line x1="1040" y1="615" x2="1057" y2="615"/> <line x1="1040" y1="625" x2="1057" y2="625"/>
      </g>

      
      <g stroke="rgba(0,212,245,0.06)" strokeWidth="1" fill="none">
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
      <g stroke="rgba(24,120,204,0.05)" strokeWidth="1.5" fill="none">
        <path d="M0,150 L100,150 L100,50 L300,50 L300,150 L500,150 L500,50 L700,50"/>
        <path d="M900,100 L1000,100 L1000,50 L1200,50 L1200,100 L1440,100"/>
        <path d="M0,450 L200,450 L200,550 L450,550 L450,450 L650,450"/>
        <path d="M800,850 L900,850 L900,750 L1050,750 L1050,850 L1250,850 L1250,750 L1440,750"/>
      </g>

      
      
      <path className="trace trace-1" d="M-50,300 L200,300 L200,200 L400,200 L400,300 L700,300"
        stroke="#00D4F5" strokeWidth="2" fill="none" filter="url(#glow)" opacity="0.9"/>
      <path className="trace trace-2" d="M-50,500 L150,500 L150,600 L400,600 L400,500 L650,500"
        stroke="#1878CC" strokeWidth="1.5" fill="none" filter="url(#glow)" opacity="0.8"/>
      <path className="trace trace-3" d="M700,200 L900,200 L900,150 L1100,150 L1100,200 L1300,200 L1300,150 L1490,150"
        stroke="#00D4F5" strokeWidth="2" fill="none" filter="url(#glow)" opacity="0.9"/>
      <path className="trace trace-4" d="M-50,700 L200,700 L200,800 L500,800 L500,700 L800,700"
        stroke="#1878CC" strokeWidth="1.5" fill="none" filter="url(#glow)" opacity="0.7"/>
      
      <path className="trace trace-5" d="M320,0 L320,200 L480,200 L480,400 L640,400 L640,600 L800,600 L800,900"
        stroke="#00D4F5" strokeWidth="1.5" fill="none" filter="url(#glow)" opacity="0.8"/>
      <path className="trace trace-6" d="M960,0 L960,150 L800,150 L800,300 L960,300 L960,470 L1100,470 L1100,700 L960,700 L960,900"
        stroke="#1878CC" strokeWidth="2" fill="none" filter="url(#glow)" opacity="0.85"/>
      <path className="trace trace-7" d="M1280,0 L1280,100 L1200,100 L1200,300 L1280,300 L1280,500 L1200,500 L1200,700 L1280,700 L1280,900"
        stroke="#00D4F5" strokeWidth="1.5" fill="none" filter="url(#glow)" opacity="0.75"/>
      <path className="trace trace-8" d="M160,0 L160,300 L320,300 L320,500 L160,500 L160,750 L320,750 L320,900"
        stroke="#1878CC" strokeWidth="1" fill="none" filter="url(#glow)" opacity="0.6"/>

      
      <g fill="#00D4F5" filter="url(#glow-strong)">
        <circle className="node-glow" cx="200" cy="300" r="4"/>
        <circle className="node-glow" cx="400" cy="200" r="4"/>
        <circle className="node-glow" cx="640" cy="400" r="3"/>
        <circle className="node-glow" cx="800" cy="300" r="4"/>
        <circle className="node-glow" cx="960" cy="150" r="3"/>
        <circle className="node-glow" cx="1100" cy="400" r="4"/>
        <circle className="node-glow" cx="1280" cy="300" r="3"/>
        <circle className="node-glow" cx="320" cy="500" r="4"/>
        <circle className="node-glow" cx="480" cy="600" r="3"/>
        <circle className="node-glow" cx="800" cy="700" r="4"/>
        <circle className="node-glow" cx="960" cy="600" r="3"/>
        <circle className="node-glow" cx="1200" cy="500" r="4"/>
        <circle className="node-glow" cx="160" cy="750" r="3"/>
        <circle className="node-glow" cx="500" cy="800" r="4"/>
      </g>
      <g fill="#1878CC" filter="url(#glow)">
        <circle className="node-glow" cx="150" cy="500" r="3"/>
        <circle className="node-glow" cx="400" cy="600" r="4"/>
        <circle className="node-glow" cx="650" cy="500" r="3"/>
        <circle className="node-glow" cx="960" cy="300" r="4"/>
        <circle className="node-glow" cx="1100" cy="470" r="3"/>
        <circle className="node-glow" cx="1300" cy="200" r="4"/>
      </g>

      
      <g className="scan-line">
        <rect x="0" y="0" width="3" height="900"
          fill="url(#traceGrad2)" opacity="0.15"/>
        <rect x="5" y="0" width="1" height="900"
          fill="rgba(0,212,245,0.08)"/>
      </g>

      
      <g fill="none" stroke="rgba(0,212,245,0.15)" strokeWidth="1">
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
    </svg>
  </div>
        <div className="hero-copy">
          <div className="gold-label">DEFENSE GRADE · FPCB SPECIALIST</div>
          <h1><em>FPCB</em><strong>PRECISION</strong><span>SOLUTIONS</span></h1>
          <p className="hero-korean">제이에이치플렉스</p>
          <div className="hero-rule" />
          <p className="hero-desc">2009년 설립, 방산·항공·통신 분야 FPCB 전문 제조기업.<br />DuPont™ Pyralux® 소재 기반 — 단면부터 멀티 6층까지 정밀하게.</p>
          <div className="hero-actions"><a className="button button-cyan" href="#products">제품 보기 <ArrowUpRight size={16} /></a><a className="button button-ghost" href="#contact">견적 문의</a></div>
        </div>
        <div className="hero-side-note">JHFLEX CO., LTD <span>·</span> ANSAN KOREA</div>
        <div className="hero-stats"><div><b>16<sup>+</sup></b><span>YEARS OF EXPERIENCE</span></div><div><b>6<sup>종</sup></b><span>PCB PRODUCT LINES</span></div><div><b>99<sup>%</sup></b><span>QUALITY PASS RATE</span></div><div><b>방산<sup>급</sup></b><span>DEFENSE GRADE QUALITY</span></div></div>
      </section>

      <section id="about" className="section about-section">
        <div className="content-wrap about-grid"><div><SectionHeading eyebrow="ABOUT JHFLEX" title={"2009년부터 쌓아온<br /><b>FPCB 기술과 신뢰</b>"} text="경기도 안산에 본사를 둔 JHFLEX는 2009년 설립 이래 플렉시블 PCB를 핵심으로 방산·항공·통신·의료 분야 고품질 PCB 솔루션을 공급하는 전문 제조기업입니다." /></div></div>
        <div className="content-wrap history-wrap"><div className="mini-label">COMPANY HISTORY</div><div className="history-list">{history.map(([year, title, text]) => <article className="history-item reveal" key={year}><b>{year}</b><div><h3>{title}</h3><p>{text}</p></div></article>)}</div></div>
        <div className="content-wrap strengths"><div className="mini-label">CORE STRENGTHS</div><div className="strength-grid">{[["◈", "방산 납품 실적", "㈜신보·㈜위닉스 등 방산업체 납품 실적과 ISO 9001 품질관리 시스템"],["⌁", "DuPont™ Pyralux® 소재", "공인 소재 적용으로 우수한 신호무결성과 굴곡 내구성 보장"],["▦", "단면~멀티 6층 자체 제조", "자체 생산라인으로 긴급 납기와 다양한 제품 구조에 대응"],["✦", "22단계 정밀 공정", "CAD/CAM부터 출하까지 체계적 공정, BBT·AOI 100% 전수 검사"]].map(([icon, title, text]) => <article className="strength-card reveal" key={String(title)}><span>{icon}</span><h3>{title}</h3><p>{text}</p></article>)}</div></div>
      </section>

      <section id="products" className="section products-section dark-section"><div className="content-wrap"><SectionHeading light eyebrow="PRODUCTS / 01—06" title={"제품 <b>라인업</b>"} text="FPCB 기반의 6종 PCB 전 라인을 자체 제조합니다." /><div className="product-layout"><div className="product-feature"><div className="product-image"><TechnicalDiagram index={activeProduct} /><div className="image-overlay-label">CORE PRODUCT <b>{products[activeProduct][0]}</b></div></div><div className="product-feature-copy"><span>{products[activeProduct][5]}</span><h3>{products[activeProduct][2]}</h3><p>{products[activeProduct][3]}</p><div className="product-tags">{(products[activeProduct][4] as string[]).map((tag: string) => <b key={tag}>{tag}</b>)}</div></div></div><div className="product-list">{products.map((product, index) => <button className={activeProduct === index ? "active" : ""} onClick={() => setActiveProduct(index)} key={String(product[0])}><span>{product[0]}</span><div><small>{product[1]}</small><strong>{product[2]}</strong></div><ChevronRight size={18} /></button>)}</div></div></div></section>

      <section id="defense" className="section defense-section"><div className="content-wrap defense-grid"><div className="defense-image"><TechnicalDiagram index={2} /><div className="image-caption">DEFENSE APPLICATIONS / 2013—NOW</div></div><div><SectionHeading eyebrow="DEFENSE BUSINESS" title={"방산 <b>사업</b>"} text="2013년 방산업체 최초 등록 이래, 극한 환경에서도 신뢰받는 FPCB를 납품합니다. DuPont™ Pyralux® AP All-Polyimide 소재와 ISO 9001 품질체계로 방산급 신뢰성을 보장합니다." /><div className="defense-list">{defense.map(([num, title, text, tag]) => <article className="defense-item reveal" key={String(num)}><b>{num}</b><div><h3>{title}</h3><p>{text}</p><span>{tag}</span></div></article>)}</div></div></div></section>

      <section id="process" className="section process-section dark-section"><div className="content-wrap"><SectionHeading light eyebrow="MANUFACTURING PROCESS" title={"제조 <b>공정도</b>"} text="CAD/CAM 설계부터 제품 출하까지 22단계 정밀 공정으로 품질을 보장합니다." /><div className="process-board">{processSteps.map((step, index) => <div className="process-step reveal" key={step}><span>{String(index + 1).padStart(2, "0")}</span><i>{["⌘", "✂", "⌬", "◌", "▥", "◉"][index % 6]}</i><b>{step}</b></div>)}</div><div className="process-metrics"><b>22단계 <small>정밀 제조 공정</small></b><b>100% <small>BBT 전기검사 전수</small></b><b>100% <small>AOI 광학검사 전수</small></b><b>ISO 9001 <small>국제 품질 인증 보유</small></b></div></div></section>

      <section id="tech" className="section tech-section"><div className="content-wrap"><SectionHeading eyebrow="TECHNICAL SPECIFICATIONS" title={"핵심 기술 <b>사양</b>"} text="업계 최고 수준의 제조 역량과 기술 사양을 보유합니다." /><div className="tech-grid">{[["01", "미세 패턴 · 고밀도 구현", "Line/Space 최소 75μm의 미세 회로 구현. 최소 비아홀 0.1mm.", ["Min. L/S 75μm", "Min. Hole 0.1mm", "±50μm 정렬도"]],["02", "DuPont™ Pyralux® AP 소재", "접착제 없는 All-Polyimide 구조. RF·고속 신호에서 탁월한 신호무결성.", ["Pyralux® AP", "Dk 3.2 @10GHz", "Tg 220°C"]],["03", "극한 굴곡 내구성", "IPC-TM-650 기준 굴곡 6,000사이클 이상. 진동 환경에서도 특성 유지.", ["굴곡 6,000+ cycles", "인장강도 345MPa", "연신율 50%"]],["04", "ISO 이중 인증 품질 체계", "ISO 9001·14001 동시 인증. BBT·AOI 100% 전수검사.", ["ISO 9001", "ISO 14001", "BBT 전수검사"]]].map(([num, title, text, tags]) => <article className="tech-card reveal" key={String(num)}><span>{num}</span><h3>{title}</h3><p>{text}</p><div>{(tags as string[]).map((tag) => <b key={tag}>{tag}</b>)}</div></article>)}</div></div></section>

      <section id="material" className="section material-section dark-section"><div className="content-wrap material-grid"><div><SectionHeading light eyebrow="MATERIAL" title={"사용 <b>소재</b>"} text="DuPont™ 공인 소재를 사용하여 최고 신뢰성의 FPCB를 제조합니다." /><TechnicalDiagram index={4} className="material-image" /></div><div className="material-cards"><article><small>DUPONT™ PYRALUX®</small><h3>Pyralux® AP</h3><p>All-Polyimide Double-Sided CCL. 접착제 없는 구조로 다층 Flex·Rigid-Flex 적용에 최적입니다.</p><div className="material-stats"><b>3.2 Dk<small>유전율 (10GHz)</small></b><b>0.002 Df<small>손실계수 (1MHz)</small></b><b>220°C Tg<small>유리전이온도</small></b><b>6,000+<small>굴곡 내구성</small></b></div></article><article><small>DUPONT™ PYRALUX®</small><h3>Pyralux® LF Coverlay</h3><p>Kapton® 폴리이미드 필름과 아크릴 접착제 구조. Flex·Rigid-Flex 회로 보호용 커버레이입니다.</p><div className="material-stats"><b>3.6 Dk<small>유전율 (1MHz)</small></b><b>10 lb/in<small>박리강도</small></b><b>25~76μm<small>접착제 두께</small></b></div></article></div></div></section>

      <section id="contact" className="section contact-section"><div className="content-wrap contact-grid"><div><SectionHeading eyebrow="CONTACT & INQUIRY" title={"견적 및 <b>문의</b>"} text="제품 사양·견적·납기 문의는 아래로 연락해 주세요. 빠르게 답변드립니다." /><div className="contact-info">{[["주소", "경기도 안산시 단원구 만해로 205", "타원타크라3차 B동 407호"],["팩스", "050-4166-4484", ""],["이메일", "k2500rj@gmail.com", ""]].map(([label, line, sub]) => <div key={label}><span>{label}</span><b>{line}</b>{sub && <small>{sub}</small>}</div>)}</div><div className="map-links"><a href="https://map.kakao.com/?q=%EA%B2%BD%EA%B8%B0%EB%8F%84%20%EC%95%88%EC%82%B0%EC%8B%9C%20%EB%8B%A8%EC%9B%90%EA%B5%AC%20%EB%A7%8C%ED%95%B4%EB%A1%9C%20205" target="_blank" rel="noreferrer">↗ 카카오맵</a><a href="https://map.naver.com/v5/search/%EA%B2%BD%EA%B8%B0%EB%8F%84%20%EC%95%88%EC%82%B0%EC%8B%9C%20%EB%8B%A8%EC%9B%90%EA%B5%AC%20%EB%A7%8C%ED%95%B4%EB%A1%9C%20205" target="_blank" rel="noreferrer">↗ 네이버지도</a></div></div><form className="inquiry-form" action="https://formsubmit.co/d87373d20662336563a93d6a8df20bd1" method="POST" encType="multipart/form-data" onSubmit={submit}><input type="hidden" name="_captcha" value="false" /><input type="hidden" name="_subject" defaultValue="JH Flex 제품 견적 요청 드립니다" /><input type="hidden" name="_template" value="table" /><input type="hidden" name="_next" value="https://k2500rjin-alt.github.io/jhflex-homepage-/" /><div className="form-label">SEND INQUIRY <span>필수 항목을 입력해 주세요.</span></div><div className="form-row"><label>회사명<input name="업체명" placeholder="회사명" required /></label><label>담당자<input name="담당자명" placeholder="성함" required /></label></div><div className="form-row"><label>연락처<input name="연락처" type="tel" placeholder="010-0000-0000" required /></label><label>이메일<input name="이메일" type="email" placeholder="email@company.com" required /></label></div><div className="form-row"><label>문의 제품<select name="문의_제품" defaultValue="" required><option value="" disabled>선택해주세요</option>{products.map((p) => <option key={String(p[2])}>{p[2]}</option>)}</select></label><label>레이어 수<select name="레이어_수" defaultValue="미정"><option>미정</option><option>1Layer</option><option>2Layer</option><option>4Layer</option><option>6Layer 이상</option></select></label></div><label>희망 수량<input name="희망_수량" placeholder="예: 100장" /></label><label>외형gbr data 첨부<small style={{display:"block", color:"var(--silver)", fontSize:"11px", marginTop:"4px"}}>* 업로드 가능 파일: CAD data 파일, CAM350 data 파일</small><input type="file" name="첨부파일" className="file-input" /></label><label>문의 내용<textarea name="문의_내용" placeholder="문의 내용을 상세히 입력해 주세요.\n(소재, 두께, 표면처리, 희망납기 등 기재 시 빠른 답변 가능)" required /></label><button className="submit-button" type="submit">{sent ? <><Check size={17} /> 문의가 접수되었습니다</> : <>견적 문의 보내기 <ArrowUpRight size={17} /></>}</button></form></div></section>
    </main>
    <footer className="site-footer"><div className="content-wrap footer-grid"><a className="brand brand-footer" href="#top"><span className="brand-mark"><i /><i /><i /><i /></span><span><strong>JH</strong><b>FLEX</b><small>DEFENSE GRADE FPCB SPECIALIST · SINCE 2009</small></span></a><div className="footer-nav">{navItems.slice(0, 6).map(([label, id]) => <a key={id} href={`#${id}`}>{label}</a>)}</div><div className="copyright">© 2009 JHFLEX Co., Ltd. All Rights Reserved.<br />사업자등록번호: 215-08-22790 | 대표: 문지학<br />경기도 안산시 단원구 만해로 205</div></div></footer>
  </div>;
}
