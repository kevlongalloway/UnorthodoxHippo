import { useState } from 'react';
import { usePrecis } from '../store.jsx';
import { CURRENT_USER, POSTS, SHELVES } from '../data.js';
import { LENSES, TIERS, getTier, fmtNum } from '../themes.js';
import Avatar from '../components/Avatar.jsx';
import InkBadge from '../components/InkBadge.jsx';
import PostCard from '../components/PostCard.jsx';
import Sheet from '../components/Sheet.jsx';

const PROFILE_TABS = ['Posts', 'Shelves', 'About'];

export default function Profile() {
  const { theme: T, user } = usePrecis();
  const [tab, setTab] = useState('Posts');
  const [openInk, setOpenInk] = useState(false);
  const tier = getTier(user.ink);
  const nextTier = TIERS.find(t => user.ink < t.min);
  const lensData = LENSES[user.lens];
  const progress = nextTier ? ((user.ink - tier.min) / (nextTier.min - tier.min)) * 100 : 100;
  const myPosts = POSTS.filter(p => p.author.id === 'u1');

  return (
    <div className="page-content">
      {/* Profile header */}
      <div style={{
        padding: '20px 16px 0',
        background: `linear-gradient(180deg, ${T.bg2} 0%, ${T.bg} 100%)`,
      }}>
        {/* Avatar + stats */}
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16, marginBottom: 14 }}>
          <div style={{ position: 'relative' }}>
            <Avatar initials={user.initials} ink={user.ink} lens={user.lens} size={72} />
            {user.isFoundingReader && (
              <div style={{
                position: 'absolute', bottom: -4, right: -4,
                width: 22, height: 22, borderRadius: '50%',
                background: T.accent, border: `2px solid ${T.bg}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 10,
              }}>
                🏛
              </div>
            )}
          </div>

          <div style={{ flex: 1 }}>
            {/* Stats row */}
            <div style={{ display: 'flex', gap: 0, marginTop: 4 }}>
              {[
                { label: 'Posts', value: user.stats.posts },
                { label: 'Followers', value: user.stats.followers },
                { label: 'Following', value: user.stats.following },
                { label: 'Books', value: user.stats.books },
              ].map((s, i) => (
                <div key={s.label} style={{
                  flex: 1, textAlign: 'center',
                  borderLeft: i > 0 ? `1px solid ${T.border}` : 'none',
                  padding: '0 4px',
                }}>
                  <div style={{ fontFamily: T.sans, fontSize: 17, fontWeight: 800, color: T.ink, lineHeight: 1.2 }}>
                    {fmtNum(s.value)}
                  </div>
                  <div style={{ fontFamily: T.sans, fontSize: 10, color: T.ink4, marginTop: 1 }}>
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Name + handle */}
        <div style={{ marginBottom: 8 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
            <span style={{ fontFamily: T.sans, fontSize: 18, fontWeight: 800, color: T.ink }}>
              {user.name}
            </span>
            <InkBadge ink={user.ink} showCount />
          </div>
          <div style={{ fontFamily: T.sans, fontSize: 13, color: T.ink4, marginTop: 2 }}>
            {user.handle}
          </div>
        </div>

        {/* Bio */}
        <p style={{ fontFamily: T.body, fontSize: 14, color: T.ink2, lineHeight: 1.6, marginBottom: 10 }}>
          {user.bio}
        </p>

        {/* Lens + location */}
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 14 }}>
          <span style={{
            display: 'flex', alignItems: 'center', gap: 4,
            padding: '5px 10px', borderRadius: 8,
            background: `${lensData.color}15`,
            fontFamily: T.sans, fontSize: 12, fontWeight: 700, color: lensData.color,
          }}>
            {lensData.icon} {lensData.label} Lens
          </span>
          <span style={{ fontFamily: T.sans, fontSize: 12, color: T.ink4, display: 'flex', alignItems: 'center', gap: 4 }}>
            📍 {user.location}
          </span>
          <span style={{ fontFamily: T.sans, fontSize: 12, color: T.ink4, display: 'flex', alignItems: 'center', gap: 4 }}>
            📅 Joined {user.joined}
          </span>
        </div>

        {/* Ink progress */}
        <button
          onClick={() => setOpenInk(true)}
          style={{
            width: '100%', padding: '12px 14px', borderRadius: 12,
            background: tier.bg, border: `1.5px solid ${tier.color}30`,
            cursor: 'pointer', textAlign: 'left', marginBottom: 14,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
            <span style={{ fontFamily: T.sans, fontSize: 13, fontWeight: 700, color: tier.color }}>
              {tier.name}
            </span>
            <span style={{ fontFamily: T.sans, fontSize: 12, color: T.ink4 }}>
              {fmtNum(user.ink)} ink
              {nextTier ? ` · ${fmtNum(nextTier.min - user.ink)} to ${nextTier.name}` : ' · Max tier'}
            </span>
          </div>
          <div style={{ height: 6, background: `${tier.color}20`, borderRadius: 3, overflow: 'hidden' }}>
            <div style={{
              width: `${Math.min(progress, 100)}%`, height: '100%',
              background: `linear-gradient(90deg, ${tier.color}, ${tier.color}AA)`,
              borderRadius: 3, transition: 'width 0.5s ease',
            }} />
          </div>
        </button>

        {/* Streak */}
        <div style={{
          display: 'flex', gap: 10, marginBottom: 14,
        }}>
          <div style={{
            flex: 1, padding: '10px 12px', borderRadius: 10,
            background: T.bg3, border: `1px solid ${T.border}`,
            textAlign: 'center',
          }}>
            <div style={{ fontFamily: T.sans, fontSize: 22, fontWeight: 800, color: T.amber }}>
              🔥 {user.streak.current}
            </div>
            <div style={{ fontFamily: T.sans, fontSize: 10, color: T.ink4 }}>Day Streak</div>
          </div>
          <div style={{
            flex: 1, padding: '10px 12px', borderRadius: 10,
            background: T.bg3, border: `1px solid ${T.border}`,
            textAlign: 'center',
          }}>
            <div style={{ fontFamily: T.sans, fontSize: 22, fontWeight: 800, color: T.gold }}>
              {user.streak.best}
            </div>
            <div style={{ fontFamily: T.sans, fontSize: 10, color: T.ink4 }}>Best Streak</div>
          </div>
          {user.currentlyReading && (
            <div style={{
              flex: 2, padding: '10px 12px', borderRadius: 10,
              background: T.bg3, border: `1px solid ${T.border}`,
            }}>
              <div style={{ fontFamily: T.sans, fontSize: 10, color: T.ink4, marginBottom: 4 }}>Reading</div>
              <div style={{ fontFamily: T.serif, fontSize: 12, fontWeight: 700, color: T.ink, fontStyle: 'italic' }}>
                {user.currentlyReading.title}
              </div>
              <div style={{ height: 4, background: T.bg2, borderRadius: 2, marginTop: 6, overflow: 'hidden' }}>
                <div style={{
                  width: `${user.currentlyReading.progress}%`, height: '100%',
                  background: `linear-gradient(90deg, ${T.gold}, ${T.accent})`, borderRadius: 2,
                }} />
              </div>
              <div style={{ fontFamily: T.sans, fontSize: 10, color: T.gold, marginTop: 2, textAlign: 'right' }}>
                {user.currentlyReading.progress}%
              </div>
            </div>
          )}
        </div>

        {/* Edit profile button */}
        <button style={{
          width: '100%', padding: '10px', borderRadius: 10,
          border: `1px solid ${T.border}`, background: 'transparent',
          fontFamily: T.sans, fontSize: 13, fontWeight: 700, color: T.ink2,
          cursor: 'pointer', marginBottom: 16,
        }}>
          Edit Profile
        </button>
      </div>

      {/* Tabs */}
      <div style={{
        display: 'flex',
        borderBottom: `1px solid ${T.border}`,
        position: 'sticky', top: 52, zIndex: 40,
        background: T.bg,
      }}>
        {PROFILE_TABS.map(t => (
          <button key={t}
            onClick={() => setTab(t)}
            style={{
              flex: 1, padding: '14px 0',
              border: 'none', borderBottom: `2px solid ${tab === t ? T.gold : 'transparent'}`,
              background: 'transparent', cursor: 'pointer',
              fontFamily: T.sans, fontSize: 13, fontWeight: tab === t ? 700 : 500,
              color: tab === t ? T.gold : T.ink4,
              transition: 'all 0.15s',
            }}
          >
            {t}
          </button>
        ))}
      </div>

      <div style={{ padding: '16px 16px 0' }}>
        {tab === 'Posts' && myPosts.map(post => (
          <PostCard key={post.id} post={post} />
        ))}

        {tab === 'Shelves' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {SHELVES.map(shelf => <ShelfCard key={shelf.id} shelf={shelf} T={T} />)}
          </div>
        )}

        {tab === 'About' && <AboutTab user={user} T={T} lensData={lensData} tier={tier} />}
      </div>

      {/* Ink breakdown sheet */}
      <Sheet open={openInk} onClose={() => setOpenInk(false)} title="Ink Breakdown">
        <div>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: T.serif, fontSize: 40, fontWeight: 800, color: tier.color, fontStyle: 'italic' }}>
                {fmtNum(user.ink)}
              </div>
              <div style={{ fontFamily: T.sans, fontSize: 13, color: T.ink4 }}>Total Ink</div>
              <InkBadge ink={user.ink} showCount size="lg" />
            </div>
          </div>

          <div style={{ marginBottom: 20 }}>
            {TIERS.map((t, i) => {
              const isActive = tier.name === t.name;
              const isPast = user.ink >= t.min;
              return (
                <div key={t.name} style={{
                  display: 'flex', alignItems: 'center', gap: 12,
                  padding: '12px 0',
                  borderBottom: i < TIERS.length - 1 ? `1px solid ${T.border}` : 'none',
                  opacity: isPast ? 1 : 0.4,
                }}>
                  <div style={{
                    width: 10, height: 10, borderRadius: '50%',
                    background: isPast ? t.color : T.border,
                    flexShrink: 0,
                  }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontFamily: T.sans, fontSize: 13, fontWeight: isActive ? 700 : 500, color: isActive ? t.color : T.ink2 }}>
                      {t.name}
                    </div>
                    <div style={{ fontFamily: T.sans, fontSize: 11, color: T.ink4 }}>
                      {fmtNum(t.min)} ink required
                    </div>
                  </div>
                  {isActive && (
                    <span style={{ fontFamily: T.sans, fontSize: 11, fontWeight: 700, color: t.color }}>
                      Current
                    </span>
                  )}
                  {isPast && !isActive && (
                    <span style={{ color: T.green, fontSize: 14 }}>✓</span>
                  )}
                </div>
              );
            })}
          </div>

          <div style={{ padding: '14px', background: T.bg3, borderRadius: 12 }}>
            <div style={{ fontFamily: T.sans, fontSize: 11, fontWeight: 700, color: T.ink4, letterSpacing: '0.5px', textTransform: 'uppercase', marginBottom: 10 }}>
              Breakdown
            </div>
            {[
              { label: 'Creation', value: 5800, color: T.accent },
              { label: 'Engagement', value: 4100, color: T.blue },
              { label: 'Participation', value: 2400, color: T.green },
            ].map(row => (
              <div key={row.label} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                <div style={{ fontFamily: T.sans, fontSize: 12, color: T.ink3, width: 90 }}>{row.label}</div>
                <div style={{ flex: 1, height: 6, background: T.bg2, borderRadius: 3, overflow: 'hidden' }}>
                  <div style={{
                    width: `${(row.value / user.ink) * 100}%`, height: '100%',
                    background: row.color, borderRadius: 3,
                  }} />
                </div>
                <div style={{ fontFamily: T.sans, fontSize: 12, fontWeight: 700, color: row.color, width: 50, textAlign: 'right' }}>
                  {fmtNum(row.value)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Sheet>
    </div>
  );
}

function ShelfCard({ shelf, T }) {
  return (
    <div style={{
      background: T.card, borderRadius: 14,
      border: `1px solid ${T.border}`,
      padding: '14px 16px',
    }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 6 }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: T.serif, fontSize: 16, fontWeight: 700, color: T.ink, fontStyle: 'italic', marginBottom: 4 }}>
            {shelf.name}
          </div>
          <div style={{ fontFamily: T.body, fontSize: 13, color: T.ink3, lineHeight: 1.5 }}>
            {shelf.desc}
          </div>
        </div>
        <span style={{ fontFamily: T.sans, fontSize: 11, color: T.ink4, marginLeft: 12, flexShrink: 0 }}>
          {shelf.count} entries
        </span>
      </div>
      <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap', marginTop: 8 }}>
        {shelf.books.slice(0, 4).map(b => (
          <span key={b} style={{
            fontSize: 11, fontFamily: T.sans, color: T.ink4,
            padding: '3px 8px', background: T.bg3, borderRadius: 6,
            fontStyle: 'italic',
          }}>
            {b}
          </span>
        ))}
        {shelf.books.length > 4 && (
          <span style={{ fontSize: 11, fontFamily: T.sans, color: T.ink4, padding: '3px 8px' }}>
            +{shelf.books.length - 4} more
          </span>
        )}
      </div>
      <div style={{ marginTop: 10, fontFamily: T.sans, fontSize: 11, color: T.ink4 }}>
        {shelf.followers} followers
      </div>
    </div>
  );
}

function AboutTab({ user, T, lensData, tier }) {
  const lenses = Object.values(LENSES);
  return (
    <div>
      {/* Reading lenses */}
      <div style={{ marginBottom: 20 }}>
        <div style={{ fontFamily: T.sans, fontSize: 11, fontWeight: 700, color: T.ink4, letterSpacing: '0.5px', textTransform: 'uppercase', marginBottom: 12 }}>
          Reading Lenses
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {lenses.map(l => (
            <div key={l.label} style={{
              padding: '12px 14px', borderRadius: 12,
              background: l.label === lensData.label ? `${l.color}12` : T.bg3,
              border: `1.5px solid ${l.label === lensData.label ? l.color + '40' : T.border}`,
              display: 'flex', alignItems: 'center', gap: 12,
            }}>
              <span style={{ fontSize: 20 }}>{l.icon}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: T.sans, fontSize: 13, fontWeight: 700, color: l.label === lensData.label ? l.color : T.ink }}>
                  {l.label}
                </div>
                <div style={{ fontFamily: T.sans, fontSize: 12, color: T.ink4 }}>{l.desc}</div>
              </div>
              {l.label === lensData.label && (
                <span style={{ fontSize: 12, color: l.color, fontWeight: 700, fontFamily: T.sans }}>Active</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
