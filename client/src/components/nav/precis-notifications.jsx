import { useState, useEffect, useRef } from "react";

// ═══════════════════════════════════════════════════
// THEME + SHARED
// ═══════════════════════════════════════════════════
const THEMES={
  twilight:{id:"twilight",name:"Twilight Ink",icon:"\u263E",
    bg:"#161D2E",bg2:"#1C2438",bg3:"#232D44",card:"#1A2236",cardHover:"#1E2840",
    border:"rgba(212,168,85,0.09)",borderHover:"rgba(212,168,85,0.18)",
    gold:"#D4A855",goldDim:"rgba(212,168,85,0.45)",goldGlow:"rgba(212,168,85,0.08)",
    accent:"#C47232",accentHover:"#D4832F",
    ink:"#E8E2D6",ink2:"#C8C0B0",ink3:"#8A8474",ink4:"#6C685C",
    green:"#6A9A60",red:"#C45A4A",blue:"#5A8AB4",plum:"#9A70A0",teal:"#4EA8A0",rose:"#C47A8A",amber:"#D4A040",
    serif:"'Playfair Display',Georgia,serif",body:"'Source Serif 4',Georgia,serif",sans:"'DM Sans',system-ui,sans-serif"},
  parchment:{id:"parchment",name:"Warm Parchment",icon:"\u2600",
    bg:"#F7F3EC",bg2:"#EFEBE3",bg3:"#E7E1D6",card:"#FFFDF8",cardHover:"#FEFBF4",
    border:"rgba(180,160,120,0.2)",borderHover:"rgba(180,160,120,0.35)",
    gold:"#B68409",goldDim:"rgba(184,134,11,0.5)",goldGlow:"rgba(184,134,11,0.06)",
    accent:"#B85A32",accentHover:"#D06838",
    ink:"#2C2418",ink2:"#3D3226",ink3:"#7A6E5E",ink4:"#978B77",
    green:"#5A7A4A",red:"#A0422E",blue:"#4A6A8A",plum:"#7A5070",teal:"#3A8A7A",rose:"#A0506A",amber:"#C4851C",
    serif:"'Playfair Display',Georgia,serif",body:"'Source Serif 4',Georgia,serif",sans:"'DM Sans',system-ui,sans-serif"},
  stone:{id:"stone",name:"Stone & Sage",icon:"\u25D2",
    bg:"#EDEBE6",bg2:"#E2DFD8",bg3:"#D6D2CA",card:"#F5F3EE",cardHover:"#F0EDE6",
    border:"rgba(140,130,110,0.22)",borderHover:"rgba(140,130,110,0.38)",
    gold:"#8A7A4A",goldDim:"rgba(138,122,74,0.5)",goldGlow:"rgba(138,122,74,0.07)",
    accent:"#B05A3A",accentHover:"#C86842",
    ink:"#2A2A24",ink2:"#3E3E36",ink3:"#72706A",ink4:"#8B877D",
    green:"#4A7A56",red:"#A0493A",blue:"#506A80",plum:"#7A5A6A",teal:"#3A8878",rose:"#8A5060",amber:"#B87A30",
    serif:"'Playfair Display',Georgia,serif",body:"'Source Serif 4',Georgia,serif",sans:"'DM Sans',system-ui,sans-serif"},
  editorial:{id:"editorial",name:"Editorial Mono",icon:"\u25A0",
    bg:"#FAF9F7",bg2:"#F2F0EC",bg3:"#E8E6E0",card:"#FFFFFF",cardHover:"#FCFBF9",
    border:"rgba(120,110,100,0.15)",borderHover:"rgba(120,110,100,0.28)",
    gold:"#1A1A1A",goldDim:"rgba(26,26,26,0.45)",goldGlow:"rgba(0,0,0,0.03)",
    accent:"#C44A20",accentHover:"#D85828",
    ink:"#1A1A1A",ink2:"#2E2E2E",ink3:"#6A6A6A",ink4:"#909090",
    green:"#2A6A4A",red:"#C44A20",blue:"#2A4A7A",plum:"#6A3A6A",teal:"#2A7A6A",rose:"#8A3A5A",amber:"#B87A20",
    serif:"'Playfair Display',Georgia,serif",body:"'Source Serif 4',Georgia,serif",sans:"'DM Sans',system-ui,sans-serif"},
};
const THEME_ORDER=["twilight","parchment","stone","editorial"];
const THEME_DEFAULT="twilight";
function useTheme(){const[tid,setTid]=useState(THEME_DEFAULT);return{theme:THEMES[tid],tid,setTid};}
let T=THEMES[THEME_DEFAULT];

