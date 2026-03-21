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


// ═══════════════════════════════════════════════════
// INK — aligned thresholds: 0/25/100/500/2000
// ═══════════════════════════════════════════════════
const TIERS=[{name:"Fresh Ink",min:0,color:T.ink3,bg:"rgba(122,112,103,0.1)"},{name:"Wet Ink",min:25,color:"#8BAAB8",bg:"rgba(139,170,184,0.1)"},{name:"Set Ink",min:100,color:"#A0C090",bg:"rgba(160,192,144,0.1)"},{name:"Deep Ink",min:500,color:T.gold,bg:"rgba(196,162,101,0.1)"},{name:"Indelible",min:2000,color:T.accent,bg:"rgba(184,86,42,0.12)"}];
function getTier(n){for(let i=TIERS.length-1;i>=0;i--)if(n>=TIERS[i].min)return TIERS[i];return TIERS[0];}
function fmt(n){return n>=1000?(n/1000).toFixed(1)+"k":String(n);}

const CT={original:{label:"Original Work",icon:"\u270D",color:T.accent},review:{label:"Review",icon:"\uD83D\uDCDD",color:T.gold},recommendation:{label:"Recommendation",icon:"\uD83D\uDCDA",color:T.green},spoiler:{label:"Spoiler Zone",icon:"\uD83D\uDD13",color:T.red}};
const LENSES={analyst:{icon:"\uD83D\uDD2C",label:"Analyst",color:"#5B9BD5"},empath:{icon:"\uD83D\uDC96",label:"Empath",color:"#D4788C"},philosopher:{icon:"\uD83D\uDCA1",label:"Philosopher",color:T.gold},storyteller:{icon:"\uD83C\uDFAD",label:"Storyteller",color:"#9B7ED4"},explorer:{icon:"\uD83D\uDDFA\uFE0F",label:"Explorer",color:"#5BAD7A"},alchemist:{icon:"\u2727",label:"Alchemist",color:"#C4A06A"}};

// ═══════════════════════════════════════════════════
// MOCK DATA
// ═══════════════════════════════════════════════════
const USERS=[
  {id:"u1",name:"Ingrid Solberg",handle:"@ingridreads",initials:"IS",ink:3420,lens:"analyst"},
  {id:"u2",name:"Kofi Asante",handle:"@kofi_writes",initials:"KA",ink:8750,lens:"storyteller"},
  {id:"u3",name:"Yuki Tanaka",handle:"@yukiwrites",initials:"YT",ink:1240,lens:"empath"},
  {id:"u4",name:"James Harlow",handle:"@jharlow",initials:"JH",ink:540,lens:"explorer"},
  {id:"u5",name:"Priya Anand",handle:"@priyareads",initials:"PA",ink:12300,lens:"empath"},
  {id:"u6",name:"Tom\u00E1s Reyes",handle:"@tomasreyes",initials:"TR",ink:280,lens:"philosopher"},
  {id:"u7",name:"Aisha Keita",handle:"@aishak",initials:"AK",ink:4100,lens:"storyteller"},
  {id:"me",name:"Sean",handle:"@sean",initials:"SP",ink:1240,lens:"analyst"},
  {id:"u8",name:"Amira Khoury",handle:"@amirakhoury",initials:"AK",ink:8400,lens:"alchemist",followers:1890}];
const USER={name:"Priya Anand",handle:"@priyareads",initials:"PA",ink:12300,lens:"empath"};


const CURRENTLY_READING=[
  {user:USERS[0],book:"Intermezzo",author:"Sally Rooney",progress:72},
  {user:USERS[1],book:"James",author:"Percival Everett",progress:45},
  {user:USERS[4],book:"Orbital",author:"Samantha Harvey",progress:88},
  {user:USERS[2],book:"The Vegetarian",author:"Han Kang",progress:31},
  {user:USERS[6],book:"Creation Lake",author:"Rachel Kushner",progress:56},
  {user:USERS[3],book:"Beloved",author:"Toni Morrison",progress:63},
];

const LENS_PROMPTS={
  analyst:["Diagram the structure of the last book that surprised you.","A book where the weakest chapter carries the most weight."],
  empath:["Write about a book that made you put it down and breathe.","The character you still worry about."],
  philosopher:["What question is the last book you read secretly asking?","Two books that disagree. Who wins?"],
  storyteller:["The opening line you wish you'd written.","Rewrite a scene that almost worked."],
  explorer:["A book from a place you've never been that made you feel home.","Recommend something nobody in your circle has read."],
  alchemist:["The invisible thread between two books on your shelf.","Write about a connection between books that nobody would expect."],
};
const PROMPTS=["Write about an object you inherited that carries more weight than it should.","The last lie your character told before everything changed.","A letter that was never sent, found decades later in a book.","Two strangers in a waiting room discover they share the same recurring dream.","Describe a place you\u2019ve never been but feel homesick for."];

const FEED_ITEMS=[
  {id:"p1",following:true,lensMatch:true,type:"original",user:USERS[1],timeAgo:"1h",lens:"storyteller",title:"The Cartographer\u2019s Confession",isFirstPost:false,cw:"",
    genreTags:["Literary Fiction","Magical Realism"],moodTags:["Haunting","Lush"],inspiredBy:[{title:"Beloved",author:"Toni Morrison"}],attested:true,poetryMode:false,
    text:"The first map I ever drew was a lie.\n\nI was nine, and my father had asked me to sketch the walk from our house to the schoolyard. I drew it faithfully \u2014 the cracked sidewalk past Miss Lorraine\u2019s compound, the shortcut through the empty lot where glass glittered in the dirt like fallen stars, the crossing at Meridian where the light took forever.\n\nBut when I reached the schoolyard itself, I kept drawing. I added a creek that didn\u2019t exist. A footbridge. A stand of birch trees with white bark peeling like old letters. I drew the school smaller than it was and the sky larger, and when my father looked at it he said nothing for a long time.\n\nThen he said: \u2018You draw the world you\u2019d rather walk through.\u2019\n\nI have been making maps professionally for twenty-two years. I work for a firm that contracts with municipal governments \u2014 sewer lines, zoning overlays, flood plains. My maps are accurate to the centimeter. They are reviewed, certified, filed. No one has ever questioned one.\n\nBut every map I have ever made contains one small invention. A cul-de-sac that doesn\u2019t exist. A park bench by a pond that was filled in decades ago. A name on a street that belongs to no one \u2014 or to someone only I remember.\n\nI don\u2019t know when it became a compulsion. I only know I cannot stop.",
    likes:312,comments:87,bookmarks:156,shelved:94,reposts:41,isLiked:false,isShelved:false,
    boundWith:{name:"Priya Anand",via:"Inheritance Tax"},
    shelvedBy:[USERS[0],USERS[4]],
    topComment:{user:USERS[6],text:"The line about the glass glittering like fallen stars \u2014 that\u2019s the whole story compressed into one image. The beauty is always in the wrong place."},
    crossBookSpoiler:false,crossBooks:[]},
  {id:"p2",following:true,lensMatch:true,type:"original",user:USERS[4],timeAgo:"3h",lens:"empath",title:"Inheritance Tax",isFirstPost:false,cw:"",
    genreTags:["Memoir","Personal Essay"],moodTags:["Tender","Elegiac"],inspiredBy:[],attested:true,poetryMode:false,
    text:"My grandmother left me her tongue.\n\nNot the language \u2014 I already had that, the Tamil she\u2019d fed me like rice water when I was small, spooning words into my mouth before I had teeth to chew them. No. She left me the physical fact of her voice. The way it dropped to a whisper when she was furious. The way it climbed when she was lying. The way it broke, clean as a green stick fracture, whenever she said my grandfather\u2019s name.\n\nI discovered this at her funeral, when I opened my mouth to read the eulogy and my mother grabbed my arm.\n\n\u2018You sound exactly like her,\u2019 she said.\n\nShe did not mean it as a comfort.\n\nThere are things we inherit that no one warns us about. Not the house, not the jewelry, not the recipes written in fading ink on index cards. The real inheritance is gestural. The way you hold a pen. The angle of your head when you\u2019re thinking. The precise pitch of your grief.",
    likes:489,comments:124,bookmarks:267,shelved:183,reposts:72,isLiked:true,isShelved:false,
    shelvedBy:[USERS[0],USERS[6],USERS[2]],
    topComment:{user:USERS[0],text:"\u201CThe precise pitch of your grief.\u201D Priya, this is devastating. The restraint in the last paragraph does more work than most writers\u2019 entire stories."},
    crossBookSpoiler:false,crossBooks:[]},
  {id:"p3",following:false,lensMatch:false,type:"review",user:USERS[0],timeAgo:"5h",lens:"analyst",
    bookRef:{title:"Intermezzo",author:"Sally Rooney"},cw:"",
    text:"Rooney\u2019s fourth novel abandons the email-and-chat formal experiments of Beautiful World and returns to close third person \u2014 but the lens has matured. The two brothers at the center, Peter and Ivan, are rendered with a patience she hasn\u2019t shown before. Peter\u2019s grief is performative and self-aware in ways that would be insufferable if Rooney didn\u2019t also let him be right about some things. Ivan\u2019s chess obsession functions not as metaphor but as the actual architecture of how he processes emotion \u2014 positional, silent, several moves ahead of his own feelings.\n\nThe book\u2019s real argument is about how grief reorganizes the hierarchy of relationships. Rooney trusts the reader enough to leave that argument unstated.",
    likes:156,comments:43,bookmarks:78,shelved:52,reposts:18,isLiked:false,isShelved:false,shelvedBy:[USERS[4]],topComment:null,
    crossBookSpoiler:false,crossBooks:[]},
  {id:"wp1",following:true,lensMatch:true,type:"_prompt",promptText:(LENS_PROMPTS[USER.lens]||PROMPTS)[0]},
  {id:"p4",following:true,lensMatch:false,type:"original",user:USERS[2],timeAgo:"7h",lens:"empath",title:"Sixteen Funerals for a Living Man",isFirstPost:false,cw:"grief, death",
    genreTags:["Literary Fiction"],moodTags:["Dark","Visceral"],inspiredBy:null,attested:true,poetryMode:false,
    text:"My father has died sixteen times.\n\nThe first was in Lagos, 1987. Heart attack at a wedding \u2014 dropped right there on the dance floor with his agbada fanning out around him like a parachute that opened too late. They drove him to the hospital in the bride\u2019s uncle\u2019s Mercedes. He came back.\n\nThe second was in London, 1994. A clot in his lung. He was teaching a seminar on constitutional law at SOAS and stopped mid-sentence, they told me, as if he\u2019d simply run out of things to say. He came back.\n\nBy the fifth or sixth time, my mother had stopped rushing to the hospital. She would finish whatever she was cooking, cover it, wash her hands slowly, and then call for a taxi. \u2018Your father,\u2019 she would say, the way you\u2019d say \u2018the weather\u2019 or \u2018traffic\u2019 \u2014 a force beyond negotiation that you simply planned around.",
    likes:201,comments:58,bookmarks:112,shelved:78,reposts:33,isLiked:false,isShelved:false,shelvedBy:[],
    topComment:{user:USERS[1],text:"The agbada as a parachute that opened too late. Nneka, you have this gift for metaphors that feel inevitable \u2014 like they were always the only way to say it."},
    crossBookSpoiler:false,crossBooks:[]},
  {id:"p5",following:true,lensMatch:true,type:"recommendation",user:USERS[3],timeAgo:"10h",lens:"explorer",
    bookRef:{title:"The Vegetarian",author:"Han Kang"},cw:"",
    text:"If you read Kang\u2019s Nobel lecture and felt something shift in your understanding of what fiction can do with violence and the body, start here. It\u2019s her shortest major work and her most disturbing \u2014 not because of what happens, but because of the calm, almost clinical register in which the people around Yeong-hye discuss her transformation. The horror is in the normalcy of everyone else\u2019s reaction.\n\nPairs well with: Convenience Store Woman by Sayaka Murata, if you want to stay in the territory of women whose refusal to perform normalcy terrifies everyone around them.",
    likes:93,comments:27,bookmarks:134,shelved:89,reposts:15,isLiked:true,isShelved:false,shelvedBy:[USERS[0],USERS[2]],topComment:null,
    crossBookSpoiler:false,crossBooks:[]},
  {id:"p5b",following:false,lensMatch:true,type:"review",user:USERS[0],timeAgo:"11h",lens:"analyst",
    bookRef:{title:"Beloved",author:"Toni Morrison"},cw:"",
    text:"What makes Beloved devastating isn\u2019t the central act \u2014 it\u2019s how Morrison structures the revelation. The way Sethe\u2019s choice is withheld and then delivered functions identically to how Milkman\u2019s identity is revealed in Song of Solomon: the truth is already embedded in the landscape, and the reader is the last to assemble it.\n\nIn Sula, Morrison does something similar with the riverbank scene. She lets the aftermath speak for decades before circling back to the act itself. By the time you understand what Sula and Nel actually did, you\u2019ve already forgiven them \u2014 which is the point.\n\nMorrison\u2019s project across all three novels is the same: she makes you complicit in the not-knowing, so that when knowledge arrives, it arrives as grief.",
    likes:67,comments:22,bookmarks:41,shelved:38,reposts:9,isLiked:false,isShelved:false,shelvedBy:[USERS[4]],topComment:{user:USERS[2],text:"This is exactly right about complicity. The reader performs the same avoidance the characters do."},
    crossBookSpoiler:true,crossBooks:["Song of Solomon","Sula"]},
  {id:"p6",following:false,lensMatch:true,type:"original",user:USERS[5],timeAgo:"12h",lens:"philosopher",title:"The Sound a House Makes When No One Is Home",isFirstPost:true,cw:"",
    genreTags:["Personal Essay","Memoir"],moodTags:["Quiet","Elegiac"],inspiredBy:[],attested:true,poetryMode:false,
    text:"I learned the word for it in Portuguese first. Saudade. The longing for something that may never have existed. My mother used it when she talked about the house in S\u00E3o Paulo where she grew up, the one her father sold before she was old enough to memorize its rooms.\n\nWhen we moved to Newark, she would stand in the kitchen of our apartment on Elm Street and close her eyes, and I knew \u2014 though I was only five, I knew \u2014 that she was listening for the sound of that other house. The creak of its stairs. The way rain hit its particular roof.\n\nI am thirty-eight now and I have lived in eleven apartments in four cities. I have never bought a house. I tell people it\u2019s a financial decision, and it is, partly. But the truth is that I am afraid of what I would hear in the silence of a house that belonged to me. I am afraid it would sound like nothing.\n\nOr worse \u2014 that it would sound like something I recognized.",
    likes:34,comments:18,bookmarks:22,shelved:11,reposts:5,isLiked:false,isShelved:false,shelvedBy:[],
    topComment:{user:USERS[4],text:"Tom\u00E1s, this is a stunning debut on Pr\u00E9cis. The last two lines stopped me cold. Welcome."},
    crossBookSpoiler:false,crossBooks:[]},
  {id:"wp2",following:true,lensMatch:false,type:"_prompt",promptText:(LENS_PROMPTS[USER.lens]||PROMPTS)[1]},
  {id:"p7",following:true,lensMatch:false,type:"spoiler",user:USERS[4],timeAgo:"14h",lens:"empath",
    bookRef:{title:"Beloved",author:"Toni Morrison"},spoilerWarning:true,spoilerPage:250,cw:"",
    text:"The moment that restructures the entire novel is when you realize Beloved is not a metaphor. Morrison has been building toward this with such care that you accept the supernatural element the way Sethe does — not as something impossible but as something inevitable. Of course the dead come back. Of course memory has a body. The Clearing scene where Baby Suggs preaches self-love to the community is the moral center of the book, and everything that follows is a test of whether that love can survive what Sethe did. Morrison never lets you off the hook by making Sethe’s choice simple.",
    likes:178,comments:96,bookmarks:67,shelved:45,reposts:22,isLiked:false,isShelved:false,shelvedBy:[USERS[0]],topComment:null,
    crossBookSpoiler:false,crossBooks:[]},
  {id:"p8",following:true,lensMatch:true,type:"original",user:USERS[8],timeAgo:"3h",lens:"alchemist",title:"Three Books, Same Silence",isFirstPost:false,cw:"",
    genreTags:["Cultural Criticism","Literary Fiction"],moodTags:["Meditative"],inspiredBy:[{title:"Never Let Me Go",author:"Kazuo Ishiguro"},{title:"Piranesi",author:"Susanna Clarke"},{title:"The Vegetarian",author:"Han Kang"}],creatorRef:[],attested:true,poetryMode:false,
    text:"Piranesi, Never Let Me Go, The Vegetarian — three books that have nothing in common except that they circle the same absence. In each, a protagonist accepts a world that the reader knows is wrong. In each, the moment of recognition isn’t liberation — it’s loss. Ishiguro gives his characters the softest surrender. Han Kang makes hers violent. Clarke makes hers holy.\n\nWhat I’m saying is: the quiet ones are the ones that break you. And these three are in conversation whether their authors know it or not.",
    tags:["synthesis","Piranesi","Never Let Me Go","The Vegetarian"],likes:203,comments:47,bookmarks:89,shelved:71,reposts:18,isLiked:false,isShelved:false,shelvedBy:[USERS[4]],
    topComment:{user:USERS[0],text:"The leap from Ishiguro to Clarke to Han Kang — and the fact that it works — is exactly why this platform exists."},
    crossBookSpoiler:false,crossBooks:[]},
];

