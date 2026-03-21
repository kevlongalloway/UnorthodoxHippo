import { useState, useEffect, useRef, useMemo, useCallback } from "react";

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
  useEffect(()=>{if(!open)return;const h=e=>{if(ref.current&&!ref.current.contains(e.target))setOpen(false);};document.addEventListener("mousedown",h);return()=>document.removeEventListener("mousedown",h);},[open]);
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

const TIERS=[{name:"Fresh Ink",min:0,color:T.ink3,bg:"rgba(122,112,103,0.1)"},{name:"Wet Ink",min:25,color:"#8BAAB8",bg:"rgba(139,170,184,0.1)"},{name:"Set Ink",min:100,color:"#A0C090",bg:"rgba(160,192,144,0.1)"},{name:"Deep Ink",min:500,color:T.gold,bg:"rgba(196,162,101,0.1)"},{name:"Indelible",min:2000,color:T.accent,bg:"rgba(184,86,42,0.12)"}];
function getTier(v){for(let i=TIERS.length-1;i>=0;i--)if(v>=TIERS[i].min)return TIERS[i];return TIERS[0];}
function getNext(v){for(let i=0;i<TIERS.length;i++)if(v<TIERS[i].min)return TIERS[i];return null;}
function fmt(n){return n>=1000?(n/1000).toFixed(1)+"k":String(n);}

const CTYPES={original:{label:"Original Work",icon:"✍",color:T.accent},review:{label:"Review",icon:"📝",color:T.gold},recommendation:{label:"Recommendation",icon:"📚",color:T.green},spoiler:{label:"Spoiler Zone",icon:"🔓",color:T.red}};
const LENSES={analyst:{icon:"\uD83D\uDD2C",label:"Analyst",color:"#5B9BD5",desc:"Structure, craft, architecture"},empath:{icon:"\uD83D\uDC96",label:"Empath",color:"#D4788C",desc:"Feeling, resonance, nerve"},philosopher:{icon:"\uD83D\uDCA1",label:"Philosopher",color:T.gold,desc:"Ideas, questions, meaning"},storyteller:{icon:"\uD83C\uDFAD",label:"Storyteller",color:"#9B7ED4",desc:"Narrative, scene, voice"},explorer:{icon:"\uD83D\uDDFA\uFE0F",label:"Explorer",color:"#5BAD7A",desc:"Discovery, territory, wonder"},alchemist:{icon:"\u2727",label:"Alchemist",color:"#C4A06A",desc:"Synthesis, connection, transformation"}};
const MAP_P={geographic:{id:"geographic",icon:"🌍",label:"Geographic",desc:"Where your stories come from",color:T.teal},constellation:{id:"constellation",icon:"✦",label:"Genre Constellation",desc:"Stars clustered by genre",color:T.plum},timeline:{id:"timeline",icon:"⏳",label:"Timeline",desc:"When your books were born",color:T.gold},emotional:{id:"emotional",icon:"🌊",label:"Emotional Terrain",desc:"The mood landscape of your reading",color:T.rose},language:{id:"language",icon:"🌿",label:"Language Tree",desc:"Linguistic roots of your library",color:T.green},influence:{id:"influence",icon:"🕸",label:"Influence Web",desc:"How your books speak to each other",color:T.amber}};

// ═══════════════════════════════════════════════════
// MOCK DATA
// ═══════════════════════════════════════════════════
const BOOKS=[
  {id:"b1",title:"Beloved",author:"Toni Morrison",year:1987,origin:"USA",lat:39.1,lng:-84.5,genre:"Literary Fiction",mood:"grief",intensity:.95,language:"English",themes:["memory","haunting","motherhood","slavery"],color:"#8B4513"},
  {id:"b2",title:"The God of Small Things",author:"Arundhati Roy",year:1997,origin:"India",lat:9.9,lng:76.3,genre:"Literary Fiction",mood:"longing",intensity:.88,language:"English (Kerala)",themes:["caste","forbidden love","childhood","loss"],color:"#2A7C7C"},
  {id:"b3",title:"Intermezzo",author:"Sally Rooney",year:2024,origin:"Ireland",lat:53.3,lng:-6.3,genre:"Contemporary",mood:"melancholy",intensity:.6,language:"English",themes:["grief","brothers","love","class"],color:"#5B9BD5"},
  {id:"b4",title:"One Hundred Years of Solitude",author:"G. García Márquez",year:1967,origin:"Colombia",lat:10.4,lng:-75.5,genre:"Magical Realism",mood:"wonder",intensity:.92,language:"Spanish",themes:["time","family","solitude","fate"],color:"#D4A030"},
  {id:"b5",title:"Kokoro",author:"Natsume Sōseki",year:1914,origin:"Japan",lat:35.7,lng:139.7,genre:"Literary Fiction",mood:"isolation",intensity:.78,language:"Japanese",themes:["loneliness","guilt","modernity","friendship"],color:"#9B7ED4"},
  {id:"b6",title:"The Stranger",author:"Albert Camus",year:1942,origin:"Algeria",lat:36.8,lng:3.1,genre:"Existential",mood:"detachment",intensity:.7,language:"French",themes:["absurdism","alienation","death","truth"],color:"#7A7067"},
  {id:"b7",title:"Song of Solomon",author:"Toni Morrison",year:1977,origin:"USA",lat:41.5,lng:-81.7,genre:"Literary Fiction",mood:"searching",intensity:.85,language:"English",themes:["identity","flight","heritage","naming"],color:"#6B3A6B"},
  {id:"b8",title:"Sula",author:"Toni Morrison",year:1973,origin:"USA",lat:41.1,lng:-81.5,genre:"Literary Fiction",mood:"defiance",intensity:.8,language:"English",themes:["friendship","independence","community","evil"],color:"#9E4A5A"},
  {id:"b9",title:"Persepolis",author:"Marjane Satrapi",year:2000,origin:"Iran",lat:35.7,lng:51.4,genre:"Graphic Memoir",mood:"resilience",intensity:.75,language:"French (Persian)",themes:["revolution","identity","exile","girlhood"],color:"#C45B4A"},
  {id:"b10",title:"Things Fall Apart",author:"Chinua Achebe",year:1958,origin:"Nigeria",lat:6.2,lng:7.1,genre:"Literary Fiction",mood:"tragedy",intensity:.82,language:"English (Igbo)",themes:["colonialism","tradition","change","masculinity"],color:"#4A7A4A"},
  {id:"b11",title:"Convenience Store Woman",author:"Sayaka Murata",year:2016,origin:"Japan",lat:35.7,lng:139.8,genre:"Contemporary",mood:"unease",intensity:.55,language:"Japanese",themes:["conformity","identity","work","otherness"],color:"#8BAAB8"},
];

const PROFILE={name:"Priya Anand",handle:"@priyareads",initials:"PA",ink:12300,lens:"empath",
  bio:"I read with my whole nervous system. Tamil-American writer exploring grief, inheritance, and the grammar of memory.",
  location:"Brooklyn, NY",joined:"Jan 2026",era:1,isFoundingReader:true,
  streak:{current:47,best:47,quality:31},badges:["founding_reader","devoted_contributor"],
  currentlyReading:{title:"Beloved",author:"Toni Morrison",progress:68},
  stats:{posts:34,followers:892,following:214,books:11},
  inkBreakdown:{creation:5800,engagement:4100,participation:2400},
  inkHistory:[{p:"Jan 1-7",c:280,e:180,pa:110},{p:"Jan 8-14",c:350,e:220,pa:140},{p:"Jan 15-21",c:290,e:200,pa:120},{p:"Jan 22-31",c:280,e:200,pa:130},{p:"Feb 1-7",c:920,e:680,pa:380},{p:"Feb 8-14",c:1100,e:820,pa:460},{p:"Feb 15-20",c:1580,e:1200,pa:660}],
  boundWith:[
    {initials:"KA",name:"Kofi Asante",handle:"@kofi_writes",yourPiece:"The Tongue My Grandmother Left Me",theirPiece:"The Cartographer's Confession",theirShelf:"Stories That Wrecked Me"},
    {initials:"IS",name:"Elena Vasquez",handle:"@elenavasquez",yourPiece:"Inheritance Tax",theirPiece:"Cartography of Scars",theirShelf:"Writing That Cuts"},
    {initials:"JH",name:"James Huang",handle:"@jamesreads",yourPiece:"Inheritance Tax",theirPiece:"What the River Remembers",theirShelf:"Inherited Things"},
  ],
  defaultMap:"emotional",mapSeeded:true,
};

const MINI=[{initials:"IS",color:"#8BAAB8"},{initials:"KA",color:"#A0C090"},{initials:"JH",color:T.gold},{initials:"TR",color:T.ink3}];

const POSTS=[
  {id:"pp1",type:"original",pinned:true,timeAgo:"2d",title:"Inheritance Tax",editedAt:null,version:1,lens:"empath",text:"My grandmother left me her tongue.\n\nNot the language — I already had that, the Tamil she'd fed me like rice water when I was small, spooning words into my mouth before I had teeth to chew them. No. She left me the physical fact of her voice. The way it dropped to a whisper when she was furious. The way it climbed when she was lying. The way it broke, clean as a green stick fracture, whenever she said my grandfather's name.\n\nI discovered this at her funeral, when I opened my mouth to read the eulogy and my mother grabbed my arm.\n\n'You sound exactly like her,' she said.\n\nShe did not mean it as a comfort.\n\nThere are things we inherit that no one warns us about. Not the house, not the jewelry, not the recipes written in fading ink on index cards. The real inheritance is gestural. The way you hold a pen. The angle of your head when you're thinking. The precise pitch of your grief.",likes:489,comments:124,shelved:183,reposts:72,crossBookSpoiler:false,crossBooks:[]},
  {id:"pp2",type:"original",pinned:false,timeAgo:"5d",title:"The Tongue My Grandmother Left Me",editedAt:"4d",version:3,lens:"empath",prevSnippet:"In Tamil, the word for 'yesterday' and the word for 'tomorrow' are the same word…",text:"In Tamil, the word for 'yesterday' and the word for 'tomorrow' are the same. Nēṟṟu. Nāḷai. No — I'm wrong. They are different words that my mouth makes sound the same, because my Tamil is a hand-me-down thing, worn soft at the seams, vowels rounded by an American jaw that learned to chew English first and everything else second.\n\nMy grandmother would correct me. She would hold the word in her mouth like a stone and make me listen to its weight before she let it fall.",likes:341,comments:89,shelved:156,reposts:48,shelvedAtVersion:1,crossBookSpoiler:false,crossBooks:[]},
  {id:"rp1",type:"repost",repostedFrom:{name:"Kofi Asante",handle:"@kofi_writes",initials:"KA",ink:8750},timeAgo:"6d",originalType:"original",editedAt:null,version:1,lens:"storyteller",title:"The Cartographer's Confession",text:"The first map I ever drew was a lie.\n\nI was nine, and my father had asked me to sketch the walk from our house to the schoolyard. I drew it faithfully — the cracked sidewalk past Miss Lorraine's porch, the shortcut through the empty lot where glass glittered in the dirt like fallen stars, the crossing at Meridian where the light took forever.\n\nBut when I reached the schoolyard itself, I kept drawing.",likes:312,comments:87,shelved:94,reposts:41,crossBookSpoiler:false,crossBooks:[]},
  {id:"pp3",type:"review",pinned:false,timeAgo:"1w",editedAt:"6d",version:2,lens:"empath",prevSnippet:"Morrison writes like she's building a house around you…",bookRef:{title:"Beloved",author:"Toni Morrison"},text:"Morrison doesn't write sentences. She builds rooms you have to live in. Beloved is a house — 124 Bluestone Road — and it breathes, rejects, remembers. By page 200 I understood that the ghost isn't a metaphor. She's the cost of survival made flesh.",likes:178,comments:96,shelved:67,reposts:22,crossBookSpoiler:false,crossBooks:[]},
  {id:"pp4",type:"review",pinned:false,timeAgo:"10d",editedAt:null,version:1,lens:"analyst",bookRef:{title:"Intermezzo",author:"Sally Rooney"},text:"Rooney\u2019s project has always been about the gap between what characters think and what they say. In Normal People, that gap was sexual and class-based. In Beautiful World, it was epistolary. In Intermezzo, it\u2019s fraternal: Peter and Ivan process the same grief through completely different architectures. Peter\u2019s eventual breakdown mirrors Connell\u2019s in Normal People, but where Connell collapses inward, Peter\u2019s collapse is performative.",likes:112,comments:38,shelved:52,reposts:16,crossBookSpoiler:true,crossBooks:["Normal People","Beautiful World, Where Are You"]},
  {id:"pp5",type:"recommendation",pinned:false,timeAgo:"2w",editedAt:null,version:1,lens:"storyteller",bookRef:{title:"The God of Small Things",author:"Arundhati Roy"},text:"If you've ever felt a language living inside your body rather than your mind — read this. Roy writes English the way my grandmother spoke Tamil: as if the words were made of something heavier and sweeter than sound.",likes:267,comments:58,shelved:201,reposts:44,crossBookSpoiler:false,crossBooks:[]},
];

const SHELVES=[
  {id:"s1",name:"Stories That Wrecked Me",desc:"Fiction that left a mark I couldn't wash off.",count:7,followers:234,items:["Inheritance Tax","Cartographer's Confession","Sixteen Acres","The Butcher's Daughter","Grief Manual","Mother Tongues","Unsent Letters"],followedBy:[MINI[0],MINI[1],MINI[2]]},
  {id:"s2",name:"The Grief Library",desc:"Everything I've read about loss, and what stayed.",count:5,followers:178,items:["Beloved","Year of Magical Thinking","Blue Nights","Ocean at End of Lane","Smoke Gets in Eyes"],followedBy:[MINI[0],MINI[3]]},
  {id:"s3",name:"Writers to Watch",desc:"First-time authors on Précis who stopped me mid-scroll.",count:4,followers:312,items:["Nneka's Debut","Tomás Rivera","James Huang","Lila Okonkwo"],followedBy:[MINI[1],MINI[2],MINI[3]]},
  {id:"s4",name:"Before You Read Beloved",desc:"Context, companion reads, and the essays that make Morrison hit harder.",count:3,followers:89,items:["Song of Solomon","Sula","The Origin of Others"],followedBy:[MINI[0]]},
];

const WAYPOINTS=[
  {id:"syn1",book:"Beloved",author:"Toni Morrison",page:184,lens:"empath",preview:"The house at 124 Bluestone Road has become a character in its own right — breathing, remembering, punishing. Sethe's relationship with Denver exists in the shadow of the ghost, and Beloved's arrival has made the haunting physical rather than spectral…"},
  {id:"syn2",book:"Intermezzo",author:"Sally Rooney",page:220,lens:"empath",preview:"Peter and Ivan's grief has reorganized every relationship in the novel. By page 220 Rooney has let Peter's self-awareness curdle into something that looks like honesty but functions as evasion…"},
  {id:"syn3",book:"The God of Small Things",author:"Arundhati Roy",page:340,lens:"storyteller",preview:"Roy's language has been building toward Ammu's death the way monsoon clouds build — slowly, inevitably, with a beauty that makes the devastation feel earned rather than imposed…"},
];

