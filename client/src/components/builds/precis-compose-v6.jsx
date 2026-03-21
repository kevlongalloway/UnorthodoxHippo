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
      style={{display:"flex",alignItems:"center",justifyContent:"center",width:36,height:36,borderRadius:"50%",border:`1.5px solid ${T.gold}40`,background:`${T.gold}10`,cursor:"pointer",fontSize:13,transition:"all .2s",opacity:open?.9:.7}}
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


// ═══════════════════════════════════════════════════
// CONTENT TYPES — lens-aware placeholders, hints, ghost prompts
// ═══════════════════════════════════════════════════
const TYPES={
  original:{id:"original",label:"Original Work",icon:"\u270D",color:T.accent,
    desc:"Fiction, poetry, flash prose — your voice, your page.",
    fields:{title:true,bookTag:"optional",spoilerPage:false},ink:{base:15,pw:0.05},
    ph:{analyst:"Construct the architecture of what you see\u2026",empath:"Begin with the feeling. The words will follow\u2026",philosopher:"What question does this piece ask?",storyteller:"Once upon a never\u2026",explorer:"Take me somewhere I haven\u2019t been\u2026",alchemist:"Two threads. One needle. Begin\u2026",_:"Begin writing\u2026"},
    hint:{analyst:"Structure it however the piece demands. Let the architecture speak.",empath:"No word count. No rules. Just the thing you need to say.",philosopher:"The question matters more than the answer.",storyteller:"Every story is a door — open it.",explorer:"Map the territory only you can see.",alchemist:"The best synthesis reveals what was always there. Find the thread.",_:"No word count. No rules. Just the thing you need to say."},
    ghost:{analyst:["What\u2019s the structure beneath?","Where does the tension live?","What would a reader miss on first pass?","What counterargument does the piece make against itself?"],empath:["What does this feel like in the body?","Where does the grief live?","What would your younger self need to hear?","What breaks open here?"],philosopher:["What question refuses to resolve?","What assumption does this challenge?","Where does meaning collapse?"],storyteller:["What happens next?","Who\u2019s watching from the doorway?","What does the room smell like?","What lie does the character tell themselves?"],explorer:["Where does this take us?","What\u2019s unfamiliar here?","What border are we crossing?"],alchemist:["What pattern do these share?","Where does the unexpected connection live?","What transforms when you name the link?"],_:["Keep going.","What comes next?","Trust the sentence.","Don\u2019t look back yet."]}},
  review:{id:"review",label:"Review",icon:"\uD83D\uDCDD",color:T.gold,
    desc:"Your honest reading of a book — what it did to you and why.",
    fields:{title:false,bookTag:"required",spoilerPage:false},ink:{base:10,pw:0.04},
    ph:{analyst:"What is this book actually doing at a structural level?",empath:"What did this book do to you?",philosopher:"What question does this book refuse to answer?",storyteller:"If this book were a person, who would it be?",explorer:"Where did this book take you?",alchemist:"What does this book illuminate in another book?",_:"What did this book do to you?"},
    hint:{analyst:"Disassemble the machinery. Show us how it works.",empath:"They\u2019re reckoning. Say what the book earned from you.",philosopher:"They\u2019re arguments with the author. Make yours.",storyteller:"Tell us the story of reading this book.",explorer:"Map the territory the author carved.",alchemist:"Reviews are bridges. Show what this book connects to.",_:"Reviews on Pr\u00E9cis aren\u2019t ratings. They\u2019re reckoning."},
    ghost:{analyst:["What\u2019s the weakest structural choice?","How does the pacing serve the argument?","Where does the prose do heavy lifting?","What would you cut?"],empath:["What surprised you emotionally?","Where did you have to put the book down?","What character lives in your body now?"],philosopher:["What\u2019s the book\u2019s hidden thesis?","Where does the author contradict themselves?","What worldview does this assume?"],storyteller:["When did you know what kind of book this was?","What scene will you remember in ten years?"],explorer:["What world does this book build?","Where does the familiar become strange?"],alchemist:["What other book does this one argue with?","What pattern crosses both?","Where does the synthesis happen?"],_:["What surprised you?","What will you remember?","Who needs to read this?"]}},
  recommendation:{id:"recommendation",label:"Recommendation",icon:"\uD83D\uDCDA",color:T.green,
    desc:"Point someone toward a book that matters.",
    fields:{title:false,bookTag:"required",spoilerPage:false},ink:{base:8,pw:0.03},
    ph:{analyst:"Here\u2019s why this book works, structurally\u2026",empath:"If you\u2019ve ever felt\u2026",philosopher:"This book asks a question you need to sit with\u2026",storyteller:"Let me tell you about a book that\u2026",explorer:"This book will take you somewhere\u2026",alchemist:"Read this, then read that. Here\u2019s why\u2026",_:"If you\u2019ve ever felt\u2026"},
    hint:{analyst:"Be specific about craft.",empath:"Describe the reader who needs this book.",philosopher:"Frame the question, not the answer.",storyteller:"Tell us your encounter.",explorer:"Show us where this book goes.",alchemist:"The best recs are bridges between two worlds. Build one.",_:"Best recs don\u2019t summarize — they describe the reader who needs this book."},
    ghost:{analyst:["What makes the craft exceptional?","Who specifically benefits?"],empath:["Who needs this book right now?","What emotional state does this speak to?"],philosopher:["What perspective shift does this create?"],storyteller:["How would you hand this to someone?","What\u2019s the hook?"],explorer:["What territory does this open?"],alchemist:["What book does this one make better?","Pair them: what emerges?","What\u2019s the shared frequency?"],_:["Who needs this?","What\u2019s the hook?","Why now?"]}},
  spoiler:{id:"spoiler",label:"Spoiler Zone",icon:"\uD83D\uDD13",color:T.red,
    desc:"For the things you can only say to someone who\u2019s been there.",
    fields:{title:false,bookTag:"required",spoilerPage:true},ink:{base:8,pw:0.03},
    ph:{analyst:"Let\u2019s talk about the structural turn at\u2026",empath:"Can we talk about what happens when\u2026",philosopher:"The philosophical implications of the ending\u2026",storyteller:"So that scene where\u2026",explorer:"The twist changes the entire map\u2026",alchemist:"Now that we know \u2014 what else changes across the shelf?",_:"Behind this door\u2026"},
    hint:{analyst:"Dissect freely.",empath:"Feel freely.",philosopher:"Question freely.",storyteller:"Spoil freely.",explorer:"Explore freely.",alchemist:"Synthesize freely. The spoiler is the key that unlocks other books.",_:"Everything past the gate is fair game."},
    ghost:{analyst:["How does this reveal recontextualize the structure?","Is the twist earned?"],empath:["How did it feel when you realized?","Did the ending heal or wound?"],philosopher:["Does the ending validate the book\u2019s thesis?"],storyteller:["When exactly did you know?","What detail made it click?"],explorer:["Where does the story actually go?"],alchemist:["How does this ending rewrite another book?","What pattern does the twist confirm?","What were you wrong about?"],_:["What do you need to say?","What surprised you?"]}},
};

// ═══════════════════════════════════════════════════
// CURATED TAG SYSTEM — Genre/Form + Mood/Texture
// ═══════════════════════════════════════════════════
const GENRE_TAGS={
  fiction:["Literary Fiction","Speculative / Sci-Fi","Fantasy","Horror","Romance","Mystery / Thriller","Historical","Satire / Humor","Magical Realism","Experimental"],
  nonfiction:["Personal Essay","Cultural Criticism","Memoir","Travel","Nature / Place","Philosophy","Craft / Writing","Music / Art","Food / Body","Political"],
  poetry:["Free Verse","Formal / Structured","Prose Poetry","Narrative Poetry","Ekphrastic","Experimental"],
};
const MOOD_TAGS=["Quiet","Visceral","Tender","Dark","Playful","Elegiac","Urgent","Meditative","Sharp","Lush","Sparse","Haunting","Warm","Unsettling","Luminous"];

const LENSES={analyst:{icon:"\uD83D\uDD2C",label:"Analyst",color:"#5B9BD5",desc:"Structure, craft, architecture"},empath:{icon:"\uD83D\uDC96",label:"Empath",color:"#D4788C",desc:"Feeling, resonance, nerve"},philosopher:{icon:"\uD83D\uDCA1",label:"Philosopher",color:T.gold,desc:"Ideas, questions, meaning"},storyteller:{icon:"\uD83C\uDFAD",label:"Storyteller",color:"#9B7ED4",desc:"Narrative, scene, voice"},explorer:{icon:"\uD83D\uDDFA\uFE0F",label:"Explorer",color:"#5BAD7A",desc:"Discovery, territory, wonder"},alchemist:{icon:"\u2727",label:"Alchemist",color:"#C4A06A",desc:"Synthesis, connection, transformation"}};

// ═══════════════════════════════════════════════════
// MOCK DATA
// ═══════════════════════════════════════════════════
const BOOK_DB=[
  {id:"bk1",title:"Beloved",author:"Toni Morrison",year:1987,pages:324,reviews:47,waypoints:12,spoilers:{184:3,250:7,324:12},trending:true,yours:["review"],related:["bk7","bk11"]},
  {id:"bk2",title:"The God of Small Things",author:"Arundhati Roy",year:1997,pages:340,reviews:31,waypoints:8,spoilers:{},trending:true,yours:["recommendation"],related:[]},
  {id:"bk3",title:"Intermezzo",author:"Sally Rooney",year:2024,pages:448,reviews:89,waypoints:24,spoilers:{220:4,350:6},trending:true,yours:[],related:["bk13","bk14"]},
  {id:"bk4",title:"One Hundred Years of Solitude",author:"Gabriel Garc\u00EDa M\u00E1rquez",year:1967,pages:417,reviews:56,waypoints:15,spoilers:{},trending:false,yours:[],related:[]},
  {id:"bk5",title:"Kokoro",author:"Natsume S\u014Dseki",year:1914,pages:248,reviews:18,waypoints:5,spoilers:{200:2},trending:false,yours:[],related:[]},
  {id:"bk6",title:"Things Fall Apart",author:"Chinua Achebe",year:1958,pages:209,reviews:42,waypoints:11,spoilers:{},trending:false,yours:[],related:["bk15"]},
  {id:"bk7",title:"Song of Solomon",author:"Toni Morrison",year:1977,pages:337,reviews:29,waypoints:7,spoilers:{},trending:false,yours:[],related:["bk1","bk11"]},
  {id:"bk8",title:"Persepolis",author:"Marjane Satrapi",year:2000,pages:153,reviews:34,waypoints:4,spoilers:{},trending:false,yours:[],related:[]},
  {id:"bk9",title:"Convenience Store Woman",author:"Sayaka Murata",year:2016,pages:163,reviews:61,waypoints:19,spoilers:{140:5},trending:false,yours:[],related:[]},
  {id:"bk10",title:"The Stranger",author:"Albert Camus",year:1942,pages:123,reviews:73,waypoints:22,spoilers:{100:3,123:8},trending:false,yours:[],related:[]},
  {id:"bk11",title:"Sula",author:"Toni Morrison",year:1973,pages:174,reviews:15,waypoints:3,spoilers:{},trending:false,yours:[],related:["bk1","bk7"]},
  {id:"bk12",title:"The Bell Jar",author:"Sylvia Plath",year:1963,pages:234,reviews:88,waypoints:14,spoilers:{},trending:false,yours:[],related:[]},
  {id:"bk13",title:"Normal People",author:"Sally Rooney",year:2018,pages:273,reviews:102,waypoints:18,spoilers:{},trending:false,yours:[],related:["bk3","bk14"]},
  {id:"bk14",title:"Beautiful World, Where Are You",author:"Sally Rooney",year:2021,pages:356,reviews:67,waypoints:14,spoilers:{},trending:false,yours:[],related:["bk3","bk13"]},
  {id:"bk15",title:"No Longer at Ease",author:"Chinua Achebe",year:1960,pages:170,reviews:22,waypoints:6,spoilers:{},trending:false,yours:[],related:["bk6"]},
];

// ═══════════════════════════════════════════════════
// CROSS-BOOK SPOILER DETECTION
// ═══════════════════════════════════════════════════
const SPOILER_PHRASES=[
  {re:/\b(dies|death of|kills?|killed|murder(?:s|ed)?|suicide)\b/gi,reason:"character fate",severity:"high"},
  {re:/\b(it turns out|the twist is|we (?:later )?(?:learn|discover|find out)|is actually|was really|reveal(?:s|ed)?(?:\s+that)?|the ending|at the end|final(?:ly|e)?|conclusion)\b/gi,reason:"plot reveal",severity:"high"},
  {re:/\b(in the (?:next|second|third|final|last) (?:book|novel|installment|volume))\b/gi,reason:"series progression",severity:"high"},
  {re:/\b((?:by|in|during) the sequel|later in the series|the series (?:ends|concludes|reveals)|across (?:the|all) (?:books|novels)|throughout the (?:trilogy|series|saga))\b/gi,reason:"series spoiler",severity:"high"},
  {re:/\b(betrays?|betrayal|affair|secret(?:ly)?|pregnant|marriage|divorce|identity|true (?:father|mother|parent|name|identity))\b/gi,reason:"character development",severity:"medium"},
  {re:/\b(survives?|escapes?|returns?|comes back|resurrection|reappears?)\b/gi,reason:"character fate",severity:"medium"},
  {re:/\b(unlike (?:in|his|her)|compared to (?:his|her) (?:earlier|later|previous|next)|whereas in|but in (?:the (?:next|previous|earlier|later)))\b/gi,reason:"cross-book comparison",severity:"medium"},
];

// Character-name + fate-verb proximity detector
// Catches patterns like "Milkman discovers", "Sethe's choice", "Connell collapses"
const FATE_VERBS=/\b(dies|kills?|discovers?|reveals?|chooses?|confesses?|betrays?|collapses?|escapes?|survives?|sacrifices?|transforms?|returns?|abandons?|forgives?|murders?|marries?)\b/gi;
const POSSESSIVE_FATE=/\b(\w+)(?:'s|s')\s+(death|secret|choice|betrayal|murder|sacrifice|confession|identity|transformation|return|escape|fate|downfall|breakdown|affair)\b/gi;

