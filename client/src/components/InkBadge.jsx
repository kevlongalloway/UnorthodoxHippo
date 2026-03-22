import { getTier, fmtN } from "../themes.js";

export default function InkBadge({ T, ink, compact }) {
  const t = getTier(ink);
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 3,
      padding: compact ? "1px 5px" : "2px 7px",
      borderRadius: 4, fontSize: compact ? 9 : 10, fontWeight: 600,
      fontFamily: T.ui, color: t.color, background: `${t.color}0D`,
    }}>
      {compact ? fmtN(ink) : `${fmtN(ink)} · ${t.name}`}
    </span>
  );
}
