import { useState, useEffect, useRef } from "react";

// ═══════════════════════════════════════════════════
// THEME
// ═══════════════════════════════════════════════════
const THEMES={
  twilight:{id:"twilight",name:"Twilight Ink",icon:"\u263E",bg:"#161D2E",bg2:"#1C2438",bg3:"#232D44",card:"#1A2236",cardHover:"#1E2840",border:"rgba(212,168,85,0.09)",borderHover:"rgba(212,168,85,0.18)",gold:"#D4A855",goldDim:"rgba(212,168,85,0.45)",goldGlow:"rgba(212,168,85,0.08)",accent:"#C47232",accentHover:"#D4832F",ink:"#E8E2D6",ink2:"#C8C0B0",ink3:"#8A8474",ink4:"#6C685C",green:"#6A9A60",red:"#C45A4A",blue:"#5A8AB4",plum:"#9A70A0",teal:"#4EA8A0",rose:"#C47A8A",amber:"#D4A040",serif:"'Playfair Display',Georgia,serif",body:"'Source Serif 4',Georgia,serif",sans:"'DM Sans',system-ui,sans-serif"},
  parchment:{id:"parchment",name:"Warm Parchment",icon:"\u2600",bg:"#F7F3EC",bg2:"#EFEBE3",bg3:"#E7E1D6",card:"#FFFDF8",cardHover:"#FEFBF4",border:"rgba(180,160,120,0.2)",borderHover:"rgba(180,160,120,0.35)",gold:"#B68409",goldDim:"rgba(184,134,11,0.5)",goldGlow:"rgba(184,134,11,0.06)",accent:"#B85A32",accentHover:"#D06838",ink:"#2C2418",ink2:"#3D3226",ink3:"#7A6E5E",ink4:"#978B77",green:"#5A7A4A",red:"#A0422E",blue:"#4A6A8A",plum:"#7A5070",teal:"#3A8A7A",rose:"#A0506A",amber:"#C4851C",serif:"'Playfair Display',Georgia,serif",body:"'Source Serif 4',Georgia,serif",sans:"'DM Sans',system-ui,sans-serif"},
  stone:{id:"stone",name:"Stone & Sage",icon:"\u25D2",bg:"#EDEBE6",bg2:"#E2DFD8",bg3:"#D6D2CA",card:"#F5F3EE",cardHover:"#F0EDE6",border:"rgba(140,130,110,0.22)",borderHover:"rgba(140,130,110,0.38)",gold:"#8A7A4A",goldDim:"rgba(138,122,74,0.5)",goldGlow:"rgba(138,122,74,0.07)",accent:"#B05A3A",accentHover:"#C86842",ink:"#2A2A24",ink2:"#3E3E36",ink3:"#72706A",ink4:"#8B877D",green:"#4A7A56",red:"#A0493A",blue:"#506A80",plum:"#7A5A6A",teal:"#3A8878",rose:"#8A5060",amber:"#B87A30",serif:"'Playfair Display',Georgia,serif",body:"'Source Serif 4',Georgia,serif",sans:"'DM Sans',system-ui,sans-serif"},
  editorial:{id:"editorial",name:"Editorial Mono",icon:"\u25A0",bg:"#FAF9F7",bg2:"#F2F0EC",bg3:"#E8E6E0",card:"#FFFFFF",cardHover:"#FCFBF9",border:"rgba(120,110,100,0.15)",borderHover:"rgba(120,110,100,0.28)",gold:"#1A1A1A",goldDim:"rgba(26,26,26,0.45)",goldGlow:"rgba(0,0,0,0.03)",accent:"#C44A20",accentHover:"#D85828",ink:"#1A1A1A",ink2:"#2E2E2E",ink3:"#6A6A6A",ink4:"#909090",green:"#2A6A4A",red:"#C44A20",blue:"#2A4A7A",plum:"#6A3A6A",teal:"#2A7A6A",rose:"#8A3A5A",amber:"#B87A20",serif:"'Playfair Display',Georgia,serif",body:"'Source Serif 4',Georgia,serif",sans:"'DM Sans',system-ui,sans-serif"},
};
const THEME_ORDER=["twilight","parchment","stone","editorial"];
const THEME_DEFAULT="twilight";
function useTheme(){const[tid,setTid]=useState(THEME_DEFAULT);return{theme:THEMES[tid],tid,setTid};}
let T=THEMES[THEME_DEFAULT];