function detectSpoilerRisk(text,taggedBook,allBooks){
  if(!text||text.length<30||!taggedBook)return{detected:false,triggers:[],crossBooks:[],severity:"none"};
  const low=text.toLowerCase();
  const triggers=[];const crossBooks=new Set();

  // 1. Detect mentions of other books by same author or in related list
  const relatedIds=taggedBook.related||[];
  const sameAuthorBooks=allBooks.filter(b=>b.author===taggedBook.author&&b.id!==taggedBook.id);
  const relatedBooks=[...new Map([...sameAuthorBooks,...allBooks.filter(b=>relatedIds.includes(b.id))].map(b=>[b.id,b])).values()];

  for(const rb of relatedBooks){
    const titleLow=rb.title.toLowerCase();
    const titleWords=titleLow.split(/\s+/);
    const matchFull=low.includes(titleLow);
    const matchPartial=titleWords.length>=3&&titleWords.filter(w=>w.length>3).some(w=>low.includes(w)&&!taggedBook.title.toLowerCase().includes(w));
    if(matchFull||matchPartial){
      crossBooks.add(rb.title);
      triggers.push({type:"cross_book",match:rb.title,reason:`mentions "${rb.title}" by same author`,severity:"high"});
    }
  }

  // 2. Detect spoiler-indicative phrases
  for(const sp of SPOILER_PHRASES){
    const matches=text.match(sp.re);
    if(matches){
      for(const m of matches.slice(0,2)){
        triggers.push({type:"phrase",match:m,reason:sp.reason,severity:sp.severity});
      }
    }
  }

  // 3. Character-name + fate-verb proximity detection
  // Scan for capitalized names near fate verbs within 5-word windows
  const words=text.split(/\s+/);
  for(let i=0;i<words.length;i++){
    const w=words[i];
    // Check if this word is a capitalized name (not start of sentence heuristic: preceded by non-period)
    if(/^[A-Z][a-z]{2,}$/.test(w)){
      // Look for fate verbs within 5 words forward
      const window=words.slice(i,Math.min(i+6,words.length)).join(" ");
      const fateMatch=window.match(FATE_VERBS);
      if(fateMatch){
        // Only flag if the name isn't a common word and appears to be a character
        const nameLow=w.toLowerCase();
        const commonWords=new Set(["the","this","that","what","when","where","which","while","their","there","these","those","after","before","about","every","being","would","could","should","never"]);
        if(!commonWords.has(nameLow)){
          triggers.push({type:"name_fate",match:`${w} … ${fateMatch[0]}`,reason:"character + fate verb",severity:"medium"});
        }
      }
    }
  }

  // 4. Possessive fate patterns: "Sethe's choice", "Milkman's identity"
  const possMatches=[...text.matchAll(POSSESSIVE_FATE)];
  for(const pm of possMatches.slice(0,3)){
    triggers.push({type:"poss_fate",match:`${pm[1]}'s ${pm[2]}`,reason:"character fate reference",severity:"medium"});
  }

  // 5. Determine overall severity
  const hasHigh=triggers.some(t=>t.severity==="high");
  const hasMed=triggers.some(t=>t.severity==="medium");
  const hasCross=crossBooks.size>0;
  // Cross-book + any plot language = definite flag
  // Multiple medium triggers without cross-book = still worth flagging
  const severity=hasCross&&(hasHigh||hasMed)?"high":hasCross||hasHigh?"medium":hasMed&&triggers.length>=3?"low":hasMed&&triggers.length>=2?"low":"none";

  // Deduplicate triggers by match string
  const seen=new Set();const deduped=[];
  for(const t of triggers){const k=t.match.toLowerCase();if(!seen.has(k)){seen.add(k);deduped.push(t);}}

  return{detected:severity!=="none",triggers:deduped,crossBooks:[...crossBooks],severity};
}
const TRENDING=BOOK_DB.filter(b=>b.trending).slice(0,4);
const USER={name:"Priya Anand",initials:"PA",ink:12300,lens:"empath",handle:"@priyareads",followers:892,posts:34};
const MOCK_DRAFTS=[
  {id:"d1",type:"original",title:"The Weight of Names",body:"There is a particular cruelty in naming a child after someone who has died\u2026",savedAt:120,words:47,book:null,lens:"empath"},
  {id:"d2",type:"review",title:"",body:"Morrison doesn\u2019t write sentences. She builds rooms.",savedAt:1440,words:8,book:BOOK_DB[0],lens:"empath"},
];
const REPOST_TARGET={id:"rp1",author:{name:"Kofi Asante",initials:"KA",ink:8750,handle:"@kofi_writes"},type:"original",title:"The Cartographer\u2019s Confession",body:"The first map I ever drew was a lie. I was nine, and my father had asked me to sketch the walk from our house to the schoolyard. I drew it faithfully — the cracked sidewalk past Miss Lorraine\u2019s compound, the shortcut through the empty lot where glass glittered in the dirt like fallen stars, the crossing at Meridian where the light took forever.\n\nBut when I reached the schoolyard itself, I kept drawing.",likes:312,comments:87,shelved:94};

// ═══════════════════════════════════════════════════
// CSS
// ═══════════════════════════════════════════════════
function timeAgo(mins){
  if(mins<1)return "just now";
  if(mins<60)return `${Math.round(mins)}m ago`;
  if(mins<1440)return `${Math.round(mins/60)}h ago`;
  if(mins<2880)return "yesterday";
  return `${Math.round(mins/1440)}d ago`;
}
const CSS=`
.fc{transition:all .22s cubic-bezier(.4,0,.2,1)}.fc:hover{transform:translateY(-2px);box-shadow:0 8px 28px rgba(0,0,0,.25),0 0 0 1px rgba(212,168,85,.06)!important}
.fc2{transition:all .18s}.fc2:hover{filter:brightness(1.08)}
.btn-g{transition:all .15s}.btn-g:hover{color:#D4A855!important}

@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,800;1,400;1,700&family=Source+Serif+4:ital,opsz,wght@0,8..60,300;0,8..60,400;0,8..60,600;1,8..60,300;1,8..60,400&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&display=swap');



*{margin:0;padding:0;box-sizing:border-box;}body{background:${T.bg};}
::selection{background:${T.gold}30;color:${T.ink};}
::-webkit-scrollbar{width:5px;}::-webkit-scrollbar-track{background:transparent;}::-webkit-scrollbar-thumb{background:${T.ink4};border-radius:3px;}
@keyframes fadeUp{from{opacity:0;transform:translateY(12px);}to{opacity:1;transform:none;}}
@keyframes fadeIn{from{opacity:0;}to{opacity:1;}}
@keyframes slideDown{from{opacity:0;transform:translateY(-8px);}to{opacity:1;transform:none;}}
@keyframes slideUp{from{opacity:0;transform:translateY(8px);}to{opacity:1;transform:none;}}
@keyframes pulseGlow{0%,100%{opacity:.4;}50%{opacity:1;}}
@keyframes inkRise{0%{transform:translateY(0) scale(1);opacity:1;}100%{transform:translateY(-50px) scale(1.4);opacity:0;}}
@keyframes cursorBlink{0%,100%{opacity:1;}50%{opacity:0;}}
@keyframes ghostFade{0%{opacity:0;}12%{opacity:.3;}85%{opacity:.3;}100%{opacity:0;}}
@keyframes savedPulse{0%{opacity:0;transform:translateY(2px);}30%{opacity:1;transform:none;}80%{opacity:1;}100%{opacity:0;}}
textarea,input{font-family:${T.body};color:${T.ink};background:transparent;border:none;outline:none;}
textarea{resize:none;width:100%;}textarea::placeholder,input::placeholder{color:${T.ink4};font-style:italic;}
.type-door{cursor:pointer;transition:all .3s ease;}.type-door:hover{transform:translateY(-4px);}
.type-door:focus-visible{outline:2px solid ${T.gold};outline-offset:2px;border-radius:16px;}
.bk-r{cursor:pointer;transition:all .15s;}.bk-r:hover{background:${T.bg3}!important;}
.bk-r:focus-visible{outline:2px solid ${T.gold};outline-offset:-2px;}
.modal-ov{position:fixed;inset:0;background:rgba(0,0,0,.65);z-index:200;display:flex;align-items:center;justify-content:center;animation:fadeIn .15s ease;}
.modal-c{background:${T.bg2};border:1px solid ${T.borderHover};border-radius:16px;max-width:440px;width:92%;max-height:80vh;overflow-y:auto;padding:24px;animation:fadeUp .2s ease;}
.prose-ow p+p{margin-top:0;text-indent:1.5em;}
@media(max-width:768px){.type-grid{grid-template-columns:1fr 1fr!important;}.compose-shell{padding:16px!important;}.nav-i{padding:0 16px!important;}.bb{flex-direction:column!important;gap:12px!important;align-items:stretch!important;}.bb-a{justify-content:stretch!important;}.bb-a button{flex:1!important;}.nav-user-name{display:none!important;}.pub-ctas{flex-direction:column!important;}.pub-ctas button{width:100%!important;}.compose-head{flex-wrap:wrap!important;gap:8px!important;}.compose-stats{font-size:10px!important;gap:6px!important;}.preview-card{padding:16px 18px!important;}.format-card{flex-direction:column!important;align-items:flex-start!important;gap:8px!important;}.format-dots{display:none!important;}.kb-hint{display:none!important;}.compose-body textarea{min-height:160px!important;font-size:14px!important;}}
@media(max-width:480px){.type-grid{grid-template-columns:1fr!important;}.compose-head-actions{flex-wrap:wrap!important;gap:6px!important;}.milestone-toast{font-size:11px!important;padding:10px 16px!important;max-width:calc(100vw - 32px)!important;}.spoiler-warn{padding:12px 14px!important;}.spoiler-triggers{flex-wrap:wrap!important;}.spoiler-actions{flex-direction:column!important;}.spoiler-actions button{width:100%!important;}.pub-share{flex-direction:column!important;}.pub-share button{width:100%!important;}}
@media(prefers-color-scheme:light){body{background:#FAF8F5!important;}*{--lm:1;}}
/* Mobile step wizard */
@media(max-width:640px){.mob-nav{display:flex!important;}.compose-step{padding:14px 16px;border-radius:10px;background:${T.bg3};border:1px solid ${T.border};margin-bottom:10px;}.compose-step-head{display:flex;align-items:center;gap:8px;cursor:pointer;}.compose-step-num{width:22px;height:22px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:700;flex-shrink:0;}.compose-step-done .compose-step-num{background:${T.green}15;color:${T.green};}.compose-step-active .compose-step-num{background:${T.accent}15;color:${T.accent};}.compose-step-pending .compose-step-num{background:${T.ink4}10;color:${T.ink4};}}
@media(min-width:641px){.compose-step{border:none!important;background:transparent!important;padding:0!important;margin-bottom:18px!important;}.compose-step-head{display:none!important;}}

@media(prefers-reduced-motion:reduce){*{animation-duration:0.01ms!important;animation-iteration-count:1!important;transition-duration:0.01ms!important;}}
`;

// ═══════════════════════════════════════════════════
// UTILS
// ═══════════════════════════════════════════════════
const wc=t=>t.trim()?t.trim().split(/\s+/).length:0;
const rt=w=>{const m=Math.ceil(w/200);return m<1?"< 1 min":m+" min read";};
const inkR=(type,w)=>{const t=TYPES[type];if(!t)return{lo:0,hi:0};const b=t.ink.base,wb=Math.round(w*t.ink.pw);return{lo:b+wb,hi:b+wb+Math.round(wb*.6)+5};};
const inkX=(type,w)=>{const r=inkR(type,w);return Math.round((r.lo+r.hi)/2);};
const getTier=v=>{const ts=[{name:"Fresh Ink",min:0,color:T.ink3,bg:"rgba(122,112,103,0.1)"},{name:"Wet Ink",min:25,color:"#8BAAB8",bg:"rgba(139,170,184,0.1)"},{name:"Set Ink",min:100,color:"#A0C090",bg:"rgba(160,192,144,0.1)"},{name:"Deep Ink",min:500,color:T.gold,bg:"rgba(196,162,101,0.1)"},{name:"Indelible",min:2000,color:T.accent,bg:"rgba(184,86,42,0.12)"}];for(let i=ts.length-1;i>=0;i--)if(v>=ts[i].min)return ts[i];return ts[0];};
const fmt=n=>n>=1000?(n/1000).toFixed(1)+"k":String(n);
const smartTypo=t=>t.replace(/--/g,"—").replace(/\.\.\./g,"\u2026");
const fuzzy=(q,title,author)=>{const ws=q.toLowerCase().replace(/[^a-z0-9\s]/g,"").split(/\s+/).filter(Boolean);const h=(title+" "+author).toLowerCase();return ws.every(w=>h.includes(w));};

// ═══════════════════════════════════════════════════
// MICRO COMPONENTS
// ═══════════════════════════════════════════════════
const Av=({i,ink=0,s=38})=>{const t=getTier(ink);return <div style={{width:s,height:s,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,fontFamily:T.sans,fontSize:s*.34,fontWeight:700,color:T.ink2,background:`linear-gradient(145deg,${T.bg3},#0E0C09)`,border:`2.5px solid ${t.color}70`}}>{i}</div>;};
const IB=({ink})=>{const t=getTier(ink);return <span style={{display:"inline-flex",alignItems:"center",gap:3,padding:"2px 7px",borderRadius:5,fontSize:9,fontWeight:700,fontFamily:T.sans,color:t.color,background:`${t.color}12`,border:`1px solid ${t.color}18`}}><span style={{fontSize:7}}>{"\u25CF"}</span>{t.name}</span>;};
const CTP=({type})=>{const c=TYPES[type];return c?<span style={{display:"inline-flex",alignItems:"center",gap:4,padding:"3px 10px",borderRadius:20,fontSize:10.5,fontWeight:600,fontFamily:T.sans,color:c.color,background:`${c.color}12`,border:`1px solid ${c.color}20`}}>{c.icon} {c.label}</span>:null;};

// ═══════════════════════════════════════════════════
// DISCARD CONFIRMATION MODAL
// ═══════════════════════════════════════════════════
function DiscardModal({onDiscard,onCancel,hasContent}){
  return <div className="modal-ov" onClick={onCancel}><div className="modal-c" onClick={e=>e.stopPropagation()}>
    <h3 style={{fontFamily:T.serif,fontSize:20,fontWeight:700,color:T.ink,marginBottom:8}}>Discard this post?</h3>
    <p style={{fontFamily:T.body,fontSize:13,color:T.ink3,lineHeight:1.6,marginBottom:20}}>
      {hasContent?"Your draft has been auto-saved. You can resume it anytime from the drafts panel.":"You haven\u2019t written anything yet. Head back to the type selector?"}
    </p>
    <div style={{display:"flex",gap:10,justifyContent:"flex-end"}}>
      <button onClick={onCancel} style={{padding:"9px 20px",borderRadius:10,fontFamily:T.sans,fontSize:12,fontWeight:700,cursor:"pointer",background:"transparent",color:T.ink3,border:`1px solid ${T.border}`}}>Keep Writing</button>
      <button onClick={onDiscard} style={{padding:"9px 20px",borderRadius:10,fontFamily:T.sans,fontSize:12,fontWeight:700,cursor:"pointer",background:`${T.red}12`,color:T.red,border:`1px solid ${T.red}25`}}>{hasContent?"Discard (draft saved)":"Go back"}</button>
    </div>
  </div></div>;
}

