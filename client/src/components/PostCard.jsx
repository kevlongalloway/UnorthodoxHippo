import { useState } from 'react';
import { usePrecis } from '../store.jsx';
import { POST_TYPES, LENSES, fmtNum } from '../themes.js';
import Avatar from './Avatar.jsx';
import InkBadge from './InkBadge.jsx';

export default function PostCard({ post, onOpen }) {
  const { theme: T } = usePrecis();
  const [liked, setLiked] = useState(false);
  const [shelved, setShelved] = useState(false);
  const [showSpoiler, setShowSpoiler] = useState(false);

  const pt = POST_TYPES[post.type] || POST_TYPES.original;
  const lens = post.author?.lens ? LENSES[post.author.lens] : null;
  const isSpoiler = post.type === 'spoiler';

  const handleLike = (e) => {
    e.stopPropagation();
    setLiked(!liked);
  };
  const handleShelf = (e) => {
    e.stopPropagation();
    setShelved(!shelved);
  };

  return (
    <article
      onClick={() => onOpen && onOpen(post)}
      style={{
        background: T.card,
        border: `1px solid ${T.border}`,
        borderRadius: 16,
        overflow: 'hidden',
        cursor: onOpen ? 'pointer' : 'default',
        transition: 'border-color 0.18s',
        margin: '0 0 12px',
        animation: 'fadeUp 0.22s ease both',
      }}
      onTouchStart={e => { if (onOpen) e.currentTarget.style.borderColor = T.borderHover; }}
      onTouchEnd={e => { if (onOpen) e.currentTarget.style.borderColor = T.border; }}
    >
      {/* Type indicator strip */}
      <div style={{
        height: 3,
        background: `linear-gradient(90deg, ${pt.color}, ${pt.color}60)`,
      }} />

      <div style={{ padding: '14px 16px 12px' }}>
        {/* Author row */}
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 12 }}>
          <Avatar initials={post.author.initials} ink={post.author.ink} lens={post.author.lens} size={38} />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
              <span style={{ fontFamily: T.sans, fontSize: 14, fontWeight: 700, color: T.ink }}>
                {post.author.name}
              </span>
              <InkBadge ink={post.author.ink} />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 2 }}>
              <span style={{ fontFamily: T.sans, fontSize: 12, color: T.ink4 }}>
                {post.author.handle}
              </span>
              {lens && (
                <span style={{
                  fontSize: 10, fontFamily: T.sans, fontWeight: 600,
                  color: lens.color, padding: '1px 6px',
                  background: `${lens.color}15`, borderRadius: 4,
                }}>
                  {lens.icon} {lens.label}
                </span>
              )}
              <span style={{ fontFamily: T.sans, fontSize: 11, color: T.ink4, marginLeft: 'auto' }}>
                {post.timeAgo}
              </span>
            </div>
          </div>
        </div>

        {/* Content type + book ref */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8, flexWrap: 'wrap' }}>
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: 4,
            padding: '3px 10px', borderRadius: 20,
            fontSize: 11, fontWeight: 600, fontFamily: T.sans,
            color: pt.color, background: `${pt.color}14`,
            border: `1px solid ${pt.color}22`,
          }}>
            {pt.icon} {pt.label}
          </span>
          {post.attested && (
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: 3,
              padding: '3px 8px', borderRadius: 20,
              fontSize: 10, fontWeight: 600, fontFamily: T.sans,
              color: T.gold, background: `${T.gold}12`,
              border: `1px solid ${T.gold}20`,
            }}>
              ✦ Attested
            </span>
          )}
          {post.bookRef && (
            <span style={{
              fontSize: 11, fontFamily: T.sans, color: T.ink3,
              fontStyle: 'italic',
            }}>
              re: {post.bookRef.title}
            </span>
          )}
        </div>

        {/* Title */}
        {post.title && (
          <h3 style={{
            fontFamily: T.serif, fontSize: 18, fontWeight: 700,
            color: T.ink, lineHeight: 1.3,
            marginBottom: 8, fontStyle: 'italic',
          }}>
            {post.title}
          </h3>
        )}

        {/* Spoiler warning */}
        {isSpoiler && !showSpoiler ? (
          <div style={{
            background: `${T.red}10`,
            border: `1px solid ${T.red}25`,
            borderRadius: 10,
            padding: '16px',
            textAlign: 'center',
          }}>
            <div style={{ fontSize: 24, marginBottom: 6 }}>🔓</div>
            <div style={{ fontFamily: T.sans, fontSize: 13, fontWeight: 600, color: T.red, marginBottom: 4 }}>
              Spoiler Zone
            </div>
            {post.bookRef && (
              <div style={{ fontFamily: T.sans, fontSize: 11, color: T.ink3, marginBottom: 10, fontStyle: 'italic' }}>
                {post.bookRef.title}{post.spoilerPage ? ` · Page ${post.spoilerPage}` : ''}
              </div>
            )}
            <button
              onClick={(e) => { e.stopPropagation(); setShowSpoiler(true); }}
              style={{
                padding: '8px 20px', borderRadius: 8, border: `1px solid ${T.red}40`,
                background: 'transparent', color: T.red,
                fontFamily: T.sans, fontSize: 12, fontWeight: 700, cursor: 'pointer',
              }}
            >
              I've read this far — show me
            </button>
          </div>
        ) : (
          <div style={{
            fontFamily: T.body, fontSize: 14.5, color: T.ink2,
            lineHeight: 1.7,
            display: '-webkit-box',
            WebkitLineClamp: onOpen ? 6 : undefined,
            WebkitBoxOrient: 'vertical',
            overflow: onOpen ? 'hidden' : 'visible',
            whiteSpace: 'pre-wrap',
          }}>
            {post.text}
          </div>
        )}

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 10 }}>
            {post.tags.map(tag => (
              <span key={tag} style={{
                fontSize: 11, fontFamily: T.sans, fontWeight: 500,
                color: T.ink3, padding: '2px 8px',
                background: T.bg3, borderRadius: 6,
              }}>
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Engagement row */}
      <div style={{
        display: 'flex', alignItems: 'center',
        padding: '10px 16px',
        borderTop: `1px solid ${T.border}`,
        gap: 4,
      }}>
        <EngBtn
          icon={liked ? '♥' : '♡'}
          count={post.likes + (liked ? 1 : 0)}
          active={liked}
          color={T.red}
          activeColor={T.red}
          T={T}
          onClick={handleLike}
        />
        <EngBtn icon="💬" count={post.comments} T={T} onClick={e => { e.stopPropagation(); onOpen && onOpen(post); }} />
        <EngBtn
          icon={shelved ? '▤' : '▣'}
          count={post.shelved + (shelved ? 1 : 0)}
          active={shelved}
          color={T.teal}
          activeColor={T.teal}
          T={T}
          onClick={handleShelf}
        />
        <div style={{ flex: 1 }} />
        <EngBtn icon="↗" count={post.reposts} T={T} onClick={e => e.stopPropagation()} />
      </div>
    </article>
  );
}

function EngBtn({ icon, count, active, activeColor, T, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        display: 'flex', alignItems: 'center', gap: 5,
        padding: '6px 10px', borderRadius: 8,
        border: 'none', background: 'transparent',
        cursor: 'pointer',
        fontFamily: T.sans, fontSize: 12,
        color: active ? activeColor : T.ink3,
        fontWeight: active ? 700 : 400,
        transition: 'all 0.15s',
        minHeight: 36,
      }}
    >
      <span style={{ fontSize: 15, lineHeight: 1 }}>{icon}</span>
      <span>{fmtNum(count)}</span>
    </button>
  );
}
