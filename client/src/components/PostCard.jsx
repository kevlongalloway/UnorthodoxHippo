import { useState } from "react";
import { LENSES, POST_TYPES, fmtN } from "../themes.js";
import Av from "./Avatar.jsx";
import InkBadge from "./InkBadge.jsx";

/* ── Type tag ── */
function TT({ T, type }) {
  const t = POST_TYPES[type]; if (!t) return null;
  const c = T[t.colorKey] || T.gold;
  return (
    <span style={{
      display:"inline-flex", alignItems:"center", gap:3,
      padding:"2px 8px", borderRadius:4, fontSize:9, fontWeight:700,
      fontFamily:T.ui, color:c, background:`${c}0D`,
      letterSpacing:".04em", textTransform:"uppercase",
    }}>
      {t.icon} {t.label}
    </span>
  );
}

/* ── Lens badge ── */
function LB({ T, lens }) {
  const l = LENSES[lens]; if (!l) return null;
  return (
    <span style={{
      display:"inline-flex", alignItems:"center", gap:2,
      padding:"1px 6px", borderRadius:4, fontSize:9, fontWeight:500,
      fontFamily:T.ui, color:l.color, background:`${l.color}08`,
    }}>
      {l.icon}
    </span>
  );
}

/* ── Book ref box ── */
function BR({ T, book }) {
  if (!book) return null;
  return (
    <div style={{
      display:"flex", alignItems:"center", gap:10,
      padding:"8px 12px", borderRadius:8,
      background:T.bg2, border:`1px solid ${T.border}`, marginBottom:10,
    }}>
      <div style={{
        width:26, height:38, borderRadius:3, flexShrink:0,
        background:`linear-gradient(140deg,${book.coverColor||T.accent}90,${book.coverColor||T.accent}50)`,
      }} />
      <div style={{ flex:1, minWidth:0 }}>
        <div style={{ fontFamily:T.ui, fontSize:12, fontWeight:600, color:T.text, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>
          {book.title}
        </div>
        <div style={{ fontFamily:T.ui, fontSize:10, color:T.text3 }}>{book.author}</div>
      </div>
      {book.rating && (
        <div style={{ fontFamily:T.ui, fontSize:11, color:T.gold, flexShrink:0 }}>
          {"★".repeat(book.rating)}<span style={{ color:T.text4 }}>{"★".repeat(5 - book.rating)}</span>
        </div>
      )}
    </div>
  );
}

/* ── Engagement button ── */
function EB({ T, icon, count, active, ac, onClick, label }) {
  const [popped, setPopped] = useState(false);
  const handle = () => {
    onClick?.();
    setPopped(true);
    setTimeout(() => setPopped(false), 300);
  };
  return (
    <button className="tb" onClick={handle} title={label} style={{
      display:"flex", alignItems:"center", gap:4,
      padding:"8px 10px", borderRadius:8,
      background: active ? `${ac}0D` : "transparent",
      border:"none", cursor:"pointer",
      animation: popped ? "pop .3s ease" : "none",
      minHeight:40,
    }}>
      <span style={{ fontSize:15, color: active ? ac : T.text4 }}>{icon}</span>
      <span style={{ fontFamily:T.mono, fontSize:11, fontWeight:500, color: active ? ac : T.text4, fontVariantNumeric:"tabular-nums" }}>
        {fmtN(count)}
      </span>
    </button>
  );
}

/* ── Spoiler gate ── */
function SpoilerGate({ T, children, revealed, onReveal, bookTitle, page }) {
  if (revealed) return children;
  return (
    <div style={{
      padding:"24px 16px", borderRadius:10, textAlign:"center",
      background:`repeating-linear-gradient(135deg,${T.red}05,${T.red}05 2px,transparent 2px,transparent 8px)`,
      border:`1px dashed ${T.red}20`,
    }}>
      <div style={{ fontFamily:T.ui, fontSize:10, fontWeight:700, color:T.red, letterSpacing:".08em", textTransform:"uppercase", marginBottom:4 }}>
        ⚠ Spoiler Zone
      </div>
      <div style={{ fontFamily:T.body, fontSize:12, color:T.text3, marginBottom:14 }}>
        {bookTitle}{page ? ` · ${page}` : ""}
      </div>
      <button className="tb" onClick={onReveal} style={{
        padding:"10px 24px", borderRadius:8,
        background:`${T.red}0D`, border:`1px solid ${T.red}20`,
        fontFamily:T.ui, fontSize:12, fontWeight:600, color:T.red,
        cursor:"pointer", minHeight:44,
      }}>
        Reveal Content
      </button>
    </div>
  );
}

/* ── Feed Card ── */
export default function PostCard({ T, item, onToggle, index = 0 }) {
  const [spoilerOpen, setSpoilerOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const body = (
    <>
      {item.title && (
        <h3 style={{ fontFamily:T.hd, fontSize:19, fontWeight:600, color:T.text, lineHeight:1.3, marginBottom:6, letterSpacing:"-.01em" }}>
          {item.title}
        </h3>
      )}
      <div style={{ fontFamily:T.body, fontSize:14.5, lineHeight:1.7, color:T.text2, fontWeight:300, whiteSpace:"pre-line" }}>
        {item.text}
      </div>
    </>
  );

  return (
    <article className="cl" style={{
      background:T.surface, borderRadius:14,
      border:`1px solid ${T.border}`,
      padding:"18px 16px 12px",
      animation:`enter .35s ease ${index * .05}s both`,
    }}>
      {/* Author row */}
      <div style={{ display:"flex", alignItems:"flex-start", gap:10, marginBottom:12 }}>
        <Av T={T} initials={item.user.initials} ink={item.user.ink} size={38} />
        <div style={{ flex:1, minWidth:0 }}>
          <div style={{ display:"flex", alignItems:"center", gap:5, flexWrap:"wrap" }}>
            <span style={{ fontFamily:T.ui, fontSize:13.5, fontWeight:650, color:T.text }}>{item.user.name}</span>
            {item.attestation && (
              <span style={{ fontSize:8, padding:"1px 5px", borderRadius:3, background:`${T.green}0D`, color:T.green, fontFamily:T.ui, fontWeight:700 }}>
                ✓ HUMAN
              </span>
            )}
            {item.isFirst && (
              <span style={{ fontSize:8, padding:"1px 5px", borderRadius:3, background:`${T.gold}0D`, color:T.gold, fontFamily:T.ui, fontWeight:700 }}>
                ✦ FIRST
              </span>
            )}
          </div>
          <div style={{ display:"flex", alignItems:"center", gap:5, marginTop:2, flexWrap:"wrap" }}>
            <span style={{ fontFamily:T.ui, fontSize:11, color:T.text4 }}>{item.user.handle}</span>
            <span style={{ color:T.text4, fontSize:8 }}>·</span>
            <span style={{ fontFamily:T.ui, fontSize:11, color:T.text4 }}>{item.time}</span>
            <InkBadge T={T} ink={item.user.ink} compact />
            <LB T={T} lens={item.user.lens} />
          </div>
        </div>
        {/* Type + menu */}
        <div style={{ display:"flex", alignItems:"center", gap:6, flexShrink:0 }}>
          <TT T={T} type={item.type} />
          <div style={{ position:"relative" }}>
            <button className="tb" onClick={() => setMenuOpen(!menuOpen)} style={{
              background:"none", border:"none", cursor:"pointer",
              padding:8, fontSize:18, color:T.text4,
              minWidth:36, minHeight:36, display:"flex", alignItems:"center", justifyContent:"center",
            }}>⋮</button>
            {menuOpen && (
              <>
                <div onClick={() => setMenuOpen(false)} style={{ position:"fixed", inset:0, zIndex:40 }} />
                <div style={{
                  position:"absolute", top:"100%", right:0,
                  background:T.surface, border:`1px solid ${T.borderActive}`,
                  borderRadius:12, padding:6, minWidth:160,
                  boxShadow:T.shadowLg, zIndex:50, animation:"scaleIn .12s ease",
                }}>
                  {["Hide post","Mute author","Report"].map(a => (
                    <button key={a} className="tb" onClick={() => setMenuOpen(false)} style={{
                      display:"block", width:"100%", padding:"12px 14px", borderRadius:8,
                      border:"none", background:"none", fontFamily:T.ui, fontSize:13,
                      color: a === "Report" ? T.red : T.text2, cursor:"pointer", textAlign:"left", minHeight:44,
                    }}>{a}</button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Book ref */}
      {item.bookRef && <BR T={T} book={{ ...item.bookRef, rating: item.rating }} />}

      {/* Inspired by */}
      {item.inspiredBy && (
        <div style={{
          display:"flex", alignItems:"center", gap:5,
          padding:"6px 10px", borderRadius:6,
          background:`${T.plum}06`, border:`1px solid ${T.plum}0D`,
          marginBottom:10, fontFamily:T.ui, fontSize:10.5, color:T.plum,
        }}>
          ◇ Inspired by <strong style={{ marginLeft:4 }}>{item.inspiredBy.title}</strong>
          <span style={{ marginLeft:2, color:T.text3 }}>— {item.inspiredBy.author}</span>
        </div>
      )}

      {/* Content or spoiler gate */}
      {item.type === "spoiler"
        ? <SpoilerGate T={T} revealed={spoilerOpen} onReveal={() => setSpoilerOpen(true)}
            bookTitle={item.bookRef?.title} page={item.spoilerPage}>
            {body}
          </SpoilerGate>
        : body
      }

      {/* Tags */}
      {item.tags?.length > 0 && (
        <div style={{ display:"flex", gap:4, flexWrap:"wrap", marginTop:10 }}>
          {item.tags.map(t => (
            <span key={t} style={{
              padding:"2px 8px", borderRadius:4, fontSize:10,
              fontFamily:T.ui, fontWeight:500, color:T.text3,
              background:T.bg2, border:`1px solid ${T.border}`,
            }}>{t}</span>
          ))}
        </div>
      )}

      {/* Engagement row */}
      <div style={{
        display:"flex", alignItems:"center", gap:0, marginTop:12,
        paddingTop:10, borderTop:`1px solid ${T.border}`,
        marginLeft:-4, marginRight:-4,
      }}>
        <EB T={T} icon="♡" count={item.likes}    active={item.isLiked}    ac={T.red}    onClick={() => onToggle(item.id,"like")}   label="Like" />
        <EB T={T} icon="↩" count={item.comments} active={false}           ac={T.blue}                                              label="Reply" />
        <EB T={T} icon="⊞" count={item.shelved}  active={item.isShelved}  ac={T.gold}   onClick={() => onToggle(item.id,"shelf")}  label="Shelf" />
        <EB T={T} icon="⤴" count={item.reposts}  active={item.isReposted} ac={T.green}  onClick={() => onToggle(item.id,"repost")} label="Repost" />
        <div style={{ flex:1 }} />
        <button className="tb" style={{ background:"none", border:"none", cursor:"pointer", fontFamily:T.ui, fontSize:11, color:T.text4, padding:"8px 6px", minHeight:40 }}>⎘</button>
      </div>
    </article>
  );
}
