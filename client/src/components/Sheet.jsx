import { useEffect } from "react";

export default function Sheet({ T, open, onClose, title, children, height = "80vh" }) {
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  if (!open) return null;

  return (
    <div style={{ position:"fixed", inset:0, zIndex:300, display:"flex", flexDirection:"column", justifyContent:"flex-end" }}
      onClick={onClose}>
      <div style={{ position:"absolute", inset:0, background:"rgba(0,0,0,0.6)", backdropFilter:"blur(4px)", animation:"fadeIn .2s ease" }} />
      <div onClick={e => e.stopPropagation()} style={{
        position:"relative", background:T.bg2,
        borderRadius:"20px 20px 0 0",
        maxHeight: height, overflow:"hidden",
        display:"flex", flexDirection:"column",
        animation:"slideUp .28s cubic-bezier(0.34,1.56,0.64,1)",
        paddingBottom:"env(safe-area-inset-bottom,0px)",
      }}>
        <div style={{ width:36, height:4, borderRadius:2, background:T.text4, margin:"12px auto 0", opacity:0.4, flexShrink:0 }} />
        {title && (
          <div style={{
            display:"flex", alignItems:"center", justifyContent:"space-between",
            padding:"14px 20px 12px", borderBottom:`1px solid ${T.border}`, flexShrink:0,
          }}>
            <span style={{ fontFamily:T.hd, fontSize:18, fontWeight:600, color:T.text }}>{title}</span>
            <button onClick={onClose} style={{
              background:T.bg3, border:"none", borderRadius:"50%",
              width:28, height:28, display:"flex", alignItems:"center", justifyContent:"center",
              color:T.text3, fontSize:15, cursor:"pointer",
            }}>×</button>
          </div>
        )}
        <div style={{ overflowY:"auto", flex:1, padding:"16px 20px 20px" }}>{children}</div>
      </div>
    </div>
  );
}
