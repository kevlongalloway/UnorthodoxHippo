import { useState } from 'react';
import { usePrecis } from '../store.jsx';
import { SHELVES, BOOKS } from '../data.js';
import { fmtN } from '../themes.js';
import Sheet from '../components/Sheet.jsx';

const SHELF_TABS = ['My Shelves', 'Currently Reading', 'Want to Read', 'Finished'];

export default function Shelf() {
  const { T } = usePrecis();
  const [tab, setTab] = useState('My Shelves');
  const [newShelfOpen, setNewShelfOpen] = useState(false);
  const [newShelfName, setNewShelfName] = useState('');
  const [shelves, setShelves] = useState(SHELVES);

  const readingBooks = BOOKS.slice(0, 2);
  const wantBooks = BOOKS.slice(2, 6);
  const finishedBooks = BOOKS.slice(6, 10);

  const createShelf = () => {
    if (!newShelfName.trim()) return;
    setShelves(s => [...s, {
      id: `s${Date.now()}`, name: newShelfName,
      desc: '', count: 0, followers: 0, books: [],
      curator: { name: 'Priya Anand', initials: 'PA', ink: 12300 },
    }]);
    setNewShelfName('');
    setNewShelfOpen(false);
  };

  return (
    <div className="page-content">
      {/* Header */}
      <div style={{ padding: '16px 16px 12px', borderBottom: `1px solid ${T.border}` }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h2 style={{ fontFamily: T.hd, fontSize: 20, fontWeight: 700, color: T.text, fontStyle: 'italic' }}>
            Shelf
          </h2>
          <button
            onClick={() => setNewShelfOpen(true)}
            style={{
              padding: '8px 16px', borderRadius: 20,
              border: 'none', background: T.accent,
              fontFamily: T.ui, fontSize: 12, fontWeight: 700,
              color: '#fff', cursor: 'pointer',
            }}
          >
            + New Shelf
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="scroll-x" style={{ padding: '10px 16px', display: 'flex', gap: 8 }}>
        {SHELF_TABS.map(t => (
          <button key={t} onClick={() => setTab(t)} style={{
            padding: '7px 14px', borderRadius: 20,
            border: 'none', cursor: 'pointer', whiteSpace: 'nowrap',
            background: tab === t ? T.gold : T.bg3,
            color: tab === t ? (T.id === 'twilight' || T.id === 'stone' ? T.bg : '#fff') : T.text3,
            fontFamily: T.ui, fontSize: 12, fontWeight: 600,
            transition: 'all 0.15s',
          }}>
            {t}
          </button>
        ))}
      </div>

      <div style={{ padding: '0 16px' }}>
        {tab === 'My Shelves' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {shelves.map(shelf => <CuratedShelf key={shelf.id} shelf={shelf} T={T} />)}
          </div>
        )}

        {tab === 'Currently Reading' && (
          <BookList books={readingBooks} T={T} showProgress />
        )}

        {tab === 'Want to Read' && (
          <BookList books={wantBooks} T={T} />
        )}

        {tab === 'Finished' && (
          <BookList books={finishedBooks} T={T} showRating />
        )}
      </div>

      {/* New shelf sheet */}
      <Sheet open={newShelfOpen} onClose={() => setNewShelfOpen(false)} title="Create New Shelf">
        <div>
          <input
            value={newShelfName}
            onChange={e => setNewShelfName(e.target.value)}
            placeholder="Shelf name…"
            style={{
              width: '100%', padding: '12px 14px', borderRadius: 12,
              border: `1px solid ${T.border}`,
              background: T.bg3, color: T.text,
              fontFamily: T.hd, fontSize: 16, fontStyle: 'italic',
              outline: 'none', marginBottom: 12,
            }}
          />
          <textarea
            placeholder="Add a description (optional)…"
            style={{
              width: '100%', padding: '12px 14px', borderRadius: 12,
              border: `1px solid ${T.border}`,
              background: T.bg3, color: T.text,
              fontFamily: T.body, fontSize: 14,
              outline: 'none', resize: 'none', marginBottom: 16,
            }}
            rows={3}
          />
          <button
            onClick={createShelf}
            disabled={!newShelfName.trim()}
            style={{
              width: '100%', padding: '14px', borderRadius: 12,
              border: 'none',
              background: newShelfName.trim() ? `linear-gradient(135deg, ${T.accent}, ${T.accentHover})` : T.bg3,
              color: newShelfName.trim() ? '#fff' : T.text4,
              fontFamily: T.ui, fontSize: 14, fontWeight: 700,
              cursor: newShelfName.trim() ? 'pointer' : 'not-allowed',
            }}
          >
            Create Shelf
          </button>
        </div>
      </Sheet>
    </div>
  );
}