// ═══════════════════════════════════════════════════
// CSS
// ═══════════════════════════════════════════════════
const CSS=`
.fc{transition:all .22s cubic-bezier(.4,0,.2,1)}.fc:hover{transform:translateY(-2px);box-shadow:0 8px 28px rgba(0,0,0,.25),0 0 0 1px rgba(212,168,85,.06)!important}
.fc2{transition:all .18s}.fc2:hover{filter:brightness(1.08)}
.btn-g{transition:all .15s}.btn-g:hover{color:#D4A855!important}

@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,800;1,400;1,700&family=Source+Serif+4:ital,opsz,wght@0,8..60,300;0,8..60,400;0,8..60,600;1,8..60,300;1,8..60,400&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&display=swap');
*{margin:0;padding:0;box-sizing:border-box;}body{background:${T.bg};}
::selection{background:${T.gold}30;color:${T.ink};}
::-webkit-scrollbar{width:5px;}::-webkit-scrollbar-track{background:transparent;}::-webkit-scrollbar-thumb{background:${T.ink4};border-radius:3px;}
@keyframes fadeUp{from{opacity:0;transform:translateY(10px);}to{opacity:1;transform:none;}}
@keyframes pulseGlow{0%,100%{opacity:.4;}50%{opacity:1;}}
@keyframes drift{0%,100%{transform:translate(0,0);}50%{transform:translate(3px,-2px);}}
@keyframes mapFade{from{opacity:0;}to{opacity:1;}}
@keyframes popIn{0%{transform:scale(1)}50%{transform:scale(1.2)}100%{transform:scale(1)}}
@keyframes tierGlow{0%{box-shadow:0 0 0 0 rgba(196,162,101,0.4)}50%{box-shadow:0 0 40px 10px rgba(196,162,101,0.2)}100%{box-shadow:0 0 0 0 rgba(196,162,101,0)}}
@keyframes tierSlide{from{opacity:0;transform:translateY(20px) scale(0.95)}to{opacity:1;transform:translateY(0) scale(1)}}
.tab-enter{animation:fadeUp .2s ease both;}
.eng-pop{animation:popIn .25s ease;}
*:focus-visible{outline:2px solid ${T.gold};outline-offset:2px;border-radius:6px;}
button:focus-visible,a:focus-visible{outline:2px solid ${T.gold};outline-offset:2px;}
.skip-link{position:absolute;left:-9999px;top:auto;width:1px;height:1px;overflow:hidden;z-index:200;}
.skip-link:focus{position:fixed;top:4px;left:4px;width:auto;height:auto;padding:8px 16px;background:${T.accent};color:#fff;border-radius:8px;font-family:${T.sans};font-size:12px;font-weight:700;z-index:300;}
@media(prefers-reduced-motion:reduce){*{animation-duration:0.01ms!important;animation-iteration-count:1!important;transition-duration:0.01ms!important;}}
input[type="range"]{-webkit-appearance:none;height:4px;background:${T.ink4}30;border-radius:2px;outline:none;}
input[type="range"]::-webkit-slider-thumb{-webkit-appearance:none;width:14px;height:14px;border-radius:50%;background:${T.gold};cursor:pointer;}
.modal-ov{position:fixed;inset:0;background:rgba(0,0,0,.7);z-index:200;display:flex;align-items:center;justify-content:center;animation:fadeUp .15s ease;}
.modal-c{background:${T.bg2};border:1px solid ${T.borderHover};border-radius:16px;max-width:500px;width:92%;max-height:85vh;overflow-y:auto;padding:28px;}
@media(max-width:768px){.mob-nav{display:flex!important;}
  .hdr-row{flex-direction:column!important;align-items:center!important;text-align:center!important;gap:16px!important;}
  .hdr-meta{justify-content:center!important;}.hdr-badges{justify-content:center!important;}
  .hdr-stats{justify-content:center!important;gap:16px!important;}
  .hdr-btn{align-self:stretch!important;width:100%!important;margin-top:0!important;}
  .about-g{grid-template-columns:1fr!important;}.full-col{grid-column:1!important;}
  .cmx,.tab-c,.nav-i,.stk-i{padding-left:16px!important;padding-right:16px!important;}
  .shelf-r{flex-direction:column!important;align-items:flex-start!important;gap:12px!important;}
  .sp-c{align-self:center;}.nav-bc{display:none!important;}
  .fp{overflow-x:auto;-webkit-overflow-scrolling:touch;scrollbar-width:none;flex-wrap:nowrap;}.fp::-webkit-scrollbar{display:none;}
  .st{-webkit-tap-highlight-color:transparent;}
  .map-opts{grid-template-columns:1fr 1fr!important;}
}
@media(max-width:400px){.tl{display:none!important;}.map-opts{grid-template-columns:1fr!important;}.tb{padding:14px 14px!important;}.tb[data-a="true"] .tl{display:inline!important;}.hdr-stats{flex-wrap:wrap!important;}}

.shelf-card{transition:border-color .2s,transform .2s;}
.shelf-card:hover{border-color:${T.borderHover};transform:translateY(-2px);box-shadow:0 4px 16px rgba(0,0,0,.06);}
.post-card{transition:border-color .2s,box-shadow .2s;}
.post-card:hover{border-color:${T.borderHover};box-shadow:0 2px 12px rgba(0,0,0,.04);}
`;

// ═══════════════════════════════════════════════════
// MICRO COMPONENTS
// ═══════════════════════════════════════════════════
const Av=({i,ink=0,s=38})=>{const t=getTier(ink);return <div style={{width:s,height:s,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,fontFamily:T.sans,fontSize:s*.34,fontWeight:700,color:T.ink2,background:`linear-gradient(145deg,${T.bg3},#0E0C09)`,border:`2.5px solid ${t.color}70`,letterSpacing:".5px",boxShadow:`0 0 14px ${t.color}12`}}>{i}</div>;};
const MAv=({i,c,s=20})=><div style={{width:s,height:s,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:T.sans,fontSize:7,fontWeight:700,color:T.ink3,background:T.bg3,border:`1.5px solid ${c}50`}}>{i}</div>;
const IB=({ink,show=false,lg=false})=>{const t=getTier(ink);return <span style={{display:"inline-flex",alignItems:"center",gap:4,padding:lg?"4px 12px":"2px 8px",borderRadius:6,fontSize:lg?12:10,fontWeight:700,fontFamily:T.sans,letterSpacing:".4px",color:t.color,background:t.bg,border:`1px solid ${t.color}20`}}><span style={{fontSize:lg?8:7,opacity:.8}}>●</span>{show?`${fmt(ink)} · ${t.name}`:t.name}</span>;};
const Bdg=({type})=>{const b={founding_reader:{l:"🏛 Founding Reader",bg:`${T.accent}10`,c:T.accent,bd:`${T.accent}25`},devoted_contributor:{l:"✦ Devoted Contributor",bg:`${T.plum}10`,c:T.plum,bd:`${T.plum}20`}}[type];return b?<span style={{display:"inline-flex",alignItems:"center",gap:3,padding:"3px 9px",borderRadius:6,fontSize:10,fontWeight:600,fontFamily:T.sans,color:b.c,background:b.bg,border:`1px solid ${b.bd}`}}>{b.l}</span>:null;};
const CTP=({type})=>{const c=CTYPES[type];return c?<span style={{display:"inline-flex",alignItems:"center",gap:4,padding:"3px 10px",borderRadius:20,fontSize:10.5,fontWeight:600,fontFamily:T.sans,color:c.color,background:`${c.color}12`,border:`1px solid ${c.color}20`}}>{c.icon} {c.label}</span>:null;};
const Spine=({letter,h,color,title})=>{const[a,sA]=useState(false);return <div className="st" onMouseEnter={()=>sA(true)} onMouseLeave={()=>sA(false)} onTouchStart={()=>sA(true)} onTouchEnd={()=>setTimeout(()=>sA(false),1500)} style={{position:"relative",cursor:"pointer"}}><div style={{width:17,height:h,borderRadius:"2px 4px 4px 2px",background:`linear-gradient(to bottom,${color},${color}88)`,boxShadow:`2px 0 6px rgba(0,0,0,.35),inset 1px 0 2px rgba(255,255,255,.07)`,transform:a?"translateY(-6px)":"none",transition:"transform .2s",display:"flex",alignItems:"center",justifyContent:"center",position:"relative"}}><div style={{position:"absolute",inset:0,borderRadius:"inherit",background:"repeating-linear-gradient(180deg,transparent 0px,rgba(0,0,0,.04) 1px,transparent 2px)"}}/><span style={{fontFamily:T.serif,fontSize:8,fontWeight:700,color:"rgba(255,255,255,.4)",transform:"rotate(-90deg)",letterSpacing:".5px",position:"relative"}}>{letter}</span></div>{a&&title&&<div style={{position:"absolute",bottom:"calc(100% + 8px)",left:"50%",transform:"translateX(-50%)",whiteSpace:"nowrap",padding:"4px 10px",borderRadius:6,fontSize:10,fontWeight:600,fontFamily:T.sans,color:T.ink,background:T.bg3,border:`1px solid ${T.borderHover}`,zIndex:10,boxShadow:"0 4px 12px rgba(0,0,0,.4)"}}>{title}</div>}</div>;};
const Empty=({icon,head,sub,btn,onClick})=><div className="fc" style={{padding:"60px 20px",textAlign:"center",background:T.card,borderRadius:14,border:`1px solid ${T.border}`}}><div style={{fontSize:40,marginBottom:14,opacity:.4}}>{icon}</div><div style={{fontFamily:T.serif,fontSize:18,fontWeight:700,color:T.ink,marginBottom:6,fontStyle:"italic"}}>{head}</div><div style={{fontFamily:T.body,fontSize:13,color:T.ink3,lineHeight:1.6,maxWidth:340,margin:"0 auto 16px"}}>{sub}</div>{btn&&<button onClick={onClick||undefined} style={{padding:"9px 24px",borderRadius:10,border:"none",background:`linear-gradient(135deg,${T.accent},#9E4520)`,fontFamily:T.sans,fontSize:12,fontWeight:700,color:"#fff",cursor:"pointer",boxShadow:`0 2px 12px ${T.accent}30`}}>{btn}</button>}</div>;
function pToast(msg){const el=document.getElementById("p-toast");if(el){el.textContent=msg;el.style.display="block";setTimeout(()=>el.style.display="none",2200);}}

function TierCelebration({tier,onDismiss}){
  if(!tier)return null;
  useEffect(()=>{const k=e=>{if(e.key==="Escape")onDismiss();};document.addEventListener("keydown",k);return()=>document.removeEventListener("keydown",k);});
  return <div style={{position:"fixed",inset:0,zIndex:300,display:"flex",alignItems:"center",justifyContent:"center",background:"rgba(0,0,0,0.7)",animation:"fadeUp .15s ease"}} onClick={onDismiss}>
    <div onClick={e=>e.stopPropagation()} style={{background:T.bg2,border:`2px solid ${tier.color}40`,borderRadius:20,padding:"40px 48px",textAlign:"center",maxWidth:380,animation:"tierSlide .5s cubic-bezier(0.34,1.56,0.64,1) both",boxShadow:`0 0 60px ${tier.color}15`}}>
      <div style={{width:72,height:72,borderRadius:"50%",margin:"0 auto 20px",background:`${tier.color}10`,border:`3px solid ${tier.color}40`,display:"flex",alignItems:"center",justifyContent:"center",animation:"tierGlow 2s ease infinite"}}>
        <span style={{fontSize:28,fontWeight:800,fontFamily:T.sans,color:tier.color}}>{"\u25CF"}</span>
      </div>
      <div style={{fontFamily:T.sans,fontSize:10,fontWeight:700,color:tier.color,letterSpacing:"2px",textTransform:"uppercase",marginBottom:8}}>Tier Unlocked</div>
      <div style={{fontFamily:T.serif,fontSize:28,fontWeight:700,color:T.ink,marginBottom:8,letterSpacing:"-0.5px"}}>{tier.name}</div>
      <p style={{fontFamily:T.body,fontSize:13,color:T.ink3,lineHeight:1.6,marginBottom:24,fontStyle:"italic"}}>Your contributions have weight. This tier is proof you showed up.</p>
      <button onClick={onDismiss} style={{padding:"10px 32px",borderRadius:10,border:"none",background:`linear-gradient(135deg,${tier.color},${tier.color}88)`,fontFamily:T.sans,fontSize:12,fontWeight:700,color:"#fff",cursor:"pointer"}}>Continue</button>
    </div>
  </div>;
}

// ═══════════════════════════════════════════════════
// EDIT PROFILE MODAL + Mark as Finished
// ═══════════════════════════════════════════════════
function EditModal({profile,onClose,onSave,pToast}){
  const[bio,sBio]=useState(profile.bio);const[lens,sLens]=useState(profile.lens);
  const[bkT,sBkT]=useState(profile.currentlyReading?.title||"");const[bkA,sBkA]=useState(profile.currentlyReading?.author||"");
  const[dMap,sDMap]=useState(profile.defaultMap);const[finished,sFinished]=useState(false);
  const[showFinishPrompt,sSFP]=useState(false);const[saving,setSaving]=useState(false);
  const fs={width:"100%",padding:"10px 14px",borderRadius:10,border:`1px solid ${T.border}`,background:T.bg3,color:T.ink,fontFamily:T.body,fontSize:13,outline:"none"};
  const ls={fontFamily:T.sans,fontSize:11,fontWeight:700,color:T.ink3,letterSpacing:".5px",textTransform:"uppercase",marginBottom:6,display:"block"};
  function doSave(){setSaving(true);setTimeout(()=>{if(onSave)onSave({bio,lens,defaultMap:dMap,currentlyReading:finished?null:{title:bkT,author:bkA}});pToast("\u2713 Profile updated");onClose();},400);}

  
  useEffect(()=>{const k=e=>{if(e.key==="Escape")onClose();};document.addEventListener("keydown",k);return()=>document.removeEventListener("keydown",k);});
return <div className="modal-ov" onClick={onClose}><div className="modal-c" onClick={e=>e.stopPropagation()}>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:24}}><h2 style={{fontFamily:T.serif,fontSize:22,fontWeight:700,color:T.ink}}>Edit Profile</h2><button aria-label="Close" onClick={onClose} style={{background:"none",border:"none",color:T.ink3,fontSize:20,cursor:"pointer"}}>×</button></div>
    <div style={{textAlign:"center",marginBottom:20}}><Av i={profile.initials} ink={profile.ink} s={72}/><button onClick={()=>pToast("Avatar upload coming soon")} style={{display:"block",margin:"8px auto 0",fontFamily:T.sans,fontSize:11,color:T.gold,background:"none",border:"none",cursor:"pointer",fontWeight:600}}>Change avatar</button></div>
    <div style={{marginBottom:16}}><label style={ls}>Bio</label><textarea maxLength={280} value={bio} onChange={e=>sBio(e.target.value)} rows={3} style={{...fs,fontFamily:T.body,resize:"vertical"}} aria-label="Text area"/><div style={{fontFamily:T.sans,fontSize:10,color:T.ink4,marginTop:4,textAlign:"right"}}>{bio.length}/280</div></div>
    <div style={{marginBottom:16}}><label style={ls}>Default Lens</label><div style={{display:"flex",gap:6,flexWrap:"wrap"}}>{Object.entries(LENSES).map(([k,v])=><button key={k} onClick={()=>sLens(k)} style={{padding:"6px 12px",borderRadius:8,fontSize:11,fontWeight:600,fontFamily:T.sans,cursor:"pointer",background:lens===k?`${v.color}15`:"transparent",color:lens===k?v.color:T.ink3,border:`1px solid ${lens===k?`${v.color}30`:T.border}`}}>{v.icon} {v.label}</button>)}</div></div>
    {/* Currently Reading + Mark as Finished */}
    <div style={{marginBottom:16}}><label style={ls}>Currently Reading</label>
      {!finished && profile.currentlyReading && !showFinishPrompt && (
        <div style={{display:"flex",gap:8,marginBottom:8}}>
          <div style={{flex:1,padding:"10px 14px",borderRadius:10,background:T.bg3,border:`1px solid ${T.border}`,display:"flex",alignItems:"center",gap:8}}>
            <div style={{width:20,height:30,borderRadius:"1px 3px 3px 1px",background:`linear-gradient(135deg,${T.accent}CC,#6B2A10)`,flexShrink:0}}/>
            <div><div style={{fontFamily:T.serif,fontSize:12,fontWeight:600,color:T.ink}}>{bkT}</div><div style={{fontFamily:T.body,fontSize:11,color:T.ink3,fontStyle:"italic"}}>{bkA}</div></div>
          </div>
          <button onClick={()=>sSFP(true)} style={{padding:"8px 14px",borderRadius:10,fontFamily:T.sans,fontSize:11,fontWeight:700,cursor:"pointer",background:`${T.green}10`,color:T.green,border:`1px solid ${T.green}25`,whiteSpace:"nowrap"}}>✓ Finished</button>
        </div>
      )}
      {showFinishPrompt && !finished && (
        <div style={{padding:"14px",borderRadius:10,background:`${T.green}06`,border:`1px solid ${T.green}15`,marginBottom:8}}>
          <div style={{fontFamily:T.sans,fontSize:12,fontWeight:700,color:T.ink,marginBottom:8}}>Mark "{bkT}" as finished?</div>
          <div style={{fontFamily:T.sans,fontSize:11,color:T.ink3,marginBottom:12,lineHeight:1.5}}>This will add it to your reading stats and clear your Currently Reading slot. You can write a review or set a waypoint after.</div>
          <div style={{display:"flex",gap:8}}>
            <button onClick={()=>{sFinished(true);sSFP(false);}} style={{padding:"7px 16px",borderRadius:8,fontFamily:T.sans,fontSize:11,fontWeight:700,cursor:"pointer",background:`linear-gradient(135deg,${T.green},#4A8A4A)`,color:"#fff",border:"none"}}>Mark as Finished</button>
            <button onClick={()=>{sFinished(true);sSFP(false);}} style={{padding:"7px 14px",borderRadius:8,fontFamily:T.sans,fontSize:11,fontWeight:600,cursor:"pointer",background:`${T.accent}08`,color:T.accent,border:`1px solid ${T.accent}20`}}>Finish + Write Review</button>
            <button onClick={()=>{sFinished(true);sSFP(false);}} style={{padding:"7px 14px",borderRadius:8,fontFamily:T.sans,fontSize:11,fontWeight:600,cursor:"pointer",background:`${T.blue}08`,color:T.blue,border:`1px solid ${T.blue}20`}}>Finish + Set Waypoint</button>
            <button onClick={()=>sSFP(false)} style={{padding:"7px 12px",borderRadius:8,fontFamily:T.sans,fontSize:11,fontWeight:500,cursor:"pointer",background:"transparent",color:T.ink3,border:`1px solid ${T.border}`}}>Cancel</button>
          </div>
        </div>
      )}
      {finished && (
        <div style={{padding:"12px",borderRadius:10,background:`${T.green}06`,border:`1px solid ${T.green}15`,marginBottom:8}}>
          <div style={{fontFamily:T.sans,fontSize:12,fontWeight:700,color:T.green,marginBottom:4}}>✓ "{bkT}" marked as finished</div>
          <div style={{fontFamily:T.sans,fontSize:11,color:T.ink3}}>Added to reading stats · Book #{profile.stats.books + 1}</div>
        </div>
      )}
      {(finished || !profile.currentlyReading) && (
        <div style={{display:"flex",gap:8}}><input maxLength={100} value={finished?"":bkT} onChange={e=>sBkT(e.target.value)} placeholder="New book title" style={{...fs,flex:2}} aria-label="New book title"/><input maxLength={100} value={finished?"":bkA} onChange={e=>sBkA(e.target.value)} placeholder="Author" style={{...fs,flex:1}} aria-label="Author"/></div>
      )}
    </div>
    <div style={{marginBottom:20}}><label style={ls}>Default Reader Map View</label><div className="map-opts" style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:6}}>{Object.entries(MAP_P).map(([k,v])=><button key={k} onClick={()=>sDMap(k)} style={{padding:"8px 6px",borderRadius:8,fontSize:10,fontWeight:600,fontFamily:T.sans,cursor:"pointer",textAlign:"center",background:dMap===k?`${v.color}12`:T.bg3,color:dMap===k?v.color:T.ink3,border:`1px solid ${dMap===k?`${v.color}25`:T.border}`}}>{v.icon}<br/>{v.label}</button>)}</div></div>
    <div style={{display:"flex",gap:10,justifyContent:"flex-end"}}><button onClick={onClose} style={{padding:"9px 20px",borderRadius:10,fontFamily:T.sans,fontSize:12,fontWeight:700,cursor:"pointer",background:"transparent",color:T.ink3,border:`1px solid ${T.border}`}}>Cancel</button><button onClick={doSave} disabled={saving} style={{padding:"9px 24px",borderRadius:10,fontFamily:T.sans,fontSize:12,fontWeight:700,cursor:saving?"default":"pointer",background:saving?`${T.green}20`:`linear-gradient(135deg,${T.accent},#9E4520)`,color:saving?T.green:"#fff",border:"none",transition:"all .2s"}}>{saving?"\u2713 Saving…":"Save Changes"}</button></div>
  </div></div>;
}

