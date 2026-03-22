import { useState } from 'react';
import { usePrecis } from '../store.jsx';
import { BOOKS, EXPLORE_READERS } from '../data.js';
import { LENSES, getTier, fmtNum } from '../themes.js';
import Avatar from '../components/Avatar.jsx';
import InkBadge from '../components/InkBadge.jsx';

const EXPLORE_TABS = ['Trending', 'Readers', 'Books', 'Tags'];

export default function Explore() {
  const { theme: T } = usePrecis();
  const [tab, setTab] = useState('Trending');
  const [search, setSearch] = useState('');

  const trending = BOOKS.filter(b => b.trending);
  const filteredBooks = search
    ? BOOKS.filter(b =>
        b.title.toLowerCase().includes(search.toLowerCase()) ||
        b.author.toLowerCase().includes(search.toLowerCase())
      )
    : BOOKS;

  return (
    <div className="page-content">
      {/* Search bar */}
      <div style={{ padding: '12px 16px' }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 10,
          background: T.bg2,
          border: `1px solid ${T.border}`,
          borderRadius: 14, padding: '0 14px',
          height: 46,
        }}>
          <span style={{ color: T.ink4, fontSize: 16 }}>◎</span>
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search books, readers, shelves…"
            style={{
              flex: 1, background: 'none', border: 'none', outline: 'none',
              fontFamily: T.sans, fontSize: 14, color: T.ink,
            }}
          />
          {search && (
            <button onClick={() => setSearch('')} style={{ background: 'none', border: 'none', color: T.ink4, cursor: 'pointer', fontSize: 16 }}>×</button>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="scroll-x" style={{ padding: '0 16px 12px', display: 'flex', gap: 8 }}>
        {EXPLORE_TABS.map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            style={{
              padding: '8px 16px', borderRadius: 20,
              border: 'none', cursor: 'pointer',
              background: tab === t ? T.gold : T.bg3,
              color: tab === t ? (T.id === 'twilight' ? T.bg : '#fff') : T.ink3,
              fontFamily: T.sans, fontSize: 12, fontWeight: 600,
              whiteSpace: 'nowrap', transition: 'all 0.15s',
            }}
          >
            {t}
          </button>
        ))}
      </div>

      <div style={{ padding: '0 16px' }}>
        {(tab === 'Trending' || tab === 'Books') && (
          <>
            {tab === 'Trending' && (
              <div style={{ marginBottom: 16 }}>
                <SectionHeader T={T} title="Trending This Week" />
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {trending.map((book, i) => (
                    <BookRow key={book.id} book={book} rank={i + 1} T={T} />
                  ))}
                </div>
              </div>
            )}

            <SectionHeader T={T} title={tab === 'Trending' ? 'All Books' : 'Browse Books'} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {filteredBooks.map(book => (
                <BookRow key={book.id} book={book} T={T} />
              ))}
            </div>
          </>
        )}

        {tab === 'Readers' && (
          <>
            <SectionHeader T={T} title="Active Readers" />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {EXPLORE_READERS.map(reader => (
                <ReaderCard key={reader.id} reader={reader} T={T} />
              ))}
            </div>
          </>
        )}

        {tab === 'Tags' && <TagsView T={T} />}
      </div>
    </div>
  );
}

function SectionHeader({ T, title }) {
  return (
    <div style={{
      fontFamily: T.sans, fontSize: 11, fontWeight: 700,
      color: T.ink4, letterSpacing: '0.6px', textTransform: 'uppercase',
      marginBottom: 10,
    }}>
      {title}
    </div>
  );
}

