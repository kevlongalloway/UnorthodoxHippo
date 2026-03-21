import { useState, useEffect, useCallback } from "react";

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

const LENSES={analyst:{icon:"\uD83D\uDD2C",label:"Analyst",color:"#5B9BD5"},empath:{icon:"\uD83D\uDC96",label:"Empath",color:"#D4788C"},philosopher:{icon:"\uD83D\uDCA1",label:"Philosopher",color:"#D4A855"},storyteller:{icon:"\uD83C\uDFAD",label:"Storyteller",color:"#9B7ED4"},explorer:{icon:"\uD83D\uDDFA\uFE0F",label:"Explorer",color:"#5BAD7A"},alchemist:{icon:"\u2727",label:"Alchemist",color:"#C4A06A"}};

const TIERS=[{name:"Fresh Ink",min:0,color:T.ink3},{name:"Wet Ink",min:25,color:"#8BAAB8"},{name:"Set Ink",min:100,color:"#A0C090"},{name:"Deep Ink",min:500,color:T.gold},{name:"Indelible",min:2000,color:T.accent}];
function getTier(n){for(let i=TIERS.length-1;i>=0;i--)if(n>=TIERS[i].min)return TIERS[i];return TIERS[0];}
function Av({i,s=32,ink=0}){const t=getTier(ink);return <div style={{width:s,height:s,borderRadius:"50%",background:`linear-gradient(160deg,${T.bg3},${T.bg2})`,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:T.sans,fontSize:s*.36,fontWeight:700,color:T.ink2,border:`1.5px solid ${t.color}30`,flexShrink:0}}>{i}</div>;}

const USER={name:"Priya Anand",handle:"@priyareads",initials:"PA",ink:12300,lens:"empath"};

// ═══════════════════════════════════════════════════
// NOTIFICATION DATA — rich, typed, grouped
// ═══════════════════════════════════════════════════
const NOTIFS=[
  // Comments — high signal
  {id:"n1",type:"comment",read:false,time:8,users:[{name:"Marcus Cole",initials:"MC",ink:890,lens:"analyst"}],
   target:{type:"Review",title:"Intermezzo"},preview:"The way you connected Rooney's prose rhythm to musicality — that's exactly the analyst read I was missing.",actionLabel:"Reply"},
  {id:"n2",type:"comment",read:false,time:25,users:[{name:"Lila Okafor",initials:"LO",ink:2400,lens:"storyteller"}],
   target:{type:"Original Work",title:"Inheritance Tax"},preview:"This hit different. The second stanza does something I haven't seen anyone try in literary spaces online.",actionLabel:"Reply"},

  // Grouped likes
  {id:"n3",type:"like",read:false,time:45,users:[{name:"Davi Santos",initials:"DS",ink:340,lens:"explorer"},{name:"Yuki Tanaka",initials:"YT",ink:1800,lens:"philosopher"},{name:"Amara Osei",initials:"AO",ink:620,lens:"empath"}],
   target:{type:"Review",title:"Intermezzo"},grouped:true,count:3},

  // Shelf
  {id:"n4",type:"shelf",read:false,time:90,users:[{name:"Yuki Tanaka",initials:"YT",ink:1800,lens:"philosopher"}],
   target:{type:"Original Work",title:"Inheritance Tax"}},

  // Follow
  {id:"n5",type:"follow",read:true,time:180,users:[{name:"Amara Osei",initials:"AO",ink:620,lens:"empath"}],following:false},

  // Mention
  {id:"n6",type:"mention",read:true,time:300,users:[{name:"Lila Okafor",initials:"LO",ink:2400,lens:"storyteller"}],
   target:{type:"Spoiler Zone",title:"Beloved — Act III"},preview:"@priyareads would have a field day with Morrison's use of interior monologue here"},

  // Repost
  {id:"n7",type:"repost",read:true,time:480,users:[{name:"Marcus Cole",initials:"MC",ink:890,lens:"analyst"},{name:"Davi Santos",initials:"DS",ink:340,lens:"explorer"}],
   target:{type:"Recommendation",title:"Why everyone should read Orbital"},grouped:true,count:2},

  // Ink milestone
  {id:"n8",type:"milestone",read:true,time:1440,system:true,
   milestone:{tier:"Deep Ink",threshold:500,icon:"\u25C6",color:T.gold},message:"You crossed 500 Ink. Welcome to Deep Ink."},

  // Writing prompt
  {id:"n9",type:"prompt",read:true,time:2880,system:true,
   prompt:{text:"What book changed how you see a city?",lens:"empath"}},

  // Grouped follows
  {id:"n10",type:"follow",read:true,time:4320,users:[{name:"River Chen",initials:"RC",ink:45,lens:"explorer"},{name:"Sana Mirza",initials:"SM",ink:180,lens:"alchemist"},{name:"Tomás Ruiz",initials:"TR",ink:70,lens:"storyteller"}],grouped:true,count:3,following:false},

  // Older comment
  {id:"n11",type:"comment",read:true,time:5760,users:[{name:"Davi Santos",initials:"DS",ink:340,lens:"explorer"}],
   target:{type:"Review",title:"James by Percival Everett"},preview:"Strong take. The dialect chapters are where Everett really commits to the premise.",actionLabel:"Reply"},
];