// ═══════════════════════════════════════════════════
// HEADER + STICKY BAR
// ═══════════════════════════════════════════════════
function ShareProfileBtn({profile}){
  const[open,setOpen]=useState(false);const[copied,setCopied]=useState(false);
  const tier=getTier(profile.ink);const lens=LENSES[profile.lens];
  function copyLink(){navigator.clipboard.writeText(`https://joinprecis.com/@${profile.handle.replace("@","")}`).catch(()=>{});setCopied(true);setTimeout(()=>setCopied(false),2500);}
  function shareX(){window.open("https://x.com/intent/tweet?text="+encodeURIComponent(`${profile.name} on Précis — ${tier.name} tier reader\n\nhttps://joinprecis.com/${profile.handle}`),"_blank");}
  return <div style={{position:"relative"}}>
    <button onClick={()=>setOpen(!open)} style={{padding:"9px 16px",borderRadius:10,fontFamily:T.sans,fontSize:12,fontWeight:600,cursor:"pointer",background:"transparent",color:T.ink3,border:`1px solid ${T.border}`,display:"flex",alignItems:"center",gap:4}}>{"\u2197"} Share</button>
    {open&&<div style={{position:"absolute",top:"calc(100% + 8px)",right:0,width:280,background:T.bg2,border:`1px solid ${T.borderHover}`,borderRadius:14,padding:16,boxShadow:"0 12px 40px rgba(0,0,0,.5)",zIndex:40,animation:"slideDown .15s ease"}}>
      {/* Mini profile card preview */}
      <div style={{background:`linear-gradient(135deg,${T.card},${T.goldGlow})`,border:`1px solid ${T.gold}15`,borderRadius:10,padding:"14px 16px",marginBottom:12}}>
        <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:8}}><Av i={profile.initials} ink={profile.ink} s={32}/><div><div style={{fontFamily:T.sans,fontSize:12,fontWeight:700,color:T.ink}}>{profile.name}</div><div style={{fontFamily:T.sans,fontSize:10,color:T.ink3}}>{profile.handle}</div></div></div>
        <div style={{display:"flex",gap:8,flexWrap:"wrap"}}><span style={{padding:"2px 8px",borderRadius:5,fontSize:9,fontWeight:700,fontFamily:T.sans,color:tier.color,background:tier.bg}}>{tier.name}</span>{lens&&<span style={{fontSize:9,color:lens.color,fontFamily:T.sans,fontWeight:600}}>{lens.icon} {lens.label}</span>}{profile.streak.current>0&&<span style={{fontSize:9,color:T.gold,fontFamily:T.sans,fontWeight:600}}>{"\uD83D\uDD25"} {profile.streak.current}d</span>}</div>
      </div>
      <div style={{display:"flex",gap:6}}>
        <button onClick={copyLink} style={{flex:1,padding:"8px 12px",borderRadius:8,border:`1px solid ${copied?`${T.green}30`:T.border}`,background:copied?`${T.green}06`:"transparent",fontFamily:T.sans,fontSize:11,fontWeight:600,color:copied?T.green:T.ink3,cursor:"pointer",transition:"all .2s"}}>{copied?"\u2713 Copied":"Copy link"}</button>
        <button onClick={shareX} style={{flex:1,padding:"8px 12px",borderRadius:8,border:`1px solid ${T.border}`,background:"transparent",fontFamily:T.sans,fontSize:11,fontWeight:600,color:T.ink3,cursor:"pointer"}}>Post to X</button>
      </div>
    </div>}
  </div>;
}

function Header({profile,isOwner,isFollowing,onFollow,onEdit,headerRef}){
  const lens=LENSES[profile.lens];
  return <div ref={headerRef} style={{background:`linear-gradient(180deg,${T.bg2} 0%,${T.bg} 100%)`,borderBottom:`1px solid ${T.border}`,padding:"32px 0 0"}}><div className="cmx" style={{maxWidth:860,margin:"0 auto",padding:"0 28px"}}><div className="hdr-row" style={{display:"flex",gap:24,alignItems:"flex-start"}}>
    <Av i={profile.initials} ink={profile.ink} s={86}/>
    <div style={{flex:1,minWidth:0}}>
      <div style={{display:"flex",alignItems:"center",gap:10,flexWrap:"wrap",marginBottom:4}}>
        <h1 style={{fontFamily:T.serif,fontSize:28,fontWeight:700,color:T.ink,letterSpacing:"-.5px",lineHeight:1.2}}>{profile.name}</h1>
        <IB ink={profile.ink} show lg/>{profile.era&&<span style={{padding:"2px 7px",borderRadius:4,fontSize:9,fontWeight:700,fontFamily:T.sans,color:T.gold,background:`${T.gold}08`,border:`1px solid ${T.gold}15`,letterSpacing:".5px"}}>ERA {profile.era}</span>}
      </div>
      <div className="hdr-meta" style={{fontFamily:T.sans,fontSize:12.5,color:T.ink3,marginBottom:12,display:"flex",alignItems:"center",gap:8,flexWrap:"wrap"}}>
        <span>{profile.handle}</span>{lens&&<span style={{color:lens.color,fontWeight:600}}>{lens.icon} {lens.label}</span>}<span style={{opacity:.3}}>·</span><span>{profile.location}</span><span style={{opacity:.3}}>·</span><span>Joined {profile.joined}</span>
      </div>
      <p style={{fontFamily:T.body,fontSize:14.5,lineHeight:1.7,color:T.ink2,fontWeight:300,marginBottom:14,maxWidth:540}}>{profile.bio}</p>
      <div className="hdr-badges" style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:14}}>
        {profile.badges.length>0&&badges.map(b=><Bdg key={b} type={b}/>)}
        {profile.streak.current>0&&<span title={`Quality streak: ${profile.streak.quality} days ✦`} style={{display:"inline-flex",alignItems:"center",gap:4,padding:"3px 9px",borderRadius:6,fontSize:10,fontWeight:600,fontFamily:T.sans,color:T.gold,background:"rgba(232,160,48,.08)",border:"1px solid rgba(232,160,48,.15)",cursor:"default"}}>🔥 {profile.streak.current} days</span>}
      </div>
      <div className="hdr-stats" style={{display:"flex",gap:24,marginBottom:8}}>
        {[{n:profile.stats.posts,l:"Posts"},{n:profile.stats.followers,l:"Followers"},{n:profile.stats.following,l:"Following"},{n:profile.stats.books,l:"Books Read"},{n:profile.streak.current,l:"\uD83D\uDD25 Streak"}].map(s=><div key={s.l} style={{cursor:"pointer"}}><span style={{fontFamily:T.sans,fontSize:16,fontWeight:700,color:s.l.includes("\uD83D\uDD25")&&s.n>=30?T.accent:T.ink}}>{fmt(s.n)}{s.l.includes("\uD83D\uDD25")?"d":""}</span><span style={{fontFamily:T.sans,fontSize:11,color:T.ink3,marginLeft:4}}>{s.l}</span></div>)}
      </div>
    </div>
    {isOwner?<div style={{display:"flex",gap:8,flexShrink:0,marginTop:8}}><button className="hdr-btn" onClick={onEdit} style={{padding:"9px 24px",borderRadius:10,fontFamily:T.sans,fontSize:13,fontWeight:700,cursor:"pointer",background:"transparent",color:T.ink2,border:`1.5px solid ${T.border}`}}>Edit Profile</button><button onClick={()=>pToast("Opening Settings\u2026")} style={{padding:"9px 12px",borderRadius:10,fontFamily:T.sans,fontSize:15,cursor:"pointer",background:"transparent",color:T.ink3,border:`1.5px solid ${T.border}`,lineHeight:1}} aria-label="Settings">{"\u2699"}</button><ShareProfileBtn profile={profile}/></div>
    :<NonOwnerActions isFollowing={isFollowing} onFollow={onFollow} profile={profile}/>}
  </div></div></div>;
}

function NonOwnerActions({isFollowing,onFollow,profile}){
  const[menu,setMenu]=useState(false);
  return <div style={{display:"flex",gap:8,flexShrink:0,marginTop:8}}>
    <button className="hdr-btn" onClick={onFollow} style={{padding:"9px 28px",borderRadius:10,border:"none",fontFamily:T.sans,fontSize:13,fontWeight:700,cursor:"pointer",transition:"all .2s",...(isFollowing?{background:"transparent",color:T.ink2,border:`1.5px solid ${T.border}`}:{background:`linear-gradient(135deg,${T.accent},#9E4520)`,color:"#fff",boxShadow:`0 2px 12px ${T.accent}30`})}}>{isFollowing?"Following":"Follow"}</button>
    <button onClick={()=>pToast(`Opening conversation with ${profile.name}\u2026`)} style={{padding:"9px 16px",borderRadius:10,fontFamily:T.sans,fontSize:12,fontWeight:600,cursor:"pointer",background:"transparent",color:T.ink3,border:`1px solid ${T.border}`,display:"flex",alignItems:"center",gap:4}}>{"\u2709"} Message</button>
    <ShareProfileBtn profile={profile}/>
    <div style={{position:"relative"}}>
      <button onClick={()=>setMenu(!menu)} aria-label="More options" style={{padding:"9px 12px",borderRadius:10,fontFamily:T.sans,fontSize:15,cursor:"pointer",background:"transparent",color:T.ink3,border:`1.5px solid ${T.border}`,lineHeight:1}}>{"\u22EF"}</button>
      {menu&&<div onClick={()=>setMenu(false)} style={{position:"absolute",top:"100%",right:0,marginTop:4,width:200,background:T.card,border:`1px solid ${T.borderHover}`,borderRadius:10,overflow:"hidden",boxShadow:"0 8px 32px rgba(0,0,0,.5)",zIndex:20}}>
        <button onClick={()=>pToast(`Muted ${profile.name}`)} style={{display:"block",width:"100%",padding:"10px 14px",border:"none",background:"transparent",fontFamily:T.sans,fontSize:11,fontWeight:600,color:T.ink,textAlign:"left",cursor:"pointer"}} onMouseEnter={e=>e.currentTarget.style.background=T.bg3} onMouseLeave={e=>e.currentTarget.style.background="transparent"}>{"\uD83D\uDD07"} Mute</button>
        <button onClick={()=>{if(window.confirm(`Block ${profile.name}? They won\u2019t be able to see your profile or posts.`))pToast(`Blocked ${profile.name}`);}} style={{display:"block",width:"100%",padding:"10px 14px",border:"none",background:"transparent",fontFamily:T.sans,fontSize:11,fontWeight:600,color:T.red,textAlign:"left",cursor:"pointer"}} onMouseEnter={e=>e.currentTarget.style.background=T.bg3} onMouseLeave={e=>e.currentTarget.style.background="transparent"}>{"\u26D4"} Block</button>
        <div style={{borderTop:`1px solid ${T.border}`}}/>
        <button onClick={()=>pToast("Report submitted \u2014 thank you")} style={{display:"block",width:"100%",padding:"10px 14px",border:"none",background:"transparent",fontFamily:T.sans,fontSize:11,fontWeight:600,color:T.ink4,textAlign:"left",cursor:"pointer"}} onMouseEnter={e=>e.currentTarget.style.background=T.bg3} onMouseLeave={e=>e.currentTarget.style.background="transparent"}>{"\u26A0"} Report profile</button>
      </div>}
    </div>
  </div>;
}

function StickyBar({profile,vis,isOwner,isFollowing,onFollow,onEdit}){
  return <div style={{position:"fixed",top:56,left:0,right:0,zIndex:90,background:`${T.bg}F0`,backdropFilter:"blur(20px) saturate(1.3)",borderBottom:`1px solid ${T.border}`,transform:vis?"translateY(0)":"translateY(-100%)",opacity:vis?1:0,transition:"all .25s",pointerEvents:vis?"auto":"none"}}><div className="stk-i" style={{maxWidth:860,margin:"0 auto",padding:"8px 28px",display:"flex",alignItems:"center",gap:12}}>
    <Av i={profile.initials} ink={profile.ink} s={28}/><span style={{fontFamily:T.sans,fontSize:14,fontWeight:700,color:T.ink}}>{profile.name}</span><IB ink={profile.ink}/><div style={{flex:1}}/>
    {isOwner?<button onClick={onEdit} style={{padding:"6px 18px",borderRadius:8,fontFamily:T.sans,fontSize:12,fontWeight:700,cursor:"pointer",background:"transparent",color:T.ink2,border:`1.5px solid ${T.border}`}}>Edit Profile</button>
    :<button onClick={onFollow} style={{padding:"6px 20px",borderRadius:8,border:"none",fontFamily:T.sans,fontSize:12,fontWeight:700,cursor:"pointer",...(isFollowing?{background:"transparent",color:T.ink2,border:`1.5px solid ${T.border}`}:{background:`linear-gradient(135deg,${T.accent},#9E4520)`,color:"#fff"})}}>{isFollowing?"Following":"Follow"}</button>}
  </div></div>;
}

