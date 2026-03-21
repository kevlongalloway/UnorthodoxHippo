import { useState, useEffect, useRef } from "react";


// ═══════════════════════════════════════════════════
// THEME SYSTEM — 4 themes, user-switchable
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
function useTheme(){
  const[tid,setTid]=useState(THEME_DEFAULT);
  return{theme:THEMES[tid],tid,setTid};
}
let T=THEMES[THEME_DEFAULT];

function ThemeSwitcher({tid,setTid}){
  const[open,setOpen]=useState(false);
  const ref=useRef(null);
  useEffect(()=>{if(!open)return;const h=e=>{if(ref.current&&!ref.current.contains(e.target))setOpen(false);};const k=e=>{if(e.key==="Escape")setOpen(false);};document.addEventListener("mousedown",h);document.addEventListener("keydown",k);return()=>{document.removeEventListener("mousedown",h);document.removeEventListener("keydown",k);};},[open]);
  return <div ref={ref} style={{position:"relative"}}>
    <button onClick={()=>setOpen(!open)} aria-label="Switch reading theme" aria-haspopup="listbox" aria-expanded={open}
      style={{display:"flex",alignItems:"center",justifyContent:"center",width:28,height:28,borderRadius:"50%",border:`1.5px solid ${T.gold}40`,background:`${T.gold}10`,cursor:"pointer",fontSize:13,transition:"all .2s",opacity:open?.9:.7}}
      onMouseEnter={e=>e.currentTarget.style.opacity="1"} onMouseLeave={e=>e.currentTarget.style.opacity=open?"0.9":"0.7"}>
      {THEMES[tid].icon}
    </button>
    {open&&<div role="listbox" className="fc" style={{position:"absolute",top:"calc(100% + 8px)",right:0,background:T.card,border:`1px solid ${T.borderHover}`,borderRadius:14,padding:6,zIndex:60,boxShadow:"0 12px 40px rgba(0,0,0,.35)",animation:"slideUp .15s ease",minWidth:200}}>
      <div style={{padding:"4px 12px 8px",fontFamily:T.sans,fontSize:9,fontWeight:700,color:T.ink4,letterSpacing:".5px",textTransform:"uppercase"}}>Reading Theme</div>
      {THEME_ORDER.map(k=>{const th=THEMES[k];const active=k===tid;return <button key={k} role="option" aria-selected={active} onClick={()=>{setTid(k);setOpen(false);}}
        style={{display:"flex",alignItems:"center",gap:10,padding:"8px 12px",borderRadius:10,border:"none",cursor:"pointer",width:"100%",background:active?`${th.accent}15`:"transparent",transition:"background .15s"}}>
        <div style={{display:"flex",gap:3}}>
          {[th.bg,th.card,th.ink,th.accent,th.gold].map((c,i)=><div key={i} style={{width:10,height:10,borderRadius:i===0?3:10,background:c,border:"1px solid rgba(128,128,128,.2)"}}/>)}
        </div>
        <div style={{flex:1,textAlign:"left"}}>
          <div style={{fontFamily:T.sans,fontSize:11,fontWeight:active?700:500,color:active?th.accent:T.ink2}}>{th.name}</div>
        </div>
        {active&&<span style={{fontSize:10,color:th.accent}}>{"\u2713"}</span>}
      </button>;})}
    </div>}
  </div>;
}


const TIERS=[{name:"Fresh Ink",min:0,color:THEMES[THEME_DEFAULT].ink3,bg:"rgba(122,112,103,0.1)"},{name:"Wet Ink",min:25,color:"#8BAAB8",bg:"rgba(139,170,184,0.1)"},{name:"Set Ink",min:100,color:"#A0C090",bg:"rgba(160,192,144,0.1)"},{name:"Deep Ink",min:500,color:THEMES[THEME_DEFAULT].gold,bg:"rgba(196,162,101,0.1)"},{name:"Indelible",min:2000,color:THEMES[THEME_DEFAULT].accent,bg:"rgba(184,86,42,0.12)"}];
function getTier(n){for(let i=TIERS.length-1;i>=0;i--)if(n>=TIERS[i].min)return TIERS[i];return TIERS[0];}
function fmt(n){return n>=1000?(n/1000).toFixed(1)+"k":String(n);}

const CT={original:{label:"Original Work",icon:"\u270D",color:THEMES[THEME_DEFAULT].accent},review:{label:"Review",icon:"\uD83D\uDCDD",color:THEMES[THEME_DEFAULT].gold},recommendation:{label:"Recommendation",icon:"\uD83D\uDCDA",color:THEMES[THEME_DEFAULT].green},spoiler:{label:"Spoiler Zone",icon:"\uD83D\uDD13",color:THEMES[THEME_DEFAULT].red}};
const LENSES={analyst:{icon:"\uD83D\uDD2C",label:"Analyst",color:"#5B9BD5"},empath:{icon:"\uD83D\uDC96",label:"Empath",color:"#D4788C"},philosopher:{icon:"\uD83D\uDCA1",label:"Philosopher",color:THEMES[THEME_DEFAULT].gold},storyteller:{icon:"\uD83C\uDFAD",label:"Storyteller",color:"#9B7ED4"},explorer:{icon:"\uD83D\uDDFA\uFE0F",label:"Explorer",color:"#5BAD7A"},alchemist:{icon:"\u2727",label:"Alchemist",color:"#C4A06A"}};

// ═══════════════════════════════════════════════════
// MOCK DATA
// ═══════════════════════════════════════════════════
const BOOK={title:"Beloved",author:"Toni Morrison",year:1987,pages:324,genre:"Literary Fiction",origin:"USA",
  desc:"Sethe, an enslaved woman who escaped to Ohio, is haunted by the ghost of her dead daughter. Morrison\u2019s Pulitzer-winning masterpiece about memory, trauma, and the cost of survival.",
  stats:{reviews:47,waypoints:12,originals:8,recommendations:23,spoilerZones:15,shelves:89,readers:156,avgRating:null}};

const READERS=[
  {initials:"PA",name:"Priya Anand",handle:"@priyareads",ink:12300,page:201,lens:"empath"},
  {initials:"KA",name:"Kofi Asante",handle:"@kofi_writes",ink:8750,page:312,lens:"storyteller"},
  {initials:"IS",name:"Ingrid Solberg",handle:"@ingridreads",ink:3420,page:89,lens:"analyst"},
  {initials:"JH",name:"James Huang",handle:"@jamesreads",ink:540,page:45,lens:"explorer"},
  {initials:"YT",name:"Yuki Tanaka",handle:"@yukiwrites",ink:1240,page:250,lens:"empath"},
];

