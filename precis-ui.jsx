import { useState, useEffect, useRef, useCallback } from "react";

// ═══════════════════════════════════════════════════════════════
// PRÉCIS — Mobile-First UI Rebuild
// Design: Phone-native literary social. Bottom tab bar, full-bleed
// cards, thumb-zone interactions, swipeable strips.
// Desktop is the progressive enhancement.
// ═══════════════════════════════════════════════════════════════

const THEMES = {
  twilight: {
    id: "twilight", name: "Twilight Ink", icon: "☽",
    bg: "#111620", bg2: "#171D2A", bg3: "#1D2535", surface: "#151B28", surfaceHover: "#192132",
    border: "rgba(196,162,101,0.06)", borderActive: "rgba(196,162,101,0.16)",
    gold: "#C4A265", goldSoft: "rgba(196,162,101,0.1)", accent: "#C06A30", accentSoft: "rgba(192,106,48,0.08)",
    text: "#E4DED2", text2: "#B8B0A2", text3: "#7A7468", text4: "#4E4A42",
    green: "#6A9A60", red: "#C45A4A", blue: "#5A8AB4", plum: "#9A70A0", teal: "#4EA8A0",
    hd: "'Cormorant Garamond',Georgia,serif", body: "'Source Serif 4',Georgia,serif",
    ui: "'Outfit',system-ui,sans-serif", mono: "'JetBrains Mono',monospace",
    shadow: "0 2px 8px rgba(0,0,0,.35)", shadowLg: "0 8px 32px rgba(0,0,0,.45)",
  },
  parchment: {
    id: "parchment", name: "Warm Parchment", icon: "☀",
    bg: "#F4F0E6", bg2: "#ECE8DD", bg3: "#E2DDD1", surface: "#FFFDF5", surfaceHover: "#FAF7EE",
    border: "rgba(140,120,80,0.1)", borderActive: "rgba(140,120,80,0.24)",
    gold: "#A87A0A", goldSoft: "rgba(168,122,10,0.07)", accent: "#B85A32", accentSoft: "rgba(184,90,50,0.06)",
    text: "#2A2218", text2: "#4A4030", text3: "#8A7E6A", text4: "#B8AD98",
    green: "#5A7A4A", red: "#A0422E", blue: "#4A6A8A", plum: "#7A5070", teal: "#3A8A7A",
    hd: "'Cormorant Garamond',Georgia,serif", body: "'Source Serif 4',Georgia,serif",
    ui: "'Outfit',system-ui,sans-serif", mono: "'JetBrains Mono',monospace",
    shadow: "0 1px 4px rgba(80,60,20,.05)", shadowLg: "0 6px 24px rgba(80,60,20,.06)",
  },
  stone: {
    id: "stone", name: "Stone & Sage", icon: "◑",
    bg: "#E6E4DE", bg2: "#DCDAD2", bg3: "#D0CEC4", surface: "#F0EEE8", surfaceHover: "#EAE8E1",
    border: "rgba(100,96,82,0.1)", borderActive: "rgba(100,96,82,0.22)",
    gold: "#7A6E42", goldSoft: "rgba(122,110,66,0.07)", accent: "#A85A3A", accentSoft: "rgba(168,90,58,0.06)",
    text: "#28261E", text2: "#44423A", text3: "#78756C", text4: "#A09C92",
    green: "#4A7A56", red: "#A0493A", blue: "#506A80", plum: "#7A5A6A", teal: "#3A8878",
    hd: "'Cormorant Garamond',Georgia,serif", body: "'Source Serif 4',Georgia,serif",
    ui: "'Outfit',system-ui,sans-serif", mono: "'JetBrains Mono',monospace",
    shadow: "0 1px 4px rgba(60,56,40,.05)", shadowLg: "0 6px 24px rgba(60,56,40,.06)",
  },
  editorial: {
    id: "editorial", name: "Editorial", icon: "■",
    bg: "#F9F9F7", bg2: "#F0EFEC", bg3: "#E4E3DE", surface: "#FFFFFF", surfaceHover: "#FBFBF9",
    border: "rgba(0,0,0,0.05)", borderActive: "rgba(0,0,0,0.12)",
    gold: "#1A1A18", goldSoft: "rgba(0,0,0,0.03)", accent: "#C44A20", accentSoft: "rgba(196,74,32,0.05)",
    text: "#1A1A18", text2: "#3A3A36", text3: "#7A7A74", text4: "#AAAAAA",
    green: "#2A6A4A", red: "#C44A20", blue: "#2A4A7A", plum: "#6A3A6A", teal: "#2A7A6A",
    hd: "'Cormorant Garamond',Georgia,serif", body: "'Source Serif 4',Georgia,serif",
    ui: "'Outfit',system-ui,sans-serif", mono: "'JetBrains Mono',monospace",
    shadow: "0 1px 3px rgba(0,0,0,.03)", shadowLg: "0 4px 16px rgba(0,0,0,.04)",
  },
};

function useTheme() {
  const [tid, setTid] = useState("twilight");
  return { T: THEMES[tid], tid, setTid };
}

const TIERS = [
  { name: "Fresh Ink", min: 0, color: "#8A8474" },
  { name: "Wet Ink", min: 25, color: "#7AAAB8" },
  { name: "Set Ink", min: 100, color: "#7AAA80" },
  { name: "Deep Ink", min: 500, color: "#C4A265" },
  { name: "Indelible", min: 2000, color: "#C06A30" },
];
const getTier = n => { for (let i = TIERS.length - 1; i >= 0; i--) if (n >= TIERS[i].min) return TIERS[i]; return TIERS[0]; };
const fmtN = n => n >= 10000 ? (n / 1000).toFixed(0) + "k" : n >= 1000 ? (n / 1000).toFixed(1) + "k" : String(n);