// ═══════════════════════════════════════════════════
// REPOST OVERLAY
// ═══════════════════════════════════════════════════
function RepostOverlay({post,onRepost,onClose}){
  const[note,setNote]=useState("");
  return <div className="modal-ov" onClick={onClose}><div className="modal-c" onClick={e=>e.stopPropagation()} style={{maxWidth:520}}>
    <h3 style={{fontFamily:T.serif,fontSize:20,fontWeight:700,color:T.ink,marginBottom:16}}>Repost to your followers?</h3>
    <div style={{background:T.bg3,border:`1px solid ${T.border}`,borderRadius:10,padding:"14px 16px",marginBottom:16}}>
      <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:8}}>
        <Av i={post.author.initials} ink={post.author.ink} s={24}/>
        <span style={{fontFamily:T.sans,fontSize:12,fontWeight:700,color:T.ink}}>{post.author.name}</span>
        <IB ink={post.author.ink}/>
      </div>
      {post.title&&<div style={{fontFamily:T.serif,fontSize:15,fontWeight:700,color:T.ink,fontStyle:"italic",marginBottom:4}}>{post.title}</div>}
      <div style={{fontFamily:T.body,fontSize:12,color:T.ink3,lineHeight:1.5}}>{post.body.slice(0,150)}{"\u2026"}</div>
      <div style={{display:"flex",gap:12,marginTop:8,fontFamily:T.sans,fontSize:10,color:T.ink4}}>
        <span>{"\u2661"} {post.likes}</span><span>{"\uD83D\uDCAC"} {post.comments}</span><span>{"\u25C6"} {post.shelved}</span>
      </div>
    </div>
    <div style={{marginBottom:16}}>
      <div style={{fontFamily:T.sans,fontSize:10,fontWeight:700,color:T.ink3,letterSpacing:".5px",textTransform:"uppercase",marginBottom:6}}>Add a note (optional)</div>
      <textarea maxLength={280} value={note} onChange={e=>setNote(e.target.value)} placeholder="Why are you sharing this?" rows={3}
        style={{width:"100%",padding:"10px 14px",borderRadius:10,border:`1px solid ${T.border}`,background:T.bg3,fontSize:13,lineHeight:1.6,resize:"vertical"}} aria-label="Why are you sharing this?"/>
      <div style={{fontFamily:T.sans,fontSize:10,color:T.ink4,marginTop:4,textAlign:"right"}}>{note.length}/280</div>
    </div>
    <div style={{display:"flex",gap:10,justifyContent:"flex-end"}}>
      <button onClick={onClose} style={{padding:"9px 20px",borderRadius:10,fontFamily:T.sans,fontSize:12,fontWeight:700,cursor:"pointer",background:"transparent",color:T.ink3,border:`1px solid ${T.border}`}}>Cancel</button>
      <button onClick={()=>onRepost(note)} style={{padding:"9px 24px",borderRadius:10,border:"none",fontFamily:T.sans,fontSize:12,fontWeight:700,cursor:"pointer",background:`linear-gradient(135deg,${T.accent},#9E4520)`,color:"#fff",boxShadow:`0 2px 12px ${T.accent}30`}}>{"\uD83D\uDD04"} Repost</button>
    </div>
  </div></div>;
}

// ═══════════════════════════════════════════════════
// GHOST PROMPT — rotates on idle, lens-specific
// ═══════════════════════════════════════════════════
function GhostPrompt({type,lens,bodyLen,lastKey}){
  const[idx,setIdx]=useState(0);const[vis,setVis]=useState(false);
  const prompts=TYPES[type]?.ghost?.[lens]||TYPES[type]?.ghost?._||[];
  useEffect(()=>{
    if(bodyLen===0||!prompts.length)return;
    const iv=setInterval(()=>{const idle=Date.now()-lastKey;if(idle>4000&&bodyLen>0)setVis(true);else setVis(false);},1000);
    return()=>clearInterval(iv);
  },[lastKey,bodyLen,prompts.length]);
  useEffect(()=>{if(!vis)return;const iv=setInterval(()=>setIdx(i=>(i+1)%prompts.length),6000);return()=>clearInterval(iv);},[vis,prompts.length]);
  if(!vis||!prompts.length)return null;
  return <div key={idx} aria-hidden="true" style={{fontFamily:T.body,fontSize:12,color:T.ink4,fontStyle:"italic",padding:"8px 0",animation:"ghostFade 6s ease both",pointerEvents:"none",userSelect:"none"}}>{prompts[idx]}</div>;
}

// ═══════════════════════════════════════════════════
// CONTENT WARNING
// ═══════════════════════════════════════════════════
function CWInput({value,onChange}){
  const[open,setOpen]=useState(!!value);
  if(!open)return <button onClick={()=>setOpen(true)} aria-label="Add content warning" style={{fontFamily:T.sans,fontSize:10,color:T.ink4,background:"none",border:`1px solid ${T.border}`,padding:"8px 14px",borderRadius:6,cursor:"pointer",display:"flex",alignItems:"center",gap:4,minHeight:36}}>{"\u26A0"} Add content note</button>;
  return <div style={{display:"flex",alignItems:"center",gap:8,padding:"8px 12px",borderRadius:10,background:`${T.amber}04`,border:`1px solid ${T.amber}12`}}>
    <span style={{fontSize:12,flexShrink:0}}>{"\u26A0"}</span>
    <input maxLength={80} value={value} onChange={e=>onChange(e.target.value)} placeholder="e.g. grief, violence, sexual content" aria-label="Content warning"
      style={{flex:1,padding:"4px 0",fontFamily:T.sans,fontSize:11}}/>
    <span style={{fontFamily:T.sans,fontSize:9,color:T.ink4,flexShrink:0}}>{value.length}/80</span>
    <button onClick={()=>{onChange("");setOpen(false);}} aria-label="Remove content warning" style={{background:"none",border:"none",color:T.ink4,fontSize:12,cursor:"pointer"}}>{"\u00D7"}</button>
  </div>;
}

// ═══════════════════════════════════════════════════
// BOOK SEARCH — fuzzy, trending chips, community context, history
// ═══════════════════════════════════════════════════
function BookSearch({selected,onSelect,onClear,required,contentType}){
  const[q,setQ]=useState("");const[foc,setFoc]=useState(false);const ref=useRef(null);
  const results=useMemo(()=>q.trim().length<2?[]:BOOK_DB.filter(b=>fuzzy(q,b.title,b.author)).slice(0,6),[q]);

  if(selected){
    const sp=contentType==="spoiler"?Object.entries(selected.spoilers||{}).sort(([a],[b])=>+a-+b):[];
    return <div>
      <div style={{display:"flex",alignItems:"center",gap:12,padding:"12px 16px",borderRadius:12,background:T.goldGlow,border:`1px solid ${T.gold}15`}}>
        <div style={{width:24,height:36,borderRadius:"1px 3px 3px 1px",flexShrink:0,background:`linear-gradient(135deg,${T.accent}CC,#6B2A10)`,boxShadow:"1px 0 4px rgba(0,0,0,.3)"}}/>
        <div style={{flex:1}}>
          <div style={{fontFamily:T.serif,fontSize:14,fontWeight:700,color:T.ink}}>{selected.title}</div>
          <div style={{fontFamily:T.body,fontSize:11.5,color:T.ink3,fontStyle:"italic"}}>{selected.author}, {selected.year} {"·"} {selected.pages} pages</div>
          <div style={{fontFamily:T.sans,fontSize:10,color:T.ink4,marginTop:3,display:"flex",gap:10,flexWrap:"wrap"}}>
            <span>{selected.reviews} reviews</span><span>{selected.waypoints} waypoints</span>
            {selected.yours.length>0&&<span style={{color:T.gold}}>You wrote: {selected.yours.join(", ")}</span>}
          </div>
        </div>
        <button onClick={onClear} aria-label="Remove book" style={{background:"none",border:"none",color:T.ink3,fontSize:16,cursor:"pointer",padding:"8px 12px",minWidth:36,minHeight:36,display:"inline-flex",alignItems:"center",justifyContent:"center"}}>{"\u00D7"}</button>
      </div>
      {contentType==="spoiler"&&sp.length>0&&<div style={{marginTop:8,padding:"8px 12px",borderRadius:8,background:`${T.red}04`,border:`1px solid ${T.red}08`,fontFamily:T.sans,fontSize:10,color:T.ink4}}>
        Existing spoiler posts: {sp.map(([pg,ct])=><span key={pg} style={{marginRight:8}}>page {pg} <span style={{color:T.red}}>({ct})</span></span>)}
      </div>}
    </div>;
  }

  return <div style={{position:"relative"}}>
    {!foc&&!q&&<div style={{marginBottom:10}}>
      <div style={{fontFamily:T.sans,fontSize:9,fontWeight:700,color:T.ink4,letterSpacing:".5px",textTransform:"uppercase",marginBottom:6}}>Trending on Pr{"\u00E9"}cis</div>
      <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
        {TRENDING.map(b=><button key={b.id} onClick={()=>onSelect(b)} style={{display:"flex",alignItems:"center",gap:5,padding:"8px 12px",borderRadius:8,border:`1px solid ${T.border}`,background:T.card,cursor:"pointer",fontFamily:T.sans,fontSize:11,color:T.ink2,fontWeight:500,transition:"border .15s",minHeight:36}} onMouseEnter={e=>e.currentTarget.style.borderColor=T.borderHover} onMouseLeave={e=>e.currentTarget.style.borderColor=T.border}>
          <div style={{width:10,height:15,borderRadius:"1px 2px 2px 1px",background:`linear-gradient(135deg,${T.accent}AA,#6B2A10)`}}/>{b.title}
        </button>)}
      </div>
    </div>}
    <div style={{display:"flex",alignItems:"center",gap:10,padding:"12px 16px",borderRadius:12,background:T.bg3,border:`1px solid ${foc?T.borderHover:T.border}`,transition:"border .2s"}}>
      <span style={{fontSize:14,opacity:.4}}>{"\uD83D\uDCD6"}</span>
      <input maxLength={80} ref={ref} value={q} onChange={e=>setQ(e.target.value)} onFocus={()=>setFoc(true)} onBlur={()=>setTimeout(()=>setFoc(false),200)}
        placeholder={required?"Search for a book (required)":"Tag a book (optional)"} aria-label="Book search" role="combobox" aria-expanded={foc&&results.length>0}
        style={{flex:1,fontSize:13,fontFamily:T.body}}/>
      {required&&<span style={{fontFamily:T.sans,fontSize:9,fontWeight:700,color:T.red,opacity:.6,letterSpacing:".3px"}}>REQUIRED</span>}
    </div>
    {foc&&results.length>0&&<div role="listbox" style={{position:"absolute",top:"calc(100% + 4px)",left:0,right:0,background:T.bg2,border:`1px solid ${T.borderHover}`,borderRadius:12,overflow:"hidden",zIndex:20,boxShadow:"0 8px 32px rgba(0,0,0,.4)",animation:"slideDown .15s ease"}}>
      {results.map(bk=><div key={bk.id} className="bk-r" role="option" tabIndex={0} onClick={()=>{onSelect(bk);setQ("");}} onKeyDown={e=>{if(e.key==="Enter"){onSelect(bk);setQ("");}}}
        style={{display:"flex",alignItems:"center",gap:10,padding:"10px 16px",borderBottom:`1px solid ${T.border}`}}>
        <div style={{width:18,height:26,borderRadius:"1px 2px 2px 1px",flexShrink:0,background:`linear-gradient(135deg,${T.accent}AA,#6B2A10)`}}/>
        <div style={{flex:1}}><div style={{fontFamily:T.serif,fontSize:13,fontWeight:600,color:T.ink}}>{bk.title}</div><div style={{fontFamily:T.sans,fontSize:10,color:T.ink3}}>{bk.author} {"·"} {bk.year} {"·"} {bk.pages}p</div></div>
        {bk.yours.length>0&&<span style={{fontFamily:T.sans,fontSize:9,fontWeight:600,color:T.gold}}>Previously written</span>}
        <span style={{fontFamily:T.sans,fontSize:9,color:T.ink4}}>{bk.reviews} reviews</span>
      </div>)}
    </div>}
    {foc&&q.length>=2&&results.length===0&&<div style={{position:"absolute",top:"calc(100% + 4px)",left:0,right:0,background:T.bg2,border:`1px solid ${T.borderHover}`,borderRadius:12,padding:16,zIndex:20,boxShadow:"0 8px 32px rgba(0,0,0,.4)",textAlign:"center",animation:"slideDown .15s ease"}}>
      <div style={{fontFamily:T.sans,fontSize:12,color:T.ink3,marginBottom:8}}>No results for {"\u201C"}{q}{"\u201D"}</div>
      <button onClick={()=>{const el=document.querySelector(".compose-toast");if(el){el.textContent="Book submission sent!";el.style.display="block";setTimeout(()=>el.style.display="none",2000);}}} style={{padding:"6px 14px",borderRadius:8,fontFamily:T.sans,fontSize:11,fontWeight:600,cursor:"pointer",background:`${T.accent}10`,color:T.accent,border:`1px solid ${T.accent}20`}}>+ Add this book to Pr{"\u00E9"}cis</button>
    </div>}
  </div>;
}

// ═══════════════════════════════════════════════════
// TYPE SELECTOR — Four Doors + Drafts + Last Used + Repost Demo
// ═══════════════════════════════════════════════════
function TypeSelector({onSelect,drafts,onResume,lastType,onRepostDemo}){
  const[hov,setHov]=useState(null);
  return <div style={{maxWidth:720,margin:"0 auto",padding:"48px 28px",animation:"fadeUp .4s ease both"}}>
    <div style={{textAlign:"center",marginBottom:40}}>
      <h1 style={{fontFamily:T.serif,fontSize:34,fontWeight:700,color:T.ink,letterSpacing:"-1px",lineHeight:1.15,marginBottom:8}}>What are you writing?</h1>
      <p style={{fontFamily:T.body,fontSize:14.5,color:T.ink3,fontWeight:300,fontStyle:"italic"}}>Four ways to put words on the page. Pick the one that fits.</p>
    </div>
    {drafts.length>0&&<div className="fc" style={{marginBottom:28,padding:"16px 20px",borderRadius:14,background:T.card,border:`1px solid ${T.border}`}}>
      <div style={{fontFamily:T.sans,fontSize:10,fontWeight:700,color:T.ink3,letterSpacing:".5px",textTransform:"uppercase",marginBottom:10}}>Drafts ({drafts.length})</div>
      {drafts.map(d=>{const tc=TYPES[d.type];return <button key={d.id} onClick={()=>onResume(d)} tabIndex={0} style={{display:"flex",alignItems:"center",gap:10,padding:"10px 14px",borderRadius:10,background:T.bg3,border:`1px solid ${T.border}`,cursor:"pointer",width:"100%",textAlign:"left",marginBottom:6,transition:"border .15s"}} onMouseEnter={e=>e.currentTarget.style.borderColor=T.borderHover} onMouseLeave={e=>e.currentTarget.style.borderColor=T.border}>
        <span style={{fontSize:14}}>{tc.icon}</span>
        <div style={{flex:1,minWidth:0}}>
          <div style={{fontFamily:T.serif,fontSize:13,fontWeight:600,color:T.ink,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{d.title||d.body.slice(0,50)||"Untitled"}</div>
          <div style={{fontFamily:T.sans,fontSize:10,color:T.ink4}}>{d.words} words {"·"} {timeAgo(d.savedAt)}{d.book?` · ${d.book.title}`:""}</div>
        </div>
        <span style={{fontFamily:T.sans,fontSize:10,color:tc.color,fontWeight:600}}>{tc.label}</span>
      </button>;})}
    </div>}
    <div className="type-grid" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
      {Object.values(TYPES).map((type,i)=>{const isH=hov===type.id;const isL=type.id===lastType;
        return <div key={type.id} className="type-door" role="button" aria-label={`Create ${type.label}`} tabIndex={0}
          onClick={()=>onSelect(type.id)} onKeyDown={e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();onSelect(type.id);}}}
          onMouseEnter={()=>setHov(type.id)} onMouseLeave={()=>setHov(null)}
          style={{padding:"26px 22px",borderRadius:16,background:isH?`linear-gradient(135deg,${type.color}08,${T.card})`:T.card,border:`1px solid ${isH?`${type.color}30`:T.border}`,animation:`fadeUp .4s ease ${.08+i*.06}s both`,position:"relative"}}>
          {isL&&<div style={{position:"absolute",top:10,right:12,fontFamily:T.sans,fontSize:8,fontWeight:700,color:T.ink4,letterSpacing:".5px",textTransform:"uppercase"}}>Last used</div>}
          <div style={{width:46,height:46,borderRadius:14,background:`${type.color}10`,border:`1px solid ${type.color}20`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:21,marginBottom:14,transition:"all .3s",transform:isH?"scale(1.05)":"none",boxShadow:isH?`0 0 20px ${type.color}12`:"none"}}>{type.icon}</div>
          <h3 style={{fontFamily:T.serif,fontSize:19,fontWeight:700,color:isH?type.color:T.ink,marginBottom:5,transition:"color .3s"}}>{type.label}</h3>
          <p style={{fontFamily:T.body,fontSize:12.5,color:T.ink3,lineHeight:1.55,fontWeight:300,fontStyle:"italic"}}>{type.desc}</p>
          <div style={{marginTop:12,paddingTop:10,borderTop:`1px solid ${T.border}`,fontFamily:T.sans,fontSize:10,color:T.ink4,display:"flex",alignItems:"center",gap:6}}>
            <span style={{width:5,height:5,borderRadius:"50%",background:type.color,opacity:.5}}/> Base: +{type.ink.base} Ink
          </div>
        </div>;})}
    </div>
    <div style={{textAlign:"center",marginTop:32}}><button onClick={onRepostDemo} style={{fontFamily:T.sans,fontSize:11,color:T.ink4,background:"none",border:`1px solid ${T.border}`,padding:"8px 16px",borderRadius:8,cursor:"pointer"}}>{"\uD83D\uDD04"} Demo: Repost Flow</button></div>
  </div>;
}