function pToast(msg){const el=document.getElementById("n-toast");if(el){el.textContent=msg;el.style.display="block";el.style.opacity="1";setTimeout(()=>{el.style.opacity="0";setTimeout(()=>el.style.display="none",300);},2200);}}

function ThemeSwitcher({tid,setTid}){
  const[open,setOpen]=useState(false);
  const ref=useRef(null);
  useEffect(()=>{if(!open)return;const h=e=>{if(ref.current&&!ref.current.contains(e.target))setOpen(false);};document.addEventListener("mousedown",h);return()=>document.removeEventListener("mousedown",h);},[open]);
  return <div ref={ref} style={{position:"relative"}}>
    <button onClick={()=>setOpen(!open)} aria-label="Switch theme" style={{display:"flex",alignItems:"center",justifyContent:"center",width:28,height:28,borderRadius:"50%",border:`1.5px solid ${T.gold}40`,background:`${T.gold}10`,cursor:"pointer",fontSize:13,opacity:.7}} onMouseEnter={e=>e.currentTarget.style.opacity="1"} onMouseLeave={e=>e.currentTarget.style.opacity="0.7"}>{THEMES[tid].icon}</button>
    {open&&<div style={{position:"absolute",top:"calc(100% + 8px)",right:0,background:T.card,border:`1px solid ${T.borderHover}`,borderRadius:14,padding:6,zIndex:60,boxShadow:"0 12px 40px rgba(0,0,0,.35)",minWidth:200}}>
      <div style={{padding:"4px 12px 8px",fontFamily:T.sans,fontSize:9,fontWeight:700,color:T.ink4,letterSpacing:".5px",textTransform:"uppercase"}}>Reading Theme</div>
      {THEME_ORDER.map(k=>{const th=THEMES[k];const active=k===tid;return <button key={k} onClick={()=>{setTid(k);setOpen(false);}} style={{display:"flex",alignItems:"center",gap:10,padding:"8px 12px",borderRadius:10,border:"none",cursor:"pointer",width:"100%",background:active?`${th.accent}15`:"transparent"}}>
        <div style={{display:"flex",gap:3}}>{[th.bg,th.card,th.ink,th.accent,th.gold].map((c,i)=><div key={i} style={{width:10,height:10,borderRadius:i===0?3:10,background:c,border:"1px solid rgba(128,128,128,.2)"}}/>)}</div>
        <div style={{flex:1,textAlign:"left"}}><div style={{fontFamily:T.sans,fontSize:11,fontWeight:active?700:500,color:active?th.accent:T.ink2}}>{th.name}</div></div>
        {active&&<span style={{fontSize:10,color:th.accent}}>{"\u2713"}</span>}
      </button>;})}
    </div>}
  </div>;
}

// ═══════════════════════════════════════════════════
// NOTIFICATION DATA — deep links to specific platform locations
// ═══════════════════════════════════════════════════
const NOTIFS=[
  {id:"n1",type:"like",icon:"\u2764\uFE0F",read:false,time:"2m ago",title:"Ingrid S. liked your review",body:"Your review of Beloved",link:{build:"feed",target:"post-241"},group:"social"},
  {id:"n2",type:"reply",icon:"\uD83D\uDCAC",read:false,time:"8m ago",title:"Kofi A. replied to your post",body:"\u201CThis reframed how I think about Morrison\u2019s use of time\u2026\u201D",link:{build:"feed",target:"post-241-reply-12"},group:"social"},
  {id:"n3",type:"follow",icon:"\uD83D\uDC64",read:false,time:"24m ago",title:"Yuki T. started following you",body:"Empath \u00B7 42 books read \u00B7 3 mutual follows",link:{build:"profile",target:"@yukireads"},group:"social"},
  {id:"n4",type:"mention",icon:"\uD83D\uDCCC",read:false,time:"1h ago",title:"You were mentioned in a discussion",body:"Marcus Cole tagged you in the Beloved community thread",link:{build:"community",target:"beloved-thread-18"},group:"social"},
  {id:"n5",type:"club",icon:"\uD83D\uDCDA",read:true,time:"2h ago",title:"Twilight Readers hit a milestone",body:"Your book club reached 50% through Orbital",link:{build:"book-clubs",target:"club-twilight-readers"},group:"activity"},
  {id:"n6",type:"challenge",icon:"\uD83C\uDFC6",read:true,time:"3h ago",title:"7-day reading streak!",body:"You\u2019re on fire. Keep going to earn the \u2605 Dedicated Reader badge.",link:{build:"challenges",target:"streak-7"},group:"activity"},
  {id:"n7",type:"waypoint",icon:"\u27D0",read:true,time:"5h ago",title:"New waypoint available",body:"You\u2019ve passed page 140 of Beloved \u2014 a new waypoint is ready for you.",link:{build:"compass",target:"beloved-wp-140"},group:"reading"},
  {id:"n8",type:"message",icon:"\u2709",read:false,time:"6h ago",title:"New message from Ava Chen",body:"\u201CHey, loved your take on the unreliable narrator thread\u2026\u201D",link:{build:"messages",target:"conv-ava-chen"},group:"social"},
  {id:"n9",type:"ink",icon:"\u25C6",read:true,time:"8h ago",title:"+48 Ink earned today",body:"Your review of Intermezzo earned 32 Ink. Waypoint contribution: +16 Ink.",link:{build:"profile",target:"ink-history"},group:"activity"},
  {id:"n10",type:"shelf",icon:"\u25A4",read:true,time:"1d ago",title:"3 readers saved your recommendation",body:"Your recommendation of James by Percival Everett was saved to 3 shelves.",link:{build:"shelf",target:"rec-james"},group:"reading"},
  {id:"n11",type:"club_post",icon:"\uD83D\uDDE8",read:true,time:"1d ago",title:"New discussion in Twilight Readers",body:"Davi Santos started a thread: \u201CThe ending \u2014 did anyone else feel blindsided?\u201D",link:{build:"book-clubs",target:"club-twilight-thread-4"},group:"activity"},
  {id:"n12",type:"author",icon:"\u270D",read:true,time:"2d ago",title:"Sally Rooney\u2019s page was updated",body:"New reader Q&A and updated bibliography. 412 readers following.",link:{build:"author",target:"sally-rooney"},group:"reading"},
];