const TRENDING_S=[{title:"Inheritance Tax",author:"Priya Anand",eng:685},{title:"The Cartographer\u2019s Confession",author:"Kofi Asante",eng:440},{title:"Sixteen Funerals for a Living Man",author:"Yuki Tanaka",eng:371}];
const TRENDING_B=[{title:"Intermezzo",author:"Sally Rooney",waypoints:342},{title:"James",author:"Percival Everett",waypoints:287},{title:"Orbital",author:"Samantha Harvey",waypoints:198},{title:"The Vegetarian",author:"Han Kang",waypoints:156}];

// Reading streak data
const STREAK={current:7,longest:23,todayDone:true};
const STREAK_MSGS=["You showed up. That matters.","One week of showing up for the page.","The habit is becoming the voice.","Your attention is an act of creation.","Consistency is the deepest form of craft."];
function streakMsg(n){return STREAK_MSGS[Math.min(n,STREAK_MSGS.length-1)%STREAK_MSGS.length];}

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
.btn-g{transition:all .15s}.btn-g:hover{color:${T.gold}!important}

@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=Source+Serif+4:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Sans:wght@400;500;600;700&display=swap');
*{margin:0;padding:0;box-sizing:border-box}body{background:${T.bg}}
::selection{background:${T.gold}30;color:${T.ink}}
::-webkit-scrollbar{width:5px}::-webkit-scrollbar-track{background:transparent}::-webkit-scrollbar-thumb{background:${T.ink4};border-radius:3px}
@keyframes fadeUp{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:none}}
@keyframes slideR{from{opacity:0;transform:translateX(10px)}to{opacity:1;transform:none}}
@keyframes popIn{0%{transform:scale(1)}50%{transform:scale(1.25)}100%{transform:scale(1)}}
@keyframes countBounce{0%{transform:translateY(0)}40%{transform:translateY(-4px)}100%{transform:translateY(0)}}
.skip-link{position:absolute;left:-9999px;top:auto;width:1px;height:1px;overflow:hidden;z-index:999;font-family:${T.sans};font-size:12px;font-weight:700;text-decoration:none;color:#fff;}
.skip-link:focus{position:fixed;top:4px;left:4px;width:auto;height:auto;padding:8px 16px;background:${T.accent};color:#fff;border-radius:8px;z-index:999;}
button:focus-visible{outline:2px solid ${T.gold};outline-offset:2px;border-radius:8px;}
a:focus-visible{outline:2px solid ${T.gold};outline-offset:2px;}
.eng-pop{animation:popIn .25s ease;}
.cr-scroll{overflow-x:auto;scrollbar-width:none;}.cr-scroll::-webkit-scrollbar{display:none;}
.hscroll-y{scrollbar-width:thin;scrollbar-color:rgba(212,168,85,.12) transparent;}.hscroll-y::-webkit-scrollbar{width:4px;}.hscroll-y::-webkit-scrollbar-track{background:transparent;}.hscroll-y::-webkit-scrollbar-thumb{background:rgba(212,168,85,.12);border-radius:4px;}.hscroll-y::-webkit-scrollbar-thumb:hover{background:rgba(212,168,85,.25);}
@media(max-width:680px){.feed-grid{grid-template-columns:1fr!important;}.feed-side{display:none!important;}.nav-search{display:none!important;}.nav-tabs{gap:0!important;}.mob-nav{display:flex!important;}.feed-main{padding-bottom:80px!important;}}
@media(max-width:600px){.nav-i{padding:0 12px!important;}.feed-main{padding:12px!important;}.nav-tabs button span.nav-label{display:none!important;}}
@media(prefers-reduced-motion:reduce){*{animation-duration:0.01ms!important;animation-iteration-count:1!important;transition-duration:0.01ms!important;}}
@media(max-width:480px){.feed-main{padding:8px!important;}.feed-grid{gap:12px!important;}}

.feed-card{transition:border-color .2s,box-shadow .2s;}
.feed-card:hover{border-color:${T.borderHover};box-shadow:0 2px 12px rgba(0,0,0,.04);}
@keyframes shimmer{0%{background-position:-200% 0;}100%{background-position:200% 0;}}
.skel{background:linear-gradient(90deg,${T.bg3} 25%,${T.bg2} 50%,${T.bg3} 75%);background-size:200% 100%;animation:shimmer 1.5s infinite;border-radius:6px;}
`;

// ═══════════════════════════════════════════════════
// COMPONENTS
// ═══════════════════════════════════════════════════
const Av=({i,ink=0,s=38})=>{const t=getTier(ink);return <div style={{width:s,height:s,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,fontFamily:T.sans,fontSize:s*.34,fontWeight:700,color:T.ink2,background:`linear-gradient(145deg,${T.bg3},#0E0C09)`,border:`2px solid ${t.color}50`,letterSpacing:".5px"}}>{i}</div>;};
const IB=({ink,show=false})=>{const t=getTier(ink);return <span style={{display:"inline-flex",alignItems:"center",gap:4,padding:"2px 7px",borderRadius:5,fontSize:10,fontWeight:700,fontFamily:T.sans,letterSpacing:".3px",color:t.color,background:t.bg,border:`1px solid ${t.color}18`}}><span style={{fontSize:6}}>{"\u25CF"}</span>{show?`${fmt(ink)} · ${t.name}`:t.name}</span>;};
const CBadge=({type})=>{const c=CT[type];if(!c)return null;return <span style={{display:"inline-flex",alignItems:"center",gap:4,padding:"3px 10px",borderRadius:20,fontSize:10.5,fontWeight:600,fontFamily:T.sans,color:c.color,background:`${c.color}12`,border:`1px solid ${c.color}20`}}>{c.icon} {c.label}</span>;};
const LBadge=({lens})=>{const l=LENSES[lens];if(!l)return null;return <span style={{fontSize:10,fontFamily:T.sans,fontWeight:600,color:l.color,opacity:.7}}>{l.icon}</span>;};

function BookBar({book}){
  if(!book)return null;
  return <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:14,padding:"10px 14px",borderRadius:8,background:T.goldGlow,border:`1px solid ${T.border}`}}>
    <div style={{width:28,height:40,borderRadius:"2px 4px 4px 2px",flexShrink:0,background:`linear-gradient(135deg,${T.accent}CC,#6B2A10)`,boxShadow:"2px 1px 6px rgba(0,0,0,0.4)",display:"flex",alignItems:"center",justifyContent:"center"}}>
      <span style={{fontSize:11,color:"rgba(255,255,255,0.5)",fontFamily:T.serif,fontWeight:700,transform:"rotate(-90deg)"}}>{book.title.charAt(0)}</span>
    </div>
    <div><div style={{fontFamily:T.serif,fontSize:13.5,fontWeight:700,color:T.ink}}>{book.title}</div><div style={{fontFamily:T.body,fontSize:11.5,color:T.ink3,fontStyle:"italic"}}>{book.author}</div></div>
  </div>;
}

function EngBtn({icon,count,active,color,onClick,label,toggle=false}){
  const[h,setH]=useState(false);const[pop,setPop]=useState(false);const[bounce,setBounce]=useState(false);
  function handleClick(){if(onClick){onClick();setPop(true);if(toggle)setBounce(true);setTimeout(()=>setPop(false),300);setTimeout(()=>setBounce(false),400);}}
  return <button onClick={onClick?handleClick:undefined} aria-label={`${label}${count>0?`, ${count}`:""}`} {...(toggle?{"aria-pressed":active}:{})}
    onMouseEnter={()=>setH(true)} onMouseLeave={()=>setH(false)}
    style={{display:"flex",alignItems:"center",gap:5,padding:"6px 8px",background:active?`${color}10`:h?"rgba(255,255,255,0.02)":"transparent",border:"none",borderRadius:8,cursor:"pointer",color:active?color:h?T.ink2:T.ink3,fontSize:12,fontFamily:T.sans,fontWeight:500,transition:"all 0.15s"}}>
    <span className={pop?"eng-pop":""} style={{fontSize:14,lineHeight:1,transition:"transform 0.15s"}}>{icon}</span>
    {count>0&&<span style={{animation:bounce?"countBounce .3s ease":undefined,transition:"color 0.15s"}}>{fmt(count)}</span>}
  </button>;
}

// Currently Reading — FIXED: useRef not useState
function CurrentlyReadingBar(){
  const scrollRef=useRef(null);
  return <div className="fc" style={{background:T.card,border:`1px solid ${T.border}`,borderRadius:12,padding:"12px 16px",marginBottom:14,overflow:"hidden"}}>
    <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:10}}>
      <span style={{fontSize:12,color:T.gold}}>{"\uD83D\uDCD6"}</span>
      <span style={{fontFamily:T.sans,fontSize:11,fontWeight:700,color:T.ink3,letterSpacing:".8px",textTransform:"uppercase"}}>Currently Reading</span>
    </div>
    <div ref={scrollRef} className="cr-scroll" style={{display:"flex",gap:10,paddingBottom:4}}>
      {CURRENTLY_READING.map((cr,i)=><div key={i} tabIndex={0} role="button" aria-label={`${cr.user.name} reading ${cr.book} by ${cr.author}, ${cr.progress}% complete`} onClick={()=>{const el=document.querySelector('.feed-toast');if(el){el.textContent=`\u{1F4D6} Opening ${cr.book} by ${cr.author}\u2026`;el.style.display="block";setTimeout(()=>el.style.display="none",2200);}}} onKeyDown={e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();e.currentTarget.click();}}} style={{display:"flex",alignItems:"center",gap:8,padding:"7px 12px",borderRadius:10,flexShrink:0,background:T.bg2,border:`1px solid ${T.border}`,cursor:"pointer",transition:"border-color 0.2s"}} onMouseEnter={e=>e.currentTarget.style.borderColor=T.borderHover} onMouseLeave={e=>e.currentTarget.style.borderColor=T.border} onFocus={e=>e.currentTarget.style.borderColor=T.borderHover} onBlur={e=>e.currentTarget.style.borderColor=T.border}>
        <Av i={cr.user.initials} ink={cr.user.ink} s={24}/>
        <div style={{minWidth:0}}>
          <div style={{fontFamily:T.serif,fontSize:11.5,fontWeight:600,color:T.ink,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis",maxWidth:130}}>{cr.book}</div>
          <div style={{display:"flex",alignItems:"center",gap:5,marginTop:1}}>
            <span style={{fontFamily:T.sans,fontSize:10,color:T.ink3}}>{cr.author}</span>
            <div style={{width:36,height:2.5,borderRadius:2,background:`${T.gold}18`,overflow:"hidden"}}><div style={{width:`${cr.progress}%`,height:"100%",borderRadius:2,background:`linear-gradient(90deg,${T.gold},${T.accent})`}}/></div>
            <span style={{fontFamily:T.sans,fontSize:9,color:T.ink3}}>{cr.progress}%</span>
          </div>
        </div>
      </div>)}
    </div>
  </div>;
}

