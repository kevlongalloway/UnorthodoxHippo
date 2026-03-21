import { useState, useEffect, useRef, useCallback } from "react";

// ═══════════════════════════════════════════════════
// THEME + TOKENS — canonical from platform
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

const LENSES={analyst:{icon:"\uD83D\uDD2C",label:"Analyst",color:"#5B9BD5",desc:"Structure, craft, architecture",focus:"narrative technique, prose style, structural choices"},empath:{icon:"\uD83D\uDC96",label:"Empath",color:"#D4788C",desc:"Feeling, resonance, nerve",focus:"emotional arcs, character interiority, relational dynamics"},philosopher:{icon:"\uD83D\uDCA1",label:"Philosopher",color:"#D4A855",desc:"Ideas, questions, meaning",focus:"thematic threads, moral questions, intellectual genealogy"},storyteller:{icon:"\uD83C\uDFAD",label:"Storyteller",color:"#9B7ED4",desc:"Narrative, scene, voice",focus:"plot momentum, scene construction, narrative voice"},explorer:{icon:"\uD83D\uDDFA\uFE0F",label:"Explorer",color:"#5BAD7A",desc:"Discovery, territory, wonder",focus:"world-building, cultural context, historical anchoring"},alchemist:{icon:"\u2727",label:"Alchemist",color:"#C4A06A",desc:"Synthesis, connection, transformation",focus:"cross-references, genre fusion, unexpected connections"}};

const TIERS=[{name:"Fresh Ink",min:0,color:T.ink3},{name:"Wet Ink",min:25,color:"#8BAAB8"},{name:"Set Ink",min:100,color:"#A0C090"},{name:"Deep Ink",min:500,color:T.gold},{name:"Indelible",min:2000,color:T.accent}];
function getTier(n){for(let i=TIERS.length-1;i>=0;i--)if(n>=TIERS[i].min)return TIERS[i];return TIERS[0];}

const USER={name:"Priya Anand",handle:"@priyareads",initials:"PA",ink:12300,lens:"empath"};

// ═══════════════════════════════════════════════════
// BOOK DATABASE
// ═══════════════════════════════════════════════════
const BOOKS=[
  {id:"b1",title:"Beloved",author:"Toni Morrison",year:1987,pages:324,genre:"Literary Fiction",chapters:28,cover:"\uD83D\uDCD5"},
  {id:"b2",title:"Intermezzo",author:"Sally Rooney",year:2024,pages:448,genre:"Literary Fiction",chapters:32,cover:"\uD83D\uDCD7"},
  {id:"b3",title:"James",author:"Percival Everett",year:2024,pages:303,genre:"Literary Fiction",chapters:42,cover:"\uD83D\uDCD8"},
  {id:"b4",title:"Orbital",author:"Samantha Harvey",year:2023,pages:272,genre:"Literary Fiction",chapters:16,cover:"\uD83D\uDCD9"},
  {id:"b5",title:"The Vegetarian",author:"Han Kang",year:2007,pages:183,genre:"Literary Fiction",chapters:3,cover:"\uD83D\uDCDA"},
  {id:"b6",title:"Demon Copperhead",author:"Barbara Kingsolver",year:2022,pages:560,genre:"Literary Fiction",chapters:62,cover:"\uD83D\uDCD3"},
  {id:"b7",title:"The God of Small Things",author:"Arundhati Roy",year:1997,pages:321,genre:"Literary Fiction",chapters:21,cover:"\uD83D\uDCD2"},
];

// Community waypoints for selected book
const COMMUNITY_WAYPOINTS={
  b1:[
    {id:"cs1",user:"Marcus Cole",lens:"analyst",page:120,preview:"Morrison's first 120 pages establish a haunted house as narrative architecture \u2014 124 Bluestone Road isn't setting, it's a character. The prose fragments mirror the fractured memory of trauma. Sethe's backstory unfolds in deliberate non-linearity.",crossBooks:null},
    {id:"cs2",user:"Lila Okafor",lens:"storyteller",page:200,preview:"By page 200, Denver has emerged as the story's true compass. Morrison pulls a structural trick: we think Beloved is the protagonist, but Denver is the one who changes. The arrival of Beloved forces every character to re-narrate their own history.",crossBooks:["Song of Solomon"]},
    {id:"cs3",user:"Yuki Tanaka",lens:"philosopher",page:324,preview:"The ending refuses catharsis by design. Morrison's final pages argue that some stories resist telling \u2014 not because they shouldn't be told, but because the telling itself is a form of possession. 'This is not a story to pass on' is the most honest sentence in American literature.",crossBooks:null},
  ],
  b2:[
    {id:"cs4",user:"Davi Santos",lens:"explorer",page:150,preview:"Rooney's Dublin feels less like a city and more like a mood board. The chess scenes between Peter and Ivan aren't about chess \u2014 they're Rooney's way of showing two people who can only connect through rules and structure.",crossBooks:null},
    {id:"cs5",user:"Amara Osei",lens:"empath",page:320,preview:"The Sylvia chapters hit hardest. Rooney understands something about grief that most writers dance around: it doesn't make you sad, it makes you strange. The way Sylvia processes her injury reshapes every relationship in the book.",crossBooks:["Normal People"]},
  ],
};

// ═══════════════════════════════════════════════════
// WAYPOINT SAMPLES (simulated output)
// ═══════════════════════════════════════════════════
const GEN_WAYPOINTS={
  empath:{
    b1_120:`Through page 120, you've met a household held together by the force of what it refuses to name. Sethe carries a weight that manifests physically \u2014 the tree on her back isn't metaphor, it's scar tissue that Morrison makes you touch. Baby Suggs preaches a gospel of self-love that reads as radical precisely because it exists inside a world designed to make it impossible.\n\nThe house at 124 pulses with an energy that the characters have learned to live alongside rather than confront. Pay attention to how Denver has already begun constructing her own world within the world \u2014 her emerald closet of trees is the first architecture of selfhood you'll see her build.\n\nWhat's coming will reframe everything you've read so far. The emotional landscape is about to get seismic.`,
    b2_200:`Two hundred pages in, you're watching two brothers try to love the same feeling through different people. Peter intellectualizes connection while Ivan experiences it as weather \u2014 something that happens to him, atmospheric and ungovernable.\n\nRooney is doing something quiet and devastating with Naomi: she's the character who most clearly sees what's happening, and her clarity is what makes her the most vulnerable. Margaret's presence keeps shifting the gravitational center of every room she enters.\n\nThe emotional geometry is about to get more complex. What feels like a love triangle is actually something more like a love topology \u2014 surfaces that fold into each other without breaking.`
  },
  analyst:{
    b1_120:`Through page 120, Morrison has established a tripartite narrative structure: present-tense domesticity at 124, Sethe's memory-fugues, and the community's collective oral history. The technique is deliberately anti-chronological \u2014 events arrive as emotional associations rather than sequences.\n\nNote the prose register shifts: Morrison modulates between lyrical interiority and clipped dialogue to create a rhythm that mimics how trauma interrupts consciousness. The "tree" on Sethe's back functions simultaneously as symbol, physical reality, and narrative device \u2014 it's how Morrison refuses the hierarchy between body and meaning.\n\nStructurally, the first third is foundation. Morrison is building load-bearing walls. What's coming will test every joint.`
  }
};

// ═══════════════════════════════════════════════════
// WAYPOINT HISTORY
// ═══════════════════════════════════════════════════
const HISTORY=[
  {id:"h1",book:BOOKS[0],lens:"empath",page:120,date:"Feb 24",snippet:"Through page 120, you\u2019ve met a household held together by what it refuses to name\u2026"},
  {id:"h2",book:BOOKS[1],lens:"empath",page:200,date:"Feb 20",snippet:"Two hundred pages in, you\u2019re watching two brothers try to love the same feeling\u2026"},
  {id:"h3",book:BOOKS[3],lens:"analyst",page:100,date:"Feb 15",snippet:"Harvey\u2019s orbital structure mirrors the ISS rotation cycle \u2014 each chapter is one orbit\u2026"},
];

