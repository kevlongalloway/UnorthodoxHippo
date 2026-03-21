import { useState, useEffect, useRef } from "react";

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
function Av({i,ink=0,s=32,online}){const t=getTier(ink);return <div style={{width:s,height:s,borderRadius:"50%",background:`linear-gradient(160deg,${T.bg3},${T.bg2})`,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:T.sans,fontSize:s*.36,fontWeight:700,color:T.ink2,border:`1.5px solid ${t.color}30`,flexShrink:0,position:"relative"}}>{i}{online&&<div style={{position:"absolute",bottom:0,right:0,width:s*.24,height:s*.24,borderRadius:"50%",background:T.green,border:`2px solid ${T.bg}`}}/>}</div>;}
const pToast=(msg)=>{const el=document.getElementById("msg-toast");if(!el)return;el.textContent=msg;el.style.display="block";el.style.animation="fadeUp .3s ease";setTimeout(()=>el.style.display="none",2500);};
function IB({ink}){const t=getTier(ink);return ink>=100?<span style={{display:"inline-flex",alignItems:"center",gap:3,padding:"1px 6px",borderRadius:4,fontSize:9,fontWeight:700,fontFamily:T.sans,color:t.color,background:`${t.color}10`}}>{"\u25C6"} {t.name}</span>:null;}

// ═══════════════════════════════════════════════════
// CONVERSATION DATA
// ═══════════════════════════════════════════════════
const CONVERSATIONS=[
  {id:"cv1",user:{name:"Ingrid Solberg",initials:"IS",handle:"@ingridreads",ink:3420,lens:"analyst",online:true},
    unread:2,lastMsg:"Your waypoint on page 140 completely shifted how I\u2019m reading the second half.",lastTime:"12m",
    messages:[
      {id:"m1",from:"them",text:"I just read your waypoint on page 140 of Beloved.",time:"2:14 PM",read:true},
      {id:"m2",from:"them",text:"Your waypoint on page 140 completely shifted how I\u2019m reading the second half.",time:"2:14 PM",read:false},
      {id:"m3",from:"me",text:"That\u2019s what I was hoping someone would feel. Morrison hides the structural turn so deep you almost miss it.",time:"1:48 PM",read:true},
      {id:"m4",from:"them",text:"Have you set one at page 200 yet? I\u2019m trying not to spoil myself but I think the tense shift does something wild.",time:"12:30 PM",read:true},
      {id:"m5",from:"me",text:"Not yet. I\u2019m savoring the clearing scene. Page 89 is still echoing.",time:"12:22 PM",read:true},
      {id:"m6",from:"them",text:"The \u201Cthick love\u201D line?",time:"12:20 PM",read:true},
      {id:"m7",from:"me",text:"That\u2019s the one. It haunts.",time:"12:19 PM",read:true},
    ],sharedBook:{title:"Beloved",author:"Toni Morrison"}},
  {id:"cv2",user:{name:"Kofi Asante",initials:"KA",handle:"@kofi_writes",ink:8750,lens:"storyteller",online:false},
    unread:0,lastMsg:"Just sent you a club invite for the Le Guin read.",lastTime:"3h",
    messages:[
      {id:"m1",from:"them",text:"Just sent you a club invite for the Le Guin read.",time:"11:20 AM",read:true},
      {id:"m2",from:"me",text:"Joined! Left Hand of Darkness is overdue for me.",time:"11:35 AM",read:true},
      {id:"m3",from:"them",text:"You\u2019re going to love it through the Empath lens. The gender stuff alone.",time:"11:37 AM",read:true},
    ],sharedBook:null},
  {id:"cv3",user:{name:"Yuki Tanaka",initials:"YT",handle:"@yukiwrites",ink:1240,lens:"empath",online:true},
    unread:0,lastMsg:"We should start a Morrison book club!",lastTime:"1d",
    messages:[
      {id:"m1",from:"them",text:"I saw you on the Explore map \u2014 we\u2019re both reading Beloved!",time:"Yesterday",read:true},
      {id:"m2",from:"me",text:"That\u2019s amazing! Where are you in it?",time:"Yesterday",read:true},
      {id:"m3",from:"them",text:"Page 95. The clearing scene just hit me.",time:"Yesterday",read:true},
      {id:"m4",from:"me",text:"Prepare yourself. It gets deeper.",time:"Yesterday",read:true},
      {id:"m5",from:"them",text:"We should start a Morrison book club!",time:"Yesterday",read:true},
    ],sharedBook:{title:"Beloved",author:"Toni Morrison"}},
  {id:"cv4",user:{name:"Davi Santos",initials:"DS",handle:"@davisantos",ink:1800,lens:"explorer",online:false},
    unread:1,lastMsg:"Your recommendation of Kindred just showed up in my feed. Adding it now.",lastTime:"2d",
    messages:[
      {id:"m1",from:"them",text:"Your recommendation of Kindred just showed up in my feed. Adding it now.",time:"2 days ago",read:false},
    ],sharedBook:null},
];

