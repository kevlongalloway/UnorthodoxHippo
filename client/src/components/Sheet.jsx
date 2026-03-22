import { useEffect } from 'react';
import { usePrecis } from '../store.jsx';

export default function Sheet({ open, onClose, title, children, height = '80vh' }) {
  const { theme: T } = usePrecis();

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  if (!open) return null;

  return (
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 300,
        display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
      }}
      onClick={onClose}
    >
      {/* Backdrop */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'rgba(0,0,0,0.6)',
        backdropFilter: 'blur(4px)',
        animation: 'fadeIn 0.2s ease',
      }} />

      {/* Sheet */}
      <div
        onClick={e => e.stopPropagation()}
        style={{
          position: 'relative',
          background: T.bg2,
          borderRadius: '20px 20px 0 0',
          maxHeight: height,
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          animation: 'slideUp 0.28s cubic-bezier(0.34,1.56,0.64,1)',
          paddingBottom: 'env(safe-area-inset-bottom, 0px)',
        }}
      >
        {/* Handle */}
        <div style={{
          width: 36, height: 4,
          borderRadius: 2,
          background: T.ink4,
          margin: '12px auto 0',
          opacity: 0.4,
          flexShrink: 0,
        }} />

        {/* Header */}
        {title && (
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '16px 20px 12px',
            borderBottom: `1px solid ${T.border}`,
            flexShrink: 0,
          }}>
            <span style={{ fontFamily: T.serif, fontSize: 17, fontWeight: 700, color: T.ink }}>
              {title}
            </span>
            <button
              onClick={onClose}
              style={{
                background: T.bg3, border: 'none', borderRadius: '50%',
                width: 30, height: 30,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: T.ink3, fontSize: 16,
              }}
            >
              ×
            </button>
          </div>
        )}

        {/* Content */}
        <div style={{ overflowY: 'auto', flex: 1, padding: '16px 20px 20px' }}>
          {children}
        </div>
      </div>
    </div>
  );
}