function CuratedShelf({ shelf, T }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div style={{
      background: T.surface, borderRadius: 16,
      border: `1px solid ${T.border}`, overflow: 'hidden',
    }}>
      <button
        onClick={() => setExpanded(!expanded)}
        style={{
          width: '100%', padding: '16px', border: 'none', background: 'transparent',
          cursor: 'pointer', textAlign: 'left',
          display: 'flex', alignItems: 'flex-start', gap: 12,
        }}
      >
        <div style={{
          width: 48, height: 48, borderRadius: 10, flexShrink: 0,
          background: `linear-gradient(135deg, ${T.bg3}, ${T.bg2})`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 22,
        }}>
          ▤
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontFamily: T.hd, fontSize: 16, fontWeight: 700, color: T.text, fontStyle: 'italic', marginBottom: 4 }}>
            {shelf.name}
          </div>
          {shelf.desc && (
            <div style={{ fontFamily: T.body, fontSize: 13, color: T.text3, lineHeight: 1.4 }}>
              {shelf.desc}
            </div>
          )}
          <div style={{ fontFamily: T.ui, fontSize: 11, color: T.text4, marginTop: 4 }}>
            {shelf.count} entries · {fmtN(shelf.followers)} followers
          </div>
        </div>
        <span style={{ color: T.text4, fontSize: 16, flexShrink: 0, marginTop: 2 }}>
          {expanded ? '▴' : '▾'}
        </span>
      </button>

      {expanded && shelf.books.length > 0 && (
        <div style={{ padding: '0 16px 16px', borderTop: `1px solid ${T.border}` }}>
          <div style={{ paddingTop: 12, display: 'flex', flexDirection: 'column', gap: 8 }}>
            {shelf.books.map((b, i) => (
              <div key={i} style={{
                padding: '8px 0',
                borderBottom: i < shelf.books.length - 1 ? `1px solid ${T.border}` : 'none',
                fontFamily: T.hd, fontSize: 13, fontStyle: 'italic', color: T.text2,
                display: 'flex', alignItems: 'center', gap: 8,
              }}>
                <span style={{ color: T.text4, fontSize: 11, fontFamily: T.ui, fontStyle: 'normal', flexShrink: 0 }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                {b}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function BookList({ books, T, showProgress, showRating }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      {books.map(book => (
        <div key={book.id} style={{
          display: 'flex', alignItems: 'center', gap: 12,
          background: T.surface, borderRadius: 12, padding: '12px 14px',
          border: `1px solid ${T.border}`,
        }}>
          <div style={{
            width: 40, height: 56, borderRadius: 4, flexShrink: 0,
            background: `linear-gradient(160deg, ${book.coverColor}, ${book.coverColor}88)`,
            boxShadow: '2px 2px 8px rgba(0,0,0,0.2)',
          }} />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontFamily: T.hd, fontSize: 14, fontWeight: 700, color: T.text, fontStyle: 'italic', marginBottom: 2 }}>
              {book.title}
            </div>
            <div style={{ fontFamily: T.ui, fontSize: 12, color: T.text3 }}>
              {book.author}
            </div>
            {showProgress && (
              <div style={{ marginTop: 6 }}>
                <div style={{ height: 4, background: T.bg3, borderRadius: 2, overflow: 'hidden' }}>
                  <div style={{
                    width: '45%', height: '100%',
                    background: `linear-gradient(90deg, ${T.gold}, ${T.accent})`,
                    borderRadius: 2,
                  }} />
                </div>
                <div style={{ fontFamily: T.ui, fontSize: 10, color: T.gold, marginTop: 2 }}>45%</div>
              </div>
            )}
            {showRating && (
              <div style={{ fontFamily: T.ui, fontSize: 12, color: T.gold, marginTop: 4 }}>
                ★ {book.rating}
              </div>
            )}
          </div>
          <button style={{
            background: 'none', border: 'none', color: T.text4, cursor: 'pointer', fontSize: 18,
          }}>⋯</button>
        </div>
      ))}
    </div>
  );
}
