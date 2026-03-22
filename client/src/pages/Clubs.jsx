import { useState } from 'react';
import { usePrecis } from '../store.jsx';
import { CLUBS } from '../data.js';
import { fmtNum } from '../themes.js';
import Avatar from '../components/Avatar.jsx';
import Sheet from '../components/Sheet.jsx';

export default function Clubs() {
  const { theme: T } = usePrecis();
  const [clubs, setClubs] = useState(CLUBS);
  const [selected, setSelected] = useState(null);
  const [filter, setFilter] = useState('all');

  const myClubs = clubs.filter(c => c.joined);
  const discover = clubs.filter(c => !c.joined);
  const displayed = filter === 'mine' ? myClubs : filter === 'discover' ? discover : clubs;

  const toggleJoin = (id) => {
    setClubs(cs => cs.map(c => c.id === id ? { ...c, joined: !c.joined } : c));
  };

  return (
    <div className="page-content">
      {/* Header */}
      <div style={{ padding: '16px 16px 12px', borderBottom: `1px solid ${T.border}` }}>
        <h2 style={{ fontFamily: T.serif, fontSize: 20, fontWeight: 700, color: T.ink, fontStyle: 'italic', marginBottom: 4 }}>
          Book Clubs
        </h2>
        <div style={{ fontFamily: T.sans, fontSize: 13, color: T.ink3 }}>
          {myClubs.length} clubs · {clubs.length} total
        </div>
      </div>

      {/* Filter */}
      <div style={{ padding: '10px 16px', display: 'flex', gap: 8 }}>
        {[{ id: 'all', label: 'All' }, { id: 'mine', label: 'My Clubs' }, { id: 'discover', label: 'Discover' }].map(f => (
          <button key={f.id} onClick={() => setFilter(f.id)} style={{
            padding: '7px 14px', borderRadius: 20, border: 'none', cursor: 'pointer',
            background: filter === f.id ? T.accent : T.bg3,
            color: filter === f.id ? '#fff' : T.ink3,
            fontFamily: T.sans, fontSize: 12, fontWeight: 600, transition: 'all 0.15s',
          }}>
            {f.label}
          </button>
        ))}
      </div>

      {/* Club cards */}
      <div style={{ padding: '0 16px' }}>
        {displayed.map(club => (
          <ClubCard key={club.id} club={club} T={T} onOpen={() => setSelected(club)} onToggle={() => toggleJoin(club.id)} />
        ))}
      </div>

      {/* Club detail sheet */}
      <Sheet open={!!selected} onClose={() => setSelected(null)} title={selected?.name}>
        {selected && <ClubDetail club={selected} T={T} onJoin={() => { toggleJoin(selected.id); setSelected({ ...selected, joined: !selected.joined }); }} />}
      </Sheet>
    </div>
  );
}