const LENSES = {
  analyst: { icon: "🔬", label: "Analyst", color: "#5B9BD5" },
  empath: { icon: "💖", label: "Empath", color: "#D4788C" },
  philosopher: { icon: "💡", label: "Philosopher", color: "#D4A855" },
  storyteller: { icon: "🎭", label: "Storyteller", color: "#9B7ED4" },
  explorer: { icon: "🗺️", label: "Explorer", color: "#5BAD7A" },
  alchemist: { icon: "✧", label: "Alchemist", color: "#C4A06A" },
};

const POST_TYPES = {
  original: { label: "Original", icon: "✎", colorKey: "accent" },
  review: { label: "Review", icon: "◈", colorKey: "gold" },
  recommendation: { label: "Rec", icon: "⬨", colorKey: "green" },
  spoiler: { label: "Spoiler", icon: "⚠", colorKey: "red" },
};

const USERS = [
  { id: "u1", name: "Ingrid Solberg", handle: "@ingridreads", initials: "IS", ink: 3420, lens: "analyst" },
  { id: "u2", name: "Kofi Asante", handle: "@kofi_writes", initials: "KA", ink: 8750, lens: "storyteller" },
  { id: "u3", name: "Yuki Tanaka", handle: "@yukiwrites", initials: "YT", ink: 1240, lens: "empath" },
  { id: "u4", name: "James Harlow", handle: "@jharlow", initials: "JH", ink: 540, lens: "explorer" },
  { id: "u5", name: "Priya Anand", handle: "@priyareads", initials: "PA", ink: 12300, lens: "empath" },
  { id: "u6", name: "Tomás Reyes", handle: "@tomasreyes", initials: "TR", ink: 280, lens: "philosopher" },
  { id: "u7", name: "Aisha Keita", handle: "@aishak", initials: "AK", ink: 4100, lens: "storyteller" },
  { id: "u8", name: "Amira Khoury", handle: "@amirakhoury", initials: "AM", ink: 8400, lens: "alchemist" },
];
const ME = { id: "me", name: "Sean", handle: "@sean", initials: "SP", ink: 1240, lens: "analyst" };

const CURRENTLY_READING = [
  { user: USERS[0], book: "Intermezzo", author: "Sally Rooney", progress: 72 },
  { user: USERS[1], book: "James", author: "Percival Everett", progress: 45 },
  { user: USERS[4], book: "Orbital", author: "Samantha Harvey", progress: 88 },
  { user: USERS[2], book: "The Vegetarian", author: "Han Kang", progress: 31 },
  { user: USERS[6], book: "Creation Lake", author: "Rachel Kushner", progress: 56 },
];

const FEED_ITEMS = [
  {
    id: "p1", type: "review", user: USERS[0], time: "2h",
    bookRef: { title: "Intermezzo", author: "Sally Rooney", coverColor: "#3A5A4A" },
    title: "The architecture of longing",
    text: "Rooney builds Intermezzo like a fugue — two brothers, two registers, two ways of failing at intimacy. The formal innovation isn't the dual POV; it's how the prose style itself shifts between them. Peter gets the modernist stream. Ivan gets the plain speech. The gap between those registers IS the novel.",
    rating: 4, likes: 47, comments: 12, shelved: 23, reposts: 8,
    isLiked: false, isShelved: false, isReposted: false,
    tags: ["literary-fiction", "structure"], following: true, lensMatch: true,
  },
  {
    id: "p2", type: "original", user: USERS[1], time: "4h",
    title: "Sixteen Funerals",
    text: "My grandmother attended sixteen funerals in the year she turned eighty. She told me once that grief has a sound — not the crying, not the hymns — but the moment after the last car leaves and the house goes quiet. That hum, she said. That's what the dead leave behind.\n\nI didn't understand until I heard it myself.",
    likes: 89, comments: 34, shelved: 56, reposts: 18,
    isLiked: true, isShelved: false, isReposted: false,
    tags: ["flash-prose", "grief"], following: true, isFirst: true, attestation: true,
  },
  {
    id: "p3", type: "recommendation", user: USERS[4], time: "6h",
    bookRef: { title: "Orbital", author: "Samantha Harvey", coverColor: "#2A3A6A" },
    text: "If you've ever stared out a plane window and felt the weight of everyone below you living their entire lives — read this. Harvey writes about astronauts the way mystics write about silence. It's 250 pages. It contains the universe.",
    likes: 112, comments: 28, shelved: 89, reposts: 32,
    isLiked: false, isShelved: true, isReposted: false,
    tags: ["literary-fiction", "contemplative"], following: true, lensMatch: true,
  },
  {
    id: "p4", type: "spoiler", user: USERS[3], time: "8h",
    bookRef: { title: "James", author: "Percival Everett", coverColor: "#5A3A2A" },
    title: "The river scene rewrites everything",
    text: "When Jim's internal monologue drops the dialect for the first time — the real voice emerging — I physically set the book down. Everett spent 200 pages building the mask so that the reveal doesn't just surprise you; it indicts you for needing the mask in the first place.",
    spoilerPage: "p. 212", likes: 34, comments: 19, shelved: 8, reposts: 3,
    isLiked: false, isShelved: false, isReposted: false,
    tags: ["historical-fiction", "voice"], lensMatch: true,
  },
  {
    id: "p5", type: "original", user: USERS[7], time: "12h",
    title: "The Cartographer's Confession",
    text: "I have drawn borders where none exist. I have named rivers after men who never saw them. And in my seventy-third year, I understand that every map I made was a letter to someone I couldn't reach — a way of saying: here is where I am. Here is the distance between us.\n\nMeasure it. Then forgive me for making it seem smaller than it was.",
    likes: 203, comments: 67, shelved: 124, reposts: 45,
    isLiked: false, isShelved: false, isReposted: false,
    tags: ["poetry", "place"], attestation: true,
    inspiredBy: { title: "Flights", author: "Olga Tokarczuk" },
  },
  {
    id: "p6", type: "review", user: USERS[2], time: "1d",
    bookRef: { title: "The Vegetarian", author: "Han Kang", coverColor: "#4A6A3A" },
    title: "Hunger as refusal",
    text: "Kang understands that the most terrifying act of autonomy isn't violence — it's silence. Yeong-hye's vegetarianism isn't a diet; it's a withdrawal from every contract society ever imposed on her body.",
    rating: 5, likes: 78, comments: 31, shelved: 45, reposts: 14,
    isLiked: false, isShelved: false, isReposted: false,
    tags: ["international", "autonomy"], following: true,
  },
];

