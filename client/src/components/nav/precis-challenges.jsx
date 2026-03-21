import { useState } from "react";

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
function Av({i,s=32}){return <div style={{width:s,height:s,borderRadius:"50%",background:`linear-gradient(160deg,${T.bg3},${T.bg2})`,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:T.sans,fontSize:s*.36,fontWeight:700,color:T.ink2,border:`1.5px solid ${T.gold}30`,flexShrink:0}}>{i}</div>;}
const pToast=(msg)=>{const el=document.getElementById("ch-toast");if(!el)return;el.textContent=msg;el.style.display="block";el.style.animation="fadeUp .3s ease";setTimeout(()=>el.style.display="none",2500);};

// ═══════════════════════════════════════════════════
// CHALLENGE DATA
// ═══════════════════════════════════════════════════

// Platform challenges (set by Précis — like NRC's curated runs)
const PLATFORM_CHALLENGES=[
  {id:"pc1",type:"platform",title:"March of Morrison",subtitle:"Read any Toni Morrison novel this month",emoji:"\uD83D\uDCDA",
    goal:{type:"book",target:1,unit:"book"},duration:"Mar 1\u201331",
    reward:{ink:150,badge:"\uD83C\uDFC5 Morrison March"},
    participants:1842,progress:0,joined:false,
    color:T.accent,featured:true},
  {id:"pc2",type:"platform",title:"Waypoint Week",subtitle:"Set 5 waypoints in 7 days",emoji:"\u27D0",
    goal:{type:"waypoints",target:5,unit:"waypoints"},duration:"Mar 3\u20139",
    reward:{ink:75,badge:"\u27D0 Wayfinder"},
    participants:3200,progress:2,joined:true,
    color:T.blue,featured:false},
  {id:"pc3",type:"platform",title:"Lens Swap",subtitle:"Read a book recommended by a different lens",emoji:"\uD83D\uDD04",
    goal:{type:"book",target:1,unit:"book from another lens"},duration:"Mar 1\u201331",
    reward:{ink:100,badge:"\uD83D\uDD04 Lens Shifter"},
    participants:920,progress:0,joined:false,
    color:T.plum,featured:false},
  {id:"pc4",type:"platform",title:"The 500 Club",subtitle:"Write 500 words in a single post",emoji:"\u270D",
    goal:{type:"words",target:500,unit:"words in one post"},duration:"Ongoing",
    reward:{ink:50,badge:"\u270D 500 Club"},
    participants:5100,progress:340,joined:true,
    color:T.green,featured:false},
  {id:"pc5",type:"platform",title:"Annotate the Canon",subtitle:"Annotate 10 waypoints across any classic",emoji:"\uD83D\uDCDD",
    goal:{type:"annotations",target:10,unit:"annotations"},duration:"Mar 1\u201331",
    reward:{ink:120,badge:"\uD83D\uDCDD Canon Scholar"},
    participants:670,progress:0,joined:false,
    color:T.gold,featured:false},
];

// User-created challenges (like NRC's custom challenges with friend invites)
const MY_CHALLENGES=[
  {id:"uc1",type:"custom",title:"Priya\u2019s Spring Stack",subtitle:"Read 4 books before April",emoji:"\uD83C\uDF38",
    goal:{type:"books",target:4,unit:"books"},duration:"Mar 1\u2013Apr 1",
    reward:{ink:200,badge:"\uD83C\uDF38 Spring Reader"},
    creator:{name:"You",initials:"PA"},
    participants:[
      {initials:"PA",name:"You",progress:1,lens:"empath"},
      {initials:"IS",name:"Ingrid S.",progress:2,lens:"analyst"},
      {initials:"KA",name:"Kofi A.",progress:1,lens:"storyteller"},
      {initials:"YT",name:"Yuki T.",progress:0,lens:"empath"},
    ],
    invited:["JH","AK","TR"],isCreator:true,color:T.accent},
  {id:"uc2",type:"custom",title:"Kofi\u2019s Genre Sprint",subtitle:"Read 1 book outside your comfort genre",emoji:"\uD83D\uDE80",
    goal:{type:"books",target:1,unit:"book outside comfort zone"},duration:"Mar 1\u201320",
    reward:{ink:80,badge:"\uD83D\uDE80 Genre Breaker"},
    creator:{name:"Kofi A.",initials:"KA"},
    participants:[
      {initials:"KA",name:"Kofi A.",progress:1,lens:"storyteller"},
      {initials:"PA",name:"You",progress:0,lens:"empath"},
      {initials:"DS",name:"Davi S.",progress:0,lens:"explorer"},
    ],
    invited:[],isCreator:false,color:T.plum},
];

