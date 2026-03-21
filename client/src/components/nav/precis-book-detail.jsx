import { useState, useEffect } from "react";

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
const TIERS=[{name:"Fresh Ink",min:0,color:"#8A8474",bg:"rgba(122,112,103,0.1)"},{name:"Wet Ink",min:25,color:"#8BAAB8",bg:"rgba(139,170,184,0.1)"},{name:"Set Ink",min:100,color:"#A0C090",bg:"rgba(160,192,144,0.1)"},{name:"Deep Ink",min:500,color:"#D4A855",bg:"rgba(196,162,101,0.1)"},{name:"Indelible",min:2000,color:"#C47232",bg:"rgba(184,86,42,0.12)"}];
const getTier=ink=>TIERS.slice().reverse().find(t=>ink>=t.min)||TIERS[0];
const IB=({ink})=>{const t=getTier(ink);return <span style={{display:"inline-flex",alignItems:"center",gap:3,padding:"2px 7px",borderRadius:5,fontSize:9,fontWeight:700,fontFamily:T.sans,color:t.color,background:`${t.color}12`,border:`1px solid ${t.color}18`}}><span style={{fontSize:7}}>{"\u25CF"}</span>{t.name}</span>;};
function Av({i,ink,s}){const t=getTier(ink);return <div style={{width:s,height:s,borderRadius:"50%",background:`linear-gradient(135deg,${t.color}30,${T.bg2})`,border:`1.5px solid ${t.color}25`,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:T.sans,fontSize:s*.35,fontWeight:700,color:t.color,flexShrink:0}}>{i}</div>;}

const BOOK={title:"Beloved",author:"Toni Morrison",year:1987,pages:324,genre:"Literary Fiction",publisher:"Alfred A. Knopf",description:"Staring unflinchingly into the abyss of slavery, this spellbinding novel transforms history into a story as powerful as Exodus and as intimate as a lullaby.",awards:["Pulitzer Prize for Fiction (1988)","Nobel Prize in Literature (1993)"],themes:["Memory","Trauma","Motherhood","Freedom","Haunting"]};
const CS={readers:342,reviews:87,waypoints:156,recommendations:64,activeClubs:3,recentActivity:24,lensBreakdown:{analyst:18,empath:31,philosopher:22,storyteller:14,explorer:8,alchemist:7}};
const POSTS=[
  {id:"p1",type:"review",author:{name:"Marcus Cole",initials:"MC",ink:4200,lens:"analyst"},snippet:"Morrison doesn\u2019t write sentences. She builds rooms you don\u2019t realize you\u2019ve entered until the door closes.",ink:38,time:"2h ago",words:920},
  {id:"p2",type:"review",author:{name:"Ava Chen",initials:"AC",ink:890,lens:"empath"},snippet:"I had to put it down three times. Not because it was hard to read \u2014 because it was too easy to feel.",ink:22,time:"5h ago",words:640},
  {id:"p3",type:"recommendation",author:{name:"Davi Santos",initials:"DS",ink:1800,lens:"explorer"},snippet:"If the American canon feels like a house you know too well, this book moves the walls.",ink:31,time:"1d ago",words:280},
];
const RELATED=[{title:"Song of Solomon",author:"Toni Morrison",readers:218},{title:"The Color Purple",author:"Alice Walker",readers:189},{title:"Kindred",author:"Octavia Butler",readers:276},{title:"Homegoing",author:"Yaa Gyasi",readers:152}];
const USER={initials:"PA",ink:12300};
const pToast=msg=>{const el=document.getElementById("bk-toast");if(!el)return;el.textContent=msg;el.style.display="block";el.style.animation="fadeUp .3s ease";setTimeout(()=>el.style.display="none",2500);};

