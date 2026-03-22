import { useState } from 'react';
import { usePrecis } from '../store.jsx';
import { FEED_ITEMS, CURRENTLY_READING, TRENDING, WRITING_PROMPTS, USERS } from '../data.js';
import { getTier, fmtN } from '../themes.js';
import PostCard from '../components/PostCard.jsx';
import Avatar from '../components/Avatar.jsx';

const FILTERS = [
  { id: 'foryou',         label: '✦ For You' },
  { id: 'all',            label: 'All' },
  { id: 'original',       label: '✎ Original' },
  { id: 'review',         label: 'Reviews' },
  { id: 'recommendation', label: 'Recs' },
  { id: 'spoiler',        label: 'Spoilers' },
];

function RS({ T }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <div style={{ fontFamily: T.ui, fontSize: 10, fontWeight: 700, color: T.text4, letterSpacing: '.1em', textTransform: 'uppercase', marginBottom: 8, padding: '0 2px' }}>
        Currently Reading
      </div>
      <div style={{ display: 'flex', gap: 8, overflowX: 'auto', WebkitOverflowScrolling: 'touch', scrollSnapType: 'x mandatory', paddingBottom: 4, scrollbarWidth: 'none' }}>
        {CURRENTLY_READING.map((cr, i) => (
          <div key={i} className="tb" style={{ flex: '0 0 auto', scrollSnapAlign: 'start', display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', borderRadius: 12, background: T.surface, border: `1px solid ${T.border}`, minWidth: 180, maxWidth: 220, cursor: 'pointer' }}>
            <Avatar T={T} initials={cr.user.initials} ink={cr.user.ink} size={28} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontFamily: T.ui, fontSize: 11.5, fontWeight: 600, color: T.text, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{cr.book}</div>
              <div style={{ fontFamily: T.ui, fontSize: 10, color: T.text4 }}>{cr.author}</div>
            </div>
            <div style={{ width: 30, height: 30, borderRadius: '50%', flexShrink: 0, background: `conic-gradient(${T.accent} ${cr.progress * 3.6}deg, ${T.border} ${cr.progress * 3.6}deg)`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ width: 24, height: 24, borderRadius: '50%', background: T.surface, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: T.mono, fontSize: 8, fontWeight: 500, color: T.text3 }}>{cr.progress}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function PC({ T }) {
  const [idx, setIdx] = useState(0);
  return (
    <div style={{ background: T.surface, borderRadius: 14, border: `1px solid ${T.border}`, padding: '16px 16px 14px', marginBottom: 14 }}>
      <div style={{ fontFamily: T.ui, fontSize: 9, fontWeight: 700, color: T.accent, letterSpacing: '.1em', textTransform: 'uppercase', marginBottom: 8 }}>✎ Writing Prompt</div>
      <div style={{ fontFamily: T.hd, fontSize: 16, fontWeight: 500, color: T.text, lineHeight: 1.45, fontStyle: 'italic', marginBottom: 12 }}>"{WRITING_PROMPTS[idx]}"</div>
      <div style={{ display: 'flex', gap: 8 }}>
        <button className="tb" style={{ flex: 1, padding: '10px 0', borderRadius: 8, border: 'none', background: T.accent, color: '#fff', fontFamily: T.ui, fontSize: 12, fontWeight: 700, cursor: 'pointer', minHeight: 44, boxShadow: `0 2px 8px ${T.accent}30` }}>Write This</button>
        <button className="tb" onClick={() => setIdx((idx + 1) % WRITING_PROMPTS.length)} style={{ padding: '10px 18px', borderRadius: 8, border: `1px solid ${T.border}`, background: 'none', color: T.text3, fontFamily: T.ui, fontSize: 12, fontWeight: 600, cursor: 'pointer', minHeight: 44 }}>Next</button>
      </div>
    </div>
  );
}

function TB({ T }) {
  return (
    <div style={{ background: T.surface, borderRadius: 14, border: `1px solid ${T.border}`, padding: '16px 16px 8px', marginBottom: 14 }}>
      <div style={{ fontFamily: T.hd, fontSize: 16, fontWeight: 600, color: T.text, marginBottom: 12 }}>Trending Now</div>
      {TRENDING.map((b, i) => (
        <div key={i} className="tb" style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 4px', cursor: 'pointer', borderBottom: i < TRENDING.length - 1 ? `1px solid ${T.border}` : 'none', minHeight: 48 }}>
          <div style={{ fontFamily: T.mono, fontSize: 11, fontWeight: 500, color: T.text4, width: 18, textAlign: 'center' }}>{i + 1}</div>
          <div style={{ width: 22, height: 32, borderRadius: 3, flexShrink: 0, background: `linear-gradient(140deg,${b.color}AA,${b.color}60)` }} />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontFamily: T.ui, fontSize: 12, fontWeight: 600, color: T.text, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{b.title}</div>
            <div style={{ fontFamily: T.ui, fontSize: 10, color: T.text3 }}>{b.author}</div>
          </div>
          <span style={{ fontFamily: T.mono, fontSize: 10, fontWeight: 500, color: T.green, background: `${T.green}0D`, padding: '2px 6px', borderRadius: 3 }}>{b.heat}</span>
        </div>
      ))}
    </div>
  );
}

function IL({ T }) {
  const top = [...USERS].sort((a, b) => b.ink - a.ink).slice(0, 5);
  return (
    <div style={{ background: T.surface, borderRadius: 14, border: `1px solid ${T.border}`, padding: '16px 16px 8px' }}>
      <div style={{ fontFamily: T.hd, fontSize: 16, fontWeight: 600, color: T.text, marginBottom: 12 }}>Ink Leaders</div>
      {top.map((u, i) => (
        <div key={u.id} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 2px', borderBottom: i < top.length - 1 ? `1px solid ${T.border}` : 'none' }}>
          <div style={{ fontFamily: T.mono, fontSize: 11, fontWeight: 500, color: i < 3 ? T.gold : T.text4, width: 16 }}>{i + 1}</div>
          <Avatar T={T} initials={u.initials} ink={u.ink} size={26} />
          <div style={{ flex: 1, fontFamily: T.ui, fontSize: 11.5, fontWeight: 600, color: T.text }}>{u.name}</div>
          <span style={{ fontFamily: T.mono, fontSize: 10, fontWeight: 500, color: getTier(u.ink).color }}>{fmtN(u.ink)}</span>
        </div>
      ))}
    </div>
  );
}

export default function Feed() {
  const { T } = usePrecis();
  const [filter, setFilter] = useState('foryou');
  const [items, setItems] = useState(FEED_ITEMS);

  const filtered = filter === 'foryou' || filter === 'all'
    ? items
    : items.filter(p => p.type === filter);

  function toggle(id, action) {
    setItems(prev => prev.map(p => {
      if (p.id !== id) return p;
      if (action === 'like')   return { ...p, isLiked:    !p.isLiked,    likes:    p.likes    + (p.isLiked    ? -1 : 1) };
      if (action === 'shelf')  return { ...p, isShelved:  !p.isShelved,  shelved:  p.shelved  + (p.isShelved  ? -1 : 1) };
      if (action === 'repost') return { ...p, isReposted: !p.isReposted, reposts:  p.reposts  + (p.isReposted ? -1 : 1) };
      return p;
    }));
  }

  return (
    <div style={{ padding: '16px 14px 0' }} className="fw">
      <div className="fs">
        <main>
          <RS T={T} />

          {/* Filter pills */}
          <div style={{ display: 'flex', gap: 6, overflowX: 'auto', scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch', marginBottom: 14, paddingBottom: 2 }}>
            {FILTERS.map(f => (
              <button
                key={f.id}
                className="tb"
                onClick={() => setFilter(f.id)}
                style={{
                  flex: '0 0 auto',
                  padding: '8px 14px',
                  borderRadius: 20,
                  border: filter === f.id ? `1px solid ${T.gold}` : `1px solid ${T.border}`,
                  background: filter === f.id ? T.goldSoft : 'transparent',
                  color: filter === f.id ? T.gold : T.text3,
                  fontFamily: T.ui, fontSize: 12, fontWeight: filter === f.id ? 700 : 500,
                  cursor: 'pointer', whiteSpace: 'nowrap', minHeight: 36,
                  transition: 'all .15s',
                }}
              >
                {f.label}
              </button>
            ))}
          </div>

          <PC T={T} />

          {/* Posts */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {filtered.map((post, i) => (
              <PostCard key={post.id} T={T} item={post} onToggle={toggle} index={i} />
            ))}
          </div>

          {/* Trending (mobile only) */}
          <div className="mh" style={{ marginTop: 20, flexDirection: 'column' }}>
            <TB T={T} />
          </div>
        </main>

        <aside className="sd" style={{ flexDirection: 'column', gap: 14, position: 'sticky', top: 72 }}>
          <PC T={T} />
          <TB T={T} />
          <IL T={T} />
        </aside>
      </div>
    </div>
  );
}