function pToast(msg){const el=document.getElementById("a-toast");if(el){el.textContent=msg;el.style.display="block";el.style.opacity="1";setTimeout(()=>{el.style.opacity="0";setTimeout(()=>el.style.display="none",300);},2200);}}

function ThemeSwitcher({tid,setTid}){
  const[open,setOpen]=useState(false);
  const ref=useRef(null);
  useEffect(()=>{if(!open)return;const h=e=>{if(ref.current&&!ref.current.contains(e.target))setOpen(false);};document.addEventListener("mousedown",h);return()=>document.removeEventListener("mousedown",h);},[open]);
  return <div ref={ref} style={{position:"relative"}}>
    <button onClick={()=>setOpen(!open)} aria-label="Switch theme" style={{display:"flex",alignItems:"center",justifyContent:"center",width:28,height:28,borderRadius:"50%",border:`1.5px solid ${T.gold}40`,background:`${T.gold}10`,cursor:"pointer",fontSize:13,opacity:.7}} onMouseEnter={e=>e.currentTarget.style.opacity="1"} onMouseLeave={e=>e.currentTarget.style.opacity="0.7"}>{THEMES[tid].icon}</button>
    {open&&<div style={{position:"absolute",top:"calc(100% + 8px)",right:0,background:T.card,border:`1px solid ${T.borderHover}`,borderRadius:14,padding:6,zIndex:60,boxShadow:"0 12px 40px rgba(0,0,0,.35)",minWidth:200}}>
      {THEME_ORDER.map(k=>{const th=THEMES[k];const active=k===tid;return <button key={k} onClick={()=>{setTid(k);setOpen(false);}} style={{display:"flex",alignItems:"center",gap:10,padding:"8px 12px",borderRadius:10,border:"none",cursor:"pointer",width:"100%",background:active?`${th.accent}15`:"transparent"}}>
        <div style={{display:"flex",gap:3}}>{[th.bg,th.card,th.ink,th.accent,th.gold].map((c,i)=><div key={i} style={{width:10,height:10,borderRadius:i===0?3:10,background:c,border:"1px solid rgba(128,128,128,.2)"}}/>)}</div>
        <div style={{flex:1,textAlign:"left"}}><div style={{fontFamily:T.sans,fontSize:11,fontWeight:active?700:500,color:active?th.accent:T.ink2}}>{th.name}</div></div>
      </button>;})}
    </div>}
  </div>;
}

// ═══════════════════════════════════════════════════
// AUTHOR DATA
// ═══════════════════════════════════════════════════
const AUTHOR={
  name:"Toni Morrison",born:"February 18, 1931",died:"August 5, 2019",nationality:"American",
  photo:"\uD83D\uDCF7",bio:"Nobel Prize-winning novelist whose work examined Black American life through mythical, poetic prose. Her novels reshaped how literature engages with race, memory, and the weight of history.",
  stats:{readers:2840,reviews:1247,waypoints:3680,avgRating:4.7,topLens:"empath"},
  links:[{label:"Official Foundation",url:"tonimorrisonsociety.org"},{label:"Nobel Lecture",url:"nobelprize.org"}],
};
const BOOKS=[
  {id:"b1",title:"Beloved",year:1987,cover:"\uD83D\uDCD5",pages:324,readers:1420,rating:4.8,genre:"Literary Fiction",desc:"A former slave is haunted by the ghost of her dead daughter. Morrison\u2019s masterwork on the horror of slavery and the persistence of memory."},
  {id:"b2",title:"Song of Solomon",year:1977,cover:"\uD83D\uDCD7",pages:337,readers:890,rating:4.6,genre:"Literary Fiction",desc:"Milkman Dead\u2019s journey of self-discovery through family history and African-American folklore."},
  {id:"b3",title:"The Bluest Eye",year:1970,cover:"\uD83D\uDCD8",pages:206,readers:780,rating:4.5,genre:"Literary Fiction",desc:"A young Black girl prays for blue eyes, believing beauty equals whiteness. Morrison\u2019s devastating debut."},
  {id:"b4",title:"Sula",year:1973,cover:"\uD83D\uDCD9",pages:174,readers:540,rating:4.4,genre:"Literary Fiction",desc:"Two women\u2019s lifelong friendship in a small Ohio town. Good and evil become inseparable."},
  {id:"b5",title:"Jazz",year:1992,cover:"\uD83D\uDCDA",pages:229,readers:420,rating:4.3,genre:"Literary Fiction",desc:"Harlem in the 1920s. A middle-aged man shoots his young lover. The city narrates itself."},
];
const QA=[
  {id:"q1",asker:"Marcus Cole",initials:"MC",ink:4200,question:"How does Morrison use the supernatural differently from magical realism?",answers:3,topAnswer:"Morrison\u2019s ghosts aren\u2019t decorative \u2014 they\u2019re structural. In Beloved, the ghost IS the repressed history. Magical realism treats the fantastic as ambient atmosphere; Morrison treats it as the literal return of what was buried."},
  {id:"q2",asker:"Ava Chen",initials:"AC",ink:890,question:"Which Morrison novel should I start with if I\u2019m new to her work?",answers:7,topAnswer:"Beloved is the canonical answer, but The Bluest Eye is shorter and hits just as hard. If you want the full experience of her prose at its most musical, start with Song of Solomon."},
  {id:"q3",asker:"Yuki T.",initials:"YT",ink:3100,question:"What\u2019s the relationship between Morrison\u2019s novels and jazz as a musical form?",answers:2,topAnswer:"Morrison literally structures Jazz like a jazz composition \u2014 themes introduced, varied, returned to. But even Beloved has that improvisational quality: circling back to the same trauma from different angles, like a soloist returning to the head."},
];
const READER_ACTIVITY=[
  {user:"Ingrid S.",lens:"analyst",action:"set a waypoint at page 204 of Beloved",time:"1h ago"},
  {user:"Kofi A.",lens:"storyteller",action:"wrote a review of Song of Solomon",time:"3h ago"},
  {user:"Davi Santos",lens:"explorer",action:"finished The Bluest Eye",time:"6h ago"},
  {user:"Yuki T.",lens:"empath",action:"saved Sula to their shelf",time:"1d ago"},
];

