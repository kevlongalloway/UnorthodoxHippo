import { usePrecis } from '../store.jsx';

export default function GlobalStyles() {
  const { theme: T } = usePrecis();
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,800;1,400;1,700&family=Source+Serif+4:ital,opsz,wght@0,8..60,300;0,8..60,400;0,8..60,600;1,8..60,300;1,8..60,400&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&display=swap');

      *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

      html {
        font-size: 16px;
        -webkit-text-size-adjust: 100%;
      }

      body {
        background: ${T.bg};
        color: ${T.ink};
        font-family: ${T.sans};
        min-height: 100vh;
        overflow-x: hidden;
        -webkit-font-smoothing: antialiased;
        transition: background 0.3s ease, color 0.3s ease;
      }

      ::selection { background: ${T.gold}33; color: ${T.ink}; }

      ::-webkit-scrollbar { width: 4px; height: 4px; }
      ::-webkit-scrollbar-track { background: transparent; }
      ::-webkit-scrollbar-thumb { background: ${T.ink4}; border-radius: 2px; }

      button { cursor: pointer; font-family: inherit; }
      input, textarea { font-family: inherit; }
      a { text-decoration: none; color: inherit; }

      *:focus-visible {
        outline: 2px solid ${T.gold};
        outline-offset: 2px;
        border-radius: 4px;
      }

      @keyframes fadeUp {
        from { opacity: 0; transform: translateY(12px); }
        to { opacity: 1; transform: translateY(0); }
      }
      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }
      @keyframes slideUp {
        from { transform: translateY(100%); }
        to { transform: translateY(0); }
      }
      @keyframes scaleIn {
        from { opacity: 0; transform: scale(0.95); }
        to { opacity: 1; transform: scale(1); }
      }
      @keyframes pop {
        0% { transform: scale(1); }
        50% { transform: scale(1.25); }
        100% { transform: scale(1); }
      }
      @keyframes shimmer {
        0% { background-position: -200% 0; }
        100% { background-position: 200% 0; }
      }
      @keyframes pulseGold {
        0%, 100% { box-shadow: 0 0 0 0 ${T.gold}40; }
        50% { box-shadow: 0 0 0 8px ${T.gold}00; }
      }

      .fade-up { animation: fadeUp 0.22s ease both; }
      .fade-in { animation: fadeIn 0.2s ease both; }

      .page-content {
        max-width: 640px;
        margin: 0 auto;
        padding: 0 0 80px 0;
        min-height: 100vh;
      }

      .scroll-x {
        overflow-x: auto;
        -webkit-overflow-scrolling: touch;
        scrollbar-width: none;
      }
      .scroll-x::-webkit-scrollbar { display: none; }

      @media (prefers-reduced-motion: reduce) {
        *, *::before, *::after {
          animation-duration: 0.01ms !important;
          transition-duration: 0.01ms !important;
        }
      }

      /* Safe area support */
      .safe-bottom { padding-bottom: env(safe-area-inset-bottom, 0px); }
      .safe-top { padding-top: env(safe-area-inset-top, 0px); }
    `}</style>
  );
}
