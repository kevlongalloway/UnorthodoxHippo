import { useState } from 'react';
import { usePrecis } from '../store.jsx';
import { POSTS } from '../data.js';
import { LENSES, fmtNum } from '../themes.js';
import PostCard from '../components/PostCard.jsx';
import Sheet from '../components/Sheet.jsx';
import InkBadge from '../components/InkBadge.jsx';

const FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'original', label: '✍ Original' },
  { id: 'review', label: '📝 Reviews' },
  { id: 'recommendation', label: '📚 Recs' },
  { id: 'spoiler', label: '🔓 Spoilers' },
];

export default function Feed() {
  const { theme: T, user } = usePrecis();
  const [filter, setFilter] = useState('all');
  const [openPost, setOpenPost] = useState(null);

  const filtered = filter === 'all' ? POSTS : POSTS.filter(p => p.type === filter);
  const lensData = LENSES[user.lens];

  return (
    <div className="page-content">
      {/* Currently Reading Banner */}
      {user.currentlyReading && (
        <div style={{
          margin: '12px 16px 0',
          padding: '12px 14px',
          background: `${T.gold}0A`,
          border: `1px solid ${T.gold}20`,
          borderRadius: 12,
          display: 'flex', alignItems: 'center', gap: 10,
        }}>
          <div style={{
            width: 38, height: 52,
            borderRadius: 4,
            background: `linear-gradient(135deg, ${T.accent}, ${T.gold})`,
            flexShrink: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <span style={{ fontSize: 18 }}>📖</span>
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontFamily: T.sans, fontSize: 10, color: T.ink4, fontWeight: 600, letterSpacing: '0.5px', textTransform: 'uppercase', marginBottom: 2 }}>
              Currently Reading
            </div>
            <div style={{ fontFamily: T.serif, fontSize: 14, fontWeight: 700, color: T.ink, fontStyle: 'italic' }}>
              {user.currentlyReading.title}
            </div>
            <div style={{ fontFamily: T.sans, fontSize: 12, color: T.ink3 }}>
              {user.currentlyReading.author}
            </div>
          </div>
          <div style={{ textAlign: 'right', flexShrink: 0 }}>
            <div style={{ fontFamily: T.sans, fontSize: 18, fontWeight: 700, color: T.gold }}>
              {user.currentlyReading.progress}%
            </div>
            <div style={{
              width: 48, height: 4, background: T.bg3,
              borderRadius: 2, marginTop: 4, overflow: 'hidden',
            }}>
              <div style={{
                width: `${user.currentlyReading.progress}%`,
                height: '100%',
                background: `linear-gradient(90deg, ${T.gold}, ${T.accent})`,
                borderRadius: 2,
              }} />
            </div>
          </div>
        </div>
      )}

      {/* Lens indicator */}
      <div style={{
        margin: '10px 16px 0',
        padding: '10px 14px',
        background: `${lensData.color}0C`,
        border: `1px solid ${lensData.color}20`,
        borderRadius: 12,
        display: 'flex', alignItems: 'center', gap: 8,
      }}>
        <span style={{ fontSize: 16 }}>{lensData.icon}</span>
        <div>
          <span style={{ fontFamily: T.sans, fontSize: 12, fontWeight: 700, color: lensData.color }}>
            {lensData.label} Lens
          </span>
          <span style={{ fontFamily: T.sans, fontSize: 12, color: T.ink4 }}>
            {' '}· {lensData.desc}
          </span>
        </div>
        <InkBadge ink={user.ink} showCount style={{ marginLeft: 'auto' }} />
      </div>

      {/* Filter tabs */}
      <div className="scroll-x" style={{
        padding: '12px 16px 4px',
        display: 'flex', gap: 8,
      }}>
        {FILTERS.map(f => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id)}
            style={{
              padding: '8px 14px',
              borderRadius: 20,
              border: 'none',
              background: filter === f.id ? T.accent : T.bg3,
              color: filter === f.id ? '#fff' : T.ink3,
              fontFamily: T.sans, fontSize: 12, fontWeight: 600,
              cursor: 'pointer', whiteSpace: 'nowrap',
              transition: 'all 0.15s',
            }}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Posts */}
      <div style={{ padding: '12px 16px 0' }}>
        {filtered.map(post => (
          <PostCard
            key={post.id}
            post={post}
            onOpen={setOpenPost}
          />
        ))}
      </div>

      {/* Post detail sheet */}
      <Sheet open={!!openPost} onClose={() => setOpenPost(null)} title={openPost?.title || openPost?.bookRef?.title || 'Post'}>
        {openPost && (
          <div>
            <div style={{ fontFamily: T.body, fontSize: 15, color: T.ink2, lineHeight: 1.75, whiteSpace: 'pre-wrap' }}>
              {openPost.text}
            </div>
            <div style={{
              marginTop: 20, paddingTop: 16,
              borderTop: `1px solid ${T.border}`,
              fontFamily: T.sans, fontSize: 12, color: T.ink3,
            }}>
              <div style={{ fontWeight: 600, marginBottom: 10, color: T.ink2 }}>Comments ({openPost.comments})</div>
              <div style={{ padding: '16px', textAlign: 'center', color: T.ink4, fontStyle: 'italic' }}>
                Comments coming soon — connect backend to enable.
              </div>
            </div>
          </div>
        )}
      </Sheet>
    </div>
  );
}