// ═══════════════════════════════════════════════════
// SHARED CONTENT EMBEDS
// ═══════════════════════════════════════════════════
function BookEmbed({book}){
  return <div style={{padding:"10px 14px",borderRadius:10,background:`${T.gold}04`,border:`1px solid ${T.gold}08`,display:"inline-flex",alignItems:"center",gap:8,maxWidth:280,cursor:"pointer"}} onClick={()=>pToast("Opening book detail\u2026")}>
    <div style={{width:32,height:44,borderRadius:4,background:`linear-gradient(135deg,${T.accent}15,${T.gold}10)`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,flexShrink:0}}>{"\uD83D\uDCD6"}</div>
    <div>
      <div style={{fontFamily:T.sans,fontSize:11,fontWeight:700,color:T.ink}}>{book.title}</div>
      <div style={{fontFamily:T.sans,fontSize:9,color:T.ink4}}>{book.author}</div>
    </div>
  </div>;
}

function WaypointEmbed({page,book}){
  return <div style={{padding:"10px 14px",borderRadius:10,background:`${T.blue}04`,border:`1px solid ${T.blue}08`,display:"inline-flex",alignItems:"center",gap:8,maxWidth:280,cursor:"pointer"}} onClick={()=>pToast("Opening waypoint\u2026")}>
    <div style={{width:28,height:28,borderRadius:"50%",background:`${T.blue}10`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,flexShrink:0}}>{"\u27D0"}</div>
    <div>
      <div style={{fontFamily:T.sans,fontSize:10,fontWeight:700,color:T.blue}}>Waypoint at page {page}</div>
      <div style={{fontFamily:T.sans,fontSize:9,color:T.ink4}}>{book}</div>
    </div>
  </div>;
}