// Completed challenges (badges earned)
const COMPLETED=[
  {title:"February Focus",badge:"\uD83C\uDFAF February Focus",ink:100,date:"Feb 28"},
  {title:"First Waypoint",badge:"\u27D0 First Waypoint",ink:25,date:"Jan 15"},
  {title:"Week One",badge:"\uD83C\uDF1F Week One",ink:50,date:"Jan 8"},
];

// ═══════════════════════════════════════════════════
// CHALLENGE DETAIL
// ═══════════════════════════════════════════════════
function ChallengeDetail({ch,onBack}){
  const isCustom=ch.type==="custom";
  const pct=isCustom?Math.round((ch.participants.find(p=>p.name==="You")?.progress||0)/ch.goal.target*100):Math.round(ch.progress/ch.goal.target*100);

  return <div style={{animation:"fadeUp .3s ease"}}>
    <button onClick={onBack} style={{padding:"6px 12px",borderRadius:8,border:`1px solid ${T.border}`,background:"transparent",fontFamily:T.sans,fontSize:11,fontWeight:600,color:T.ink3,cursor:"pointer",marginBottom:16}}>{"\u2190"} Challenges</button>

    {/* Hero */}
    <div style={{padding:"28px 24px",borderRadius:18,background:`${ch.color}06`,border:`1.5px solid ${ch.color}15`,marginBottom:20,textAlign:"center"}}>
      <div style={{fontSize:48,marginBottom:8}}>{ch.emoji}</div>
      <div style={{fontFamily:T.serif,fontSize:24,fontWeight:700,color:T.ink}}>{ch.title}</div>
      <div style={{fontFamily:T.body,fontSize:13,color:T.ink3,fontWeight:300,marginTop:4}}>{ch.subtitle}</div>
      <div style={{fontFamily:T.sans,fontSize:10,color:ch.color,fontWeight:600,marginTop:8}}>{ch.duration}</div>

      {/* Progress ring */}
      <div style={{margin:"20px auto",width:100,height:100,position:"relative"}}>
        <svg viewBox="0 0 100 100" style={{width:100,height:100,transform:"rotate(-90deg)"}}>
          <circle cx="50" cy="50" r="42" fill="none" stroke={`${ch.color}15`} strokeWidth="6"/>
          <circle cx="50" cy="50" r="42" fill="none" stroke={ch.color} strokeWidth="6" strokeLinecap="round" strokeDasharray={`${pct*2.64} ${264-pct*2.64}`}/>
        </svg>
        <div style={{position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:T.sans,fontSize:22,fontWeight:800,color:ch.color}}>{pct}%</div>
      </div>

      <div style={{fontFamily:T.sans,fontSize:12,color:T.ink2,fontWeight:600}}>
        {isCustom?`${ch.participants.find(p=>p.name==="You")?.progress||0} / ${ch.goal.target} ${ch.goal.unit}`:`${ch.progress} / ${ch.goal.target} ${ch.goal.unit}`}
      </div>

      {/* Reward preview */}
      <div style={{display:"flex",gap:12,justifyContent:"center",marginTop:16}}>
        <div style={{padding:"6px 14px",borderRadius:8,background:`${T.gold}08`,border:`1px solid ${T.gold}10`}}>
          <span style={{fontFamily:T.sans,fontSize:10,fontWeight:700,color:T.gold}}>{"\u25C6"} +{ch.reward.ink} Ink</span>
        </div>
        <div style={{padding:"6px 14px",borderRadius:8,background:`${ch.color}08`,border:`1px solid ${ch.color}10`}}>
          <span style={{fontFamily:T.sans,fontSize:10,fontWeight:700,color:ch.color}}>{ch.reward.badge}</span>
        </div>
      </div>
    </div>

    {/* Leaderboard / participants */}
    {isCustom&&<div style={{marginBottom:20}}>
      <div style={{fontFamily:T.sans,fontSize:12,fontWeight:700,color:T.ink,marginBottom:10}}>Leaderboard</div>
      {[...ch.participants].sort((a,b)=>b.progress-a.progress).map((p,i)=>{const lens=LENSES[p.lens];const pPct=Math.round(p.progress/ch.goal.target*100);
      return <div key={i} style={{display:"flex",alignItems:"center",gap:10,padding:"10px 14px",borderRadius:10,background:i===0?`${T.gold}04`:T.card,border:`1px solid ${i===0?`${T.gold}10`:T.border}`,marginBottom:6}}>
        <span style={{fontFamily:T.sans,fontSize:14,fontWeight:800,color:i===0?T.gold:i===1?T.ink2:T.ink4,width:20,textAlign:"center"}}>{i+1}</span>
        <Av i={p.initials} s={28}/>
        <div style={{flex:1}}>
          <div style={{display:"flex",alignItems:"center",gap:5}}>
            <span style={{fontFamily:T.sans,fontSize:12,fontWeight:700,color:T.ink}}>{p.name}</span>
            <span style={{fontSize:9}}>{lens.icon}</span>
          </div>
          <div style={{height:3,borderRadius:2,background:T.bg3,marginTop:4}}><div style={{width:`${pPct}%`,height:"100%",borderRadius:2,background:ch.color}}/></div>
        </div>
        <span style={{fontFamily:T.sans,fontSize:11,fontWeight:700,color:ch.color}}>{p.progress}/{ch.goal.target}</span>
      </div>;})}

      {/* Invite friends */}
      {ch.isCreator&&<div style={{marginTop:12}}>
        <button onClick={()=>{navigator.clipboard.writeText(`joinprecis.com/challenge/${ch.id}`).catch(()=>{});pToast("\uD83D\uDD17 Challenge invite link copied");}} style={{width:"100%",padding:"12px",borderRadius:10,border:`1px solid ${T.gold}25`,background:`${T.gold}06`,fontFamily:T.sans,fontSize:12,fontWeight:700,color:T.gold,cursor:"pointer"}}>Invite friends to this challenge</button>
        {ch.invited.length>0&&<div style={{fontFamily:T.sans,fontSize:10,color:T.ink4,marginTop:6}}>Pending invites: {ch.invited.join(", ")}</div>}
      </div>}
    </div>}

    {!isCustom&&<div style={{marginBottom:20}}>
      <div style={{fontFamily:T.sans,fontSize:12,fontWeight:700,color:T.ink,marginBottom:6}}>Community</div>
      <div style={{fontFamily:T.sans,fontSize:13,color:T.ink2}}>{(ch.participants||0).toLocaleString()} readers participating</div>
    </div>}

    {/* Share / leave */}
    <div style={{display:"flex",gap:8}}>
      <button onClick={()=>{navigator.clipboard.writeText(`joinprecis.com/challenge/${ch.id}`).catch(()=>{});pToast("Share link copied");}} style={{flex:1,padding:"12px",borderRadius:10,border:`1px solid ${T.border}`,background:"transparent",fontFamily:T.sans,fontSize:12,fontWeight:600,color:T.ink3,cursor:"pointer"}}>{"\uD83D\uDD17"} Share</button>
      <button onClick={()=>{pToast("Left challenge");onBack();}} style={{padding:"12px 20px",borderRadius:10,border:`1px solid ${T.red}25`,background:`${T.red}06`,fontFamily:T.sans,fontSize:12,fontWeight:600,color:T.red,cursor:"pointer"}}>Leave</button>
    </div>
  </div>;
}