const TRENDING = [
  { title: "Intermezzo", author: "Sally Rooney", readers: 412, heat: "+34%", color: "#3A5A4A" },
  { title: "James", author: "Percival Everett", readers: 387, heat: "+28%", color: "#5A3A2A" },
  { title: "Orbital", author: "Samantha Harvey", readers: 298, heat: "+22%", color: "#2A3A6A" },
  { title: "Beloved", author: "Toni Morrison", readers: 342, heat: "+15%", color: "#6A2A3A" },
];

const PROMPTS = [
  "Write about an object you inherited that carries more weight than it should.",
  "The last lie your character told before everything changed.",
  "A letter never sent, found decades later in a book.",
  "Two strangers in a waiting room share the same recurring dream.",
];

const getCSS = T => `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700&family=Source+Serif+4:ital,opsz,wght@0,8..60,300;0,8..60,400;0,8..60,500;1,8..60,400&family=Outfit:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
body{background:${T.bg}!important;overflow-x:hidden;-webkit-tap-highlight-color:transparent}
::selection{background:${T.gold}30;color:${T.text}}
::-webkit-scrollbar{width:0;height:0}
@keyframes enter{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:translateY(0)}}
@keyframes fadeIn{from{opacity:0}to{opacity:1}}
@keyframes scaleIn{from{opacity:0;transform:scale(.97)}to{opacity:1;transform:scale(1)}}
@keyframes pop{0%{transform:scale(1)}50%{transform:scale(1.25)}100%{transform:scale(1)}}
.tb{-webkit-tap-highlight-color:transparent;touch-action:manipulation}
.tb:active{opacity:.7;transform:scale(.97)}
.cl{transition:border-color .2s,box-shadow .15s}
@media(min-width:768px){
  .mh{display:none!important}
  .dh{display:flex!important}
  .bb{display:none!important}
  .fw{padding-bottom:0!important;max-width:680px;margin:0 auto}
  .fs{display:grid!important;grid-template-columns:1fr 300px;gap:24px;max-width:1020px;margin:0 auto;align-items:start}
  .sd{display:flex!important}
  .cl:hover{border-color:${T.borderActive};box-shadow:${T.shadow};transform:translateY(-1px)}
}
@media(max-width:767px){
  .dh{display:none!important}
  .sd{display:none!important}
  .fs{display:block!important}
}`;

function Av({ T, i, ink = 0, s = 34 }) {
  const t = getTier(ink);
  return <div style={{ width: s, height: s, borderRadius: "50%", background: `linear-gradient(145deg,${t.color}20,${T.bg2})`, border: `1.5px solid ${t.color}28`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: T.ui, fontSize: s * .34, fontWeight: 700, color: t.color, flexShrink: 0 }}>{i}</div>;
}

function IB({ T, ink, compact }) {
  const t = getTier(ink);
  return <span style={{ display: "inline-flex", alignItems: "center", gap: 3, padding: compact ? "1px 5px" : "2px 7px", borderRadius: 4, fontSize: compact ? 9 : 10, fontWeight: 600, fontFamily: T.ui, color: t.color, background: `${t.color}0D` }}>{compact ? fmtN(ink) : `${fmtN(ink)} · ${t.name}`}</span>;
}

function LB({ T, lens, compact }) {
  const l = LENSES[lens]; if (!l) return null;
  return <span style={{ display: "inline-flex", alignItems: "center", gap: 2, padding: "1px 6px", borderRadius: 4, fontSize: 9, fontWeight: 500, fontFamily: T.ui, color: l.color, background: `${l.color}08` }}>{l.icon}{!compact && ` ${l.label}`}</span>;
}

function TT({ T, type }) {
  const t = POST_TYPES[type]; if (!t) return null;
  const c = T[t.colorKey] || T.gold;
  return <span style={{ display: "inline-flex", alignItems: "center", gap: 3, padding: "2px 8px", borderRadius: 4, fontSize: 9, fontWeight: 700, fontFamily: T.ui, color: c, background: `${c}0D`, letterSpacing: ".04em", textTransform: "uppercase" }}>{t.icon} {t.label}</span>;
}

function EB({ T, icon, count, active, ac, onClick, label }) {
  const [p, setP] = useState(false);
  return <button className="tb" onClick={() => { onClick?.(); setP(true); setTimeout(() => setP(false), 300); }} title={label} style={{ display: "flex", alignItems: "center", gap: 4, padding: "8px 10px", borderRadius: 8, background: active ? `${ac}0D` : "transparent", border: "none", cursor: "pointer", animation: p ? "pop .3s ease" : "none", minHeight: 40 }}>
    <span style={{ fontSize: 15, color: active ? ac : T.text4 }}>{icon}</span>
    <span style={{ fontFamily: T.ui, fontSize: 11, fontWeight: 600, color: active ? ac : T.text4, fontVariantNumeric: "tabular-nums" }}>{fmtN(count)}</span>
  </button>;
}