// ═══════════════════════════════════════════════════
// COMPOSE SCREEN
// ═══════════════════════════════════════════════════
// Lens-aware format prompts
const FORMAT_PROMPTS={
  original:{
    analyst:["Thesis \u2192 Evidence \u2192 Counterpoint","Structure: observe, analyze, conclude","Try numbering your key claims"],
    empath:["Feeling \u2192 Memory \u2192 Resonance","Start in the body, not the head","Let the rhythm do the thinking"],
    philosopher:["Question \u2192 Exploration \u2192 Reframing","Try: What if the opposite were true?","End where you began, but changed"],
    storyteller:["Scene \u2192 Tension \u2192 Turn","Open mid-action, explain later","Try: the smallest detail that holds the biggest weight"],
    explorer:["Discovery \u2192 Connection \u2192 Departure","Link two things no one else has linked","Try: what does this remind you of, and why?"],
    alchemist:["Connect this to something unexpected","What two books share a hidden thesis?","Synthesize: what changes when you pair these?"]
  },
  review:{
    analyst:["Claim \u2192 Evidence \u2192 Verdict","What the book does vs. what it tries to do","Rate the craft, not just the story"],
    empath:["How it made you feel \u2192 Why \u2192 Who should read it","Start with the scene that stayed with you","Write it like a letter to a friend"],
    philosopher:["What question does the book answer?","What does it assume the reader believes?","Where does it contradict itself?"],
    storyteller:["The moment the book earned your trust (or lost it)","Tell us the scene, then the meaning","Review it like a story about reading it"],
    explorer:["Compare it to something unexpected","What shelf does it belong on, and why?","What did you read next because of this book?"],
    alchemist:["Connect to something unexpected","What hidden thesis do two books share?","Synthesize across boundaries"]
  },
  recommendation:{
    analyst:["Who it\u2019s for \u2192 What it does \u2192 Why now","Pair it: this book + that book","The one-sentence pitch, then the proof"],
    empath:["The feeling it left you with","Who in your life needs this book?","It\u2019s for anyone who has ever\u2026"],
    philosopher:["What does this book make possible?","The question it\u2019ll plant in your head","Read this if you\u2019ve ever wondered\u2026"],
    storyteller:["Tell us about the person you\u2019d hand it to","The moment you knew you\u2019d recommend it","Pitch it like a movie trailer"],
    explorer:["Where this book took you","Pair it: read this, then read that","The rabbit hole it opened"],
    alchemist:["Connect to something unexpected","What hidden thesis do two books share?","Synthesize across boundaries"]
  },
  spoiler:{
    analyst:["The mechanism behind the twist","Map the foreshadowing: what we missed","Rate the payoff vs. the setup"],
    empath:["How the reveal landed emotionally","The scene you need to talk about","Write as if the reader just finished"],
    philosopher:["What the ending means for the book\u2019s argument","The question the twist answers","What changes on a second read?"],
    storyteller:["Reconstruct the twist as a story","The exact sentence where everything shifted","Tell it like gossip \u2014 breathless"],
    explorer:["Connect the twist to another book\u2019s twist","Where have you seen this move before?","What did the author borrow, and from whom?"]
  }
};