function ClubCard({ club, T, onOpen, onToggle }) {
  return (
    <div style={{
      background: T.card, borderRadius: 16,
      border: `1px solid ${club.joined ? T.borderHover : T.border}`,
      marginBottom: 12, padding: '16px',
      cursor: 'pointer',
    }}
      onClick={onOpen}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 12 }}>
        <div style={{
          width: 48, height: 48, borderRadius: 12, flexShrink: 0,
          background: `linear-gradient(135deg, ${T.plum}40, ${T.blue}30)`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 22,
        }}>
          📚
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: T.serif, fontSize: 16, fontWeight: 700, color: T.ink, fontStyle: 'italic', marginBottom: 2 }}>
            {club.name}
          </div>
          <div style={{ fontFamily: T.body, fontSize: 13, color: T.ink3, lineHeight: 1.4 }}>
            {club.desc}
          </div>
        </div>
        <button
          onClick={e => { e.stopPropagation(); onToggle(); }}
          style={{
            padding: '7px 12px', borderRadius: 20, flexShrink: 0,
            border: club.joined ? `1px solid ${T.border}` : 'none',
            background: club.joined ? 'transparent' : T.accent,
            color: club.joined ? T.ink3 : '#fff',
            fontFamily: T.sans, fontSize: 11, fontWeight: 700,
            cursor: 'pointer', transition: 'all 0.15s',
          }}
        >
          {club.joined ? '✓' : 'Join'}
        </button>
      </div>

      {/* Currently reading */}
      <div style={{
        padding: '10px 12px', borderRadius: 10,
        background: T.bg3, marginBottom: 10,
        display: 'flex', alignItems: 'center', gap: 10,
      }}>
        <span style={{ fontSize: 16 }}>📖</span>
        <div>
          <div style={{ fontFamily: T.sans, fontSize: 10, color: T.ink4, marginBottom: 1, textTransform: 'uppercase', letterSpacing: '0.4px', fontWeight: 700 }}>
            Now Reading
          </div>
          <div style={{ fontFamily: T.serif, fontSize: 13, fontWeight: 700, color: T.ink, fontStyle: 'italic' }}>
            {club.currentBook.title}
          </div>
          <div style={{ fontFamily: T.sans, fontSize: 11, color: T.ink3 }}>
            {club.currentBook.author} · {club.chapter}
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <span style={{ fontFamily: T.sans, fontSize: 12, color: T.ink4 }}>
          {fmtNum(club.members)} members
        </span>
        <span style={{ fontFamily: T.sans, fontSize: 12, color: T.ink4 }}>
          📅 {club.nextMeeting}
        </span>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 5 }}>
          {club.tags.map(tag => (
            <span key={tag} style={{
              fontSize: 10, fontFamily: T.sans, color: T.ink4,
              padding: '2px 7px', background: T.bg3, borderRadius: 5,
            }}>
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function ClubDetail({ club, T, onJoin }) {
  const [discussion, setDiscussion] = useState('');

  const mockDiscussions = [
    { author: { name: 'Kofi Asante', initials: 'KA', ink: 8750 }, text: 'The tension in chapter 20 is unbearable — Morrison is building toward something massive.', time: '2h', replies: 4 },
    { author: { name: 'Elena Vasquez', initials: 'EV', ink: 3200 }, text: 'I keep thinking about the relationship between memory and haunting. Is Beloved a punishment or a gift?', time: '5h', replies: 7 },
    { author: { name: 'James Huang', initials: 'JH', ink: 1840 }, text: 'The structure of Part Two is doing something really interesting with perspective fragmentation.', time: '1d', replies: 2 },
  ];

  return (
    <div>
      <p style={{ fontFamily: T.body, fontSize: 14, color: T.ink3, lineHeight: 1.6, marginBottom: 16 }}>
        {club.desc}
      </p>

      <div style={{
        padding: '12px', borderRadius: 12,
        background: `${T.gold}0A`, border: `1px solid ${T.gold}20`, marginBottom: 16,
      }}>
        <div style={{ fontFamily: T.sans, fontSize: 10, fontWeight: 700, color: T.gold, letterSpacing: '0.5px', textTransform: 'uppercase', marginBottom: 6 }}>
          Currently Reading
        </div>
        <div style={{ fontFamily: T.serif, fontSize: 16, fontWeight: 700, color: T.ink, fontStyle: 'italic' }}>
          {club.currentBook.title}
        </div>
        <div style={{ fontFamily: T.sans, fontSize: 13, color: T.ink3 }}>
          {club.currentBook.author} · {club.chapter}
        </div>
        <div style={{ fontFamily: T.sans, fontSize: 12, color: T.ink4, marginTop: 6 }}>
          Next meeting: {club.nextMeeting}
        </div>
      </div>

      {/* Discussion */}
      <div style={{ fontFamily: T.sans, fontSize: 13, fontWeight: 700, color: T.ink2, marginBottom: 12 }}>
        Discussions
      </div>
      {mockDiscussions.map((d, i) => (
        <div key={i} style={{
          padding: '12px 0',
          borderBottom: i < mockDiscussions.length - 1 ? `1px solid ${T.border}` : 'none',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
            <Avatar initials={d.author.initials} ink={d.author.ink} size={28} />
            <span style={{ fontFamily: T.sans, fontSize: 12, fontWeight: 700, color: T.ink }}>{d.author.name}</span>
            <span style={{ fontFamily: T.sans, fontSize: 11, color: T.ink4, marginLeft: 'auto' }}>{d.time}</span>
          </div>
          <p style={{ fontFamily: T.body, fontSize: 13, color: T.ink2, lineHeight: 1.5, marginBottom: 6 }}>
            {d.text}
          </p>
          <span style={{ fontFamily: T.sans, fontSize: 11, color: T.ink4 }}>
            💬 {d.replies} replies
          </span>
        </div>
      ))}

      <div style={{ marginTop: 16, display: 'flex', gap: 8 }}>
        <input
          value={discussion}
          onChange={e => setDiscussion(e.target.value)}
          placeholder="Add to the discussion…"
          style={{
            flex: 1, padding: '10px 14px', borderRadius: 10,
            border: `1px solid ${T.border}`, background: T.bg3, color: T.ink,
            fontFamily: T.body, fontSize: 14, outline: 'none',
          }}
        />
        <button style={{
          padding: '10px 16px', borderRadius: 10, border: 'none',
          background: T.accent, color: '#fff',
          fontFamily: T.sans, fontSize: 13, fontWeight: 700, cursor: 'pointer',
        }}>
          Post
        </button>
      </div>

      {!club.joined && (
        <button onClick={onJoin} style={{
          width: '100%', marginTop: 16, padding: '14px', borderRadius: 12,
          border: 'none', background: `linear-gradient(135deg, ${T.accent}, ${T.accentHover})`,
          color: '#fff', fontFamily: T.sans, fontSize: 14, fontWeight: 700, cursor: 'pointer',
        }}>
          Join This Club
        </button>
      )}
    </div>
  );
}
