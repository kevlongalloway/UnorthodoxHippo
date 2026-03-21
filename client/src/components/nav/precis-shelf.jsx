import { useState, useEffect, useRef } from "react";

// ═══ TOKENS ═══
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
const LENSES={analyst:{icon:"\uD83D\uDD2C",label:"Analyst",color:"#5B9BD5"},empath:{icon:"\uD83D\uDC96",label:"Empath",color:"#D4788C"},philosopher:{icon:"\uD83D\uDCA1",label:"Philosopher",color:"#D4A855"},storyteller:{icon:"\uD83C\uDFAD",label:"Storyteller",color:"#9B7ED4"},explorer:{icon:"\uD83D\uDDFA\uFE0F",label:"Explorer",color:"#5BAD7A"},alchemist:{icon:"\u2727",label:"Alchemist",color:"#C4A06A"}};
const TYPES={original:{icon:"\u270D",label:"Original Work",color:T.accent},review:{icon:"\uD83D\uDCDD",label:"Review",color:T.gold},recommendation:{icon:"\uD83D\uDCDA",label:"Recommendation",color:T.green},spoiler:{icon:"\uD83D\uDD13",label:"Spoiler Zone",color:T.red}};
const TIERS=[{name:"Fresh Ink",min:0,color:"#8A8474",bg:"rgba(122,112,103,0.1)"},{name:"Wet Ink",min:25,color:"#8BAAB8",bg:"rgba(139,170,184,0.1)"},{name:"Set Ink",min:100,color:"#A0C090",bg:"rgba(160,192,144,0.1)"},{name:"Deep Ink",min:500,color:"#D4A855",bg:"rgba(196,162,101,0.1)"},{name:"Indelible",min:2000,color:"#C47232",bg:"rgba(184,86,42,0.12)"}];
const getTier=ink=>TIERS.slice().reverse().find(t=>ink>=t.min)||TIERS[0];

const USER={name:"Priya Anand",initials:"PA",ink:12300,lens:"empath",handle:"@priyareads"};

// ═══ SHELF DATA ═══
const SHELVED_POSTS=[
  {id:"sp1",type:"original",title:"What My Grandmother Left",author:"Priya Anand",lens:"empath",ink:45,shelvedAt:"Feb 25",words:1840,snippet:"My grandmother left me her tongue. Not the language — the physical fact of her voice…",isOwn:true},
  {id:"sp2",type:"review",title:null,book:{title:"Beloved",author:"Toni Morrison"},author:"Marcus Cole",lens:"analyst",ink:38,shelvedAt:"Feb 24",words:920,snippet:"Morrison doesn't write sentences. She builds rooms you don't realize you've entered until the door closes."},
  {id:"sp3",type:"recommendation",title:null,book:{title:"The Vegetarian",author:"Han Kang"},author:"Yuki Tanaka",lens:"explorer",ink:22,shelvedAt:"Feb 22",words:340,snippet:"If you read Kang's Nobel lecture and felt something shift beneath your feet, start here."},
  {id:"sp4",type:"original",title:"Sixteen Deaths",author:"Priya Anand",lens:"empath",ink:67,shelvedAt:"Feb 20",words:2100,snippet:"My father has died sixteen times. The first was at SFO, 1987, when he forgot my name at the gate.",isOwn:true},
  {id:"sp5",type:"spoiler",title:null,book:{title:"Intermezzo",author:"Sally Rooney"},author:"Davi Santos",lens:"storyteller",ink:18,shelvedAt:"Feb 18",words:780,snippet:"[Spoiler Zone — through page 240] The brothers scene in the hospital…"},
];

const WAYPOINTS=[
  {id:"w1",book:{title:"Beloved",author:"Toni Morrison",pages:324},page:120,lens:"empath",date:"Feb 24",snippet:"Through page 120, Sethe's house at 124 Bluestone Road carries the weight of eighteen years of haunting…"},
  {id:"w2",book:{title:"Intermezzo",author:"Sally Rooney",pages:288},page:195,lens:"analyst",date:"Feb 20",snippet:"Through page 195, Rooney constructs the brothers' estrangement through chess metaphors that mirror…"},
  {id:"w3",book:{title:"Orbital",author:"Samantha Harvey",pages:272},page:80,lens:"philosopher",date:"Feb 15",snippet:"Through page 80, the astronauts' perspective forces a confrontation with the scale question…"},
];

