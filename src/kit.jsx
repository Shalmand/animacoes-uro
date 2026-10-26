import React from "react";
import { AbsoluteFill, Audio, Sequence, interpolate, staticFile, useCurrentFrame, useVideoConfig, Easing } from "remotion";

// ============================================================================
// KIT PADRÃO — animações URO (estilo "recorte")
// Não altere este arquivo para um vídeo específico: cada vídeo novo fica em src/videos/.
// Peças novas (desenhos) que servirem para outros vídeos podem ser ADICIONADAS aqui.
// Regras do padrão: ver CLAUDE.md.
// ============================================================================
export const K = {
  papel: "#ece3cc",
  linha: "#1d1b2a",
  navy: "#1b2a5c",
  branco: "#f7f3ea",
  azul: "#2f6fd6",
  pele: "#e9b48a",
  rosa: "#f0a8a0",
  rosaEsc: "#d9787a",
  amarelo: "#f2b632",
  cinza: "#aab1c0",
  verde: "#2f8f4e",
  sangue: "#c8323a",
  ambar: "#d9922b",
};
export const FPS = 30;
export const FONTES = `@font-face { font-family: P; src: url(${staticFile("Poppins-ExtraBold.ttf")}); font-weight: 800; }`;
export const ADESIVO = "drop-shadow(4px 0 0 #fff) drop-shadow(-4px 0 0 #fff) drop-shadow(0 4px 0 #fff) drop-shadow(0 -4px 0 #fff) drop-shadow(6px 9px 6px rgba(70,50,15,.30))";
export const cl = { extrapolateLeft: "clamp", extrapolateRight: "clamp" };
export const suave = (t, a, d = 0.4) => interpolate(t, [a, a + d], [0, 1], { ...cl, easing: Easing.out(Easing.cubic) });
export const pula = (t, a, d = 0.42) => interpolate(t, [a, a + d], [0, 1], { ...cl, easing: Easing.out(Easing.back(2.2)) });
export const SW = 5;

export const VOL = { pop: 0.32, fita: 0.4, whoosh: 0.35, ding: 0.3, erro: 0.35, alerta: 0.3, click: 0.5, sobe: 0.28, desce: 0.28 };
export const Som = ({ a, som }) =>
  som ? (
    <Sequence from={Math.round(a * FPS)} durationInFrames={40} layout="none">
      <Audio src={staticFile(`sfx/${som}.wav`)} volume={VOL[som]} />
    </Sequence>
  ) : null;

export const Item = ({ t, a, x, y, rot = 0, s = 1, children, adesivo = true, som = "pop", op = 1 }) => {
  const p = pula(t, a);
  return (
    <>
      <Som a={a} som={som} />
      {p > 0 && (
        <div style={{ position: "absolute", left: x, top: y, opacity: op, transform: `translate(-50%,-50%) rotate(${rot + (1 - p) * -10}deg) scale(${s * p})`, filter: adesivo ? ADESIVO : undefined }}>
          {children}
        </div>
      )}
    </>
  );
};
// destaque: etiqueta azul-marinho com fita crepe
export const Tag = ({ t, a, x, y, txt, rot = -2, size = 40, som = "fita" }) => {
  const p = pula(t, a, 0.38);
  return (
    <>
      <Som a={a} som={som} />
      {p > 0 && (
        <div style={{ position: "absolute", left: x, top: y, transform: `translate(-50%,-50%) rotate(${rot}deg) scale(${p})` }}>
          <div style={{ position: "relative", background: K.navy, color: "#fff", fontFamily: "P", fontWeight: 800, fontSize: size, letterSpacing: 0.5, textTransform: "uppercase", padding: `${size * 0.22}px ${size * 0.55}px`, whiteSpace: "nowrap", borderRadius: 4, boxShadow: "3px 6px 8px rgba(70,50,15,.28)" }}>
            {txt}
            <div style={{ position: "absolute", left: -20, top: -12, width: 58, height: 22, background: "rgba(214,192,140,.85)", transform: "rotate(-32deg)" }} />
          </div>
        </div>
      )}
    </>
  );
};
export const Numero = ({ t, a, x, y, n, som = "pop" }) => (
  <Item t={t} a={a} x={x} y={y} rot={-6} som={som}>
    <div style={{ width: 104, height: 104, borderRadius: 52, background: K.navy, border: `${SW}px solid ${K.linha}`, color: "#fff", fontFamily: "P", fontWeight: 800, fontSize: 64, display: "flex", alignItems: "center", justifyContent: "center", lineHeight: 1 }}>{n}</div>
  </Item>
);
export const Check = ({ t, a, x, y, s = 1 }) => (
  <Item t={t} a={a} x={x} y={y} s={s} som="ding">
    <svg width="110" height="100" viewBox="0 0 110 100"><path d="M 12 52 L 42 82 L 98 16" fill="none" stroke={K.verde} strokeWidth="18" strokeLinecap="round" strokeLinejoin="round" /></svg>
  </Item>
);
export const XGrande = ({ t, a, x, y, s = 1 }) => (
  <Item t={t} a={a} x={x} y={y} s={s} som="erro">
    <svg width="200" height="200" viewBox="0 0 200 200"><path d="M 30 30 L 170 170 M 170 30 L 30 170" stroke={K.navy} strokeWidth="30" strokeLinecap="round" /></svg>
  </Item>
);
export const Seta = ({ t, a, x, y, dir = "dir", s = 1 }) => {
  const rot = { dir: 0, cima: -90, baixo: 90 }[dir];
  return (
    <Item t={t} a={a} x={x} y={y} s={s} som={dir === "cima" ? "sobe" : dir === "baixo" ? "desce" : "pop"}>
      <svg width="130" height="130" viewBox="0 0 130 130"><g transform={`rotate(${rot} 65 65)`}>
        <path d="M 12 52 L 70 52 L 70 22 L 120 65 L 70 108 L 70 78 L 12 78 Z" fill={K.navy} stroke={K.linha} strokeWidth="5" strokeLinejoin="round" />
      </g></svg>
    </Item>
  );
};