// ═══════════════════════════════════════════════════
// CURRENTLY READING BAR
// ═══════════════════════════════════════════════════
function ReadingBar({book,isOwner}){
  const[ed,sEd]=useState(false);const[pr,sPr]=useState(book?.progress||0);
  if(!book)return null;
  return <div style={{display:"flex",alignItems:"center",gap:12,padding:"10px 16px",borderRadius:12,background:T.goldGlow,border:`1px solid ${T.border}`,marginBottom:12}}>
    <div style={{width:24,height:34,borderRadius:"1px 3px 3px 1px",flexShrink:0,background:`linear-gradient(135deg,${T.accent}CC,#6B2A10)`,boxShadow:"1px 0 4px rgba(0,0,0,.3)"}}/>
    <div style={{flex:1}}><div style={{fontFamily:T.sans,fontSize:9,color:T.ink3,fontWeight:700,letterSpacing:".8px",textTransform:"uppercase",marginBottom:1}}>Currently Reading</div><span style={{fontFamily:T.serif,fontSize:13.5,fontWeight:600,color:T.ink}}>{book.title}</span><span style={{fontFamily:T.body,fontSize:12,color:T.ink3,fontStyle:"italic",marginLeft:6}}>{book.author}</span></div>
    {isOwner&&ed?<div style={{display:"flex",alignItems:"center",gap:6,flexShrink:0}}><input maxLength={100} type="range" min="0" max="100" value={pr} onChange={e=>sPr(+e.target.value)} style={{width:80}} aria-label="Range slider"/><span style={{fontFamily:T.sans,fontSize:10,fontWeight:700,color:T.gold,minWidth:28}}>{pr}%</span><button onClick={()=>sEd(false)} style={{padding:"3px 8px",borderRadius:4,fontSize:9,fontWeight:700,fontFamily:T.sans,background:`${T.gold}15`,color:T.gold,border:`1px solid ${T.gold}25`,cursor:"pointer"}}>Save</button></div>
    :<div onClick={()=>isOwner&&sEd(true)} style={{width:38,height:38,borderRadius:"50%",flexShrink:0,background:`conic-gradient(${T.gold} ${pr}%,${T.ink4}20 0)`,display:"flex",alignItems:"center",justifyContent:"center",cursor:isOwner?"pointer":"default"}}><div style={{width:30,height:30,borderRadius:"50%",background:T.card,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:T.sans,fontSize:9,fontWeight:700,color:T.gold}}>{pr}%</div></div>}
  </div>;
}

// ═══════════════════════════════════════════════════
// POST CARD — prominent repost header + dismissable update badge + version diff
// ═══════════════════════════════════════════════════
function PostCard({post,isOwner,onDismissUpdate}){
  const[exp,sExp]=useState(false);const[hov,sHov]=useState(false);const[showHist,sSH]=useState(false);
  const[spoilRevealed,setSpoilRev]=useState(false);
  const isLong=post.text.length>280;const text=exp||!isLong?post.text:post.text.slice(0,280)+"…";
  const isRepost=post.type==="repost";
  const hasDrift=post.shelvedAtVersion&&post.version>post.shelvedAtVersion&&!post._dismissed;
  const hasCrossSpoiler=post.crossBookSpoiler&&post.crossBooks?.length>0;
  const wc=post.text.trim().split(/\s+/).length;const rt=Math.ceil(wc/200);
  const lensData=post.lens?LENSES[post.lens]:null;

  return <article onMouseEnter={()=>sHov(true)} onMouseLeave={()=>sHov(false)} aria-label={`${post.title||"Post"} by ${PROFILE.name}`} style={{
    background:hov?T.cardHover:T.card,border:`1px solid ${hov?T.borderHover:T.border}`,
    borderLeft:post.pinned?`3px solid ${T.gold}60`:`1px solid ${hov?T.borderHover:T.border}`,
    borderRadius:14,padding:"18px 22px",transition:"all .25s",position:"relative",
  }}>
    {isOwner&&hov&&!isRepost&&<button onClick={e=>{e.stopPropagation();}} style={{position:"absolute",top:12,right:14,padding:"3px 8px",borderRadius:5,fontSize:10,fontWeight:600,fontFamily:T.sans,background:T.bg3,color:T.ink3,border:`1px solid ${T.border}`,cursor:"pointer"}}>Edit</button>}

    {/* PROMINENT REPOST HEADER */}
    {isRepost&&(
      <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:12,padding:"8px 12px",borderRadius:10,background:`${T.plum}06`,border:`1px solid ${T.plum}12`}}>
        <span style={{fontSize:16}}>🔄</span>
        <div style={{flex:1}}>
          <span style={{fontFamily:T.sans,fontSize:11,color:T.ink3}}>{isOwner?"You":"Priya"} reposted</span>
          <div style={{display:"flex",alignItems:"center",gap:6,marginTop:2}}>
            <Av i={post.repostedFrom.initials} ink={post.repostedFrom.ink} s={20}/>
            <span style={{fontFamily:T.sans,fontSize:12,fontWeight:700,color:T.ink}}>{post.repostedFrom.name}</span>
            <IB ink={post.repostedFrom.ink}/>
          </div>
        </div>
      </div>
    )}

    {post.pinned&&<div style={{display:"flex",alignItems:"center",gap:5,marginBottom:8,fontFamily:T.sans,fontSize:10,fontWeight:700,color:T.gold,letterSpacing:".3px"}}><span style={{fontSize:11}}>📌</span> PINNED</div>}

    <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10,flexWrap:"wrap"}}>
      <CTP type={isRepost?post.originalType:post.type}/>
      {lensData&&<span style={{fontSize:10,fontFamily:T.sans,fontWeight:600,color:lensData.color,opacity:.7}}>{lensData.icon}</span>}
      <span style={{fontSize:11,color:T.ink4,fontFamily:T.sans}}>{post.timeAgo}</span>
      <span style={{fontSize:10,color:T.ink4,fontFamily:T.sans}}>{wc} words · {rt<1?"< 1":rt} min</span>
      {post.editedAt&&<button onClick={()=>sSH(!showHist)} style={{fontSize:10,color:T.ink4,fontFamily:T.sans,fontStyle:"italic",display:"flex",alignItems:"center",gap:3,background:"none",border:"none",cursor:"pointer"}}><span style={{fontSize:8}}>✎</span> edited {post.editedAt} · v{post.version}</button>}
      {/* Dismissable version drift badge */}
      {hasDrift&&<button onClick={e=>{e.stopPropagation();sSH(true);onDismissUpdate&&onDismissUpdate(post.id);}} style={{fontSize:9,fontWeight:700,fontFamily:T.sans,color:T.amber,background:`${T.amber}10`,padding:"2px 8px",borderRadius:4,border:`1px solid ${T.amber}20`,cursor:"pointer",display:"flex",alignItems:"center",gap:3}}>● Updated since you shelved — tap to view</button>}
      {hasCrossSpoiler&&<span style={{display:"inline-flex",alignItems:"center",gap:3,padding:"2px 8px",borderRadius:5,fontSize:9,fontWeight:600,fontFamily:T.sans,color:T.red,background:`${T.red}08`,border:`1px solid ${T.red}15`}}>🔒 Spoilers: {post.crossBooks.join(", ")}</span>}
    </div>

    {showHist&&post.prevSnippet&&<div style={{marginBottom:12,padding:"12px 14px",borderRadius:10,background:`${T.red}05`,border:`1px solid ${T.red}10`}}>
      <div style={{fontFamily:T.sans,fontSize:10,fontWeight:700,color:T.ink3,marginBottom:6,textTransform:"uppercase",letterSpacing:".5px"}}>Previous version (v{post.version-1})</div>
      <p style={{fontFamily:T.body,fontSize:12,color:T.ink4,fontStyle:"italic",lineHeight:1.6,textDecoration:"line-through",opacity:.7}}>{post.prevSnippet}</p>
      <div style={{fontFamily:T.sans,fontSize:10,fontWeight:700,color:T.ink3,marginTop:8,marginBottom:4,textTransform:"uppercase",letterSpacing:".5px"}}>Current version (v{post.version})</div>
      <p style={{fontFamily:T.body,fontSize:12,color:T.ink2,lineHeight:1.6}}>{post.text.slice(0,120)}…</p>
    </div>}

    {post.title&&<h3 style={{fontFamily:T.serif,fontSize:23,fontWeight:700,color:T.ink,lineHeight:1.25,letterSpacing:"-.4px",marginBottom:12,fontStyle:"italic"}}>{post.title}</h3>}
    {post.bookRef&&<div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10,padding:"8px 12px",borderRadius:8,background:T.goldGlow,border:`1px solid ${T.border}`}}><div style={{width:22,height:32,borderRadius:"1px 3px 3px 1px",background:`linear-gradient(135deg,${T.accent}CC,#6B2A10)`,boxShadow:"1px 0 4px rgba(0,0,0,.3)"}}/><div><div style={{fontFamily:T.serif,fontSize:12.5,fontWeight:700,color:T.ink}}>{post.bookRef.title}</div><div style={{fontFamily:T.body,fontSize:11,color:T.ink3,fontStyle:"italic"}}>{post.bookRef.author}</div></div></div>}

    {/* Cross-book spoiler gate for visitors */}
    {hasCrossSpoiler&&!isOwner&&!spoilRevealed?<div style={{position:"relative"}} role="region" aria-label={`Cross-book spoiler warning — post references ${post.crossBooks.join(" and ")}`}>
      <div style={{filter:"blur(8px)",userSelect:"none",pointerEvents:"none",opacity:.35}} aria-hidden="true">
        <div style={{fontFamily:T.body,fontSize:14,lineHeight:1.75,color:T.ink2,marginBottom:12}}>{text.split("\n\n").map((p,i)=><p key={i} style={{marginBottom:8}}>{p}</p>)}</div>
      </div>
      <div style={{position:"absolute",inset:0,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:8}}>
        <span style={{fontSize:22}} aria-hidden="true">🔒</span>
        <span style={{fontFamily:T.sans,fontSize:12,fontWeight:600,color:T.ink2}}>Cross-Book Spoilers</span>
        <span style={{fontFamily:T.sans,fontSize:10.5,color:T.ink4,textAlign:"center",maxWidth:260,lineHeight:1.5}}>This review contains spoilers for <strong style={{color:T.ink3}}>{post.crossBooks.join(" & ")}</strong></span>
        <button onClick={()=>setSpoilRev(true)} aria-label={`Reveal post — contains spoilers for ${post.crossBooks.join(" and ")}`} style={{padding:"7px 18px",borderRadius:8,border:`1px solid ${T.red}40`,background:`${T.red}12`,color:T.red,fontFamily:T.sans,fontSize:11,fontWeight:600,cursor:"pointer"}}>I{"\u2019"}ve read {post.crossBooks.join(" & ")}</button>
      </div>
    </div>
    :<div style={{fontFamily:T.body,fontSize:14,lineHeight:1.75,color:T.ink2,marginBottom:12}}>{text.split("\n\n").map((p,i)=><p key={i} style={{marginBottom:8}}>{p}</p>)}{isLong&&<button onClick={()=>sExp(!exp)} style={{background:"none",border:"none",color:T.gold,cursor:"pointer",fontFamily:T.sans,fontSize:12,fontWeight:600,padding:0}}>{exp?"Show less":"Continue reading"}</button>}</div>}
    <div style={{display:"flex",alignItems:"center",gap:16,paddingTop:10,borderTop:`1px solid ${T.border}`,fontSize:12,fontFamily:T.sans,color:T.ink3}}><span>♡ {fmt(post.likes)}</span><span>💬 {fmt(post.comments)}</span><span>◆ {fmt(post.shelved)}</span><span>🔄 {fmt(post.reposts)}</span></div>
  </article>;
}

// ═══════════════════════════════════════════════════
// POSTS TAB — 6th repost filter
// ═══════════════════════════════════════════════════
function PostsTab({posts,isOwner,isEmpty,cr}){
  const[filter,sF]=useState("all");const[dismissed,sD]=useState({});
  const gatedCount=posts.filter(p=>p.crossBookSpoiler||p.type==="spoiler").length;
  const counts={all:posts.length,repost:0};posts.forEach(p=>{if(p.type==="repost")counts.repost++;else counts[p.type]=(counts[p.type]||0)+1;});
  const FILTERS=[{id:"all",l:"All",c:counts.all},{id:"original",l:"✍ Original",c:counts.original||0},{id:"review",l:"📝 Reviews",c:counts.review||0},{id:"recommendation",l:"📚 Recs",c:counts.recommendation||0},{id:"spoiler",l:"🔓 Spoilers",c:counts.spoiler||0},{id:"gated",l:"🔒 Gated",c:gatedCount},{id:"repost",l:"🔄 Reposts",c:counts.repost}];

  if(isEmpty)return <Empty icon="✍" head={isOwner?"Your page is still blank":"The page is still blank"} sub={isOwner?"Every writer starts here — one line at a time.":"This reader hasn't posted yet. Follow to know when they do."} btn={isOwner?"Write your first story":null} onClick={()=>pToast("Navigate to Compose →")}/>;

  const pinned=posts.find(p=>p.pinned);const rest=posts.filter(p=>!p.pinned);
  const filtered=filter==="all"?rest:filter==="repost"?rest.filter(p=>p.type==="repost"):filter==="gated"?rest.filter(p=>p.crossBookSpoiler||p.type==="spoiler"):rest.filter(p=>(p.type==="repost"?p.originalType:p.type)===filter);

  return <div style={{display:"flex",flexDirection:"column",gap:10}}>
    <ReadingBar book={cr} isOwner={isOwner}/>
    <div className="fp" style={{display:"flex",gap:6,marginBottom:4,paddingBottom:4,overflowX:"auto",scrollbarWidth:"none",WebkitOverflowScrolling:"touch"}}>
      {FILTERS.map(f=><button key={f.id} onClick={()=>sF(f.id)} style={{padding:"6px 12px",borderRadius:20,border:"none",fontFamily:T.sans,fontSize:11,fontWeight:600,cursor:"pointer",whiteSpace:"nowrap",transition:"all .2s",display:"flex",alignItems:"center",gap:5,
        background:filter===f.id?(f.id==="all"?`${T.gold}18`:f.id==="repost"?`${T.plum}15`:f.id==="gated"?`${T.red}12`:`${CTYPES[f.id]?.color||T.gold}15`):T.bg2,
        color:filter===f.id?(f.id==="all"?T.gold:f.id==="repost"?T.plum:f.id==="gated"?T.red:CTYPES[f.id]?.color||T.gold):T.ink3,
        border:`1px solid ${filter===f.id?(f.id==="all"?`${T.gold}25`:f.id==="repost"?`${T.plum}25`:f.id==="gated"?`${T.red}25`:`${CTYPES[f.id]?.color||T.gold}25`):T.border}`,
      }}>{f.l}<span style={{fontSize:9,opacity:.7}}>({f.c})</span></button>)}
    </div>
    {pinned&&(filter==="all"||(filter==="gated"?(pinned.crossBookSpoiler||pinned.type==="spoiler"):pinned.type===filter))&&<PostCard post={{...pinned,_dismissed:dismissed[pinned.id]}} isOwner={isOwner} onDismissUpdate={id=>sD(p=>({...p,[id]:true}))}/>}
    {filtered.map((p,i)=><div key={p.id} style={{animation:`fadeUp .25s ease ${i*.04}s both`}}><PostCard post={{...p,_dismissed:dismissed[p.id]}} isOwner={isOwner} onDismissUpdate={id=>sD(prev=>({...prev,[id]:true}))}/></div>)}
    {filtered.length===0&&filter!=="all"&&<div style={{padding:"40px 20px",textAlign:"center",fontFamily:T.body,color:T.ink3,fontStyle:"italic",fontSize:13}}>{filter==="gated"?"No gated posts. Your readers are safe.":filter==="repost"?"No reposts yet.":`No ${CTYPES[filter]?.label||""} yet.`}</div>}
  </div>;
}

