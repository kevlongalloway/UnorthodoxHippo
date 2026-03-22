import { useState, useRef, useEffect } from 'react';
import { usePrecis } from '../store.jsx';
import { CONVERSATIONS } from '../data.js';
import Avatar from '../components/Avatar.jsx';
import InkBadge from '../components/InkBadge.jsx';

export default function Messages() {
  const { theme: T } = usePrecis();
  const [conversations, setConversations] = useState(CONVERSATIONS);
  const [activeConv, setActiveConv] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef(null);

  const totalUnread = conversations.reduce((sum, c) => sum + c.unread, 0);

  const sendMessage = () => {
    if (!newMessage.trim() || !activeConv) return;
    const text = newMessage.trim();
    setConversations(convs => convs.map(c => {
      if (c.id !== activeConv.id) return c;
      return {
        ...c,
        unread: 0,
        lastMessage: { text, timeAgo: 'now', mine: true },
        messages: [...c.messages, { id: `m${Date.now()}`, mine: true, text, timeAgo: 'now' }],
      };
    }));
    setActiveConv(prev => ({
      ...prev,
      messages: [...prev.messages, { id: `m${Date.now()}`, mine: true, text, timeAgo: 'now' }],
    }));
    setNewMessage('');
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeConv?.messages?.length]);

  if (activeConv) {
    return (
      <div style={{
        display: 'flex', flexDirection: 'column',
        height: 'calc(100vh - 52px - 64px)',
        maxWidth: 640, margin: '0 auto',
      }}>
        {/* Conversation header */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 12,
          padding: '12px 16px',
          borderBottom: `1px solid ${T.border}`,
          background: T.bg,
          flexShrink: 0,
        }}>
          <button
            onClick={() => setActiveConv(null)}
            style={{ background: 'none', border: 'none', color: T.ink3, fontSize: 20, cursor: 'pointer', padding: '2px 6px 2px 0' }}
          >
            ←
          </button>
          <Avatar initials={activeConv.with.initials} ink={activeConv.with.ink} size={38} />
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: T.sans, fontSize: 14, fontWeight: 700, color: T.ink }}>
              {activeConv.with.name}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
              {activeConv.with.online && (
                <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#6A9A60', display: 'inline-block' }} />
              )}
              <span style={{ fontFamily: T.sans, fontSize: 11, color: T.ink4 }}>
                {activeConv.with.online ? 'Active now' : 'Offline'}
              </span>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '16px', display: 'flex', flexDirection: 'column', gap: 10 }}>
          {activeConv.messages.map(msg => (
            <div key={msg.id} style={{
              display: 'flex',
              justifyContent: msg.mine ? 'flex-end' : 'flex-start',
              alignItems: 'flex-end', gap: 8,
            }}>
              {!msg.mine && (
                <Avatar initials={activeConv.with.initials} ink={activeConv.with.ink} size={28} />
              )}
              <div style={{
                maxWidth: '75%',
                padding: '10px 14px',
                borderRadius: msg.mine ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                background: msg.mine ? `linear-gradient(135deg, ${T.accent}, ${T.accentHover})` : T.card,
                border: msg.mine ? 'none' : `1px solid ${T.border}`,
                boxShadow: msg.mine ? `0 2px 10px ${T.accent}30` : 'none',
              }}>
                <div style={{
                  fontFamily: T.body, fontSize: 14, lineHeight: 1.55,
                  color: msg.mine ? '#fff' : T.ink,
                }}>
                  {msg.text}
                </div>
                <div style={{
                  fontFamily: T.sans, fontSize: 10, marginTop: 4,
                  color: msg.mine ? 'rgba(255,255,255,0.6)' : T.ink4,
                  textAlign: msg.mine ? 'right' : 'left',
                }}>
                  {msg.timeAgo}
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div style={{
          padding: '10px 12px',
          borderTop: `1px solid ${T.border}`,
          background: T.bg,
          display: 'flex', gap: 8, alignItems: 'flex-end',
          flexShrink: 0,
        }}>
          <div style={{
            flex: 1, display: 'flex', alignItems: 'center',
            background: T.bg2, borderRadius: 22,
            border: `1px solid ${T.border}`,
            padding: '8px 14px', minHeight: 44,
          }}>
            <textarea
              value={newMessage}
              onChange={e => setNewMessage(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); }
              }}
              placeholder="Write a message…"
              style={{
                flex: 1, background: 'none', border: 'none', outline: 'none',
                fontFamily: T.body, fontSize: 14, color: T.ink,
                resize: 'none', maxHeight: 100, lineHeight: 1.4,
              }}
              rows={1}
            />
          </div>
          <button
            onClick={sendMessage}
            disabled={!newMessage.trim()}
            style={{
              width: 44, height: 44, borderRadius: '50%', border: 'none', flexShrink: 0,
              background: newMessage.trim() ? `linear-gradient(135deg, ${T.accent}, ${T.accentHover})` : T.bg3,
              color: newMessage.trim() ? '#fff' : T.ink4,
              cursor: newMessage.trim() ? 'pointer' : 'not-allowed',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 18, transition: 'all 0.15s',
            }}
          >
            ↑
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="page-content">
      {/* Header */}
      <div style={{ padding: '16px 16px 12px', borderBottom: `1px solid ${T.border}` }}>
        <h2 style={{ fontFamily: T.serif, fontSize: 20, fontWeight: 700, color: T.ink, fontStyle: 'italic' }}>
          Messages
          {totalUnread > 0 && (
            <span style={{
              marginLeft: 10, fontSize: 12,
              padding: '2px 8px', borderRadius: 10,
              background: T.accent, color: '#fff',
              fontFamily: T.sans, fontWeight: 700, fontStyle: 'normal',
            }}>
              {totalUnread}
            </span>
          )}
        </h2>
      </div>

      {/* Conversation list */}
      <div>
        {conversations.map(conv => (
          <button
            key={conv.id}
            onClick={() => { setActiveConv(conv); setConversations(cs => cs.map(c => c.id === conv.id ? { ...c, unread: 0 } : c)); }}
            style={{
              width: '100%', padding: '14px 16px',
              display: 'flex', alignItems: 'center', gap: 12,
              background: conv.unread > 0 ? `${T.gold}06` : 'transparent',
              border: 'none', borderBottom: `1px solid ${T.border}`,
              cursor: 'pointer', textAlign: 'left', transition: 'background 0.15s',
            }}
          >
            <div style={{ position: 'relative', flexShrink: 0 }}>
              <Avatar initials={conv.with.initials} ink={conv.with.ink} size={46} />
              {conv.with.online && (
                <div style={{
                  position: 'absolute', bottom: 1, right: 1,
                  width: 10, height: 10, borderRadius: '50%',
                  background: '#6A9A60', border: `2px solid ${T.bg}`,
                }} />
              )}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 4 }}>
                <span style={{
                  fontFamily: T.sans, fontSize: 14,
                  fontWeight: conv.unread > 0 ? 700 : 600,
                  color: T.ink,
                }}>
                  {conv.with.name}
                </span>
                <span style={{ fontFamily: T.sans, fontSize: 11, color: T.ink4, flexShrink: 0, marginLeft: 8 }}>
                  {conv.lastMessage.timeAgo}
                </span>
              </div>
              <div style={{
                fontFamily: T.body, fontSize: 13,
                color: conv.unread > 0 ? T.ink2 : T.ink4,
                fontWeight: conv.unread > 0 ? 500 : 400,
                overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
              }}>
                {conv.lastMessage.mine ? 'You: ' : ''}{conv.lastMessage.text}
              </div>
            </div>
            {conv.unread > 0 && (
              <div style={{
                width: 20, height: 20, borderRadius: '50%', flexShrink: 0,
                background: T.accent,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: T.sans, fontSize: 10, fontWeight: 700, color: '#fff',
              }}>
                {conv.unread}
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