const FILTERS=[
  {id:"all",label:"All",icon:"\u2630"},
  {id:"social",label:"Social",icon:"\u2764\uFE0F"},
  {id:"activity",label:"Activity",icon:"\uD83C\uDFC6"},
  {id:"reading",label:"Reading",icon:"\uD83D\uDCD6"},
];

// ═══════════════════════════════════════════════════
// MAIN
// ═══════════════════════════════════════════════════
export default function Notifications(){
  const{theme,tid,setTid}=useTheme(); T=theme;
  const[filter,setFilter]=useState("all");
  const[notifs,setNotifs]=useState(NOTIFS);
  const[detail,setDetail]=useState(null);
  const unread=notifs.filter(n=>!n.read).length;
  const filtered=filter==="all"?notifs:notifs.filter(n=>n.group===filter);

  function markRead(id){setNotifs(p=>p.map(n=>n.id===id?{...n,read:true}:n));}
  function markAllRead(){setNotifs(p=>p.map(n=>({...n,read:true})));}
  function clearRead(){setNotifs(p=>p.filter(n=>!n.read));}
  function remove(id){setNotifs(p=>p.filter(n=>n.id!==id));}

  function deepLink(n){
    markRead(n.id);
    const dest=n.link;
    pToast(`Opening ${dest.build} \u2192 ${dest.target}\u2026`);
    setDetail(n);
  }

  return <div style={{minHeight:"100vh",background:T.bg,color:T.ink}}>
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,800;1,400;1,700&family=Source+Serif+4:ital,wght@0,300;0,400;0,700;1,300;1,400&family=DM+Sans:wght@400;500;600;700;800&display=swap');
      *{margin:0;padding:0;box-sizing:border-box}::selection{background:${T.gold}30;color:${T.ink}}
      @keyframes fadeUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
      @keyframes slideIn{from{opacity:0;transform:translateX(20px)}to{opacity:1;transform:translateX(0)}}
      @media(max-width:640px){.desk-only{display:none!important}}
    `}</style>
    <div id="n-toast" style={{display:"none",position:"fixed",bottom:80,left:"50%",transform:"translateX(-50%)",padding:"10px 20px",borderRadius:10,background:T.card,border:`1px solid ${T.borderHover}`,fontFamily:T.sans,fontSize:12,fontWeight:600,color:T.ink,boxShadow:"0 8px 32px rgba(0,0,0,.4)",zIndex:300,transition:"opacity .3s",whiteSpace:"nowrap"}}/>

    {/* Header */}
    <header style={{position:"sticky",top:0,zIndex:100,background:`${T.bg}F2`,backdropFilter:"blur(20px)",borderBottom:`1px solid ${T.border}`,padding:"12px 20px"}}>
      <div style={{maxWidth:680,margin:"0 auto",display:"flex",alignItems:"center",gap:12}}>
        <span style={{fontFamily:T.serif,fontSize:20,fontWeight:700,color:T.ink}}>Pr<span style={{color:T.accent}}>{"\u00E9"}</span>cis</span>
        <div style={{flex:1}}/>
        <span style={{fontFamily:T.sans,fontSize:16,fontWeight:700,color:T.ink}}>Notifications</span>
        <div style={{flex:1}}/>
        <ThemeSwitcher tid={tid} setTid={setTid}/>
      </div>
    </header>

    <div style={{maxWidth:680,margin:"0 auto",padding:"16px 20px"}}>
      {/* Filter tabs + actions */}
      <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:16,flexWrap:"wrap"}}>
        {FILTERS.map(f=><button key={f.id} onClick={()=>setFilter(f.id)} style={{padding:"6px 14px",borderRadius:8,border:`1px solid ${filter===f.id?`${T.gold}30`:T.border}`,background:filter===f.id?`${T.gold}08`:"transparent",fontFamily:T.sans,fontSize:11,fontWeight:filter===f.id?700:500,color:filter===f.id?T.gold:T.ink4,cursor:"pointer"}}>{f.icon} {f.label}</button>)}
        <div style={{flex:1}}/>
        {unread>0&&<button onClick={markAllRead} style={{fontFamily:T.sans,fontSize:10,fontWeight:600,color:T.blue,background:"none",border:"none",cursor:"pointer"}}>Mark all read</button>}
        <button onClick={clearRead} style={{fontFamily:T.sans,fontSize:10,fontWeight:600,color:T.ink4,background:"none",border:"none",cursor:"pointer"}}>Clear read</button>
      </div>

      {/* Unread badge */}
      {unread>0&&<div style={{padding:"8px 14px",borderRadius:10,background:`${T.accent}08`,border:`1px solid ${T.accent}12`,marginBottom:12,fontFamily:T.sans,fontSize:11,fontWeight:600,color:T.accent}}>{unread} unread notification{unread!==1?"s":""}</div>}

      {/* Notification list */}
      {filtered.length===0&&<div style={{textAlign:"center",padding:"60px 20px"}}>
        <div style={{fontSize:40,marginBottom:12,opacity:.4}}>{"\uD83D\uDD14"}</div>
        <div style={{fontFamily:T.serif,fontSize:18,fontWeight:700,color:T.ink,marginBottom:6}}>All caught up</div>
        <div style={{fontFamily:T.body,fontSize:13,color:T.ink3,fontWeight:300}}>No {filter!=="all"?filter+" ":""}notifications right now. Go read something.</div>
      </div>}

      {filtered.map((n,i)=><div key={n.id} onClick={()=>deepLink(n)} style={{display:"flex",gap:12,padding:"14px 16px",borderRadius:14,marginBottom:4,background:n.read?"transparent":`${T.gold}04`,border:`1px solid ${n.read?"transparent":T.border}`,cursor:"pointer",transition:"all .2s",animation:`slideIn .2s ease ${i*0.03}s both`}} onMouseEnter={e=>{e.currentTarget.style.background=T.cardHover;e.currentTarget.style.borderColor=T.borderHover;}} onMouseLeave={e=>{e.currentTarget.style.background=n.read?"transparent":`${T.gold}04`;e.currentTarget.style.borderColor=n.read?"transparent":T.border;}}>
        {/* Unread dot */}
        <div style={{width:8,height:8,borderRadius:"50%",background:n.read?"transparent":T.accent,flexShrink:0,marginTop:6}}/>
        {/* Icon */}
        <div style={{fontSize:20,flexShrink:0,marginTop:2}}>{n.icon}</div>
        {/* Content */}
        <div style={{flex:1,minWidth:0}}>
          <div style={{fontFamily:T.sans,fontSize:12,fontWeight:n.read?500:700,color:n.read?T.ink2:T.ink,marginBottom:2}}>{n.title}</div>
          <div style={{fontFamily:T.body,fontSize:11,color:T.ink3,fontWeight:300,lineHeight:1.5}}>{n.body}</div>
          <div style={{display:"flex",alignItems:"center",gap:8,marginTop:4}}>
            <span style={{fontFamily:T.sans,fontSize:9,color:T.ink4}}>{n.time}</span>
            <span style={{fontFamily:T.sans,fontSize:9,color:T.blue,cursor:"pointer"}} onClick={e=>{e.stopPropagation();pToast(`Opening ${n.link.build}\u2026`);}}>Go to {n.link.build} {"\u2192"}</span>
          </div>
        </div>
        {/* Actions */}
        <button onClick={e=>{e.stopPropagation();remove(n.id);pToast("Notification dismissed");}} aria-label="Dismiss" style={{alignSelf:"flex-start",background:"none",border:"none",color:T.ink4,cursor:"pointer",fontSize:12,padding:"4px",opacity:.4}} onMouseEnter={e=>e.currentTarget.style.opacity="1"} onMouseLeave={e=>e.currentTarget.style.opacity=".4"}>{"\u2715"}</button>
      </div>)}
    </div>

    {/* Detail overlay — shows where the deep link goes */}
    {detail&&<div onClick={()=>setDetail(null)} style={{position:"fixed",inset:0,background:"rgba(0,0,0,.6)",backdropFilter:"blur(8px)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:200,animation:"fadeUp .2s ease"}}>
      <div onClick={e=>e.stopPropagation()} style={{width:"90%",maxWidth:440,padding:"32px 28px",borderRadius:20,background:T.card,border:`1px solid ${T.borderHover}`,boxShadow:"0 20px 60px rgba(0,0,0,.5)"}}>
        <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:16}}>
          <span style={{fontSize:28}}>{detail.icon}</span>
          <div style={{flex:1}}>
            <div style={{fontFamily:T.sans,fontSize:14,fontWeight:700,color:T.ink}}>{detail.title}</div>
            <div style={{fontFamily:T.sans,fontSize:10,color:T.ink4}}>{detail.time}</div>
          </div>
          <button onClick={()=>setDetail(null)} style={{background:"none",border:"none",color:T.ink4,cursor:"pointer",fontSize:16}}>{"\u2715"}</button>
        </div>
        <div style={{fontFamily:T.body,fontSize:13,color:T.ink2,fontWeight:300,lineHeight:1.7,marginBottom:20}}>{detail.body}</div>
        <div style={{padding:"12px 16px",borderRadius:10,background:T.bg3,border:`1px solid ${T.border}`,marginBottom:16}}>
          <div style={{fontFamily:T.sans,fontSize:9,fontWeight:700,color:T.ink4,textTransform:"uppercase",letterSpacing:".5px",marginBottom:4}}>Deep link</div>
          <div style={{fontFamily:T.sans,fontSize:12,color:T.blue}}>{detail.link.build} {"\u2192"} {detail.link.target}</div>
        </div>
        <div style={{display:"flex",gap:8}}>
          <button onClick={()=>{pToast(`Navigating to ${detail.link.build}\u2026`);setDetail(null);}} style={{flex:1,padding:"10px",borderRadius:10,border:"none",background:`linear-gradient(135deg,${T.accent},#9E4520)`,color:"#fff",fontFamily:T.sans,fontSize:12,fontWeight:700,cursor:"pointer"}}>Open in {detail.link.build}</button>
          <button onClick={()=>setDetail(null)} style={{padding:"10px 16px",borderRadius:10,border:`1px solid ${T.border}`,background:"transparent",fontFamily:T.sans,fontSize:12,fontWeight:600,color:T.ink3,cursor:"pointer"}}>Dismiss</button>
        </div>
      </div>
    </div>}

    {/* Mobile nav */}
    <nav className="mob-nav" style={{position:"fixed",bottom:0,left:0,right:0,zIndex:200,background:`${T.bg}F2`,backdropFilter:"blur(20px)",borderTop:`1px solid ${T.border}`,display:"none",padding:"6px 0 env(safe-area-inset-bottom,8px)"}}>
      <style>{`@media(max-width:640px){.mob-nav{display:block!important}}`}</style>
      <div style={{display:"flex",justifyContent:"space-around",maxWidth:480,margin:"0 auto"}}>
        {[{id:"feed",icon:"\u25A3",label:"Feed"},{id:"explore",icon:"\uD83C\uDF0D",label:"Explore"},{id:"press",icon:"\uD83D\uDCF0",label:"The Press"},{id:"notifs",icon:"\uD83D\uDD14",label:"Alerts"},{id:"shelf",icon:"\u25C6",label:"Shelf"},{id:"profile",icon:"\u25CF",label:"Profile"}].map(n=><button key={n.id} onClick={()=>pToast(`Opening ${n.label}\u2026`)} style={{display:"flex",flexDirection:"column",alignItems:"center",gap:2,padding:"6px 12px",border:"none",background:"none",cursor:"pointer",minWidth:48,minHeight:44}}>
          <span style={{fontSize:18,opacity:n.id==="notifs"?1:.5,color:n.id==="notifs"?T.accent:T.ink}}>{n.icon}</span>
          <span style={{fontFamily:T.sans,fontSize:9,fontWeight:n.id==="notifs"?700:500,color:n.id==="notifs"?T.accent:T.ink4}}>{n.label}</span>
        </button>)}
      </div>
    </nav>
  </div>;
}