function WritingPromptCard({text,onWrite}){
  const[h,setH]=useState(false);
  return <div onMouseEnter={()=>setH(true)} onMouseLeave={()=>setH(false)} role="complementary" aria-label="Writing prompt"
    style={{position:"relative",overflow:"hidden",background:h?`linear-gradient(135deg,${T.accent}0A,${T.goldGlow},${T.accent}06)`:`linear-gradient(135deg,${T.accent}06,${T.goldGlow})`,border:`1px solid ${T.gold}18`,borderRadius:14,padding:"28px 28px 24px",textAlign:"center",transition:"all 0.3s"}}>
    <div style={{position:"absolute",top:10,left:14,fontSize:20,color:`${T.gold}20`,fontFamily:T.serif,lineHeight:1}}>{"\u201C"}</div>
    <div style={{position:"absolute",bottom:8,right:14,fontSize:20,color:`${T.gold}20`,fontFamily:T.serif,lineHeight:1,transform:"rotate(180deg)"}}>{"\u201C"}</div>
    <div style={{fontFamily:T.sans,fontSize:9.5,fontWeight:700,color:T.gold,letterSpacing:"1.5px",textTransform:"uppercase",marginBottom:12,opacity:.7}}>Writing Prompt</div>
    <div style={{fontFamily:T.serif,fontSize:16.5,fontStyle:"italic",color:T.ink,lineHeight:1.55,maxWidth:460,margin:"0 auto 18px",fontWeight:400}}>{text}</div>
    <button onClick={()=>{if(onWrite)onWrite(text);}} style={{padding:"8px 22px",borderRadius:10,border:`1px solid ${T.gold}30`,background:`${T.gold}08`,fontFamily:T.sans,fontSize:12,fontWeight:600,color:T.gold,cursor:"pointer"}}>{"\u270D"} Write from this prompt</button>
  </div>;
}

function FirstTag(){return <span style={{display:"inline-flex",alignItems:"center",gap:4,padding:"3px 10px",borderRadius:20,fontSize:10,fontWeight:700,fontFamily:T.sans,letterSpacing:".3px",color:T.gold,background:"linear-gradient(135deg,rgba(212,168,85,0.12),rgba(184,86,42,0.08))",border:"1px solid rgba(212,168,85,0.2)"}}>{"\u2726"} First Story</span>;}

function SpoilerGate({children,revealed,onReveal,bookRef,spoilerPage,crossBookSpoiler,crossBooks}){
  if(revealed)return children;
  const isCross=crossBookSpoiler&&crossBooks?.length>0;
  const revLabel=isCross?`Reveal content — contains spoilers for ${crossBooks.join(" and ")}`:`Reveal spoiler content${spoilerPage?` through page ${spoilerPage}`:""} ${bookRef?`of ${bookRef.title}`:""}`;
  return <div style={{position:"relative"}} role="region" aria-label={isCross?"Cross-book spoiler warning":"Spoiler zone"}>
    <div style={{filter:"blur(8px)",userSelect:"none",pointerEvents:"none",opacity:.4}} aria-hidden="true">{children}</div>
    <div style={{position:"absolute",inset:0,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:8}}>
      <span style={{fontSize:24}} aria-hidden="true">{isCross?"\uD83D\uDD12":"\uD83D\uDD13"}</span>
      <span style={{fontFamily:T.sans,fontSize:12,fontWeight:600,color:T.ink2}}>{isCross?"Cross-Book Spoiler Warning":"Spoiler Zone"}</span>
      {isCross&&<span style={{fontFamily:T.sans,fontSize:10,color:T.ink4,marginTop:-4,textAlign:"center",maxWidth:280,lineHeight:1.5}}>This {bookRef?"review of "+bookRef.title:"post"} contains spoilers for <strong style={{color:T.ink3}}>{crossBooks.join(" & ")}</strong></span>}
      {spoilerPage&&!isCross&&<span style={{fontFamily:T.sans,fontSize:10,color:T.ink4,marginTop:-4}}>Through page {spoilerPage}{bookRef?` of ${bookRef.title}`:""}</span>}
      <button onClick={onReveal} aria-label={revLabel} style={{padding:"7px 20px",borderRadius:8,border:`1px solid ${T.red}40`,background:`${T.red}12`,color:T.red,fontFamily:T.sans,fontSize:12,fontWeight:600,cursor:"pointer"}}>{isCross?"I\u2019ve read "+crossBooks.join(" & "):"I\u2019ve read past this point"}</button>
    </div>
  </div>;
}

function ShelvedByLine({shelvedBy}){
  if(!shelvedBy||!shelvedBy.length)return null;
  const names=shelvedBy.slice(0,2).map(u=>u.name);const extra=shelvedBy.length-2;
  let text=names.length===1?names[0]:names.length===2&&extra<=0?`${names[0]} and ${names[1]}`:`${names[0]}, ${names[1]}`;
  if(extra>0)text+=` and ${extra} other${extra>1?"s":""} you follow`;
  return <div style={{display:"flex",alignItems:"center",gap:6,padding:"6px 0 2px",fontSize:11.5,fontFamily:T.sans,color:T.ink3}}>
    <span style={{color:T.goldDim,fontSize:11}}>{"\u25C6"}</span>
    <span>Shelved by <span style={{color:T.ink2,fontWeight:600}}>{text}</span></span>
  </div>;
}

