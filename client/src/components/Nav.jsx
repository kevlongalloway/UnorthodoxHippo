import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { usePrecis } from "../store.jsx";
import { THEMES, THEME_ORDER } from "../themes.js";
import Av from "./Avatar.jsx";

const TABS = [
  { id: "feed",    path: "/feed",    label: "Feed",    icon: "⊞" },
  { id: "explore", path: "/explore", label: "Explore", icon: "◎" },
  { id: "press",   path: "/press",   label: "Press",   icon: "✎" },
  { id: "compass", path: "/compass", label: "Compass", icon: "⌖" },
  { id: "shelf",   path: "/shelf",   label: "Shelf",   icon: "▤" },
];

const NO_NAV = ["/", "/auth"];

export default function Nav() {
  const { T, themeId, setThemeId, user } = usePrecis();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQ, setSearchQ] = useState("");
  const [themeOpen, setThemeOpen] = useState(false);

  const path = location.pathname;
  if (NO_NAV.includes(path)) return null;

  const activeTab = TABS.find(t => path.startsWith(t.path))?.id ?? "feed";

  /* ── Theme picker ── */
  const ThemePicker = () => (
    <div style={{ position:"relative" }}>
      <button className="tb" onClick={() => setThemeOpen(!themeOpen)} style={{
        width:34, height:34, borderRadius:"50%",
        border:`1.5px solid ${T.border}`, background:T.bg2,
        cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", fontSize:13,
      }}>
        {THEMES[themeId].icon}
      </button>
      {themeOpen && (
        <>
          <div onClick={() => setThemeOpen(false)} style={{ position:"fixed", inset:0, zIndex:199 }} />
          <div style={{
            position:"absolute", top:"calc(100% + 8px)", right:0,
            background:T.surface, border:`1px solid ${T.borderActive}`,
            borderRadius:14, padding:6, minWidth:210,
            boxShadow:T.shadowLg, zIndex:200, animation:"scaleIn .12s ease",
          }}>
            <div style={{ padding:"6px 12px 8px", fontFamily:T.ui, fontSize:9, fontWeight:700, color:T.text4, letterSpacing:".08em", textTransform:"uppercase" }}>
              Reading Theme
            </div>
            {THEME_ORDER.map(k => {
              const t = THEMES[k]; const active = k === themeId;
              return (
                <button key={k} className="tb" onClick={() => { setThemeId(k); setThemeOpen(false); }} style={{
                  display:"flex", alignItems:"center", gap:10, padding:"10px 12px",
                  borderRadius:10, border:"none", cursor:"pointer", width:"100%",
                  minHeight:44, background: active ? `${t.accent}0D` : "transparent",
                }}>
                  <div style={{ display:"flex", gap:3 }}>
                    {[t.bg, t.surface, t.text, t.accent, t.gold].map((c,i) => (
                      <div key={i} style={{ width:10, height:10, borderRadius:"50%", background:c, border:"1px solid rgba(128,128,128,.12)" }} />
                    ))}
                  </div>
                  <span style={{ fontFamily:T.ui, fontSize:12, fontWeight: active?700:500, color: active?t.accent:T.text2 }}>{t.name}</span>
                  {active && <span style={{ marginLeft:"auto", fontSize:10, color:t.accent }}>✓</span>}
                </button>
              );
            })}
          </div>
        </>
      )}
    </div>
  );

  return (
    <>
      {/* ── MOBILE HEADER ── */}
      <header className="mh" style={{
        position:"sticky", top:0, zIndex:100,
        background:`${T.bg}EC`, backdropFilter:"blur(20px) saturate(1.3)",
        WebkitBackdropFilter:"blur(20px) saturate(1.3)",
        borderBottom:`1px solid ${T.border}`,
        padding:"0 16px", height:52,
        display:"flex", alignItems:"center", gap:12,
      }}>
        <span style={{ fontFamily:T.hd, fontSize:22, fontWeight:700, color:T.text, letterSpacing:"-.02em", flexShrink:0 }}>
          Pr<span style={{ color:T.accent }}>é</span>cis
        </span>
        <div style={{ flex:1 }} />
        {searchOpen && (
          <div style={{ flex:1, position:"relative", animation:"fadeIn .15s ease" }}>
            <input autoFocus value={searchQ} onChange={e => setSearchQ(e.target.value)}
              placeholder="Search…" style={{
                width:"100%", padding:"8px 12px 8px 30px", borderRadius:8,
                background:T.bg3, border:`1px solid ${T.borderActive}`,
                fontFamily:T.ui, fontSize:13, color:T.text, outline:"none",
              }} />
            <span style={{ position:"absolute", left:10, top:"50%", transform:"translateY(-50%)", fontSize:13, color:T.text4, pointerEvents:"none" }}>⌕</span>
          </div>
        )}
        <button className="tb" onClick={() => { setSearchOpen(!searchOpen); if (searchOpen) setSearchQ(""); }} style={{
          background:"none", border:"none", fontSize:18,
          color: searchOpen ? T.accent : T.text3,
          cursor:"pointer", padding:6, minWidth:36, minHeight:36,
          display:"flex", alignItems:"center", justifyContent:"center",
        }}>
          {searchOpen ? "✕" : "⌕"}
        </button>
        <ThemePicker />
        <button onClick={() => navigate("/profile")} style={{ background:"none", border:"none", padding:0, cursor:"pointer" }}>
          <Av T={T} initials={user.initials} ink={user.ink} size={30} />
        </button>
      </header>

      {/* ── DESKTOP HEADER ── */}
      <header className="dh" style={{
        display:"none", position:"sticky", top:0, zIndex:100,
        background:`${T.bg}E8`, backdropFilter:"blur(20px) saturate(1.3)",
        WebkitBackdropFilter:"blur(20px) saturate(1.3)",
        borderBottom:`1px solid ${T.border}`,
      }}>
        <div style={{
          maxWidth:1040, margin:"0 auto", padding:"0 28px",
          height:56, display:"flex", alignItems:"center",
        }}>
          <span style={{ fontFamily:T.hd, fontSize:24, fontWeight:700, color:T.text, letterSpacing:"-.02em", marginRight:32, flexShrink:0 }}>
            Pr<span style={{ color:T.accent }}>é</span>cis
          </span>
          <div style={{ display:"flex", gap:1 }}>
            {TABS.map(n => {
              const active = activeTab === n.id;
              return (
                <button key={n.id} className="tb" onClick={() => navigate(n.path)} style={{
                  padding:"8px 14px", borderRadius:8, border:"none",
                  fontFamily:T.ui, fontSize:12.5, fontWeight: active?700:500,
                  cursor:"pointer",
                  background: active ? T.goldSoft : "transparent",
                  color: active ? T.gold : T.text3,
                  display:"flex", alignItems:"center", gap:5,
                }}>
                  <span style={{ fontSize:14 }}>{n.icon}</span> {n.label}
                </button>
              );
            })}
          </div>
          <div style={{ flex:1, maxWidth:280, margin:"0 24px", position:"relative" }}>
            <input value={searchQ} onChange={e => setSearchQ(e.target.value)}
              placeholder="Search stories, authors, books…" style={{
                width:"100%", padding:"8px 14px 8px 32px", borderRadius:8,
                background:T.bg3, border:`1px solid ${searchQ ? T.borderActive : T.border}`,
                fontFamily:T.ui, fontSize:12, color:T.text, outline:"none",
              }} />
            <span style={{ position:"absolute", left:11, top:"50%", transform:"translateY(-50%)", fontSize:13, color:T.text4, pointerEvents:"none" }}>⌕</span>
            {searchQ && <button onClick={() => setSearchQ("")} style={{ position:"absolute", right:8, top:"50%", transform:"translateY(-50%)", background:"none", border:"none", color:T.text3, cursor:"pointer", fontSize:13 }}>✕</button>}
          </div>
          <div style={{ flex:1 }} />
          <button className="tb" onClick={() => navigate("/compose")} style={{
            padding:"8px 20px", borderRadius:8, border:"none",
            background:T.accent, color:"#fff", fontFamily:T.ui, fontSize:12, fontWeight:700,
            cursor:"pointer", boxShadow:`0 2px 8px ${T.accent}30`,
            display:"flex", alignItems:"center", gap:5, marginRight:14,
          }}>
            ✎ Write
          </button>
          <ThemePicker />
          <div style={{ display:"flex", alignItems:"center", gap:8, marginLeft:10, cursor:"pointer" }} onClick={() => navigate("/profile")}>
            <Av T={T} initials={user.initials} ink={user.ink} size={32} />
            <div style={{ lineHeight:1.2 }}>
              <div style={{ fontFamily:T.ui, fontSize:12, fontWeight:600, color:T.text }}>{user.name}</div>
            </div>
          </div>
        </div>
      </header>

      {/* ── MOBILE BOTTOM TAB BAR ── */}
      <nav className="bb" style={{
        position:"fixed", bottom:0, left:0, right:0, zIndex:100,
        background:`${T.bg}F2`, backdropFilter:"blur(20px) saturate(1.3)",
        WebkitBackdropFilter:"blur(20px) saturate(1.3)",
        borderTop:`1px solid ${T.border}`,
        display:"flex", alignItems:"stretch",
        height:60, paddingBottom:"env(safe-area-inset-bottom,0px)",
      }}>
        {TABS.map(t => {
          const active = activeTab === t.id;
          return (
            <button key={t.id} className="tb" onClick={() => navigate(t.path)} style={{
              flex:1, display:"flex", flexDirection:"column", alignItems:"center",
              justifyContent:"center", gap:2,
              background:"none", border:"none", cursor:"pointer",
              color: active ? T.gold : T.text4,
              minHeight:48, position:"relative",
            }}>
              {active && (
                <div style={{ position:"absolute", top:0, left:"50%", transform:"translateX(-50%)", width:20, height:2, borderRadius:1, background:T.gold }} />
              )}
              <span style={{ fontSize:20, lineHeight:1 }}>{t.icon}</span>
              <span style={{ fontFamily:T.ui, fontSize:9, fontWeight: active?700:500, letterSpacing:".02em" }}>{t.label}</span>
            </button>
          );
        })}
        {/* Floating compose FAB */}
        <div onClick={() => navigate("/compose")} style={{
          position:"absolute", top:-22, left:"50%", transform:"translateX(-50%)",
          width:48, height:48, borderRadius:"50%",
          background:`linear-gradient(135deg,${T.accent},#9A4520)`,
          boxShadow:`0 4px 16px ${T.accent}50`,
          display:"flex", alignItems:"center", justifyContent:"center",
          cursor:"pointer", zIndex:10,
        }}>
          <span style={{ fontSize:20, color:"#fff", marginTop:-1 }}>✎</span>
        </div>
      </nav>
    </>
  );
}
