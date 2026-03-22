import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { usePrecis } from '../store.jsx';
import { THEMES, THEME_ORDER } from '../themes.js';
import Avatar from './Avatar.jsx';
import Sheet from './Sheet.jsx';

const MAIN_NAV = [
  { path: '/feed', icon: '⊟', activeIcon: '⊠', label: 'Feed' },
  { path: '/explore', icon: '◎', activeIcon: '◉', label: 'Explore' },
  { path: '/compose', icon: null, label: 'Write', isFAB: true },
  { path: '/press', icon: '✦', activeIcon: '✦', label: 'Press' },
  { path: '/profile', icon: '◯', activeIcon: '◉', label: 'Me' },
];

const MORE_NAV = [
  { path: '/shelf', icon: '▤', label: 'My Shelf' },
  { path: '/clubs', icon: '📚', label: 'Book Clubs' },
  { path: '/challenges', icon: '🏅', label: 'Challenges' },
  { path: '/messages', icon: '✉', label: 'Messages' },
  { path: '/notifications', icon: '◆', label: 'Notifications' },
  { path: '/settings', icon: '⚙', label: 'Settings' },
];

// Pages that don't show the nav bar
const NO_NAV_PAGES = ['/', '/auth'];

export default function Nav() {
  const { theme: T, themeId, setThemeId, user, lensData } = usePrecis();
  const navigate = useNavigate();
  const location = useLocation();
  const [moreOpen, setMoreOpen] = useState(false);
  const [themeOpen, setThemeOpen] = useState(false);

  const current = location.pathname;

  if (NO_NAV_PAGES.includes(current)) return null;

  const isActive = (path) => current === path || (path !== '/feed' && current.startsWith(path));

  return (
    <>
      {/* ── TOP BAR ── */}
      <header style={{
        position: 'sticky', top: 0, zIndex: 100,
        background: `${T.bg}EE`,
        borderBottom: `1px solid ${T.border}`,
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
      }}>
        <div style={{
          maxWidth: 640, margin: '0 auto',
          padding: '0 16px',
          height: 52,
          display: 'flex', alignItems: 'center', gap: 10,
        }}>
          {/* Wordmark */}
          <button
            onClick={() => navigate('/feed')}
            style={{
              background: 'none', border: 'none', padding: 0,
              fontFamily: T.serif, fontSize: 22, fontWeight: 700,
              color: T.ink, letterSpacing: '-0.5px',
              cursor: 'pointer', flexShrink: 0,
            }}
          >
            Pr<span style={{ fontStyle: 'italic' }}>é</span>cis
          </button>

          <div style={{ flex: 1 }} />

          {/* Theme switcher */}
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setThemeOpen(!themeOpen)}
              style={{
                background: `${T.gold}15`,
                border: `1.5px solid ${T.gold}30`,
                borderRadius: '50%',
                width: 34, height: 34,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 14, cursor: 'pointer',
                color: T.gold,
              }}
              aria-label="Switch theme"
            >
              {THEMES[themeId].icon}
            </button>
            {themeOpen && (
              <>
                <div
                  onClick={() => setThemeOpen(false)}
                  style={{ position: 'fixed', inset: 0, zIndex: 50 }}
                />
                <div style={{
                  position: 'absolute', top: 'calc(100% + 8px)', right: 0,
                  background: T.card,
                  border: `1px solid ${T.borderHover}`,
                  borderRadius: 14, padding: 6, zIndex: 60,
                  boxShadow: '0 12px 40px rgba(0,0,0,0.3)',
                  minWidth: 210,
                  animation: 'scaleIn 0.15s ease',
                }}>
                  <div style={{
                    padding: '4px 12px 8px',
                    fontFamily: T.sans, fontSize: 9, fontWeight: 700,
                    color: T.ink4, letterSpacing: '0.5px', textTransform: 'uppercase',
                  }}>
                    Reading Theme
                  </div>
                  {THEME_ORDER.map(k => {
                    const th = THEMES[k];
                    const active = k === themeId;
                    return (
                      <button key={k}
                        onClick={() => { setThemeId(k); setThemeOpen(false); }}
                        style={{
                          display: 'flex', alignItems: 'center', gap: 10,
                          padding: '9px 12px', borderRadius: 10,
                          border: 'none', cursor: 'pointer', width: '100%',
                          background: active ? `${th.accent}18` : 'transparent',
                          transition: 'background 0.15s',
                        }}
                      >
                        <div style={{ display: 'flex', gap: 3 }}>
                          {[th.bg, th.card, th.ink, th.accent, th.gold].map((c, i) => (
                            <div key={i} style={{
                              width: 10, height: 10,
                              borderRadius: i === 0 ? 3 : 10,
                              background: c,
                              border: '1px solid rgba(128,128,128,0.2)',
                            }} />
                          ))}
                        </div>
                        <span style={{
                          flex: 1, textAlign: 'left',
                          fontFamily: T.sans, fontSize: 12,
                          fontWeight: active ? 700 : 500,
                          color: active ? th.accent : T.ink2,
                        }}>
                          {th.name}
                        </span>
                        {active && <span style={{ fontSize: 11, color: th.accent }}>✓</span>}
                      </button>
                    );
                  })}
                </div>
              </>
            )}
          </div>

          {/* More menu button */}
          <button
            onClick={() => setMoreOpen(true)}
            style={{
              background: 'none', border: 'none',
              width: 34, height: 34, borderRadius: '50%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: T.ink3, fontSize: 18, cursor: 'pointer',
            }}
            aria-label="More"
          >
            ⋯
          </button>

          {/* User avatar */}
          <button
            onClick={() => navigate('/profile')}
            style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
          >
            <Avatar initials={user.initials} ink={user.ink} lens={user.lens} size={34} />
          </button>
        </div>
      </header>

      {/* ── BOTTOM TAB BAR ── */}
      <nav style={{
        position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 100,
        background: `${T.bg}F2`,
        borderTop: `1px solid ${T.border}`,
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        paddingBottom: 'env(safe-area-inset-bottom, 8px)',
      }}>
        <div style={{
          maxWidth: 480, margin: '0 auto',
          display: 'flex', alignItems: 'center',
          padding: '4px 0 2px',
        }}>
          {MAIN_NAV.map(item => {
            if (item.isFAB) {
              return (
                <div key="fab" style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <button
                    onClick={() => navigate('/compose')}
                    style={{
                      width: 52, height: 52,
                      borderRadius: '50%',
                      border: 'none',
                      background: `linear-gradient(135deg, ${T.accent}, ${T.accentHover})`,
                      boxShadow: `0 4px 18px ${T.accent}50`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 22,
                      marginBottom: 2,
                      transition: 'transform 0.15s, box-shadow 0.15s',
                    }}
                    onTouchStart={e => { e.currentTarget.style.transform = 'scale(0.93)'; }}
                    onTouchEnd={e => { e.currentTarget.style.transform = ''; }}
                    aria-label="Write"
                  >
                    <span style={{ color: '#fff', lineHeight: 1 }}>✍</span>
                  </button>
                </div>
              );
            }

            const active = isActive(item.path);
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                style={{
                  flex: 1, background: 'none', border: 'none',
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3,
                  padding: '6px 4px 4px',
                  opacity: active ? 1 : 0.5,
                  transition: 'opacity 0.15s',
                  minHeight: 48,
                }}
              >
                <span style={{
                  fontSize: 20,
                  color: active ? T.gold : T.ink3,
                  lineHeight: 1,
                }}>
                  {active ? (item.activeIcon || item.icon) : item.icon}
                </span>
                <span style={{
                  fontFamily: T.sans, fontSize: 9, fontWeight: active ? 700 : 500,
                  color: active ? T.gold : T.ink4,
                  letterSpacing: '0.3px',
                }}>
                  {item.label}
                </span>
                {active && (
                  <div style={{
                    position: 'absolute',
                    width: 4, height: 4, borderRadius: '50%',
                    background: T.gold,
                    bottom: 2,
                  }} />
                )}
              </button>
            );
          })}
        </div>
      </nav>

      {/* ── MORE SHEET ── */}
      <Sheet open={moreOpen} onClose={() => setMoreOpen(false)} title="More">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          {MORE_NAV.map(item => {
            const active = isActive(item.path);
            return (
              <button
                key={item.path}
                onClick={() => { navigate(item.path); setMoreOpen(false); }}
                style={{
                  display: 'flex', alignItems: 'center', gap: 14,
                  padding: '14px 16px',
                  borderRadius: 12, border: 'none',
                  background: active ? `${T.gold}12` : 'transparent',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'background 0.15s',
                }}
              >
                <span style={{ fontSize: 22, width: 30, textAlign: 'center' }}>{item.icon}</span>
                <span style={{
                  fontFamily: T.sans, fontSize: 16, fontWeight: active ? 700 : 500,
                  color: active ? T.gold : T.ink,
                }}>
                  {item.label}
                </span>
                {active && (
                  <span style={{ marginLeft: 'auto', color: T.gold, fontSize: 12 }}>●</span>
                )}
              </button>
            );
          })}
        </div>
      </Sheet>
    </>
  );
}
