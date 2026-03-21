import { useState, useRef } from "react";

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
const LENSES={analyst:{icon:"\uD83D\uDD2C",label:"Analyst",color:"#5B9BD5"},empath:{icon:"\uD83D\uDC96",label:"Empath",color:"#D4788C"},philosopher:{icon:"\uD83D\uDCA1",label:"Philosopher",color:T.gold},storyteller:{icon:"\uD83C\uDFAD",label:"Storyteller",color:"#9B7ED4"},explorer:{icon:"\uD83D\uDDFA\uFE0F",label:"Explorer",color:"#5BAD7A"},alchemist:{icon:"\u2727",label:"Alchemist",color:"#C4A06A"}};
const TIERS=[{min:0,name:"Fresh Ink",color:T.ink3,bg:"rgba(122,112,103,0.1)"},{min:25,name:"Wet Ink",color:"#8BAAB8",bg:"rgba(139,170,184,0.1)"},{min:100,name:"Set Ink",color:"#A0C090",bg:"rgba(160,192,144,0.1)"},{min:500,name:"Deep Ink",color:T.gold,bg:"rgba(196,162,101,0.1)"},{min:2000,name:"Indelible",color:T.accent,bg:"rgba(184,86,42,0.12)"}];
function getTier(n){for(let i=TIERS.length-1;i>=0;i--)if(n>=TIERS[i].min)return TIERS[i];return TIERS[0];}
function Av({i,ink=0,s=32}){const t=getTier(ink);return <div style={{width:s,height:s,borderRadius:"50%",background:`linear-gradient(160deg,${T.bg3},${T.bg2})`,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:T.sans,fontSize:s*.36,fontWeight:700,color:T.ink2,border:`1.5px solid ${t.color}30`,flexShrink:0}}>{i}</div>;}
const pToast=(msg)=>{const el=document.getElementById("clubs-toast");if(!el)return;el.textContent=msg;el.style.display="block";el.style.animation="fadeUp .3s ease";setTimeout(()=>el.style.display="none",2500);};

// ═══════════════════════════════════════════════════
// MOCK DATA
// ═══════════════════════════════════════════════════
const USER={initials:"PA",ink:12300,name:"Priya Anand",lens:"empath"};

const MY_CLUBS=[
  {id:"c1",name:"Morrison Meridian",book:{title:"Beloved",author:"Toni Morrison"},members:[
    {initials:"PA",ink:12300,lens:"empath",progress:68},{initials:"IS",ink:3420,lens:"analyst",progress:82},{initials:"KA",ink:8750,lens:"storyteller",progress:55},{initials:"YT",ink:1240,lens:"empath",progress:71},{initials:"DS",ink:1800,lens:"explorer",progress:45}],
    pace:"30 pages/week",nextCheckpoint:{page:120,date:"Mar 7",label:"Part II opens"},currentCheckpoint:{page:90,date:"Mar 1",label:"The clearing scene"},
    waypoints:12,discussions:34,isAdmin:true,privacy:"invite",genre:"Literary Fiction",emoji:"\uD83D\uDCD6"},
  {id:"c2",name:"Sci-Fi Futures",book:{title:"The Left Hand of Darkness",author:"Ursula K. Le Guin"},members:[
    {initials:"PA",ink:12300,lens:"empath",progress:30},{initials:"JH",ink:540,lens:"explorer",progress:42},{initials:"AK",ink:4100,lens:"storyteller",progress:38}],
    pace:"50 pages/week",nextCheckpoint:{page:100,date:"Mar 10",label:"Winter on Gethen"},currentCheckpoint:{page:50,date:"Feb 28",label:"Shifgrethor explained"},
    waypoints:4,discussions:9,isAdmin:false,privacy:"public",genre:"Science Fiction",emoji:"\uD83D\uDE80"},
];