const REVIEWS=[
  {id:"r1",user:{initials:"PA",name:"Priya Anand",ink:12300},lens:"empath",timeAgo:"2d",
    text:"Morrison doesn\u2019t write sentences. She builds rooms you have to live in. Beloved is a house — 124 Bluestone Road — and it breathes, rejects, remembers. By page 200 I understood that the ghost isn\u2019t a metaphor. She\u2019s the cost of survival made flesh.",
    likes:178,comments:96,shelved:67,crossBookSpoiler:false,crossBooks:[]},
  {id:"r2",user:{initials:"IS",name:"Ingrid Solberg",ink:3420},lens:"analyst",timeAgo:"1w",
    text:"The structural choice to fracture chronology mirrors how trauma actually operates in memory — not as linear narrative but as fragments that resurface without warning. Morrison trusts the reader to reassemble the timeline, and that trust is the book\u2019s secret architecture. This same technique reaches its apex in Song of Solomon, where Milkman\u2019s journey reveals that the family\u2019s true history was encoded in a children\u2019s song all along. In Sula, Morrison compresses this even further — the riverbank scene\u2019s full meaning only arrives decades later.",
    likes:134,comments:42,shelved:56,crossBookSpoiler:true,crossBooks:["Song of Solomon","Sula"]},
  {id:"r3",user:{initials:"TR",name:"Tom\u00E1s Reyes",ink:280},lens:"philosopher",timeAgo:"2w",
    text:"The central question isn\u2019t whether Sethe was right. It\u2019s whether the concept of \u2018right\u2019 has any meaning in a world that reduced her to property. Morrison refuses to resolve this, and that refusal is the book\u2019s deepest moral argument.",
    likes:89,comments:31,shelved:38,crossBookSpoiler:false,crossBooks:[]},
,
  {id:"r4",user:{initials:"AK",name:"Amira Khoury",ink:8400},lens:"alchemist",timeAgo:"3d",
    text:"Beloved doesn\u2019t stand alone. It\u2019s in conversation with Song of Solomon, with Sula, with the entire architecture of what Morrison built across thirty years. The ghost in 124 isn\u2019t just Sethe\u2019s daughter \u2014 she\u2019s the same unresolved debt that appears as Pilate\u2019s earring, as Sula\u2019s birthmark, as the woman in the water in Tar Baby. Morrison kept writing the same absence, and each book made the others more legible.",
    likes:156,comments:63,shelved:71,crossBookSpoiler:true,crossBooks:["Song of Solomon","Sula","Tar Baby"]}];

const COMMUNITY_WAYPOINTS=[
  {id:"s1",user:"Priya Anand",lens:"empath",page:184,preview:"The house at 124 Bluestone Road has become a character in its own right — breathing, remembering, punishing\u2026",crossBookSpoiler:false,crossBooks:[]},
  {id:"s2",user:"Ingrid Solberg",lens:"analyst",page:120,preview:"Morrison\u2019s structural fractures mirror trauma\u2019s non-linearity. By page 120 the reader has assembled three timelines\u2026",crossBookSpoiler:false,crossBooks:[]},
  {id:"s3",user:"Kofi Asante",lens:"storyteller",page:250,preview:"The Clearing scene is the novel\u2019s pivot. Everything before it builds toward a communal grief that echoes the communal unraveling Morrison explores in Sula, where the river becomes the axis of collective memory\u2026",crossBookSpoiler:true,crossBooks:["Sula"]},
];

const SPOILER_GATES=[
  {page:184,count:3,label:"The Clearing / Baby Suggs"},
  {page:250,count:7,label:"Beloved\u2019s identity revealed"},
  {page:324,count:12,label:"Full book (ending)"},
];

const SHELVES_ON=[
  {name:"Stories That Wrecked Me",curator:"Ingrid Solberg",count:7},
  {name:"The Grief Library",curator:"Priya Anand",count:5},
  {name:"Books That Changed How I Read",curator:"Kofi Asante",count:9},
  {name:"Before You Read Beloved",curator:"Priya Anand",count:3},
];

const COMPANION=[
  {title:"Song of Solomon",author:"Toni Morrison",why:"Morrison\u2019s other masterpiece — if Beloved is grief, this is search."},
  {title:"The Underground Railroad",author:"Colson Whitehead",why:"Same historical terrain, different formal ambition."},
  {title:"Sula",author:"Toni Morrison",why:"Shorter, fiercer. A companion study in community and defiance."},
];

// ═══════════════════════════════════════════════════
// CSS
// ═══════════════════════════════════════════════════
const CSS=`
.fc{transition:all .22s cubic-bezier(.4,0,.2,1)}.fc:hover{transform:translateY(-2px);box-shadow:0 8px 28px rgba(0,0,0,.25),0 0 0 1px rgba(212,168,85,.06)!important}
.fc2{transition:all .18s}.fc2:hover{filter:brightness(1.08)}
.btn-g{transition:all .15s}.btn-g:hover{color:#D4A855!important}

@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,800;1,400;1,700&family=Source+Serif+4:ital,opsz,wght@0,8..60,300;0,8..60,400;0,8..60,600;1,8..60,300;1,8..60,400&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&display=swap');
*{margin:0;padding:0;box-sizing:border-box}
::selection{background:rgba(196,162,101,.25)}
::-webkit-scrollbar{width:5px}::-webkit-scrollbar-thumb{background:rgba(74,69,64,.5);border-radius:3px}
@keyframes fadeUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:none}}
@keyframes popIn{0%{transform:scale(1)}50%{transform:scale(1.2)}100%{transform:scale(1)}}
@keyframes pulseGlow{0%,100%{opacity:.4}50%{opacity:1}}
*:focus-visible{outline:2px solid ${T.gold};outline-offset:2px;border-radius:6px}
.skip-link{position:absolute;left:-9999px;top:auto;width:1px;height:1px;overflow:hidden;z-index:200}
.skip-link:focus{position:fixed;top:4px;left:4px;width:auto;height:auto;padding:8px 16px;background:${T.accent};color:#fff;border-radius:8px;font-size:12px;font-weight:700;z-index:300}
.eng-pop{animation:popIn .25s ease}
@media(max-width:900px){.book-grid{grid-template-columns:1fr!important}.book-side{display:none!important}}
@media(max-width:600px){.mob-nav{display:flex!important;}.book-header-inner{flex-direction:column!important;text-align:center!important}.book-spine-lg{margin:0 auto!important}.book-grid{padding:12px 16px 40px!important;gap:14px!important}}
@media(prefers-reduced-motion:reduce){*{animation-duration:0.01ms!important;animation-iteration-count:1!important;transition-duration:0.01ms!important}}

.rev-card{transition:border-color .2s,box-shadow .2s;}
.rev-card:hover{border-color:${T.borderHover};box-shadow:0 2px 12px rgba(0,0,0,.04);}
`;

// ═══════════════════════════════════════════════════
// MICRO COMPONENTS
// ═══════════════════════════════════════════════════
const Av=({i,ink=0,s=32})=>{const t=getTier(ink);return <div style={{width:s,height:s,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,fontFamily:T.sans,fontSize:s*.34,fontWeight:700,color:T.ink2,background:`linear-gradient(145deg,${T.bg3},#0E0C09)`,border:`2px solid ${t.color}50`}}>{i}</div>;};
const IB=({ink})=>{const t=getTier(ink);return <span style={{display:"inline-flex",alignItems:"center",gap:3,padding:"2px 7px",borderRadius:5,fontSize:9.5,fontWeight:700,fontFamily:T.sans,color:t.color,background:t.bg,border:`1px solid ${t.color}18`}}><span style={{fontSize:6}}>{"\u25CF"}</span>{t.name}</span>;};

function EngBtn({icon,count,active,color,onClick,label,toggle=false}){
  const[h,setH]=useState(false);const[pop,setPop]=useState(false);
  function handleClick(){if(onClick){onClick();setPop(true);setTimeout(()=>setPop(false),300);}}
  return <button onClick={onClick?handleClick:undefined} aria-label={label} {...(toggle?{"aria-pressed":active}:{})}
    onMouseEnter={()=>setH(true)} onMouseLeave={()=>setH(false)}
    style={{display:"flex",alignItems:"center",gap:5,padding:"6px 8px",background:active?`${color}10`:h?"rgba(255,255,255,0.02)":"transparent",border:"none",borderRadius:8,cursor:"pointer",color:active?color:h?T.ink2:T.ink3,fontSize:12,fontFamily:T.sans,fontWeight:500,transition:"all 0.15s"}}>
    <span className={pop?"eng-pop":""} style={{fontSize:14,lineHeight:1}}>{icon}</span>
    {count>0&&<span>{fmt(count)}</span>}
  </button>;
}