// ═══════════════════════════════════════════════════
// SHELVES TAB
// ═══════════════════════════════════════════════════
function ShelvesTab({shelves,isOwner,isEmpty}){
  const[exp,sExp]=useState(null);const[fol,sFol]=useState({});const[notif,sNotif]=useState({});const[unfc,sUnfc]=useState(null);
  const sc=["#8B4513","#2A4A6B","#6B3A6B","#4A7A4A","#9E4A5A","#3D1F3D","#2D3640","#5C2D35","#2A7C7C"];
  const hs=[42,48,38,50,44,46,40,52,43];
  if(isEmpty)return <Empty icon="📚" head={isOwner?"Your shelves are empty":"Nothing on the shelves yet"} sub={isOwner?"When something moves you, shelf it.":"Shelves are how readers curate identity."} btn={isOwner?"Browse the Feed":null} onClick={()=>pToast("Navigate to Feed →")}/>;

  return <div style={{display:"flex",flexDirection:"column",gap:10}}>
    {unfc&&<div style={{padding:"12px 16px",borderRadius:10,background:`${T.red}06`,border:`1px solid ${T.red}15`,display:"flex",alignItems:"center",gap:12,flexWrap:"wrap"}}><span style={{fontFamily:T.sans,fontSize:12,color:T.ink2,flex:1}}>Stop following "{unfc.n}"? You'll no longer see updates.</span><button onClick={()=>{sFol(p=>{const n={...p};delete n[unfc.id];return n;});sUnfc(null);}} style={{padding:"6px 14px",borderRadius:8,fontFamily:T.sans,fontSize:11,fontWeight:700,background:`${T.red}12`,color:T.red,border:`1px solid ${T.red}25`,cursor:"pointer"}}>Unfollow</button><button onClick={()=>sUnfc(null)} style={{padding:"6px 14px",borderRadius:8,fontFamily:T.sans,fontSize:11,fontWeight:600,background:"transparent",color:T.ink3,border:`1px solid ${T.border}`,cursor:"pointer"}}>Cancel</button></div>}
    {shelves.length>0&&shelves.map((sh,si)=>{const isE=exp===sh.id;const isF=fol[sh.id];const hasN=notif[sh.id];return <div key={sh.id} onClick={()=>sExp(isE?null:sh.id)} style={{background:T.card,border:`1px solid ${isE?T.borderHover:T.border}`,borderRadius:14,padding:"18px 20px",cursor:"pointer",transition:"all .25s"}}>
      <div className="shelf-r" style={{display:"flex",alignItems:"flex-end",gap:16}}>
        <div className="sp-c" onClick={e=>e.stopPropagation()} style={{display:"flex",alignItems:"flex-end",gap:4,flexShrink:0,padding:"4px 8px 0",borderBottom:`2.5px solid ${T.ink4}25`,minWidth:80,minHeight:54}}>{sh.items.slice(0,5).map((it,j)=><Spine key={j} letter={it.charAt(0)} h={hs[(si*5+j)%hs.length]} color={sc[(si*5+j)%sc.length]} title={it}/>)}</div>
        <div style={{flex:1,minWidth:0,paddingBottom:4}}><div style={{fontFamily:T.serif,fontSize:17,fontWeight:700,color:T.ink,marginBottom:3,lineHeight:1.2}}>"{sh.name}"</div><div style={{fontFamily:T.body,fontSize:12,color:T.ink3,fontStyle:"italic",lineHeight:1.4,marginBottom:6}}>{sh.desc}</div><div style={{display:"flex",alignItems:"center",gap:4}}><div style={{display:"flex",marginRight:4}}>{sh.followedBy.slice(0,3).map((u,i)=><div key={i} style={{marginLeft:i>0?-6:0,position:"relative",zIndex:3-i}}><MAv i={u.initials} c={u.color}/></div>)}</div><span style={{fontFamily:T.sans,fontSize:10,color:T.ink3}}>{sh.followers>3?`+${sh.followers-3} following`:`${sh.followers} following`}</span></div></div>
        <div style={{textAlign:"right",flexShrink:0,paddingBottom:4}}><div style={{fontFamily:T.sans,fontSize:14,fontWeight:700,color:T.ink}}>{sh.count}</div><div style={{fontFamily:T.sans,fontSize:10,color:T.ink3}}>items</div></div>
      </div>
      {isE&&<div onClick={e=>e.stopPropagation()} style={{marginTop:14,paddingTop:14,borderTop:`1px solid ${T.border}`}}>
        <div style={{fontFamily:T.body,fontSize:13,color:T.ink3,fontStyle:"italic",marginBottom:12}}>Full shelf contents load here — compact cards with type badges, titles, and authors.</div>
        <div style={{display:"flex",alignItems:"center",gap:8,flexWrap:"wrap"}}>
          {!isOwner&&<><button onClick={()=>isF?sUnfc({id:sh.id,n:sh.name}):sFol(p=>({...p,[sh.id]:true}))} style={{padding:"7px 18px",borderRadius:8,fontFamily:T.sans,fontSize:12,fontWeight:700,cursor:"pointer",transition:"all .2s",...(isF?{background:"transparent",color:T.ink3,border:`1px solid ${T.border}`}:{background:`${T.gold}12`,color:T.gold,border:`1px solid ${T.gold}25`})}}>{isF?"✓ Following":"Follow this Shelf"}</button>
          {isF&&<button onClick={()=>sNotif(p=>({...p,[sh.id]:!p[sh.id]}))} style={{padding:"7px 14px",borderRadius:8,fontFamily:T.sans,fontSize:11,fontWeight:600,cursor:"pointer",background:hasN?`${T.blue}08`:"transparent",color:hasN?T.blue:T.ink4,border:`1px solid ${hasN?`${T.blue}20`:T.border}`}}>{hasN?"🔔 Notify on new items":"🔕 Notifications off"}</button>}</>}
          {isOwner&&<button onClick={e=>e.stopPropagation()} style={{padding:"7px 18px",borderRadius:8,fontFamily:T.sans,fontSize:12,fontWeight:600,cursor:"pointer",background:"transparent",color:T.ink3,border:`1px solid ${T.border}`}}>Edit Shelf</button>}
        </div>
      </div>}
    </div>;})}
  </div>;
}

// ═══════════════════════════════════════════════════
// WAYPOINTS TAB
// ═══════════════════════════════════════════════════
function WaypointsTab({waypoints,isOwner,isEmpty}){
  const[genFor,sGF]=useState(null);const[genP,sGP]=useState(0);const[selL,sSL]=useState(null);const[showLP,sSLP]=useState(null);const[posted,sPosted]=useState({});
  const[typeIdx,sTI]=useState(0);const[genDone,sGD]=useState(false);
  const genText="Your Empath lens reveals a different architecture — where the original reader found structural intention, you find the weight of what is unsaid. Sethe\u2019s silence isn\u2019t absence; it\u2019s the sound of memory holding its breath. Morrison builds rooms you have to live in, and by page 184, the house itself has become a character whose grief predates everyone in it…";

  function startGen(id){sGF(id);sGP(0);sSLP(null);sGD(false);sTI(0);let p=0;
    const iv=setInterval(()=>{p+=Math.random()*12+4;if(p>=100){p=100;clearInterval(iv);
      sGD(true);let c=0;const tw=setInterval(()=>{c+=2;sTI(c);if(c>=genText.length)clearInterval(tw);},18);
    }sGP(Math.min(100,Math.round(p)));},250);
  }

  if(isEmpty)return <Empty icon="\u27D0" head={isOwner?"No waypoints yet":"No waypoints set yet"} sub={isOwner?"Open the Compass and set your first waypoint.":"Spoiler-safe reading orientation — none set yet."} btn={isOwner?"Open Compass":null} onClick={()=>pToast("Compass opening…")}/>;
  return <div style={{display:"flex",flexDirection:"column",gap:14}}>
    {waypoints.map(syn=>{const lens=LENSES[syn.lens];const isGen=genFor===syn.id;const showPk=showLP===syn.id;const pt=posted[syn.id];return <div key={syn.id} className="fc" style={{background:T.card,border:`1px solid ${isGen&&genDone?`${T.blue}20`:T.border}`,borderRadius:14,padding:"20px 24px",transition:"border-color .5s"}}>
      {/* Book header */}
      <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:14}}><div style={{width:28,height:40,borderRadius:"1px 3px 3px 1px",flexShrink:0,background:`linear-gradient(135deg,${T.accent}CC,#6B2A10)`,boxShadow:"2px 1px 6px rgba(0,0,0,.35)"}}/><div style={{flex:1}}><div style={{fontFamily:T.serif,fontSize:15,fontWeight:700,color:T.ink}}>{syn.book}</div><div style={{fontFamily:T.body,fontSize:11.5,color:T.ink3,fontStyle:"italic"}}>{syn.author} · Through page {syn.page}</div></div>{lens&&<span style={{padding:"4px 10px",borderRadius:6,fontSize:10.5,fontWeight:600,fontFamily:T.sans,color:lens.color,background:`${lens.color}10`,border:`1px solid ${lens.color}20`}}>{lens.icon} {lens.label}</span>}</div>
      {/* Existing waypoint */}
      <p style={{fontFamily:T.body,fontSize:13.5,lineHeight:1.75,color:T.ink2,fontWeight:300,marginBottom:14}}>{syn.preview}</p>

      {/* Lens picker - full breathing room */}
      {showPk&&!isGen&&<div style={{marginBottom:14,padding:"18px 20px",borderRadius:12,background:`linear-gradient(135deg,${T.blue}04,${T.bg3})`,border:`1px solid ${T.blue}12`}}>
        <div style={{fontFamily:T.serif,fontSize:14,fontWeight:700,color:T.ink,marginBottom:4}}>See this book through different eyes</div>
        <div style={{fontFamily:T.body,fontSize:12,color:T.ink3,fontStyle:"italic",marginBottom:14}}>Each lens reveals what the others miss.</div>
        <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>{Object.entries(LENSES).map(([k,v])=><button key={k} onClick={()=>{sSL(k);startGen(syn.id);}} style={{padding:"10px 16px",borderRadius:10,fontSize:11.5,fontWeight:600,fontFamily:T.sans,cursor:"pointer",display:"flex",alignItems:"center",gap:6,background:selL===k?`${v.color}15`:"transparent",color:v.color,border:`1px solid ${v.color}25`,transition:"all .2s"}}><span style={{fontSize:16}}>{v.icon}</span><div style={{textAlign:"left"}}><div>{v.label}</div><div style={{fontSize:9,opacity:.6,fontWeight:400}}>{v.desc}</div></div></button>)}</div>
      </div>}

      {/* Generation experience - cinematic */}
      {isGen&&<div style={{margin:"0 0 14px",padding:"20px 22px",borderRadius:12,background:genDone?`linear-gradient(135deg,${T.blue}06,${T.goldGlow})`:`${T.blue}04`,border:`1px solid ${genDone?`${T.blue}18`:`${T.blue}10`}`,transition:"all .5s"}}>
        {/* Progress */}
        {!genDone&&<>
          <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:12}}>
            <div style={{width:10,height:10,borderRadius:"50%",background:T.blue,animation:"pulseGlow 1s infinite"}}/>
            <span style={{fontFamily:T.serif,fontSize:14,fontWeight:600,color:T.ink,fontStyle:"italic"}}>Reading through {selL?LENSES[selL].label:"your"} eyes…</span>
            <span style={{fontFamily:T.sans,fontSize:11,color:T.ink3,marginLeft:"auto"}}>{genP}%</span>
          </div>
          <div style={{height:4,borderRadius:2,background:`${T.ink4}15`,overflow:"hidden"}}><div style={{height:"100%",borderRadius:2,background:`linear-gradient(90deg,${T.blue},${LENSES[selL]?.color||T.blue})`,width:`${genP}%`,transition:"width .3s ease"}}/></div>
          <div style={{fontFamily:T.sans,fontSize:10,color:T.ink4,marginTop:8,fontStyle:"italic"}}>Analyzing narrative structure, emotional arcs, and thematic patterns…</div>
        </>}

        {/* Typewriter reveal */}
        {genDone&&<>
          <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:14}}>
            <span style={{fontSize:16}}>{LENSES[selL]?.icon||"\u27D0"}</span>
            <span style={{fontFamily:T.serif,fontSize:15,fontWeight:700,color:T.ink}}>Your {selL?LENSES[selL].label:""} Waypoint</span>
            <div style={{marginLeft:"auto",padding:"3px 10px",borderRadius:6,fontSize:10,fontWeight:700,fontFamily:T.sans,color:T.green,background:`${T.green}10`,border:`1px solid ${T.green}20`}}>{"\u2713"} Generated</div>
          </div>
          <div style={{fontFamily:T.body,fontSize:14,lineHeight:1.8,color:T.ink2,fontWeight:300,minHeight:80,paddingBottom:8}}>
            {genText.slice(0,typeIdx)}{typeIdx<genText.length&&<span style={{display:"inline-block",width:2,height:14,background:T.gold,marginLeft:2,animation:"pulseGlow .8s infinite",verticalAlign:"text-bottom"}}/>}
          </div>
          <div style={{display:"flex",gap:8,marginTop:14,paddingTop:14,borderTop:`1px solid ${T.blue}10`,flexWrap:"wrap"}}>
            {!pt?<button onClick={()=>sPosted(p=>({...p,[syn.id]:true}))} style={{padding:"8px 18px",borderRadius:10,fontFamily:T.sans,fontSize:12,fontWeight:700,cursor:"pointer",background:`linear-gradient(135deg,${T.accent},#9E4520)`,color:"#fff",border:"none",boxShadow:`0 2px 12px ${T.accent}25`}}>Post to my Waypoints</button>:<span style={{fontFamily:T.sans,fontSize:12,color:T.green,fontWeight:600,display:"flex",alignItems:"center",gap:4}}>{"\u2713"} Added to your Waypoints tab</span>}
            <button onClick={()=>pToast("\u25C6 Added to shelf")} style={{padding:"8px 14px",borderRadius:8,border:`1px solid ${T.border}`,background:"transparent",color:T.ink3,fontFamily:T.sans,fontSize:11,fontWeight:600,cursor:"pointer"}}>{"\u25C6"} Shelf</button>
            <button onClick={()=>pToast("Link copied!")} style={{padding:"8px 14px",borderRadius:8,border:`1px solid ${T.border}`,background:"transparent",color:T.ink3,fontFamily:T.sans,fontSize:11,fontWeight:600,cursor:"pointer"}}>{"\u2197"} Share</button>
          </div>
        </>}
      </div>}

      {/* Action row */}
      <div style={{display:"flex",alignItems:"center",gap:8,paddingTop:12,borderTop:`1px solid ${T.border}`,flexWrap:"wrap"}}>
        {!isOwner&&!isGen&&!showPk&&<button onClick={()=>sSLP(syn.id)} style={{padding:"8px 18px",borderRadius:10,border:`1px solid ${T.blue}30`,background:`${T.blue}08`,color:T.blue,fontFamily:T.sans,fontSize:12,fontWeight:600,cursor:"pointer"}}>{"\u27D0"} Generate mine at page {syn.page}</button>}
        {isOwner&&!isGen&&<button onClick={()=>sSLP(syn.id)} style={{padding:"8px 18px",borderRadius:10,border:`1px solid ${T.blue}30`,background:`${T.blue}08`,color:T.blue,fontFamily:T.sans,fontSize:12,fontWeight:600,cursor:"pointer"}}>{"\u27D0"} Regenerate with different lens</button>}
        {!showPk&&!isGen&&<><button onClick={()=>pToast("\u25C6 Added to shelf")} style={{padding:"8px 14px",borderRadius:8,border:`1px solid ${T.border}`,background:"transparent",color:T.ink3,fontFamily:T.sans,fontSize:11,fontWeight:600,cursor:"pointer"}}>{"\u25C6"} Shelf</button><button onClick={()=>pToast("\u2197 Link copied!")} style={{padding:"8px 14px",borderRadius:8,border:`1px solid ${T.border}`,background:"transparent",color:T.ink3,fontFamily:T.sans,fontSize:11,fontWeight:600,cursor:"pointer"}}>{"\u2197"} Share</button></>}
      </div>
    </div>;})}
  </div>;
}