// ═══════════════════════════════════════════════════
// CREATE CHALLENGE
// ═══════════════════════════════════════════════════
function CreateChallenge({onClose,onCreate}){
  const[title,setTitle]=useState("");
  const[desc,setDesc]=useState("");
  const[goalType,setGoalType]=useState("books");
  const[goalTarget,setGoalTarget]=useState("3");
  const[duration,setDuration]=useState("month");
  const[invites,setInvites]=useState("");

  return <div style={{animation:"fadeUp .3s ease"}}>
    <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:20}}>
      <h2 style={{fontFamily:T.serif,fontSize:22,fontWeight:700,color:T.ink}}>Create a challenge</h2>
      <button onClick={onClose} style={{fontSize:18,color:T.ink4,background:"none",border:"none",cursor:"pointer"}}>{"\u2715"}</button>
    </div>
    <p style={{fontFamily:T.body,fontSize:12,color:T.ink3,fontWeight:300,marginBottom:20,lineHeight:1.6}}>Set a reading goal for yourself and invite friends. Everyone earns Ink for completing it.</p>
    <div style={{display:"flex",flexDirection:"column",gap:14}}>
      <div>
        <label style={{fontFamily:T.sans,fontSize:10,fontWeight:700,color:T.ink4,letterSpacing:".5px",textTransform:"uppercase",display:"block",marginBottom:4}}>Challenge name</label>
        <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Spring Stack, Genre Sprint\u2026" maxLength={50} style={{width:"100%",padding:"12px 16px",borderRadius:10,border:`1px solid ${T.border}`,background:T.bg3,fontFamily:T.body,fontSize:13,color:T.ink}}/>
      </div>
      <div>
        <label style={{fontFamily:T.sans,fontSize:10,fontWeight:700,color:T.ink4,letterSpacing:".5px",textTransform:"uppercase",display:"block",marginBottom:4}}>Description</label>
        <input value={desc} onChange={e=>setDesc(e.target.value)} placeholder="What\u2019s the challenge?" maxLength={120} style={{width:"100%",padding:"12px 16px",borderRadius:10,border:`1px solid ${T.border}`,background:T.bg3,fontFamily:T.body,fontSize:13,color:T.ink}}/>
      </div>
      <div style={{display:"flex",gap:12}}>
        <div style={{flex:1}}>
          <label style={{fontFamily:T.sans,fontSize:10,fontWeight:700,color:T.ink4,letterSpacing:".5px",textTransform:"uppercase",display:"block",marginBottom:4}}>Goal type</label>
          <select value={goalType} onChange={e=>setGoalType(e.target.value)} style={{width:"100%",padding:"10px 14px",borderRadius:10,border:`1px solid ${T.border}`,background:T.bg3,fontFamily:T.sans,fontSize:12,color:T.ink}}>
            <option value="books">Books read</option>
            <option value="waypoints">Waypoints set</option>
            <option value="words">Words written</option>
            <option value="annotations">Annotations</option>
            <option value="pages">Pages read</option>
          </select>
        </div>
        <div style={{width:100}}>
          <label style={{fontFamily:T.sans,fontSize:10,fontWeight:700,color:T.ink4,letterSpacing:".5px",textTransform:"uppercase",display:"block",marginBottom:4}}>Target</label>
          <input type="number" value={goalTarget} onChange={e=>setGoalTarget(e.target.value)} min={1} style={{width:"100%",padding:"10px 14px",borderRadius:10,border:`1px solid ${T.border}`,background:T.bg3,fontFamily:T.sans,fontSize:13,color:T.ink}}/>
        </div>
      </div>
      <div>
        <label style={{fontFamily:T.sans,fontSize:10,fontWeight:700,color:T.ink4,letterSpacing:".5px",textTransform:"uppercase",display:"block",marginBottom:4}}>Duration</label>
        <div style={{display:"flex",gap:6}}>
          {[{id:"week",l:"1 week"},{id:"2weeks",l:"2 weeks"},{id:"month",l:"1 month"},{id:"custom",l:"Custom"}].map(d=><button key={d.id} onClick={()=>setDuration(d.id)} style={{flex:1,padding:"9px",borderRadius:8,border:`1.5px solid ${duration===d.id?`${T.gold}30`:T.border}`,background:duration===d.id?`${T.gold}06`:"transparent",fontFamily:T.sans,fontSize:10,fontWeight:duration===d.id?700:500,color:duration===d.id?T.gold:T.ink4,cursor:"pointer"}}>{d.l}</button>)}
        </div>
      </div>
      <div>
        <label style={{fontFamily:T.sans,fontSize:10,fontWeight:700,color:T.ink4,letterSpacing:".5px",textTransform:"uppercase",display:"block",marginBottom:4}}>Invite friends (optional)</label>
        <input value={invites} onChange={e=>setInvites(e.target.value)} placeholder="@ingridreads, @kofi_writes\u2026" style={{width:"100%",padding:"12px 16px",borderRadius:10,border:`1px solid ${T.border}`,background:T.bg3,fontFamily:T.body,fontSize:13,color:T.ink}}/>
        <div style={{fontFamily:T.sans,fontSize:9,color:T.ink4,marginTop:4}}>They{"\u2019"}ll get a notification with a join button. You can also share a link after creating.</div>
      </div>
      <div style={{padding:"12px 16px",borderRadius:10,background:`${T.gold}04`,border:`1px solid ${T.gold}08`}}>
        <div style={{fontFamily:T.sans,fontSize:10,fontWeight:700,color:T.gold,marginBottom:4}}>Rewards</div>
        <div style={{fontFamily:T.sans,fontSize:11,color:T.ink2}}>Everyone who completes earns <strong style={{color:T.gold}}>+{Math.min(200,parseInt(goalTarget||1)*25)} Ink</strong> and a completion badge.</div>
      </div>
      <button onClick={()=>{if(!title.trim())return;onCreate({title});}} disabled={!title.trim()} style={{padding:"14px",borderRadius:12,border:"none",background:title.trim()?`linear-gradient(135deg,${T.accent},#9E4520)`:T.bg3,color:title.trim()?"#fff":T.ink4,fontFamily:T.sans,fontSize:14,fontWeight:700,cursor:title.trim()?"pointer":"default"}}>Create {"\u0026"} invite</button>
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