function ComposeScreen({type,onBack,onPreview,onQuick,initDraft}){
  const tc=TYPES[type];
  const[title,setTitle]=useState(initDraft?.title||"");
  const[rawBody,setRaw]=useState(initDraft?.body||"");
  const[book,setBook]=useState(initDraft?.book||null);
  const[lens,setLens]=useState(initDraft?.lens||USER.lens);
  const[spVal,setSPV]=useState("");const[spMode,setSPM]=useState("page");
  const[showLP,setSLP]=useState(false);
  const[cw,setCW]=useState("");
  const[lastKey,setLK]=useState(Date.now());
  const[saveS,setSS]=useState("idle");
  const[saveTime,setST]=useState(null);
  const[focusMode,setFM]=useState(false);
  const[milestone,setMile]=useState(null);
  const[sessionStart]=useState(wc(initDraft?.body||""));
  const[spoilerRisk,setSpoilerRisk]=useState({detected:false,triggers:[],crossBooks:[],severity:"none"});
  const[spoilerDismissed,setSpoilerDismissed]=useState(false);
  const[crossBookGate,setCrossBookGate]=useState(initDraft?.crossBookSpoiler||false);
  const[audience,setAudience]=useState("public"); // public | followers | private
  const[progress,setProgress]=useState(initDraft?.progress||0);const[fiction,setFiction]=useState(initDraft?.fiction||null);const[fmtIdx,setFmtIdx]=useState(0);
  // ── New: Tags, Poetry Mode, Inspiration, Attestation ──
  const[poetryMode,setPoetryMode]=useState(initDraft?.poetryMode||false);
  const[genreTags,setGenreTags]=useState(initDraft?.genreTags||[]);
  const[moodTags,setMoodTags]=useState(initDraft?.moodTags||[]);
  const[inspiredBy,setInspiredBy]=useState(initDraft?.inspiredBy||[]); // array of book objects, max 3
  const[creatorRef,setCreatorRef]=useState(initDraft?.creatorRef||[]); // array of {name,handle,title}, max 2
  const[attested,setAttested]=useState(false);
  const tRef=useRef(null);
  const prevWords=useRef(0);

  const ld=LENSES[lens];const isOW=type==="original";
  const words=wc(rawBody);const ir=inkR(type,words);
  const ph=tc.ph?.[lens]||tc.ph?._||"";
  const hint=tc.hint?.[lens]||tc.hint?._||"";
  const wordCol=words===0?T.ink4:words<50?T.ink3:words<300?T.green:words<1000?T.blue:T.gold;
  const sessionWords=Math.max(0,words-sessionStart);

  // Reset spoiler gate state when type changes (defensive — component remounts handle most cases)
  useEffect(()=>{
    setSpoilerRisk({detected:false,triggers:[],crossBooks:[],severity:"none"});
    setSpoilerDismissed(false);
    setCrossBookGate(false);
  },[type]);

  // Word milestone celebrations
  const MILESTONES=[{at:50,msg:"Finding your rhythm\u2026"},{at:100,msg:"Triple digits. You\u2019re in it now."},{at:250,msg:"This is becoming something real."},{at:500,msg:"Deep Ink territory. Keep going."},{at:1000,msg:"A thousand words. You showed up for the page."}];
  useEffect(()=>{
    const prev=prevWords.current;prevWords.current=words;
    const hit=MILESTONES.find(m=>prev<m.at&&words>=m.at);
    if(hit){setMile(hit);setTimeout(()=>setMile(null),3000);}
  },[words]);

  useEffect(()=>{if(tRef.current){tRef.current.style.height="auto";tRef.current.style.height=Math.max(isOW?280:180,tRef.current.scrollHeight)+"px";}},[rawBody]);

  // Auto-save simulation with timestamp + LOCAL PERSISTENCE
  useEffect(()=>{
    if(!rawBody.trim()&&!title.trim())return;
    const t=setTimeout(()=>{
      setSS("saving");
      // Persist to localStorage as fallback for connection drops
      try{localStorage.setItem(`precis_draft_${type}`,JSON.stringify({title,body:rawBody,book:book?.title||null,lens,fiction,poetryMode,genreTags,moodTags,inspiredBy:inspiredBy?.title||null,creatorRef,savedAt:Date.now()}));}catch(e){}
      setTimeout(()=>{setSS("saved");setST(Date.now());},600);
      setTimeout(()=>setSS("idle"),2600);
    },5000);
    return()=>clearTimeout(t);
  },[rawBody,title,book,lens,fiction,poetryMode,genreTags,moodTags]);

  // Restore from localStorage on mount
  useEffect(()=>{
    if(initDraft)return;
    try{const stored=localStorage.getItem(`precis_draft_${type}`);if(stored){const d=JSON.parse(stored);if(d.body&&Date.now()-d.savedAt<86400000){setRaw(d.body);setTitle(d.title||"");if(d.fiction)setFiction(d.fiction);if(d.poetryMode)setPoetryMode(d.poetryMode);if(d.genreTags)setGenreTags(d.genreTags);if(d.moodTags)setMoodTags(d.moodTags);setSS("saved");setST(d.savedAt);pToast("Recovered draft from local storage");}}}catch(e){}
  },[]);

  // Publishing rate limit — max 5 Original Work per 24h
  const[rateLimited,setRL]=useState(false);
  useEffect(()=>{
    if(!isOW)return;
    try{const history=JSON.parse(localStorage.getItem("precis_ow_publishes")||"[]");const recent=history.filter(ts=>Date.now()-ts<86400000);if(recent.length>=5)setRL(true);}catch(e){}
  },[]);

  // Cross-book spoiler detection (debounced — runs 800ms after typing stops)
  useEffect(()=>{
    if(type==="spoiler"||!book||rawBody.length<30){setSpoilerRisk({detected:false,triggers:[],crossBooks:[],severity:"none"});return;}
    const t=setTimeout(()=>{
      const risk=detectSpoilerRisk(rawBody,book,BOOK_DB);
      setSpoilerRisk(risk);
      // Auto-dismiss resets when new triggers appear
      if(risk.detected&&risk.triggers.length!==(spoilerRisk?.triggers?.length||0))setSpoilerDismissed(false);
    },800);
    return()=>clearTimeout(t);
  },[rawBody,book,type]);

  // Keyboard shortcuts
  useEffect(()=>{
    const h=e=>{if((e.metaKey||e.ctrlKey)&&e.key==="Enter"){e.preventDefault();if(canPub)doAction();}if(e.key==="Escape"&&focusMode)setFM(false);};
    window.addEventListener("keydown",h);return()=>window.removeEventListener("keydown",h);
  });

  const canPub=rawBody.trim().length>0&&(tc.fields.bookTag!=="required"||book)&&(tc.fields.title?title.trim().length>0:true)&&(!isOW||attested)&&!rateLimited;
  const spoilerBlock=spoilerRisk.severity==="high"&&!crossBookGate&&!spoilerDismissed&&type!=="spoiler";
  const canQuick=canPub&&!spoilerBlock&&words<100&&USER.posts>=3;
  const spOK=!tc.fields.spoilerPage||!book||!spVal||(spMode==="page"?+spVal<=book.pages:true);

  function doAction(){
    if(spoilerBlock)return; // Can't publish with unresolved high-severity spoiler risk
    const draft={type,title,body:rawBody,book,lens,spoilerPage:tc.fields.spoilerPage?`${spMode==="chapter"?"ch ":""}${spVal}`:"",words,ink:inkX(type,words),cw,crossBookSpoiler:crossBookGate,crossBooks:spoilerRisk.crossBooks};
    if(canQuick)onQuick(draft);else onPreview(draft);
  }

  return <div style={{animation:"fadeUp .3s ease both",position:"relative"}}>
    {focusMode&&<div style={{position:"fixed",inset:0,background:`${T.bg}E8`,zIndex:50,animation:"fadeIn .3s ease"}} onClick={()=>setFM(false)}/>}

    <div className="compose-head" style={{display:"flex",alignItems:"center",gap:12,marginBottom:20,paddingBottom:16,borderBottom:`1px solid ${T.border}`,position:"relative",zIndex:focusMode?60:1}}>
      <button onClick={onBack} aria-label="Go back" style={{background:"none",border:"none",color:T.ink3,fontFamily:T.sans,fontSize:13,cursor:"pointer"}}>{"\u2190"} Back</button>
      <div style={{flex:1}}/>
      {(saveS!=="idle"||saveTime)&&<div style={{fontFamily:T.sans,fontSize:10,color:saveS==="saving"?T.ink4:T.green,fontWeight:600,animation:saveS==="saved"?"savedPulse 2s ease both":saveS==="saving"?"pulseGlow 1s infinite":"none",display:"flex",alignItems:"center",gap:4}}><span style={{fontSize:7}}>{"\u25CF"}</span>{saveS==="saving"?"Saving locally\u2026":saveS==="saved"?"Saved locally":saveTime?`Saved ${Math.round((Date.now()-saveTime)/60000)}m ago`:""}</div>}
      {rateLimited&&<div style={{fontFamily:T.sans,fontSize:10,color:T.red,fontWeight:600,display:"flex",alignItems:"center",gap:4}}><span style={{fontSize:9}}>{"\u26A0"}</span> Rate limit: 5 original works per 24h reached</div>}

      {/* Word milestone celebration */}
      {milestone&&<div className="milestone-toast" style={{position:"fixed",bottom:80,left:"50%",transform:"translateX(-50%)",zIndex:200,padding:"12px 24px",borderRadius:12,background:`${T.bg2}F0`,border:`1px solid ${T.gold}30`,boxShadow:`0 8px 32px rgba(0,0,0,.4),0 0 0 1px ${T.gold}10`,fontFamily:T.sans,fontSize:12,fontWeight:700,color:T.gold,animation:"fadeUp .3s ease",backdropFilter:"blur(12px)",display:"flex",alignItems:"center",gap:8}}><span style={{fontSize:16}}>{"\u2728"}</span>{milestone.msg}<span style={{fontSize:10,fontWeight:600,color:T.ink3,marginLeft:4}}>{words} words</span></div>}
      <button onClick={()=>setFM(!focusMode)} title="Focus mode" style={{background:focusMode?`${T.blue}12`:"transparent",border:`1px solid ${focusMode?`${T.blue}20`:T.border}`,borderRadius:6,padding:"6px 10px",cursor:"pointer",fontFamily:T.sans,fontSize:10,fontWeight:600,color:focusMode?T.blue:T.ink4,minHeight:32}}>{focusMode?"Exit focus":"Focus"}</button>
      <div style={{display:"flex",alignItems:"center",gap:6,padding:"4px 12px",borderRadius:8,background:`${tc.color}10`,border:`1px solid ${tc.color}20`}}>
        <span style={{fontSize:13}}>{tc.icon}</span><span style={{fontFamily:T.sans,fontSize:11,fontWeight:700,color:tc.color}}>{tc.label}</span>
      </div>
    </div>

    <div style={{position:"relative",zIndex:focusMode?60:1}}>
      {/* Audience */}
      <div style={{fontFamily:T.sans,fontSize:10,color:T.ink4,marginBottom:12,display:"flex",alignItems:"center",gap:6}}>
        <span style={{fontSize:8,opacity:.5}}>{"\u25C9"}</span>
        {fmt(USER.followers)} followers will see this{book?` · ${book.reviews} others have reviewed ${book.title}`:""}
      </div>

      {/* Fiction / Non-fiction toggle — Original Work only */}
      {isOW&&<div style={{display:"flex",alignItems:"center",gap:8,marginBottom:14}}>
        <span style={{fontFamily:T.sans,fontSize:10,fontWeight:700,color:T.ink4,letterSpacing:".3px",textTransform:"uppercase"}}>{"Genre"}</span>
        <div role="group" aria-label="Genre category" style={{display:"flex",gap:0,borderRadius:8,overflow:"hidden",border:`1px solid ${T.border}`}}>
          {[{id:"fiction",label:"Fiction",icon:"\uD83C\uDFAD"},{id:"nonfiction",label:"Non-fiction",icon:"\uD83D\uDCDA"}].map(opt=><button key={opt.id}
            onClick={()=>setFiction(fiction===opt.id?null:opt.id)}
            aria-pressed={fiction===opt.id}
            style={{padding:"5px 12px",border:"none",fontFamily:T.sans,fontSize:10,fontWeight:fiction===opt.id?700:400,
              background:fiction===opt.id?`${T.accent}15`:"transparent",
              color:fiction===opt.id?T.accent:T.ink3,
              cursor:"pointer",transition:"all .15s",display:"flex",alignItems:"center",gap:3}}>
            {fiction===opt.id&&<span style={{fontSize:9}}>{opt.icon}</span>}{opt.label}</button>)}
        </div>
        {fiction&&<button onClick={()=>setFiction(null)} aria-label="Clear category" style={{fontFamily:T.sans,fontSize:9,color:T.ink4,background:"none",border:"none",cursor:"pointer",opacity:.6}}>{"\u00D7"}</button>}
      </div>}

      {/* Poetry mode toggle — Original Work only */}
      {isOW&&<div style={{display:"flex",alignItems:"center",gap:8,marginBottom:14}}>
        <button onClick={()=>{setPoetryMode(!poetryMode);if(!poetryMode)setFiction(null);}}
          style={{padding:"5px 14px",borderRadius:8,border:`1px solid ${poetryMode?`${T.plum}30`:T.border}`,
            background:poetryMode?`${T.plum}12`:"transparent",fontFamily:T.sans,fontSize:10,fontWeight:poetryMode?700:500,
            color:poetryMode?T.plum:T.ink3,cursor:"pointer",display:"flex",alignItems:"center",gap:4}}>
          <span style={{fontSize:11}}>{"\u270F\uFE0F"}</span> Poetry Mode {poetryMode&&<span style={{fontSize:9}}>{"\u2713"}</span>}
        </button>
        {poetryMode&&<span style={{fontFamily:T.sans,fontSize:9,color:T.plum,fontStyle:"italic"}}>Line breaks preserved · Stanza-aware rendering</span>}
      </div>}

      {/* Genre / Form tags — curated, max 3 */}
      {isOW&&<div style={{marginBottom:14}}>
        <div style={{fontFamily:T.sans,fontSize:10,fontWeight:700,color:T.ink4,letterSpacing:".3px",textTransform:"uppercase",marginBottom:6}}>
          {poetryMode?"Form":"Genre"} <span style={{fontWeight:400,textTransform:"none",letterSpacing:0}}>· select up to 3</span>
        </div>
        <div style={{display:"flex",flexWrap:"wrap",gap:4}}>
          {(poetryMode?GENRE_TAGS.poetry:(fiction==="nonfiction"?GENRE_TAGS.nonfiction:GENRE_TAGS.fiction)).map(tag=>{
            const sel=genreTags.includes(tag);
            return <button key={tag} onClick={()=>{if(sel)setGenreTags(genreTags.filter(t=>t!==tag));else if(genreTags.length<3)setGenreTags([...genreTags,tag]);}}
              style={{padding:"4px 10px",borderRadius:6,border:`1px solid ${sel?`${T.accent}30`:T.border}`,background:sel?`${T.accent}10`:"transparent",
                fontFamily:T.sans,fontSize:9.5,fontWeight:sel?700:400,color:sel?T.accent:T.ink3,cursor:genreTags.length>=3&&!sel?"default":"pointer",
                opacity:genreTags.length>=3&&!sel?.4:1,transition:"all .15s"}}>{tag}</button>;
          })}
        </div>
      </div>}

      {/* Mood / Texture tags — curated, max 2 */}
      {isOW&&<div style={{marginBottom:14}}>
        <div style={{fontFamily:T.sans,fontSize:10,fontWeight:700,color:T.ink4,letterSpacing:".3px",textTransform:"uppercase",marginBottom:6}}>
          Mood <span style={{fontWeight:400,textTransform:"none",letterSpacing:0}}>· select up to 2</span>
        </div>
        <div style={{display:"flex",flexWrap:"wrap",gap:4}}>
          {MOOD_TAGS.map(tag=>{
            const sel=moodTags.includes(tag);
            return <button key={tag} onClick={()=>{if(sel)setMoodTags(moodTags.filter(t=>t!==tag));else if(moodTags.length<2)setMoodTags([...moodTags,tag]);}}
              style={{padding:"4px 10px",borderRadius:6,border:`1px solid ${sel?`${T.gold}30`:T.border}`,background:sel?`${T.gold}08`:"transparent",
                fontFamily:T.sans,fontSize:9.5,fontWeight:sel?700:400,color:sel?T.gold:T.ink3,cursor:moodTags.length>=2&&!sel?"default":"pointer",
                opacity:moodTags.length>=2&&!sel?.4:1,transition:"all .15s",fontStyle:"italic"}}>{tag}</button>;
          })}
        </div>
      </div>}

      {/* Inspired By — book sources of inspiration, up to 3 */}
      {isOW&&<div style={{marginBottom:14}}>
        <div style={{fontFamily:T.sans,fontSize:10,fontWeight:700,color:T.ink4,letterSpacing:".3px",textTransform:"uppercase",marginBottom:6}}>
          Inspired by <span style={{fontWeight:400,textTransform:"none",letterSpacing:0}}>· up to 3 books that sparked this</span>
        </div>
        {inspiredBy.map((bk,idx)=><div key={idx} style={{display:"flex",alignItems:"center",gap:8,padding:"5px 12px",borderRadius:8,background:`${T.blue}06`,border:`1px solid ${T.blue}15`,marginBottom:4}}>
          <div style={{width:18,height:26,borderRadius:"1px 3px 3px 1px",background:`linear-gradient(135deg,${T.blue}CC,#2A4A6B)`,boxShadow:"1px 0 3px rgba(0,0,0,.2)",flexShrink:0}}/>
          <div style={{flex:1}}><span style={{fontFamily:T.serif,fontSize:11,fontWeight:700,color:T.ink}}>{bk.title}</span>{bk.author&&<span style={{fontFamily:T.body,fontSize:10,color:T.ink3,marginLeft:4}}>{bk.author}</span>}</div>
          <button onClick={()=>setInspiredBy(inspiredBy.filter((_,i)=>i!==idx))} style={{background:"none",border:"none",color:T.ink4,cursor:"pointer",fontSize:12}}>{"\u00D7"}</button>
        </div>)}
        {inspiredBy.length<3&&<button onClick={()=>{const title=prompt("Book title that inspired this piece:");if(title?.trim()){const match=BOOK_DB.find(b=>b.title.toLowerCase().includes(title.toLowerCase()));const bk=match||{title:title.trim(),author:"",pages:0,reviews:0};setInspiredBy([...inspiredBy,bk]);}}}
          style={{padding:"5px 14px",borderRadius:8,border:`1px dashed ${T.border}`,background:"transparent",fontFamily:T.sans,fontSize:10,color:T.ink3,cursor:"pointer",display:"flex",alignItems:"center",gap:4}}>
          <span style={{fontSize:12}}>{"\uD83D\uDCD6"}</span> {inspiredBy.length===0?"Add inspiration source":`Add another (${3-inspiredBy.length} remaining)`}
        </button>}
      </div>}

      {/* Creator reference — "If you liked [work]", up to 2 */}
      {isOW&&<div style={{marginBottom:14}}>
        {creatorRef.map((cr,idx)=><div key={idx} style={{display:"flex",alignItems:"center",gap:8,padding:"5px 12px",borderRadius:8,background:`${T.plum}06`,border:`1px solid ${T.plum}15`,marginBottom:4}}>
          <span style={{fontSize:11}}>{"\u2728"}</span>
          <div style={{flex:1}}><span style={{fontFamily:T.sans,fontSize:10,color:T.plum,fontWeight:600}}>If you liked </span><span style={{fontFamily:T.serif,fontSize:10.5,color:T.ink,fontStyle:"italic"}}>"{cr.title}"</span><span style={{fontFamily:T.sans,fontSize:10,color:T.ink3}}> by {cr.name}</span></div>
          <button onClick={()=>setCreatorRef(creatorRef.filter((_,i)=>i!==idx))} style={{background:"none",border:"none",color:T.ink4,cursor:"pointer",fontSize:12}}>{"\u00D7"}</button>
        </div>)}
        {creatorRef.length<2&&<button onClick={()=>{const name=prompt("Creator's handle or name on Pr\u00e9cis:");const title=prompt("Title of their piece:");if(name?.trim()&&title?.trim())setCreatorRef([...creatorRef,{name:name.trim(),handle:name.startsWith("@")?name.trim():`@${name.trim().toLowerCase().replace(/\s/g,"_")}`,title:title.trim()}]);}}
          style={{padding:"5px 14px",borderRadius:8,border:`1px dashed ${T.border}`,background:"transparent",fontFamily:T.sans,fontSize:10,color:T.ink3,cursor:"pointer",display:"flex",alignItems:"center",gap:4}}>
          <span style={{fontSize:12}}>{"\u2728"}</span> {creatorRef.length===0?"If you liked [creator\u2019s work]\u2026":`Add another reference (${2-creatorRef.length} remaining)`}
        </button>}
      </div>}

      {/* Lens-inflected hint */}
      <div style={{fontFamily:T.body,fontSize:12,color:T.ink4,fontStyle:"italic",marginBottom:16,lineHeight:1.6,borderLeft:`2px solid ${ld.color}20`,paddingLeft:12,transition:"border-color .3s"}}>{hint}</div>

      {/* Book search */}
      {tc.fields.bookTag&&<div style={{marginBottom:18}}><BookSearch selected={book} onSelect={setBook} onClear={()=>setBook(null)} required={tc.fields.bookTag==="required"} contentType={type}/></div>}

      {/* Reading progress — slider + direct input + presets */}
      {book&&!isOW&&<div style={{marginBottom:18,padding:"14px 16px",borderRadius:12,background:`${T.gold}04`,border:`1px solid ${T.gold}08`}}>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:10}}>
          <span style={{fontFamily:T.sans,fontSize:10,fontWeight:700,color:T.ink4,letterSpacing:".3px",textTransform:"uppercase"}}>How far are you?</span>
          <div style={{display:"flex",alignItems:"center",gap:4}}>
            <input maxLength={3} value={progress>0?String(progress):""} placeholder={"—"}
              onChange={e=>{const v=e.target.value.replace(/\D/g,"");const n=Math.min(100,+v||0);setProgress(n);}}
              aria-label="Reading progress percentage"
              style={{width:38,textAlign:"center",padding:"3px 0",borderRadius:6,border:`1px solid ${progress>0?`${T.accent}30`:T.border}`,background:"transparent",fontFamily:T.sans,fontSize:13,fontWeight:700,color:progress>0?T.accent:T.ink4}}/>
            <span style={{fontFamily:T.sans,fontSize:11,fontWeight:600,color:T.ink4}}>%</span>
          </div>
        </div>
        <input type="range" min="0" max="100" step="1" value={progress} onChange={e=>setProgress(+e.target.value)}
          aria-label="Reading progress slider"
          style={{width:"100%",accentColor:T.accent,cursor:"pointer"}}/>
        <div style={{display:"flex",gap:4,marginTop:8}}>
          {[{v:25,l:"¼"},{v:50,l:"½"},{v:75,l:"¾"},{v:100,l:"Done"}].map(p=><button key={p.v}
            onClick={()=>setProgress(progress===p.v?0:p.v)}
            style={{flex:1,padding:"5px 0",borderRadius:6,border:`1px solid ${progress===p.v?`${T.accent}30`:T.border}`,
              background:progress===p.v?`${T.accent}10`:"transparent",
              fontFamily:T.sans,fontSize:10,fontWeight:progress===p.v?700:500,
              color:progress===p.v?T.accent:T.ink4,cursor:"pointer",transition:"all .15s"}}>
            {p.l}
          </button>)}
        </div>
        {progress>0&&book.pages&&<div style={{fontFamily:T.sans,fontSize:9,color:T.ink4,marginTop:6,textAlign:"center"}}>
          ~page {Math.round(book.pages*(progress/100))} of {book.pages}
        </div>}
      </div>}

      {/* Spoiler gate */}
      {tc.fields.spoilerPage&&<div style={{marginBottom:18,padding:"12px 16px",borderRadius:12,background:`${T.red}06`,border:`1px solid ${T.red}12`}}>
        <div style={{display:"flex",alignItems:"center",gap:10,flexWrap:"wrap"}}>
          <span style={{fontSize:16}}>{"\uD83D\uDD13"}</span>
          <div style={{flex:1}}><div style={{fontFamily:T.sans,fontSize:10,fontWeight:700,color:T.red,letterSpacing:".5px",textTransform:"uppercase",marginBottom:2,opacity:.8}}>Spoiler Gate</div><div style={{fontFamily:T.sans,fontSize:11,color:T.ink3}}>Readers must be past this point</div></div>
          <div style={{display:"flex",alignItems:"center",gap:6}}>
            <div style={{display:"flex",borderRadius:6,overflow:"hidden",border:`1px solid ${T.red}20`}}>
              {[{id:"page",l:"Page"},{id:"chapter",l:"Ch."}].map(m=><button key={m.id} onClick={()=>setSPM(m.id)} style={{padding:"4px 10px",fontFamily:T.sans,fontSize:10,fontWeight:600,cursor:"pointer",border:"none",background:spMode===m.id?`${T.red}15`:"transparent",color:spMode===m.id?T.red:T.ink4}}>{m.l}</button>)}
            </div>
            <input maxLength={10} value={spVal} onChange={e=>setSPV(e.target.value.replace(/\D/g,""))} placeholder={"—"} aria-label={`Spoiler ${spMode} number`}
              style={{width:56,padding:"6px 10px",borderRadius:8,textAlign:"center",background:T.bg3,border:`1px solid ${!spOK?`${T.red}60`:`${T.red}20`}`,fontFamily:T.sans,fontSize:13,fontWeight:700,color:T.ink}}/>
          </div>
        </div>
        {!spOK&&<div style={{fontFamily:T.sans,fontSize:10,color:T.red,marginTop:8,display:"flex",alignItems:"center",gap:4}}>{"\u26A0"} {book.title} is {book.pages} pages {"—"} gate exceeds book length</div>}
      </div>}

      {/* Title (OW) */}
      {tc.fields.title&&<div style={{marginBottom:8}}>
        <input maxLength={120} value={title} onChange={e=>setTitle(e.target.value)} placeholder="Title" aria-label="Post title"
          style={{width:"100%",fontFamily:T.serif,fontSize:26,fontWeight:700,letterSpacing:"-.5px",fontStyle:"italic",padding:"4px 0"}}/>
        <div style={{height:2,background:`linear-gradient(90deg,${tc.color}30,transparent)`,borderRadius:1,marginTop:4}}/>
      </div>}

      {/* Body */}
      <div className="compose-body" style={{position:"relative",marginBottom:8}}>
        <textarea maxLength={15000} ref={tRef} value={rawBody} onChange={e=>{setRaw(e.target.value);setLK(Date.now());}} placeholder={poetryMode?"Each line break is preserved.\nStanzas separated by blank lines.\n\nWrite as you would on the page.":ph} aria-label={`${tc.label} body`}
          style={{fontSize:poetryMode?15:isOW?15.5:14,lineHeight:poetryMode?2.0:isOW?1.85:1.75,fontWeight:poetryMode?400:300,minHeight:isOW?280:180,letterSpacing:poetryMode?".02em":isOW?".01em":"normal",fontFamily:poetryMode?T.serif:T.body,textAlign:poetryMode?"left":"left",whiteSpace:poetryMode?"pre-wrap":"normal"}}/>
        {!rawBody&&<div style={{position:"absolute",top:4,left:0,pointerEvents:"none"}}><div style={{width:2,height:isOW?20:17,background:poetryMode?T.plum:tc.color,borderRadius:1,opacity:.5,animation:"cursorBlink 1.2s ease infinite"}}/></div>}
      </div>

      <GhostPrompt type={type} lens={lens} bodyLen={rawBody.length} lastKey={lastKey}/>

      {/* Lens-aware format prompts — rotating card */}
      {FORMAT_PROMPTS[type]?.[lens]&&(()=>{const fmts=FORMAT_PROMPTS[type][lens];const fi=fmtIdx%fmts.length;return <div style={{marginBottom:14}}>
        <div className="format-card" style={{padding:"10px 14px",borderRadius:10,background:`${LENSES[lens]?.color||T.accent}06`,border:`1px solid ${LENSES[lens]?.color||T.accent}10`,display:"flex",alignItems:"center",gap:10}}>
          <span style={{fontSize:14,flexShrink:0,opacity:.6}}>{LENSES[lens]?.icon||"\u270D"}</span>
          <div style={{flex:1,minWidth:0}}>
            <div style={{fontFamily:T.body,fontSize:12,color:T.ink3,fontWeight:300,lineHeight:1.5,fontStyle:"italic"}}>{fmts[fi]}</div>
          </div>
          <div className="format-dots" style={{display:"flex",gap:3,flexShrink:0}}>
            {fmts.map((_,i)=><div key={i} style={{width:5,height:5,borderRadius:"50%",background:i===fi?LENSES[lens]?.color||T.accent:`${T.ink4}20`,transition:"background .2s"}}/>)}
          </div>
          <button onClick={()=>setFmtIdx(fmtIdx+1)}
            aria-label="Next format suggestion"
            style={{background:"none",border:"none",fontSize:10,color:LENSES[lens]?.color||T.ink4,cursor:"pointer",fontFamily:T.sans,fontWeight:600,flexShrink:0,padding:"2px 6px",borderRadius:4}}>
            {fi===fmts.length-1?"\u21BA":"Next"}
          </button>
        </div>
      </div>;})()}
      {isOW&&rawBody.includes("--")&&<div style={{fontFamily:T.sans,fontSize:9,color:T.ink4,fontStyle:"italic",marginBottom:6}}>Tip: "--" {"\u2192"} em-dash (—) {"·"} "..." {"\u2192"} (\u2026) {"·"} quotes become curly</div>}

      {/* Cross-book spoiler detection warning */}
      {spoilerRisk.detected&&!spoilerDismissed&&type!=="spoiler"&&<div className="spoiler-warn" style={{marginBottom:16,padding:"14px 18px",borderRadius:12,background:spoilerRisk.severity==="high"?`${T.red}08`:`${T.amber}06`,border:`1px solid ${spoilerRisk.severity==="high"?`${T.red}25`:`${T.amber}20`}`,animation:"fadeUp .25s ease"}}>
        <div style={{display:"flex",alignItems:"flex-start",gap:10}}>
          <span style={{fontSize:18,flexShrink:0,marginTop:1}}>{spoilerRisk.severity==="high"?"\u26A0\uFE0F":"\uD83D\uDEA9"}</span>
          <div style={{flex:1}}>
            <div style={{fontFamily:T.sans,fontSize:12,fontWeight:700,color:spoilerRisk.severity==="high"?T.red:T.amber,marginBottom:4}}>
              {spoilerRisk.crossBooks.length>0?"Cross-book spoiler risk":"Potential spoiler content detected"}
            </div>
            <div style={{fontFamily:T.body,fontSize:11.5,color:T.ink3,lineHeight:1.6,marginBottom:8}}>
              {spoilerRisk.crossBooks.length>0
                ?<>Your {type==="review"?"review":"recommendation"} of <strong style={{color:T.ink}}>{book?.title}</strong> appears to reference {spoilerRisk.crossBooks.map((b,i)=><span key={i}>{i>0?" and ":""}<strong style={{color:T.ink}}>{b}</strong></span>)}. Readers who haven{"\u2019"}t read {spoilerRisk.crossBooks.length>1?"those books":"that book"} may have plot points spoiled.</>
                :<>This {type} contains language that may reveal plot developments. Consider adding a spoiler gate so readers can choose whether to continue.</>}
            </div>
            {/* Detected triggers */}
            <div className="spoiler-triggers" style={{display:"flex",gap:4,flexWrap:"wrap",marginBottom:10}}>
              {spoilerRisk.triggers.slice(0,4).map((t,i)=><span key={i} style={{padding:"2px 8px",borderRadius:5,fontSize:9,fontWeight:600,fontFamily:T.sans,color:t.severity==="high"?T.red:T.amber,background:t.severity==="high"?`${T.red}10`:`${T.amber}08`,border:`1px solid ${t.severity==="high"?`${T.red}15`:`${T.amber}12`}`}}>{t.type==="cross_book"?"\uD83D\uDCDA":"\uD83D\uDD0D"} {t.match}</span>)}
              {spoilerRisk.triggers.length>4&&<span style={{padding:"2px 8px",borderRadius:5,fontSize:9,fontWeight:600,fontFamily:T.sans,color:T.ink4,background:T.bg3}}>+{spoilerRisk.triggers.length-4} more</span>}
            </div>
            {/* Action buttons */}
            <div className="spoiler-actions" style={{display:"flex",gap:6,flexWrap:"wrap"}}>
              <button onClick={()=>setCrossBookGate(true)} style={{padding:"6px 14px",borderRadius:8,border:"none",background:crossBookGate?`${T.green}15`:`${T.red}15`,fontFamily:T.sans,fontSize:11,fontWeight:700,color:crossBookGate?T.green:T.red,cursor:"pointer",display:"flex",alignItems:"center",gap:4}}>
                {crossBookGate?<>{"\u2713"} Spoiler gate added</>:<>{"\uD83D\uDD12"} Add spoiler gate</>}
              </button>
              {!crossBookGate&&<button onClick={()=>setSpoilerDismissed(true)} style={{padding:"6px 14px",borderRadius:8,border:`1px solid ${T.border}`,background:"transparent",fontFamily:T.sans,fontSize:11,fontWeight:600,color:T.ink3,cursor:"pointer"}}>Dismiss {"—"} no spoilers here</button>}
              {crossBookGate&&<button onClick={()=>setCrossBookGate(false)} style={{padding:"6px 14px",borderRadius:8,border:`1px solid ${T.border}`,background:"transparent",fontFamily:T.sans,fontSize:11,fontWeight:600,color:T.ink4,cursor:"pointer"}}>Remove gate</button>}
            </div>
          </div>
        </div>
      </div>}

      {/* Cross-book gate confirmation (persistent, even if warning dismissed) */}
      {crossBookGate&&spoilerDismissed&&<div style={{marginBottom:12,padding:"8px 14px",borderRadius:10,background:`${T.red}06`,border:`1px solid ${T.red}12`,display:"flex",alignItems:"center",gap:8}}>
        <span style={{fontSize:12}}>{"\uD83D\uDD12"}</span>
        <span style={{fontFamily:T.sans,fontSize:11,color:T.red,fontWeight:600,flex:1}}>Cross-book spoiler gate active{spoilerRisk.crossBooks.length>0?` — covers ${spoilerRisk.crossBooks.join(", ")}`:""}</span>
        <button onClick={()=>setCrossBookGate(false)} style={{fontFamily:T.sans,fontSize:10,color:T.ink4,background:"none",border:"none",cursor:"pointer"}}>Remove</button>
      </div>}

      <div style={{marginBottom:16}}><CWInput value={cw} onChange={setCW}/></div>

      {/* Bottom bar */}
      <div className="bb" style={{display:"flex",alignItems:"center",gap:12,padding:"14px 0",borderTop:`1px solid ${T.border}`,flexWrap:"wrap"}}>
        <div style={{position:"relative"}}>
          <button onClick={()=>setSLP(!showLP)} aria-haspopup="listbox" aria-expanded={showLP}
            style={{display:"flex",alignItems:"center",gap:5,padding:"6px 12px",borderRadius:8,cursor:"pointer",background:`${ld.color}10`,border:`1px solid ${ld.color}20`,fontFamily:T.sans,fontSize:11,fontWeight:600,color:ld.color,transition:"all .2s"}}>
            {ld.icon} {ld.label} <span style={{fontSize:8,opacity:.5}}>{"\u25BC"}</span>
          </button>
          {showLP&&<div role="listbox" style={{position:"absolute",bottom:"calc(100% + 6px)",left:0,background:T.bg2,border:`1px solid ${T.borderHover}`,borderRadius:12,padding:8,zIndex:20,boxShadow:"0 8px 32px rgba(0,0,0,.4)",animation:"slideUp .15s ease",minWidth:190}}>
            {Object.entries(LENSES).map(([k,v])=><button key={k} role="option" aria-selected={lens===k} onClick={()=>{setLens(k);setSLP(false);}}
              style={{display:"flex",alignItems:"center",gap:8,padding:"8px 14px",borderRadius:8,border:"none",cursor:"pointer",width:"100%",background:lens===k?`${v.color}12`:"transparent",color:lens===k?v.color:T.ink3,fontFamily:T.sans,fontSize:11,fontWeight:600}}>
              {v.icon}<div style={{flex:1,textAlign:"left"}}><div>{v.label}</div><div style={{fontSize:9,fontWeight:400,color:T.ink4,marginTop:1}}>{v.desc}</div></div>
              {lens===k&&<span style={{fontSize:10}}>{"\u2713"}</span>}
            </button>)}
            <div style={{padding:"6px 14px",borderTop:`1px solid ${T.border}`,marginTop:4,fontFamily:T.sans,fontSize:9,color:T.ink4,fontStyle:"italic"}}>Your lens shapes how the writing environment responds</div>
          </div>}
        </div>

        <div className="compose-stats" style={{display:"flex",alignItems:"center",gap:12,fontFamily:T.sans,fontSize:11,color:T.ink4,flex:1,flexWrap:"wrap"}}>
          <span style={{color:wordCol,fontWeight:words>0?600:400,transition:"color .3s"}}>{words} {words===1?"word":"words"}</span>
          {sessionWords>0&&<span style={{color:T.green,fontWeight:500,fontSize:10}}>+{sessionWords} this session</span>}
          {words>0&&<><span style={{opacity:.3}}>{"·"}</span><span>{rt(words)}</span><span style={{opacity:.3}}>{"·"}</span><span style={{color:T.gold,fontWeight:600}}>~{ir.lo}–{ir.hi} Ink</span></>}
          <span style={{opacity:.3}}>{"·"}</span>
          <div style={{display:"inline-flex",background:T.bg3,borderRadius:6,border:`1px solid ${T.border}`,overflow:"hidden"}}>
            {[{id:"public",icon:"\uD83C\uDF10",l:"Public"},{id:"followers",icon:"\uD83D\uDC65",l:"Followers"},{id:"private",icon:"\uD83D\uDD12",l:"Private"}].map(a=><button key={a.id} onClick={()=>setAudience(a.id)} style={{padding:"3px 8px",border:"none",fontFamily:T.sans,fontSize:9,fontWeight:audience===a.id?700:500,color:audience===a.id?T.gold:T.ink4,background:audience===a.id?`${T.gold}10`:"transparent",cursor:"pointer"}} title={a.id==="public"?"Anyone can see this":a.id==="followers"?"Only your followers":"Only you (journal mode)"}>{a.icon} {a.l}</button>)}
          </div>
        </div>

        {/* Attestation — Original Work only */}
        {isOW&&<div style={{marginBottom:12,padding:"10px 14px",borderRadius:10,background:attested?`${T.green}06`:`${T.accent}04`,border:`1px solid ${attested?`${T.green}20`:`${T.accent}12`}`,display:"flex",alignItems:"center",gap:10,cursor:"pointer",transition:"all .2s"}} onClick={()=>setAttested(!attested)}>
          <div style={{width:18,height:18,borderRadius:4,border:`2px solid ${attested?T.green:`${T.ink3}40`}`,background:attested?T.green:"transparent",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,transition:"all .15s"}}>
            {attested&&<span style={{color:"#fff",fontSize:11,fontWeight:800}}>{"\u2713"}</span>}
          </div>
          <div>
            <div style={{fontFamily:T.serif,fontSize:13,fontWeight:700,color:attested?T.green:T.ink,fontStyle:"italic",letterSpacing:"-.2px"}}>These words are mine.</div>
            <div style={{fontFamily:T.sans,fontSize:9,color:T.ink4,marginTop:1}}>This work was composed by me, not generated by AI.</div>
          </div>
        </div>}

        <div className="bb-a" style={{display:"flex",gap:8}}>
          {canQuick&&<button onClick={()=>onQuick({type,title,body:rawBody,book,lens,spoilerPage:tc.fields.spoilerPage?`${spMode==="chapter"?"ch ":""}${spVal}`:"",words,ink:inkX(type,words),cw,crossBookSpoiler:crossBookGate,crossBooks:spoilerRisk.crossBooks,progress:book?progress:null,fiction,poetryMode,genreTags,moodTags,inspiredBy,creatorRef,attested})}
            style={{padding:"9px 22px",borderRadius:10,border:"none",fontFamily:T.sans,fontSize:12,fontWeight:700,cursor:"pointer",background:`linear-gradient(135deg,${T.accent},#9E4520)`,color:"#fff",boxShadow:`0 2px 12px ${T.accent}30`}}>Publish</button>}
          <button onClick={()=>canPub&&onPreview({type,title,body:rawBody,book,lens,spoilerPage:tc.fields.spoilerPage?`${spMode==="chapter"?"ch ":""}${spVal}`:"",words,ink:inkX(type,words),cw,crossBookSpoiler:crossBookGate,crossBooks:spoilerRisk.crossBooks,progress:book?progress:null,fiction,poetryMode,genreTags,moodTags,inspiredBy,creatorRef,attested})} disabled={!canPub}
            title={canPub?"\u2318+Enter":"Complete required fields"}
            style={{padding:"9px 22px",borderRadius:10,fontFamily:T.sans,fontSize:12,fontWeight:700,cursor:canPub?"pointer":"not-allowed",background:canPub?(canQuick?"transparent":`linear-gradient(135deg,${T.accent},#9E4520)`):T.bg3,color:canPub?(canQuick?T.ink3:"#fff"):T.ink4,border:canQuick?`1px solid ${T.border}`:"none",boxShadow:canPub&&!canQuick?`0 2px 12px ${T.accent}30`:"none"}}>
            {canQuick?"Preview first":"Preview & Publish"}
          </button>
        </div>
      </div>
      <div style={{fontFamily:T.sans,fontSize:9,color:T.ink4,marginTop:4,display:"flex",gap:12,flexWrap:"wrap"}}>
        <span className="kb-hint">{"\u2318"}+Enter to {canQuick?"publish":"preview"}</span>
        <button onClick={()=>{const dt=prompt("Schedule for later\nEnter date and time (e.g. 2026-03-15 9:00 AM):");if(dt&&dt.trim()){pToast(`Scheduled for ${dt.trim()} \u2014 we\u2019ll publish it then`);}}} style={{background:"none",border:"none",fontFamily:T.sans,fontSize:9,fontWeight:600,color:T.blue,cursor:"pointer",padding:0}}>{"\uD83D\uDD52"} Schedule for later</button>
        {tc.fields.bookTag==="required"&&!book&&rawBody.length>0&&<span style={{color:T.red}}>{"\u2191"} Tag a book to continue</span>}
        {spoilerBlock&&<span style={{color:T.red}}>{"\u26A0"} Address the cross-book spoiler warning above to continue</span>}
      </div>
    </div>
  </div>;
}

