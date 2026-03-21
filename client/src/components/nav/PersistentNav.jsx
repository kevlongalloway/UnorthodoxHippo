/**
 * PRÉCIS PERSISTENT NAV
 * 
 * Top bar (desktop) + bottom bar (mobile) that persists across all platform routes.
 * Reads user/theme from shared state. Uses react-router-dom for navigation.
 * 
 * NOT shown on: /, /waitlist (acquisition funnel pages handle their own chrome)
 */

import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { usePrecis } from '../../store/precis-store';

const NAV_ITEMS = [
  { path: "/feed",          icon: "◣", label: "Feed" },
  { path: "/explore",       icon: "◎", label: "Explore" },
  { path: "/press",         icon: "✍", label: "The Press" },
  { path: "/compass",       icon: "◈", label: "Compass" },
  { path: "/shelf",         icon: "▤", label: "Shelf" },
  { path: "/notifications", icon: "◆", label: "Alerts" },
];

const MORE_ITEMS = [
  { path: "/compose",    icon: "✍", label: "Write" },
  { path: "/community",  icon: "💬", label: "Discussions" },
  { path: "/clubs",      icon: "📚", label: "Clubs" },
  { path: "/challenges", icon: "🏅", label: "Challenges" },
  { path: "/messages",   icon: "✉", label: "Messages" },
  { path: "/mentions",   icon: "@",  label: "Mentions" },
  { path: "/author",     icon: "📖", label: "Authors" },
  { path: "/book",       icon: "📕", label: "Book Detail" },
  { path: "/settings",   icon: "⚙", label: "Settings" },
  { path: "/profile",    icon: "👤", label: "Profile" },
];