function BookRow({ book, rank, T }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 12,
      background: T.card, borderRadius: 12,
      padding: '12px 14px',
      border: `1px solid ${T.border}`,
    }}>
      {rank !== undefined && (
        <div style={{
          width: 24, height: 24, borderRadius: 6, flexShrink: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: T.bg3,
          fontFamily: T.sans, fontSize: 11, fontWeight: 700, color: T.ink4,
        }}>
          {rank}
        </div>
      )}
      <div style={{
        width: 40, height: 56, borderRadius: 4, flexShrink: 0,
        background: `linear-gradient(160deg, ${book.coverColor}, ${book.coverColor}88)`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: '2px 2px 8px rgba(0,0,0,0.25)',
      }}>
        <span style={{ fontSize: 18 }}>📖</span>
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontFamily: T.serif, fontSize: 14, fontWeight: 700, color: T.ink, fontStyle: 'italic', marginBottom: 2 }}>
          {book.title}
        </div>
        <div style={{ fontFamily: T.sans, fontSize: 12, color: T.ink3 }}>
          {book.author} · {book.year}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 4 }}>
          <span style={{ fontSize: 11, fontFamily: T.sans, color: T.gold }}>★ {book.rating}</span>
          <span style={{ fontSize: 10, color: T.ink4 }}>·</span>
          <span style={{ fontSize: 11, fontFamily: T.sans, color: T.ink4 }}>{book.reviews} reviews</span>
          <span style={{
            marginLeft: 4, fontSize: 10, fontFamily: T.sans, fontWeight: 600,
            color: T.teal, background: `${T.teal}15`, padding: '1px 6px', borderRadius: 4,
          }}>
            {book.genre}
          </span>
        </div>
      </div>
      <span style={{ color: T.ink4, fontSize: 14, flexShrink: 0 }}>›</span>
    </div>
  );
}

function ReaderCard({ reader, T }) {
  const lens = LENSES[reader.lens];
  const [following, setFollowing] = useState(false);

  return (
    <div style={{
      background: T.card, borderRadius: 14,
      padding: '14px', border: `1px solid ${T.border}`,
      display: 'flex', alignItems: 'center', gap: 12,
    }}>
      <Avatar initials={reader.initials} ink={reader.ink} lens={reader.lens} size={44} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontFamily: T.sans, fontSize: 14, fontWeight: 700, color: T.ink }}>
          {reader.name}
        </div>
        <div style={{ fontFamily: T.sans, fontSize: 12, color: T.ink4, marginBottom: 4 }}>
          {reader.handle}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
          <InkBadge ink={reader.ink} />
          {lens && (
            <span style={{
              fontSize: 10, fontFamily: T.sans, fontWeight: 600,
              color: lens.color, padding: '1px 6px',
              background: `${lens.color}15`, borderRadius: 4,
            }}>
              {lens.icon} {lens.label}
            </span>
          )}
        </div>
        {reader.currentlyReading && (
          <div style={{ fontSize: 11, fontFamily: T.sans, color: T.ink4, marginTop: 4, fontStyle: 'italic' }}>
            Reading: {reader.currentlyReading}
          </div>
        )}
      </div>
      <button
        onClick={() => setFollowing(!following)}
        style={{
          padding: '8px 14px', borderRadius: 20,
          border: following ? `1px solid ${T.border}` : 'none',
          background: following ? 'transparent' : T.accent,
          color: following ? T.ink3 : '#fff',
          fontFamily: T.sans, fontSize: 12, fontWeight: 700,
          cursor: 'pointer', flexShrink: 0,
          transition: 'all 0.15s',
        }}
      >
        {following ? 'Following' : 'Follow'}
      </button>
    </div>
  );
}

function TagsView({ T }) {
  const tags = [
    { label: 'Literary Fiction', count: 847, color: T.blue },
    { label: 'Personal Essay', count: 634, color: T.rose },
    { label: 'Contemporary', count: 521, color: T.teal },
    { label: 'Haunting', count: 412, color: T.plum },
    { label: 'Grief', count: 389, color: T.ink3 },
    { label: 'Magical Realism', count: 287, color: T.amber },
    { label: 'Memoir', count: 264, color: T.green },
    { label: 'Visceral', count: 198, color: T.red },
    { label: 'Translated', count: 175, color: T.gold },
    { label: 'Philosophy', count: 163, color: T.blue },
    { label: 'Quiet', count: 142, color: T.ink3 },
    { label: 'Elegiac', count: 130, color: T.rose },
  ];

  return (
    <div>
      <div style={{
        fontFamily: T.sans, fontSize: 11, fontWeight: 700,
        color: T.ink4, letterSpacing: '0.6px', textTransform: 'uppercase',
        marginBottom: 12,
      }}>
        Browse by Tag
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        {tags.map(tag => (
          <button key={tag.label} style={{
            padding: '10px 16px', borderRadius: 20,
            border: `1.5px solid ${tag.color}30`,
            background: `${tag.color}0E`,
            cursor: 'pointer', transition: 'all 0.15s',
          }}>
            <span style={{ fontFamily: T.sans, fontSize: 13, fontWeight: 600, color: tag.color }}>
              {tag.label}
            </span>
            <span style={{ fontFamily: T.sans, fontSize: 11, color: T.ink4, marginLeft: 6 }}>
              {fmtNum(tag.count)}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
