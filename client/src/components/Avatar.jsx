import { getTier } from "../themes.js";

export default function Av({ T, initials, ink = 0, size = 34 }) {
  const t = getTier(ink);
  return (
    <div style={{
      width: size, height: size, borderRadius: "50%",
      background: `linear-gradient(145deg,${t.color}20,${T.bg2})`,
      border: `1.5px solid ${t.color}28`,
      display: "flex", alignItems: "center", justifyContent: "center",
      fontFamily: T.ui, fontSize: size * 0.34, fontWeight: 700,
      color: t.color, flexShrink: 0,
    }}>
      {initials}
    </div>
  );
}
