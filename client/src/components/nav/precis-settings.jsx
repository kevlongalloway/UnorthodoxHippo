import { useState, useEffect } from "react";

const T={bg:"#161D2E",bg2:"#1C2438",bg3:"#232D44",card:"#1A2236",border:"rgba(212,168,85,0.09)",borderHover:"rgba(212,168,85,0.18)",gold:"#D4A855",goldDim:"rgba(212,168,85,0.45)",accent:"#C47232",ink:"#E8E2D6",ink2:"#C8C0B0",ink3:"#8A8474",ink4:"#6C685C",green:"#6A9A60",red:"#C45A4A",blue:"#5A8AB4",plum:"#9A70A0",rose:"#C47A8A",serif:"'Playfair Display',Georgia,serif",body:"'Source Serif 4',Georgia,serif",sans:"'DM Sans',system-ui,sans-serif"};

const LENSES={analyst:{icon:"\uD83D\uDD2C",label:"Analyst",color:"#5B9BD5",desc:"Structure, craft, architecture"},empath:{icon:"\uD83D\uDC96",label:"Empath",color:"#D4788C",desc:"Feeling, resonance, nerve"},philosopher:{icon:"\uD83D\uDCA1",label:"Philosopher",color:"#D4A855",desc:"Ideas, questions, meaning"},storyteller:{icon:"\uD83C\uDFAD",label:"Storyteller",color:"#9B7ED4",desc:"Narrative, scene, voice"},explorer:{icon:"\uD83D\uDDFA\uFE0F",label:"Explorer",color:"#5BAD7A",desc:"Discovery, territory, wonder"},alchemist:{icon:"\u2727",label:"Alchemist",color:"#C4A06A",desc:"Synthesis, connection, transformation"}};

const THEMES=[
  {id:"twilight",name:"Twilight Ink",icon:"\u263E",preview:["#161D2E","#1A2236","#E8E2D6","#C47232","#D4A855"]},
  {id:"parchment",name:"Warm Parchment",icon:"\u2600",preview:["#F7F3EC","#FFFDF8","#2C2418","#B85A32","#B68409"]},
  {id:"stone",name:"Stone & Sage",icon:"\u25D2",preview:["#EDEBE6","#F5F3EE","#2A2A24","#B05A3A","#8A7A4A"]},
  {id:"editorial",name:"Editorial Mono",icon:"\u25A0",preview:["#FAF9F7","#FFFFFF","#1A1A1A","#C44A20","#1A1A1A"]},
];

const TIERS=[{name:"Fresh Ink",min:0,color:T.ink3},{name:"Wet Ink",min:25,color:"#8BAAB8"},{name:"Set Ink",min:100,color:"#A0C090"},{name:"Deep Ink",min:500,color:T.gold},{name:"Indelible",min:2000,color:T.accent}];
function getTier(n){for(let i=TIERS.length-1;i>=0;i--)if(n>=TIERS[i].min)return TIERS[i];return TIERS[0];}

const USER={name:"Priya Anand",handle:"@priyareads",email:"priya@email.com",initials:"PA",ink:12300,lens:"empath",joined:"December 2026",theme:"twilight"};

function Av({i,s=36}){return <div style={{width:s,height:s,borderRadius:"50%",background:`linear-gradient(160deg,${T.bg3},${T.bg2})`,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:T.sans,fontSize:s*.36,fontWeight:700,color:T.ink2,border:`1.5px solid ${T.gold}20`,flexShrink:0}}>{i}</div>;}

function Toggle({on,onToggle,label,disabled}){
  return <button onClick={disabled?undefined:onToggle} role="switch" aria-checked={on} aria-label={label} disabled={disabled}
    style={{width:40,height:22,borderRadius:11,border:"none",background:on?T.accent:`${T.ink4}30`,cursor:disabled?"not-allowed":"pointer",position:"relative",transition:"background .2s",opacity:disabled?.4:1}}>
    <div style={{position:"absolute",top:2,left:on?20:2,width:18,height:18,borderRadius:"50%",background:"#fff",transition:"left .2s",boxShadow:"0 1px 4px rgba(0,0,0,.2)"}}/>
  </button>;
}

function SettingRow({icon,label,desc,children,danger}){
  return <div style={{display:"flex",alignItems:"center",gap:14,padding:"16px 0",borderBottom:`1px solid ${T.border}`}}>
    <span style={{fontSize:16,opacity:.5,flexShrink:0}}>{icon}</span>
    <div style={{flex:1,minWidth:0}}>
      <div style={{fontFamily:T.sans,fontSize:13,fontWeight:600,color:danger?T.red:T.ink}}>{label}</div>
      {desc&&<div style={{fontFamily:T.body,fontSize:11.5,color:T.ink3,fontWeight:300,marginTop:2,lineHeight:1.5}}>{desc}</div>}
    </div>
    <div style={{flexShrink:0}}>{children}</div>
  </div>;
}