function timeAgo(m){if(m<60)return`${m}m`;if(m<1440)return`${Math.floor(m/60)}h`;const d=Math.floor(m/1440);return d===1?"1d":`${d}d`;}

const FILTERS=[
  {id:"all",label:"All",icon:null},
  {id:"unread",label:"Unread",icon:null},
  {id:"comment",label:"Comments",icon:"\uD83D\uDCAC"},
  {id:"like",label:"Likes",icon:"\u2665"},
  {id:"follow",label:"Follows",icon:"\uD83D\uDC65"},
  {id:"mention",label:"Mentions",icon:"@"},
  {id:"shelf",label:"Shelves",icon:"\u25C6"},
  {id:"milestone",label:"Milestones",icon:"\u2B50"},
];

// ═══════════════════════════════════════════════════
// TYPE CONFIG — icon, verb, color per notification type
// ═══════════════════════════════════════════════════
const TYPE_CFG={
  comment:{icon:"\uD83D\uDCAC",verb:"commented on",color:T.ink},
  like:{icon:"\u2665",verb:"liked",color:T.rose},
  shelf:{icon:"\u25C6",verb:"shelved",color:T.gold},
  follow:{icon:"\uD83D\uDC65",verb:"started following you",color:T.green},
  mention:{icon:"@",verb:"mentioned you in",color:T.blue},
  repost:{icon:"\u21BB",verb:"reposted",color:T.plum},
  milestone:{icon:"\u2B50",verb:"",color:T.gold},
  prompt:{icon:"\u270D",verb:"",color:T.accent},
};