function BoundIndicator({boundWith}){
  if(!boundWith)return null;
  return <div style={{display:"flex",alignItems:"center",gap:6,padding:"6px 10px",marginBottom:8,borderRadius:8,background:`${T.plum}06`,border:`1px solid ${T.plum}12`,fontSize:11,fontFamily:T.sans}}>
    <span style={{fontSize:12,color:T.plum}}>{"\u29D7"}</span>
    <span style={{color:T.ink3}}>Bound with <span style={{color:T.plum,fontWeight:600}}>{boundWith.name}</span> via <span style={{fontStyle:"italic",color:T.ink2}}>"{boundWith.via}"</span></span>
  </div>;
}

function TopCommentPreview({comment,viewerLens}){
  if(!comment)return null;
  const sameLens=comment.user.lens===viewerLens;
  return <div style={{display:"flex",alignItems:"flex-start",gap:8,padding:"8px 12px",marginTop:6,borderRadius:8,background:sameLens?`${LENSES[viewerLens]?.color||T.gold}06`:T.bg2,border:`1px solid ${sameLens?`${LENSES[viewerLens]?.color||T.gold}12`:T.border}`}}>
    <Av i={comment.user.initials} ink={comment.user.ink} s={22}/>
    <div style={{flex:1,minWidth:0}}>
      <span style={{fontFamily:T.sans,fontSize:11,fontWeight:600,color:T.ink2}}>{comment.user.name} </span>
      {sameLens&&<span style={{fontFamily:T.sans,fontSize:9,fontWeight:700,color:LENSES[viewerLens]?.color,opacity:.7}}>Your lens</span>}
      <span style={{fontFamily:T.body,fontSize:11.5,color:T.ink3,lineHeight:1.5,display:"-webkit-box",WebkitLineClamp:2,WebkitBoxOrient:"vertical",overflow:"hidden"}}> {comment.text}</span>
    </div>
  </div>;
}

// ═══════════════════════════════════════════════════
// FEED CARD
// ═══════════════════════════════════════════════════
function FeedCard({item,onToggle,onHide,onMute,onReport}){
  const pToast=msg=>{const el=document.querySelector('.feed-toast');if(el){el.textContent=msg;el.style.display="block";setTimeout(()=>el.style.display="none",2200);}};
  const[exp,setExp]=useState(false);const[spoilRev,setSR]=useState(false);const[hov,setHov]=useState(false);
  const[showReply,setShowReply]=useState(false);const[reply,setReply]=useState("");const[shared,setShared]=useState(false);
  const[cwOpen,setCWO]=useState(false);const[postMenu,setPostMenu]=useState(false);
  const isOwn=item.user.handle==="@yourlens";
  const isLong=item.text.length>300;
  const display=exp||!isLong?item.text:item.text.slice(0,300)+"\u2026";
  const wc=item.text.trim().split(/\s+/).length;
  const rt=Math.ceil(wc/200);
  const isFirst=item.isFirstPost;
  const lensData=item.lens?LENSES[item.lens]:null;
  function doShare(){navigator.clipboard.writeText(`https://joinprecis.com/post/${item.id}`).catch(()=>{});setShared(true);setTimeout(()=>setShared(false),2000);}
  function submitReply(){if(reply.trim()){onToggle(item.id,"comment");setReply("");setShowReply(false);}}

  const textContent=((!item.cw||cwOpen)&&<div style={{fontFamily:T.body,fontSize:14.5,lineHeight:1.8,color:T.ink2,marginBottom:6,letterSpacing:".15px"}}>
    {display.split("\n\n").map((p,i)=><p key={i} style={{marginBottom:10}}>{p}</p>)}
    {isLong&&<button onClick={()=>setExp(!exp)} style={{background:"none",border:"none",color:T.gold,cursor:"pointer",fontFamily:T.sans,fontSize:12,fontWeight:600,padding:0}}>{exp?"Show less":"Continue reading"}</button>}
  </div>);

  return <article onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
    style={{background:hov?T.cardHover:T.card,border:`1px solid ${hov?T.borderHover:T.border}`,borderRadius:14,padding:"20px 24px",transition:"all .25s",
      ...(isFirst?{background:hov?T.cardHover:`linear-gradient(135deg,${T.card},${T.goldGlow})`,borderColor:hov?T.borderHover:`${T.gold}15`}:{})}}>

    <ShelvedByLine shelvedBy={item.shelvedBy}/>
    {item.boundWith&&<BoundIndicator boundWith={item.boundWith}/>}

    {/* Header */}
    <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:14,marginTop:item.shelvedBy?.length>0?6:0}}>
      <Av i={item.user.initials} ink={item.user.ink}/>
      <div style={{flex:1,minWidth:0}}>
        <div style={{display:"flex",alignItems:"center",gap:6,flexWrap:"wrap"}}>
          <span style={{fontFamily:T.sans,fontWeight:700,fontSize:13.5,color:T.ink}}>{item.user.name}</span>
          <IB ink={item.user.ink}/>
          {lensData&&<LBadge lens={item.lens}/>}
          <span style={{fontSize:11.5,color:T.ink3,fontFamily:T.sans}}>{"\u00B7"} {item.timeAgo}</span>
        </div>
        <span style={{fontFamily:T.sans,fontSize:12,color:T.ink3}}>{item.user.handle}</span>
      </div>
      <div style={{display:"flex",alignItems:"center",gap:6,flexWrap:"wrap"}}>
        {isFirst&&<FirstTag/>}
        <CBadge type={item.type}/>
        <div style={{position:"relative"}}>
          <button onClick={()=>setPostMenu(!postMenu)} aria-label="Post options" style={{padding:"4px 6px",borderRadius:5,border:"none",background:"transparent",fontSize:14,color:T.ink4,cursor:"pointer",lineHeight:1}}>{"\u22EF"}</button>
          {postMenu&&<div onClick={()=>setPostMenu(false)} style={{position:"absolute",top:"100%",right:0,marginTop:4,width:200,background:T.card,border:`1px solid ${T.borderHover}`,borderRadius:10,overflow:"hidden",boxShadow:"0 8px 32px rgba(0,0,0,.5)",zIndex:20}}>
            {isOwn&&<><button onClick={()=>pToast("Opening editor\u2026")} style={{display:"block",width:"100%",padding:"10px 14px",border:"none",background:"transparent",fontFamily:T.sans,fontSize:11,fontWeight:600,color:T.ink,textAlign:"left",cursor:"pointer"}} onMouseEnter={e=>e.currentTarget.style.background=T.bg3} onMouseLeave={e=>e.currentTarget.style.background="transparent"}>{"\u270D"} Edit post</button>
            <button onClick={()=>{if(window.confirm("Delete this post? This can\u2019t be undone."))onHide?.(item.id);}} style={{display:"block",width:"100%",padding:"10px 14px",border:"none",background:"transparent",fontFamily:T.sans,fontSize:11,fontWeight:600,color:T.red,textAlign:"left",cursor:"pointer"}} onMouseEnter={e=>e.currentTarget.style.background=T.bg3} onMouseLeave={e=>e.currentTarget.style.background="transparent"}>{"\uD83D\uDDD1"} Delete post</button>
            <div style={{borderTop:`1px solid ${T.border}`}}/></>}
            {!isOwn&&<><button onClick={()=>{pToast(`Opening conversation with ${item.user.name}\u2026`);setMenu(false);}} style={{display:"block",width:"100%",padding:"10px 14px",border:"none",background:"transparent",fontFamily:T.sans,fontSize:11,fontWeight:600,color:T.ink,textAlign:"left",cursor:"pointer"}} onMouseEnter={e=>e.currentTarget.style.background=T.bg3} onMouseLeave={e=>e.currentTarget.style.background="transparent"}>{"\u2709"} Message {item.user.name}</button>
            <div style={{borderTop:`1px solid ${T.border}`}}/>
            <button onClick={()=>{onHide?.(item.id);pToast("Post hidden");}} style={{display:"block",width:"100%",padding:"10px 14px",border:"none",background:"transparent",fontFamily:T.sans,fontSize:11,fontWeight:600,color:T.ink,textAlign:"left",cursor:"pointer"}} onMouseEnter={e=>e.currentTarget.style.background=T.bg3} onMouseLeave={e=>e.currentTarget.style.background="transparent"}>{"\u2715"} Hide this post</button>
            <button onClick={()=>pToast("You\u2019ll see less like this")} style={{display:"block",width:"100%",padding:"10px 14px",border:"none",background:"transparent",fontFamily:T.sans,fontSize:11,fontWeight:600,color:T.ink,textAlign:"left",cursor:"pointer"}} onMouseEnter={e=>e.currentTarget.style.background=T.bg3} onMouseLeave={e=>e.currentTarget.style.background="transparent"}>{"\u25BD"} Show less like this</button>
            <button onClick={()=>{onMute?.(item.user.handle);pToast(`Muted ${item.user.name}`);}} style={{display:"block",width:"100%",padding:"10px 14px",border:"none",background:"transparent",fontFamily:T.sans,fontSize:11,fontWeight:600,color:T.ink,textAlign:"left",cursor:"pointer"}} onMouseEnter={e=>e.currentTarget.style.background=T.bg3} onMouseLeave={e=>e.currentTarget.style.background="transparent"}>{"\uD83D\uDD07"} Mute {item.user.name}</button>
            <button onClick={()=>{onReport?.(item.id);pToast("Report submitted \u2014 thank you");}} style={{display:"block",width:"100%",padding:"10px 14px",border:"none",background:"transparent",fontFamily:T.sans,fontSize:11,fontWeight:600,color:T.red,textAlign:"left",cursor:"pointer"}} onMouseEnter={e=>e.currentTarget.style.background=T.bg3} onMouseLeave={e=>e.currentTarget.style.background="transparent"}>{"\u26A0"} Report</button>
            {item.type==="original"&&<button onClick={()=>{pToast("AI content flag submitted \u2014 under review");setMenu(false);}} style={{display:"block",width:"100%",padding:"10px 14px",border:"none",background:"transparent",fontFamily:T.sans,fontSize:11,fontWeight:600,color:T.plum,textAlign:"left",cursor:"pointer"}} onMouseEnter={e=>e.currentTarget.style.background=T.bg3} onMouseLeave={e=>e.currentTarget.style.background="transparent"}>{"\uD83E\uDD16"} Flag as AI-generated</button>}</>}
          </div>}
        </div>
      </div>
    </div>

    {/* Content warning */}
    {item.cw&&!cwOpen&&<button onClick={()=>setCWO(true)} style={{display:"inline-flex",alignItems:"center",gap:5,padding:"6px 12px",borderRadius:8,background:`${T.red}08`,border:`1px solid ${T.red}15`,cursor:"pointer",marginBottom:10}}>
        <span style={{fontFamily:T.sans,fontSize:10,fontWeight:700,color:T.red}}>Content warning: {item.cw}</span>
        <span style={{fontFamily:T.sans,fontSize:9,color:T.ink4}}>Tap to reveal</span>
      </button>}
    {item.cw&&cwOpen&&<button onClick={()=>setCWO(false)} style={{display:"inline-flex",alignItems:"center",gap:5,padding:"4px 10px",borderRadius:6,background:`${T.red}05`,border:`1px solid ${T.red}10`,cursor:"pointer",marginBottom:8}}>
        <span style={{fontFamily:T.sans,fontSize:9,fontWeight:600,color:T.red,opacity:.7}}>CW: {item.cw}</span>
        <span style={{fontFamily:T.sans,fontSize:9,color:T.ink4}}>Hide</span>
      </button>}

    {/* Cross-book spoiler badge */}
    {item.crossBookSpoiler&&<div style={{display:"inline-flex",alignItems:"center",gap:4,padding:"4px 10px",borderRadius:6,fontSize:10,fontWeight:600,fontFamily:T.sans,color:T.red,background:`${T.red}06`,border:`1px solid ${T.red}15`,marginBottom:10}}>{"\uD83D\uDD12"} Contains spoilers for {(item.crossBooks||[]).join(", ")}</div>}

    {/* Title */}
    {item.title&&<h2 style={{fontFamily:T.serif,fontSize:20,fontWeight:700,color:T.ink,marginBottom:12,lineHeight:1.35,letterSpacing:"-.3px"}}>{item.title}</h2>}

    {/* Genre + Mood tags */}
    {(item.genreTags?.length>0||item.moodTags?.length>0)&&<div style={{display:"flex",flexWrap:"wrap",gap:4,marginBottom:10}}>
      {item.genreTags?.map(tag=><span key={tag} style={{padding:"2px 8px",borderRadius:5,fontSize:9,fontWeight:600,fontFamily:T.sans,background:`${T.accent}08`,color:T.accent,border:`1px solid ${T.accent}12`}}>{tag}</span>)}
      {item.moodTags?.map(tag=><span key={tag} style={{padding:"2px 8px",borderRadius:5,fontSize:9,fontWeight:600,fontFamily:T.sans,background:`${T.gold}06`,color:T.gold,border:`1px solid ${T.gold}10`,fontStyle:"italic"}}>{tag}</span>)}
    </div>}

    {/* Inspired By */}
    {item.inspiredBy?.length>0&&<div style={{display:"flex",flexWrap:"wrap",gap:4,marginBottom:10}}>
      {item.inspiredBy.map((bk,i)=><div key={i} style={{display:"inline-flex",alignItems:"center",gap:5,padding:"3px 9px",borderRadius:6,background:`${T.blue}06`,border:`1px solid ${T.blue}12`,cursor:"pointer"}} onClick={()=>pToast(`Opening ${bk.title}\u2026`)}>
        <div style={{width:12,height:18,borderRadius:"1px 2px 2px 1px",background:`linear-gradient(135deg,${T.blue}CC,#2A4A6B)`,boxShadow:"1px 0 2px rgba(0,0,0,.2)",flexShrink:0}}/>
        <span style={{fontFamily:T.sans,fontSize:8.5,color:T.blue,fontWeight:600}}>Inspired by</span>
        <span style={{fontFamily:T.serif,fontSize:9.5,fontWeight:700,color:T.ink}}>{bk.title}</span>
        {bk.author&&<span style={{fontFamily:T.body,fontSize:8.5,color:T.ink3}}>{bk.author}</span>}
      </div>)}
    </div>}

    {/* Creator reference */}
    {item.creatorRef?.length>0&&<div style={{display:"flex",flexWrap:"wrap",gap:4,marginBottom:10}}>
      {item.creatorRef.map((cr,i)=><div key={i} style={{display:"inline-flex",alignItems:"center",gap:4,padding:"3px 9px",borderRadius:6,background:`${T.plum}06`,border:`1px solid ${T.plum}12`,cursor:"pointer"}} onClick={()=>pToast(`Opening "${cr.title}"\u2026`)}>
        <span style={{fontSize:8}}>{"\u2728"}</span>
        <span style={{fontFamily:T.sans,fontSize:8.5,color:T.plum,fontWeight:600}}>If you liked</span>
        <span style={{fontFamily:T.serif,fontSize:9,color:T.ink,fontStyle:"italic"}}>"{cr.title}"</span>
        <span style={{fontFamily:T.sans,fontSize:8.5,color:T.ink3}}>by {cr.name}</span>
      </div>)}
    </div>}

    {/* Book ref */}
    {item.bookRef&&<BookBar book={item.bookRef}/>}

    {/* Body — spoiler gate for explicit zones OR cross-book spoiler flagged posts */}
    {(item.spoilerWarning||item.crossBookSpoiler)?<SpoilerGate revealed={spoilRev} onReveal={()=>setSR(true)} bookRef={item.bookRef} spoilerPage={item.spoilerPage} crossBookSpoiler={item.crossBookSpoiler} crossBooks={item.crossBooks}>{item.poetryMode
      ?<div style={{fontFamily:T.serif,fontSize:14.5,lineHeight:2.0,color:T.ink2,fontWeight:400,letterSpacing:".02em",whiteSpace:"pre-wrap"}}>{text.split("\n\n").map((stanza,si)=><div key={si} style={{marginBottom:si<text.split("\n\n").length-1?18:0}}>{stanza.split("\n").map((line,li)=><div key={li}>{line||"\u00A0"}</div>)}</div>)}</div>
      :textContent}</SpoilerGate>
    :item.poetryMode
      ?<div style={{fontFamily:T.serif,fontSize:14.5,lineHeight:2.0,color:T.ink2,fontWeight:400,letterSpacing:".02em",whiteSpace:"pre-wrap"}}>{text.split("\n\n").map((stanza,si)=><div key={si} style={{marginBottom:si<text.split("\n\n").length-1?18:0}}>{stanza.split("\n").map((line,li)=><div key={li}>{line||"\u00A0"}</div>)}</div>)}</div>
      :textContent}

    {/* Reading time + attestation */}
    <div style={{display:"flex",alignItems:"center",gap:8,fontFamily:T.sans,fontSize:10,color:T.ink4,marginBottom:4}}>
      <span>{wc} words {"\u00B7"} {rt<1?"< 1":rt} min read</span>
      {item.attested&&item.type==="original"&&<span style={{display:"inline-flex",alignItems:"center",gap:3,padding:"1px 6px",borderRadius:4,background:`${T.green}06`,border:`1px solid ${T.green}12`}}><span style={{fontSize:8,color:T.green}}>{"\u2713"}</span><span style={{fontFamily:T.serif,fontSize:8.5,color:T.green,fontStyle:"italic"}}>Human-written</span></span>}
    </div>

    {/* Top comment */}
    {item.comments>=15&&item.topComment&&<TopCommentPreview comment={item.topComment} viewerLens="analyst"/>}

    {/* Engagement */}
    <div style={{display:"flex",alignItems:"center",gap:2,borderTop:`1px solid ${T.border}`,paddingTop:10,marginTop:10}}>
      <EngBtn icon={item.isLiked?"\u2665":"\u2661"} count={item.likes} active={item.isLiked} color={T.red} onClick={()=>onToggle(item.id,"like")} label="Like" toggle/>
      <EngBtn icon={"\uD83D\uDCAC"} count={item.comments} active={showReply} color={T.gold} onClick={()=>setShowReply(!showReply)} label="Comment" toggle/>
      <EngBtn icon={item.isReposted?"\uD83D\uDD01":"\u21BB"} count={item.reposts} active={item.isReposted} color={T.green} onClick={()=>onToggle(item.id,"repost")} label="Repost" toggle/>
      <EngBtn icon={item.isShelved?"\u25C6":"\u25C7"} count={item.shelved} active={item.isShelved} color={T.gold} onClick={()=>onToggle(item.id,"shelf")} label="Shelf" toggle/>
      <div style={{flex:1}}/>
      <EngBtn icon={shared?"\u2713":"\u2197"} count={0} active={shared} color={shared?T.green:T.ink3} onClick={doShare} label="Share"/>
    </div>
    {showReply&&<div style={{display:"flex",gap:8,marginTop:10,alignItems:"center"}}>
      <Av i="SP" ink={1240} s={24}/>
      <input maxLength={500} value={reply} onChange={e=>setReply(e.target.value)} onKeyDown={e=>{if(e.key==="Enter")submitReply();}} placeholder="Write a comment\u2026" style={{flex:1,padding:"8px 12px",borderRadius:10,border:`1px solid ${T.border}`,background:T.bg3,fontFamily:T.body,fontSize:12.5,color:T.ink,outline:"none"}} aria-label="Write a comment\u2026"/>
      <button onClick={submitReply} disabled={!reply.trim()} style={{padding:"6px 14px",borderRadius:8,border:"none",background:reply.trim()?`linear-gradient(135deg,${T.accent},#9E4520)`:`${T.ink4}20`,fontFamily:T.sans,fontSize:11,fontWeight:700,color:reply.trim()?"#fff":T.ink4,cursor:reply.trim()?"pointer":"default"}}>Post</button>
    </div>}
  </article>;
}