// ═══════════════════════════════════════════════════
// PREVIEW SCREEN
// ═══════════════════════════════════════════════════
function PreviewScreen({draft,onBack,onPublish}){
  const[pub,setPub]=useState(false);
  const tc=TYPES[draft.type];const ld=LENSES[draft.lens];const tier=getTier(USER.ink);
  const body=draft.type==="original"?smartTypo(draft.body):draft.body;
  return <div style={{animation:"fadeUp .3s ease both"}}>
    <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:24,paddingBottom:16,borderBottom:`1px solid ${T.border}`}}>
      <button onClick={onBack} style={{background:"none",border:"none",color:T.ink3,fontFamily:T.sans,fontSize:13,cursor:"pointer"}}>{"\u2190"} Edit</button><div style={{flex:1}}/><span style={{fontFamily:T.sans,fontSize:11,fontWeight:700,color:T.ink3,letterSpacing:".5px",textTransform:"uppercase"}}>Preview</span>
    </div>
    <div className="fc preview-card" style={{background:T.card,border:`1px solid ${T.border}`,borderRadius:14,padding:"22px 24px",marginBottom:20}}>
      <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:14}}>
        <Av i={USER.initials} ink={USER.ink} s={38}/><div><div style={{display:"flex",alignItems:"center",gap:6}}><span style={{fontFamily:T.sans,fontSize:13,fontWeight:700,color:T.ink}}>{USER.name}</span><IB ink={USER.ink}/></div><div style={{fontFamily:T.sans,fontSize:11,color:T.ink3}}>Just now {"·"} {ld.icon} {ld.label}</div></div>
      </div>
      <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:12,flexWrap:"wrap"}}>
        <CTP type={draft.type}/>
        {draft.cw&&<span style={{display:"inline-flex",alignItems:"center",gap:3,padding:"3px 8px",borderRadius:6,fontSize:9,fontWeight:600,fontFamily:T.sans,color:T.amber,background:`${T.amber}08`,border:`1px solid ${T.amber}15`}}>{"\u26A0"} {draft.cw}</span>}
        {draft.crossBookSpoiler&&<span style={{display:"inline-flex",alignItems:"center",gap:3,padding:"3px 8px",borderRadius:6,fontSize:9,fontWeight:600,fontFamily:T.sans,color:T.red,background:`${T.red}08`,border:`1px solid ${T.red}15`}}>{"\uD83D\uDD12"} Cross-book spoilers{draft.crossBooks?.length>0?`: ${draft.crossBooks.join(", ")}`:""}</span>}
      </div>
      {draft.crossBookSpoiler&&<div style={{display:"flex",alignItems:"center",gap:8,padding:"8px 12px",borderRadius:8,marginBottom:12,background:`${T.red}06`,border:`1px solid ${T.red}12`}}>
        <span>{"\uD83D\uDD12"}</span><span style={{fontFamily:T.sans,fontSize:11,color:T.red,fontWeight:600}}>Gated {"—"} Contains spoilers for {draft.crossBooks?.length>0?draft.crossBooks.join(", "):"other books"}</span>
      </div>}
      {draft.spoilerPage&&draft.spoilerPage.replace("ch ","").trim()&&<div style={{display:"flex",alignItems:"center",gap:8,padding:"8px 12px",borderRadius:8,marginBottom:12,background:`${T.red}06`,border:`1px solid ${T.red}12`}}>
        <span>{"\uD83D\uDD13"}</span><span style={{fontFamily:T.sans,fontSize:11,color:T.red,fontWeight:600}}>Spoiler Zone {"—"} Through {draft.spoilerPage.startsWith("ch")?"chapter":"page"} {draft.spoilerPage.replace("ch ","")}</span>
      </div>}
      {draft.book&&<div style={{display:"flex",alignItems:"center",gap:8,marginBottom:12,padding:"8px 12px",borderRadius:8,background:T.goldGlow,border:`1px solid ${T.border}`}}>
        <div style={{width:22,height:32,borderRadius:"1px 3px 3px 1px",background:`linear-gradient(135deg,${T.accent}CC,#6B2A10)`,boxShadow:"1px 0 4px rgba(0,0,0,.3)"}}/>
        <div><div style={{fontFamily:T.serif,fontSize:12.5,fontWeight:700,color:T.ink}}>{draft.book.title}</div><div style={{fontFamily:T.body,fontSize:11,color:T.ink3,fontStyle:"italic"}}>{draft.book.author}</div></div>
      </div>}
      {(draft.progress>0||draft.fiction)&&<div style={{display:"flex",alignItems:"center",gap:6,marginBottom:12,flexWrap:"wrap"}}>
        {draft.progress>0&&<span style={{display:"inline-flex",alignItems:"center",gap:3,padding:"3px 8px",borderRadius:6,fontSize:9,fontWeight:700,fontFamily:T.sans,background:`${T.gold}10`,color:T.gold}}>{"\uD83D\uDCD6"} {draft.progress}% through</span>}
        {draft.fiction&&<span style={{display:"inline-flex",alignItems:"center",gap:3,padding:"3px 8px",borderRadius:6,fontSize:9,fontWeight:700,fontFamily:T.sans,background:`${T.accent}10`,color:T.accent}}>{draft.fiction==="fiction"?"\uD83C\uDFAD Fiction":"\uD83D\uDCDA Non-fiction"}</span>}
        {draft.poetryMode&&<span style={{display:"inline-flex",alignItems:"center",gap:3,padding:"3px 8px",borderRadius:6,fontSize:9,fontWeight:700,fontFamily:T.sans,background:`${T.plum}10`,color:T.plum}}>{"\u270F\uFE0F"} Poetry</span>}
      </div>}

      {/* Genre + Mood tags */}
      {(draft.genreTags?.length>0||draft.moodTags?.length>0)&&<div style={{display:"flex",flexWrap:"wrap",gap:4,marginBottom:12}}>
        {draft.genreTags?.map(tag=><span key={tag} style={{padding:"3px 8px",borderRadius:6,fontSize:9,fontWeight:600,fontFamily:T.sans,background:`${T.accent}10`,color:T.accent,border:`1px solid ${T.accent}15`}}>{tag}</span>)}
        {draft.moodTags?.map(tag=><span key={tag} style={{padding:"3px 8px",borderRadius:6,fontSize:9,fontWeight:600,fontFamily:T.sans,background:`${T.gold}08`,color:T.gold,border:`1px solid ${T.gold}15`,fontStyle:"italic"}}>{tag}</span>)}
      </div>}

      {/* Inspired By */}
      {draft.inspiredBy?.length>0&&<div style={{display:"flex",flexDirection:"column",gap:3,marginBottom:12}}>
        {draft.inspiredBy.map((bk,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:8,padding:"5px 12px",borderRadius:8,background:`${T.blue}06`,border:`1px solid ${T.blue}12`}}>
          <div style={{width:18,height:26,borderRadius:"1px 3px 3px 1px",background:`linear-gradient(135deg,${T.blue}CC,#2A4A6B)`,boxShadow:"1px 0 3px rgba(0,0,0,.2)",flexShrink:0}}/>
          <span style={{fontFamily:T.sans,fontSize:9,color:T.blue,fontWeight:600}}>Inspired by</span>
          <span style={{fontFamily:T.serif,fontSize:11,fontWeight:700,color:T.ink}}>{bk.title}</span>
          {bk.author&&<span style={{fontFamily:T.body,fontSize:10,color:T.ink3}}>{bk.author}</span>}
        </div>)}
      </div>}

      {/* Creator reference */}
      {draft.creatorRef?.length>0&&<div style={{display:"flex",flexDirection:"column",gap:3,marginBottom:12}}>
        {draft.creatorRef.map((cr,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:6,padding:"5px 12px",borderRadius:8,background:`${T.plum}06`,border:`1px solid ${T.plum}12`}}>
          <span style={{fontSize:10}}>{"\u2728"}</span>
          <span style={{fontFamily:T.sans,fontSize:9,color:T.plum,fontWeight:600}}>If you liked</span>
          <span style={{fontFamily:T.serif,fontSize:10.5,color:T.ink,fontStyle:"italic"}}>"{cr.title}"</span>
          <span style={{fontFamily:T.sans,fontSize:9,color:T.ink3}}>by {cr.name}</span>
        </div>)}
      </div>}

      {draft.title&&<h3 style={{fontFamily:T.serif,fontSize:23,fontWeight:700,color:T.ink,lineHeight:1.25,letterSpacing:"-.4px",marginBottom:12,fontStyle:"italic"}}>{draft.title}</h3>}
      {draft.poetryMode
        ?<div style={{fontFamily:T.serif,fontSize:15,lineHeight:2.0,color:T.ink2,fontWeight:400,letterSpacing:".02em",whiteSpace:"pre-wrap"}}>{body.split("\n\n").map((stanza,si)=><div key={si} style={{marginBottom:si<body.split("\n\n").length-1?20:0}}>{stanza.split("\n").map((line,li)=><div key={li}>{line||"\u00A0"}</div>)}</div>)}</div>
        :<div className={draft.type==="original"?"prose-ow":""} style={{fontFamily:T.body,fontSize:14,lineHeight:1.75,color:T.ink2,fontWeight:300}}>{body.split("\n\n").map((p,i)=><p key={i} style={{marginBottom:i<body.split("\n\n").length-1?8:0}}>{p}</p>)}</div>}

      {/* Attestation badge */}
      {draft.attested&&draft.type==="original"&&<div style={{display:"inline-flex",alignItems:"center",gap:4,marginTop:12,padding:"4px 10px",borderRadius:6,background:`${T.green}06`,border:`1px solid ${T.green}15`}}>
        <span style={{fontSize:9,color:T.green}}>{"\u2713"}</span>
        <span style={{fontFamily:T.serif,fontSize:10,color:T.green,fontStyle:"italic"}}>These words are mine</span>
      </div>}
      <div style={{display:"flex",alignItems:"center",gap:16,paddingTop:14,marginTop:14,borderTop:`1px solid ${T.border}`,fontSize:12,fontFamily:T.sans,color:T.ink4}}>
        <span>{"\u2661"} 0</span><span>{"\uD83D\uDCAC"} 0</span><span>{"\u25C6"} 0</span><span>{"\uD83D\uDD04"} 0</span>
      </div>
    </div>
    <div className="fc" style={{background:T.card,border:`1px solid ${T.gold}15`,borderRadius:14,padding:"18px 22px",marginBottom:24,display:"flex",alignItems:"center",gap:16}}>
      <div style={{width:48,height:48,borderRadius:"50%",background:`conic-gradient(${T.gold} 75%,${T.ink4}20 0)`,display:"flex",alignItems:"center",justifyContent:"center"}}><div style={{width:38,height:38,borderRadius:"50%",background:T.card,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:T.sans,fontSize:14,fontWeight:800,color:T.gold}}>+{draft.ink}</div></div>
      <div><div style={{fontFamily:T.sans,fontSize:13,fontWeight:700,color:T.ink}}>Estimated Ink: +{draft.ink}</div><div style={{fontFamily:T.sans,fontSize:11,color:T.ink3,marginTop:2}}>{draft.words} words {"·"} {tc.label} base ({tc.ink.base}) + length ({draft.ink-tc.ink.base})</div><div style={{fontFamily:T.sans,fontSize:10,color:T.ink4,marginTop:3,fontStyle:"italic"}}>Engagement Ink accrues after publishing</div></div>
    </div>
    <div style={{display:"flex",gap:10,justifyContent:"flex-end",paddingTop:16,borderTop:`1px solid ${T.border}`}}>
      <button onClick={onBack} style={{padding:"10px 24px",borderRadius:10,fontFamily:T.sans,fontSize:12,fontWeight:700,cursor:"pointer",background:"transparent",color:T.ink3,border:`1px solid ${T.border}`}}>Continue Editing</button>
      <button onClick={()=>{if(pub)return;setPub(true);onPublish(draft);}} disabled={pub} style={{padding:"10px 32px",borderRadius:10,border:"none",fontFamily:T.sans,fontSize:12,fontWeight:700,cursor:"pointer",background:`linear-gradient(135deg,${T.accent},#9E4520)`,color:"#fff",boxShadow:`0 2px 16px ${T.accent}30`}}>{pub?"Publishing…":"Publish"}</button>
    </div>
  </div>;
}

