import { useState } from 'react';
import { usePrecis } from '../store.jsx';
import { CHALLENGES } from '../data.js';
import { fmtNum } from '../themes.js';

export default function Challenges() {
  const { theme: T } = usePrecis();
  const [challenges, setChallenges] = useState(CHALLENGES);
  const [filter, setFilter] = useState('all');

  const joined = challenges.filter(c => c.joined);
  const available = challenges.filter(c => !c.joined);
  const displayed = filter === 'mine' ? joined : filter === 'available' ? available : challenges;

  const toggleJoin = (id) => {
    setChallenges(chs => chs.map(c => c.id === id ? { ...c, joined: !c.joined } : c));
  };

  return (
    <div className="page-content">
      {/* Header */}
      <div style={{ padding: '16px 16px 12px', borderBottom: `1px solid ${T.border}` }}>
        <h2 style={{ fontFamily: T.serif, fontSize: 20, fontWeight: 700, color: T.ink, fontStyle: 'italic', marginBottom: 4 }}>
          Challenges
        </h2>
        <div style={{ fontFamily: T.sans, fontSize: 13, color: T.ink3 }}>
          {joined.length} active · {joined.filter(c => c.progress === c.total).length} completed
        </div>
      </div>

      {/* Filter */}
      <div style={{ padding: '10px 16px', display: 'flex', gap: 8 }}>
        {[{ id: 'all', label: 'All' }, { id: 'mine', label: 'My Challenges' }, { id: 'available', label: 'Discover' }].map(f => (
          <button key={f.id} onClick={() => setFilter(f.id)} style={{
            padding: '7px 14px', borderRadius: 20,
            border: 'none', cursor: 'pointer',
            background: filter === f.id ? T.accent : T.bg3,
            color: filter === f.id ? '#fff' : T.ink3,
            fontFamily: T.sans, fontSize: 12, fontWeight: 600,
            transition: 'all 0.15s',
          }}>
            {f.label}
          </button>
        ))}
      </div>

      <div style={{ padding: '0 16px' }}>
        {displayed.map(challenge => (
          <ChallengeCard key={challenge.id} challenge={challenge} T={T} onToggle={() => toggleJoin(challenge.id)} />
        ))}
      </div>
    </div>
  );
}

function ChallengeCard({ challenge, T, onToggle }) {
  const [expanded, setExpanded] = useState(false);
  const pct = Math.round((challenge.progress / challenge.total) * 100);

  return (
    <div style={{
      background: T.card, borderRadius: 16,
      border: `1px solid ${challenge.joined ? T.borderHover : T.border}`,
      marginBottom: 12, overflow: 'hidden',
    }}>
      <div style={{ padding: '16px' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12, marginBottom: 10 }}>
          <div style={{ flex: 1 }}>
            <h3 style={{ fontFamily: T.serif, fontSize: 17, fontWeight: 700, color: T.ink, fontStyle: 'italic', lineHeight: 1.3, marginBottom: 4 }}>
              {challenge.title}
            </h3>
            <p style={{ fontFamily: T.body, fontSize: 13, color: T.ink3, lineHeight: 1.5 }}>
              {challenge.desc}
            </p>
          </div>
          <button
            onClick={onToggle}
            style={{
              padding: '8px 14px', borderRadius: 20, flexShrink: 0,
              border: challenge.joined ? `1px solid ${T.border}` : 'none',
              background: challenge.joined ? 'transparent' : T.accent,
              color: challenge.joined ? T.ink3 : '#fff',
              fontFamily: T.sans, fontSize: 11, fontWeight: 700,
              cursor: 'pointer', transition: 'all 0.15s',
            }}
          >
            {challenge.joined ? 'Joined ✓' : 'Join'}
          </button>
        </div>

        {/* Tags */}
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 12 }}>
          {challenge.tags.map(tag => (
            <span key={tag} style={{
              fontSize: 10, fontFamily: T.sans, fontWeight: 600,
              color: T.teal, padding: '2px 8px',
              background: `${T.teal}12`, borderRadius: 6,
            }}>
              {tag}
            </span>
          ))}
          <span style={{ fontSize: 10, fontFamily: T.sans, color: T.ink4, padding: '2px 0' }}>
            📅 {challenge.deadline}
          </span>
          <span style={{ fontSize: 10, fontFamily: T.sans, color: T.ink4 }}>
            · {fmtNum(challenge.participants)} readers
          </span>
        </div>

        {/* Progress */}
        {challenge.joined && (
          <div style={{ marginBottom: 10 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
              <span style={{ fontFamily: T.sans, fontSize: 12, fontWeight: 700, color: T.ink2 }}>
                {challenge.progress} / {challenge.total}
              </span>
              <span style={{ fontFamily: T.sans, fontSize: 12, color: T.gold, fontWeight: 700 }}>
                {pct}%
              </span>
            </div>
            <div style={{ height: 8, background: T.bg3, borderRadius: 4, overflow: 'hidden' }}>
              <div style={{
                width: `${pct}%`, height: '100%', borderRadius: 4,
                background: pct === 100
                  ? `linear-gradient(90deg, ${T.green}, ${T.teal})`
                  : `linear-gradient(90deg, ${T.gold}, ${T.accent})`,
                transition: 'width 0.5s ease',
              }} />
            </div>
          </div>
        )}

        {/* Book list toggle */}
        {challenge.books && (
          <button
            onClick={() => setExpanded(!expanded)}
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              fontFamily: T.sans, fontSize: 12, fontWeight: 600,
              color: T.gold, padding: '4px 0',
              display: 'flex', alignItems: 'center', gap: 4,
            }}
          >
            {expanded ? '▴' : '▾'} {expanded ? 'Hide' : 'View'} reading list
          </button>
        )}
      </div>

      {/* Expanded book list */}
      {expanded && challenge.books && (
        <div style={{ borderTop: `1px solid ${T.border}` }}>
          {challenge.books.map((book, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', gap: 12,
              padding: '12px 16px',
              borderBottom: i < challenge.books.length - 1 ? `1px solid ${T.border}` : 'none',
              opacity: book.done ? 0.7 : 1,
            }}>
              <div style={{
                width: 22, height: 22, borderRadius: '50%', flexShrink: 0,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: book.done ? `${T.green}20` : T.bg3,
                border: `1.5px solid ${book.done ? T.green : T.border}`,
                fontSize: 11, color: book.done ? T.green : T.ink4,
              }}>
                {book.done ? '✓' : i + 1}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: T.serif, fontSize: 13, fontWeight: 700, color: T.ink, fontStyle: 'italic', textDecoration: book.done ? 'line-through' : 'none' }}>
                  {book.title}
                </div>
                {book.author && (
                  <div style={{ fontFamily: T.sans, fontSize: 11, color: T.ink4 }}>
                    {book.author} {book.region && `· ${book.region}`} {book.year && `· ${book.year}`}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