function ReviewDetailCard({p,lens}){
  const[menu,setMenu]=useState(false);
  return <div style={{background:T.card,border:`1px solid ${T.border}`,borderRadius:12,padding:"16px 20px"}}>
    <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:10}}>
      <Av i={p.author.initials} ink={p.author.ink} s={32}/>
      <div style={{flex:1}}><div style={{display:"flex",alignItems:"center",gap:6}}><span style={{fontFamily:T.sans,fontSize:12,fontWeight:700,color:T.ink}}>{p.author.name}</span><IB ink={p.author.ink}/></div><div style={{fontFamily:T.sans,fontSize:10,color:T.ink4}}>{p.time} {"\u00B7"} {lens.icon} {lens.label}</div></div>
      <div style={{position:"relative"}}>
        <button onClick={()=>setMenu(!menu)} aria-label="Review options" style={{padding:"4px 6px",borderRadius:5,border:"none",background:"transparent",fontSize:14,color:T.ink4,cursor:"pointer",lineHeight:1}}>{"\u22EF"}</button>
        {menu&&<div onClick={()=>setMenu(false)} style={{position:"absolute",top:"100%",right:0,marginTop:4,width:180,background:T.card,border:`1px solid ${T.borderHover}`,borderRadius:10,overflow:"hidden",boxShadow:"0 8px 32px rgba(0,0,0,.5)",zIndex:20}}>
          <button onClick={()=>pToast("Opening conversation\u2026")} style={{display:"block",width:"100%",padding:"10px 14px",border:"none",background:"transparent",fontFamily:T.sans,fontSize:11,fontWeight:600,color:T.ink,textAlign:"left",cursor:"pointer"}} onMouseEnter={e=>e.currentTarget.style.background=T.bg3} onMouseLeave={e=>e.currentTarget.style.background="transparent"}>{"\u2709"} Message</button>
          <button onClick={()=>pToast(`Muted ${p.author.name}`)} style={{display:"block",width:"100%",padding:"10px 14px",border:"none",background:"transparent",fontFamily:T.sans,fontSize:11,fontWeight:600,color:T.ink,textAlign:"left",cursor:"pointer"}} onMouseEnter={e=>e.currentTarget.style.background=T.bg3} onMouseLeave={e=>e.currentTarget.style.background="transparent"}>{"\uD83D\uDD07"} Mute</button>
          <button onClick={()=>pToast("Report submitted \u2014 thank you")} style={{display:"block",width:"100%",padding:"10px 14px",border:"none",background:"transparent",fontFamily:T.sans,fontSize:11,fontWeight:600,color:T.red,textAlign:"left",cursor:"pointer"}} onMouseEnter={e=>e.currentTarget.style.background=T.bg3} onMouseLeave={e=>e.currentTarget.style.background="transparent"}>{"\u26A0"} Report</button>
        </div>}
      </div>
    </div>
    <div style={{fontFamily:T.body,fontSize:13,color:T.ink2,fontWeight:300,lineHeight:1.7,marginBottom:8}}>{p.snippet}</div>
    <div style={{display:"flex",alignItems:"center",gap:12,fontFamily:T.sans,fontSize:10,color:T.ink4}}><span>{p.words} words</span><span style={{color:T.gold,fontWeight:600}}>+{p.ink} Ink</span></div>
  </div>;
}


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