// ═══════════════════════════════════════════════════
// BOOK HEADER
// ═══════════════════════════════════════════════════
function BookHeader({book,onWriteReview}){
  const[synGen,setSG]=useState(false);const[shelved,setShelved]=useState(false);const[shared,setShared]=useState(false);const[selLens,setSelLens]=useState(null);const[genProg,setGenProg]=useState(0);
  function doShare(){navigator.clipboard.writeText(`https://joinprecis.com/book/${book.title.toLowerCase().replace(/\s+/g,'-')}`).catch(()=>{});setShared(true);setTimeout(()=>setShared(false),2000);}
  function pickLens(k){setSelLens(k);setGenProg(0);let p=0;const iv=setInterval(()=>{p+=Math.random()*18+5;if(p>=100){p=100;clearInterval(iv);}setGenProg(Math.min(100,Math.round(p)));},300);}
  return <div style={{background:`linear-gradient(180deg,${T.bg2},${T.bg})`,borderBottom:`1px solid ${T.border}`,padding:"80px 28px 32px"}}>
    <div className="book-header-inner" style={{maxWidth:860,margin:"0 auto",display:"flex",gap:32,alignItems:"flex-start"}}>
      {/* Large spine/cover */}
      <div className="book-spine-lg" style={{width:120,height:180,borderRadius:"3px 8px 8px 3px",background:`linear-gradient(135deg,${T.accent}DD,#6B2A10)`,boxShadow:`6px 2px 20px rgba(0,0,0,.5),inset 2px 0 6px rgba(255,255,255,.08)`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,position:"relative"}}>
        <div style={{position:"absolute",inset:0,borderRadius:"inherit",background:"repeating-linear-gradient(180deg,transparent 0px,rgba(0,0,0,.03) 1px,transparent 2px)"}}/>
        <div style={{textAlign:"center",padding:"0 12px",position:"relative"}}>
          <div style={{fontFamily:T.serif,fontSize:12,fontWeight:700,color:"rgba(255,255,255,.7)",lineHeight:1.3,marginBottom:4}}>{book.title}</div>
          <div style={{fontFamily:T.sans,fontSize:8,color:"rgba(255,255,255,.4)",letterSpacing:".5px"}}>{book.author}</div>
        </div>
      </div>

      <div style={{flex:1}}>
        <div style={{fontFamily:T.sans,fontSize:10,fontWeight:700,color:T.accent,letterSpacing:"1.5px",textTransform:"uppercase",marginBottom:6}}>{book.genre} · {book.year}</div>
        <h1 style={{fontFamily:T.serif,fontSize:"clamp(28px,4vw,40px)",fontWeight:800,color:T.ink,lineHeight:1.1,letterSpacing:"-1px",marginBottom:4}}>{book.title}</h1>
        <div style={{fontFamily:T.body,fontSize:18,color:T.ink3,fontStyle:"italic",marginBottom:16}}>{book.author} · {book.pages} pages</div>
        <p style={{fontFamily:T.body,fontSize:14,lineHeight:1.7,color:T.ink2,fontWeight:300,maxWidth:520,marginBottom:20}}>{book.desc}</p>

        {/* Stats row */}
        <div style={{display:"flex",gap:16,flexWrap:"wrap",marginBottom:20}}>
          {[
            {n:book.stats.reviews,l:"Reviews",c:T.gold},
            {n:book.stats.waypoints,l:"Waypoints",c:T.blue},
            {n:book.stats.spoilerZones,l:"Spoiler Zones",c:T.red},
            {n:book.stats.shelves,l:"On Shelves",c:T.plum},
            {n:book.stats.readers,l:"Reading Now",c:T.green},
          ].map((s,i)=><div key={i} style={{textAlign:"center"}}>
            <div style={{fontFamily:T.sans,fontSize:18,fontWeight:800,color:s.c}}>{s.n}</div>
            <div style={{fontFamily:T.sans,fontSize:10,color:T.ink3,fontWeight:500}}>{s.l}</div>
          </div>)}
        </div>

        {/* Action row */}
        <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
          <button onClick={onWriteReview} style={{padding:"10px 24px",borderRadius:10,border:"none",background:`linear-gradient(135deg,${T.accent},#9E4520)`,fontFamily:T.sans,fontSize:12,fontWeight:700,color:"#fff",cursor:"pointer",boxShadow:`0 2px 12px ${T.accent}30`}}>{"\u270D"} Write a Review</button>
          <button onClick={()=>{const el=document.getElementById('bc-toast');if(el){el.textContent="\u27D0 Opening Compass\u2026";el.style.display="block";setTimeout(()=>el.style.display="none",2000);}}} style={{padding:"10px 18px",borderRadius:10,border:`1px solid ${T.border}`,background:"transparent",fontFamily:T.sans,fontSize:12,fontWeight:600,color:T.ink3,cursor:"pointer"}}>{"\u27D0"} Set a Waypoint</button>
          <button onClick={()=>{const el=document.getElementById('bc-toast');if(el){el.textContent="Opening book detail\u2026";el.style.display="block";setTimeout(()=>el.style.display="none",2000);}}} style={{padding:"10px 18px",borderRadius:10,border:`1px solid ${T.border}`,background:"transparent",fontFamily:T.sans,fontSize:12,fontWeight:600,color:T.ink3,cursor:"pointer"}}>{"\uD83D\uDCD6"} Book Detail</button>
          <button onClick={()=>setSG(!synGen)} style={{padding:"10px 20px",borderRadius:10,border:`1px solid ${T.blue}30`,background:`${T.blue}08`,fontFamily:T.sans,fontSize:12,fontWeight:600,color:T.blue,cursor:"pointer"}}>{"\u27D0"} Set Waypoint</button>
          <button onClick={()=>setShelved(!shelved)} style={{padding:"10px 18px",borderRadius:10,border:`1px solid ${shelved?`${T.gold}40`:T.border}`,background:shelved?`${T.gold}08`:"transparent",fontFamily:T.sans,fontSize:12,fontWeight:600,color:shelved?T.gold:T.ink3,cursor:"pointer",transition:"all .2s"}}>{shelved?"\u25C6 Shelved":"\u25C7 Add to Shelf"}</button>
          <button onClick={doShare} style={{padding:"10px 18px",borderRadius:10,border:`1px solid ${shared?`${T.green}40`:T.border}`,background:shared?`${T.green}08`:"transparent",fontFamily:T.sans,fontSize:12,fontWeight:600,color:shared?T.green:T.ink3,cursor:"pointer",transition:"all .2s"}}>{shared?"\u2713 Copied!":"\u2197 Share"}</button>
        </div>

        {/* Inline waypoint gen prompt */}
        {synGen&&<div style={{marginTop:14,padding:"16px 18px",borderRadius:12,background:`${T.blue}04`,border:`1px solid ${T.blue}12`}}>
          <div style={{fontFamily:T.serif,fontSize:14,fontWeight:700,color:T.ink,marginBottom:4}}>Where are you in the book?</div>
          <div style={{display:"flex",gap:8,alignItems:"center",flexWrap:"wrap",marginBottom:selLens?12:0}}>
            <input placeholder="Page #" style={{width:80,padding:"8px 12px",borderRadius:8,border:`1px solid ${T.blue}25`,background:T.bg3,fontFamily:T.sans,fontSize:13,fontWeight:700,color:T.ink,textAlign:"center",outline:"none"}} aria-label="Page #"/>
            <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>{Object.entries(LENSES).map(([k,v])=><button key={k} onClick={()=>pickLens(k)} style={{padding:"6px 12px",borderRadius:8,fontSize:11,fontWeight:600,fontFamily:T.sans,cursor:"pointer",color:v.color,border:`1px solid ${selLens===k?v.color:`${v.color}25`}`,background:selLens===k?`${v.color}15`:"transparent",display:"flex",alignItems:"center",gap:4,transition:"all .15s"}}>{v.icon} {v.label}</button>)}</div>
          </div>
          {selLens&&<div>
            <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:6}}><div style={{width:8,height:8,borderRadius:"50%",background:T.blue,animation:genProg<100?"pulseGlow 1s infinite":"none"}}/><span style={{fontFamily:T.sans,fontSize:11,fontWeight:600,color:T.blue}}>{genProg<100?"Generating\u2026":"Waypoint ready"}</span><span style={{fontFamily:T.sans,fontSize:10,color:T.ink3,marginLeft:"auto"}}>{genProg}%</span></div>
            <div style={{height:4,borderRadius:2,background:`${T.ink4}20`,overflow:"hidden"}}><div style={{height:"100%",borderRadius:2,background:T.blue,width:`${genProg}%`,transition:"width .3s"}}/></div>
            {genProg>=100&&<p style={{fontFamily:T.body,fontSize:12.5,lineHeight:1.7,color:T.ink2,fontWeight:300,marginTop:10,fontStyle:"italic"}}>Through your {LENSES[selLens].label} lens, Morrison{"\u2019"}s architecture reveals itself differently {"—"} the haunting at 124 Bluestone Road operates as structural inevitability rather than supernatural intrusion{"\u2026"}</p>}
          </div>}
        </div>}
      </div>
    </div>
  </div>;
}