// ═══════════════════════════════════════════════════
// NOTIFICATION CARD
// ═══════════════════════════════════════════════════
function NotifCard({n,onRead,onFollow,onAction}){
  const cfg=TYPE_CFG[n.type]||TYPE_CFG.comment;
  const isSystem=n.system;
  const mainUser=n.users?.[0];
  const lens=mainUser?LENSES[mainUser.lens]:null;

  // Build headline
  let headline="";
  if(n.type==="milestone"){
    headline=n.message;
  }else if(n.type==="prompt"){
    headline="Daily writing prompt";
  }else if(n.grouped&&n.count>1){
    const names=n.users.slice(0,2).map(u=>u.name.split(" ")[0]);
    const extra=n.count-2;
    headline=extra>0?`${names.join(", ")} and ${extra} other${extra>1?"s":""}`:names.join(" and ");
    headline+=` ${cfg.verb}`;
  }else if(mainUser){
    headline=mainUser.name;
    if(n.type!=="follow")headline+=` ${cfg.verb}`;
    else headline+=" started following you";
  }

  // Target label
  const targetLabel=n.target?`your ${n.target.type.toLowerCase()} \u201C${n.target.title}\u201D`:"";

  return <div onClick={()=>!n.read&&onRead(n.id)} role="article" aria-label={`${n.read?"":"Unread "}notification: ${headline}`}
    style={{display:"flex",gap:12,padding:"16px 20px",borderRadius:14,background:n.read?T.card:`${T.gold}04`,border:`1px solid ${n.read?T.border:`${T.gold}12`}`,cursor:n.read?"default":"pointer",transition:"all .2s",animation:"fadeUp .3s ease both"}}>

    {/* Left: icon or avatar */}
    <div style={{flexShrink:0,position:"relative"}}>
      {isSystem?<div style={{width:36,height:36,borderRadius:"50%",background:`${cfg.color}10`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,border:`1px solid ${cfg.color}20`}}>
        {n.type==="milestone"?n.milestone.icon:cfg.icon}
      </div>
      :n.grouped&&n.count>2?<div style={{position:"relative",width:36,height:36}}>
        <Av i={n.users[0].initials} s={28} ink={n.users[0].ink}/>
        <div style={{position:"absolute",bottom:-2,right:-4}}><Av i={n.users[1].initials} s={20} ink={n.users[1].ink}/></div>
      </div>
      :<Av i={mainUser.initials} s={36} ink={mainUser.ink}/>}
      {!n.read&&<div style={{position:"absolute",top:-2,left:-2,width:8,height:8,borderRadius:"50%",background:T.accent,border:`2px solid ${T.bg}`,boxShadow:`0 0 6px ${T.accent}60`}}/>}
    </div>

    {/* Center: content */}
    <div style={{flex:1,minWidth:0}}>
      {/* Headline */}
      <div style={{fontFamily:T.sans,fontSize:12.5,color:T.ink,lineHeight:1.5,marginBottom:n.preview||n.type==="milestone"||n.type==="prompt"?6:0}}>
        {n.type==="milestone"?<span style={{fontWeight:700,color:n.milestone.color}}>{headline}</span>
        :n.type==="prompt"?<span style={{fontWeight:600,color:T.ink3}}>{headline}</span>
        :<><strong>{headline.split(cfg.verb)[0]}</strong><span style={{color:T.ink3}}>{n.type!=="follow"?` ${cfg.verb} `:""}</span>{targetLabel&&<span style={{color:T.ink2,fontWeight:600}}>{targetLabel}</span>}</>}
      </div>

      {/* Preview text */}
      {n.preview&&<div style={{fontFamily:T.body,fontSize:12,color:T.ink3,fontWeight:300,lineHeight:1.6,marginBottom:8,display:"-webkit-box",WebkitLineClamp:2,WebkitBoxOrient:"vertical",overflow:"hidden"}}>
        {n.type==="mention"&&<span style={{color:T.blue,fontWeight:600}}>@priyareads </span>}{n.preview.replace("@priyareads ","")}
      </div>}

      {/* Prompt text */}
      {n.type==="prompt"&&<div style={{fontFamily:T.serif,fontSize:14,fontWeight:600,color:T.ink,fontStyle:"italic",marginBottom:8,lineHeight:1.5}}>
        {"\u201C"}{n.prompt.text}{"\u201D"}
      </div>}

      {/* Milestone badge */}
      {n.type==="milestone"&&<div style={{display:"inline-flex",alignItems:"center",gap:6,padding:"6px 14px",borderRadius:10,background:`${n.milestone.color}08`,border:`1px solid ${n.milestone.color}15`,marginBottom:6}}>
        <span style={{fontSize:14}}>{n.milestone.icon}</span>
        <span style={{fontFamily:T.sans,fontSize:12,fontWeight:700,color:n.milestone.color}}>{n.milestone.tier}</span>
        <span style={{fontFamily:T.sans,fontSize:10,color:T.ink4}}>· {n.milestone.threshold}+ Ink</span>
      </div>}

      {/* Lens badge for commenters/mentioners */}
      {mainUser&&lens&&!n.grouped&&(n.type==="comment"||n.type==="mention")&&<div style={{display:"inline-flex",alignItems:"center",gap:4,marginBottom:4}}>
        <span style={{padding:"2px 8px",borderRadius:6,fontSize:9,fontWeight:600,fontFamily:T.sans,color:lens.color,background:`${lens.color}10`}}>{lens.icon} {lens.label}</span>
        {mainUser.ink>=500&&<span style={{padding:"2px 6px",borderRadius:5,fontSize:9,fontWeight:600,fontFamily:T.sans,color:getTier(mainUser.ink).color,background:`${getTier(mainUser.ink).color}10`}}>{getTier(mainUser.ink).name}</span>}
      </div>}

      {/* Action row */}
      <div style={{display:"flex",gap:6,marginTop:4,flexWrap:"wrap"}}>
        {n.actionLabel&&<button onClick={e=>{e.stopPropagation();onAction(n.id,"reply");}} style={{padding:"4px 12px",borderRadius:7,border:`1px solid ${T.border}`,background:"transparent",fontFamily:T.sans,fontSize:10,fontWeight:600,color:T.ink3,cursor:"pointer"}}>
          {n.actionLabel}
        </button>}
        {n.type==="follow"&&!n.grouped&&<button onClick={e=>{e.stopPropagation();onFollow(n.id);}} style={{padding:"4px 12px",borderRadius:7,border:"none",background:n.following?`${T.green}08`:`linear-gradient(135deg,${T.accent},#9E4520)`,fontFamily:T.sans,fontSize:10,fontWeight:700,color:n.following?T.green:"#fff",cursor:"pointer",borderWidth:1,borderStyle:"solid",borderColor:n.following?`${T.green}30`:"transparent"}}>
          {n.following?"Following":"Follow back"}
        </button>}
        {n.type==="follow"&&n.grouped&&<button onClick={e=>{e.stopPropagation();onAction(n.id,"viewAll");}} style={{padding:"4px 12px",borderRadius:7,border:`1px solid ${T.border}`,background:"transparent",fontFamily:T.sans,fontSize:10,fontWeight:600,color:T.ink3,cursor:"pointer"}}>
          View all
        </button>}
        {n.type==="prompt"&&<button onClick={e=>{e.stopPropagation();onAction(n.id,"write");}} style={{padding:"5px 16px",borderRadius:8,border:"none",background:`linear-gradient(135deg,${T.accent},#9E4520)`,fontFamily:T.sans,fontSize:10,fontWeight:700,color:"#fff",cursor:"pointer",boxShadow:`0 2px 8px ${T.accent}20`}}>
          {"\u270D"} Write
        </button>}
        {n.target&&<button onClick={e=>{e.stopPropagation();onAction(n.id,"viewPost");}} style={{padding:"4px 12px",borderRadius:7,border:`1px solid ${T.border}`,background:"transparent",fontFamily:T.sans,fontSize:10,fontWeight:600,color:T.ink3,cursor:"pointer"}}>
          View post
        </button>}
        {/* Agency: dismiss, mute, block, report */}
        {!n.system&&mainUser&&<>
          <button onClick={e=>{e.stopPropagation();onAction(n.id,"dismiss");}} style={{padding:"4px 8px",borderRadius:6,border:`1px solid ${T.border}`,background:"transparent",fontFamily:T.sans,fontSize:9,fontWeight:600,color:T.ink4,cursor:"pointer",marginLeft:"auto"}}>{"\u2715"}</button>
          <button onClick={e=>{e.stopPropagation();onAction(n.id,"mute");}} style={{padding:"4px 8px",borderRadius:6,border:`1px solid ${T.border}`,background:"transparent",fontFamily:T.sans,fontSize:9,fontWeight:600,color:T.ink4,cursor:"pointer"}} title={`Mute ${mainUser.name}`}>{"\uD83D\uDD07"}</button>
          <button onClick={e=>{e.stopPropagation();onAction(n.id,"report");}} style={{padding:"4px 8px",borderRadius:6,border:`1px solid ${T.border}`,background:"transparent",fontFamily:T.sans,fontSize:9,fontWeight:600,color:T.ink4,cursor:"pointer"}} title="Report">{"\u26A0"}</button>
        </>}
      </div>
    </div>

    {/* Right: time */}
    <div style={{flexShrink:0,display:"flex",flexDirection:"column",alignItems:"flex-end",gap:4}}>
      <span style={{fontFamily:T.sans,fontSize:10,color:T.ink4}}>{timeAgo(n.time)}</span>
      <span style={{fontSize:12,opacity:.3}}>{cfg.icon}</span>
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

export default function PrecisMentions(){
  const{theme,tid,setTid}=useTheme(); T=theme;
  const[filter,setFilter]=useState("all");
  const[notifs,setNotifs]=useState(NOTIFS);
  const[toast,setToast]=useState("");
  const[vis,setVis]=useState(false);
  useEffect(()=>{setTimeout(()=>setVis(true),80);},[]);
  function pToast(msg){setToast(msg);setTimeout(()=>setToast(""),2400);}

  const markRead=useCallback((id)=>{setNotifs(p=>p.map(n=>n.id===id?{...n,read:true}:n));},[]);
  const markAllRead=useCallback(()=>{setNotifs(p=>p.map(n=>({...n,read:true})));pToast("\u2713 All marked as read");},[]);
  const toggleFollow=useCallback((id)=>{setNotifs(p=>p.map(n=>n.id===id?{...n,following:!n.following}:n));pToast("\u2713 Updated");},[]);
  const onAction=useCallback((id,action)=>{
    if(action==="reply")pToast(`\u270D Opening reply\u2026`);
    else if(action==="write")pToast(`\u270D Compose opening\u2026`);
    else if(action==="viewPost")pToast(`\u2192 Opening post\u2026`);
    else if(action==="viewAll")pToast(`\uD83D\uDC65 Showing all\u2026`);
    else if(action==="dismiss"){setNotifs(p=>p.filter(n=>n.id!==id));pToast("Dismissed");}
    else if(action==="mute"){const n=notifs.find(x=>x.id===id);pToast(`Muted ${n?.users?.[0]?.name||"user"} \u2014 manage in Settings`);}
    else if(action==="report")pToast("Report submitted \u2014 thank you");
  },[notifs]);

  const unreadCount=notifs.filter(n=>!n.read).length;

  // Filter logic
  const filtered=filter==="all"?notifs
    :filter==="unread"?notifs.filter(n=>!n.read)
    :notifs.filter(n=>n.type===filter);

  // Group by time: today, yesterday, this week, older
  function bucket(m){if(m<1440)return"Today";if(m<2880)return"Yesterday";if(m<10080)return"This week";return"Earlier";}
  const groups=[];
  let lastBucket="";
  filtered.forEach(n=>{const b=bucket(n.time);if(b!==lastBucket){groups.push({type:"header",label:b});lastBucket=b;}groups.push(n);});

  return <div style={{minHeight:"100vh",background:T.bg,color:T.ink}}>
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,800;1,400;1,700&family=Source+Serif+4:ital,opsz,wght@0,8..60,300;0,8..60,400;0,8..60,600;1,8..60,300;1,8..60,400&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&display=swap');
      *{margin:0;padding:0;box-sizing:border-box}::selection{background:rgba(212,168,85,.2)}body{overflow-x:hidden;background:${T.bg}!important}
      @keyframes fadeUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:none}}
      @keyframes pulseGlow{0%,100%{opacity:1}50%{opacity:.5}}
      @media(prefers-reduced-motion:reduce){*{animation-duration:0.01ms!important;transition-duration:0.01ms!important}}
      button:focus-visible{outline:2px solid ${T.gold};outline-offset:2px;border-radius:4px}
      .ftab{padding:6px 14px;border-radius:20px;border:none;font-family:${T.sans};font-size:11px;font-weight:600;cursor:pointer;transition:all .15s;background:transparent;color:${T.ink3};white-space:nowrap}
      .ftab:hover{background:${T.bg2};color:${T.ink2}}
      .ftab.on{background:${T.gold}10;color:${T.gold};border:1px solid ${T.gold}20}
      *::-webkit-scrollbar{width:0;height:0}*{scrollbar-width:none}
      @media(max-width:600px){.mob-nav{display:flex!important;}.m-head{flex-direction:column!important;align-items:flex-start!important;gap:12px!important}}
    `}</style>

    {toast&&<div style={{position:"fixed",bottom:24,left:"50%",transform:"translateX(-50%)",padding:"10px 24px",borderRadius:10,background:T.bg2,border:`1px solid ${T.borderHover}`,boxShadow:"0 8px 32px rgba(0,0,0,.4)",fontFamily:T.sans,fontSize:12,fontWeight:700,color:T.ink,zIndex:300,animation:"fadeUp .3s ease"}}>{toast}</div>}

    {/* Nav */}
    <nav style={{position:"sticky",top:0,zIndex:100,background:`${T.bg}E8`,backdropFilter:"blur(24px)",borderBottom:`1px solid ${T.border}`}}>
      <div style={{maxWidth:720,margin:"0 auto",padding:"12px 24px",display:"flex",alignItems:"center"}}>
        <span onClick={()=>pToast("\u2190 Feed")} style={{fontFamily:T.serif,fontSize:22,fontWeight:700,color:T.ink,letterSpacing:"-.5px",cursor:"pointer"}}>Pr<span style={{color:T.accent}}>{"\u00E9"}</span>cis</span>
        <span style={{fontFamily:T.sans,fontSize:12,color:T.ink3,marginLeft:12,cursor:"pointer"}} onClick={()=>pToast("\u2190 Feed")}>{"\u2190"} Feed</span>
        <div style={{flex:1}}/>
        <ThemeSwitcher tid={tid} setTid={setTid}/>
        <div style={{display:"flex",alignItems:"center",gap:8}}>
          {unreadCount>0&&<span style={{fontFamily:T.sans,fontSize:10,fontWeight:700,color:T.accent,background:`${T.accent}12`,padding:"2px 8px",borderRadius:8}}>{unreadCount} new</span>}
          <button onClick={()=>pToast("\u2699 Settings \u2192")} style={{padding:"6px 10px",borderRadius:6,border:`1px solid ${T.border}`,background:"transparent",fontFamily:T.sans,fontSize:11,color:T.ink3,cursor:"pointer"}}>{"\u2699"}</button>
        </div>
      </div>
    </nav>

    <main style={{maxWidth:720,margin:"0 auto",padding:"24px 24px 80px"}}>
      {/* Header */}
      <div className="m-head" style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:20}}>
        <div>
          <h1 style={{fontFamily:T.serif,fontSize:26,fontWeight:700,color:T.ink}}>Mentions & Activity</h1>
          <p style={{fontFamily:T.body,fontSize:13,color:T.ink3,fontWeight:300,marginTop:2}}>Everything directed at you, in one place.</p>
        </div>
        {unreadCount>0&&<button onClick={markAllRead} style={{padding:"7px 16px",borderRadius:8,border:`1px solid ${T.border}`,background:"transparent",fontFamily:T.sans,fontSize:11,fontWeight:600,color:T.ink3,cursor:"pointer",flexShrink:0}}>Mark all read</button>}
      </div>

      {/* Filter pills */}
      <div style={{display:"flex",gap:4,overflowX:"auto",paddingBottom:16,marginBottom:8,scrollbarWidth:"none",WebkitOverflowScrolling:"touch",msOverflowStyle:"none"}}>
        {FILTERS.map(f=>{
          const count=f.id==="all"?notifs.length:f.id==="unread"?unreadCount:notifs.filter(n=>n.type===f.id).length;
          return <button key={f.id} className={`ftab${filter===f.id?" on":""}`} onClick={()=>setFilter(f.id)}>
            {f.icon&&<span style={{marginRight:4}}>{f.icon}</span>}{f.label}{count>0&&<span style={{marginLeft:4,opacity:.6}}>({count})</span>}
          </button>;
        })}
      </div>

      {/* Notification list with time groups */}
      <div style={{display:"flex",flexDirection:"column",gap:6,animation:vis?"fadeUp .4s ease both":"none"}}>
        {groups.length===0||(filtered.length===0)?<div style={{padding:"60px 20px",textAlign:"center",background:T.card,borderRadius:14,border:`1px solid ${T.border}`}}>
          <div style={{fontSize:40,marginBottom:14,opacity:.3}}>{filter==="unread"?"\u2713":"\u25C8"}</div>
          <div style={{fontFamily:T.serif,fontSize:18,fontWeight:700,color:T.ink,marginBottom:6,fontStyle:"italic"}}>
            {filter==="unread"?"You\u2019re caught up.":"Nothing here yet."}
          </div>
          <div style={{fontFamily:T.body,fontSize:12.5,color:T.ink3,lineHeight:1.6,maxWidth:360,margin:"0 auto 16px"}}>
            {filter==="unread"?"Everything new has been read. The feed will be here when there\u2019s more \u2014 in the meantime, the page is yours."
            :`No ${filter==="all"?"notifications":FILTERS.find(f=>f.id===filter)?.label.toLowerCase()||"items"} yet.`}
          </div>
          {filter==="unread"&&<div style={{display:"flex",gap:8,justifyContent:"center",flexWrap:"wrap"}}>
            <button onClick={()=>pToast("\u270D Compose opening\u2026")} style={{padding:"9px 22px",borderRadius:10,border:"none",background:`linear-gradient(135deg,${T.accent},#9E4520)`,fontFamily:T.sans,fontSize:12,fontWeight:700,color:"#fff",cursor:"pointer",boxShadow:`0 2px 12px ${T.accent}30`}}>{"\u270D"} Write something</button>
            <button onClick={()=>setFilter("all")} style={{padding:"9px 22px",borderRadius:10,border:`1px solid ${T.border}`,background:"transparent",fontFamily:T.sans,fontSize:12,fontWeight:600,color:T.ink3,cursor:"pointer"}}>{"\u25C8"} View all activity</button>
          </div>}
        </div>

        :groups.map((item,i)=>{
          if(item.type==="header")return <div key={item.label} style={{fontFamily:T.sans,fontSize:10,fontWeight:700,color:T.ink4,letterSpacing:".6px",textTransform:"uppercase",padding:"12px 0 4px",marginTop:i>0?8:0}}>{item.label}</div>;
          return <NotifCard key={item.id} n={item} onRead={markRead} onFollow={toggleFollow} onAction={onAction}/>;
        })}
      </div>

      {/* Load more */}
      {filtered.length>0&&<div style={{textAlign:"center",marginTop:20}}>
        <button onClick={()=>pToast("Loading older notifications\u2026")} style={{padding:"9px 28px",borderRadius:10,border:`1px solid ${T.border}`,background:"transparent",fontFamily:T.sans,fontSize:12,fontWeight:600,color:T.ink3,cursor:"pointer"}}>Load older</button>
      </div>}
    </main>

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