export default function PersistentNav() {
  const { user, theme: T, lensData } = usePrecis();
  const navigate = useNavigate();
  const location = useLocation();
  const [moreOpen, setMoreOpen] = useState(false);

  const current = location.pathname;

  // Don't render on acquisition funnel pages
  if (current === "/" || current === "/waitlist") return null;

  const isActive = (path) => current === path;

  return (
    <>
      <style>{`
        .pn-top{position:sticky;top:0;z-index:200;backdrop-filter:blur(28px);-webkit-backdrop-filter:blur(28px)}
        .pn-bot{position:fixed;bottom:0;left:0;right:0;z-index:200;backdrop-filter:blur(28px);-webkit-backdrop-filter:blur(28px)}
        .pn-btn{background:none;border:none;cursor:pointer;display:flex;flex-direction:column;align-items:center;gap:2px;padding:6px 0;min-width:48px;transition:opacity .15s;touch-action:manipulation;-webkit-tap-highlight-color:transparent;user-select:none;-webkit-user-select:none}
        .pn-btn:hover{opacity:1!important}
        .pn-btn:active{transform:scale(.92);transition:transform .08s}
        .pn-more-item{display:flex;align-items:center;gap:10px;padding:10px 16px;border:none;background:transparent;width:100%;cursor:pointer;text-align:left;border-radius:8px;transition:background .15s;touch-action:manipulation;-webkit-tap-highlight-color:transparent}
        .pn-more-item:hover{background:${T.bg3}!important}
        @media(min-width:641px){.pn-bot{display:none!important}}
        @media(max-width:640px){.pn-desk-items{display:none!important}.pn-write-btn{display:none!important}}
      `}</style>

      {/* ── TOP BAR (always visible) ── */}
      <nav className="pn-top" style={{
        background: `${T.bg}E8`,
        borderBottom: `1px solid ${T.border}`,
      }}>
        <div style={{
          maxWidth: 1200, margin: "0 auto", padding: "0 20px",
          display: "flex", alignItems: "center", height: 52, gap: 6,
        }}>
          {/* Wordmark */}
          <button onClick={() => navigate("/feed")} style={{
            background: "none", border: "none", cursor: "pointer",
            fontFamily: T.serif, fontSize: 21, fontWeight: 700,
            color: T.ink, letterSpacing: "-0.5px", marginRight: 16, flexShrink: 0,
          }}>
            Pr{"\u00E9"}cis
          </button>

          {/* Desktop nav items */}
          <div className="pn-desk-items" style={{ display: "flex", gap: 2, flex: 1 }}>
            {NAV_ITEMS.map(n => {
              const active = isActive(n.path);
              return (
                <button key={n.path} onClick={() => navigate(n.path)} style={{
                  padding: "8px 14px", borderRadius: 0, border: "none",
                  borderBottom: `2px solid ${active ? T.gold : "transparent"}`,
                  fontFamily: T.sans, fontSize: 12,
                  fontWeight: active ? 700 : 500,
                  cursor: "pointer", background: "transparent",
                  color: active ? T.gold : T.ink4,
                  transition: "all .2s", whiteSpace: "nowrap",
                }}>
                  {n.label}
                </button>
              );
            })}

            {/* More dropdown */}
            <div style={{ position: "relative" }}>
              <button onClick={() => setMoreOpen(!moreOpen)} style={{
                padding: "8px 14px", borderRadius: 0, border: "none",
                borderBottom: "2px solid transparent",
                fontFamily: T.sans, fontSize: 12, fontWeight: 500,
                cursor: "pointer", background: "transparent", color: T.ink4,
              }}>
                More {moreOpen ? "▴" : "▾"}
              </button>
              {moreOpen && (
                <>
                  <div onClick={() => setMoreOpen(false)} style={{
                    position: "fixed", inset: 0, zIndex: 199,
                  }} />
                  <div style={{
                    position: "absolute", top: "calc(100% + 4px)", left: 0,
                    background: T.card, border: `1px solid ${T.borderHover}`,
                    borderRadius: 14, padding: 6, zIndex: 200,
                    boxShadow: "0 12px 40px rgba(0,0,0,.35)",
                    minWidth: 220, animation: "fadeUp .15s ease",
                  }}>
                    {MORE_ITEMS.map(n => {
                      const active = isActive(n.path);
                      return (
                        <button key={n.path} className="pn-more-item"
                          onClick={() => { navigate(n.path); setMoreOpen(false); }}
                          style={{ color: active ? T.gold : T.ink }}
                        >
                          <span style={{ fontSize: 14, width: 24, textAlign: "center", opacity: active ? 1 : 0.5 }}>{n.icon}</span>
                          <span style={{ fontFamily: T.sans, fontSize: 12, fontWeight: active ? 700 : 500 }}>{n.label}</span>
                          {active && <span style={{ marginLeft: "auto", fontSize: 9, color: T.gold }}>{"●"}</span>}
                        </button>
                      );
                    })}
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Write button */}
          <button className="pn-write-btn" onClick={() => navigate("/compose")} style={{
            padding: "7px 16px", borderRadius: 8, border: "none",
            background: T.accent, color: "#fff",
            fontFamily: T.sans, fontSize: 11, fontWeight: 700,
            cursor: "pointer", flexShrink: 0, marginLeft: 4,
          }}>
            {"✍"} Write
          </button>

          {/* User avatar */}
          <button onClick={() => navigate("/profile")} style={{
            width: 32, height: 32, borderRadius: "50%",
            background: `linear-gradient(135deg, ${T.bg3}, ${T.bg2})`,
            border: `1.5px solid ${lensData.color}30`,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontFamily: T.sans, fontSize: 11, fontWeight: 700, color: T.ink2,
            cursor: "pointer", flexShrink: 0, marginLeft: 6,
          }}>
            {user.initials}
          </button>
        </div>
      </nav>

      {/* ── BOTTOM BAR (mobile only) ── */}
      <nav className="pn-bot" style={{
        background: `${T.bg}F0`,
        borderTop: `1px solid ${T.border}`,
        padding: "6px 0 env(safe-area-inset-bottom, 8px)",
      }}>
        <div style={{
          display: "flex", justifyContent: "space-around",
          maxWidth: 480, margin: "0 auto",
        }}>
          {NAV_ITEMS.map(n => {
            const active = isActive(n.path);
            return (
              <button key={n.path} className="pn-btn"
                onClick={() => navigate(n.path)}
                style={{ opacity: active ? 1 : 0.5 }}
              >
                <span style={{
                  fontSize: 18, color: active ? T.gold : T.ink3,
                }}>{n.icon}</span>
                <span style={{
                  fontFamily: T.sans, fontSize: 9,
                  fontWeight: active ? 700 : 500,
                  color: active ? T.gold : T.ink4,
                }}>{n.label}</span>
              </button>
            );
          })}
          {/* Compose button in mobile nav */}
          <button className="pn-btn"
            onClick={() => navigate("/compose")}
            style={{ opacity: isActive("/compose") ? 1 : 0.5 }}
          >
            <span style={{
              fontSize: 18, color: isActive("/compose") ? T.accent : T.ink3,
            }}>{"✍"}</span>
            <span style={{
              fontFamily: T.sans, fontSize: 9,
              fontWeight: isActive("/compose") ? 700 : 500,
              color: isActive("/compose") ? T.accent : T.ink4,
            }}>Write</span>
          </button>
        </div>
      </nav>

      {/* Spacer for mobile bottom nav */}
      <div className="pn-bot" style={{
        position: "relative", visibility: "hidden",
        height: 64, background: "transparent", border: "none",
        backdropFilter: "none",
      }} />
    </>
  );
}