// ═══════════════════════════════════════════════════
// CONVERSATION VIEW
// ═══════════════════════════════════════════════════
function ConversationView({conv,onBack}){
  const[msgs,setMsgs]=useState(conv.messages);
  const[input,setInput]=useState("");
  const[showMenu,setShowMenu]=useState(false);
  const[showInfo,setShowInfo]=useState(false);
  const bottomRef=useRef(null);
  const lens=LENSES[conv.user.lens];

  useEffect(()=>{bottomRef.current?.scrollIntoView({behavior:"smooth"});},[msgs]);

  function send(){
    if(!input.trim())return;
    setMsgs(p=>[...p,{id:`m${Date.now()}`,from:"me",text:input.trim(),time:"Just now",read:false}]);
    setInput("");
  }

  return <div style={{display:"flex",flexDirection:"column",height:"100vh"}}>
    {/* Header */}
    <div style={{padding:"12px 20px",background:`${T.bg}F2`,backdropFilter:"blur(20px)",borderBottom:`1px solid ${T.border}`,display:"flex",alignItems:"center",gap:12,flexShrink:0}}>
      <button onClick={onBack} style={{padding:"4px 8px",borderRadius:6,border:"none",background:"transparent",fontFamily:T.sans,fontSize:16,color:T.ink3,cursor:"pointer"}}>{"\u2190"}</button>
      <Av i={conv.user.initials} ink={conv.user.ink} s={34} online={conv.user.online}/>
      <div style={{flex:1,minWidth:0}} onClick={()=>setShowInfo(!showInfo)}>
        <div style={{display:"flex",alignItems:"center",gap:5}}>
          <span style={{fontFamily:T.sans,fontSize:13,fontWeight:700,color:T.ink}}>{conv.user.name}</span>
          <IB ink={conv.user.ink}/>
          <span style={{fontSize:9}}>{lens.icon}</span>
        </div>
        <div style={{fontFamily:T.sans,fontSize:10,color:conv.user.online?T.green:T.ink4}}>{conv.user.online?"Online now":"Offline"}</div>
      </div>
      <div style={{position:"relative"}}>
        <button onClick={()=>setShowMenu(!showMenu)} style={{padding:"4px 8px",borderRadius:6,border:"none",background:"transparent",fontSize:16,color:T.ink4,cursor:"pointer"}}>{"\u22EF"}</button>
        {showMenu&&<div onClick={()=>setShowMenu(false)} style={{position:"absolute",top:"100%",right:0,marginTop:4,width:190,background:T.card,border:`1px solid ${T.borderHover}`,borderRadius:10,overflow:"hidden",boxShadow:"0 8px 32px rgba(0,0,0,.5)",zIndex:20}}>
          <button onClick={()=>pToast("Opening profile\u2026")} style={{display:"block",width:"100%",padding:"10px 14px",border:"none",background:"transparent",fontFamily:T.sans,fontSize:11,fontWeight:600,color:T.ink,textAlign:"left",cursor:"pointer"}} onMouseEnter={e=>e.currentTarget.style.background=T.bg3} onMouseLeave={e=>e.currentTarget.style.background="transparent"}>{"\u25CF"} View profile</button>
          <button onClick={()=>pToast(`Muted ${conv.user.name}`)} style={{display:"block",width:"100%",padding:"10px 14px",border:"none",background:"transparent",fontFamily:T.sans,fontSize:11,fontWeight:600,color:T.ink,textAlign:"left",cursor:"pointer"}} onMouseEnter={e=>e.currentTarget.style.background=T.bg3} onMouseLeave={e=>e.currentTarget.style.background="transparent"}>{"\uD83D\uDD07"} Mute conversation</button>
          <button onClick={()=>{if(window.confirm(`Block ${conv.user.name}?`))pToast(`Blocked ${conv.user.name}`);}} style={{display:"block",width:"100%",padding:"10px 14px",border:"none",background:"transparent",fontFamily:T.sans,fontSize:11,fontWeight:600,color:T.red,textAlign:"left",cursor:"pointer"}} onMouseEnter={e=>e.currentTarget.style.background=T.bg3} onMouseLeave={e=>e.currentTarget.style.background="transparent"}>{"\u26D4"} Block</button>
          <div style={{borderTop:`1px solid ${T.border}`}}/>
          <button onClick={()=>pToast("Report submitted")} style={{display:"block",width:"100%",padding:"10px 14px",border:"none",background:"transparent",fontFamily:T.sans,fontSize:11,fontWeight:600,color:T.ink4,textAlign:"left",cursor:"pointer"}} onMouseEnter={e=>e.currentTarget.style.background=T.bg3} onMouseLeave={e=>e.currentTarget.style.background="transparent"}>{"\u26A0"} Report</button>
        </div>}
      </div>
    </div>

    {/* User info panel */}
    {showInfo&&<div style={{padding:"14px 20px",background:`${lens.color}04`,borderBottom:`1px solid ${T.border}`,display:"flex",alignItems:"center",gap:14,animation:"fadeUp .2s ease"}}>
      <div>
        <div style={{fontFamily:T.sans,fontSize:10,color:T.ink4}}>{conv.user.handle}</div>
        <div style={{display:"flex",gap:8,marginTop:4}}>
          <span style={{fontFamily:T.sans,fontSize:9,color:lens.color}}>{lens.icon} {lens.label}</span>
          <span style={{fontFamily:T.sans,fontSize:9,color:T.gold}}>{"\u25C6"} {conv.user.ink.toLocaleString()} Ink</span>
        </div>
        {conv.sharedBook&&<div style={{marginTop:6}}><BookEmbed book={conv.sharedBook}/></div>}
      </div>
    </div>}

    {/* Messages */}
    <div style={{flex:1,overflowY:"auto",padding:"16px 20px",display:"flex",flexDirection:"column",gap:4}}>
      {/* Date separator */}
      <div style={{textAlign:"center",padding:"8px 0",margin:"4px 0"}}><span style={{fontFamily:T.sans,fontSize:9,color:T.ink4,background:T.bg,padding:"2px 10px"}}>Today</span></div>

      {msgs.map(m=>{
        const isMe=m.from==="me";
        return <div key={m.id} style={{display:"flex",justifyContent:isMe?"flex-end":"flex-start",marginBottom:2}}>
          <div style={{maxWidth:"75%",padding:"10px 14px",borderRadius:isMe?"14px 14px 4px 14px":"14px 14px 14px 4px",background:isMe?`${T.accent}15`:T.card,border:`1px solid ${isMe?`${T.accent}10`:T.border}`}}>
            <div style={{fontFamily:T.body,fontSize:13,color:T.ink2,fontWeight:300,lineHeight:1.6}}>{m.text}</div>
            <div style={{display:"flex",alignItems:"center",gap:4,marginTop:3,justifyContent:isMe?"flex-end":"flex-start"}}>
              <span style={{fontFamily:T.sans,fontSize:8,color:T.ink4}}>{m.time}</span>
              {isMe&&m.read&&<span style={{fontSize:8,color:T.blue}}>{"\u2713\u2713"}</span>}
              {isMe&&!m.read&&<span style={{fontSize:8,color:T.ink4}}>{"\u2713"}</span>}
            </div>
          </div>
        </div>;
      })}
      <div ref={bottomRef}/>
    </div>

    {/* Composer */}
    <div style={{padding:"12px 16px",borderTop:`1px solid ${T.border}`,background:`${T.bg}F2`,backdropFilter:"blur(20px)",display:"flex",gap:8,alignItems:"flex-end",flexShrink:0}}>
      <div style={{display:"flex",gap:4}}>
        <button onClick={()=>pToast("Share a book\u2026")} title="Share a book" style={{padding:"8px",borderRadius:8,border:`1px solid ${T.border}`,background:"transparent",fontSize:14,cursor:"pointer",color:T.ink4,lineHeight:1}}>{"\uD83D\uDCD6"}</button>
        <button onClick={()=>pToast("Share a waypoint\u2026")} title="Share a waypoint" style={{padding:"8px",borderRadius:8,border:`1px solid ${T.border}`,background:"transparent",fontSize:14,cursor:"pointer",color:T.ink4,lineHeight:1}}>{"\u27D0"}</button>
      </div>
      <input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>{if(e.key==="Enter")send();}} placeholder="Write a message\u2026" style={{flex:1,padding:"10px 14px",borderRadius:12,border:`1px solid ${T.border}`,background:T.bg3,fontFamily:T.body,fontSize:13,color:T.ink,fontWeight:300}} aria-label="Message"/>
      <button onClick={send} disabled={!input.trim()} style={{padding:"10px 18px",borderRadius:12,border:"none",background:input.trim()?`linear-gradient(135deg,${T.accent},#9E4520)`:T.bg3,fontFamily:T.sans,fontSize:12,fontWeight:700,color:input.trim()?"#fff":T.ink4,cursor:input.trim()?"pointer":"default"}}>Send</button>
    </div>
  </div>;
}