// ═══════════════════════════════════════════════════
// PUBLISHED — springboard, not dead end
// ═══════════════════════════════════════════════════
function PublishedScreen({draft,onNew,onProfile,onBookCommunity,onAddShelf}){
  const tc=TYPES[draft.type];const[ia,setIA]=useState(false);const[copied,setCopied]=useState(false);const[shelved,setShelved]=useState(false);
  useEffect(()=>{setTimeout(()=>setIA(true),400);},[]);
  const msg={original:"Your words are on the page. They belong to the world now.",review:"Your reckoning with this book is live. Let the conversation begin.",recommendation:"You\u2019ve pointed someone toward a book that matters. That\u2019s a gift.",spoiler:"The door is open. Only those who\u2019ve been there will walk through."}[draft.type];

  // Clear local draft and record publish for rate limiting
  useEffect(()=>{
    try{localStorage.removeItem(`precis_draft_${draft.type}`);}catch(e){}
    if(draft.type==="original"){
      try{const h=JSON.parse(localStorage.getItem("precis_ow_publishes")||"[]");h.push(Date.now());localStorage.setItem("precis_ow_publishes",JSON.stringify(h.filter(ts=>Date.now()-ts<86400000)));}catch(e){}
    }
  },[]);

  function shareX(){window.open("https://x.com/intent/tweet?text="+encodeURIComponent("Just published on Pr\u00e9cis"+(!draft.title?"":":\u201c"+draft.title+"\u201d")+"\n\nhttps://joinprecis.com"),"_blank");}
  function copyLink(){const url="https://joinprecis.com/post/"+draft.type;if(navigator.clipboard?.writeText){navigator.clipboard.writeText(url).then(()=>{setCopied(true);setTimeout(()=>setCopied(false),2500);}).catch(()=>{const ta=document.createElement("textarea");ta.value=url;ta.style.cssText="position:fixed;left:-9999px";document.body.appendChild(ta);ta.select();document.execCommand("copy");document.body.removeChild(ta);setCopied(true);setTimeout(()=>setCopied(false),2500);});}else{const ta=document.createElement("textarea");ta.value=url;ta.style.cssText="position:fixed;left:-9999px";document.body.appendChild(ta);ta.select();document.execCommand("copy");document.body.removeChild(ta);setCopied(true);setTimeout(()=>setCopied(false),2500);}}

  return <div style={{maxWidth:480,margin:"0 auto",padding:"60px 28px",textAlign:"center",animation:"fadeUp .5s ease both"}}>
    <div style={{width:72,height:72,borderRadius:"50%",margin:"0 auto 24px",background:`${tc.color}10`,border:`2px solid ${tc.color}30`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:32,position:"relative"}}>
      {tc.icon}{ia&&<div style={{position:"absolute",top:-8,right:-8,fontFamily:T.sans,fontSize:14,fontWeight:800,color:T.gold,animation:"inkRise 1.5s ease forwards"}}>+{draft.ink}</div>}
    </div>
    <h2 style={{fontFamily:T.serif,fontSize:28,fontWeight:700,color:T.ink,marginBottom:8,letterSpacing:"-.5px"}}>Published.</h2>
    <p style={{fontFamily:T.body,fontSize:14,color:T.ink3,fontStyle:"italic",lineHeight:1.6,marginBottom:8}}>{msg}</p>
    <div style={{display:"inline-flex",alignItems:"center",gap:6,padding:"8px 20px",borderRadius:10,background:`${T.gold}08`,border:`1px solid ${T.gold}15`,fontFamily:T.sans,fontSize:13,fontWeight:700,color:T.gold,marginBottom:20}}><span style={{fontSize:8}}>{"\u25CF"}</span> +{draft.ink} Ink earned</div>

    {/* Share row */}
    <div className="pub-share" style={{display:"flex",gap:8,justifyContent:"center",marginBottom:24}}>
      <button onClick={shareX} style={{padding:"8px 16px",borderRadius:8,fontFamily:T.sans,fontSize:11,fontWeight:600,cursor:"pointer",background:"transparent",color:T.ink3,border:`1px solid ${T.border}`,display:"flex",alignItems:"center",gap:5}}>{"\uD835\uDD4F"} Share on X</button>
      <button onClick={copyLink} style={{padding:"8px 16px",borderRadius:8,fontFamily:T.sans,fontSize:11,fontWeight:600,cursor:"pointer",background:"transparent",color:copied?T.green:T.ink3,border:`1px solid ${copied?`${T.green}30`:T.border}`,display:"flex",alignItems:"center",gap:5}}>{copied?"\u2705 Copied!":"\uD83D\uDCCB Copy Link"}</button>
    </div>

    <div className="fc" style={{background:T.card,border:`1px solid ${T.border}`,borderRadius:12,padding:"16px 20px",marginBottom:24,textAlign:"left"}}>
      <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:8,flexWrap:"wrap"}}>
        <CTP type={draft.type}/>{draft.book&&<span style={{fontFamily:T.sans,fontSize:11,color:T.ink3}}>on {draft.book.title}</span>}{draft.cw&&<span style={{fontSize:9,fontFamily:T.sans,color:T.amber}}>{"\u26A0"} {draft.cw}</span>}
      </div>
      {draft.title&&<div style={{fontFamily:T.serif,fontSize:16,fontWeight:700,color:T.ink,fontStyle:"italic",marginBottom:4}}>{draft.title}</div>}
      <div style={{fontFamily:T.body,fontSize:13,color:T.ink3,lineHeight:1.5,fontWeight:300}}>{draft.body.length>140?draft.body.slice(0,140)+"\u2026":draft.body}</div>
    </div>

    <div className="pub-ctas" style={{display:"flex",gap:8,justifyContent:"center",flexWrap:"wrap"}}>
      <button onClick={onNew} style={{padding:"9px 20px",borderRadius:10,fontFamily:T.sans,fontSize:12,fontWeight:700,cursor:"pointer",background:"transparent",color:T.ink3,border:`1px solid ${T.border}`}}>{"\u270D"} Write Another</button>
      <button onClick={onProfile} style={{padding:"9px 20px",borderRadius:10,border:"none",fontFamily:T.sans,fontSize:12,fontWeight:700,cursor:"pointer",background:`linear-gradient(135deg,${T.accent},#9E4520)`,color:"#fff"}}>View on Profile</button>
      {draft.type==="original"&&<button onClick={()=>pToast("Opening The Press\u2026")} style={{padding:"9px 20px",borderRadius:10,fontFamily:T.sans,fontSize:12,fontWeight:700,cursor:"pointer",background:`${T.accent}08`,color:T.accent,border:`1px solid ${T.accent}20`}}>{"\uD83D\uDCF0"} See it on The Press</button>}
      {draft.book&&<button onClick={()=>onBookCommunity(draft.book)} style={{padding:"9px 20px",borderRadius:10,fontFamily:T.sans,fontSize:12,fontWeight:700,cursor:"pointer",background:`${T.gold}08`,color:T.gold,border:`1px solid ${T.gold}20`}}>{"\uD83D\uDCD6"} {draft.book.title} Community</button>}
      <button onClick={()=>{setShelved(true);if(onAddShelf)onAddShelf(draft);}} style={{padding:"9px 20px",borderRadius:10,fontFamily:T.sans,fontSize:12,fontWeight:700,cursor:"pointer",background:shelved?`${T.green}08`:`${T.plum}08`,color:shelved?T.green:T.plum,border:`1px solid ${shelved?`${T.green}20`:`${T.plum}20`}`}}>{shelved?"\u2713 Shelved":"\u25C6 Add to Shelf"}</button>
    </div>

    <div className="fc" style={{marginTop:28,padding:"14px 18px",borderRadius:12,background:T.card,border:`1px solid ${T.border}`,fontFamily:T.sans,fontSize:11,color:T.ink3,lineHeight:1.6,textAlign:"left"}}>
      <strong style={{color:T.ink}}>What happens now?</strong><br/>
      Your post is live. As readers engage {"—"} likes, comments, shelves, reposts {"—"} you earn additional Ink. The best writing on Pr{"\u00E9"}cis isn{"\u2019"}t measured by volume. It{"\u2019"}s measured by resonance.
    </div>
    {draft.type==="original"&&<div style={{marginTop:12,padding:"10px 18px",borderRadius:12,background:`${T.green}04`,border:`1px solid ${T.green}10`,display:"flex",alignItems:"center",gap:8}}>
      <span style={{fontSize:12}}>{"\u270D"}</span>
      <div style={{fontFamily:T.body,fontSize:11,color:T.green,fontStyle:"italic",lineHeight:1.5}}>You own your words. Always. Pr{"\u00E9"}cis holds a limited, non-exclusive license to display your work on the platform. You retain full copyright and can publish elsewhere freely.</div>
    </div>}
  </div>;
}