// ═══════════════════════════════════════════════════
// REVIEW CARD — with cross-book spoiler gating
// ═══════════════════════════════════════════════════
function ReviewCard({review}){
  const[liked,setLiked]=useState(false);const[shelved,setShelved]=useState(false);const[showReply,setShowReply]=useState(false);const[reply,setReply]=useState("");const[commentCount,setCCount]=useState(review.comments);const[shared,setShared]=useState(false);
  const[spoilRevealed,setSpoilRevealed]=useState(false);const[revMenu,setRevMenu]=useState(false);const[deleted,setDeleted]=useState(false);
  const isOwn=review.user.initials==="SP";
  const lens=LENSES[review.lens];
  const hasCrossSpoiler=review.crossBookSpoiler&&review.crossBooks?.length>0;
  const pToast=msg=>{const el=document.getElementById("bc-toast");if(el){el.textContent=msg;el.style.display="block";setTimeout(()=>el.style.display="none",2200);}};
  function doShare(){navigator.clipboard.writeText(`https://joinprecis.com/review/${review.id}`).catch(()=>{});setShared(true);setTimeout(()=>setShared(false),2000);}
  function submitReply(){if(reply.trim()){setCCount(c=>c+1);setReply("");setShowReply(false);}}

  if(deleted)return null;

  const reviewText=<p style={{fontFamily:T.body,fontSize:14,lineHeight:1.75,color:T.ink2,fontWeight:300,marginBottom:12}}>{review.text}</p>;

  return <div className="fc" style={{background:T.card,border:`1px solid ${hasCrossSpoiler&&!spoilRevealed?`${T.red}15`:T.border}`,borderRadius:14,padding:"18px 22px",transition:"border-color .2s"}}>
    <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:12}}>
      <Av i={review.user.initials} ink={review.user.ink}/>
      <div style={{flex:1}}>
        <div style={{display:"flex",alignItems:"center",gap:6}}>
          <span style={{fontFamily:T.sans,fontSize:13,fontWeight:700,color:T.ink}}>{review.user.name}</span>
          <IB ink={review.user.ink}/>
          {lens&&<span style={{fontSize:10,color:lens.color}}>{lens.icon}</span>}
          <span style={{fontFamily:T.sans,fontSize:11,color:T.ink3}}>{"·"} {review.timeAgo}</span>
        </div>
      </div>
      <div style={{display:"flex",gap:4,alignItems:"center"}}>
        {hasCrossSpoiler&&<span style={{display:"inline-flex",alignItems:"center",gap:3,padding:"3px 8px",borderRadius:20,fontSize:9.5,fontWeight:600,fontFamily:T.sans,color:T.red,background:`${T.red}08`,border:`1px solid ${T.red}15`}}>{"\uD83D\uDD12"} Spoilers: {review.crossBooks.join(", ")}</span>}
        <span style={{display:"inline-flex",alignItems:"center",gap:4,padding:"3px 10px",borderRadius:20,fontSize:10.5,fontWeight:600,fontFamily:T.sans,color:T.gold,background:`${T.gold}12`,border:`1px solid ${T.gold}20`}}>{"\uD83D\uDCDD"} Review</span>
        <div style={{position:"relative"}}>
          <button onClick={()=>setRevMenu(!revMenu)} aria-label="Review options" style={{padding:"4px 6px",borderRadius:5,border:"none",background:"transparent",fontSize:14,color:T.ink4,cursor:"pointer",lineHeight:1}}>{"\u22EF"}</button>
          {revMenu&&<div onClick={()=>setRevMenu(false)} style={{position:"absolute",top:"100%",right:0,marginTop:4,width:190,background:T.card,border:`1px solid ${T.borderHover}`,borderRadius:10,overflow:"hidden",boxShadow:"0 8px 32px rgba(0,0,0,.5)",zIndex:20}}>
            {isOwn&&<><button onClick={()=>pToast("Opening editor\u2026")} style={{display:"block",width:"100%",padding:"10px 14px",border:"none",background:"transparent",fontFamily:T.sans,fontSize:11,fontWeight:600,color:T.ink,textAlign:"left",cursor:"pointer"}} onMouseEnter={e=>e.currentTarget.style.background=T.bg3} onMouseLeave={e=>e.currentTarget.style.background="transparent"}>{"\u270D"} Edit review</button>
            <button onClick={()=>{if(window.confirm("Delete this review?"))setDeleted(true);}} style={{display:"block",width:"100%",padding:"10px 14px",border:"none",background:"transparent",fontFamily:T.sans,fontSize:11,fontWeight:600,color:T.red,textAlign:"left",cursor:"pointer"}} onMouseEnter={e=>e.currentTarget.style.background=T.bg3} onMouseLeave={e=>e.currentTarget.style.background="transparent"}>{"\uD83D\uDDD1"} Delete review</button>
            <div style={{borderTop:`1px solid ${T.border}`}}/></>}
            {!isOwn&&<><button onClick={()=>pToast(`Opening conversation with ${review.user.name}\u2026`)} style={{display:"block",width:"100%",padding:"10px 14px",border:"none",background:"transparent",fontFamily:T.sans,fontSize:11,fontWeight:600,color:T.ink,textAlign:"left",cursor:"pointer"}} onMouseEnter={e=>e.currentTarget.style.background=T.bg3} onMouseLeave={e=>e.currentTarget.style.background="transparent"}>{"\u2709"} Message {review.user.name}</button>
        <button onClick={()=>pToast(`Muted ${review.user.name}`)} style={{display:"block",width:"100%",padding:"10px 14px",border:"none",background:"transparent",fontFamily:T.sans,fontSize:11,fontWeight:600,color:T.ink,textAlign:"left",cursor:"pointer"}} onMouseEnter={e=>e.currentTarget.style.background=T.bg3} onMouseLeave={e=>e.currentTarget.style.background="transparent"}>{"\uD83D\uDD07"} Mute {review.user.name}</button></>}
            <button onClick={()=>pToast("Report submitted \u2014 thank you")} style={{display:"block",width:"100%",padding:"10px 14px",border:"none",background:"transparent",fontFamily:T.sans,fontSize:11,fontWeight:600,color:T.red,textAlign:"left",cursor:"pointer"}} onMouseEnter={e=>e.currentTarget.style.background=T.bg3} onMouseLeave={e=>e.currentTarget.style.background="transparent"}>{"\u26A0"} Report</button>
          </div>}
        </div>
      </div>
    </div>

    {/* Cross-book spoiler gate */}
    {hasCrossSpoiler&&!spoilRevealed?<div style={{position:"relative"}} role="region" aria-label={`Cross-book spoiler warning — review references ${review.crossBooks.join(" and ")}`}>
      <div style={{filter:"blur(8px)",userSelect:"none",pointerEvents:"none",opacity:.35}} aria-hidden="true">{reviewText}</div>
      <div style={{position:"absolute",inset:0,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:8}}>
        <span style={{fontSize:22}} aria-hidden="true">{"\uD83D\uDD12"}</span>
        <span style={{fontFamily:T.sans,fontSize:12,fontWeight:600,color:T.ink2}}>Cross-Book Spoilers</span>
        <span style={{fontFamily:T.sans,fontSize:10.5,color:T.ink4,textAlign:"center",maxWidth:260,lineHeight:1.5}}>This review of {BOOK.title} contains spoilers for <strong style={{color:T.ink3}}>{review.crossBooks.join(" & ")}</strong></span>
        <button onClick={()=>setSpoilRevealed(true)} aria-label={`Reveal review — contains spoilers for ${review.crossBooks.join(" and ")}`} style={{padding:"7px 18px",borderRadius:8,border:`1px solid ${T.red}40`,background:`${T.red}12`,color:T.red,fontFamily:T.sans,fontSize:11,fontWeight:600,cursor:"pointer"}}>I{"\u2019"}ve read {review.crossBooks.join(" & ")}</button>
      </div>
    </div>:reviewText}

    <div style={{display:"flex",alignItems:"center",gap:2,borderTop:`1px solid ${T.border}`,paddingTop:10}}>
      <EngBtn icon={liked?"\u2665":"\u2661"} count={review.likes+(liked?1:0)} active={liked} color={T.red} onClick={()=>setLiked(!liked)} label="Like" toggle/>
      <EngBtn icon={"\uD83D\uDCAC"} count={commentCount} active={showReply} color={T.gold} onClick={()=>setShowReply(!showReply)} label="Comment" toggle/>
      <EngBtn icon={shelved?"\u25C6":"\u25C7"} count={review.shelved+(shelved?1:0)} active={shelved} color={T.gold} onClick={()=>setShelved(!shelved)} label="Shelf" toggle/>
      <div style={{flex:1}}/>
      <EngBtn icon={shared?"\u2713":"\u2197"} count={0} active={shared} color={shared?T.green:T.ink3} onClick={doShare} label="Share"/>
    </div>
    {showReply&&<div style={{display:"flex",gap:8,marginTop:10,alignItems:"center"}}>
      <Av i="SP" ink={1240} s={24}/>
      <input maxLength={500} value={reply} onChange={e=>setReply(e.target.value)} onKeyDown={e=>{if(e.key==="Enter")submitReply();}} placeholder="Write a comment\u2026" style={{flex:1,padding:"8px 12px",borderRadius:10,border:`1px solid ${T.border}`,background:T.bg3,fontFamily:T.body,fontSize:12.5,color:T.ink,outline:"none"}} aria-label="Write a comment\u2026"/>
      <button onClick={submitReply} disabled={!reply.trim()} style={{padding:"6px 14px",borderRadius:8,border:"none",background:reply.trim()?`linear-gradient(135deg,${T.accent},#9E4520)`:`${T.ink4}20`,fontFamily:T.sans,fontSize:11,fontWeight:700,color:reply.trim()?"#fff":T.ink4,cursor:reply.trim()?"pointer":"default"}}>Post</button>
    </div>}
  </div>;
}