// ═══════════════════════════════════════════════════
// READER MAP — onboarding + clickable nodes + crossfade + Bézier + force-directed
// ═══════════════════════════════════════════════════
function ReaderMap({books,defaultP,isOwner,seeded}){
  const[para,sPara]=useState(defaultP||"emotional");
  const[prevPara,sPP]=useState(null);
  const[fadeKey,sFK]=useState(0);
  const[selectedNode,sSN]=useState(null);
  const[seedBooks,sSB]=useState(["","","","",""]);
  const[hasSeeded,sHS]=useState(seeded);
  const mapRef=useRef(null);
  const[dims,setDims]=useState({w:760,h:380});
  useEffect(()=>{
    if(!mapRef.current)return;
    const ro=new ResizeObserver(entries=>{const{width}=entries[0].contentRect;if(width>0)setDims({w:width,h:Math.max(260,Math.min(420,width*.5))});});
    ro.observe(mapRef.current);return()=>ro.disconnect();
  },[]);
  const W=dims.w,H=dims.h;

  function switchPara(p){if(p===para)return;sPP(para);sPara(p);sFK(k=>k+1);sSN(null);}

  // ─── ONBOARDING: Seed 5 books ───
  if(!hasSeeded){
    return <div style={{background:T.card,border:`1px solid ${T.border}`,borderRadius:14,padding:"24px",gridColumn:"1 / -1"}} className="full-col fc">
      <h3 style={{fontFamily:T.serif,fontSize:18,fontWeight:700,color:T.ink,marginBottom:4}}>Seed Your Reader Map</h3>
      <p style={{fontFamily:T.body,fontSize:13,color:T.ink3,lineHeight:1.6,marginBottom:20}}>Enter five books that shaped you — favorites, formative reads, guilty pleasures. These become the first stars in your map. Every book you log after this will expand the constellation.</p>
      <div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:20}}>
        {seedBooks.map((b,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:10}}>
          <span style={{fontFamily:T.sans,fontSize:12,fontWeight:700,color:T.ink4,width:20,textAlign:"right"}}>{i+1}.</span>
          <input maxLength={100} value={b} onChange={e=>{const n=[...seedBooks];n[i]=e.target.value;sSB(n);}} aria-label={`Seed book ${i+1}`} placeholder={["The book that changed everything","The one you've read three times","Your guilty pleasure","The one you recommend to everyone","The book you wish you'd written"][i]} style={{flex:1,padding:"10px 14px",borderRadius:10,border:`1px solid ${T.border}`,background:T.bg3,color:T.ink,fontFamily:T.body,fontSize:13,outline:"none",transition:"border-color .2s"}} onFocus={e=>e.target.style.borderColor=T.gold} onBlur={e=>e.target.style.borderColor=T.border}/>
        </div>)}
      </div>
      <div style={{display:"flex",gap:10,justifyContent:"flex-end"}}>
        <button onClick={()=>sHS(true)} style={{padding:"4px 14px",borderRadius:8,fontFamily:T.sans,fontSize:11,color:T.ink3,background:"transparent",border:`1px solid ${T.border}`,cursor:"pointer"}}>Skip for now</button>
        <button onClick={()=>{if(seedBooks.filter(b=>b.trim()).length>=3)sHS(true);}} disabled={seedBooks.filter(b=>b.trim()).length<3} style={{padding:"9px 24px",borderRadius:10,border:"none",background:`linear-gradient(135deg,${T.accent},#9E4520)`,fontFamily:T.sans,fontSize:12,fontWeight:700,color:"#fff",cursor:seedBooks.filter(b=>b.trim()).length>=3?"pointer":"not-allowed",opacity:seedBooks.filter(b=>b.trim()).length>=3?1:.5}}>Plant your roots</button>
      </div>
    </div>;
  }

  // ─── Node click detail card ───
  function NodeDetail({book,onClose,pToast}){
    
    useEffect(()=>{const k=e=>{if(e.key==="Escape")onClose();};document.addEventListener("keydown",k);return()=>document.removeEventListener("keydown",k);});
    return <div style={{position:"absolute",left:"50%",top:"50%",transform:"translate(-50%,-50%)",width:260,padding:"16px",borderRadius:12,background:T.bg2,border:`1px solid ${T.borderHover}`,boxShadow:"0 8px 32px rgba(0,0,0,.5)",zIndex:20,animation:"fadeUp .15s ease"}}>
      <button aria-label="Close" onClick={onClose} style={{position:"absolute",top:8,right:10,background:"none",border:"none",color:T.ink3,fontSize:14,cursor:"pointer"}}>×</button>
      <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:10}}>
        <div style={{width:28,height:40,borderRadius:"1px 3px 3px 1px",background:`linear-gradient(135deg,${book.color},${book.color}88)`,boxShadow:"1px 0 4px rgba(0,0,0,.3)"}}/>
        <div><div style={{fontFamily:T.serif,fontSize:14,fontWeight:700,color:T.ink}}>{book.title}</div><div style={{fontFamily:T.body,fontSize:11,color:T.ink3,fontStyle:"italic"}}>{book.author} · {book.year}</div></div>
      </div>
      <div style={{display:"flex",flexWrap:"wrap",gap:4,marginBottom:10}}>{book.themes.map(t=><span key={t} style={{padding:"2px 8px",borderRadius:4,fontSize:9,fontWeight:600,fontFamily:T.sans,color:T.ink3,background:T.bg3,border:`1px solid ${T.border}`}}>{t}</span>)}</div>
      <div style={{fontFamily:T.sans,fontSize:10,color:T.ink3,marginBottom:10}}>{book.origin} · {book.language} · {book.genre} · Mood: {book.mood}</div>
      <div style={{display:"flex",gap:6}}>
        <button onClick={()=>pToast("Compass \u2192")} style={{padding:"5px 12px",borderRadius:6,fontSize:10,fontWeight:600,fontFamily:T.sans,cursor:"pointer",background:`${T.blue}08`,color:T.blue,border:`1px solid ${T.blue}20`}}>⟐ Compass</button>
        <button onClick={()=>pToast("Book Community \u2192")} style={{padding:"5px 12px",borderRadius:6,fontSize:10,fontWeight:600,fontFamily:T.sans,cursor:"pointer",background:`${T.gold}08`,color:T.gold,border:`1px solid ${T.gold}20`}}>View Community</button>
      </div>
    </div>;
  }

  // ─── Clickable map node ───
  function MapNode({b,x,y,showLabel=true,labelBelow=true}){
    const isActive=selectedNode===b.id;
    return <div onClick={e=>{e.stopPropagation();sSN(s=>s===b.id?null:b.id);}} style={{position:"absolute",left:x,top:y,transform:"translate(-50%,-50%)",cursor:"pointer",textAlign:"center",zIndex:isActive?15:2,transition:"z-index .1s"}}>
      <div style={{width:10+b.intensity*10,height:10+b.intensity*10,borderRadius:"50%",background:`radial-gradient(circle,${b.color},${b.color}60)`,boxShadow:isActive?`0 0 20px ${b.color}80`:`0 0 12px ${b.color}50`,border:isActive?`2px solid ${T.ink}`:"2px solid transparent",transition:"all .2s"}}/>
      {showLabel&&W>500&&<div style={{fontFamily:T.sans,fontSize:8,fontWeight:600,color:isActive?T.ink:T.ink3,marginTop:labelBelow?4:-14,whiteSpace:"nowrap",transition:"color .2s"}}>{b.title.length>16?b.title.slice(0,14)+"…":b.title}</div>}
    </div>;
  }

  // ─── PARADIGM RENDERERS (lazy — only active one renders) ───

  function Geographic(){
    const toX=lng=>40+((lng+180)/360)*(W-80),toY=lat=>20+((90-lat)/180)*(H-40);
    return <div style={{position:"relative",width:"100%",height:H,borderRadius:10,overflow:"hidden",background:"#0A1520"}} onClick={()=>sSN(null)}>
      <svg style={{position:"absolute",top:0,left:0,width:"100%",height:"100%",pointerEvents:"none"}} viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none">
        {/* Grid lines */}
        {[...Array(7)].map((_,i)=><line key={`h${i}`} x1={0} y1={(i+1)*H/8} x2={W} y2={(i+1)*H/8} stroke="rgba(78,168,160,.06)" strokeWidth={1}/>)}
        {/* Equator */}
        <line x1={0} y1={toY(0)} x2={W} y2={toY(0)} stroke="rgba(78,168,160,.12)" strokeWidth={1} strokeDasharray="4 6"/>
        {/* Simplified continent outlines */}
        <ellipse cx={toX(-100)} cy={toY(40)} rx={W*.08} ry={H*.15} fill="rgba(78,168,160,.04)" stroke="rgba(78,168,160,.08)" strokeWidth={.5}/>
        <ellipse cx={toX(-60)} cy={toY(-15)} rx={W*.05} ry={H*.18} fill="rgba(78,168,160,.04)" stroke="rgba(78,168,160,.08)" strokeWidth={.5}/>
        <ellipse cx={toX(10)} cy={toY(50)} rx={W*.06} ry={H*.1} fill="rgba(78,168,160,.04)" stroke="rgba(78,168,160,.08)" strokeWidth={.5}/>
        <ellipse cx={toX(20)} cy={toY(5)} rx={W*.06} ry={H*.2} fill="rgba(78,168,160,.04)" stroke="rgba(78,168,160,.08)" strokeWidth={.5}/>
        <ellipse cx={toX(80)} cy={toY(30)} rx={W*.08} ry={H*.15} fill="rgba(78,168,160,.04)" stroke="rgba(78,168,160,.08)" strokeWidth={.5}/>
        <ellipse cx={toX(135)} cy={toY(-25)} rx={W*.05} ry={H*.08} fill="rgba(78,168,160,.04)" stroke="rgba(78,168,160,.08)" strokeWidth={.5}/>
      </svg>
      {books.map((b,i)=><MapNode key={b.id} b={b} x={toX(b.lng)} y={toY(b.lat)}/>)}
      {selectedNode&&<NodeDetail pToast={pToast} book={books.find(b=>b.id===selectedNode)} onClose={()=>sSN(null)}/>}
    </div>;
  }

  function Constellation(){
    const genres=[...new Set(books.map(b=>b.genre))];const gc={"Literary Fiction":T.gold,Contemporary:T.blue,"Magical Realism":T.amber,Existential:"#7A7067","Graphic Memoir":T.red};
    const as=(Math.PI*2)/genres.length,cx=W/2,cy=H/2;
    return <div style={{position:"relative",width:"100%",height:H,borderRadius:10,overflow:"hidden",background:"#08080C"}} onClick={()=>sSN(null)}>
      {[...Array(40)].map((_,i)=><div key={i} style={{position:"absolute",left:`${Math.random()*100}%`,top:`${Math.random()*100}%`,width:1+Math.random()*2,height:1+Math.random()*2,borderRadius:"50%",background:`rgba(232,224,208,${.1+Math.random()*.2})`}}/>)}
      {genres.map((g,gi)=>{const gb=books.filter(b=>b.genre===g);const a=as*gi-Math.PI/2;const r=100+gb.length*15;const gx=cx+Math.cos(a)*r,gy=cy+Math.sin(a)*r;const c=gc[g]||T.plum;
        return <div key={g}><div style={{position:"absolute",left:gx,top:gy,transform:"translate(-50%,-50%)",fontFamily:T.sans,fontSize:9,fontWeight:700,color:`${c}60`,letterSpacing:".5px",textTransform:"uppercase",whiteSpace:"nowrap"}}>{g}</div>
        {gb.map((b,bi)=>{const ba=(bi/gb.length)*Math.PI*2,br=20+bi*18;return <MapNode key={b.id} b={b} x={gx+Math.cos(ba)*br} y={gy+Math.sin(ba)*br}/>;})}</div>;})}
      <div style={{position:"absolute",left:cx,top:cy,transform:"translate(-50%,-50%)",fontFamily:T.serif,fontSize:11,fontStyle:"italic",color:T.ink4,opacity:.4}}>your reading</div>
      {selectedNode&&<NodeDetail pToast={pToast} book={books.find(b=>b.id===selectedNode)} onClose={()=>sSN(null)}/>}
    </div>;
  }

  function Timeline(){
    const sorted=[...books].sort((a,b)=>a.year-b.year);const mn=sorted[0].year,mx=sorted[sorted.length-1].year,rng=mx-mn||1;
    const decs=[];for(let d=Math.floor(mn/10)*10;d<=mx;d+=10)decs.push(d);
    return <div style={{position:"relative",width:"100%",height:H,borderRadius:10,overflow:"hidden",background:T.bg3}} onClick={()=>sSN(null)}>
      <div style={{position:"absolute",top:"50%",left:40,right:40,height:2,background:`${T.gold}15`}}/>
      {decs.map(d=>{const x=40+((d-mn)/rng)*(W-80);return <div key={d} style={{position:"absolute",left:x,top:"50%",transform:"translate(-50%,12px)"}}><div style={{width:1,height:8,background:`${T.gold}30`,margin:"0 auto"}}/><div style={{fontFamily:T.sans,fontSize:9,color:T.ink4,marginTop:2,textAlign:"center"}}>{d}</div></div>;})}
      {sorted.map((b,i)=>{const x=40+((b.year-mn)/rng)*(W-80);const above=i%2===0;return <div key={b.id}><div style={{position:"absolute",left:x,top:above?"15%":"55%",width:1,height:above?`${H*.35}px`:`${H*.35}px`,background:`${b.color}20`}}/><MapNode b={b} x={x} y={above?`${12+i*2}%`:`${58+i*2}%`}/></div>;})}
      {selectedNode&&<NodeDetail pToast={pToast} book={books.find(b=>b.id===selectedNode)} onClose={()=>sSN(null)}/>}
    </div>;
  }

  function Emotional(){
    // Dynamic axes from actual mood data
    const moods=books.map(b=>b.mood);const moodPos={grief:{x:.2,y:.8},longing:{x:.35,y:.65},melancholy:{x:.3,y:.55},wonder:{x:.7,y:.2},isolation:{x:.15,y:.4},detachment:{x:.1,y:.25},searching:{x:.55,y:.45},defiance:{x:.75,y:.6},resilience:{x:.8,y:.35},tragedy:{x:.4,y:.85},unease:{x:.6,y:.7}};
    // Derive axis labels from actual mood poles
    const positions=books.map(b=>moodPos[b.mood]||{x:.5,y:.5});
    const avgX=positions.reduce((s,p)=>s+p.x,0)/positions.length;
    const avgY=positions.reduce((s,p)=>s+p.y,0)/positions.length;
    const lowXMoods=books.filter(b=>(moodPos[b.mood]||{x:.5}).x<.35).map(b=>b.mood);
    const hiXMoods=books.filter(b=>(moodPos[b.mood]||{x:.5}).x>.65).map(b=>b.mood);
    const lowYMoods=books.filter(b=>(moodPos[b.mood]||{y:.5}).y<.35).map(b=>b.mood);
    const hiYMoods=books.filter(b=>(moodPos[b.mood]||{y:.5}).y>.65).map(b=>b.mood);
    const axisL=lowXMoods[0]||"introspection",axisR=hiXMoods[0]||"release";
    const axisT=lowYMoods[0]||"stillness",axisB=hiYMoods[0]||"weight";

    return <div style={{position:"relative",width:"100%",height:H,borderRadius:10,overflow:"hidden",background:"linear-gradient(135deg,#12080C 0%,#0C1018 50%,#081210 100%)"}} onClick={()=>sSN(null)}>
      <div style={{position:"absolute",bottom:8,left:"50%",transform:"translateX(-50%)",fontFamily:T.sans,fontSize:8,color:T.ink4,letterSpacing:"1px",textTransform:"uppercase"}}>{axisB}</div>
      <div style={{position:"absolute",top:8,left:"50%",transform:"translateX(-50%)",fontFamily:T.sans,fontSize:8,color:T.ink4,letterSpacing:"1px",textTransform:"uppercase"}}>{axisT}</div>
      <div style={{position:"absolute",left:8,top:"50%",transform:"translateY(-50%) rotate(-90deg)",fontFamily:T.sans,fontSize:8,color:T.ink4,letterSpacing:"1px",textTransform:"uppercase"}}>{axisL}</div>
      <div style={{position:"absolute",right:8,top:"50%",transform:"translateY(-50%) rotate(90deg)",fontFamily:T.sans,fontSize:8,color:T.ink4,letterSpacing:"1px",textTransform:"uppercase"}}>{axisR}</div>
      {books.map(b=>{const pos=moodPos[b.mood]||{x:.5,y:.5};const px=40+pos.x*(W-80),py=30+pos.y*(H-60);return <div key={b.id}><div style={{position:"absolute",left:px,top:py,transform:"translate(-50%,-50%)",width:50+b.intensity*40,height:50+b.intensity*40,borderRadius:"50%",background:`radial-gradient(circle,${b.color}12,transparent)`,filter:"blur(10px)"}}/><MapNode b={b} x={px} y={py}/></div>;})}
      {selectedNode&&<NodeDetail pToast={pToast} book={books.find(b=>b.id===selectedNode)} onClose={()=>sSN(null)}/>}
    </div>;
  }

  function LangTree(){
    const langs={};books.forEach(b=>{const l=b.language.split(" ")[0];if(!langs[l])langs[l]=[];langs[l].push(b);});
    const lk=Object.keys(langs);const tx=W/2;const lc={English:T.blue,Spanish:T.amber,Japanese:T.plum,French:T.rose};
    return <div style={{position:"relative",width:"100%",height:H,borderRadius:10,overflow:"hidden",background:T.bg3}} onClick={()=>sSN(null)}>
      <div style={{position:"absolute",left:tx-2,top:H*.82,height:H*.18,width:4,background:`${T.green}30`,borderRadius:2}}/>
      <svg style={{position:"absolute",top:0,left:0,width:"100%",height:"100%",pointerEvents:"none"}}>
        {lk.map((lang,li)=>{const a=-Math.PI/2+((li-(lk.length-1)/2)/Math.max(lk.length-1,1))*Math.PI*.8;const bl=80+langs[lang].length*25;const bx=tx+Math.cos(a)*bl,by=H*.82+Math.sin(a)*bl;const c=lc[lang]||T.green;
          // Bézier curve for organic branch shape
          const cpx=tx+Math.cos(a)*bl*.4,cpy=H*.82+Math.sin(a)*bl*.3;
          return <path key={lang} d={`M${tx},${H*.82} Q${cpx},${cpy} ${bx},${by}`} stroke={`${c}30`} strokeWidth={2.5} fill="none"/>;
        })}
      </svg>
      {lk.map((lang,li)=>{const a=-Math.PI/2+((li-(lk.length-1)/2)/Math.max(lk.length-1,1))*Math.PI*.8;const bl=80+langs[lang].length*25;const bx=tx+Math.cos(a)*bl,by=H*.82+Math.sin(a)*bl;const c=lc[lang]||T.green;
        return <div key={lang}><div style={{position:"absolute",left:bx,top:by,transform:"translate(-50%,-50%)",fontFamily:T.sans,fontSize:9,fontWeight:700,color:`${c}70`,textTransform:"uppercase",letterSpacing:".5px",whiteSpace:"nowrap"}}>{lang}</div>
        {langs[lang].map((b,bi)=>{const la=a+((bi-(langs[lang].length-1)/2)/Math.max(langs[lang].length,1))*.4;const lr=30+bi*20;return <MapNode key={b.id} b={b} x={bx+Math.cos(la)*lr} y={by+Math.sin(la)*lr}/>;})}</div>;
      })}
      <div style={{position:"absolute",left:tx,top:H-12,transform:"translateX(-50%)",fontFamily:T.serif,fontSize:10,fontStyle:"italic",color:T.ink4}}>roots</div>
      {selectedNode&&<NodeDetail pToast={pToast} book={books.find(b=>b.id===selectedNode)} onClose={()=>sSN(null)}/>}
    </div>;
  }

  function Influence(){
    // Simple force-directed layout
    const nodes=useMemo(()=>{
      const conns=[];
      for(let i=0;i<books.length;i++)for(let j=i+1;j<books.length;j++){const sh=books[i].themes.filter(t=>books[j].themes.includes(t));if(sh.length>0)conns.push({i,j,s:sh.length,themes:sh});}
      // Initialize positions, then iterate force simulation
      let pos=books.map((b,i)=>{const a=(i/books.length)*Math.PI*2;return{x:W/2+Math.cos(a)*120,y:H/2+Math.sin(a)*100};});
      // 30 iterations of spring/repulsion
      for(let iter=0;iter<30;iter++){
        const forces=pos.map(()=>({fx:0,fy:0}));
        // Repulsion between all pairs
        for(let i=0;i<pos.length;i++)for(let j=i+1;j<pos.length;j++){
          let dx=pos[j].x-pos[i].x,dy=pos[j].y-pos[i].y;const d=Math.max(Math.sqrt(dx*dx+dy*dy),1);const f=800/(d*d);
          forces[i].fx-=f*(dx/d);forces[i].fy-=f*(dy/d);forces[j].fx+=f*(dx/d);forces[j].fy+=f*(dy/d);
        }
        // Attraction along connections
        conns.forEach(c=>{let dx=pos[c.j].x-pos[c.i].x,dy=pos[c.j].y-pos[c.i].y;const d=Math.max(Math.sqrt(dx*dx+dy*dy),1);const f=(d-60)*c.s*.015;
          forces[c.i].fx+=f*(dx/d);forces[c.i].fy+=f*(dy/d);forces[c.j].fx-=f*(dx/d);forces[c.j].fy-=f*(dy/d);
        });
        // Center gravity
        pos.forEach((p,i)=>{forces[i].fx+=(W/2-p.x)*.01;forces[i].fy+=(H/2-p.y)*.01;});
        // Apply forces
        pos=pos.map((p,i)=>({x:Math.max(40,Math.min(W-40,p.x+forces[i].fx*.3)),y:Math.max(30,Math.min(H-30,p.y+forces[i].fy*.3))}));
      }
      return{pos,conns};
    },[books]);

    return <div style={{position:"relative",width:"100%",height:H,borderRadius:10,overflow:"hidden",background:"#0C0C08"}} onClick={()=>sSN(null)}>
      <svg style={{position:"absolute",top:0,left:0,width:"100%",height:"100%",pointerEvents:"none"}}>
        {nodes.conns.map((c,i)=><line key={i} x1={nodes.pos[c.i].x} y1={nodes.pos[c.i].y} x2={nodes.pos[c.j].x} y2={nodes.pos[c.j].y} stroke={T.amber} strokeWidth={.5+c.s*.5} strokeOpacity={.08+c.s*.06}/>)}
      </svg>
      {books.map((b,i)=><MapNode key={b.id} b={b} x={nodes.pos[i].x} y={nodes.pos[i].y}/>)}
      {selectedNode&&<NodeDetail pToast={pToast} book={books.find(b=>b.id===selectedNode)} onClose={()=>sSN(null)}/>}
    </div>;
  }

  const renderers={geographic:Geographic,constellation:Constellation,timeline:Timeline,emotional:Emotional,language:LangTree,influence:Influence};
  const Renderer=renderers[para];

  return <div style={{background:T.card,border:`1px solid ${T.border}`,borderRadius:14,padding:"20px",gridColumn:"1 / -1"}} className="full-col fc">
    <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:16,flexWrap:"wrap",gap:8}}>
      <div><h3 style={{fontFamily:T.serif,fontSize:16,fontWeight:700,color:T.ink,marginBottom:2}}>Reader Map</h3><div style={{fontFamily:T.sans,fontSize:11,color:T.ink3}}>{MAP_P[para].desc}</div></div>
      {isOwner&&<span style={{fontFamily:T.sans,fontSize:9,color:T.ink4,fontStyle:"italic"}}>Default: {MAP_P[defaultP]?.label}</span>}
    </div>
    <div style={{display:"flex",gap:4,marginBottom:16,flexWrap:"wrap"}}>{Object.entries(MAP_P).map(([k,v])=><button key={k} onClick={()=>switchPara(k)} style={{padding:"5px 10px",borderRadius:8,fontSize:10,fontWeight:600,fontFamily:T.sans,cursor:"pointer",transition:"all .2s",display:"flex",alignItems:"center",gap:4,background:para===k?`${v.color}12`:"transparent",color:para===k?v.color:T.ink4,border:`1px solid ${para===k?`${v.color}25`:T.border}`}}>{v.icon} {v.label}</button>)}</div>
    <div ref={mapRef} key={fadeKey} style={{overflow:"hidden",borderRadius:10,border:`1px solid ${T.border}`,animation:"mapFade .3s ease",minHeight:260}}><Renderer/></div>
    <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:8,marginTop:12}}>
      <div style={{display:"flex",alignItems:"center",gap:12}}>
        <div style={{display:"flex",alignItems:"center",gap:4}}><div style={{width:6,height:6,borderRadius:"50%",background:T.gold,opacity:.6}}/><span style={{fontFamily:T.sans,fontSize:9,color:T.ink4}}>Low impact</span></div>
        <div style={{display:"flex",alignItems:"center",gap:4}}><div style={{width:14,height:14,borderRadius:"50%",background:T.gold,opacity:.8}}/><span style={{fontFamily:T.sans,fontSize:9,color:T.ink4}}>High impact</span></div>
      </div>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:8,marginTop:10}}>
        <div style={{fontFamily:T.sans,fontSize:10,color:T.ink4,fontStyle:"italic"}}>{books.length} books · {[...new Set(books.map(b=>b.genre))].length} genres · {[...new Set(books.map(b=>b.language?.split(" ")[0]))].length} languages · {Math.min(...books.map(b=>b.year))}–{Math.max(...books.map(b=>b.year))}</div>
        <div style={{display:"flex",alignItems:"center",gap:8}}>
          <span style={{fontFamily:T.sans,fontSize:9,color:T.ink4}}>Impact:</span>
          {[.5,.75,1].map((s,i)=><div key={i} style={{width:6+s*10,height:6+s*10,borderRadius:"50%",background:`radial-gradient(circle,${T.gold},${T.gold}60)`,opacity:.4+s*.4}}/>)}
          <span style={{fontFamily:T.sans,fontSize:8,color:T.ink4,marginLeft:-4}}>high</span>
        </div>
      </div>
    </div>
  </div>;
}