// ═══════════════════════════════════════════════════
// HELPER COMPONENTS
// ═══════════════════════════════════════════════════
function Av({i,s=32,ink=0}){const t=getTier(ink);return <div style={{width:s,height:s,borderRadius:"50%",background:`linear-gradient(160deg,${T.bg3},${T.bg2})`,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:T.sans,fontSize:s*.36,fontWeight:700,color:T.ink2,border:`1.5px solid ${t.color}30`,flexShrink:0}}>{i}</div>;}

// ═══════════════════════════════════════════════════
// MAIN
// ═══════════════════════════════════════════════════

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

export default function Compass(){
  const{theme,tid,setTid}=useTheme(); T=theme;
  const[vis,setVis]=useState(false);
  const[toast,setToast]=useState("");
  useEffect(()=>{setTimeout(()=>setVis(true),80);},[]);
  function pToast(msg){setToast(msg);setTimeout(()=>setToast(""),2400);}

  // View: "home" | "generate" | "result" | "community" | "history"
  const[view,setView]=useState("home");

  // Book selection
  const[searchQ,setSearchQ]=useState("");
  const[selBook,setSelBook]=useState(null);

  // Generation params
  const[selLens,setSelLens]=useState(USER.lens);
  const[pageNum,setPageNum]=useState("");
  const[chapterNum,setChapterNum]=useState("");
  const[inputMode,setInputMode]=useState("page"); // "page" | "chapter" | "percent"
  const[percentNum,setPercentNum]=useState("");

  // Generation state
  const[generating,setGenerating]=useState(false);
  const[genProg,setGenProg]=useState(0);
  const[genResult,setGenResult]=useState(null);
  const[genPhase,setGenPhase]=useState(""); // "scanning", "calibrating", "writing"
  const progRef=useRef(null);

  // Community view
  const[commWaypoints,setCommWaypoints]=useState([]);
  const[crossRevealed,setCR]=useState({});

  // Tab for result view
  const[resultTab,setResultTab]=useState("waypoint");

  // Annotation & comments
  const[annotations,setAnnotations]=useState([]);
  const[newAnnotation,setNewAnnotation]=useState("");
  const[annotating,setAnnotating]=useState(false);
  const[comments,setComments]=useState([
    {id:"c1",author:"Ava Chen",initials:"AC",ink:890,lens:"empath",text:"The way Morrison shifts tense here mirrors exactly what you\u2019re describing \u2014 the past doesn\u2019t arrive as memory, it arrives as ambush. I\u2019m at page 140 and this waypoint reframed everything.",time:"2h ago",likes:7,liked:false},
    {id:"c2",author:"Leo Pacheco",initials:"LP",ink:1100,lens:"philosopher",text:"This tracks with what I found at page 200. The architecture you\u2019re seeing gets load-bearing by the second act.",time:"5h ago",likes:3,liked:false},
  ]);
  const[newComment,setNewComment]=useState("");
  const[wpInk,setWpInk]=useState({base:12,annotations:0,comments:0});

  // Waypoint management
  const[wpMenu,setWpMenu]=useState(false);
  const[editing,setEditing]=useState(false);
  const[editText,setEditText]=useState("");
  const[showQPanel,setShowQPanel]=useState(false);
  const[followUpQ,setFollowUpQ]=useState("");
  const[followUps,setFollowUps]=useState([]);
  const[asking,setAsking]=useState(false);

  // Search filter
  const searchResults=searchQ.trim()?BOOKS.filter(b=>{
    const q=searchQ.toLowerCase();
    return b.title.toLowerCase().includes(q)||b.author.toLowerCase().includes(q);
  }):BOOKS;

  // Start generation
  function startGeneration(){
    if(!selBook)return;
    const progress=getProgressValue();
    if(!progress||progress<1)return;

    setGenerating(true);setGenProg(0);setGenPhase("scanning");setView("generate");
    const phases=[{p:25,phase:"scanning",label:"Reading alongside you\u2026"},{p:55,phase:"calibrating",label:`Tuning to your ${LENSES[selLens].label} lens\u2026`},{p:85,phase:"writing",label:"Charting your waypoint\u2026"},{p:100,phase:"done",label:""}];
    let step=0;
    progRef.current=setInterval(()=>{
      if(step>=phases.length){clearInterval(progRef.current);finishGeneration();return;}
      setGenProg(phases[step].p);setGenPhase(phases[step].phase);step++;
    },800);
  }

  function finishGeneration(){
    setGenerating(false);
    // Pick appropriate sample or fallback
    const key=`${selBook.id}_${getProgressValue()}`;
    const lensBank=GEN_WAYPOINTS[selLens]||GEN_WAYPOINTS.empath;
    const text=lensBank[key]||lensBank[Object.keys(lensBank)[0]]||"Your waypoint is set. A spoiler-safe orientation through your current place in the book, shaped by your reading lens.";
    setGenResult({
      book:selBook,lens:selLens,page:getProgressValue(),
      text,
      crossBooks:selBook.id==="b1"&&getProgressValue()>200?["Song of Solomon"]:null,
      generatedAt:"Just now",
      wordCount:text.split(/\s+/).length,
    });
    setView("result");
    // Load community waypoints
    setCommWaypoints(COMMUNITY_WAYPOINTS[selBook.id]||[]);
  }

  function getProgressValue(){
    if(inputMode==="page")return parseInt(pageNum)||0;
    if(inputMode==="chapter"&&selBook)return Math.round((parseInt(chapterNum)||0)/selBook.chapters*selBook.pages);
    if(inputMode==="percent"&&selBook)return Math.round((parseInt(percentNum)||0)/100*selBook.pages);
    return 0;
  }

  function getProgressLabel(){
    if(inputMode==="page")return `Page ${pageNum||"?"}`;
    if(inputMode==="chapter")return `Chapter ${chapterNum||"?"} (~p.${getProgressValue()})`;
    if(inputMode==="percent")return `${percentNum||"?"}% (~p.${getProgressValue()})`;
    return "";
  }

  function resetCompass(){
    setSelBook(null);setSearchQ("");setPageNum("");setChapterNum("");setPercentNum("");
    setGenResult(null);setGenerating(false);setGenProg(0);setCR({});setView("home");
    if(progRef.current)clearInterval(progRef.current);
  }
  const[showResetConfirm,setSRC]=useState(false);
  function confirmReset(){
    if(generating||genResult){setSRC(true);}
    else{resetCompass();}
  }

  useEffect(()=>()=>{if(progRef.current)clearInterval(progRef.current);},[]);

  const lensObj=LENSES[selLens];
  const progressPct=selBook?Math.min(100,Math.round(getProgressValue()/selBook.pages*100)):0;

  return <div style={{minHeight:"100vh",background:T.bg,color:T.ink}}>
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,800;1,400;1,700&family=Source+Serif+4:ital,opsz,wght@0,8..60,300;0,8..60,400;0,8..60,600;1,8..60,300;1,8..60,400&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&display=swap');
      *{margin:0;padding:0;box-sizing:border-box}::selection{background:rgba(90,138,180,.2)}body{overflow-x:hidden;background:${T.bg}!important}
      @keyframes fadeUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:none}}
      @keyframes fadeIn{from{opacity:0}to{opacity:1}}
      @keyframes pulseGlow{0%,100%{opacity:1}50%{opacity:.4}}
      @keyframes shimmer{0%{background-position:-200px 0}100%{background-position:200px 0}}
      @keyframes typeIn{from{opacity:0;transform:translateY(4px)}to{opacity:1;transform:none}}
      @media(max-width:640px){.mob-nav{display:flex!important;}}
