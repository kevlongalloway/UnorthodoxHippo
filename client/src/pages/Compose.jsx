import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePrecis } from '../store.jsx';
import { LENSES, GENRE_TAGS, MOOD_TAGS, POST_TYPES } from '../themes.js';
import { BOOKS } from '../data.js';
import Avatar from '../components/Avatar.jsx';
import Sheet from '../components/Sheet.jsx';

const TYPE_LIST = [
  { id: 'original', label: 'Original Work', icon: '✍', desc: 'Fiction, poetry, flash prose — your voice.' },
  { id: 'review', label: 'Review', icon: '📝', desc: 'Your honest reckoning with a book.' },
  { id: 'recommendation', label: 'Recommendation', icon: '📚', desc: 'Point someone toward a book that matters.' },
  { id: 'spoiler', label: 'Spoiler Zone', icon: '🔓', desc: 'For things you can only say after the last page.' },
];

const PLACEHOLDER = {
  original: 'Begin writing…',
  review: 'What did this book do to you?',
  recommendation: 'If you\'ve ever felt…',
  spoiler: 'Everything past the gate is fair game…',
};

export default function Compose() {
  const { theme: T, user } = usePrecis();
  const navigate = useNavigate();
  const textRef = useRef(null);

  const [type, setType] = useState('original');
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [bookSearch, setBookSearch] = useState('');
  const [selectedBook, setSelectedBook] = useState(null);
  const [spoilerPage, setSpoilerPage] = useState('');
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedMoods, setSelectedMoods] = useState([]);
  const [isPoetry, setIsPoetry] = useState(false);
  const [attested, setAttested] = useState(false);
  const [showTypeSheet, setShowTypeSheet] = useState(false);
  const [showTagSheet, setShowTagSheet] = useState(false);
  const [showBookSheet, setShowBookSheet] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [published, setPublished] = useState(false);

  const lensData = LENSES[user.lens];
  const pt = POST_TYPES[type];
  const wordCount = body.trim().split(/\s+/).filter(Boolean).length;

  const filteredBooks = bookSearch
    ? BOOKS.filter(b =>
        b.title.toLowerCase().includes(bookSearch.toLowerCase()) ||
        b.author.toLowerCase().includes(bookSearch.toLowerCase())
      )
    : BOOKS.slice(0, 6);

  const canPublish = body.trim().length > 20 &&
    (type === 'original' || !!selectedBook);

  const handlePublish = () => {
    if (!canPublish) return;
    setPublishing(true);
    setTimeout(() => {
      setPublishing(false);
      setPublished(true);
      setTimeout(() => navigate('/feed'), 1500);
    }, 1200);
  };

  useEffect(() => {
    if (textRef.current) textRef.current.focus();
  }, []);

  if (published) {
    return (
      <div className="page-content" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
        <div style={{ textAlign: 'center', animation: 'scaleIn 0.3s ease' }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>✦</div>
          <div style={{ fontFamily: T.serif, fontSize: 22, fontWeight: 700, color: T.ink, fontStyle: 'italic', marginBottom: 8 }}>
            Published
          </div>
          <div style={{ fontFamily: T.sans, fontSize: 14, color: T.ink3 }}>
            Your work is out in the world.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-content">
      {/* Header */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 12,
        padding: '14px 16px 10px',
        borderBottom: `1px solid ${T.border}`,
        position: 'sticky', top: 52, zIndex: 50,
        background: T.bg,
      }}>
        <button
          onClick={() => navigate(-1)}
          style={{ background: 'none', border: 'none', color: T.ink3, fontSize: 16, cursor: 'pointer', padding: '4px 0' }}
        >
          ← Back
        </button>
        <div style={{ flex: 1 }} />
        <button
          onClick={() => setShowTypeSheet(true)}
          style={{
            display: 'flex', alignItems: 'center', gap: 6,
            padding: '7px 12px', borderRadius: 20,
            border: `1.5px solid ${pt.color}30`,
            background: `${pt.color}10`,
            color: pt.color,
            fontFamily: T.sans, fontSize: 12, fontWeight: 700,
            cursor: 'pointer',
          }}
        >
          {pt.icon} {pt.label} ▾
        </button>
        <button
          onClick={handlePublish}
          disabled={!canPublish || publishing}
          style={{
            padding: '9px 20px', borderRadius: 20,
            border: 'none',
            background: canPublish ? `linear-gradient(135deg, ${T.accent}, ${T.accentHover})` : T.bg3,
            color: canPublish ? '#fff' : T.ink4,
            fontFamily: T.sans, fontSize: 13, fontWeight: 700,
            cursor: canPublish ? 'pointer' : 'not-allowed',
            transition: 'all 0.15s',
            minWidth: 80,
          }}
        >
          {publishing ? '…' : 'Publish'}
        </button>
      </div>

      <div style={{ padding: '16px 16px 24px' }}>
        {/* Author row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
          <Avatar initials={user.initials} ink={user.ink} lens={user.lens} size={38} />
          <div>
            <div style={{ fontFamily: T.sans, fontSize: 14, fontWeight: 700, color: T.ink }}>
              {user.name}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{
                fontSize: 10, fontFamily: T.sans, fontWeight: 600,
                color: lensData.color, padding: '1px 6px',
                background: `${lensData.color}15`, borderRadius: 4,
              }}>
                {lensData.icon} {lensData.label}
              </span>
            </div>
          </div>
        </div>

        {/* Book tag (required for review/rec/spoiler) */}
        {type !== 'original' && (
          <div style={{ marginBottom: 14 }}>
            {selectedBook ? (
              <div style={{
                display: 'flex', alignItems: 'center', gap: 10,
                padding: '10px 14px',
                background: `${T.gold}10`,
                border: `1.5px solid ${T.gold}30`,
                borderRadius: 12,
              }}>
                <div style={{
                  width: 32, height: 44, borderRadius: 3, flexShrink: 0,
                  background: `linear-gradient(160deg, ${selectedBook.coverColor}, ${selectedBook.coverColor}88)`,
                }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: T.serif, fontSize: 13, fontWeight: 700, color: T.ink, fontStyle: 'italic' }}>
                    {selectedBook.title}
                  </div>
                  <div style={{ fontFamily: T.sans, fontSize: 11, color: T.ink3 }}>
                    {selectedBook.author}
                  </div>
                </div>
                <button
                  onClick={() => setSelectedBook(null)}
                  style={{ background: 'none', border: 'none', color: T.ink4, cursor: 'pointer', fontSize: 16 }}
                >
                  ×
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowBookSheet(true)}
                style={{
                  width: '100%', padding: '12px 14px', borderRadius: 12,
                  border: `1.5px dashed ${T.border}`,
                  background: 'transparent', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', gap: 8,
                  fontFamily: T.sans, fontSize: 13, color: T.ink4,
                }}
              >
                <span style={{ fontSize: 16 }}>📚</span>
                Tag a book {type === 'review' || type === 'spoiler' ? '(required)' : '(optional)'}
              </button>
            )}
          </div>
        )}

        {/* Spoiler page */}
        {type === 'spoiler' && (
          <input
            type="number"
            value={spoilerPage}
            onChange={e => setSpoilerPage(e.target.value)}
            placeholder="Spoiler begins at page…"
            style={{
              width: '100%', padding: '10px 14px', borderRadius: 10,
              border: `1px solid ${T.border}`,
              background: T.bg2, color: T.ink,
              fontFamily: T.sans, fontSize: 13,
              outline: 'none', marginBottom: 14,
            }}
          />
        )}

        {/* Title */}
        {type === 'original' && (
          <input
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="Title (optional)"
            style={{
              width: '100%', padding: '10px 0', border: 'none',
              borderBottom: `1px solid ${T.border}`,
              background: 'transparent', color: T.ink,
              fontFamily: T.serif, fontSize: 20, fontWeight: 700,
              fontStyle: 'italic', outline: 'none', marginBottom: 14,
            }}
          />
        )}

        {/* Body */}
        <textarea
          ref={textRef}
          value={body}
          onChange={e => setBody(e.target.value)}
          placeholder={PLACEHOLDER[type]}
          style={{
            width: '100%', minHeight: 200, padding: '0',
            border: 'none', background: 'transparent', color: T.ink,
            fontFamily: isPoetry ? T.serif : T.body,
            fontSize: 16, lineHeight: isPoetry ? 1.9 : 1.75,
            outline: 'none', resize: 'none',
            fontStyle: isPoetry ? 'italic' : 'normal',
          }}
          rows={10}
        />

        {/* Word count */}
        <div style={{
          fontFamily: T.sans, fontSize: 11, color: T.ink4,
          textAlign: 'right', marginTop: 4,
        }}>
          {wordCount} words
        </div>

        {/* Tags row */}
        <div style={{
          display: 'flex', flexWrap: 'wrap', gap: 8,
          marginTop: 16, paddingTop: 14,
          borderTop: `1px solid ${T.border}`,
        }}>
          {[...selectedGenres, ...selectedMoods].map(tag => (
            <span key={tag} style={{
              padding: '5px 10px', borderRadius: 8,
              fontSize: 12, fontFamily: T.sans, fontWeight: 600,
              color: T.gold, background: `${T.gold}15`,
              border: `1px solid ${T.gold}25`,
              display: 'flex', alignItems: 'center', gap: 5,
            }}>
              {tag}
              <button
                onClick={() => {
                  setSelectedGenres(g => g.filter(x => x !== tag));
                  setSelectedMoods(m => m.filter(x => x !== tag));
                }}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: T.gold, fontSize: 13, padding: 0 }}
              >
                ×
              </button>
            </span>
          ))}
          <button
            onClick={() => setShowTagSheet(true)}
            style={{
              padding: '5px 12px', borderRadius: 8,
              border: `1.5px dashed ${T.border}`,
              background: 'transparent', cursor: 'pointer',
              fontFamily: T.sans, fontSize: 12, color: T.ink4,
            }}
          >
            + Add tags
          </button>
        </div>

        {/* Options row */}
        <div style={{
          display: 'flex', gap: 10, flexWrap: 'wrap',
          marginTop: 14, paddingTop: 14,
          borderTop: `1px solid ${T.border}`,
        }}>
          {type === 'original' && (
            <ToggleChip
              T={T}
              active={isPoetry}
              onClick={() => setIsPoetry(!isPoetry)}
              label="Poetry mode"
              icon="✦"
            />
          )}
          <ToggleChip
            T={T}
            active={attested}
            onClick={() => setAttested(!attested)}
            label="Attest"
            icon="✦"
            desc="Mark as final draft"
          />
        </div>
      </div>

      {/* Type selector sheet */}
      <Sheet open={showTypeSheet} onClose={() => setShowTypeSheet(false)} title="Post Type">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {TYPE_LIST.map(t => (
            <button
              key={t.id}
              onClick={() => { setType(t.id); setShowTypeSheet(false); }}
              style={{
                padding: '14px 16px', borderRadius: 14,
                border: `1.5px solid ${type === t.id ? POST_TYPES[t.id].color + '50' : T.border}`,
                background: type === t.id ? `${POST_TYPES[t.id].color}10` : T.bg3,
                cursor: 'pointer', textAlign: 'left', transition: 'all 0.15s',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontSize: 22 }}>{t.icon}</span>
                <div>
                  <div style={{ fontFamily: T.sans, fontSize: 14, fontWeight: 700, color: POST_TYPES[t.id].color }}>
                    {t.label}
                  </div>
                  <div style={{ fontFamily: T.sans, fontSize: 12, color: T.ink3, marginTop: 2 }}>
                    {t.desc}
                  </div>
                </div>
                {type === t.id && <span style={{ marginLeft: 'auto', color: POST_TYPES[t.id].color }}>✓</span>}
              </div>
            </button>
          ))}
        </div>
      </Sheet>

      {/* Tag selector sheet */}
      <Sheet open={showTagSheet} onClose={() => setShowTagSheet(false)} title="Add Tags">
        <div style={{ marginBottom: 20 }}>
          <div style={{ fontFamily: T.sans, fontSize: 11, fontWeight: 700, color: T.ink4, letterSpacing: '0.5px', textTransform: 'uppercase', marginBottom: 10 }}>Genre</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {[...GENRE_TAGS.fiction, ...GENRE_TAGS.nonfiction, ...GENRE_TAGS.poetry].map(tag => {
              const sel = selectedGenres.includes(tag);
              return (
                <button key={tag} onClick={() => setSelectedGenres(g => sel ? g.filter(x => x !== tag) : [...g, tag])}
                  style={{
                    padding: '7px 12px', borderRadius: 20,
                    border: `1.5px solid ${sel ? T.gold + '60' : T.border}`,
                    background: sel ? `${T.gold}15` : 'transparent',
                    cursor: 'pointer',
                    fontFamily: T.sans, fontSize: 12, fontWeight: sel ? 700 : 500,
                    color: sel ? T.gold : T.ink3,
                    transition: 'all 0.12s',
                  }}
                >
                  {tag}
                </button>
              );
            })}
          </div>
        </div>
        <div>
          <div style={{ fontFamily: T.sans, fontSize: 11, fontWeight: 700, color: T.ink4, letterSpacing: '0.5px', textTransform: 'uppercase', marginBottom: 10 }}>Mood</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {MOOD_TAGS.map(tag => {
              const sel = selectedMoods.includes(tag);
              return (
                <button key={tag} onClick={() => setSelectedMoods(m => sel ? m.filter(x => x !== tag) : [...m, tag])}
                  style={{
                    padding: '7px 12px', borderRadius: 20,
                    border: `1.5px solid ${sel ? T.rose + '60' : T.border}`,
                    background: sel ? `${T.rose}12` : 'transparent',
                    cursor: 'pointer',
                    fontFamily: T.sans, fontSize: 12, fontWeight: sel ? 700 : 500,
                    color: sel ? T.rose : T.ink3,
                    transition: 'all 0.12s',
                  }}
                >
                  {tag}
                </button>
              );
            })}
          </div>
        </div>
      </Sheet>

      {/* Book selector sheet */}
      <Sheet open={showBookSheet} onClose={() => setShowBookSheet(false)} title="Tag a Book">
        <input
          value={bookSearch}
          onChange={e => setBookSearch(e.target.value)}
          placeholder="Search by title or author…"
          style={{
            width: '100%', padding: '10px 14px', borderRadius: 10,
            border: `1px solid ${T.border}`,
            background: T.bg3, color: T.ink,
            fontFamily: T.sans, fontSize: 14,
            outline: 'none', marginBottom: 14,
          }}
        />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {filteredBooks.map(book => (
            <button
              key={book.id}
              onClick={() => { setSelectedBook(book); setShowBookSheet(false); setBookSearch(''); }}
              style={{
                display: 'flex', alignItems: 'center', gap: 12,
                padding: '10px 14px', borderRadius: 12,
                border: `1px solid ${T.border}`,
                background: T.bg3, cursor: 'pointer',
                textAlign: 'left', transition: 'all 0.15s',
              }}
            >
              <div style={{
                width: 30, height: 42, borderRadius: 3, flexShrink: 0,
                background: `linear-gradient(160deg, ${book.coverColor}, ${book.coverColor}88)`,
              }} />
              <div>
                <div style={{ fontFamily: T.serif, fontSize: 13, fontWeight: 700, color: T.ink, fontStyle: 'italic' }}>
                  {book.title}
                </div>
                <div style={{ fontFamily: T.sans, fontSize: 11, color: T.ink3 }}>
                  {book.author} · {book.year}
                </div>
              </div>
            </button>
          ))}
        </div>
      </Sheet>
    </div>
  );
}

function ToggleChip({ T, active, onClick, label, icon, desc }) {
  return (
    <button
      onClick={onClick}
      style={{
        display: 'flex', alignItems: 'center', gap: 6,
        padding: '7px 12px', borderRadius: 20,
        border: `1.5px solid ${active ? T.gold + '60' : T.border}`,
        background: active ? `${T.gold}15` : 'transparent',
        cursor: 'pointer',
        fontFamily: T.sans, fontSize: 12, fontWeight: active ? 700 : 500,
        color: active ? T.gold : T.ink3,
        transition: 'all 0.15s',
      }}
      title={desc}
    >
      <span>{icon}</span> {label}
    </button>
  );
}