// ---------- desenhos
export const Pessoa = ({ t, jaleco = false, acena = false }) => {
  const fala = 3 + Math.abs(Math.sin(t * 11)) * 5;
  const pisca = t % 3.2 < 0.12 ? 0.6 : 4.5;
  const resp = Math.sin(t * 2.2) * 2;
  const tronco = jaleco ? "#ffffff" : K.azul;
  const braco = acena ? Math.sin(t * 9) * 12 - 150 : 0;
  return (
    <svg width="190" height="350" viewBox="-10 0 190 350" style={{ overflow: "visible" }}>
      <rect x="55" y="225" width="24" height="95" fill="#23243a" stroke={K.linha} strokeWidth={SW} />
      <rect x="91" y="225" width="24" height="95" fill="#23243a" stroke={K.linha} strokeWidth={SW} />
      <rect x="47" y="312" width="36" height="16" rx="7" fill="#111" />
      <rect x="87" y="312" width="36" height="16" rx="7" fill="#111" />
      <g transform={`translate(0 ${resp})`}>
        <rect x="18" y="122" width="22" height="98" rx="11" fill={tronco} stroke={K.linha} strokeWidth={SW} />
        <circle cx="29" cy="224" r="11" fill={K.pele} stroke={K.linha} strokeWidth={SW} />
        <g transform={`rotate(${braco} 141 130)`}>
          <rect x="130" y="122" width="22" height="98" rx="11" fill={tronco} stroke={K.linha} strokeWidth={SW} />
          <circle cx="141" cy="224" r="11" fill={K.pele} stroke={K.linha} strokeWidth={SW} />
        </g>
        <rect x="34" y="112" width="102" height="128" rx="24" fill={tronco} stroke={K.linha} strokeWidth={SW} />
        {jaleco && (
          <>
            <path d="M 70 114 L 85 160 L 100 114 Z" fill={K.navy} stroke={K.linha} strokeWidth="4" strokeLinejoin="round" />
            <line x1="85" y1="160" x2="85" y2="238" stroke={K.linha} strokeWidth="3" />
            <path d="M 60 118 C 52 160, 62 186, 80 186 C 98 186, 108 160, 110 118" fill="none" stroke={K.linha} strokeWidth="5" />
            <circle cx="80" cy="190" r="9" fill={K.cinza} stroke={K.linha} strokeWidth="4" />
          </>
        )}
        <rect x="72" y="98" width="26" height="22" fill={K.pele} stroke={K.linha} strokeWidth={SW} />
        <circle cx="85" cy="62" r="46" fill={K.pele} stroke={K.linha} strokeWidth={SW} />
        <path d="M 39 60 C 37 8, 133 8, 131 60 C 118 40, 64 34, 39 60 Z" fill={jaleco ? "#4a3b2e" : "#2b2118"} stroke={K.linha} strokeWidth={SW} />
        <ellipse cx="69" cy="68" rx="4.5" ry={pisca} fill={K.linha} />
        <ellipse cx="101" cy="68" rx="4.5" ry={pisca} fill={K.linha} />
        <path d="M 60 55 L 77 53 M 93 53 L 110 55" stroke={K.linha} strokeWidth="4" strokeLinecap="round" />
        <ellipse cx="85" cy="90" rx="8" ry={fala} fill="#7a2a2a" stroke={K.linha} strokeWidth="3" />
      </g>
    </svg>
  );
};
export const Ampola = ({ s = 1 }) => (
  <svg width={150 * s} height={260 * s} viewBox="0 0 150 260">
    <rect x="45" y="8" width="60" height="40" rx="6" fill={K.navy} stroke={K.linha} strokeWidth={SW} />
    <rect x="55" y="46" width="40" height="22" fill={K.cinza} stroke={K.linha} strokeWidth={SW} />
    <rect x="20" y="66" width="110" height="185" rx="20" fill="#f4f1ea" stroke={K.linha} strokeWidth={SW} />
    <rect x="26" y="150" width="98" height="95" rx="14" fill={K.ambar} opacity="0.85" />
    <rect x="30" y="100" width="90" height="70" rx="6" fill="#fff" stroke={K.linha} strokeWidth="4" />
    <text x="75" y="152" textAnchor="middle" fontFamily="P" fontWeight="800" fontSize="50" fill={K.navy}>T</text>
    <path d="M 36 80 L 36 140" stroke="#fff" strokeWidth="8" strokeLinecap="round" opacity="0.8" />
  </svg>
);
export const Pote = () => (
  <svg width="220" height="240" viewBox="0 0 220 240">
    <rect x="30" y="10" width="160" height="44" rx="10" fill={K.amarelo} stroke={K.linha} strokeWidth={SW} />
    <rect x="16" y="50" width="188" height="180" rx="24" fill="#fff" stroke={K.linha} strokeWidth={SW} />
    <rect x="16" y="95" width="188" height="90" fill={K.verde} stroke={K.linha} strokeWidth={SW} />
    <g transform="translate(110 140)" stroke="#fff" strokeWidth="9" strokeLinecap="round">
      <line x1="-40" y1="0" x2="40" y2="0" /><line x1="-40" y1="-20" x2="-40" y2="20" /><line x1="40" y1="-20" x2="40" y2="20" />
    </g>
  </svg>
);
export const Medidor = ({ t, alvo = -90 }) => {
  const ang = alvo + Math.sin(t * 5) * 3;
  const a = (ang * Math.PI) / 180;
  return (
    <svg width="300" height="220" viewBox="0 0 300 220">
      <rect x="4" y="4" width="292" height="212" rx="18" fill={K.branco} stroke={K.linha} strokeWidth={SW} />
      <path d="M 40 175 A 110 110 0 0 1 95 80" fill="none" stroke="#e8562a" strokeWidth="22" />
      <path d="M 95 80 A 110 110 0 0 1 205 80" fill="none" stroke={K.verde} strokeWidth="22" />
      <path d="M 205 80 A 110 110 0 0 1 260 175" fill="none" stroke="#e8562a" strokeWidth="22" />
      <line x1="150" y1="175" x2={150 + Math.cos(a) * 100} y2={175 + Math.sin(a) * 100} stroke={K.linha} strokeWidth="9" strokeLinecap="round" />
      <circle cx="150" cy="175" r="14" fill={K.linha} />
    </svg>
  );
};
export const Prancheta = ({ marcado }) => (
  <svg width="230" height="300" viewBox="0 0 250 320">
    <rect x="8" y="20" width="234" height="292" rx="14" fill="#c98b4a" stroke={K.linha} strokeWidth={SW} />
    <rect x="30" y="48" width="190" height="244" rx="4" fill="#fff" stroke={K.linha} strokeWidth="4" />
    <rect x="80" y="8" width="90" height="34" rx="8" fill={K.cinza} stroke={K.linha} strokeWidth={SW} />
    {[100, 165, 230].map((y, i) => (
      <g key={i}>
        <rect x="50" y={y - 18} width="36" height="36" rx="4" fill="#fff" stroke={K.linha} strokeWidth="4" />
        <rect x="100" y={y - 5} width="100" height="10" rx="5" fill="#d7d2c4" />
        {i < marcado && <path d={`M 52 ${y} L 66 ${y + 15} L 92 ${y - 19}`} fill="none" stroke={K.verde} strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" />}
      </g>
    ))}
  </svg>
);
export const Seringa = () => (
  <svg width="260" height="90" viewBox="0 0 260 90">
    <rect x="8" y="30" width="20" height="30" rx="4" fill={K.navy} stroke={K.linha} strokeWidth="4" />
    <rect x="26" y="40" width="40" height="10" fill={K.cinza} stroke={K.linha} strokeWidth="3" />
    <rect x="62" y="22" width="130" height="46" rx="8" fill="#f4f1ea" stroke={K.linha} strokeWidth={SW} />
    <rect x="120" y="28" width="68" height="34" rx="4" fill={K.ambar} opacity="0.85" />
    {[85, 105, 125, 145, 165].map((x) => <line key={x} x1={x} y1="22" x2={x} y2="36" stroke={K.linha} strokeWidth="3" />)}
    <rect x="190" y="37" width="18" height="16" fill={K.cinza} stroke={K.linha} strokeWidth="3" />
    <line x1="208" y1="45" x2="252" y2="45" stroke={K.linha} strokeWidth="4" strokeLinecap="round" />
  </svg>
);
export const Alerta = () => (
  <svg width="230" height="210" viewBox="0 0 230 210">
    <path d="M 115 14 L 218 192 L 12 192 Z" fill={K.amarelo} stroke={K.linha} strokeWidth="8" strokeLinejoin="round" />
    <rect x="104" y="70" width="22" height="70" rx="10" fill={K.linha} />
    <circle cx="115" cy="166" r="12" fill={K.linha} />
  </svg>
);
export const Testiculo = ({ w = 220 }) => (
  <svg width={w} height={w * 1.15} viewBox="0 0 260 300">
    <path d="M 150 18 C 152 40, 150 60, 160 70" fill="none" stroke={K.linha} strokeWidth="26" strokeLinecap="round" />
    <path d="M 150 18 C 152 40, 150 60, 160 70" fill="none" stroke={K.rosa} strokeWidth="14" strokeLinecap="round" />
    <ellipse cx="118" cy="175" rx="92" ry="112" fill={K.rosa} stroke={K.linha} strokeWidth={SW} />
    <path d="M 70 150 q 12 -22 24 0 t 24 0 t 24 0 t 24 0 M 70 195 q 12 -22 24 0 t 24 0 t 24 0 t 24 0 M 80 240 q 12 -22 24 0 t 24 0 t 24 0" fill="none" stroke={K.rosaEsc} strokeWidth="5" strokeLinecap="round" />
    <path d="M 165 70 C 235 70, 245 140, 212 165 C 240 205, 230 265, 182 285 C 205 240, 205 200, 190 175 C 215 150, 210 100, 165 92 Z" fill={K.rosaEsc} stroke={K.linha} strokeWidth={SW} strokeLinejoin="round" />
  </svg>
);
export const Esperma = ({ t, fase = 0, s = 1 }) => {
  const cauda = [...Array(14)].map((_, i) => `${-14 - i * 5.5},${Math.sin(t * 14 - i * 0.8 + fase) * i * 0.6}`).join(" L ");
  return (
    <g transform={`scale(${s})`}>
      <path d={`M ${cauda}`} fill="none" stroke={K.linha} strokeWidth="4" strokeLinecap="round" />
      <ellipse cx="0" cy="0" rx="15" ry="10" fill="#fff" stroke={K.linha} strokeWidth="4" />
    </g>
  );
};
export const gotaD = (s = 1) =>
  `M 0 ${-85 * s} C ${25 * s} ${-40 * s}, ${55 * s} ${-5 * s}, ${55 * s} ${25 * s} A ${55 * s} ${55 * s} 0 1 1 ${-55 * s} ${25 * s} C ${-55 * s} ${-5 * s}, ${-25 * s} ${-40 * s}, 0 ${-85 * s} Z`;
export const CELULAS = [[-20, 20], [18, 34], [-6, 52], [24, 0], [-30, 46], [6, 10], [30, 56], [-12, -8], [0, 70], [-36, 18], [36, 26], [10, -24]];
export const GotaSangue = ({ n }) => (
  <svg width="220" height="260" viewBox="-110 -120 220 260">
    <path d={gotaD(1.7)} fill="#f6dada" stroke={K.linha} strokeWidth={SW} />
    {CELULAS.slice(0, n).map(([x, y], i) => (
      <g key={i} transform={`translate(${x * 1.5} ${y * 1.5})`}>
        <ellipse rx="17" ry="12" fill={K.sangue} stroke={K.linha} strokeWidth="3" />
        <ellipse rx="7" ry="4" fill="#9e1f28" />
      </g>
    ))}
  </svg>
);
export const Carrinho = () => (
  <svg width="250" height="230" viewBox="0 0 250 230">
    <path d="M 40 100 L 210 100 C 210 150, 180 172, 125 172 C 70 172, 40 150, 40 100 Z" fill={K.azul} stroke={K.linha} strokeWidth={SW} strokeLinejoin="round" />
    <path d="M 40 100 C 40 50, 80 20, 125 20 L 125 100 Z" fill={K.navy} stroke={K.linha} strokeWidth={SW} strokeLinejoin="round" />
    <path d="M 210 100 L 236 70" stroke={K.linha} strokeWidth="8" strokeLinecap="round" />
    {[80, 175].map((x) => <g key={x}><circle cx={x} cy="196" r="24" fill="#fff" stroke={K.linha} strokeWidth={SW} /><circle cx={x} cy="196" r="7" fill={K.linha} /></g>)}
  </svg>
);
export const Calendario = ({ marcados }) => (
  <svg width="260" height="250" viewBox="0 0 260 250">
    <rect x="8" y="22" width="244" height="220" rx="16" fill="#fff" stroke={K.linha} strokeWidth={SW} />
    <path d="M 8 38 Q 8 22, 24 22 L 236 22 Q 252 22, 252 38 L 252 74 L 8 74 Z" fill={K.navy} stroke={K.linha} strokeWidth={SW} />
    {[60, 130, 200].map((x) => <rect key={x} x={x - 6} y="6" width="12" height="34" rx="6" fill={K.cinza} stroke={K.linha} strokeWidth="4" />)}
    {[...Array(8)].map((_, i) => {
      const x = 40 + (i % 4) * 60, y = 112 + Math.floor(i / 4) * 70;
      return (
        <g key={i}>
          <rect x={x - 20} y={y - 20} width="40" height="40" rx="6" fill="#efe9da" />
          {i < marcados && <path d={`M ${x - 12} ${y} L ${x - 3} ${y + 10} L ${x + 14} ${y - 12}`} fill="none" stroke={K.verde} strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />}
        </g>
      );
    })}
  </svg>
);
export const Coracao = () => (
  <svg width="170" height="150" viewBox="0 0 170 150">
    <path d="M 85 138 C 20 95, 8 60, 18 36 C 30 8, 70 6, 85 34 C 100 6, 140 8, 152 36 C 162 60, 150 95, 85 138 Z" fill={K.navy} stroke={K.linha} strokeWidth={SW} />
    <path d="M 40 44 C 46 30, 58 26, 66 30" fill="none" stroke="#fff" strokeWidth="8" strokeLinecap="round" opacity="0.7" />
  </svg>
);
export const Simbolo = ({ txt, size = 130 }) => <div style={{ fontFamily: "P", fontWeight: 800, fontSize: size, color: K.navy, lineHeight: 1 }}>{txt}</div>;

// ---------- fundo liso (papel) — sem piso
export const Fundo = () => (
  <AbsoluteFill style={{ background: K.papel }}>
    <svg width="1800" height="1080" style={{ position: "absolute" }}>
      <defs>
        <filter id="manchasT"><feTurbulence type="fractalNoise" baseFrequency="0.005" numOctaves="4" seed="7" /><feColorMatrix values="0 0 0 0 0.45  0 0 0 0 0.36  0 0 0 0 0.2  0 0 0 0.28 -0.07" /></filter>
        <filter id="graoT"><feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" seed="3" /><feColorMatrix values="0 0 0 0 0.3  0 0 0 0 0.25  0 0 0 0 0.15  0 0 0 0.10 0" /></filter>
      </defs>
      <rect width="1800" height="1080" filter="url(#manchasT)" />
      <rect width="1800" height="1080" filter="url(#graoT)" />
    </svg>
  </AbsoluteFill>
);

export const Quadro = ({ t, a, b, children, whoosh = true }) => {
  const sai = suave(t, b, 0.25);
  const visivel = t >= a - 0.05 && t <= b + 0.3;
  return (
    <>
      {whoosh && <Som a={Math.max(0, a - 0.12)} som="whoosh" />}
      {visivel && <AbsoluteFill style={{ opacity: 1 - sai, transform: `scale(${1 - sai * 0.04})` }}>{children}</AbsoluteFill>}
    </>
  );
};

// palco: título em y 420 (respiro grande em cima), desenhos em torno de y 720, rótulos em y 930
export const TY = 420, CY = 720, RY = 935;