function SectionHead({title,icon}){
  return <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:4,marginTop:28}}>
    {icon&&<span style={{fontSize:14,opacity:.4}}>{icon}</span>}
    <span style={{fontFamily:T.sans,fontSize:11,fontWeight:700,color:T.ink4,letterSpacing:".6px",textTransform:"uppercase"}}>{title}</span>
  </div>;
}

export default function PrecisSettings(){
  const[tab,setTab]=useState("account");
  const[toast,setToast]=useState("");
  const[vis,setVis]=useState(false);
  useEffect(()=>{setTimeout(()=>setVis(true),80);},[]);
  function pToast(msg){setToast(msg);setTimeout(()=>setToast(""),2400);}

  // Account state
  const[name,setName]=useState(USER.name);
  const[handle,setHandle]=useState(USER.handle.replace("@",""));
  const[email,setEmail]=useState(USER.email);
  const[bio,setBio]=useState("Writer. Reader. Human. Tamil by inheritance, American by geography.");
  const[editAccount,setEA]=useState(false);

  // Lens state
  const[lens,setLens]=useState(USER.lens);
  const[lensConfirm,setLC]=useState(false);
  const[pendingLens,setPL]=useState(null);

  // Theme state
  const[theme,setTheme]=useState(USER.theme);

  // Notification state
  const[notifs,setNotifs]=useState({
    comments:true,shelves:true,follows:true,mentions:true,
    likes:false,reposts:false,
    digest:true,digestFreq:"weekly",
    milestones:true,prompts:true,
    emailLaunch:true,emailProduct:false
  });
  function nToggle(k){setNotifs(p=>({...p,[k]:!p[k]}));}

  // Privacy state
  const[privacy,setPrivacy]=useState({profilePublic:true,showInk:true,showLens:true,showCurrentlyReading:true,allowReposts:true,indexSearchable:true,showOnMap:true,showNearby:true,showCity:true,mentionPermission:"everyone"});
  function pToggle(k){setPrivacy(p=>({...p,[k]:!p[k]}));}

  // Data state
  const[exporting,setExporting]=useState(false);
  const[deleteConfirm,setDC]=useState(false);
  const[deleteText,setDT]=useState("");

  const tier=getTier(USER.ink);
  const TABS=[
    {id:"account",label:"Account",icon:"\uD83D\uDC64"},
    {id:"lens",label:"Lens",icon:"\u2727"},
    {id:"appearance",label:"Appearance",icon:"\uD83C\uDFA8"},
    {id:"notifications",label:"Notifications",icon:"\uD83D\uDD14"},
    {id:"privacy",label:"Privacy",icon:"\uD83D\uDD12"},
    {id:"data",label:"Data",icon:"\u2913"},
  ];

  return <div style={{minHeight:"100vh",background:T.bg,color:T.ink}}>
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,800;1,400;1,700&family=Source+Serif+4:ital,opsz,wght@0,8..60,300;0,8..60,400;0,8..60,600;1,8..60,300;1,8..60,400&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&display=swap');
      *{margin:0;padding:0;box-sizing:border-box}::selection{background:rgba(212,168,85,.2)}body{overflow-x:hidden}
      @keyframes fadeUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:none}}
      @media(prefers-reduced-motion:reduce){*{animation-duration:0.01ms!important;transition-duration:0.01ms!important}}
      button:focus-visible{outline:2px solid ${T.gold};outline-offset:2px;border-radius:4px}
      input:focus-visible,textarea:focus-visible,select:focus-visible{outline:2px solid ${T.accent};outline-offset:1px;border-radius:6px}
      .stab{padding:8px 14px;border-radius:8px;border:none;font-family:${T.sans};font-size:12px;font-weight:600;cursor:pointer;transition:all .15s;background:transparent;color:${T.ink3};display:flex;align-items:center;gap:6;width:100%;text-align:left}
      .stab:hover{background:${T.bg2};color:${T.ink2}}
      .stab.on{background:${T.bg2};color:${T.gold}}
      @media(max-width:640px){.mob-nav{display:flex!important;}.sg{grid-template-columns:1fr!important}.stabs{display:flex!important;flex-direction:row!important;overflow-x:auto!important;gap:4px!important;padding:12px 20px!important;border-right:none!important;border-bottom:1px solid ${T.border}!important;position:static!important}.stab{white-space:nowrap;min-width:auto}}
    `}</style>

    {toast&&<div style={{position:"fixed",bottom:24,left:"50%",transform:"translateX(-50%)",padding:"10px 24px",borderRadius:10,background:T.bg2,border:`1px solid ${T.borderHover}`,boxShadow:"0 8px 32px rgba(0,0,0,.4)",fontFamily:T.sans,fontSize:12,fontWeight:700,color:T.ink,zIndex:300,animation:"fadeUp .3s ease"}}>{toast}</div>}

    {/* Nav */}
    <nav style={{position:"sticky",top:0,zIndex:100,background:`${T.bg}E8`,backdropFilter:"blur(24px)",borderBottom:`1px solid ${T.border}`}}>
      <div style={{maxWidth:900,margin:"0 auto",padding:"12px 24px",display:"flex",alignItems:"center"}}>
        <span onClick={()=>pToast("← Feed")} style={{fontFamily:T.serif,fontSize:22,fontWeight:700,color:T.ink,letterSpacing:"-.5px",cursor:"pointer"}}>Pr<span style={{color:T.accent}}>{"\u00E9"}</span>cis</span>
        <span style={{fontFamily:T.sans,fontSize:12,color:T.ink3,marginLeft:12,cursor:"pointer"}} onClick={()=>pToast("← Feed")}>{"\u2190"} Back</span>
        <div style={{flex:1}}/>
        <span style={{fontFamily:T.sans,fontSize:13,fontWeight:700,color:T.ink}}>Settings</span>
      </div>
    </nav>

    {/* Grid */}
    <div className="sg" style={{maxWidth:900,margin:"0 auto",display:"grid",gridTemplateColumns:"180px 1fr",minHeight:"calc(100vh - 56px)"}}>

      {/* Sidebar tabs */}
      <div className="stabs" style={{padding:"20px 12px",borderRight:`1px solid ${T.border}`,position:"sticky",top:56,height:"fit-content",display:"flex",flexDirection:"column",gap:2}}>
        {TABS.map(t=><button key={t.id} className={`stab${tab===t.id?" on":""}`} onClick={()=>setTab(t.id)}>
          <span style={{fontSize:13}}>{t.icon}</span>{t.label}
        </button>)}
      </div>

      {/* Content */}
      <main style={{padding:"24px 28px 80px",animation:vis?"fadeUp .4s ease both":"none"}}>

        {/* ═══ ACCOUNT ═══ */}
        {tab==="account"&&<div>
          <h1 style={{fontFamily:T.serif,fontSize:26,fontWeight:700,color:T.ink,marginBottom:4}}>Account</h1>
          <p style={{fontFamily:T.body,fontSize:13,color:T.ink3,fontWeight:300,marginBottom:20}}>Your identity on Précis.</p>

          {/* Profile card */}
          <div style={{padding:"20px",borderRadius:14,background:T.card,border:`1px solid ${T.border}`,marginBottom:20}}>
            <div style={{display:"flex",alignItems:"center",gap:14}}>
              <Av i={USER.initials} s={52}/>
              <div style={{flex:1}}>
                <div style={{fontFamily:T.sans,fontSize:16,fontWeight:700,color:T.ink}}>{name}</div>
                <div style={{fontFamily:T.sans,fontSize:12,color:T.ink3}}>@{handle}</div>
                <div style={{display:"flex",alignItems:"center",gap:6,marginTop:4}}>
                  <span style={{fontFamily:T.sans,fontSize:10,fontWeight:700,color:LENSES[lens].color,background:`${LENSES[lens].color}0A`,padding:"2px 8px",borderRadius:5}}>{LENSES[lens].icon} {LENSES[lens].label}</span>
                  <span style={{fontFamily:T.sans,fontSize:10,fontWeight:700,color:tier.color,background:`${tier.color}10`,padding:"2px 8px",borderRadius:5}}>{tier.name}</span>
                </div>
              </div>
              <button onClick={()=>setEA(!editAccount)} style={{padding:"7px 16px",borderRadius:8,border:`1px solid ${T.border}`,background:"transparent",fontFamily:T.sans,fontSize:11,fontWeight:600,color:T.ink3,cursor:"pointer"}}>{editAccount?"Cancel":"Edit"}</button>
            </div>
          </div>

          {editAccount&&<div style={{padding:"20px",borderRadius:14,background:T.card,border:`1px solid ${T.accent}15`,marginBottom:20,animation:"fadeUp .2s ease"}}>
            {[{l:"Display name",v:name,set:setName,max:40},{l:"Handle",v:handle,set:setHandle,max:20,prefix:"@"},{l:"Email",v:email,set:setEmail,max:120,type:"email"}].map(f=>
              <div key={f.l} style={{marginBottom:14}}>
                <label style={{fontFamily:T.sans,fontSize:10,fontWeight:700,color:T.ink4,letterSpacing:".3px",textTransform:"uppercase",display:"block",marginBottom:4}}>{f.l}</label>
                <div style={{position:"relative"}}>
                  {f.prefix&&<span style={{position:"absolute",left:12,top:"50%",transform:"translateY(-50%)",fontFamily:T.sans,fontSize:13,color:T.ink4}}>{f.prefix}</span>}
                  <input maxLength={f.max} type={f.type||"text"} value={f.v} onChange={e=>f.set(f.l==="Handle"?e.target.value.replace(/[^a-zA-Z0-9_]/g,""):e.target.value)}
                    style={{width:"100%",padding:`10px ${f.prefix?"10px 10px 28px":"12px"}`,borderRadius:8,background:T.bg2,border:`1px solid ${T.border}`,fontFamily:T.sans,fontSize:13,color:T.ink}} aria-label={f.l}/>
                </div>
              </div>
            )}
            <div style={{marginBottom:14}}>
              <label style={{fontFamily:T.sans,fontSize:10,fontWeight:700,color:T.ink4,letterSpacing:".3px",textTransform:"uppercase",display:"block",marginBottom:4}}>Bio</label>
              <textarea maxLength={280} value={bio} onChange={e=>setBio(e.target.value)} rows={3}
                style={{width:"100%",padding:"10px 12px",borderRadius:8,background:T.bg2,border:`1px solid ${T.border}`,fontFamily:T.body,fontSize:13,color:T.ink,resize:"vertical",fontWeight:300}} aria-label="Bio"/>
              <div style={{fontFamily:T.sans,fontSize:9,color:T.ink4,textAlign:"right",marginTop:2}}>{bio.length}/280</div>
            </div>
            <button onClick={()=>{setEA(false);pToast("\u2713 Profile updated");}} style={{padding:"9px 24px",borderRadius:8,border:"none",background:T.accent,color:"#fff",fontFamily:T.sans,fontSize:12,fontWeight:700,cursor:"pointer"}}>Save changes</button>
          </div>}

          <SectionHead title="Account details" icon={"\u2139\uFE0F"}/>
          <SettingRow icon={"\uD83D\uDCC5"} label="Member since" desc={USER.joined}/>
          <SettingRow icon={"\u25C6"} label="Ink" desc={`${USER.ink.toLocaleString()} · ${tier.name}`}/>
          <SettingRow icon={"\uD83D\uDD11"} label="Change password">
            <button onClick={()=>pToast("Password reset email sent")} style={{padding:"6px 14px",borderRadius:7,border:`1px solid ${T.border}`,background:"transparent",fontFamily:T.sans,fontSize:11,fontWeight:600,color:T.ink3,cursor:"pointer"}}>Reset</button>
          </SettingRow>
          <SettingRow icon={"\uD83D\uDCF1"} label="Connected accounts" desc="Sign in faster with linked services">
            <span style={{fontFamily:T.sans,fontSize:11,color:T.ink4}}>None</span>
          </SettingRow>
          <SettingRow icon={"\uD83D\uDD10"} label="Two-factor authentication" desc="Add an extra layer of security to your account">
            <button onClick={()=>pToast("2FA setup flow opening\u2026")} style={{padding:"6px 14px",borderRadius:7,border:`1px solid ${T.border}`,background:"transparent",fontFamily:T.sans,fontSize:11,fontWeight:600,color:T.ink3,cursor:"pointer"}}>Set up</button>
          </SettingRow>
        </div>}

        {/* ═══ LENS ═══ */}
        {tab==="lens"&&<div>
          <h1 style={{fontFamily:T.serif,fontSize:26,fontWeight:700,color:T.ink,marginBottom:4}}>Reading Lens</h1>
          <p style={{fontFamily:T.body,fontSize:13,color:T.ink3,fontWeight:300,marginBottom:20}}>Your lens shapes your feed, recommendations, writing prompts, and how other readers find you.</p>

          {/* Current lens */}
          <div style={{padding:"20px 22px",borderRadius:14,background:`${LENSES[lens].color}06`,border:`1.5px solid ${LENSES[lens].color}20`,marginBottom:24}}>
            <div style={{display:"flex",alignItems:"center",gap:12}}>
              <span style={{fontSize:32}}>{LENSES[lens].icon}</span>
              <div>
                <div style={{fontFamily:T.sans,fontSize:18,fontWeight:700,color:LENSES[lens].color}}>{LENSES[lens].label}</div>
                <div style={{fontFamily:T.body,fontSize:12,color:T.ink3,fontWeight:300}}>{LENSES[lens].desc}</div>
              </div>
              <div style={{marginLeft:"auto",fontFamily:T.sans,fontSize:9,color:T.ink4,opacity:.6}}>Current</div>
            </div>
          </div>

          <div style={{fontFamily:T.sans,fontSize:11,fontWeight:700,color:T.ink4,letterSpacing:".5px",textTransform:"uppercase",marginBottom:12}}>Switch lens</div>
          <p style={{fontFamily:T.body,fontSize:12,color:T.ink3,fontWeight:300,marginBottom:16,lineHeight:1.6}}>Changing your lens updates your feed algorithm, writing prompts, and public badge. Your existing posts are not affected.</p>

          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(150px,1fr))",gap:8,marginBottom:16}}>
            {Object.entries(LENSES).map(([k,v])=>{
              const active=lens===k;const pending=pendingLens===k;
              return <button key={k} onClick={()=>{if(!active){setPL(k);setLC(true);}}}
                style={{padding:"14px",borderRadius:12,border:`1.5px solid ${active?`${v.color}40`:pending?`${v.color}30`:T.border}`,background:active?`${v.color}08`:T.card,cursor:active?"default":"pointer",textAlign:"left",transition:"all .15s",opacity:active?.6:1}}>
                <div style={{fontSize:18,marginBottom:4}}>{v.icon}</div>
                <div style={{fontFamily:T.sans,fontSize:12,fontWeight:700,color:active?v.color:T.ink}}>{v.label}</div>
                <div style={{fontFamily:T.body,fontSize:10,color:T.ink3,fontWeight:300}}>{v.desc}</div>
                {active&&<div style={{fontFamily:T.sans,fontSize:9,color:v.color,marginTop:4}}>Current</div>}
              </button>;
            })}
          </div>

          {lensConfirm&&pendingLens&&<div style={{padding:"16px 20px",borderRadius:12,background:T.card,border:`1px solid ${LENSES[pendingLens].color}20`,animation:"fadeUp .2s ease"}}>
            <div style={{fontFamily:T.sans,fontSize:13,fontWeight:700,color:T.ink,marginBottom:6}}>Switch to {LENSES[pendingLens].icon} {LENSES[pendingLens].label}?</div>
            <p style={{fontFamily:T.body,fontSize:12,color:T.ink3,fontWeight:300,marginBottom:12,lineHeight:1.6}}>Your feed will recalibrate immediately. Writing prompts will update. Your published work stays exactly as it is.</p>
            <div style={{display:"flex",gap:8}}>
              <button onClick={()=>{setLens(pendingLens);setPL(null);setLC(false);pToast(`${LENSES[pendingLens].icon} Lens updated to ${LENSES[pendingLens].label}`);}} style={{padding:"8px 20px",borderRadius:8,border:"none",background:LENSES[pendingLens].color,color:"#fff",fontFamily:T.sans,fontSize:12,fontWeight:700,cursor:"pointer"}}>Confirm</button>
              <button onClick={()=>{setPL(null);setLC(false);}} style={{padding:"8px 20px",borderRadius:8,border:`1px solid ${T.border}`,background:"transparent",fontFamily:T.sans,fontSize:12,fontWeight:600,color:T.ink3,cursor:"pointer"}}>Cancel</button>
            </div>
          </div>}
        </div>}

        {/* ═══ APPEARANCE ═══ */}
        {tab==="appearance"&&<div>
          <h1 style={{fontFamily:T.serif,fontSize:26,fontWeight:700,color:T.ink,marginBottom:4}}>Appearance</h1>
          <p style={{fontFamily:T.body,fontSize:13,color:T.ink3,fontWeight:300,marginBottom:20}}>How Précis looks on your screen.</p>

          <div style={{fontFamily:T.sans,fontSize:11,fontWeight:700,color:T.ink4,letterSpacing:".5px",textTransform:"uppercase",marginBottom:12}}>Reading theme</div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(180px,1fr))",gap:10,marginBottom:28}}>
            {THEMES.map(th=>{const active=theme===th.id;return <button key={th.id} onClick={()=>{setTheme(th.id);pToast(`${th.icon} Theme: ${th.name}`);}}
              style={{padding:"16px",borderRadius:14,border:`1.5px solid ${active?`${T.gold}40`:T.border}`,background:active?`${T.gold}06`:T.card,cursor:"pointer",textAlign:"left",transition:"all .15s"}}>
              <div style={{display:"flex",gap:3,marginBottom:10}}>
                {th.preview.map((c,i)=><div key={i} style={{width:16,height:16,borderRadius:i===0?4:8,background:c,border:"1px solid rgba(128,128,128,.2)"}}/>)}
              </div>
              <div style={{fontFamily:T.sans,fontSize:13,fontWeight:active?700:500,color:active?T.gold:T.ink}}>{th.icon} {th.name}</div>
              {active&&<div style={{fontFamily:T.sans,fontSize:9,color:T.gold,marginTop:2}}>Active</div>}
            </button>;})}
          </div>

          <SectionHead title="Display preferences" icon={"\u2699\uFE0F"}/>
          <SettingRow icon={"\uD83D\uDDA5"} label="Reduced motion" desc="Minimize animations and transitions">
            <Toggle on={false} onToggle={()=>pToast("Respects your system preference")} label="Reduced motion"/>
          </SettingRow>
          <SettingRow icon={"Aa"} label="Font size" desc="Adjust reading text size">
            <select defaultValue="Default" style={{padding:"6px 12px",borderRadius:6,background:T.bg2,border:`1px solid ${T.border}`,fontFamily:T.sans,fontSize:11,color:T.ink,cursor:"pointer"}} aria-label="Font size">
              <option>Small</option><option>Default</option><option>Large</option><option>Extra large</option>
            </select>
          </SettingRow>
        </div>}

        {/* ═══ NOTIFICATIONS ═══ */}
        {tab==="notifications"&&<div>
          <h1 style={{fontFamily:T.serif,fontSize:26,fontWeight:700,color:T.ink,marginBottom:4}}>Notifications</h1>
          <p style={{fontFamily:T.body,fontSize:13,color:T.ink3,fontWeight:300,marginBottom:20}}>What you hear about, and when.</p>

          <SectionHead title="In-app notifications" icon={"\uD83D\uDD14"}/>
          <SettingRow icon={"\uD83D\uDCAC"} label="Comments" desc="When someone comments on your post"><Toggle on={notifs.comments} onToggle={()=>nToggle("comments")} label="Comments"/></SettingRow>
          <SettingRow icon={"\u25C6"} label="Shelves" desc="When someone shelves your writing"><Toggle on={notifs.shelves} onToggle={()=>nToggle("shelves")} label="Shelves"/></SettingRow>
          <SettingRow icon={"\uD83D\uDC65"} label="New followers" desc="When someone follows you"><Toggle on={notifs.follows} onToggle={()=>nToggle("follows")} label="Follows"/></SettingRow>
          <SettingRow icon={"@"} label="Mentions" desc="When someone mentions you in a post or comment"><Toggle on={notifs.mentions} onToggle={()=>nToggle("mentions")} label="Mentions"/></SettingRow>
          <SettingRow icon={"\u2665"} label="Likes" desc="When someone likes your post"><Toggle on={notifs.likes} onToggle={()=>nToggle("likes")} label="Likes"/></SettingRow>
          <SettingRow icon={"\u21BB"} label="Reposts" desc="When someone reposts your work"><Toggle on={notifs.reposts} onToggle={()=>nToggle("reposts")} label="Reposts"/></SettingRow>

          <SectionHead title="Milestones & prompts" icon={"\uD83C\uDFC6"}/>
          <SettingRow icon={"\u2B50"} label="Ink milestones" desc="When you reach a new Ink tier"><Toggle on={notifs.milestones} onToggle={()=>nToggle("milestones")} label="Milestones"/></SettingRow>
          <SettingRow icon={"\u270D"} label="Writing prompts" desc="Daily lens-matched prompts in your feed"><Toggle on={notifs.prompts} onToggle={()=>nToggle("prompts")} label="Prompts"/></SettingRow>

          <SectionHead title="Email" icon={"\u2709"}/>
          <SettingRow icon={"\uD83D\uDCE8"} label="Weekly digest" desc="Highlights from your feed, sent once a week">
            <div style={{display:"flex",alignItems:"center",gap:8}}>
              <select value={notifs.digestFreq} onChange={e=>setNotifs(p=>({...p,digestFreq:e.target.value}))} disabled={!notifs.digest}
                style={{padding:"5px 10px",borderRadius:6,background:T.bg2,border:`1px solid ${T.border}`,fontFamily:T.sans,fontSize:10,color:T.ink,cursor:"pointer",opacity:notifs.digest?1:.4}} aria-label="Digest frequency">
                <option value="daily">Daily</option><option value="weekly">Weekly</option><option value="monthly">Monthly</option>
              </select>
              <Toggle on={notifs.digest} onToggle={()=>nToggle("digest")} label="Digest"/>
            </div>
          </SettingRow>
          <SettingRow icon={"\uD83D\uDE80"} label="Product updates" desc="Major features and platform news (rare)"><Toggle on={notifs.emailProduct} onToggle={()=>nToggle("emailProduct")} label="Product updates"/></SettingRow>
        </div>}

        {/* ═══ PRIVACY ═══ */}
        {tab==="privacy"&&<div>
          <h1 style={{fontFamily:T.serif,fontSize:26,fontWeight:700,color:T.ink,marginBottom:4}}>Privacy</h1>
          <p style={{fontFamily:T.body,fontSize:13,color:T.ink3,fontWeight:300,marginBottom:20}}>Control what others can see about you.</p>

          <SectionHead title="Profile visibility" icon={"\uD83D\uDC41"}/>
          <SettingRow icon={"\uD83C\uDF10"} label="Public profile" desc="Anyone can view your profile and posts"><Toggle on={privacy.profilePublic} onToggle={()=>pToggle("profilePublic")} label="Public profile"/></SettingRow>
          <SettingRow icon={"\u25C6"} label="Show Ink" desc="Display your Ink score on your profile"><Toggle on={privacy.showInk} onToggle={()=>pToggle("showInk")} label="Show Ink"/></SettingRow>
          <SettingRow icon={"\u2727"} label="Show lens" desc="Display your reader lens badge"><Toggle on={privacy.showLens} onToggle={()=>pToggle("showLens")} label="Show lens"/></SettingRow>
          <SettingRow icon={"\uD83D\uDCD6"} label="Currently reading" desc="Show what you're reading on your profile"><Toggle on={privacy.showCurrentlyReading} onToggle={()=>pToggle("showCurrentlyReading")} label="Currently reading"/></SettingRow>

          <SectionHead title="Location & Explore" icon={"\uD83D\uDCCD"}/>
          <SettingRow icon={"\uD83D\uDDFA\uFE0F"} label="Appear on Explore map" desc="Let other readers see your pin on the map. When off, you're completely invisible."><Toggle on={privacy.showOnMap} onToggle={()=>pToggle("showOnMap")} label="Appear on Explore map"/></SettingRow>
          <SettingRow icon={"\uD83D\uDCCD"} label="Show in Nearby Readers" desc="Appear in the Nearby Readers list and cards for people in your area"><Toggle on={privacy.showNearby} onToggle={()=>pToggle("showNearby")} label="Show in Nearby Readers"/></SettingRow>
          <SettingRow icon={"\uD83C\uDFD9\uFE0F"} label="Show city" desc="Display your general area (city name) on your map pin. Your exact address is never shared."><Toggle on={privacy.showCity} onToggle={()=>pToggle("showCity")} label="Show city"/></SettingRow>

          <SectionHead title="Content" icon={"\u270D"}/>
          <SettingRow icon={"\u21BB"} label="Allow reposts" desc="Let others repost your writing"><Toggle on={privacy.allowReposts} onToggle={()=>pToggle("allowReposts")} label="Allow reposts"/></SettingRow>
          <SettingRow icon={"\uD83D\uDD0D"} label="Search indexing" desc="Allow your posts to appear in search results"><Toggle on={privacy.indexSearchable} onToggle={()=>pToggle("indexSearchable")} label="Search indexing"/></SettingRow>

          <SectionHead title="Interactions" icon={"\uD83D\uDCAC"}/>
          <SettingRow icon={"@"} label="Who can mention you" desc="Control who can @mention you in posts and comments">
            <select value={privacy.mentionPermission} onChange={e=>setPrivacy(p=>({...p,mentionPermission:e.target.value}))} style={{padding:"6px 10px",borderRadius:7,border:`1px solid ${T.border}`,background:T.bg3,fontFamily:T.sans,fontSize:11,color:T.ink,cursor:"pointer"}} aria-label="Mention permission">
              <option value="everyone">Everyone</option>
              <option value="followers">Followers only</option>
              <option value="nobody">Nobody</option>
            </select>
          </SettingRow>
          <SettingRow icon={"\u26D4"} label="Blocked users" desc="People you've blocked can't see your profile or posts">
            <button onClick={()=>pToast("No blocked users")} style={{padding:"6px 14px",borderRadius:7,border:`1px solid ${T.border}`,background:"transparent",fontFamily:T.sans,fontSize:11,fontWeight:600,color:T.ink3,cursor:"pointer"}}>Manage</button>
          </SettingRow>
          <SettingRow icon={"\uD83D\uDD07"} label="Muted users" desc="Posts from muted users won't appear in your feed">
            <button onClick={()=>pToast("No muted users")} style={{padding:"6px 14px",borderRadius:7,border:`1px solid ${T.border}`,background:"transparent",fontFamily:T.sans,fontSize:11,fontWeight:600,color:T.ink3,cursor:"pointer"}}>Manage</button>
          </SettingRow>

          <SectionHead title="Legal" icon={"\uD83D\uDCDC"}/>
          <SettingRow icon={"\uD83D\uDD12"} label="Privacy Policy">
            <a href="https://joinprecis.com/privacy" target="_blank" rel="noopener noreferrer" style={{fontFamily:T.sans,fontSize:11,color:T.gold,textDecoration:"none",fontWeight:600}}>Read {"\u2192"}</a>
          </SettingRow>
          <SettingRow icon={"\uD83D\uDCC4"} label="Terms of Service">
            <a href="https://joinprecis.com/terms" target="_blank" rel="noopener noreferrer" style={{fontFamily:T.sans,fontSize:11,color:T.gold,textDecoration:"none",fontWeight:600}}>Read {"\u2192"}</a>
          </SettingRow>
        </div>}

        {/* ═══ DATA ═══ */}
        {tab==="data"&&<div>
          <h1 style={{fontFamily:T.serif,fontSize:26,fontWeight:700,color:T.ink,marginBottom:4}}>Your Data</h1>
          <p style={{fontFamily:T.body,fontSize:13,color:T.ink3,fontWeight:300,marginBottom:20}}>Export or delete your data. It belongs to you.</p>

          <SectionHead title="Export" icon={"\u2913"}/>
          <div style={{padding:"20px",borderRadius:14,background:T.card,border:`1px solid ${T.border}`,marginBottom:20}}>
            <div style={{fontFamily:T.sans,fontSize:13,fontWeight:700,color:T.ink,marginBottom:6}}>Download your data</div>
            <p style={{fontFamily:T.body,fontSize:12,color:T.ink3,fontWeight:300,lineHeight:1.6,marginBottom:14}}>Get a copy of everything — posts, reviews, shelves, profile info, reading history. Delivered as a ZIP file with JSON and plain text.</p>
            <button onClick={()=>{setExporting(true);setTimeout(()=>{setExporting(false);pToast("\u2913 Export ready — check your email");},2000);}}
              disabled={exporting} style={{padding:"9px 22px",borderRadius:8,border:"none",background:exporting?T.ink4:T.accent,color:"#fff",fontFamily:T.sans,fontSize:12,fontWeight:700,cursor:exporting?"default":"pointer",opacity:exporting?.6:1}}>
              {exporting?"Preparing export\u2026":"Request export"}
            </button>
          </div>

          <SectionHead title="Danger zone" icon={"\u26A0"}/>
          <div style={{padding:"20px",borderRadius:14,background:`${T.red}04`,border:`1px solid ${T.red}15`,marginBottom:20}}>
            <div style={{fontFamily:T.sans,fontSize:13,fontWeight:700,color:T.red,marginBottom:6}}>Delete account</div>
            <p style={{fontFamily:T.body,fontSize:12,color:T.ink3,fontWeight:300,lineHeight:1.6,marginBottom:6}}>This is permanent. Your personal data will be removed within 30 days. Published content will be anonymized (attributed to "Deleted User") to preserve conversation integrity.</p>
            <p style={{fontFamily:T.body,fontSize:12,color:T.ink3,fontWeight:300,lineHeight:1.6,marginBottom:14}}>If you want specific posts fully removed, include that in your request and we{"\u2019"}ll handle it individually.</p>

            {!deleteConfirm?<button onClick={()=>setDC(true)} style={{padding:"9px 22px",borderRadius:8,border:`1px solid ${T.red}30`,background:"transparent",color:T.red,fontFamily:T.sans,fontSize:12,fontWeight:700,cursor:"pointer"}}>Delete my account</button>
            :<div style={{animation:"fadeUp .2s ease"}}>
              <div style={{fontFamily:T.sans,fontSize:12,fontWeight:700,color:T.red,marginBottom:8}}>Type "delete my account" to confirm</div>
              <input value={deleteText} onChange={e=>setDT(e.target.value)} placeholder="delete my account" maxLength={30}
                style={{width:"100%",padding:"10px 12px",borderRadius:8,background:T.bg2,border:`1px solid ${T.red}30`,fontFamily:T.sans,fontSize:13,color:T.ink,marginBottom:10}} aria-label="Confirm deletion"/>
              <div style={{display:"flex",gap:8}}>
                <button disabled={deleteText.toLowerCase()!=="delete my account"} onClick={()=>pToast("Account deletion requested. Check your email.")}
                  style={{padding:"9px 22px",borderRadius:8,border:"none",background:deleteText.toLowerCase()==="delete my account"?T.red:`${T.red}30`,color:"#fff",fontFamily:T.sans,fontSize:12,fontWeight:700,cursor:deleteText.toLowerCase()==="delete my account"?"pointer":"not-allowed"}}>Permanently delete</button>
                <button onClick={()=>{setDC(false);setDT("");}} style={{padding:"9px 22px",borderRadius:8,border:`1px solid ${T.border}`,background:"transparent",fontFamily:T.sans,fontSize:12,fontWeight:600,color:T.ink3,cursor:"pointer"}}>Cancel</button>
              </div>
            </div>}
          </div>
        </div>}

      </main>
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
