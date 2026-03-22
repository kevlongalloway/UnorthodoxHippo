import { usePrecis } from '../store.jsx';
import { getTier, fmtNum } from '../themes.js';

export default function InkBadge({ ink, showCount = false, size = 'sm' }) {
  const { theme: T } = usePrecis();
  const tier = getTier(ink);
  const fontSize = size === 'lg' ? 12 : 10;
  const padding = size === 'lg' ? '4px 12px' : '2px 8px';

  return (
    <span style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: 4,
      padding,
      borderRadius: 6,
      fontSize,
      fontWeight: 700,
      fontFamily: T.sans,
      letterSpacing: '0.3px',
      color: tier.color,
      background: tier.bg,
      border: `1px solid ${tier.color}25`,
      flexShrink: 0,
    }}>
      <span style={{ fontSize: fontSize - 2, opacity: 0.8 }}>●</span>
      {showCount ? `${fmtNum(ink)} · ${tier.name}` : tier.name}
    </span>
  );
}
