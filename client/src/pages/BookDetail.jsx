import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePrecis } from '../store.jsx';
import { BOOKS, FEED_ITEMS as POSTS } from '../data.js';
import { fmtN } from '../themes.js';
import PostCard from '../components/PostCard.jsx';

const BOOK_TABS = ['About', 'Reviews', 'Discussions', 'Waypoints'];

export default function BookDetail() {
  const { T } = usePrecis();
  const navigate = useNavigate();
  const [tab, setTab] = useState('About');
  const [reading, setReading] = useState(false);
  const [wanted, setWanted] = useState(false);

  // Use first book as sample
  const book = BOOKS[0];
  const bookPosts = POSTS.filter(p => p.bookRef?.title === book.title).slice(0, 4);

  return (
    <div className="page-content">
      {/* Back button */}
      <div style={{ padding: '12px 16px 0' }}>
        <button
          onClick={() => navigate(-1)}
          style={{ background: 'none', border: 'none', color: T.text3, fontSize: 14, cursor: 'pointer', padding: 0 }}
        >
          ← Back
        </button>
      </div>

      {/* Book header */}
      <div style={{
        padding: '16px',
        display: 'flex', gap: 16, alignItems: 'flex-start',
      }}>
        <div style={{
          width: 80, height: 112, borderRadius: 8, flexShrink: 0,
          background: `linear-gradient(160deg, ${book.coverColor}, ${book.coverColor}88)`,
          boxShadow: '4px 4px 16px rgba(0,0,0,0.35)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 28,
        }}>
          📖
        </div>
        <div style={{ flex: 1 }}>
          <h1 style={{ fontFamily: T.hd, fontSize: 22, fontWeight: 800, color: T.text, fontStyle: 'italic', lineHeight: 1.2, marginBottom: 6 }}>
            {book.title}
          </h1>
          <div style={{ fontFamily: T.ui, fontSize: 14, color: T.text3, marginBottom: 6 }}>
            {book.author}
          </div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 10 }}>
            <span style={{ fontFamily: T.ui, fontSize: 12, color: T.gold }}>★ {book.rating}</span>
            <span style={{ fontFamily: T.ui, fontSize: 12, color: T.text4 }}>·</span>
            <span style={{ fontFamily: T.ui, fontSize: 12, color: T.text4 }}>{book.year}</span>
            <span style={{ fontFamily: T.ui, fontSize: 12, color: T.text4 }}>·</span>
            <span style={{ fontFamily: T.ui, fontSize: 12, color: T.text4 }}>{book.pages} pages</span>
          </div>
          <span style={{
            fontSize: 11, fontFamily: T.ui, fontWeight: 600,
            color: T.teal, padding: '3px 8px',
            background: `${T.teal}15`, borderRadius: 6,
          }}>
            {book.genre}
          </span>
        </div>
      </div>

      {/* Action buttons */}
      <div style={{ padding: '0 16px 16px', display: 'flex', gap: 8 }}>
        <button
          onClick={() => setReading(!reading)}
          style={{
            flex: 1, padding: '11px', borderRadius: 10,
            border: reading ? `1px solid ${T.border}` : 'none',
            background: reading ? 'transparent' : `linear-gradient(135deg, ${T.accent}, ${T.accentHover})`,
            color: reading ? T.text3 : '#fff',
            fontFamily: T.ui, fontSize: 13, fontWeight: 700,
            cursor: 'pointer', transition: 'all 0.15s',
          }}
        >
          {reading ? '📖 Reading' : '+ Reading'}
        </button>
        <button
          onClick={() => setWanted(!wanted)}
          style={{
            flex: 1, padding: '11px', borderRadius: 10,
            border: `1px solid ${wanted ? T.gold + '60' : T.border}`,
            background: wanted ? `${T.gold}12` : 'transparent',
            color: wanted ? T.gold : T.text3,
            fontFamily: T.ui, fontSize: 13, fontWeight: 700,
            cursor: 'pointer', transition: 'all 0.15s',
          }}
        >
          {wanted ? '✦ Want to Read' : '◇ Want to Read'}
        </button>
        <button
          onClick={() => navigate('/compose')}
          style={{
            padding: '11px 16px', borderRadius: 10,
            border: `1px solid ${T.border}`,
            background: 'transparent', color: T.text3,
            fontFamily: T.ui, fontSize: 13, fontWeight: 700,
            cursor: 'pointer',
          }}
        >
          ✍ Review
        </button>
      </div>

      {/* Stats row */}
      <div style={{
        margin: '0 16px 16px',
        padding: '12px', borderRadius: 12,
        background: T.bg3, border: `1px solid ${T.border}`,
        display: 'flex',
      }}>
        {[
          { label: 'Reviews', value: book.reviews },
          { label: 'On Shelf', value: 847 },
          { label: 'Readers', value: 2341 },
          { label: 'Waypoints', value: 34 },
        ].map((stat, i) => (
          <div key={stat.label} style={{
            flex: 1, textAlign: 'center',
            borderLeft: i > 0 ? `1px solid ${T.border}` : 'none',
          }}>
            <div style={{ fontFamily: T.ui, fontSize: 16, fontWeight: 800, color: T.text }}>
              {fmtN(stat.value)}
            </div>
            <div style={{ fontFamily: T.ui, fontSize: 10, color: T.text4, marginTop: 1 }}>
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="scroll-x" style={{
        padding: '0 16px', display: 'flex', gap: 8, marginBottom: 12,
        borderBottom: `1px solid ${T.border}`, paddingBottom: 12,
      }}>
        {BOOK_TABS.map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            style={{
              padding: '8px 14px', borderRadius: 20,
              border: 'none', cursor: 'pointer', whiteSpace: 'nowrap',
              background: tab === t ? T.accent : T.bg3,
              color: tab === t ? '#fff' : T.text3,
              fontFamily: T.ui, fontSize: 12, fontWeight: 600,
              transition: 'all 0.15s',
            }}
          >
            {t}
          </button>
        ))}
      </div>

      <div style={{ padding: '0 16px' }}>
        {tab === 'About' && (
          <div>
            <p style={{ fontFamily: T.body, fontSize: 14.5, color: T.text2, lineHeight: 1.75, marginBottom: 16 }}>
              A moving and harrowing tale of a former slave woman, living in post-Civil War Ohio, who is haunted by the ghost of her dead daughter. Winner of the Pulitzer Prize for Fiction in 1988.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {[
                { label: 'Published', value: `${book.year} · Alfred A. Knopf` },
                { label: 'Pages', value: `${book.pages}` },
                { label: 'Genre', value: book.genre },
                { label: 'Language', value: 'English' },
                { label: 'ISBN', value: '978-1-4000-3341-6' },
              ].map(({ label, value }) => (
                <div key={label} style={{ display: 'flex', gap: 12, padding: '8px 0', borderBottom: `1px solid ${T.border}` }}>
                  <span style={{ fontFamily: T.ui, fontSize: 12, color: T.text4, width: 90, flexShrink: 0 }}>{label}</span>
                  <span style={{ fontFamily: T.ui, fontSize: 13, color: T.text }}>{value}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === 'Reviews' && (
          <div>
            {bookPosts.filter(p => p.type === 'review').length === 0 ? (
              <div style={{ textAlign: 'center', padding: '40px 20px', color: T.text4, fontStyle: 'italic', fontFamily: T.hd }}>
                No reviews yet. Be the first.
              </div>
            ) : (
              bookPosts.filter(p => p.type === 'review').map(post => (
                <PostCard key={post.id} post={post} />
              ))
            )}
          </div>
        )}

        {tab === 'Discussions' && (
          <div>
            {bookPosts.map(post => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )}

        {tab === 'Waypoints' && (
          <div>
            {[
              { page: 68, text: 'The haunting shifts from supernatural to psychological here — Sethe\'s internal fragmentation mirrors the house\'s.', lens: 'empath', author: 'Priya Anand', initials: 'PA' },
              { page: 184, text: 'Morrison\'s sentence structure literally breaks apart when Beloved speaks. The form IS the content.', lens: 'analyst', author: 'Kofi Asante', initials: 'KA' },
              { page: 250, text: 'The question of whether memory is burden or survival tool becomes impossible to answer here.', lens: 'philosopher', author: 'Elena Vasquez', initials: 'EV' },
            ].map((wp, i) => (
              <div key={i} style={{
                background: T.surface, borderRadius: 12, padding: '14px',
                border: `1px solid ${T.border}`, marginBottom: 10,
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                  <div style={{
                    padding: '3px 10px', borderRadius: 20,
                    background: `${T.gold}18`, border: `1px solid ${T.gold}30`,
                    fontFamily: T.ui, fontSize: 11, fontWeight: 700, color: T.gold,
                  }}>
                    p. {wp.page}
                  </div>
                  <span style={{ fontFamily: T.ui, fontSize: 12, fontWeight: 700, color: T.text }}>
                    {wp.author}
                  </span>
                </div>
                <p style={{ fontFamily: T.body, fontSize: 13, color: T.text2, lineHeight: 1.6, fontStyle: 'italic' }}>
                  "{wp.text}"
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