// ═══════════════════════════════════════════════════
// NEW CONVERSATION
// ═══════════════════════════════════════════════════
function NewConversation({onClose,onStart}){
  const[search,setSearch]=useState("");
  const FOLLOWERS=[
    {name:"Ingrid Solberg",initials:"IS",handle:"@ingridreads",ink:3420,lens:"analyst"},
    {name:"Kofi Asante",initials:"KA",handle:"@kofi_writes",ink:8750,lens:"storyteller"},
    {name:"Yuki Tanaka",initials:"YT",handle:"@yukiwrites",ink:1240,lens:"empath"},
    {name:"Davi Santos",initials:"DS",handle:"@davisantos",ink:1800,lens:"explorer"},
    {name:"James Harlow",initials:"JH",handle:"@jharlow",ink:540,lens:"explorer"},
    {name:"Aisha Keita",initials:"AK",handle:"@aishak",ink:4100,lens:"storyteller"},
    {name:"Tom\u00E1s Reyes",initials:"TR",handle:"@tomasreyes",ink:280,lens:"philosopher"},
  ];
  const filtered=search.trim()?FOLLOWERS.filter(f=>{const q=search.toLowerCase();return f.name.toLowerCase().includes(q)||f.handle.toLowerCase().includes(q);}):FOLLOWERS;

  return <div style={{animation:"fadeUp .25s ease"}}>
    <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:16}}>
      <h2 style={{fontFamily:T.serif,fontSize:20,fontWeight:700,color:T.ink}}>New message</h2>
      <button onClick={onClose} style={{fontSize:18,color:T.ink4,background:"none",border:"none",cursor:"pointer"}}>{"\u2715"}</button>
    </div>
    <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search readers you follow\u2026" style={{width:"100%",padding:"12px 16px",borderRadius:10,border:`1px solid ${T.border}`,background:T.bg3,fontFamily:T.body,fontSize:13,color:T.ink,marginBottom:12}} autoFocus/>
    <div style={{fontFamily:T.sans,fontSize:9,fontWeight:700,color:T.ink4,letterSpacing:".5px",textTransform:"uppercase",marginBottom:8}}>People you follow</div>
    <div style={{display:"flex",flexDirection:"column",gap:4}}>
      {filtered.map(f=>{const lens=LENSES[f.lens];return <button key={f.handle} onClick={()=>onStart(f)} style={{display:"flex",alignItems:"center",gap:10,padding:"10px 12px",borderRadius:10,border:`1px solid ${T.border}`,background:T.card,cursor:"pointer",textAlign:"left",width:"100%",transition:"border-color .15s"}} onMouseEnter={e=>e.currentTarget.style.borderColor=T.borderHover} onMouseLeave={e=>e.currentTarget.style.borderColor=T.border}>
        <Av i={f.initials} ink={f.ink} s={32}/>
        <div style={{flex:1}}>
          <div style={{display:"flex",alignItems:"center",gap:5}}>
            <span style={{fontFamily:T.sans,fontSize:12,fontWeight:700,color:T.ink}}>{f.name}</span>
            <IB ink={f.ink}/>
          </div>
          <div style={{fontFamily:T.sans,fontSize:10,color:T.ink4}}>{f.handle} {"\u00B7"} {lens.icon} {lens.label}</div>
        </div>
      </button>;})}
      {filtered.length===0&&<div style={{textAlign:"center",padding:"20px",fontFamily:T.body,fontSize:12,color:T.ink4}}>No readers found. You can only message people you follow.</div>}
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