// ═══════════════════════════════════════════════════
// SIDEBAR — Currently Reading + Spoiler Map + Shelves
// ═══════════════════════════════════════════════════
function CurrentlyReadingSidebar({readers}){
  return <div className="fc" style={{background:T.card,border:`1px solid ${T.border}`,borderRadius:14,padding:"18px 20px",marginBottom:12}}>
    <h3 style={{fontFamily:T.serif,fontSize:14.5,fontWeight:700,color:T.ink,marginBottom:12,display:"flex",alignItems:"center",gap:8}}><span style={{color:T.green}}>{"\uD83D\uDCD6"}</span> Reading Now</h3>
    {readers.map((r,i)=>{const lens=LENSES[r.lens];const pct=Math.round(r.page/BOOK.pages*100);
      return <div key={i} style={{display:"flex",alignItems:"center",gap:8,padding:"7px 0",borderTop:i>0?`1px solid ${T.border}`:"none",cursor:"pointer"}}>
        <Av i={r.initials} ink={r.ink} s={24}/>
        <div style={{flex:1,minWidth:0}}>
          <div style={{fontFamily:T.sans,fontSize:11,fontWeight:600,color:T.ink}}>{r.name} {lens&&<span style={{color:lens.color,fontSize:10}}>{lens.icon}</span>}</div>
          <div style={{display:"flex",alignItems:"center",gap:6,marginTop:3}}>
            <div style={{flex:1,height:3,borderRadius:2,background:`${T.ink4}20`}}><div style={{height:"100%",borderRadius:2,background:T.green,width:`${pct}%`}}/></div>
            <span style={{fontFamily:T.sans,fontSize:9,color:T.ink4,fontWeight:600}}>{pct}%</span>
          </div>
        </div>
      </div>;
    })}
  </div>;
}