function SG({ T, children, revealed, onReveal, bookTitle, page }) {
  if (revealed) return children;
  return <div style={{ padding: "24px 16px", borderRadius: 10, textAlign: "center", background: `repeating-linear-gradient(135deg,${T.red}05,${T.red}05 2px,transparent 2px,transparent 8px)`, border: `1px dashed ${T.red}20` }}>
    <div style={{ fontFamily: T.ui, fontSize: 10, fontWeight: 700, color: T.red, letterSpacing: ".08em", textTransform: "uppercase", marginBottom: 4 }}>⚠ Spoiler Zone</div>
    <div style={{ fontFamily: T.body, fontSize: 12, color: T.text3, marginBottom: 14 }}>{bookTitle}{page ? ` · ${page}` : ""}</div>
    <button className="tb" onClick={onReveal} style={{ padding: "10px 24px", borderRadius: 8, background: `${T.red}0D`, border: `1px solid ${T.red}20`, fontFamily: T.ui, fontSize: 12, fontWeight: 600, color: T.red, cursor: "pointer", minHeight: 44 }}>Reveal Content</button>
  </div>;
}

function BR({ T, book }) {
  if (!book) return null;
  return <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 12px", borderRadius: 8, background: T.bg2, border: `1px solid ${T.border}`, marginBottom: 10 }}>
    <div style={{ width: 26, height: 38, borderRadius: 3, flexShrink: 0, background: `linear-gradient(140deg,${book.coverColor || T.accent}90,${book.coverColor || T.accent}50)` }} />
    <div style={{ flex: 1, minWidth: 0 }}>
      <div style={{ fontFamily: T.ui, fontSize: 12, fontWeight: 600, color: T.text, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{book.title}</div>
      <div style={{ fontFamily: T.ui, fontSize: 10, color: T.text3 }}>{book.author}</div>
    </div>
    {book.rating && <div style={{ fontFamily: T.ui, fontSize: 11, color: T.gold, flexShrink: 0 }}>{"★".repeat(book.rating)}<span style={{ color: T.text4 }}>{"★".repeat(5 - book.rating)}</span></div>}
  </div>;
}

function FC({ T, item, onToggle, index = 0 }) {
  const [so, setSo] = useState(false);
  const [mo, setMo] = useState(false);
  const content = <>
    {item.title && <h3 style={{ fontFamily: T.hd, fontSize: 19, fontWeight: 600, color: T.text, lineHeight: 1.3, marginBottom: 6, letterSpacing: "-.01em" }}>{item.title}</h3>}
    <div style={{ fontFamily: T.body, fontSize: 14.5, lineHeight: 1.7, color: T.text2, fontWeight: 300, whiteSpace: "pre-line" }}>{item.text}</div>
  </>;

  return <article className="cl" style={{ background: T.surface, borderRadius: 14, border: `1px solid ${T.border}`, padding: "18px 16px 12px", animation: `enter .35s ease ${index * .05}s both` }}>
    <div style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 12 }}>
      <Av T={T} i={item.user.initials} ink={item.user.ink} s={38} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 5, flexWrap: "wrap" }}>
          <span style={{ fontFamily: T.ui, fontSize: 13.5, fontWeight: 650, color: T.text }}>{item.user.name}</span>
          {item.attestation && <span style={{ fontSize: 8, padding: "1px 5px", borderRadius: 3, background: `${T.green}0D`, color: T.green, fontFamily: T.ui, fontWeight: 700 }}>✓ HUMAN</span>}
          {item.isFirst && <span style={{ fontSize: 8, padding: "1px 5px", borderRadius: 3, background: `${T.gold}0D`, color: T.gold, fontFamily: T.ui, fontWeight: 700 }}>✦ FIRST</span>}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 5, marginTop: 2, flexWrap: "wrap" }}>
          <span style={{ fontFamily: T.ui, fontSize: 11, color: T.text4 }}>{item.user.handle}</span>
          <span style={{ color: T.text4, fontSize: 8 }}>·</span>
          <span style={{ fontFamily: T.ui, fontSize: 11, color: T.text4 }}>{item.time}</span>
          <IB T={T} ink={item.user.ink} compact />
          <LB T={T} lens={item.user.lens} compact />
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 6, flexShrink: 0 }}>
        <TT T={T} type={item.type} />
        <div style={{ position: "relative" }}>
          <button className="tb" onClick={() => setMo(!mo)} style={{ background: "none", border: "none", cursor: "pointer", padding: 8, fontSize: 18, color: T.text4, minWidth: 36, minHeight: 36, display: "flex", alignItems: "center", justifyContent: "center" }}>⋮</button>
          {mo && <div onClick={() => setMo(false)} style={{ position: "absolute", top: "100%", right: 0, background: T.surface, border: `1px solid ${T.borderActive}`, borderRadius: 12, padding: 6, minWidth: 160, boxShadow: T.shadowLg, zIndex: 50, animation: "scaleIn .12s ease" }}>
            {["Hide post", "Mute author", "Report"].map(a => <button key={a} className="tb" style={{ display: "block", width: "100%", padding: "12px 14px", borderRadius: 8, border: "none", background: "none", fontFamily: T.ui, fontSize: 13, color: a === "Report" ? T.red : T.text2, cursor: "pointer", textAlign: "left", minHeight: 44 }}>{a}</button>)}
          </div>}
        </div>
      </div>
    </div>
    {item.bookRef && <BR T={T} book={{ ...item.bookRef, rating: item.rating }} />}
    {item.inspiredBy && <div style={{ display: "flex", alignItems: "center", gap: 5, padding: "6px 10px", borderRadius: 6, background: `${T.plum}06`, border: `1px solid ${T.plum}0D`, marginBottom: 10, fontFamily: T.ui, fontSize: 10.5, color: T.plum }}>◇ Inspired by <strong>{item.inspiredBy.title}</strong> — {item.inspiredBy.author}</div>}
    {item.type === "spoiler" ? <SG T={T} revealed={so} onReveal={() => setSo(true)} bookTitle={item.bookRef?.title} page={item.spoilerPage}>{content}</SG> : content}
    {item.tags?.length > 0 && <div style={{ display: "flex", gap: 4, flexWrap: "wrap", marginTop: 10 }}>{item.tags.map(t => <span key={t} style={{ padding: "2px 8px", borderRadius: 4, fontSize: 10, fontFamily: T.ui, fontWeight: 500, color: T.text3, background: T.bg2, border: `1px solid ${T.border}` }}>{t}</span>)}</div>}
    <div style={{ display: "flex", alignItems: "center", gap: 0, marginTop: 12, paddingTop: 10, borderTop: `1px solid ${T.border}`, marginLeft: -4, marginRight: -4 }}>
      <EB T={T} icon="♡" count={item.likes} active={item.isLiked} ac={T.red} onClick={() => onToggle(item.id, "like")} label="Like" />
      <EB T={T} icon="↩" count={item.comments} active={false} ac={T.blue} label="Reply" />
      <EB T={T} icon="⊞" count={item.shelved} active={item.isShelved} ac={T.gold} onClick={() => onToggle(item.id, "shelf")} label="Shelf" />
      <EB T={T} icon="⤴" count={item.reposts} active={item.isReposted} ac={T.green} onClick={() => onToggle(item.id, "repost")} label="Repost" />
      <div style={{ flex: 1 }} />
      <button className="tb" style={{ background: "none", border: "none", cursor: "pointer", fontFamily: T.ui, fontSize: 11, color: T.text4, padding: "8px 6px", minHeight: 40 }}>⎘</button>
    </div>
  </article>;
}