// ═══════════════════════════════════════════════════
// ABOUT TAB
// ═══════════════════════════════════════════════════
function AboutTab({profile,isOwner}){
  const[bExp,sBExp]=useState(false);const tier=getTier(profile.ink);const next=getNext(profile.ink);
  const total=profile.inkBreakdown.creation+profile.inkBreakdown.engagement+profile.inkBreakdown.participation;
  const pC=Math.round(profile.inkBreakdown.creation/total*100),pE=Math.round(profile.inkBreakdown.engagement/total*100),pP=100-pC-pE;
  return <div className="about-g" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
    {/* Tier */}
    <div className="fc" style={{background:T.card,border:`1px solid ${T.border}`,borderRadius:14,padding:"20px"}}>
      <h3 style={{fontFamily:T.serif,fontSize:16,fontWeight:700,color:T.ink,marginBottom:16}}>Ink Tier</h3>
      <div style={{display:"flex",flexDirection:"column",gap:6}}>{TIERS.map((t,i)=>{const isA=profile.ink>=t.min&&(i===TIERS.length-1||profile.ink<TIERS[i+1].min);const isR=profile.ink>=t.min;return <div key={t.name} style={{display:"flex",alignItems:"center",gap:10,padding:"8px 12px",borderRadius:8,background:isA?`${t.color}10`:"transparent",border:isA?`1px solid ${t.color}25`:"1px solid transparent"}}><div style={{width:10,height:10,borderRadius:"50%",background:isR?t.color:T.ink4,opacity:isR?1:.25,boxShadow:isA?`0 0 10px ${t.color}50`:"none"}}/><span style={{fontFamily:T.sans,fontSize:12.5,fontWeight:isA?700:500,color:isR?T.ink:T.ink4,flex:1}}>{t.name}</span><span style={{fontFamily:T.sans,fontSize:10,color:isR?t.color:T.ink4,fontWeight:600}}>{fmt(t.min)}+</span>{isA&&<span style={{fontSize:8,color:t.color}}>◀</span>}</div>;})}</div>
      {next?<div style={{marginTop:14,padding:"10px 12px",borderRadius:8,background:`${next.color}06`,border:`1px solid ${next.color}12`}}><div style={{fontFamily:T.sans,fontSize:11,color:T.ink3,marginBottom:6}}><strong style={{color:next.color}}>{fmt(next.min-profile.ink)}</strong> Ink to <strong style={{color:T.ink}}>{next.name}</strong></div><div style={{height:6,borderRadius:3,background:`${T.ink4}20`,overflow:"hidden"}}><div style={{height:"100%",borderRadius:3,background:next.color,width:`${Math.min(100,((profile.ink-tier.min)/(next.min-tier.min))*100)}%`}}/></div></div>
      :<div style={{marginTop:14,padding:"10px 12px",borderRadius:8,background:`${T.accent}06`,border:`1px solid ${T.accent}12`,fontFamily:T.sans,fontSize:11,color:T.accent,fontWeight:600}}>✦ Maximum tier reached</div>}
      <div style={{marginTop:10,padding:"8px 12px",borderRadius:8,background:T.goldGlow,fontFamily:T.sans,fontSize:11,color:T.ink3,lineHeight:1.5,border:`1px solid ${T.border}`}}><strong style={{color:T.ink}}>Era 1 Member</strong> · Thresholds grandfathered permanently.</div>
    </div>
    {/* Activity + Bound */}
    <div style={{display:"flex",flexDirection:"column",gap:12}}>
      <div className="fc" style={{background:T.card,border:`1px solid ${T.border}`,borderRadius:14,padding:"20px"}}><h3 style={{fontFamily:T.serif,fontSize:16,fontWeight:700,color:T.ink,marginBottom:16}}>Reading Activity</h3>{[{l:"Books finished",v:String(profile.stats.books)},{l:"Current streak",v:`${profile.streak.current} days 🔥`},{l:"Best streak",v:`${profile.streak.best} days`},{l:"Quality streak",v:`${profile.streak.quality} days ✦`},{l:"Member since",v:profile.joined}].map(s=><div key={s.l} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"9px 0",borderBottom:`1px solid ${T.border}`}}><span style={{fontFamily:T.sans,fontSize:12,color:T.ink3}}>{s.l}</span><span style={{fontFamily:T.sans,fontSize:13,fontWeight:700,color:T.ink}}>{s.v}</span></div>)}</div>
      {/* Bound — click-through with links */}
      <div className="fc" style={{background:T.card,border:`1px solid ${T.plum}12`,borderRadius:14,padding:"16px 20px",cursor:profile.boundWith.length>0?"pointer":"default"}} onClick={()=>profile.boundWith.length>0&&sBExp(!bExp)}>
        <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:6}}><span style={{fontSize:14,opacity:.7}}>⚭</span><h3 style={{fontFamily:T.serif,fontSize:14,fontWeight:700,color:T.ink}}>Bound</h3>{profile.boundWith.length>0&&<span style={{fontFamily:T.sans,fontSize:10,color:T.plum,marginLeft:"auto"}}>{bExp?"▲":"▼"}</span>}</div>
        {profile.boundWith.length>0?<><div style={{display:"flex",alignItems:"center",gap:8}}><div style={{display:"flex"}}>{profile.boundWith.slice(0,3).map((u,i)=><div key={i} style={{marginLeft:i>0?-5:0,position:"relative",zIndex:3-i}}><MAv i={u.initials} c={T.plum} s={22}/></div>)}</div><span style={{fontFamily:T.sans,fontSize:11,color:T.ink3}}>Bound with {profile.boundWith.length} readers</span></div>
        {bExp&&<div style={{marginTop:12,paddingTop:12,borderTop:`1px solid ${T.plum}10`,display:"flex",flexDirection:"column",gap:8}} onClick={e=>e.stopPropagation()}>
          {profile.boundWith.map((bond,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:10,padding:"8px 10px",borderRadius:8,background:`${T.plum}04`}}>
            <MAv i={bond.initials} c={T.plum} s={24}/>
            <div style={{flex:1,minWidth:0}}>
              <div style={{display:"flex",alignItems:"center",gap:6}}><span tabIndex={0} role="link" onClick={()=>pToast(`Opening ${bond.name}’s profile…`)} onKeyDown={e=>{if(e.key==="Enter")e.target.click();}} style={{fontFamily:T.sans,fontSize:11,fontWeight:600,color:T.ink,cursor:"pointer",textDecoration:"underline",textDecorationColor:`${T.plum}30`}}>{bond.name}</span><span style={{fontFamily:T.sans,fontSize:9,color:T.ink4}}>{bond.handle}</span></div>
              <div style={{fontFamily:T.sans,fontSize:9,color:T.ink3,marginTop:2}}>
                {isOwner?"You":"They"} shelved <span tabIndex={0} role="link" onClick={()=>pToast(`Opening \u201C${bond.theirPiece}\u201D…`)} onKeyDown={e=>{if(e.key==="Enter")e.target.click();}} style={{color:T.plum,fontStyle:"italic",cursor:"pointer"}}>"{bond.theirPiece}"</span> → <span style={{color:T.ink4,fontSize:8}}>in "{bond.theirShelf}"</span>
                {" · "}{bond.name.split(" ")[0]} shelved <span tabIndex={0} role="link" onClick={()=>pToast(`Opening \u201C${bond.yourPiece}\u201D…`)} onKeyDown={e=>{if(e.key==="Enter")e.target.click();}} style={{color:T.plum,fontStyle:"italic",cursor:"pointer"}}>"{bond.yourPiece}"</span>
              </div>
            </div>
          </div>)}
        </div>}</>
        :<p style={{fontFamily:T.body,fontSize:12,color:T.ink4,fontStyle:"italic",lineHeight:1.5}}>{isOwner?"When you and another reader shelf each other's work, a Bound connection forms.":"Bound connections form through reciprocal shelving."}</p>}
      </div>
    </div>
    {/* Ink Breakdown */}
    <div style={{background:T.card,border:`1px solid ${T.border}`,borderRadius:14,padding:"20px",gridColumn:"1 / -1"}} className="full-col fc">
      <h3 style={{fontFamily:T.serif,fontSize:16,fontWeight:700,color:T.ink,marginBottom:16}}>{isOwner?"Your Ink Dashboard":"Ink Breakdown"}</h3>
      <div style={{display:"flex",alignItems:"center",gap:24,flexWrap:"wrap"}}>
        <div style={{flex:1,minWidth:260}}>
          <div style={{display:"flex",height:10,borderRadius:5,overflow:"hidden",marginBottom:16}}><div style={{width:`${pC}%`,background:T.accent}}/><div style={{width:`${pE}%`,background:T.gold}}/><div style={{width:`${pP}%`,background:T.green}}/></div>
          <div style={{display:"flex",gap:28,flexWrap:"wrap"}}>{[{l:"Creation",v:profile.inkBreakdown.creation,c:T.accent,p:pC},{l:"Engagement",v:profile.inkBreakdown.engagement,c:T.gold,p:pE},{l:"Participation",v:profile.inkBreakdown.participation,c:T.green,p:pP}].map(s=><div key={s.l}><div style={{display:"flex",alignItems:"center",gap:5,marginBottom:4}}><div style={{width:8,height:8,borderRadius:2,background:s.c}}/><span style={{fontFamily:T.sans,fontSize:11,color:T.ink3}}>{s.l}</span></div><span style={{fontFamily:T.sans,fontSize:20,fontWeight:700,color:T.ink}}>{fmt(s.v)}</span><span style={{fontFamily:T.sans,fontSize:11,color:T.ink4,marginLeft:4}}>{s.p}%</span></div>)}</div>
          {isOwner&&profile.inkHistory&&<div style={{marginTop:20}}><div style={{fontFamily:T.sans,fontSize:11,fontWeight:700,color:T.ink3,letterSpacing:".5px",textTransform:"uppercase",marginBottom:10}}>Weekly Accrual</div><div style={{display:"flex",gap:4,alignItems:"flex-end",height:70}}>{profile.inkHistory.map((m,i)=>{const mt=m.c+m.e+m.pa;const mx=Math.max(...profile.inkHistory.map(x=>x.c+x.e+x.pa));const sc=55/mx;return <div key={i} style={{flex:1,textAlign:"center"}} title={`${m.p}: ${mt} Ink`}><div style={{display:"flex",flexDirection:"column-reverse",alignItems:"center"}}><div style={{width:"100%",maxWidth:32,borderRadius:3,overflow:"hidden"}}><div style={{height:m.c*sc,background:T.accent}}/><div style={{height:m.e*sc,background:T.gold}}/><div style={{height:m.pa*sc,background:T.green}}/></div></div><div style={{fontFamily:T.sans,fontSize:7,color:T.ink4,marginTop:3,whiteSpace:"nowrap"}}>{m.p.split(" ")[0]}<br/>{m.p.split(" ")[1]}</div></div>;})}</div></div>}
        </div>
        <div style={{textAlign:"center",flexShrink:0,minWidth:90}}><div style={{fontFamily:T.sans,fontSize:38,fontWeight:800,color:tier.color,lineHeight:1}}>{fmt(profile.ink)}</div><div style={{fontFamily:T.sans,fontSize:11,fontWeight:700,color:tier.color,marginTop:4,opacity:.7}}>{tier.name}</div></div>
      </div>
    </div>
    {/* Reader Map */}
    <ReaderMap books={BOOKS} defaultP={profile.defaultMap} isOwner={isOwner} seeded={profile.mapSeeded}/>
    {/* Reading Pace Insight */}
    <div style={{background:T.card,border:`1px solid ${T.border}`,borderRadius:14,padding:"20px",gridColumn:"1 / -1"}} className="full-col fc">
      <h3 style={{fontFamily:T.serif,fontSize:16,fontWeight:700,color:T.ink,marginBottom:12}}>Reading Pace</h3>
      <div style={{display:"flex",gap:20,flexWrap:"wrap",marginBottom:12}}>
        {[{n:profile.stats.books,l:"Books this year",c:T.gold},{n:Math.round(profile.stats.books/8*10)/10,l:"Books / month",c:T.green},{n:profile.streak.current,l:"Day streak",c:T.accent}].map(s=><div key={s.l} style={{textAlign:"center"}}><div style={{fontFamily:T.sans,fontSize:22,fontWeight:800,color:s.c}}>{s.n}</div><div style={{fontFamily:T.sans,fontSize:10,color:T.ink3,fontWeight:500}}>{s.l}</div></div>)}
      </div>
      <div style={{fontFamily:T.body,fontSize:12,color:T.ink3,fontStyle:"italic",lineHeight:1.6}}>At this pace, {isOwner?"you":"they"}{"\u2019"}ll read {Math.round(profile.stats.books/8*12)} books by year end. {profile.stats.books>=10?"That\u2019s a library in the making.":"Every book deepens the map."}</div>
    </div>
    {/* Invite */}
    {isOwner&&<div style={{background:`linear-gradient(135deg,${T.card},${T.goldGlow})`,border:`1px solid ${T.gold}12`,borderRadius:14,padding:"20px",gridColumn:"1 / -1",textAlign:"center"}} className="full-col">
      <div style={{fontFamily:T.serif,fontSize:16,fontWeight:700,color:T.ink,marginBottom:6}}>Grow the conversation</div>
      <div style={{fontFamily:T.body,fontSize:12,color:T.ink3,lineHeight:1.6,maxWidth:400,margin:"0 auto 14px"}}>Pr{"\u00E9"}cis is built by readers inviting readers. Every voice changes the feed.</div>
      <button onClick={()=>pToast("\u2197 Invite link copied!")} style={{padding:"10px 24px",borderRadius:10,border:"none",background:`linear-gradient(135deg,${T.accent},#9E4520)`,fontFamily:T.sans,fontSize:12,fontWeight:700,color:"#fff",cursor:"pointer",boxShadow:`0 2px 12px ${T.accent}30`}}>Copy your invite link</button>
    </div>}
  </div>;
}

