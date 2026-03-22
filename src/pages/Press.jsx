import { useState } from 'react';
import { usePrecis } from '../store.jsx';
import { PRESS_POSTS } from '../data.js';
import { LENSES, POST_TYPES, fmtNum } from '../themes.js';
import Avatar from '../components/Avatar.jsx';
import Sheet from '../components/Sheet.jsx';

const PRESS_TABS = ['Editor\'s Picks', 'Trending', 'New'];

export default function Press() {
  const { theme: T } = usePrecis();
  const [tab, setTab] = useState("Editor's Picks");
  const [openPost, setOpenPost] = useState(null);

  const editorPicks = PRESS_POSTS.filter(p => p.editorPick);
  const featured = PRESS_POSTS.find(p => p.featured);
  const rest = PRESS_POSTS.filter(p => !p.featured);

  const displayPosts = tab === "Editor's Picks" ? editorPicks
    : tab === 'Trending' ? [...PRESS_POSTS].sort((a, b) => b.likes - a.likes)
    : [...PRESS_POSTS].sort((a, b) => a.timeAgo.localeCompare(b.timeAgo));

  return (
    <div className="page-content">
      {/* Hero header */}
      <div style={{
        padding: '20px 16px 16px',
        background: `linear-gradient(180deg, ${T.bg2} 0%, ${T.bg} 100%)`,
        borderBottom: `1px solid ${T.border}`,
      }}>
        <div style={{ fontFamily: T.sans, fontSize: 10, fontWeight: 700, color: T.gold, letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: 4 }}>
          ✦ The Press
        </div>
        <h1 style={{ fontFamily: T.serif, fontSize: 26, fontWeight: 800, color: T.ink, fontStyle: 'italic', lineHeight: 1.2, marginBottom: 6 }}>
          Original Work
        </h1>
        <p style={{ fontFamily: T.body, fontSize: 13, color: T.ink3, lineHeight: 1.5 }}>
          Fiction, poetry, and essays by Précis readers.
        </p>
      </div>

      {/* Tabs */}
      <div className="scroll-x" style={{ padding: '12px 16px', display: 'flex', gap: 8 }}>
        {PRESS_TABS.map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            style={{
              padding: '8px 16px', borderRadius: 20,
              border: 'none', cursor: 'pointer',
              background: tab === t ? T.accent : T.bg3,
              color: tab === t ? '#fff' : T.ink3,
              fontFamily: T.sans, fontSize: 12, fontWeight: 600,
              whiteSpace: 'nowrap', transition: 'all 0.15s',
            }}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Featured post */}
      {tab === "Editor's Picks" && featured && (
        <div style={{ padding: '0 16px 12px' }}>
          <FeaturedCard post={featured} T={T} onOpen={setOpenPost} />
        </div>
      )}

      {/* Post grid */}
      <div style={{ padding: '0 16px' }}>
        {displayPosts.map(post => (
          <PressCard key={post.id} post={post} T={T} onOpen={setOpenPost} />
        ))}
      </div>

      {/* Full post sheet */}
      <Sheet open={!!openPost} onClose={() => setOpenPost(null)} title={openPost?.title}>
        {openPost && <FullPostView post={openPost} T={T} />}
      </Sheet>
    </div>
  );
}