export default function BookDetail(){
  const{theme,tid,setTid}=useTheme(); T=theme;
  const[tab,setTab]=useState("overview");
  const[shelved,setShelved]=useState(false);
  const[onList,setOnList]=useState(false);
  const[vis,setVis]=useState(false);
  useEffect(()=>{setTimeout(()=>setVis(true),80);},[]);
  const progress=37;
  const topLens=Object.entries(CS.lensBreakdown).sort((a,b)=>b[1]-a[1]).slice(0,3);
  const total=Object.values(CS.lensBreakdown).reduce((a,b)=>a+b,0);

  return <div style={{minHeight:"100vh",background:T.bg,color:T.ink}}>
    <style>{`
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,800;1,400;1,700&family=Source+Serif+4:ital,opsz,wght@0,8..60,300;0,8..60,400;0,8..60,600;1,8..60,300;1,8..60,400&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&display=swap');
*{margin:0;padding:0;box-sizing:border-box}::selection{background:rgba(212,168,85,.2)}body{background:${T.bg}!important}
@keyframes fadeUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:none}}
@keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}
button:focus-visible{outline:2px solid ${T.gold};outline-offset:2px}
@media(prefers-reduced-motion:reduce){*{animation-duration:0.01ms!important;transition-duration:0.01ms!important}}
@media(max-width:640px){.mob-nav{display:flex!important;}.bk-hero{flex-direction:column!important;text-align:center!important;gap:20px!important}.bk-hero-meta{align-items:center!important}.bk-acts{flex-direction:column!important}.bk-acts button{width:100%!important}.sg{grid-template-columns:repeat(2,1fr)!important}.rg{grid-template-columns:1fr 1fr!important}}
@media(max-width:420px){.sg{grid-template-columns:1fr!important}}
    `}</style>
    <div id="bk-toast" style={{display:"none",position:"fixed",bottom:24,left:"50%",transform:"translateX(-50%)",padding:"10px 24px",borderRadius:10,background:T.bg2,border:`1px solid ${T.borderHover}`,boxShadow:"0 8px 32px rgba(0,0,0,.4)",fontFamily:T.sans,fontSize:12,fontWeight:700,color:T.ink,zIndex:300}}/>

    <nav style={{position:"sticky",top:0,zIndex:100,background:`${T.bg}E8`,backdropFilter:"blur(24px)",borderBottom:`1px solid ${T.border}`}}>
      <div style={{maxWidth:800,margin:"0 auto",padding:"12px 24px",display:"flex",alignItems:"center",gap:12}}>
        <span style={{fontFamily:T.serif,fontSize:22,fontWeight:700,color:T.ink,letterSpacing:"-.5px",cursor:"pointer"}} onClick={()=>pToast("\u2190 Feed")}>Pr<span style={{color:T.accent}}>{"\u00E9"}</span>cis</span>
        <span style={{fontFamily:T.sans,fontSize:12,color:T.ink3,cursor:"pointer"}} onClick={()=>pToast("\u2190 Feed")}>{"\u2190"} Feed</span>
        <div style={{flex:1}}/>
        <ThemeSwitcher tid={tid} setTid={setTid}/><Av i={USER.initials} ink={USER.ink} s={30}/>
      </div>
    </nav>

    <main style={{maxWidth:800,margin:"0 auto",padding:"32px 24px 80px",animation:vis?"fadeUp .4s ease both":"none"}}>
      {/* Hero */}
      <div className="bk-hero" style={{display:"flex",gap:32,marginBottom:32}}>
        <div style={{flexShrink:0}}>
          <div style={{width:160,height:240,borderRadius:"2px 8px 8px 2px",background:`linear-gradient(145deg,${T.accent}DD,#6B2A10 40%,#3D1E0E)`,boxShadow:"4px 0 20px rgba(0,0,0,.5),inset -2px 0 8px rgba(255,255,255,.05)",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",padding:20,textAlign:"center",position:"relative",overflow:"hidden",animation:"float 5s ease infinite"}}>
            <div style={{position:"absolute",top:0,left:0,width:6,height:"100%",background:"linear-gradient(90deg,rgba(0,0,0,.3),transparent)"}}/>
            <div style={{fontFamily:T.serif,fontSize:18,fontWeight:700,color:"#F5EDE0",lineHeight:1.2,marginBottom:8,textShadow:"0 1px 6px rgba(0,0,0,.4)"}}>{BOOK.title}</div>
            <div style={{fontFamily:T.body,fontSize:11,color:"rgba(245,237,224,.65)",fontStyle:"italic"}}>{BOOK.author}</div>
          </div>
        </div>
        <div className="bk-hero-meta" style={{flex:1,display:"flex",flexDirection:"column",justifyContent:"center"}}>
          <h1 style={{fontFamily:T.serif,fontSize:32,fontWeight:800,color:T.ink,letterSpacing:"-1px",lineHeight:1.15,marginBottom:4}}>{BOOK.title}</h1>
          <div style={{fontFamily:T.body,fontSize:15,color:T.ink2,fontWeight:300,fontStyle:"italic",marginBottom:12}}>by {BOOK.author} {"\u00B7"} {BOOK.year}</div>
          <div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:14}}>
            <span style={{padding:"3px 10px",borderRadius:6,fontSize:10,fontWeight:600,fontFamily:T.sans,color:T.gold,background:`${T.gold}10`,border:`1px solid ${T.gold}15`}}>{BOOK.genre}</span>
            <span style={{padding:"3px 10px",borderRadius:6,fontSize:10,fontWeight:600,fontFamily:T.sans,color:T.ink3,background:T.bg3}}>{BOOK.pages} pages</span>
            <span style={{padding:"3px 10px",borderRadius:6,fontSize:10,fontWeight:600,fontFamily:T.sans,color:T.ink3,background:T.bg3}}>{BOOK.publisher}</span>
          </div>
          {BOOK.awards.map((a,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:6,marginBottom:4}}><span style={{fontSize:10,color:T.gold}}>{"\u2605"}</span><span style={{fontFamily:T.sans,fontSize:10,fontWeight:600,color:T.gold}}>{a}</span></div>)}
          <div style={{marginTop:14,padding:"12px 16px",borderRadius:10,background:`${T.accent}06`,border:`1px solid ${T.accent}10`}}>
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:4}}>
              <span style={{fontFamily:T.sans,fontSize:10,fontWeight:700,color:T.ink3}}>Your progress</span>
              <span style={{fontFamily:T.sans,fontSize:11,fontWeight:700,color:T.accent}}>{progress}%</span>
            </div>
            <div style={{height:4,borderRadius:2,background:T.bg3,overflow:"hidden"}}><div style={{width:`${progress}%`,height:"100%",borderRadius:2,background:`linear-gradient(90deg,${T.accent},${T.gold})`}}/></div>
            <div style={{fontFamily:T.sans,fontSize:9,color:T.ink4,marginTop:4}}>Page {Math.round(BOOK.pages*progress/100)} of {BOOK.pages}</div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="bk-acts" style={{display:"flex",gap:8,marginBottom:28,flexWrap:"wrap"}}>
        <button onClick={()=>pToast("Opening Compass\u2026")} style={{flex:1,padding:"12px 20px",borderRadius:10,border:"none",background:`linear-gradient(135deg,${T.accent},#9E4520)`,color:"#fff",fontFamily:T.sans,fontSize:13,fontWeight:700,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:6,boxShadow:`0 2px 12px ${T.accent}30`}}>{"\u27D0"} Set a Waypoint</button>
        <button onClick={()=>pToast("Opening Compose\u2026")} style={{flex:1,padding:"12px 20px",borderRadius:10,border:`1px solid ${T.border}`,background:"transparent",color:T.ink3,fontFamily:T.sans,fontSize:13,fontWeight:700,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:6}}>{"\u270D"} Write about this book</button>
        <button onClick={()=>{setShelved(!shelved);pToast(shelved?"Removed from shelf":"\u25C6 Added to shelf");}} style={{padding:"12px 16px",borderRadius:10,border:`1px solid ${shelved?`${T.green}25`:T.border}`,background:shelved?`${T.green}08`:"transparent",color:shelved?T.green:T.ink4,fontFamily:T.sans,fontSize:13,fontWeight:700,cursor:"pointer"}}>{shelved?"\u2713 Shelved":"\u25C6 Shelf"}</button>
        <button onClick={()=>{setOnList(!onList);pToast(onList?"Removed from list":"\uD83D\uDCD6 Added to reading list");}} style={{padding:"12px 16px",borderRadius:10,border:`1px solid ${onList?`${T.blue}25`:T.border}`,background:onList?`${T.blue}08`:"transparent",color:onList?T.blue:T.ink4,fontFamily:T.sans,fontSize:13,fontWeight:700,cursor:"pointer"}}>{onList?"\u2713 Reading":"\uD83D\uDCD6 Read"}</button>
      </div>

      {/* Tabs */}
      <div style={{display:"flex",gap:6,marginBottom:24,borderBottom:`1px solid ${T.border}`,paddingBottom:12}}>
        {[{id:"overview",label:"Overview"},{id:"community",label:"Community",count:CS.readers},{id:"reviews",label:"Reviews",count:CS.reviews}].map(t=><button key={t.id} onClick={()=>setTab(t.id)} style={{padding:"8px 16px",borderRadius:8,border:"none",background:tab===t.id?`${T.gold}10`:"transparent",fontFamily:T.sans,fontSize:12,fontWeight:tab===t.id?700:500,color:tab===t.id?T.gold:T.ink3,cursor:"pointer"}}>{t.label}{t.count?<span style={{fontSize:10,opacity:.6,marginLeft:4}}>({t.count})</span>:null}</button>)}
      </div>

      {tab==="overview"&&<div>
        <div style={{marginBottom:28}}><div style={{fontFamily:T.body,fontSize:14,color:T.ink2,fontWeight:300,lineHeight:1.85,fontStyle:"italic"}}>{BOOK.description}</div></div>
        <div style={{marginBottom:28}}>
          <div style={{fontFamily:T.sans,fontSize:10,fontWeight:700,color:T.ink4,letterSpacing:".5px",textTransform:"uppercase",marginBottom:10}}>Themes</div>
          <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>{BOOK.themes.map(t=><span key={t} style={{padding:"5px 12px",borderRadius:8,border:`1px solid ${T.border}`,fontFamily:T.sans,fontSize:11,color:T.ink3,fontWeight:500}}>{t}</span>)}</div>
        </div>
        <div style={{marginBottom:28}}>
          <div style={{fontFamily:T.sans,fontSize:10,fontWeight:700,color:T.ink4,letterSpacing:".5px",textTransform:"uppercase",marginBottom:12}}>Community</div>
          <div className="sg" style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8}}>
            {[{n:CS.readers,l:"Readers"},{n:CS.reviews,l:"Reviews"},{n:CS.waypoints,l:"Waypoints"},{n:CS.recommendations,l:"Recommendations"},{n:CS.activeClubs,l:"Book Clubs"},{n:CS.recentActivity,l:"Active this week"}].map((s,i)=><div key={i} style={{padding:14,borderRadius:10,background:T.card,border:`1px solid ${T.border}`,textAlign:"center"}}><div style={{fontFamily:T.sans,fontSize:20,fontWeight:800,color:T.gold}}>{s.n}</div><div style={{fontFamily:T.sans,fontSize:9,color:T.ink4,marginTop:2}}>{s.l}</div></div>)}
          </div>
        </div>
        <div style={{marginBottom:28}}>
          <div style={{fontFamily:T.sans,fontSize:10,fontWeight:700,color:T.ink4,letterSpacing:".5px",textTransform:"uppercase",marginBottom:10}}>How readers approach this book</div>
          <div style={{padding:"16px 20px",borderRadius:12,background:T.card,border:`1px solid ${T.border}`}}>
            <div style={{display:"flex",gap:4,height:6,borderRadius:3,overflow:"hidden",marginBottom:12}}>
              {Object.entries(CS.lensBreakdown).map(([k,v])=><div key={k} style={{width:`${(v/total)*100}%`,background:LENSES[k].color}}/>)}
            </div>
            <div style={{display:"flex",gap:12,flexWrap:"wrap"}}>
              {topLens.map(([k,v])=><div key={k} style={{display:"flex",alignItems:"center",gap:4}}><div style={{width:8,height:8,borderRadius:"50%",background:LENSES[k].color}}/><span style={{fontFamily:T.sans,fontSize:10,color:T.ink3}}>{LENSES[k].icon} {LENSES[k].label} {v}%</span></div>)}
            </div>
          </div>
        </div>
        <div>
          <div style={{fontFamily:T.sans,fontSize:10,fontWeight:700,color:T.ink4,letterSpacing:".5px",textTransform:"uppercase",marginBottom:10}}>If you read this, try</div>
          <div className="rg" style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:8}}>
            {RELATED.map((b,i)=><div key={i} onClick={()=>pToast(`Opening ${b.title}\u2026`)} style={{padding:"14px 12px",borderRadius:10,background:T.card,border:`1px solid ${T.border}`,cursor:"pointer",textAlign:"center",transition:"border-color .2s"}} onMouseEnter={e=>e.currentTarget.style.borderColor=T.borderHover} onMouseLeave={e=>e.currentTarget.style.borderColor=T.border}>
              <div style={{width:40,height:58,borderRadius:"1px 4px 4px 1px",background:`linear-gradient(145deg,${T.accent}AA,#6B2A10)`,boxShadow:"2px 0 8px rgba(0,0,0,.3)",margin:"0 auto 8px"}}/>
              <div style={{fontFamily:T.serif,fontSize:11,fontWeight:700,color:T.ink,lineHeight:1.2}}>{b.title}</div>
              <div style={{fontFamily:T.body,fontSize:10,color:T.ink3,fontStyle:"italic",marginTop:2}}>{b.author}</div>
              <div style={{fontFamily:T.sans,fontSize:9,color:T.ink4,marginTop:4}}>{b.readers} readers</div>
            </div>)}
          </div>
        </div>
      </div>}

      {tab==="community"&&<div>
        <div style={{padding:"16px 20px",borderRadius:12,background:T.card,border:`1px solid ${T.border}`,marginBottom:16}}>
          <div style={{fontFamily:T.serif,fontSize:15,fontWeight:700,color:T.ink,marginBottom:4}}>{CS.readers} readers on Pr{"\u00E9"}cis</div>
          <div style={{fontFamily:T.body,fontSize:12,color:T.ink3,fontWeight:300,lineHeight:1.6}}>{CS.recentActivity} active this week {"\u00B7"} {CS.activeClubs} book clubs reading now</div>
        </div>
        <button onClick={()=>pToast("Opening full community\u2026")} style={{width:"100%",padding:14,borderRadius:10,border:`1px solid ${T.border}`,background:T.card,fontFamily:T.sans,fontSize:13,fontWeight:700,color:T.gold,cursor:"pointer"}}>{"\uD83D\uDCD6"} View Full Community Page</button>
      </div>}

      {tab==="reviews"&&<div style={{display:"flex",flexDirection:"column",gap:10}}>
        {POSTS.map(p=>{const lens=LENSES[p.author.lens];return <ReviewDetailCard key={p.id} p={p} lens={lens}/>;})}
        <button onClick={()=>pToast("Opening Compose\u2026")} style={{width:"100%",padding:14,borderRadius:12,border:`1px dashed ${T.accent}25`,background:`${T.accent}04`,fontFamily:T.sans,fontSize:13,fontWeight:700,color:T.accent,cursor:"pointer"}}>{"\u270D"} Write a review</button>
      </div>}
    </main>

    {/* Mobile Bottom Nav */}
    <nav className="mob-nav" aria-label="Mobile navigation" style={{position:"fixed",bottom:0,left:0,right:0,zIndex:200,background:`${T.bg}F2`,backdropFilter:"blur(20px)",borderTop:`1px solid ${T.border}`,display:"none",padding:"6px 0 env(safe-area-inset-bottom,8px)"}}>
      <div style={{display:"flex",justifyContent:"space-around",maxWidth:480,margin:"0 auto"}}>
        {[
          {id:"feed",icon:"\u25A3",label:"Feed",active:true},
          {id:"explore",icon:"\uD83C\uDF0D",label:"Explore",active:false},
          {id:"press",icon:"\uD83D\uDCF0",label:"The Press",active:false},
          {id:"compose",icon:"\u270D",label:"Write",active:false},
          {id:"shelf",icon:"\u25C6",label:"Shelf",active:false},
          {id:"profile",icon:"\u25CF",label:"Profile",active:false}
        ].map(n=><button key={n.id} onClick={()=>pToast(n.active?"":`Opening ${n.label}\u2026`)}
          style={{display:"flex",flexDirection:"column",alignItems:"center",gap:2,padding:"6px 12px",border:"none",background:"none",cursor:"pointer",minWidth:48,minHeight:44}}>
          <span style={{fontSize:18,opacity:n.active?1:.5}}>{n.icon}</span>
          <span style={{fontFamily:T.sans,fontSize:9,fontWeight:n.active?700:500,color:n.active?T.gold:T.ink4}}>{n.label}</span>
        </button>)}
      </div>
    </nav>
  </div>;
}