// ═══════════════════════════════════════════════════
// MAIN
// ═══════════════════════════════════════════════════
export default function PrecisProfile(){
  const{theme,tid,setTid}=useTheme();T=theme;
  const[tab,sTab]=useState("posts");const[fol,sFol]=useState(false);const[sticky,sSticky]=useState(false);
  const[loaded,sL]=useState(false);const[empty,sE]=useState(false);const[owner,sO]=useState(false);
  const[modal,sM]=useState(false);const[tK,sTK]=useState(0);const hRef=useRef(null);
  const[tierCeleb,sTierCeleb]=useState(null);

  useEffect(()=>{sL(true);
    // Demo: show tier celebration on first load (simulates crossing a threshold)
    const tier=getTier(PROFILE.ink);
    setTimeout(()=>sTierCeleb(tier),1200);
  },[]);
  useEffect(()=>{const o=new IntersectionObserver(([e])=>sSticky(!e.isIntersecting),{threshold:0,rootMargin:"-56px 0px 0px 0px"});if(hRef.current)o.observe(hRef.current);return()=>o.disconnect();},[]);

  const TABS=[{id:"posts",l:"Posts",ic:"✍",c:empty?0:PROFILE.stats.posts},{id:"shelves",l:"Shelves",ic:"📚",c:empty?0:SHELVES.length},{id:"waypoints",l:"Waypoints",ic:"⟐",c:empty?0:WAYPOINTS.length},{id:"about",l:"About",ic:"◉",c:null}];

  return <div style={{minHeight:"100vh",background:T.bg,color:T.ink}}>
    <style>{CSS}</style>
    <a href="#profile-content" className="skip-link">Skip to profile content</a>
    <div id="p-toast" style={{display:"none",position:"fixed",bottom:24,left:"50%",transform:"translateX(-50%)",padding:"10px 24px",borderRadius:10,background:T.bg2,border:`1px solid ${T.borderHover}`,boxShadow:"0 8px 32px rgba(0,0,0,.4)",fontFamily:T.sans,fontSize:12,fontWeight:700,color:T.ink,zIndex:300,animation:"fadeUp .3s ease"}}/>
    {modal&&<EditModal pToast={pToast} profile={PROFILE} onClose={()=>sM(false)} onSave={(data)=>{PROFILE.bio=data.bio;PROFILE.lens=data.lens;PROFILE.defaultMap=data.defaultMap;if(data.currentlyReading)PROFILE.currentlyReading=data.currentlyReading;}}/>}
    {tierCeleb&&<TierCelebration tier={tierCeleb} onDismiss={()=>sTierCeleb(null)}/>}
    <nav role="navigation" aria-label="Main navigation" style={{position:"sticky",top:0,zIndex:100,background:`${T.bg}E6`,backdropFilter:"blur(24px) saturate(1.2)",borderBottom:`1px solid ${T.border}`}}><div className="nav-i" style={{maxWidth:1100,margin:"0 auto",padding:"0 28px",display:"flex",alignItems:"center",height:56,gap:16}}>
      <span onClick={()=>pToast("Navigating to Feed\u2026")} style={{fontFamily:T.serif,fontSize:22,fontWeight:700,color:T.ink,letterSpacing:"-.5px",cursor:"pointer"}}>Pr<span style={{color:T.accent}}>é</span>cis</span>
      <span onClick={()=>pToast("Navigating to Feed\u2026")} className="nav-bc" style={{fontFamily:T.sans,fontSize:12,color:T.ink3,cursor:"pointer"}}>←</span>
      <span className="nav-bc" style={{fontFamily:T.sans,fontSize:13,fontWeight:600,color:T.ink2}}>{owner?"Your Profile":PROFILE.name}</span>
      <div style={{flex:1}}/>
      <div style={{display:"flex",gap:6}}>
        <button onClick={()=>sO(!owner)} style={{padding:"4px 10px",borderRadius:6,fontSize:10,fontWeight:600,fontFamily:T.sans,cursor:"pointer",background:owner?`${T.blue}15`:T.bg3,color:owner?T.blue:T.ink3,border:`1px solid ${owner?`${T.blue}30`:T.border}`}}>{owner?"Owner":"Visitor"}</button>
        <button onClick={()=>sE(!empty)} style={{padding:"4px 10px",borderRadius:6,fontSize:10,fontWeight:600,fontFamily:T.sans,cursor:"pointer",background:empty?`${T.red}15`:T.bg3,color:empty?T.red:T.ink3,border:`1px solid ${empty?`${T.red}30`:T.border}`}}>{empty?"Empty":"Filled"}</button>
      </div>
      <div style={{display:"flex",alignItems:"center",gap:8,marginLeft:8}}><ThemeSwitcher tid={tid} setTid={setTid}/><Av i={owner?"PA":"SP"} ink={owner?12300:1240} s={30}/><span style={{fontFamily:T.sans,fontSize:12,fontWeight:600,color:T.ink}}>{owner?"Priya":"Sean"}</span></div>
    </div></nav>
    <StickyBar profile={PROFILE} vis={sticky} isOwner={owner} isFollowing={fol} onFollow={()=>sFol(!fol)} onEdit={()=>sM(true)}/>
    <Header profile={PROFILE} isOwner={owner} isFollowing={fol} onFollow={()=>sFol(!fol)} onEdit={()=>sM(true)} headerRef={hRef}/>
    <div style={{background:`${T.bg}E6`,borderBottom:`1px solid ${T.border}`,position:"sticky",top:56,zIndex:50,backdropFilter:"blur(16px)"}}><div className="cmx" style={{maxWidth:860,margin:"0 auto",padding:"0 28px",display:"flex",gap:0}} role="tablist" aria-label="Profile sections">
      {TABS.map(t=><button key={t.id} id={`tab-${t.id}`} role="tab" aria-selected={tab===t.id} aria-controls="profile-content" className="tb" data-a={tab===t.id?"true":"false"} onClick={()=>{if(t.id!==tab){sTab(t.id);sTK(k=>k+1);window.scrollTo({top:0,behavior:"smooth"});}}} style={{padding:"14px 20px",border:"none",cursor:"pointer",fontFamily:T.sans,fontSize:13,fontWeight:600,background:"transparent",transition:"all .2s",color:tab===t.id?T.ink:T.ink3,borderBottom:tab===t.id?`2px solid ${T.accent}`:"2px solid transparent",display:"flex",alignItems:"center",gap:6}}>
        <span style={{fontSize:14}}>{t.ic}</span><span className="tl">{t.l}</span>{t.c!==null&&<span style={{padding:"1px 6px",borderRadius:10,fontSize:10,fontWeight:700,background:tab===t.id?`${T.accent}15`:T.bg3,color:tab===t.id?T.accent:T.ink4}}>{t.c}</span>}
      </button>)}
    </div></div>
    <div key={tK} id="profile-content" role="tabpanel" aria-labelledby={`tab-${tab}`} className="tab-c tab-enter" style={{maxWidth:860,margin:"0 auto",padding:"20px 28px 60px"}}>
      {tab==="posts"&&<PostsTab posts={POSTS} isOwner={owner} isEmpty={empty} cr={PROFILE.currentlyReading}/>}
      {tab==="shelves"&&<ShelvesTab shelves={SHELVES} isOwner={owner} isEmpty={empty}/>}
      {tab==="waypoints"&&<WaypointsTab waypoints={WAYPOINTS} isOwner={owner} isEmpty={empty}/>}
      {tab==="about"&&<AboutTab profile={PROFILE} isOwner={owner}/>}
    </div>

    {/* Mobile Bottom Nav */}
    <nav className="mob-nav" aria-label="Mobile navigation" style={{position:"fixed",bottom:0,left:0,right:0,zIndex:200,background:`${T.bg}F2`,backdropFilter:"blur(20px)",borderTop:`1px solid ${T.border}`,display:"none",padding:"6px 0 env(safe-area-inset-bottom,8px)"}}>
      <div style={{display:"flex",justifyContent:"space-around",maxWidth:480,margin:"0 auto"}}>
        {[
          {id:"feed",icon:"\u25A3",label:"Feed",active:false},
          {id:"explore",icon:"\uD83C\uDF0D",label:"Explore",active:false},
          {id:"press",icon:"\uD83D\uDCF0",label:"The Press",active:false},
          {id:"compose",icon:"\u270D",label:"Write",active:false},
          {id:"shelf",icon:"\u25C6",label:"Shelf",active:false},
          {id:"profile",icon:"\u25CF",label:"Profile",active:true}
        ].map(n=><button key={n.id} onClick={()=>pToast(n.active?"":`Opening ${n.label}\u2026`)}
          style={{display:"flex",flexDirection:"column",alignItems:"center",gap:2,padding:"6px 12px",border:"none",background:"none",cursor:"pointer",minWidth:48,minHeight:44}}>
          <span style={{fontSize:18,opacity:n.active?1:.5}}>{n.icon}</span>
          <span style={{fontFamily:T.sans,fontSize:9,fontWeight:n.active?700:500,color:n.active?T.gold:T.ink4}}>{n.label}</span>
        </button>)}
      </div>
    </nav>
  </div>;
}
