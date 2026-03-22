import { usePrecis } from "../store.jsx";

export default function GlobalStyles() {
  const { T } = usePrecis();
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600&family=Source+Serif+4:ital,opsz,wght@0,8..60,300;0,8..60,400;0,8..60,500;1,8..60,300;1,8..60,400&family=Outfit:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap');

      *,*::before,*::after { box-sizing: border-box; margin: 0; padding: 0; }
      html { -webkit-text-size-adjust: 100%; }
      body {
        background: ${T.bg} !important;
        color: ${T.text};
        font-family: ${T.ui};
        min-height: 100vh;
        overflow-x: hidden;
        -webkit-tap-highlight-color: transparent;
        -webkit-font-smoothing: antialiased;
        transition: background 0.25s ease, color 0.25s ease;
      }
      ::selection { background: ${T.gold}30; color: ${T.text}; }
      ::-webkit-scrollbar { width: 0; height: 0; }
      input, textarea, button { font-family: inherit; }
      a { text-decoration: none; color: inherit; }
      *:focus-visible { outline: 2px solid ${T.gold}; outline-offset: 2px; border-radius: 4px; }

      @keyframes enter  { from { opacity:0; transform:translateY(6px) } to { opacity:1; transform:translateY(0) } }
      @keyframes fadeIn { from { opacity:0 } to { opacity:1 } }
      @keyframes scaleIn { from { opacity:0; transform:scale(.97) } to { opacity:1; transform:scale(1) } }
      @keyframes slideUp { from { transform:translateY(100%) } to { transform:translateY(0) } }
      @keyframes pop { 0%{transform:scale(1)} 50%{transform:scale(1.25)} 100%{transform:scale(1)} }

      /* Touch-friendly tap state */
      .tb { -webkit-tap-highlight-color:transparent; touch-action:manipulation; }
      .tb:active { opacity:.7; transform:scale(.97); }

      /* Card hover (desktop only via media query) */
      .cl { transition: border-color .2s, box-shadow .15s; }

      /* Layout helpers */
      .mh { display:flex !important; }
      .dh { display:none !important; }
      .bb { display:flex !important; }

      /* Feed max-width */
      .fw { padding-bottom:0; max-width:680px; margin:0 auto; }

      /* Feed/sidebar split — desktop only */
      .fs { display:block !important; }
      .sd { display:none !important; }

      @media (min-width:768px) {
        .mh { display:flex !important; }
        .dh { display:flex !important; }
        .bb { display:none !important; }
        .fw { padding-bottom:0; }
        .fs { display:grid !important; grid-template-columns:1fr 300px; gap:24px; max-width:1040px; margin:0 auto; align-items:start; }
        .sd { display:flex !important; }
        .cl:hover { border-color:${T.borderActive}; box-shadow:${T.shadow}; transform:translateY(-1px); }
      }

      @media (max-width:767px) {
        .dh { display:none !important; }
        .sd { display:none !important; }
        .fs { display:block !important; }
      }

      @media (prefers-reduced-motion: reduce) {
        *, *::before, *::after { animation-duration:0.01ms !important; transition-duration:0.01ms !important; }
      }
    `}</style>
  );
}
