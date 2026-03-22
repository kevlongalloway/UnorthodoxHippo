import { useState } from 'react';
import { usePrecis } from '../store.jsx';
import { THEMES, THEME_ORDER, LENSES } from '../themes.js';
import Sheet from '../components/Sheet.jsx';

export default function Settings() {
  const { T, themeId, setThemeId, user } = usePrecis();
  const [lensSheet, setLensSheet] = useState(false);
  const [activeLens, setActiveLens] = useState(user.lens);

  const sections = [
    {
      title: 'Appearance',
      items: [
        { label: 'Reading Theme', value: THEMES[themeId].name, action: null, component: <ThemeSelector T={T} themeId={themeId} setThemeId={setThemeId} /> },
      ],
    },
    {
      title: 'Reading Identity',
      items: [
        { label: 'Reading Lens', value: LENSES[activeLens].label, action: () => setLensSheet(true) },
      ],
    },
    {
      title: 'Account',
      items: [
        { label: 'Edit Profile', value: '', action: () => {} },
        { label: 'Notification Preferences', value: '', action: () => {} },
        { label: 'Privacy Settings', value: '', action: () => {} },
        { label: 'Import Library', value: 'Goodreads / StoryGraph', action: () => {} },
      ],
    },
    {
      title: 'Platform',
      items: [
        { label: 'Précis Compass', value: 'Chrome Extension', action: () => {} },
        { label: 'Synopsis Engine', value: 'AI-powered', action: () => {} },
        { label: 'Content Settings', value: '', action: () => {} },
      ],
    },
    {
      title: 'Legal',
      items: [
        { label: 'Terms of Service', value: '', action: () => {} },
        { label: 'Privacy Policy', value: '', action: () => {} },
        { label: 'Content Policy', value: '', action: () => {} },
      ],
    },
  ];

  return (
    <div className="page-content">
      {/* Header */}
      <div style={{ padding: '16px 16px 12px', borderBottom: `1px solid ${T.border}` }}>
        <h2 style={{ fontFamily: T.hd, fontSize: 20, fontWeight: 700, color: T.text, fontStyle: 'italic' }}>
          Settings
        </h2>
      </div>

      {/* User card */}
      <div style={{
        margin: '16px',
        padding: '16px', borderRadius: 16,
        background: `${T.gold}0A`, border: `1.5px solid ${T.gold}20`,
        display: 'flex', alignItems: 'center', gap: 12,
      }}>
        <div style={{
          width: 52, height: 52, borderRadius: '50%', flexShrink: 0,
          background: `linear-gradient(145deg, ${T.bg3}, ${T.bg2})`,
          border: `2px solid ${T.gold}40`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: T.ui, fontSize: 18, fontWeight: 700, color: T.text2,
        }}>
          {user.initials}
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: T.ui, fontSize: 15, fontWeight: 700, color: T.text }}>
            {user.name}
          </div>
          <div style={{ fontFamily: T.ui, fontSize: 12, color: T.text4 }}>
            {user.handle}
          </div>
        </div>
        {user.isFoundingReader && (
          <span style={{
            fontSize: 10, fontFamily: T.ui, fontWeight: 700,
            color: T.accent, padding: '3px 8px',
            background: `${T.accent}15`, borderRadius: 6,
          }}>
            🏛 Founding Reader
          </span>
        )}
      </div>

      {/* Settings sections */}
      {sections.map(section => (
        <div key={section.title} style={{ marginBottom: 8 }}>
          <div style={{
            padding: '8px 20px 6px',
            fontFamily: T.ui, fontSize: 10, fontWeight: 700,
            color: T.text4, letterSpacing: '0.6px', textTransform: 'uppercase',
          }}>
            {section.title}
          </div>
          <div style={{ background: T.surface, borderTop: `1px solid ${T.border}`, borderBottom: `1px solid ${T.border}` }}>
            {section.items.map((item, i) => (
              <div key={item.label}>
                {item.component ? (
                  <div style={{ padding: '14px 20px', borderBottom: i < section.items.length - 1 ? `1px solid ${T.border}` : 'none' }}>
                    <div style={{ fontFamily: T.ui, fontSize: 13, fontWeight: 600, color: T.text, marginBottom: 10 }}>
                      {item.label}
                    </div>
                    {item.component}
                  </div>
                ) : (
                  <button
                    onClick={item.action}
                    style={{
                      width: '100%', padding: '14px 20px',
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                      border: 'none', background: 'transparent', cursor: 'pointer',
                      borderBottom: i < section.items.length - 1 ? `1px solid ${T.border}` : 'none',
                      textAlign: 'left', transition: 'background 0.1s',
                    }}
                    onTouchStart={e => { e.currentTarget.style.background = T.bg3; }}
                    onTouchEnd={e => { e.currentTarget.style.background = 'transparent'; }}
                  >
                    <span style={{ fontFamily: T.ui, fontSize: 14, color: T.text }}>
                      {item.label}
                    </span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      {item.value && (
                        <span style={{ fontFamily: T.ui, fontSize: 12, color: T.text4 }}>
                          {item.value}
                        </span>
                      )}
                      <span style={{ color: T.text4, fontSize: 14 }}>›</span>
                    </div>
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Sign out */}
      <div style={{ padding: '20px 16px 40px' }}>
        <button style={{
          width: '100%', padding: '14px', borderRadius: 12,
          border: `1px solid ${T.red}40`,
          background: `${T.red}08`,
          fontFamily: T.ui, fontSize: 14, fontWeight: 600,
          color: T.red, cursor: 'pointer',
        }}>
          Sign Out
        </button>
      </div>

      {/* Lens selector sheet */}
      <Sheet open={lensSheet} onClose={() => setLensSheet(false)} title="Reading Lens">
        <p style={{ fontFamily: T.body, fontSize: 13, color: T.text3, lineHeight: 1.55, marginBottom: 16 }}>
          Your reading lens shapes how you see books and how others see your writing.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {Object.entries(LENSES).map(([key, lens]) => (
            <button
              key={key}
              onClick={() => { setActiveLens(key); setLensSheet(false); }}
              style={{
                padding: '14px', borderRadius: 14,
                border: `1.5px solid ${activeLens === key ? lens.color + '50' : T.border}`,
                background: activeLens === key ? `${lens.color}10` : T.bg3,
                cursor: 'pointer', textAlign: 'left',
                display: 'flex', alignItems: 'center', gap: 12,
                transition: 'all 0.15s',
              }}
            >
              <span style={{ fontSize: 24 }}>{lens.icon}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: T.ui, fontSize: 14, fontWeight: 700, color: activeLens === key ? lens.color : T.text }}>
                  {lens.label}
                </div>
                <div style={{ fontFamily: T.ui, fontSize: 12, color: T.text3 }}>
                  {lens.desc}
                </div>
              </div>
              {activeLens === key && (
                <span style={{ color: lens.color, fontSize: 16 }}>✓</span>
              )}
            </button>
          ))}
        </div>
      </Sheet>
    </div>
  );
}

function ThemeSelector({ T, themeId, setThemeId }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
      {THEME_ORDER.map(k => {
        const th = THEMES[k];
        const active = k === themeId;
        return (
          <button
            key={k}
            onClick={() => setThemeId(k)}
            style={{
              padding: '12px', borderRadius: 12,
              border: `2px solid ${active ? th.accent + '70' : T.border}`,
              background: th.bg, cursor: 'pointer',
              display: 'flex', flexDirection: 'column', gap: 6,
              transition: 'all 0.15s',
              position: 'relative',
            }}
          >
            {active && (
              <div style={{
                position: 'absolute', top: 8, right: 8,
                width: 16, height: 16, borderRadius: '50%',
                background: th.accent,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 9, color: '#fff',
              }}>
                ✓
              </div>
            )}
            <div style={{ display: 'flex', gap: 3 }}>
              {[th.bg, th.card, th.ink, th.accent, th.gold].map((c, i) => (
                <div key={i} style={{
                  width: 12, height: 12,
                  borderRadius: i === 0 ? 3 : 6,
                  background: c, border: '1px solid rgba(128,128,128,0.2)',
                }} />
              ))}
            </div>
            <div style={{ fontFamily: th.sans, fontSize: 11, fontWeight: active ? 700 : 500, color: th.ink, textAlign: 'left' }}>
              {th.name}
            </div>
          </button>
        );
      })}
    </div>
  );
}
