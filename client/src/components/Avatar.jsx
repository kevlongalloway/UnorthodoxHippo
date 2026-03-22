import { usePrecis } from '../store.jsx';
import { getTier, LENSES } from '../themes.js';

export default function Avatar({ initials, ink = 0, lens, size = 40 }) {
  const { theme: T } = usePrecis();
  const tier = getTier(ink);
  const lensData = lens ? LENSES[lens] : null;

  return (
    <div style={{
      width: size,
      height: size,
      borderRadius: '50%',
      flexShrink: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: T.sans,
      fontSize: Math.floor(size * 0.35),
      fontWeight: 700,
      color: T.ink2,
      background: `linear-gradient(145deg, ${T.bg3}, ${T.bg2})`,
      border: `2px solid ${lensData ? lensData.color + '60' : tier.color + '50'}`,
      boxShadow: `0 0 12px ${lensData ? lensData.color + '18' : tier.color + '10'}`,
      letterSpacing: '0.5px',
      userSelect: 'none',
    }}>
      {initials}
    </div>
  );
}