// ═══════════════════════════════════════════════════
// MAIN
// ═══════════════════════════════════════════════════
export default function ComposeFlow(){
  const{theme,tid,setTid}=useTheme();T=theme;
  const[step,setStep]=useState("select");
  const[type,setType]=useState(null);
  const[draft,setDraft]=useState(null);
  const[initD,setInitD]=useState(null);
  const[showDis,setSD]=useState(false);
  const[showRP,setSRP]=useState(false);
  const[rpDone,setRPD]=useState(false);
  const[lastT,setLT]=useState("original");
  const[hasContent,setHC]=useState(false);

  function selType(t){setType(t);setLT(t);setStep("compose");setInitD(null);setHC(false);}
  function resume(d){setType(d.type);setStep("compose");setInitD(d);setHC(true);}
  function goPreview(d){setDraft(d);setStep("preview");setHC(true);}
  function quickPub(d){setDraft(d);setStep("published");}
  function pub(d){setDraft(d);setStep("published");}
  function reset(){setStep("select");setType(null);setDraft(null);setInitD(null);setHC(false);}
  function tryDis(){if(!hasContent&&step==="compose"){reset();}else{setSD(true);}}

  const labels={select:"New Post",compose:TYPES[type]?.label||"Compose",preview:"Preview",published:"Published"};

  return <div style={{minHeight:"100vh",background:T.bg,color:T.ink}}>
    <style>{CSS}</style>
    {showDis&&<DiscardModal onDiscard={()=>{setSD(false);reset();}} onCancel={()=>setSD(false)} hasContent={hasContent}/>}
    <div className="compose-toast" style={{display:"none",position:"fixed",bottom:24,left:"50%",transform:"translateX(-50%)",padding:"10px 24px",borderRadius:10,background:T.bg2,border:`1px solid ${T.borderHover}`,boxShadow:"0 8px 32px rgba(0,0,0,.4)",fontFamily:T.sans,fontSize:12,fontWeight:700,color:T.ink,zIndex:300,animation:"fadeUp .3s ease"}}/>
    {showRP&&<RepostOverlay post={REPOST_TARGET} onRepost={n=>{setSRP(false);setRPD(true);setTimeout(()=>setRPD(false),3000);}} onClose={()=>setSRP(false)}/>}
    {rpDone&&<div style={{position:"fixed",bottom:24,left:"50%",transform:"translateX(-50%)",padding:"10px 24px",borderRadius:10,background:T.bg2,border:`1px solid ${T.borderHover}`,boxShadow:"0 8px 32px rgba(0,0,0,.4)",fontFamily:T.sans,fontSize:12,fontWeight:700,color:T.ink,zIndex:300,animation:"fadeUp .3s ease",display:"flex",alignItems:"center",gap:8}}>
      <span style={{color:T.green}}>{"\u2713"}</span> Reposted {"·"} <span style={{color:T.gold}}>+3 Ink</span>
    </div>}

    <nav style={{position:"sticky",top:0,zIndex:100,background:`${T.bg}E6`,backdropFilter:"blur(24px) saturate(1.2)",borderBottom:`1px solid ${T.border}`}}>
      <div className="nav-i" style={{maxWidth:1100,margin:"0 auto",padding:"0 28px",display:"flex",alignItems:"center",height:56,gap:16}}>
        <span onClick={()=>{if(hasContent||step==="preview"){setSD(true);}else{pToast("Navigating to Feed\u2026");}}} style={{fontFamily:T.serif,fontSize:22,fontWeight:700,color:T.ink,letterSpacing:"-.5px",cursor:"pointer"}}>Pr<span style={{color:T.accent}}>{"\u00E9"}</span>cis</span>
        <span onClick={()=>{if(hasContent||step==="preview"){setSD(true);}else{pToast("Navigating to Feed\u2026");}}} style={{fontFamily:T.sans,fontSize:12,color:T.ink3,cursor:"pointer"}}>{"\u2190"} Feed</span>
        <span style={{fontFamily:T.sans,fontSize:13,fontWeight:600,color:T.ink2}}>{labels[step]}</span>
        <div style={{flex:1}}/>
        {(step==="compose"||step==="preview")&&<button onClick={tryDis} style={{padding:"5px 14px",borderRadius:8,fontFamily:T.sans,fontSize:11,fontWeight:600,cursor:"pointer",background:"transparent",color:T.ink4,border:`1px solid ${T.border}`}}>Discard</button>}
        <div style={{display:"flex",alignItems:"center",gap:8,marginLeft:8}}>
          <ThemeSwitcher tid={tid} setTid={setTid}/>
          <Av i={USER.initials} ink={USER.ink} s={30}/><span className="nav-user-name" style={{fontFamily:T.sans,fontSize:12,fontWeight:600,color:T.ink}}>Priya</span>
        </div>
      </div>
    </nav>

    {step!=="select"&&step!=="published"&&<div style={{maxWidth:860,margin:"0 auto",padding:"16px 28px 0",display:"flex",gap:6}}>
      {["compose","preview"].map(s=><div key={s} style={{flex:1,height:3,borderRadius:2,background:step===s||(step==="preview"&&s==="compose")?(TYPES[type]?.color||T.accent):`${T.ink4}20`,transition:"background .3s"}}/>)}
    </div>}

    <div className="compose-shell" style={{maxWidth:680,margin:"0 auto",padding:"24px 28px 60px"}}>
      {step==="select"&&<TypeSelector onSelect={selType} drafts={MOCK_DRAFTS} onResume={resume} lastType={lastT} onRepostDemo={()=>setSRP(true)}/>}
      {step==="compose"&&<ComposeScreen type={type} onBack={tryDis} onPreview={goPreview} onQuick={quickPub} initDraft={initD}/>}
      {step==="preview"&&<PreviewScreen draft={draft} onBack={()=>setStep("compose")} onPublish={pub}/>}
      {step==="published"&&<PublishedScreen draft={draft} onNew={reset} onProfile={()=>{const el=document.querySelector('.compose-toast');if(!el)return;el.textContent="\u2192 Opening Profile\u2026";el.style.display="block";setTimeout(()=>el.style.display="none",2000);}} onBookCommunity={(book)=>{const el=document.querySelector('.compose-toast');if(!el)return;el.textContent=`\uD83D\uDCD6 Opening ${book.title} Community\u2026`;el.style.display="block";setTimeout(()=>el.style.display="none",2000);}} onAddShelf={(d)=>{const el=document.querySelector(".compose-toast");if(el){el.textContent="\u25C6 Added to your shelf";el.style.display="block";setTimeout(()=>el.style.display="none",2000);}}}/>}
    </div>

    {/* Mobile Bottom Nav */}
    <nav className="mob-nav" aria-label="Mobile navigation" style={{position:"fixed",bottom:0,left:0,right:0,zIndex:200,background:`${T.bg}F2`,backdropFilter:"blur(20px)",borderTop:`1px solid ${T.border}`,display:"none",padding:"6px 0 env(safe-area-inset-bottom,8px)"}}>
      <div style={{display:"flex",justifyContent:"space-around",maxWidth:480,margin:"0 auto"}}>
        {[
          {id:"feed",icon:"\u25A3",label:"Feed",active:false},
          {id:"explore",icon:"\uD83C\uDF0D",label:"Explore",active:false},
          {id:"compose",icon:"\u270D",label:"Write",active:true},
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