const READING_LIST=[
  {id:"r1",title:"James",author:"Percival Everett",pages:303,addedAt:"Feb 26",progress:0,status:"queued"},
  {id:"r2",title:"Demon Copperhead",author:"Barbara Kingsolver",pages:560,addedAt:"Feb 20",progress:35,status:"reading"},
  {id:"r3",title:"The God of Small Things",author:"Arundhati Roy",pages:340,addedAt:"Feb 14",progress:100,status:"finished"},
  {id:"r4",title:"Beloved",author:"Toni Morrison",pages:324,addedAt:"Feb 10",progress:37,status:"reading"},
];

function Av({i,ink,s}){const t=getTier(ink);return <div style={{width:s,height:s,borderRadius:"50%",background:`linear-gradient(135deg,${t.color}30,${T.bg2})`,border:`1.5px solid ${t.color}25`,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:T.sans,fontSize:s*.35,fontWeight:700,color:t.color,flexShrink:0}}>{i}</div>;}

const pToast=(msg)=>{const el=document.getElementById("shelf-toast");if(!el)return;el.textContent=msg;el.style.display="block";el.style.animation="fadeUp .3s ease";setTimeout(()=>{el.style.display="none";},2500);};


function ThemeSwitcher({tid,setTid}){
  const[open,setOpen]=useState(false);
  return <div style={{position:"relative"}}>
    <button onClick={()=>setOpen(!open)} aria-label="Switch theme" style={{display:"flex",alignItems:"center",justifyContent:"center",width:28,height:28,borderRadius:"50%",border:`1.5px solid ${T.gold}40`,background:`${T.gold}10`,cursor:"pointer",fontSize:13,opacity:open?.9:.7}} onMouseEnter={e=>e.currentTarget.style.opacity="1"} onMouseLeave={e=>e.currentTarget.style.opacity=open?"0.9":"0.7"}>{THEMES[tid].icon}</button>
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

export default function ShelfPage(){
  const{theme,tid,setTid}=useTheme(); T=theme;
  const[tab,setTab]=useState("posts");
  const[sort,setSort]=useState("recent");
  const[filter,setFilter]=useState("all");
  const[vis,setVis]=useState(false);
  const[removedIds,setRemovedIds]=useState([]);
  const[undoId,setUndoId]=useState(null);
  const undoTimer=useRef(null);

  function removePost(id){
    setRemovedIds(p=>[...p,id]);setUndoId(id);
    if(undoTimer.current)clearTimeout(undoTimer.current);
    undoTimer.current=setTimeout(()=>{setUndoId(null);},4000);
  }
  function undoRemove(){
    if(undoId){setRemovedIds(p=>p.filter(x=>x!==undoId));setUndoId(null);if(undoTimer.current)clearTimeout(undoTimer.current);}
  }

  const[shelfPrivate,setShelfPrivate]=useState(false);
  useEffect(()=>{setTimeout(()=>setVis(true),80);},[]);

  const tabs=[
    {id:"posts",label:"Shelved Posts",count:SHELVED_POSTS.filter(p=>!removedIds.includes(p.id)).length,icon:"\u25C6"},
    {id:"waypoints",label:"Waypoints",count:WAYPOINTS.length,icon:"\u27D0"},
    {id:"reading",label:"Reading List",count:READING_LIST.length,icon:"\uD83D\uDCD6"},
  ];

  const filteredPosts=SHELVED_POSTS.filter(p=>!removedIds.includes(p.id)).filter(p=>filter==="all"||p.type===filter)
    .sort((a,b)=>sort==="ink"?b.ink-a.ink:0);

  const sortedReading=READING_LIST.sort((a,b)=>{
    if(sort==="progress")return b.progress-a.progress;
    return 0;
  });

  return <div style={{minHeight:"100vh",background:T.bg,color:T.ink}}>
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,800;1,400;1,700&family=Source+Serif+4:ital,opsz,wght@0,8..60,300;0,8..60,400;0,8..60,600;1,8..60,300;1,8..60,400&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&display=swap');
      *{margin:0;padding:0;box-sizing:border-box}::selection{background:rgba(212,168,85,.2)}body{background:${T.bg}!important}
      @keyframes fadeUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:none}}
      @media(prefers-reduced-motion:reduce){*{animation-duration:0.01ms!important;transition-duration:0.01ms!important}}
      button:focus-visible{outline:2px solid ${T.gold};outline-offset:2px;border-radius:4px}
      @media(max-width:640px){.shelf-tabs{gap:4px!important}.shelf-tabs button{font-size:11px!important;padding:8px 12px!important}.shelf-header{flex-direction:column!important;gap:12px!important}.shelf-filters{flex-wrap:wrap!important}.mob-nav{display:flex!important}}
      @media(prefers-color-scheme:light){body{background:#FAF8F5!important}.shelf-light{background:#FAF8F5!important;color:#2C2418!important}}
    `}</style>

    <div id="shelf-toast" style={{display:"none",position:"fixed",bottom:24,left:"50%",transform:"translateX(-50%)",padding:"10px 24px",borderRadius:10,background:T.bg2,border:`1px solid ${T.borderHover}`,boxShadow:"0 8px 32px rgba(0,0,0,.4)",fontFamily:T.sans,fontSize:12,fontWeight:700,color:T.ink,zIndex:300}}/>
    {undoId&&<div style={{position:"fixed",bottom:24,left:"50%",transform:"translateX(-50%)",padding:"10px 18px",borderRadius:10,background:T.bg2,border:`1px solid ${T.borderHover}`,boxShadow:"0 8px 32px rgba(0,0,0,.4)",fontFamily:T.sans,fontSize:12,fontWeight:700,color:T.ink,zIndex:300,display:"flex",alignItems:"center",gap:12,animation:"fadeUp .3s ease"}}>
      <span>Removed from shelf</span>
      <button onClick={undoRemove} style={{background:"none",border:"none",fontFamily:T.sans,fontSize:11,fontWeight:700,color:T.accent,cursor:"pointer",textDecoration:"underline",textDecorationColor:`${T.accent}50`,padding:0}}>Undo</button>
    </div>}

    {/* Nav */}
    <nav style={{position:"sticky",top:0,zIndex:100,background:`${T.bg}E8`,backdropFilter:"blur(24px)",borderBottom:`1px solid ${T.border}`}}>
      <div style={{maxWidth:760,margin:"0 auto",padding:"12px 24px",display:"flex",alignItems:"center"}}>
        <span style={{fontFamily:T.serif,fontSize:22,fontWeight:700,color:T.ink,letterSpacing:"-.5px",cursor:"pointer"}} onClick={()=>pToast("\u2190 Feed")}>Pr<span style={{color:T.accent}}>{"\u00E9"}</span>cis</span>
        <span style={{fontFamily:T.sans,fontSize:12,color:T.ink3,marginLeft:12,cursor:"pointer"}} onClick={()=>pToast("\u2190 Feed")}>{"\u2190"} Feed</span>
        <div style={{flex:1}}/>
        <ThemeSwitcher tid={tid} setTid={setTid}/>
        <span style={{fontFamily:T.sans,fontSize:13,fontWeight:700,color:T.gold,display:"flex",alignItems:"center",gap:5}}>{"\u25A4"} My Shelf</span>
      </div>
    </nav>

    <main style={{maxWidth:760,margin:"0 auto",padding:"28px 24px 80px",animation:vis?"fadeUp .4s ease both":"none"}}>

      {/* Header */}
      <div className="shelf-header" style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:24}}>
        <div>
          <h1 style={{fontFamily:T.serif,fontSize:28,fontWeight:700,color:T.ink,marginBottom:4}}>My Shelf</h1>
          <p style={{fontFamily:T.body,fontSize:13,color:T.ink3,fontWeight:300}}>Posts you've saved, waypoints you've set, and books you're tracking.</p>
          <button onClick={()=>{setShelfPrivate(p=>!p);pToast(shelfPrivate?"Shelf is now public":"Shelf is now private");}} style={{display:"inline-flex",alignItems:"center",gap:5,marginTop:8,padding:"5px 12px",borderRadius:7,border:`1px solid ${shelfPrivate?`${T.plum}25`:T.border}`,background:shelfPrivate?`${T.plum}06`:"transparent",fontFamily:T.sans,fontSize:10,fontWeight:600,color:shelfPrivate?T.plum:T.ink4,cursor:"pointer"}}>{shelfPrivate?"\uD83D\uDD12 Private shelf \u2014 only you can see this":"\uD83C\uDF10 Public shelf \u2014 visible to others"}</button>
        </div>
        <Av i={USER.initials} ink={USER.ink} s={40}/>
      </div>

      {/* Tabs */}
      <div className="shelf-tabs" style={{display:"flex",gap:6,marginBottom:20,borderBottom:`1px solid ${T.border}`,paddingBottom:12}}>
        {tabs.map(t=><button key={t.id} onClick={()=>{setTab(t.id);setFilter("all");}}
          style={{padding:"8px 16px",borderRadius:8,border:"none",background:tab===t.id?`${T.gold}10`:"transparent",fontFamily:T.sans,fontSize:12,fontWeight:tab===t.id?700:500,color:tab===t.id?T.gold:T.ink3,cursor:"pointer",display:"flex",alignItems:"center",gap:6}}>
          <span style={{fontSize:13}}>{t.icon}</span>{t.label}
          <span style={{fontSize:10,opacity:.6}}>({t.count})</span>
        </button>)}
      </div>

      {/* Filters + Sort */}
      {tab==="posts"&&<div className="shelf-filters" style={{display:"flex",gap:6,marginBottom:16,flexWrap:"wrap"}}>
        {[{id:"all",label:"All"},{id:"original",label:"Original Work"},{id:"review",label:"Reviews"},{id:"recommendation",label:"Recommendations"},{id:"spoiler",label:"Spoiler Zone"}].map(f=>
          <button key={f.id} onClick={()=>setFilter(f.id)}
            style={{padding:"5px 12px",borderRadius:6,border:`1px solid ${filter===f.id?`${T.gold}25`:T.border}`,background:filter===f.id?`${T.gold}08`:"transparent",fontFamily:T.sans,fontSize:10,fontWeight:filter===f.id?700:500,color:filter===f.id?T.gold:T.ink4,cursor:"pointer"}}>{f.label}</button>
        )}
        <div style={{flex:1}}/>
        <select value={sort} onChange={e=>setSort(e.target.value)} aria-label="Sort order"
          style={{padding:"5px 10px",borderRadius:6,background:T.bg3,border:`1px solid ${T.border}`,fontFamily:T.sans,fontSize:10,color:T.ink3,cursor:"pointer"}}>
          <option value="recent">Most recent</option>
          <option value="ink">Most Ink</option>
        </select>
      </div>}

      {/* Posts tab */}
      {tab==="posts"&&<div style={{display:"flex",flexDirection:"column",gap:10}}>
        {filteredPosts.length===0?
          <div style={{textAlign:"center",padding:"48px 20px"}}>
            <div style={{fontSize:32,opacity:.3,marginBottom:12}}>{"\u25C6"}</div>
            <div style={{fontFamily:T.serif,fontSize:16,fontWeight:700,color:T.ink,fontStyle:"italic",marginBottom:4}}>Nothing shelved yet</div>
            <div style={{fontFamily:T.body,fontSize:12,color:T.ink3,fontWeight:300}}>When you find writing that stays with you, shelve it here.</div>
          </div>
        :filteredPosts.map(p=>{
          const tc=TYPES[p.type];const lens=LENSES[p.lens];
          return <div key={p.id} style={{background:T.card,border:`1px solid ${T.border}`,borderRadius:12,padding:"16px 20px",animation:"fadeUp .3s ease both"}}>
            <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10,flexWrap:"wrap"}}>
              <span style={{display:"inline-flex",alignItems:"center",gap:4,padding:"3px 10px",borderRadius:20,fontSize:10,fontWeight:600,fontFamily:T.sans,color:tc.color,background:`${tc.color}12`,border:`1px solid ${tc.color}20`}}>{tc.icon} {tc.label}</span>
              <span style={{display:"inline-flex",alignItems:"center",gap:3,padding:"2px 7px",borderRadius:5,fontSize:9,fontWeight:700,fontFamily:T.sans,color:lens.color,background:`${lens.color}12`}}>{lens.icon} {lens.label}</span>
              {p.isOwn&&<span style={{fontFamily:T.sans,fontSize:9,color:T.green,fontWeight:600}}>Your post</span>}
              <div style={{flex:1}}/>
              <span style={{fontFamily:T.sans,fontSize:10,color:T.ink4}}>{p.shelvedAt}</span>
            </div>
            {p.title&&<div style={{fontFamily:T.serif,fontSize:15,fontWeight:700,color:T.ink,fontStyle:"italic",marginBottom:4}}>{p.title}</div>}
            {p.book&&<div style={{fontFamily:T.sans,fontSize:11,color:T.ink3,marginBottom:4}}>on <strong style={{color:T.ink}}>{p.book.title}</strong> by {p.book.author}</div>}
            <div style={{fontFamily:T.body,fontSize:13,color:T.ink2,fontWeight:300,lineHeight:1.6,marginBottom:10}}>{p.snippet}</div>
            <div style={{display:"flex",alignItems:"center",gap:12,fontFamily:T.sans,fontSize:10,color:T.ink4}}>
              <span>by <strong style={{color:T.ink3}}>{p.author}</strong></span>
              <span>{p.words} words</span>
              <span style={{color:T.gold,fontWeight:600}}>+{p.ink} Ink</span>
              <div style={{flex:1}}/>
              <button onClick={()=>removePost(p.id)} style={{background:"none",border:"none",fontFamily:T.sans,fontSize:10,color:T.ink4,cursor:"pointer",opacity:.6}}>{"\u00D7"} Remove</button>
            </div>
          </div>;
        })}
      </div>}

      {/* Waypoints tab */}
      {tab==="waypoints"&&<div style={{display:"flex",flexDirection:"column",gap:10}}>
        {WAYPOINTS.length===0?
          <div style={{textAlign:"center",padding:"48px 20px"}}>
            <div style={{fontSize:32,opacity:.3,marginBottom:12}}>{"\u27D0"}</div>
            <div style={{fontFamily:T.serif,fontSize:16,fontWeight:700,color:T.ink,fontStyle:"italic",marginBottom:4}}>No waypoints yet</div>
            <div style={{fontFamily:T.body,fontSize:12,color:T.ink3,fontWeight:300}}>Open the Compass and set your first waypoint.</div>
          </div>
        :WAYPOINTS.map(w=>{
          const lens=LENSES[w.lens];const pct=Math.round((w.page/w.book.pages)*100);
          return <div key={w.id} style={{background:T.card,border:`1px solid ${T.border}`,borderRadius:12,padding:"16px 20px",cursor:"pointer",animation:"fadeUp .3s ease both"}} onClick={()=>pToast(`Opening Compass for ${w.book.title}…`)}>
            <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:10}}>
              <div style={{width:28,height:40,borderRadius:"1px 4px 4px 1px",background:`linear-gradient(135deg,${T.accent}CC,#6B2A10)`,boxShadow:"1px 0 4px rgba(0,0,0,.3)",flexShrink:0}}/>
              <div style={{flex:1}}>
                <div style={{fontFamily:T.serif,fontSize:14,fontWeight:700,color:T.ink}}>{w.book.title}</div>
                <div style={{fontFamily:T.body,fontSize:11,color:T.ink3,fontStyle:"italic"}}>{w.book.author}</div>
              </div>
              <span style={{display:"inline-flex",alignItems:"center",gap:3,padding:"2px 7px",borderRadius:5,fontSize:9,fontWeight:700,fontFamily:T.sans,color:lens.color,background:`${lens.color}12`}}>{lens.icon} {lens.label}</span>
            </div>
            <div style={{marginBottom:8}}>
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:3}}>
                <span style={{fontFamily:T.sans,fontSize:10,fontWeight:600,color:T.blue}}>Page {w.page} of {w.book.pages}</span>
                <span style={{fontFamily:T.sans,fontSize:10,color:T.ink4}}>{pct}%</span>
              </div>
              <div style={{height:3,borderRadius:2,background:T.bg3,overflow:"hidden"}}>
                <div style={{width:`${pct}%`,height:"100%",borderRadius:2,background:`linear-gradient(90deg,${T.blue},${lens.color})`}}/>
              </div>
            </div>
            <div style={{fontFamily:T.body,fontSize:12,color:T.ink2,fontWeight:300,lineHeight:1.6,fontStyle:"italic"}}>{w.snippet}</div>
            <div style={{fontFamily:T.sans,fontSize:10,color:T.ink4,marginTop:6}}>{w.date}</div>
          </div>;
        })}
        <button onClick={()=>pToast("Opening Compass…")} style={{width:"100%",padding:"14px",borderRadius:12,border:`1px dashed ${T.blue}25`,background:`${T.blue}04`,fontFamily:T.sans,fontSize:13,fontWeight:700,color:T.blue,cursor:"pointer"}}>{"\u27D0"} Set a new waypoint</button>
      </div>}

      {/* Reading List tab */}
      {tab==="reading"&&<div style={{display:"flex",flexDirection:"column",gap:10}}>
        {["reading","queued","finished"].map(status=>{
          const items=sortedReading.filter(r=>r.status===status);
          if(items.length===0)return null;
          const label=status==="reading"?"Currently Reading":status==="queued"?"Up Next":"Finished";
          return <div key={status}>
            <div style={{fontFamily:T.sans,fontSize:10,fontWeight:700,color:T.ink4,letterSpacing:".5px",textTransform:"uppercase",marginBottom:8,marginTop:status!=="reading"?16:0}}>{label} ({items.length})</div>
            {items.map(r=>{
              return <div key={r.id} style={{background:T.card,border:`1px solid ${T.border}`,borderRadius:12,padding:"14px 18px",marginBottom:8,display:"flex",alignItems:"center",gap:14}}>
                <div style={{width:28,height:40,borderRadius:"1px 4px 4px 1px",background:`linear-gradient(135deg,${T.accent}CC,#6B2A10)`,boxShadow:"1px 0 4px rgba(0,0,0,.3)",flexShrink:0}}/>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{fontFamily:T.serif,fontSize:13,fontWeight:700,color:T.ink}}>{r.title}</div>
                  <div style={{fontFamily:T.body,fontSize:11,color:T.ink3,fontStyle:"italic"}}>{r.author} · {r.pages} pages</div>
                  {r.progress>0&&r.progress<100&&<div style={{marginTop:4}}>
                    <div style={{height:3,borderRadius:2,background:T.bg3,overflow:"hidden",maxWidth:200}}>
                      <div style={{width:`${r.progress}%`,height:"100%",borderRadius:2,background:T.accent}}/>
                    </div>
                    <span style={{fontFamily:T.sans,fontSize:9,color:T.ink4,marginTop:2,display:"inline-block"}}>{r.progress}%</span>
                  </div>}
                  {r.progress===100&&<span style={{fontFamily:T.sans,fontSize:9,color:T.green,fontWeight:600,marginTop:2,display:"inline-block"}}>{"\u2713"} Finished</span>}
                </div>
                <div style={{display:"flex",gap:4,flexShrink:0}}>
                  <button onClick={()=>pToast(`Opening ${r.title} Community…`)} style={{padding:"6px 10px",borderRadius:6,border:`1px solid ${T.border}`,background:"transparent",fontFamily:T.sans,fontSize:9,color:T.ink3,cursor:"pointer"}}>{"\uD83D\uDCD6"}</button>
                  <button onClick={()=>pToast(`Opening Compass for ${r.title}…`)} style={{padding:"6px 10px",borderRadius:6,border:`1px solid ${T.blue}20`,background:`${T.blue}06`,fontFamily:T.sans,fontSize:9,color:T.blue,cursor:"pointer"}}>{"\u27D0"}</button>
                </div>
              </div>;
            })}
          </div>;
        })}
        <button onClick={()=>pToast("Search for a book…")} style={{width:"100%",padding:"14px",borderRadius:12,border:`1px dashed ${T.gold}25`,background:`${T.gold}04`,fontFamily:T.sans,fontSize:13,fontWeight:700,color:T.gold,cursor:"pointer"}}>+ Add a book</button>
      </div>}

    </main>

    {/* Mobile Bottom Nav */}
    <nav className="mob-nav" aria-label="Mobile navigation" style={{position:"fixed",bottom:0,left:0,right:0,zIndex:200,background:`${T.bg}F2`,backdropFilter:"blur(20px)",borderTop:`1px solid ${T.border}`,display:"none",padding:"6px 0 env(safe-area-inset-bottom,8px)"}}>
      <div style={{display:"flex",justifyContent:"space-around",maxWidth:480,margin:"0 auto"}}>
        {[{id:"feed",icon:"\u25A3",label:"Feed"},{id:"explore",icon:"\uD83C\uDF0D",label:"Explore"},{id:"press",icon:"\uD83D\uDCF0",label:"The Press"},{id:"compose",icon:"\u270D",label:"Write"},{id:"shelf",icon:"\u25C6",label:"Shelf",active:true},{id:"profile",icon:"\u25CF",label:"Profile"}].map(n=>
          <button key={n.id} onClick={()=>pToast(`Opening ${n.label}\u2026`)} style={{display:"flex",flexDirection:"column",alignItems:"center",gap:2,padding:"6px 12px",border:"none",background:"none",cursor:"pointer",minWidth:48,minHeight:44}}>
            <span style={{fontSize:18,opacity:n.active?1:.5}}>{n.icon}</span>
            <span style={{fontFamily:T.sans,fontSize:9,fontWeight:n.active?700:500,color:n.active?T.gold:T.ink4}}>{n.label}</span>
          </button>)}
      </div>
    </nav>

  </div>;
}