// ═══════════════════════════════════════════════════
// SIDEBAR
// ═══════════════════════════════════════════════════
function DailyPrompt(){
  return <div style={{background:`linear-gradient(160deg,${T.accent}0A,${T.card})`,border:`1px solid ${T.gold}14`,borderRadius:14,padding:"18px 20px",marginBottom:12,textAlign:"center"}}>
    <div style={{fontFamily:T.sans,fontSize:9.5,fontWeight:700,color:T.gold,letterSpacing:"1.2px",textTransform:"uppercase",marginBottom:10,opacity:.6}}>Daily Prompt</div>
    <div style={{fontFamily:T.serif,fontSize:14,fontStyle:"italic",color:T.ink,lineHeight:1.5,marginBottom:14}}>{"\u201C"}Write about a sound you haven{"\u2019"}t heard in years but would recognize instantly.{"\u201D"}</div>
    <button onClick={()=>{const el=document.querySelector('.feed-toast');if(el){el.textContent="\u270D Compose: \u201CWrite about a sound\u2026\u201D";el.style.display="block";setTimeout(()=>el.style.display="none",2500);}}} style={{padding:"7px 18px",borderRadius:10,border:`1px solid ${T.gold}25`,background:`${T.gold}08`,fontFamily:T.sans,fontSize:11,fontWeight:600,color:T.gold,cursor:"pointer"}}>{"\u270D"} Write</button>
  </div>;
}

function TrendingStories(){
  return <div className="fc" style={{background:T.card,border:`1px solid ${T.border}`,borderRadius:14,padding:"18px 20px",marginBottom:12}}>
    <h3 style={{fontFamily:T.serif,fontSize:14.5,fontWeight:700,color:T.ink,marginBottom:12,display:"flex",alignItems:"center",gap:8}}><span style={{color:T.accent}}>{"\uD83D\uDD25"}</span> Trending Stories</h3>
    {TRENDING_S.map((t,i)=><div key={i} style={{padding:"9px 0",borderTop:i>0?`1px solid ${T.border}`:"none",cursor:"pointer"}}>
      <div style={{fontFamily:T.serif,fontSize:12.5,fontWeight:600,color:T.ink,lineHeight:1.3}}>{t.title}</div>
      <div style={{fontFamily:T.sans,fontSize:10.5,color:T.ink3,display:"flex",overflowX:"auto",scrollbarWidth:"none",WebkitOverflowScrolling:"touch",alignItems:"center",gap:6,marginTop:2}}><span>{t.author}</span><span style={{opacity:.3}}>{"\u00B7"}</span><span style={{color:T.gold}}>{t.eng}</span></div>
    </div>)}
  </div>;
}