function RS({ T }) {
  return <div style={{ marginBottom: 16 }}>
    <div style={{ fontFamily: T.ui, fontSize: 10, fontWeight: 700, color: T.text4, letterSpacing: ".1em", textTransform: "uppercase", marginBottom: 8, padding: "0 2px" }}>Currently Reading</div>
    <div style={{ display: "flex", gap: 8, overflowX: "auto", WebkitOverflowScrolling: "touch", scrollSnapType: "x mandatory", paddingBottom: 4, scrollbarWidth: "none" }}>
      {CURRENTLY_READING.map((cr, i) => <div key={i} className="tb" style={{ flex: "0 0 auto", scrollSnapAlign: "start", display: "flex", alignItems: "center", gap: 10, padding: "10px 14px", borderRadius: 12, background: T.surface, border: `1px solid ${T.border}`, minWidth: 180, maxWidth: 220 }}>
        <Av T={T} i={cr.user.initials} ink={cr.user.ink} s={28} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontFamily: T.ui, fontSize: 11.5, fontWeight: 600, color: T.text, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{cr.book}</div>
          <div style={{ fontFamily: T.ui, fontSize: 10, color: T.text4 }}>{cr.author}</div>
        </div>
        <div style={{ width: 30, height: 30, borderRadius: "50%", flexShrink: 0, background: `conic-gradient(${T.accent} ${cr.progress}%,${T.border} ${cr.progress}%)`, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ width: 24, height: 24, borderRadius: "50%", background: T.surface, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: T.mono, fontSize: 8, fontWeight: 500, color: T.text3 }}>{cr.progress}</div>
        </div>
      </div>)}
    </div>
  </div>;
}

function PC({ T }) {
  const [idx, setIdx] = useState(0);
  return <div style={{ background: T.surface, borderRadius: 14, border: `1px solid ${T.border}`, padding: "16px 16px 14px", marginBottom: 14 }}>
    <div style={{ fontFamily: T.ui, fontSize: 9, fontWeight: 700, color: T.accent, letterSpacing: ".1em", textTransform: "uppercase", marginBottom: 8 }}>✎ Writing Prompt</div>
    <div style={{ fontFamily: T.hd, fontSize: 16, fontWeight: 500, color: T.text, lineHeight: 1.45, fontStyle: "italic", marginBottom: 12 }}>"{PROMPTS[idx]}"</div>
    <div style={{ display: "flex", gap: 8 }}>
      <button className="tb" style={{ flex: 1, padding: "10px 0", borderRadius: 8, border: "none", background: T.accent, color: "#fff", fontFamily: T.ui, fontSize: 12, fontWeight: 700, cursor: "pointer", minHeight: 44, boxShadow: `0 2px 8px ${T.accent}30` }}>Write This</button>
      <button className="tb" onClick={() => setIdx((idx + 1) % PROMPTS.length)} style={{ padding: "10px 18px", borderRadius: 8, border: `1px solid ${T.border}`, background: "none", color: T.text3, fontFamily: T.ui, fontSize: 12, fontWeight: 600, cursor: "pointer", minHeight: 44 }}>Next</button>
    </div>
  </div>;
}