const DISCOVER_CLUBS=[
  {id:"d1",name:"The Empathy Engine",book:{title:"A Little Life",author:"Hanya Yanagihara"},members:18,lensSpread:{empath:8,analyst:4,philosopher:3,storyteller:2,explorer:1},genre:"Literary Fiction",emoji:"\uD83D\uDC96",privacy:"public"},
  {id:"d2",name:"Borderless",book:{title:"Pachinko",author:"Min Jin Lee"},members:24,lensSpread:{explorer:9,empath:6,storyteller:5,philosopher:3,analyst:1},genre:"Historical Fiction",emoji:"\uD83C\uDF0D",privacy:"public"},
  {id:"d3",name:"The Alchemist's Table",book:{title:"Piranesi",author:"Susanna Clarke"},members:11,lensSpread:{alchemist:5,philosopher:3,explorer:2,empath:1},genre:"Fantasy",emoji:"\u2727",privacy:"public"},
  {id:"d4",name:"Late Capitalism Reads",book:{title:"Severance",author:"Ling Ma"},members:15,lensSpread:{analyst:6,philosopher:5,storyteller:2,explorer:1,empath:1},genre:"Dystopian",emoji:"\uD83C\uDFD7\uFE0F",privacy:"public"},
];

// ═══════════════════════════════════════════════════
// CLUB DETAIL VIEW
// ═══════════════════════════════════════════════════
function ClubDetail({club,onBack}){
  const[tab,setTab]=useState("pace");
  const[newMsg,setNewMsg]=useState("");
  const[msgs,setMsgs]=useState([
    {id:"m1",author:"Ingrid S.",initials:"IS",lens:"analyst",text:"The clearing scene is doing something structural I haven\u2019t seen before. Morrison splits the timeline without breaking the tense. It\u2019s disorienting in exactly the way trauma is.",time:"2h ago"},
    {id:"m2",author:"Kofi A.",initials:"KA",lens:"storyteller",text:"I kept rereading the line about the tree on her back. It\u2019s a scar, but she describes it like it\u2019s alive. The metaphor earns itself.",time:"5h ago"},
    {id:"m3",author:"You",initials:"PA",lens:"empath",text:"Page 89 broke me. When she says \u201Cthick love\u201D \u2014 that\u2019s not poetry, that\u2019s a diagnosis.",time:"1d ago"},
  ]);

  const avgProgress=Math.round(club.members.reduce((a,m)=>a+m.progress,0)/club.members.length);

  return <div style={{animation:"fadeUp .3s ease"}}>
    {/* Header */}
    <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:20}}>
      <button onClick={onBack} style={{padding:"6px 12px",borderRadius:8,border:`1px solid ${T.border}`,background:"transparent",fontFamily:T.sans,fontSize:11,fontWeight:600,color:T.ink3,cursor:"pointer"}}>{"\u2190"} Clubs</button>
      <div style={{flex:1}}>
        <div style={{fontFamily:T.serif,fontSize:22,fontWeight:700,color:T.ink}}>{club.emoji} {club.name}</div>
        <div style={{fontFamily:T.sans,fontSize:11,color:T.ink3}}>{club.book.title} by {club.book.author} {"\u00B7"} {club.members.length} members {"\u00B7"} {club.privacy==="public"?"\uD83C\uDF10 Public":"\uD83D\uDD12 Invite only"}</div>
      </div>
      {club.isAdmin&&<button onClick={()=>pToast("Club settings opening\u2026")} style={{padding:"6px 12px",borderRadius:8,border:`1px solid ${T.border}`,background:"transparent",fontFamily:T.sans,fontSize:12,color:T.ink4,cursor:"pointer"}}>{"\u2699"}</button>}
      <button onClick={()=>{navigator.clipboard.writeText(`joinprecis.com/club/${club.id}`).catch(()=>{});pToast("\uD83D\uDD17 Invite link copied");}} style={{padding:"6px 16px",borderRadius:8,border:`1px solid ${T.gold}25`,background:`${T.gold}06`,fontFamily:T.sans,fontSize:11,fontWeight:700,color:T.gold,cursor:"pointer"}}>Invite</button>
    </div>

    {/* Progress overview */}
    <div style={{padding:"18px 20px",borderRadius:14,background:T.card,border:`1px solid ${T.border}`,marginBottom:16}}>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:10}}>
        <div style={{fontFamily:T.sans,fontSize:11,fontWeight:700,color:T.ink3,letterSpacing:".5px",textTransform:"uppercase"}}>Club progress</div>
        <div style={{fontFamily:T.sans,fontSize:11,color:T.gold,fontWeight:700}}>{avgProgress}% avg</div>
      </div>
      <div style={{display:"flex",gap:6,marginBottom:12}}>
        {club.members.map((m,i)=>{const lens=LENSES[m.lens];return <div key={i} style={{flex:1,textAlign:"center"}}>
          <Av i={m.initials} ink={m.ink} s={28}/>
          <div style={{height:4,borderRadius:2,background:T.bg3,marginTop:6,overflow:"hidden"}}><div style={{width:`${m.progress}%`,height:"100%",borderRadius:2,background:lens.color,transition:"width .5s ease"}}/></div>
          <div style={{fontFamily:T.sans,fontSize:8,color:T.ink4,marginTop:2}}>{m.progress}%</div>
        </div>;})}
      </div>
      <div style={{display:"flex",gap:12,flexWrap:"wrap"}}>
        <div style={{padding:"8px 14px",borderRadius:8,background:`${T.blue}06`,border:`1px solid ${T.blue}08`}}>
          <div style={{fontFamily:T.sans,fontSize:9,color:T.blue,fontWeight:600}}>Current checkpoint</div>
          <div style={{fontFamily:T.sans,fontSize:11,fontWeight:700,color:T.ink}}>{club.currentCheckpoint.label}</div>
          <div style={{fontFamily:T.sans,fontSize:9,color:T.ink4}}>Page {club.currentCheckpoint.page} {"\u00B7"} {club.currentCheckpoint.date}</div>
        </div>
        <div style={{padding:"8px 14px",borderRadius:8,background:`${T.green}06`,border:`1px solid ${T.green}08`}}>
          <div style={{fontFamily:T.sans,fontSize:9,color:T.green,fontWeight:600}}>Next checkpoint</div>
          <div style={{fontFamily:T.sans,fontSize:11,fontWeight:700,color:T.ink}}>{club.nextCheckpoint.label}</div>
          <div style={{fontFamily:T.sans,fontSize:9,color:T.ink4}}>Page {club.nextCheckpoint.page} {"\u00B7"} {club.nextCheckpoint.date}</div>
        </div>
      </div>
    </div>

    {/* Tabs */}
    <div style={{display:"flex",gap:4,marginBottom:16,borderBottom:`1px solid ${T.border}`,paddingBottom:8}}>
      {[{id:"pace",label:"\uD83D\uDCCA Pace"},{id:"discuss",label:`\uD83D\uDCAC Discussion (${msgs.length})`},{id:"waypoints",label:`\u27D0 Waypoints (${club.waypoints})`},{id:"members",label:`\uD83D\uDC65 Members (${club.members.length})`}].map(t=><button key={t.id} onClick={()=>setTab(t.id)} style={{padding:"8px 14px",borderRadius:8,border:"none",background:tab===t.id?`${T.gold}10`:"transparent",fontFamily:T.sans,fontSize:11,fontWeight:tab===t.id?700:500,color:tab===t.id?T.gold:T.ink4,cursor:"pointer"}}>{t.label}</button>)}
    </div>

    {/* Pace tab */}
    {tab==="pace"&&<div style={{display:"flex",flexDirection:"column",gap:12}}>
      <div style={{padding:"16px 20px",borderRadius:12,background:T.card,border:`1px solid ${T.border}`}}>
        <div style={{fontFamily:T.sans,fontSize:12,fontWeight:700,color:T.ink,marginBottom:6}}>Reading pace</div>
        <div style={{fontFamily:T.body,fontSize:13,color:T.ink2,fontWeight:300}}>{club.pace}</div>
      </div>
      <div style={{padding:"16px 20px",borderRadius:12,background:T.card,border:`1px solid ${T.border}`}}>
        <div style={{fontFamily:T.sans,fontSize:12,fontWeight:700,color:T.ink,marginBottom:8}}>Checkpoints</div>
        {[club.currentCheckpoint,club.nextCheckpoint].map((cp,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:10,padding:"8px 0",borderTop:i>0?`1px solid ${T.border}`:"none"}}>
          <div style={{width:8,height:8,borderRadius:"50%",background:i===0?T.green:`${T.ink4}40`}}/>
          <div style={{flex:1}}><div style={{fontFamily:T.sans,fontSize:11,fontWeight:600,color:T.ink}}>{cp.label}</div><div style={{fontFamily:T.sans,fontSize:9,color:T.ink4}}>Page {cp.page} {"\u00B7"} {cp.date}</div></div>
          {i===0&&<span style={{fontFamily:T.sans,fontSize:9,color:T.green,fontWeight:600}}>Current</span>}
        </div>)}
      </div>
      <button onClick={()=>pToast("\u27D0 Opening Compass for group waypoint\u2026")} style={{width:"100%",padding:14,borderRadius:12,border:`1px dashed ${T.blue}25`,background:`${T.blue}04`,fontFamily:T.sans,fontSize:13,fontWeight:700,color:T.blue,cursor:"pointer"}}>{"\u27D0"} Set a group waypoint at page {club.currentCheckpoint.page}</button>
    </div>}

    {/* Discussion tab */}
    {tab==="discuss"&&<div>
      <div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:12}}>
        {msgs.map(m=>{const lens=LENSES[m.lens];return <div key={m.id} style={{display:"flex",gap:10,padding:"12px 14px",borderRadius:12,background:T.card,border:`1px solid ${T.border}`}}>
          <Av i={m.initials} ink={0} s={28}/>
          <div style={{flex:1,minWidth:0}}>
            <div style={{display:"flex",alignItems:"center",gap:5,marginBottom:3}}>
              <span style={{fontFamily:T.sans,fontSize:11,fontWeight:700,color:T.ink}}>{m.author}</span>
              <span style={{fontSize:9}}>{lens?.icon}</span>
              <span style={{fontFamily:T.sans,fontSize:9,color:T.ink4}}>{m.time}</span>
            </div>
            <div style={{fontFamily:T.body,fontSize:12,color:T.ink2,fontWeight:300,lineHeight:1.6}}>{m.text}</div>
          </div>
        </div>;})}
      </div>
      <div style={{display:"flex",gap:8}}>
        <input value={newMsg} onChange={e=>setNewMsg(e.target.value)} onKeyDown={e=>{if(e.key==="Enter"&&newMsg.trim()){setMsgs(p=>[{id:`m${Date.now()}`,author:"You",initials:"PA",lens:"empath",text:newMsg.trim(),time:"Just now"},...p]);setNewMsg("");pToast("+2 Ink \u2014 club discussion");}}} placeholder="Share your thoughts with the club\u2026" style={{flex:1,padding:"10px 14px",borderRadius:10,border:`1px solid ${T.border}`,background:T.bg3,fontFamily:T.body,fontSize:12,color:T.ink,fontWeight:300}}/>
        <button onClick={()=>{if(!newMsg.trim())return;setMsgs(p=>[{id:`m${Date.now()}`,author:"You",initials:"PA",lens:"empath",text:newMsg.trim(),time:"Just now"},...p]);setNewMsg("");pToast("+2 Ink \u2014 club discussion");}} disabled={!newMsg.trim()} style={{padding:"10px 16px",borderRadius:10,border:"none",background:newMsg.trim()?T.accent:T.bg3,fontFamily:T.sans,fontSize:11,fontWeight:700,color:newMsg.trim()?"#fff":T.ink4,cursor:newMsg.trim()?"pointer":"default"}}>Post</button>
      </div>
    </div>}

    {/* Waypoints tab */}
    {tab==="waypoints"&&<div style={{textAlign:"center",padding:"40px 20px",background:T.card,borderRadius:14,border:`1px solid ${T.border}`}}>
      <div style={{fontSize:32,opacity:.3,marginBottom:8}}>{"\u27D0"}</div>
      <div style={{fontFamily:T.serif,fontSize:16,fontWeight:700,color:T.ink,marginBottom:4}}>{club.waypoints} group waypoints</div>
      <div style={{fontFamily:T.body,fontSize:12,color:T.ink3,fontWeight:300}}>Waypoints set at club checkpoints appear here. Spoiler-safe through each page boundary.</div>
      <button onClick={()=>pToast("Opening Compass\u2026")} style={{marginTop:14,padding:"10px 24px",borderRadius:10,border:`1px solid ${T.blue}25`,background:`${T.blue}06`,fontFamily:T.sans,fontSize:12,fontWeight:700,color:T.blue,cursor:"pointer"}}>{"\u27D0"} Set waypoint</button>
    </div>}

    {/* Members tab */}
    {tab==="members"&&<div style={{display:"flex",flexDirection:"column",gap:6}}>
      {club.members.map((m,i)=>{const lens=LENSES[m.lens];return <div key={i} style={{display:"flex",alignItems:"center",gap:10,padding:"10px 14px",borderRadius:10,background:T.card,border:`1px solid ${T.border}`}}>
        <Av i={m.initials} ink={m.ink} s={32}/>
        <div style={{flex:1}}><span style={{fontFamily:T.sans,fontSize:12,fontWeight:700,color:T.ink}}>{m.initials}</span><span style={{fontSize:10,marginLeft:6}}>{lens.icon}</span></div>
        <div style={{fontFamily:T.sans,fontSize:10,color:T.gold,fontWeight:600}}>{m.progress}%</div>
        <button onClick={()=>pToast(`Opening conversation\u2026`)} style={{fontFamily:T.sans,fontSize:9,color:T.blue,background:"none",border:"none",cursor:"pointer"}}>{"\u2709"}</button>
        {club.isAdmin&&m.initials!=="PA"&&<button onClick={()=>pToast(`Removed ${m.initials}`)} style={{fontFamily:T.sans,fontSize:9,color:T.red,background:"none",border:"none",cursor:"pointer"}}>Remove</button>}
      </div>;})}
    </div>}
  </div>;
}