function SpoilerMap(){
  return <div className="fc" style={{background:T.card,border:`1px solid ${T.border}`,borderRadius:14,padding:"18px 20px",marginBottom:12}}>
    <h3 style={{fontFamily:T.serif,fontSize:14.5,fontWeight:700,color:T.ink,marginBottom:12,display:"flex",alignItems:"center",gap:8}}><span style={{color:T.red}}>{"\uD83D\uDD13"}</span> Spoiler Zones</h3>
    <div style={{position:"relative",height:6,borderRadius:3,background:`${T.ink4}15`,marginBottom:16}}>
      {SPOILER_GATES.map((g,i)=>{const pct=Math.round(g.page/BOOK.pages*100);return <div key={i} style={{position:"absolute",top:-4,left:`${pct}%`,transform:"translateX(-50%)",display:"flex",flexDirection:"column",alignItems:"center"}}>
        <div style={{width:14,height:14,borderRadius:"50%",background:`${T.red}25`,border:`2px solid ${T.red}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:7,fontWeight:800,color:T.red,fontFamily:T.sans}}>{g.count}</div>
      </div>;})}
    </div>
    {SPOILER_GATES.map((g,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:8,padding:"6px 0",borderTop:i>0?`1px solid ${T.border}`:"none",cursor:"pointer"}}>
      <span style={{fontFamily:T.sans,fontSize:10,fontWeight:700,color:T.red,width:30}}>p.{g.page}</span>
      <span style={{fontFamily:T.sans,fontSize:11,color:T.ink2,flex:1}}>{g.label}</span>
      <span style={{fontFamily:T.sans,fontSize:10,color:T.ink4}}>{g.count} posts</span>
    </div>)}
  </div>;
}

function ShelvesAppearingSidebar(){
  return <div className="fc" style={{background:T.card,border:`1px solid ${T.border}`,borderRadius:14,padding:"18px 20px",marginBottom:12}}>
    <h3 style={{fontFamily:T.serif,fontSize:14.5,fontWeight:700,color:T.ink,marginBottom:12,display:"flex",alignItems:"center",gap:8}}><span style={{color:T.plum}}>{"\u25C6"}</span> On Shelves</h3>
    {SHELVES_ON.map((s,i)=><div key={i} style={{padding:"8px 0",borderTop:i>0?`1px solid ${T.border}`:"none",cursor:"pointer"}}>
      <div style={{fontFamily:T.serif,fontSize:12.5,fontWeight:600,color:T.ink,lineHeight:1.3}}>"{s.name}"</div>
      <div style={{fontFamily:T.sans,fontSize:10.5,color:T.ink3}}>{s.curator} · {s.count} items</div>
    </div>)}
  </div>;
}

function CompanionReads(){
  const[copied,setCopied]=useState(false);
  function recommend(){navigator.clipboard.writeText(`https://joinprecis.com/book/${BOOK.title.toLowerCase().replace(/\s+/g,'-')}?ref=friend`).catch(()=>{});setCopied(true);setTimeout(()=>setCopied(false),2500);}
  return <div className="fc" style={{background:T.card,border:`1px solid ${T.border}`,borderRadius:14,padding:"18px 20px",marginBottom:12}}>
    <h3 style={{fontFamily:T.serif,fontSize:14.5,fontWeight:700,color:T.ink,marginBottom:12,display:"flex",alignItems:"center",gap:8}}><span style={{color:T.gold}}>{"\uD83D\uDCDA"}</span> Companion Reads</h3>
    {COMPANION.map((c,i)=><div key={i} style={{display:"flex",alignItems:"flex-start",gap:10,padding:"8px 0",borderTop:i>0?`1px solid ${T.border}`:"none",cursor:"pointer"}}>
      <div style={{width:18,height:26,borderRadius:"1px 3px 3px 1px",flexShrink:0,background:`linear-gradient(135deg,${T.accent}AA,#6B2A10)`}}/>
      <div>
        <div style={{fontFamily:T.serif,fontSize:12,fontWeight:700,color:T.ink}}>{c.title}</div>
        <div style={{fontFamily:T.sans,fontSize:10,color:T.ink3,marginBottom:3}}>{c.author}</div>
        <div style={{fontFamily:T.body,fontSize:10.5,color:T.ink4,fontStyle:"italic",lineHeight:1.4}}>{c.why}</div>
      </div>
    </div>)}
    {/* Recommend to a friend — growth vector */}
    <div style={{marginTop:12,paddingTop:12,borderTop:`1px solid ${T.border}`,textAlign:"center"}}>
      <div style={{fontFamily:T.body,fontSize:11,color:T.ink3,fontStyle:"italic",marginBottom:8}}>Know someone who should read {BOOK.title}?</div>
      <button onClick={recommend} style={{padding:"7px 18px",borderRadius:10,border:`1px solid ${copied?`${T.green}30`:T.border}`,background:copied?`${T.green}06`:"transparent",fontFamily:T.sans,fontSize:11,fontWeight:600,color:copied?T.green:T.ink3,cursor:"pointer",transition:"all .2s"}}>{copied?"\u2713 Link copied":"Share this book"}</button>
    </div>
  </div>;
}

function CommunityPulse(){
  const[pulse,setPulse]=useState(156);
  useEffect(()=>{const iv=setInterval(()=>setPulse(p=>p+Math.floor(Math.random()*3)-1),8000);return()=>clearInterval(iv);},[]);
  return <div style={{background:`linear-gradient(135deg,${T.green}06,${T.card})`,border:`1px solid ${T.green}12`,borderRadius:14,padding:"14px 18px",marginBottom:12,display:"flex",alignItems:"center",gap:10}}>
    <div style={{width:8,height:8,borderRadius:"50%",background:T.green,boxShadow:`0 0 8px ${T.green}60`,animation:"pulseGlow 2s infinite"}}/>
    <div><div style={{fontFamily:T.sans,fontSize:12,fontWeight:700,color:T.ink}}>{pulse} reading now</div>
    <div style={{fontFamily:T.sans,fontSize:10,color:T.ink3}}>{BOOK.stats.spoilerZones} active discussions {"·"} {Math.floor(BOOK.stats.reviews/7)} new this week</div></div>
  </div>;
}

function ReadingPaceWidget(){
  const avgPct=Math.round(READERS.reduce((s,r)=>s+r.page,0)/READERS.length/BOOK.pages*100);
  const fastest=READERS.reduce((a,b)=>a.page>b.page?a:b);
  return <div className="fc" style={{background:T.card,border:`1px solid ${T.border}`,borderRadius:14,padding:"18px 20px",marginBottom:12}}>
    <h3 style={{fontFamily:T.serif,fontSize:14.5,fontWeight:700,color:T.ink,marginBottom:12,display:"flex",alignItems:"center",gap:8}}><span style={{color:T.blue}}>{"\u29D7"}</span> Reading Pace</h3>
    <div style={{marginBottom:10}}>
      <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}><span style={{fontFamily:T.sans,fontSize:10,color:T.ink3}}>Community average</span><span style={{fontFamily:T.sans,fontSize:10,fontWeight:700,color:T.blue}}>{avgPct}%</span></div>
      <div style={{height:6,borderRadius:3,background:`${T.ink4}15`,overflow:"hidden"}}><div style={{height:"100%",borderRadius:3,background:`linear-gradient(90deg,${T.blue},${T.teal})`,width:`${avgPct}%`,transition:"width .5s"}}/></div>
    </div>
    <div style={{fontFamily:T.sans,fontSize:10.5,color:T.ink3,lineHeight:1.5}}>Furthest reader: <strong style={{color:T.ink}}>{fastest.name}</strong> at p.{fastest.page} ({Math.round(fastest.page/BOOK.pages*100)}%)</div>
  </div>;
}

// ═══════════════════════════════════════════════════
// COMMUNITY WAYPOINTS
// ═══════════════════════════════════════════════════
function SpoilerGateCard({gate}){
  const[exp,setExp]=useState(false);
  const threads=[{user:"Marcus C.",text:"The revelation at this point restructures everything you thought the first 100 pages were doing.",likes:23},{user:"Elena V.",text:"I had to put the book down here. Morrison doesn\u2019t let you off the hook.",likes:18},{user:"Priya A.",text:"This is where the supernatural stops being metaphor and becomes architecture.",likes:31}];
  return <div className="fc" style={{background:T.card,border:`1px solid ${exp?`${T.red}25`:`${T.red}12`}`,borderRadius:14,padding:"18px 22px",cursor:"pointer",transition:"border-color .2s"}} onClick={()=>setExp(!exp)}>
    <div style={{display:"flex",alignItems:"center",gap:10}}>
      <span style={{fontSize:18}}>{"\uD83D\uDD13"}</span>
      <div style={{flex:1}}>
        <div style={{fontFamily:T.serif,fontSize:15,fontWeight:700,color:T.ink}}>Through page {gate.page}</div>
        <div style={{fontFamily:T.sans,fontSize:11,color:T.ink3}}>{gate.label} {"·"} {gate.count} discussions</div>
      </div>
      <span style={{fontFamily:T.sans,fontSize:12,fontWeight:700,color:T.red,background:`${T.red}12`,padding:"4px 12px",borderRadius:8}}>{gate.count}</span>
      <span style={{fontSize:10,color:T.ink4,transition:"transform .2s",transform:exp?"rotate(180deg)":"none"}}>{"\u25BC"}</span>
    </div>
    {exp&&<div style={{marginTop:14,paddingTop:14,borderTop:`1px solid ${T.red}10`}} onClick={e=>e.stopPropagation()}>
      <div style={{fontFamily:T.sans,fontSize:9,fontWeight:700,color:T.red,letterSpacing:".8px",textTransform:"uppercase",marginBottom:10,opacity:.6}}>Recent threads</div>
      {threads.slice(0,Math.min(3,gate.count)).map((t,ti)=><div key={ti} style={{display:"flex",alignItems:"flex-start",gap:8,padding:"8px 0",borderTop:ti>0?`1px solid ${T.border}`:"none"}}>
        <span style={{fontFamily:T.sans,fontSize:11,fontWeight:600,color:T.ink,flexShrink:0}}>{t.user}</span>
        <span style={{fontFamily:T.body,fontSize:11.5,color:T.ink3,lineHeight:1.5,flex:1}}>{t.text}</span>
        <span style={{fontFamily:T.sans,fontSize:9,color:T.ink4,flexShrink:0}}>{"\u2661"} {t.likes}</span>
      </div>)}
    </div>}
  </div>;
}

function WaypointCard({syn}){
  const[revealed,setRevealed]=useState(false);
  const lens=LENSES[syn.lens];
  const hasCross=syn.crossBookSpoiler&&syn.crossBooks?.length>0;

  const previewContent=<p style={{fontFamily:T.body,fontSize:13,lineHeight:1.7,color:T.ink2,fontWeight:300}}>{syn.preview}</p>;

  return <div className="fc" style={{background:T.card,border:`1px solid ${hasCross&&!revealed?`${T.red}15`:T.border}`,borderRadius:14,padding:"16px 20px",transition:"border-color .2s"}}>
    <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}>
      <span style={{fontFamily:T.sans,fontSize:11,fontWeight:600,color:T.ink}}>{syn.user}</span>
      {lens&&<span style={{padding:"2px 8px",borderRadius:6,fontSize:9.5,fontWeight:600,fontFamily:T.sans,color:lens.color,background:`${lens.color}10`,border:`1px solid ${lens.color}20`}}>{lens.icon} {lens.label}</span>}
      {hasCross&&<span style={{padding:"2px 8px",borderRadius:5,fontSize:9,fontWeight:600,fontFamily:T.sans,color:T.red,background:`${T.red}08`,border:`1px solid ${T.red}15`}}>{"\uD83D\uDD12"} {syn.crossBooks.join(", ")}</span>}
      <span style={{fontFamily:T.sans,fontSize:10,color:T.ink4,marginLeft:"auto"}}>Through p.{syn.page}</span>
    </div>
    {hasCross&&!revealed?<div style={{position:"relative"}} role="region" aria-label={`Cross-book spoiler warning — references ${syn.crossBooks.join(" and ")}`}>
      <div style={{filter:"blur(6px)",userSelect:"none",pointerEvents:"none",opacity:.35}} aria-hidden="true">{previewContent}</div>
      <div style={{position:"absolute",inset:0,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:6}}>
        <span style={{fontSize:16}} aria-hidden="true">{"\uD83D\uDD12"}</span>
        <span style={{fontFamily:T.sans,fontSize:10.5,color:T.ink3,textAlign:"center",lineHeight:1.5}}>References <strong>{syn.crossBooks.join(" & ")}</strong></span>
        <button onClick={()=>setRevealed(true)} aria-label={`Reveal waypoint — contains references to ${syn.crossBooks.join(" and ")}`} style={{padding:"5px 14px",borderRadius:7,border:`1px solid ${T.red}30`,background:`${T.red}10`,color:T.red,fontFamily:T.sans,fontSize:10,fontWeight:600,cursor:"pointer"}}>I{"\u2019"}ve read {syn.crossBooks.join(" & ")}</button>
      </div>
    </div>:previewContent}
  </div>;
}

// ═══════════════════════════════════════════════════
// MAIN
// ═══════════════════════════════════════════════════
export default function BookCommunity(){
  const{theme,tid,setTid}=useTheme();T=theme;
  const[tab,setTab]=useState("reviews");
  const[loaded,setL]=useState(false);
  const[reviewSort,setRS]=useState("newest");
  const[lensFilter,setLF]=useState("all");
  const[readersOnline]=useState(()=>Math.floor(Math.random()*8)+3);
  useEffect(()=>setL(true),[]);

  const TABS=[
    {id:"reviews",l:"Reviews",c:BOOK.stats.reviews,color:T.gold},
    {id:"waypoints",l:"Waypoints",c:BOOK.stats.waypoints,color:T.blue},
    {id:"originals",l:"Originals",c:BOOK.stats.originals,color:T.accent},
    {id:"spoilers",l:"Spoiler Zones",c:BOOK.stats.spoilerZones,color:T.red},
  ];

  const lensedReviews=lensFilter==="all"?REVIEWS:REVIEWS.filter(r=>r.lens===lensFilter);
  const sortedReviews=reviewSort==="popular"?[...lensedReviews].sort((a,b)=>(b.likes+b.comments)-(a.likes+a.comments)):lensedReviews;

  return <div style={{minHeight:"100vh",background:T.bg,color:T.ink}}>
    <style>{CSS}</style>
    <style>{`body{background:${T.bg}!important}`}</style>
    <a href="#book-content" className="skip-link">Skip to content</a>
    <div id="bc-toast" style={{display:"none",position:"fixed",bottom:24,left:"50%",transform:"translateX(-50%)",padding:"10px 24px",borderRadius:10,background:T.bg2,border:`1px solid ${T.borderHover}`,boxShadow:"0 8px 32px rgba(0,0,0,.4)",fontFamily:T.sans,fontSize:12,fontWeight:700,color:T.ink,zIndex:300,animation:"fadeUp .3s ease"}}/>

    {/* Nav */}
    <nav style={{position:"sticky",top:0,zIndex:100,background:`${T.bg}E6`,backdropFilter:"blur(24px) saturate(1.2)",borderBottom:`1px solid ${T.border}`}}>
      <div style={{maxWidth:1100,margin:"0 auto",padding:"0 28px",display:"flex",alignItems:"center",height:56,gap:16}}>
        <span onClick={()=>pToast("Navigating to Feed\u2026")} style={{fontFamily:T.serif,fontSize:22,fontWeight:700,color:T.ink,letterSpacing:"-.5px",cursor:"pointer"}}>Pr<span style={{color:T.accent}}>{"\u00E9"}</span>cis</span>
        <span onClick={()=>pToast("Navigating to Feed\u2026")} style={{fontFamily:T.sans,fontSize:12,color:T.ink3,cursor:"pointer"}}>{"\u2190"} Feed</span>
        <div style={{flex:1}}/>
        <div style={{display:"flex",alignItems:"center",gap:4,marginRight:8}}><div style={{width:6,height:6,borderRadius:"50%",background:T.green,animation:"pulseGlow 2s infinite"}}/><span style={{fontFamily:T.sans,fontSize:10,color:T.ink3}}>{readersOnline} reading now</span></div>
        <button onClick={()=>{setTab("reviews");const el=document.getElementById('bc-toast');if(el){el.textContent="\u270D Navigate to Compose \u2192";el.style.display="block";setTimeout(()=>el.style.display="none",2000);}}} style={{padding:"7px 18px",borderRadius:10,border:"none",background:`linear-gradient(135deg,${T.accent},#9E4520)`,fontFamily:T.sans,fontSize:12,fontWeight:700,color:"#fff",cursor:"pointer"}}>{"\u270D"} Write</button>
        <ThemeSwitcher tid={tid} setTid={setTid}/>
        <Av i="SP" ink={1240} s={30}/>
      </div>
    </nav>

    {/* Book Header */}
    <BookHeader book={BOOK} onWriteReview={()=>{setTab("reviews");const el=document.getElementById('bc-toast');if(el){el.textContent="\u270D Compose: Review of "+BOOK.title;el.style.display="block";setTimeout(()=>el.style.display="none",2500);}}}/>

    {/* Tab bar */}
    <div style={{background:`${T.bg}E6`,borderBottom:`1px solid ${T.border}`,position:"sticky",top:56,zIndex:50,backdropFilter:"blur(16px)"}}>
      <div style={{maxWidth:860,margin:"0 auto",padding:"0 28px",display:"flex",gap:0}} role="tablist">
        {TABS.map(t=><button key={t.id} role="tab" aria-selected={tab===t.id} onClick={()=>{setTab(t.id);window.scrollTo({top:0,behavior:"smooth"});}} style={{padding:"14px 20px",border:"none",cursor:"pointer",fontFamily:T.sans,fontSize:13,fontWeight:600,background:"transparent",transition:"all .2s",color:tab===t.id?T.ink:T.ink3,borderBottom:tab===t.id?`2px solid ${t.color}`:"2px solid transparent",display:"flex",alignItems:"center",gap:6}}>
          {t.l}<span style={{padding:"1px 6px",borderRadius:10,fontSize:10,fontWeight:700,background:tab===t.id?`${t.color}15`:T.bg3,color:tab===t.id?t.color:T.ink4}}>{t.c}</span>
        </button>)}
      </div>
    </div>

    {/* Content */}
    <div className="book-grid" id="book-content" style={{maxWidth:1100,margin:"0 auto",padding:"20px 28px 60px",display:"grid",gridTemplateColumns:"1fr 300px",gap:20,alignItems:"start"}}>
      <main style={{display:"flex",flexDirection:"column",gap:12}}>
        {tab==="reviews"&&<>
          <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:4,flexWrap:"wrap"}}>
            <span style={{fontFamily:T.sans,fontSize:12,color:T.ink3}}>Sort by</span>
            {[{id:"newest",l:"Newest"},{id:"popular",l:"Most Discussed"}].map(s=><button key={s.id} onClick={()=>setRS(s.id)} style={{padding:"5px 12px",borderRadius:8,border:`1px solid ${reviewSort===s.id?`${T.gold}30`:T.border}`,background:reviewSort===s.id?`${T.gold}10`:"transparent",fontFamily:T.sans,fontSize:11,fontWeight:600,color:reviewSort===s.id?T.gold:T.ink3,cursor:"pointer"}}>{s.l}</button>)}
            <span style={{width:1,height:16,background:T.border,margin:"0 4px"}}/>
            <span style={{fontFamily:T.sans,fontSize:12,color:T.ink3}}>Lens</span>
            {[{id:"all",l:"All",c:T.ink3},{id:"analyst",l:"\uD83D\uDD2C",c:"#5B9BD5"},{id:"empath",l:"\uD83D\uDC96",c:"#D4788C"},{id:"philosopher",l:"\uD83D\uDCA1",c:T.gold},{id:"storyteller",l:"\uD83C\uDFAD",c:"#9B7ED4"},{id:"explorer",l:"\uD83D\uDDFA\uFE0F",c:"#5BAD7A"},{id:"alchemist",l:"\u2727",c:"#C4A06A"}].map(l=><button key={l.id} onClick={()=>setLF(lensFilter===l.id?"all":l.id)} aria-pressed={lensFilter===l.id} title={l.id==="all"?"All lenses":l.id.charAt(0).toUpperCase()+l.id.slice(1)} style={{padding:"4px 8px",borderRadius:6,border:`1px solid ${lensFilter===l.id?`${l.c}30`:T.border}`,background:lensFilter===l.id?`${l.c}12`:"transparent",fontSize:l.id==="all"?11:14,fontFamily:T.sans,fontWeight:600,color:lensFilter===l.id?l.c:T.ink4,cursor:"pointer",transition:"all .15s"}}>{l.l}</button>)}
          </div>
          {sortedReviews.length===0&&<div style={{padding:"32px 20px",textAlign:"center"}}><div style={{fontSize:28,marginBottom:10,opacity:.3}}>{"\u270D\uFE0F"}</div><div style={{fontFamily:T.serif,fontSize:15,fontWeight:600,color:T.ink,marginBottom:6}}>{lensFilter!=="all"?`No ${lensFilter} reviews yet.`:"No reviews yet."}</div><p style={{fontFamily:T.body,fontSize:12,color:T.ink3,fontWeight:300}}>{lensFilter!=="all"?<>Try <button onClick={()=>setLF("all")} style={{background:"none",border:"none",color:T.accent,cursor:"pointer",fontFamily:T.body,fontSize:12,fontWeight:600,textDecoration:"underline"}}>viewing all lenses</button>, or be the first.</>:"Be the first to share your thoughts on this book."}</p></div>}
          {sortedReviews.map((r,i)=><div key={r.id} style={{animation:loaded?`fadeUp .3s ease ${i*.05}s both`:"none"}}><ReviewCard review={r}/></div>)}
        </>}
        {tab==="waypoints"&&COMMUNITY_WAYPOINTS.map((s,i)=><div key={s.id} style={{animation:loaded?`fadeUp .3s ease ${i*.05}s both`:"none"}}><WaypointCard syn={s}/></div>)}
        {tab==="originals"&&<div className="fc" style={{padding:"60px 20px",textAlign:"center",background:T.card,borderRadius:14,border:`1px solid ${T.border}`}}>
          <div style={{fontSize:40,marginBottom:14,opacity:.4}}>{"\u270D"}</div>
          <div style={{fontFamily:T.serif,fontSize:18,fontWeight:700,color:T.ink,marginBottom:6,fontStyle:"italic"}}>{BOOK.stats.originals} original works inspired by this book</div>
          <div style={{fontFamily:T.body,fontSize:13,color:T.ink3,lineHeight:1.6}}>Stories, poetry, and essays born from the reading experience.</div>
        </div>}
        {tab==="spoilers"&&<div style={{display:"flex",flexDirection:"column",gap:12}}>
          {SPOILER_GATES.map((g,i)=><SpoilerGateCard key={i} gate={g}/>)}
        </div>}
      </main>

      <aside className="book-side" style={{position:"sticky",top:130,display:"flex",flexDirection:"column",gap:0}}>
        <CommunityPulse/>
        <CurrentlyReadingSidebar readers={READERS}/>
        <ReadingPaceWidget/>
        <SpoilerMap/>
        <ShelvesAppearingSidebar/>
        <CompanionReads/>
      </aside>
    </div>

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