function TB({ T }) {
  return <div style={{ background: T.surface, borderRadius: 14, border: `1px solid ${T.border}`, padding: "16px 16px 8px" }}>
    <div style={{ fontFamily: T.hd, fontSize: 16, fontWeight: 600, color: T.text, marginBottom: 12 }}>Trending Now</div>
    {TRENDING.map((b, i) => <div key={i} className="tb" style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 4px", cursor: "pointer", borderBottom: i < TRENDING.length - 1 ? `1px solid ${T.border}` : "none", minHeight: 48 }}>
      <div style={{ fontFamily: T.mono, fontSize: 11, fontWeight: 500, color: T.text4, width: 18, textAlign: "center" }}>{i + 1}</div>
      <div style={{ width: 22, height: 32, borderRadius: 3, flexShrink: 0, background: `linear-gradient(140deg,${b.color}AA,${b.color}60)` }} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontFamily: T.ui, fontSize: 12, fontWeight: 600, color: T.text, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{b.title}</div>
        <div style={{ fontFamily: T.ui, fontSize: 10, color: T.text3 }}>{b.author}</div>
      </div>
      <span style={{ fontFamily: T.mono, fontSize: 10, fontWeight: 500, color: T.green, background: `${T.green}0D`, padding: "2px 6px", borderRadius: 3 }}>{b.heat}</span>
    </div>)}
  </div>;
}

function IL({ T }) {
  const top = [...USERS].sort((a, b) => b.ink - a.ink).slice(0, 5);
  return <div style={{ background: T.surface, borderRadius: 14, border: `1px solid ${T.border}`, padding: "16px 16px 8px" }}>
    <div style={{ fontFamily: T.hd, fontSize: 16, fontWeight: 600, color: T.text, marginBottom: 12 }}>Ink Leaders</div>
    {top.map((u, i) => <div key={u.id} style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 2px", borderBottom: i < top.length - 1 ? `1px solid ${T.border}` : "none" }}>
      <div style={{ fontFamily: T.mono, fontSize: 11, fontWeight: 500, color: i < 3 ? T.gold : T.text4, width: 16 }}>{i + 1}</div>
      <Av T={T} i={u.initials} ink={u.ink} s={26} />
      <div style={{ flex: 1, fontFamily: T.ui, fontSize: 11.5, fontWeight: 600, color: T.text }}>{u.name}</div>
      <span style={{ fontFamily: T.mono, fontSize: 10, fontWeight: 500, color: getTier(u.ink).color }}>{fmtN(u.ink)}</span>
    </div>)}
  </div>;
}

function TP({ T, tid, setTid }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  useEffect(() => { if (!open) return; const h = e => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); }; document.addEventListener("mousedown", h); document.addEventListener("touchstart", h); return () => { document.removeEventListener("mousedown", h); document.removeEventListener("touchstart", h); }; }, [open]);
  return <div ref={ref} style={{ position: "relative" }}>
    <button className="tb" onClick={() => setOpen(!open)} style={{ width: 34, height: 34, borderRadius: "50%", border: `1.5px solid ${T.border}`, background: T.bg2, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13 }}>{THEMES[tid].icon}</button>
    {open && <div style={{ position: "absolute", top: "calc(100% + 8px)", right: 0, background: T.surface, border: `1px solid ${T.borderActive}`, borderRadius: 14, padding: 6, minWidth: 210, boxShadow: T.shadowLg, zIndex: 200, animation: "scaleIn .12s ease" }}>
      <div style={{ padding: "6px 12px 8px", fontFamily: T.ui, fontSize: 9, fontWeight: 700, color: T.text4, letterSpacing: ".08em", textTransform: "uppercase" }}>Reading Theme</div>
      {Object.values(THEMES).map(t => {
        const active = t.id === tid;
        return <button key={t.id} className="tb" onClick={() => { setTid(t.id); setOpen(false); }} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", borderRadius: 10, border: "none", cursor: "pointer", width: "100%", minHeight: 44, background: active ? `${t.accent}0D` : "transparent" }}>
          <div style={{ display: "flex", gap: 3 }}>{[t.bg, t.surface, t.text, t.accent, t.gold].map((c, i) => <div key={i} style={{ width: 10, height: 10, borderRadius: "50%", background: c, border: "1px solid rgba(128,128,128,.12)" }} />)}</div>
          <span style={{ fontFamily: T.ui, fontSize: 12, fontWeight: active ? 700 : 500, color: active ? t.accent : T.text2 }}>{t.name}</span>
          {active && <span style={{ marginLeft: "auto", fontSize: 10, color: t.accent }}>✓</span>}
        </button>;
      })}
    </div>}
  </div>;
}

const TABS = [
  { id: "feed", label: "Feed", icon: "⊞" },
  { id: "explore", label: "Explore", icon: "◎" },
  { id: "press", label: "Press", icon: "✎" },
  { id: "compass", label: "Compass", icon: "⌖" },
  { id: "shelf", label: "Shelf", icon: "▤" },
];
const FILTERS = [
  { id: "foryou", label: "✦ For You" }, { id: "all", label: "All" },
  { id: "original", label: "✎ Original" }, { id: "review", label: "◈ Reviews" },
  { id: "recommendation", label: "⬨ Recs" }, { id: "spoiler", label: "⚠ Spoiler" },
];