function FeaturedCard({ post, T, onOpen }) {
  const lens = LENSES[post.author.lens];
  return (
    <div
      onClick={() => onOpen(post)}
      style={{
        background: `linear-gradient(160deg, ${T.card}, ${T.bg2})`,
        border: `1.5px solid ${T.gold}30`,
        borderRadius: 18,
        padding: '20px',
        cursor: 'pointer',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Editor's Pick badge */}
      <div style={{
        position: 'absolute', top: 14, right: 14,
        padding: '4px 10px', borderRadius: 20,
        background: `${T.gold}20`, border: `1px solid ${T.gold}40`,
        fontFamily: T.sans, fontSize: 10, fontWeight: 700, color: T.gold,
      }}>
        ✦ Editor's Pick
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
        <Avatar initials={post.author.initials} ink={post.author.ink} lens={post.author.lens} size={40} />
        <div>
          <div style={{ fontFamily: T.sans, fontSize: 13, fontWeight: 700, color: T.ink }}>{post.author.name}</div>
          <div style={{ fontFamily: T.sans, fontSize: 11, color: T.ink4 }}>{post.author.handle}</div>
        </div>
        {lens && (
          <span style={{
            marginLeft: 'auto', marginRight: 32,
            fontSize: 10, fontFamily: T.sans, fontWeight: 600,
            color: lens.color, padding: '2px 8px',
            background: `${lens.color}15`, borderRadius: 4,
          }}>
            {lens.icon} {lens.label}
          </span>
        )}
      </div>

      <h2 style={{ fontFamily: T.serif, fontSize: 22, fontWeight: 800, color: T.ink, fontStyle: 'italic', lineHeight: 1.25, marginBottom: 10 }}>
        {post.title}
      </h2>
      <p style={{ fontFamily: T.body, fontSize: 14, color: T.ink2, lineHeight: 1.65, marginBottom: 14 }}>
        {post.excerpt}
      </p>

      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <span style={{ fontFamily: T.sans, fontSize: 11, color: T.ink4 }}>⏱ {post.readTime}</span>
        <span style={{ fontFamily: T.sans, fontSize: 11, color: T.ink4 }}>♥ {fmtNum(post.likes)}</span>
        <span style={{ fontFamily: T.sans, fontSize: 11, color: T.ink4 }}>▤ {fmtNum(post.shelved)}</span>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {post.tags.slice(0, 2).map(tag => (
            <span key={tag} style={{
              fontSize: 10, fontFamily: T.sans, fontWeight: 500,
              color: T.ink3, padding: '2px 7px',
              background: T.bg3, borderRadius: 5,
            }}>
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function PressCard({ post, T, onOpen }) {
  const lens = LENSES[post.author.lens];
  const pt = POST_TYPES[post.type];
  return (
    <div
      onClick={() => onOpen(post)}
      style={{
        background: T.card,
        border: `1px solid ${T.border}`,
        borderRadius: 14, padding: '14px 16px',
        marginBottom: 10, cursor: 'pointer',
        transition: 'border-color 0.15s',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 10 }}>
        <Avatar initials={post.author.initials} ink={post.author.ink} lens={post.author.lens} size={36} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ fontFamily: T.sans, fontSize: 13, fontWeight: 700, color: T.ink }}>{post.author.name}</span>
            {post.editorPick && (
              <span style={{ fontSize: 9, fontFamily: T.sans, fontWeight: 700, color: T.gold }}>✦ PICK</span>
            )}
          </div>
          <div style={{ fontFamily: T.sans, fontSize: 11, color: T.ink4 }}>{post.timeAgo}</div>
        </div>
        <span style={{ fontFamily: T.sans, fontSize: 11, color: T.ink4 }}>{post.readTime}</span>
      </div>

      <h3 style={{ fontFamily: T.serif, fontSize: 17, fontWeight: 700, color: T.ink, fontStyle: 'italic', lineHeight: 1.3, marginBottom: 6 }}>
        {post.title}
      </h3>
      <p style={{ fontFamily: T.body, fontSize: 13, color: T.ink3, lineHeight: 1.6, marginBottom: 10,
        display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden',
      }}>
        {post.excerpt}
      </p>

      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ fontFamily: T.sans, fontSize: 11, color: T.ink4 }}>♥ {fmtNum(post.likes)}</span>
        <span style={{ fontFamily: T.sans, fontSize: 11, color: T.ink4 }}>💬 {fmtNum(post.comments)}</span>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 5, flexWrap: 'wrap' }}>
          {post.tags.slice(0, 2).map(tag => (
            <span key={tag} style={{ fontSize: 10, fontFamily: T.sans, color: T.ink4, padding: '2px 7px', background: T.bg3, borderRadius: 5 }}>
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function FullPostView({ post, T }) {
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
        <Avatar initials={post.author.initials} ink={post.author.ink} lens={post.author.lens} size={42} />
        <div>
          <div style={{ fontFamily: T.sans, fontSize: 14, fontWeight: 700, color: T.ink }}>{post.author.name}</div>
          <div style={{ fontFamily: T.sans, fontSize: 12, color: T.ink4 }}>{post.author.handle} · {post.timeAgo}</div>
        </div>
      </div>
      <p style={{ fontFamily: T.body, fontSize: 15.5, color: T.ink2, lineHeight: 1.8 }}>
        {post.excerpt} [Full text would load from backend]
      </p>
      <div style={{ marginTop: 20, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        {post.tags.map(tag => (
          <span key={tag} style={{ fontSize: 11, fontFamily: T.sans, color: T.ink3, padding: '4px 10px', background: T.bg3, borderRadius: 8 }}>
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