// ═══════════════════════════════════════════════════
// CREATE CLUB FLOW
// ═══════════════════════════════════════════════════
function CreateClub({onClose,onCreate}){
  const[name,setName]=useState("");
  const[book,setBook]=useState("");
  const[pace,setPace]=useState("30");
  const[privacy,setPrivacy]=useState("invite");
  return <div style={{animation:"fadeUp .3s ease"}}>
    <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:20}}>
      <h2 style={{fontFamily:T.serif,fontSize:22,fontWeight:700,color:T.ink}}>Start a book club</h2>
      <button onClick={onClose} style={{fontSize:18,color:T.ink4,background:"none",border:"none",cursor:"pointer"}}>{"\u2715"}</button>
    </div>
    <div style={{display:"flex",flexDirection:"column",gap:14}}>
      <div>
        <label style={{fontFamily:T.sans,fontSize:10,fontWeight:700,color:T.ink4,letterSpacing:".5px",textTransform:"uppercase",display:"block",marginBottom:4}}>Club name</label>
        <input value={name} onChange={e=>setName(e.target.value)} placeholder="Morrison Meridian, Sci-Fi Sundays\u2026" maxLength={50} style={{width:"100%",padding:"12px 16px",borderRadius:10,border:`1px solid ${T.border}`,background:T.bg3,fontFamily:T.body,fontSize:13,color:T.ink}}/>
      </div>
      <div>
        <label style={{fontFamily:T.sans,fontSize:10,fontWeight:700,color:T.ink4,letterSpacing:".5px",textTransform:"uppercase",display:"block",marginBottom:4}}>Book</label>
        <input value={book} onChange={e=>setBook(e.target.value)} placeholder="Search for a book\u2026" style={{width:"100%",padding:"12px 16px",borderRadius:10,border:`1px solid ${T.border}`,background:T.bg3,fontFamily:T.body,fontSize:13,color:T.ink}}/>
      </div>
      <div>
        <label style={{fontFamily:T.sans,fontSize:10,fontWeight:700,color:T.ink4,letterSpacing:".5px",textTransform:"uppercase",display:"block",marginBottom:4}}>Pace (pages per week)</label>
        <input type="number" value={pace} onChange={e=>setPace(e.target.value)} min={10} max={200} style={{width:120,padding:"10px 14px",borderRadius:10,border:`1px solid ${T.border}`,background:T.bg3,fontFamily:T.sans,fontSize:13,color:T.ink}}/>
      </div>
      <div>
        <label style={{fontFamily:T.sans,fontSize:10,fontWeight:700,color:T.ink4,letterSpacing:".5px",textTransform:"uppercase",display:"block",marginBottom:6}}>Privacy</label>
        <div style={{display:"flex",gap:8}}>
          {[{id:"public",icon:"\uD83C\uDF10",l:"Public \u2014 anyone can join"},{id:"invite",icon:"\uD83D\uDD12",l:"Invite only"}].map(p=><button key={p.id} onClick={()=>setPrivacy(p.id)} style={{flex:1,padding:"10px",borderRadius:10,border:`1.5px solid ${privacy===p.id?`${T.gold}30`:T.border}`,background:privacy===p.id?`${T.gold}06`:"transparent",fontFamily:T.sans,fontSize:11,fontWeight:privacy===p.id?700:500,color:privacy===p.id?T.gold:T.ink4,cursor:"pointer",textAlign:"left"}}>{p.icon} {p.l}</button>)}
        </div>
      </div>
      <button onClick={()=>{if(!name.trim()||!book.trim())return;onCreate({name,book});}} disabled={!name.trim()||!book.trim()} style={{padding:"14px",borderRadius:12,border:"none",background:name.trim()&&book.trim()?`linear-gradient(135deg,${T.accent},#9E4520)`:T.bg3,color:name.trim()&&book.trim()?"#fff":T.ink4,fontFamily:T.sans,fontSize:14,fontWeight:700,cursor:name.trim()&&book.trim()?"pointer":"default",marginTop:4}}>Create club</button>
    </div>
  </div>;
}