export default function Messages(){
  const{theme,tid,setTid}=useTheme(); T=theme;
  const[view,setView]=useState("list"); // list | conv | new
  const[activeConv,setActiveConv]=useState(null);
  const[filter,setFilter]=useState("all"); // all | unread
  const totalUnread=CONVERSATIONS.reduce((a,c)=>a+c.unread,0);

  const filtered=filter==="unread"?CONVERSATIONS.filter(c=>c.unread>0):CONVERSATIONS;

  return <div style={{background:T.bg,minHeight:"100vh",color:T.ink}}>
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,800;1,400;1,700&family=Source+Serif+4:ital,wght@0,300;0,400;0,700;1,300;1,400&family=DM+Sans:wght@400;500;600;700;800&display=swap');
      *{margin:0;padding:0;box-sizing:border-box}
      ::selection{background:${T.gold}30;color:${T.ink}}
      @keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
      @media(max-width:640px){.mob-nav{display:flex!important}}
    `}</style>

    <div id="msg-toast" style={{display:"none",position:"fixed",bottom:80,left:"50%",transform:"translateX(-50%)",padding:"10px 24px",borderRadius:10,background:T.bg2,border:`1px solid ${T.borderHover}`,boxShadow:"0 8px 32px rgba(0,0,0,.4)",fontFamily:T.sans,fontSize:12,fontWeight:700,color:T.ink,zIndex:300}}/>

    {view==="conv"&&activeConv&&<ConversationView conv={activeConv} onBack={()=>setView("list")}/>}

    {view==="new"&&<div style={{maxWidth:480,margin:"0 auto",padding:"20px 24px"}}>
      <NewConversation onClose={()=>setView("list")} onStart={(user)=>{pToast(`Starting conversation with ${user.name}\u2026`);setView("list");}}/>
    </div>}

    {view==="list"&&<>
      {/* Nav */}
      <nav style={{position:"sticky",top:0,zIndex:100,background:`${T.bg}E8`,backdropFilter:"blur(24px)",borderBottom:`1px solid ${T.border}`}}>
        <div style={{maxWidth:560,margin:"0 auto",padding:"12px 24px",display:"flex",alignItems:"center"}}>
          <span style={{fontFamily:T.serif,fontSize:22,fontWeight:700,color:T.ink,letterSpacing:"-.5px",cursor:"pointer"}} onClick={()=>pToast("\u2190 Feed")}>Pr<span style={{color:T.accent}}>{"\u00E9"}</span>cis</span>
          <span onClick={()=>pToast("\u2190 Feed")} style={{fontFamily:T.sans,fontSize:12,color:T.ink3,marginLeft:12,cursor:"pointer"}}>{"\u2190"} Feed</span>
          <div style={{flex:1}}/>
        <ThemeSwitcher tid={tid} setTid={setTid}/>
          <span style={{fontFamily:T.sans,fontSize:13,fontWeight:700,color:T.blue,display:"flex",alignItems:"center",gap:5}}>{"\u2709"} Messages{totalUnread>0&&<span style={{display:"inline-flex",alignItems:"center",justifyContent:"center",width:18,height:18,borderRadius:"50%",background:T.accent,fontFamily:T.sans,fontSize:9,fontWeight:800,color:"#fff"}}>{totalUnread}</span>}</span>
        </div>
      </nav>

      <div style={{maxWidth:560,margin:"0 auto",padding:"20px 24px 100px"}}>
        {/* Header */}
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:16}}>
          <h1 style={{fontFamily:T.serif,fontSize:28,fontWeight:700,color:T.ink}}>Messages</h1>
          <button onClick={()=>setView("new")} style={{padding:"8px 18px",borderRadius:10,border:"none",background:`linear-gradient(135deg,${T.accent},#9E4520)`,color:"#fff",fontFamily:T.sans,fontSize:12,fontWeight:700,cursor:"pointer",boxShadow:`0 2px 12px ${T.accent}30`}}>+ New</button>
        </div>

        {/* Filter */}
        <div style={{display:"flex",gap:4,marginBottom:16}}>
          {[{id:"all",l:"All"},{id:"unread",l:`Unread (${totalUnread})`}].map(f=><button key={f.id} onClick={()=>setFilter(f.id)} style={{padding:"6px 14px",borderRadius:8,border:"none",background:filter===f.id?`${T.gold}10`:"transparent",fontFamily:T.sans,fontSize:11,fontWeight:filter===f.id?700:500,color:filter===f.id?T.gold:T.ink4,cursor:"pointer"}}>{f.l}</button>)}
        </div>

        {/* Conversation list */}
        <div style={{display:"flex",flexDirection:"column",gap:4}}>
          {filtered.map(conv=>{const lens=LENSES[conv.user.lens];
          return <div key={conv.id} onClick={()=>{setActiveConv(conv);setView("conv");}} style={{display:"flex",alignItems:"center",gap:12,padding:"14px 16px",borderRadius:14,background:conv.unread>0?`${T.gold}03`:T.card,border:`1px solid ${conv.unread>0?`${T.gold}10`:T.border}`,cursor:"pointer",transition:"all .15s"}} onMouseEnter={e=>{e.currentTarget.style.borderColor=T.borderHover;e.currentTarget.style.background=T.cardHover;}} onMouseLeave={e=>{e.currentTarget.style.borderColor=conv.unread>0?`${T.gold}10`:T.border;e.currentTarget.style.background=conv.unread>0?`${T.gold}03`:T.card;}}>
            <Av i={conv.user.initials} ink={conv.user.ink} s={40} online={conv.user.online}/>
            <div style={{flex:1,minWidth:0}}>
              <div style={{display:"flex",alignItems:"center",gap:5,marginBottom:2}}>
                <span style={{fontFamily:T.sans,fontSize:13,fontWeight:conv.unread>0?800:600,color:T.ink}}>{conv.user.name}</span>
                <span style={{fontSize:9}}>{lens.icon}</span>
              </div>
              <div style={{fontFamily:T.body,fontSize:12,color:conv.unread>0?T.ink2:T.ink4,fontWeight:conv.unread>0?400:300,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{conv.lastMsg}</div>
            </div>
            <div style={{display:"flex",flexDirection:"column",alignItems:"flex-end",gap:4,flexShrink:0}}>
              <span style={{fontFamily:T.sans,fontSize:9,color:conv.unread>0?T.gold:T.ink4}}>{conv.lastTime}</span>
              {conv.unread>0&&<span style={{display:"inline-flex",alignItems:"center",justifyContent:"center",width:18,height:18,borderRadius:"50%",background:T.accent,fontFamily:T.sans,fontSize:9,fontWeight:800,color:"#fff"}}>{conv.unread}</span>}
            </div>
          </div>;})}

          {filtered.length===0&&filter==="unread"&&<div style={{textAlign:"center",padding:"40px 20px",background:T.card,borderRadius:14,border:`1px solid ${T.border}`}}>
            <div style={{fontSize:28,opacity:.3,marginBottom:8}}>{"\u2713"}</div>
            <div style={{fontFamily:T.serif,fontSize:16,fontWeight:700,color:T.ink,marginBottom:4}}>All caught up</div>
            <div style={{fontFamily:T.body,fontSize:12,color:T.ink3,fontWeight:300}}>No unread messages.</div>
          </div>}

          {CONVERSATIONS.length===0&&<div style={{textAlign:"center",padding:"50px 20px",background:T.card,borderRadius:14,border:`1px solid ${T.border}`}}>
            <div style={{fontSize:32,opacity:.3,marginBottom:12}}>{"\u2709"}</div>
            <div style={{fontFamily:T.serif,fontSize:18,fontWeight:700,color:T.ink,marginBottom:6}}>Your conversations live here</div>
            <div style={{fontFamily:T.body,fontSize:13,color:T.ink3,fontWeight:300,lineHeight:1.6}}>When you discover a reader whose waypoints resonate, start a conversation. The best literary friendships begin with a shared page.</div>
          </div>}
        </div>
      </div>

      {/* Mobile nav */}
      <nav className="mob-nav" aria-label="Mobile navigation" style={{position:"fixed",bottom:0,left:0,right:0,zIndex:200,background:`${T.bg}F2`,backdropFilter:"blur(20px)",borderTop:`1px solid ${T.border}`,display:"none",padding:"6px 0 env(safe-area-inset-bottom,8px)"}}>
        <div style={{display:"flex",justifyContent:"space-around",maxWidth:480,margin:"0 auto"}}>
          {[{id:"feed",icon:"\u25A3",label:"Feed"},{id:"explore",icon:"\uD83C\uDF0D",label:"Explore"},{id:"press",icon:"\uD83D\uDCF0",label:"The Press"},{id:"compose",icon:"\u270D",label:"Write"},{id:"shelf",icon:"\u25C6",label:"Shelf"},{id:"profile",icon:"\u25CF",label:"Profile"}].map(n=><button key={n.id} onClick={()=>pToast(`Opening ${n.label}\u2026`)} style={{display:"flex",flexDirection:"column",alignItems:"center",gap:2,padding:"6px 12px",border:"none",background:"none",cursor:"pointer",minWidth:48,minHeight:44}}>
            <span style={{fontSize:18,opacity:.5}}>{n.icon}</span>
            <span style={{fontFamily:T.sans,fontSize:9,fontWeight:500,color:T.ink4}}>{n.label}</span>
          </button>)}
        </div>
      </nav>
    </>}
  </div>;
}