function TrendingBooks(){
  return <div className="fc" style={{background:T.card,border:`1px solid ${T.border}`,borderRadius:14,padding:"18px 20px",marginBottom:12}}>
    <h3 style={{fontFamily:T.serif,fontSize:14.5,fontWeight:700,color:T.ink,marginBottom:12,display:"flex",alignItems:"center",gap:8}}><span style={{color:T.gold}}>{"\uD83D\uDCC8"}</span> Trending Books</h3>
    {TRENDING_B.map((b,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:10,padding:"8px 0",borderTop:i>0?`1px solid ${T.border}`:"none",cursor:"pointer"}}>
      <span style={{fontFamily:T.sans,fontSize:11,fontWeight:800,color:T.ink3,width:16,textAlign:"right",flexShrink:0}}>{i+1}</span>
      <div style={{width:22,height:32,borderRadius:"1px 3px 3px 1px",flexShrink:0,background:`linear-gradient(135deg,${T.accent}AA,#6B2A10)`,boxShadow:"1px 1px 4px rgba(0,0,0,0.3)"}}/>
      <div style={{flex:1,minWidth:0}}><div style={{fontFamily:T.serif,fontSize:12,fontWeight:600,color:T.ink,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{b.title}</div><div style={{fontFamily:T.sans,fontSize:10.5,color:T.ink3}}>{b.author}</div></div>
      <span style={{fontFamily:T.sans,fontSize:10,color:T.gold,fontWeight:600,background:T.goldGlow,padding:"3px 7px",borderRadius:8}}>{b.waypoints}</span>
    </div>)}
  </div>;
}

function ActivityFeed(){
  const items=[
    {icon:"\u25C6",text:<><b>Ingrid Solberg</b> shelved your post <i>"Inheritance Tax"</i> to <b>Stories That Wrecked Me</b></>,time:"12m",color:T.gold},
    {icon:"\u2665",text:<><b>Kofi Asante</b> and <b>3 others</b> liked your review of Beloved</>,time:"1h",color:T.red},
    {icon:"\u29D7",text:<>New Bound: <b>James Huang</b> shelved your work — you've shelved his</>,time:"3h",color:T.plum},
    {icon:"\uD83C\uDFC5",text:<>Your Ink reached <b>1,240</b> — <b>Set Ink</b> tier unlocked</>,time:"1d",color:"#A0C090"},
    {icon:"\uD83D\uDCAC",text:<><b>Priya Anand</b> commented on <i>"The Cartographer's Confession"</i></>,time:"2d",color:T.gold},
  ];
  return <div className="fc" style={{background:T.card,border:`1px solid ${T.border}`,borderRadius:14,padding:"18px 20px",marginBottom:12}}>
    <h3 style={{fontFamily:T.serif,fontSize:14.5,fontWeight:700,color:T.ink,marginBottom:12,display:"flex",alignItems:"center",gap:8}}><span style={{color:T.accent}}>{"\uD83D\uDD14"}</span> Activity</h3>
    {items.map((a,i)=><div key={i} style={{padding:"8px 0",borderTop:i>0?`1px solid ${T.border}`:"none",display:"flex",alignItems:"flex-start",gap:8,cursor:"pointer"}}>
      <span style={{fontSize:12,color:a.color,marginTop:2,flexShrink:0}}>{a.icon}</span>
      <div style={{flex:1}}>
        <div style={{fontFamily:T.sans,fontSize:11,color:T.ink3,lineHeight:1.5}}>{a.text}</div>
        <div style={{fontFamily:T.sans,fontSize:9,color:T.ink4,marginTop:2}}>{timeAgo(a.time)}</div>
      </div>
    </div>)}
  </div>;
}

function InkLeaderboard(){
  const top=[...USERS].filter(u=>u.id!=="me").sort((a,b)=>b.ink-a.ink).slice(0,5);
  return <div className="fc" style={{background:T.card,border:`1px solid ${T.border}`,borderRadius:14,padding:"18px 20px",marginBottom:12}}>
    <h3 style={{fontFamily:T.serif,fontSize:14.5,fontWeight:700,color:T.ink,marginBottom:12,display:"flex",alignItems:"center",gap:8}}><span style={{color:T.gold}}>{"\uD83C\uDFC6"}</span> Ink Leaders</h3>
    {top.map((u,i)=>{const tier=getTier(u.ink);return <div key={u.id} style={{display:"flex",alignItems:"center",gap:8,padding:"7px 0",borderTop:i>0?`1px solid ${T.border}`:"none"}}>
      <span style={{fontFamily:T.sans,fontSize:11,fontWeight:800,width:16,textAlign:"right",color:i===0?T.gold:T.ink3,flexShrink:0}}>{i+1}</span>
      <Av i={u.initials} ink={u.ink} s={26}/>
      <span style={{fontFamily:T.sans,fontSize:11.5,fontWeight:600,color:T.ink,flex:1}}>{u.name}</span>
      <span style={{fontFamily:T.sans,fontSize:10.5,fontWeight:700,color:tier.color,padding:"2px 7px",borderRadius:5,background:tier.bg}}>{fmt(u.ink)}</span>
    </div>;})}
  </div>;
}

function StreakWidget(){
  const dots=Array.from({length:7},(_,i)=>({day:["M","T","W","T","F","S","S"][i],done:i<STREAK.current%7||(STREAK.current>=7)}));
  return <div style={{background:`linear-gradient(160deg,${T.gold}06,${T.card})`,border:`1px solid ${T.gold}12`,borderRadius:14,padding:"18px 20px",marginBottom:12}}>
    <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}>
      <span style={{fontSize:18,filter:"saturate(1.2)"}}>{"\uD83D\uDD25"}</span>
      <div style={{flex:1}}>
        <div style={{fontFamily:T.sans,fontSize:16,fontWeight:800,color:T.gold}}>{STREAK.current}-day streak</div>
        <div style={{fontFamily:T.sans,fontSize:10,color:T.ink3}}>Longest: {STREAK.longest} days</div>
      </div>
      {STREAK.todayDone&&<span style={{padding:"3px 10px",borderRadius:8,fontSize:9,fontWeight:700,fontFamily:T.sans,color:T.green,background:`${T.green}12`,border:`1px solid ${T.green}20`}}>{"\u2713"} Today</span>}
    </div>
    <div style={{display:"flex",gap:4,marginBottom:10}}>
      {dots.map((d,i)=><div key={i} style={{flex:1,textAlign:"center"}}>
        <div style={{width:"100%",height:4,borderRadius:2,background:d.done?T.gold:`${T.ink4}20`,marginBottom:3,transition:"background .3s"}}/>
        <span style={{fontFamily:T.sans,fontSize:8,color:d.done?T.gold:T.ink4,fontWeight:600}}>{d.day}</span>
      </div>)}
    </div>
    <div style={{fontFamily:T.body,fontSize:11,color:T.ink3,fontStyle:"italic",lineHeight:1.5}}>{streakMsg(STREAK.current)}</div>
  </div>;
}

function InviteWidget(){
  const[copied,setCopied]=useState(false);
  function copyInvite(){navigator.clipboard.writeText("https://joinprecis.com/invite/sean").catch(()=>{});setCopied(true);setTimeout(()=>setCopied(false),2500);}
  return <div className="fc" style={{background:T.card,border:`1px solid ${T.border}`,borderRadius:14,padding:"18px 20px",marginBottom:12,textAlign:"center"}}>
    <div style={{fontFamily:T.serif,fontSize:13,fontWeight:700,color:T.ink,marginBottom:4}}>Know a reader who{"\u2019"}d belong here?</div>
    <div style={{fontFamily:T.body,fontSize:11,color:T.ink3,lineHeight:1.5,marginBottom:12}}>Pr{"\u00E9"}cis grows by word of mouth {"\u2014"} one reader inviting another.</div>
    <button onClick={copyInvite} style={{padding:"8px 20px",borderRadius:10,border:`1px solid ${copied?`${T.green}30`:T.border}`,background:copied?`${T.green}06`:"transparent",fontFamily:T.sans,fontSize:11,fontWeight:600,color:copied?T.green:T.ink3,cursor:"pointer",transition:"all .2s"}}>{copied?"\u2713 Invite link copied":"Copy invite link"}</button>
  </div>;
}

// ═══════════════════════════════════════════════════
// MAIN
// ═══════════════════════════════════════════════════
export default function PrecisFeed(){
  const{theme,tid,setTid}=useTheme();T=theme;
  const[feed,setFeed]=useState(FEED_ITEMS);
  const[navTab,setNT]=useState("feed");
  const[filter,setFilter]=useState("foryou");
  const[loaded,setL]=useState(false);
  const[searchQ,setSQ]=useState("");
  const[following,setFollowing]=useState({"u1":true,"u2":true,"u5":true});
  const[mentionsSeen,setMS]=useState(false);

  useEffect(()=>{setL(true);},[]);
  useEffect(()=>{window.scrollTo({top:0,behavior:"smooth"});},[navTab]);

  function onToggle(id,type){
    setFeed(prev=>prev.map(item=>{
      if(item.id!==id)return item;
      if(type==="like")return{...item,isLiked:!item.isLiked,likes:item.likes+(item.isLiked?-1:1)};
      if(type==="shelf")return{...item,isShelved:!item.isShelved,shelved:item.shelved+(item.isShelved?-1:1)};
      if(type==="repost")return{...item,isReposted:!item.isReposted,reposts:item.reposts+(item.isReposted?-1:1)};
      if(type==="comment")return{...item,comments:item.comments+1};
      return item;
    }));
  }
  function toggleFollow(uid){setFollowing(p=>{const n={...p};if(n[uid])delete n[uid];else n[uid]=true;return n;});}
  function doWrite(prompt){const el=document.querySelector('.feed-toast');if(el){el.textContent=`\u270D Compose: "${prompt?.slice(0,40)||'New post'}\u2026"`;el.style.display="block";setTimeout(()=>el.style.display="none",2500);}}

  const fyRaw=feed.filter(f=>f.following||f.lensMatch);const filtered=filter==="foryou"?(fyRaw.length>=3?fyRaw:feed):filter==="all"?feed:feed.filter(f=>f.type===filter);
  const searched=searchQ.trim()?filtered.filter(f=>{const q=searchQ.toLowerCase();return(f.title||"").toLowerCase().includes(q)||(f.text||"").toLowerCase().includes(q)||(f.user?.name||"").toLowerCase().includes(q)||(f.bookRef?.title||"").toLowerCase().includes(q);}):filtered;

  const MENTIONS=[
    {id:"m1",user:USERS[1],action:"commented on",target:"your review of Intermezzo",time:20,read:false},
    {id:"m2",user:USERS[4],action:"shelved",target:"your post \u201CInheritance Tax\u201D",time:60,read:false},
    {id:"m3",user:USERS[0],action:"started following",target:"you",time:180,read:true},
    {id:"m4",user:USERS[6],action:"liked",target:"your comment on \u201CThe Cartographer\u2019s Confession\u201D",time:300,read:true},
    {id:"m5",user:USERS[2],action:"mentioned you in",target:"a reply to \u201CSixteen Funerals\u201D",time:480,read:true},
  ];
  const unreadCount=MENTIONS.filter(m=>!m.read).length;

  const NAV=[{id:"feed",label:"Feed",icon:"\u229E"},{id:"explore",label:"Explore",icon:"\u25CE"},{id:"press",label:"The Press",icon:"\u270D"},{id:"mentions",label:"Mentions",icon:"\u25C8"},{id:"shelf",label:"My Shelf",icon:"\u25A4"},{id:"compass",label:"Compass",icon:"\u27D0"}];
  const FILTERS=[{id:"foryou",label:"\u2726 For You"},{id:"all",label:"All"},{id:"original",label:"\u270D Original"},{id:"review",label:"\uD83D\uDCDD Reviews"},{id:"recommendation",label:"\uD83D\uDCDA Recs"},{id:"spoiler",label:"\uD83D\uDD13 Spoiler"}];

  return <div style={{minHeight:"100vh",background:T.bg,color:T.ink}}>
    <style>{CSS}</style>
    <style>{`body{background:${T.bg}!important}::selection{background:${T.gold}30;color:${T.ink}}`}</style>
    <a href="#main-feed" className="skip-link">Skip to feed</a>
    <div className="feed-toast" style={{display:"none",position:"fixed",bottom:24,left:"50%",transform:"translateX(-50%)",padding:"10px 24px",borderRadius:10,background:T.bg2,border:`1px solid ${T.borderHover}`,boxShadow:"0 8px 32px rgba(0,0,0,.4)",fontFamily:T.sans,fontSize:12,fontWeight:700,color:T.ink,zIndex:300,animation:"fadeUp .3s ease"}}/>

    <nav style={{position:"sticky",top:0,zIndex:100,background:`${T.bg}E6`,backdropFilter:"blur(24px) saturate(1.2)",borderBottom:`1px solid ${T.border}`}}>
      <div className="nav-i" style={{maxWidth:1200,margin:"0 auto",padding:"0 28px",display:"flex",alignItems:"center",height:56,gap:0}}>
        <div style={{flexShrink:0,marginRight:28}}>
          <span style={{fontFamily:T.serif,fontSize:22,fontWeight:700,color:T.ink,letterSpacing:"-.5px"}}>Pr<span style={{color:T.accent}}>{"\u00E9"}</span>cis</span>
        </div>
        <div className="nav-tabs" style={{display:"flex",gap:2,alignItems:"center"}}>
          {NAV.map(n=><button key={n.id} onClick={()=>{setNT(n.id);if(n.id==="mentions")setMS(true);}} aria-current={navTab===n.id?"page":undefined} style={{padding:"8px 14px",borderRadius:8,border:"none",fontFamily:T.sans,fontSize:12.5,fontWeight:600,cursor:"pointer",transition:"all .2s",background:navTab===n.id?`${T.gold}12`:"transparent",color:navTab===n.id?T.gold:T.ink3,display:"flex",alignItems:"center",gap:5,position:"relative"}}>
            <span style={{fontSize:14}}>{n.icon}</span><span className="nav-label">{n.label}</span>
            {n.id==="mentions"&&!mentionsSeen&&unreadCount>0&&<span style={{position:"absolute",top:4,right:4,minWidth:14,height:14,borderRadius:7,background:T.accent,boxShadow:`0 0 6px ${T.accent}80`,fontFamily:T.sans,fontSize:8,fontWeight:800,color:"#fff",display:"flex",alignItems:"center",justifyContent:"center",padding:"0 3px"}}>{unreadCount}</span>}
          </button>)}
        </div>
        <div className="nav-search" style={{flex:1,maxWidth:320,margin:"0 20px",position:"relative"}}>
          <input maxLength={100} value={searchQ} onChange={e=>setSQ(e.target.value)} placeholder="Search stories, authors, books\u2026" aria-label="Search" style={{width:"100%",padding:"7px 14px 7px 34px",borderRadius:10,background:T.bg3,border:`1px solid ${searchQ?`${T.gold}30`:T.border}`,fontFamily:T.sans,fontSize:12.5,color:T.ink,outline:"none",transition:"border-color .2s"}}/>
          <span style={{position:"absolute",left:12,top:"50%",transform:"translateY(-50%)",fontSize:13,color:searchQ?T.gold:T.ink3,pointerEvents:"none",transition:"color .2s"}}>{"\u2315"}</span>
          {searchQ&&<button onClick={()=>setSQ("")} style={{position:"absolute",right:8,top:"50%",transform:"translateY(-50%)",background:"none",border:"none",color:T.ink3,cursor:"pointer",fontSize:14,padding:2}}>{"\u2715"}</button>}
        </div>
        <div style={{flex:1}}/>
        <button onClick={()=>doWrite()} style={{padding:"7px 18px",borderRadius:10,border:"none",background:`linear-gradient(135deg,${T.accent},#9E4520)`,fontFamily:T.sans,fontSize:12,fontWeight:700,color:"#fff",cursor:"pointer",boxShadow:`0 2px 14px ${T.accent}35`,display:"flex",alignItems:"center",gap:5,marginRight:14}}>{"\u270D"} Write</button>
        <div style={{display:"flex",alignItems:"center",gap:8}}>
          <div style={{display:"flex",alignItems:"center",gap:3,padding:"3px 8px",borderRadius:8,background:`${T.gold}08`,border:`1px solid ${T.gold}12`}}><span style={{fontSize:11}}>{"\uD83D\uDD25"}</span><span style={{fontFamily:T.sans,fontSize:10,fontWeight:800,color:T.gold}}>{STREAK.current}</span></div>
          <ThemeSwitcher tid={tid} setTid={setTid}/>
          <Av i="SP" ink={1240} s={32}/>
          <div style={{lineHeight:1.1}}><div style={{fontFamily:T.sans,fontSize:11.5,fontWeight:600,color:T.ink}}>Sean</div><IB ink={1240}/></div>
        </div>
      </div>
    </nav>

    <div className="feed-grid" style={{maxWidth:1200,margin:"0 auto",padding:"20px 28px",display:"grid",gridTemplateColumns:navTab==="feed"?"1fr 310px":"1fr",gap:20,alignItems:"start"}}>
      <main id="main-feed" className="feed-main">
        {navTab==="feed"&&<>
        <CurrentlyReadingBar/>
        {searchQ&&<div style={{fontFamily:T.sans,fontSize:12,color:T.ink3,marginBottom:12,display:"flex",alignItems:"center",gap:8}}>{"\u2315"} Showing results for <strong style={{color:T.ink}}>"{searchQ}"</strong><span style={{opacity:.3}}>{"\u00B7"}</span>{searched.filter(f=>f.type!=="_prompt").length} found</div>}
        <div role="tablist" style={{display:"flex",gap:6,marginBottom:16,overflowX:"auto",paddingBottom:4}}>
          {FILTERS.map(f=><button key={f.id} role="tab" aria-selected={filter===f.id} onClick={()=>setFilter(f.id)} style={{padding:"7px 16px",borderRadius:20,border:`1px solid ${filter===f.id?(f.id==="all"||f.id==="foryou"?`${T.gold}25`:`${CT[f.id]?.color||T.gold}25`):T.border}`,fontFamily:T.sans,fontSize:12,fontWeight:600,cursor:"pointer",whiteSpace:"nowrap",transition:"all .2s",background:filter===f.id?(f.id==="all"||f.id==="foryou"?`${T.gold}18`:`${CT[f.id]?.color||T.gold}15`):T.bg2,color:filter===f.id?(f.id==="all"||f.id==="foryou"?T.gold:CT[f.id]?.color||T.gold):T.ink3}}>{f.label}</button>)}
        </div>
        {filter==="original"&&<button onClick={()=>setNT("press")} style={{display:"flex",alignItems:"center",gap:6,marginBottom:12,padding:"6px 14px",borderRadius:8,border:`1px solid ${T.accent}20`,background:`${T.accent}06`,fontFamily:T.sans,fontSize:10,fontWeight:600,color:T.accent,cursor:"pointer"}}>{"Fresh off The Press \u2192 Discover all original work"}</button>}
        <div role="feed" aria-label="Literary feed" style={{display:"flex",flexDirection:"column",gap:10}}>
          {searched.length===0&&searchQ.trim()&&<div style={{textAlign:"center",padding:"40px 20px"}}><div style={{fontSize:32,marginBottom:12,opacity:.3}}>{"\uD83D\uDD0D"}</div><div style={{fontFamily:T.serif,fontSize:16,fontWeight:600,color:T.ink,marginBottom:6}}>No results for {"\u201C"}{searchQ}{"\u201D"}</div><p style={{fontFamily:T.body,fontSize:12,color:T.ink3,fontWeight:300}}>Try a different search, or browse the feed.</p></div>}
          {searched.map((item,i)=><div key={item.id} style={{animation:loaded?`fadeUp .35s ease ${i*.05}s both`:"none"}}>
            {item.type==="_prompt"?<WritingPromptCard text={item.promptText} onWrite={doWrite}/>:<FeedCard item={item} onToggle={onToggle}/>}
          </div>)}
          {searched.filter(f=>f.type!=="_prompt").length===0&&<div style={{padding:"60px 20px",textAlign:"center",fontFamily:T.body,color:T.ink3,fontStyle:"italic",fontSize:14}}>{searchQ?"No results found. Try different keywords.":filter!=="all"?"No posts in this category yet. Be the first to write one.":"No posts yet."}</div>}
        </div>
        {/* Natural stopping point — anti-infinite-scroll, pro-creation */}
        <div style={{textAlign:"center",padding:"40px 20px 32px",borderTop:`1px solid ${T.border}`,marginTop:16}}>
          <div style={{fontFamily:T.serif,fontSize:18,fontWeight:700,color:T.ink,marginBottom:6,fontStyle:"italic"}}>You{"\u2019"}re caught up.</div>
          <div style={{fontFamily:T.body,fontSize:12.5,color:T.ink3,lineHeight:1.6,maxWidth:360,margin:"0 auto 16px"}}>Everything new has been read. The feed will be here when there{"\u2019"}s more {"\u2014"} in the meantime, the page is yours.</div>
          <div style={{display:"flex",gap:8,justifyContent:"center",flexWrap:"wrap"}}>
            <button onClick={()=>doWrite()} style={{padding:"9px 22px",borderRadius:10,border:"none",background:`linear-gradient(135deg,${T.accent},#9E4520)`,fontFamily:T.sans,fontSize:12,fontWeight:700,color:"#fff",cursor:"pointer",boxShadow:`0 2px 12px ${T.accent}30`}}>{"\u270D"} Write something</button>
            <button onClick={()=>setNT("explore")} style={{padding:"9px 22px",borderRadius:10,border:`1px solid ${T.border}`,background:"transparent",fontFamily:T.sans,fontSize:12,fontWeight:600,color:T.ink3,cursor:"pointer"}}>{"\u25CE"} Discover new voices</button>
            <button onClick={()=>setNT("press")} style={{padding:"9px 22px",borderRadius:10,border:`1px solid ${T.accent}20`,background:`${T.accent}06`,fontFamily:T.sans,fontSize:12,fontWeight:600,color:T.accent,cursor:"pointer"}}>{"\u270D"} The Press</button>
          </div>
        </div>
        </>}

        {navTab==="explore"&&<div style={{animation:"fadeUp .35s ease both"}}>
          <h2 style={{fontFamily:T.serif,fontSize:22,fontWeight:700,color:T.ink,marginBottom:6}}>Explore</h2>
          <p style={{fontFamily:T.body,fontSize:13,color:T.ink3,marginBottom:20}}>Discover writers and books beyond your usual orbit.</p>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",gap:12}}>
            {USERS.filter(u=>u.id!=="me"&&!following[u.id]).map(u=>{const tier=getTier(u.ink);const lens=LENSES[u.lens];return <div key={u.id} className="fc" style={{background:T.card,border:`1px solid ${T.border}`,borderRadius:14,padding:"18px 20px",display:"flex",alignItems:"center",gap:12}}>
              <Av i={u.initials} ink={u.ink}/>
              <div style={{flex:1,minWidth:0}}>
                <div style={{fontFamily:T.sans,fontSize:13,fontWeight:700,color:T.ink}}>{u.name}</div>
                <div style={{fontFamily:T.sans,fontSize:11,color:T.ink3}}>{u.handle}</div>
                <div style={{display:"flex",gap:4,marginTop:4}}><IB ink={u.ink}/>{lens&&<span style={{fontSize:10,color:lens.color}}>{lens.icon}</span>}</div>
              </div>
              <button onClick={()=>toggleFollow(u.id)} style={{padding:"6px 14px",borderRadius:8,border:"none",background:`linear-gradient(135deg,${T.accent},#9E4520)`,fontFamily:T.sans,fontSize:11,fontWeight:700,color:"#fff",cursor:"pointer"}}>Follow</button>
            </div>;})}
            {USERS.filter(u=>u.id!=="me"&&following[u.id]).map(u=>{const tier=getTier(u.ink);const lens=LENSES[u.lens];return <div key={u.id} className="fc" style={{background:T.card,border:`1px solid ${T.border}`,borderRadius:14,padding:"18px 20px",display:"flex",alignItems:"center",gap:12}}>
              <Av i={u.initials} ink={u.ink}/>
              <div style={{flex:1,minWidth:0}}>
                <div style={{fontFamily:T.sans,fontSize:13,fontWeight:700,color:T.ink}}>{u.name}</div>
                <div style={{fontFamily:T.sans,fontSize:11,color:T.ink3}}>{u.handle}</div>
                <div style={{display:"flex",gap:4,marginTop:4}}><IB ink={u.ink}/>{lens&&<span style={{fontSize:10,color:lens.color}}>{lens.icon}</span>}</div>
              </div>
              <button onClick={()=>toggleFollow(u.id)} style={{padding:"6px 14px",borderRadius:8,border:`1px solid ${T.green}30`,background:`${T.green}08`,fontFamily:T.sans,fontSize:11,fontWeight:700,color:T.green,cursor:"pointer"}}>Following</button>
            </div>;})}
          </div>
          <div style={{marginTop:24}}><h3 style={{fontFamily:T.serif,fontSize:16,fontWeight:700,color:T.ink,marginBottom:12}}>Trending Books This Week</h3>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))",gap:10}}>
              {TRENDING_B.map((b,i)=><div key={i} className="fc" style={{background:T.card,border:`1px solid ${T.border}`,borderRadius:12,padding:"14px 16px",cursor:"pointer"}}>
                <div style={{fontFamily:T.serif,fontSize:14,fontWeight:700,color:T.ink,marginBottom:2}}>{b.title}</div>
                <div style={{fontFamily:T.body,fontSize:11,color:T.ink3,fontStyle:"italic"}}>{b.author}</div>
                <div style={{fontFamily:T.sans,fontSize:10,color:T.gold,marginTop:6,fontWeight:600}}>{b.waypoints} waypoints</div>
              </div>)}
            </div>
          </div>
        </div>}

        {navTab==="mentions"&&<div style={{animation:"fadeUp .35s ease both"}}>
          <h2 style={{fontFamily:T.serif,fontSize:22,fontWeight:700,color:T.ink,marginBottom:6}}>Mentions & Activity</h2>
          <p style={{fontFamily:T.body,fontSize:13,color:T.ink3,marginBottom:20}}>Everything directed at you, in one place.</p>
          <div style={{display:"flex",flexDirection:"column",gap:6}}>
            {MENTIONS.map(m=><div key={m.id} style={{display:"flex",alignItems:"center",gap:12,padding:"14px 18px",borderRadius:12,background:m.read?T.card:`${T.gold}04`,border:`1px solid ${m.read?T.border:`${T.gold}12`}`,transition:"all .2s"}}>
              {!m.read&&<div style={{width:6,height:6,borderRadius:"50%",background:T.accent,flexShrink:0}}/>}
              <Av i={m.user.initials} ink={m.user.ink} s={32}/>
              <div style={{flex:1,minWidth:0}}>
                <span style={{fontFamily:T.sans,fontSize:12.5,color:T.ink}}><strong>{m.user.name}</strong> <span style={{color:T.ink3}}>{m.action}</span> <span style={{color:T.ink2,fontWeight:600}}>{m.target}</span></span>
              </div>
              <span style={{fontFamily:T.sans,fontSize:10,color:T.ink4,flexShrink:0}}>{timeAgo(m.time)}</span>
            </div>)}
          </div>
        </div>}

        {navTab==="press"&&<div style={{animation:"fadeUp .35s ease both"}}>
          <h2 style={{fontFamily:T.serif,fontSize:22,fontWeight:700,color:T.ink,marginBottom:6}}>The Press</h2>
          <p style={{fontFamily:T.body,fontSize:13,color:T.ink3,marginBottom:20}}>{"Original work by the Pr\u00E9cis community \u2014 fiction, poetry, essays, and everything between."}</p>
          <div style={{display:"flex",flexDirection:"column",gap:10}}>
            {feed.filter(f=>f.type==="original").map((item,i)=><div key={item.id} style={{animation:`fadeUp .35s ease ${i*.05}s both`}}><FeedCard item={item} onToggle={onToggle}/></div>)}
          </div>
          <button onClick={()=>pToast("Opening The Press \u2192 full discovery\u2026")} style={{width:"100%",marginTop:16,padding:"12px 0",borderRadius:10,border:`1px solid ${T.accent}25`,background:`${T.accent}08`,fontFamily:T.sans,fontSize:12,fontWeight:700,color:T.accent,cursor:"pointer"}}>{"Fresh off The Press \u2192 Discover all original work"}</button>
        </div>}

        {navTab==="shelf"&&<div style={{animation:"fadeUp .35s ease both"}}>
          <h2 style={{fontFamily:T.serif,fontSize:22,fontWeight:700,color:T.ink,marginBottom:6}}>My Shelf</h2>
          <p style={{fontFamily:T.body,fontSize:13,color:T.ink3,marginBottom:20}}>Everything you've shelved {"\u2014"} the pieces that moved you enough to keep.</p>
          {(()=>{const shelved=feed.filter(f=>f.isShelved);return shelved.length>0?<div style={{display:"flex",flexDirection:"column",gap:10}}>{shelved.map((item,i)=><div key={item.id} style={{animation:`fadeUp .35s ease ${i*.05}s both`}}><FeedCard item={item} onToggle={onToggle}/></div>)}</div>:<div className="fc" style={{padding:"60px 20px",textAlign:"center",background:T.card,borderRadius:14,border:`1px solid ${T.border}`}}><div style={{fontSize:40,marginBottom:14,opacity:.4}}>{"\u25C6"}</div><div style={{fontFamily:T.serif,fontSize:18,fontWeight:700,color:T.ink,marginBottom:6,fontStyle:"italic"}}>Your shelf is empty</div><div style={{fontFamily:T.body,fontSize:13,color:T.ink3,lineHeight:1.6}}>When something moves you, shelf it. Your shelf is your literary identity.</div></div>;})()}
        </div>}

        {navTab==="compass"&&<div style={{animation:"fadeUp .35s ease both"}}>
          <h2 style={{fontFamily:T.serif,fontSize:22,fontWeight:700,color:T.ink,marginBottom:6}}>{"\u27D0"} Compass</h2>
          <p style={{fontFamily:T.body,fontSize:13,color:T.ink3,marginBottom:20}}>Spoiler-safe reading orientation, shaped by your lens.</p>
          <div className="fc" style={{background:T.card,border:`1px solid ${T.border}`,borderRadius:14,padding:"28px 24px",textAlign:"center"}}>
            <div style={{fontSize:48,marginBottom:14,opacity:.3}}>{"\u27D0"}</div>
            <div style={{fontFamily:T.serif,fontSize:18,fontWeight:700,color:T.ink,marginBottom:8}}>Pick a book to begin</div>
            <div style={{fontFamily:T.body,fontSize:13,color:T.ink3,lineHeight:1.6,maxWidth:400,margin:"0 auto 20px"}}>Enter where you are in any book, choose your reading lens, and get a spoiler-safe waypoint that meets you exactly where you left off.</div>
            <div style={{display:"flex",gap:8,justifyContent:"center",flexWrap:"wrap"}}>
              {TRENDING_B.slice(0,3).map((b,i)=><button key={i} onClick={()=>doWrite(`Compass: ${b.title}`)} style={{padding:"8px 16px",borderRadius:10,border:`1px solid ${T.blue}25`,background:`${T.blue}08`,fontFamily:T.sans,fontSize:11,fontWeight:600,color:T.blue,cursor:"pointer"}}>{"\u27D0"} {b.title}</button>)}
            </div>
          </div>
        </div>}
      </main>
      {navTab==="feed"&&<aside className="feed-side hscroll-y" style={{position:"sticky",top:76,maxHeight:"calc(100vh - 92px)",overflowY:"auto",display:"flex",flexDirection:"column",gap:12,paddingBottom:20,animation:loaded?"slideR .4s ease .15s both":"none"}}>
        <StreakWidget/>
        <DailyPrompt/>
        <ActivityFeed/>
        <TrendingStories/>
        <TrendingBooks/>
        <InkLeaderboard/>
        <InviteWidget/>
        <div style={{padding:"12px 20px",fontFamily:T.sans,fontSize:10,color:T.ink4,lineHeight:2}}>About {"\u00B7"} Privacy {"\u00B7"} Terms {"\u00B7"} Creators {"\u00B7"} API {"\u00B7"} Guidelines<div style={{marginTop:2}}>{"\u00A9"} 2026 Precis Technologies, Inc.</div></div>
      </aside>}
    </div>

    {/* Mobile Bottom Nav */}
    <nav className="mob-nav" aria-label="Mobile navigation" style={{position:"fixed",bottom:0,left:0,right:0,zIndex:200,background:`${T.bg}F2`,backdropFilter:"blur(20px)",borderTop:`1px solid ${T.border}`,display:"none",padding:"6px 0 env(safe-area-inset-bottom,8px)"}}>
      <div style={{display:"flex",justifyContent:"space-around",maxWidth:480,margin:"0 auto"}}>
        {[
          {id:"feed",icon:"\u25A3",label:"Feed",active:true},
          {id:"explore",icon:"\uD83C\uDF0D",label:"Explore"},
          {id:"compose",icon:"\u270D",label:"Write"},
          {id:"shelf",icon:"\u25C6",label:"Shelf"},
          {id:"profile",icon:"\u25CF",label:"Profile"},
        ].map(n=><button key={n.id} onClick={()=>doWrite(n.id==="compose"?"Opening Compose\u2026":n.id==="feed"?"":(`Opening ${n.label}\u2026`))}
          style={{display:"flex",flexDirection:"column",alignItems:"center",gap:2,padding:"6px 12px",border:"none",background:"none",cursor:"pointer",minWidth:48,minHeight:44}}>
          <span style={{fontSize:18,opacity:n.active?1:.5}}>{n.icon}</span>
          <span style={{fontFamily:T.sans,fontSize:9,fontWeight:n.active?700:500,color:n.active?T.gold:T.ink4}}>{n.label}</span>
        </button>)}
      </div>
    </nav>

  </div>;
}