export default function PrecisApp() {
  const { T, tid, setTid } = useTheme();
  const [tab, setTab] = useState("feed");
  const [filter, setFilter] = useState("foryou");
  const [feed, setFeed] = useState(FEED_ITEMS);
  const [searchQ, setSearchQ] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);

  const onToggle = useCallback((id, type) => {
    setFeed(prev => prev.map(item => {
      if (item.id !== id) return item;
      if (type === "like") return { ...item, isLiked: !item.isLiked, likes: item.likes + (item.isLiked ? -1 : 1) };
      if (type === "shelf") return { ...item, isShelved: !item.isShelved, shelved: item.shelved + (item.isShelved ? -1 : 1) };
      if (type === "repost") return { ...item, isReposted: !item.isReposted, reposts: item.reposts + (item.isReposted ? -1 : 1) };
      return item;
    }));
  }, []);

  const filtered = filter === "foryou" ? feed.filter(f => f.following || f.lensMatch) : filter === "all" ? feed : feed.filter(f => f.type === filter);
  const searched = searchQ.trim() ? filtered.filter(f => {
    const q = searchQ.toLowerCase();
    return (f.title || "").toLowerCase().includes(q) || (f.text || "").toLowerCase().includes(q) || f.user.name.toLowerCase().includes(q) || (f.bookRef?.title || "").toLowerCase().includes(q);
  }) : filtered;

  return <div style={{ minHeight: "100vh", background: T.bg, color: T.text, paddingBottom: 72 }}>
    <style>{getCSS(T)}</style>

    {/* MOBILE HEADER */}
    <header className="mh" style={{ position: "sticky", top: 0, zIndex: 100, background: `${T.bg}EC`, backdropFilter: "blur(20px) saturate(1.3)", borderBottom: `1px solid ${T.border}`, padding: "0 16px", height: 52, display: "flex", alignItems: "center", gap: 12 }}>
      <span style={{ fontFamily: T.hd, fontSize: 22, fontWeight: 700, color: T.text, letterSpacing: "-.02em", flexShrink: 0 }}>Pr<span style={{ color: T.accent }}>é</span>cis</span>
      <div style={{ flex: 1 }} />
      {searchOpen && <div style={{ flex: 1, position: "relative", animation: "fadeIn .15s ease" }}>
        <input autoFocus value={searchQ} onChange={e => setSearchQ(e.target.value)} placeholder="Search…" style={{ width: "100%", padding: "8px 12px 8px 30px", borderRadius: 8, background: T.bg3, border: `1px solid ${T.borderActive}`, fontFamily: T.ui, fontSize: 13, color: T.text, outline: "none" }} />
        <span style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", fontSize: 13, color: T.text4, pointerEvents: "none" }}>⌕</span>
      </div>}
      <button className="tb" onClick={() => { setSearchOpen(!searchOpen); if (searchOpen) setSearchQ(""); }} style={{ background: "none", border: "none", fontSize: 18, color: searchOpen ? T.accent : T.text3, cursor: "pointer", padding: 6, minWidth: 36, minHeight: 36, display: "flex", alignItems: "center", justifyContent: "center" }}>{searchOpen ? "✕" : "⌕"}</button>
      <TP T={T} tid={tid} setTid={setTid} />
      <Av T={T} i={ME.initials} ink={ME.ink} s={30} />
    </header>

    {/* DESKTOP HEADER */}
    <header className="dh" style={{ display: "none", position: "sticky", top: 0, zIndex: 100, background: `${T.bg}E8`, backdropFilter: "blur(20px) saturate(1.3)", borderBottom: `1px solid ${T.border}` }}>
      <div style={{ maxWidth: 1040, margin: "0 auto", padding: "0 28px", height: 56, display: "flex", alignItems: "center" }}>
        <span style={{ fontFamily: T.hd, fontSize: 24, fontWeight: 700, color: T.text, letterSpacing: "-.02em", marginRight: 32, flexShrink: 0 }}>Pr<span style={{ color: T.accent }}>é</span>cis</span>
        <div style={{ display: "flex", gap: 1 }}>{TABS.map(n => <button key={n.id} className="tb" onClick={() => setTab(n.id)} style={{ padding: "8px 14px", borderRadius: 8, border: "none", fontFamily: T.ui, fontSize: 12.5, fontWeight: tab === n.id ? 700 : 500, cursor: "pointer", background: tab === n.id ? T.goldSoft : "transparent", color: tab === n.id ? T.gold : T.text3, display: "flex", alignItems: "center", gap: 5 }}><span style={{ fontSize: 14 }}>{n.icon}</span> {n.label}</button>)}</div>
        <div style={{ flex: 1, maxWidth: 280, margin: "0 24px", position: "relative" }}>
          <input value={searchQ} onChange={e => setSearchQ(e.target.value)} placeholder="Search stories, authors, books…" style={{ width: "100%", padding: "8px 14px 8px 32px", borderRadius: 8, background: T.bg3, border: `1px solid ${searchQ ? T.borderActive : T.border}`, fontFamily: T.ui, fontSize: 12, color: T.text, outline: "none" }} />
          <span style={{ position: "absolute", left: 11, top: "50%", transform: "translateY(-50%)", fontSize: 13, color: T.text4, pointerEvents: "none" }}>⌕</span>
          {searchQ && <button onClick={() => setSearchQ("")} style={{ position: "absolute", right: 8, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", color: T.text3, cursor: "pointer", fontSize: 13 }}>✕</button>}
        </div>
        <div style={{ flex: 1 }} />
        <button className="tb" style={{ padding: "8px 20px", borderRadius: 8, border: "none", background: T.accent, color: "#fff", fontFamily: T.ui, fontSize: 12, fontWeight: 700, cursor: "pointer", boxShadow: `0 2px 8px ${T.accent}30`, display: "flex", alignItems: "center", gap: 5, marginRight: 14 }}>✎ Write</button>
        <TP T={T} tid={tid} setTid={setTid} />
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginLeft: 10, cursor: "pointer" }}>
          <Av T={T} i={ME.initials} ink={ME.ink} s={32} />
          <div style={{ lineHeight: 1.2 }}>
            <div style={{ fontFamily: T.ui, fontSize: 12, fontWeight: 600, color: T.text }}>{ME.name}</div>
            <IB T={T} ink={ME.ink} compact />
          </div>
        </div>
      </div>
    </header>

    {/* CONTENT */}
    <div style={{ padding: "16px 14px 0" }} className="fw">
      <div className="fs">
        <main>
          {tab === "feed" && <>
            <RS T={T} />
            <div style={{ display: "flex", gap: 6, overflowX: "auto", WebkitOverflowScrolling: "touch", marginBottom: 14, paddingBottom: 2, scrollbarWidth: "none", marginLeft: -2, paddingLeft: 2 }}>
              {FILTERS.map(f => <button key={f.id} className="tb" onClick={() => setFilter(f.id)} style={{ padding: "8px 16px", borderRadius: 20, border: `1px solid ${filter === f.id ? T.borderActive : T.border}`, fontFamily: T.ui, fontSize: 12, fontWeight: filter === f.id ? 700 : 500, cursor: "pointer", whiteSpace: "nowrap", minHeight: 38, background: filter === f.id ? T.goldSoft : "transparent", color: filter === f.id ? T.gold : T.text3 }}>{f.label}</button>)}
            </div>
            {searchQ && <div style={{ fontFamily: T.ui, fontSize: 12, color: T.text3, marginBottom: 12 }}>⌕ "{searchQ}" · {searched.length} found</div>}
            <PC T={T} />
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {searched.length === 0
                ? <div style={{ textAlign: "center", padding: "48px 16px", animation: "fadeIn .3s ease" }}>
                    <div style={{ fontSize: 36, marginBottom: 10, opacity: .15 }}>⌕</div>
                    <div style={{ fontFamily: T.hd, fontSize: 18, fontWeight: 600, color: T.text, marginBottom: 6 }}>{searchQ ? `Nothing for "${searchQ}"` : "No posts here yet"}</div>
                    <p style={{ fontFamily: T.body, fontSize: 13, color: T.text3 }}>{searchQ ? "Try different keywords." : "Be the first to write one."}</p>
                  </div>
                : searched.map((item, i) => <FC key={item.id} T={T} item={item} onToggle={onToggle} index={i} />)
              }
            </div>
            <div style={{ marginTop: 16 }}><TB T={T} /></div>
            {searched.length > 0 && <div style={{ textAlign: "center", padding: "40px 16px 24px", borderTop: `1px solid ${T.border}`, marginTop: 16 }}>
              <div style={{ fontFamily: T.hd, fontSize: 20, fontWeight: 600, color: T.text, fontStyle: "italic", marginBottom: 6 }}>You're caught up.</div>
              <p style={{ fontFamily: T.body, fontSize: 13, color: T.text3, lineHeight: 1.6, maxWidth: 340, margin: "0 auto 16px" }}>Everything new has been read. The page is yours.</p>
              <div style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap" }}>
                <button className="tb" style={{ padding: "12px 24px", borderRadius: 10, border: "none", background: T.accent, color: "#fff", fontFamily: T.ui, fontSize: 13, fontWeight: 700, cursor: "pointer", minHeight: 44, boxShadow: `0 2px 8px ${T.accent}30` }}>✎ Write something</button>
                <button className="tb" onClick={() => setTab("explore")} style={{ padding: "12px 20px", borderRadius: 10, border: `1px solid ${T.border}`, background: "none", color: T.text3, fontFamily: T.ui, fontSize: 13, fontWeight: 600, cursor: "pointer", minHeight: 44 }}>◎ Discover</button>
              </div>
            </div>}
          </>}
          {tab !== "feed" && <div style={{ animation: "enter .35s ease both", textAlign: "center", padding: "60px 16px" }}>
            <div style={{ fontSize: 44, marginBottom: 14, opacity: .12 }}>{TABS.find(t => t.id === tab)?.icon}</div>
            <h2 style={{ fontFamily: T.hd, fontSize: 26, fontWeight: 600, color: T.text, marginBottom: 8 }}>{TABS.find(t => t.id === tab)?.label}</h2>
            <p style={{ fontFamily: T.body, fontSize: 14, color: T.text3 }}>Ready for backend wiring.</p>
          </div>}
        </main>

        {tab === "feed" && <aside className="sd" style={{ display: "none", flexDirection: "column", gap: 14, position: "sticky", top: 76, animation: "enter .4s ease .1s both" }}>
          <PC T={T} />
          <TB T={T} />
          <IL T={T} />
          <div style={{ padding: "10px 0", fontFamily: T.ui, fontSize: 10, color: T.text4, lineHeight: 1.8 }}>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 4 }}>{["About", "TOS", "Privacy"].map(l => <span key={l} style={{ cursor: "pointer" }}>{l}</span>)}</div>
            © 2026 Précis Technologies, Inc.
          </div>
        </aside>}
      </div>
    </div>

    {/* MOBILE BOTTOM BAR */}
    <nav className="bb" style={{ position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 100, background: `${T.bg}F2`, backdropFilter: "blur(20px) saturate(1.3)", borderTop: `1px solid ${T.border}`, display: "flex", alignItems: "stretch", height: 60, paddingBottom: "env(safe-area-inset-bottom,0px)" }}>
      {TABS.map(t => {
        const active = tab === t.id;
        return <button key={t.id} className="tb" onClick={() => setTab(t.id)} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 2, background: "none", border: "none", cursor: "pointer", color: active ? T.gold : T.text4, minHeight: 48, position: "relative" }}>
          {active && <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: 20, height: 2, borderRadius: 1, background: T.gold }} />}
          <span style={{ fontSize: 20, lineHeight: 1 }}>{t.icon}</span>
          <span style={{ fontFamily: T.ui, fontSize: 9, fontWeight: active ? 700 : 500, letterSpacing: ".02em" }}>{t.label}</span>
        </button>;
      })}
      <div style={{ position: "absolute", top: -22, left: "50%", transform: "translateX(-50%)", width: 48, height: 48, borderRadius: "50%", background: `linear-gradient(135deg,${T.accent},#9A4520)`, boxShadow: `0 4px 16px ${T.accent}50`, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", zIndex: 10 }}>
        <span style={{ fontSize: 20, color: "#fff", marginTop: -1 }}>✎</span>
      </div>
    </nav>
  </div>;
}
