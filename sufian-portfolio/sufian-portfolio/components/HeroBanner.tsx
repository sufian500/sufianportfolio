import { CheckCircle2, Download, Mail, Play } from "lucide-react";
import { profile } from "@/data/profile";

/** Abstract technology background: data grid, network of nodes, a rising chart and a cloud outline. Pure SVG, no image files. */
function TechBackground() {
  const nodes = [
    [620, 180], [760, 120], [900, 210], [1040, 150], [1180, 240], [700, 330], [860, 380], [1010, 320], [1150, 420], [1290, 330], [960, 520], [1220, 560],
  ];
  const links = [[0, 1], [1, 2], [2, 3], [3, 4], [0, 5], [5, 6], [6, 7], [7, 8], [8, 9], [2, 7], [6, 10], [8, 11], [4, 9], [10, 11], [1, 6]];
  const bars = [0.35, 0.5, 0.42, 0.62, 0.55, 0.78, 0.7, 0.92];
  return (
    <svg viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <radialGradient id="glowR" cx="72%" cy="35%" r="55%">
          <stop offset="0" stopColor="#e5293b" stopOpacity=".45" />
          <stop offset=".5" stopColor="#5a0d16" stopOpacity=".25" />
          <stop offset="1" stopColor="#070708" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="glowB" cx="95%" cy="90%" r="45%">
          <stop offset="0" stopColor="#1d4ed8" stopOpacity=".28" />
          <stop offset="1" stopColor="#070708" stopOpacity="0" />
        </radialGradient>
        <pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse">
          <path d="M48 0H0V48" fill="none" stroke="#ffffff" strokeOpacity=".05" />
        </pattern>
        <linearGradient id="bar" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0" stopColor="#e5293b" stopOpacity=".05" />
          <stop offset="1" stopColor="#e5293b" stopOpacity=".55" />
        </linearGradient>
      </defs>
      <rect width="1440" height="900" fill="#070708" />
      <rect width="1440" height="900" fill="url(#grid)" />
      <rect width="1440" height="900" fill="url(#glowR)" />
      <rect width="1440" height="900" fill="url(#glowB)" />
      {bars.map((h, i) => (
        <rect key={i} x={760 + i * 70} y={860 - h * 360} width="44" height={h * 360} rx="4" fill="url(#bar)" />
      ))}
      <polyline points={bars.map((h, i) => `${782 + i * 70},${840 - h * 360}`).join(" ")} fill="none" stroke="#fff" strokeOpacity=".35" strokeWidth="2" />
      {links.map(([a, b], i) => (
        <line key={i} x1={nodes[a][0]} y1={nodes[a][1]} x2={nodes[b][0]} y2={nodes[b][1]} stroke="#ffffff" strokeOpacity=".16" strokeWidth="1.5" />
      ))}
      {nodes.map(([x, y], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r={i % 4 === 0 ? 9 : 5} fill={i % 4 === 0 ? "#e5293b" : "#fff"} fillOpacity={i % 4 === 0 ? 0.9 : 0.55} />
          {i % 4 === 0 && <circle cx={x} cy={y} r="20" fill="none" stroke="#e5293b" strokeOpacity=".35" />}
        </g>
      ))}
      <path d="M1180 110a46 46 0 0 1 88-14 38 38 0 0 1 52 36 32 32 0 0 1-8 63h-132a42 42 0 0 1 0-85Z" fill="none" stroke="#fff" strokeOpacity=".22" strokeWidth="2" />
    </svg>
  );
}

export default function HeroBanner() {
  return (
    <section className="hero" id="home" aria-label="Introduction">
      <div className="hero-bg">
        <TechBackground />
      </div>
      <div className="hero-content gut">
        <div className="wordmark" aria-hidden="true">
          SUFIAN<span className="dot">.</span>
        </div>
        <h1>{profile.tagline}</h1>
        <p className="title">
          {profile.name} · {profile.title}
        </p>
        <p className="line">{profile.heroLine}</p>
        <p className="support">{profile.supporting}</p>
        <div className="caps" aria-label="Capabilities">
          {profile.capabilities.map((c) => (
            <span key={c}>{c}</span>
          ))}
        </div>
        <div className="btn-row">
          <a className="btn btn-white" href="#projects">
            <Play size={20} fill="currentColor" /> Explore my projects
          </a>
          {profile.resumePdf && (
            <a className="btn btn-grey" href={profile.resumePdf} download="Sufian_Sayed_Resume.pdf">
              <Download size={20} /> Download my resume
            </a>
          )}
          <a className="btn btn-outline" href="#contact">
            <Mail size={20} /> Contact me
          </a>
        </div>
        <p className="rights">
          <CheckCircle2 size={16} color="#46d369" /> <b>Full working rights</b> {profile.location}
        </p>
      </div>
    </section>
  );
}