export default function Challenges(){
  const{theme,tid,setTid}=useTheme(); T=theme;
  const[view,setView]=useState("list"); // list | detail | create
  const[activeCh,setActiveCh]=useState(null);
  const[tab,setTab]=useState("platform"); // platform | mine | badges
  const[joinState,setJoin]=useState({pc2:true,pc4:true});

  return <div style={{background:T.bg,minHeight:"100vh",color:T.ink}}>
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,800;1,400;1,700&family=Source+Serif+4:ital,wght@0,300;0,400;0,700;1,300;1,400&family=DM+Sans:wght@400;500;600;700;800&display=swap');
      *{margin:0;padding:0;box-sizing:border-box}
      ::selection{background:${T.gold}30;color:${T.ink}}
      @keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
      @media(max-width:640px){.mob-nav{display:flex!important}.ch-grid{grid-template-columns:1fr!important}}
    `}</style>

    <div id="ch-toast" style={{display:"none",position:"fixed",bottom:80,left:"50%",transform:"translateX(-50%)",padding:"10px 24px",borderRadius:10,background:T.bg2,border:`1px solid ${T.borderHover}`,boxShadow:"0 8px 32px rgba(0,0,0,.4)",fontFamily:T.sans,fontSize:12,fontWeight:700,color:T.ink,zIndex:300}}/>

    {/* Nav */}
    <nav style={{position:"sticky",top:0,zIndex:100,background:`${T.bg}E8`,backdropFilter:"blur(24px)",borderBottom:`1px solid ${T.border}`}}>
      <div style={{maxWidth:760,margin:"0 auto",padding:"12px 24px",display:"flex",alignItems:"center"}}>
        <span style={{fontFamily:T.serif,fontSize:22,fontWeight:700,color:T.ink,letterSpacing:"-.5px",cursor:"pointer"}} onClick={()=>pToast("\u2190 Feed")}>Pr<span style={{color:T.accent}}>{"\u00E9"}</span>cis</span>
        <span onClick={()=>pToast("\u2190 Feed")} style={{fontFamily:T.sans,fontSize:12,color:T.ink3,marginLeft:12,cursor:"pointer"}}>{"\u2190"} Feed</span>
        <div style={{flex:1}}/>
        <ThemeSwitcher tid={tid} setTid={setTid}/>
        <span style={{fontFamily:T.sans,fontSize:13,fontWeight:700,color:T.accent,display:"flex",alignItems:"center",gap:5}}>{"\uD83C\uDFC6"} Challenges</span>
      </div>
    </nav>

    <main style={{maxWidth:760,margin:"0 auto",padding:"28px 24px 100px"}}>
      {view==="create"&&<CreateChallenge onClose={()=>setView("list")} onCreate={d=>{pToast(`\uD83C\uDFC6 ${d.title} created! Invites sent.`);setView("list");}}/>}

      {view==="detail"&&activeCh&&<ChallengeDetail ch={activeCh} onBack={()=>setView("list")}/>}

      {view==="list"&&<>
        {/* Header */}
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:24}}>
          <div>
            <h1 style={{fontFamily:T.serif,fontSize:28,fontWeight:700,color:T.ink,marginBottom:4}}>Challenges</h1>
            <p style={{fontFamily:T.body,fontSize:13,color:T.ink3,fontWeight:300}}>Push your reading. Earn Ink. Collect badges. Challenge your friends.</p>
          </div>
          <button onClick={()=>setView("create")} style={{padding:"10px 22px",borderRadius:10,border:"none",background:`linear-gradient(135deg,${T.accent},#9E4520)`,color:"#fff",fontFamily:T.sans,fontSize:12,fontWeight:700,cursor:"pointer",boxShadow:`0 2px 12px ${T.accent}30`,whiteSpace:"nowrap"}}>+ Create challenge</button>
        </div>

        {/* Tabs */}
        <div style={{display:"flex",gap:4,marginBottom:20,borderBottom:`1px solid ${T.border}`,paddingBottom:8}}>
          {[{id:"platform",label:"\uD83C\uDFC6 Platform"},{id:"mine",label:`\uD83D\uDC65 My challenges (${MY_CHALLENGES.length})`},{id:"badges",label:`\uD83C\uDFC5 Badges (${COMPLETED.length})`}].map(t=><button key={t.id} onClick={()=>setTab(t.id)} style={{padding:"8px 16px",borderRadius:8,border:"none",background:tab===t.id?`${T.gold}10`:"transparent",fontFamily:T.sans,fontSize:11,fontWeight:tab===t.id?700:500,color:tab===t.id?T.gold:T.ink4,cursor:"pointer"}}>{t.label}</button>)}
        </div>

        {/* Featured challenge */}
        {tab==="platform"&&<>
          {PLATFORM_CHALLENGES.filter(c=>c.featured).map(c=><div key={c.id} onClick={()=>{if(joinState[c.id]){setActiveCh(c);setView("detail");}}} style={{padding:"24px",borderRadius:18,background:`linear-gradient(135deg,${c.color}08,${T.card})`,border:`1.5px solid ${c.color}15`,marginBottom:20,cursor:joinState[c.id]?"pointer":"default"}}>
            <div style={{fontFamily:T.sans,fontSize:9,fontWeight:700,letterSpacing:"1.5px",textTransform:"uppercase",color:c.color,marginBottom:8}}>Featured challenge</div>
            <div style={{display:"flex",alignItems:"center",gap:12}}>
              <span style={{fontSize:40}}>{c.emoji}</span>
              <div style={{flex:1}}>
                <div style={{fontFamily:T.serif,fontSize:22,fontWeight:700,color:T.ink}}>{c.title}</div>
                <div style={{fontFamily:T.body,fontSize:13,color:T.ink3,fontWeight:300,marginTop:2}}>{c.subtitle}</div>
                <div style={{display:"flex",gap:10,marginTop:8}}>
                  <span style={{fontFamily:T.sans,fontSize:10,color:T.ink4}}>{c.participants.toLocaleString()} readers</span>
                  <span style={{fontFamily:T.sans,fontSize:10,color:T.gold}}>{"\u25C6"} +{c.reward.ink} Ink</span>
                  <span style={{fontFamily:T.sans,fontSize:10,color:c.color}}>{c.reward.badge}</span>
                </div>
              </div>
              {!joinState[c.id]&&<button onClick={e=>{e.stopPropagation();setJoin(p=>({...p,[c.id]:true}));pToast(`Joined ${c.title}!`);}} style={{padding:"10px 24px",borderRadius:10,border:"none",background:`linear-gradient(135deg,${T.accent},#9E4520)`,color:"#fff",fontFamily:T.sans,fontSize:12,fontWeight:700,cursor:"pointer"}}>Join</button>}
            </div>
          </div>)}

          {/* All platform challenges */}
          <div className="ch-grid" style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(320px,1fr))",gap:12}}>
            {PLATFORM_CHALLENGES.filter(c=>!c.featured).map(c=>{const isJ=joinState[c.id];const pct=isJ?Math.round(c.progress/c.goal.target*100):0;
            return <div key={c.id} onClick={()=>{if(isJ){setActiveCh(c);setView("detail");}}} style={{padding:"18px 20px",borderRadius:14,background:T.card,border:`1px solid ${isJ?`${c.color}15`:T.border}`,cursor:isJ?"pointer":"default",transition:"all .2s"}} onMouseEnter={e=>{if(isJ)e.currentTarget.style.transform="translateY(-2px)";}} onMouseLeave={e=>e.currentTarget.style.transform="translateY(0)"}>
              <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:10}}>
                <span style={{fontSize:24}}>{c.emoji}</span>
                <div style={{flex:1}}>
                  <div style={{fontFamily:T.sans,fontSize:14,fontWeight:700,color:T.ink}}>{c.title}</div>
                  <div style={{fontFamily:T.sans,fontSize:10,color:T.ink3}}>{c.subtitle}</div>
                </div>
              </div>
              {isJ&&<><div style={{height:4,borderRadius:2,background:T.bg3,marginBottom:6}}><div style={{width:`${pct}%`,height:"100%",borderRadius:2,background:c.color}}/></div>
              <div style={{fontFamily:T.sans,fontSize:9,color:c.color,fontWeight:600}}>{c.progress}/{c.goal.target} {c.goal.unit}</div></>}
              <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginTop:8}}>
                <div style={{display:"flex",gap:8}}>
                  <span style={{fontFamily:T.sans,fontSize:9,color:T.ink4}}>{c.participants.toLocaleString()} readers</span>
                  <span style={{fontFamily:T.sans,fontSize:9,color:T.gold}}>{"\u25C6"} +{c.reward.ink} Ink</span>
                </div>
                {!isJ&&<button onClick={e=>{e.stopPropagation();setJoin(p=>({...p,[c.id]:true}));pToast(`Joined ${c.title}!`);}} style={{padding:"6px 16px",borderRadius:8,border:"none",background:`linear-gradient(135deg,${T.accent},#9E4520)`,color:"#fff",fontFamily:T.sans,fontSize:10,fontWeight:700,cursor:"pointer"}}>Join</button>}
                {isJ&&<span style={{fontFamily:T.sans,fontSize:9,color:T.green,fontWeight:600}}>{"\u2713"} Joined</span>}
              </div>
            </div>;})}
          </div>
        </>}

        {/* My challenges (user-created) */}
        {tab==="mine"&&<div style={{display:"flex",flexDirection:"column",gap:12}}>
          {MY_CHALLENGES.map(c=>{const myP=c.participants.find(p=>p.name==="You");const pct=myP?Math.round(myP.progress/c.goal.target*100):0;
          return <div key={c.id} onClick={()=>{setActiveCh(c);setView("detail");}} style={{padding:"18px 20px",borderRadius:14,background:T.card,border:`1px solid ${T.border}`,cursor:"pointer",transition:"all .2s"}} onMouseEnter={e=>e.currentTarget.style.transform="translateY(-2px)"} onMouseLeave={e=>e.currentTarget.style.transform="translateY(0)"}>
            <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:10}}>
              <span style={{fontSize:24}}>{c.emoji}</span>
              <div style={{flex:1}}>
                <div style={{display:"flex",alignItems:"center",gap:6}}>
                  <span style={{fontFamily:T.sans,fontSize:14,fontWeight:700,color:T.ink}}>{c.title}</span>
                  {c.isCreator&&<span style={{fontFamily:T.sans,fontSize:8,fontWeight:700,color:T.gold,padding:"2px 6px",borderRadius:4,background:`${T.gold}10`}}>Creator</span>}
                </div>
                <div style={{fontFamily:T.sans,fontSize:10,color:T.ink3}}>{c.subtitle}</div>
              </div>
            </div>
            <div style={{height:4,borderRadius:2,background:T.bg3,marginBottom:6}}><div style={{width:`${pct}%`,height:"100%",borderRadius:2,background:c.color}}/></div>
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
              <span style={{fontFamily:T.sans,fontSize:9,color:c.color,fontWeight:600}}>{myP?.progress||0}/{c.goal.target} {c.goal.unit}</span>
              <div style={{display:"flex",gap:-4}}>{c.participants.slice(0,5).map((p,i)=><div key={i} style={{width:18,height:18,borderRadius:"50%",background:T.bg3,border:`1.5px solid ${T.card}`,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:T.sans,fontSize:6,fontWeight:700,color:T.ink3,marginLeft:i>0?-4:0,zIndex:5-i}}>{p.initials}</div>)}</div>
            </div>
          </div>;})}
          {MY_CHALLENGES.length===0&&<div style={{textAlign:"center",padding:"40px",background:T.card,borderRadius:14,border:`1px solid ${T.border}`}}>
            <div style={{fontSize:32,opacity:.3,marginBottom:8}}>{"\uD83C\uDFC6"}</div>
            <div style={{fontFamily:T.serif,fontSize:16,fontWeight:700,color:T.ink,marginBottom:6}}>No challenges yet</div>
            <div style={{fontFamily:T.body,fontSize:12,color:T.ink3,fontWeight:300}}>Create one and invite your reading circle.</div>
          </div>}
        </div>}

        {/* Badges */}
        {tab==="badges"&&<div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))",gap:10}}>
            {COMPLETED.map((b,i)=><div key={i} style={{padding:"20px",borderRadius:14,background:T.card,border:`1px solid ${T.border}`,textAlign:"center"}}>
              <div style={{fontSize:28,marginBottom:8}}>{b.badge.split(" ")[0]}</div>
              <div style={{fontFamily:T.sans,fontSize:12,fontWeight:700,color:T.ink}}>{b.badge.split(" ").slice(1).join(" ")}</div>
              <div style={{fontFamily:T.sans,fontSize:10,color:T.gold,fontWeight:600,marginTop:4}}>{"\u25C6"} +{b.ink} Ink</div>
              <div style={{fontFamily:T.sans,fontSize:9,color:T.ink4,marginTop:2}}>Earned {b.date}</div>
            </div>)}
          </div>
          {COMPLETED.length===0&&<div style={{textAlign:"center",padding:"40px"}}>
            <div style={{fontFamily:T.body,fontSize:13,color:T.ink3}}>Complete challenges to earn badges.</div>
          </div>}
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