@media(prefers-reduced-motion:reduce){*{animation-duration:0.01ms!important;transition-duration:0.01ms!important}}
      button:focus-visible{outline:2px solid ${T.blue};outline-offset:2px;border-radius:4px}
      input:focus-visible{outline:2px solid ${T.blue};outline-offset:1px;border-radius:6px}
      .wp-para{font-family:${T.body};font-size:14px;color:${T.ink2};font-weight:300;line-height:1.75;margin-bottom:14px}
      .wp-para:last-child{margin-bottom:0}
    `}</style>

    {toast&&<div style={{position:"fixed",bottom:24,left:"50%",transform:"translateX(-50%)",padding:"10px 24px",borderRadius:10,background:T.bg2,border:`1px solid ${T.borderHover}`,boxShadow:"0 8px 32px rgba(0,0,0,.4)",fontFamily:T.sans,fontSize:12,fontWeight:700,color:T.ink,zIndex:300,animation:"fadeUp .3s ease"}}>{toast}</div>}
    {showResetConfirm&&<div style={{position:"fixed",inset:0,background:"rgba(0,0,0,.65)",zIndex:200,display:"flex",alignItems:"center",justifyContent:"center",animation:"fadeIn .15s ease"}} onClick={()=>setSRC(false)}>
      <div onClick={e=>e.stopPropagation()} style={{background:T.card,border:`1px solid ${T.borderHover}`,borderRadius:16,padding:"28px 32px",maxWidth:360,width:"90%",textAlign:"center",animation:"fadeUp .2s ease"}}>
        <div style={{fontSize:24,marginBottom:12}}>{"\u27D0"}</div>
        <div style={{fontFamily:T.serif,fontSize:17,fontWeight:700,color:T.ink,marginBottom:6}}>Leave this waypoint?</div>
        <p style={{fontFamily:T.body,fontSize:12,color:T.ink3,fontWeight:300,lineHeight:1.6,marginBottom:20}}>Your current waypoint progress will be lost. You can always set a new one.</p>
        <div style={{display:"flex",gap:8,justifyContent:"center"}}>
          <button onClick={()=>setSRC(false)} style={{flex:1,padding:"10px 20px",borderRadius:10,border:`1px solid ${T.border}`,background:"transparent",fontFamily:T.sans,fontSize:12,fontWeight:600,color:T.ink3,cursor:"pointer"}}>Stay</button>
          <button onClick={()=>{setSRC(false);resetCompass();}} style={{flex:1,padding:"10px 20px",borderRadius:10,border:"none",background:T.red,fontFamily:T.sans,fontSize:12,fontWeight:700,color:"#fff",cursor:"pointer"}}>Leave</button>
        </div>
      </div>
    </div>}

    {/* Nav */}
    <nav style={{position:"sticky",top:0,zIndex:100,background:`${T.bg}E8`,backdropFilter:"blur(24px)",borderBottom:`1px solid ${T.border}`}}>
      <div style={{maxWidth:760,margin:"0 auto",padding:"12px 24px",display:"flex",alignItems:"center"}}>
        <span onClick={()=>pToast("\u2190 Feed")} style={{fontFamily:T.serif,fontSize:22,fontWeight:700,color:T.ink,letterSpacing:"-.5px",cursor:"pointer"}}>Pr<span style={{color:T.accent}}>{"\u00E9"}</span>cis</span>
        <span style={{fontFamily:T.sans,fontSize:12,color:T.ink3,marginLeft:12,cursor:"pointer"}} onClick={()=>view==="home"?pToast("\u2190 Feed"):confirmReset()}>{view==="home"?"\u2190 Feed":"\u2190 Back"}</span>
        <div style={{flex:1}}/>
        <ThemeSwitcher tid={tid} setTid={setTid}/>
        <span style={{fontFamily:T.sans,fontSize:13,fontWeight:700,color:T.blue,display:"flex",alignItems:"center",gap:5}}>{"\u27D0"} Compass</span>
      </div>
    </nav>

    <main style={{maxWidth:760,margin:"0 auto",padding:"28px 24px 80px",animation:vis?"fadeUp .4s ease both":"none"}}>

      {/* ═══════════════════════════════════════════ */}
      {/* HOME — book search + history */}
      {/* ═══════════════════════════════════════════ */}
      {view==="home"&&<>
        {/* Hero */}
        <div style={{textAlign:"center",marginBottom:32}}>
          <div style={{fontSize:48,marginBottom:12,opacity:.35}}>{"\u27D0"}</div>
          <h1 style={{fontFamily:T.serif,fontSize:30,fontWeight:700,color:T.ink,marginBottom:8}}>Compass</h1>
          <p style={{fontFamily:T.body,fontSize:14,color:T.ink3,fontWeight:300,lineHeight:1.6,maxWidth:440,margin:"0 auto"}}>
            Enter where you are in any book, choose your reading lens, and get a spoiler-safe waypoint that meets you exactly where you left off.
          </p>
        </div>

        {/* Search */}
        <div style={{position:"relative",marginBottom:24}}>
          <input value={searchQ} onChange={e=>setSearchQ(e.target.value)} placeholder="Search by title or author…"
            style={{width:"100%",padding:"14px 18px 14px 42px",borderRadius:12,background:T.card,border:`1px solid ${searchQ?`${T.blue}30`:T.border}`,fontFamily:T.sans,fontSize:14,color:T.ink,transition:"border-color .2s"}} aria-label="Search books"/>
          <span style={{position:"absolute",left:16,top:"50%",transform:"translateY(-50%)",fontSize:15,opacity:.3}}>{"\uD83D\uDD0D"}</span>
        </div>

        {/* Book grid */}
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))",gap:10,marginBottom:36}}>
          {searchResults.map(b=><button key={b.id} onClick={()=>{setSelBook(b);setView("generate");setPageNum("");setChapterNum("");setPercentNum("");}}
            style={{padding:"16px",borderRadius:14,border:`1px solid ${T.border}`,background:T.card,cursor:"pointer",textAlign:"left",transition:"all .15s"}}>
            <div style={{fontSize:24,marginBottom:8}}>{b.cover}</div>
            <div style={{fontFamily:T.serif,fontSize:14,fontWeight:700,color:T.ink,marginBottom:2}}>{b.title}</div>
            <div style={{fontFamily:T.body,fontSize:11,color:T.ink3,fontStyle:"italic"}}>{b.author}, {b.year}</div>
            <div style={{fontFamily:T.sans,fontSize:10,color:T.ink4,marginTop:6}}>{b.pages} pages · {b.chapters} chapters</div>
            {COMMUNITY_WAYPOINTS[b.id]&&<div style={{fontFamily:T.sans,fontSize:10,color:T.blue,marginTop:4,fontWeight:600}}>{COMMUNITY_WAYPOINTS[b.id].length} community waypoints</div>}
          </button>)}
        </div>

        {searchResults.length===0&&<div style={{textAlign:"center",padding:"40px 20px"}}>
          <div style={{fontFamily:T.body,fontSize:13,color:T.ink3}}>No books found for {"\u201C"}{searchQ}{"\u201D"}. Try a different search.</div>
        </div>}

        {/* History */}
        {HISTORY.length>0&&<>
          <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:12}}>
            <span style={{fontFamily:T.sans,fontSize:11,fontWeight:700,color:T.ink4,letterSpacing:".5px",textTransform:"uppercase"}}>Recent waypoints</span>
            <div style={{flex:1,height:1,background:T.border}}/>
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:8}}>
            {HISTORY.map(h=>{const lens=LENSES[h.lens];return <button key={h.id} onClick={()=>{setSelBook(h.book);setPageNum(String(h.page));setSelLens(h.lens);setView("generate");}}
              style={{display:"flex",alignItems:"center",gap:14,padding:"14px 18px",borderRadius:12,background:T.card,border:`1px solid ${T.border}`,cursor:"pointer",textAlign:"left",width:"100%",transition:"all .15s"}}>
              <span style={{fontSize:20,flexShrink:0}}>{h.book.cover}</span>
              <div style={{flex:1,minWidth:0}}>
                <div style={{fontFamily:T.sans,fontSize:12.5,fontWeight:700,color:T.ink}}>{h.book.title} <span style={{fontWeight:400,color:T.ink3}}>· p.{h.page}</span></div>
                <div style={{fontFamily:T.body,fontSize:11,color:T.ink3,fontWeight:300,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{h.snippet}</div>
              </div>
              <div style={{flexShrink:0,display:"flex",flexDirection:"column",alignItems:"flex-end",gap:2}}>
                <span style={{padding:"2px 8px",borderRadius:5,fontSize:9,fontWeight:600,fontFamily:T.sans,color:lens.color,background:`${lens.color}10`}}>{lens.icon}</span>
                <span style={{fontFamily:T.sans,fontSize:9,color:T.ink4}}>{h.date}</span>
              </div>
            </button>;})}
          </div>
        </>}
      </>}

      {/* ═══════════════════════════════════════════ */}
      {/* COMPASS — configure & set */}
      {/* ═══════════════════════════════════════════ */}
      {view==="generate"&&selBook&&<>
        {/* Book header */}
        <div style={{display:"flex",alignItems:"center",gap:16,marginBottom:28,padding:"20px",borderRadius:14,background:T.card,border:`1px solid ${T.border}`}}>
          <span style={{fontSize:36,flexShrink:0}}>{selBook.cover}</span>
          <div style={{flex:1}}>
            <div style={{fontFamily:T.serif,fontSize:20,fontWeight:700,color:T.ink}}>{selBook.title}</div>
            <div style={{fontFamily:T.body,fontSize:12,color:T.ink3,fontStyle:"italic"}}>{selBook.author}, {selBook.year}</div>
            <div style={{fontFamily:T.sans,fontSize:10,color:T.ink4,marginTop:4}}>{selBook.pages} pages · {selBook.chapters} chapters · {selBook.genre}</div>
          </div>
          <button onClick={confirmReset} style={{padding:"6px 14px",borderRadius:8,border:`1px solid ${T.border}`,background:"transparent",fontFamily:T.sans,fontSize:11,fontWeight:600,color:T.ink3,cursor:"pointer"}}>Change</button>
        </div>

        {!generating?<>
          {/* Progress input */}
          <div style={{marginBottom:24}}>
            <div style={{fontFamily:T.sans,fontSize:11,fontWeight:700,color:T.ink4,letterSpacing:".5px",textTransform:"uppercase",marginBottom:10}}>Where are you?</div>

            {/* Input mode toggle */}
            <div style={{display:"flex",gap:4,marginBottom:12}}>
              {[{id:"page",label:"Page #"},{id:"chapter",label:"Chapter #"},{id:"percent",label:"% through"}].map(m=>
                <button key={m.id} onClick={()=>setInputMode(m.id)}
                  style={{padding:"6px 16px",borderRadius:8,border:`1px solid ${inputMode===m.id?`${T.blue}30`:T.border}`,background:inputMode===m.id?`${T.blue}08`:"transparent",fontFamily:T.sans,fontSize:11,fontWeight:inputMode===m.id?700:500,color:inputMode===m.id?T.blue:T.ink3,cursor:"pointer"}}>{m.label}</button>
              )}
            </div>

            {/* Input field */}
            <div style={{display:"flex",alignItems:"center",gap:12}}>
              <input type="number" min="1" max={inputMode==="page"?selBook.pages:inputMode==="chapter"?selBook.chapters:100}
                value={inputMode==="page"?pageNum:inputMode==="chapter"?chapterNum:percentNum}
                onChange={e=>{const v=e.target.value;if(inputMode==="page")setPageNum(v);else if(inputMode==="chapter")setChapterNum(v);else setPercentNum(v);}}
                placeholder={inputMode==="page"?`1–${selBook.pages}`:inputMode==="chapter"?`1–${selBook.chapters}`:"1–100"}
                style={{width:120,padding:"12px 16px",borderRadius:10,background:T.card,border:`1px solid ${T.border}`,fontFamily:T.sans,fontSize:16,color:T.ink,fontWeight:700,textAlign:"center"}} aria-label={`Enter ${inputMode} number`}/>
              <div style={{flex:1}}>
                <div style={{fontFamily:T.sans,fontSize:12,color:T.ink3}}>{getProgressLabel()}</div>
                {getProgressValue()>0&&<div style={{marginTop:6,height:4,borderRadius:2,background:T.bg3,overflow:"hidden"}}>
                  <div style={{width:`${progressPct}%`,height:"100%",borderRadius:2,background:`linear-gradient(90deg,${T.blue},${T.blue}CC)`,transition:"width .3s"}}/>
                </div>}
                {getProgressValue()>0&&<div style={{fontFamily:T.sans,fontSize:9,color:T.ink4,marginTop:2}}>{progressPct}% through</div>}
              </div>
            </div>
          </div>

          {/* Lens selection */}
          <div style={{marginBottom:28}}>
            <div style={{fontFamily:T.sans,fontSize:11,fontWeight:700,color:T.ink4,letterSpacing:".5px",textTransform:"uppercase",marginBottom:10}}>Reading lens</div>
            <p style={{fontFamily:T.body,fontSize:12,color:T.ink3,fontWeight:300,marginBottom:12}}>Your waypoint will emphasize {LENSES[selLens].focus}.</p>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(130px,1fr))",gap:6}}>
              {Object.entries(LENSES).map(([k,v])=>{
                const active=selLens===k;
                return <button key={k} onClick={()=>setSelLens(k)}
                  style={{padding:"10px 12px",borderRadius:10,border:`1.5px solid ${active?`${v.color}40`:T.border}`,background:active?`${v.color}08`:T.card,cursor:"pointer",textAlign:"left",transition:"all .15s"}}>
                  <span style={{fontSize:14}}>{v.icon}</span>
                  <span style={{fontFamily:T.sans,fontSize:11,fontWeight:active?700:500,color:active?v.color:T.ink,marginLeft:6}}>{v.label}</span>
                </button>;
              })}
            </div>
          </div>

          {/* Spoiler safety indicator */}
          {getProgressValue()>0&&<div style={{padding:"12px 16px",borderRadius:10,background:`${T.green}06`,border:`1px solid ${T.green}15`,marginBottom:20,display:"flex",alignItems:"center",gap:10}}>
            <span style={{fontSize:14}}>{"\uD83D\uDD12"}</span>
            <div>
              <div style={{fontFamily:T.sans,fontSize:11,fontWeight:700,color:T.green}}>Spoiler-safe through {getProgressLabel()}</div>
              <div style={{fontFamily:T.body,fontSize:10,color:T.ink3,fontWeight:300}}>Nothing beyond your progress will be referenced.</div>
            </div>
          </div>}

          {/* Set waypoint button */}
          <button onClick={startGeneration} disabled={!getProgressValue()||getProgressValue()<1}
            style={{width:"100%",padding:"14px",borderRadius:12,border:"none",background:getProgressValue()>0?`linear-gradient(135deg,${T.blue},#3A6A94)`:`${T.ink4}30`,color:getProgressValue()>0?"#fff":T.ink4,fontFamily:T.sans,fontSize:14,fontWeight:700,cursor:getProgressValue()>0?"pointer":"not-allowed",boxShadow:getProgressValue()>0?`0 4px 20px ${T.blue}25`:"none",transition:"all .2s"}}>
            {"\u27D0"} Set Waypoint
          </button>

        {/* Compass animation */}
        </>:<div style={{textAlign:"center",padding:"60px 20px"}}>
          <div style={{marginBottom:20}}>
            <div style={{width:80,height:80,borderRadius:"50%",background:`${T.blue}08`,border:`2px solid ${T.blue}20`,display:"inline-flex",alignItems:"center",justifyContent:"center",fontSize:32,animation:"pulseGlow 1.5s infinite"}}>{"\u27D0"}</div>
          </div>
          <div style={{fontFamily:T.serif,fontSize:18,fontWeight:700,color:T.ink,marginBottom:8}}>
            {genPhase==="scanning"?"Reading alongside you\u2026":genPhase==="calibrating"?`Tuning to your ${LENSES[selLens].icon} ${LENSES[selLens].label} lens\u2026`:genPhase==="writing"?"Charting your waypoint\u2026":"Almost there\u2026"}
          </div>
          <div style={{maxWidth:300,margin:"0 auto"}}>
            <div style={{height:4,borderRadius:2,background:T.bg3,overflow:"hidden",marginBottom:8}}>
              <div style={{width:`${genProg}%`,height:"100%",borderRadius:2,background:`linear-gradient(90deg,${T.blue},${lensObj.color})`,transition:"width .6s ease"}}/>
            </div>
            <div style={{fontFamily:T.sans,fontSize:10,color:T.ink4}}>{genProg}%</div>
          </div>
        </div>}
      </>}

      {/* ═══════════════════════════════════════════ */}
      {/* RESULT — your waypoint + actions */}
      {/* ═══════════════════════════════════════════ */}
      {view==="result"&&genResult&&<>
        {/* Result header */}
        <div style={{display:"flex",alignItems:"center",gap:14,marginBottom:20}}>
          <span style={{fontSize:28}}>{genResult.book.cover}</span>
          <div style={{flex:1}}>
            <div style={{fontFamily:T.serif,fontSize:18,fontWeight:700,color:T.ink}}>{genResult.book.title}</div>
            <div style={{display:"flex",gap:6,alignItems:"center",marginTop:4}}>
              <span style={{padding:"2px 10px",borderRadius:6,fontSize:10,fontWeight:600,fontFamily:T.sans,color:lensObj.color,background:`${lensObj.color}10`,border:`1px solid ${lensObj.color}20`}}>{lensObj.icon} {lensObj.label}</span>
              <span style={{fontFamily:T.sans,fontSize:10,color:T.ink4}}>Through p.{genResult.page}</span>
              <span style={{fontFamily:T.sans,fontSize:10,color:T.ink4}}>· {genResult.wordCount} words</span>
            </div>
          </div>
        </div>

        {/* Tabs: Waypoint | Community */}
        <div style={{display:"flex",gap:4,marginBottom:20,borderBottom:`1px solid ${T.border}`,paddingBottom:8}}>
          {[{id:"waypoint",label:`${"\u27D0"} Your Waypoint`},{id:"community",label:`Community (${commWaypoints.length})`}].map(t=>
            <button key={t.id} onClick={()=>setResultTab(t.id)}
              style={{padding:"8px 16px",borderRadius:8,border:"none",background:resultTab===t.id?`${T.blue}10`:"transparent",fontFamily:T.sans,fontSize:12,fontWeight:resultTab===t.id?700:500,color:resultTab===t.id?T.blue:T.ink3,cursor:"pointer"}}>{t.label}</button>
          )}
        </div>

        {resultTab==="waypoint"&&<>
          {/* Spoiler safety bar */}
          <div style={{padding:"10px 14px",borderRadius:10,background:`${T.green}06`,border:`1px solid ${T.green}15`,marginBottom:20,display:"flex",alignItems:"center",gap:8}}>
            <span style={{fontSize:12}}>{"\uD83D\uDD12"}</span>
            <span style={{fontFamily:T.sans,fontSize:11,fontWeight:600,color:T.green}}>Spoiler-safe through page {genResult.page}</span>
          </div>

          {/* Waypoint body */}
          <div style={{padding:"24px",borderRadius:14,background:T.card,border:`1px solid ${T.blue}08`,marginBottom:20}}>
            {genResult.text.split("\n\n").map((p,i)=><p key={i} className="wp-para" style={{animation:`typeIn .4s ease ${i*.15}s both`}}>{p}</p>)}
          </div>

          {/* Go deeper — Waypoint Questioning */}
          <div style={{marginBottom:20}}>
            <button onClick={()=>setShowQPanel(!showQPanel)} style={{display:"flex",alignItems:"center",gap:8,width:"100%",padding:"12px 16px",borderRadius:12,border:`1px dashed ${T.blue}30`,background:showQPanel?`${T.blue}06`:"transparent",fontFamily:T.sans,fontSize:12,fontWeight:700,color:T.blue,cursor:"pointer",transition:"all .2s"}} onMouseEnter={e=>{if(!showQPanel)e.currentTarget.style.background=`${T.blue}04`;}} onMouseLeave={e=>{if(!showQPanel)e.currentTarget.style.background="transparent";}}>
              <span style={{fontSize:16}}>{"\u27D0"}</span><span>Go deeper {"\u2014"} ask a follow-up question</span><span style={{marginLeft:"auto",fontSize:10,opacity:.6}}>{showQPanel?"\u25B2":"\u25BC"}</span>
            </button>
            {showQPanel&&<div style={{marginTop:8,padding:"16px",borderRadius:14,background:T.card,border:`1px solid ${T.blue}12`,animation:"fadeUp .2s ease"}}>
              <div style={{fontFamily:T.sans,fontSize:9,fontWeight:700,color:T.ink4,letterSpacing:".5px",textTransform:"uppercase",marginBottom:8}}>Suggested questions</div>
              <div style={{display:"flex",flexDirection:"column",gap:4,marginBottom:14}}>
                {[`Why does Morrison use this technique at page ${genResult.page} specifically?`,`How does this connect to what I read earlier?`,`Can you explain this in simpler terms?`,`What should I pay attention to in the next 30 pages?`].map((sq,i)=><button key={i} onClick={()=>{if(asking)return;setAsking(true);const qT=sq;setTimeout(()=>{const BANK=["This is where Morrison\u2019s method becomes structural. She\u2019s not using fragmented chronology for style \u2014 she\u2019s mimicking how trauma functions in memory. Events arrive when triggered, not when convenient.\n\nThe technique serves the theme: if told linearly, the horror would be abstract. By forcing you to experience it through flashes and returns, Morrison creates empathy at a neurological level.","What you\u2019re seeing builds on the first 50 pages. The \u201Ctree\u201D on Sethe\u2019s back is the structural spine of the whole novel.\n\nEvery scene since grows from those roots. The ghost\u2019s physicality, the community\u2019s silence, Denver\u2019s isolation \u2014 all traces back to a history alive in the body.","In plain terms: Morrison tells this story out of order on purpose. She wants you to feel disoriented because that\u2019s how her characters feel.\n\nThe key insight: the past isn\u2019t over for these people. It literally shows up at their door. That\u2019s the ghost.","In the next 30 pages, watch for two things:\n\n1. The community\u2019s relationship to 124 Bluestone Road is about to shift \u2014 a confrontation between individual trauma and collective responsibility.\n\n2. Beloved\u2019s language becomes more coherent as she gains power. Morrison is showing you something about presence and articulation."];setFollowUps(p=>[...p,{q:qT,a:BANK[i%4],time:"Just now"}]);setAsking(false);},1200);}} style={{textAlign:"left",padding:"8px 12px",borderRadius:8,border:`1px solid ${T.border}`,background:"transparent",fontFamily:T.body,fontSize:11,color:T.ink3,fontWeight:300,cursor:asking?"default":"pointer",lineHeight:1.4,transition:"all .15s",opacity:asking?.5:1}} onMouseEnter={e=>{if(!asking)e.currentTarget.style.background=T.bg3;}} onMouseLeave={e=>e.currentTarget.style.background="transparent"}>{sq}</button>)}
              </div>
              <div style={{display:"flex",gap:8}}>
                <input value={followUpQ} onChange={e=>setFollowUpQ(e.target.value)} onKeyDown={e=>{if(e.key==="Enter"&&followUpQ.trim()&&!asking){setAsking(true);const qT=followUpQ.trim();setFollowUpQ("");setTimeout(()=>{setFollowUps(p=>[...p,{q:qT,a:"That\u2019s an important question at this point in your reading. The passage works on multiple levels simultaneously \u2014 Morrison rarely does just one thing with her prose.\n\nAt the surface, this moment anchors you physically. Beneath that, it\u2019s doing structural work: connecting to the central question the novel circles around. Keep reading with this thread in mind.",time:"Just now"}]);setAsking(false);},1200);}}} placeholder={"Ask anything about this waypoint\u2026"} style={{flex:1,padding:"10px 14px",borderRadius:10,border:`1px solid ${T.border}`,background:T.bg3,fontFamily:T.body,fontSize:12,color:T.ink,fontWeight:300}} disabled={asking}/>
                <button onClick={()=>{if(!followUpQ.trim()||asking)return;setAsking(true);const qT=followUpQ.trim();setFollowUpQ("");setTimeout(()=>{setFollowUps(p=>[...p,{q:qT,a:"The passage works on multiple levels \u2014 Morrison rarely does just one thing. At the surface, this anchors you physically. Beneath that, it connects to the central question the novel circles.\n\nKeep reading with this thread in mind. The pattern repeats and deepens.",time:"Just now"}]);setAsking(false);},1200);}} disabled={!followUpQ.trim()||asking} style={{padding:"10px 18px",borderRadius:10,border:"none",background:followUpQ.trim()&&!asking?T.blue:`${T.blue}30`,fontFamily:T.sans,fontSize:11,fontWeight:700,color:"#fff",cursor:followUpQ.trim()&&!asking?"pointer":"default"}}>{asking?"Thinking\u2026":"Ask"}</button>
              </div>
              {followUps.length>0&&<div style={{marginTop:16,borderTop:`1px solid ${T.border}`,paddingTop:12}}>
                <div style={{fontFamily:T.sans,fontSize:9,fontWeight:700,color:T.ink4,letterSpacing:".5px",textTransform:"uppercase",marginBottom:8}}>Conversation ({followUps.length})</div>
                {followUps.map((fu,i)=><div key={i} style={{marginBottom:12,animation:"fadeUp .25s ease"}}>
                  <div style={{display:"flex",gap:8,marginBottom:6}}>
                    <div style={{width:20,height:20,borderRadius:"50%",background:`${T.accent}15`,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:T.sans,fontSize:8,fontWeight:800,color:T.accent,flexShrink:0}}>You</div>
                    <div style={{fontFamily:T.body,fontSize:12,fontWeight:600,color:T.ink,lineHeight:1.5}}>{fu.q}</div>
                  </div>
                  <div style={{marginLeft:28,padding:"12px 14px",borderRadius:10,background:`${T.blue}04`,border:`1px solid ${T.blue}08`}}>
                    {fu.a.split("\n\n").map((p,j)=><p key={j} style={{fontFamily:T.body,fontSize:12,color:T.ink2,fontWeight:300,lineHeight:1.7,marginBottom:j<fu.a.split("\n\n").length-1?10:0}}>{p}</p>)}
                    <div style={{display:"flex",gap:8,marginTop:8}}>
                      <button onClick={()=>pToast("Saved to annotations")} style={{fontFamily:T.sans,fontSize:9,fontWeight:600,color:T.gold,background:"none",border:"none",cursor:"pointer"}}>{"\u25C6"} Save as annotation</button>
                      <button onClick={()=>pToast("Share link copied")} style={{fontFamily:T.sans,fontSize:9,fontWeight:600,color:T.ink4,background:"none",border:"none",cursor:"pointer"}}>{"\uD83D\uDD17"} Share</button>
                    </div>
                  </div>
                </div>)}
              </div>}
            </div>}
          </div>

          {/* Cross-book warning */}
          {genResult.crossBooks&&<div style={{padding:"14px 18px",borderRadius:12,background:`${T.red}04`,border:`1px solid ${T.red}15`,marginBottom:20}}>
            <div style={{fontFamily:T.sans,fontSize:11,fontWeight:700,color:T.red,marginBottom:4}}>{"\uD83D\uDD12"} Cross-book references detected</div>
            <div style={{fontFamily:T.body,fontSize:12,color:T.ink3,fontWeight:300}}>Some community waypoints for this section reference: <strong>{genResult.crossBooks.join(", ")}</strong>. These are gated in the community tab.</div>
          </div>}

          {/* Waypoint management */}
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:16}}>
            <div style={{display:"flex",alignItems:"center",gap:6}}>
              <span style={{fontFamily:T.sans,fontSize:11,fontWeight:700,color:T.gold}}>{"\u25C6"} +{wpInk.base + wpInk.annotations + wpInk.comments} Ink earned</span>
              <span style={{fontFamily:T.sans,fontSize:9,color:T.ink4}}>(waypoint {wpInk.base} + annotations {wpInk.annotations} + comments {wpInk.comments})</span>
            </div>
            <div style={{position:"relative"}}>
              <button onClick={()=>setWpMenu(!wpMenu)} style={{padding:"4px 8px",borderRadius:6,border:`1px solid ${T.border}`,background:"transparent",fontFamily:T.sans,fontSize:14,color:T.ink4,cursor:"pointer"}}>{"\u22EF"}</button>
              {wpMenu&&<div style={{position:"absolute",top:"100%",right:0,marginTop:4,width:180,background:T.card,border:`1px solid ${T.borderHover}`,borderRadius:10,overflow:"hidden",boxShadow:"0 8px 32px rgba(0,0,0,.5)",zIndex:20}}>
                <button onClick={()=>{setEditing(true);setEditText(genResult.text);setWpMenu(false);}} style={{display:"block",width:"100%",padding:"10px 14px",border:"none",background:"transparent",fontFamily:T.sans,fontSize:11,fontWeight:600,color:T.ink,textAlign:"left",cursor:"pointer"}} onMouseEnter={e=>e.currentTarget.style.background=T.bg3} onMouseLeave={e=>e.currentTarget.style.background="transparent"}>{"\u270D"} Edit waypoint</button>
                <button onClick={()=>{if(window.confirm("Delete this waypoint? This can\u2019t be undone.")){setGenResult(null);setResultTab("waypoint");pToast("Waypoint deleted");}setWpMenu(false);}} style={{display:"block",width:"100%",padding:"10px 14px",border:"none",background:"transparent",fontFamily:T.sans,fontSize:11,fontWeight:600,color:T.red,textAlign:"left",cursor:"pointer"}} onMouseEnter={e=>e.currentTarget.style.background=T.bg3} onMouseLeave={e=>e.currentTarget.style.background="transparent"}>{"\uD83D\uDDD1"} Delete waypoint</button>
                <div style={{borderTop:`1px solid ${T.border}`}}/>
                <button onClick={()=>{pToast("Report submitted");setWpMenu(false);}} style={{display:"block",width:"100%",padding:"10px 14px",border:"none",background:"transparent",fontFamily:T.sans,fontSize:11,fontWeight:600,color:T.ink4,textAlign:"left",cursor:"pointer"}} onMouseEnter={e=>e.currentTarget.style.background=T.bg3} onMouseLeave={e=>e.currentTarget.style.background="transparent"}>{"\u26A0"} Report</button>
              </div>}
            </div>
          </div>

          {/* Edit mode */}
          {editing&&<div style={{marginBottom:20,padding:"16px",borderRadius:12,background:T.card,border:`1px solid ${T.blue}15`}}>
            <div style={{fontFamily:T.sans,fontSize:10,fontWeight:700,color:T.blue,marginBottom:8}}>Editing waypoint</div>
            <textarea value={editText} onChange={e=>setEditText(e.target.value)} style={{width:"100%",minHeight:160,padding:12,borderRadius:10,border:`1px solid ${T.border}`,background:T.bg3,fontFamily:T.body,fontSize:13,color:T.ink,fontWeight:300,lineHeight:1.7,resize:"vertical"}}/>
            <div style={{display:"flex",gap:8,marginTop:8,justifyContent:"flex-end"}}>
              <button onClick={()=>setEditing(false)} style={{padding:"7px 16px",borderRadius:8,border:`1px solid ${T.border}`,background:"transparent",fontFamily:T.sans,fontSize:11,fontWeight:600,color:T.ink3,cursor:"pointer"}}>Cancel</button>
              <button onClick={()=>{setGenResult({...genResult,text:editText});setEditing(false);pToast("Waypoint updated");}} style={{padding:"7px 16px",borderRadius:8,border:"none",background:T.blue,fontFamily:T.sans,fontSize:11,fontWeight:700,color:"#fff",cursor:"pointer"}}>Save changes</button>
            </div>
          </div>}

          {/* Action row */}
          <div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:20}}>
            <button onClick={()=>pToast("\u2913 Saved to your shelf")} style={{padding:"9px 20px",borderRadius:10,border:`1px solid ${T.gold}25`,background:`${T.gold}06`,fontFamily:T.sans,fontSize:12,fontWeight:600,color:T.gold,cursor:"pointer"}}>{"\u25C6"} Save to shelf</button>
            <button onClick={()=>pToast("\uD83D\uDD17 Share link copied")} style={{padding:"9px 20px",borderRadius:10,border:`1px solid ${T.border}`,background:"transparent",fontFamily:T.sans,fontSize:12,fontWeight:600,color:T.ink3,cursor:"pointer"}}>{"\uD83D\uDD17"} Share</button>
            <button onClick={()=>pToast("\u270D Opening composer\u2026")} style={{padding:"9px 20px",borderRadius:10,border:`1px solid ${T.border}`,background:"transparent",fontFamily:T.sans,fontSize:12,fontWeight:600,color:T.ink3,cursor:"pointer"}}>{"\u270D"} Respond</button>
            <button onClick={()=>{const newLens=Object.keys(LENSES).find(k=>k!==selLens);if(newLens){setSelLens(newLens);pToast(`Recalibrating with ${LENSES[newLens].icon} ${LENSES[newLens].label}\u2026`);}}} style={{padding:"9px 20px",borderRadius:10,border:`1px solid ${T.border}`,background:"transparent",fontFamily:T.sans,fontSize:12,fontWeight:600,color:T.ink3,cursor:"pointer"}}>{"\u21BB"} Try different lens</button>
          </div>

          {/* ═══ ANNOTATIONS ═══ */}
          <div style={{borderTop:`1px solid ${T.border}`,paddingTop:20,marginBottom:20}}>
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:12}}>
              <div style={{fontFamily:T.sans,fontSize:12,fontWeight:700,color:T.ink}}>Annotations <span style={{fontFamily:T.sans,fontSize:10,fontWeight:500,color:T.ink4}}>({annotations.length})</span></div>
              <span style={{fontFamily:T.sans,fontSize:9,color:T.green,fontWeight:600}}>+3 Ink per annotation</span>
            </div>
            {annotations.map((a,i)=><div key={i} style={{padding:"10px 14px",borderRadius:10,background:`${T.gold}04`,border:`1px solid ${T.gold}08`,marginBottom:8,position:"relative"}}>
              <div style={{fontFamily:T.body,fontSize:12,color:T.ink2,fontWeight:300,lineHeight:1.6}}>{a.text}</div>
              <div style={{display:"flex",alignItems:"center",gap:6,marginTop:6}}>
                <span style={{fontFamily:T.sans,fontSize:9,color:T.ink4}}>{a.time}</span>
                <button onClick={()=>{setAnnotations(p=>p.filter((_,j)=>j!==i));setWpInk(p=>({...p,annotations:Math.max(0,p.annotations-3)}));pToast("Annotation removed");}} style={{fontFamily:T.sans,fontSize:9,color:T.red,background:"none",border:"none",cursor:"pointer"}}>Remove</button>
              </div>
            </div>)}
            {!annotating?<button onClick={()=>setAnnotating(true)} style={{width:"100%",padding:"10px",borderRadius:10,border:`1px dashed ${T.border}`,background:"transparent",fontFamily:T.sans,fontSize:11,color:T.ink4,cursor:"pointer",transition:"border-color .15s"}} onMouseEnter={e=>e.currentTarget.style.borderColor=T.borderHover} onMouseLeave={e=>e.currentTarget.style.borderColor=T.border}>+ Add an annotation</button>
            :<div style={{padding:"12px",borderRadius:10,background:T.card,border:`1px solid ${T.borderHover}`}}>
              <textarea value={newAnnotation} onChange={e=>setNewAnnotation(e.target.value)} placeholder="Add your thoughts, a personal reflection, or a note for other readers\u2026" style={{width:"100%",minHeight:80,padding:8,borderRadius:8,border:`1px solid ${T.border}`,background:T.bg3,fontFamily:T.body,fontSize:12,color:T.ink,fontWeight:300,lineHeight:1.6,resize:"vertical"}} autoFocus/>
              <div style={{display:"flex",gap:8,marginTop:8,justifyContent:"flex-end"}}>
                <button onClick={()=>{setAnnotating(false);setNewAnnotation("");}} style={{padding:"6px 14px",borderRadius:7,border:`1px solid ${T.border}`,background:"transparent",fontFamily:T.sans,fontSize:10,fontWeight:600,color:T.ink3,cursor:"pointer"}}>Cancel</button>
                <button onClick={()=>{if(!newAnnotation.trim())return;setAnnotations(p=>[...p,{text:newAnnotation.trim(),time:"Just now"}]);setNewAnnotation("");setAnnotating(false);setWpInk(p=>({...p,annotations:p.annotations+3}));pToast("+3 Ink \u2014 annotation added");}} disabled={!newAnnotation.trim()} style={{padding:"6px 14px",borderRadius:7,border:"none",background:newAnnotation.trim()?T.accent:T.ink4,fontFamily:T.sans,fontSize:10,fontWeight:700,color:"#fff",cursor:newAnnotation.trim()?"pointer":"default",opacity:newAnnotation.trim()?1:.5}}>Add annotation</button>
              </div>
            </div>}
          </div>

          {/* ═══ COMMENTS ═══ */}
          <div style={{borderTop:`1px solid ${T.border}`,paddingTop:20,marginBottom:24}}>
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:12}}>
              <div style={{fontFamily:T.sans,fontSize:12,fontWeight:700,color:T.ink}}>Discussion <span style={{fontFamily:T.sans,fontSize:10,fontWeight:500,color:T.ink4}}>({comments.length})</span></div>
              <span style={{fontFamily:T.sans,fontSize:9,color:T.green,fontWeight:600}}>+2 Ink per comment</span>
            </div>
            {comments.map(cm=>{const cLens=LENSES[cm.lens];return <div key={cm.id} style={{display:"flex",gap:10,padding:"12px 14px",borderRadius:12,background:T.card,border:`1px solid ${T.border}`,marginBottom:8}}>
              <div style={{width:28,height:28,borderRadius:"50%",background:`linear-gradient(135deg,${cLens?.color||T.ink4}30,${T.bg2})`,border:`1.5px solid ${cLens?.color||T.ink4}25`,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:T.sans,fontSize:9,fontWeight:700,color:cLens?.color||T.ink4,flexShrink:0}}>{cm.initials}</div>
              <div style={{flex:1,minWidth:0}}>
                <div style={{display:"flex",alignItems:"center",gap:5,marginBottom:3}}>
                  <span style={{fontFamily:T.sans,fontSize:11,fontWeight:700,color:T.ink}}>{cm.author}</span>
                  {cLens&&<span style={{fontSize:9}}>{cLens.icon}</span>}
                  <span style={{fontFamily:T.sans,fontSize:9,color:T.ink4}}>{cm.time}</span>
                </div>
                <div style={{fontFamily:T.body,fontSize:12,color:T.ink2,fontWeight:300,lineHeight:1.6}}>{cm.text}</div>
                <div style={{display:"flex",alignItems:"center",gap:10,marginTop:6}}>
                  <button onClick={()=>setComments(p=>p.map(x=>x.id===cm.id?{...x,liked:!x.liked,likes:x.liked?x.likes-1:x.likes+1}:x))} style={{fontFamily:T.sans,fontSize:9,color:cm.liked?T.gold:T.ink4,background:"none",border:"none",cursor:"pointer",fontWeight:600}}>{cm.liked?"\u25C6":"\u25C7"} {cm.likes}</button>
                  <button onClick={()=>pToast("Reply coming soon")} style={{fontFamily:T.sans,fontSize:9,color:T.ink4,background:"none",border:"none",cursor:"pointer"}}>Reply</button>
                  <button onClick={()=>pToast("Report submitted")} style={{fontFamily:T.sans,fontSize:9,color:T.ink4,background:"none",border:"none",cursor:"pointer"}}>Report</button>
                </div>
              </div>
            </div>;})}
            {/* New comment */}
            <div style={{display:"flex",gap:8,marginTop:8}}>
              <input value={newComment} onChange={e=>setNewComment(e.target.value)} placeholder="Share your reading experience at this point\u2026" onKeyDown={e=>{if(e.key==="Enter"&&newComment.trim()){setComments(p=>[...p,{id:`c${Date.now()}`,author:"You",initials:"YO",ink:500,lens:"analyst",text:newComment.trim(),time:"Just now",likes:0,liked:false}]);setNewComment("");setWpInk(p=>({...p,comments:p.comments+2}));pToast("+2 Ink \u2014 comment added");}}} style={{flex:1,padding:"10px 14px",borderRadius:10,border:`1px solid ${T.border}`,background:T.bg3,fontFamily:T.body,fontSize:12,color:T.ink,fontWeight:300}} aria-label="Add a comment"/>
              <button onClick={()=>{if(!newComment.trim())return;setComments(p=>[...p,{id:`c${Date.now()}`,author:"You",initials:"YO",ink:500,lens:"analyst",text:newComment.trim(),time:"Just now",likes:0,liked:false}]);setNewComment("");setWpInk(p=>({...p,comments:p.comments+2}));pToast("+2 Ink \u2014 comment added");}} disabled={!newComment.trim()} style={{padding:"10px 16px",borderRadius:10,border:"none",background:newComment.trim()?T.accent:T.ink4,fontFamily:T.sans,fontSize:11,fontWeight:700,color:"#fff",cursor:newComment.trim()?"pointer":"default",opacity:newComment.trim()?1:.5}}>Post</button>
            </div>
          </div>

          {/* New waypoint */}
          <div style={{textAlign:"center",padding:"20px 0",borderTop:`1px solid ${T.border}`,display:"flex",justifyContent:"center",gap:8}}>
            <button onClick={resetCompass} style={{padding:"10px 28px",borderRadius:10,border:`1px solid ${T.blue}25`,background:`${T.blue}06`,fontFamily:T.sans,fontSize:12,fontWeight:700,color:T.blue,cursor:"pointer"}}>{"\u27D0"} New waypoint</button>
            <button onClick={()=>pToast("Opening book detail\u2026")} style={{padding:"10px 28px",borderRadius:10,border:`1px solid ${T.border}`,background:"transparent",fontFamily:T.sans,fontSize:12,fontWeight:600,color:T.ink3,cursor:"pointer"}}>{"\uD83D\uDCD6"} Book Detail</button>
          </div>
        </>}

        {resultTab==="community"&&<>
          {commWaypoints.length>0?<div style={{display:"flex",flexDirection:"column",gap:10}}>
            {commWaypoints.map((s,i)=>{
              const sLens=LENSES[s.lens];
              const hasCross=s.crossBooks?.length>0;
              const revealed=crossRevealed[s.id];
              return <div key={s.id} style={{padding:"16px 20px",borderRadius:14,background:T.card,border:`1px solid ${hasCross&&!revealed?`${T.red}15`:T.border}`,animation:`fadeUp .3s ease ${i*.05}s both`}}>
                <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}>
                  <span style={{fontFamily:T.sans,fontSize:11,fontWeight:600,color:T.ink}}>{s.user}</span>
                  {sLens&&<span style={{padding:"2px 8px",borderRadius:6,fontSize:9.5,fontWeight:600,fontFamily:T.sans,color:sLens.color,background:`${sLens.color}10`,border:`1px solid ${sLens.color}20`}}>{sLens.icon} {sLens.label}</span>}
                  {hasCross&&<span style={{padding:"2px 8px",borderRadius:5,fontSize:9,fontWeight:600,fontFamily:T.sans,color:T.red,background:`${T.red}08`,border:`1px solid ${T.red}15`}}>{"\uD83D\uDD12"} {s.crossBooks.join(", ")}</span>}
                  <span style={{fontFamily:T.sans,fontSize:10,color:T.ink4,marginLeft:"auto"}}>Through p.{s.page}</span>
                </div>
                {hasCross&&!revealed?<div style={{position:"relative"}} role="region" aria-label={`Cross-book spoiler: references ${s.crossBooks.join(" and ")}`}>
                  <div style={{filter:"blur(6px)",userSelect:"none",pointerEvents:"none",opacity:.35}} aria-hidden="true">
                    <p style={{fontFamily:T.body,fontSize:13,lineHeight:1.7,color:T.ink2,fontWeight:300}}>{s.preview}</p>
                  </div>
                  <div style={{position:"absolute",inset:0,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:6}}>
                    <span style={{fontSize:16}}>{"\uD83D\uDD12"}</span>
                    <span style={{fontFamily:T.sans,fontSize:10.5,color:T.ink3}}>References <strong>{s.crossBooks.join(" & ")}</strong></span>
                    <button onClick={()=>setCR(p=>({...p,[s.id]:true}))} style={{padding:"5px 14px",borderRadius:7,border:`1px solid ${T.red}30`,background:`${T.red}10`,color:T.red,fontFamily:T.sans,fontSize:10,fontWeight:600,cursor:"pointer"}}>I{"\u2019"}ve read {s.crossBooks.join(" & ")}</button>
                  </div>
                </div>
                :<p style={{fontFamily:T.body,fontSize:13,lineHeight:1.7,color:T.ink2,fontWeight:300}}>{s.preview}</p>}
              </div>;
            })}
          </div>
          :<div style={{textAlign:"center",padding:"40px 20px",background:T.card,borderRadius:14,border:`1px solid ${T.border}`}}>
            <div style={{fontSize:32,marginBottom:10,opacity:.3}}>{"\u27D0"}</div>
            <div style={{fontFamily:T.serif,fontSize:16,fontWeight:700,color:T.ink,marginBottom:4,fontStyle:"italic"}}>No community waypoints yet</div>
            <div style={{fontFamily:T.body,fontSize:12,color:T.ink3,fontWeight:300}}>Be the first to share yours.</div>
          </div>}
        </>}
      </>}

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
