import { useState } from 'react';
import { usePrecis } from '../store.jsx';
import { NOTIFICATIONS } from '../data.js';
import { getTier, fmtNum } from '../themes.js';
import Avatar from '../components/Avatar.jsx';

export default function Notifications() {
  const { theme: T } = usePrecis();
  const [notifs, setNotifs] = useState(NOTIFICATIONS);
  const unreadCount = notifs.filter(n => !n.read).length;

  const markAllRead = () => setNotifs(n => n.map(x => ({ ...x, read: true })));
  const markRead = (id) => setNotifs(n => n.map(x => x.id === id ? { ...x, read: true } : x));

  const ICONS = {
    like: { icon: '♥', color: '#C45A4A', label: 'liked' },
    comment: { icon: '💬', color: '#5A8AB4', label: 'commented on' },
    shelf: { icon: '▤', color: '#4EA8A0', label: 'shelved' },
    follow: { icon: '◉', color: '#9A70A0', label: 'followed you' },
    repost: { icon: '↗', color: '#6A9A60', label: 'reposted' },
    ink: { icon: '✦', color: '#D4A855', label: 'Ink earned' },
    waypoint: { icon: '📍', color: '#C47232', label: 'set a waypoint in' },
  };

  return (
    <div className="page-content">
      {/* Header */}
      <div style={{
        padding: '16px 16px 12px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        borderBottom: `1px solid ${T.border}`,
      }}>
        <div>
          <h2 style={{ fontFamily: T.serif, fontSize: 20, fontWeight: 700, color: T.ink, fontStyle: 'italic' }}>
            Notifications
          </h2>
          {unreadCount > 0 && (
            <div style={{ fontFamily: T.sans, fontSize: 12, color: T.ink4, marginTop: 2 }}>
              {unreadCount} unread
            </div>
          )}
        </div>
        {unreadCount > 0 && (
          <button
            onClick={markAllRead}
            style={{
              padding: '7px 14px', borderRadius: 20,
              border: `1px solid ${T.border}`, background: 'transparent',
              fontFamily: T.sans, fontSize: 12, fontWeight: 600,
              color: T.ink3, cursor: 'pointer',
            }}
          >
            Mark all read
          </button>
        )}
      </div>

      {/* Notification list */}
      <div>
        {notifs.map((n, i) => {
          const info = ICONS[n.type] || ICONS.like;
          return (
            <div
              key={n.id}
              onClick={() => markRead(n.id)}
              style={{
                display: 'flex', alignItems: 'flex-start', gap: 12,
                padding: '14px 16px',
                background: n.read ? 'transparent' : `${info.color}07`,
                borderBottom: `1px solid ${T.border}`,
                cursor: 'pointer',
                transition: 'background 0.15s',
                position: 'relative',
              }}
            >
              {/* Unread dot */}
              {!n.read && (
                <div style={{
                  position: 'absolute', left: 6, top: '50%', transform: 'translateY(-50%)',
                  width: 6, height: 6, borderRadius: '50%',
                  background: info.color,
                }} />
              )}

              {/* Icon */}
              <div style={{
                width: 36, height: 36, borderRadius: '50%', flexShrink: 0,
                background: `${info.color}18`,
                border: `1.5px solid ${info.color}30`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 15,
              }}>
                {info.icon}
              </div>

              <div style={{ flex: 1, minWidth: 0 }}>
                {n.type === 'ink' ? (
                  <div>
                    <div style={{ fontFamily: T.sans, fontSize: 14, fontWeight: 700, color: T.gold, marginBottom: 2 }}>
                      +{n.amount} Ink {fmtNum(n.amount)}
                    </div>
                    <div style={{ fontFamily: T.sans, fontSize: 13, color: T.ink3, lineHeight: 1.4 }}>
                      {n.reason}
                    </div>
                  </div>
                ) : (
                  <div>
                    <div style={{ fontFamily: T.sans, fontSize: 14, color: T.ink, lineHeight: 1.4 }}>
                      <span style={{ fontWeight: 700 }}>{n.actor?.name}</span>
                      {' '}
                      <span style={{ color: T.ink3 }}>{info.label}</span>
                      {' '}
                      {n.postTitle && <span style={{ fontStyle: 'italic', fontFamily: T.serif }}>"{n.postTitle}"</span>}
                      {n.bookTitle && <span style={{ fontStyle: 'italic', fontFamily: T.serif }}>"{n.bookTitle}"</span>}
                      {n.shelfName && <span style={{ color: T.ink3 }}> → <span style={{ fontStyle: 'italic' }}>{n.shelfName}</span></span>}
                    </div>
                    {n.preview && (
                      <div style={{
                        fontFamily: T.body, fontSize: 13, color: T.ink3,
                        marginTop: 4, fontStyle: 'italic', lineHeight: 1.4,
                        borderLeft: `2px solid ${T.border}`, paddingLeft: 8,
                      }}>
                        "{n.preview}"
                      </div>
                    )}
                    {n.page && (
                      <div style={{ fontFamily: T.sans, fontSize: 11, color: T.ink4, marginTop: 3 }}>
                        Page {n.page}
                      </div>
                    )}
                  </div>
                )}
                <div style={{ fontFamily: T.sans, fontSize: 11, color: T.ink4, marginTop: 4 }}>
                  {n.timeAgo}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {notifs.length === 0 && (
        <div style={{ textAlign: 'center', padding: '60px 20px', color: T.ink4 }}>
          <div style={{ fontSize: 36, marginBottom: 12, opacity: 0.4 }}>◆</div>
          <div style={{ fontFamily: T.serif, fontSize: 18, fontStyle: 'italic', color: T.ink3, marginBottom: 6 }}>
            All quiet
          </div>
          <div style={{ fontFamily: T.sans, fontSize: 13, color: T.ink4 }}>
            Your notifications will appear here.
          </div>
        </div>
      )}
    </div>
  );
}