// ═══════════════════════════════════════════════════
// MAIN EXPORT
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

export default function BookClubs(){
  const{theme,tid,setTid}=useTheme(); T=theme;
  const[view,setView]=useState("list"); // list | detail | create
  const[activeClub,setActiveClub]=useState(null);
  const[tab,setTab]=useState("my"); // my | discover
  const[joinedDiscover,setJD]=useState({});

  return <div style={{background:T.bg,minHeight:"100vh",color:T.ink}}>
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,800;1,400;1,700&family=Source+Serif+4:ital,wght@0,300;0,400;0,700;1,300;1,400&family=DM+Sans:wght@400;500;600;700;800&display=swap');
      *{margin:0;padding:0;box-sizing:border-box}
      ::selection{background:${T.gold}30;color:${T.ink}}
      @keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
      @media(max-width:640px){.mob-nav{display:flex!important}.bc-grid{grid-template-columns:1fr!important}}
    `}</style>

    <div id="clubs-toast" style={{display:"none",position:"fixed",bottom:80,left:"50%",transform:"translateX(-50%)",padding:"10px 24px",borderRadius:10,background:T.bg2,border:`1px solid ${T.borderHover}`,boxShadow:"0 8px 32px rgba(0,0,0,.4)",fontFamily:T.sans,fontSize:12,fontWeight:700,color:T.ink,zIndex:300}}/>

    {/* Nav */}
    <nav style={{position:"sticky",top:0,zIndex:100,background:`${T.bg}E8`,backdropFilter:"blur(24px)",borderBottom:`1px solid ${T.border}`}}>
      <div style={{maxWidth:760,margin:"0 auto",padding:"12px 24px",display:"flex",alignItems:"center"}}>
        <span style={{fontFamily:T.serif,fontSize:22,fontWeight:700,color:T.ink,letterSpacing:"-.5px",cursor:"pointer"}} onClick={()=>pToast("\u2190 Feed")}>Pr<span style={{color:T.accent}}>{"\u00E9"}</span>cis</span>
        <span onClick={()=>pToast("\u2190 Feed")} style={{fontFamily:T.sans,fontSize:12,color:T.ink3,marginLeft:12,cursor:"pointer"}}>{"\u2190"} Feed</span>
        <div style={{flex:1}}/>
        <ThemeSwitcher tid={tid} setTid={setTid}/>
        <span style={{fontFamily:T.sans,fontSize:13,fontWeight:700,color:T.plum,display:"flex",alignItems:"center",gap:5}}>{"\uD83D\uDCDA"} Book Clubs</span>
      </div>
    </nav>

    <main style={{maxWidth:760,margin:"0 auto",padding:"28px 24px 100px"}}>
      {view==="create"&&<CreateClub onClose={()=>setView("list")} onCreate={d=>{pToast(`\uD83D\uDCDA ${d.name} created! Share the invite link.`);setView("list");}}/>}

      {view==="detail"&&activeClub&&<ClubDetail club={activeClub} onBack={()=>setView("list")}/>}

      {view==="list"&&<>
        {/* Header */}
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:24}}>
          <div>
            <h1 style={{fontFamily:T.serif,fontSize:28,fontWeight:700,color:T.ink,marginBottom:4}}>Book Clubs</h1>
            <p style={{fontFamily:T.body,fontSize:13,color:T.ink3,fontWeight:300}}>Read together. Discuss at the pace you set. Earn Ink as a group.</p>
          </div>
          <button onClick={()=>setView("create")} style={{padding:"10px 22px",borderRadius:10,border:"none",background:`linear-gradient(135deg,${T.accent},#9E4520)`,color:"#fff",fontFamily:T.sans,fontSize:12,fontWeight:700,cursor:"pointer",boxShadow:`0 2px 12px ${T.accent}30`,whiteSpace:"nowrap"}}>+ Start a club</button>
        </div>

        {/* Tabs */}
        <div style={{display:"flex",gap:4,marginBottom:20,borderBottom:`1px solid ${T.border}`,paddingBottom:8}}>
          <button onClick={()=>setTab("my")} style={{padding:"8px 16px",borderRadius:8,border:"none",background:tab==="my"?`${T.gold}10`:"transparent",fontFamily:T.sans,fontSize:12,fontWeight:tab==="my"?700:500,color:tab==="my"?T.gold:T.ink4,cursor:"pointer"}}>My clubs ({MY_CLUBS.length})</button>
          <button onClick={()=>setTab("discover")} style={{padding:"8px 16px",borderRadius:8,border:"none",background:tab==="discover"?`${T.gold}10`:"transparent",fontFamily:T.sans,fontSize:12,fontWeight:tab==="discover"?700:500,color:tab==="discover"?T.gold:T.ink4,cursor:"pointer"}}>Discover</button>
        </div>

        {/* My clubs */}
        {tab==="my"&&<div className="bc-grid" style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(320px,1fr))",gap:12}}>
          {MY_CLUBS.map(c=>{const avgP=Math.round(c.members.reduce((a,m)=>a+m.progress,0)/c.members.length);
          return <div key={c.id} onClick={()=>{setActiveClub(c);setView("detail");}} style={{padding:"20px",borderRadius:16,background:T.card,border:`1px solid ${T.border}`,cursor:"pointer",transition:"all .2s"}} onMouseEnter={e=>{e.currentTarget.style.borderColor=T.borderHover;e.currentTarget.style.transform="translateY(-2px)";}} onMouseLeave={e=>{e.currentTarget.style.borderColor=T.border;e.currentTarget.style.transform="translateY(0)";}}>
            <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:12}}>
              <span style={{fontSize:24}}>{c.emoji}</span>
              <div style={{flex:1}}>
                <div style={{fontFamily:T.sans,fontSize:14,fontWeight:700,color:T.ink}}>{c.name}</div>
                <div style={{fontFamily:T.sans,fontSize:11,color:T.ink3}}>{c.book.title} {"\u00B7"} {c.members.length} members</div>
              </div>
              {c.isAdmin&&<span style={{fontFamily:T.sans,fontSize:8,color:T.gold,fontWeight:700,padding:"2px 6px",borderRadius:4,background:`${T.gold}10`}}>Admin</span>}
            </div>
            {/* Progress bar */}
            <div style={{height:4,borderRadius:2,background:T.bg3,marginBottom:8}}><div style={{width:`${avgP}%`,height:"100%",borderRadius:2,background:`linear-gradient(90deg,${T.accent},${T.gold})`}}/></div>
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
              <div style={{fontFamily:T.sans,fontSize:10,color:T.ink4}}>{avgP}% avg {"\u00B7"} {c.pace}</div>
              <div style={{display:"flex",gap:-6}}>{c.members.slice(0,4).map((m,i)=><div key={i} style={{width:20,height:20,borderRadius:"50%",background:T.bg3,border:`1.5px solid ${T.card}`,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:T.sans,fontSize:7,fontWeight:700,color:T.ink3,marginLeft:i>0?-6:0,position:"relative",zIndex:4-i}}>{m.initials}</div>)}</div>
            </div>
            <div style={{display:"flex",gap:8,marginTop:10}}>
              <span style={{fontFamily:T.sans,fontSize:9,color:T.blue}}>{"\u27D0"} {c.waypoints} waypoints</span>
              <span style={{fontFamily:T.sans,fontSize:9,color:T.gold}}>{"\uD83D\uDCAC"} {c.discussions} messages</span>
              <span style={{fontFamily:T.sans,fontSize:9,color:T.green}}>Next: {c.nextCheckpoint.date}</span>
            </div>
          </div>;})}
        </div>}

        {/* Discover */}
        {tab==="discover"&&<div className="bc-grid" style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(320px,1fr))",gap:12}}>
          {DISCOVER_CLUBS.map(c=>{const isJ=joinedDiscover[c.id];const topLens=Object.entries(c.lensSpread).sort((a,b)=>b[1]-a[1])[0];const tl=LENSES[topLens[0]];
          return <div key={c.id} style={{padding:"20px",borderRadius:16,background:T.card,border:`1px solid ${T.border}`}}>
            <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:12}}>
              <span style={{fontSize:24}}>{c.emoji}</span>
              <div style={{flex:1}}>
                <div style={{fontFamily:T.sans,fontSize:14,fontWeight:700,color:T.ink}}>{c.name}</div>
                <div style={{fontFamily:T.sans,fontSize:11,color:T.ink3}}>{c.book.title} by {c.book.author}</div>
              </div>
            </div>
            <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:12}}>
              <span style={{fontFamily:T.sans,fontSize:10,color:T.ink4}}>{c.members} members</span>
              <span style={{fontFamily:T.sans,fontSize:10,color:T.ink4}}>{"\u00B7"}</span>
              <span style={{fontFamily:T.sans,fontSize:10,color:tl.color}}>{tl.icon} Mostly {tl.label}s</span>
              <span style={{fontFamily:T.sans,fontSize:10,color:T.ink4}}>{"\u00B7"}</span>
              <span style={{fontFamily:T.sans,fontSize:10,color:T.ink4}}>{c.genre}</span>
            </div>
            {/* Lens spread bar */}
            <div style={{display:"flex",height:4,borderRadius:2,overflow:"hidden",marginBottom:12}}>
              {Object.entries(c.lensSpread).map(([k,v])=><div key={k} style={{flex:v,background:LENSES[k].color}} title={`${LENSES[k].label}: ${v}`}/>)}
            </div>
            <button onClick={()=>{setJD(p=>({...p,[c.id]:!isJ}));pToast(isJ?`Left ${c.name}`:`Joined ${c.name}!`);}} style={{width:"100%",padding:"10px",borderRadius:10,border:isJ?`1px solid ${T.border}`:"none",background:isJ?"transparent":`linear-gradient(135deg,${T.accent},#9E4520)`,fontFamily:T.sans,fontSize:12,fontWeight:700,color:isJ?T.ink3:"#fff",cursor:"pointer"}}>{isJ?"Joined \u2713":"Join club"}</button>
          </div>;})}
        </div>}
      </>}
    </main>

    {/* Mobile nav */}
    <nav className="mob-nav" aria-label="Mobile navigation" style={{position:"fixed",bottom:0,left:0,right:0,zIndex:200,background:`${T.bg}F2`,backdropFilter:"blur(20px)",borderTop:`1px solid ${T.border}`,display:"none",padding:"6px 0 env(safe-area-inset-bottom,8px)"}}>
      <div style={{display:"flex",justifyContent:"space-around",maxWidth:480,margin:"0 auto"}}>
        {[{id:"feed",icon:"\u25A3",label:"Feed"},{id:"explore",icon:"\uD83C\uDF0D",label:"Explore"},{id:"press",icon:"\uD83D\uDCF0",label:"The Press"},{id:"compose",icon:"\u270D",label:"Write"},{id:"shelf",icon:"\u25C6",label:"Shelf"},{id:"profile",icon:"\u25CF",label:"Profile"}].map(n=><button key={n.id} onClick={()=>pToast(`Opening ${n.label}\u2026`)} style={{display:"flex",flexDirection:"column",alignItems:"center",gap:2,padding:"6px 12px",border:"none",background:"none",cursor:"pointer",minWidth:48,minHeight:44}}>
          <span style={{fontSize:18,opacity:.5}}>{n.icon}</span>
          <span style={{fontFamily:T.sans,fontSize:9,fontWeight:500,color:T.ink4}}>{n.label}</span>
        </button>)}
      </div>
    </nav>
  </div>;
}