// ═══════════════════════════════════════════════════
// MAIN
// ═══════════════════════════════════════════════════
export default function AuthorProfile(){
  const{theme,tid,setTid}=useTheme(); T=theme;
  const[tab,setTab]=useState("books");
  const[following,setFollowing]=useState(false);
  const[selBook,setSelBook]=useState(null);
  const[qaExpand,setQaExpand]=useState(null);

  return <div style={{minHeight:"100vh",background:T.bg,color:T.ink}}>
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,800;1,400;1,700&family=Source+Serif+4:ital,wght@0,300;0,400;0,700;1,300;1,400&family=DM+Sans:wght@400;500;600;700;800&display=swap');
      *{margin:0;padding:0;box-sizing:border-box}::selection{background:${T.gold}30}
      @keyframes fadeUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
      @media(max-width:640px){.desk-only{display:none!important}.author-grid{grid-template-columns:1fr!important}}
    `}</style>
    <div id="a-toast" style={{display:"none",position:"fixed",bottom:80,left:"50%",transform:"translateX(-50%)",padding:"10px 20px",borderRadius:10,background:T.card,border:`1px solid ${T.borderHover}`,fontFamily:T.sans,fontSize:12,fontWeight:600,color:T.ink,boxShadow:"0 8px 32px rgba(0,0,0,.4)",zIndex:300,transition:"opacity .3s",whiteSpace:"nowrap"}}/>

    {/* Header */}
    <header style={{position:"sticky",top:0,zIndex:100,background:`${T.bg}F2`,backdropFilter:"blur(20px)",borderBottom:`1px solid ${T.border}`,padding:"12px 20px"}}>
      <div style={{maxWidth:800,margin:"0 auto",display:"flex",alignItems:"center",gap:12}}>
        <button onClick={()=>pToast("Back to previous page\u2026")} style={{background:"none",border:"none",color:T.ink3,cursor:"pointer",fontSize:16}}>{"\u2190"}</button>
        <span style={{fontFamily:T.serif,fontSize:20,fontWeight:700,color:T.ink}}>Pr<span style={{color:T.accent}}>{"\u00E9"}</span>cis</span>
        <div style={{flex:1}}/>
        <span className="desk-only" style={{fontFamily:T.sans,fontSize:10,fontWeight:700,color:T.ink4,letterSpacing:"1px",textTransform:"uppercase"}}>Author</span>
        <ThemeSwitcher tid={tid} setTid={setTid}/>
      </div>
    </header>

    <div style={{maxWidth:800,margin:"0 auto",padding:"24px 20px"}}>
      {/* Author hero */}
      <div style={{display:"flex",gap:24,marginBottom:32,flexWrap:"wrap",animation:"fadeUp .4s ease"}}>
        <div style={{width:100,height:100,borderRadius:16,background:`linear-gradient(135deg,${T.accent}20,${T.gold}10)`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:48,flexShrink:0,border:`2px solid ${T.gold}20`}}>{"\u270D"}</div>
        <div style={{flex:1,minWidth:240}}>
          <div style={{fontFamily:T.sans,fontSize:9,fontWeight:700,color:T.gold,letterSpacing:"1.5px",textTransform:"uppercase",marginBottom:4}}>Author Profile</div>
          <h1 style={{fontFamily:T.serif,fontSize:"clamp(24px,4vw,36px)",fontWeight:800,color:T.ink,marginBottom:6}}>{AUTHOR.name}</h1>
          <div style={{fontFamily:T.sans,fontSize:11,color:T.ink3,marginBottom:12}}>{AUTHOR.nationality} {"\u00B7"} {AUTHOR.born} {AUTHOR.died?`\u2013 ${AUTHOR.died}`:""}</div>
          <div style={{fontFamily:T.body,fontSize:13,color:T.ink2,fontWeight:300,lineHeight:1.7,marginBottom:16}}>{AUTHOR.bio}</div>
          <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
            <button onClick={()=>{setFollowing(!following);pToast(following?"Unfollowed":"Following \u2014 you\u2019ll get updates when readers engage with this author\u2019s work");}} style={{padding:"8px 22px",borderRadius:8,border:"none",fontFamily:T.sans,fontSize:12,fontWeight:700,cursor:"pointer",...(following?{background:"transparent",color:T.green,border:`1.5px solid ${T.green}30`}:{background:`linear-gradient(135deg,${T.accent},#9E4520)`,color:"#fff",boxShadow:`0 2px 12px ${T.accent}30`})}}>{following?"\u2713 Following author":"Follow author"}</button>
            <button onClick={()=>pToast("Share link copied")} style={{padding:"8px 16px",borderRadius:8,border:`1px solid ${T.border}`,background:"transparent",fontFamily:T.sans,fontSize:12,fontWeight:600,color:T.ink3,cursor:"pointer"}}>{"\u2197"} Share</button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div style={{display:"flex",gap:16,marginBottom:24,flexWrap:"wrap"}}>
        {[{n:AUTHOR.stats.readers,l:"readers on Pr\u00E9cis"},{n:AUTHOR.stats.reviews,l:"reviews written"},{n:AUTHOR.stats.waypoints,l:"waypoints set"},{n:AUTHOR.stats.avgRating,l:"avg rating"},{n:AUTHOR.stats.topLens,l:"most common lens",fmt:v=>"\uD83D\uDC96 Empath"}].map((s,i)=><div key={i} style={{padding:"12px 16px",borderRadius:10,background:T.card,border:`1px solid ${T.border}`,flex:"1 1 120px",minWidth:120}}>
          <div style={{fontFamily:T.sans,fontSize:18,fontWeight:800,color:T.ink}}>{s.fmt?s.fmt(s.n):typeof s.n==="number"?s.n.toLocaleString():s.n}</div>
          <div style={{fontFamily:T.sans,fontSize:9,color:T.ink4,textTransform:"uppercase",letterSpacing:".5px",marginTop:2}}>{s.l}</div>
        </div>)}
      </div>

      {/* Tabs */}
      <div style={{display:"flex",gap:4,marginBottom:20,borderBottom:`1px solid ${T.border}`,paddingBottom:4}}>
        {[{id:"books",label:"Bibliography"},{id:"activity",label:"Reader Activity"},{id:"qa",label:"Reader Q&A"}].map(t=><button key={t.id} onClick={()=>setTab(t.id)} style={{padding:"8px 16px",borderRadius:"8px 8px 0 0",border:"none",fontFamily:T.sans,fontSize:12,fontWeight:tab===t.id?700:500,color:tab===t.id?T.accent:T.ink4,background:tab===t.id?`${T.accent}08`:"transparent",cursor:"pointer",borderBottom:tab===t.id?`2px solid ${T.accent}`:"2px solid transparent"}}>{t.label}</button>)}
      </div>

      {/* Bibliography */}
      {tab==="books"&&<div style={{animation:"fadeUp .25s ease"}}>
        <div className="author-grid" style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(340px,1fr))",gap:12}}>
          {BOOKS.map(b=><div key={b.id} onClick={()=>setSelBook(selBook?.id===b.id?null:b)} style={{padding:"18px 16px",borderRadius:14,background:selBook?.id===b.id?T.cardHover:T.card,border:`1px solid ${selBook?.id===b.id?T.borderHover:T.border}`,cursor:"pointer",transition:"all .2s"}} onMouseEnter={e=>{if(selBook?.id!==b.id)e.currentTarget.style.borderColor=T.borderHover;}} onMouseLeave={e=>{if(selBook?.id!==b.id)e.currentTarget.style.borderColor=T.border;}}>
            <div style={{display:"flex",gap:12}}>
              <div style={{width:36,height:52,borderRadius:"2px 5px 5px 2px",background:`linear-gradient(145deg,${T.accent}CC,#6B2A10)`,boxShadow:"2px 0 6px rgba(0,0,0,.3)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,flexShrink:0}}>{b.cover}</div>
              <div style={{flex:1}}>
                <div style={{fontFamily:T.serif,fontSize:15,fontWeight:700,color:T.ink}}>{b.title} <span style={{fontFamily:T.sans,fontSize:10,color:T.ink4,fontWeight:400}}>({b.year})</span></div>
                <div style={{fontFamily:T.sans,fontSize:10,color:T.ink3,marginTop:2}}>{b.genre} {"\u00B7"} {b.pages}p {"\u00B7"} {b.readers.toLocaleString()} readers {"\u00B7"} {"\u2605"} {b.rating}</div>
              </div>
            </div>
            {selBook?.id===b.id&&<div style={{marginTop:12,paddingTop:12,borderTop:`1px solid ${T.border}`}}>
              <div style={{fontFamily:T.body,fontSize:12,color:T.ink2,fontWeight:300,lineHeight:1.7,marginBottom:12}}>{b.desc}</div>
              <div style={{display:"flex",gap:6}}>
                <button onClick={e=>{e.stopPropagation();pToast(`Opening ${b.title}\u2026`);}} style={{flex:1,padding:"8px",borderRadius:8,border:"none",background:`${T.accent}10`,fontFamily:T.sans,fontSize:10,fontWeight:700,color:T.accent,cursor:"pointer"}}>View book</button>
                <button onClick={e=>{e.stopPropagation();pToast("Added to shelf");}} style={{flex:1,padding:"8px",borderRadius:8,border:`1px solid ${T.border}`,background:"transparent",fontFamily:T.sans,fontSize:10,fontWeight:600,color:T.ink3,cursor:"pointer"}}>{"\u25A4"} Add to shelf</button>
              </div>
            </div>}
          </div>)}
        </div>
      </div>}

      {/* Reader Activity */}
      {tab==="activity"&&<div style={{animation:"fadeUp .25s ease"}}>
        <div style={{fontFamily:T.sans,fontSize:10,fontWeight:700,color:T.ink4,letterSpacing:".5px",textTransform:"uppercase",marginBottom:12}}>Recent reader activity</div>
        {READER_ACTIVITY.map((a,i)=><div key={i} style={{display:"flex",gap:12,padding:"12px 14px",borderRadius:10,marginBottom:4,transition:"background .15s"}} onMouseEnter={e=>e.currentTarget.style.background=T.cardHover} onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
          <div style={{width:32,height:32,borderRadius:"50%",background:`${T.accent}12`,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:T.sans,fontSize:10,fontWeight:800,color:T.accent,flexShrink:0}}>{a.user.split(" ").map(w=>w[0]).join("")}</div>
          <div style={{flex:1}}>
            <div style={{fontFamily:T.sans,fontSize:12,color:T.ink}}><strong>{a.user}</strong> {a.action}</div>
            <div style={{fontFamily:T.sans,fontSize:9,color:T.ink4,marginTop:2}}>{a.time}</div>
          </div>
        </div>)}
        {READER_ACTIVITY.length===0&&<div style={{textAlign:"center",padding:"40px",fontFamily:T.body,fontSize:13,color:T.ink4,fontStyle:"italic"}}>No recent activity. Be the first to engage with this author{"\u2019"}s work.</div>}
      </div>}

      {/* Reader Q&A */}
      {tab==="qa"&&<div style={{animation:"fadeUp .25s ease"}}>
        <div style={{display:"flex",alignItems:"center",marginBottom:16}}>
          <div style={{fontFamily:T.sans,fontSize:10,fontWeight:700,color:T.ink4,letterSpacing:".5px",textTransform:"uppercase",flex:1}}>Community questions about this author</div>
          <button onClick={()=>pToast("Ask a question\u2026")} style={{padding:"6px 14px",borderRadius:8,border:`1px solid ${T.gold}25`,background:`${T.gold}06`,fontFamily:T.sans,fontSize:10,fontWeight:700,color:T.gold,cursor:"pointer"}}>+ Ask question</button>
        </div>
        {QA.map(q=><div key={q.id} style={{padding:"16px",borderRadius:14,background:T.card,border:`1px solid ${T.border}`,marginBottom:8}}>
          <div style={{display:"flex",gap:8,alignItems:"flex-start",marginBottom:10}}>
            <div style={{width:28,height:28,borderRadius:"50%",background:`${T.accent}12`,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:T.sans,fontSize:9,fontWeight:800,color:T.accent,flexShrink:0}}>{q.initials}</div>
            <div style={{flex:1}}>
              <div style={{fontFamily:T.sans,fontSize:10,color:T.ink4}}>{q.asker} {"\u00B7"} {"\u25C6"} {q.ink.toLocaleString()} Ink</div>
              <div style={{fontFamily:T.serif,fontSize:14,fontWeight:700,color:T.ink,marginTop:2}}>{q.question}</div>
            </div>
            <span style={{fontFamily:T.sans,fontSize:9,color:T.ink4}}>{q.answers} answers</span>
          </div>
          <button onClick={()=>setQaExpand(qaExpand===q.id?null:q.id)} style={{background:"none",border:"none",fontFamily:T.sans,fontSize:11,fontWeight:600,color:T.blue,cursor:"pointer",padding:0}}>{qaExpand===q.id?"Hide top answer":"Show top answer"} {qaExpand===q.id?"\u25B2":"\u25BC"}</button>
          {qaExpand===q.id&&<div style={{marginTop:10,padding:"12px 14px",borderRadius:10,background:T.bg3,border:`1px solid ${T.border}`}}>
            <div style={{fontFamily:T.sans,fontSize:9,fontWeight:700,color:T.gold,marginBottom:4}}>{"\u2605"} Top Answer</div>
            <div style={{fontFamily:T.body,fontSize:12,color:T.ink2,fontWeight:300,lineHeight:1.7}}>{q.topAnswer}</div>
          </div>}
        </div>)}
      </div>}

      {/* External links */}
      <div style={{marginTop:32,padding:"16px",borderRadius:14,background:T.card,border:`1px solid ${T.border}`}}>
        <div style={{fontFamily:T.sans,fontSize:10,fontWeight:700,color:T.ink4,letterSpacing:".5px",textTransform:"uppercase",marginBottom:8}}>External</div>
        <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
          {AUTHOR.links.map((l,i)=><button key={i} onClick={()=>pToast(`Opening ${l.url}\u2026`)} style={{padding:"6px 14px",borderRadius:8,border:`1px solid ${T.border}`,background:"transparent",fontFamily:T.sans,fontSize:11,fontWeight:500,color:T.blue,cursor:"pointer"}}>{"\u2197"} {l.label}</button>)}
        </div>
      </div>
    </div>

    {/* Mobile nav */}
    <nav style={{position:"fixed",bottom:0,left:0,right:0,zIndex:200,background:`${T.bg}F2`,backdropFilter:"blur(20px)",borderTop:`1px solid ${T.border}`,display:"none",padding:"6px 0 env(safe-area-inset-bottom,8px)"}}>
      <style>{`@media(max-width:640px){nav{display:block!important}}`}</style>
      <div style={{display:"flex",justifyContent:"space-around",maxWidth:480,margin:"0 auto"}}>
        {[{id:"feed",icon:"\u25A3",label:"Feed"},{id:"explore",icon:"\uD83C\uDF0D",label:"Explore"},{id:"press",icon:"\uD83D\uDCF0",label:"The Press"},{id:"write",icon:"\u270D",label:"Write"},{id:"shelf",icon:"\u25C6",label:"Shelf"},{id:"profile",icon:"\u25CF",label:"Profile"}].map(n=><button key={n.id} onClick={()=>pToast(`Opening ${n.label}\u2026`)} style={{display:"flex",flexDirection:"column",alignItems:"center",gap:2,padding:"6px 12px",border:"none",background:"none",cursor:"pointer",minWidth:48,minHeight:44}}>
          <span style={{fontSize:18,opacity:.5}}>{n.icon}</span>
          <span style={{fontFamily:T.sans,fontSize:9,fontWeight:500,color:T.ink4}}>{n.label}</span>
        </button>)}
      </div>
    </nav>
  </div>;
}
